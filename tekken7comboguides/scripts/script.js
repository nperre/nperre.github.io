var getJSON = function (charName) {
	return $.getJSON(
		"https://raw.githubusercontent.com/nperre/nperre.github.io/master/tekken7comboguides/assets/movelist/" + charName + ".json", 
		function (json) {
			return json;
		}
	);
};

var renderMovelist = function (charName) {
	getJSON(charName).then(function (data) {
		var container = $('.container');

		$.each(data, function (key, val) {
			//setup row / col
			var row = $("<div />").addClass("row justify-content-center");
			var col = $("<div />").addClass("col-12");
			
			//setup header section
			var header = $("<h3>" + key + "</h3>");
			col.append(header);
			col.append("<br />");
			
			//move into each launcher
			$.each(val, function (key2, val2) {
				//create card
				var card = $("<div />").addClass("card");

				//create header string and append to card
				var cardHeader = $("<div />").addClass("card-header").html(formatMoveList(key2, 'header'));
				card.append(cardHeader);

				//create body string
				var cardBody = $("<div />").addClass("card-body");
				if (typeof val2 == "string") {
					cardBody.html(formatMoveList(val2, 'body'));
				} else {
					//array code
					var moveString = "";
					$.each(val2, function (x, move) {
						moveString += formatMoveList(move, 'body');

						if (x != val2.length - 1) {
							moveString += " OR <br /><br />";
						}
					});
					cardBody.html(moveString);
				}

				//append body to card
				card.append(cardBody);
				//append card to col
				col.append(card);
				col.append("<br />");
			});

			row.append(col);
			container.append(row);
		});
	});
};

var formatMoveList = function (string, type) {
	var htmlString = "";
	var moves = string.split(';');

	$.each(moves, function (i, moveString) {
		var motions = moveString.split(',');
		$.each(motions, function (k, motion) {
			if (isButton(motion)) {
				//button code
				htmlString += '<img class="move-button" src="assets/button/' + motion + '.svg">';
			} else if (isButtonMiss(motion)) {
				//button miss code
				htmlString += '<img class="move-button-miss" src="assets/button/' + motion.replace('m', '') + '.svg">';
			} else if (motion.length <= 2) {
				//arrow code
				htmlString += '<img class="move-arrow" src="assets/arrow/' + motion + '.svg">';
			} else {
				//descriptor code
				htmlString += motion;
			}
		});

		if (i != moves.length - 1) {
			if (type == 'body'){
				htmlString += '<img class="move-next" src="assets/icons/chevron-right.svg">';
			} else {
				htmlString += '<span class="divider">|</span>';
			}
		}		
	});

	return htmlString;
};

function isButton(value) {
    return /^-?\d+$/.test(value);
}

function isButtonMiss(value) {
	return /^-?\d+m$/.test(value);
}

renderMovelist("leroysmith");
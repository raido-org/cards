var colors = ["#fbb102", "#44a264", "#3d3182", "#202143", "#ffdf73"];
var currentCardContext = "";
var currentCardQuestion = "";
var randomcard = "";
var randomcolor = "";
var path_to_cards_csv = 'cards.csv';

function loadAndParseCards() {
	fetch(path_to_cards_csv)
	  .then(response => response.text())
	  .then(csvText => {
		Papa.parse(csvText, {
		  complete: function(results) {
			console.log(results.data); // Log parsed data to console
			useCardData(results.data); // Use the parsed data in your app
		  },
		  header: true
		});
	  })
	  .catch(error => console.error('Error loading or parsing cards.csv:', error));
  }

cards = loadAndParseCards()

var availableCards = [];
for (var i = 0; i < cards.length; i++) {
	availableCards.push(i);
}

var availableColors = [];
for (var i = 0; i < colors.length; i++) {
	availableColors.push(i);
}

var lastCardShownIndex = -1;
var lastColorShownIndex = -1;

function getCard() {
	if (availableCards.length === 0) {
		for (var i = 0; i < cards.length; i++) {
			availableCards.push(i);
		}
		var lastCardPosition = availableCards.indexOf(lastCardShownIndex);
		if (lastCardPosition > -1) {
			availableCards.splice(lastCardPosition, 1);
		}
	}

	var cardIndex = Math.floor(Math.random() * availableCards.length);
	randomcard = availableCards[cardIndex];
	lastCardShownIndex = randomcard;
	availableCards.splice(cardIndex, 1);

	if (availableColors.length === 0) {
		for (var i = 0; i < colors.length; i++) {
			availableColors.push(i);
		}
		var lastColorPosition = availableColors.indexOf(lastColorShownIndex);
		if (lastColorPosition > -1) {
			availableColors.splice(lastColorPosition, 1);
		}
	}

	var colorIndex = Math.floor(Math.random() * availableColors.length);
	randomcolor = availableColors[colorIndex];
	lastColorShownIndex = randomcolor;
	availableColors.splice(colorIndex, 1);

	currentCardContext = cards[randomcard][0];
	currentCardQuestion = cards[randomcard][1];

	$(document).ready(function () {
		$("#newcard").animate({ backgroundColor: colors[randomcolor] }, 500);
		$(".cardbox").animate({ borderColor: colors[randomcolor] }, 500);
		$("blockquote footer").animate({ color: colors[randomcolor] }, 500);
		$("#cardtext").animate({ opacity: 0 }, 500, function () {
			$(this).animate({ opacity: 1 }, 500);
			$(this).html(
				currentCardContext + "<br><h1><b>···</b></h1><br>" + currentCardQuestion
			);
		});
	});
}

getCard();

$(document).ready(function () {
	$("#newcard").on("click", getCard);
});

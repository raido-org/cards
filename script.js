var colors = ["#fbb102", "#44a264", "#3d3182", "#202143", "#ffdf73"];
var currentCardContext = "";
var currentCardQuestion = "";
var randomcard = "";
var randomcolor = "";
var path_to_cards_csv = 'cards.csv';
let cards = []; // This will hold the CSV data once loaded

async function loadAndParseCards(path_to_cards_csv) {
	try {
	  const response = await fetch(path_to_cards_csv);
	  const csvText = await response.text();
	  const dataPromise = new Promise((resolve, reject) => {
		Papa.parse(csvText, {
		  complete: function(results) {
			resolve(results.data); // Resolve the promise with the parsed data
		  },
		  header: true, // Assuming your CSV has headers
		  error: function(error) {
			reject(error); // Reject the promise if there's an error
		  }
		});
	  });
	  cards = await dataPromise; // Assign the parsed data to the global variable
	} catch (error) {
	  console.error('Error loading or parsing cards.csv:', error);
	}
  }
  
  loadAndParseCards('path_to_your_cards_csv').then(() => {
	console.log(cards); // Now safe to use `cards`
	// Further logic that depends on `cards` can go here
  });

// var availableCards = [];
// for (var i = 0; i < cards.length; i++) {
// 	availableCards.push(i);
// }

// var availableColors = [];
// for (var i = 0; i < colors.length; i++) {
// 	availableColors.push(i);
// }

// var lastCardShownIndex = -1;
// var lastColorShownIndex = -1;

// function getCard() {
// 	if (availableCards.length === 0) {
// 		for (var i = 0; i < cards.length; i++) {
// 			availableCards.push(i);
// 		}
// 		var lastCardPosition = availableCards.indexOf(lastCardShownIndex);
// 		if (lastCardPosition > -1) {
// 			availableCards.splice(lastCardPosition, 1);
// 		}
// 	}

// 	var cardIndex = Math.floor(Math.random() * availableCards.length);
// 	randomcard = availableCards[cardIndex];
// 	lastCardShownIndex = randomcard;
// 	availableCards.splice(cardIndex, 1);

// 	if (availableColors.length === 0) {
// 		for (var i = 0; i < colors.length; i++) {
// 			availableColors.push(i);
// 		}
// 		var lastColorPosition = availableColors.indexOf(lastColorShownIndex);
// 		if (lastColorPosition > -1) {
// 			availableColors.splice(lastColorPosition, 1);
// 		}
// 	}

// 	var colorIndex = Math.floor(Math.random() * availableColors.length);
// 	randomcolor = availableColors[colorIndex];
// 	lastColorShownIndex = randomcolor;
// 	availableColors.splice(colorIndex, 1);

// 	currentCardContext = cards[randomcard][0];
// 	currentCardQuestion = cards[randomcard][1];

// 	$(document).ready(function () {
// 		$("#newcard").animate({ backgroundColor: colors[randomcolor] }, 500);
// 		$(".cardbox").animate({ borderColor: colors[randomcolor] }, 500);
// 		$("blockquote footer").animate({ color: colors[randomcolor] }, 500);
// 		$("#cardtext").animate({ opacity: 0 }, 500, function () {
// 			$(this).animate({ opacity: 1 }, 500);
// 			$(this).html(
// 				currentCardContext + "<br><h1><b>···</b></h1><br>" + currentCardQuestion
// 			);
// 		});
// 	});
// }

// getCard();

// $(document).ready(function () {
// 	$("#newcard").on("click", getCard);
// });

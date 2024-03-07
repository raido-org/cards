var colors = ["#fbb102", "#44a264", "#3d3182"];
var currentCardContext = "";
var currentCardQuestion = "";
var randomcard = "";
var randomcolor = "";


function getQueryStringValue(key) {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(key);
}

let cardDeckName = getQueryStringValue('card_deck'); // Get 'card_deck' parameter value

if (!cardDeckName) {
    cardDeckName = 'default';
}

var pathToCardsCsv = `${cardDeckName}.csv`; // Construct the path with the validated or defaulted value
let parsedCards = []; // This will hold the CSV data once loaded

async function loadAndParseCards(path) {
	try {
	  const response = await fetch(path);
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
	  parsedCards = await dataPromise; // Assign the parsed data to the global variable
	} catch (error) {
	  console.error('Error loading or parsing cards.csv:', error);
	}
  }
  
  loadAndParseCards(pathToCardsCsv).then(() => {

    var availableCards = [];
    for (var i = 0; i < parsedCards.length; i++) {
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
            for (var i = 0; i < parsedCards.length; i++) {
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

        // Assuming your CSV has columns named 'context' and 'questions'
        currentCardContext = parsedCards[randomcard].context;
        currentCardQuestion = parsedCards[randomcard].questions;

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

});

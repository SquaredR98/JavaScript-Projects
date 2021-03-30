// let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quotes from the API.

// async function getQuotes() {
// 	const apiUrl = 'https://type.fit/api/quotes';

// 	try {
// 		const response = await fetch(apiUrl);
// 		apiQuotes = await response.json();

// 		newQuote();
// 	} catch (error) {
// 		// Handle Error here...
// 	}
// }

// getQuotes();

// If author id blank add Unknown

// Show Loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

function getQuote() {
	loading();
	const randomQuote =
		localQuotes[Math.floor(Math.random() * localQuotes.length)];

	if (randomQuote.author === '' || randomQuote.author === null) {
		authorText.innerText = 'Unknown';
	} else {
		authorText.innerText = randomQuote.author;
	}

	// Reduce font size for long Quotes
	if (randomQuote.text.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	quoteText.innerText = randomQuote.text;
	complete();
}

// Quote your tweet function
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

// Event Listenter
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();

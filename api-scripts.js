const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Getting quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const quote = data[Math.floor(Math.random() * data.length)];

        if (quote.author === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = quote.author;
        }
        if (quote.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = quote.text;
        hideLoadingSpinner();
    } catch (error) {
        //catch error here
    }
}
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=“${quote}„  -${author}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuotes);
// On Load
getQuotes();

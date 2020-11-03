const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Two loading functions, one to display loader, other to show content when done.
// Show loading
const loading = () => {
  quoteContainer.hidden = true;
  loader.hidden = false;
}
// Hide loading
const complete = () => {
  if (quoteContainer.hidden = true)
    quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Quote from API, rpoxy and api, fetching response then converting that from json. if statements that if author is blank, put unkown. Then reduce dont size for long quotes over 120. Then outputting quote to html. Catch error
async function getQuote() {
  loading();
  const proxyUrl = 'https://still-fjord-06189.herokuapp.com/'
  const apiUrl = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data)
    quoteText.innerText = data.message;

    if (quoteText.innerText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    complete();
  }
  catch (error) {
    getQuote();
    console.log('error with api');
  }
}

//function to open new page and tweet current quote, add quote and author to twitter url and use window.open methis in new windwo

const getTwitter = () => {
  const quote = quoteText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - Donald Trump`;
  window.open(twitterUrl, '_blank')
}
twitterBtn.addEventListener('click', getTwitter);
newQuoteBtn.addEventListener('click', getQuote);

// Add event listener to Twitter icon,two events for two buttons

// On Load
getQuote();

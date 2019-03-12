const htmlBody = document.querySelector('body');
const quoteBoxEl = document.querySelector('.quote-box');
const quoteEl = document.getElementById('text');
const authorEl = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');

const palette = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#009688',
    '#8bc34a', '#cddc39', '#ffc107', '#ff9800',
    '#9e9e9e', '#607d8b',]

const getQuote = () => {
    quoteEl.innerHTML = 'loading...';
    authorEl.innerHTML = '';
    setBackground();
    centerBtn();
    fetch('https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', { cache: 'reload' })
        .then(res => {
            return res.json();
        })
        .then(data => {
            const [quoteObj] = data;
            const quote = quoteObj.content;
            const author = quoteObj.title;

            quoteEl.innerHTML = quote;
            authorEl.innerHTML = `- ${author}`;
            centerBtn();
        });
};

const setBackground = () => {
    const randColor = palette[Math.floor(Math.random() * 15)];
    quoteBoxEl.style.background = randColor;
    newQuoteBtn.style.background = randColor;
    htmlBody.style.background = `${randColor}80`;
}

const centerBtn = () => {
    const computedBoxWidth = getComputedStyle(quoteBoxEl).width;
    newQuoteBtn.style.left = `${parseInt(computedBoxWidth) / 2}px`;
}

getQuote();

newQuoteBtn.addEventListener('click', getQuote);
// calculate half of the container, and place the button there

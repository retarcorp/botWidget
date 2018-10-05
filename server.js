const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Mongo = require('./Mongo')
let symbols = require('./symbols')
let Symbols = require('./Sy')
Mongo.init()
.then(data => {
	Symbols.initClient()
	Symbols.updateSymbolsPriceFilter()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({
  origin: 'chrome-extension://*',
  credentials: true
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'chrome-extension://*');
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
})

app.use(symbols)


app.listen(3003, () => console.log('3003'))






// const keyup = new Event('keyup');
// const input = document.getElementsByClassName('tv-screener-table__search-input')[0];
// const check = {
//   'Продовать' : 'sell',
//   'активно продовать' : 'strong sell',
//   'Покупать' : 'buy',
//   'активно покупать' : 'strong buy'
// };
// let info = function(need) {
//   input.value = need;
//   input.dispatchEvent(keyup);
//   let interval = setInterval(function () {
//     console.log(document.getElementsByClassName('tv-data-table__tbody')[1].children.length)
//       if ( document.getElementsByClassName('tv-data-table__tbody')[1]
//       .children.length === 1 && document
//       .getElementsByClassName('tv-data-table__tbody')[1].children[0]
//       .children[0].children[0].children[1].children[0].innerText === need ) {
//         clearInterval(interval);
//         let data = document.getElementsByClassName('tv-data-table__tbody')[1].children[0].children[7].firstElementChild.innerText;
//         console.log(data)
//     }
//   }, 100);
// }
// info('BNBBTC');

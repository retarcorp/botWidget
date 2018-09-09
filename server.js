const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
origin: 'https://ru.tradingview.com',
credentials: true
}));
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', 'https://ru.tradingview.com');
res.header('Access-Control-Allow-Credentials', 'true')
next();
})

let obj = [
  {
    sumbol: 'BNBBTC',
    interval: '1m',
    reating: ''
  },  {
      sumbol: 'ABSUSD',
      interval: '1m',
      reating: ''
    }
];

app.post('/data', function(req,res) {
  obj = req.body;
  console.log(obj)
  res.send('')
})

app.get('/data', function(req,res) {

  res.send(obj)
})

app.listen(3000, () => console.log('3000'))






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

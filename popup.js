document.getElementById('btn').addEventListener('click', function() {
  chrome.tabs.executeScript({
    code : `
    const keyup = new Event('keyup');
    const input = document.getElementsByClassName('tv-screener-table__search-input')[0];
    const check = {
      '1m' : '1 minute',
      '5m' : '5 minutes',
      '15m' : '15 minutes',
      '1h' : '1 hour',
      '4h' : '4 hours',
      '1d' : '1 day',
      '1w' : '1 week',
      '1M' : '1 month'
    };
    const TYPE = "BINANCE";

    const start = function() {
      let xhr = new XMLHttpRequest();
      xhr.open('GET','http://localhost:3003/api/tradeSignals/getData',true);
      xhr.addEventListener('load', function(){
        xhr.responseText == '[]' ? start() : update(JSON.parse(xhr.responseText))
      })
      xhr.send()
    };

    const getFromApi(cb) {
    	var xhr = new XMLHttpRequest();
	    xhr.onload = () => {
	        if (cb) cb(xhr.response);
	    }
	    xhr.open('POST', 'https://scanner.tradingview.com/crypto/scan');
	    xhr.send(JSON.stringify({"filter":[{"left":"exchange","operation":"nempty"},{"left":"exchange","operation":"equal","right":"BINANCE"}],"symbols":{"query":{"types":[]},"tickers":[]},"columns":["name","close","change","change_abs","high","low","volume","Recommend.All","exchange","description","name","subtype","pricescale","minmov","fractional","minmove2"],"sort":{"sortBy":"exchange","sortOrder":"asc"},"options":{"lang":"en"},"range":[0,1000]}));
    }

    const update = function(data) {
     	getFromApi((response) => {
     		response = JSON.parse(response);
     		binance = response.data;

     		requets(data.map( (elm) => {
     			const curr = binance.find( bin => bin.d[0] == elm.symbol);

     			if (!curr) {
     				return elm;
     			}

     			curr.d[7] < 0.5 && curr.d[7] > 0 (&& elm.rating = "Buy");
     			curr.d[7] >= 0.5 && (elm.rating = "Active Buy");
     			curr.d[7] > -0.5 && curr.d[7] < 0 && (elm.rating = "Sell");
     			curr.d[7] <= -0.5 && (elm.rating = "Active Sell");
     			curr.d[7] == 0 (elm.rating = "Neutral");
     			curr.d[7] === null (elm.rating = "-");

     			return elm;
     		}));
     	});
    };

    const find = function(need) {
      // console.log(need)
      input.value = need.symbol;
      document.getElementsByClassName('tv-dropdown__button tv-dropdown-behavior__button tv-screener-toolbar__button tv-screener-toolbar__button--arrow-down tv-screener-toolbar__button--with-state apply-common-tooltip common-tooltip-fixed')[0].click();
      // console.log(check[need.timeframe])
      document.querySelector('[title="' + check[need.timeframe] +'"]').click()
      input.dispatchEvent(keyup);
    }
     const request = function(data) {
       let xhr = new XMLHttpRequest();
       xhr.open('POST','http://localhost:3003/api/tradeSignals/postData',true);
       xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
       xhr.addEventListener('load', function(){
         setTimeout(start, 1000);
       });
       xhr.send(JSON.stringify(data))
     };
     start()
    `
  })
})

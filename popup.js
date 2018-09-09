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
    }
    const start = function() {
      let xhr = new XMLHttpRequest();
      xhr.open('GET','http://localhost:3000/data',true);
      xhr.addEventListener('load', function(){
        xhr.responseText == '[]' ? start() : update(JSON.parse(xhr.responseText))
      })
      xhr.send()
    }
    const update = function(data) {
      let i = data.length - 1;
      find(data[i])
      let interval = setInterval(function () {
          if ( document.getElementsByClassName('tv-data-table__tbody')[1].children[0]
          .children[0].children[0].children[1].children[0].innerText === data[i].sumbol ) {
            data[i].reating = document.getElementsByClassName('tv-data-table__tbody')[1].children[0].children[7].firstElementChild.innerText;
            if(i){
              i--;
              find(data[i])
            } else {
              clearInterval(interval);
              request(data)
            }

        }
      }, 100);
    }
    const find = function(need) {
      input.value = need.sumbol;
      document.getElementsByClassName('tv-dropdown__button tv-dropdown-behavior__button tv-screener-toolbar__button tv-screener-toolbar__button--arrow-down tv-screener-toolbar__button--with-state apply-common-tooltip common-tooltip-fixed')[0].click();
      document.querySelector('[title="' + check[need.interval] +'"]').click()
      input.dispatchEvent(keyup);
    }
     const request = function(data) {
       let xhr = new XMLHttpRequest();
       xhr.open('POST','http://localhost:3000/data',true);
       xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
       xhr.addEventListener('load', function(){
         start();
       });
       xhr.send(JSON.stringify(data))
     }
     start()
    `
  })
})

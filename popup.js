document.getElementById('btn').addEventListener('click', function() {
  chrome.tabs.executeScript({
    code : `const keyup = new Event('keyup');
    const input = document.getElementsByClassName('tv-screener-table__search-input')[0];
    const check = {
      'Продовать' : 'sell',
      'активно продовать' : 'strong sell',
      'Покупать' : 'buy',
      'активно покупать' : 'strong buy'
    };
    let info = function(need) {
      input.value = need;
      input.dispatchEvent(keyup);
      let interval = setInterval(function () {
        console.log(document.getElementsByClassName('tv-data-table__tbody')[1].children.length)
          if ( document.getElementsByClassName('tv-data-table__tbody')[1]
          .children.length === 1 && document
          .getElementsByClassName('tv-data-table__tbody')[1].children[0]
          .children[0].children[0].children[1].children[0].innerText === need ) {
            clearInterval(interval);
            let data = document.getElementsByClassName('tv-data-table__tbody')[1].children[0].children[7].firstElementChild.innerText;
            console.log(data)
        }
      }, 100);
    }
    info('BNBBTC');
    `

  })
})

const keyup = new Event('keyup');
const input = document.getElementsByClassName('tv-screener-table__search-input')[0];
const check = {
  'Продавать' : 'sell',
  'Активно продавать' : 'strong sell',
  'Покупать' : 'buy',
  'Активно покупать' : 'strong buy'
};

const start = function() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET','http://localhost:3000/data',true);
  xhr.addEventListener('load', function(){
    update(JSON.parse(xhr.responseText))
  })
  xhr.send()
}

const update = function(data) {
  let i = data.length - 1;
  find(data[i])
  let interval = setInterval(function () {
    // console.log(document.getElementsByClassName('tv-data-table__tbody')[1].children.length)
      if ( document.getElementsByClassName('tv-data-table__tbody')[1].children[0]
      .children[0].children[0].children[1].children[0].innerText === data[i].sumbol ) {
        data[i].reating = check[document.getElementsByClassName('tv-data-table__tbody')[1].children[0].children[7].firstElementChild.innerText];
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
   console.log(data)
 }
start();

const click = new Event('click')
let time = document.getElementsByClassName('tv-dropdown__button tv-dropdown-behavior__button tv-screener-toolbar__button tv-screener-toolbar__button--arrow-down tv-screener-toolbar__button--with-state apply-common-tooltip common-tooltip-fixed')
time[0].children[2].dispatchEvent(click);

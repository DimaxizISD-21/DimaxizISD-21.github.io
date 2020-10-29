//Получаем API курса валют Приват Банка
let API_PRIVATBANK = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

let xhReq = new XMLHttpRequest();
xhReq.open('GET', API_PRIVATBANK, false);
xhReq.send(null);

//Записываем полученный результат в переменную data 
let data = JSON.parse(xhReq.responseText);

//Парсим нужные нам данные из JSON
let usdBuy = data[0]['buy'];
let usdSale = data[0]['sale'];

let eurBuy = data[1]['buy'];
let eurSale = data[1]['sale'];

let rurBuy = data[2]['buy'];
let rurSale = data[2]['sale'];

//Получаем ID елементов страницы
const b_USD = document.getElementById(element='buyUSD');
const b_EUR = document.getElementById(element='buyEUR');
const b_RUR = document.getElementById(element='buyRUR');

const s_USD = document.getElementById(element='saleUSD');
const s_EUR = document.getElementById(element='saleEUR');
const s_RUR = document.getElementById(element='saleRUR');

//Присваиваем елементам на странице нужные данные
b_USD.innerText = usdBuy;
b_EUR.innerText = eurBuy;
b_RUR.innerText = rurBuy;

s_USD.innerText = usdSale;
s_EUR.innerText = eurSale;
s_RUR.innerText = rurSale;
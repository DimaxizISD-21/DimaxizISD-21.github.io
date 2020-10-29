//Получаем API курса валют Приват Банка
let API_PRIVATBANK = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

let xhReq = new XMLHttpRequest();
xhReq.open('GET', API_PRIVATBANK, false);
xhReq.send(null);

//Записываем полученный результат в переменную data 
let data = JSON.parse(xhReq.responseText);

//Парсим нужные нам данные из JSON
let usdBuy = parseFloat(data[0]['buy']).toFixed(1);
let usdSale = parseFloat(data[0]['sale']).toFixed(1);

let eurBuy = parseFloat(data[1]['buy']).toFixed(1);
let eurSale = parseFloat(data[1]['sale']).toFixed(1);

let rurBuy = parseFloat(data[2]['buy']).toFixed(1);
let rurSale = parseFloat(data[2]['sale']).toFixed(1);

//Получаем ID елементов страницы
const buyUSD = document.getElementById(element='buyUSD');
const buyEUR = document.getElementById(element='buyEUR');
const buyRUR = document.getElementById(element='buyRUR');

const saleUSD = document.getElementById(element='saleUSD');
const saleEUR = document.getElementById(element='saleEUR');
const saleRUR = document.getElementById(element='saleRUR');

//Присваиваем елементам на странице нужные данные
buyUSD.innerText = usdBuy;
buyEUR.innerText = eurBuy;
buyRUR.innerText = rurBuy;

saleUSD.innerText = usdSale;
saleEUR.innerText = eurSale;
saleRUR.innerText = rurSale;


//Обработка кнопки Купить
btnBuy.onclick = () => {
    const currency = document.getElementById('currency').options.selectedIndex;
    const value = document.getElementById('input-value').value;
    const select = document.getElementById('currency').options[currency].text;

    getResultBuy(select, value);
}

//Функция отвечающая за вывод результата покупки
getResultBuy = (select, value) => {
    let result;
    switch (select) {
        case "USD":
            result = value * usdBuy;
            break;

        case "EUR":
            result = value * eurBuy;
            break;

        case "RUR":
            result = value * rurBuy;
            break;
    }

    document.getElementById('result').innerHTML = `К оплате: ${parseFloat(result).toFixed(2)} грн.`;
}

//Обработка кнопки Продать
btnSale.onclick = () => {
    const currency = document.getElementById('currency').options.selectedIndex;
    const value = document.getElementById('input-value').value;
    const select = document.getElementById('currency').options[currency].text;

    getResultSale(select, value);
}

//Функция отвечающая за вывод результата продажи
getResultSale = (select, value) => {
    let result;
    switch (select) {
        case "USD":
            result = value * usdSale;
            break;

        case "EUR":
            result = value * eurSale;
            break;

        case "RUR":
            result = value * rurSale;
            break;
    }

    document.getElementById('result').innerHTML = `Вы получите: ${parseFloat(result).toFixed(2)} грн.`;
}
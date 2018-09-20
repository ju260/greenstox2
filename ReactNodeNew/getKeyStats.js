//var cron = require('node-cron');

// cron.schedule('* * * * * *', function() {
//     console.log('running a task every sec');
// });


//const React = require('react');
//const JsonNasdaq = require('/symbols/nasdaq.json');
const express = require('express');
const app = express();
var mysql = require('mysql');
const http = require('http');
const socketIO = require('socket.io');
const fetch = require("node-fetch");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'greenstock',
    port: '8889',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect((err) => {
    if (err)
        throw err;
});

connection.query('TRUNCATE `greenstock`.`keyStats`', (err, result) => {
    if (err)
        throw err;
});

connection.query('SELECT `symbol`, id FROM `stocks_nasdaq` WHERE 1', (err, result) => {
    let d = new insertEleData(result);
});

class insertEleData {
    constructor(tab) {
        this.tabNasdaq = tab.map(x => Object.values(x));
        this.nbResults = this.tabNasdaq.length;

        this.indexTabBatch = 0;
        this.nbStocksBatch = 100;
        this.newTab = []; //this.tabNasdaq div by 100
        this.indexChart = 0;

        for (let i = 0; i < this.nbResults; i += this.nbStocksBatch) {
            this.newTab.push(this.tabNasdaq.slice(i, i + this.nbStocksBatch));
        }

        this.insertDataPERInBaseRow();
    }

    async insertDataPERInBaseRow() {
        for (const i of this.newTab) {
            await this.callStocks(i)
                .then(async data => {

                    for (const j of Object.values(data)) {
                        await this.insertDataPERInBaseRowLine(j);
                    }

                })
                .catch(reason => console.log(reason.message))
        }
    }

    async callStocks(i) {
        let tabTmp = i.map(x => x[0]);
        let urlPER = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + tabTmp + "&types=stats";
        let p = await fetch(urlPER);
        let data = await p.json();
        return data;
    }


    async insertDataPERInBaseRowLine(objetSymbol) {

        var profitMargin = typeof (objetSymbol.stats.profitMargin) === "number" ? objetSymbol.stats.profitMargin : -999999;
        let shortDate = typeof (objetSymbol.stats.shortDate) === "string" ? objetSymbol.stats.shortDate : "2099-99-99";
        let dividendYield = typeof (objetSymbol.stats.dividendYield) === "number" ? objetSymbol.stats.dividendYield : -999999;
        let EBITDA = typeof (objetSymbol.stats.EBITDA) === "number" ? objetSymbol.stats.EBITDA : -999999;
        let revenue = typeof (objetSymbol.stats.revenue) === "number" ? objetSymbol.stats.revenue : -999999;
        let grossProfit = typeof (objetSymbol.stats.grossProfit) === "number" ? objetSymbol.stats.grossProfit : -999999;
        let cash = typeof (objetSymbol.stats.cash) === "number" ? objetSymbol.stats.cash : -999999;
        let priceToSales = typeof (objetSymbol.stats.priceToSales) === "number" ? objetSymbol.stats.priceToSales : -999999;
        let dividendRate = typeof (objetSymbol.stats.dividendRate) === "number" ? objetSymbol.stats.dividendRate : -999999;
        let marketcap = typeof (objetSymbol.stats.marketcap) === "number" ? objetSymbol.stats.marketcap : -999999;
        let symbol = typeof (objetSymbol.stats.symbol) === "string" ? objetSymbol.stats.symbol : "null";

        const promise2 = await connection.query('INSERT INTO keyStats (profitMargin,' +
        'shortDate,dividendYield,EBITDA,revenue,grossProfit,cash,' +
        'dividendRate,marketcap,symbol)' +
        ' VALUES("' + profitMargin + '","' + shortDate + '","' + dividendYield + '","' + EBITDA + '","' + revenue + '","' + grossProfit + '","' + cash + '","' + dividendRate + '", "' + marketcap + '", "' + symbol + '")', (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        this.indexSymbol++;
        this.indexHistory++;
        return promise2;
    }

}
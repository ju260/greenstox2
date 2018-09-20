//var cron = require('node-cron');

// cron.schedule('* * * * * *', function() {
//     console.log('running a task every sec');
// });


//const React = require('react');
const JsonNasdaq = require('./../symbols/nasdaq.json');
const express = require('express');
const app = express();
var mysql = require('mysql');
const http = require('http');
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
connection.query('TRUNCATE `greenstock`.`per`', (err, result) => {
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

        this.nbArrayNewTab = this.newTab.length;
        this.insertDataInBase();
    }

    insertDataInBase() {
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
        let urlPER = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + tabTmp + "&types=quote";
        let p = await fetch(urlPER);
        let data = await p.json();
        return data;
    }


    async insertDataPERInBaseRowLine(objetSymbol) {

        let PER = typeof (objetSymbol.quote.peRatio) === "number" ? objetSymbol.quote.peRatio : -999999;
        if(PER < -999999) PER =  -999999;
        if(PER > 999999) PER =  999999;
        const promise2 = await connection.query('INSERT INTO per (symbol,perRatio,id_sector) VALUES("' + objetSymbol.quote.symbol + '","' + PER + '", "' + 0 + '" )', (err, result) => {
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
var cron = require('node-cron');

cron.schedule('* * * * * *', function() {
    console.log('running a task every sec');
});

const JsonNasdaq = require('./symbols/nasdaq.json');
const express = require('express');
const app = express();
var mysql = require('mysql');
const http = require('http');
const fetch = require("node-fetch");

const connection = helper('sector');

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

        let sector = typeof (objetSymbol.quote.sector) === "string" ? objetSymbol.quote.sector : "";
        let symbol= typeof (objetSymbol.quote.symbol) === "string" ? objetSymbol.quote.symbol : "";
       
        const promise2 = await connection.query('UPDATE `stocks_nasdaq` SET `sector` = "' + sector + '"  WHERE symbol = "' + symbol + '";', (err, result) => {
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
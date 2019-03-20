require("dotenv").load();
const helper = require('../helpers/connectBDD');
var cron = require('node-cron');

cron.schedule('* * * * * *', function() {
    console.log('running a task every sec');
});

const JsonNasdaq = require('./../symbols/nasdaq.json');
const express = require('express');
const app = express();
var mysql = require('mysql');
const http = require('http');
const socketIO = require('socket.io');
const fetch = require("node-fetch");

const connection = helper('history_monthly');

connection.query('SELECT `symbol`, id FROM `stocks_nasdaq` WHERE 1', (err, result) => {
    let d = new insertEleData(result);
});


class insertEleData {
    constructor(tab) {
        this.tabNasdaq = tab.map(x => Object.values(x));
        this.nbResults = this.tabNasdaq.length;
        this.indexSymbol = 1;

        this.indexTabBatch = 0;
        this.nbStocksBatch = 100;
        this.newTab = []; 
        this.indexChart = 0;

        for (let i = 0; i < this.nbResults; i += this.nbStocksBatch) {
            this.newTab.push(this.tabNasdaq.slice(i, i + this.nbStocksBatch));
        }

        this.nbArrayNewTab = this.newTab.length;
        this.insertDataInBase();
    }

    insertDataInBase() {
        this.insertDataInBaseRow();
    }

    async insertDataInBaseRow() {
        for (const i of this.newTab) {
            await this.callStocks(i)
                .then(async data => {
                    let tab = Object.entries(data);

                    for (let j=0; j<tab.length; j++) {
                        let value=Object.values(tab[j]);
                        let symbol = value[0];
                        let chartSymbol = value[1];
                        await this.insertDataInBaseRowLine(symbol, chartSymbol);
                        this.indexSymbol++;
                    }
                   
                })
                .catch(reason => console.log(reason.message))
        }
    }

    async callStocks(i) {
        let tabTmp = i.map(x => x[0]);
        let urlPER = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + tabTmp + "&types=chart&range=5y&chartInterval=20";
        let p = await fetch(urlPER);
        let data = await p.json();
        return data;
    }

    async insertDataInBaseRowLine(symbol, chartSymbol) {
        this.symbol = symbol;
        for (const ch of chartSymbol.chart) {
           await this.insertDataInBaseRowLineChart(ch, this.symbol);
        }
    }

    async insertDataInBaseRowLineChart(ch, symbol){
        let marketClose = this.newMethod(ch);

        const promise2 = await connection.query('INSERT INTO history_monthly (id_stock,close,date,symbol) VALUES("' + this.indexSymbol + '","' + marketClose + '","' + ch.date + '","' + symbol + '")', (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        
        return promise2;
    }

    newMethod(ch) {
        return typeof (ch.close) === "number" ? ch.close : -999999;
    }
}
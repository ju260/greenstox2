require("dotenv").load();
const helper = require('../helpers/connectBDD');
var cron = require('node-cron');

cron.schedule('*/1 * * * *', function() {
    console.log('running a task every min');

const express = require('express');
const app = express();
var mysql = require('mysql');
const http = require('http');
const socketIO = require('socket.io');
const fetch = require("node-fetch");

const connection = helper('history_dayly');

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
                        this.indexSymbol++;
                        let value=Object.values(tab[j]);
                        if(value[1].quote !== null){
                            let symbol = value[0];
                            let quote = value[1].quote; 
                            await this.insertDataInBaseRowLine(symbol, quote);
                        } 
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

    async insertDataInBaseRowLine(symbol, chartSymbol) {
        this.symbol = symbol;

        await this.insertDataInBaseRowLineChart(chartSymbol, this.symbol);
    }

    async insertDataInBaseRowLineChart(obj, symbol){
        let latestPrice = typeof (obj.latestPrice) === "number" ? obj.latestPrice : -999999;
        // let date = new Date(obj.latestUpdate);
        // date.toLocaleString();
        
        const promise2 = await connection.query('INSERT INTO history_dayly (id_stock,lastPrice,variation,date,symbol) VALUES("' + this.indexSymbol + '","' + latestPrice + '","' + obj.changePercent*100 + '","' + obj.latestUpdate + '","' + symbol + '")', (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        
        return promise2;
    }
}

});
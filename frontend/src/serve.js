const React = require('react');
const JsonNasdaq = require('./symbols/nasdaq.json');
const express = require('express');
const app = express();
var mysql = require('mysql');
const http = require('http');
const socketIO = require('socket.io');
const fetch = require("node-fetch");

var connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'greenStox' });

connection.connect((err) => {
    if (err)
        throw err;
    console.log('Connected!');
});


connection.query('SELECT `symbol` FROM `stocks_nasdaq` WHERE 1', (err, result) => {
    console.log(result)
    let d = new insertEleData(result);
});

class insertEleData {

    constructor(tab) {
        //console.log(tab);
        this.tabNasdaq = tab;
        this.nbResults = this.tabNasdaq.length;
        this.indexNb = 0;
        this.indexSymbol = 1;

        this.insertDataInBase(tab);
    }

    insertDataInBase(tabIDNasdaq) {
        //  this.insertDataKeyStatsInBaseRow();  TABLE KEYSTATS
        this.insertDataHistoryDaylyInBaseRow(); //TABLE Hisotry dayly
        //this.insertDataHistoryWeeklyInBaseRow(); //TABLE Hisotry weekly
        // this.insertDataHistorymonthlyInBaseRow(); //TABLE Hisotry monthly

        // console.log(this.tabNasdaq[this.indexNb].symbol)
    }

    insertDataHistoryDaylyInBaseRow() {
        let urlKeyStats = "https://api.iextrading.com/1.0/stock/" + this.tabNasdaq[this.indexNb].symbol + "/chart/1d?chartInterval=10";
        fetch(urlKeyStats).then(response => {
            response
                .json()
                .then(j => {
                    //  console.log(this.tabNasdaq[this.indexNb].symbol);

                    this.lengthHistoryValues = j.length;
                    this.indexHistoryValues = 0;

                    this.insertDataHistoryDaylyInBaseRowLine(this.lengthHistoryValues, this.indexHistoryValues, j);
                })
                .catch((error) => {
                    console.error(error);
                });
        });

    }

    insertDataHistoryDaylyInBaseRowLine(lengthHistoy, indexHistory, objetSymbolHistoy) {
        connection.query('INSERT INTO history_dayly (id_stock,marketAverage,date) VALUES("' + this.indexSymbol + '","' + objetSymbolHistoy[indexHistory].marketAverage + '","' + objetSymbolHistoy[indexHistory].minute + '")', (err, result) => {
            console.log(`this.indexSymbol: ${this.indexSymbol}: err: ${err} `);

            if (indexHistory === lengthHistoy - 1) {
                if (this.indexSymbol === this.nbresults)
                    return;

                this.indexSymbol++;
                this.insertDataHistoryDaylyInBaseRow(this.tabNasdaq[this.indexSymbol]);
                return;
            }

            indexHistory++;
            this.insertDataHistoryDaylyInBaseRowLine(lengthHistoy, indexHistory, objetSymbolHistoy);
        });
    }


    insertDataHistoryWeeklyInBaseRow() {
        let urlKeyStats = "https://api.iextrading.com/1.0/stock/" + this.tabNasdaq[this.indexNb].symbol + "/chart/5d";
        fetch(urlKeyStats).then(response => {
            response
                .json()
                .then(j => {
                    //  console.log(this.tabNasdaq[this.indexNb].symbol);

                    this.lengthHistoryValues = j.length;
                    this.indexHistoryValues = 0;

                    this.insertDataHistoryWeeklyInBaseRowLine(this.lengthHistoryValues, this.indexHistoryValues, j);
                })
                .catch((error) => {
                    console.error(error);
                });
        });

    }

    insertDataHistoryWeeklyInBaseRowLine(lengthHistoy, indexHistory, objetSymbolHistoy) {
        connection.query('INSERT INTO history_weekly (id_stock,close,date) VALUES("' + this.indexSymbol + '","' + objetSymbolHistoy[indexHistory].close + '","' + objetSymbolHistoy[indexHistory].date + '")', (err, result) => {
            console.log(`this.indexSymbol: ${this.indexSymbol}: err: ${err} `);

            if (indexHistory === lengthHistoy - 1) {
                if (this.indexSymbol === this.nbresults)
                    return;

                this.indexSymbol++;
                this.insertDataHistoryWeeklyInBaseRow(this.tabNasdaq[this.indexSymbol]);
                return;
            }

            indexHistory++;
            this.insertDataHistoryWeeklyInBaseRowLine(lengthHistoy, indexHistory, objetSymbolHistoy);
        });
    }



    insertDataHistorymonthlyInBaseRow() {
        let urlKeyStats = "https://api.iextrading.com/1.0/stock/" + this.tabNasdaq[this.indexNb].symbol + "/chart/5y?chartInterval=20";
        fetch(urlKeyStats).then(response => {
            response
                .json()
                .then(j => {
                    //  console.log(this.tabNasdaq[this.indexNb].symbol);

                    this.lengthHistoryValues = j.length;
                    this.indexHistoryValues = 0;

                    this.insertDataHistorymonthlyInBaseRowLine(this.lengthHistoryValues, this.indexHistoryValues, j);
                })
                .catch((error) => {
                    console.error(error);
                });
        });

    }

    insertDataHistorymonthlyInBaseRowLine(lengthHistoy, indexHistory, objetSymbolHistoy) {
        connection.query('INSERT INTO history_monthly (id_stock,close,date) VALUES("' + this.indexSymbol + '","' + objetSymbolHistoy[indexHistory].close + '","' + objetSymbolHistoy[indexHistory].date + '")', (err, result) => {
            console.log(`this.indexSymbol: ${this.indexSymbol}: err: ${err} `);

            if (indexHistory === lengthHistoy - 1) {
                if (this.indexSymbol === this.nbresults)
                    return;

                this.indexSymbol++;
                this.insertDataHistorymonthlyInBaseRow(this.tabNasdaq[this.indexSymbol]);
                return;
            }

            indexHistory++;
            this.insertDataHistorymonthlyInBaseRowLine(lengthHistoy, indexHistory, objetSymbolHistoy);
        });
    }

    insertDataKeyStatsInBaseRow() {

        let urlKeyStats = "https://api.iextrading.com/1.0/stock/" + this.tabNasdaq[this.indexNb].symbol + "/stats/";
        fetch(urlKeyStats).then(response => {
            response
                .json()
                .then(j => {
                    //  console.log(j); Yay, `j` is a JavaScript object console.log(j);

                    connection.query('INSERT INTO keyStats (peRatioHigh,peRatioLow,profitMargin,week52high,week52low,w' +
                        'eek52change,shortDate,priceToBook,dividendYield,EBITDA,revenue,grossProfit,cash,' +
                        'priceToSales,dividendRate,institutionPercent,insiderPercent,month1ChangePercent,' +
                        'day5ChangePercent,shortRatio,year5ChangePercent,year2ChangePercent,year1ChangePe' +
                        'rcent,ytdChangePercent,month6ChangePercent,month3ChangePercent,marketcap,symbol)' +
                        ' VALUES("' + j.peRatioHigh + '","' + j.peRatioLow + '","' + j.profitMargin + '","' + j.week52high + '","' + j.week52low + '","' + j.week52change + '","' + j.shortDate + '","' + j.priceToBook + '","' + j.dividendYield + '","' + j.EBITDA + '","' + j.revenue + '","' + j.grossProfit + '","' + j.cash + '","' + j.priceToSales + '","' + j.dividendRate + '","' + j.institutionPercent + '","' + j.insiderPercent + '","' + j.month1ChangePercent + '","' + j.day5ChangePercent + '","' + j.shortRatio + '","' + j.year5ChangePercent + '","' + j.year2ChangePercent + '","' + j.year1ChangePercent + '","' + j.ytdChangePercent + '","' + j.month6ChangePercent + '","' + j.month3ChangePercent + '", "' + j.marketcap + '", "' + j.symbol + '")', (err, result) => {
                            console.log(`this.indexNb: ${this.indexNb}: err: ${err} symbol:${this.tabNasdaq[this.indexNb].symbol}`);
                            this.indexNb++;
                            // console.log(this.indexNb);
                            if (this.indexNb === this.nbresults - 1)
                            //if (this.indexNb === 20)
                                return;

                            //  setTimeout(() => {
                            this.insertDataInBaseRow(this.tabNasdaq[this.indexNb]);
                            // }, 20);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        });

    }
}

// Import socket.io with a connection to a channel (i.e. tops)
/*const socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/stock/'+JsonNasdaq[i]['symbol']+'/stats');

// Listen to the channel's messages
socket.on('message', message => console.log(message))

// Connect to the channel
socket.on('connect', () => {

  // Subscribe to topics (i.e. appl,fb,aig+)
  socket.emit('subscribe', 'snap,fb,aig+')

  // Unsubscribe from topics (i.e. aig+)
  socket.emit('unsubscribe', 'aig+')
})*/

// Disconnect from the channel socket.on('disconnect', () =>
// console.log('Disconnected.'))

/*for (let i in JsonNasdaq) {
    let urlDiv = "https://api.iextrading.com/1.0/stock/"+JsonNasdaq[i]["symbol"]+"/dividends/5y";

    /*connection.query('INSERT INTO dividends (amount,exDate,paymentDate,qualified,recordDate,type) VALUES("'+bourseM.name+'","'+bourseM.symbol+'")', (err, result) => {});*/
//}

/*
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})*/

/*app.get('/ping', function(req, res) {
    return res.send('pong');
});*/

/*const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function(req, res) {
    return res.send('pong');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);*/

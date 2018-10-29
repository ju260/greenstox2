require('dotenv').load();
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET users listing. req.body.ebitda  */
router.get('/', function (req, res, next) {
    // var connection = mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'root',
    //     database: 'greenstock',
    //     port: '8889',
    //     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    // });
    console.log(process.env.REACT_APP_DB_USER)
    
    var connection = mysql.createConnection({
        host: process.env.REACT_APP_DB_HOST,
        user: process.env.REACT_APP_DB_USER,
        password: process.env.REACT_APP_DB_PASS,
        database: process.env.REACT_APP_DB_NAME,
        port: process.env.REACT_APP_DB_PORT,
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    });

    res.send('respond detail with a resource');
});

router.post('/', function (req, res, next) {
   
    var connection = mysql.createConnection({
        host: process.env.REACT_APP_DB_HOST,
        user: process.env.REACT_APP_DB_USER,
        password: process.env.REACT_APP_DB_PASS,
        database: process.env.REACT_APP_DB_NAME,
        port: process.env.REACT_APP_DB_PORT,
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    });

    connection.connect((err) => {
        if (err)
            throw err;
        console.log('Connected detailStock !');

    });
    console.log('symbol');
    // var symbol = req.body.symbol ? req.body.symbol : 0;
    // console.log('symbol'+symbol);

    // connection.query(`select per.symbol,per.perRatio,stocks_nasdaq.name,keyStats.dividendYield
    // from per 
    // inner join stocks_nasdaq 
    // on per.symbol = stocks_nasdaq.symbol 
    // and per.perRatio > ${perMin} and per.perRatio < ${perMax}
    // inner join keyStats 
    // on keyStats.symbol = per.symbol 
    // and keyStats.dividendYield > ${req.body.dividendYiel}`, function (error, results, fields) {
    //     if (error) throw error;
    //     //  console.log(results);
    //     res.send(JSON.stringify(results));
    // });

});

module.exports = router;
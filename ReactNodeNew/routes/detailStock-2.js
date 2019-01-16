require('dotenv').load();
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET users listing. req.body.ebitda  */
router.get('/:id', function (req, res, next) {
    console.log('ee1');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'greenstock',
        port: '8889',
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    });
    // var connection = mysql.createConnection({
    //     host: process.env.REACT_APP_DB_HOST,
    //     user: process.env.REACT_APP_DB_USER,
    //     password: process.env.REACT_APP_DB_PASS,
    //     database: process.env.REACT_APP_DB_NAME,
    //     port: process.env.REACT_APP_DB_PORT,
    //     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    // });

    res.send('respond detail with a resource');
});

router.post('/:id', function (req, res, next) {
   
    // var connection = mysql.createConnection({
    //     host: process.env.REACT_APP_DB_HOST,
    //     user: process.env.REACT_APP_DB_USER,
    //     password: process.env.REACT_APP_DB_PASS,
    //     database: process.env.REACT_APP_DB_NAME,
    //     port: process.env.REACT_APP_DB_PORT,
    //     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    // });
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
        console.log('Connected detailStock !');

    });
   // console.log("stockId"+req.body.stockId);
    const stockId = req.body.stockId ? req.body.stockId : 0;
    //console.log('symbol    '+stockId);

    connection.query(`select stocks_nasdaq.name, history_dayly.marketAverage from stocks_nasdaq,history_dayly
    where stocks_nasdaq.symbol = "${stockId}"`, function (error, results, fields) {
        if (error) throw error;
          console.log("detail 2    "+results);
        res.send(JSON.stringify(results));
    });

});

module.exports = router;
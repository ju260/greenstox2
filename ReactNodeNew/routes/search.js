var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET users listing. req.body.ebitda  */
router.get('/', function (req, res, next) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'greenstock',
        port: '8889',
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    });
    res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
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
        console.log('Connected search 2!');

    });
    var perMin = 0,
        perMax = 99999;
    if (req.body.per === "1") {
        perMax = 10;
    } else if (req.body.per === "2") {
        perMin = 10;
        perMax = 17;
    } else if (req.body.per === "3") {
        perMin = 17;
        perMax = 25;
    } else if (req.body.per === "4") {
        perMin = 25;
    }
    console.log(`perMin: ${perMin}      perMax: ${perMax} `);
    console.log(`dividendYield: ${req.body.dividendYiel}`)
    console.log(req.body.per);

    connection.query(`select per.symbol,perRatio,stocks_nasdaq.name,keyStats.dividendRate from per inner join stocks_nasdaq on per.symbol = stocks_nasdaq.symbol and perRatio > ${perMin} and perRatio < ${perMax} join keyStats on keyStats.symbol = stocks_nasdaq.symbol and keyStats.dividendRate > ${req.body.dividendYiel}`, function (error, results, fields) {
        if (error) throw error;
        //  console.log(results);
        res.send(JSON.stringify(results));
    });

});

// router.get('/', function (req, res, next) {

//     var connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: 'greenstock',
//         port: '8889',
//         socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
//     });

//     connection.connect((err) => {
//         if (err)
//             throw err;
//         console.log('Connected search!');
//     });

//     // connection.query('SELECT `symbol` FROM `stocks_nasdaq` WHERE 1', (err, result) => {
//     //     console.log(result);
//     //     res.send(JSON.stringify(result));
//     //   });



//     connection.end();
//     /* connection.query('SELECT `symbol` FROM `keyStats` WHERE 1', (err, result) => {
//     console.log(result)
// });*/
//     /*res.locals.connection.query(`SELECT * from keyStats `, function(error, results, fields) {
//         if (error) throw error;
//         res.send(JSON.stringify(results));
//     });*/
// });

module.exports = router;
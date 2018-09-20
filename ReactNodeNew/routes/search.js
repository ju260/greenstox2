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

    connection.connect((err) => {
        if (err)
            throw err;
        console.log('Connected search!');
    });

    connection.query('SELECT `symbol` FROM `stocks_nasdaq` WHERE 1', (err, result) => {
        console.log(result);
        res.send(JSON.stringify(result));
      });

    connection.end();
    /* connection.query('SELECT `symbol` FROM `keyStats` WHERE 1', (err, result) => {
    console.log(result)
});*/
    /*res.locals.connection.query(`SELECT * from keyStats `, function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });*/
});

module.exports = router;
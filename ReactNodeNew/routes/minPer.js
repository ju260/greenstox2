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
        console.log('Connected search 2!');
    });

    connection.query('SELECT min(`perRatio`) FROM `per` where `perRatio` != -999999 ', (err, result) => {
        console.log(result);
        res.send(result);
      });

    connection.end();
   
});

module.exports = router;
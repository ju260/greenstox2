var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const helper = require('../helpers/connectBDD');

router.get('/', function (req, res, next) {

    const connection = helper();

    connection.query('SELECT MAX(`dividendYield`) FROM `keyStats`', (err, result) => {
        console.log(result);
        res.send(result);
      });

    connection.end();
   
});

module.exports = router;
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const helper = require('../helpers/connectBDD');


/* GET users listing. req.body.ebitda  */

router.get('/', function (req, res, next) {

    const connection = helper();

    connection.query('SELECT min(`perRatio`) FROM `per` where `perRatio` != -999999 ', (err, result) => {
        console.log(result);
        res.send(result);
      });

    connection.end();
   
});

module.exports = router;
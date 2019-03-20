require('dotenv').load();
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const helper = require('../helpers/connectBDD');

/* GET users listing. req.body.ebitda  */
router.get('/:id', function (req, res, next) {
    const connection = helper();
    res.send('respond detail with a resource');
});

router.post('/:id', function (req, res, next) {
   
    const connection = helper();
    const stockId = req.body.stockId ? req.body.stockId : 0;

    connection.query(`select history_monthly.close, history_monthly.date from history_monthly
    where history_monthly.symbol = "${stockId}"`, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });

});

module.exports = router;
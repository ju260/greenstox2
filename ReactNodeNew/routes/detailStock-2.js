require('dotenv').load();
var express = require('express');
var router = express.Router();
const helper = require('../helpers/connectBDD');

/* GET users listing. req.body.ebitda  */
router.get('/:id', function (req, res, next) {
    const connection = helper();
    res.send('respond detail with a resource');
});

router.post('/:id', function (req, res, next) {
   
    const connection = helper();
    const stockId = req.body.stockId ? req.body.stockId : 0;

    connection.query(`select stocks_nasdaq.name, history_dayly.lastPrice,history_dayly.variation, history_dayly.date from history_dayly inner join stocks_nasdaq
    on history_dayly.symbol = stocks_nasdaq.symbol
    and history_dayly.symbol = "${stockId}"`, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });

});

module.exports = router;
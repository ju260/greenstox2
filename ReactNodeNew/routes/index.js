var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function (req, res, next) {
  //console.log('res'+res);
  res.render('index', { title: 'Express' });
  var connection = mysql.createConnection({
    host: 'localhost', user: 'root', password: 'root', database: 'greenstock', port: '8889', socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  });

  connection.connect((err) => {
    if (err)
      throw err;
    console.log('Connected!');
  });

  connection.query('SELECT `symbol` FROM `stocks_nasdaq` WHERE 1', (err, result) => {
    console.log(result)
  });

  connection.end();


});

module.exports = router;

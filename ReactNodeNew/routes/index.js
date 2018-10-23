var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function (req, res, next) {
  //console.log('res'+res);
  res.render('index', { title: 'Express' });
  // 
  var connection = mysql.createConnection({
    //host: 'julienlellgreen.mysql.db',
    host: 'www.greenstox.fr',
    user: 'jlc',
    password: 'Juju_1981',
    database: 'greenstock',
    port: '8889'
    //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

socket.on('error', console.error);

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

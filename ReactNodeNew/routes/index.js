var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function (req, res, next) {
  //console.log('res'+res);
  res.render('index', { title: 'Express' });
  // 


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

var express = require('express');
var app = express();
var pessoa = require('./pessoa/pessoa');
var login = require('./login/login');
var menu = require('./menu/menu');
var users = require('./users/users');
var veiculo = require('./veiculo/veiculo');


app.all('*', function(req, res, next) {
       res.header('Access-Control-Allow-Origin', '*');
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       res.set('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
       next();
});

app.get('/', function (req, res) {
  res.send('get!');
});

app.post('/', function (req, res) {
  console.log(req.body);
  res.send("raiz");
  });

app.use('/pessoa',pessoa);
app.use('/login',login);
app.use('/menu',menu);
app.use('/users',users);
app.use('/veiculo',veiculo);

app.listen(3000, function () {
  console.log('App PMLS backend running on port 3000!');
});
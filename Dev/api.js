const express = require ('express'); // We want to have all our endpoints built out by ExpressJS
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const BrenCoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// First Endpoint
app.get('/blockchain', function(req, res){
  res.send(BrenCoin);
});

//Second Endpoint
app.post('/transaction', function(req, res){
  console.log(req.body);
  res.send(`The amount of the transaction is ${req.body.amount} Bitcoin`);
});

//Third Endpoint
app.get('/mine', function(req, res){
  
});
// So we know that the port is listening of pass data.
app.listen(3000, function(){
  console.log('Listening on port 3000');
});

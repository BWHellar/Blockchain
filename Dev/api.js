const express = require ('express'); // We want to have all our endpoints built out by ExpressJS
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const BrenCoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// First Endpoint
// We dont need much to send our named hash
app.get('/blockchain', function(req, res){
  res.send(BrenCoin);
});

//Second Endpoint
app.post('/transaction', function(req, res){
  const blockIndex = BrenCoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  res.json({ note: `Transaction will be added in block ${blockIndex}`});
});

//Third Endpoint
app.get('/mine', function(req, res){
  const newBlock = BrenCoin.createNewBlock();
});
// So we know that the port is listening of pass data.
app.listen(3000, function(){
  console.log('Listening on port 3000');
});

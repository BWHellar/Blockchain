const express = require ('express'); // We want to have all our endpoints built out by ExpressJS
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require ('uuid/v1');

const nodeAddress = uuid().split('-').join('');

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
  const lastBlock = BrenCoin.getLastBlock();
  const previousBlockHash = lastBlock ['hash'];
  const currentBlockData = {
    // This will comprise our current block data.
    transactions: BrenCoin.pendingTransactions,
    index: lastBlock['index'] + 1
  };
  // In order to get our nonce we need to invoke the proofOfWork to give us the correct nonce value.
  const nonce = BrenCoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = BrenCoin.hashBlock(previousBlockHash, currentBlockData, nonce);
  // We want to reward people for mining a new node.
  BrenCoin.createNewTransaction(13, "00", nodeAddress);
  
  // This will allow our Blockchain to mine new blocks based off previous data.
  const newBlock = BrenCoin.createNewBlock(nonce, previousBlockHash, currentBlockData);
  res.json({
    note: "Success",
    block: newBlock
  })
});
// So we know that the port is listening of pass data.
app.listen(3000, function(){
  console.log('Listening on port 3000');
});

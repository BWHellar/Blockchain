const sha256 = require('sha256');

function Blockchain() {  // Since we are using JS we wont use a class.
  this.chain = []; // For mined chains.
  this.pendingTransactions= []; // All new transactions before mining.

  this.createNewBlock(911, '0', '0');
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
  const newBlock = { // This is a new block in the chain. Every black in the chain will have this info.
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce:nonce, //A number that comes from a proof of work.
    hash: hash, // This will be the data from the new block.
    previousBlockHash: previousBlockHash // This is to compare the hashes.
  };
  
  this.pendingTransactions = []; // This allows us to clear for the next block.
  this.chain.push(newBlock);  // This allows for pending blocks to stay pending until a new block is created so they will be able to push after.
  
  return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length -1];
}
  
  Blockchain.prototype.createNewTransaction = function (amount, sender, recipient){
    const newTransactions = {
      amount: amount, 
      sender: sender,
      recipient: recipient
    }; // These will be pending transactions. 
    this.pendingTransactions.push(newTransactions); // We want to push the new transactions into the array.
    
    return this.getLastBlock()['index'] + 1;//This is the index of the last block in our chain.
  }

  
  Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){ //We want to pass in block data and in return get a fixed length string 
    //Utilizing SHA256 hashing
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    // We want to turn our information into a string and turn it into a sha256 hash
    return hash;
  }
  
  Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){  // This function is important to prevent fraud.
    // Will constantly hash the blocks until it finds the right hash.
    // Uses current and previous block hash.
    // Continues to chance nonce until correct hash.
    // Returns the nonce that creates the hash.
    
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0,4) !== '0000') { // We want to keep running our chain until our hash begings with the specifications we set forth.
      nonce++; // This takes a lot of computing power in order to validate the hash.
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    // console.log(hash);  // As an example this will show every hash that has been burned through before it reaches the hash we want.
    }
    
    return nonce;
  }



module.exports = Blockchain;
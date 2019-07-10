var express = require ('express') // We want to have all our endpoints built out by ExpressJS
var app = express()

app.get('/', function (req, res){
  res.send('Hello Bruh')
})

app.listen(3000)
import express from "express";
import morgan from "morgan";
 
var app = express()

const port = 4242;

app.use(morgan('combined'))
 
app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(port, function(err){
    if(err) {
        throw err;
    }
    else {
        console.log('Server running on port ' + port);
    }
});
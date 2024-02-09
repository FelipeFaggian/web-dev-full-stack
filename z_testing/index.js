import express from "express";
import bodyParser from "body-parser";

const app = express();
port = 8080;

app.get('/', function(req, res) {

});

app.listen(port, function(err){
    if(err) {
        throw err;
    }
    else {
        console.log('Server running on port ' + port);
    }
});
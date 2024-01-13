import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
    root: path.join(__dirname)
};

var jsonParser = bodyParser.json();
var urlencondedParser = bodyParser.urlencoded({extended: true});
var fileIndex = 'index.html';
var fileSubmit = 'submit.html';

app.get('/' , function(req, res){    
        res.sendFile(fileIndex, options, function(err) {      
        if(err) throw err;
        console.log("Page open: ", fileIndex);
    });
});
app.get('/index.html', function(req, res){    
        res.sendFile(fileIndex, options, function(err) {      
        if(err) throw err;
        console.log("Page open: ", fileIndex);
    });
});

app.post('/submit', urlencondedParser, function(req, res) {
    console.log("The user's name is: ", req.body.formName);
    res.status(200);
    res.sendFile(fileSubmit, options, function(err) {      
    if(err) throw err;
    console.log("Page open: ", fileSubmit);
    });
});

app.listen(port, function(err) {
    if(err) throw err;
    console.log(`Server running on port ${port}.`);
});
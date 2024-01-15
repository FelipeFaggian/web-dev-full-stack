//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const fileIndex = '/public/index.html'
const fileSecret = '/public/secret.html'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
    root: path.join(__dirname)
}
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: true});

app.get('/', function(req, res){
    res.status(200);
    res.sendFile(fileIndex, options, function(err){
        if(err) throw err;
        console.log('File " ' + fileIndex + ' " open!');
    });
});

app.post('/check', urlencodedParser, function(req, res) {
    console.log('Input typed: ', req.body.password);
    res.status(200);
    if (req.body.password === 'ILoveProgramming') {
        res.sendFile(fileSecret, options, function(err){
            if(err) throw err;
            console.log('File " ', fileSecret, ' " open!');
        });
    } else {
        res.sendFile(fileIndex, options, function(err){
            if(err) throw err;
            console.log('File " ' + fileIndex + ' " open!');
        });
    }
});

app.listen(port, function(err) {
    if(err) throw err;
    console.log(`Server running on port ${port}.`);
});
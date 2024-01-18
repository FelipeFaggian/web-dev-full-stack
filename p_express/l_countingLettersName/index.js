import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true});
const app = express();
const port = 3000;
const ejsFile = '/views/index.ejs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
    root: path.join(__dirname)
};

app.get('/', function(req, res) {
    res.render('index.ejs', { title: 'Type your name below.' });
});

app.post('/submit', urlencodedParser, function(req, res){
    var stringFName = req.body.fName;
    var stringLName = req.body.lName;
    console.log('First Name: ', stringFName);
    console.log('Last Name: ', stringLName);
    var countFName = stringFName.trim().length;
    var countLName = stringLName.trim().length;
    res.render('index.ejs',
    { title: "Your name have " + (countFName + countLName) + " letters!"});
});

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server running on port ${port}`);
});
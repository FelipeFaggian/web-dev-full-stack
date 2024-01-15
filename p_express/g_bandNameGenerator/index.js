import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const fileIndex = 'index.html';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
    root: path.join(__dirname)
}
const jsonParser = bodyParser.json();
const urlencondedParser = bodyParser.urlencoded({ extended: true });

app.get('/', function(req, res){
    res.status(200);
    res.sendFile(fileIndex, options, function(err){
        if(err) throw err;
        console.log('File ' + fileIndex + ' opened.');
    });
});

app.post('/submit', urlencondedParser, function(req, res){
    res.status(200);
    console.log('Input form street: ', req.body.street);
    console.log('Input form pet: ', req.body.pet);
    res.setHeader("Content-Type", "text/html");
    res.send(
        "<h1> Your band name is... <h1/> <br/>" +
        "<h2> ' " + req.body.street + req.body.pet + " '<h2/> <br/>" +
        "<h3> It sounds really good! <h3/> <br/>" +
        "<a href='/'><button>Try again!</button></a>"
        );
});

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server running on port ${port}.`);
});

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/', function(req, res){
    res.render('home', { name: ' from JS to EJS!' });
});

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server running on port ${port}.`);
});
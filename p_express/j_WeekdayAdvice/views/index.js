import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const d = new Date();

let day = d.getDay();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

console.log('Day number: ', day);
app.get('/', function(req, res){
    if(day === 0 || day === 6) {
        res.render('home', { someDay: "weekend! It's time to have fun!"});
    } else {
        res.render('home', { someDay: "weekday! It's time to work hard!" });
    }
});

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server running on port ${port}.`);
});
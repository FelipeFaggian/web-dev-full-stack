import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'views/public/images')));

app.get('/', function(req, res) {
    res.render("index.html");
});

app.listen(port, function(err){
    if(err) {
        throw err;
    }
    else {
        console.log('Server running on port ' + port);
    }
});
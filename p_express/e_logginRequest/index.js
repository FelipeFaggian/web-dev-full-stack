import express from 'express';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import moment from 'moment-timezone';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
const options = {
    root: path.join(__dirname)
}

var fileIndex = 'index.html';
var streamAccessLog = fs.createWriteStream(path.join(__dirname, fileIndex), { flags: 'a' });

morgan.token('date', (req, res, tz) => {
    return moment().tz(tz).format();
});
//morgan.format('myFormat', '<br/> TIME: [:date[America/Sao_Paulo]] <br/> METHOD: :method <br/> URL: :url <br/> STATUS: :status <br/> USER: :user-agent <br/> PING: :response-time ms <br/><br/>');
morgan.format('myFormat', '<br/><br/>TIME: [:date[America/Sao_Paulo]] <br/> USER: :user-agent <br/><br/> Yup, we know. <br/><br/>');

app.use(morgan('myFormat'));
app.use(morgan('myFormat', { stream: streamAccessLog } ));
app.get('/', function(req, res){
    res.sendFile(fileIndex, options, function(err){
        if(err) throw err;
        console.log('Page open: ', fileIndex);
    });
});
app.get('/index.html', function(req, res){
    res.sendFile(fileIndex, options, function(err){
        if(err) throw err;
        console.log('Page open: ', fileIndex);
    });
});

app.listen(port, function(){
    console.log(`Server running on port ${port}.`);
});

/*
note: axios debug log is an package about loggin for client side. But, the same informations
can be displayed to your users in with intuitive formats just putting some predefined comands
on index.js like /DateTimeZone() or user-agent.navigator()/ to index.html just puttig the
innerHtml function to this comunication.
*/
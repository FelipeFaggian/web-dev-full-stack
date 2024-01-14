import express from 'express';

const app = express();
const port = 3000;
const logger = function(req, res, next) {
    console.log('Method: ', req.method, ' - URL: ', req.url);
    next();
    }

app.use(logger);

app.get('/', function(req, res){
    res.status(200);
    res.send('OK');
});

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server running on port ${port}.`);
});

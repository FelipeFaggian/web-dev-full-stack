import http from "http";
import url from "url";
import fs from "fs";

const port = 3000;

var intirePath = url.parse(req.url, true); 
var fileName = "." + intirePath.pathname;

http.createServer(function(req, res) {
    fs.readFile(fileName, function(err, data) {
        if (err) throw err;   
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(port, () => {
    console.log(`The server is running on port ${port}!`);
});

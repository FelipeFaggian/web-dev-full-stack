// import express from 'express';
// import { fileURLToPath } from 'url';
// import path from 'path';

// const app = express();
// const port = 3000;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const indexEjsFile = 'views/index.ejs'

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.get('/', function(req, res) {
//     const options = {
//         root: path.join(__dirname)
//     }
//     res.sendFile(indexEjsFile, options, function(err){
//         if (err) throw err;
//         console.log('sending?');
//     });  
// });


// app.listen(port, function(err){
//     if(err) throw err;
//     console.log(`Server running on port ${3000}.`);
// });


// Node.js program to demonstrate the  
// fs.createWriteStream() method  
  
// Include fs module  

import axios from 'axios';
import qs from 'qs';
import express from "express";
import bodyParser from "body-parser";
import { truncateSync, write, writeFileSync } from 'fs';
import fs from 'fs';
import { error } from "console";

const app = express();
const port = 8080;

//post
// var data = qs.stringify({
//   'text': 'Iamonthemoonandthereisnowheretogetabeer. Thereisnospacebar.',
//   'type': 'Science' 
// });

// var config = {
//   method: 'post',
// maxBodyLength: Infinity,
//   url: 'http://localhost:3000/jokes',
//   headers: { },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error.message);
// });

// //get
// var config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     url: 'http://localhost:3000/jokes/101',
//     headers: { }
//   };
  
//   axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error.message);
//   });

// //put
// var data = qs.stringify({
//     'text': 'Why did the scarecrow win a prize? Because he was outstanding in his field.',
//     'type': 'Science' 
//   });
//   var config = {
//     method: 'put',
//   maxBodyLength: Infinity,
//     url: 'http://localhost:3000/jokes/2',
//     headers: { },
//     data : data
//   };
  
//   axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error.message);
//   });

// //patch
// var data = qs.stringify({
//     'type': 'Agriculture' 
//   });
//   var config = {
//     method: 'patch',
//   maxBodyLength: Infinity,
//     url: 'http://localhost:3000/jokes/100',
//     headers: { },
//     data : data
//   };
  
//   axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error.message);
// });

//deleteALL
// var data = qs.stringify({
//     'key':'4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT'
//     });
// var config = {
//     method: 'delete',
//     maxBodyLength: Infinity,
//     url: 'http://localhost:3000/all',
//     headers: { 
//         "Authorization": "Basic " + '4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT'
//     },
//     data: data
//   };
  
//   axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error.message);
//   });

//server
app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);
  }); 
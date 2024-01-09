/* 
1. Use the inquirer npm package to get user input. (OK)
2. Use the qr-image npm package to turn the user entered URL into a QR code image. (OK)
3. Create a txt file to save the user input using the native fs node module.
Task done!
*/

import userInput from "@inquirer/input";

const answer = await userInput({message:
     "Please, type a link starting with 'www...' (for example -> www.google.com): "});
const fullLink = ("https://" + answer);

import qrCode from "qrcode";
qrCode.toFile("./qr_img.png", fullLink, {
    color: {
        dark: '#FFFFFF',
        light: '#0000'
    }
}, function(err) {
    if (err) throw err;
    console.log("Done!");
})

import fs from "fs";
fs.appendFile('inputUser.txt', fullLink, function(err){
    if(err) throw err;
    console.log('Input file saved!');
});


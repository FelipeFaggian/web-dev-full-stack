const fs = require("fs");

/*fs.writeFile("message.txt", "Hello from Node!", function(err){
    if(err) {
        console.log(err);
    }
    else {
        console.log("File written successfully!");
        console.log("The content is: ");
        console.log(fs.readFileSync("message.txt", "utf-8"));
    } 
});*/

let message = fs.readFileSync("message.txt", "utf-8");
console.log("The message is: " + message);
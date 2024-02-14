// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

// 2. Create an express app and set the port number.
const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var cleanedData;
var cleanedSecret;
var cleanedUser;
// 3. Use the public folder for static files.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('Config ejs...');
app.use(express.static(path.join(__dirname, 'public')));
console.log('Config css...');
// 4. When the user goes to the home page it should render the index.ejs file.
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get('/', async function(req, res) {
    console.log("Inside getBlock! Try or Catch?");
    try {
        console.log("Inside Try Block!");
        const response = await axios.get('https://secrets-api.appbrewery.com/random');
        const result = response.data;
        cleanedData = JSON.stringify(Object.values(result));
        console.log("Your cleanedData's values is: " + cleanedData);
        cleanedData = JSON.stringify(Object.keys(result));
        console.log("Your cleanedData's keys is: " + cleanedData);
        cleanedSecret = JSON.stringify(result.secret);
        console.log("Your random cleanedScret is: " + cleanedSecret );
        cleanedUser = JSON.stringify(result.username);
        console.log("Your cleanedUser is: " + cleanedUser);
    } catch (error) {
        console.log("Inside Catch Block! " + error.message);
    }
    console.log("Rendering the page...");
    res.render('index.ejs', { secret: cleanedSecret, user: cleanedUser });
});

// 6. Listen on your predefined port and start the server.
app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Write your code here:
Step 1: Render the home page "/" index.ejs */

app.get('/', function(req, res){
  res.render('index.ejs');
});

/* Step 2: Make sure that static files are linked to and the CSS shows up. */

app.use(express.static(path.join(__dirname, 'public')));

/*Step 3: Add the routes to handle the render of the about and contact pages.
Hint: Check the nav bar in the header.ejs to see the button hrefs*/

app.get('/about', function(req, res){
  res.render('about.ejs');
});

app.get('/contact', function(req, res){
  res.render('contact.ejs');
});

/*Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

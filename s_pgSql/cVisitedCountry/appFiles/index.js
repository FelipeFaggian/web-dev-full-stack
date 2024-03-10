import express from "express";
import bodyParser from "body-parser";
import utf8 from 'utf8';

const app = express();
const port = 3000;

var visitedCountries = [];

let completeClean;
let error = undefined;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//connectSql
import pg from 'pg';
const Client = new pg.Client ({
  user: 'postgres',
  password: 'Halloween200!',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'world'
});

Client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

app.get("/", async (req, res) => {
  
  await Client.query(`SELECT code_country FROM visited_country;`)
  .then(results => {
    const result = results.rows;
    visitedCountries = result;     
    console.log("Get block! The value of visitedCountries's array is: ", visitedCountries);
    console.log("The length of visitedCountries is: ", visitedCountries.length);
    for (var i = 0; i<visitedCountries.length; i++) {
      visitedCountries[i] = JSON.stringify(visitedCountries[i]);
      visitedCountries[i] = visitedCountries[i].replace('{"code_country":"','');
      // console.log("visitedCountries[i] lost her code key? -> ", visitedCountries[i]);
      visitedCountries[i] = visitedCountries[i].replace('"}','');
      // console.log("We clean all the visitedCountries[i]? => ", visitedCountries[i]);
    };
    console.log("The array visitedCountries sended to index.ejs is: ", visitedCountries);
    res.render("index.ejs", { countries: visitedCountries, total: visitedCountries.length,
    error: error });
  });
});

app.post("/add", async (req, res) => {
  let countryTyped = req.body.country.trim();
  let correctTyped = countryTyped.charAt(0).toUpperCase() + countryTyped.slice(1);
  console.log("The countryTyped value is: " + correctTyped);

  Client.query(`SELECT code FROM code_country WHERE name = '${correctTyped}'`)
  .then(results => {
      const result = results.rows;
      var stringResult = JSON.stringify(result);
      var cleanedResult = stringResult.replace('[{"code":"', "");
      completeClean = cleanedResult.replace('"}]',''); 
      console.log("The value of completeClean is: ", completeClean);

      Client.query(`SELECT * FROM visited_country;`)
      .then(results => {
        const result = results.rows;
        visitedCountries = result;
        let countryRegistered = false;
        let countryInvalid = false;
        error = undefined;
        console.log("The visitedCountry's value on post's block is: ", visitedCountries);
        console.log("Starting For loop for verify country typed....");
        if (completeClean == '[]' || completeClean == null || completeClean == undefined) {
          countryInvalid = true;
          error = "The country typed is invalid! Please, type again.";
          console.log("The country typed is invalid!");
        } else {
        };
        console.log("The value of completeClean on For verify is: ", completeClean);
        for(var i = 0; i<visitedCountries.length; i++) {         
          console.log("The value of currentyle visitedCoutry position is: ",
          visitedCountries[i].code_country);
          if(visitedCountries[i].code_country.includes(completeClean)) {
            countryRegistered = true;
            error = "The country typed was already visited! Please, type again."
            console.log("The country typed was already registered!");
            i = visitedCountries.length + 1;
          } else {
        
          }
        }; 
        if (countryRegistered == true || countryInvalid == true) {
          console.log("Your typed country is was NOT registered on database!");
        } else {
          console.log("Uhuuu! A new country was discovered! Sending to database...");
          Client.query(`INSERT INTO visited_country (code_country) VALUES ('${completeClean}');`);
        }
      });
      res.redirect('/');
  });
  // .finally(() => Client.end()); 
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

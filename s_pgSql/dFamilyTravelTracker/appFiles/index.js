import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
let error = undefined;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Halloween200!",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisited() {
  const result = await db.query(
    `SELECT country FROM discovered_country WHERE id_traveler=${currentUserId};`
    );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country);
  });
  return countries;
};

async function checkUser() {
  const result = await db.query(
    `SELECT * FROM traveler;`
    );
  let users = [];
  result.rows.forEach((user) => {
    users.push(user);
  });
  return users;
};

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  const users = await checkUser();
  let positionId = undefined;
  console.log("The currentUserId on GETblock is: ", currentUserId);
  console.log("The users's value on GETblock is: ", users);
  for(var i=0; i<users.length; i++) {
    if(users[i].id == currentUserId) {
      console.log("Users's position on array finded on GETblock!");
      positionId = users[i];
       // console.log("The value of position Id is: ", positionId);
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: positionId.color,
        error: error
      });
    } else {

    }
  };
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  let countryTyped = input.trim();
  let correctTyped = countryTyped.charAt(0).toUpperCase() + countryTyped.slice(1);
  error = undefined;
  let alreadyVisited = false;
  try {
    const result = await db.query(
      "SELECT code FROM code_country WHERE LOWER(name) LIKE '%' || $1 || '%';",
      [correctTyped.toLowerCase()]
    );
    const data = result.rows[0];
    console.log("The data value from the input typed is: ", data);

    if (data == undefined) {
        console.log("The typed value is invalid! Please, try again.");
        error = "The typed country is invalid! Please, try again.";
    } else {
      const countryCode = data.code;
      console.log("The countryCode requested value is: ", countryCode);
      console.log("Starting checker loop....");
      const countries = await checkVisited();
      console.log("The value of countries is: ", countries);
   
    for (var i = 0; i<countries.length; i++) {
      if (countries[i] == countryCode ) {
        alreadyVisited = true;
        console.log("The country typed was already visited! Please, try again.");
        error = "The country typed was already visited! Please, try again.";
      } else {

      }
    };
    if (alreadyVisited == true) {
      console.log("The country typed will not enter on database! It is duplicated!");
    } else {
      console.log("Inserting user's country on database...");
      try {
        await db.query(
          "INSERT INTO discovered_country (country, id_traveler) VALUES ($1, $2)",
          [countryCode, currentUserId]
        );
        console.log("The currentUserId to discover a country is: ", currentUserId);
      } catch (err) {
        console.log(err);
      }
    }
      
    };
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});
app.post("/user", async (req, res) => {
  let newUser = req.body.add;
  if (newUser !== undefined) {
    res.render('new.ejs');
  } else {
    currentUserId = req.body.user;
    console.log("The currentUserId on POSTblock is: ", currentUserId);
    res.redirect('/');
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  let newName = req.body.name;
  let newColor = req.body.color;
  try {
    await db.query(
      "INSERT INTO traveler (name, color) VALUES ($1, $2)",
      [newName, newColor]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

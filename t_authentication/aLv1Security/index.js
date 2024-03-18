import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Halloween200!",
  port: 5432,
});
db.connect(
  console.log("Database connected!")
);


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  let usernameRegister = req.body.username;
  let passwordRegister = req.body.password;
  console.log("The usernameRegister is: ", usernameRegister);
  console.log("The passwordRegister is: ", passwordRegister);
  let successRegister = false;
  try {
    await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [usernameRegister, passwordRegister]
    );
    console.log("A new user was registered!");
    successRegister = true;
  } catch (err) {
    console.log(err);
  }
  if (successRegister == true) {
    res.render('secrets.ejs');
  } else {
    res.redirect('/register');
  }
});

async function checkUser() {
  const result = await db.query(
    `SELECT * FROM users ORDER BY id ASC;`
    );
  let databaseUsers = [];
  result.rows.forEach((user) => {
    databaseUsers.push(user);
  });
  return databaseUsers;
};

app.post("/login", async (req, res) => {
  let usernameLogin = req.body.username;
  let passwordLogin = req.body.password;
  console.log("The usernameLogin is: ", usernameLogin);
  console.log("The passwordLogin is: ", passwordLogin);
  const databaseUsers = await checkUser();
  let successEmail = false;
  let successPassword = false;
  for (var i = 0; i<databaseUsers.length; i++) {
    if (databaseUsers[i].email.trim().toLowerCase() == usernameLogin.trim().toLowerCase()) {
        console.log("E-mail OK!");
        successEmail = true;
    } else {

    };
    if (databaseUsers[i].password.trim().toLowerCase() == passwordLogin.trim().toLowerCase()) {
      console.log("Password OK!");
      successPassword = true;
    } else {

    }
  };
  if (successEmail == true && successPassword == true) {
    console.log("Credentials typed alright! The user can be logged!");
    res.render('secrets.ejs');
  } else if (successEmail == true && successPassword == false)  {
    console.log("The password typed doesn't match with the registered e-mail!");
    res.redirect("/login");
  } else if (successEmail == false && successPassword == true)  {
    console.log("The e-mail typed doesn't exists on database!");
    res.redirect("/login");
  } else {
    console.log("The credentials to login are all invalid! Please, try again.");
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

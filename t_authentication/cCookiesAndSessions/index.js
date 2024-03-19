import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import pkg from "passport-local";
import session from "express-session";
import cookieParser from "cookie-parser";

const LocalStrategy = pkg.Strategy;
const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());

// Use session middleware
app.use(session({
secret: 'TOPSECRET',
resave: false,
saveUninitialized: true,
cookie: { maxAge: (10 * 60 * 1000) }	// 10 minutes
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Halloween200!",
  port: 5432,
});
db.connect(
  console.log("Database 'secrets' connected!")
);

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
    } else {
    res.render("home.ejs");
  }
});

app.get("/secret", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
    } else {
    res.redirect('/login');
  }
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash]
          );
          res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

passport.use(new LocalStrategy(
  async (username, password, done) => {
  
  // const email = req.body.username;
  // password = req.body.password;
  console.log("The username typed is: ", username);
  console.log("The password typed is: ", password);
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username
    ]);
      console.log("The result of username's seearch on database was: ", result.rows[0]);
      console.log("Trying hashes veerify...");
      if (result.rows.length > 0) {
        let user = result.rows[0];
        const storedHashedPassword = user.password;
        console.log("Testing hashes....");
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
          } else {
            if (result) {
              console.log("Credientials founded! User can login...");
              return done(null, user);
            } else {
              return done(null, false, { message: 'Incorrect password.' });
            }
          }
        });
      } else {
        console.log("Verify process of hashes failed!");
        return done(null, false);
      }
    } catch (err) {
      console.log(err);
    }
  }
));

app.post("/login", passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login',
  keepSessionInfo: true
  // failureFlash: true
  }) 
);

passport.serializeUser((user, done) => {
  console.log("On seralizerUser Block!");
  console.log("The user's value here is: ", user);
  done(null, user.id);
  });

 passport.deserializeUser(async (user, id, done) => {
  console.log("On DeseralizerUser Block!");
  console.log("The user's value here was getted!");
  user = user.find(u => u.id === id);
  done(null, user);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

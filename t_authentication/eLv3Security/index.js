import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
import pkg from "passport-google-oauth2";

const GoogleStrategy = pkg.Strategy;
const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect(
  console.log("Database connected!")
);

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  passReqToCallback   : true
},
async function(request, accessToken, refreshToken, profile, done) {
        console.log("The google credential requested is: ",  profile.email);
        const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [
              profile.email
        ]);
        if (checkUser.rows.length > 0) {
          console.log("User credential by google founded on database!");
          done(null, checkUser.rows[0]);
        } else {
          console.log("Google user not finded on database. Registering the e-mail ", profile.email);
          const newUser = await db.query(
                      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
                      [profile.email, "google"]
                    );
          console.log("The newUser was registered on database!");

        }
  
        // try {
        //   const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [
        //     profile.email
        //   ]);

        //   if (checkUser.rows.length > 0) {
        //     done(null, true);
        //   } else {
        //         const result = await db.query(
        //           "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        //           [email, "google"]
        //         );
        //         done(null, true);     
        //   }
        // } catch (err) {
        //   console.log(err);
        // }
  }
));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/secrets", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login"); 
  }
});

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/secrets',
    passport.authenticate( 'google', {
        successRedirect: '/secrets',
        failureRedirect: '/register'
}));

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

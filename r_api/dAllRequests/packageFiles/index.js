import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
//yup. we will use this for everything. All the world need to be aware about.
  console.log("Initiating app... Getting access to Token...");
  const searchToken = await axios.post(API_URL+'/get-auth-token', {
    username: 'Felipe',
    password: '123'
  });
  const gettedToken = searchToken.data;
  cleanedToken = JSON.stringify(Object.values(gettedToken));
  cleanedToken = cleanedToken.replace('["', "");
  cleanedToken = cleanedToken.replace('"]', "");
  console.log("Your cleanedToken is: " + cleanedToken);
//worked?

//my universalDatas
var postSecret;
var postScore;
var searchId;
var cleanedToken;
var cleanedSecret;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  console.log("Getting secret!");
  const searchId = req.body.id;
  try {
    console.log("Inside TryBlock! The searchId's value is: " + searchId);
    //the token worked right?
    const result = await axios.get(API_URL + "/secrets/"+searchId, {
      headers: {
        Authorization: `Bearer ${cleanedToken}`
      }
    });
    const gettedSecret = result.data;
    cleanedSecret = JSON.stringify(Object.values(gettedSecret));
    console.log("Your cleanedSecret is: " + cleanedSecret);
    console.log("Rendering the page to show the secret!");
    res.render("index.ejs", { content: cleanedSecret });  
  } catch (error) {
    console.log("Inside CatchBlock! " + error.message);
    res.render("index.ejs", { content: 'Please, type some ID to search a secret.' });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  postSecret = req.body.secret;
  postScore = req.body.score;
  console.log("Hey! We are inside the postSecret's block!");
  if(postSecret !== undefined && postScore !== undefined) {
    console.log("Inside IFblock!");
    try {
      console.log( "Inside tryBlock! The value of your postSecret is: " 
      + postSecret + " and the value from its's score is: " + postScore + " aaaand the token that"
      + " you will use to get auth for this is: " + cleanedToken);
      const newSecret = await axios.post(
        API_URL+'/secrets', 
        {
          secret: postSecret,
          score: postScore
        }, 
        {
          headers: {
            Authorization: `Bearer ${cleanedToken}`
          }
        });
      console.log("The new secret data was passed. Let's try cleaning it.");
      const convertNewSecret = newSecret.data;
      cleanedSecret = JSON.stringify(Object.values(convertNewSecret));
      console.log("Well, if we get it, your newest post cleanedSecret is: " + cleanedSecret);
      res.render('index.ejs', { content: cleanedSecret });
    } catch(error) {
      console.log("....goes wrong into postSecret's block -> " + error.message);
    }
  } else {
    console.log("Inside ELSE block!");
    res.render('index.ejs', { contet: 'Please, fill the secret and the score labels.' });
  }
});

app.post("/put-secret", async (req, res) => {
  searchId = req.body.id;
  postSecret = req.body.secret;
  postScore = req.body.score;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  console.log("Hello! Your are inside the putSecret's block! Let's see if will be try or catch");
  try{
    console.log("Into Try's block! The value of your searched Id is: " + searchId
    + " aaand your postSecret is: " + postSecret + " as your postScore is: " + postScore
    + " by the way your token remaining: " + cleanedToken);
    const putSecret = await axios.put(
      API_URL+"/secrets/"+searchId,
      {
        secret: postSecret, 
        score:  postScore
      },
      {
        headers: {
          Authorization: `Bearer ${cleanedToken}`
        },
      }
    );
    console.log("We pass the Put data! Let's show it!");
    const convertPutSecret = putSecret.data;
    cleanedSecret = JSON.stringify(Object.values(convertPutSecret));
    console.log("Your newest cleanedSecret putted is: " + cleanedSecret);
  } catch(error) {
    console.log("Into Catch's block! -> " + error.message);
  }
  res.render('index.ejs', { content: cleanedSecret } );
});

app.post("/patch-secret", async (req, res) => {
  searchId = req.body.id;
  postSecret = req.body.secret;
  postScore = req.body.score;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  console.log("Inside patchSecret's block! Try or cacht?");
  try{
    console.log("Try block! Your id seached is: " + searchId);
    const patchSecret = await axios.patch(
      API_URL+'/secrets/'+searchId,
      {
        secret: postSecret,
        score: postScore
      },
      {
        headers: {
          Authorization: `Bearer ${cleanedToken}`
        },
      }
    );
    console.log("The patch data was passed!");
    const convertPatchSecret = patchSecret.data;
    cleanedSecret = JSON.stringify(Object.values(convertPatchSecret));
    console.log("Your patch cleanedSecret is: " + cleanedSecret);
  } catch (error) {
    console.log("Cacht block! -> " + error.message);
  }
  console.log("Rendering the page...");
  res.render('index.ejs', { content: cleanedSecret });
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  console.log("Heey! You are inside the Delete's block! Try or Catch?");
  try{
    console.log("Try block!");
    const deleteId = await axios.delete(
      API_URL+'/secrets/'+searchId,
      {
        headers: {
          Authorization: `Bearer ${cleanedToken}`
        },
      } 
    );
    console.log("The Delete's request was received!");
    const convertDeleteId = deleteId.data;
    cleanedSecret = JSON.stringify(Object.values(convertDeleteId));
    console.log("Delete's request concluded -> " + cleanedSecret );
  }catch(error) {
    console.log("Catch block! -> " + error.message);
  }
  console.log("Rendering the page...");
  res.render('index.ejs', { content: cleanedSecret } );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

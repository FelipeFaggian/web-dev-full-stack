import express from "express";
import axios from "axios";
import fs from "fs";

const app = express();
const port = 8080;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Felipe";
const yourPassword = "123";
const yourAPIKey = "";
const yourBearerToken = "";

var secretData;

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  const response = await axios.get(API_URL+'random');
  const result = response.data;
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  secretData = JSON.stringify(Object.values(result));
  console.log("We are inside the noAuth(get) getting some data.... " + secretData);
  //The data you get back should be sent to the ejs file as "content"
  res.render('index.ejs', { content: secretData  });
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  const response = await axios.get(API_URL+'all?page=2', {
    auth: {
      username: yourUsername,
      password: yourPassword
    },
  });
  const result = response.data;
  secretData = JSON.stringify(Object.values(result));
  console.log("The piece of data that you access is: " +  secretData);
  res.render('index.ejs', { content: secretData });
});
  //TODO 4: Write your code here to hit up the /filter endpoint
app.get("/apiKey", async (req, res) => {
  try {
    //apiKey's decodification...
    const searchKey = await axios.get(API_URL+"generate-api-key");
    const findKey = searchKey.data;
    var myKey = JSON.stringify(Object.values(findKey));
    console.log("Your Key is: " + myKey);
    //cleaning my apiKey....
    var cleanedKey = myKey.replace('["', "");
    cleanedKey = cleanedKey.replace('"]', "");
    console.log("The cleanedKey is: " + cleanedKey);
    //Filter for all secrets with an embarassment score of 5 or greater
    var myUrl = API_URL+'filter?score=5&apiKey='+cleanedKey;
    console.log("The needed URL is: " + myUrl);
    // HINT: You need to provide a query parameter of apiKey in the request.
    const response = await axios.get(myUrl, {
      auth: {
        username: yourUsername,
        password: yourPassword
      },
    });
    const result = response.data;
    secretData = JSON.stringify(Object.values(result));
    res.render('index.ejs', { content: secretData});
  }catch (error) {
    console.log("Opss! Get Key request failed -> " + error.message);
  } 
});

app.get("/bearerToken", async (req, res) => {
  try {
    console.log("getting access on bearerToken?");
    const searchToken = await axios.post(API_URL+'get-auth-token', {
      username: yourUsername,
      password: yourPassword, 
    }); 
    console.log("Getted Authorizaion by username and password?");
    const getToken = searchToken.data;
    var cleanedToken = JSON.stringify(Object.values(getToken));
    cleanedToken = cleanedToken.replace('["', "");
    cleanedToken = cleanedToken.replace('"]', "");
    console.log("Your cleanedToken is: " + cleanedToken);
     //TODO 5: Write your code here to hit up the /secrets/{id} endpoint 
     //and get the secret with id of 42
    const response = await axios.get(API_URL+'secrets/42', {
      //HINT: This is how you can use axios to do bearer token auth:
      // https://stackoverflow.com/a/52645402
      /*
      axios.get(URL, {
        headers: { 
          Authorization: `Bearer <YOUR TOKEN HERE>` 
        },
      });
      */
      headers: {
        Authorization: `Bearer ${cleanedToken}`
      },
    });
    const result = response.data;
    secretData = JSON.stringify(Object.values(result));
    console.log("The secret data discover by Token is: " + secretData);
    //rendering page...
    res.render('index.ejs', { content: secretData });
  }
  catch (error) {
    console.log("Ops! An error occur in the getBlock's token... -> " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 8080;

var activity;
var keysArray;
var valueArray;
var typeToDo = 'education'; //urlDynamic
var participantsToDo = 1; //urlDynamic

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Teacher's orientation...
// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.

app.get("/", async (req, res) => {
  console.log("Hey! We are inside the Get Method at main page!");
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    activity = result;
    console.log("The keys's activity is: ", Object.keys(activity));
    keysArray = Object.keys(activity);
    console.log("Extracting specific key from the keysArray: ", keysArray[3]);
    res.render("index.ejs", { activity: activity, keysArray: keysArray});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log("Hey! We are inside the Post's block!");
  try{
    typeToDo = req.body.type;
    participantsToDo = req.body.participants;
    console.log("The activity's type choosed was: " + typeToDo);
    console.log("The activity's participants choosed was: " + participantsToDo);
    const response = await axios.get('https://bored-api.appbrewery.com/filter?participants='+participantsToDo+'&&type='+typeToDo);
    const result = response.data;
    console.log("Redeclaring vars...");
    activity = result;
    valueArray = Object.values(activity);//values from the filtered data
    console.log("Generating rendom activity filter...");
    activity = valueArray[Math.floor(Math.random() * valueArray.length)];
    console.log("The length of valueArray is: ", valueArray.length);
    console.log("The activity's Name selected is: ", activity.activity);
    keysArray = Object.keys(activity); //refreshing keysArray to the generated value
    console.log("The number of participants on the filter selected is: ", activity.participants);
    res.render('index.ejs', { activity: activity, keysArray: keysArray });//vars's transmission to ejs
  } catch(error) {
    console.log("Something goes wrong on Post Request... ", error.message);
    res.render('index.ejs', { error: error.message });
  }

  //Teacher's orientation....
  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

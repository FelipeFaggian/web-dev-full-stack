import express from "express";
import bodyParser from "body-parser";
import fs, { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from 'path';

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var title;
var protein;
var salsa;
var topping = "";
var lineToppings; 
var tacoPosition = 0;
var buttonClicked;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('Setting ejs...');
app.use(express.static(path.join(__dirname, 'public')));
console.log('Setting css....');

//reading json
var reader = fs.readFileSync('recipe.json', 'utf8', function(err, data) {
  if(err) {
    console.log("Reader Error! " + err);
  } else {
    console.log("recipe.json inputed inside var reader!");
  }
});
//json's var
var outputJson = JSON.parse(reader);

//teacher note...
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';
//teacher had already done what i did... @#$*!
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
//main page
app.get("/", (req, res) => {
  res.render("index.ejs", { title: title ,protein: protein, salsa: salsa, topping: topping, buttonClicked: buttonClicked });
});
//generating data
app.post("/recipe", urlencodedParser ,(req, res) => {
  buttonClicked = req.body.choice;
  console.log("The button clicked was: " + buttonClicked);
  if (buttonClicked === 'chicken') {
    console.log("Inside blockIf chiken... --' ");
    tacoPosition = 0;
    console.log("Now, tacoPosition's value is: " + tacoPosition);
  } else if (buttonClicked === 'fish') {
    console.log("Inside elseIf Fish!");
    tacoPosition = 2;
    console.log("Now, tacoPosition's value is: " + tacoPosition);
  } else if (buttonClicked === 'beef'){
    console.log("Inside else Meat!");
    tacoPosition = 1;
    console.log("Now, tacoPosition's value is: " + tacoPosition);
  }
    title = outputJson[tacoPosition].name;
    console.log("The title message is: " + title);
    protein = outputJson[tacoPosition].ingredients.protein.name + ", " + outputJson[tacoPosition].ingredients.protein.preparation;
    console.log("The protein message is: " + protein); 
    salsa = outputJson[tacoPosition].ingredients.salsa.name;
    console.log("The salsa message is: " + salsa);
    console.log("Starting tooping loop at index.js...");
    topping = ""; //reseting the textAcumulator
      for (var i = 0; i<outputJson[tacoPosition].ingredients.toppings.length; i++) {
      lineToppings = '<li>' + outputJson[tacoPosition].ingredients.toppings[i].quantity + " of " + outputJson[tacoPosition].ingredients.toppings[i].name + '</li>';
      topping =  topping + lineToppings;
      console.log("Line " + i + " of loop -> ", topping);
    }
    console.log("Lopping get to the end.");
    console.log("It's time to the writer topping goes to toppings.ejs!");
    fs.writeFileSync(
      'views/toppings.ejs', //destiny file
      topping, //writed content
      function(err) { //triyng exceptions
      if (err) {
        console.log("The topping writer goes wrong!!");
      } else {
        console.log("Topping writer works well!");
      }
    });
    console.log("Redirecting data generated to main page...");
    res.redirect('/');
});
//serverOn
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

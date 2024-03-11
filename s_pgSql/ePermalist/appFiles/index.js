import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist_web_app",
  password: "Halloween200!",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

async function checkItem() {
  const result = await db.query(
    `SELECT * FROM item_permalist ORDER BY id ASC;`
    );
  let items = [];
  result.rows.forEach((item) => {
    items.push(item);
  });
  return items;
};

app.get("/", async (req, res) => {
  const items = await checkItem();
  console.log("Your current list is: ", items);
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query(
      "INSERT INTO item_permalist (title) VALUES ($1)",
      [item]
    );
    console.log("The new item typed is: ", item);
  } catch (err) {
    console.log(err);
  }
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const editedTitle = req.body.updatedItemTitle;
  const editedId = req.body.updatedItemId;
  try {
    await db.query(
      "UPDATE item_permalist SET title = ($1) WHERE id = ($2)",
      [editedTitle, editedId]
    );
    console.log("The item with id = ", editedId,
    "receive the new title: ", editedTitle);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});


app.post("/delete", async (req, res) => {
  console.log("You enter on DELETEblock!");
  const deletedId = req.body.deleteItemId;
  try {
    await db.query(
      "DELETE FROM item_permalist WHERE id = ($1);",
      [deletedId]
    );
    console.log("The item with id = '", deletedId,"' -> was deleted!");
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

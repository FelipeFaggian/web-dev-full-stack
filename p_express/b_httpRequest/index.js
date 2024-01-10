import express from "express";
const app = express();
const port = 3000;

//multipages
// app.get('/', function(req, res){
//     res.send('<h1>Home</h1>');
// });

// app.get('/contact', (req, res) => {
//     res.send('<h1>Contact</h1>');
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// });

//status
app.post('/register', (req, res) => {
    res.status(201);
    res.send('User form sended!');
});

app.get('/', (req, res) => {
    res.status(200);
    res.send('User entered in home page!');
});

app.put('/', (req, res) => {
    res.status(200);
    res.send('The interaly home page was resquested to be updated!');
})

app.patch('/', (req, res) => {
    res.status(200);
    res.send('Just a part of the home page was resquested to be updated!');
});

app.delete('/', (req, res) => {
    res.status(200);
    res.send('Something was requested to be deleted in home page!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
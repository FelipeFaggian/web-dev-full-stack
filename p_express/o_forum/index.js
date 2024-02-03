//npm imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { readFile } from 'node:fs';
import { writeFile  } from 'node:fs';
import { Buffer } from 'node:buffer';
import { copyFile, constants } from 'node:fs';
import { truncateSync, write, writeFileSync } from 'fs';
import { truncate } from 'node:fs';
import fs from 'fs';

//global constants
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const receivePostFile = 'receivePost.ejs';
const isolatedPostFile = 'views/isolatedPost.ejs';
const bodyPostFile = 'views/partials/bodyPost.ejs';
const indexFile = 'index.ejs'; 
const bodyEditFile = 'views/bodyEditPost.ejs'

//clean bodyPostFile
function truncatePost() { 
    let resolve, reject;
    const promise = new Promise((rs, rj) => { resolve = rs; reject = rj; });
    truncate(bodyPostFile, function(err){ 
        if(err !== null){ 
             console.log("Err exec: " + err);
             reject(err);
        } else { 
            console.log('Deleting old writed posts...'); 
            resolve();
        } 
    }); 
    return promise;
} 

//writing on bodyPostFile
let writer = fs.createWriteStream(bodyPostFile, { flags: 'a' }, function(err){
    if(err) {
        throw err;
    } else {
        console.log('Posts writed!');
    }
});

//posts's arrays and attributes
let postsSequence = [];
var randomId;
var titlePost;
var messagePost;

//writerLoop of posts!
function writerLoop(err) {
        let resolve, reject;
        const promise = new Promise((rs, rj) => { resolve = rs; reject = rj; });
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Inside Writer loop of posts. Is needed write some post?");
                for(var i=0; i<postsSequence.length; i++) { //writing new data
                console.log("We are inside the array postsSequence at position: " + i);  
                console.log("Writing sended data...");
                writer.write(
                '<form action="/editPost" class="d-flex flex-column col-8 border-black mx-auto pt-5 mt-5">' +
                            '<input " value=" ' + postsSequence[i][1] + ' " class="border-black py-2 mb-3" type="text" readonly="readonly">' +
                            '<input " value=" ' + postsSequence[i][2] + ' " class="border-black py-5 " type="text" readonly="readonly">' +
                            '<button name="id ' + postsSequence[i][0] + 'Button" value="" onClick=" " " type="submit" class="btn btn-md btn-light mt-3">Edit</button>' +
                    '</form>' +
                    '<form action="/deletedPost" class="d-flex flex-column col-8 border-black mx-auto mb-5 mt-3">' +
                            '<button name="id ' + postsSequence[i][0] + ' " type="submit" class="btn btn-md btn-danger mb-5"> Delete </button>' +
                    '</form>'
                    );       
                };
                resolve();
            }
    return promise;
}

//config enviroment of back-end and front-end
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));

//new Post's page
app.get('/createPost', function(req, res){
    console.log("Accessing page of post's creation...");
    res.render('post.ejs');
 });

 //receiving all data of the new post
 app.post('/newPost', urlencodedParser, async function(req, res, next){
    randomId = Math.floor(Math.random() * 100); //generate new Id
    titlePost = req.body.title; //data's First input of new post
    messagePost = req.body.message; //data's Second input of new post
    console.log("Testing the Id generated...");
    for(var comparingId = 0; comparingId<postsSequence.length; comparingId++) {
        if (postsSequence[comparingId][0] === randomId) {
            console.log("The Id generetade already exists. Genereting another Id...");
            randomId = Math.floor(Math.random() * 100);
            comparingId = 0;
        } else {
            console.log("...");
        }
    }
    console.log("Searching an empty position in array for the new requested post...");
    var searchingEmpty;
    for (searchingEmpty = 0; searchingEmpty<postsSequence.length; searchingEmpty++) {
        if(postsSequence[searchingEmpty] !== undefined) {
            console.log("...");
        } 
    }
    console.log("Receving new post at position: " + searchingEmpty);
    //receiving new data's post
    postsSequence[searchingEmpty] = new Array (randomId, titlePost, messagePost);//inserting array of atttributes inside the array of posts
    console.log("A new post was created! Id: " + postsSequence[searchingEmpty][0] + " Your title is: " + postsSequence[searchingEmpty][1] + " And your message is: " + postsSequence[searchingEmpty][2]);
    console.log("Our currently table's array of posts is: " + postsSequence);
    try {
            await truncatePost(); //deleting old data writed
            await writerLoop() ; // writing sended posts!      
            // console.log("Render newPost's page at Post req...");
            // res.render(indexFile, { postsSequence: postsSequence });
            console.log("Redirecting user to Get method...");
            res.redirect('/');
    } catch (err) {
            console.log(err);
    }
});


//scope getIdPost
var getUrlEdit;
var numUrlEdit;
var stringId;
var numId;  

app.get('/editPost', urlencodedParser, function(req, res){
        console.log("Hey, we are on Edit post's page!");
        getUrlEdit = req.url;
        console.log('Full URL edit path: ' + getUrlEdit);
        console.log('Currently full array of posts: ' + postsSequence);
        numUrlEdit = getUrlEdit.match(/(\d+)/);
        console.log('Array string Id: ' + numUrlEdit);
        stringId = numUrlEdit.slice(0,1);
        console.log("Isolated post's Id in string: " + stringId);
        numId = Math.floor(stringId);
        console.log("The currently array postSequence on this scope is: " + postsSequence);
        console.log("Isolated Id in number type: " + numId);
        console.log("Lets compare the Id genereted with the Id in array: ");
        console.log("Searching for the requested post to be edited....");
        for(var countId = 0; countId<postsSequence.length; countId++) {
            if (postsSequence[countId][0] === numId) {
                console.log("Requested post finded! Starting editing process...");
                console.log("Testing separete data at the position inside the array? Few... OK... editing Id: " + postsSequence[countId][0] + "/ editing title: " + postsSequence[countId][1] + "/ editing message: " + postsSequence[countId][2] );
                //re-wrinting edit post's body
                writeFileSync('views/bodyEditPost.ejs',
                '<p> <form action="/receivePost" method="POST" class="d-flex flex-column col-8 border-black mx-auto py-5 my-5">'+
                    '<input name="title" value="' + postsSequence[countId][1] + '" class="border-black py-2 my-3" type="text">' +
                    '<input name="message" value="' + postsSequence[countId][2] + '" class="border-black py-5 " type="text">'+
                    '<button name="' + postsSequence[countId][0] + '" type="submit" class="btn btn-md btn-dark my-3"> Re-send </button>'+
                    '</form> </p>'
                , function(err){
                        if(err){
                            throw err;
                        } else {
                            console.log("The clicked post's body is ready to be edited!");
                        }
                    }
                );
            } else {
                console.log("....");
            }
        }
        console.log("Rendering the page...");
        res.render('editPost.ejs', { postsSequence: postsSequence });
});

//att data vars to globlal scope...? (please delete this worribly thing as possible can be) 
getUrlEdit;
numUrlEdit;
stringId;
numId;

//att post
app.post('/receivePost', urlencodedParser, async function(req, res, next){
    console.log("Inside receivePost's page! Exporting refreshed posts!");
    console.log("We have the value of numId on this scope too: " + numId);
    for(var countId = 0; countId<postsSequence.length; countId++) {
        if (postsSequence[countId][0] === numId) {
            postsSequence[countId][1] = req.body.title; //att title
            postsSequence[countId][2] = req.body.message; //att message
            console.log("The new title's post from id: " + postsSequence[countId][0] + " is: " + postsSequence[countId][1] + " And the new message is: " + postsSequence[countId][2]);
             //export new data to bodyPost at Index
            console.log("The actual array with the refreshed data is: " + postsSequence);
        } else {
            console.log("...");
        }
    }
    try {
        //refreshing bodyPost
        await truncatePost(); //deleting old data writed
        await writerLoop(); // writing sended posts!      
        //output refreshed posts
        console.log("Redicrecting to main page...");
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});

//dell mecanism
app.get('/deletedPost', async function(req, res, next){
    console.log("Well, we are on deleting page. Uff... Good luck of us...");
    var deletingUrl = req.url;
    console.log("The URL of Deleting's page is: " + deletingUrl);
    var regExDellURL = deletingUrl.match(/(\d+)/);
    console.log("Now, we got the regex Dell page's array: " + regExDellURL + " The things are working, right?");
    var stringDellId = regExDellURL.slice(0,1);
    console.log("The request deleting's Id was isolated (at least, I hope so): " + stringDellId);
    var numDellId = Math.floor(stringDellId);
    console.log("We finally convert the Id to number type. Look...has any difference? -> " + numDellId);
    console.log("Our currently postSequence array on this scope has this table data: " + postsSequence);
    for(var countId = 0; countId<postsSequence.length; countId ++) {
        if (postsSequence[countId][0] === numDellId) {
            console.log("The counter match with position: " + countId);
            console.log("The requested posted to be deleted was founded! Starting dell process...");
            console.log("Replacing the array data of last position to fill the deleting position...");
            postsSequence[countId][0] = postsSequence[postsSequence.length - 1][0];
            postsSequence[countId][1] = postsSequence[postsSequence.length - 1][1];
            postsSequence[countId][2] = postsSequence[postsSequence.length - 1][2];
            console.log("The last post was duplicated. So, your extra copy that is: " + postsSequence[postsSequence.length - 1] + " will be Spliced!");
            postsSequence.pop();
            console.log("The deleted post was rewriten by the last and the final position's data of array was Spliced!");
            console.log("The requested post was deleted from postSequence's array: " + postsSequence + "<-- some signal of the post that you had request for delete?(please, say 'no')"); //splice work?
        } else {
            console.log("... the counter din't macht with the position: " + countId);
        }
    }
    try {
        //refreshing bodyPost
        await truncatePost(); //deleting old data writed
        await writerLoop() ; // writing sended posts!      
        //outputing refreshed data
        console.log("Redirecting to main page at Get method...");
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});

app.get('/' , function(req, res){
    if(postsSequence[0] === undefined) {
        truncatePost();
        console.log("postsSequence is null. Reseting bodyPost...");
    } else {
        console.log("Come backing to main page. Nothing change here... The currently main array is: " + postsSequence);
        console.log("Rendering the page...");
    }
    res.render(indexFile, { postsSequence: postsSequence });
});

app.listen(port, function(req, res, err){
    if(err) throw err;
    console.log(`Server running on port ${port}.`);
});

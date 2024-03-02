//universal vars
var numberJoke;
var urlSpecific;
var urlReal;
var selectedJoke;
var resAnswer; 
var filteredJokes;
let getRead;

//reader url
async function readingUrl() {
  let resolve, reject;
  const promise = new Promise((rs, rj) => { resolve = rs; reject = rj; });
    fs.readFile('receivedUrl.ejs', 'utf8', (err, data) => {
    if (err !== null) {
      console.error(err);
      return reject(err);
    } else {
      console.log("The data collected by the reader on readingFunction is: " + data);
      return resolve(data);
    }
  });
  return promise;
};

//working with dynamic url...
async function urlUniversal() {
  console.log("Accessing function urlUniversal...");
  getRead = await readingUrl();
  console.log("The read's value is on urlUniversal's block is: " + getRead);
}

//receiving request 
app.use(function (req, res, next) {
  console.log("We entried inside app.use's block. Good luck for us!");
      
        //getting  dynamic url
        //reseting resAnswer....
        resAnswer = undefined;
        //resenting filter array
        filteredJokes = [];
        console.log("the app.use catches this req! ");
        urlReal = req.url;
        if (urlReal !== undefined) {
          console.log("The app.use reqs is running!");  
          console.log("The url's value ON app.use is: " + urlReal);
        }
        //wrinting on receivedUrl
        console.log("Writing on receivedUrl.ejs");
          writeFileSync(
            'receivedUrl.ejs',
            urlReal,
            function(err){
                  if(err !== null){ 
                        console.log("Err exec: " + err);
                        return reject(err);
                  } else {
                        console.log("receivedUrl has writed!");
                        return resolve(data);
                  }
              }
          );
      
      getRead = readingUrl();
      urlUniversal();
      console.log("finishing appp.use's block!");
      
      next();
});


function getSpecific(){
  app.get(getRead, function(req, res){
    console.log("inside get block");
    
    console.log("The getRead inside this block is:  " + getRead);
    try {
      console.log("Try block!");
      res.json(getRead);
    } catch (err) {
      console.log("catch block! " + err.message);
    } 
  });
} 

appUse();

//universal order to convert url request
// async function gettingUrl() {
//   try {
//     await urlRequest();
//     console.log("First, we do app.use");
//     await urlUniversal();
//     console.log("Second, read his");
//   }
//   catch (err) {
//   console.log(err.message);
// }
// }

/// methods blocks below



//2. GET a specific joke

//         // /jokes/ block!!
//         if (urlReal.includes('/jokes/')) {
//           console.log("Entered on /jokes/ block!");
//           for(var i=1; i<=jokes.length; i++) {
//             if (('/jokes/'+i) == urlReal) {
//               urlSpecific = '/jokes/'+i;
//               console.log("We find the joke! The i's value is: " + i );
//               console.log("The urlSpecific's value is: " + urlSpecific);
                            
//               /// specific joke mecanism...
//                       selectedJoke = (jokes[i-1]);
              
//                       //rendering the right answer!!
//                       resAnswer = selectedJoke;  
                  
//                       //last command of this block
//                       console.log("Sending JSON answer....");
      
//             }
//           }
//         }
//         //3. GET a jokes by filtering on the joke type
//         /// joke by filtering mecanism....
//         if(urlReal.includes('/filter?type=')) {
//           var urlType = urlReal.replace('/filter?type=', "");
//           console.log("The urlType is: " + urlType);
//           //filtering array objs...
//           console.log("Starting filter loop!");
          
//           for(var i=0; i<jokes.length; i++) {

//             if( jokes[i].jokeType == urlType) {
//               console.log("Type finded! Acumulating in filteredJokes...");
//               filteredJokes.push(jokes[i]);
//             } else {
//               console.log('...');
//             }
//           }

//           resAnswer = filteredJokes;
//         } else {
//           console.log('...');
//         };
        
//         //5. PUT a joke
//         //6. PATCH a joke
//         if (urlReal.includes('/jokes/:')) {
//           console.log("We are on put's block! Good luck for us!");
//           var requestData = JSON.stringify(req.body);
//           console.log("The received req.body is: " + requestData);
//           var idUrl = urlReal.replace("/jokes/:", "");
//           console.log("The value of idUrl is: " + idUrl);
//           for(var i=0; i<jokes.length; i++) {
//             if(jokes[i].id == idUrl) {
//               //PUT mecanism...
//               var newText = "I'am putting this obj!";
//               var originalText = jokes[i].jokeText;
//               var originalType = jokes[i].jokeType;
            
//               var obj = {
//                 "id": idUrl,
//                 "jokeText": req.body.jokeText,
//                 "jokeType": req.body.jokeType
//               };

//               //PATCH mecanism...
//               if(obj.jokeText == undefined) {
//                 obj.jokeText = originalText;
//               }
//               if(obj.jokeType == undefined) {
//                 obj.jokeType = originalType;
//               }

//               //subscribing the position
//               jokes[i] = obj;
//               resAnswer = jokes[i];
//               //quiting loop
//               i = jokes.length + 1;
//             } else {
      
//             }
//           }
//         } else {

//         };

//     //url undefined...
//     } else {
//       console.log("The Url until now is undefined...");
//     };

//   console.log("The answer was choosed. Rendering.... ");
//   //until now, that is the answer...
//   console.log("The value of resAnswer " + resAnswer);
//   if (resAnswer !== undefined) {
//     console.log("The answer of app.use's block will be displayed! ");
//     res.json(resAnswer);
//   } else {
//     console.log("app.use's block was jumped! ");
//     next();
//   };
//   urlReal
// });

// urlReal; 
// console.log("The value of UrlReal is: " + urlReal);

// //4. POST a new joke
// //put the value of you want to be the jokes's text.
// var textObj = "The test if jokes's text is a truly experiment!";
// //choose some type --'.....
// var typeObj = "Science";
// app.post('/jokes', function(req, res) {
//   //creating the obj that will be pushed in array
//   var obj = {
//     "id": jokes.length + 1,
//     "jokeText": textObj,
//     "jokeType": typeObj
//   };
//   console.log("Obj created! (at least, I think so...) -> " + obj);
//   jokes.push(obj);

//   console.log("The value inputed on array is: " +  jokes[jokes.length - 1]);
//   res.json( jokes[jokes.length - 1]);
// });

//7. DELETE Specific joke

//8. DELETE All jokes

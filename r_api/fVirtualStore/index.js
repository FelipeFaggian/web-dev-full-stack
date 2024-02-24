import express from 'express';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js'; 
import { fileURLToPath } from 'url';
import path from 'path';
import ejs from 'ejs';
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const stripe = Stripe('sk_test_51OkQRdLkaLl9vATY3fyzgZl7sQdLWli09p7SBvmphc6Fy8cle2QuGygv5ieFg8Sbw58WUpI6HPulfLcbOt3HBxZp00MPkRv9Df');
const port = 4242;
const app = express();
const YOUR_DOMAIN = 'http://localhost:4242';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));    

app.use('/public/', express.static('./public'));

// const customer = await stripe.customers.create({
//     name: 'Jenny Rosen',
//     email: 'jennyrosen@example.com',
// });

//Product's universal vars
var numberProduct = 1

//SignUp universal warnings
var checkEmail;
var checkPassword;
var checkEmailLogin;
var checkPasswordLogin;
var successLogin;

//Clients universal scope
let clients;
var signEmail;
var signName;
var objEmail;
var objName;
var objPassword;
var loginEmail;
var loginPassword;
var loginName;
var productTitle;
var productDescription;
var productImage;

app.get('/', function(req,res){
    console.log("Your are on getMain page's block! Rendering...");
    res.render('index.ejs', { successLogin: successLogin, loginName: loginName, productImage: productImage });
});

app.get('/signUp', function(req, res){
    console.log("Hey! You are on the signUp's page!");
    res.render('signUp.ejs', { checkEmail: checkEmail,  checkPassword:  checkPassword } );
});

app.get('/login', function(req, res){
    console.log("Hey! You are on the getLogin's block!");
    successLogin = undefined;
    res.render('login.ejs', { checkPasswordLogin: checkPasswordLogin,
    checkEmailLogin: checkEmailLogin });
});

app.get('/successPayment', function(req, res){
    console.log("Payment success!");
    res.render('success.ejs');
});

app.get('/cancelPayment', function(req, res){
    console.log("Payment anulated!");
    res.render('cancel.ejs');
});

app.post('/viewProduct', urlencodedParser, function(req, res){
    console.log("You are on the viewProduct's Post block!");
    numberProduct = req.body.view;
    console.log("The select product's number is: " + numberProduct);
    if (numberProduct == 1) {
        productDescription = 'A really nice book! Enjoy!';
        productImage = '../public/book.jpg';
        productTitle = 'Stubborn Attchments';
    } else if (numberProduct == 2) {
        productDescription = 'Write and review your anotations!';
        productImage = '../public/material.jpg';
        productTitle = 'Study Note';
    }  else if (numberProduct == 3) {
        productDescription = 'Hang out with style!';
        productImage = '../public/jacket.jpg';
        productTitle = 'Leather Jacket';
    } else if (numberProduct == 4) {
        productDescription = 'Art can be easily make!';
        productImage = '../public/paint.jpg';
        productTitle = 'Vibrant Paint';
    } else if (numberProduct == 5) {
        productDescription = 'A proteted and styled walking!';
        productImage = '../public/boots.jpg';
        productTitle = 'Harley Boots';
    } else if (numberProduct == 6) {
        productDescription = 'Be the queen!';
        productImage = '../public/Dress.jpg';
        productTitle = "Ocean's Dress";
    } else if (numberProduct == 7) {
        productDescription = 'Your batery never was so happy!';
        productImage = '../public/charger.jpg';
        productTitle = 'Ultra Charger';
    } else if (numberProduct == 8) {
        productDescription = 'Challenge the sun!';
        productImage = '../public/glasses.jpg';
        productTitle = 'Sun Glasses';
    } else {
        productDescription = 'Your stuff with you at anywhere!';
        productImage = '../public/pocket.webp';
        productTitle = 'Pocket Bag';
    }


    console.log("Rendering the Page...");
    res.render('viewProduct.ejs', { numberProduct: numberProduct, productTitle: productTitle,
    productImage: productImage, productDescription: productDescription });
});

app.post('/create-checkout-session', async function(req, res){
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                //provide the exact id price!
                price: 'price_1Okwm4LkaLl9vATYSiW1sztG',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/successPayment`,
        cancel_url: `${YOUR_DOMAIN}/cancelPayment`
    });

    res.redirect(303, session.url);
});

//Webhook implementation.
const endpointSecret = "whsec_2f7da45adcdee6639dec4bf90801cabff1beb558812a78bbc2ac7fcffff36daf";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  console.log(`Unhandled event type ${event.type}`);

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.post('/login', urlencodedParser, function(req, res){
    console.log("Heyy! Your are on the postLogin's block!");
    checkEmailLogin = "";
    checkPasswordLogin = "";
    console.log("Your currently array is: " + clients);
    loginEmail = req.body.loginEmail;
    loginPassword = req.body.loginPassword;
    loginName = undefined;
    console.log("The typed e-mail is: " + loginEmail + " and the typed password is: " +
    loginPassword);
    console.log("Checking if this credentials exists in array...");
    var verifyEmail = undefined;
    var verifyPassword = undefined;
    successLogin = undefined;
    if (clients === undefined || clients === null) {
        console.log("Your arrray of clients is empty. Please, register something!");
        checkEmailLogin = "Please, some e-mail need to be registered. Go to SingUp's page!";
        checkPasswordLogin = "Please, some password need to be registered. Go to SingUp's page!";
        res.redirect('/login');
    } else {
        console.log("Starting for block to verify login's credentials...");
        for(var i = 0; i<clients.length; i++) {
            if(clients[i].objEmail === loginEmail) {
                console.log("The entered e-mail to login is OK!");
                verifyEmail = true;
                //getting name value to input in var
                loginName = clients[i].objName;
            } else {
                console.log("...");
            }
            if(clients[i].objPassword === loginPassword) {
                console.log("The entered password to login is OK!");
                verifyPassword = true;
            } else {
                console.log("...");
            }
        } 
        console.log("The for loop login verify is done.");
        if (verifyEmail !== true && verifyPassword !== true) {
            console.log("The inputed data on login screen is incorret!");
            if(verifyEmail !== true) {
                checkEmailLogin = "The e-mail adress is wrong! Please, try again.";
            } 
            if (verifyPassword !== true) {
                checkPasswordLogin = "The entered password is wrong! Please, try again.";
            }
            res.redirect('/login');
            //success login -> entered as registered client
        } else {
        console.log("The entered data on login's screen is correct! Redirecting to main page...");
        successLogin = true;
        res.redirect('/');
        }
    }
});

app.post('/signIn', urlencodedParser, function(req, res){
    checkEmail= "";
    checkPassword= "";
    console.log("You are on the postSign's block!");
    signEmail = req.body.signEmail;
    signName = req.body.signName;
    var signPassword = req.body.signPassword;
    var confirmPassword = req.body.confirmPassword;
    console.log("The sended data is -> E-mail: " + signEmail +
     " / Name: " + signName + " / Password: " + signPassword +
      " / confirmPassword: " + confirmPassword);

    if(signEmail.includes('@') && signEmail.includes('.com')
    && signPassword === confirmPassword) {
        var emailExists = undefined;
        console.log("The e-mail typed is valid!"); 
        console.log("Testing if the entered e-mail already exists...");
        if(clients !== undefined) {
            for(var i=0; i<clients.length; i++) {
                if(clients[i].objEmail === signEmail) {
                    console.log("The typed e-mail already exists!");
                    emailExists = true;
                } else {
                    console.log("...");
                }
            }
        }
        if (emailExists === true) {
            checkEmail = "The entered e-mail already exists! Try another adress.";
            console.log("The creation of client's process was anuleted. Try input new data.");
            res.redirect('/signUp')
        } else {
            console.log("The data is valid. The creation of client will continue...");
             //creating client...
            checkEmail = "";
            checkPassword = "";
            if(clients === undefined) {
                console.log("var client is undefined. Converting into array...");
                clients = [];//arrayDeclared
            } else {
                console.log("The clients's array is already filled. Next step...");
            }
            console.log("Starting lopping array for the creation...");
            for(var i = 0; i<(clients.length + 1); i++) {
                console.log("You entered inside the loop!");
                if(clients[i] !== undefined){
                    console.log("You are on  If's Block of the client's creation...");
                    console.log("This array's position is already ocuped by this " +
                    "client: " + clients[i]);
                } else {
                    console.log("Your are on Else's Block of client creation!");
                    clients[i] = new Object( {
                        objEmail: signEmail,
                        objName: signName,
                        objPassword: signPassword 
                    });
                    //obj extensions
                    console.log("An empty position for the new clients was founded! " +
                    " The registered e-mail is: " +
                    clients[i].objEmail + " and " +
                    " the registered name is: " + 
                    clients[i].objName + " aaaaand your password is: " +
                    clients[i].objPassword);
                    //rendering...
                    console.log("Register success! Redirecting to login page...");
                    i = (clients.length + 1);
                    res.redirect('/login');
                }
            }
        }
       
    } else{
        console.log("The e-mail typed is not valid or the passwords didn't match!")
        if(signPassword !== confirmPassword) {
            checkPassword = "The passwords typed can't be different! Please, type again.";
        } else {
            checkEmail = 'Enter a valid e-mail!'
        }
        res.redirect('/signUp')
    }
    console.log("The looping is end. Rendering the page...");
    console.log("Your currently array of clients is: " +
    JSON.stringify(Object.values(clients)));
});

app.listen(port, function(err){
    if(err){
        console.log("Something wrong on starting of the server ->" + err);
    } else {
        console.log(`Server running on port ${port}!`);
    }
});

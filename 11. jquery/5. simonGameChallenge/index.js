//universal vars
var randomSequence = [];
var trySequence = [];
var tap = [];
var countTwo = 0;
var countMach = 0;

//universal objs
var redSound = new Audio("./sounds/red.mp3");
var greenSound = new Audio("./sounds/green.mp3");
var yellowSound = new Audio("./sounds/yellow.mp3");
var blueSound = new Audio("./sounds/blue.mp3");
var wrongSound  = new Audio("./sounds/wrong.mp3");

function empty() {
    countMach = 0;
    countTwo = 0;
    trySequence.length = 0;
    tap.length = 0;
    randomSequence.length = 0;
}

//machineAnswer
function randomNumber() {
    return Math.floor(Math.random() * 4 + 1);
}
function round() {
    var numberSequence = randomNumber();
    var color;    
    switch (numberSequence) {
        case(1):
            setTimeout(function(){
            $(".red").fadeTo("fast", 0);
            redSound.play();
            }, 500);
            setTimeout(function(){
            $(".red").fadeTo("fast", 1);    
            }, 750);    
            color = "red";
        break;  
        case(2):
            setTimeout(function(){
            $("#green").fadeTo("fast", 0);
            greenSound.play();
            }, 500);
            setTimeout(function(){
            $("#green").fadeTo("fast", 1);
            }, 750);
            color = "green";
        break;
        case(3):
            setTimeout(function() {
            $("#yellow").fadeTo("fast", 0);
            yellowSound.play();
            }, 500);
            setTimeout(function(){
            $("#yellow").fadeTo("fast", 1);
            }, 750);
            color = "yellow";
        break;
        case(4):
            setTimeout(function() {
            $("#blue").fadeTo("fast", 0);
            blueSound.play();
            }, 500);
            setTimeout(function(){
            $("#blue").fadeTo("fast", 1);    
            }, 750);
            color = "blue";
        break;
    }
    randomSequence.push(color)[countMach];
    console.log(randomSequence);
    countMach++;
    $("h1").text("Level: " + (countMach));
}

//game-over
function missClick() {
    setTimeout(function() {
        $("body").addClass("game-over");
        wrongSound.play();
    }, 100); 
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    setTimeout(function(){
        $("body").addClass("game-over");
    } , 300);
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 400);
    $("h1").text("Game over! Tap a key to try again.");
}

//reset
$("body").keydown(function(pressed){
        if (tap.length == 0){
            pressCode = pressed.which;
            pressChar = String.fromCharCode(pressCode); 
            tap.push(pressChar);
            console.log(tap);
            round();
        }
        else {   
        }
});

//userAnswer
$(".btn").click(function(){
    if (tap.length ==! 0) {
        getId = $(this).attr('id');
        //shiny
        $("#" + getId).addClass("pressed");
        //sounds
        switch(getId) {
            case("red"):
            redSound.play();
            break;
            case("green"):
            greenSound.play();
            break;
            case("yellow"):
            yellowSound.play();
            break;
            case("blue"):
            blueSound.play();
        }
        setTimeout(function(){
            $("#" + getId).removeClass("pressed");
        }, 250);
        trySequence.push(getId)[countTwo];
        console.log(trySequence);
        //accurance
        if(trySequence.length == 16){
            $("h1").text("Victory! You Won! Press a key to reset.");
            empty();
        } else if(trySequence[countTwo] !== randomSequence[countTwo]) {
            missClick();
            empty();
        } else {
            //turn
            countTwo++;
            if (trySequence.length == randomSequence.length) {
                countTwo = 0;
                trySequence.length = 0;
                round();
            }
            else {
            }
        }    
    } 
    else {
    }
});

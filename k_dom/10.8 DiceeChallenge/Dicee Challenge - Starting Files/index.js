var dice1 = Math.floor(Math.random() * 6 + 1);
var dice2 = Math.floor(Math.random() * 6 + 1);
var randomImageDice1 = "./images/dice" + dice1 + ".png";
var randomImageDice2 = "./images/dice" + dice2 + ".png";
document.querySelectorAll("img")[0].setAttribute("src", randomImageDice1);
document.querySelectorAll("img")[1].setAttribute("src", randomImageDice2);

if (dice1 > dice2) {
    document.querySelector("h1").textContent = "Player 1 Wins!"
    document.querySelector("span").classList.add("spanVictory1");
} else if (dice1 < dice2) {
   document.querySelector("h1").textContent = "Player 2 Wins!"
   document.querySelector("span").classList.add("spanVictory2");
} else {
    document.querySelector("h1").textContent = "A Tie!"
    document.querySelector("span").classList.add("spanTie");
}


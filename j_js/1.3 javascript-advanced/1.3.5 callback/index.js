function sumCalculator(value1, value2, callback) { //x
    var sum  = value1 + value2;
    callback(sum);
}

function display(value) { //y
    document.querySelector("h1").innerHTML = value;
}

sumCalculator(3, 3, display);  //x and y

//delegation
/*for (var i=0; i<document.querySelectorAll("button").length; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function() {
    document.querySelector("h1").style.color = "purple";
    })
}*/

/*$("button").click(function() {
    $("h1").css("color", "purple");
})*/

$("body").keydown(function(keyPress) {
    $("h1").text(keyPress.key);
})

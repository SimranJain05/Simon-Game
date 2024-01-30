var buttonColor = ["red", "blue" , "green" , "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var start = false;
var lvl = 0;

$(document).on("keydown",function(){
    if(!start){
        start = true;
        nextSequence();
        $("h1").text("Level " + lvl);
    }
   
});

$(".btn").on("click", function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    
    lvl++;
    $("h1").text("Level " + lvl);
    userClickedPattern = [];
    var randomNumber = Math.floor((Math.random())*4);  
    var randomChosenColor = buttonColor[randomNumber]; 
    console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    },100);
}

function checkAnswer(currentIndex){
    
    if(userClickedPattern[currentIndex] === gamePattern[currentIndex]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }
    else{ 
        playSound("wrong");

        $("body").addClass("game-over");

        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function startOver(){
    start = false;
    gamePattern = [];
    lvl = 0;
}



const buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$(document).keypress(function (e) { 
    if(!started)
    {
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function (e) {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);
    var randomChosenColour = "";
    randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currLevel){
    if(userClickedPattern[currLevel] === gamePattern[currLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            console.log("s");
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 100);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
        console.log("w");
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



var buttonColours = ["red", "blue", "green", "yellow"]; //4 colours
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

countDown(4); //this function must be called hear

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence(); //reset the userClickedPattern
    started = true;
  }
});

$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});


//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over!!!!");

    startOver();

  }

}

function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  setTimeout(function () {
    countDown(4);
  }, 1500);

};

function countDown(setCounter) {
  var counter = setCounter;
  var interval = setInterval(function () {
    counter--;
    $("h1").text(counter).fadeIn(100).fadeOut(100).fadeIn(100);
    // Display 'counter' wherever you want to display it.
    if ((counter == 0)) {
      // Display a login box
      clearInterval(interval);
      $("#level-title").text("Level " + level);
      $("h1").text("Press any key and memorize the color or sound")
    } else if (counter != 0 && started == true) {
      // Display a login box
      clearInterval(interval);      
      $("#level-title").text("Level " + level);      
    }
  }, 1500);
}
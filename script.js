//Needs:
//1. event listener for start button
//2. event listerner for quiz buttons
//3. var timer
//4. replace time
//5. function time with time substraction for wrong answers
//6. function save score local history. Array.
//7. var start button
//8. var quiz button
//9. var title-box
//10. var body-box
//11. array for questions
//12. function to change time
//13. function to check array?

var startButton = document.querySelector(".start-game");
var titleBox = document.querySelector("#title-box");
var bodyBox = document.querySelector("#body-box");
var timer = document.querySelector("#timer");
var buttons = document.querySelector("#box2");
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "What type of animal shirt did Joe wear on Wednesday ____.",
      choices: ["Kramer", "Huskies", "Cats", "Wookies"],
      answer: "parentheses"
    },
];
var timerInterval;

var secondsLeft = 10;
timer.textContent = secondsLeft;
timer.style = "font-size: xx-large"

function deleteButtons() {
    buttons.querySelectorAll('*').forEach(n => n.remove());
}

function createButtons (butnChoices, parent) {
    for (choice in butnChoices) { 
    var btn = document.createElement("button"); 
    btn.textContent = butnChoices[choice];                 
    parent.appendChild(btn); 
    }
}

function startQuiz(event) {
  var index = 0;
  clearInterval(timerInterval);
  titleBox.textContent = questions[index].title;
  bodyBox.textContent = "";
  deleteButtons();
  createButtons(questions[index].choices, buttons);
  var timerInterval = setInterval(function() {
      //event.stopPropagation();???
    secondsLeft--;
    timer.textContent = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 1000);
}

function questionAnswered(event) { 
    clearInterval(timerInterval);   
    for (x in box2.children) {
        if (box2.children[x].firstChild === event.target.firstChild) 
        {
            console.log(event);
        };
    }
    
}

startButton.addEventListener("click", startQuiz);
buttons.addEventListener("click", questionAnswered);



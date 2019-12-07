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
var highScores = document.querySelector("#highscores");
var startButton = document.querySelector("#Start");
var titleBox = document.querySelector("#title-box");
var bodyBox = document.querySelector("#body-box");
var timer = document.querySelector("#timer");
var buttons = document.querySelector("#box2");
var questionsBtn = document.querySelector("#btn-box");
var inputBox = document.querySelector("#input-box");
var formBox = document.querySelector("#form-box");
var submitBox = document.querySelector("#submit-box");
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
      answer: "Cats"
    },
];
var timerInterval;

var secondsLeft = 600; //100th seconds
var penalty = 100; //100th seconds
var index = 0; //Question Number
renderTimeToPage();
timer.style = "font-size: xx-large"


function deleteText(element) {
    element.textContent = '';
}

function renderText(element, text) {
    element.textContent = text;
}

function createElement(type, element) {
    var newEl = document.createElement(type);
    element.appendChild(newEl);
    return newEl;
}
function renderTimeToPage() {
    var time = secondsLeft / 10;
    timer.textContent = "Time: " + (secondsLeft % 10 === 0? time + ".0" : time);
}

function renderQuestions() {
    titleBox.textContent = questions[index].title;
    deleteText(bodyBox);
}

function renderScore() {
    return (secondsLeft / 10).toFixed();
}

function displayMessage(location, message) {
    location.textContent = message;
}

function deleteButtons(element) {
    element.querySelectorAll('*').forEach(n => n.remove());
}

function createButtons (btnChoices, parent) {    
    for (choice in btnChoices) { 
    var btn = document.createElement("button"); 
    btn.textContent = btnChoices[choice]; 
    btn.setAttribute("id", btnChoices[choice]);                
    parent.appendChild(btn); 
    }
}

function renderScorePage() {
    titleBox.textContent = "Your score was " + renderScore();
    bodyBox.textContent = "Enter your initials";
    var inputB = document.createElement("input");
    inputB.textContent = "adsf";
    inputB.setAttribute("type", "text");
    inputB.setAttribute("placeholder", "Enter Name");
    inputB.setAttribute("id", "input-text");
    formBox.appendChild(inputB);
    var msg = document.createElement("p");
    msg.textContent = " ";
    msg.setAttribute("id", "message");
    msg.setAttribute("style", "height: 15px; width: 200px");
    submitBox.appendChild(msg);
    var btn = document.createElement("button"); 
    btn.textContent = "Submit"; 
    btn.setAttribute("id", "scoreInput");                
    submitBox.appendChild(btn); 
    inputBox.setAttribute("style", "margin-bottom: 2vw");
}

function renderHighScores() {
    window.location='highscores.html';  
}

function renderPlayAgain() {
    window.location='index.html';
}

function startQuiz(event) {
  
  clearInterval(timerInterval);
  renderQuestions();
  if (index === 0) deleteButtons(buttons);
  else             deleteButtons(questionsBtn);
  createButtons(questions[index].choices, questionsBtn);
  timerInterval = setInterval(function() {
    secondsLeft--;
    renderTimeToPage();

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 100);
}
function checkAnswer(event, arrayAnswer) {
    if (!(event.target.firstChild.data === arrayAnswer)) secondsLeft -= penalty;
    index++;
    startQuiz();
}

function renderScoreInput() {
    clearInterval(timerInterval);
    deleteButtons(questionsBtn);
    renderScorePage();
}

function saveScoreInput(initialsInput, scoreInput) {
    // validate the fields
    if (initialsInput === "") {
        displayMessage(bodyBox, "Error: Initials cannot be blank");
        return false;
    }
     // create user object from submission
    var existing = localStorage.getItem('users');
    existing = existing ? JSON.parse(existing) : [];
    existing.push({initials: initialsInput.trim(), score: scoreInput.trim()});
    localStorage.setItem("users", JSON.stringify(existing));
    return true;
  }

startButton.addEventListener("click", function() {
    event.preventDefault();
    index = 0; //Zero out index for next game.
    startQuiz();
});
questionsBtn.addEventListener("click", function() {
    event.preventDefault();
    if (index === questions.length - 1) renderScoreInput();
    else checkAnswer(event, questions[index].answer);
});
submitBox.addEventListener("click", function(event) {
    event.preventDefault();
    var todoText = formBox.children[0].value;
    if (!(saveScoreInput(todoText, renderScore()))) return;
    deleteButtons(submitBox);
    deleteButtons(inputBox);
    deleteText(bodyBox);
    deleteText(titleBox);
    deleteText(highScores);
    var highscoresBtn = [{choices: ["Highscores"]}, {choices: ["Play Again"]}];
    highscoresBtn.forEach(n => createButtons(n.choices, bodyBox));
});
formBox.addEventListener("submit", function(){
    event.preventDefault();
});
bodyBox.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.firstChild.data==="Play Again") renderPlayAgain();
    else                                          renderHighScores();
});

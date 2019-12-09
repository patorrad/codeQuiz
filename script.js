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
var audioClip = document.querySelector("#my-Audio"); 
var gifBox = document.querySelector("#gif-box");
var questions = [
    {
      title: "What type of animal shirt did Joe wear on Wednesday?",
      choices: ["Kramer", "Huskies", "Cats", "Wookies"],
      answer: "Cats"
    },
    {
      title: "Whose name did Aslan forget on Friday?",
      choices: ["Mystique", "Super Denis", "Cyclops", "Jean"],
      answer: "Super Denis"
    },
    {
      title: "What's Joe's favorite color?",
      choices: ["Blanched Almond", "Papaya Whip", "Medium Aquamarine", "Salmon"],
      answer: "Salmon"
    },
];
var timerInterval;
var secondsLeft = 500; //100th seconds
var penalty = 100; //100th seconds
var penaltyFlag = false; //Set this to true to include additional time penalty for wrong answer
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
    var inputB = createElement("input", formBox);
    inputB.setAttribute("type", "text");
    inputB.setAttribute("placeholder", "Enter Name");
    inputB.setAttribute("id", "input-text");
    var msg = createElement("p", submitBox);
    msg.textContent = " ";
    msg.setAttribute("id", "message");
    msg.setAttribute("style", "height: 15px; width: 200px");
    var btn = createElement("button", submitBox); 
    btn.textContent = "Submit"; 
    btn.setAttribute("id", "scoreInput");  
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
    if (index === 0)               deleteButtons(buttons);
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
    answer = event.target.firstChild.data === arrayAnswer;
    if (penaltyFlag === true) secondsLeft -= penalty; //Penalty flag
    return answer;
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

function newmanGif() {
    var El =createElement("iframe", gifBox);
    El.setAttribute("src", "https://gfycat.com/ifr/PaleImmaterialConch");
    El.setAttribute("style", "margin-bottom: 100px");
    audioClip.play();
}

startButton.addEventListener("click", function() {
    event.preventDefault();
    index = 0; //Zero out index for next game.
    startQuiz();
});
questionsBtn.addEventListener("click", function() {
    event.preventDefault();
    answer = checkAnswer(event, questions[index].answer);
    deleteButtons(questionsBtn);
    if (!answer && index === questions.length - 1) 
    {
        deleteButtons(gifBox);
        newmanGif();
        setTimeout(function(){ 
            deleteButtons(gifBox);
            renderScoreInput();
        }, 3000);
        return;
    }  
    if (!answer) 
    {
        deleteButtons(gifBox);
        newmanGif();       
        setTimeout(function(){ 
            index++;
            deleteButtons(gifBox);
            startQuiz();
        }, 3000);
        return;
    }
    if (answer && index === questions.length - 1) 
    {
        renderScoreInput();
        return;
    }  
    if (answer) 
    {
        index++;
        startQuiz();
        return;
    }
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
    else                                           renderHighScores();
});

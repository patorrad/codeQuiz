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
var questionsBtn = document.querySelector("#btn-box");
var inputBox = document.querySelector("#input-box");
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
var penalty = 100; //seconds
var index = 0; //Question Number
renderTimeToPage();
timer.style = "font-size: xx-large"

function renderTimeToPage() {
    var time = secondsLeft / 10;
    timer.textContent = "Time: " + (secondsLeft % 10 === 0? time + ".0" : time);
}

function renderQuestions() {
    titleBox.textContent = questions[index].title;
    bodyBox.textContent = "";
}

function renderScore() {
    titleBox.textContent = "Your score was " + (secondsLeft / 10).toFixed();
    var inputB = document.createElement("input");
    inputB.textContent = "adsf";
    inputB.setAttribute("type", "text");
    inputB.setAttribute("value", "Enter Name");
    inputBox.appendChild(inputB);
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

function startQuiz(event) {
  
  clearInterval(timerInterval);
  renderQuestions();
  if (index === 0) deleteButtons(buttons);
  else             deleteButtons(questionsBtn);
  createButtons(questions[index].choices, questionsBtn);
  timerInterval = setInterval(function() {
      //event.stopPropagation();???
    secondsLeft--;
    renderTimeToPage();

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 100);
}

// function questionAnswered(event) { 
//     //answer = findAnswer();
//     //console.log(answer);
    
//     //console.log(questions[0].answer);
    
//     //console.log(checkAnswer(answer, questions[0].answer));
    
// }

// function findAnswer() {
//     //var btn = document.querySelector("#answerBtn");
//     //console.log(btn);
//     var element = event.target;
//     console.log(event);
    
//     questionsBtn.querySelectorAll('*').forEach(function(n){
//         console.log(n.firstChild.data === questions[0].answer)}
//     )}
    // for (x in questionsBtn.children) {
    //     console.log(questionsBtn.children[x].firstChild.data === questions[0].answer);
    //     console.log(questionsBtn.children[x].firstChild.data);
    //     console.log(questions[0].answer);
    //         //box2.children[x].firstChild === event.target.firstChild) 
    //     // {
    //     //     clearInterval(timerInterval);
    //     //     console.log(questionsBtn.children[x].firstChild.data);            
    //     //     return questionsBtn.children[x].firstChild.data//box2.children[x].firstChild.data;
    //     // }
        
    // }


function checkAnswer(event, arrayAnswer) {
    if (!(event.target.firstChild.data === arrayAnswer)) secondsLeft -= penalty;
    index++;
    startQuiz();
}

function renderScoreInput() {
    clearInterval(timerInterval);
    deleteButtons(questionsBtn);
    renderScore();
}

startButton.addEventListener("click", startQuiz);
questionsBtn.addEventListener("click", function() {
    event.preventDefault();
    if (index === questions.length - 1) renderScoreInput();
    else checkAnswer(event, questions[index].answer);
});
questionsBtn.addEventListener("submit", function(event) {
    //event.preventDefault();
    console.log("hello");
  });



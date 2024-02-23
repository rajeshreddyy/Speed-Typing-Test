let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let spinnerEl = document.getElementById("spinner");
let timerImgEl = document.getElementById("timerImg");
let secondsTextEl = document.getElementById("secondsText");

let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");

let timerEl = document.getElementById("timer");

let seconds = parseInt(timerEl.textContent);

let timeIdToClear;
let requestUrl = "https://apis.ccbp.in/random-quote";
let options = {
    method : "GET",
};
let timeId1 = setInterval(function(){
    seconds += 1;
    timerEl.textContent = seconds;
}, 1000);

function clearTimer(timeId){
    clearInterval(timeId);
}

function sendTheRequest(){
    
    timerImgEl.classList.add("d-none");
    timerEl.classList.add("d-none");
    secondsTextEl.classList.add("d-none");
    spinnerEl.classList.remove("d-none");
    
    fetch(requestUrl, options)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        
        timerImgEl.classList.remove("d-none");
        timerEl.classList.remove("d-none");
        secondsTextEl.classList.remove("d-none");
        spinnerEl.classList.add("d-none");
        
        quoteDisplayEl.textContent = data.content;
        console.log(data);
    });
}
sendTheRequest();

function getTheSpeed(){
    clearTimer(timeIdToClear);
    timeIdToClear = timeId1;
    clearTimer(timeIdToClear);
    if(quoteDisplayEl.textContent === quoteInputEl.value){
        resultEl.textContent = `You typed in ${timerEl.textContent} seconds`;
    }
    else{
        resultEl.textContent = "You typed incorrect sentence";
    }
    
}

function reset(){
    quoteInputEl.value = "";
    clearTimer(timeIdToClear);
    sendTheRequest();
    resultEl.textContent = "";
    timerImgEl.classList.add("d-none");
    timerEl.classList.add("d-none");
    secondsTextEl.classList.add("d-none");
    spinnerEl.classList.remove("d-none");
    seconds = 0;
    let timeId2 = setInterval(function(){
        seconds += 1;
        timerImgEl.classList.remove("d-none");
        timerEl.classList.remove("d-none");
        secondsTextEl.classList.remove("d-none");
        spinnerEl.classList.add("d-none");
        timerEl.textContent = seconds;
    }, 1000);
    timeIdToClear = timeId2;
}

submitBtnEl.addEventListener("click", getTheSpeed);
resetBtnEl.addEventListener("click", reset);



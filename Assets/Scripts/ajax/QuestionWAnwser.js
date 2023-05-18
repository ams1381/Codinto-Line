import {baseUrl , postRequest} from "./ajaxRequsts.js";

const reqUrl = baseUrl +"/question-api/questionnaires/e4f2305e-d282-4417-9484-e429f9a661a2/textanswer-questions/"
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const selection = document.querySelector("#pattern-select")
const minInput = document.querySelector(".minInput .label-text-input")
const maxInput = document.querySelector(".maxInput .label-text-input")
const sampleAnswer = document.querySelector(".SampleAnw .label-text-input")
const minVmax = document.querySelector(".AnswerAlphabetLimit")
const necessaryQuestion = document.querySelector(".AnswerNecessity .Switch-toggle input")
const QuestionNumber = document.querySelector(".QuestionNumber .Switch-toggle input")
const saveBtn = document.querySelector(".saveQuestion")

let sendFile  = {
    min: minInput.value,
    max: maxInput.value,
    title: titleInput.value,
    text: textInput.value,
    sampleAnswer: sampleAnswer.value,
    necessary: necessaryQuestion.checked,
    questionNumber: QuestionNumber.value,

}

// function processInput(entry) {
//     console.log(entry)
// }
//
// function inputValueInclude(input){
//     input.addEventListener("keyup", function(e) {
//         let InputEntry  = e.target.value;
//         processInput(InputEntry)
//     });
// }
// inputValueInclude(minInput)
//event listener------------------------------------


selection.addEventListener("change", function(event) {
   let selectedOption = event.target.options[event.target.selectedIndex];
    let classList = selectedOption.classList;
    switch (classList[1]) {
        case "text":  minVmax.style.display = "none";
             break;
        case "date__shamsi": minVmax.style.display="block";
            break;
        case "date__miladi": minVmax.style.display="block";
            break;
        case "phone__number": minVmax.style.display="block";
            break;
        case "home__phone": minVmax.style.display="block";
            break;
        case "number":  minVmax.style.display = "none"
            break;
        case "persion":  minVmax.style.display = "none"
            break;
        case "english":  minVmax.style.display = "none"
            break;
    }
});
saveBtn.addEventListener("click", function(event) {
    // ajax request----------------------------------
    postRequest(reqUrl,sendFile).then((response) => {
        console.log(response.status);
    }).catch((error) => {
        console.log(error);
    })
})


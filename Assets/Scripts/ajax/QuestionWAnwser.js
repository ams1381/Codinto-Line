
import {baseUrl , postRequest} from "./ajaxRequsts.js";

const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/textanswer-questions/`;
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const selection = document.querySelector("#pattern-select")
const minInput = document.querySelector(".minInput .label-text-input")
const maxInput = document.querySelector(".maxInput .label-text-input")
const sampleAnswer = document.querySelector(".SampleAnw .label-text-input")
const minVmax = document.querySelector(".AnswerAlphabetLimit")
const sampleAnswerBox = document.querySelector(".SampleAnw")
const uploadInput = document.querySelector(".box__file")
const necessaryQuestion = document.querySelector(".AnswerNecessity .Switch-toggle input")
const QuestionNumber = document.querySelector(".QuestionNumber .Switch-toggle input")
const saveBtn = document.querySelector(".saveQuestion")
let options = null;
// let question_type = "text_answer"
// initial data------------------------------------
options =  "free"
sampleAnswer.value = null;


//event listener------------------------------------

document.addEventListener("DOMContentLoaded", function(event) {
    minVmax.style.display = "block";
    sampleAnswerBox.style.display = "none";
})
selection.addEventListener("change", function(event) {
   let selectedOption = event.target.options[event.target.selectedIndex];
    let classList = selectedOption.classList;
    switch (classList[1]) {
        case "text":
            minVmax.style.display = "block";
            sampleAnswerBox.style.display = "none";
            options = selectedOption.classList[2]
             break;
        case "date__shamsi":
            minVmax.style.display="none";
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2]
            minInput.value = "";
            maxInput.value = "";
            break;
        case "date__miladi":
            minVmax.style.display="none";
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2]
            minInput.value = "";
            maxInput.value = "";
            break;
        case "phone__number1":
            minVmax.style.display="none";
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2];
            minInput.value = "";
            maxInput.value = "";
            break;
        case "home__phone":
            minVmax.style.display="none";
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2];
            minInput.value = "";
            maxInput.value = "";
            break;
        case "number":
            minVmax.style.display = "block"
            sampleAnswerBox.style.display = "none";
            options = selectedOption.classList[2]
            break;
        case "persion":
            minVmax.style.display = "block"
            sampleAnswerBox.style.display = "none";
            options = selectedOption.classList[2]
            break;
        case "english":
            minVmax.style.display = "block"
            sampleAnswerBox.style.display = "none";
            options = selectedOption.classList[2]
            break;
    }
    console.log(options)
});

saveBtn.addEventListener("click", function(event) {
   console.log(uploadInput.value)

    let sendFile  = {
        question_type : "text_answer",
        title: titleInput.value,
        question_text: textInput.value,
        placement: 12,
        group: "",
        is_required: necessaryQuestion.checked,
        show_number: QuestionNumber.checked,
        media: uploadInput.files[0],
        answer_template: null,
        pattern: options,
        min: minInput.value !== "" ? parseInt(minInput.value) : null,
        max: maxInput.value !== "" ? parseInt(maxInput.value) : null,
    };
    // if (sendFile.media === undefined){
    //     sendFile.media = ""
    // }
    // if (sendFile.min === undefined){
    //     sendFile.min = 200
    // }
    // if (sendFile.max === undefined){
    //     sendFile.max = 500
    // }



    if(titleInput.value === ""){
        alert("Please fill the title")
    }
    if (textInput.value === ""){
        alert("Please fill the description")
    }
    const formData = new FormData();
    for (let key in sendFile){
        if(sendFile[key] !== null && sendFile[key] !== undefined){
            formData.append(key, sendFile[key]);
        }
    }
    // ajax request----------------------------------
    postRequest(reqUrl,formData)
        .then((response) => {
        console.log(response.status);
        window.open("/Pages/FormDesign.html","_Self");
    }).catch((error) => {
        console.log(error);
    })
})

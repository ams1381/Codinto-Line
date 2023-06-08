import {baseUrl , postRequest} from "../ajax/ajaxRequsts.js";
import {file_upload_handler, preview_change_handler, question_creator, toggle_handler} from "./CommonActions.js";
import {number_question_postData, range_question_postData} from "../ajax/QuestionPostData.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const folder = baseUrl + "/user-api/folders/";
const questionnairesUrl = baseUrl + "/question-api/questionnaires/";
const reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/numberanswer-questions/`;

const titleInput = document.querySelector(".GTitle .TitleTextInput");
const textInput = document.querySelector(".GDesc .TitleTextInput");
const selection = document.querySelector("#pattern-select");
const sampleAnswer = document.querySelector(".SampleAnw .label-text-input");
const minVmax = document.querySelector(".AnswerAlphabetLimit");
// const sampleAnswerBox = document.querySelector(".SampleAnw")
const uploadInput = document.querySelector(".box__file");
const necessaryQuestion = document.querySelector(".AnswerNecessity .Switch-toggle input");
const QuestionNumber = document.querySelector(".QuestionNumber .Switch-toggle input");
const saveBtn = document.querySelector(".saveQuestion");
const questionText = document.querySelector(".questionText");
const questionDescription = document.querySelector(".ansswer__text");
const wrongAlert = document.querySelector(".wrongEntry");
const pictureSwitcher = document.querySelector(".picture__switcher");
const videoSwitcher = document.querySelector(".video__switcher");
const min = document.querySelector(".minInput .label-text-input");
const max = document.querySelector(".maxInput .label-text-input");

// initial data------------------------------------


function showAlert(text){
    wrongAlert.style.opacity = "1";
    document.querySelector('.block__side').scrollTo(0,0)
    window.scrollTo(0,0)
    let spanInput =  wrongAlert.childNodes[1]
    spanInput.innerText = `${text}`
    setTimeout(()=>
    {
        wrongAlert.style.opacity = "0";
    }, 3000);
}

titleInput.addEventListener('input',() => {preview_change_handler('Title-change',number_question_postData)})
textInput.addEventListener('input',() => {preview_change_handler('Desc-change',number_question_postData)})

function textStyle(input){
    const textEditor = document.querySelector(".TitleInputOptions")
    textEditor.addEventListener("click" , (e)=>{
        switch (e.target.classList[1]){
            case "fa-bold":
                input.classList.toggle("bold")
                break;
            case "fa-italic":
                input.classList.toggle("italic")
                break;
            case "fa-underline":
                input.classList.toggle("underline")
                break;
        }
    })
}
textStyle(titleInput)
//event listener------------------------------------
// create folder and questionnaire

// upload file limitation

uploadInput.addEventListener("change" , (e)=>{
    document.querySelector(".upload__link").innerText = uploadInput.files[0].name;
})

// add event listener to save button
saveBtn.addEventListener("click", async function (event) {


    // upload wrong error

    // let sendFile  = {
    //     question_type : "Number answer",
    //     title: titleInput.value,
    //     question_text: textInput.value,
    //     placement: 7,
    //     group: "",
    //     is_required: necessaryQuestion.checked,
    //     show_number: QuestionNumber.checked,
    //     media: uploadInput.files[0],
    //     min: min.value !== "" ? parseInt(min.value) : null,
    //     max: max.value !== "" ? parseInt(max.value) : null,
    // };

    // const formData = new FormData();
    // for (let key in sendFile){
    //     if(sendFile[key] !== null && sendFile[key] !== undefined){
    //         formData.append(key, sendFile[key]);
    //     }
    // }
    // // ajax request----------------------------------
    // console.log(formData)
    // postRequest(reqUrl,formData)
    //     .then((response) => {
    //         console.log(response.status);
    //         window.open("/Pages/FormDesign.html","_Self");
    //     }).catch((error) => {
    //     console.log(error);
    // })
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion.id,'link-questions',QuestionnaireUUID,number_question_postData);
    else
        await question_creator(ACTION_TYPE,null,'link-questions',QuestionnaireUUID,number_question_postData);
})
necessaryQuestion.addEventListener('click',() => {
    toggle_handler(necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,number_question_postData);
})
QuestionNumber.addEventListener('click',() => {
    toggle_handler(QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,number_question_postData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
        number_question_postData = file_input.files[0].name;
    file_upload_handler(selected_file_type,file_input);

})

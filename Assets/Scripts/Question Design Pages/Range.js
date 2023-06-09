import { range_question_postData} from "../ajax/QuestionPostData.js";
import {file_upload_handler, preview_change_handler, question_creator, toggle_handler} from "./CommonActions.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const titleInput = document.querySelector(".GTitle .TitleTextInput");
const textInput = document.querySelector(".GDesc .TitleTextInput");
const rightInput = document.querySelector(".right-Input .label-text-input")
const middleInput = document.querySelector(".middle-Input .label-text-input")
const leftInput = document.querySelector(".left-Input .label-text-input")
const uploadInput = document.querySelector(".box__file")
const saveBtn = document.querySelector(".saveQuestion")
const isRequired = document.querySelector(".AnswerNecessity input")
const showNumber = document.querySelector(".QuestionNumber input")
const rangeInput = document.querySelector(".rangeInput");
const wrongAlert = document.querySelector(".wrongEntry")
const questionText = document.querySelector(".questionText")
const questionDescription = document.querySelector(".ansswer__text")
const pictureSwitcher = document.querySelector(".picture__switcher")
const videoSwitcher = document.querySelector(".video__switcher")
rightInput.value = null;
middleInput.value = null;
leftInput.value = null;
rangeInput.value = 0;
if(ACTION_TYPE == 'Edit')
{
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    question_info_loader(EditableQuestion)
}
// functions--------------------------------------

function rangePreview(input){
    input.addEventListener("input" , (e)=>{
       document.querySelector(".range-label").innerText =  e.target.value
    })
}
rangePreview(rangeInput)
titleInput.addEventListener('input',() => {preview_change_handler('Title-change',range_question_postData)})
textInput.addEventListener('input',() => {preview_change_handler('Desc-change',range_question_postData)})

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
function rangeChange(input){
    input.addEventListener("input" , (e)=>{
        let rangeContainer = document.querySelector(".range__select");
        rangeContainer.innerHTML = ""
        for(let i = 0 ; i < e.target.value ; i++){
            let rangeItem = document.createElement("span")
            rangeItem.classList.add("range__number")
            rangeItem.innerText = i + 1
            rangeContainer.appendChild(rangeItem)
        }

    })
}
rangeChange(rangeInput)
uploadInput.addEventListener("change" , (e)=>{
    document.querySelector(".upload__link").innerText = uploadInput.files[0].name;
})
saveBtn.addEventListener("click" , async function (event){
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion.id,'integerrange-questions',QuestionnaireUUID,range_question_postData);
    else
        await question_creator(ACTION_TYPE,null,'integerrange-questions',QuestionnaireUUID,range_question_postData);
})
necessaryQuestion.addEventListener('click',() => {
    toggle_handler(necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,range_question_postData);
})
QuestionNumber.addEventListener('click',() => {
    toggle_handler(QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,range_question_postData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
        range_question_postData = file_input.files[0].name;
    file_upload_handler(selected_file_type,file_input);
})
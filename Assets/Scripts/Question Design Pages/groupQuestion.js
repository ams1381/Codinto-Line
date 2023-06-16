import {file_upload_handler, preview_question_toggle, question_creator, toggle_handler} from "./CommonActions.js";
import { preview_change_handler } from "./CommonActions.js";
import {
    group_question_postData
} from "../ajax/QuestionPostData.js";

const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const buttonText = document.querySelector(".ButtonTextInput")
const shapeSelector = document.querySelectorAll(".ShapeOptions label")
const saveBtn = document.querySelector(".saveQuestion")
const file_input = document.querySelector("#file.box__file");
const necessaryQuestion = document.querySelector(".AnswerNecessity .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".QuestionNumber .Switch-toggle .slider-button")
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button")

if(ACTION_TYPE == 'Edit')
{
     
    titleInput.value = EditableQuestion.title;
    textInput.value = EditableQuestion.description;
    buttonText.value = EditableQuestion.button_text
    shapeSelector.forEach((shapeLabel) => {
        if(EditableQuestion.is_solid_button)
            if(shapeLabel.classList.contains(EditableQuestion.button_shape) && shapeLabel.classList.contains('bg-colored'))
            {
                shapeLabel.previousElementSibling.checked = true;
                return
            }

            else
            if(shapeLabel.classList.contains(EditableQuestion.button_shape) && shapeLabel.classList.contains('bg-transp'))
            {
                shapeLabel.previousElementSibling.checked = true;
                return;
            }

    })

}
// functions

 
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',group_question_postData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',group_question_postData)})
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

let selectedObject = null
shapeSelector.forEach((e)=>{
    e.addEventListener("click" , ()=>{
        selectedObject = e.classList[1]
    })
})
saveBtn.addEventListener("click" , async function (event){

     
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'group-questions',QuestionnaireUUID,group_question_postData);
    else
        await question_creator(ACTION_TYPE,null,'group-questions',QuestionnaireUUID,group_question_postData);
})
necessaryQuestion.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,group_question_postData);
})
QuestionNumber.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,group_question_postData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
 
        group_question_postData = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,group_question_postData);
})
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
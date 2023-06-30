import {file_upload_handler, preview_change_handler, preview_question_toggle, question_creator, toggle_handler} from "./CommonActions.js";
import {number_question_postData} from "../ajax/QuestionPostData.js";
import {question_info_loader} from './QuestionInfoLoader.js'
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const titleInput = document.querySelector(".GTitle .TitleTextInput");
const textInput = document.querySelector(".GDesc .TitleTextInput");
const answer_number_selector_inputs = document.querySelectorAll('.AnswerAlphabetLimit  .label-text-input');
const uploadInput = document.querySelector(".box__file");
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button");
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button");
const saveBtn = document.querySelector(".saveQuestion");;
const file_input = document.querySelector("#file.box__file");
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion");
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button");
console.log(QuestionnaireUUID)
// initial data------------------------------------
if(ACTION_TYPE == 'Edit')
{
     
    question_info_loader(EditableQuestion)
}

 
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',number_question_postData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',number_question_postData)})
answer_number_selector_inputs.forEach((answer_number_selector_input) => {
    answer_number_selector_input.addEventListener('input',() => {
        if(answer_number_selector_input.getAttribute("id") == 'Alphabetmin')
            number_question_postData.min_selected_options = answer_number_selector_input.value;
        else 
            number_question_postData.max_selected_options = answer_number_selector_input.value; 
    })
})
saveBtn.addEventListener("click", async function (event) {
     
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'numberanswer-questions',QuestionnaireUUID,number_question_postData);
    else
        await question_creator(ACTION_TYPE,null,'numberanswer-questions',QuestionnaireUUID,number_question_postData);
})
necessaryQuestion.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,number_question_postData);
})
QuestionNumber.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,number_question_postData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
 
        number_question_postData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,number_question_postData);
})
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle);

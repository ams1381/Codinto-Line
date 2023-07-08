import {question_info_loader} from './QuestionInfoLoader.js'
import {link_question_PostData} from "../ajax/QuestionPostData.js";
import {
    file_upload_handler,
    preview_change_handler,
    preview_question_toggle,
    question_creator,
    question_placement_setter,
    showAlert,
    text_style_label_eventListener_setter,
    toggle_handler
} from "./CommonActions.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const textInput = document.querySelector(".GDesc .TitleTextInput")
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button")
const saveBtn = document.querySelector(".saveQuestion")
const file_input = document.querySelector("#file.box__file")
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button")
console.log(ACTION_TYPE)
let options = null;

// initial data------------------------------------
if(ACTION_TYPE == 'Edit')
{
     
    question_info_loader(EditableQuestion)
}
// options =  "free"
// sampleAnswer.value = null;
question_placement_setter(localStorage.getItem("question_placement"),link_question_PostData);
 
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',link_question_PostData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',link_question_PostData)})

// add event listener to save button
saveBtn.addEventListener("click", async function(event) {
     
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'link-questions',QuestionnaireUUID,link_question_PostData);
    else
        await question_creator(ACTION_TYPE,null,'link-questions',QuestionnaireUUID,link_question_PostData);
})
necessaryQuestion.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,link_question_PostData);
})
QuestionNumber.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,link_question_PostData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
 
        link_question_PostData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,link_question_PostData);
})
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
text_style_label_eventListener_setter(EditableQuestion,link_question_PostData);
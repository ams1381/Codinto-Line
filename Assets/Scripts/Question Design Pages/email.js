
import {baseUrl , postRequest} from "../ajax/ajaxRequsts.js";
import {
    showAlert,
    preview_change_handler,
    file_upload_handler,
    toggle_handler,
    preview_question_toggle,
    text_style_label_eventListener_setter,
    question_placement_setter
} from "./CommonActions/CommonActions.js";
import {email_question_PostData, } from "../ajax/QuestionPostData.js";
import { question_info_loader } from "./QuestionInfoLoader.js";
import {question_creator} from "./CommonActions/Create_Edit_request.js";
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const QuestionnaireUUID = JSON.parse(localStorage.getItem("SelectedQuestionnaire")).uuid;
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button")
const file_input = document.querySelector("#file.box__file")
const saveBtn = document.querySelector(".saveQuestion")
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button")
let options = null;

if(ACTION_TYPE == 'Edit' || ACTION_TYPE == 'Copy')
{
    question_info_loader(EditableQuestion)
    ACTION_TYPE == 'Copy' ? 
    question_placement_setter(localStorage.getItem("question_placement"),EditableQuestion) : ' '
}
// initial data------------------------------------
options =  "free"
question_placement_setter(localStorage.getItem("question_placement"),email_question_PostData)
 
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',email_question_PostData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',email_question_PostData)})


saveBtn.addEventListener("click", async function(event) {
     
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion,'email-questions',QuestionnaireUUID,email_question_PostData);
    else
        await question_creator(ACTION_TYPE,null,'email-questions',QuestionnaireUUID,email_question_PostData);
})
necessaryQuestion.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,email_question_PostData);
})
QuestionNumber.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,email_question_PostData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
 
        email_question_PostData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,email_question_PostData);
})

view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
text_style_label_eventListener_setter(EditableQuestion,email_question_PostData);
import {
    file_upload_handler,
    preview_change_handler,
    toggle_handler,
    text_style_setter,
    preview_question_toggle,
    text_style_label_eventListener_setter,
    question_placement_setter
} from "./CommonActions/CommonActions.js";
import {file_question_PostData, priority_question_PostData} from "../ajax/QuestionPostData.js";
import {question_info_loader} from './QuestionInfoLoader.js';
import {question_creator} from "./CommonActions/Create_Edit_request.js";
const QuestionnaireUUID = JSON.parse(localStorage.getItem("SelectedQuestionnaire")).uuid;
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc #desc_input");
const file_input = document.querySelector("#file.box__file");
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button");
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button");
const title_text_style_labels  = document.querySelectorAll(".GTitle .TitleInputOptions label i");
const desc_text_style_labels = document.querySelectorAll(".GDesc .DescInputOptions label i")
const preview_title_container = document.querySelector('.Question-Title p');
const preview_desc_container = document.querySelector('.description_block p');
const saveBtn = document.querySelector(".saveQuestion");
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion");
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button");

// initial data------------------------------------
question_placement_setter(localStorage.getItem("question_placement"),file_question_PostData);
if(ACTION_TYPE == 'Edit' || ACTION_TYPE == 'Copy')
{
    question_info_loader(EditableQuestion)
    ACTION_TYPE == 'Copy' ? 
    question_placement_setter(localStorage.getItem("question_placement"),EditableQuestion) : ' '
}

titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',file_question_PostData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',file_question_PostData)})


saveBtn.addEventListener("click", async function (event) {
// console.log(sizeInput.value);

     
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion,'file-questions',QuestionnaireUUID,file_question_PostData);
    else
        await question_creator(ACTION_TYPE,null,'file-questions',QuestionnaireUUID,file_question_PostData);
})
necessaryQuestion.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,file_question_PostData);
})
QuestionNumber.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,file_question_PostData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
        file_question_PostData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,file_question_PostData);
})
text_style_label_eventListener_setter(EditableQuestion,file_question_PostData);
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
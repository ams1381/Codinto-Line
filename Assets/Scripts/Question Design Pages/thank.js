import {
    file_upload_handler,
    question_creator,
    text_style_label_eventListener_setter,
    toggle_handler
} from "../Question Design Pages/CommonActions.js";
import { preview_change_handler , preview_question_toggle } from "../Question Design Pages/CommonActions.js";
import {thank_page_postData} from "../ajax/QuestionPostData.js";
import { question_info_loader } from "./QuestionInfoLoader.js";
const QuestionnaireUUID = JSON.parse(localStorage.getItem("SelectedQuestionnaire")).uuid;
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));

const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const file_input = document.querySelector("#file.box__file")
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const saveBtn = document.querySelector(".saveQuestion")
const share_link_toggle = document.querySelector(".share_link .Switch-Container .slider-button");
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion");
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button");

if(ACTION_TYPE == 'Edit' || ACTION_TYPE == 'Copy')
{  
   question_info_loader(EditableQuestion)
}
// initial data------------------------------------
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',thank_page_postData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',thank_page_postData)})
saveBtn.addEventListener("click", async function (event) {
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'thanks-pages',QuestionnaireUUID,thank_page_postData);
    else
        await question_creator(ACTION_TYPE,null,'thanks-pages',QuestionnaireUUID,thank_page_postData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
        thank_page_postData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,thank_page_postData);
})
share_link_toggle.addEventListener('click',() => {
    toggle_handler(EditableQuestion,share_link_toggle.parentElement.parentElement.parentElement,share_link_toggle,thank_page_postData);
    $('.shareLink').toggle(100);
})
text_style_label_eventListener_setter(EditableQuestion,thank_page_postData);
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
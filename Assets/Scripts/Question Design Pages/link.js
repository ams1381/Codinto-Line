import {baseUrl, getRequest, postRequest} from "../ajax/ajaxRequsts.js";
import {link_question_PostData, multiple_option_postData} from "../ajax/QuestionPostData.js";
import {
    file_upload_handler,
    preview_change_handler,
    preview_question_toggle,
    question_creator,
    showAlert,
    toggle_handler
} from "./CommonActions.js";
const folder = baseUrl + "/user-api/folders/"
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
const reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/link-questions/`
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const textInput = document.querySelector(".GDesc .TitleTextInput")
const sampleAnswer = document.querySelector(".SampleAnw .label-text-input")
const uploadInput = document.querySelector(".box__file")
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button")
const saveBtn = document.querySelector(".saveQuestion")
const file_input = document.querySelector("#file.box__file")
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button")

let options = null;

// initial data------------------------------------
if(ACTION_TYPE == 'Edit')
{
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    question_info_loader(EditableQuestion)
}
options =  "free"
sampleAnswer.value = null;

titleInput.addEventListener('input',() => {preview_change_handler('Title-change',link_question_PostData)})
textInput.addEventListener('input',() => {preview_change_handler('Desc-change',link_question_PostData)})

// add event listener to save button
saveBtn.addEventListener("click", async function(event) {
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion.id,'link-questions',QuestionnaireUUID,link_question_PostData);
    else
        await question_creator(ACTION_TYPE,null,'link-questions',QuestionnaireUUID,link_question_PostData);
})
necessaryQuestion.addEventListener('click',() => {
    toggle_handler(necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,link_question_PostData);
})
QuestionNumber.addEventListener('click',() => {
    toggle_handler(QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,link_question_PostData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
        link_question_PostData.media = file_input.files[0].name;
    file_upload_handler(selected_file_type,file_input);
})
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
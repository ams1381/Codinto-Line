import {
    file_upload_handler,
    question_creator,
    text_style_label_eventListener_setter,
    toggle_handler
} from "../Question Design Pages/CommonActions.js";
import { preview_change_handler , preview_question_toggle } from "../Question Design Pages/CommonActions.js";
import {thank_page_postData} from "../ajax/QuestionPostData.js";
import { question_info_loader } from "./QuestionInfoLoader.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));

const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const file_input = document.querySelector("#file.box__file")
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const saveBtn = document.querySelector(".saveQuestion")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button");
const telegram = document.querySelector(".telegram .Switch-toggle .slider-button")
const whatsapp = document.querySelector(".whatsapp .Switch-toggle .slider-button")
const instagram = document.querySelector(".instagram .Switch-toggle .slider-button")
const eitaa = document.querySelector(".eitaa .Switch-toggle .slider-button")
const sorush = document.querySelector(".sorush .Switch-toggle .slider-button");
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion");
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button");

if(ACTION_TYPE == 'Edit')
{  
   question_info_loader(EditableQuestion)
}
// initial data------------------------------------
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',thank_page_postData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',thank_page_postData)})

// function textStyle(input){
//     const textEditor = document.querySelector(".TitleInputOptions")
//     textEditor.addEventListener("click" , (e)=>{
//         switch (e.target.classList[1]){
//             case "fa-bold":
//                 input.classList.toggle("bold")
//                 break;
//             case "fa-italic":
//                 input.classList.toggle("italic")
//                 break;
//             case "fa-underline":
//                 input.classList.toggle("underline")
//                 break;
//         }
//     })
// }
// textStyle(titleInput)

//event listener------------------------------------
// create folder and questionnaire
// document.addEventListener("DOMContentLoaded" , (e)=>{
//     getRequest(folder).then((response)=>{
//         console.log(response.data);
//     })
//     getRequest(questionnairesUrl).then((response)=>{
//         console.log(response.data);
//     })

// })
// upload file limitation


// add event listener to save button
saveBtn.addEventListener("click", async function (event) {
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'thanks-pages',QuestionnaireUUID,thank_page_postData);
    else
        await question_creator(ACTION_TYPE,null,'thanks-pages',QuestionnaireUUID,thank_page_postData);
})
QuestionNumber.addEventListener('click',() => { 
toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,thank_page_postData);
})
telegram.addEventListener('click',() => {
    toggle_handler(EditableQuestion,telegram.parentElement.parentElement.parentElement,telegram,thank_page_postData);
})
instagram.addEventListener('click',() => {
    toggle_handler(EditableQuestion,instagram.parentElement.parentElement.parentElement,instagram,thank_page_postData);
})
eitaa.addEventListener('click',() => {
    toggle_handler(EditableQuestion,eitaa.parentElement.parentElement.parentElement,eitaa,thank_page_postData);
})
whatsapp.addEventListener('click',() => {
    toggle_handler(EditableQuestion,whatsapp.parentElement.parentElement.parentElement,whatsapp,thank_page_postData);
})
sorush.addEventListener('click',() => {
    toggle_handler(EditableQuestion,sorush.parentElement.parentElement.parentElement,sorush,thank_page_postData);
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
text_style_label_eventListener_setter(EditableQuestion,thank_page_postData);
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
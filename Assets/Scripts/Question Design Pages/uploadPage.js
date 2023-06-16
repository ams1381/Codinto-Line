import {
    file_upload_handler,
    preview_change_handler,
    question_creator,
    toggle_handler , 
    text_style_setter
} from "../Question Design Pages/CommonActions.js";
import {file_question_PostData} from "../ajax/QuestionPostData.js";
import {question_info_loader} from './QuestionInfoLoader.js'
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc #desc_input")
const file_input = document.querySelector("#file.box__file");
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button");
const title_text_style_labels  = document.querySelectorAll(".GTitle .TitleInputOptions label i");
const desc_text_style_labels = document.querySelectorAll(".GDesc .DescInputOptions label i")
const preview_title_container = document.querySelector('.Question-Title');
const preview_desc_container = document.querySelector('.description_block');
const saveBtn = document.querySelector(".saveQuestion")
const KBSelector = document.querySelector(".KB__switcher")
const sizeInput = document.querySelector(".file__size__upload")


// initial data------------------------------------
if(ACTION_TYPE == 'Edit')
{
     
    question_info_loader(EditableQuestion)
}

 
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',file_question_PostData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',file_question_PostData)})

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
title_text_style_labels.forEach((title_text_style_label) => {
    title_text_style_label.addEventListener('click',() => {
        let style_name = title_text_style_label.className;
        text_style_setter(style_name,preview_title_container,titleInput);
    })
})
desc_text_style_labels.forEach((desc_text_style_label) => {
    desc_text_style_label.addEventListener('click',() => {
        let style_name = desc_text_style_label.className;
        text_style_setter(style_name,preview_desc_container,textInput);
    })
})
// textStyle(titleInput)

saveBtn.addEventListener("click", async function (event) {
// console.log(sizeInput.value);

     
    if(EditableQuestion && ACTION_TYPE == 'Edit')
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
 
        file_question_PostData.media = file_input.files[0].name;
    file_upload_handler(selected_file_type,file_input,EditableQuestion,file_question_PostData);
})

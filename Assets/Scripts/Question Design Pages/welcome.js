import {file_upload_handler, preview_change_handler, question_creator, toggle_handler , showAlert} from "./CommonActions.js";
import {welcome_page_postData} from "../ajax/QuestionPostData.js";
import {question_info_loader} from './QuestionInfoLoader.js'
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput");
const button_text_input = document.querySelector('.GEntryButton .ButtonTextInput')
const file_input = document.querySelector("#file.box__file");
const button_shape_items = document.querySelectorAll(".ShapeOptions label")
const saveBtn = document.querySelector(".saveQuestion");
const preview_button = document.querySelector(".QuestionStart .QuestionStartButton")

if(ACTION_TYPE == 'Edit')
{    
    question_info_loader(EditableQuestion)
}
const preview_button_shape_handler = (Shape,IsSolid) => {
    if(IsSolid)
        preview_button.className = 'QuestionStartButton ' + 'solid ' + Shape;
    else
        preview_button.className = 'QuestionStartButton ' + 'empty ' + Shape;

    welcome_page_postData.is_solid_button = IsSolid;
    welcome_page_postData.button_shape = Shape;

    if(EditableQuestion)
    {
        EditableQuestion.is_solid_button = IsSolid;
        EditableQuestion.button_shape = Shape;
    }
}
const preview_button_text_handler = (ButtonText) => {
    preview_button.textContent = ButtonText;
    welcome_page_postData.button_text = ButtonText;
    if(EditableQuestion)
        EditableQuestion.button_text = ButtonText;
}
button_text_input.addEventListener('input',(e) => {
    preview_button_text_handler(e.target.value)
})
button_shape_items.forEach((button_shape_item)=>{
    button_shape_item.addEventListener("click" , ()=> {
        if(button_shape_item.className.split(" ")[0] == 'bg-colored')
            preview_button_shape_handler(button_shape_item.classList[1],true);
        else 
            preview_button_shape_handler(button_shape_item.classList[1],false);
    })
    
})
 
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',welcome_page_postData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',welcome_page_postData)})
saveBtn.addEventListener("click" , async function (event){
     
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'welcome-pages',QuestionnaireUUID,welcome_page_postData);
    else
        await question_creator(ACTION_TYPE,null,'welcome-pages',QuestionnaireUUID,welcome_page_postData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
        welcome_page_postData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,welcome_page_postData);
})

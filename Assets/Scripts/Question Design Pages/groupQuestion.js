import {file_upload_handler, preview_question_toggle, question_creator, question_placement_setter, text_style_label_eventListener_setter, toggle_handler} from "./CommonActions.js";
import { preview_change_handler } from "./CommonActions.js";
import {
    group_question_postData
} from "../ajax/QuestionPostData.js";
import { question_info_loader } from "./QuestionInfoLoader.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const buttonText = document.querySelector(".ButtonTextInput")
const shapeSelector = document.querySelectorAll(".ShapeOptions label")
const button_text_input = document.querySelector('.GEntryButton .ButtonTextInput');
const button_shape_items = document.querySelectorAll(".ShapeOptions label")
const saveBtn = document.querySelector(".saveQuestion")
const file_input = document.querySelector("#file.box__file");
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const preview_button = document.querySelector(".QuestionStart .QuestionStartButton")
const preview_button_text= document.querySelector(".QuestionStart .QuestionStartButton p")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button")
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button")

if(ACTION_TYPE == 'Edit')
{
    question_info_loader(EditableQuestion)
}
question_placement_setter(localStorage.getItem("question_placement"),group_question_postData);
// functions
const preview_button_shape_handler = (Shape,IsSolid) => {
    if(IsSolid)
        preview_button.className = 'QuestionStartButton ' + 'solid ' + Shape;
    else
        preview_button.className = 'QuestionStartButton ' + 'empty ' + Shape;

    group_question_postData.is_solid_button = IsSolid;
    group_question_postData.button_shape = Shape;

    if(EditableQuestion)
    {
        EditableQuestion.is_solid_button = IsSolid;
        EditableQuestion.button_shape = Shape;
    }
}
const preview_button_text_handler = (ButtonText) => {
    preview_button_text.textContent = ButtonText;
    group_question_postData.button_text = ButtonText;
    if(EditableQuestion)
        EditableQuestion.button_text = ButtonText;
    else
        group_question_postData.button_text = ButtonText;
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
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',group_question_postData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',group_question_postData)})

let selectedObject = null
shapeSelector.forEach((e)=>{
    e.addEventListener("click" , ()=>{
        selectedObject = e.classList[1]
    })
})
saveBtn.addEventListener("click" , async function (event){
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'question-groups',QuestionnaireUUID,group_question_postData);
    else
        await question_creator(ACTION_TYPE,null,'question-groups',QuestionnaireUUID,group_question_postData);
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
        group_question_postData .media= file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,group_question_postData);
})
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
text_style_label_eventListener_setter(EditableQuestion,group_question_postData);
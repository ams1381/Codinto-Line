import { text_question_with_out_answer_postData } from "../ajax/QuestionPostData.js"
import {
    preview_question_toggle,
    preview_change_handler,
    file_upload_handler,
    text_style_label_eventListener_setter,
    question_placement_setter,
    toggle_handler
} from "./CommonActions/CommonActions.js";
import { question_info_loader } from "./QuestionInfoLoader.js";
import {question_creator} from "./CommonActions/Create_Edit_request.js";

const titleInput = document.querySelector(".GTitle .TitleTextInput");
const textInput = document.querySelector(".GDesc .TitleTextInput");
const saveBtn = document.querySelector(".saveQuestion")
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const QuestionnaireUUID = JSON.parse(localStorage.getItem("SelectedQuestionnaire")).uuid;
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const file_input = document.querySelector("#file.box__file");
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button")
const show_number_toggle = document.querySelector(".show_number .Switch-Container .slider-button")
const button_text_input = document.querySelector('.GEntryButton .ButtonTextInput')
const button_shape_items = document.querySelectorAll(".ShapeOptions label")
const preview_button = document.querySelector(".QuestionStart .QuestionStartButton")
const preview_button_text= document.querySelector(".QuestionStart .QuestionStartButton p")

question_placement_setter(localStorage.getItem("question_placement"),text_question_with_out_answer_postData)
if(ACTION_TYPE == 'Edit' || ACTION_TYPE == 'Copy')
{
    question_info_loader(EditableQuestion)
    ACTION_TYPE == 'Copy' ? 
    question_placement_setter(localStorage.getItem("question_placement"),EditableQuestion) : ' '
}

titleInput.addEventListener('input', () => { preview_change_handler(EditableQuestion,'Title-change', text_question_with_out_answer_postData) })
textInput.addEventListener('input', () => { preview_change_handler(EditableQuestion,'Desc-change', text_question_with_out_answer_postData) })

file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
 
        text_question_with_out_answer_postData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,text_question_with_out_answer_postData);
})
const preview_button_shape_handler = (Shape,IsSolid) => {
    preview_button.classList.remove('oval','round','sharp');
    preview_button.classList.add(Shape)
    if(IsSolid)
    {
        preview_button.classList.remove('empty')
        preview_button.classList.add('solid')
    }
       
    else
    {
        preview_button.classList.remove('solid')
        preview_button.classList.add('empty')
    }
    text_question_with_out_answer_postData.is_solid_button = IsSolid;
    text_question_with_out_answer_postData.button_shape = Shape;
    if(EditableQuestion)
    {
        EditableQuestion.is_solid_button = IsSolid;
        EditableQuestion.button_shape = Shape;
    }
}
const preview_button_text_handler = (ButtonText) => {
    preview_button_text.textContent = ButtonText;
    text_question_with_out_answer_postData.button_text = ButtonText;
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
show_number_toggle.addEventListener('click',() => {
    toggle_handler(EditableQuestion,show_number_toggle.parentElement.parentElement.parentElement,show_number_toggle,text_question_with_out_answer_postData);
})
saveBtn.addEventListener("click" , async function (event){
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion,'noanswer-questions',QuestionnaireUUID,text_question_with_out_answer_postData);
    else
        await question_creator(ACTION_TYPE,null,'noanswer-questions',QuestionnaireUUID,text_question_with_out_answer_postData);
})
text_style_label_eventListener_setter(EditableQuestion,text_question_with_out_answer_postData);
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
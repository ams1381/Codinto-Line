import { preview_answer_option_generator 
    , preview_option_label_updater 
    , preview_answer_option_hider
    , preview_answer_option_remover
    , preview_change_handler
    , answer_option_adder
    , answer_option_remover
    , question_creator
    , toggle_handler 
    , file_upload_handler,
    preview_question_toggle,
    text_style_label_eventListener_setter,
    question_placement_setter,
    shuffleArray
 } from './CommonActions.js'
import {priority_question_PostData} from "../ajax/QuestionPostData.js";
import { question_info_loader } from "./QuestionInfoLoader.js";
const QuestionnaireUUID = JSON.parse(localStorage.getItem("SelectedQuestionnaire")).uuid;
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const textInput = document.querySelector(".GDesc .TitleTextInput")
const file_input = document.querySelector("#file.box__file");
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button")
const saveBtn = document.querySelector(".saveQuestion")
const answer_option_inputs = document.querySelectorAll(".anw-option-input");
const answer_option_view_buttons = document.querySelectorAll(".answer-option-view");
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button");
const randomize_options_toggle = document.querySelector(".is_random_options .Switch-Container .slider-button");
let answer_option_buttons = document.querySelectorAll(".anw-option-tools button");
const preview_answer_options_container = document.querySelectorAll(".multiple_answer_block-options.nested");
let preview_select_container = document.querySelector('.multiple_answer_block-options');


question_placement_setter(localStorage.getItem("question_placement"),priority_question_PostData)
if(ACTION_TYPE == 'Edit' || ACTION_TYPE == 'Copy')
{    
    question_info_loader(EditableQuestion)
}
const answer_options_drag = dragula(
    [...preview_answer_options_container], {
    direction : 'vertical',
    slideFactorX : 0,
    }
)
const preview_default_order_setter = (PostData) => {
    let preview_select_items =  document.querySelectorAll(".multiple_answer_block-option");
 
   let sorted_select_item = Array.from(preview_select_items).sort((a, b) => a.id.localeCompare(b.id))
   sorted_select_item.reduce((fragment, item) => (fragment.appendChild(item), fragment), document.createDocumentFragment()).childNodes;
   preview_select_items.forEach((preview_select_item) => {  preview_select_item.remove() })
   sorted_select_item.forEach((defaultItem) => {
     preview_select_container.innerHTML += defaultItem.outerHTML;
 })
     preview_select_items =  document.querySelectorAll(".multiple_answer_block-option")
     PostData.options = [];
         [...preview_select_items].forEach((sorted_select_item) => {
             PostData.options.push(
                 { text : sorted_select_item.lastElementChild.textContent }
             )
         })
}

answer_option_inputs.forEach((answer_option_input,index) => {
    answer_option_input.addEventListener('input',(e) => {
        if(EditableQuestion)
            preview_option_label_updater(index,e.target.value,"MultipleOption",EditableQuestion)
        else
            preview_option_label_updater(index,e.target.value,"MultipleOption",priority_question_PostData)
    })
})
answer_option_buttons.forEach((answer_option_button) => {
    if(answer_option_button.classList.contains('answer-option-add'))
        answer_option_button.addEventListener('click',() => {
            answer_option_adder("MultipleOption",null,priority_question_PostData);
        })
    if(answer_option_button.classList.contains('answer-option-remove'))
        answer_option_button.addEventListener('click',() => {
            answer_option_remover();
            preview_answer_option_remover("MultipleOption");
        })
})
answer_option_view_buttons.forEach((answer_option_view_button,index) => {
    answer_option_view_button.addEventListener('click',() => {
        preview_answer_option_hider(answer_option_view_button,index,"MultipleOption");
    })
})
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',priority_question_PostData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',priority_question_PostData)})
// add event listener to save button
saveBtn.addEventListener("click", async function (event) {
     
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion,'sort-questions',QuestionnaireUUID,EditableQuestion);
    else
        await question_creator(ACTION_TYPE,null,'sort-questions',QuestionnaireUUID,priority_question_PostData);
})
necessaryQuestion.addEventListener('click',() => {
    toggle_handler(EditableQuestion,necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,priority_question_PostData);
})
QuestionNumber.addEventListener('click',() => {
    toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,priority_question_PostData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
 
        priority_question_PostData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,priority_question_PostData);
})
randomize_options_toggle.addEventListener('click',() => {
    toggle_handler(EditableQuestion,randomize_options_toggle.parentElement.parentElement.parentElement,randomize_options_toggle,priority_question_PostData);
    if(!randomize_options_toggle.previousElementSibling.checked)
    {
            EditableQuestion ? shuffleArray(EditableQuestion.options,EditableQuestion,'MultipleOption','multiple_answer_block-option') 
            :shuffleArray(priority_question_PostData.options,priority_question_PostData,'MultipleOption','multiple_answer_block-option')
    }   
    else
    {
        EditableQuestion ? preview_default_order_setter(EditableQuestion) :
            preview_default_order_setter(priority_question_PostData)
    }
})
text_style_label_eventListener_setter(EditableQuestion,priority_question_PostData);
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
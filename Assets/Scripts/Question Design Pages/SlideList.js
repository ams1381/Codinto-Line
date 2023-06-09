import {preview_answer_option_hider
    , preview_answer_option_remover
    , preview_change_handler
    , answer_option_adder
    , answer_option_remover
    , preview_option_label_updater
    , question_creator
    , toggle_handler
    , file_upload_handler,
    preview_question_toggle
 } from './CommonActions.js'
import { slider_option_postData } from "../ajax/QuestionPostData.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE")
const randomize_options_toggle = document.querySelector(".is_random_options .Switch-Container .slider-button");
const show_number_toggle = document.querySelector(".show_number .Switch-Container .slider-button")
const required_toggle = document.querySelector('.is_required .Switch-Container .slider-button');
const multiple_answer_selector = document.querySelector(".answer-number-selector");
const multiple_answer_toggle = document.querySelector(".multiple_choice .Switch-toggle .slider-button");
const file_input = document.querySelector("#file.box__file");
const answer_option_inputs = document.querySelectorAll(".anw-option-input");
const Title_input = document.getElementById("title__input");
const Description_input = document.getElementById("desc_input");
const answer_option_view_buttons = document.querySelectorAll(".answer-option-view");
const save_question_btn = document.querySelector('.SideFooter .saveQuestion');
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion");
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button");

let Answer_option_buttons = document.querySelectorAll(".anw-option-tools button");
if(ACTION_TYPE == 'Edit')
{
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    question_info_loader(EditableQuestion)
}
save_question_btn.addEventListener('click',async () => {
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    await question_creator(ACTION_TYPE,EditableQuestion.id,'dropdown-questions',QuestionnaireUUID,slider_option_postData)
})
Answer_option_buttons.forEach((answer_option_button) => {
    if(answer_option_button.classList.contains('answer-option-add'))
        answer_option_button.addEventListener('click',() => {
            answer_option_adder("SliderOption");
        })
    if(answer_option_button.classList.contains('answer-option-remove'))
        answer_option_button.addEventListener('click',() => {
            answer_option_remover("SliderOption");
            preview_answer_option_remover("SliderOption");
        })
})
multiple_answer_toggle.addEventListener('click',() => {
    toggle_handler(multiple_answer_selector,multiple_answer_toggle,slider_option_postData)
})
answer_option_inputs.forEach((answer_option_input,index) => {
    answer_option_input.addEventListener('input',(e) => {
        preview_option_label_updater(index,e.target.value,"SliderOption")
    })
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => { 
         if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
      slider_option_postData.media = file_input.files[0].name;
  file_upload_handler(selected_file_type,file_input);
})
answer_option_view_buttons.forEach((answer_option_view_button,index) => {
    answer_option_view_button.addEventListener('click',() => {
        preview_answer_option_hider(answer_option_view_button,index,"SliderOption");
    })
})
randomize_options_toggle.addEventListener('click',() => {
    toggle_handler(randomize_options_toggle.parentElement.parentElement.parentElement,randomize_options_toggle,slider_option_postData);
})
show_number_toggle.addEventListener('click',() => {
    toggle_handler(show_number_toggle.parentElement.parentElement.parentElement,show_number_toggle,slider_option_postData);
})
required_toggle.addEventListener('click',() => {
    toggle_handler(required_toggle.parentElement.parentElement.parentElement,required_toggle,slider_option_postData);
})
Title_input.addEventListener('input',() => {preview_change_handler('Title-change',slider_option_postData)});
Description_input.addEventListener('input',() => {preview_change_handler('Desc-change',slider_option_postData)});

view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
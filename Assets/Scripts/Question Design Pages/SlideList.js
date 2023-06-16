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
import { question_info_loader } from './QuestionInfoLoader.js';
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE")
const randomize_options_toggle = document.querySelector(".is_random_options .Switch-Container .slider-button");
const show_number_toggle = document.querySelector(".show_number .Switch-Container .slider-button")
const required_toggle = document.querySelector('.is_required .Switch-Container .slider-button');
const multiple_answer_selector = document.querySelector(".answer-number-selector");
const multiple_answer_toggle = document.querySelector(".multiple_choice .Switch-toggle .slider-button");
const file_input = document.querySelector("#file.box__file");
const answer_option_inputs = document.querySelectorAll(".anw-option-input");
const Title_input = document.getElementById("title__input");
const is_alphabetic_toggle = document.querySelector(".is_alphabetic_order .Switch-Container .slider-button")
const Description_input = document.getElementById("desc_input");
const answer_option_view_buttons = document.querySelectorAll(".answer-option-view");
const save_question_btn = document.querySelector('.SideFooter .saveQuestion');
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion");
const multiple_answer_select_inputs = document.querySelectorAll(".LimitInput input")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button");

let Answer_option_buttons = document.querySelectorAll(".anw-option-tools button");
if(ACTION_TYPE == 'Edit')
{
    question_info_loader(EditableQuestion)
}
save_question_btn.addEventListener('click',async () => {
     console.log('asfasfasf')
    if(ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'dropdown-questions',QuestionnaireUUID,slider_option_postData)
    else
        await question_creator(ACTION_TYPE,null,'dropdown-questions',QuestionnaireUUID,slider_option_postData)
})
const preview_alphabetically_sort = () => {
    let preview_select_items =  document.querySelectorAll(".selection__box  .selection__item");

    let sorted_select_items = Array.from(preview_select_items).sort((a, b) => a.lastElementChild.textContent.localeCompare(b.lastElementChild.textContent));
    sorted_select_items.forEach((item) => {

        preview_select_container.appendChild(item)
    });
    slider_option_postData.options = [];
    sorted_select_items.forEach((sorted_select_item) => {
        slider_option_postData.options.push(
            { text : sorted_select_item.lastElementChild.textContent }
        )
    })
    console.log(slider_option_postData)
}
const preview_default_order_setter = () => {
   let preview_select_items =  document.querySelectorAll(".selection__box  .selection__item");

//    Array.from(preview_select_items).sort((a, b) => a.id.localeCompare(b.id))
//   .reduce((fragment, item) => (fragment.appendChild(item), fragment), document.createDocumentFragment()).childNodes
//   .forEach((defaultItem) => console.log(defaultItem))

  Array.from(preview_select_items).sort((a, b) => a.id.localeCompare(b.id))
  t.reduce((fragment, item) => (fragment.appendChild(item), fragment), document.createDocumentFragment()).childNodes
  forEach((defaultItem) => preview_select_container.append(defaultItem.lastElementChild))
}
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
  
toggle_handler(EditableQuestion,multiple_answer_selector,multiple_answer_toggle,slider_option_postData)
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
 
      slider_option_postData.media = file_input.files[0];
  file_upload_handler(selected_file_type,file_input,EditableQuestion,slider_option_postData);
})
answer_option_view_buttons.forEach((answer_option_view_button,index) => {
    answer_option_view_button.addEventListener('click',() => {
        preview_answer_option_hider(answer_option_view_button,index,"SliderOption");
    })
})
multiple_answer_select_inputs.forEach((multiple_answer_select_input) => {
    multiple_answer_select_input.addEventListener('input',() => {
        if(multiple_answer_select_input.id == "Answermin")
           slider_option_postData.min_selected_options =  multiple_answer_select_input.value;
        else
            slider_option_postData.max_selected_options = multiple_answer_select_input.value;    
})
})
randomize_options_toggle.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,randomize_options_toggle.parentElement.parentElement.parentElement,randomize_options_toggle,slider_option_postData);
})
show_number_toggle.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,show_number_toggle.parentElement.parentElement.parentElement,show_number_toggle,slider_option_postData);
})
required_toggle.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,required_toggle.parentElement.parentElement.parentElement,required_toggle,slider_option_postData);
})
is_alphabetic_toggle.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,is_alphabetic_toggle.parentElement.parentElement.parentElement,is_alphabetic_toggle,slider_option_postData);
    
    preview_alphabetically_sort();
})
 
Title_input.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',slider_option_postData)});
Description_input.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',slider_option_postData)});

view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
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
        preview_question_toggle
     } from './CommonActions.js'
import { multiple_option_postData } from "../ajax/QuestionPostData.js";
import { question_info_loader } from './QuestionInfoLoader.js'
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const double_image_size_toggle = document.querySelector('.double_picture_size .Switch-Container .slider-button')
const Title_input = document.getElementById("title__input");
const Description_input = document.getElementById("desc_input");
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const multiple_answer_toggle = document.querySelector(".multiple_choice .Switch-toggle .slider-button");
const multiple_answer_selector = document.querySelector(".answer-number-selector");
const additional_options_toggle = document.querySelector(".additional-options-toggle .Switch-Container .slider-button");
const randomize_options_toggle = document.querySelector(".is_random_options .Switch-Container .slider-button");
const vertical_order_toggle = document.querySelector(".is_vertical .Switch-Container .slider-button");
const all_options_toggle = document.querySelector(".all_options .Switch-Container .slider-button");
const no_options_toggle = document.querySelector(".nothing_selected .Switch-Container .slider-button");
const show_number_toggle = document.querySelector(".show_number .Switch-Container .slider-button")
const required_toggle = document.querySelector('.is_required .Switch-Container .slider-button');
const multiple_answer_select_inputs = document.querySelectorAll(".LimitInput input")
const additional_options_selector = document.querySelector(".additional_options");
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button");


const answer_option_inputs = document.querySelectorAll(".anw-option-input");
const answer_option_view_buttons = document.querySelectorAll(".answer-option-view");
const file_input = document.querySelector("#file.box__file")
const answer_number_selector_inputs = document.querySelectorAll('.answer-number-selector .label-text-input');
const save_question_btn = document.querySelector('.SideFooter .saveQuestion')

let answer_option_buttons = document.querySelectorAll(".anw-option-tools button");
if(ACTION_TYPE == 'Edit')
{
     
    question_info_loader(EditableQuestion)
}

save_question_btn.addEventListener('click', async () => {
     
   await question_creator(ACTION_TYPE,EditableQuestion,'optional-questions',QuestionnaireUUID,multiple_option_postData);
})
answer_number_selector_inputs.forEach((answer_number_selector_input) => {
    answer_number_selector_input.addEventListener('input',() => {
        if(answer_number_selector_input.getAttribute("id") == 'Answermin')
            multiple_option_postData.min_selected_options = answer_number_selector_input.value;
        else 
            multiple_option_postData.max_selected_options = answer_number_selector_input.value; 
    })
})
answer_option_inputs.forEach((answer_option_input,index) => {
    answer_option_input.addEventListener('input',(e) => {
        preview_option_label_updater(index,e.target.value,"MultipleOption")
    })
})
answer_option_buttons.forEach((answer_option_button) => {
    if(answer_option_button.classList.contains('answer-option-add'))
        answer_option_button.addEventListener('click',() => {
            answer_option_adder("MultipleOption",multiple_option_postData);
        })
    if(answer_option_button.classList.contains('answer-option-remove'))
        answer_option_button.addEventListener('click',() => {
            answer_option_remover();
            preview_answer_option_remover("MultipleOption");
        })
})
multiple_answer_toggle.addEventListener('click',() => {
  
  toggle_handler(EditableQuestion,multiple_answer_selector,multiple_answer_toggle,multiple_option_postData)
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => { 
         if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    
//    {
//       let reader = new FileReader();
//       reader.onloadend = function() {
//           let encodedFile = reader.result;
//        };
//     reader.readAsDataURL(file_input.files[0]);
//    }
    // let my_form = document.querySelector(".inputUploader form")
    // let FoarmData = new FormData(my_form);
    if(file_input.files)
        multiple_option_postData.media = file_input.files[0];
      //  console.log(encodeURIComponent(file_input.files[0]))
 
  file_upload_handler(selected_file_type,file_input,EditableQuestion,multiple_option_postData);
})
additional_options_toggle.addEventListener("click",() => {
  
toggle_handler(EditableQuestion,additional_options_selector,additional_options_toggle,multiple_option_postData)

})
answer_option_view_buttons.forEach((answer_option_view_button,index) => {
    answer_option_view_button.addEventListener('click',() => {
        preview_answer_option_hider(answer_option_view_button,index,"MultipleOption");
    })
})
randomize_options_toggle.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,randomize_options_toggle.parentElement.parentElement.parentElement,randomize_options_toggle,multiple_option_postData);
})
vertical_order_toggle.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,vertical_order_toggle.parentElement.parentElement.parentElement,vertical_order_toggle,multiple_option_postData);
})
all_options_toggle.addEventListener('click',() => {
    toggle_handler(EditableQuestion,all_options_toggle.parentElement.parentElement.parentElement,all_options_toggle,multiple_option_postData);
})
no_options_toggle.addEventListener('click',() => {
  
    toggle_handler(EditableQuestion,no_options_toggle.parentElement.parentElement.parentElement,no_options_toggle,multiple_option_postData);
})
show_number_toggle.addEventListener('click',() => {
  
    toggle_handler(EditableQuestion,show_number_toggle.parentElement.parentElement.parentElement,show_number_toggle,multiple_option_postData);
})
required_toggle.addEventListener('click',() => {
  
    toggle_handler(EditableQuestion,required_toggle.parentElement.parentElement.parentElement,required_toggle,multiple_option_postData);
})
multiple_answer_select_inputs.forEach((multiple_answer_select_input) => {
    multiple_answer_select_input.addEventListener('input',() => {
        if(multiple_answer_select_input.id == "Answermin")
           multiple_option_postData.min_selected_options =  multiple_answer_select_input.value;
        else
            multiple_option_postData.max_selected_options = multiple_answer_select_input.value;    
})
})
double_image_size_toggle.addEventListener('click',() => {
    preview_image_main.classList.toggle('double_size');
    if(!double_image_size_toggle.previousElementSibling.checked)
        {
          EditableQuestion ? EditableQuestion.double_picture_size = true :
          slider_option_postData.double_picture_size = true;
        }
    else
        {
          EditableQuestion ? EditableQuestion.double_picture_size = false :
          slider_option_postData.double_picture_size = false;
        }
    console.log(EditableQuestion)
})
Title_input.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',multiple_option_postData)});
Description_input.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',multiple_option_postData)});
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
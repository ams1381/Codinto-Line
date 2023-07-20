import {
    preview_change_handler
    , question_creator
    , toggle_handler
    , file_upload_handler,
    preview_question_toggle,
    text_style_label_eventListener_setter,
    question_placement_setter
 } from './CommonActions.js'
import { question_info_loader } from './QuestionInfoLoader.js';
import { selective_degree_postData } from '../ajax/QuestionPostData.js';
const QuestionnaireUUID = JSON.parse(localStorage.getItem("SelectedQuestionnaire")).uuid;
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const Title_input = document.getElementById("title__input");
const Description_input = document.getElementById("desc_input");
const show_number_toggle = document.querySelector(".show_number .Switch-Container .slider-button")
const required_toggle = document.querySelector('.is_required .Switch-Container .slider-button');
const file_input = document.querySelector("#file.box__file");
const degree_input = document.getElementById('degree_input');
const degree_label = document.querySelector('.range-label');
const preview_degree_container = document.querySelector('.degree_answer_block-options');
let preview_degree_shapes = document.querySelectorAll('.degree_answer_block-option label i');
let preview_degree_items = document.querySelectorAll('.degree_answer_block-options .degree_answer_block-option');
const degree_shape_labels = document.querySelectorAll(".shape_selector_options label");
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion");
let input_items = document.querySelectorAll('.degree_answer_block-options .degree_answer_block-option input')
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button");
const save_question_btn = document.querySelector('.SideFooter .saveQuestion');

question_placement_setter(localStorage.getItem("question_placement"),selective_degree_postData);
if(ACTION_TYPE == 'Edit' || ACTION_TYPE == 'Copy')
{
    question_info_loader(EditableQuestion)
}

const preview_degree_handler = (degree,shape_icon_className) => {
    preview_degree_items = document.querySelectorAll('.degree_answer_block-options .degree_answer_block-option');
    degree_label.textContent = degree ;
    preview_degree_items.forEach((preview_degree_item) => {
        $(preview_degree_item).hide(100);
        preview_degree_item.remove();
    })
    for(let i = 0; i < degree; i++)
    {
        const degree_element = `
        <div class="degree_answer_block-option">
            <input type="radio" id="answer-n${i}">
            <label class="answer_option-label" for="answer-n${i}"><i class="${shape_icon_className.className}"></i></label>
        </div>`
        const parser = new DOMParser();
        const parsed_degree_element = parser.parseFromString((degree_element),'text/html').firstChild.lastChild.firstChild;
        $(parsed_degree_element).hide();
        preview_degree_container.append(parsed_degree_element);
        $(parsed_degree_element).show(50);
    }
     preview_degree_items = document.querySelectorAll('.degree_answer_block-options .degree_answer_block-option');
     preview_degree_shapes = document.querySelectorAll('.degree_answer_block-option label i');
     input_items = document.querySelectorAll('.degree_answer_block-options .degree_answer_block-option input')

     if(EditableQuestion && ACTION_TYPE == 'Edit')
        EditableQuestion.max = degree;
    else
        selective_degree_postData.max = degree;
    preview_degree_eventListener_setter(preview_degree_items,input_items)
}
const preview_degree_shape_handler = (selected_shape,DataForPost,shape_icon_className) => {
    preview_degree_items = document.querySelectorAll('.degree_answer_block-options .degree_answer_block-option');
    preview_degree_shapes = document.querySelectorAll('.degree_answer_block-option label i')
    console.log(shape_icon_className)
    switch(selected_shape)
    {
        case 'star_shaped':
            shape_icon_className = 'fa fa-star-o';
            DataForPost.shape = 'S';
            break;
        case 'heart_shaped':
            shape_icon_className = 'fa fa-heart-o';
            DataForPost.shape = 'H';
            break;
        case 'check_shaped':
            shape_icon_className = 'fa fa-check-circle-o'
            break;
        case 'thumb_shaped':
            shape_icon_className = 'fa fa-thumbs-up'
            DataForPost.shape = 'L';
            break;
    }
    preview_degree_shapes.forEach((preview_degree_shape) => {
        preview_degree_shape.className = shape_icon_className;
    })
    input_items = document.querySelectorAll('.degree_answer_block-options .degree_answer_block-option input')
    preview_degree_eventListener_setter(preview_degree_items,input_items)
}
degree_shape_labels.forEach((degree_shape_label) => {
    degree_shape_label.addEventListener('click',() => {
        let shape_icon_className = degree_shape_label.firstChild.className;
        let selected_shape =  degree_shape_label.previousElementSibling.value;
        if(EditableQuestion  && ACTION_TYPE == 'Edit')
            preview_degree_shape_handler(selected_shape,EditableQuestion,shape_icon_className);
        else
            preview_degree_shape_handler(selected_shape,selective_degree_postData,shape_icon_className);
    })
})
save_question_btn.addEventListener('click',async () => {
    await question_creator(ACTION_TYPE,EditableQuestion,'integerselective-questions',QuestionnaireUUID,selective_degree_postData)
})
degree_input.addEventListener('input',() => {
    let shape_icon_className = document.querySelector('.shape_selector_options input:checked + label i');
    preview_degree_handler(degree_input.value,shape_icon_className);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => { 
         if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
 
      selective_degree_postData.media = file_input.files[0];
  file_upload_handler(selected_file_type,file_input,EditableQuestion,selective_degree_postData);
})
 
Title_input.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',selective_degree_postData)});
Description_input.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',selective_degree_postData)});

show_number_toggle.addEventListener('click',() => {
    toggle_handler(EditableQuestion,show_number_toggle.parentElement.parentElement.parentElement,show_number_toggle,selective_degree_postData);
})
required_toggle.addEventListener('click',() => {
    toggle_handler(EditableQuestion,required_toggle.parentElement.parentElement.parentElement,required_toggle,selective_degree_postData);
})
text_style_label_eventListener_setter(EditableQuestion,selective_degree_postData);
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
const preview_degree_eventListener_setter = (degree_items,input_items) => {
    degree_items.forEach((preview_degree_item,index) => {
        preview_degree_item.addEventListener('click',() => {
            input_items.forEach((item) => 
            { 
                item.classList.remove('selected_answer')
                if(preview_degree_item.firstElementChild.getAttribute('id') !== item.getAttribute('id')) 
                    item.checked = false
             })
           degree_click_handler(degree_items.length - index,input_items,preview_degree_item.firstElementChild);
        })
    })
    const degree_click_handler = (Click_index,preview_degree_inputs,clicked_input) => {
        preview_degree_inputs.forEach((item,index) => {
            if(preview_degree_inputs.length - index <= Click_index - 1)
            {
                
                item.checked = true;
                clicked_input.classList.add('selected_answer');
            }
                
        })
    }
}
preview_degree_eventListener_setter(preview_degree_items,input_items)
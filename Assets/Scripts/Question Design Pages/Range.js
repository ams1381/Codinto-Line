import { range_question_postData} from "../ajax/QuestionPostData.js";
import {file_upload_handler, preview_change_handler, preview_question_toggle, question_creator, question_placement_setter, text_style_label_eventListener_setter, toggle_handler} from "./CommonActions.js";
import {question_info_loader} from './QuestionInfoLoader.js'
import { range_item_eventListener_setter } from "../../../Components/questionBox/rangeSelect.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const titleInput = document.querySelector(".GTitle .TitleTextInput");
const textInput = document.querySelector(".GDesc .TitleTextInput");
const rightInput = document.querySelector(".right-Input .label-text-input")
const middleInput = document.querySelector(".middle-Input .label-text-input")
const leftInput = document.querySelector(".left-Input .label-text-input")
const file_input = document.querySelector("#file.box__file");
const preview_left_label = document.querySelector(".range__select_labels .range__select_left_label p");
const preview_right_label = document.querySelector(".range__select_labels .range__select_right_label p");
const preview_middle_label = document.querySelector(".range__select_labels .range__select_middle_label p");
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button");
const saveBtn = document.querySelector(".saveQuestion")
const rangeInput = document.querySelector(".range-input input");
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button")
// rightInput.value = null;
// middleInput.value = null;
// leftInput.value = null;
// rangeInput.value = 0;
// range_question_postData.min = 3;

// functions--------------------------------------
question_placement_setter(localStorage.getItem("question_placement"),range_question_postData)
function rangePreview(input){
    input.addEventListener("input" , (e)=>{
       document.querySelector(".range-label").innerText =  e.target.value;
       range_question_postData.max = parseInt(e.target.value);
    })
}
rangePreview(rangeInput)
 
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',range_question_postData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',range_question_postData)})

 const preview_label_text_handler = (text,changed_label) => {
    if(document.querySelectorAll('.range__select_items .range__number').length % 2 == 0)
        preview_middle_label.parentElement.style.display = 'none';
    else    
         preview_middle_label.parentElement.style.display = 'block';
    changed_label.textContent = text;
    changed_label.style.padding = '10px'
}

rightInput.addEventListener('input',() => {
    preview_label_text_handler(rightInput.value,preview_right_label);
    range_question_postData.min_label = rightInput.value;
})
leftInput.addEventListener('input',() => {
    preview_label_text_handler(leftInput.value,preview_left_label)
    range_question_postData.max_label = leftInput.value;
})
middleInput.addEventListener('input',() => {
    preview_label_text_handler(middleInput.value,preview_middle_label)
    range_question_postData.mid_label = middleInput.value;
})
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
function rangeChange(input){
    if(input)
    input.addEventListener("input" , (e)=>
    {
        range_item_generator(rangeInput.value)
        if(document.querySelectorAll('.range__select_items .range__number').length % 2 == 0)
            preview_middle_label.parentElement.style.display = 'none';
        else    
            preview_middle_label.parentElement.style.display = 'block';
    })
}
const range_item_generator = (number_to_generate) => {
    let rangeContainer = document.querySelector(".range__select_items");
    rangeContainer.innerHTML = ""
    for(let i = 0 ; i < number_to_generate ; i++){
        let range_item_html = `
        <span class="range__number">
            <input type="radio"  name="range_item_input" class="range_input" id="range_input_n${i + 1}">
            <label for="range_input_n${i +1}">${i +1}</label>
        </span>
        `
        let parser = new DOMParser();
        let parsed_range_item = parser.parseFromString(range_item_html,'text/html').firstChild.lastChild.firstChild;
        rangeContainer.append(parsed_range_item);
        range_item_eventListener_setter(document.querySelectorAll(".range__number"))
    }
}
rangeChange(rangeInput)
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => { 
         if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
       range_question_postData.media = file_input.files[0];
  file_upload_handler(selected_file_type,file_input,EditableQuestion,range_question_postData);
})
saveBtn.addEventListener("click" , async function (event){
     
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'integerrange-questions',QuestionnaireUUID,range_question_postData);
    else
        await question_creator(ACTION_TYPE,null,'integerrange-questions',QuestionnaireUUID,range_question_postData);
})
necessaryQuestion.addEventListener('click',() => {
    toggle_handler(EditableQuestion,necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,range_question_postData);
})
QuestionNumber.addEventListener('click',() => {
    toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,range_question_postData);
})
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
range_item_eventListener_setter(document.querySelectorAll(".range__number"))
text_style_label_eventListener_setter(EditableQuestion,rangeChange);
if(ACTION_TYPE == 'Edit' || ACTION_TYPE == 'Copy')
{
    question_info_loader(EditableQuestion)
}
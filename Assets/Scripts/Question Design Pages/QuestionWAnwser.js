import {file_upload_handler, question_creator, toggle_handler , preview_question_toggle, text_style_label_eventListener_setter, question_placement_setter} from "./CommonActions.js";
import { preview_change_handler } from "../Question Design Pages/CommonActions.js";
import {text_question_with_answer_postData} from "../ajax/QuestionPostData.js";
import {question_info_loader} from './QuestionInfoLoader.js'
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const QuestionnaireUUID = JSON.parse(localStorage.getItem("SelectedQuestionnaire")).uuid;
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const selection = document.querySelector("#pattern-select")
const minInput = document.querySelector(".minInput .label-text-input")
const maxInput = document.querySelector(".maxInput .label-text-input")
const sampleAnswer = document.querySelector(".SampleAnw .label-text-input")
const minVmax = document.querySelector(".AnswerAlphabetLimit")
const sampleAnswerBox = document.querySelector(".SampleAnw");
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button")
const file_input = document.querySelector("#file.box__file")
const saveBtn = document.querySelector(".saveQuestion")
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button")
let options = null;
question_placement_setter(localStorage.getItem("question_placement"),text_question_with_answer_postData)
if (ACTION_TYPE == 'Edit') {
     
    question_info_loader(EditableQuestion)
}
// initial data------------------------------------
options = "free"

sampleAnswer.addEventListener('input',() => {
    if(EditableQuestion)
       EditableQuestion.answer_template = sampleAnswer.value;
    else
        text_question_with_answer_postData.answer_template = sampleAnswer.value;
})
titleInput.addEventListener('input', () => { preview_change_handler(EditableQuestion,'Title-change', text_question_with_answer_postData) })
textInput.addEventListener('input', () => { preview_change_handler(EditableQuestion,'Desc-change', text_question_with_answer_postData) })

document.addEventListener("DOMContentLoaded", function (event) {
    if(ACTION_TYPE != 'Edit')
    {
        $(minVmax).show(50)
        $(sampleAnswerBox).hide(80)
    }
})
selection.addEventListener("change", function (event) {
    let selectedOption = event.target.options[event.target.selectedIndex];
    let classList = selectedOption.classList;
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        answer_pattern_selector(classList[1],EditableQuestion,selectedOption);
    else
    {
        answer_pattern_selector(classList[1],text_question_with_answer_postData,selectedOption);
    }
});
const answer_pattern_selector = (Pattern,postData,selectedOption) => {
    console.log(postData)
    switch (Pattern) {
        case "text":
            $(minVmax).show(50)
            $(sampleAnswerBox).hide(80)
            postData.pattern = 'free'
            
            break;
        case "date__shamsi":
            $(minVmax).hide(80)
            $(sampleAnswerBox).show(100);
            $(".SampleAnw .label-text-input").attr('placeholder', '1382/2/4');
            document.querySelector(".SampleAnw .label-text-input").addEventListener('input',() => { postData.answer_template = document.querySelector(".SampleAnw .label-text-input").value })
            options = selectedOption.classList[2]
            minInput.value = "";
            maxInput.value = "";
            postData.pattern = 'jalali_date'
            break;
        case "date__miladi":
            $(minVmax).hide(80)
            $(sampleAnswerBox).show(100);
            $(".SampleAnw .label-text-input").attr('placeholder', '2023/4/21');
            document.querySelector(".SampleAnw .label-text-input").addEventListener('input',() => { postData.answer_template = document.querySelector(".SampleAnw .label-text-input").value })
            options = selectedOption.classList[2]
            minInput.value = "";
            maxInput.value = "";
            postData.pattern = 'georgian_date'
            break;
        case "phone__number":
            $(minVmax).hide(80)
            $(sampleAnswerBox).show(100);
            $(".SampleAnw .label-text-input").attr('placeholder', '09121111111');
            document.querySelector(".SampleAnw .label-text-input").addEventListener('input',() => { postData.answer_template = document.querySelector(".SampleAnw .label-text-input").value })
            options = selectedOption.classList[2];
            minInput.value = "";
            maxInput.value = "";
            postData.pattern = 'mobile_number'
            break;
        case "home__phone":
            $(minVmax).hide(80)
            $(sampleAnswerBox).show(100);
            $(".SampleAnw .label-text-input").attr('placeholder', '02132323232');
            document.querySelector(".SampleAnw .label-text-input").addEventListener('input',() => { postData.answer_template = document.querySelector(".SampleAnw .label-text-input").value })
            options = selectedOption.classList[2];
            minInput.value = "";
            maxInput.value = "";
            postData.pattern = 'phone_number'
            break;
        case "number":
            $(minVmax).show(100)
            $(sampleAnswerBox).hide(100);
            options = selectedOption.classList[2]
            postData.pattern = 'number_character';
            break;
        case "persian":
            $(minVmax).show(100)
            $(sampleAnswerBox).hide(100);
            options = selectedOption.classList[2]
            postData.pattern = 'persian_letters';
            break;
        case "english":
            $(minVmax).show(100)
            $(sampleAnswerBox).hide(100);
            options = selectedOption.classList[2]
            postData.pattern = 'english_letters';
            break;
    }
}

saveBtn.addEventListener("click",async function (event) {
     
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'textanswer-questions',QuestionnaireUUID,text_question_with_answer_postData);
    else
        await question_creator(ACTION_TYPE,null,'textanswer-questions',QuestionnaireUUID,text_question_with_answer_postData);
})
necessaryQuestion.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,text_question_with_answer_postData);
})
QuestionNumber.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,text_question_with_answer_postData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
 
        text_question_with_answer_postData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,text_question_with_answer_postData);
})
minInput.addEventListener('input',() => {
    if(EditableQuestion)
        EditableQuestion.min = parseInt(minInput.value);
    else
        text_question_with_answer_postData.min = parseInt(minInput.value);
})
maxInput.addEventListener('input',() => {
    if(EditableQuestion)
        EditableQuestion.max = parseInt(maxInput.value);
    else
        text_question_with_answer_postData.max = parseInt(maxInput.value);
})
text_style_label_eventListener_setter(EditableQuestion,text_question_with_answer_postData);
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)

import {file_upload_handler, question_creator, toggle_handler , preview_question_toggle} from "./CommonActions.js";
import { preview_change_handler } from "../Question Design Pages/CommonActions.js";
import {link_question_PostData, text_question_with_answer_postData} from "../ajax/QuestionPostData.js";

const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const selection = document.querySelector("#pattern-select")
const minInput = document.querySelector(".minInput .label-text-input")
const maxInput = document.querySelector(".maxInput .label-text-input")
const sampleAnswer = document.querySelector(".SampleAnw .label-text-input")
const minVmax = document.querySelector(".AnswerAlphabetLimit")
const sampleAnswerBox = document.querySelector(".SampleAnw")
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button")
const file_input = document.querySelector("#file.box__file")
const saveBtn = document.querySelector(".saveQuestion")
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button")
let options = null;
if (ACTION_TYPE == 'Edit') {
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    question_info_loader(EditableQuestion)
}
// initial data------------------------------------
options = "free"
sampleAnswer.value = null;

titleInput.addEventListener('input', () => { preview_change_handler('Title-change', text_question_with_answer_postData) })
textInput.addEventListener('input', () => { preview_change_handler('Desc-change', text_question_with_answer_postData) })
function textStyle(input) {
    const textEditor = document.querySelector(".TitleInputOptions")
    textEditor.addEventListener("click", (e) => {
        switch (e.target.classList[1]) {
            case "fa-bold":
                input.classList.toggle("bold")
                break;
            case "fa-italic":
                input.classList.toggle("italic")
                break;
            case "fa-underline":
                input.classList.toggle("underline")
                break;
        }
    })
}
textStyle(titleInput)
// function uploadValidation(input) {
//     if (uploadInput.files[0] !== undefined) {
//         let uploadUrl = uploadInput.files[0].name.split(".")
//         console.log(uploadInput.files[0].size)
//         if (uploadInput.files[0].size > 3000000) {
//             return showAlert("حجم فایل وارد شده بیش از 3 مگابایت است")
//         }
//         if (pictureSwitcher.classList.contains("active")) {
//             const pictureTranslate = {
//                 jpg: "jpg",
//                 png: "png",
//                 jpeg: "jpeg",
//                 JPG: "JPG",
//                 PNG: "PNG",
//                 JPEG: "JPEG"
//             }
//             if (!pictureTranslate[uploadUrl[1]]) {
//                 return showAlert("فرمت وارد شده پذیرفته نیست")
//             }
//         } else if (videoSwitcher.classList.contains("active")) {
//             //
//             const videoTranslate = {
//                 mp4: "mp4",
//                 mov: "mov",
//                 m4v: "m4v",
//                 mkv: "mkv",
//                 flv: "flv",
//                 wmv: "wmv",
//                 MP4: "MP4",
//                 MOV: "MOV",
//                 M4V: "M4V",
//                 MKV: "MKV",
//                 FLV: "FLV",
//                 WMV: "WMV"
//             }
//             if (!videoTranslate[uploadUrl[1]]) {
//                 return showAlert("فرمت وارد شده پذیرفته نیست")
//             }
//         }
//     } else {
//         console.log("no file");
//     }
// }
//event listener------------------------------------
// create folder and questionnaire
// pictureSwitcher.addEventListener("click", (e) => {
//     uploadInput.accept = ".jpg , .png , .jpeg , JPG , PNG , JPEG"
//     if (videoSwitcher.classList.contains("active")) {
//         videoSwitcher.classList.remove("active")
//         pictureSwitcher.classList.add("active")
//     }
// })
// videoSwitcher.addEventListener("click", (e) => {
//     uploadInput.accept = ".mp4 , .mov , .m4v , .mkv , .flv , .wmv , .MP4 , . MOV , .M4V , .MKV , .FLV , .WMV"
//     if (pictureSwitcher.classList.contains("active")) {
//         pictureSwitcher.classList.remove("active")
//         videoSwitcher.classList.add("active")
//     }
// })
// uploadInput.addEventListener("change", (e) => {
//     document.querySelector(".upload__link").innerText = uploadInput.files[0].name;
// })
document.addEventListener("DOMContentLoaded", function (event) {
    minVmax.style.display = "block";
    sampleAnswerBox.style.display = "none";
})
selection.addEventListener("change", function (event) {
    let selectedOption = event.target.options[event.target.selectedIndex];
    let classList = selectedOption.classList;
    switch (classList[1]) {
        case "text":
            minVmax.style.display = "block";
            sampleAnswerBox.style.display = "none";
            options = selectedOption.classList[2]
            break;
        case "date__shamsi":
            minVmax.style.display = "none";
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2]
            minInput.value = "";
            maxInput.value = "";
            break;
        case "date__miladi":
            minVmax.style.display = "none";
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2]
            minInput.value = "";
            maxInput.value = "";
            break;
        case "phone__number1":
            minVmax.style.display = "none";
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2];
            minInput.value = "";
            maxInput.value = "";
            break;
        case "home__phone":
            minVmax.style.display = "none";
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2];
            minInput.value = "";
            maxInput.value = "";
            break;
        case "number":
            minVmax.style.display = "block"
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2]
            break;
        case "persion":
            minVmax.style.display = "block"
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2]
            break;
        case "english":
            minVmax.style.display = "block"
            sampleAnswerBox.style.display = "block";
            options = selectedOption.classList[2]
            break;
    }
    console.log(options)
});
// add event listener to save button
saveBtn.addEventListener("click",async function (event) {
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion.id,'/textanswer-questions',QuestionnaireUUID,text_question_with_answer_postData);
    else
        await question_creator(ACTION_TYPE,null,'/textanswer-questions',QuestionnaireUUID,text_question_with_answer_postData);
})
necessaryQuestion.addEventListener('click',() => {
    toggle_handler(necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,link_question_PostData);
})
QuestionNumber.addEventListener('click',() => {
    toggle_handler(QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,text_question_with_answer_postData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
        text_question_with_answer_postData.media = file_input.files[0].name;
    file_upload_handler(selected_file_type,file_input);
})
view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
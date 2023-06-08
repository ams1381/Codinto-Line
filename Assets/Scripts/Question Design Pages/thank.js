
import {baseUrl, getRequest, postRequest} from "../ajax/ajaxRequsts.js";
import {
    file_upload_handler,
    question_creator,
    showAlert,
    toggle_handler
} from "../Question Design Pages/CommonActions.js";
import { preview_change_handler } from "../Question Design Pages/CommonActions.js";
import {priority_question_PostData, range_question_postData, thank_page_postData} from "../ajax/QuestionPostData.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
// const folder = baseUrl + "/user-api/folders/"
// const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
const reqUrl = baseUrl +`/question-api/questionnaires/${QuestionnaireUUID}/thanks-pages/`

const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const uploadInput = document.querySelector(".box__file")
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const saveBtn = document.querySelector(".saveQuestion")
const questionText = document.querySelector(".questionText")
const questionDescription = document.querySelector(".ansswer__text")
const wrongAlert = document.querySelector(".wrongEntry")
const pictureSwitcher = document.querySelector(".picture__switcher")
const videoSwitcher = document.querySelector(".video__switcher")
const shareQuestion = document.querySelector(".ShareQuestion")
const telegram = document.querySelector(".telegram")
const whatsapp = document.querySelector(".whatsapp")
const instagram = document.querySelector(".instagram")
const eitaa = document.querySelector(".eitaa")
const sorush = document.querySelector(".sorush");

if(ACTION_TYPE == 'Edit')
{  
   let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
   titleInput.value = EditableQuestion.title;
   textInput.value = EditableQuestion.description;
   console.log(EditableQuestion)
   telegram.checked = EditableQuestion.telegram;
   sorush.checked = EditableQuestion.sorush;
   whatsapp.checked = EditableQuestion.whatsapp;
   eitaa.checked = EditableQuestion.eitaa;
   instagram.checked = EditableQuestion.instagram;

}

// initial data------------------------------------

titleInput.addEventListener('click',preview_change_handler('Title-change',thank_page_postData))
textInput.addEventListener('click',preview_change_handler('Desc-change',thank_page_postData))
// function uploadValidation(input){
//     if(uploadInput.files[0] !== undefined){
//         let uploadUrl = uploadInput.files[0].name.split(".")
//         console.log(uploadInput.files[0].size)
//         if(uploadInput.files[0].size > 3000000){
//             return showAlert("حجم فایل وارد شده بیش از 3 مگابایت است")
//         }
//         if(pictureSwitcher.classList.contains("active")){
//             const pictureTranslate = {
//                 jpg : "jpg",
//                 png : "png",
//                 jpeg : "jpeg",
//                 JPG : "JPG",
//                 PNG : "PNG",
//                 JPEG : "JPEG"
//             }
//             if(!pictureTranslate[uploadUrl[1]]){
//                 return showAlert("فرمت وارد شده پذیرفته نیست")
//             }
//         }else if(videoSwitcher.classList.contains("active")){
//             //
//             const videoTranslate = {
//                 mp4 : "mp4",
//                 mov : "mov",
//                 m4v : "m4v",
//                 mkv : "mkv",
//                 flv : "flv",
//                 wmv : "wmv",
//                 MP4 : "MP4",
//                 MOV : "MOV",
//                 M4V : "M4V",
//                 MKV : "MKV",
//                 FLV : "FLV",
//                 WMV : "WMV"
//             }
//             if(!videoTranslate[uploadUrl[1]]){
//                 return showAlert("فرمت وارد شده پذیرفته نیست")
//             }
//         }
//     }else {
//         console.log("no file");
//     }
// }
function textStyle(input){
    const textEditor = document.querySelector(".TitleInputOptions")
    textEditor.addEventListener("click" , (e)=>{
        switch (e.target.classList[1]){
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

//event listener------------------------------------
// create folder and questionnaire
// document.addEventListener("DOMContentLoaded" , (e)=>{
//     getRequest(folder).then((response)=>{
//         console.log(response.data);
//     })
//     getRequest(questionnairesUrl).then((response)=>{
//         console.log(response.data);
//     })

// })
// upload file limitation


// add event listener to save button
saveBtn.addEventListener("click", async function (event) {



    // const formData = new FormData();
    // for (let key in sendFile){
    //     if(sendFile[key] !== null && sendFile[key] !== undefined){
    //         formData.append(key, sendFile[key]);
    //     }
    // }
    // ajax request----------------------------------
    // postRequest(reqUrl,formData)
    //     .then((response) => {
    //         console.log(response.status);
    //         if (response.status === 201){
    //             window.open("/Pages/FormDesign.html","_Self");
    //         }
    //     }).catch((error) => {
    //     console.log(error);
    // })
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion.id,'link-questions',QuestionnaireUUID,thank_page_postData);
    else
        await question_creator(ACTION_TYPE,null,'link-questions',QuestionnaireUUID,thank_page_postData);
})
necessaryQuestion.addEventListener('click',() => {
    toggle_handler(necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,thank_page_postData);
})
QuestionNumber.addEventListener('click',() => {
    toggle_handler(QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,thank_page_postData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
        thank_page_postData = file_input.files[0].name;
    file_upload_handler(selected_file_type,file_input);
})

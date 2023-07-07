
import {baseUrl , postRequest} from "../ajax/ajaxRequsts.js";
import {
    showAlert,
    preview_change_handler,
    file_upload_handler,
    toggle_handler,
    question_creator,
    preview_question_toggle,
    text_style_label_eventListener_setter
} from "./CommonActions.js";
import {email_question_PostData, } from "../ajax/QuestionPostData.js";
import { question_info_loader } from "./QuestionInfoLoader.js";
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/email-questions/`;
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button")
const file_input = document.querySelector("#file.box__file")
const saveBtn = document.querySelector(".saveQuestion")
const view_question_button = document.querySelector(".SideHeaderBody .viewQuestion")
const back_to_design_button = document.querySelector(".block__main .block__main_navbar .back_to_design_button")
let options = null;
if(ACTION_TYPE == 'Edit')
{
      
     question_info_loader(EditableQuestion)
}
// initial data------------------------------------
options =  "free"

 
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',email_question_PostData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',email_question_PostData)})

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
//event listener------------------------------------
// pictureSwitcher.addEventListener("click" , (e)=>{
//     uploadInput.accept = ".jpg , .png , .jpeg , JPG , PNG , JPEG"
//     if(videoSwitcher.classList.contains("active")){
//         videoSwitcher.classList.remove("active")
//         pictureSwitcher.classList.add("active")
//     }
// })
// videoSwitcher.addEventListener("click" , (e)=>{
//     uploadInput.accept = ".mp4 , .mov , .m4v , .mkv , .flv , .wmv , .MP4 , . MOV , .M4V , .MKV , .FLV , .WMV"
//     if(pictureSwitcher.classList.contains("active")){
//         pictureSwitcher.classList.remove("active")
//         videoSwitcher.classList.add("active")
//     }
// })
// uploadInput.addEventListener("change" , (e)=>{
//     document.querySelector(".upload__link").innerText = uploadInput.files[0].name;
// })

// add event listener to save button
saveBtn.addEventListener("click", async function(event) {
     
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'email-questions',QuestionnaireUUID,email_question_PostData);
    else
        await question_creator(ACTION_TYPE,null,'email-questions',QuestionnaireUUID,email_question_PostData);
})
necessaryQuestion.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,email_question_PostData);
})
QuestionNumber.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,email_question_PostData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
 
        email_question_PostData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,email_question_PostData);
})

view_question_button.addEventListener('click',preview_question_toggle);
back_to_design_button.addEventListener('click',preview_question_toggle)
text_style_label_eventListener_setter(EditableQuestion,email_question_PostData);
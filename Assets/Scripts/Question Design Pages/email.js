
import {baseUrl , postRequest} from "../ajax/ajaxRequsts.js";
import {
    showAlert,
    preview_change_handler,
    file_upload_handler,
    toggle_handler,
    question_creator
} from "./CommonActions.js";
import {email_question_PostData, link_question_PostData, multiple_option_postData} from "../ajax/QuestionPostData.js";
// const folder = baseUrl + "/user-api/folders/"
// const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/email-questions/`;
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const uploadInput = document.querySelector(".box__file")
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button")
const file_input = document.querySelector("#file.box__file")
const saveBtn = document.querySelector(".saveQuestion")
const questionText = document.querySelector(".questionText")
const questionDescription = document.querySelector(".ansswer__text")
const wrongAlert = document.querySelector(".wrongEntry")
const pictureSwitcher = document.querySelector(".picture__switcher")
const videoSwitcher = document.querySelector(".video__switcher")
const guidance = document.querySelector(".SampleAnw input")
console.log(guidance)
let options = null;
// if(ACTION_TYPE == 'Edit')
// {
//     // let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
//     // titleInput.value = EditableQuestion.title;
//     // textInput.value = EditableQuestion.description;
//     // necessaryQuestion.checked = EditableQuestion.is_required;
//     // minInput.value = EditableQuestion.min;
//     // maxInput.value = EditableQuestion.max;
//     // //buttonText.value = EditableQuestion.button_text
//     // console.log(EditableQuestion)
// }
// initial data------------------------------------
options =  "free"

titleInput.addEventListener('input',() => {preview_change_handler('Title-change',email_question_PostData)})
textInput.addEventListener('input',() => {preview_change_handler('Desc-change',email_question_PostData)})
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

    // if(titleInput.value === "" && textInput.value === ""){
    //     showAlert("عنوان و متن سوال را وارد کنید")
    // }else if(textInput.value === ""){
    //     showAlert("متن سوال را وارد کنید")
    // }else if(titleInput.value === ""){
    //     showAlert("عنوان سوال را وارد کنید")
    // }
    // upload wrong error
    // uploadValidation(uploadInput)
    // let sendFile  = {
    //     question_type : "Email",
    //     title: titleInput.value,
    //     question_text: textInput.value,
    //     placement: 2,
    //     group: "",
    //     is_required: necessaryQuestion.checked,
    //     show_number: QuestionNumber.checked,
    //     media: uploadInput.files[0],
    // };

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
    //         window.open("/Pages/FormDesign.html","_Self");
    //     }).catch((error) => {
    //     console.log(error);
    // })
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion.id,'email-questions',QuestionnaireUUID,email_question_PostData);
    else
        await question_creator(ACTION_TYPE,null,'email-questions',QuestionnaireUUID,email_question_PostData);
})
necessaryQuestion.addEventListener('click',() => {
    toggle_handler(necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,email_question_PostData);
})
QuestionNumber.addEventListener('click',() => {
    toggle_handler(QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,email_question_PostData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
        email_question_PostData.media = file_input.files[0].name;
    file_upload_handler(selected_file_type,file_input);
})


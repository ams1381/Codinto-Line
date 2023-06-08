
import {baseUrl, getRequest, postRequest} from "../ajax/ajaxRequsts.js";
import { showAlert } from "../Question Design Pages/CommonActions.js";
import { preview_change_handler } from "../Question Design Pages/CommonActions.js";
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

titleInput.addEventListener('click',preview_change_handler('Title-change',multiple_option_postData))
textInput.addEventListener('click',preview_change_handler('Desc-change',multiple_option_postData))
function uploadValidation(input){
    if(uploadInput.files[0] !== undefined){
        let uploadUrl = uploadInput.files[0].name.split(".")
        console.log(uploadInput.files[0].size)
        if(uploadInput.files[0].size > 3000000){
            return showAlert("حجم فایل وارد شده بیش از 3 مگابایت است")
        }
        if(pictureSwitcher.classList.contains("active")){
            const pictureTranslate = {
                jpg : "jpg",
                png : "png",
                jpeg : "jpeg",
                JPG : "JPG",
                PNG : "PNG",
                JPEG : "JPEG"
            }
            if(!pictureTranslate[uploadUrl[1]]){
                return showAlert("فرمت وارد شده پذیرفته نیست")
            }
        }else if(videoSwitcher.classList.contains("active")){
            //
            const videoTranslate = {
                mp4 : "mp4",
                mov : "mov",
                m4v : "m4v",
                mkv : "mkv",
                flv : "flv",
                wmv : "wmv",
                MP4 : "MP4",
                MOV : "MOV",
                M4V : "M4V",
                MKV : "MKV",
                FLV : "FLV",
                WMV : "WMV"
            }
            if(!videoTranslate[uploadUrl[1]]){
                return showAlert("فرمت وارد شده پذیرفته نیست")
            }
        }
    }else {
        console.log("no file");
    }
}
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
pictureSwitcher.addEventListener("click" , (e)=>{
    uploadInput.accept = ".jpg , .png , .jpeg , JPG , PNG , JPEG"
    if(videoSwitcher.classList.contains("active")){
        videoSwitcher.classList.remove("active")
        pictureSwitcher.classList.add("active")
    }
})
videoSwitcher.addEventListener("click" , (e)=>{
    uploadInput.accept = ".mp4 , .mov , .m4v , .mkv , .flv , .wmv , .MP4 , . MOV , .M4V , .MKV , .FLV , .WMV"
    if(pictureSwitcher.classList.contains("active")){
        pictureSwitcher.classList.remove("active")
        videoSwitcher.classList.add("active")
    }
})
uploadInput.addEventListener("change" , (e)=>{
    document.querySelector(".upload__link").innerText = uploadInput.files[0].name;
})

// add event listener to save button
saveBtn.addEventListener("click", function(event) {

    if(titleInput.value === "" && textInput.value === ""){
        showAlert("عنوان و متن سوال را وارد کنید")
    }else if(textInput.value === ""){
        showAlert("متن سوال را وارد کنید")
    }else if(titleInput.value === ""){
        showAlert("عنوان سوال را وارد کنید")
    }else{
        console.log("ok");
    }
    uploadValidation(uploadInput)
    // upload wrong error
    let sendFile  = {
        question_type : "File",
        title: titleInput.value,
        question_text: textInput.value,
        placement: 3,
        group: "",
        share_link: shareQuestion.checked,
        instagram: instagram.checked,
        telegram: telegram.checked,
        whatsapp: whatsapp.checked,
        eitaa: eitaa.checked,
        sorush: sorush.checked,
        media: uploadInput.files[0],
    };

    const formData = new FormData();
    for (let key in sendFile){
        if(sendFile[key] !== null && sendFile[key] !== undefined){
            formData.append(key, sendFile[key]);
        }
    }
    // ajax request----------------------------------
    postRequest(reqUrl,formData)
        .then((response) => {
            console.log(response.status);
            if (response.status === 201){
                window.open("/Pages/FormDesign.html","_Self");
            }
        }).catch((error) => {
        console.log(error);
    })
})

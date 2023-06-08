import {baseUrl , postRequest , getRequest} from "../ajax/ajaxRequsts.js";
import { range_question_postData } from "../ajax/QuestionPostData.js";
import { preview_change_handler } from "./CommonActions.js";
// const folder = baseUrl + "/user-api/folders/"
// const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
import { showAlert } from "./CommonActions.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/integerrange-questions/`;
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const titleInput = document.querySelector(".GTitle .TitleTextInput");
const textInput = document.querySelector(".GDesc .TitleTextInput");
const rightInput = document.querySelector(".right-Input .label-text-input")
const middleInput = document.querySelector(".middle-Input .label-text-input")
const leftInput = document.querySelector(".left-Input .label-text-input")
const uploadInput = document.querySelector(".box__file")
const saveBtn = document.querySelector(".saveQuestion")
const isRequired = document.querySelector(".AnswerNecessity input")
const showNumber = document.querySelector(".QuestionNumber input")
const rangeInput = document.querySelector(".rangeInput");
const wrongAlert = document.querySelector(".wrongEntry")
const questionText = document.querySelector(".questionText")
const questionDescription = document.querySelector(".ansswer__text")
const pictureSwitcher = document.querySelector(".picture__switcher")
const videoSwitcher = document.querySelector(".video__switcher")
rightInput.value = null;
middleInput.value = null;
leftInput.value = null;
rangeInput.value = 0;
if(ACTION_TYPE == 'Edit')
{
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    question_info_loader(EditableQuestion)
}
// functions--------------------------------------

function rangePreview(input){
    input.addEventListener("input" , (e)=>{
       document.querySelector(".range-label").innerText =  e.target.value
    })
}
rangePreview(rangeInput)
titleInput.addEventListener('input',() => {preview_change_handler('Title-change',range_question_postData)})
textInput.addEventListener('input',() => {preview_change_handler('Desc-change',range_question_postData)})
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
function rangeChange(input){
    input.addEventListener("input" , (e)=>{
        let rangeContainer = document.querySelector(".range__select");
        rangeContainer.innerHTML = ""
        for(let i = 0 ; i < e.target.value ; i++){
            let rangeItem = document.createElement("span")
            rangeItem.classList.add("range__number")
            rangeItem.innerText = i + 1
            rangeContainer.appendChild(rangeItem)
        }

    })
}
rangeChange(rangeInput)
// add event listeners--------------------------------------
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
uploadInput.addEventListener("change" , (e)=>{
    document.querySelector(".upload__link").innerText = uploadInput.files[0].name;
})
saveBtn.addEventListener("click" , function (){

    if(titleInput.value === "" && textInput.value === ""){
        showAlert("عنوان و متن سوال را وارد کنید")
    }else if(textInput.value === ""){
        showAlert("متن سوال را وارد کنید")
    }else if(titleInput.value === ""){
        showAlert("عنوان سوال را وارد کنید")
    }
    uploadValidation(uploadInput)
    let sendData = {
       "question_type": "integer_range",
       "title": titleInput.value,
       "question_text": textInput.value,
       "placement": 4,
       "group": null,
       "is_required": isRequired.checked,
       "show_number": showNumber.checked,
       "media": uploadInput.files[0],
       "min": 0,
       "max": rangeInput.value,
       "min_label": rightInput.value,
       "mid_label": middleInput.value,
       "max_label": leftInput.value,
   }

   const formData = new FormData();
   for (let key in sendData){
       if(sendData[key] !== null && sendData[key] !== undefined){
           formData.append(key, sendData[key]);
       }
   }
    postRequest(reqUrl,formData)
        .then((response) => {
            console.log(response.data);
            window.open("/Pages/FormDesign.html","_Self");
        }).catch((error) => {
        console.log(error);
    })
})
import {baseUrl , postRequest} from "../ajax/ajaxRequsts.js";
import { showAlert } from "./CommonActions.js";
import { preview_change_handler } from "./CommonActions.js";

const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/welcome-pages/`;
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const uploadInput = document.querySelector(".box__file")
const buttonText = document.querySelector(".ButtonTextInput")
const shapeSelector = document.querySelectorAll(".ShapeOptions label")
const saveBtn = document.querySelector(".saveQuestion")
const questionText = document.querySelector(".questionText")
const questionDescription = document.querySelector(".ansswer__text")
const wrongAlert = document.querySelector(".wrongEntry")
const pictureSwitcher = document.querySelector(".picture__switcher")
const videoSwitcher = document.querySelector(".video__switcher")
const necessaryQuestion = document.querySelector(".AnswerNecessity .Switch-toggle input")
const QuestionNumber = document.querySelector(".QuestionNumber .Switch-toggle input")

if(ACTION_TYPE == 'Edit')
{
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    titleInput.value = EditableQuestion.title;
    textInput.value = EditableQuestion.description;
    buttonText.value = EditableQuestion.button_text
    shapeSelector.forEach((shapeLabel) => {
        if(EditableQuestion.is_solid_button)
            if(shapeLabel.classList.contains(EditableQuestion.button_shape) && shapeLabel.classList.contains('bg-colored'))
            {
                shapeLabel.previousElementSibling.checked = true;
                return
            }

            else
            if(shapeLabel.classList.contains(EditableQuestion.button_shape) && shapeLabel.classList.contains('bg-transp'))
            {
                shapeLabel.previousElementSibling.checked = true;
                return;
            }

    })

}
// functions

titleInput.addEventListener('click',preview_change_handler('Title-change',multiple_option_postData))
textInput.addEventListener('click',preview_change_handler('Desc-change',multiple_option_postData))
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
uploadInput.addEventListener("change" , (e)=>{
    document.querySelector(".upload__link").innerText = uploadInput.files[0].name;
})

pictureSwitcher.addEventListener("click" , (e)=>{
    // uploadInput.accept = ".jpg , .png , .jpeg , JPG , PNG , JPEG"
    if(videoSwitcher.classList.contains("active")){
        videoSwitcher.classList.remove("active")
        pictureSwitcher.classList.add("active")
    }
})
videoSwitcher.addEventListener("click" , (e)=>{
    // uploadInput.accept = ".mp4 , .mov , .m4v , .mkv , .flv , .wmv , .MP4 , . MOV , .M4V , .MKV , .FLV , .WMV"
    if(pictureSwitcher.classList.contains("active")){
        pictureSwitcher.classList.remove("active")
        videoSwitcher.classList.add("active")
    }
})
let selectedObject = null
shapeSelector.forEach((e)=>{
    e.addEventListener("click" , ()=>{
        selectedObject = e.classList[1]
    })
})
saveBtn.addEventListener("click" , function (){
    if(titleInput.value === "" && textInput.value === ""){
        showAlert("عنوان و متن سوال را وارد کنید")
    }else if(textInput.value === ""){
        showAlert("متن سوال را وارد کنید")
    }else if(titleInput.value === ""){
        showAlert("عنوان سوال را وارد کنید")
    }
    // upload wrong error
    uploadValidation(uploadInput)
    let sendData = {
        "title": titleInput.value,
        "description": textInput.value,
        "media": uploadInput.files[0],
        "button_text": buttonText.value,
        "button_shape": selectedObject,
        "is_solid_button": true,
        "is_required": necessaryQuestion.checked,
        "show_number": QuestionNumber.checked,
    }
    const formData = new FormData();
    for (let key in sendData){
        if(sendData[key] !== null){
            formData.append(key, sendData[key]);
        }
    }
    postRequest(reqUrl,formData)
        .then((response) => {
            console.log(response.data);
            // window.open("/Pages/FormDesign.html","_Self");
        }).catch((error) => {
        console.log(error);
    })
})
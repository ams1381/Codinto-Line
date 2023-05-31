import {baseUrl , postRequest , getRequest} from "./ajaxRequsts.js";
// const folder = baseUrl + "/user-api/folders/"
// const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/integerrange-questions/`;
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
// functions--------------------------------------
function showAlert(text){
    wrongAlert.style.opacity = "1";
    document.querySelector('.block__side').scrollTo(0,0)
    let spanInput =  wrongAlert.childNodes[1]
    spanInput.innerText = `${text}`
    setTimeout(()=>{
        wrongAlert.style.opacity = "0";
    }, 3000);
}
function rangePreview(input){
    input.addEventListener("input" , (e)=>{
       document.querySelector(".range-label").innerText =  e.target.value
    })
}
rangePreview(rangeInput)
function showValue(input , value){
    input.addEventListener("input" , (e)=>{
        value.innerText = e.target.value
    })
}
showValue(titleInput , questionText)
showValue(textInput , questionDescription)

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
saveBtn.addEventListener("click" , function (){

    if(titleInput.value === "" && textInput.value === ""){
        showAlert("عنوان و متن سوال را وارد کنید")
    }else if(textInput.value === ""){
        showAlert("متن سوال را وارد کنید")
    }else if(titleInput.value === ""){
        showAlert("عنوان سوال را وارد کنید")
    }
    if(uploadInput.files[0] !== undefined) {
        let uploadUrl = uploadInput.files[0].name.split(".")
        if (pictureSwitcher.classList.contains("active")) {
            switch (uploadUrl[1]) {
                case "jpg":
                    break;
                case "png":
                    break;
                case "jpeg":
                    break;
                case "JPG":
                    break;
                case "PNG":
                    break;
                case "JPEG":
                    break;
                default:
                    showAlert("فرمت وارد شده پذیرفته نیست")
            }
        } else if (videoSwitcher.classList.contains("active")) {
            switch (uploadUrl[1]) {
                case "mp4":
                    break;
                case "mov":
                    break;
                case "m4v":
                    break;
                case "mkv":
                    break;
                case "flv":
                    break;
                case "wmv":
                    break;
                case "MP4":
                    break;
                case "MOV":
                    break;
                case "M4V":
                    break;
                case "MKV":
                    break;
                case "FLV":
                    break;
                case "WMV":
                    break;
                default:
                    return showAlert("فرمت وارد شده پذیرفته نیست")

            }
        }
    }
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

import {baseUrl, getRequest, postRequest} from "../ajax/ajaxRequsts.js";
const folder = baseUrl + "/user-api/folders/"
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
const reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/link-questions/`
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const textInput = document.querySelector(".GDesc .TitleTextInput")
const sampleAnswer = document.querySelector(".SampleAnw .label-text-input")
const uploadInput = document.querySelector(".box__file")
const necessaryQuestion = document.querySelector(".AnswerNecessity .Switch-toggle input")
const QuestionNumber = document.querySelector(".QuestionNumber .Switch-toggle input")
const saveBtn = document.querySelector(".saveQuestion")
const questionText = document.querySelector(".questionText")
const questionDescription = document.querySelector(".ansswer__text")
const wrongAlert = document.querySelector(".wrongEntry")
const pictureSwitcher = document.querySelector(".picture__switcher")
const videoSwitcher = document.querySelector(".video__switcher")
let options = null;

// initial data------------------------------------
if(ACTION_TYPE == 'Edit')
{
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    question_info_loader(EditableQuestion)
}
options =  "free"
sampleAnswer.value = null;
function showAlert(text){
    wrongAlert.style.opacity = "1";
    document.querySelector('.block__side').scrollTo(0,0)
    window.scrollTo(0,0)
    let spanInput =  wrongAlert.childNodes[1]
    spanInput.innerText = `${text}`
    setTimeout(()=>{
        wrongAlert.style.opacity = "0";
    }, 3000);
}
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
function uploadValidation(input){
    if(uploadInput.files[0] !== undefined){
        let uploadUrl = uploadInput.files[0].name.split(".")
        if(pictureSwitcher.classList.contains("active")){
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
                    showAlert("فرمت فایل وارد شده پذیرفته نیست")
            }
        }else if(videoSwitcher.classList.contains("active")){
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
                    return  showAlert("فرمت وارد شده پذیرفته نیست")

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
    uploadInput.accept = ".jpg , .png , .jpeg , JPG , PNG , JPEG"
})
videoSwitcher.addEventListener("click" , (e)=>{
    uploadInput.accept = ".mp4 , .mov , .m4v , .mkv , .flv , .wmv , .MP4 , . MOV , .M4V , .MKV , .FLV , .WMV"
    if(pictureSwitcher.classList.contains("active")){
        pictureSwitcher.classList.remove("active")
        videoSwitcher.classList.add("active")
    }
})
// add event listener to save button
saveBtn.addEventListener("click", function(event) {

    if(titleInput.value === "" && textInput.value === ""){
        showAlert("عنوان و متن سوال را وارد کنید")
    }else if(textInput.value === ""){
        showAlert("متن سوال را وارد کنید")
    }else if(titleInput.value === ""){
        showAlert("عنوان سوال را وارد کنید")
    }
    // upload wrong error
    uploadValidation(uploadInput)
    let sendFile  = {
        question_type : "Link question",
        title: titleInput.value,
        question_text: textInput.value,
        placement: 12,
        group: "",
        is_required: necessaryQuestion.checked,
        show_number: QuestionNumber.checked,
        media: uploadInput.files[0],
        answer_template: null,
        pattern: options,
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
             window.open("/Pages/FormDesign.html","_Self");
        }).catch((error) => {
        console.log(error);
    })
})

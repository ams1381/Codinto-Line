
import {baseUrl, getRequest, postRequest} from "./ajaxRequsts.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const folder = baseUrl + "/user-api/folders/"
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
const reqUrl = baseUrl +`/question-api/questionnaires/${QuestionnaireUUID}/file-questions/`
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const uploadInput = document.querySelector(".box__file")
const necessaryQuestion = document.querySelector(".AnswerNecessity .Switch-toggle input")
const QuestionNumber = document.querySelector(".QuestionNumber .Switch-toggle input")
const saveBtn = document.querySelector(".saveQuestion")
const questionText = document.querySelector(".questionText")
const questionDescription = document.querySelector(".ansswer__text")
const wrongAlert = document.querySelector(".wrongEntry")
const pictureSwitcher = document.querySelector(".picture__switcher")
const videoSwitcher = document.querySelector(".video__switcher")
const MBSelector = document.querySelector(".MB__switcher")
const KBSelector = document.querySelector(".KB__switcher")
const sizeInput = document.querySelector(".file__size__upload")


// initial data------------------------------------
if(ACTION_TYPE == 'Edit')
{  
   let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
   titleInput.value = EditableQuestion.title;
   textInput.value = EditableQuestion.description;
   necessaryQuestion.checked = EditableQuestion.is_required;
   sizeInput.value =  EditableQuestion.max_volume
   console.log(EditableQuestion)
}

function showAlert(text){
    wrongAlert.style.opacity = "1";
    document.querySelector('.block__side').scrollTo(0,0)
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


//event listener------------------------------------
// create folder and questionnaire
document.addEventListener("DOMContentLoaded" , (e)=>{
    getRequest(folder).then((response)=>{
        console.log(response.data);
    })
    getRequest(questionnairesUrl).then((response)=>{
        console.log(response.data);
    })

})
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
KBSelector.addEventListener("click" , (e)=>{
    if(MBSelector.classList.contains("active")){
        MBSelector.classList.remove("active")
        KBSelector.classList.add("active")
    }
})
uploadInput.addEventListener("change" , (e)=>{
    document.querySelector(".upload__link").innerText = uploadInput.files[0].name;
})
// add event listener to save button
saveBtn.addEventListener("click", function(event) {
console.log(sizeInput.value);
    if(titleInput.value === "" && textInput.value === ""){
        showAlert("عنوان و متن سوال را وارد کنید")
    }else if(textInput.value === ""){
        showAlert("متن سوال را وارد کنید")
    }else if(titleInput.value === ""){
        showAlert("عنوان سوال را وارد کنید")
    }else if(sizeInput.value === null || sizeInput.value === undefined || sizeInput.value === ""){
        showAlert("حجم فایل را وارد کنید")
    }else{
        console.log("ok");
    }

    // upload wrong error
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
    // kb and mb

    if(KBSelector.classList.contains("active")){
        sizeInput.value = Math.round((sizeInput.value ) / 1024)
    }
    let sendFile  = {
        question_type : "File",
        title: titleInput.value,
        question_text: textInput.value,
        placement: 3,
        group: "",
        is_required: necessaryQuestion.checked,
        show_number: QuestionNumber.checked,
        media: uploadInput.files[0],
        max_volume : sizeInput.value,
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

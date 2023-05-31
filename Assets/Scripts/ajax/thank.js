
import {baseUrl, getRequest, postRequest} from "./ajaxRequsts.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const folder = baseUrl + "/user-api/folders/"
const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
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
const sorush = document.querySelector(".sorush")

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
function showAlert(text){
    wrongAlert.style.opacity = "1";
    document.querySelector('.block__side').scrollTo(0,0)
    let spanInput =  wrongAlert.childNodes[1]
    spanInput.innerText = `${text}`
    setTimeout(()=>{
        wrongAlert.style.opacity = "0";
    }, 3000);
}

// function showValue(input , value){
//     input.addEventListener("input" , (e)=>{
//         value.innerText = e.target.value
//     })
// }
// showValue(titleInput , questionText)
// showValue(textInput , questionDescription)


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
                    return showAlert("فرمت وارد شده پذیرفته نیست")
            }
        }
    }else {
        console.log("no file");
    }
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


import {baseUrl , postRequest} from "./ajaxRequsts.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const folder = baseUrl + "/user-api/folders/"
const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
const reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/numberanswer-questions/`

const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const selection = document.querySelector("#pattern-select")
const sampleAnswer = document.querySelector(".SampleAnw .label-text-input")
const minVmax = document.querySelector(".AnswerAlphabetLimit")
// const sampleAnswerBox = document.querySelector(".SampleAnw")
const uploadInput = document.querySelector(".box__file")
const necessaryQuestion = document.querySelector(".AnswerNecessity .Switch-toggle input")
const QuestionNumber = document.querySelector(".QuestionNumber .Switch-toggle input")
const saveBtn = document.querySelector(".saveQuestion")
const questionText = document.querySelector(".questionText")
const questionDescription = document.querySelector(".ansswer__text")
const wrongAlert = document.querySelector(".wrongEntry")
const pictureSwitcher = document.querySelector(".picture__switcher")
const videoSwitcher = document.querySelector(".video__switcher")
const min = document.querySelector(".minInput .label-text-input")
const max = document.querySelector(".maxInput .label-text-input")


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
    // let sendData = {
    //     name : "test",
    // }
    // let ques ={
    //     name : "burak",
    //     folder : 2,
    // }
    // postRequest(folder , sendData).then((response)=>{
    //     console.log(response.data);
    // })
    // postRequest(questionnairesUrl , ques).then((response)=>{
    //     console.log(response.data);
    // })

})
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
    }
    // upload wrong error
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
                    return showAlert("فرمت وارد شده پذیرفته نیست")
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
    let sendFile  = {
        question_type : "Number answer",
        title: titleInput.value,
        question_text: textInput.value,
        placement: 7,
        group: "",
        is_required: necessaryQuestion.checked,
        show_number: QuestionNumber.checked,
        media: uploadInput.files[0],
        min: min.value !== "" ? parseInt(min.value) : null,
        max: max.value !== "" ? parseInt(max.value) : null,
    };

    const formData = new FormData();
    for (let key in sendFile){
        if(sendFile[key] !== null && sendFile[key] !== undefined){
            formData.append(key, sendFile[key]);
        }
    }
    // ajax request----------------------------------
    console.log(formData)
    postRequest(reqUrl,formData)
        .then((response) => {
            console.log(response.status);
            // console.log(response.data);
            window.open("/Pages/FormDesign.html","_Self");
        }).catch((error) => {
        console.log(error);
    })
})
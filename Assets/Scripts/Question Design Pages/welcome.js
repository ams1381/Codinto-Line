import {baseUrl , postRequest} from "../ajax/ajaxRequsts";

const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");

const reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/welcome-pages/`;
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const textInput = document.querySelector(".GDesc .TitleTextInput")
const mediaInput = document.querySelector(".box__file")
const buttonText = document.querySelector(".ButtonTextInput")
const shapeSelector = document.querySelectorAll(".ShapeOptions label")
const saveBtn = document.querySelector(".saveQuestion")

if(ACTION_TYPE == 'Edit')
{
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    question_info_loader(EditableQuestion)
}
let selectedObject = null
shapeSelector.forEach((e)=>{
    e.addEventListener("click" , ()=>{
        selectedObject = e.classList[1]
    })
})
saveBtn.addEventListener("click" , function (){
    let sendData = {
        "title": titleInput.value,
        "description": textInput.value,
        "media": mediaInput.files[0],
        "button_text": buttonText.value,
        "button_shape": selectedObject,
        "is_solid_button": true,
    }
    if (sendData.media === undefined){
        sendData.media = ""
    }
    if (textInput.value === ""){
        alert("Please fill the description")
    }
    if(titleInput.value === ""){
        alert("Please fill the title")
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
            window.open("/Pages/FormDesign.html","_Self");
        }).catch((error) => {
        console.log(error);
    })
})
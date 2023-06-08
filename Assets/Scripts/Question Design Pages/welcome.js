import {baseUrl , postRequest} from "../ajax/ajaxRequsts";
import {file_upload_handler, preview_change_handler, question_creator, toggle_handler , showAlert} from "./CommonActions.js";
import {welcome_page_postData} from "../ajax/QuestionPostData.js";
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
saveBtn.addEventListener("click" , async function (event){
    // let sendData = {
    //     "title": titleInput.value,
    //     "description": textInput.value,
    //     "media": mediaInput.files[0],
    //     "button_text": buttonText.value,
    //     "button_shape": selectedObject,
    //     "is_solid_button": true,
    // }
    //
    // const formData = new FormData();
    // for (let key in sendData){
    //     if(sendData[key] !== null){
    //         formData.append(key, sendData[key]);
    //     }
    // }
    // postRequest(reqUrl,formData)
    //     .then((response) => {
    //         console.log(response.data);
    //         window.open("/Pages/FormDesign.html","_Self");
    //     }).catch((error) => {
    //     console.log(error);
    // })
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    if(EditableQuestion)
        await question_creator(ACTION_TYPE,EditableQuestion.id,'link-questions',QuestionnaireUUID,welcome_page_postData);
    else
        await question_creator(ACTION_TYPE,null,'link-questions',QuestionnaireUUID,welcome_page_postData);
})
necessaryQuestion.addEventListener('click',() => {
    toggle_handler(necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,welcome_page_postData);
})
QuestionNumber.addEventListener('click',() => {
    toggle_handler(QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,welcome_page_postData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
        welcome_page_postData = file_input.files[0].name;
    file_upload_handler(selected_file_type,file_input);
})
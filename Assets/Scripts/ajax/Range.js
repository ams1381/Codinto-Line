import {baseUrl , postRequest , getRequest} from "./ajaxRequsts.js";
let reqUrl = baseUrl +"/question-api/questionnaires/e4f2305e-d282-4417-9484-e429f9a661a2/integerrange-questions/"
const titleInput = document.querySelector(".GTitle .TitleTextInput");
const textInput = document.querySelector(".GDesc .TitleTextInput");
const rightInput = document.querySelector(".right-Input .label-text-input")
const middleInput = document.querySelector(".middle-Input .label-text-input")
const leftInput = document.querySelector(".left-Input .label-text-input")
const mediaInput = document.querySelector(".box__file")
const saveBtn = document.querySelector(".saveQuestion")
const isRequired = document.querySelector(".AnswerNecessity input")
const showNumber = document.querySelector(".QuestionNumber input")
const rangeInput = document.querySelector(".rangeInput");
rightInput.value = null;
middleInput.value = null;
leftInput.value = null;
rangeInput.value = 0;
// document.addEventListener("DOMContentLoaded" , (e)=>{
//     getRequest(reqUrl).then((response)=>{
//         console.log(response.data);
//     })
// })
saveBtn.addEventListener("click" , function (){
    console.log(rangeInput.value)
    let sendData = {
       "question_type": "integer_range",
       "title": titleInput.value,
       "question_text": textInput.value,
       "placement": 4,
       "group": null,
       "is_required": isRequired.checked,
       "show_number": showNumber.checked,
       "media": mediaInput.files[0],
       "min": 0,
       "max": rangeInput.value,
       "min_label": rightInput.value,
       "mid_label": middleInput.value,
       "max_label": leftInput.value,
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
        }).catch((error) => {
        console.log(error);
    })
})
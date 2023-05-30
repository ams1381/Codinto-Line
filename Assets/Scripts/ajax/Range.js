import {baseUrl , postRequest , getRequest} from "./ajaxRequsts.js";

let reqUrl = baseUrl +`/question-api/questionnaires/14a19d1d-da76-48d5-aff0-75db0e2b4af6/integerrange-questions/`
const folder = baseUrl + "/user-api/folders/"
const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
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
const wrongAlert = document.querySelector(".wrongEntry")
const titleBoldIcon = document.querySelector(".GTitle .fa-bold")
rightInput.value = null;
middleInput.value = null;
leftInput.value = null;
rangeInput.value = 0;
// functions--------------------------------------
// function bolder(input , icon){
//     icon.addEventListener("click" , (e)=>{
//         input.value.style.fontWeight = "900";
//     })
//     input.addEventListener("input" , (e)=>{
//         input.target.value
//     })
// }
// bolder(titleInput , titleBoldIcon)
document.addEventListener("DOMContentLoaded" , (e)=>{
    let sendData = {
        name : "test",
    }
    let ques ={
        name : "burak",
        folder : 2,
    }
    postRequest(folder , sendData).then((response)=>{
        console.log(response.data);
    })
    postRequest(questionnairesUrl , ques).then((response)=>{
        console.log(response.data);
    })

})
saveBtn.addEventListener("click" , function (){
    if(titleInput.value === "" && textInput.value === ""){
        wrongAlert.style.opacity = "1";
        document.querySelector('.block__side').scrollTo(0,0)
       let spanInput =  wrongAlert.childNodes[1]
        spanInput.innerText = "عنوان و متن سوال را وارد کنید"
        setTimeout(()=>{
            wrongAlert.style.opacity = "0";
        }, 3000);
    }else if(textInput.value === ""){
        wrongAlert.style.opacity = "1";
        document.querySelector('.block__side').scrollTo(0,0)
        let spanInput =  wrongAlert.childNodes[1]
        spanInput.innerText = "متن سوال را وارد کنید"
        setTimeout(()=>{
            wrongAlert.style.opacity = "0";
        }, 3000);
    }else if(titleInput.value === ""){
        wrongAlert.style.opacity = "1";
        document.querySelector('.block__side').scrollTo(0,0)
        let spanInput =  wrongAlert.childNodes[1]
        spanInput.innerText = "عنوان سوال را وارد کنید"
        setTimeout(()=>{
            wrongAlert.style.opacity = "0";
        }, 3000);

    }
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

   const formData = new FormData();
   for (let key in sendData){
       if(sendData[key] !== null && sendData[key] !== undefined){
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

import {baseUrl, getRequest, postRequest} from "./ajaxRequsts.js";
const folder = baseUrl + "/user-api/folders/"
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const questionnairesUrl = baseUrl + "/question-api/questionnaires/"
const reqUrl = baseUrl + `/question-api/questionnaires/${QuestionnaireUUID}/link-questions/`
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const textInput = document.querySelector(".GDesc .TitleTextInput")
const uploadInput = document.querySelector(".box__file")
const necessaryQuestion = document.querySelector(".AnswerNecessity .Switch-toggle input")
const QuestionNumber = document.querySelector(".QuestionNumber .Switch-toggle input")
const saveBtn = document.querySelector(".saveQuestion")
const questionText = document.querySelector(".Question-Title p")
const questionDescription = document.querySelector(".description_block p")
const wrongAlert = document.querySelector(".wrongEntry")
const pictureSwitcher = document.querySelector(".picture__switcher")
const videoSwitcher = document.querySelector(".video__switcher")
let options = null;

// initial data------------------------------------
if(ACTION_TYPE == 'Edit')
{
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    titleInput.value = EditableQuestion.title;
    textInput.value = EditableQuestion.description;
    necessaryQuestion.checked = EditableQuestion.is_required;
    QuestionNumber.checked = !EditableQuestion.show_number;
//    rightInput.value = EditableQuestion.max_label;
//    middleInput.value = EditableQuestion.mid_label
//    leftInput.value = EditableQuestion.min_label

    console.log(EditableQuestion)
}

// let dragSrcEl = null;
//
// function handleDragStart(e) {
//     // Target (this) element is the source node.
//     dragSrcEl = this;
//
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/html', this.outerHTML);
//
//     this.classList.add('dragElem');
// }
// function handleDragOver(e) {
//     if (e.preventDefault) {
//         e.preventDefault(); // Necessary. Allows us to drop.
//     }
//     this.classList.add('over');
//
//     e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
//
//     return false;
// }
//
// function handleDragEnter(e) {
//     // this / e.target is the current hover target.
// }
//
// function handleDragLeave(e) {
//     this.classList.remove('over');  // this / e.target is previous target element.
// }
//
// function handleDrop(e) {
//     // this/e.target is current target element.
//
//     if (e.stopPropagation) {
//         e.stopPropagation(); // Stops some browsers from redirecting.
//     }
//
//     // Don't do anything if dropping the same column we're dragging.
//     if (dragSrcEl != this) {
//         // Set the source column's HTML to the HTML of the column we dropped on.
//         //alert(this.outerHTML);
//         //dragSrcEl.innerHTML = this.innerHTML;
//         //this.innerHTML = e.dataTransfer.getData('text/html');
//         this.parentNode.removeChild(dragSrcEl);
//         var dropHTML = e.dataTransfer.getData('text/html');
//         this.insertAdjacentHTML('beforebegin',dropHTML);
//         var dropElem = this.previousSibling;
//         addDnDHandlers(dropElem);
//
//     }
//     this.classList.remove('over');
//     return false;
// }
//
// function handleDragEnd(e) {
//     // this/e.target is the source node.
//     this.classList.remove('over');
//
//     /*[].forEach.call(cols, function (col) {
//       col.classList.remove('over');
//     });*/
// }
//
// function addDnDHandlers(elem) {
//     elem.addEventListener('dragstart', handleDragStart, false);
//     elem.addEventListener('dragenter', handleDragEnter, false)
//     elem.addEventListener('dragover', handleDragOver, false);
//     elem.addEventListener('dragleave', handleDragLeave, false);
//     elem.addEventListener('drop', handleDrop, false);
//     elem.addEventListener('dragend', handleDragEnd, false);
//
// }
//
// let cols = document.querySelectorAll('#columns .column');
// [].forEach.call(cols, addDnDHandlers);
// answer_block
options =  "free"
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

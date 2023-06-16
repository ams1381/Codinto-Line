import {file_upload_handler, question_creator, toggle_handler} from "./CommonActions.js";
import { preview_change_handler } from "./CommonActions.js";
import {priority_question_PostData} from "../ajax/QuestionPostData.js";
import { question_info_loader } from "./QuestionInfoLoader.js";
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
const titleInput = document.querySelector(".GTitle .TitleTextInput")
const ACTION_TYPE = localStorage.getItem("ACTION-TYPE");
const textInput = document.querySelector(".GDesc .TitleTextInput")
const file_input = document.querySelector("#file.box__file");
const necessaryQuestion = document.querySelector(".is_required .Switch-toggle .slider-button")
const QuestionNumber = document.querySelector(".show_number .Switch-toggle .slider-button")
const saveBtn = document.querySelector(".saveQuestion")
let options = null;

// initial data------------------------------------
if(ACTION_TYPE == 'Edit')
{
     
    question_info_loader(EditableQuestion)
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

 
titleInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Title-change',priority_question_PostData)})
textInput.addEventListener('input',() => {preview_change_handler(EditableQuestion,'Desc-change',priority_question_PostData)})
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

// add event listener to save button
saveBtn.addEventListener("click", async function (event) {
     
    if(EditableQuestion && ACTION_TYPE == 'Edit')
        await question_creator(ACTION_TYPE,EditableQuestion,'sort-questions',QuestionnaireUUID,priority_question_PostData);
    else
        await question_creator(ACTION_TYPE,null,'sort-questions',QuestionnaireUUID,priority_question_PostData);
})
necessaryQuestion.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,necessaryQuestion.parentElement.parentElement.parentElement,necessaryQuestion,priority_question_PostData);
})
QuestionNumber.addEventListener('click',() => {
  
toggle_handler(EditableQuestion,QuestionNumber.parentElement.parentElement.parentElement,QuestionNumber,priority_question_PostData);
})
file_input.addEventListener('input',() => {
    let selected_file_type;
    document.querySelectorAll(".fileFormat input").forEach((item) => {
        if(item.checked)
            selected_file_type = item.getAttribute("id")
    })
    if(file_input.files)
 
        priority_question_PostData.media = file_input.files[0];
    file_upload_handler(selected_file_type,file_input,EditableQuestion,priority_question_PostData);
})

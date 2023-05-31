const Title_input = document.getElementById("title__input");
const Description_input = document.getElementById("desc_input");

const question_preview_title = document.querySelector(".QuestionContainer .Question-Title p");
const question_preview_description = document.querySelector('.QuestionContainer .description_block p');

const multiple_answer_toggle = document.querySelector(".multiple-answer .Switch-toggle .slider-button");
const multiple_answer_selector = document.querySelector(".answer-number-selector");
const answer_options_container = document.querySelector(".Answer-Options");
const answer_option_buttons = document.querySelectorAll(".anw-option-tools button");

const preview_change_handler = (ACTION) => 
{
    switch(ACTION) 
    {
        case 'Title-change':
            question_preview_title.textContent = Title_input.value;
            break;
        case 'Desc-change':
            question_preview_description.textContent = Description_input.value;
            break;
    }
}
const answer_option_change_handler = (ACTION) => {
   
}
answer_option_buttons.forEach((answer_option_button,index) => {

})
multiple_answer_toggle.addEventListener('click',() => {
    if(!multiple_answer_toggle.previousElementSibling.checked)
        multiple_answer_selector.classList.add("active");
    else 
        multiple_answer_selector.classList.remove("active");
})
Title_input.addEventListener('input',() => {preview_change_handler('Title-change')});
Description_input.addEventListener('input',() => {preview_change_handler('Desc-change')});
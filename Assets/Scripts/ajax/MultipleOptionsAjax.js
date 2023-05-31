const Title_input = document.getElementById("title__input");
const Description_input = document.getElementById("desc_input");

const question_preview_title = document.querySelector(".QuestionContainer .Question-Title p");
const question_preview_description = document.querySelector('.QuestionContainer .description_block p');

const multiple_answer_toggle = document.querySelector(".multiple-answer .Switch-toggle .slider-button");
const multiple_answer_selector = document.querySelector(".answer-number-selector");
const answer_options_container = document.querySelector(".Answer-Options");
const answer_options = document.querySelectorAll(".Answer-Option");
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
const answer_option_adder = () => {
    let Last_answer_option = answer_options[answer_options.length - 1];
    let last_answer_option_number = parseInt(Last_answer_option.getAttribute("id").split("-")[3]);
    let copied_answer_option= Last_answer_option.cloneNode(true);
    console.log(copied_answer_option.firstChild)
   // copied_answer_option.firstChild.firstChild.textContent = last_answer_option_number + 1;
    answer_options_container.append(answer_options[answer_options.length - 1].cloneNode(true));
}
answer_option_buttons.forEach((answer_option_button) => {
    if(answer_option_button.classList.contains('answer-option-add'))
        answer_option_button.addEventListener('click',() => {
            answer_option_adder()
        })
})
multiple_answer_toggle.addEventListener('click',() => {
    if(!multiple_answer_toggle.previousElementSibling.checked)
        multiple_answer_selector.classList.add("active");
    else 
        multiple_answer_selector.classList.remove("active");
})
Title_input.addEventListener('input',() => {preview_change_handler('Title-change')});
Description_input.addEventListener('input',() => {preview_change_handler('Desc-change')});
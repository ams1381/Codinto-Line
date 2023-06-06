const show_number_toggle = document.querySelector(".show_number .Switch-Container .slider-button")
const required_toggle = document.querySelector('.is_required .Switch-Container .slider-button');
const multiple_answer_toggle = document.querySelector(".multiple_choice .Switch-toggle .slider-button");
const Title_input = document.getElementById("title__input");
const Description_input = document.getElementById("desc_input");
const rightInput = document.querySelector(".right-Input .label-text-input")
const middleInput = document.querySelector(".middle-Input .label-text-input")
const leftInput = document.querySelector(".left-Input .label-text-input")
const multiple_answer_min_input = document.querySelector('.minInput #Answermin');
const multiple_answer_max_input = document.querySelector('.maxInput #Answermax');
const degree_label = document.querySelector('.range-label');
const all_options_toggle = document.querySelector(".all_options .Switch-Container .slider-button");
const telegram_toggle = document.querySelector(".telegram .Switch-toggle input")
const whatsapp_toggle = document.querySelector(".whatsapp .Switch-toggle input")
const instagram_toggle = document.querySelector(".instagram .Switch-toggle input")
const eitaa_toggle = document.querySelector(".eitaa .Switch-toggle input")
const sorush_toggle = document.querySelector(".sorush .Switch-toggle input");

export const question_info_loader = (Question) => {
    let EditableQuestion = JSON.parse(localStorage.getItem('QuestionData'));
    Title_input.value = EditableQuestion.title;
    Description_input.value = EditableQuestion.description;

    if(max_label)
    {
        rightInput.value = EditableQuestion.max_label;
        middleInput.value = EditableQuestion.mid_label
        leftInput.value = EditableQuestion.min_label
    }

    if(EditableQuestion.button_text)
    {
      buttonText.value = EditableQuestion.button_text;
      if(EditableQuestion.is_solid_button)
        if(shapeLabel.classList.contains(EditableQuestion.button_shape) && shapeLabel.classList.contains('bg-colored'))
        {
            shapeLabel.previousElementSibling.checked = true;
            return
        }
    else
        if(shapeLabel.classList.contains(EditableQuestion.button_shape) && shapeLabel.classList.contains('bg-transp'))
        {
            shapeLabel.previousElementSibling.checked = true;
            return;
        }
    }
    if(EditableQuestion.options.length)
    {
        EditableQuestion.options.foreach((option) => {

        })
    }
    if(EditableQuestion.max_selected_options)
    {
        multiple_answer_min_input.value = EditableQuestion.max_selected_options;
        multiple_answer_max_input.value = EditableQuestion.min_selected_options;

    }
    

    //Toggles Loader :
    if(EditableQuestion.is_required != undefined)
        required_toggle.checked = EditableQuestion.is_required;
    if(EditableQuestion.show_number != undefined)
        show_number_toggle.checked = EditableQuestion.show_number;
    if(EditableQuestion.is_random_options != undefined)
        randomize_options_toggle.checked = EditableQuestion.is_random_options;
    if(EditableQuestion.multiple_choice != undefined)
        multiple_answer_toggle.checked = EditableQuestion.multiple_choice;
    if(EditableQuestion.telegram != undefined)
        telegram_toggle.checked = EditableQuestion.telegram;
    if(EditableQuestion.whatsapp != undefined)
        whatsapp_toggle.checked = EditableQuestion.whatsapp;
    if(EditableQuestion.sorush != undefined)
        sorush_toggle.checked = EditableQuestion.sorush;
    if(EditableQuestion.eitaa != undefined)
        eitaa_toggle.checked = EditableQuestion.eitaa;
    if(EditableQuestion.instagram != undefined)
        instagram_toggle.checked = EditableQuestion.instagram;
    
}
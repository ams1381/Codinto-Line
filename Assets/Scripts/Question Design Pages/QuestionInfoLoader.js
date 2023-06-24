import { baseUrl } from "../ajax/ajaxRequsts.js";
import { file_upload_handler , file_src_setter} from "./CommonActions.js";

const show_number_toggle = document.querySelector(".show_number .Switch-Container input")
const required_toggle = document.querySelector('.is_required .Switch-Container input');
const multiple_answer_toggle = document.querySelector(".multiple_choice .Switch-toggle input");
const Title_input = document.getElementById("title__input");
const Description_input = document.getElementById("desc_input");
const rightInput = document.querySelector(".right-Input .label-text-input")
const vertical_order_toggle = document.querySelector(".is_vertical .Switch-Container input");
const middleInput = document.querySelector(".middle-Input .label-text-input")
const leftInput = document.querySelector(".left-Input .label-text-input")
const multiple_answer_min_input = document.querySelector('.minInput #Answermin');
const randomize_options_toggle = document.querySelector(".is_random_options .Switch-Container input");
const file_input = document.querySelector("#file.box__file");
const multiple_answer_max_input = document.querySelector('.maxInput #Answermax');
const question_preview_description = document.querySelector('.QuestionContainer .description_block p');
const preview_button = document.querySelector(".QuestionStart .QuestionStartButton")
const preview_answer_options_container = document.querySelector(".multiple_answer_block-options")
const button_shape_items = document.querySelectorAll(".ShapeOptions label")
const question_preview_title = document.querySelector(".QuestionContainer .Question-Title p");
const button_text_input = document.querySelector('.GEntryButton .ButtonTextInput');
const multiple_answer_select_inputs = document.querySelectorAll(".LimitInput input")
const degree_label = document.querySelector('.range-label');
const question_preview_number = document.querySelector(".QuestionContainer .Question-Title label")
const all_options_toggle = document.querySelector(".all_options .Switch-Container input");
const telegram_toggle = document.querySelector(".telegram .Switch-toggle input")
const whatsapp_toggle = document.querySelector(".whatsapp .Switch-toggle input")
const instagram_toggle = document.querySelector(".instagram .Switch-toggle input")
const eitaa_toggle = document.querySelector(".eitaa .Switch-toggle input");
const selective_degree_shapes = document.querySelectorAll('.shape_selector_options label');
const seletive_degree_number = document.querySelector(".range-number .range-label")
const sorush_toggle = document.querySelector(".sorush .Switch-toggle input");
const preview_left_label = document.querySelector(".range__select_labels .range__select_left_label p");
const preview_right_label = document.querySelector(".range__select_labels .range__select_right_label p");
const preview_middle_label = document.querySelector(".range__select_labels .range__select_middle_label p");

export const question_info_loader = (Question) => {
    console.log(Question)
    if(!Question)
        return
    Title_input.value = Question.title;
    question_preview_title.textContent = Question.title;
    if(Question.description)
    {
        Description_input.value = Question.description;
        question_preview_description.textContent = Question.description;
    }
    else if(!Question.description)
    {
         Description_input.value = Question.question_text;
         question_preview_description.textContent = Question.question_text;
    }
    
    // Description_input.value = Question.description 
    if(Question.shape)
    {
        selective_degree_shapes.forEach((selective_degree_shape) => {
            if(selective_degree_shape.classList.contains(Question.shape))
                selective_degree_shape.previousElementSibling.checked = true;
        })
    }

    if(Question.max_label)
    {
        rightInput.value = Question.max_label;
        middleInput.value = Question.mid_label
        leftInput.value = Question.min_label

        
     //   preview_label_text_handler(Question.max_label,preview_right_label);
        // preview_label_text_handler(Question.min_label,preview_left_label);
        // preview_label_text_handler(Question.mid_label,preview_middle_label);
    }

    if(Question.button_text)
    {
      button_text_input.value = Question.button_text;
      preview_button.textContent = Question.button_text;
      button_shape_items.forEach((button_shape_item) => {
        if(Question.is_solid_button)
            if(button_shape_item.classList.contains(Question.button_shape) && button_shape_item.classList.contains('bg-colored'))
            {
                button_shape_item.previousElementSibling.checked = true;
                return
            }
        else
            if(button_shape_item.classList.contains(Question.button_shape) && button_shape_item.classList.contains('bg-transp'))
            {
                button_shape_item.previousElementSibling.checked = true;
                return;
            }
      })
      if(Question.is_solid_button)
            preview_button.className = 'QuestionStartButton ' + 'solid ' + Question.button_shape;
       else
            preview_button.className = 'QuestionStartButton ' + 'empty ' + Question.button_shape;
      
    }

    if(Question.max_selected_options)
    {
        multiple_answer_min_input.value = Question.max_selected_options;
        multiple_answer_max_input.value = Question.min_selected_options;

    }
    if(Question.media)
    {
        let selected_file_type;
        let file_name = Question.media.split("/")[6];
       
        document.querySelectorAll(".fileFormat input").forEach((item) => { 
            if(item.checked)
                selected_file_type = item.getAttribute("id")
        })
        file_src_setter(baseUrl + Question.media,file_name,selected_file_type,Question)
    }

    //Toggles Loader :
    if(Question.is_required)
    {
        required_toggle.checked = Question.is_required;
        question_preview_title.textContent += '*';
    }
    if(Question.show_number)
    {
        show_number_toggle.checked = Question.show_number;
        $(question_preview_number).hide(200);
    }
    if(Question.is_vertical)
    {
        vertical_order_toggle.checked = Question.is_vertical;
        preview_answer_options_container.classList.add('vertical-order')
    }
    if(Question.is_random_options)
        randomize_options_toggle.checked = Question.is_random_options;
    if(Question.multiple_choice)
        multiple_answer_toggle.checked = Question.multiple_choice;
    if(Question.telegram)
        telegram_toggle.checked = Question.telegram;
    if(Question.whatsapp)
        whatsapp_toggle.checked = Question.whatsapp;
    if(Question.sorush)
        sorush_toggle.checked = Question.sorush;
    if(Question.eitaa)
        eitaa_toggle.checked = Question.eitaa;
    if(Question.instagram)
        instagram_toggle.checked = Question.instagram;
    
}
import { baseUrl } from "../ajax/ajaxRequsts.js";
import { file_upload_handler , file_src_setter , preview_answer_option_generator} from "./CommonActions.js";
import { range_item_eventListener_setter } from "../../../Components/questionBox/rangeSelect.js";
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
const range_number_label = document.querySelector(".range-label");
const preview_degree_container = document.querySelector('.degree_answer_block-options');
const range_input_selector = document.querySelector(".range-input input")
const multiple_answer_max_input = document.querySelector('.maxInput #Answermax');
const question_preview_description = document.querySelector('.QuestionContainer .description_block p');
const preview_button = document.querySelector(".QuestionStart .QuestionStartButton")
const preview_answer_options_container = document.querySelector(".multiple_answer_block-options")
const button_shape_items = document.querySelectorAll(".ShapeOptions label");
let preview_degree_shapes = document.querySelectorAll('.degree_answer_block-option label i');
const question_preview_title = document.querySelector(".QuestionContainer .Question-Title p");
const button_text_input = document.querySelector('.GEntryButton .ButtonTextInput');
const minInput = document.querySelector(".minInput .label-text-input")
const maxInput = document.querySelector(".maxInput .label-text-input")
const multiple_answer_select_inputs = document.querySelectorAll(".LimitInput input")
const preview_options_container = document.querySelector(".multiple_answer_block-options");
const degree_label = document.querySelector('.range-label');
const question_preview_number = document.querySelector(".QuestionContainer .Question-Title label")
const all_options_toggle = document.querySelector(".all_options .Switch-Container input");
const telegram_toggle = document.querySelector(".telegram .Switch-toggle input")
const whatsapp_toggle = document.querySelector(".whatsapp .Switch-toggle input")
let preview_degree_items = document.querySelectorAll('.degree_answer_block-options .degree_answer_block-option');
const instagram_toggle = document.querySelector(".instagram .Switch-toggle input")
const eitaa_toggle = document.querySelector(".eitaa .Switch-toggle input");
const selective_degree_shapes = document.querySelectorAll('.shape_selector_options label');
const seletive_degree_number = document.querySelector(".range-number .range-label");
const no_options_toggle = document.querySelector(".nothing_selected .Switch-Container input");
const additional_options_toggle = document.querySelector(".additional-options-toggle .Switch-Container input");
const additional_options_selector = document.querySelector(".additional_options");
const answer_limit_container = document.querySelector(".AnswerAlphabetLimit");
const sampleAnswerBox = document.querySelector(".SampleAnw");
const sampleAnswerInput = document.querySelector(".SampleAnw .label-text-input");
const multiple_answer_selector = document.querySelector(".answer-number-selector");
const sorush_toggle = document.querySelector(".sorush .Switch-toggle input");
const preview_left_label = document.querySelector(".range__select_labels .range__select_left_label p");
const preview_right_label = document.querySelector(".range__select_labels .range__select_right_label p");
const answer_option = document.querySelectorAll('.Answer-Option');
const preview_middle_label = document.querySelector(".range__select_labels .range__select_middle_label p");
const answer_options_container = document.querySelector(".Answer-Options");

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
        range_number_label.textContent = Question.max;
        range_input_selector.value = Question.max;
        let shapeClassName;
        switch(Question.shape)
        {
            case 'S':
                document.querySelector('#star_shaped').checked = true;
                    shapeClassName = 'fa fa-star-o';
                break;
            case 'L':
                document.querySelector('#thumb_shaped').checked = true;
                    shapeClassName = 'fa fa-thumbs-up';
                break;
            case 'H':
                document.querySelector('#heart_shaped').checked = true;
                    shapeClassName = 'fa fa-heart-o';
                break;
        }
        preview_degree_shapes.forEach((preview_degree_shape) => {
                    preview_degree_shape.className = shapeClassName;
                })
        preview_degree_handler(Question,Question.max,shapeClassName);
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

    if(Question.max_label)
        preview_right_label.textContent = Question.max_label;
    if(Question.mid_label)
        preview_middle_label.textContent = Question.mid_label;
    if(Question.min_label)
        preview_left_label.textContent = Question.min_label;
    
    if(Question.question_type = 'integer_range' && Question.max && !Question.shape)
    {
        if(range_number_label)
        {
            range_number_label.textContent = Question.max;
            range_input_selector.value = Question.max;
            range_item_generator(Question.max)
        }
        
    }
    if(Question.max_selected_options)
    {
        multiple_answer_selector.classList.add("active");
        multiple_answer_min_input.value = Question.min_selected_options;
        multiple_answer_max_input.value = Question.max_selected_options;

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
    if(Question.pattern)
    {
        switch(Question.pattern) {
            case "text":
                answer_limit_container.style.display = "block";
                sampleAnswerBox.style.display = "none";
                document.querySelector(".selectionOption.text.free").selected = true;
                break;
            case "jalali_date":
                $(answer_limit_container).hide(40);
                $(sampleAnswerBox).show(40)
                document.querySelector(".selectionOption.date__shamsi.jalali_date").selected = true;
                minInput.value = "";
                maxInput.value = "";
                break;
            case "georgian_date":
                $(answer_limit_container).hide(40);
                $(sampleAnswerBox).show(40)
                document.querySelector(".selectionOption.date__miladi.georgian_date").selected = true;
                minInput.value = "";
                maxInput.value = "";
                break;
            case "mobile_number":
                $(answer_limit_container).hide(40);
                $(sampleAnswerBox).show(40)
                document.querySelector(".selectionOption.phone__number.mobile_number").selected = true;;
                minInput.value = "";
                maxInput.value = "";
                break;
            case "phone_number":
                $(answer_limit_container).hide(40);
                $(sampleAnswerBox).show(40)
                document.querySelector(".selectionOption.home__phone.phone_number").selected = true;
                minInput.value = "";
                maxInput.value = "";
                break;
            case "number_character":
                answer_limit_container.style.display = "block"
                $(sampleAnswerBox).show(40)
                document.querySelector(".selectionOption.number.number_character").selected = true;
                break;
            case "persian_letters":
                answer_limit_container.style.display = "block"
                $(sampleAnswerBox).show(40)
                document.querySelector(".selectionOption.persian.persian_letters").selected = true;
                break;
            case "english_letters":
                answer_limit_container.style.display = "block"
                $(sampleAnswerBox).show(40)
                document.querySelector(".selectionOption.english.english_letters").selected = true;
                break;
        }
    }
    if(Question.options)
    {
        answer_option.forEach((item) => { item.remove() });
        Question.options.forEach((option,index) => {
            main_multiple_option_generator(index + 1,option.text)
        }) 
    }
    if(Question.answer_template)
    {
        sampleAnswerInput.value = Question.answer_template;
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
    if(Question.all_options)
    {
        all_options_toggle.checked = true;
    }
    if(Question.nothing_selected)
    {
        no_options_toggle.checked = true;
    }
    if(Question.additional_options)
    {
        additional_options_toggle.checked = true;
        additional_options_selector.classList.add("active");
    }
}
const range_item_generator = (number_to_generate) => {
    let rangeContainer = document.querySelector(".range__select_items");
    rangeContainer.innerHTML = ""
    for(let i = 0 ; i < number_to_generate ; i++){
        let range_item_html = `
        <span class="range__number">
            <input type="radio"  name="range_item_input" class="range_input" id="range_input_n${i + 1}">
            <label for="range_input_n${i +1}">${i +1}</label>
        </span>
        `
        let parser = new DOMParser();
        let parsed_range_item = parser.parseFromString(range_item_html,'text/html').firstChild.lastChild.firstChild;
        rangeContainer.append(parsed_range_item);
        range_item_eventListener_setter(document.querySelectorAll(".range__number"))
    }
}
const preview_degree_handler = (Question,degree,shape_icon_className) => {
    degree_label.textContent = degree ;
    preview_degree_items.forEach((preview_degree_item) => {
        preview_degree_item.remove();
    })
    for(let i = 0;i < degree; i++)
    {
        const degree_element = `
        <div class="degree_answer_block-option">
            <input type="radio" name="answer__option" id="answer-n${i}">
            <label class="answer_option-label" for="answer-n${i}"><i class="${shape_icon_className}"></i></label>
        </div>`
        const parser = new DOMParser();
        const parsed_degree_element = parser.parseFromString((degree_element),'text/html').firstChild.lastChild.firstChild;
        $(parsed_degree_element).hide();
        preview_degree_container.append(parsed_degree_element);
        $(parsed_degree_element).show(50);
    }
     preview_degree_items = document.querySelectorAll('.degree_answer_block-options .degree_answer_block-option');
     preview_degree_shapes = document.querySelectorAll('.degree_answer_block-option label i');

}
const main_multiple_option_generator = (OptionNumber,OptionText) => {
 let main_option_html =  `<div class="multiple_answer_block-option">
                <input type="radio" name="answer__option" id="answer-n${OptionNumber}">
                <label class="answer_option-label" for="answer-n${OptionNumber}">${OptionText}</label>
            </div>
            `
 let side_option_html = `<div class="Answer-Option" id="anw-option-${OptionNumber}">
 <div class="anw-option-number">
     <label class="anw-option-label">
         ${OptionNumber}
     </label>  
     <input type="text" class="anw-option-input" id="option_input_${OptionNumber}" value ="${OptionText}">    
 </div>
 <div class="anw-option-tools">
     <button class="answer-option-view">
         <i class="fa fa-eye"></i>
     </button>
     <button class="answer-option-remove">
         <i class="fa fa-trash"></i>
     </button>
     <button class="answer-option-add">
         <i class="fa fa-plus-circle"></i>
     </button>
 </div>
</div>
 `
    preview_options_container.innerHTML += main_option_html;
    answer_options_container.innerHTML += side_option_html;
}

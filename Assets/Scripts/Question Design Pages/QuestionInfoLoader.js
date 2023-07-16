import { baseUrl } from "../ajax/ajaxRequsts.js";
import { file_upload_handler , file_src_setter , preview_answer_option_generator, answer_option_eventListener_setter, detectFileFormat, file_input_empty_setter} from "./CommonActions.js";
import { range_item_eventListener_setter } from "../../../Components/questionBox/rangeSelect.js";
const show_number_toggle = document.querySelector(".show_number .Switch-Container input")
const required_toggle = document.querySelector('.is_required .Switch-Container input');
const multiple_answer_toggle = document.querySelector(".multiple_choice .Switch-toggle input");
const Title_input = document.getElementById("title__input");
const min_input_number = document.querySelector('#Alphabetmin');
const max_input_number = document.querySelector('#Alphabetmax');
const Description_input = document.getElementById("desc_input");
const rightInput = document.querySelector(".right-Input .label-text-input")
const vertical_order_toggle = document.querySelector(".is_vertical .Switch-Container input");
const middleInput = document.querySelector(".middle-Input .label-text-input")
const leftInput = document.querySelector(".left-Input .label-text-input")
const multiple_answer_min_input = document.querySelector('.minInput #Answermin');
const randomize_options_toggle = document.querySelector(".is_random_options .Switch-Container input");
const file_input = document.querySelector("#file.box__file");
const range_number_label = document.querySelector(".range-label");
const preview_image_cancel_button = document.querySelector(".inputUploader .cancel_uploaded_file_button")
const preview_degree_container = document.querySelector('.degree_answer_block-options');
const range_input_selector = document.querySelector(".range-input input")
const multiple_answer_max_input = document.querySelector('.maxInput #Answermax');
const question_preview_description = document.querySelector('.QuestionContainer .description_block p');
const preview_button = document.querySelector(".QuestionStart .QuestionStartButton")
const preview_button_text= document.querySelector(".QuestionStart .QuestionStartButton p");
const preview_answer_options_container = document.querySelector(".multiple_answer_block-options")
const button_shape_items = document.querySelectorAll(".ShapeOptions label");
let preview_degree_shapes = document.querySelectorAll('.degree_answer_block-option label i');
const question_preview_title = document.querySelector(".QuestionContainer .Question-Title p");
const button_text_input = document.querySelector('.GEntryButton .ButtonTextInput');
const preview_image_main = document.querySelector(".preview_file_box .preview_image");
const minInput = document.querySelector(".minInput .label-text-input")
const maxInput = document.querySelector(".maxInput .label-text-input")
const multiple_answer_select_inputs = document.querySelectorAll(".LimitInput input");
const share_link_toggle = document.querySelector(".share_link .Switch-Container input");
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
const double_picture_size_toggle = document.querySelector('.double_picture_size .Switch-Container input')
const additional_options_selector = document.querySelector(".additional_options");
const answer_limit_container = document.querySelector(".AnswerAlphabetLimit");
const sampleAnswerBox = document.querySelector(".SampleAnw");
const sampleAnswerInput = document.querySelector(".SampleAnw .label-text-input");
const multiple_answer_selector = document.querySelector(".answer-number-selector");
const sorush_toggle = document.querySelector(".sorush .Switch-toggle input");
const preview_left_label = document.querySelector(".range__select_labels .range__select_left_label p");
const preview_right_label = document.querySelector(".range__select_labels .range__select_right_label p");
const optional_question_answer_options = document.querySelectorAll('.Answer-Option');
const preview_middle_label = document.querySelector(".range__select_labels .range__select_middle_label p");
const answer_options_container = document.querySelector(".Answer-Options");

export const question_info_loader = (Question) => {
    console.log(Question)
    if(!Question)
        return
    Title_input.textContent = $(new DOMParser().parseFromString(Question.title,'text/html')).text();
    question_preview_title.textContent = $(new DOMParser().parseFromString(Question.title,'text/html')).text()
    

    text_style_load_handler(Question,'title','em','TitleInput','italic',Title_input,'Question-Title');
    text_style_load_handler(Question,'title','strong','TitleInput','bold',Title_input,'Question-Title');
    text_style_load_handler(Question,'title','u','TitleInput','underline',Title_input,'Question-Title');
    if(Question.placement)
    {
        if(question_preview_number)
            question_preview_number.textContent = ` ${Question.placement} `
    }
    
    if(Question.description)
    {
        question_preview_description.textContent = Question.description;
        question_preview_description.textContent = $(new DOMParser().parseFromString(Question.description,'text/html')).text();
        Description_input.textContent = $(new DOMParser().parseFromString(Question.description,'text/html')).text();
    }
    else if(Question.question_text)
    {
        text_style_load_handler(Question,'question_text','em','DescInput','italic',Description_input,'description_block');
        text_style_load_handler(Question,'question_text','strong','DescInput','bold',Description_input,'description_block');
        text_style_load_handler(Question,'question_text','u','DescInput','underline',Description_input,'description_block');
        question_preview_description.textContent = $(new DOMParser().parseFromString(Question.question_text,'text/html')).text();
        Description_input.textContent = $(new DOMParser().parseFromString(Question.question_text,'text/html')).text();
    }
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
        // preview_degree_shapes.forEach((preview_degree_shape) => {
        //             preview_degree_shape.className = shapeClassName;
        //         })
        preview_degree_handler(Question.max,shapeClassName);
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
     text_style_load_handler(Question,'button_text','em','ButtonTextInputOptions','italic',button_text_input,'QuestionStartButton');
     text_style_load_handler(Question,'button_text','strong','ButtonTextInputOptions','bold',button_text_input,'QuestionStartButton');
     text_style_load_handler(Question,'button_text','u','ButtonTextInputOptions','underline',button_text_input,'QuestionStartButton');
      button_text_input.value = $(new DOMParser().parseFromString(Question.button_text,'text/html')).text();
      preview_button_text.textContent = $(new DOMParser().parseFromString(Question.button_text,'text/html')).text();
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
      {
        preview_button.classList.remove('empty')
        preview_button.classList.add('solid',Question.button_shape)
      }
       else
       {
        preview_button.classList.remove('solid')
        preview_button.classList.add('empty',Question.button_shape)
       }
    }
    if(Question.max_label)
        preview_right_label.textContent = Question.max_label;
    if(Question.mid_label)
        preview_middle_label.textContent = Question.mid_label;
    if(Question.min_label)
        preview_left_label.textContent = Question.min_label;
    
    if(Question.question_type === 'integer_range' && Question.max && !Question.shape)
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
        // multiple_answer_selector
    }
    if(Question.media)
        media_loader(Question);
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
    if(Question.question_type === 'optional')
    {
        optional_question_info_loader(Question.options,Question);
        if(!Question.multiple_choice)
            multiple_answer_selector.classList.remove('active')
    }
        
    if(Question.question_type === 'drop_down')
        slide_list_question_info_loader(Question.options,Question.double_picture_size,Question)
        
    if(Question.question_type === 'text_answer')
    {
        Question.answer_template ? sampleAnswerInput.value = Question.answer_template : sampleAnswerInput.value = '';
        minInput.value = Question.min;
        maxInput.value = Question.max;
    }
    if(Question.question_type == 'number_answer')
    {
        min_input_number.value = Question.min;
        max_input_number.value = Question.max;
    }
    if(Question.question_type == 'sort')
    {
        optional_question_info_loader(Question.options,Question);
    }
    toggle_loader(Question)
}
const toggle_loader = (Question) => {
    if(Question.is_required)
    {
        required_toggle.checked = Question.is_required;
        question_preview_title.textContent += '*';
    }
    if(Question.show_number)
    {
        show_number_toggle.checked = Question.show_number;
        $(question_preview_number).hide(200);
        $('.Question-Title span').hide(100);
    }
    if(Question.is_vertical)
    {
        vertical_order_toggle.checked = Question.is_vertical;
        preview_answer_options_container.classList.add('vertical-order')
    }
    if(Question.share_link)
        share_link_toggle.checked = Question.share_link;  
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
        all_options_toggle.checked = true;
    if(Question.nothing_selected)
        no_options_toggle.checked = true;
    if(Question.additional_options)
    {
        additional_options_toggle.checked = true;
        additional_options_selector.classList.add("active");
    }
    if(Question.double_picture_size)
    {
        double_picture_size_toggle.checked  = true;
    }

}
const media_loader = (Question) => {
    let selected_file_type;
        let file_name = Question.media.split("/")[Question.media.split("/").length - 1];
        let FileInput = document.querySelector('.inputUploader .box__file');
        document.querySelectorAll(".fileFormat input").forEach((item) => { 
            if(item.checked)
                selected_file_type = item.getAttribute("id");
        })
        document.querySelectorAll(".fileFormat input").forEach((item) => { 
            if(item.value == detectFileFormat(file_name))
                item.checked = true;
            item.addEventListener('click',() => {
                if(item.value != detectFileFormat(file_name))
                    file_input_empty_setter(FileInput,Question);
            })                
        })
        FileInput = document.querySelector('.inputUploader .box__file');
        preview_image_cancel_button.addEventListener('click',() => {
            file_input_empty_setter(FileInput,Question);
        })
        // file_input_empty_setter(document.querySelector('.inputUploader .box__file'),Question);
        file_src_setter(Question.media,file_name,detectFileFormat(file_name),Question);
        Question.media = null;
}
const optional_question_info_loader = (options,Question) => {
    let preview_main_options = document.querySelectorAll('.multiple_answer_block-option');
    preview_main_options.forEach((item) => { item.remove() });
    optional_question_answer_options.forEach((item) => { item.remove() });
    options.forEach((option,index) => {
        main_multiple_option_generator(index + 1,option.text,Question)
    }) 
}
const slide_list_question_info_loader = (options,double_size,Question) => {
    if(double_size)
        preview_image_main.classList.add('double_size');
    optional_question_answer_options.forEach((item) => { item.remove() });
    document.querySelectorAll('.selection__item').forEach((item) => { item.remove() })
    options.forEach((option,index) => {
        slide_list_option_generator(index + 1,option.text,Question)
    }) 
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
const preview_degree_handler = (degree,shape_icon_className) => {
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
const main_multiple_option_generator = (OptionNumber,OptionText,Question) => {
 let main_option_html =  `<div class="multiple_answer_block-option" id="preview-option-${OptionNumber}">
                <input type="radio" name="answer__option" id="answer-n${OptionNumber}">
                <label class="answer_option-label" for="answer-n${OptionNumber}">${OptionText}</label>
            </div>
            `
    side_answer_option_generator(OptionNumber,OptionText,"MultipleOption",Question)
    preview_options_container.innerHTML += main_option_html;
    
}
const slide_list_option_generator = (OptionNumber,OptionText,Question) => {
    const preview_slider_container = document.querySelector(".selection__box")
    side_answer_option_generator(OptionNumber,OptionText,"SliderOption",Question)
        let  preview_answer_option = `
            <span class="selection__item" id="select_item_${OptionNumber}">
                <input class="select_item_input" type="radio" id="select_item_input_${OptionNumber}">
                <label for="select_item_input_${OptionNumber}">${OptionText}</label>
            </span>
            `
    const parser = new DOMParser();
    const parsed_preview_answer_option = parser.parseFromString((preview_answer_option),'text/html').firstChild.lastChild.firstChild;
    $(parsed_preview_answer_option).hide(50);
    preview_slider_container.append(parsed_preview_answer_option);
    $(parsed_preview_answer_option).show(100);
}
const side_answer_option_generator = (OptionNumber,OptionText,Option_Type,Question) => {
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
    answer_options_container.append(
        new DOMParser().parseFromString(side_option_html,'text/html').firstChild.lastChild.firstChild
    ) 
    answer_option_eventListener_setter(OptionNumber,Option_Type,Question)
}
const text_style_load_handler = (Question,text_to_load,style_tag,style_container_class,style,input,main_container_class) => {
    if(Question[`${text_to_load}`].search(`${style_tag}`) != -1)
    {
        side_text_style_loader(style_container_class,style,input);
        document.querySelector(`.${main_container_class} p`).classList.add(style)
    }   
}
const side_text_style_loader = (style_container_class,Style,Input) => {
    switch(Style)
    {
       case 'bold':
            document.querySelector(`.${style_container_class} #Tbolder`).checked = true;
            Input.classList.add('bold');
            break;
       case 'italic':
            document.querySelector(`.${style_container_class} #TItalic`).checked = true;
            Input.classList.add('italic');
            break;
        case 'underline':
            document.querySelector(`.${style_container_class} #TUnderline`).checked = true;
            Input.classList.add('underline');
            break;
    }
}
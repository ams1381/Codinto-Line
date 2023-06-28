import { detectFileFormat } from "../../Question Design Pages/CommonActions.js"
import { baseUrl } from "../../ajax/ajaxRequsts.js";


export const question_component_generator = (Question) => {
    let media_src;
    if(Question.media)
         media_src = baseUrl + Question.media;
    let default_question_html = `
    `
    let answer_box_html;
    switch(Question.question_type)
    {
        case 'text_answer':
            answer_box_html = `
            <div class="textArea__container">
                    <textarea class="entry__input" id="w3review" name="w3review" rows="7" cols="50" placeholder="لطفا پاسخ خود را وارد کنید"></textarea>
                </div>
            `
            break;
        case 'no_answer':
            answer_box_html =''
            break;
        case 'integer_range':
            answer_box_html = `
            <div class="range__select">
                <div class="range__select_items">
                    <span class="range__number">1</span>
                    <span class="range__number">2</span>
                    <span class="range__number">3</span>
                </div>
                <div class="range__select_labels">
                    <div class="range__select_right_label">
                        <p></p>
                    </div>
                    <div class="range__select_middle_label">
                        <p></p>
                    </div>
                    <div class="range__select_left_label">
                        <p></p>
                    </div>
                </div>
        </div>
            `
            break;
        case 'integer_selective':
            answer_box_html = `
                <div class="answer_block">
                        <div class="degree_answer_block-options">
                            <div class="degree_answer_block-option">
                                <input type="radio" name="answer__option" id="answer-n1">
                                <label class="answer_option-label" for="answer-n1"><i class="fa fa-star-o"></i></label>
                            </div>
                        </div>
                </div>`
            break;
        case 'file':
            answer_box_html = `
                <div class="Upload__container ">
                    <div class="upload__box">
                        <input type="file" id="uploadInput" class="uploadInput"/>
                        <label for="uploadInput">
                            <i class="fa fa-upload uploadIcon"></i>
                        </label>
                    </div>
                </div>`
            break;
        case 'drop_down':
            let drop_down_options_html = '';
            
            Question.options.forEach((option) => {
                if(option)
                drop_down_options_html += `<span class="selection__item" id="select_item_${option.id}">
                    <input class="select_item_input" type="radio" id="select_item_input_${option.id}">
                    <label for="select_item_input_${option.id}">${option.text}</label>
                </span>`
            })
            answer_box_html = `
                <div class="answer_block">
                    <div class="answer_block_slider">
                        <div class="slider_toggle">
                            <button class="slider_toggle_button">
                                <i class="fa fa-angle-down"></i>
                            </button>
                        </div>
                        <div class="selection">
                            <div class="selection__box">
                            ${drop_down_options_html ? drop_down_options_html : 'bbb'}
                            </div>
                        </div>
                    </div>
                </div>`
            break;
        case 'number_answer':
            answer_box_html = `
            <div class="textArea__container">
                    <input type="number" class="action__input">
                </div>`
            break;
        // case 'link':
        //     window.open("/Pages/link.html","_Self");
        //     break;
        case 'optional':
            let option_html = '';
            Question.options.forEach((option) => {
                if(option)
                    option_html +=  `<div class="multiple_answer_block-option">
                            <input type="radio" class="answer_option_input" name="answer__option" id="answer-n${option.id}">
                            <label class="answer_option-label" for="answer-n${option.id}">${option.text}</label>
                    </div>`
                answer_box_html = `
                <div class="answer_block">
                    <div class="multiple_answer_block-options">
                     ${option_html ? option_html : 'amir'}
                    </div>
            </div>
            `
            })
            // return multiple_question_component(Question,media_src,Question.media)
            break;
        case 'email_field':
            answer_box_html = `
            <div class="textArea__container">
                    <input type="email" class="action__input">
                </div>`
            // return email_question_component(Question,media_src,Question.media)
            break;
        // case 'group':
        //     window.open("/Pages/groupQuestion.html","_Self");
        //     break;
        // case 'Sort':
        //     window.open("/Pages/Priority.html","_Self");
        //     break;
    }
    let preview_file_className = '';
    switch(detectFileFormat(Question.media))
    {
        case 'PICTURE':
            preview_file_className = 'preview_image_active';
            break;
        case "VIDEO":
            preview_file_className - 'preview_video_active';
            break;
        default:
            preview_file_className = ' ';
            break;
    }
   return default_question_html = `<div class="QuestionContainer ${Question.question_type}">
                <div class="Question-Title">
                    <label>${Question.id} :</label>
                    <p>${Question.title}</p>
                </div>
                <div class="description_block">
                    <p>${Question.question_text}</p>
                </div>
                <div class="preview_file_box ${preview_file_className}">
                ${
                    (detectFileFormat(Question.media) == 'PICTURE') ? 
                    `<img class="preview_image" src=${media_src}></img>` :
                    `<video class="preview_video" controls ${detectFileFormat(Question.media) == "VIDEO" ? src = media_src : ""} ></video>`
                }
                </div>
                ${answer_box_html}
            </div>`
}

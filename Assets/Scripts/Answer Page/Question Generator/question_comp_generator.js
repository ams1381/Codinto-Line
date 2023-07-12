import { detectFileFormat } from "../../Question Design Pages/CommonActions.js"
import { baseUrl } from "../../ajax/ajaxRequsts.js";


export const question_component_generator = (Question) => {
    if(Array.isArray(Question))
        return null;

    let media_src;
    if(Question.media)
         media_src =  Question.media;
    let default_question_html = `
    `
    let answer_box_html;
    switch(Question.question_type)
    {
        case 'text_answer':
            answer_box_html = `
            <div class="textArea__container">
                    <textarea class="entry__input" id="text_answer_input" name="w3review" rows="7" 
                    cols="50" placeholder="${Question.answer_template ? Question.answer_template : ''}"></textarea>
                </div>
            `
            break;
        case 'no_answer':
            answer_box_html = `
            <div class="QuestionStart">
                <button class="QuestionStartButton ${Question.is_solid_button ? 'solid' : 'empty'} ${Question.button_shape}">
                    <p> ${Question.button_text} </p>
                </button>
             </div>
            `
            break;
        case 'integer_range':
            let range_items_html = '';
            for(let i = 0;i < Question.max ; i++) 
            {
                range_items_html += `
                    <span class="range__number">
                        <input type="radio"  name="range_item_input" class="range_input" id="range_input_n${i + 1}">
                        <label for="range_input_n${i + 1}">${i + 1}</label>
                    </span>`
            }
            answer_box_html = `
            <div class="range__select">
                <div class="range__select_items">
                    ${range_items_html}
                </div>
                <div class="range__select_labels">
                    <div class="range__select_right_label">
                        <p>${Question.max_label}</p>
                    </div>
                    <div class="range__select_middle_label">
                        <p>${Question.mid_label}</p>
                    </div>
                    <div class="range__select_left_label">
                        <p>${Question.min_label}</p>
                    </div>
                </div>
        </div>
            `
            break;
        case 'integer_selective':
            let degree_shape = '';
            let degree_option_html = '';
            switch(Question.shape)
            {
                case 'S':
                    degree_shape = '<i class="fa fa-star-o"></i>';
                    break;
                case 'H':
                    degree_shape = '<i class="fa fa-heart-o"></i>';
                    break;
                case 'L':
                    degree_shape = '<i class="fa fa-thumbs-up"></i>';
                    break;
            }
            for(let i = 0; i < Question.max ; i++)
                degree_option_html += `
                    <div class="degree_answer_block-option">
                        <input type="radio" name="answer__option" id="answer-n${i + 1}">
                        <label class="answer_option-label" for="answer-n${i + 1}">${degree_shape}</label>
                    </div>
                    `;
                    
            answer_box_html = `
                <div class="answer_block">
                        <div class="degree_answer_block-options">
                            ${degree_option_html}
                        </div>
                </div>`
            break;
        case 'file':
            answer_box_html = `
            <div class="inputUploader">
                <div class="image_or_video_box">
                    <div class="cancel_uploaded_file">
                        <button class="cancel_uploaded_file_button">
                            <i class="fa fa-close"></i>
                        </button>
                    </div>
                <div class="uploaded_file_info">
                    <div class="uploaded_file_avatar">
                        <img class="uploaded_file_image" alt="">
                        <video class="uploaded_file_video"></video>
                    </div>          
                </div>
            </div>
                <input class="box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
                    <label for="file" class="upload_file_label">
                      <i class="fa fa-upload"></i>
                    </label>
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
                    <input type="number" class="action__input" id="number_answer_input" placeholder = "یک عدد وارد کنید">
                </div>`
            break;
        case 'link':
            answer_box_html = `
            <div class="textArea__container">
                <input type="text" class="action__input" id="link_answer_input" placeholder = "wwww.google.com">
            </div>
            `
            break;
        case 'optional':
            let option_html = '';
            Question.options.forEach((option,index) => {
                if(option)
                    option_html +=  `<div class="multiple_answer_block-option">
                            <input type="${Question.multiple_choice ? 'checkbox' : 'radio'}" class="answer_option_input" name="answer__option" id="answer-n${option.id}">
                            <label class="answer_option-label" for="answer-n${option.id}">${option.text}</label>
                    </div>`
                answer_box_html = `
                <div class="answer_block">
                    <div class="multiple_answer_block-options ${Question.is_vertical ? 'vertical-order' : ''}">
                     ${option_html ? option_html : ' '}
                    </div>
            </div>
            `
            })
            
            // return multiple_question_component(Question,media_src,Question.media)
            break;
        case 'email_field':
            answer_box_html = `
            <div class="textArea__container">
                    <input type="email" class="action__input" id="email_answer_input" placeholder = "example23@gamil.com">
                </div>`
            break;
        case 'group':
            answer_box_html = `
            <div class="QuestionStart">
                <button class="QuestionStartButton ${Question.is_solid_button ? 'solid' : 'empty'} ${Question.button_shape}">
                    <p> ${Question.button_text} </p>
                </button>
             </div>
             ${Question.child_questions.map((item) => {
                // console.log(question_component_generator(item.question))
                return question_component_generator(item.question)
             })}
            `
            break;
        case 'sort':
            let drag_option_html = '';
            Question.options.forEach((option,index) => {
                if(option)
                drag_option_html +=  `<div class="multiple_answer_block-option">
                            <input type="${Question.multiple_choice ? 'checkbox' : 'radio'}" class="answer_option_input" name="answer__option" id="answer-n${option.id}">
                            <label class="answer_option-label" for="answer-n${option.id}">${option.text}</label>
                    </div>`
                answer_box_html = `
                <div class="answer_block">
                    <div class="multiple_answer_block-options vertical-order nested">
                     ${drag_option_html ? drag_option_html : ' '}
                    </div>
            </div>
            `
            })
            break;
    }
    let preview_file_className = '';
    switch(detectFileFormat(Question.media))
    {
        
        case 'Picture':
            preview_file_className = 'preview_image_active';
            break;
        case "Video":
            preview_file_className = 'preview_video_active';
            break;
        default:
            preview_file_className = ' ';
            break;
    }
    
   return default_question_html = `<div id="Q${Question.id}" class="QuestionContainer ${Question.question_type} ${Question.is_required ? 'required' : ''}">
                <div class="Question-Title">
                    <label>${!Question.show_number ? Question.placement : ""}</label> ${!Question.show_number  ? ':' : ''}
                    <p>${Question.title} ${Question.is_required ? '*' : ''}</p>
                </div>
                <div class="description_block">
                    <p>${Question.question_text}</p>
                </div>
                <div class="preview_file_box ${preview_file_className}">
                ${
                    (detectFileFormat(Question.media) == 'Picture') ? 
                    `<img class="preview_image ${Question.double_picture_size ? 'double_size' : ' '}" src=${media_src ? media_src : ''}></img>` :
                    `<video class="preview_video" controls >
                            <source src=${media_src ? media_src : ''} />
                    </video>`
                }
                </div>
                ${answer_box_html}
            </div>`
}

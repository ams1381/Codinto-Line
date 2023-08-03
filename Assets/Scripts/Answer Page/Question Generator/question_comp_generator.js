import { detectFileFormat } from "../../Question Design Pages/CommonActions/CommonActions.js"
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
                        <p>${Question.min_label}</p>
                    </div>
                    <div class="range__select_middle_label">
                        <p>${Question.mid_label}</p>
                    </div>
                    <div class="range__select_left_label">
                        <p>${Question.max_label}</p>
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
                        <input type="radio" id="IS${Question.id}_answer-n${i + 1}">
                        <label class="answer_option-label" for="IS${Question.id}_answer-n${i + 1}">${degree_shape}</label>
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
                            <i>
                                            <svg class="close_svg" fill="#3F52E3" width="24" height="24" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM21.657 10.344c-0.39-0.39-1.023-0.39-1.414 0l-4.242 4.242-4.242-4.242c-0.39-0.39-1.024-0.39-1.415 0s-0.39 1.024 0 1.414l4.242 4.242-4.242 4.242c-0.39 0.39-0.39 1.024 0 1.414s1.024 0.39 1.415 0l4.242-4.242 4.242 4.242c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.414l-4.242-4.242 4.242-4.242c0.391-0.391 0.391-1.024 0-1.414z"></path> </g></svg>
                                        </i>
                        </button>
                    </div>
                <div class="uploaded_file_info">
                    <div class="uploaded_file_avatar">
                        <img class="uploaded_file_image" alt="">
                        <video class="uploaded_file_video"></video>
                        <div class="zip_file_preview">
                            <svg fill="#3F52E3" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="47" height="47" viewBox="0 0 77.749 77.749" xml:space="preserve" stroke="#3F52E3" stroke-width="0.0007774899999999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M54.04,0H14.908c-2.627,0-4.767,2.141-4.767,4.768V72.98c0,2.631,2.14,4.769,4.767,4.769H62.84 c2.63,0,4.768-2.138,4.768-4.769V14.743L54.04,0z M55.165,7.135l5.947,6.463h-5.947V7.135z M63.604,72.98 c0,0.42-0.344,0.765-0.766,0.765h-47.93c-0.421,0-0.763-0.345-0.763-0.765V4.768c0-0.421,0.342-0.762,0.763-0.762h24.413v1.717 h-5.18v2.892h5.18v5.676h-5.18v2.891h5.18v5.442h-5.18v2.891h5.18v0.217v0.166v4.281h-5.18v2.892h5.18v5.676h-5.18v2.892h5.18 v5.441h-5.18v2.891h2.77c-1.059,0.053-1.902,0.92-1.902,1.99v1.141h0.016v8.649c0,2.246,1.828,4.074,4.074,4.074 s4.073-1.828,4.073-4.074v-8.649h0.002v-1.141c0-1.104-0.896-2-2-2h-0.057v-4.438h4.756v-2.892h-4.756v-5.441h4.756v-2.892h-4.756 v-5.677h4.756v-2.891h-4.756v-4.664h4.756v-2.891h-4.756v-5.442h4.756V9.842h-4.756V4.165h4.756v-0.16h5.285V15.6 c0,1.104,0.899,1.999,2.004,1.999h10.441V72.98z M41.7,56.65v4.832c0,1.451-1.177,2.625-2.625,2.625 c-1.449,0-2.625-1.174-2.625-2.625V56.65H41.7z"></path> </g> </g></svg>
                        </div>
                        <div class="file_preview">
                            <svg width="47" height="47" viewBox="0 0 32.00 32.00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#3F52E3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>file-document</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke-width="0.00032" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-154.000000, -99.000000)" fill="#3F52E3"> <path d="M174,107 C172.896,107 172,106.104 172,105 L172,101 L178,107 L174,107 L174,107 Z M178,127 C178,128.104 177.104,129 176,129 L158,129 C156.896,129 156,128.104 156,127 L156,103 C156,101.896 156.896,101 158,101 L169.972,101 C169.954,103.395 170,105 170,105 C170,107.209 171.791,109 174,109 L178,109 L178,127 L178,127 Z M172,99 L172,99.028 C171.872,99.028 171.338,98.979 170,99 L158,99 C155.791,99 154,100.791 154,103 L154,127 C154,129.209 155.791,131 158,131 L176,131 C178.209,131 180,129.209 180,127 L180,109 L180,107 L172,99 L172,99 Z" id="file-document" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                        </div>
                        <div class="audio_file_preview">
                            <svg width="47" height="47" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.25 16.9999C11.25 16.5857 10.9142 16.2499 10.5 16.2499C10.0858 16.2499 9.75 16.5857 9.75 16.9999C9.75 17.4142 10.0858 17.7499 10.5 17.7499C10.9142 17.7499 11.25 17.4142 11.25 16.9999Z" fill="#3F52E3"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.67239 7.54199H15.3276C18.7024 7.54199 20.3898 7.54199 21.3377 8.52882C22.2855 9.51564 22.0625 11.0403 21.6165 14.0895L21.1935 16.9811C20.8437 19.3723 20.6689 20.5679 19.7717 21.2839C18.8745 21.9999 17.5512 21.9999 14.9046 21.9999H9.09534C6.4488 21.9999 5.12553 21.9999 4.22834 21.2839C3.33115 20.5679 3.15626 19.3723 2.80648 16.9811L2.38351 14.0895C1.93748 11.0403 1.71447 9.51565 2.66232 8.52882C3.61017 7.54199 5.29758 7.54199 8.67239 7.54199ZM12.75 10.4999C12.75 10.0857 12.4142 9.74995 12 9.74995C11.5858 9.74995 11.25 10.0857 11.25 10.4999V14.878C11.0154 14.7951 10.763 14.7499 10.5 14.7499C9.25736 14.7499 8.25 15.7573 8.25 16.9999C8.25 18.2426 9.25736 19.2499 10.5 19.2499C11.7426 19.2499 12.75 18.2426 12.75 16.9999V13.3197C13.4202 13.8633 14.2617 14.2499 15 14.2499C15.4142 14.2499 15.75 13.9142 15.75 13.4999C15.75 13.0857 15.4142 12.7499 15 12.7499C14.6946 12.7499 14.1145 12.5313 13.5835 12.0602C13.0654 11.6006 12.75 11.0386 12.75 10.4999Z" fill="#3F52E3"></path> <path opacity="0.4" d="M8.50956 2.00001H15.4897C15.7221 1.99995 15.9004 1.99991 16.0562 2.01515C17.164 2.12352 18.0708 2.78958 18.4553 3.68678H5.54395C5.92846 2.78958 6.83521 2.12352 7.94303 2.01515C8.09884 1.99991 8.27708 1.99995 8.50956 2.00001Z" fill="#3F52E3"></path> <path opacity="0.7" d="M6.3102 4.72266C4.91958 4.72266 3.77931 5.56241 3.39878 6.67645C3.39085 6.69967 3.38325 6.72302 3.37598 6.74647C3.77413 6.6259 4.18849 6.54713 4.60796 6.49336C5.68833 6.35485 7.05367 6.35492 8.6397 6.35501H15.5318C17.1178 6.35492 18.4832 6.35485 19.5635 6.49336C19.983 6.54713 20.3974 6.6259 20.7955 6.74647C20.7883 6.72302 20.7806 6.69967 20.7727 6.67645C20.3922 5.56241 19.2519 4.72266 17.8613 4.72266H6.3102Z" fill="#3F52E3"></path> </g></svg>
                        </div>
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
                            <input type="${Question.multiple_choice ? 'checkbox' : 'radio'}" class="answer_option_input" name="question${Question.id}_answer_option" id="answer-n${option.id}">
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
             <div class="separator"></div>
             ${Question.child_questions.map((item) => {
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
    
   return default_question_html = `
   <div>
        <div class="separator"></div>
                <div id="Q${Question.id}" class="QuestionContainer ${Question.question_type} ${Question.is_required ? 'required' : ''}">
                            <div class="Question-Title">
                                <label>${!Question.show_number ? Question.placement : ""}</label> ${!Question.show_number  ? ':' : ''}
                                <p>${Question.title} ${Question.is_required ? '*' : ''}</p>
                            </div>
                            <div class="description_block">
                                <p>${Question.question_text ? Question.question_text : ''}</p>
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
                    </div>
                    
        </div>
        `
        
}

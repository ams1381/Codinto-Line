import { detectFileFormat, showAlert } from "../../Question Design Pages/CommonActions.js";
import { answer_set_postData } from "../AnswerSetter.js";

export const answer_input_checker = (Question) => {
    switch(Question.question_type)
    {
        case 'text_answer':
            text_input_eventListener(Question);
            break;
        case 'integer_range':
            range_item_eventListener_setter(Question,document.querySelectorAll(`#Q${Question.id} .range__number`))
            break;
        case 'integer_selective':
            integer_selective_eventListener(Question)
            break;
        case 'file':
            file_event_listener(Question);
            break;
        case 'drop_down':
            slider_options_eventListener_setter(document.querySelector(`#Q${Question.id}`),document.querySelector(`#Q${Question.id} .slider_toggle_button`),
            document.querySelectorAll(`#Q${Question.id} .selection__item`))
            break;
        case 'number_answer':
            number_input_eventListener(Question)
            break;
        case 'link':
            link_input_eventListener(Question)
            break;
        case 'optional':
            multiple_answer_eventListener(Question)
            break;
        case 'email_field':
            email_input_eventListener(Question)
            break;
        case 'sort':
            sort_input_eventListener(Question)
            break;
        case 'group':
            if(Question.child_questions)
            {
                Question.child_questions.forEach((item) => {
                    answer_input_checker(item.question);
                })
            }
            break;
    }
}
const sort_input_eventListener = (Question) => {
    const preview_answer_options_container = document.querySelectorAll(`#Q${Question.id} .multiple_answer_block-options.nested`);
    const answer_options_drag = dragula(
        [...preview_answer_options_container], {
        direction : 'vertical',
        slideFactorX : 0,
        }
    )
    answer_options_drag.on('drag',() => {
        document.querySelector(`#Q${Question.id}`).classList.remove('error_occur');
    })
}
const number_input_eventListener = (Question) => {
    let number_answer_input = document.querySelector('#number_answer_input');
    if(number_answer_input)
        number_answer_input.addEventListener('input',() => {
            console.log('input test')
            if(Question.max && parseInt(number_answer_input.value) > Question.max)
            {
                showAlert(`حداکثر عدد ${Question.max} است`)
                return 'Error'
            }
            if(Question.min && parseInt(number_answer_input.value) < Question.min)
            {
                showAlert(`حداقل عدد ${Question.min} است`)
                return 'Error'
            }
            document.querySelector(`#Q${Question.id}`).classList.remove('error_occur');
        })
}
const text_input_eventListener = (Question) => {
    let text_answer_input = document.querySelector(`#Q${Question.id} #text_answer_input`);
    text_answer_input.setAttribute
        switch(Question.pattern)
        {
            case 'free':
                if(!Question.answer_template)
                    text_answer_input.setAttribute("placeholder","پاسخ به شکل متن آزاد")
                break;
            case 'jalali_date':
                if(!Question.answer_template)
                    text_answer_input.setAttribute("placeholder","لطفا پاسخ را به شکل تاریخ شمسی وارد کنید")
                break;
            case 'georgian_date':
                if(!Question.answer_template)
                    text_answer_input.setAttribute("placeholder","لطفا پاسخ را به شکل تاریخ میلادی وارد کنید")
                break;
            case 'phone__number':
                if(!Question.answer_template)
                    text_answer_input.setAttribute("placeholder","لطفا پاسخ را به شکل شماره تلفن موبایل وارد کنید")
                break;
            case 'number':
                if(!Question.answer_template)
                    text_answer_input.setAttribute("placeholder","لطفا پاسخ را به شکل عدد وارد کنید")
                break;
            case 'english':
            if(!Question.answer_template)
                text_answer_input.setAttribute("placeholder","لطفا پاسخ را به شکل حروف انگلیسی وارد کنید")
            break;
        }
        text_answer_input.addEventListener('input',() => {
            if(Question.pattern == 'free' && Question.max)
            {
                if(text_answer_input.value.length > Question.max)
                {
                    showAlert('تعداد حروف وارد شده از حداکثر بیشتر است')
                }
                if(text_answer_input.value.length < Question.min)
                {
                    showAlert('تعداد حروف وارد شده از حداقل کمتر است')
                }
            } 
            document.querySelector(`#Q${Question.id}`).classList.remove('error_occur');
        })
} 
const link_input_eventListener = (Question) => {
    let link_answer_input = document.querySelector(`#Q${Question.id} #link_answer_input`);
    link_answer_input.addEventListener('input',() => {
        document.querySelector(`#Q${Question.id}`).classList.remove('error_occur');
    })
}
const email_input_eventListener = (Question) => {
    let email_answer_input = document.querySelector(`#Q${Question.id} #email_answer_input`);
    email_answer_input.addEventListener('input',() => {
        document.querySelector(`#Q${Question.id}`).classList.remove('error_occur');
    })
}
export const file_event_listener = (Question) => {
    let file_input = document.querySelector(`#Q${Question.id} .inputUploader .box__file`);
    const preview_image_side = document.querySelector(`#Q${Question.id} .inputUploader .uploaded_file_image`);
    const preview_video_side = document.querySelector(`#Q${Question.id} .uploaded_file_video`)
    const file_input_container = document.querySelector(`#Q${Question.id} .inputUploader`);
    const preview_image_cancel_button = document.querySelector(`#Q${Question.id} .inputUploader .cancel_uploaded_file_button`)
    if(file_input)
    file_input.addEventListener('input',() => {
        if(file_input.files)
        {
            if(file_input.files[0].size > 30000000)
                {
                    document.querySelector(`#Q${Question.id}`).classList.add('error_occur');
                    showAlert('حجم فایل نمیتواند بیشتر از 30 مگابایت باشد')
                    return
                }
            file_preview_setter(URL.createObjectURL(file_input.files[0]),detectFileFormat(file_input.files[0].name)
            ,preview_image_side,preview_video_side,file_input_container)
        }
        document.querySelector(`#Q${Question.id}`).classList.remove('error_occur');
    })
    if(preview_image_cancel_button)
    preview_image_cancel_button.addEventListener('click',() => {
        document.querySelector(`#Q${Question.id}`).classList.remove('error_occur');
      file_input_container.classList.remove("uploaded");
        if(file_input)
            file_input.value = null;
            preview_image_side.removeAttribute("src");
            preview_video_side.removeAttribute("src");
         answer_set_postData.answers.forEach((item,index) => {
            if(item.question == Question.id)
                answer_set_postData.answers.splice(index,1);
         })
    })
}
export const file_preview_setter = (FileSrc,FileType,preview_image_side,preview_video_side,file_input_container) => {
    file_input_container.classList.add("uploaded");
    console.log(FileType)
    switch(FileType)
    {
        case 'Picture' :
            file_input_container.className =  'inputUploader uploaded image_uploaded';
            preview_image_side.src = FileSrc;  
            preview_video_side.removeAttribute("src");
            break;
        case 'Video':
            file_input_container.className = 'inputUploader uploaded video_uploaded';  
            preview_video_side.src = FileSrc;
            break;    
        case 'Zip':
            file_input_container.className =  'inputUploader uploaded zip_uploaded';
            preview_video_side.removeAttribute("src");
            break;
        case 'Audio':
            file_input_container.className =  'inputUploader uploaded audio_uploaded';
            preview_video_side.removeAttribute("src");
            break;
    }
}
const multiple_answer_eventListener = (Question) => {
   let answer_options = document.querySelectorAll(`#Q${Question.id} .multiple_answer_block-option label`);
   answer_options.forEach((answer_option) => {
    answer_option.addEventListener('click',() =>{
        document.querySelector(`#Q${Question.id}`).classList.remove('error_occur');
        console.log(answer_option.textContent)
       if(answer_option.textContent == 'هیچ کدام')
        {
            options_answer_inActive_setter("هیچ کدام")
        }
        if(answer_option.textContent == 'همه گزینه ها')
        {
            options_answer_inActive_setter("همه گزینه ها")
        }
        if(Question.max_selected_options > 1)
            selected_option_controller(Question.max_selected_options);
    })
   })
}
const options_answer_inActive_setter = (Text) => {
    let answer_options = document.querySelectorAll('.multiple_answer_block-option label');
    answer_options.forEach((answer_option) => {
        if(answer_option.textContent != Text)
            answer_option.previousElementSibling.checked = false;
    })
}
const selected_option_controller = (max_select_option) => {
    let answer_options = document.querySelectorAll('.multiple_answer_block-option input');
    let selected_options_input = document.querySelectorAll('.multiple_answer_block-option input:checked')
    let selected_number = 1;
    answer_options.forEach((option_input) => {
        if(option_input.checked)
            selected_number++;
        if(option_input.checked && option_input.nextElementSibling.textContent == 'هیچ کدام')
            option_input.checked = false;
            // options_answer_inActive_setter('هیچ کدام');
        if(option_input.checked && option_input.nextElementSibling.textContent == 'همه گزینه ها')
            option_input.checked = false;
            // options_answer_inActive_setter('همه گزینه ها');
    })
    if(selected_number > max_select_option)
        selected_options_input[0].checked = false;
}
const slider_options_eventListener_setter = (QuestionHTML,slider_button,slider_options) => {
    slider_button.addEventListener('click',() => {
        if(slider_button.classList.contains("up"))
        {
            $(slider_options).slideDown(100);
            slider_button.classList.remove("up");
        }
        else
        {
            $(slider_options).slideUp(10);
            slider_button.classList.add("up");
        }
    })
    slider_options.forEach((item) => {
        item.addEventListener('click',() => {
            QuestionHTML.classList.remove('error_occur')
            setActive_slide_item(item,slider_options);
            $(slider_options).not(".slide_selected").slideUp(10);
            slider_button.classList.add("up");
            if(item.firstElementChild.checked)
                console.log(item)
        })
        
    })
    const setActive_slide_item = (slide_option,slide_options) => {
        if(slide_option.classList.contains("slide_selected"))
            return;
        slide_options.forEach((item) => {
            item.classList.remove('slide_selected');
        })
        slide_option.classList.add("slide_selected")
    }
}
const range_item_eventListener_setter = (Question,range_select_options) => {
    range_select_options.forEach((range_select_option) => {
        range_select_option.addEventListener('click', () => {
            document.querySelector(`#Q${Question.id}`).classList.remove('error_occur');
            setActive_range_item(range_select_option,range_select_options)
        })
    });
    const setActive_range_item = (slide_option,slide_options) => {
        if(slide_option.classList.contains("range__active"))
            return;
            range_select_options.forEach((item) => {
            item.classList.remove('range__active');
        })
        slide_option.classList.add("range__active")
    }
}
const integer_selective_eventListener = (Question) => {
    document.querySelectorAll('.degree_answer_block-option label').forEach((item) => {
        item.addEventListener('click',() => {
            document.querySelector(`#Q${Question.id}`).classList.remove('error_occur');
        })
    })
}

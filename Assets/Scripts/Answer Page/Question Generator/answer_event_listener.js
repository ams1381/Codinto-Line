import { detectFileFormat, file_src_setter, showAlert } from "../../Question Design Pages/CommonActions.js";
import { answer_set_postData } from "../AnswerSetter.js";


export const answer_input_checker = (Question) => {
    switch(Question.question_type)
    {
        case 'text_answer':
            // text_answer_loader(answer_object.answer.text_answer);
            text_input_eventListener(Question);
            break;
        case 'integer_range':
            // range_answer_loader(answer_object.answer.integer_range);
            break;
        case 'integer_selective':
            // selective_degree_answer_loader(answer_object.answer.integer_selective);
            break;
        case 'file':
            file_event_listener(Question);
            break;
        case 'drop_down':
            // drop_down_answer_loader(answer_object.answer.selected_options[0])
            break;
        case 'number_answer':
            number_input_eventListener(Question)
            // number_answer_loader(answer_object.answer.number_answer);
            break;
        case 'link':
            // link_question_loader(answer_object.answer.link);
            break;
        case 'optional':
            multiple_answer_eventListener(Question)
            // multiple_answer_loader(answer_object.answer.selected_options);
            break;
        case 'email_field':
            // email_answer_loader(answer_object.answer.email_field);
            break;
    // case 'group':
    //     return window.open("/Pages/groupQuestion.html","_Self");
    //     break;
    // case 'Sort':
    //     return window.open("/Pages/Priority.html","_Self");
    //     break;
    }
}
const number_input_eventListener = (Question) => {
    let number_answer_input = document.querySelector('#number_answer_input');
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
      })
}
const text_input_eventListener = (Question) => {
    let text_answer_input = document.querySelector('#text_answer_input');
    text_answer_input.setAttribute
    // text_answer_input.addEventListener('input',() => {
    //     console.log(Question.pattern)
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
            file_preview_setter(URL.createObjectURL(file_input.files[0]),detectFileFormat(file_input.files[0].name)
            ,preview_image_side,preview_video_side,file_input_container)
        }
        answer_set_postData.answers.push({
            "question": parseInt(Question.id),
            "answer" : null,
            "file" : file_input.files[0]
        })
    })
    if(preview_image_cancel_button)
    preview_image_cancel_button.addEventListener('click',() => {
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
   
    // 
}
export const file_preview_setter = (FileSrc,FileType,preview_image_side,preview_video_side,file_input_container) => {
    file_input_container.classList.add("uploaded");

    switch(FileType)
    {
        case 'Picture' :
            console.log('this is for test')
            file_input_container.classList.add("image_uploaded"); 
            file_input_container.classList.remove("video_uploaded");  
            preview_image_side.src = FileSrc;  
            preview_video_side.removeAttribute("src");
            break;
        case 'Video':
            file_input_container.classList.add("video_uploaded");  
            file_input_container.classList.remove("image_uploaded");  
            preview_video_side.src = FileSrc;
            break;         
    }
}
const multiple_answer_eventListener = (Question) => {
   let answer_options = document.querySelectorAll('.multiple_answer_block-option label');
   answer_options.forEach((answer_option) => {
    answer_option.addEventListener('click',() =>{
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
const  options_answer_inActive_setter = (Text) => {
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
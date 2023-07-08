import { detectFileFormat, file_src_setter } from "../../Question Design Pages/CommonActions.js";
import { answer_set_postData } from "../AnswerSetter.js";


export const answer_input_checker = (Question) => {
    switch(Question.question_type)
    {
        case 'text_answer':
            // text_answer_loader(answer_object.answer.text_answer);
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
            // number_answer_loader(answer_object.answer.number_answer);
            break;
        case 'link':
            // link_question_loader(answer_object.answer.link);
            break;
        case 'optional':
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
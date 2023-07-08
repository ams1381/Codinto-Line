import { detectFileFormat } from "../Question Design Pages/CommonActions.js";
import { file_event_listener } from "./Question Generator/answer_event_listener.js";

export const answer_loader = (QuestionData,Question,answer_set_postData) => {
    answer_set_postData.answers.forEach((answer_object) => {
        if(answer_object.question == parseInt(Question.getAttribute("id").split("Q")[1]))
            {
                switch([...Question.classList][1])
                {
                    case 'text_answer':
                        text_answer_loader(answer_object.answer.text_answer);
                        break;
                    case 'integer_range':
                        range_answer_loader(answer_object.answer.integer_range);
                        break;
                    case 'integer_selective':
                        selective_degree_answer_loader(answer_object.answer.integer_selective);
                        break;
                    case 'file':
                        file_answer_loader(QuestionData,answer_object.file);
                        break;
                    case 'drop_down':
                        drop_down_answer_loader(answer_object.answer.selected_options[0])
                        break;
                    case 'number_answer':
                        number_answer_loader(answer_object.answer.number_answer);
                        break;
                    case 'link':
                        link_question_loader(answer_object.answer.link);
                        break;
                    case 'optional':
                        multiple_answer_loader(answer_object.answer.selected_options);
                        break;
                    case 'email_field':
                        email_answer_loader(answer_object.answer.email_field);
                        break;
                // case 'group':
                //     return window.open("/Pages/groupQuestion.html","_Self");
                //     break;
                // case 'Sort':
                //     return window.open("/Pages/Priority.html","_Self");
                //     break;
                }
            }
           
        })
}
const text_answer_loader = (Answer_to_load) => {
    let text_answer_input = document.querySelector('#text_answer_input');
    text_answer_input.value = Answer_to_load;
}
const range_answer_loader = (Answer_to_load) => {
    let selected_range_item_input = document.querySelector(`.range__number  #range_input_n${Answer_to_load}`);
    if(selected_range_item_input)
    {
        selected_range_item_input.checked = true;
        selected_range_item_input.parentElement.classList.add('range__active');
    } 
}
const selective_degree_answer_loader = (Answer_to_load) => {
  let selected_degree_option = document.querySelector(`.degree_answer_block-option #answer-n${Answer_to_load}`);
  console.log(selected_degree_option)
  if(selected_degree_option)
    selected_degree_option.checked = true;
}
const drop_down_answer_loader = (Answer_to_load) => {
    let selected_drop_down_option = document.querySelector(`.selection__item #select_item_input_${Answer_to_load}`);
    if(selected_drop_down_option)
    {
           selected_drop_down_option.checked = true;
    selected_drop_down_option.classList('slide_selected'); 
    }
}
const number_answer_loader = (Answer_to_load) => {
    console.log('number question',Answer_to_load)
    let number_answer_input = document.querySelector('#number_answer_input');
    number_answer_input.value = Answer_to_load;
}
const link_question_loader = (Answer_to_load) => {
    let link_answer_input = document.querySelector('#link_answer_input');
    link_answer_input.value = Answer_to_load;
}
const email_answer_loader = (Answer_to_load) => {
    let email_answer_input = document.querySelector('#email_answer_input');
    email_answer_input.value = Answer_to_load;
}
const multiple_answer_loader = (Answer_to_load) => {
    let selected_drop_down_option = document.querySelector(`.multiple_answer_block-option #answer-n${Answer_to_load}`);
    console.log(Answer_to_load)
    if(selected_drop_down_option)
        selected_drop_down_option.checked = true;
}
const file_answer_loader = async (QuestionData,Answer_to_load) => {
    if(Answer_to_load)
    {
        // file_preview_setter(await generateFileSrc(Answer_to_load),detectFileFormat(Answer_to_load.name),
        // document.querySelector(`#Q${QuestionData.question.id} .inputUploader .uploaded_file_image`),
        // document.querySelector(`#Q${QuestionData.question.id} .uploaded_file_video`) ,
        // document.querySelector(`#Q${QuestionData.question.id} .inputUploader`)
        // )
        console.log(document.querySelector(`#Q${QuestionData.question.id}`))
        console.log(document.querySelector(`#Q${QuestionData.question.id} .inputUploader .uploaded_file_image`),
        document.querySelector(`#Q${QuestionData.question.id} .uploaded_file_video`) ,
        document.querySelector(`#Q${QuestionData.question.id} .inputUploader`))
        // file_input.files[0] = Answer_to_load;
    }
}
const  generateFileSrc = (file) => 
{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Error reading file.'));
      
      reader.readAsDataURL(file);
    });
}
const file_preview_setter = (FileSrc,FileType,preview_image_side,preview_video_side,file_input_container) => {
    // if(!file_input_container)
    //     return
    console.log(preview_image_side)
    console.log('testsdgsdgasdg')
    if(file_input_container)
        file_input_container.classList.add("uploaded");

    switch(FileType)
    {
        case 'Picture' :
            if(file_input_container)
            {
                file_input_container.classList.add("image_uploaded"); 
                file_input_container.classList.remove("video_uploaded");  
            }
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
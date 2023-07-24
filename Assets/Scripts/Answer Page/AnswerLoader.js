import { detectFileFormat } from "../Question Design Pages/CommonActions.js";
import { file_event_listener, file_preview_setter } from "./Question Generator/answer_event_listener.js";

export const answer_loader = (QuestionData,Question,answer_set_postData) => {
    
    answer_set_postData.answers.forEach((answer_object) => {
        if(!Question.getAttribute("id"))
            return
        if(answer_object.question == parseInt(Question.getAttribute("id").split("Q")[1]))
            {   
                if(!answer_object.answer)
                {
                    answer_object.file ? file_answer_loader(QuestionData,answer_object.file) : ''
                    return;
                }
                switch([...Question.classList][1])
                {
                    case 'text_answer':
                        text_answer_loader(QuestionData,answer_object.answer.text_answer);
                        break;
                    case 'integer_range':
                        range_answer_loader(QuestionData,answer_object.answer.integer_range);
                        break;
                    case 'integer_selective':
                        selective_degree_answer_loader(QuestionData,answer_object.answer.integer_selective);
                        break;
                    case 'drop_down':
                        drop_down_answer_loader(QuestionData,answer_object.answer.selected_options[0])
                        break;
                    case 'number_answer':
                        number_answer_loader(answer_object.answer.number_answer);
                        break;
                    case 'link':
                        link_question_loader(answer_object.answer.link);
                        break;
                    case 'optional':
                        multiple_answer_loader(QuestionData,answer_object.answer.selected_options);
                        break;
                    case 'email_field':
                        email_answer_loader(answer_object.answer.email_field);
                        break;
                    case 'sort':
                        sort_answer_loader(QuestionData,answer_object.answer.sorted_options)
                        break;
                }
            }
        else 
        {
            if(QuestionData.question.child_questions)
            {
                QuestionData.question.child_questions.forEach((item) => {
                    answer_loader(item,document.querySelector(`#Q${item.question.id}`),answer_set_postData)
                })
            }
        }
        })
}
const text_answer_loader = (QuestionData,Answer_to_load) => {
    let text_answer_input = document.querySelector(`#Q${QuestionData.question.id} #text_answer_input`);
    text_answer_input.value = Answer_to_load;
}
const range_answer_loader = (QuestionData,Answer_to_load) => {
    let selected_range_item_input = document.querySelector(`#Q${QuestionData.question.id} .range__number  #range_input_n${Answer_to_load}`);
    if(selected_range_item_input)
    {
        selected_range_item_input.checked = true;
        selected_range_item_input.parentElement.classList.add('range__active');
    } 
}
const selective_degree_answer_loader = (QuestionData,Answer_to_load) => {
  let selected_degree_option = document.querySelector(`#Q${QuestionData.question.id} .degree_answer_block-option #answer-n${Answer_to_load}`);
  let preview_degree_inputs = document.querySelectorAll(`#Q${QuestionData.question.id} .degree_answer_block-option input`);
  if(selected_degree_option)
  {
    selected_degree_option.classList.add('selected_answer');
    selected_degree_option.checked = true;
  }
  preview_degree_inputs.forEach((item,index) => {
    if(preview_degree_inputs.length - index <= preview_degree_inputs.length - Answer_to_load)
        item.checked = true;
    })
}
const drop_down_answer_loader = (QuestionData,Answer_to_load) => {
   
    let selected_drop_down_option;
    if(QuestionData.question)
        selected_drop_down_option = document.querySelector(`#Q${QuestionData.question.id}  .selection__item #select_item_input_${Answer_to_load.id}`);
    else
        selected_drop_down_option = document.querySelector(`#Q${QuestionData.id}  .selection__item #select_item_input_${Answer_to_load.id}`);
    let slider_button = document.querySelector(`#Q${QuestionData.question.id}  .slider_toggle_button`)
    let slider_option = document.querySelector(`#select_item_${Answer_to_load.id}`);
    let slider_options = document.querySelectorAll('.selection__item');
    if(selected_drop_down_option)
    {
        selected_drop_down_option.checked = true;
        selected_drop_down_option.classList.add('slide_selected'); 
        slider_button.classList.add("up");
    }
    slider_option.classList.add('slide_selected')
    $(slider_options).not(".slide_selected").slideUp(10);
}
const number_answer_loader = (Answer_to_load) => {
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
const multiple_answer_loader = (QuestionData,Answer_to_load) => {
    if(Array.isArray(Answer_to_load))
        Answer_to_load.forEach((loaded_option) => {
            document.querySelector(`#Q${QuestionData.question.id} .multiple_answer_block-option #answer-n${loaded_option.id}`).checked = true;
        })
    else
    {
        document.querySelector(`#Q${QuestionData.question.id} .multiple_answer_block-option #answer-n${Answer_to_load.id}`).checked = true;
    }
}
const file_answer_loader = async (QuestionData,Answer_to_load) => {
    let file_input = document.querySelector(`#Q${QuestionData.question.id} input`);
    if(Answer_to_load)
    {
        file_answer_preview_loader(Answer_to_load,detectFileFormat(Answer_to_load),
        document.querySelector(`#Q${QuestionData.question.id} .uploaded_file_video`) ,
        document.querySelector(`#Q${QuestionData.question.id} .inputUploader .uploaded_file_image`),
        document.querySelector(`#Q${QuestionData.question.id} .inputUploader`))
    }
}
const file_answer_preview_loader = (FileSrc,FileType,preview_video_side,preview_image_side,file_input_container) => {
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
        default : 
            file_input_container.className =  'inputUploader uploaded file_uploaded';
            preview_video_side.removeAttribute("src");
            break;
    }
}
const sort_answer_loader = (QuestionData,Answer_to_load) => {
    
    let sort_items = [];
    let sorted_items_for_load = '';
    document.querySelectorAll('.multiple_answer_block-option').forEach((item) => {
        item.remove();
    })
    Answer_to_load.forEach((sort_answer_item) => {
        let option_to_load;
        QuestionData.question.options.forEach((option) => {
            if(option.id == sort_answer_item.id)
                option_to_load = option;
        })
        sorted_items_for_load += `
        <div class="multiple_answer_block-option">
            <input type="radio" class="answer_option_input" name="answer__option" id="answer-n${option_to_load.id}">
            <label class="answer_option-label" for="answer-n${option_to_load.id}">${option_to_load.text}</label>
    </div>
        `
    })
    document.querySelector('.multiple_answer_block-options').innerHTML = sorted_items_for_load;
}
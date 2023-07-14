import { detectFileFormat } from "../Question Design Pages/CommonActions.js";
import { file_event_listener } from "./Question Generator/answer_event_listener.js";

export const answer_loader = (QuestionData,Question,answer_set_postData) => {
    answer_set_postData.answers.forEach((answer_object) => {
        
        if(answer_object.question == parseInt(Question.getAttribute("id").split("Q")[1]))
            {
                switch([...Question.classList][1])
                {
                    case 'text_answer':
                        text_answer_loader(QuestionData,answer_object.answer.text_answer);
                        break;
                    case 'integer_range':
                        range_answer_loader(QuestionData,answer_object.answer.integer_range);
                        break;
                    case 'integer_selective':
                        selective_degree_answer_loader(answer_object.answer.integer_selective);
                        break;
                    case 'file':
                        file_answer_loader(QuestionData,answer_object.file);
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
                    case 'group':          
                        if(QuestionData.question.child_questions)
                        {
                            QuestionData.question.child_questions.forEach((item) => {
                                answer_loader(item,document.querySelector(`#Q${item.question.id}`),answer_set_postData)
                            })
                        }
                        break;
                    case 'sort':
                        sort_answer_loader(QuestionData,answer_object.answer.sorted_options)
                        break;
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
const selective_degree_answer_loader = (Answer_to_load) => {
  let selected_degree_option = document.querySelector(`.degree_answer_block-option #answer-n${Answer_to_load}`);
  console.log(selected_degree_option)
  if(selected_degree_option)
    selected_degree_option.checked = true;
}
const drop_down_answer_loader = (QuestionData,Answer_to_load) => {
    let selected_drop_down_option;
    if(QuestionData.question)
        selected_drop_down_option = document.querySelector(`#Q${QuestionData.question.id}  .selection__item #select_item_input_${Answer_to_load}`);
    else
        selected_drop_down_option = document.querySelector(`#Q${QuestionData.id}  .selection__item #select_item_input_${Answer_to_load}`);
    let slider_button = document.querySelector(`#Q${QuestionData.question.id}  .slider_toggle_button`)
    let slider_options = document.querySelectorAll(`#Q${QuestionData.question.id} .selection__item`);
    if(selected_drop_down_option)
    {
        selected_drop_down_option.checked = true;
        selected_drop_down_option.classList.add('slide_selected'); 
        slider_button.classList.add("up");
    }
    slider_options.forEach((item) => {
        if(item.getAttribute('id').split('select_item_')[1] == Answer_to_load)
            item.classList.add('slide_selected');
    })
    $(slider_options).not(".slide_selected").slideUp(10);
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
const multiple_answer_loader = (QuestionData,Answer_to_load) => {
    console.log(Answer_to_load)
    if(Array.isArray(Answer_to_load))
        Answer_to_load.forEach((loaded_option) => {
            document.querySelector(`#Q${QuestionData.question.id} .multiple_answer_block-option #answer-n${loaded_option}`).checked = true;
        })
    else
    {
        document.querySelector(`#Q${QuestionData.question.id} .multiple_answer_block-option #answer-n${Answer_to_load}`).checked = true;
    }
}
const file_answer_loader = async (QuestionData,Answer_to_load) => {
    console.log(QuestionData , Answer_to_load)
    // if(Answer_to_load)
    // {
    //     // file_preview_setter(await generateFileSrc(Answer_to_load),detectFileFormat(Answer_to_load.name),
    //     // document.querySelector(`#Q${QuestionData.question.id} .inputUploader .uploaded_file_image`),
    //     // document.querySelector(`#Q${QuestionData.question.id} .uploaded_file_video`) ,
    //     // document.querySelector(`#Q${QuestionData.question.id} .inputUploader`)
    //     // )
    //     console.log(document.querySelector(`#Q${QuestionData.question.id}`))
    //     console.log(document.querySelector(`#Q${QuestionData.question.id} .inputUploader .uploaded_file_image`),
    //     document.querySelector(`#Q${QuestionData.question.id} .uploaded_file_video`) ,
    //     document.querySelector(`#Q${QuestionData.question.id} .inputUploader`))
    //     // file_input.files[0] = Answer_to_load;
    // }
}
const generateFileSrc = (file) => 
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
import { postRequest , baseUrl } from "../ajax/ajaxRequsts.js";
import { showAlert , form_data_convertor } from "../Question Design Pages/CommonActions.js";
export const answer_set_postData = {
    'answers' : []
}
export const answer_set_poster = async (questionnaireUUID) =>{
    console.log(answer_set_postData)
    try 
    {
       return await postRequest(`${baseUrl}/question-api/questionnaires/${questionnaireUUID}/answer-sets/`,answer_set_postData);
    }
    catch(err)
    {
        console.log(err)
        if(err.code = 'ERR_BAD_REQUEST')
            showAlert('لطفا سوالات اجباری را پاسخ دهید')
        throw(err)
    }

}
export const total_answer_set_handler = (Questions) => {
    Questions.forEach((Question) => {
        single_answer_setter(Question,[...Question.classList].indexOf("required") != -1);
    })
}
export const single_answer_setter = (Question,required) => {
    
    switch([...Question.classList][1])
    {
            case 'text_answer':
                return text_answer_setter(Question,required);
                break;
            case 'integer_range':
                return range_answer_setter(Question,required);
                break;
            case 'integer_selective':
                return selective_degree_answer_setter(Question,required);
                break;
            case 'file':
                return file_answer_setter(Question,required);
                break;
            case 'drop_down':
                return drop_down_answer_setter(Question,required);
                break;
            case 'number_answer':
                return number_answer_setter(Question,required);
                break;
            case 'link':
                return link_question_setter(Question,required);
                break;
            case 'optional':
                return multiple_answer_setter(Question,required);
                break;
            case 'email_field':
                return email_answer_setter(Question,required);
                break;
            // case 'group':
            //     return window.open("/Pages/groupQuestion.html","_Self");
            //     break;
            // case 'Sort':
            //     return window.open("/Pages/Priority.html","_Self");
            //     break;
    }
}
const file_answer_setter = (Question,required) => {
    let file_input = document.querySelector('#uploadInput');
    if(file_input.files.length == 0 && required)
    {
        return 'Error';
    }
    else if(file_input.files.length)
        answer_set_postData.answers.push({
            "question": parseInt(Question.getAttribute("id")),
            "answer" : null,
            "file" : file_input.files[0]
        })
}
const text_answer_setter = (Question,required) => {
    let text_answer_input = document.querySelector('#text_answer_input');
    
    if(text_answer_input.value.split("").length == 0 && required)
    {
        return 'Error';
    }
    else
    {
        answer_set_postData.answers.push({
            "question": parseInt(Question.getAttribute("id")),
            "answer" : {
                'text_answer' : text_answer_input.value
            }
        })
    }
}
const range_answer_setter = (Question,required) => {
    
    let selected_range_item_label = document.querySelector(".range__number.range__active label");
    if(!selected_range_item_label && required)
    {
        return 'Error';
    }
   else if(selected_range_item_label)
   {
       answer_set_postData.answers.push({
        "question": parseInt(Question.getAttribute("id")),
        "answer" : {
            'integer_range' : parseInt(selected_range_item_label.textContent)
        }
    })
   }
}
const multiple_answer_setter = (Question,required) => {
    let selected_drop_down_option = document.querySelector('.selection__item.slide_selected label');
    if(!selected_drop_down_option && required)
    {;
        return 'Error';
    }
    else if(selected_drop_down_option)
    {
        answer_set_postData.answers.push({
            "question": parseInt(Question.getAttribute("id")),
            "answer" : {
                'selected_options' : [parseInt(selected_drop_down_option.textContent)]
            }
        })
    }
}
const email_answer_setter = (Question,required) => {
    let email_answer_input = document.querySelector('#email_answer_input');
    if(!email_answer_input.value && required)
    {
        return 'Error';
    }
    else
    {
        answer_set_postData.answers.push({
            "question": parseInt(Question.getAttribute("id")),
            "answer" : {
                'email_field' : email_answer_input.value
            }
        })
    }
}
const link_question_setter = (Question,required) => {
    let link_answer_input = document.querySelector('#link_answer_input');
    if(!link_answer_input.value && required)
    {
        return 'Error';
    }
    else if(link_answer_input.value)
    {
        answer_set_postData.answers.push({
            "question": parseInt(Question.getAttribute("id")),
            "answer" : {
                'link' : link_answer_input.value
            }
        })
    }
}
const number_answer_setter = (Question,required) => {
    let number_answer_input = document.querySelector('#number_answer_input');
    if(!number_answer_input.value && required)
      {
        return 'Error';
      }
    else
    {
        answer_set_postData.answers.push({
            "question": parseInt(Question.getAttribute("id")),
            "answer" : {
                'number_answer' : number_answer_input.value
            }
        })
    }
}
const drop_down_answer_setter = (Question,required) => {
    let selected_drop_down_option = document.querySelector('.selection__item.slide_selected label');
    if(!selected_drop_down_option && required)
    {;
        return 'Error';
    }
    else if(selected_drop_down_option)
    {
        answer_set_postData.answers.push({
            "question": parseInt(Question.getAttribute("id")),
            "answer" : {
                'selected_options' : [parseInt(selected_drop_down_option.textContent)]
            }
        })
    }
}
const selective_degree_answer_setter = (Question,required) => {
    let selected_degree_option = document.querySelector(".degree_answer_block-option input:checked");
    if(!selected_degree_option && required)
    {;
        return 'Error';
    }
    else if(selected_degree_option)
    {
        answer_set_postData.answers.push({
            "question": parseInt(Question.getAttribute("id")),
            "answer" : {
                'integer_selective' : parseInt(selected_degree_option.getAttribute("id").split('answer-n')[1])
            }
        })
    }
}

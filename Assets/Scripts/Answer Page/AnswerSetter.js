import { postRequest , baseUrl } from "../ajax/ajaxRequsts.js";
import { showAlert , form_data_convertor , detectFileFormat , file_src_setter } from "../Question Design Pages/CommonActions.js";
export const answer_set_postData = {
    'answers' : []
}
export const answer_set_poster = async (questionnaireUUID) =>{
    let request_header = 'application/json';
    console.log([...objectToFormData(answer_set_postData)])
    try 
    {
        answer_set_postData.answers.forEach((item) => {
            if(item.file)
                request_header = 'multipart/form-data';
        })
       return await postRequest(`${baseUrl}/question-api/questionnaires/${questionnaireUUID}/answer-sets/`,request_header,answer_set_postData);
    }
    catch(err)
    {
        console.log(err)
        if(err.code = 'ERR_BAD_REQUEST')
            showAlert('لطفا سوالات اجباری را پاسخ دهید')
        throw(err)
    }

}
const objectToFormData = (obj) => {
    const formData = new FormData();
  
    // for (let key in obj) {
    //   if (obj.hasOwnProperty(key)) {
    //       key.forEach((keyItem,index) => {
    //         console.log(keyItem)
    //       })
    //     // formData.append(key, obj[key]);
    //   }
    // }
    return formData;
  }

export const total_answer_set_handler = (QuestionsData,Questions) => {
    Questions.forEach((Question,index) => {
        single_answer_setter(QuestionsData[index],Question,[...Question.classList].indexOf("required") != -1);
    })
}
export const single_answer_setter = (QuestionData,Question,required) => {
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
                return number_answer_setter(QuestionData,Question,required);
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
    let file_input = document.querySelector('.inputUploader .box__file');
    if(file_input.files.length == 0 && required)
    {
        return 'Error';
    }   
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
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
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
        "question": parseInt(Question.getAttribute("id").split("Q")[1]),
        "answer" : {
            'integer_range' : parseInt(selected_range_item_label.textContent)
        }
    })
   }
}
const multiple_answer_setter = (Question,required) => {
    let selected_option = [];
    document.querySelectorAll('.multiple_answer_block-option input').forEach((item,index) => {
        if(item.checked)
            selected_option.push(parseInt(item.getAttribute("id").split("answer-n")[1]));
    })
    if(!selected_option && required)
    {
        return 'Error';
    }
    else if(selected_option)
    {
        answer_set_postData.answers.push({
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : {
                'selected_options' : selected_option.length == 1 ? selected_option[0] : selected_option
            }
        })
    }
    console.log(answer_set_postData)
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
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
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
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : {
                'link' : link_answer_input.value
            }
        })
    }
}
const number_answer_setter = (QuestionData,QuestionContainer,required) => {

    let number_answer_input = document.querySelector('#number_answer_input');
    if(!number_answer_input.value && required)
      {
        return 'Error';
      }
      
        answer_set_postData.answers.push({
            "question": parseInt(QuestionContainer.getAttribute("id").split("Q")[1]),
            "answer" : {
                'number_answer' : number_answer_input.value
            }
        })
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
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
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
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : {
                'integer_selective' : parseInt(selected_degree_option.getAttribute("id").split('answer-n')[1])
            }
        })
    }
}

import { postRequest , baseUrl } from "../ajax/ajaxRequsts.js";
import { showAlert , form_data_convertor , detectFileFormat , file_src_setter } from "../Question Design Pages/CommonActions.js";
export const answer_set_postData = {
    'answers' : []
}
export let error_occur = false;
const single_answer_poster = async (questionnaireUUID,AnswerSetID,DataToPost) => {
    try
    {
       await postRequest(`${baseUrl}/question-api/questionnaires/${questionnaireUUID}/answer-sets/${AnswerSetID}/add-answer/`,'application/json',DataToPost);
    }
   catch(err)
   {
        throw err;
   }
}
const file_answer_poster = async (questionnaireUUID,AnswerSetID,DataToPost) => {
    const formData = new FormData();
  
    for (let key_number in DataToPost[0])
        formData.append(key_number,DataToPost[0][key_number] !== null ? DataToPost[0][key_number] : 'null')
      
    try
    {
        await postRequest(`${baseUrl}/question-api/questionnaires/${questionnaireUUID}/answer-sets/${AnswerSetID}/add-answer/`,'multipart/form-data',formData);
    }
    catch(err)
    {
        throw err;
    }
}

export const total_answer_set_handler = async (Questionnaire,AnswerSetID,Questions) =>
{
    const asyncForEach = async (array) => {
        try {
          for (let i = 0; i < array.length; i++) {
           console.log(await single_answer_setter(Questionnaire.uuid,AnswerSetID,Questionnaire.questions[i].question,Questions[i]))
          }
        }
        catch (ex) {
           throw ex;
        }
      }
    await asyncForEach(Questions);
}
export const single_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,QuestionHTML) => {
    console.log([...QuestionHTML.classList][1])
    try 
    {
      switch([...QuestionHTML.classList][1])
        {
                case 'text_answer':
                    await text_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required);
                    break;
                case 'integer_range':
                    await range_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required);
                    break;
                case 'integer_selective':
                    await  selective_degree_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required);
                    break;
                case 'file':
                    await file_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required);
                    break;
                case 'drop_down':
                    await drop_down_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required);
                    break;
                case 'number_answer':
                    await  number_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required);
                    break;
                case 'link':
                    await  link_question_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required);
                    break;
                case 'optional':
                await  multiple_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required);
                    break;
                case 'email_field':
                    await  email_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required);
                    break;
                case 'group':
                    if(Question.child_questions)
                    {
                        Question.child_questions.forEach(async (item) => {
                            await single_answer_setter(Questionnaireuuid,AnswerSetID,item.question,document.querySelector(`#Q${item.question.id}`))
                        })
                    }
                case 'sort':
                    await  sort_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required);
                    break;
        }
    }
    catch(error)
    {
        throw error;
    }
}
const file_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required) => {
    let file_input = document.querySelector('.inputUploader .box__file');
    if(file_input.files.length == 0)
    {
        showAlert('سوالا اجباری را پاسخ دهید')
        Question.classList.add('error_occur');
        error_occur = true;
        return 'Error';
    }
    else
    {
        let answer_object = [
            {
                "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                'file' : file_input.files[0]
            }
            ]
    await file_answer_poster(Questionnaireuuid,AnswerSetID,answer_object)
    }
    
}    
const text_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required) => {
    let answer_object
    let text_answer_input = document.querySelector('#text_answer_input');
    if(text_answer_input.value.length == 0 && required)
    {
        showAlert('سوالا اجباری را پاسخ دهید');
        Question.classList.add('error_occur');
        error_occur = true;
        return 'Error';
    }
    else
    {
        if(text_answer_input.value.length == 0)
            answer_object = []
        else
            answer_object = [
                {
                    "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                    "answer" : {
                        'text_answer' : text_answer_input.value
                    }
                }
            ]
        await single_answer_poster(Questionnaireuuid,AnswerSetID,answer_object)
    }
        
}
const range_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required) => {
    let answer_object;
    let selected_range_item_label = document.querySelector(".range__number.range__active label");

    if(!selected_range_item_label && required)
    {
        showAlert('سوالا اجباری را پاسخ دهید')
        Question.classList.add('error_occur');
        error_occur = true;
        return 'Error';
    }
    else 
    {
        
        answer_object = [
       {
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : {
                'integer_range' : parseInt(selected_range_item_label.textContent)
            }}
        ]
        await single_answer_poster(Questionnaireuuid,AnswerSetID,answer_object)
    }
     
}
const multiple_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required) => {
    let selected_option = [];
    let answer_object;
    document.querySelectorAll(`#${Question.getAttribute("id")} .multiple_answer_block-option input`).forEach((item,index) => {
        if(item.checked)
            selected_option.push(parseInt(item.getAttribute("id").split("answer-n")[1]));
    })
    if(selected_option.length == 0 && required)
    {
        showAlert('سوالا اجباری را پاسخ دهید')
        Question.classList.add('error_occur');
        error_occur = true;
        return 'Error';
    }
    else
    {
        
        if(selected_option.length == 0)
            answer_object = []
        else
        answer_object = [
            {
                "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                "answer" : {
                    'selected_options' : selected_option.length == 1 ? [parseInt(selected_option[0])] : selected_option
                }
            }
    ]
    await single_answer_poster(Questionnaireuuid,AnswerSetID,answer_object)
    }
        
}
const email_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required) => {
    let answer_object
    let email_answer_input = document.querySelector('#email_answer_input');
    if(email_answer_input.value.split("").length == 0 && required)
    {
        showAlert('سوالا اجباری را پاسخ دهید')
        Question.classList.add('error_occur');
        error_occur = true;
        return 'Error';
    }
    else
    {
        
        answer_object = [
            {
                "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                "answer" : {
                    'email_field' : email_answer_input.value
                }
            }
        ]
        await single_answer_poster(Questionnaireuuid,AnswerSetID,answer_object)
    }
   
}
const link_question_setter = async (Questionnaireuuid,AnswerSetID,Question,required) => {
    let link_answer_input = document.querySelector(`#${Question.getAttribute("id")} #link_answer_input`);
    let answer_object;
    if((link_answer_input.value.split("").length == 0) && required)
    { 
        showAlert('سوالا اجباری را پاسخ دهید')
        Question.classList.add('error_occur');
        error_occur = true;
        return 'Error';
    }
    else
    {
        
        if(link_answer_input.value.split("").length == 0)
          answer_object = []
        else
            answer_object = [
            {
                "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                "answer" : {
                    'link' : link_answer_input.value
                }
            }
        ]
    await single_answer_poster(Questionnaireuuid,AnswerSetID,answer_object)   
    }
   
}
const number_answer_setter = async (Questionnaireuuid,AnswerSetID,QuestionContainer,required) => {
    let answer_object;
    let number_answer_input = document.querySelector(`#${QuestionContainer.getAttribute("id")} #number_answer_input`);
    if(number_answer_input.value.split("").length == 0 && required)
    {
        showAlert('سوالا اجباری را پاسخ دهید');
        Question.classList.add('error_occur');
        error_occur = true;
        return 'Error';
    }
    else
    {
        
        if(number_answer_input.value.split("").length == 0)
            answer_object = []
        else
            answer_object = [
                {
                    "question": parseInt(QuestionContainer.getAttribute("id").split("Q")[1]),
                    "answer" : {
                        'number_answer' : parseInt(number_answer_input.value)
                    }
                }
                ]
        await single_answer_poster(Questionnaireuuid,AnswerSetID,answer_object)
    }
}
const drop_down_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required) => {
    let selected_drop_down_option = document.querySelector(`#${Question.getAttribute("id")} .selection__item.slide_selected label`);
    let answer_object;
    if(!selected_drop_down_option && required)
    {
        console.log('tedsfsd')
        showAlert('سوالا اجباری را پاسخ دهید')
        Question.classList.add('error_occur');
        error_occur = true;
        return 'Error';
    }
    else
    {
        
        if(selected_drop_down_option)
            answer_object = [
                {
                    "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                    "answer" : {
                        'selected_options' : [
                            parseInt(selected_drop_down_option.previousElementSibling.getAttribute('id').split('select_item_input_')[1])
                        ]
                    }
                }
                ]
        else
            answer_object = []
        await single_answer_poster(Questionnaireuuid,AnswerSetID,answer_object);
    }
        
}
const selective_degree_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required) => {
    let answer_object;
    let selected_degree_option = document.querySelector(`#${Question.getAttribute("id")} .degree_answer_block-option input:checked`);
    if(!selected_degree_option && required)
    {
        showAlert('سوالا اجباری را پاسخ دهید')
        Question.classList.add('error_occur');
        error_occur = true;
        return 'Error';
    }
    else
    {
        
        answer_object = [
            {
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : {
                'integer_selective' : parseInt(selected_degree_option.getAttribute("id").split('answer-n')[1])
            }
        }
    ]
        await single_answer_poster(Questionnaireuuid,AnswerSetID,answer_object)
    }

}
const sort_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required) => {
    let answer_object  = [
    { 
        "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : {
                'sorted_options' : [] 
            }
        }
    ]
    document.querySelectorAll(`#${Question.getAttribute("id")} .multiple_answer_block-option .answer_option_input`).forEach((item,index) => {
            answer_object[0].answer.sorted_options.push(
                {
                    'id' : parseInt( item.getAttribute('id').split('answer-n')[1]),
                    'placement' : index + 1
                }
            )
       ;
    })
    await single_answer_poster(Questionnaireuuid,AnswerSetID,answer_object)
}
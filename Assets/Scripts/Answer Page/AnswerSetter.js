import { postRequest , baseUrl } from "../ajax/ajaxRequsts.js";
import { showAlert , form_data_convertor , detectFileFormat , file_src_setter } from "../Question Design Pages/CommonActions.js";
export const answer_set_postData = {
    'answers' : []
}
let total_answers = [];
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
        formData.append(`[0]${key_number}`,DataToPost[0][key_number] !== null ? DataToPost[0][key_number] : 'null')
    console.log([...formData])
    try
    {
        console.log(await postRequest(`${baseUrl}/question-api/questionnaires/${questionnaireUUID}/answer-sets/${AnswerSetID}/add-answer/`,'multipart/form-data',formData))
    }
    catch(err)
    {
        throw err;
    }
}

export const total_answer_set_handler = async (Questionnaire,AnswerSetID,Questions) =>
{
    if(total_answers.length)
        total_answers.length = 0;
    const asyncForEach = async (array) => {
        try {
          for (let i = 0; i < array.length; i++) {
            if(Questionnaire.questions[i].question)
                await single_answer_setter(Questionnaire.uuid,AnswerSetID,Questionnaire.questions[i].question,Questions[i],'Total');
          }
          let res = await postRequest(`${baseUrl}/question-api/questionnaires/${Questionnaire.uuid}/answer-sets/${AnswerSetID}/add-answer/`,'application/json',total_answers);
            console.log(res)
        }
        catch (ex) {
           throw ex;
        }
      }
    await asyncForEach(Questions);
}
export const single_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,QuestionHTML,AnswerMode) => {
    try 
    {
      switch([...QuestionHTML.classList][1])
        {
                case 'text_answer':
                    await text_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required,AnswerMode);
                    break;
                case 'integer_range':
                    await range_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required,AnswerMode);
                    break;
                case 'integer_selective':
                    await  selective_degree_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required,AnswerMode);
                    break;
                case 'file':
                    await file_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required,AnswerMode);
                    break;
                case 'drop_down':
                    await drop_down_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required,AnswerMode);
                    break;
                case 'number_answer':
                    await  number_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required,AnswerMode);
                    break;
                case 'link':
                    await  link_question_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required,AnswerMode);
                    break;
                case 'optional':
                    await  multiple_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required,AnswerMode);
                        break;
                case 'email_field':
                    await  email_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required,AnswerMode);
                    break;
                case 'group':
                    if(Question.child_questions)
                    {
                        Question.child_questions.forEach(async (item) => {
                            await single_answer_setter(Questionnaireuuid,AnswerSetID,item.question,document.querySelector(`#Q${item.question.id}`),AnswerMode)
                        })
                    }
                case 'sort':
                    await  sort_answer_setter(Questionnaireuuid,AnswerSetID,QuestionHTML,Question.is_required,AnswerMode);
                    break;
        }
    }
    catch(error)
    {
        throw error;
    }
}
const file_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required,AnswerMode) => {
    let answer_to_post;
    let file_input = document.querySelector('.inputUploader .box__file');
    if(file_input.files.length == 0)
    {
        answer_to_post = 
            {
                "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                "answer" : null
            }
    }
    else
    {
        answer_to_post = 
            {
                "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                'file' : file_input.files[0],
                "answer" : null
            }
        
    }
    await answer_post_switcher(Questionnaireuuid,AnswerSetID,answer_to_post,null,'File')
    
}    
const text_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required,AnswerMode) => {
    let answer_to_post;
    let text_answer_input = document.querySelector('#text_answer_input');
    if(text_answer_input.value.length == 0)
    {
        answer_to_post = 
            {
                "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                "answer" : null
            }
        
    }
    else
    {
        answer_to_post = 
                {
                    "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                    "answer" : {
                        'text_answer' : text_answer_input.value
                    }
                }
    }
    await answer_post_switcher(Questionnaireuuid,AnswerSetID,answer_to_post,AnswerMode)
        
}
const range_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required,AnswerMode) => {
    let answer_to_post
    let selected_range_item_label = document.querySelector(".range__number.range__active label");

    if(!selected_range_item_label)
    {
        answer_to_post = 
        {
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : null
        }
    }
    else 
    {
        answer_to_post = 
       {
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : {
                'integer_range' : parseInt(selected_range_item_label.textContent)
            }
        }
    }
    await answer_post_switcher(Questionnaireuuid,AnswerSetID,answer_to_post,AnswerMode)
     
}
const multiple_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required,AnswerMode) => {
    
    let selected_option = [];
    let answer_to_post
    document.querySelectorAll(`#${Question.getAttribute("id")} .multiple_answer_block-option input`).forEach((item,index) => {
        if(item.checked)
            selected_option.push(parseInt(item.getAttribute("id").split("answer-n")[1]));
    })
    if(selected_option.length == 0)
    {
        answer_to_post = {
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : null
        }
    }
    else
    {
        answer_to_post = 
            {
                "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                "answer" : {
                    'selected_options' : selected_option.length == 1 ? [parseInt(selected_option[0])] : selected_option
                }
            }
    }
    await answer_post_switcher(Questionnaireuuid,AnswerSetID,answer_to_post,AnswerMode)
}
const email_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required,AnswerMode) => {
    
    let answer_to_post;
    let email_answer_input = document.querySelector('#email_answer_input');
    if(email_answer_input.value.split("").length == 0)
    {
        answer_to_post = 
        {
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : null
        }
    }
    else
    {
        
        answer_to_post = 
            {
                "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                "answer" : {
                    'email_field' : email_answer_input.value
                }
            }
    }
    await answer_post_switcher(Questionnaireuuid,AnswerSetID,answer_to_post,AnswerMode)
}
const link_question_setter = async (Questionnaireuuid,AnswerSetID,Question,required,AnswerMode) => {
    
    let link_answer_input = document.querySelector(`#${Question.getAttribute("id")} #link_answer_input`);
    let answer_to_post;
    if((link_answer_input.value.split("").length == 0))
    { 
        answer_to_post = 
        {
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : null
        }
    }
    else
    {
        
        answer_to_post = 
            {
                "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                "answer" : {
                    'link' : link_answer_input.value
                }
            } 
    }
    await answer_post_switcher(Questionnaireuuid,AnswerSetID,answer_to_post,AnswerMode)
}
const number_answer_setter = async (Questionnaireuuid,AnswerSetID,QuestionContainer,required,AnswerMode) => {
    let answer_to_post;
    let number_answer_input = document.querySelector(`#${QuestionContainer.getAttribute("id")} #number_answer_input`);
    if(number_answer_input.value.split("").length == 0)
    {
        answer_to_post = 
        {
            "question": parseInt(QuestionContainer.getAttribute("id").split("Q")[1]),
            "answer" : null
        }
    }
    else
    {
        answer_to_post = 
                {
                    "question": parseInt(QuestionContainer.getAttribute("id").split("Q")[1]),
                    "answer" : {
                        'number_answer' : parseInt(number_answer_input.value)
                    }
                }
    }
    await answer_post_switcher(Questionnaireuuid,AnswerSetID,answer_to_post,AnswerMode)
}
const drop_down_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required,AnswerMode) => {
   
    let selected_drop_down_option = document.querySelector(`#${Question.getAttribute("id")} .selection__item.slide_selected label`);
    let answer_to_post;
    if(!selected_drop_down_option)
    {
        answer_to_post = 
        {
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : null
        }
    }
    else
    {
        if(selected_drop_down_option)
                answer_to_post = 
                {
                    "question": parseInt(Question.getAttribute("id").split("Q")[1]),
                    "answer" : {
                        'selected_options' : [
                            parseInt(selected_drop_down_option.previousElementSibling.getAttribute('id').split('select_item_input_')[1])
                        ]
                    }
                }
    }
    await answer_post_switcher(Questionnaireuuid,AnswerSetID,answer_to_post,AnswerMode)
}
const selective_degree_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required,AnswerMode) => {
    
    let answer_to_post
    let selected_degree_option = document.querySelector(`#${Question.getAttribute("id")} .degree_answer_block-option input.selected_answer`);
    if(!selected_degree_option)
    {
        answer_to_post = 
        {
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : null
        }
    }
    else
    {
        answer_to_post = 
            {
            "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : {
                'integer_selective' : parseInt(selected_degree_option.getAttribute("id").split('answer-n')[1])
            }
        }
    }
    await answer_post_switcher(Questionnaireuuid,AnswerSetID,answer_to_post,AnswerMode)
}
const sort_answer_setter = async (Questionnaireuuid,AnswerSetID,Question,required,AnswerMode) => {
    if(!Question.className.includes('sort'))
        return
    let answer_to_post  = 
    { 
        "question": parseInt(Question.getAttribute("id").split("Q")[1]),
            "answer" : {
                "sorted_options" : []
            }
        }
    document.querySelectorAll(`#${Question.getAttribute("id")} .multiple_answer_block-option .answer_option_input`).forEach((item,index) => {
            answer_to_post.answer.sorted_options.push(
                {
                    'id' : parseInt( item.getAttribute('id').split('answer-n')[1]),
                    'placement' : index + 1
                }
            )
       ;
    })
    await answer_post_switcher(Questionnaireuuid,AnswerSetID,answer_to_post,AnswerMode)
}
const answer_post_switcher = async (Questionnaireuuid,AnswerSetID,answer_to_post,AnswerMode,fileUpload) => {
    try 
    {
        switch(AnswerMode)
        {
            case 'Total':
                total_answers.push(answer_to_post)
                break;
            case 'Single':
                await single_answer_poster(Questionnaireuuid,AnswerSetID,[answer_to_post])
                break;
        }
        if(fileUpload)
            await file_answer_poster(Questionnaireuuid,AnswerSetID,[answer_to_post])
    }
    catch(error)
    {
        throw error;
    }
}
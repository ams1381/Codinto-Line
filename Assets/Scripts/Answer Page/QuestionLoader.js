import { getRequest , baseUrl, postRequest , errorHandler } from "../ajax/ajaxRequsts.js";
import { welcome_component_generator } from "./Question Generator/Welcome.js";
import { question_component_generator } from "./Question Generator/question_comp_generator.js";
import { showAlert } from "../Question Design Pages/CommonActions.js";
import { answer_input_checker, file_event_listener } from "./Question Generator/answer_event_listener.js";
import { total_answer_set_handler , single_answer_setter } from './AnswerSetter.js';
import { answer_loader } from "./AnswerLoader.js";
import { thank_component_generator } from "./Question Generator/Thank_Component.js";
import {error_occur } from './AnswerSetter.js'
const questionnaire_for_preview = JSON.parse(localStorage.getItem("questionnaire_for_preview"));
const getQuestionsUrl = baseUrl + '/question-api/';
const answer_page_container = document.querySelector('.answer_page_container');
const block__header = document.querySelector('.block__header');
const urlParams = new URLSearchParams(window.location.search);
const Questionnaireuuid = urlParams.get('Questionnaireuuid');
let start_question_index = 0;
let answer_set_id;
let first_question_number;
const answer_set_post_requester = async (url) => {
    try {
       let response = await axios.post(url,{},{});
       return response;
      } 
      catch (error) 
      {
        throw error;
      }
}
const questionnaire_getter = async (url) => {
    try
    {
        let response = await axios.get(url);
        return response.data;
    }
    catch (error) 
      {
        throw error;
      }
}
const answer_set_creator = async () => {
    try 
    {
        let answer_set_res = await answer_set_post_requester(`${baseUrl}/question-api/questionnaires/${Questionnaireuuid}/answer-sets/`);
        answer_set_id = answer_set_res.data.id;
    }
    catch(error)
    {
        throw error;
    }
}
const loader_initializer = async () => {
    
    let questionnaire;
    try
    {
        if(Questionnaireuuid)
        {
            await answer_set_creator()
            questionnaire  = await questionnaire_getter(getQuestionsUrl + Questionnaireuuid + '/');
        }  
        else
             questionnaire  = await questionnaire_getter(getQuestionsUrl + questionnaire_for_preview.uuid + '/')
    }
    catch(err)
    {
        console.log(err)
        answer_page_container.classList.add('not_found');
        $('#loading-animation').addClass('hide');
        $('.not_found_container').show(100);
        return
    }
    console.log(questionnaire)
    if(!questionnaire.is_active)
    {
        showAlert("این پرسشنامه غیر فعال میباشد.");
    }
    if(questionnaire.welcome_page)
    {
        welcome_loader(questionnaire.welcome_page)
        let start_button = document.querySelector(".QuestionContainer.Greeting .QuestionStart button");
        let start_container = document.querySelector(".QuestionContainer.Greeting");
        $('#loading-animation').addClass('hide');
        start_button.addEventListener('click',async () => {
            $(start_container).hide(100);
            start_container.remove()
            console.log(questionnaire.questions.questions)
            if(questionnaire.questions.length == 0)
            {
                $('.answer_page_container').addClass('noQuestion');
                return;
            }
            if(!questionnaire.show_question_in_pages)
            {
                $('.parent_container').addClass('total');
                questionnaire.questions.forEach((Question) => {
                    if(Question.question)
                        question_loader(Question);
                });
                if(questionnaire.is_active && Questionnaireuuid)
                {
                    let question_controller_container = `
                    <div class="FormFooter SideFooter">
                        <button class="save-Form saveQuestion send_answers">
                        <div class="snippet" data-title="dot-pulse">
                                <div class="stage">
                                    <div class="dot-pulse"></div>
                                </div>
                        </div>
                            <p>ارسال</p>
                        </button>
                    </div>
                </div>
                    `; 
                   
                questionnaire_controller_loader(question_controller_container);
                let send_answers_button = document.querySelector(".FormFooter .send_answers");
                send_answers_button.addEventListener('click',() => {
                    confirm_button_handler(send_answers_button,questionnaire);
                })
                }
        }
            else
            {
                $('.parent_container').addClass('single');
                
                if(questionnaire.questions[start_question_index])
                    while(!questionnaire.questions[start_question_index].question)
                        start_question_index += 1;
                 first_question_number =  start_question_index; 
                question_controller(questionnaire,questionnaire.questions,start_question_index,questionnaire.progress_bar,'firstQuestion');
            }
        })
    }
    if(!questionnaire.welcome_page)
    {
        if(!questionnaire.show_question_in_pages)
        {
            $('#loading-animation').addClass('hide');
            $('.parent_container').addClass('total');
            questionnaire.questions.forEach((Question) => {
                if(Question.question)
                    question_loader(Question);
                });
            if(questionnaire.is_active && Questionnaireuuid)
            {
                    let question_controller_container = `
                    <div class="FormFooter SideFooter">
                        <button class="save-Form saveQuestion send_answers">
                            <div class="snippet" data-title="dot-pulse">
                                <div class="stage">
                                    <div class="dot-pulse"></div>
                                </div>
                        </div>
                            <p>ارسال</P>
                        </button>
                    </div>
                </div>
                    `; 
                questionnaire_controller_loader(question_controller_container);
                let send_answers_button = document.querySelector(".FormFooter .send_answers");
                send_answers_button.addEventListener('click',() => {
                    
                    confirm_button_handler(send_answers_button,questionnaire);
                })
            }
        } 
        else 
        {
            $('.parent_container').addClass('single');
            $('#loading-animation').addClass('hide');
            if(questionnaire.questions[start_question_index])
                while(!questionnaire.questions[start_question_index].question)
                    start_question_index += 1;
            first_question_number =  start_question_index; 
            question_controller(questionnaire,questionnaire.questions,start_question_index,questionnaire.progress_bar,'firstQuestion');
        }
    }
    
} 
const confirm_button_handler = async (send_answers_button,questionnaire) => {
        try
        {
            send_answers_button.classList.add('operating')
            await total_answer_set_handler(questionnaire,answer_set_id,document.querySelectorAll(".QuestionContainer"))
        }
        catch(error)
        {
            send_answers_button.classList.remove('operating')
            return
        }
        send_answers_button.remove()
        document.querySelectorAll(".QuestionContainer").forEach((item) => {
            $(item).hide(30);
            item.remove();
        })
        if(questionnaire.thanks_page)
            thank_loader(questionnaire.thanks_page)
        if(!questionnaire.thanks_page)
        {
            $('.answer_page_container').addClass("ended")
            $('.questionnaire_ended').show(100);
        }
            
           
}
const welcome_loader = (welcome) => {
    let parser = new DOMParser();
    let parsed_welcome_component =  parser.parseFromString((welcome_component_generator(welcome)),'text/html').firstChild.lastChild.firstChild;
    answer_page_container.append(parsed_welcome_component);
}
const thank_loader = (thank) =>
{
    let parser = new DOMParser();
    let parsed_welcome_component =  parser.parseFromString((thank_component_generator(thank)),'text/html').firstChild.lastChild.firstChild;
    answer_page_container.append(parsed_welcome_component);
}
const question_loader = (Question) => {
    if(document.querySelector(`#Q${Question.question.id}`))
        return
    if(question_component_generator(Question.question))
    {
        let parser = new DOMParser();
        let parsed_question_component =  parser.parseFromString(question_component_generator(Question.question),'text/html').firstChild.lastChild.firstChild;
        $(parsed_question_component).hide()
        answer_page_container.append(parsed_question_component);
        $(parsed_question_component).fadeIn(150);
        answer_input_checker(Question.question)
    }
        
}
const question_controller = (questionnaire,Questions,CurrState,progress_bar,firstQuestion) => {
    if(progress_bar)
    {
        document.querySelector(".answer_page_progressBar").classList.add('active');
        document.querySelector(".answer_page_progressBar").value = (CurrState + 1)* (100/Questions.length);
    }
    if(Questions[CurrState])
    {
        
        question_loader(Questions[CurrState]);
            let question_controller_container = `
            <div class="FormFooter SideFooter">
                <button class="save-Form saveQuestion nextQuestion">
                <div class="snippet" data-title="dot-pulse">
                                <div class="stage">
                                    <div class="dot-pulse"></div>
                                </div>
                        </div>
                     <p>بعدی</p>
                </button>
                <button class="cancel-Form cancelQuestion preQuestion">
                    قبلی
                </button>
             </div>
        </div>
            `
            questionnaire_controller_loader(question_controller_container)
    }
    
    let next_question_button = document.querySelector(".FormFooter .nextQuestion");
    let prev_question_button = document.querySelector(".FormFooter .preQuestion");
    if(firstQuestion)
        $(prev_question_button).hide(10);
    else 
        $(next_question_button).show(10);
    if(CurrState == Questions.length - 1)
    {
        if(questionnaire.is_active && Questionnaireuuid)
        {
            next_question_button.textContent = 'ارسال';
            next_question_button.className = 'saveQuestion sendAnswers';
        }
        else
            $(next_question_button).hide(10);
    }
    if(next_question_button)
        next_question_button.addEventListener('click',() => {
            let next_question_handler_result = next_question_handler(next_question_button,questionnaire,Questions,CurrState,progress_bar);
            if(next_question_handler_result == 'Err')
                return;
            if(CurrState == Questions.length - 1 && questionnaire.thanks_page)
            {
                $('QuestionContainer').hide();
                thank_loader(questionnaire.thanks_page)
                return
            }
            else if(CurrState == Questions.length - 1 && !questionnaire.thanks_page)
            {
                document.querySelectorAll(".QuestionContainer").forEach((item) => {
                    $(item).hide(30);
                    item.remove();
                })
                $('.answer_page_container').addClass("ended")
                return;
            }
            
        })
    if(prev_question_button)
        prev_question_button.addEventListener('click',() => {
            prev_question_handler(questionnaire,Questions,CurrState,progress_bar)
        })
}
const next_question_handler = async (next_question_button,questionnaire,Questions,CurrState,progress_bar) => {
    let posted_answer_set;
    let curQuestion = document.querySelector(".QuestionContainer");
    try
    {
        if(questionnaire.is_active && Questionnaireuuid)
        {
            next_question_button.classList.add('operating')
           await single_answer_setter(questionnaire.uuid,answer_set_id,Questions[CurrState].question,curQuestion,'Single')
        }
          
    }
    catch(error)
    {
        next_question_button.classList.remove('operating')
        await errorHandler(error.response,error.status,error)
        return;
    }         
        $(curQuestion).fadeOut(100);
        curQuestion.remove();
        document.querySelector('.FormFooter.SideFooter').remove();
        if(Questions[CurrState + 1])
            while(!Questions[CurrState + 1].question)
                CurrState += 1;
        question_controller(questionnaire,Questions,CurrState + 1,progress_bar);

        curQuestion = document.querySelector(".QuestionContainer")
        if(Questionnaireuuid)
        {
            posted_answer_set = await axios.get(`${baseUrl}/question-api/questionnaires/${Questionnaireuuid}/answer-sets/${answer_set_id}/`,{});
            if(curQuestion)
                answer_loader(Questions[CurrState + 1],curQuestion,posted_answer_set.data);    
       }   
}
const prev_question_handler = async (questionnaire,Questions,CurrState,progress_bar) => {
    let posted_answer_set;
    let curQuestion = document.querySelector(".QuestionContainer");
    $(curQuestion).fadeOut(100);
    curQuestion.remove();
    document.querySelector('.FormFooter.SideFooter').remove();
    if(curQuestion == 0)
    {
        welcome_loader(questionnaire.welcome_page)
    }   
    else
    {
        if(Questions[CurrState - 1])
            while(!Questions[CurrState - 1].question)
                CurrState -= 1;
        if(CurrState - 1 == start_question_index)
            question_controller(questionnaire,Questions,CurrState - 1,progress_bar,'firstQuestion');
        else
            question_controller(questionnaire,Questions,CurrState - 1,progress_bar);

        let curQuestion = document.querySelector(".QuestionContainer");
        if(Questionnaireuuid)
        {
            posted_answer_set = await axios.get(`${baseUrl}/question-api/questionnaires/${Questionnaireuuid}/answer-sets/${answer_set_id}/`,{});
            if(curQuestion)
                answer_loader(Questions[CurrState - 1],curQuestion,posted_answer_set.data)
            //     answer_loader(Questions[CurrState - 1],curQuestion,posted_answer_set);
            // else
                
        }
    }
}
const questionnaire_controller_loader = (controller) => {
    let question_controller_container = controller;
    let parser = new DOMParser();
    let parsed_controller_component =  parser.parseFromString(question_controller_container,'text/html').firstChild.lastChild.firstChild;
    answer_page_container.append(parsed_controller_component);
}

await loader_initializer()
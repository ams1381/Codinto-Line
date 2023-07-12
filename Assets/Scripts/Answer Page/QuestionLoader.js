import { getRequest , baseUrl, postRequest } from "../ajax/ajaxRequsts.js";
import { welcome_component_generator } from "./Question Generator/Welcome.js";
import { question_component_generator } from "./Question Generator/question_comp_generator.js";
import { showAlert } from "../Question Design Pages/CommonActions.js";
import { answer_input_checker, file_event_listener } from "./Question Generator/answer_event_listener.js";
import { answer_set_poster , answer_set_postData ,
    total_answer_set_handler , single_answer_setter } from './AnswerSetter.js';
import { answer_loader } from "./AnswerLoader.js";

const questionnaire_for_preview = JSON.parse(localStorage.getItem("questionnaire_for_preview"));
const getQuestionsUrl = baseUrl + '/question-api/questionnaires/';
const answer_page_container = document.querySelector('.answer_page_container');
const block__header = document.querySelector('.block__header');
const urlParams = new URLSearchParams(window.location.search);
const Questionnaireuuid = urlParams.get('Questionnaireuuid');
let answer_set_id;

const answer_set_creator = async () => {
    if(Questionnaireuuid)
    {
        let answer_set_res = await postRequest(`${baseUrl}/question-api/questionnaires/${Questionnaireuuid}/answer-sets/`);
        answer_set_id = answer_set_res.data.id;
    }
}
const loader_initializer = async () => {
    await answer_set_creator()
    let questionnaire;
    try
    {
        if(Questionnaireuuid)
            questionnaire  = await getRequest(getQuestionsUrl + Questionnaireuuid + '/');
        else
             questionnaire  = await getRequest(getQuestionsUrl + questionnaire_for_preview.uuid + '/')
    }
    catch(err)
    {
        window.open('404Page.html');
    }
    if(!questionnaire.is_active)
    {
        showAlert("این پرسشنامه غیر فعال میباشد.");
    }
    if(questionnaire.welcome_page)
    {
        welcome_loader(questionnaire.welcome_page)
        let start_button = document.querySelector(".QuestionContainer.Greeting .QuestionStart button");
        let start_container = document.querySelector(".QuestionContainer.Greeting");

        start_button.addEventListener('click',() => {
            $(start_container).hide(100);
            start_container.remove()
            if(!questionnaire.show_question_in_pages)
            {
                questionnaire.questions.forEach((Question) => {
                    question_loader(Question);
                });
                if(questionnaire.is_active && Questionnaireuuid)
                {
                    let question_controller_container = `
                    <div class="FormFooter SideFooter">
                        <button class="save-Form saveQuestion send_answers">
                            ارسال
                        </button>
                    </div>
                </div>
                    `;
                questionnaire_controller_loader(question_controller_container);
                let send_answers_button = document.querySelector(".FormFooter .send_answers");
                send_answers_button.addEventListener('click',async () => {
                    if(!questionnaire.is_active)
                        showAlert("این پرسشنامه غیر فعال میباشد")
                    else
                    {
                        try 
                        {
                           let answer_set_res = total_answer_set_handler(questionnaire,answer_set_id,document.querySelectorAll(".QuestionContainer"));
                           console.log(answer_set_res)
                            if(answer_set_res.status == 200)
                            {
                                send_answers_button.remove()
                                document.querySelectorAll(".QuestionContainer").forEach((item) => {
                                    $(item).hide(30);
                                    item.remove();
                                })
                                if(questionnaire.thanks_page)
                                    thank_loader(questionnaire.thanks_page)
                            }
                            
                        }
                        catch(err)
                        {
                            console.log(err)
                        }
                    }
                        
                })
            } 
        }
            else
            
                question_controller(questionnaire,questionnaire.questions,0,questionnaire.progress_bar)
            
        })
    }
    if(!questionnaire.welcome_page)
    {
        if(!questionnaire.show_question_in_pages)
            question_loader(questionnaire.questions);
        else 
            question_controller(questionnaire,questionnaire.questions,0,questionnaire.progress_bar);
    }
    
} 
const welcome_loader = (welcome) => {
    let parser = new DOMParser();
    let parsed_welcome_component =  parser.parseFromString((welcome_component_generator(welcome)),'text/html').firstChild.lastChild.firstChild;
    answer_page_container.append(parsed_welcome_component);
    let start_button = document.querySelector(".QuestionContainer.Greeting .QuestionStart button");
    let start_container = document.querySelector(".QuestionContainer.Greeting");
}
const thank_loader = (thank) =>
{
    console.log(thank)
    let parser = new DOMParser();
    let parsed_welcome_component =  parser.parseFromString((welcome_component_generator(thank)),'text/html').firstChild.lastChild.firstChild;
    answer_page_container.append(parsed_welcome_component);
}
const question_loader = (Question) => {
    if(question_component_generator(Question.question))
    {
        let parser = new DOMParser();
        let parsed_question_component =  parser.parseFromString(question_component_generator(Question.question),'text/html').firstChild.lastChild.firstChild;
        $(parsed_question_component).hide()
        answer_page_container.append(parsed_question_component);
        $(parsed_question_component).fadeIn(150);
        if(Question.question.question_type == 'drop_down')
        {
            slider_options_eventListener_setter(document.querySelector(".slider_toggle_button"),document.querySelectorAll('.selection__item'))
        }
        if(Question.question.question_type == 'integer_range')
            range_item_eventListener_setter(document.querySelectorAll(".range__number"));
        answer_input_checker(Question.question)
    }
        
}
const question_controller = (questionnaire,Questions,CurrState,progress_bar) => {
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
                     بعدی
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
    if(CurrState == 0)
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
            let next_question_handler_result = next_question_handler(questionnaire,Questions,CurrState,progress_bar);
            if(next_question_handler_result == 'Err')
                return;
            else
            {
                let curQuestion = document.querySelector(".QuestionContainer");
                if(CurrState !== Questions.length - 1)
                answer_loader(Questions[CurrState],curQuestion,answer_set_postData);
                answer_input_checker(Questions[CurrState].question);
            }   
        })
    if(prev_question_button)
        prev_question_button.addEventListener('click',() => {
            prev_question_handler(questionnaire,Questions,CurrState,progress_bar)
        })
}
const next_question_handler = (questionnaire,Questions,CurrState,progress_bar) => {
    let curQuestion = document.querySelector(".QuestionContainer");
        if(questionnaire.is_active && Questionnaireuuid)
            if(single_answer_setter(questionnaire.uuid,answer_set_id,Questions[CurrState].question,curQuestion) == 'Error')
            {
                showAlert('لطفا سوالات اجباری را پاسخ دهید')
                return 'Err'; 
            }
                
        $(curQuestion).fadeOut(100);
        curQuestion.remove();
        document.querySelector('.FormFooter.SideFooter').remove();
        if(Questions[CurrState + 1])
            while(Array.isArray(Questions[CurrState + 1].question))
                CurrState += 1;
        question_controller(questionnaire,Questions,CurrState + 1,progress_bar);
            
}
const prev_question_handler = async (questionnaire,Questions,CurrState,progress_bar) => {
    let posted_answer_set;
    let curQuestion = document.querySelector(".QuestionContainer");
    // single_answer_setter(questionnaire.uuid,answer_set_id,Questions[CurrState].question,curQuestion);
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
            while(Array.isArray(Questions[CurrState - 1].question))
                CurrState -= 1;
        question_controller(questionnaire,Questions,CurrState - 1,progress_bar);

        let curQuestion = document.querySelector(".QuestionContainer");
        if(Questionnaireuuid)
        {
            posted_answer_set = await getRequest(`${baseUrl}/question-api/questionnaires/${Questionnaireuuid}/answer-sets/${answer_set_id}/`);
            answer_loader(Questions[CurrState],curQuestion,posted_answer_set);
        }
        else
            answer_loader(Questions[CurrState],curQuestion,null);
    }
        
}
const slider_options_eventListener_setter = (slider_button,slider_options) => {
    slider_button.addEventListener('click',() => {
        if(slider_button.classList.contains("up"))
        {
            $(slider_options).slideDown(100);
            slider_button.classList.remove("up");
        }
        else
        {
            $(slider_options).slideUp(10);
            slider_button.classList.add("up");
        }
    })
    slider_options.forEach((item) => {
        item.addEventListener('click',() => {
            setActive_slide_item(item,slider_options);
            $(slider_options).not(".slide_selected").slideUp(10);
            slider_button.classList.add("up");
            if(item.firstElementChild.checked)
                console.log(item)
        })
        
    })
    const setActive_slide_item = (slide_option,slide_options) => {
        if(slide_option.classList.contains("slide_selected"))
            return;
        slide_options.forEach((item) => {
            item.classList.remove('slide_selected');
        })
        slide_option.classList.add("slide_selected")
    }
}
const questionnaire_controller_loader = (controller) => {
    let question_controller_container = controller;
    let parser = new DOMParser();
    let parsed_controller_component =  parser.parseFromString(question_controller_container,'text/html').firstChild.lastChild.firstChild;
    answer_page_container.append(parsed_controller_component);
}
const range_item_eventListener_setter = (range_select_options) => {
    range_select_options.forEach((range_select_option) => {
        range_select_option.addEventListener('click', () => {
            setActive_range_item(range_select_option,range_select_options)
        })
    });
    const setActive_range_item = (slide_option,slide_options) => {
        if(slide_option.classList.contains("range__active"))
            return;
            range_select_options.forEach((item) => {
            item.classList.remove('range__active');
        })
        slide_option.classList.add("range__active")
    }
}

await loader_initializer()
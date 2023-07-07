import { getRequest , baseUrl } from "../ajax/ajaxRequsts.js";
import { welcome_component_generator } from "./Question Generator/Welcome.js";
import { question_component_generator } from "./Question Generator/question_comp_generator.js";
import { showAlert } from "../Question Design Pages/CommonActions.js";
import { range_item_eventListener_setter } from "../../../Components/questionBox/rangeSelect.js";
import { answer_set_poster , answer_set_postData ,
    total_answer_set_handler , single_answer_setter } from './AnswerSetter.js';
import { answer_loader } from "./AnswerLoader.js";

const questionnaire_for_preview = JSON.parse(localStorage.getItem("questionnaire_for_preview"));
const getQuestionsUrl = baseUrl + '/question-api/questionnaires/';
const answer_page_container = document.querySelector('.answer_page_container');
const block__header = document.querySelector('.block__header');
let is_active = true;
const loader_initializer = async () => {
    let questionnaire = await getRequest(getQuestionsUrl + questionnaire_for_preview.uuid + '/');
    let end_date_compare ;
    let pub_date_compare = compareDates(form_date_convertor_to_Gregorian(current_date_getter().join("/")),questionnaire.pub_date);
    if(questionnaire.end_date)
      end_date_compare = compareDates(form_date_convertor_to_Gregorian(current_date_getter().join("/")),questionnaire.end_date);
    if(pub_date_compare > 0 || end_date_compare < 0)
    {
        showAlert("این پرسشنامه غیر فعال میباشد.");
        is_active = false;
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
                if(questionnaire.thanks_page)
                    thank_loader(questionnaire.thanks_page);
                if(is_active)
                {
                    let question_controller_container = `
                    <div class="FormFooter SideFooter">
                        <button class="save-Form saveQuestion send_answers">
                            ارسال
                        </button>
                    </div>
                </div>
            `
            questionnaire_controller_loader(question_controller_container);
            let send_answers_button = document.querySelector(".FormFooter .send_answers");
            send_answers_button.addEventListener('click',async () => {
                if(is_active)
                {
                    showAlert("این پرسشنامه غیر فعال میباشد")
                    return;
                }
                else
                {
                    total_answer_set_handler(document.querySelectorAll(".QuestionContainer"));
                    try
                    {
                        await answer_set_poster(questionnaire_for_preview.uuid)
                    }
                    catch(Err)
                    {
                        console.log(Err)
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
    console.log(Question)

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
        if(is_active)
        {
            next_question_button.textContent = 'ارسال';
            next_question_button.className = 'saveQuestion sendAnswers';
            next_question_button.addEventListener('click',async () => {
                    let answerPoster = await answer_set_poster(questionnaire.uuid);
                    console.log(answerPoster)
                    if(answerPoster.status == 201)
                      {
                          if(questionnaire.thanks_page)
                            thank_loader(questionnaire.thanks_page);
                          return;
                      }
            })
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
            answer_loader(curQuestion,answer_set_postData);
        }   
    })
    if(prev_question_button)
    prev_question_button.addEventListener('click',() => {
        prev_question_handler(questionnaire,Questions,CurrState,progress_bar)
    })
}
const next_question_handler = (questionnaire,Questions,CurrState,progress_bar) => {
    let curQuestion = document.querySelector(".QuestionContainer");
        if(is_active)
            if(single_answer_setter(curQuestion,Questions[CurrState].question.is_required) == 'Error')
            {
                showAlert('لطفا سوالات اجباری را پاسخ دهید')
                return 'Err'; 
            }
                
        $(curQuestion).fadeOut(100);
        curQuestion.remove();
        document.querySelector('.FormFooter.SideFooter').remove();
        question_controller(questionnaire,Questions,CurrState + 1,progress_bar);
}
const prev_question_handler = (questionnaire,Questions,CurrState,progress_bar) => {
    let curQuestion = document.querySelector(".QuestionContainer");
    single_answer_setter(curQuestion,Questions[CurrState].question.is_required);
    $(curQuestion).fadeOut(100);
    curQuestion.remove();
    document.querySelector('.FormFooter.SideFooter').remove();
    if(curQuestion == 0)
    {
        welcome_loader(questionnaire.welcome_page)
    }   
    else
    {
        question_controller(questionnaire,Questions,CurrState - 1,progress_bar);
        let curQuestion = document.querySelector(".QuestionContainer");
        answer_loader(curQuestion,answer_set_postData);
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
const current_date_getter = () => {
    let currentDate = new Date();
    let currentDateString = currentDate.toLocaleDateString();

    currentDate = farvardin.gregorianToSolar(
        parseInt(currentDateString.split("/")[2])
        ,
        parseInt(currentDateString.split("/")[0])
        ,
        parseInt(currentDateString.split("/")[1])
        );
    return currentDate;
}
const form_date_convertor_to_Gregorian = (Date) => {
    let GregorianDate = farvardin.solarToGregorian(parseInt(Date.split("/")[0]) , parseInt(Date.split("/")[1]) , parseInt(Date.split("/")[2]));
    return (GregorianDate[0] + '-' + GregorianDate[1] + '-' + GregorianDate[2]);
}
const compareDates = (date1, date2) => new Date(date1) - new Date(date2);
await loader_initializer()
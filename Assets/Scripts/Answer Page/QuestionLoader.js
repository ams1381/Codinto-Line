import { getRequest , baseUrl } from "../ajax/ajaxRequsts.js";
import { welcome_component_generator } from "./Question Generator/Welcome.js";
import { question_component_generator } from "./Question Generator/question_comp_generator.js";

const question_for_preview = JSON.parse(localStorage.getItem("questionnaire_for_preview"));
const getQuestionsUrl = baseUrl + '/question-api/questionnaires/';
const answer_page_container = document.querySelector('.answer_page_container');

const welcome_loader = async () => {
    let questionnaire = await getRequest(getQuestionsUrl + question_for_preview.uuid + '/');
    if(questionnaire.welcome_page)
    {
        let parser = new DOMParser();
        let parsed_welcome_component =  parser.parseFromString((welcome_component_generator(questionnaire.welcome_page)),'text/html').firstChild.lastChild.firstChild;
        answer_page_container.append(parsed_welcome_component);
        let start_button = document.querySelector(".QuestionContainer.Greeting .QuestionStart button");
        let start_container = document.querySelector(".QuestionContainer.Greeting");

        start_button.addEventListener('click',() => {
            $(start_container).hide(100);
            question_loader(questionnaire.questions);
            
        })
    }
} 
const question_loader = (Questions) => {
    
    Questions.forEach((Question,QuestionIndex) => {
        console.log(Question)
        let parser = new DOMParser();
       let parsed_question_component =  parser.parseFromString(question_component_generator(Question.question),'text/html').firstChild.lastChild.firstChild;
       $(parsed_question_component).hide()
       answer_page_container.append(parsed_question_component);
       $(parsed_question_component).show(50);
       if(Question.question.question_type == 'drop_down')
       {
            slider_options_eventListener_setter(document.querySelector(".slider_toggle_button"),document.querySelectorAll('.selection__item'))
       }
    })
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

await welcome_loader()
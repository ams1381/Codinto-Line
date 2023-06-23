import { remove_eventListener_setter } from "./QuestionItemRemover.js";
const QuestionsBoxContainer = document.querySelector(".QuestionsBox");
const QuestionLabelSetter = (Question_Type,Question_Number) => 
{
    let question_label;
    let question_tools_box;
    switch(Question_Type)
    {
        case 'welcome-page' : 
            question_label = `
                <div class="QuestionLabel">
                    <i class="fa fa-handshake-o"></i>
                </div>
            `;
            question_tools_box = `
            <button class="DeleteButton">
                  <i class="fa fa-trash"></i>
             </button>
            `
            break;
        case 'thank-page' : 
            question_label = `
            <div class="QuestionLabel">
                <img src ="../Assets/img/ThankIcon.svg"/>
            </div>
            `;
            question_tools_box = `
            <button class="DeleteButton">
                  <i class="fa fa-trash"></i>
             </button>
            `
            break;
        default : 
            question_label = `
            <div class="QuestionLabel sup-label">
                ${Question_Number + 1}
            </div>
            `;
            question_tools_box = `
                <button class="EditButton">
                    <i class="fa fa-copy"></i>
                </button>
                <button class="DeleteButton">
                    <i class="fa fa-trash"></i>
                </button>
            `
            break;
    }
    return {  question_label ,  question_tools_box}
}
export const QuestionDesignOpener = (QuestionType) =>
{   
    switch(QuestionType)
    {
        case 'welcome-page': 
            window.open("/Pages/Greetingdesign.html","_Self");
            break;
        case 'text_answer':
            window.open("/Pages/QuestionWAnwser.html","_Self");
            break;
        case 'no_answer':
            window.open("/Pages/QuestionWOutAnwser.html","_Self");
            break;
        case 'integer_range':
            window.open("/Pages/RangeAnswer.html","_Self");
            break;
        case 'integer_selective':
            window.open("/Pages/Selective Degree.html","_Self");
            break;
        case 'file':
            window.open("/Pages/uploadPage.html","_Self");
            break;
        case 'drop_down':
            window.open("/Pages/Slide List.html","_Self");
            break;
        case 'number_answer':
            window.open("/Pages/NumberPage.html","_Self");
            break;
        case 'link':
            window.open("/Pages/link.html","_Self");
            break;
        case 'optional':
            window.open("/Pages/MultipleOption.html","_Self");
            break;
        case 'email_field':
            window.open("/Pages/email.html","_Self");
            break;
        case 'group':
            window.open("/Pages/groupQuestion.html","_Self");
            break;
        case 'Sort':
            window.open("/Pages/Priority.html","_Self");
            break;
        case 'thank-page':
            window.open("/Pages/thanks.html","_Self");
            break;
    }
}
export const QuestionItemGenerator = (Question,QuestionOrderNumber) => 
{   
    let { question_label , question_tools_box } = QuestionLabelSetter(Question.question_type,QuestionOrderNumber);

    const question_element_item = `
    <div id="Question${Question.id}" class="Questionitem ${Question.question_type}" style="">
            ${question_label.split(" "[1])}
        <div class="QuestionitemText">
            <p>${Question.title}</p>
        </div>
        <div class="QuestionTools">
            ${question_tools_box}
        </div>
    </div>`
    const parser = new DOMParser();
    const parsed_question_element_item = parser.parseFromString((question_element_item),'text/html').firstChild.lastChild.lastChild;
    
    $(question_element_item).hide(10);
    let thank_page_item = document.querySelector(".QuestionsBox .thank-page");
    if(thank_page_item)
            thank_page_item.parentElement.insertBefore(parsed_question_element_item,thank_page_item)
    else
        QuestionsBoxContainer.append(parsed_question_element_item);
    $(parsed_question_element_item).fadeIn(200);

    const delete_question_button = document.querySelector(`#Question${Question.id} .QuestionTools .DeleteButton`);
    remove_eventListener_setter(delete_question_button,Question.question_type,Question.id)

    parsed_question_element_item.addEventListener('click',(e) => {
        localStorage.setItem("ACTION-TYPE",'Edit');
        localStorage.setItem("QuestionData",JSON.stringify(Question));
        if(e.target.classList[1] != 'fa-copy' && (e.target.classList[1] != 'fa-trash'))
           QuestionDesignOpener(Question.question_type);
    })
}

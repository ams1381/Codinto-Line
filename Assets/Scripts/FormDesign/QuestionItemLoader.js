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
                <i>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3F52E3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Trash_Full"> <path id="Vector" d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#3F52E3" stroke-width="1.512" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                </i>
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
                <i>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3F52E3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Trash_Full"> <path id="Vector" d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#3F52E3" stroke-width="1.512" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                </i>
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
                    <i>
                     <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3F52E3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Trash_Full"> <path id="Vector" d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#3F52E3" stroke-width="1.512" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                    </i>
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
    const copy_question_button = document.querySelector(`#Question${Question.id} .QuestionTools .EditButton`);

    remove_eventListener_setter(delete_question_button,Question.question_type,Question.id);
    if(copy_question_button)
        copy_question_button.addEventListener('click',() => {
            localStorage.setItem("ACTION-TYPE","Copy")
            QuestionDesignOpener(Question.question_type);
        })
    parsed_question_element_item.addEventListener('click',(e) => {

        localStorage.setItem("ACTION-TYPE",'Edit');
        localStorage.setItem("QuestionData",JSON.stringify(Question));
        console.log(e.target)
        if(e.target.classList[0] == 'Questionitem' || e.target.classList[0] == 'QuestionLabel')
           QuestionDesignOpener(Question.question_type);
    })
}

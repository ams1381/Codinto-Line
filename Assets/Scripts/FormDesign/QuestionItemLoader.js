import { remove_eventListener_setter } from "./QuestionItemRemover.js";
import { drag_drop_setter } from "../DraggableItems.js";
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
                ${Question_Number}
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
        case 'sort':
            window.open("/Pages/Priority.html","_Self");
            break;
        case 'thank-page':
            window.open("/Pages/thanks.html","_Self");
            break;
    }
}
export const QuestionItemGenerator = (Question,QuestionOrderNumber) => 
{   
    if(Array.isArray(Question))
        return
    let { question_label , question_tools_box } = QuestionLabelSetter(Question.question_type,QuestionOrderNumber);
    let sub_questions = '';
    if(Question.child_questions)
        Question.child_questions.forEach((item,index) => {
            sub_questions += question_sub_itemGenerator(item.question,question_label,question_tools_box,`${Question.placement}-${index + 1}`)
        })
    let question_element_item = '';
    if(Question.question_type == 'group')
    {
        question_element_item = `
        <div   class="Question-Nested nested-container ${Question.question_type}" >
            <div id="Question${Question.id}" class="Questionitem ${Question.question_type}">
                        ${question_label.split(" "[1])}
                    <div class="QuestionitemText">
                        <p>${Question.title}</p>
                    </div>
                    <div class="QuestionTools">
                        ${question_tools_box}
                    </div>
                </div>
           <div class="Question-Nested-items">
            <div class="nested">
                ${sub_questions}
            </div>
           </div>
        </div> `
    }
    else
        question_element_item = `
        <div id="Question${Question.id}" class="Questionitem ${Question.question_type} ${Question.question_type == 'group' ? 'nested' : ''}" style="">
                ${question_label.split(" "[1])}
            <div class="QuestionitemText">
                <p>${Question.title}</p>
            </div>
            <div class="QuestionTools">
                ${question_tools_box}
            </div>
            ${Question.question_type == 'group' ? '<div class="nested_question nested"></div>' : ''}
        </div>`
        
    const parser = new DOMParser();
    const parsed_question_element_item = parser.parseFromString((question_element_item),'text/html').firstChild.lastChild.firstChild;
   
    $(parsed_question_element_item).hide(0);
    let thank_page_item = document.querySelector(".QuestionsBox .thank-page");
    if(thank_page_item)
            thank_page_item.parentElement.insertBefore(parsed_question_element_item,thank_page_item)
    else
        QuestionsBoxContainer.append(parsed_question_element_item);
    $(parsed_question_element_item).show(200);

    const delete_question_button = document.querySelector(`#Question${Question.id} .QuestionTools .DeleteButton`);
    const copy_question_button = document.querySelector(`#Question${Question.id} .QuestionTools .EditButton`);
    const sub_delete_buttons = document.querySelectorAll(`.Question-Nested .Question-Nested-items .nested .DeleteButton`);
    const sub_copy_buttons = document.querySelectorAll(`.Question-Nested .Question-Nested-items .nested .EditButton`);
    const question_element = document.querySelector(`#Question${Question.id}`);
    const sub_question_elements = document.querySelectorAll(`#Question${Question.id} + .Question-Nested-items .Questionitem`);

    if(sub_delete_buttons)
    {
        sub_delete_buttons.forEach((item) => {
            
            remove_eventListener_setter(item,item.parentElement.parentElement.classList[1],
                parseInt(item.parentElement.parentElement.getAttribute('id').split("Question")[1]))
        })
    }
    remove_eventListener_setter(delete_question_button,Question.question_type,Question.id);
    if(copy_question_button)
        copy_question_button.addEventListener('click',() => {
            question_copier(Question,copy_question_button.parentElement.parentElement.getAttribute("id").split('Question')[1])
        })
    if(sub_copy_buttons)
    {
        sub_copy_buttons.forEach((sub_copy_button) => {
            sub_copy_button.addEventListener('click',() => {
                question_copier(Question,sub_copy_button.parentElement.parentElement.getAttribute("id").split('Question')[1])
            })
        })
    }
    
        if(sub_question_elements.length != 0)
        {
            sub_question_elements.forEach((item,index) => {
                item.addEventListener('click',(e) => {
                    question_click_handler(Question.child_questions[index].question,item.getAttribute("id").split("Question")[1],e)   
                })
            })
        }
    question_element.addEventListener('click',(e) => {
        question_click_handler(Question,question_element.getAttribute("id").split("Question")[1],e)     
    })
   document.querySelectorAll('.Question-Nested.nested-container.group').forEach((item) => {
        if(!item.firstElementChild.hasAttribute('id'))
            item.remove();
   })
}
const question_sub_itemGenerator = (Question,question_label,question_tools_box,question_number) => {
    let parsed_question_number =  new DOMParser().parseFromString(question_label,'text/html').firstChild.lastChild.firstChild;
    parsed_question_number.textContent = question_number;
    parsed_question_number.className = 'QuestionLabel sub-label'
    if(Question.question_type == 'group')
    {
         return `
        <div   class="Question-Nested nested-container ${Question.question_type}" >
            <div id="Question${Question.id}" class="Questionitem ${Question.question_type}">
                        ${parsed_question_number.outerHTML}
                    <div class="QuestionitemText">
                        <p>${Question.title}</p>
                    </div>
                    <div class="QuestionTools">
                        ${question_tools_box}
                    </div>
                </div>
           <div class="Questionitem Question-Nested-items">
            <div class="nested">
                
            </div>
           </div>
        </div> `
        
    }
    else
    {

        return ` 
        <div id="Question${Question.id}" class="Questionitem ${Question.question_type} ${Question.question_type == 'group' ? 'nested' : ''}" style="">
        ${parsed_question_number.outerHTML}
        <div class="QuestionitemText">
            <p>${Question.title}</p>
        </div>
        <div class="QuestionTools">
            ${question_tools_box}
        </div>
    </div>`
    }
    
}
const question_copier = (Question,QuestionID) => {
    let clicked_question;
        if(Question.id == QuestionID)
            clicked_question = Question;
        else
            if(Question.child_questions)
                Question.child_questions.forEach((child_question) => {
                    if(child_question.question.id == QuestionID)
                        clicked_question = child_question.question;
                })
    localStorage.removeItem("QuestionData")
    localStorage.removeItem("ACTION-TYPE")
    localStorage.setItem("ACTION-TYPE","Copy")
    localStorage.setItem("QuestionData",JSON.stringify(clicked_question))
    QuestionDesignOpener(clicked_question.question_type);
}
const question_click_handler = (Question,QuestionId,e) => {
    // localStorage.removeItem("QuestionData")
    let clicked_question;
    if(Question.id == QuestionId)
        clicked_question = Question;
    else
    {
        if(Question.child_questions)
        {
            Question.child_questions.forEach((child_question) => {
                if(child_question.question.id == QuestionId)
                    clicked_question = child_question.question;
            })
        }
    }
    
    if(e.target.classList[0] == 'Questionitem' || e.target.classList[0] == 'QuestionLabel' ||
    e.target.classList[0] == 'QuestionitemText' || isStrongEmUElement(e.target)
    || e.target instanceof HTMLParagraphElement)
        {
            localStorage.setItem("ACTION-TYPE",'Edit');
            localStorage.setItem("QuestionData",JSON.stringify(clicked_question))
            QuestionDesignOpener(clicked_question.question_type);
        }  
}  
const isStrongEmUElement = (element) => ['STRONG', 'EM', 'U'].includes(element.tagName);
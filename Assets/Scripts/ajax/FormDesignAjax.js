import { getRequest , deleteRequest } from "./ajaxRequsts.js";
import { baseUrl } from "./ajaxRequsts.js";

const SelectedQuestionnaire = JSON.parse(localStorage.getItem("SelectedQuestionnaire"));
console.log(SelectedQuestionnaire)
const getQuestionsUrl = baseUrl + '/question-api/questionnaires/';
const delQuestionUrl = baseUrl + `/question-api/questionnaires/${SelectedQuestionnaire.uuid}/`

const QuestionnaireName = document.querySelector(".navbar-codinto-title");
const QuestionDesignItems = document.querySelectorAll(".QuestionDesignItem");
const QuestionsBoxContainer = document.querySelector(".QuestionsBox");
const remove_folder_confirm_btn = document.querySelector(".removeFolderPopUp .confirm-button");
const remove_folder_popup = document.querySelector(".removeFolderPopUp");
const folder_cancel_button = document.querySelectorAll(".cancel-button");
let deleteQuestionInfo;
QuestionnaireName.textContent = SelectedQuestionnaire.name;

const QuestionItemGenerator = (QuestionType,QuestionTitle,QuestionID,QuestionOrderNumber) => {
    let QuestionItemContainer = document.createElement('div');
    QuestionItemContainer.setAttribute("id","Question" + QuestionID,QuestionOrderNumber);
    QuestionItemContainer.classList.add("Questionitem",QuestionType);
    $(QuestionItemContainer).hide(10);
    let QuestionItemChildrenClassNames = ['QuestionLabel','QuestionitemText','QuestionTools'];
    for(let i = 0;i <= 2; i++)
    {
       let QuestionItemChildDiv = document.createElement('div');
       QuestionItemChildDiv.classList.add(QuestionItemChildrenClassNames[i]);
        if(i === 0)
        {
            switch(QuestionType)
            {
                case 'welcome-page' :
                        let handshakeIcon = document.createElement('i');
                        handshakeIcon.className = 'fa fa-handshake-o';
                        QuestionItemChildDiv.append(handshakeIcon);
                        break;
                case 'thank-page':
                        let thankIcon = document.createElement('img');
                        thankIcon.setAttribute("src",'../Assets/img/ThankIcon.svg')
                        QuestionItemChildDiv.append(thankIcon);
                        break;
                default :
                        QuestionItemChildDiv.textContent = QuestionOrderNumber + 1;
                        QuestionItemChildDiv.classList.add("sup-label");
            } 
        }
        if(i == 2)
        {
            if(QuestionType !== 'welcome-page')
            {
                let copyButton = document.createElement('button');
                copyButton.classList.add("EditButton");
                let copyButtonIcon = document.createElement("i");
                copyButtonIcon.className = 'fa fa-copy';
                copyButton.append(copyButtonIcon);
                QuestionItemChildDiv.append(copyButton);
            }
            let deleteButton = document.createElement('button')
            deleteButton.classList.add("DeleteButton");
            deleteButton.addEventListener('click',() => {
                remove_folder_popup_handler();
                deleteQuestionInfo = {
                     'question_type' : QuestionType,
                     'question_id' : QuestionID,QuestionOrderNumber
                     }
            })
            let deleteButtonIcon = document.createElement("i");
            deleteButtonIcon.className = 'fa fa-trash';
            deleteButton.append(deleteButtonIcon);
            QuestionItemChildDiv.append(deleteButton);
        }
        if(i === 1)
        {  
            let QuestionTitleText = document.createElement('p');
            QuestionTitleText.textContent = QuestionTitle;
            QuestionItemChildDiv.append(QuestionTitleText);
        }
         QuestionItemContainer.append(QuestionItemChildDiv);
    }
    QuestionsBoxContainer.append(QuestionItemContainer);
    $(QuestionItemContainer).fadeIn(200);
    
 
        
   
}
const QuestionItemSetter = async () => {
    try
    {
        let QuestionsResponse = await getRequest(getQuestionsUrl + SelectedQuestionnaire.uuid + '/');
        
        if(QuestionsResponse.data.welcome_page)
        {
            let WelcomePage = QuestionsResponse.data.welcome_page;
            QuestionItemGenerator('welcome-page',WelcomePage.title,WelcomePage.id)
        }
        if(QuestionsResponse.data.questions.length !== 0)
        {
            QuestionsResponse.data.questions.forEach((Question,index) => {
                QuestionItemGenerator(Question.question.question_type,Question.question.title,Question.question.id,index);
            })
        }
        else if(QuestionsResponse.data.questions.length === 0 && !QuestionsResponse.data.welcome_page)
        {
            QuestionsBoxContainer.classList.remove("nested")
            QuestionsBoxContainer.classList.add('emptyActive')
            let emptyListContainer = document.createElement('div');
            emptyListContainer.classList.add('emptyListContainer');

            let emptyListIcon = document.createElement('i');
            emptyListIcon.className = "fa fa-folder";
            emptyListIcon.classList.add('emptyListIcon')

            QuestionsBoxContainer.append(emptyListIcon)
            let emptyListMessage = document.createElement('p');
            emptyListMessage.textContent = 'سوالی جهت نمایش وجود ندارد';
            emptyListContainer.append(emptyListMessage)

            QuestionsBoxContainer.append(emptyListContainer);
        }
    }
    catch(err)
    {
        console.log(err)
    }
    finally 
    {
        let loading = document.getElementById('loading-animation');
        loading.classList.add('hide');
    }
    
    
    
}
QuestionItemSetter();

const QuestionDesignItemsHandler = (QuestionType) => {
    localStorage.setItem("QuestionnaireUUID",SelectedQuestionnaire.uuid)
    switch(QuestionType)
    {
        case 'welcome-page': 
            window.open("/Pages/Greetingdesign.html","_Self");
            break;
        case 'text-with-anwser':
            window.open("/Pages/QuestionWAnwser.html","_Self");
            break;
        case 'range-question':
            window.open("/Pages/RangeAnswer.html","_Self");
            break;
    }
}
const remove_folder_popup_handler = (QuestionType,QuestionId) => {
    remove_folder_popup.classList.add("active");
    nav_mask.classList.add("active");

    
}
const DeleteQuestionItemHandler = async (QuestionInfo) => {
    
    let deleteQuestionRes;
    let deleteQuestionHTMLItem = document.querySelector(`#Question${QuestionInfo.question_id}`);
    switch(QuestionInfo.question_type)
    {
        case 'integer_range':
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'integerrange-questions/' + QuestionInfo.question_id + '/');
            break;
        case 'text_answer':
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'textanswer-questions/' + QuestionInfo.question_id + '/');
            break;
        case 'drop-down':
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'dropdown-questions/' + QuestionInfo.question_id + '/');
            break;
        case 'group': 
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'question-groups/' + QuestionInfo.question_id + '/');
            break;
        case 'integer_selective': 
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'integerselective-questions/' + QuestionInfo.question_id + '/');
            break;
        case 'picture_field': 
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'picture-questions/' + QuestionInfo.question_id + '/');
            break;   
        case 'email_field': 
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'email-questions/' + QuestionInfo.question_id + '/');
            break;
        case 'welcome-page': 
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'welcome-pages/' + QuestionInfo.question_id + '/');
            break;
        default:
            deleteQuestionRes = await deleteRequest(delQuestionUrl + `${QuestionInfo.question_type}-questions/` + QuestionInfo.question_id + '/');
            break;
    }
    if(deleteQuestionRes.status == 204)
        {
            $(deleteQuestionHTMLItem).hide(100);
            deleteQuestionHTMLItem.remove();
            folder_mask_close_panel();
            QuestionItemSetter();
        }
}
const folder_mask_close_panel = () => {
     if(remove_folder_popup.classList.contains("active"))
         remove_folder_popup.classList.remove("active");
     nav_mask.classList.remove("active");  
 }
QuestionDesignItems.forEach((QuestionDesignItem) => {
    QuestionDesignItem.addEventListener('click',() => {
        QuestionDesignItemsHandler(QuestionDesignItem.className.split(" ")[1])
    })
})
nav_mask.addEventListener("click" , folder_mask_close_panel);
folder_cancel_button.forEach((item,index) => { item.addEventListener('click',folder_mask_close_panel) });
remove_folder_confirm_btn.addEventListener('click',() => {
    DeleteQuestionItemHandler(deleteQuestionInfo)
})
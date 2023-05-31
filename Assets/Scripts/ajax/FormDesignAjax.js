import { getRequest , deleteRequest } from "./ajaxRequsts.js";
import { baseUrl } from "./ajaxRequsts.js";

const SelectedQuestionnaire = JSON.parse(localStorage.getItem("SelectedQuestionnaire"));
const getQuestionsUrl = baseUrl + '/question-api/questionnaires/';
const delQuestionUrl = baseUrl + `/question-api/questionnaires/${SelectedQuestionnaire.uuid}/`;

const QuestionnaireName = document.querySelector(".navbar-codinto-title");
const QuestionDesignItems = document.querySelectorAll(".QuestionDesignItem");
const QuestionsBoxContainer = document.querySelector(".QuestionsBox");
const remove_folder_confirm_btn = document.querySelector(".removeFolderPopUp .confirm-button");
const remove_folder_popup = document.querySelector(".removeFolderPopUp");
const folder_cancel_button = document.querySelectorAll(".cancel-button");
const AssistiveButtons = document.querySelector('.AssistiveButton .AssistiveItems button');


let deleteQuestionInfo;
QuestionnaireName.textContent = SelectedQuestionnaire.name;

const QuestionItemGenerator = (Question,QuestionOrderNumber) => {
    let QuestionItemContainer = document.createElement('div');
    QuestionItemContainer.setAttribute("id","Question" + Question.id,QuestionOrderNumber);
    QuestionItemContainer.classList.add("Questionitem",Question.question_type);
    $(QuestionItemContainer).hide(10);
    let QuestionItemChildrenClassNames = ['QuestionLabel','QuestionitemText','QuestionTools'];
    for(let i = 0;i <= 2; i++)
    {
       let QuestionItemChildDiv = document.createElement('div');
       QuestionItemChildDiv.classList.add(QuestionItemChildrenClassNames[i]);
        if(i === 0)
        {
            switch(Question.question_type)
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
            if(Question.question_type !== 'welcome-page' && Question.question_type !== 'thank-page')
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
                     'question_type' : Question.question_type,
                     'question_id' : Question.id,QuestionOrderNumber
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
            QuestionTitleText.textContent = Question.title;
            QuestionItemChildDiv.append(QuestionTitleText);
        }
         QuestionItemContainer.append(QuestionItemChildDiv);
    }
    QuestionsBoxContainer.append(QuestionItemContainer);
    $(QuestionItemContainer).fadeIn(200);


    QuestionItemContainer.addEventListener('click',() => {
        localStorage.setItem("ACTION-TYPE",'Edit');
        localStorage.setItem("QuestionData",JSON.stringify(Question));
        QuestionDesignOpener(Question.question_type);
    })

}
const QuestionItemCleaner = () => {
    const QuestionItems = document.querySelectorAll(".Questionitem");
    QuestionItems.forEach((QuestionItem) => {
        $(QuestionItem).hide(10);
        QuestionItem.remove();
    })
}
const QuestionItemSetter = async () => {
    try
    {
        let QuestionsResponse = await getRequest(getQuestionsUrl + SelectedQuestionnaire.uuid + '/');
        console.log(QuestionsResponse.data);
        if(QuestionsResponse.data.welcome_page)
        {
            let WelcomePage = QuestionsResponse.data.welcome_page;
            WelcomePage.question_type = 'welcome-page';
            QuestionItemGenerator(WelcomePage,WelcomePage.id);
        }
         if(QuestionsResponse.data.thanks_page)
         {
            let ThankPage = QuestionsResponse.data.thanks_page;
            ThankPage.question_type = 'thank-page'
            QuestionItemGenerator(ThankPage,ThankPage.id);
            
         }
        if(QuestionsResponse.data.questions.length !== 0)
        {
            QuestionsResponse.data.questions.forEach((Question,index) => {
                QuestionItemGenerator(Question.question,index);

            })
        }
        else if(QuestionsResponse.data.questions.length === 0 && !QuestionsResponse.data.welcome_page &&
            !QuestionsResponse.data.thanks_page
            )
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
const QuestionDesignOpener = (QuestionType) =>
{   
    console.log(QuestionType)
    switch(QuestionType)
    {
        case 'welcome-page': 
            window.open("/Pages/Greetingdesign.html","_Self");
            break;
        case 'text_answer':
            window.open("/Pages/QuestionWAnwser.html","_Self");
            break;
        case 'integer_range':
            window.open("/Pages/RangeAnswer.html","_Self");
            break;
        case 'file':
            window.open("/Pages/uploadPage.html","_Self");
            break;
        case 'number_answer':
            window.open("/Pages/NumberPage.html","_Self");
            break;
        case 'link':
            window.open("/Pages/Link.html","_Self");
            break;
        case 'multiple-option':
            window.open("/Pages/MultipleOption.html","_Self");
            break;
        case 'thank-page':
            window.open("/Pages/thanks.html","_Self");
            break;
    }
}
const QuestionDesignItemsHandler = (QuestionType) => {
    localStorage.setItem("QuestionnaireUUID",SelectedQuestionnaire.uuid)
    localStorage.setItem("ACTION-TYPE",'Create');
    QuestionDesignOpener(QuestionType);
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
        case 'thank-page':
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'thanks-pages/' + QuestionInfo.question_id + '/');
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
            QuestionItemCleaner()
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
QuestionItemSetter();
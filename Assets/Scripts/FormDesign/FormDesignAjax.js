import { getRequest , deleteRequest } from "../ajax/ajaxRequsts.js";
import { baseUrl } from "../ajax/ajaxRequsts.js";
import { deleteQuestionInfo } from "./QuestionItemRemover.js";
import { QuestionItemGenerator } from "./QuestionItemLoader.js";
import DeleteQuestionItemHandler from "./QuestionItemRemover.js";
import { QuestionDesignOpener } from "./QuestionItemLoader.js";

const SelectedQuestionnaire = JSON.parse(localStorage.getItem("SelectedQuestionnaire"));
const getQuestionsUrl = baseUrl + '/question-api/questionnaires/';
export const delQuestionUrl = baseUrl + `/question-api/questionnaires/${SelectedQuestionnaire.uuid}/`;

const QuestionnaireName = document.querySelector(".navbar-codinto-title");
const QuestionDesignItems = document.querySelectorAll(".QuestionDesignItem");
const QuestionsBoxContainer = document.querySelector(".QuestionsBox");
const remove_folder_confirm_btn = document.querySelector(".removeFolderPopUp .confirm-button");
const remove_folder_popup = document.querySelector(".removeFolderPopUp");
const folder_cancel_button = document.querySelectorAll(".cancel-button");
const AssistiveButtons = document.querySelectorAll('.AssistiveButton .AssistiveItems button');

QuestionnaireName.textContent = SelectedQuestionnaire.name;

export const QuestionItemCleaner = () => {
    const QuestionItems = document.querySelectorAll(".Questionitem");
    QuestionItems.forEach((QuestionItem) => {
        $(QuestionItem).hide(10);
        QuestionItem.remove();
    })
}
export const QuestionItemSetter = async () => {
    console.log( SelectedQuestionnaire.uuid)
        let QuestionsResponse = await getRequest(getQuestionsUrl + SelectedQuestionnaire.uuid + '/');
        if(QuestionsResponse)
        {
            if(QuestionsResponse.welcome_page)
            {
                let WelcomePage = QuestionsResponse.welcome_page;
                WelcomePage.question_type = 'welcome-page';
                QuestionItemGenerator(WelcomePage,WelcomePage.id);
            }
             if(QuestionsResponse.thanks_page)
             {
                let ThankPage = QuestionsResponse.thanks_page;
                ThankPage.question_type = 'thank-page'
                QuestionItemGenerator(ThankPage,ThankPage.id);
                
             }
            if(QuestionsResponse.questions.length !== 0)
            {
                QuestionsResponse.questions.forEach((Question,index) => {
                    QuestionItemGenerator(Question.question,index);
    
                })
            }
            else if(QuestionsResponse.questions.length === 0 && !QuestionsResponse.welcome_page &&
                !QuestionsResponse.thanks_page
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
        
        let loading = document.getElementById('loading-animation');
        loading.classList.add('hide');
}

const QuestionDesignItemsHandler = (QuestionType) => {
    localStorage.setItem("QuestionnaireUUID",SelectedQuestionnaire.uuid);
    localStorage.setItem("ACTION-TYPE",'Create');
    QuestionDesignOpener(QuestionType);
}
export const folder_mask_close_panel = () => {
     if(remove_folder_popup.classList.contains("active"))
         remove_folder_popup.classList.remove("active");
     nav_mask.classList.remove("active");
}
QuestionDesignItems.forEach((QuestionDesignItem) => {
    QuestionDesignItem.addEventListener('click',() => {
        QuestionDesignItemsHandler(QuestionDesignItem.className.split(" ")[1])
    });
});
nav_mask.addEventListener("click" , folder_mask_close_panel);
folder_cancel_button.forEach((item,index) => { item.addEventListener('click',folder_mask_close_panel) });
remove_folder_confirm_btn.addEventListener('click',() => {
    DeleteQuestionItemHandler(deleteQuestionInfo)
});

AssistiveButtons[1].addEventListener('click',() => {
    window.open("/Pages/Setting.html","_Self")
});
QuestionItemSetter();
export default { QuestionItemSetter , QuestionDesignItemsHandler};
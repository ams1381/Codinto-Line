import { getRequest , deleteRequest } from "../ajax/ajaxRequsts.js";
import { baseUrl } from "../ajax/ajaxRequsts.js";
import { deleteQuestionInfo } from "./QuestionItemRemover.js";
import { QuestionItemGenerator } from "./QuestionItemLoader.js";
import DeleteQuestionItemHandler from "./QuestionItemRemover.js";
import { QuestionDesignOpener } from "./QuestionItemLoader.js";
import { showAlert } from "../Question Design Pages/CommonActions.js";

const SelectedQuestionnaire = JSON.parse(localStorage.getItem("SelectedQuestionnaire"));
const getQuestionsUrl = baseUrl + '/question-api/questionnaires/';
const block_side = document.querySelector('.block__side')
const block_main = document.querySelector('.block__main')
export const delQuestionUrl = baseUrl + `/question-api/questionnaires/${SelectedQuestionnaire.uuid}/`;
const AssistiveToggleButton = document.querySelector(".AssistiveToggleButton");
const close_side_panel_button = document.querySelector('.close_side_penel');
const QuestionnaireName = document.querySelector(".navbar-codinto-title");
const QuestionDesignItems = document.querySelectorAll(".QuestionDesignItem");
const QuestionsBoxContainer = document.querySelector(".QuestionsBox");
const remove_folder_confirm_btn = document.querySelector(".removeFolderPopUp .confirm-button");
const remove_folder_popup = document.querySelector(".removeFolderPopUp");
const folder_cancel_button = document.querySelectorAll(".cancel-button");
const questionnaire_preview_button = document.querySelector('.viewFormQuestions');
const AssistiveButtons = document.querySelectorAll('.AssistiveButton .AssistiveItems button');
console.log(SelectedQuestionnaire)
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
const questionnaire_retriever = async () => {
   return await getRequest(baseUrl + `/question-api/questionnaires/${SelectedQuestionnaire.uuid}/`);
}
const QuestionDesignItemsHandler = async (QuestionType) => {
    localStorage.setItem("QuestionnaireUUID",SelectedQuestionnaire.uuid);
    localStorage.setItem("ACTION-TYPE",'Create');
    localStorage.removeItem("QuestionData");
    let questionnaire_retrieved = await questionnaire_retriever();
    if(QuestionType == 'welcome-page' && questionnaire_retrieved.welcome_page)
    {
        showAlert("صفحه ی خوش آمد گویی وجود دارد.");
        return
    }
        
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

window.addEventListener('resize',() => {
    if(window.innerWidth > 770)
    {
        block_side.classList.remove('add_question_active');
        $(block_main).show(120);
    }
        
})

AssistiveToggleButton.addEventListener('click',() => {
    block_side.classList.add('add_question_active');
    $(block_main).hide(120);
})
close_side_panel_button.addEventListener('click',() => {
    block_side.classList.remove('add_question_active');
    $(block_main).show(120);
})
questionnaire_preview_button.addEventListener('click',() => {
    window.open("/Pages/AnswerPage.html");
    localStorage.setItem("questionnaire_for_preview",JSON.stringify(SelectedQuestionnaire));
})

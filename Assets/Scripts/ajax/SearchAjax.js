import { baseUrl, getRequest } from "./ajaxRequsts.js";
import { folderUrl } from "./FoldersAjax.js";
import { questionnaire_generator } from './QuestionnaireAjax.js'
const searchReq = baseUrl + '/question-api/search-questionnaires/?search=';
const getQuestionnairesUrl = baseUrl + '/question-api/questionnaires/';

const FormContainer= document.querySelector('.FormsManagement');
const search_Questionnaire_input = document.querySelector("#search-input");
const search_Questionnaire_button = document.querySelector(".FolderSearch");
const search_Questionnaire_container = document.querySelector(".search-box");
const nav_search_container = document.querySelector(".navTitle");
let addFormItem = document.querySelector(".form.AddForm")
console.log(FormContainer)
const QuestionnaireCleaner = () => {
    let QuestionnaireForms = document.querySelectorAll('.form');
    QuestionnaireForms.forEach((item) => {
            $(item).hide()
            item.remove();
    })
}
const QuestionnaireReloader = async () => {
    let FoldersRes = await getRequest(folderUrl);
    let SelectedForm = document.querySelector(".Selected.Folder");
    let ResDataArray = FoldersRes.data;
      if(ResDataArray.length != 0)
      {
        ResDataArray.forEach((item) => {
            if(item.id == SelectedForm.getAttribute("id"))
                    item.questionnaires.forEach((questionnaire) => {
                        questionnaire_generator(questionnaire);
                        FormContainer.append(addFormItem);
                        $(addFormItem).show(100)
                    })
            });
      }
}
const QuestionnaireSearchHandler = async (e) => {
    try
    {
        let searchRes = await getRequest(searchReq + e.target.value);
        searchRes.data.forEach((SearchResultItem) => {
            QuestionnaireCleaner();
            questionnaire_generator(SearchResultItem)
        })   
    }
    catch(err)
    {
        console.log(err)
    }
}



const search_button_handler = () => {
    nav_search_container.classList.toggle("search-active");

    if(search_Questionnaire_button.classList.contains("search-active"))
    {
        search_Questionnaire_button.classList.remove("search-active");
        search_Questionnaire_input.removeEventListener('input',QuestionnaireSearchHandler);
        QuestionnaireCleaner();
        QuestionnaireReloader();
    }
    else if(!search_Questionnaire_button.classList.contains("search-active"))
    {
        search_Questionnaire_button.classList.add("search-active");
        QuestionnaireCleaner();
        search_Questionnaire_input.addEventListener('input',QuestionnaireSearchHandler);
    }

    search_Questionnaire_container.classList.toggle("search-active");
}
search_Questionnaire_button.addEventListener("click",search_button_handler)
import { baseUrl } from "../ajax/ajaxRequsts.js";
import { getRequest } from "../ajax/ajaxRequsts.js";
import { folderUrl } from "./FoldersGetter.js";
import { questionnaire_generator } from "./QuestionnaireAjax.js";
const searchReq = baseUrl + '/question-api/search-questionnaires/?search=';
const getQuestionnairesUrl = baseUrl + '/question-api/questionnaires/';

const FormContainer= document.querySelector('.FormsManagement');
const search_Questionnaire_input = document.querySelector("#search-input");
const search_Questionnaire_container = document.querySelector(".search-box");
const nav_search_container = document.querySelector(".navTitle");
let addFormItem = document.querySelector(".form.AddForm")

const QuestionnaireCleaner = () => {
    let QuestionnaireForms = document.querySelectorAll('.form');
    QuestionnaireForms.forEach((item) => {
    if(!item.classList.contains("AddForm"))
    {
        $(item).hide()
        item.remove();
    }        
 })
}
const QuestionnaireReloader = async () => {
    let FoldersRes = await getRequest(folderUrl);
    let SelectedForm = document.querySelector(".Selected.Folder");
    let ResDataArray = FoldersRes;
      if(ResDataArray && ResDataArray.length)
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
    if(e.target.value)
        try
        {
            let searchRes = await getRequest(searchReq + e.target.value);
            QuestionnaireCleaner();
            if(searchRes)
                searchRes.forEach((SearchResultItem) => {  
                    questionnaire_generator(SearchResultItem)
                })   
        }
        catch(err)
        {
            console.log(err)
        }
}
export const search_button_handler = async (SearchButton) => {
    nav_search_container.classList.toggle("search-active");

        if(SearchButton.classList.contains("search-active"))
        {
            SearchButton.classList.remove("search-active");
            search_Questionnaire_input.removeEventListener('input',QuestionnaireSearchHandler);
            QuestionnaireCleaner();
            await QuestionnaireReloader();
        }
        else if(!SearchButton.classList.contains("search-active"))
        {
            SearchButton.classList.add("search-active");
            search_Questionnaire_input.focus();
            QuestionnaireCleaner();
            search_Questionnaire_input.addEventListener('input',QuestionnaireSearchHandler);
        }

    

    search_Questionnaire_container.classList.toggle("search-active");
}

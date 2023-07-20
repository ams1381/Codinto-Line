import {deleteRequest} from "../ajax/ajaxRequsts.js";
import {baseUrl} from "../ajax/ajaxRequsts.js";
const DeleteUrl = `${baseUrl}/question-api/questionnaires/`

const main_questionnaire_container = document.querySelector('.block__main .FormsManagement');
export const questionnairesUrl = '/question-api/questionnaires/';
export const questionnaire_generator = (Questionnaire) => {
    const Questionnaire_Element_Item  = `
    <div id="Questionnaire${Questionnaire.id}" class="form" style="">
        <p>${Questionnaire.name}</p>
        <div class="form_edit">
            <button class="form_delete">حذف</button>
            <button class="form_preview">پیش نمایش</button>
            <button class="form_setting_edit">تنظیمات</button>
            <button class="form_show_answer">مشاهده نتایج</button>
            <button class="form_edit_cancel">
                <i class="close_icon">
                <svg class="close_svg" fill="#3F52E3" width="24" height="24" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM21.657 10.344c-0.39-0.39-1.023-0.39-1.414 0l-4.242 4.242-4.242-4.242c-0.39-0.39-1.024-0.39-1.415 0s-0.39 1.024 0 1.414l4.242 4.242-4.242 4.242c-0.39 0.39-0.39 1.024 0 1.414s1.024 0.39 1.415 0l4.242-4.242 4.242 4.242c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.414l-4.242-4.242 4.242-4.242c0.391-0.391 0.391-1.024 0-1.414z"></path> </g></svg>
                </i>
            </button>
        </div>
        <button class="form_edit_toggle_button">
             <i class = "sliders_icon">
                <svg class="sliders_svg" fill="#3F52E3" width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M23,4a1,1,0,0,1-1,1H19a1,1,0,0,1,0-2h3A1,1,0,0,1,23,4ZM2,3h8.184a3,3,0,1,1,0,2H2A1,1,0,0,1,2,3ZM12,4a1,1,0,1,0,1-1A1,1,0,0,0,12,4ZM1,12a1,1,0,0,1,1-1H6.184a3,3,0,1,1,0,2H2A1,1,0,0,1,1,12Zm7,0a1,1,0,1,0,1-1A1,1,0,0,0,8,12Zm14-1H15a1,1,0,0,0,0,2h7a1,1,0,0,0,0-2Zm0,8H17a1,1,0,0,0,0,2h5a1,1,0,0,0,0-2ZM1,20a1,1,0,0,1,1-1H8.184a3,3,0,1,1,0,2H2A1,1,0,0,1,1,20Zm9,0a1,1,0,1,0,1-1A1,1,0,0,0,10,20Z"></path></g></svg>
             </i>
        </button>
    </div>`
    const parser = new DOMParser();
    const parsed_questionnaire_element_item = parser.parseFromString((Questionnaire_Element_Item),'text/html').firstChild.lastChild.lastChild;

   $(parsed_questionnaire_element_item).hide(10);
    main_questionnaire_container.prepend(parsed_questionnaire_element_item);
    $(parsed_questionnaire_element_item).show(200);
    $('.block__main').removeClass('loading')
    $('.block__main #loading-animation').addClass('hide');
    let questionnaire = document.getElementById(`Questionnaire${Questionnaire.id}`);
    let form_edit_toggle_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_edit_toggle_button`);
    let form_edit_cancel_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_edit_cancel`);
    let form_edit_preview_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_preview`);
    let form_edit_delete_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_delete`);
    let form_setting_edit_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_setting_edit`);
    let form_show_result_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_show_answer`)

        questionnaire.addEventListener('click',(e) => {
            if(e.target.className == 'form' || e.target instanceof HTMLParagraphElement)
            {
                window.open("/Pages/FormDesign.html","_self");
                localStorage.setItem("SelectedQuestionnaire",JSON.stringify(Questionnaire));
            }
        })
        form_edit_delete_button.addEventListener('click',() => {
            questionnaire_remove_handler(Questionnaire.uuid,Questionnaire.id)
        })
        form_edit_preview_button.addEventListener('click',(e) => {
           window.open("/Pages/AnswerPage.html");
            localStorage.setItem("questionnaire_for_preview",JSON.stringify(Questionnaire));
        })
        form_edit_cancel_button.addEventListener("click",() => {
            form_edit_panel_handler('close',Questionnaire.id);
        })
        form_edit_toggle_button.addEventListener('click',() => {
            form_edit_panel_handler('open',Questionnaire.id);
        })
        form_setting_edit_button.addEventListener('click',() => {
            localStorage.setItem('QuestionnaireToEdit',JSON.stringify(Questionnaire));
            window.open('Setting.html',"_Self");
        })
        form_show_result_button.addEventListener('click',() => {
            window.open("/Pages/ShowResult.html","_Self");
            localStorage.setItem('QuestionnaireToShowResult',JSON.stringify(Questionnaire));
        })
        
}
const questionnaire_remove_handler = async (questionnaireUUID,questionnaireID) => {
    let delRes = await deleteRequest(DeleteUrl + questionnaireUUID + '/');

    let deleted_questionnaire = document.getElementById(`Questionnaire${questionnaireID}`);
    if(delRes == 204)
    {
        $(deleted_questionnaire).hide(200,() => {
            deleted_questionnaire.remove();
        })
    }
}
const form_edit_panel_handler = (ACTION,index) => {
    let selected_questionnaire = document.getElementById('Questionnaire' + index);
    let selected_edit_panel = document.querySelector(`#Questionnaire${index} .form_edit`);
    switch (ACTION)
    {
        case 'open' :
            selected_questionnaire.classList.add('editActive');
            selected_edit_panel.classList.add('active');
            break;
        case 'close' :
            selected_questionnaire.classList.remove('editActive');
            selected_edit_panel.classList.remove('active');
            break;
    }
}
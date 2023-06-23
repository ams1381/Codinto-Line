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
            <button class="form_preview">نمایش</button>
            <button class="form_setting_edit">ویرایش</button>
            <button class="form_show_answer">مشاهده نتایج</button>
            <button class="form_edit_cancel">
                <i class="fa fa-close"></i>
            </button>
        </div>
        <button class="form_edit_toggle_button">
             <i class="fa fa-sliders"></i>
        </button>
    </div>`
    const parser = new DOMParser();
    const parsed_questionnaire_element_item = parser.parseFromString((Questionnaire_Element_Item),'text/html').firstChild.lastChild.lastChild;

    $(parsed_questionnaire_element_item).hide(40);
    main_questionnaire_container.prepend(parsed_questionnaire_element_item);
    $(parsed_questionnaire_element_item).fadeIn(100);

    let form_edit_toggle_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_edit_toggle_button`);
    let form_edit_cancel_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_edit_cancel`);
    let form_edit_preview_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_preview`);
    let form_edit_delete_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_delete`);
    let form_setting_edit_button = document.querySelector(`#Questionnaire${Questionnaire.id} .form_setting_edit`);

        form_edit_delete_button.addEventListener('click',() => {
            questionnaire_remove_handler(Questionnaire.uuid,Questionnaire.id)
        })
        form_edit_preview_button.addEventListener('click',() => {
            window.open("/Pages/FormDesign.html","_self");
            localStorage.setItem("SelectedQuestionnaire",JSON.stringify(Questionnaire))
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
const questionnaire_edit_handler = () => {

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
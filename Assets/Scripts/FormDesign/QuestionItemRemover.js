import { deleteRequest } from "../ajax/ajaxRequsts.js";
import { delQuestionUrl , QuestionItemSetter } from "./FormDesignAjax.js";
import { QuestionItemCleaner } from "./FormDesignAjax.js";
import { folder_mask_close_panel } from "./FormDesignAjax.js";
const remove_folder_popup = document.querySelector(".removeFolderPopUp");
export let deleteQuestionInfo;

const remove_folder_popup_handler = (QuestionType,QuestionId) => {
    remove_folder_popup.classList.add("active");
    nav_mask.classList.add("active");
}
export const remove_eventListener_setter = (delete_button_element,question_type,QuestionOrderNumber) => {
    delete_button_element.addEventListener('click',() => {
        remove_folder_popup_handler();
        deleteQuestionInfo = {
                'question_type' : question_type,
                'question_id' : QuestionOrderNumber
                }
    })
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
        case 'no_answer':
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'noanswer-questions/' + QuestionInfo.question_id + '/');
            break;
        case 'drop_down':
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'dropdown-questions/' + QuestionInfo.question_id + '/');
            break;
        case 'number_answer' : 
            deleteQuestionRes = await deleteRequest(delQuestionUrl + 'numberanswer-questions/' + QuestionInfo.question_id + '/');
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
    if(deleteQuestionRes == 204)
        {
            $(deleteQuestionHTMLItem).hide(100);
            deleteQuestionHTMLItem.remove();
            folder_mask_close_panel();
            QuestionItemCleaner()
            QuestionItemSetter();
        }
}
export default DeleteQuestionItemHandler;
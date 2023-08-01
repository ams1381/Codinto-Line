import {baseUrl, patchRequest, postRequest} from "../../ajax/ajaxRequsts.js";
const save_button = document.querySelector(".saveQuestion");
export const form_data_convertor = (obj, formData, namespace) => {
    let form_Data = new FormData();
    namespace = namespace || '';
    for (let property in obj) {
        if (Array.isArray(obj[property])) {
            obj[property].map((item, i) => {
                form_Data.append(`${property}[${i}]text`, item.text !== null ? item.text : 'null')
            })
        } else {
            if (obj[property] !== null) {
                form_Data.append(property, obj[property] !== null ? obj[property] : 'null')
            }
        }
    }

    return form_Data;
}
export const question_creator = async (ACTION_TYPE, Question, QuestionPostType, QuestionnaireUUID, DataForPost) => {
    save_button.classList.add('saving');
    let createRes;
    try {
        switch (ACTION_TYPE) {
            case 'Edit':
                createRes = await patchRequest(`${baseUrl}/question-api/questionnaires/${QuestionnaireUUID}/${QuestionPostType}/${Question.id}/`, form_data_convertor(Question));
                break;
            case 'Create':
                createRes = await postRequest(`${baseUrl}/question-api/questionnaires/${QuestionnaireUUID}/${QuestionPostType}/`, 'multipart/form-data', form_data_convertor(DataForPost));
                break;
            case 'Copy':
                console.log([...form_data_convertor(Question)])
                createRes = await postRequest(`${baseUrl}/question-api/questionnaires/${QuestionnaireUUID}/${QuestionPostType}/`, 'multipart/form-data', form_data_convertor(Question));
                break;
        }
        save_button.classList.remove('saving');
        if ((createRes.status == 201 || createRes.status == 200)) {
            window.open("/Pages/FormDesign.html", "_Self");
        }
    } catch (err) {
        save_button.classList.remove('saving');
        return;
    }
}
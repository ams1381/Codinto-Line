import {deleteRequest} from "./ajaxRequsts.js";
import {baseUrl} from "./ajaxRequsts.js";
const DeleteUrl = `${baseUrl}/question-api/questionnaires/`

const questionnaire_edit_panels = document.querySelectorAll('.form .form_edit');
const edit_panel_open_buttons = document.querySelectorAll('.form .form_edit_toggle_button');
const edit_panel_close_buttons = document.querySelectorAll('.form  .form_edit_cancel');
const main_questionnaire_container = document.querySelector('.block__main .FormsManagement');
export const questionnairesUrl = '/question-api/questionnaires/';
export const questionnaire_generator = (Questionnaire) => {
    let questionnaireDiv = document.createElement('div');
    let questionnaireName = document.createElement('p');
    let questionnaire_edit_panel = document.createElement('div');
    let questionnaire_edit_panel_open_button = document.createElement('button')
    let questionnaire_edit_panel_open_icon = document.createElement('i');

    let questionnaire_edit_buttons_cNames = [
        'form_delete',
        'form_preview',
        'form_rename',
        'form_show_answer'
        ,'form_edit_cancel'
    ];
    let questionnaire_edit_buttons_textContents = [
        'حذف',
        'نمایش',
        'ویرایش نام',
        'مشاهده نتایج',
    ]
    questionnaire_edit_panel.className = 'form_edit';
    for(let i = 0;i<5;i++)
    {
        let questionnaire_edit_button = document.createElement('button');
        questionnaire_edit_button.className = questionnaire_edit_buttons_cNames[i];
        questionnaire_edit_button.textContent = questionnaire_edit_buttons_textContents[i];
        if(i === 0)
        {
            questionnaire_edit_button.addEventListener('click',() => {
                questionnaire_remove_handler(Questionnaire.uuid,Questionnaire.id);
            })
        }
        if(i === 4) {
            let panel_close_icon = document.createElement('i');
            panel_close_icon.className = 'fa fa-close';
            questionnaire_edit_button.append(panel_close_icon);
            questionnaire_edit_button.addEventListener('click',() => {
                form_edit_panel_handler('close',Questionnaire.id);
            })
        }
        if(i === 1)
            {
                questionnaire_edit_button.addEventListener('click',() => {
                    window.open("/Pages/FormDesign.html","_self");
                    localStorage.setItem("SelectedQuestionnaire",JSON.stringify(Questionnaire))
                })
            }
        questionnaire_edit_panel.append(questionnaire_edit_button);
    }
    questionnaire_edit_panel_open_button.className = 'form_edit_toggle_button';

    questionnaire_edit_panel_open_icon.className = 'fa fa-sliders';

    questionnaireDiv.setAttribute('id','Questionnaire' + Questionnaire.id);
    questionnaireName.textContent = Questionnaire.name;
    $(questionnaireDiv).hide(50);
    questionnaire_edit_panel_open_button.append(questionnaire_edit_panel_open_icon);
    questionnaireDiv.append(questionnaireName , questionnaire_edit_panel , questionnaire_edit_panel_open_button);

    questionnaireDiv.classList.add('form')
    main_questionnaire_container.prepend(questionnaireDiv);

    $(questionnaireDiv).fadeIn(100);
    // questionnaireDiv.addEventListener('click',(e) => {
    //     if(!questionnaire_edit_panel.classList.contains("active"))
    //     {
            
    //     }
    //     console.log((e.target.classList[1] !== 'fa-close'))
    // })


    questionnaire_edit_panel_open_button.addEventListener('click',() => {
        form_edit_panel_handler('open',Questionnaire.id)
    });

}

const questionnaire_remove_handler = async (questionnaireUUID,questionnaireID) => {
    console.log(DeleteUrl + questionnaireUUID)
   let delRes = await deleteRequest(DeleteUrl + questionnaireUUID);

    let deleted_questionnaire = document.getElementById(`Questionnaire${questionnaireID}`);
    if(delRes.status === 204)
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
edit_panel_open_buttons.forEach((item,index) => {
    item.addEventListener('click',() => form_edit_panel_handler('open',index));
});
edit_panel_close_buttons.forEach((item,index) => {
    item.addEventListener('click',() => form_edit_panel_handler('close',index));
});
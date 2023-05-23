const questionnaires = document.querySelectorAll('.form');
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
        if(i === 4) {
            let panel_close_icon = document.createElement('i');
            panel_close_icon.className = 'fa fa-close';
            questionnaire_edit_button.append(panel_close_icon);
            questionnaire_edit_button.addEventListener('click',() => {
                form_edit_panel_handler('close',Questionnaire.id);
            })

        }
        questionnaire_edit_panel.append(questionnaire_edit_button);

    }
    questionnaire_edit_panel_open_button.className = 'form_edit_toggle_button';

    questionnaire_edit_panel_open_icon.className = 'fa fa-sliders';

    questionnaireDiv.setAttribute('id','Questionnaire' + Questionnaire.id);
    questionnaireName.textContent = Questionnaire.name;

    questionnaire_edit_panel_open_button.append(questionnaire_edit_panel_open_icon);
    questionnaireDiv.append(questionnaireName , questionnaire_edit_panel , questionnaire_edit_panel_open_button);
    questionnaireDiv.classList.add('form')
    main_questionnaire_container.prepend(questionnaireDiv);

    questionnaire_edit_panel_open_button.addEventListener('click',() => {
        form_edit_panel_handler('open',Questionnaire.id)
    });
}
export const questionnaire_reLoader = () => {
    questionnaires.forEach((item) => {
         if(!item.classList.contains('AddForm'))
             item.remove();
    })
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
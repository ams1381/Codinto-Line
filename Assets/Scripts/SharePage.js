const link_to_copy = document.querySelector(".link_label_text");
const copy_button = document.querySelector(".link_label .copy_button");
const QuestionnaireUUID = JSON.parse(localStorage.getItem("questionnaire_for_share")).uuid;
const sharing_links = document.querySelectorAll('.social_media_icon a');


const copy_link_handler = () => {
    navigator.clipboard.writeText(link_to_copy.textContent);
    copy_button.textContent = 'کپی شد'
}
link_to_copy.textContent = `codinto-like.codinguy.ir/Pages/AnswerPage.html?Questionnaireuuid=${QuestionnaireUUID}`;
link_to_copy.addEventListener('click', copy_link_handler)
copy_button.addEventListener('click', copy_link_handler)

sharing_links.forEach((sharing_link) => {
    switch(sharing_link.parentElement.classList[1])
    {
        case 'telegram':
            sharing_link.setAttribute(`href`,`https://t.me/share/url?url=codinto-like.codinguy.ir/Pages/AnswerPage.html?Questionnaireuuid=${QuestionnaireUUID}&text=لطفا در این پرسشنامه شرکت کنید"`);
            break;
        case 'eaita':
            sharing_link.setAttribute(`href`,`https://eitaa.com/share/url?url=codinto-like.codinguy.ir/Pages/AnswerPage.html?Questionnaireuuid=${QuestionnaireUUID}&text=لطفا در این پرسشنامه شرکت کنید`);
            break;
    }
})
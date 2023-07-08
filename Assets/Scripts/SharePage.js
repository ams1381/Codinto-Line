const link_to_copy = document.querySelector(".link_label_text");
const copy_button = document.querySelector(".link_label .copy_button");
const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");

const copy_link_handler = () => {
    navigator.clipboard.writeText(link_to_copy.textContent);
    copy_button.textContent = 'کپی شد'
}
link_to_copy.textContent = `codinto-like.codinguy.ir/Pages/AnswerPage.html?Questionnaireuuid=${QuestionnaireUUID}`;
link_to_copy.addEventListener('click', copy_link_handler)
copy_button.addEventListener('click', copy_link_handler)
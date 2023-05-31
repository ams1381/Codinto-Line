import { getRequest } from "./ajaxRequsts.js";
import { baseUrl } from "./ajaxRequsts.js";

const SelectedQuestionnaire = JSON.parse(localStorage.getItem("SelectedQuestionnaire"));
const getQuestionsUrl = baseUrl + '/question-api/questionnaires/';
const delQuestionUrl = baseUrl + `/question-api/questionnaires/${SelectedQuestionnaire}/integerrange-questions/`
console.log(SelectedQuestionnaire.uuid)

const QuestionnaireName = document.querySelector(".navbar-codinto-title");
const QuestionDesignItems = document.querySelectorAll(".QuestionDesignItem");
const QuestionsBoxContainer = document.querySelector(".QuestionsBox");

QuestionnaireName.textContent = SelectedQuestionnaire.name;
console.log()

const QuestionItemGenerator = (QuestionType,QuestionTitle,QuestionNumber) => {
    let QuestionItemContainer = document.createElement('div');
    QuestionItemContainer.setAttribute("id","Question" + QuestionNumber);
    QuestionItemContainer.classList.add("Questionitem",QuestionType);
    $(QuestionItemContainer).hide(10);
    let QuestionItemChildrenClassNames = ['QuestionLabel','QuestionitemText','QuestionTools'];
    for(let i = 0;i <= 2; i++)
    {
       let QuestionItemChildDiv = document.createElement('div');
       QuestionItemChildDiv.classList.add(QuestionItemChildrenClassNames[i]);
       if(i == 0 && !QuestionType)
        {

                    let handshakeIcon = document.createElement('i');
                    handshakeIcon.className = 'fa fa-handshake-o';
                    QuestionItemChildDiv.append(handshakeIcon);
                    break;
                //     let thankIcon = document.createElement('img');
                //     thankIcon.setAttribute("src",'../Assets/img/ThankIcon.svg')
                //     QuestionItemChildDiv.append(thankIcon);
                    
        }
        else if(i == 0 && QuestionType)
          QuestionItemChildDiv.textContent = QuestionNumber;
        
        if(i == 2)
        {
            if(QuestionType !== 'welcome-page' || QuestionType !== 'thank-page')
            {
                let copyButton = document.createElement('button');
                copyButton.classList.add("EditButton");
                let copyButtonIcon = document.createElement("i");
                copyButtonIcon.className = 'fa fa-copy';
                copyButton.append(copyButtonIcon);
                QuestionItemChildDiv.append(copyButton);
            }
            let deleteButton = document.createElement('button')
            deleteButton.classList.add("DeleteButton");
            let deleteButtonIcon = document.createElement("i");
            deleteButtonIcon.className = 'fa fa-trash';
            deleteButton.append(deleteButtonIcon);
            QuestionItemChildDiv.append(deleteButton);
        }
        if(i === 1)
        {  
            let QuestionTitleText = document.createElement('p');
            QuestionTitleText.textContent = QuestionTitle;
            QuestionItemChildDiv.append(QuestionTitleText);
        }
        QuestionItemContainer.append(QuestionItemChildDiv);
    }
    QuestionsBoxContainer.append(QuestionItemContainer);
    $(QuestionItemContainer).fadeIn(200);
}
const QuestionItemSetter = async () => {
    try
    {
        let QuestionsResponse = await getRequest(getQuestionsUrl + SelectedQuestionnaire.uuid + '/');
        if(QuestionsResponse.data.questions.length !== 0)
        {
            QuestionsResponse.data.questions.forEach((Question) => {
                switch(Question.question.question_type)
                {
                    case 'integer_range':
                        QuestionItemGenerator('integer_range',Question.question.title,Question.question.id);
                        break;
                    case 'text_answer':
                        QuestionItemGenerator('text_answer',Question.question.title,Question.question.id);
                        break;
                    case 'sort':
                        QuestionItemGenerator('sort',Question.question.title,Question.question.id);
                        break;
                    case 'drop-down':
                        QuestionItemGenerator('sort',Question.question.title,Question.question.id);
                        break;
                    case 'link':
                        QuestionItemGenerator('sort',Question.question.title,Question.question.id);
                        break;
                    
                }
            })
        }
        else 
        {
            QuestionsBoxContainer.classList.add('emptyActive')
            let emptyListContainer = document.createElement('div');
            emptyListContainer.classList.add('emptyListContainer');

            let emptyListIcon = document.createElement('i');
            emptyListIcon.className = "fa fa-folder";
            emptyListIcon.classList.add('emptyListIcon')

            QuestionsBoxContainer.append(emptyListIcon)
            let emptyListMessage = document.createElement('p');
            emptyListMessage.textContent = 'سوالی جهت نمایش وجود ندارد';
            emptyListContainer.append(emptyListMessage)

            QuestionsBoxContainer.append(emptyListContainer);
        }
    }
    catch(err)
    {
        console.log(err)
    }
    finally 
    {
        let loading = document.getElementById('loading-animation');
        loading.classList.add('hide');
    }
    
    
    
}
QuestionItemSetter();

const QuestionDesignItemsHandler = (QuestionType) => {
    localStorage.setItem("QuestionnaireUUID",SelectedQuestionnaire.uuid)
    switch(QuestionType)
    {
        case 'welcome-page': 
            window.open("/Pages/Greetingdesign.html","_Self");
            break;
        case 'text-with-anwser':
            window.open("/Pages/QuestionWAnwser.html","_Self");
            break;
        case 'range-question':
            window.open("/Pages/RangeAnswer.html","_Self");
            break;
        case 'upload-question':
            window.open("/Pages/uploadPage.html","_Self");
            break;
        case 'number_answer':
            window.open("/Pages/NumberPage.html","_Self");
            break;
        case 'thank-page':
            window.open("/Pages/thanks.html","_Self");
            break;

}
}
const DeleteQuestionItemHandler = async () => {

}
QuestionDesignItems.forEach((QuestionDesignItem) => {
    QuestionDesignItem.addEventListener('click',() => {
        QuestionDesignItemsHandler(QuestionDesignItem.className.split(" ")[1])
    })
})
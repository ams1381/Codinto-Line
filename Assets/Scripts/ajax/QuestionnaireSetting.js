import {postRequest} from "./ajaxRequsts.js";
import {baseUrl} from "./ajaxRequsts.js";

const QuestionnaireNameInputs = document.querySelector(".form-name input");
const QuestionnaireTimerPicker = document.querySelector(".ResponeTiming .ResponePicker");
const QuestionnaireTimerInputsH = document.querySelector(".ResponeTiming .ResponePicker .RhourPicker input");
const QuestionnaireTimerInputsM = document.querySelector(".ResponeTiming .ResponePicker .RminutePicker input");
const QuestionnaireTimerInputsS = document.querySelector(".ResponeTiming .ResponePicker .RsecondPicker input");
const QuestionnaireProgressBar = document.querySelector(".ProgressBar .slider-button");
const QuestionnaireIsolator = document.querySelector(".Isolator .slider-button");
const QuestionnaireSeparatePagesInput = document.querySelector(".Isolator input");
const QuestionnaireStartDatePicker = document.querySelector(".start-picker");
const QuestionnaireEndDatePicker = document.querySelector(".end-picker");
const QuestionnaireSaveBtn = document.querySelector('.FormFooter .save-Form');
const QuestionnaireStartDateToggle = document.querySelector(".date-start .Switch-toggle .slider-button");

const QuestionnaireEndDateToggle = document.querySelector(".date-end .Switch-toggle .slider-button");

const QuestionnairePostData = {
    pub_date : null,
    end_date : null,
    timer : null,
    progress_bar : false,
    show_question_in_pages : false ,
    folder : localStorage.getItem("SelectedFolderID")
};
const create_questionnaire = async () => {
    if (QuestionnairePostData.pub_date !== null)
    {
        let publish_date = QuestionnairePostData.pub_date;
        let GregorianDate = farvardin.solarToGregorian(parseInt(publish_date.split("/")[0]) , parseInt(publish_date.split("/")[1]) , parseInt(publish_date.split("/")[2]));
        QuestionnairePostData.pub_date = GregorianDate[0] + '-' + GregorianDate[1] + '-' + GregorianDate[2];
    }
    if (QuestionnairePostData.end_date !== null)
    {
        let end_date = QuestionnairePostData.end_date;
        let GregorianDate = farvardin.solarToGregorian(parseInt(end_date.split("/")[0]) , parseInt(end_date.split("/")[1]) , parseInt(end_date.split("/")[2]));
        QuestionnairePostData.end_date = GregorianDate[0] + '-' + GregorianDate[1] + '-' + GregorianDate[2];
    }
    await postRequest(baseUrl + '/question-api/questionnaires/',QuestionnairePostData);

    window.open("FormDesign.html","_Self");
}
const QuestionnaireTimerToggleLabel = document.querySelector(".ResponeTiming .ResponseAutoSet .slider-button");
const QuestionnaireTimerToggleInput = document.querySelector(".ResponeTiming .ResponseAutoSet input");
let TimerSecond;
let TimerMinute;
let TimerHour;

const nameSetter = (e) => {
    QuestionnairePostData.name = e.target.value;
}
const TimerSetter = (e) => {
    switch(e.target.id)
    {
        case 'RhourInput':
            TimerHour = e.target.value; 
            break;
        case 'RminuteInput':
            TimerMinute = e.target.value;
            break;
        case 'RsecondInput':
            TimerSecond = e.target.value;
            break;
    }
    
    QuestionnairePostData.timer = 
    `${(TimerHour < 10) ? ('0' + TimerHour) : TimerHour}:` + 
    `${(TimerMinute < 10) ? ('0' + TimerMinute) : TimerMinute}:` + 
    `${(TimerSecond < 10) ? ('0' + TimerSecond) : TimerSecond}`;

}
const DateSetter = (e) => {
    let StartYear , endYear;
    let StartMonth , endMonth;
    let StartDay , endDay;

    let StartYearItems = document.querySelectorAll(".start-picker .YearPicker label");
    let StartMonthItems = document.querySelectorAll(".start-picker .MonthPicker label");
    let StartDayItems = document.querySelectorAll(".start-picker .DayPicker label");

    let endYearItems = document.querySelectorAll(".end-picker .YearPicker label");
    let endMonthItems = document.querySelectorAll(".end-picker .MonthPicker label");
    let endDayItems = document.querySelectorAll(".end-picker .DayPicker label");

    StartYearItems.forEach((item,index) => {
        item.addEventListener('click',() => {
            StartYear = item.textContent;
            QuestionnairePostData.pub_date = `${(StartYear < 10) ? ('0' + StartYear) : StartYear}/` + 
            `${(StartMonth < 10) ? ('0' + StartMonth) : StartMonth}/` + 
            `${(StartDay < 10) ? ('0' + StartDay) : StartDay}`;
        })
    })
    StartMonthItems.forEach((item,index) => {
        item.addEventListener('click',() => {
                StartMonth = index;
            QuestionnairePostData.pub_date = `${(StartYear < 10) ? ('0' + StartYear) : StartYear}/` + 
            `${(StartMonth < 10) ? ('0' + StartMonth) : StartMonth}/` + 
            `${(StartDay < 10) ? ('0' + StartDay) : StartDay}`;
        })
    })
    StartDayItems.forEach((item,index) => {
        item.addEventListener('click',() => {
            StartDay = item.textContent;
            QuestionnairePostData.pub_date = `${(StartYear < 10) ? ('0' + StartYear) : StartYear}/` + 
            `${(StartMonth < 10) ? ('0' + StartMonth) : StartMonth}/` + 
            `${(StartDay < 10) ? ('0' + StartDay) : StartDay}`;
        })
    })
    
    endYearItems.forEach((item,index) => {
        item.addEventListener('click',() => {
            endYear = item.textContent;
            QuestionnairePostData.end_date = `${(endYear < 10) ? ('0' + endYear) : endYear}/` + 
            `${(endMonth < 10) ? ('0' + endMonth) : endMonth}/` + 
            `${(endDay < 10) ? ('0' + endDay) : endDay}`;
        })
    })
    endMonthItems.forEach((item,index) => {
        item.addEventListener('click',() => {
                endMonth = index;
            QuestionnairePostData.end_date = `${(endYear < 10) ? ('0' + endYear) : endYear}/` + 
            `${(endMonth < 10) ? ('0' + endMonth) : endMonth}/` + 
            `${(endDay < 10) ? ('0' + endDay) : endDay}`;
        })
    })
    endDayItems.forEach((item,index) => {
        item.addEventListener('click',() => {
            endDay = item.textContent;
            QuestionnairePostData.end_date = `${(endYear < 10) ? ('0' + endYear) : endYear}/` + 
            `${(endMonth < 10) ? ('0' + endMonth) : endMonth}/` + 
            `${(endDay < 10) ? ('0' + endDay) : endDay}`;
        })
    })
    console.log(QuestionnairePostData)
}
QuestionnaireNameInputs.addEventListener('input',nameSetter);

QuestionnaireTimerInputsH.addEventListener('input',TimerSetter);
QuestionnaireTimerInputsM.addEventListener('input',TimerSetter);
QuestionnaireTimerInputsS.addEventListener('input',TimerSetter);

QuestionnaireStartDateToggle.addEventListener('click',() => {
    if(!QuestionnaireStartDateToggle.previousElementSibling.checked)
    {
        QuestionnaireStartDatePicker.classList.add('active')
        DateSetter();
    }
    else
        QuestionnaireStartDatePicker.classList.remove('active')
       QuestionnairePostData.pub_date = null;
})
QuestionnaireEndDateToggle.addEventListener('click',() => {
    if(!QuestionnaireEndDateToggle.previousElementSibling.checked)
    {
        DateSetter();
        QuestionnaireEndDatePicker.classList.add('active');
    }
    else
        QuestionnaireEndDatePicker.classList.remove('active')
       QuestionnairePostData.end_date = null;
})
QuestionnaireTimerToggleLabel.addEventListener('click',() => {
    if(!QuestionnaireTimerToggleInput.checked)
        QuestionnaireTimerPicker.classList.add("active");
    else    
        QuestionnaireTimerPicker.classList.remove("active");
})
QuestionnaireProgressBar.addEventListener('click',() => {
    QuestionnairePostData.progress_bar = !QuestionnaireProgressBar.previousElementSibling.checked;
})
QuestionnaireIsolator.addEventListener('click',() => {
    QuestionnairePostData.show_question_in_pages = !QuestionnaireIsolator.previousElementSibling.checked;
})

QuestionnaireSaveBtn.addEventListener('click',create_questionnaire);

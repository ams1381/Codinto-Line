import { postRequest , baseUrl } from '../ajax/ajaxRequsts.js';
import { Questionnaire_PostData } from "../ajax/QuestionPostData.js";
import { showAlert } from "./CommonActions.js";

Questionnaire_PostData.folder = localStorage.getItem("SelectedFolderID");
const QuestionnaireNameInputs = document.querySelector("#form-name-input");
const ErrorDialogueBox = document.querySelector(".error_dialogue");
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
const QuestionnaireTimerToggleLabel = document.querySelector(".ResponeTiming .ResponseAutoSet .slider-button");
const QuestionnaireTimerToggleInput = document.querySelector(".ResponeTiming .ResponseAutoSet input");

const Form_Date_Updater = () => {
    let currentDate = new Date();
    let currentDateString = currentDate.toLocaleDateString();

    currentDate = farvardin.gregorianToSolar(
        parseInt(currentDateString.split("/")[2])
        ,
        parseInt(currentDateString.split("/")[0])
        ,
        parseInt(currentDateString.split("/")[1])
        );
    console.log(currentDate);
    let YearInputs = document.querySelectorAll(".YearPicker input");
    let MonthInputs = document.querySelectorAll(".MonthPicker input");
    let DayInputs = document.querySelectorAll(".DayPicker input");
    YearInputs.forEach((YearInput) => {
        if(YearInput.value < currentDate[0])
            YearInput.disabled  = true;
        // YearInput.addEventListener('click',() => {
        //     if(YearInput.value > currentDate[0])
        //         DayInputs.forEach((DayInput) => {
        //             DayInput.disabled = false;
        //     })
        //     if(YearInput.value == currentDate[0])
        //     DayInputs.forEach((DayInput) => {
        //         if(parseInt(DayInput.value.split("d")[1]) < currentDate[2])
        //             DayInput.disabled = true;
        //     })
        // })
    })
    Form_Date_Month_Updater(currentDate);
    Form_Date_Day_Updater(currentDate);
}
const Form_Date_Day_Updater = (currentDate) => {
    let MonthInputs = document.querySelectorAll(".MonthPicker input");
    let DayInputs = document.querySelectorAll(".DayPicker input");
    let SelectedYear = document.querySelectorAll(".YearInput input").forEach((YearInput) => {
        if(YearInput.checked == true)
            return SelectedYear
    })
    MonthInputs.forEach((MonthInput) => {
        if(parseInt(MonthInput.value.split("m")[1]) < currentDate[1])
            MonthInput.disabled = true;
        MonthInput.addEventListener('click',() => {
            if(MonthInput.value.split("m")[1] == currentDate[1])
            {
                DayInputs.forEach((DayInput) => {
                    if(parseInt(DayInput.value.split("d")[1]) < currentDate[2])
                        DayInput.disabled = true;
                })
            }
            else
                DayInputs.forEach((DayInput) => {
                        DayInput.disabled = false;
                })
        })
    })
}
const Form_Date_Month_Updater = (currentDate) =>
{
    let YearInputs = document.querySelectorAll(".YearPicker input");
    let MonthInputs = document.querySelectorAll(".MonthPicker input");
    let DayInputs = document.querySelectorAll(".DayPicker input");
    YearInputs.forEach((YearInput) => {
        if(YearInput.value < currentDate[0])
            YearInput.disabled  = true;
        YearInput.addEventListener('click',() => {
            if(parseInt(YearInput.value) > currentDate[0])
                {
                    MonthInputs.forEach((MonthInput) => {
                        MonthInput.disabled = false;
                    })
                    DayInputs.forEach((DayInput) => {
                        DayInput.disabled = false;
                    })
                }
            if(parseInt(YearInput.value) == currentDate[0])
            {
                MonthInputs.forEach((MonthInput) => {
                    if(parseInt(MonthInput.value.split("m")[1]) < currentDate[1])
                        MonthInput.disabled = true;
                });
            }
        })
    })
}
const create_questionnaire = async (e) => {
    e.preventDefault();
    if (Questionnaire_PostData.pub_date !== null)
    {
        let publish_date = Questionnaire_PostData.pub_date;
        let GregorianDate = farvardin.solarToGregorian(parseInt(publish_date.split("/")[0]) , parseInt(publish_date.split("/")[1]) , parseInt(publish_date.split("/")[2]));
        Questionnaire_PostData.pub_date = GregorianDate[0] + '-' + GregorianDate[1] + '-' + GregorianDate[2];
    }
    if (Questionnaire_PostData.end_date !== null)
    {
        let end_date = Questionnaire_PostData.end_date;
        let GregorianDate = farvardin.solarToGregorian(parseInt(end_date.split("/")[0]) , parseInt(end_date.split("/")[1]) , parseInt(end_date.split("/")[2]));
        Questionnaire_PostData.end_date = GregorianDate[0] + '-' + GregorianDate[1] + '-' + GregorianDate[2];
    }
    try 
    {
        let create_questionnaire_res =  await postRequest(baseUrl + '/question-api/questionnaires/',Questionnaire_PostData);
        window.open("/Pages/FormDesign.html","_self");
        localStorage.setItem("SelectedQuestionnaire",JSON.stringify(create_questionnaire_res.data));
    }
    catch(err)
    {
        showAlert('نام پرسشنامه نمی تواند خالی باشد')
        window.scrollTo(0,0)
    }

   
}
const nameSetter = (e) => {
    QuestionnaireNameInputs.classList.remove("error_active");
    Questionnaire_PostData.name = e.target.value;
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
    
    Questionnaire_PostData.timer = 
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
            Questionnaire_PostData.pub_date = `${(StartYear < 10) ? ('0' + StartYear) : StartYear}/` + 
            `${(StartMonth < 10) ? ('0' + StartMonth) : StartMonth}/` + 
            `${(StartDay < 10) ? ('0' + StartDay) : StartDay}`;
        })
    })
    StartMonthItems.forEach((item,index) => {
        item.addEventListener('click',() => {
                StartMonth = index;
            Questionnaire_PostData.pub_date = `${(StartYear < 10) ? ('0' + StartYear) : StartYear}/` + 
            `${(StartMonth < 10) ? ('0' + StartMonth) : StartMonth}/` + 
            `${(StartDay < 10) ? ('0' + StartDay) : StartDay}`;
        })
    })
    StartDayItems.forEach((item,index) => {
        item.addEventListener('click',() => {
            StartDay = item.textContent;
            Questionnaire_PostData.pub_date = `${(StartYear < 10) ? ('0' + StartYear) : StartYear}/` + 
            `${(StartMonth < 10) ? ('0' + StartMonth) : StartMonth}/` + 
            `${(StartDay < 10) ? ('0' + StartDay) : StartDay}`;
        })
    })
    
    endYearItems.forEach((item,index) => {
        item.addEventListener('click',() => {
            endYear = item.textContent;
            Questionnaire_PostData.end_date = `${(endYear < 10) ? ('0' + endYear) : endYear}/` + 
            `${(endMonth < 10) ? ('0' + endMonth) : endMonth}/` + 
            `${(endDay < 10) ? ('0' + endDay) : endDay}`;
        })
    })
    endMonthItems.forEach((item,index) => {
        item.addEventListener('click',() => {
                endMonth = index;
            Questionnaire_PostData.end_date = `${(endYear < 10) ? ('0' + endYear) : endYear}/` + 
            `${(endMonth < 10) ? ('0' + endMonth) : endMonth}/` + 
            `${(endDay < 10) ? ('0' + endDay) : endDay}`;
        })
    })
    endDayItems.forEach((item,index) => {
        item.addEventListener('click',() => {
            endDay = item.textContent;
            Questionnaire_PostData.end_date = `${(endYear < 10) ? ('0' + endYear) : endYear}/` + 
            `${(endMonth < 10) ? ('0' + endMonth) : endMonth}/` + 
            `${(endDay < 10) ? ('0' + endDay) : endDay}`;
        })
    })
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
       Questionnaire_PostData.pub_date = null;
})
QuestionnaireEndDateToggle.addEventListener('click',() => {
    if(!QuestionnaireEndDateToggle.previousElementSibling.checked)
    {
        DateSetter();
        QuestionnaireEndDatePicker.classList.add('active');
    }
    else
        QuestionnaireEndDatePicker.classList.remove('active')
       Questionnaire_PostData.end_date = null;
})
QuestionnaireTimerToggleLabel.addEventListener('click',() => {
    if(!QuestionnaireTimerToggleInput.checked)
        QuestionnaireTimerPicker.classList.add("active");
    else    
        QuestionnaireTimerPicker.classList.remove("active");
})
QuestionnaireProgressBar.addEventListener('click',() => {
    Questionnaire_PostData.progress_bar = !QuestionnaireProgressBar.previousElementSibling.checked;
})
QuestionnaireIsolator.addEventListener('click',() => {
    Questionnaire_PostData.show_question_in_pages = !QuestionnaireIsolator.previousElementSibling.checked;
})
QuestionnaireSaveBtn.addEventListener('click',create_questionnaire);
Form_Date_Updater();
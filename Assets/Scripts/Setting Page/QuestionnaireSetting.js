import { postRequest , baseUrl, patchRequest , getRequest} from '../ajax/ajaxRequsts.js';
import { Questionnaire_PostData } from "../ajax/QuestionPostData.js";
import { showAlert } from "../Question Design Pages/CommonActions.js";
import { QuestionnaireInfoSetter } from './QustionnariesInfoLoader.js';

Questionnaire_PostData.folder = localStorage.getItem("SelectedFolderID");
const QuestionnaireToEdit = JSON.parse(localStorage.getItem('QuestionnaireToEdit'));
const QuestionnaireNameInputs = document.querySelector("#form-name-input");
const QuestionnaireTimerPicker = document.querySelector(".ResponeTiming .ResponePicker");
const QuestionnaireTimerInputsH = document.querySelector(".ResponeTiming .ResponePicker .RhourPicker input");
const QuestionnaireTimerInputsM = document.querySelector(".ResponeTiming .ResponePicker .RminutePicker input");
const QuestionnaireTimerInputsS = document.querySelector(".ResponeTiming .ResponePicker .RsecondPicker input");
const QuestionnaireProgressBar = document.querySelector(".ProgressBar .slider-button");
const QuestionnaireIsolator = document.querySelector(".Isolator .slider-button");
const QuestionnaireStartDatePicker = document.querySelector(".start-picker");
const QuestionnaireEndDatePicker = document.querySelector(".end-picker");
const QuestionnaireSaveBtn = document.querySelector('.FormFooter .save-Form');
const QuestionnaireStartDateToggle = document.querySelector(".date-start .Switch-toggle .slider-button");
const QuestionnaireEndDateToggle = document.querySelector(".date-end .Switch-toggle .slider-button");
const QuestionnaireTimerToggleLabel = document.querySelector(".ResponeTiming .ResponseAutoSet .slider-button");
const QuestionnaireTimerToggleInput = document.querySelector(".ResponeTiming .ResponseAutoSet input");
let StartYearItems = document.querySelectorAll(".start-picker .YearPicker label");
let StartMonthItems = document.querySelectorAll(".start-picker .MonthPicker label");
let StartDayItems = document.querySelectorAll(".start-picker .DayPicker label");
let endYearItems = document.querySelectorAll(".end-picker .YearPicker label");
let endMonthItems = document.querySelectorAll(".end-picker .MonthPicker label");
let endDayItems = document.querySelectorAll(".end-picker .DayPicker label");
let StartYearInputs = document.querySelectorAll(".start-picker .YearPicker input");
let StartMonthInputs = document.querySelectorAll(".start-picker .MonthPicker input");
let StartDayInputs = document.querySelectorAll(".start-picker .DayPicker input");
let endYearInputs = document.querySelectorAll(".end-picker .YearPicker input");
let endMonthInputs = document.querySelectorAll(".end-picker .MonthPicker input");
let endDayInputs = document.querySelectorAll(".end-picker .DayPicker input");
let LoadedQuestionnaire;

const Form_Date_Updater = (YearInputs,MonthInputs,DayInputs) => {
    let currentDate = new Date();
    let currentDateString = currentDate.toLocaleDateString();

    currentDate = farvardin.gregorianToSolar(
        parseInt(currentDateString.split("/")[2])
        ,
        parseInt(currentDateString.split("/")[0])
        ,
        parseInt(currentDateString.split("/")[1])
        );
   
    YearInputs.forEach((YearInput) => {
        if(YearInput.value < currentDate[0])
            YearInput.disabled  = true;
    })
    Form_Date_Month_Updater(currentDate,YearInputs,MonthInputs,DayInputs);
    Form_Date_Day_Updater(currentDate,YearInputs,MonthInputs,DayInputs);
}
const Form_Date_Day_Updater = (currentDate,YearInputs,MonthInputs,DayInputs) => {
    let SelectedYear;
    YearInputs.forEach((YearInput) => {
        if(YearInput.checked == true)
            SelectedYear =  YearInput;
    })
    if(SelectedYear)
    {
        MonthInputs.forEach((MonthInput) => {
            if(parseInt(MonthInput.value.split("m")[1]) < currentDate[1] && SelectedYear.value < currentDate[0])
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
}
const Form_Date_Month_Updater = (currentDate,YearInputs,MonthInputs,DayInputs) =>
{
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
const compareDates = (date1, date2) => new Date(date1) - new Date(date2);
const form_date_convertor_to_Gregorian = (Date) => {
    let GregorianDate = farvardin.solarToGregorian(parseInt(Date.split("/")[0]) , parseInt(Date.split("/")[1]) , parseInt(Date.split("/")[2]));
    return (GregorianDate[0] + '-' + GregorianDate[1] + '-' + GregorianDate[2]);
}
const create_questionnaire = async (e) => {
    e.preventDefault();
    try 
    {
        if(LoadedQuestionnaire)
        {
            if(LoadedQuestionnaire.end_date)
              LoadedQuestionnaire.end_date = form_date_convertor_to_Gregorian(LoadedQuestionnaire.end_date)
        }
        else
        {
            if(Questionnaire_PostData.pub_date)
                Questionnaire_PostData.pub_date = form_date_convertor_to_Gregorian(Questionnaire_PostData.pub_date);
            if(Questionnaire_PostData.end_date)
                Questionnaire_PostData.end_date = form_date_convertor_to_Gregorian(Questionnaire_PostData.end_date);

            if(Questionnaire_PostData.pub_date && Questionnaire_PostData.end_date)
                if(compareDates(Questionnaire_PostData.pub_date,Questionnaire_PostData.end_date) <= 0)
                {
                    showAlert('تاریخ را به درستی وارد کنید');
                    return;
                }
                    
        }
    }
    catch(err)
    {
        showAlert('تاریخ را به درستی وارد کنید');
        return;
    }
    
        let create_questionnaire_res;
        if(LoadedQuestionnaire)
        {
            await patchRequest(baseUrl + '/question-api/questionnaires/' + QuestionnaireToEdit.uuid + '/',LoadedQuestionnaire);
            localStorage.setItem("SelectedQuestionnaire",JSON.stringify(LoadedQuestionnaire));
        }
        else
        {
            await postRequest(baseUrl + '/question-api/questionnaires/',Questionnaire_PostData); 
            localStorage.setItem("SelectedQuestionnaire",JSON.stringify(create_questionnaire_res));
        }
        
      window.open("/Pages/FormDesign.html","_self");
        
        
}
const nameSetter = (e) => {
    QuestionnaireNameInputs.classList.remove("error_active");
    if(QuestionnaireToEdit)
        QuestionnaireToEdit.name = e.target.value;
    else
        Questionnaire_PostData.name = e.target.value;
}
const Timer_EventListener_Setter = () => {
    let TimerHour , TimerMinute , TimerSecond;
    QuestionnaireTimerInputsH.addEventListener('input',(e) => {
        TimerHour = e.target.value; 
        Timer_Setter(TimerHour,TimerMinute,TimerSecond)
    });
    QuestionnaireTimerInputsM.addEventListener('input',(e) => {
        TimerMinute = e.target.value;
        Timer_Setter(TimerHour,TimerMinute,TimerSecond)
    });
    QuestionnaireTimerInputsS.addEventListener('input',(e) => {
        TimerSecond = e.target.value;
        Timer_Setter(TimerHour,TimerMinute,TimerSecond)
    });
    
}
const Timer_Setter = (TimerHour,TimerMinute,TimerSecond) => {
    Questionnaire_PostData.timer = 
    `${(TimerHour < 10) ? ('0' + TimerHour) : TimerHour}:` + 
    `${(TimerMinute < 10) ? ('0' + TimerMinute) : TimerMinute}:` + 
    `${(TimerSecond < 10) ? ('0' + TimerSecond) : TimerSecond}`;
}
export const DateSetter = (e) => {
    if(QuestionnaireToEdit)
    {
        date_eventListener_setter(StartYearItems,StartMonthItems,StartDayItems,QuestionnaireToEdit,'start')
        date_eventListener_setter(endYearItems,endMonthItems,endDayItems,QuestionnaireToEdit,'end')
    }
    else
    {
        date_eventListener_setter(StartYearItems,StartMonthItems,StartDayItems,Questionnaire_PostData,'start')
        date_eventListener_setter(endYearItems,endMonthItems,endDayItems,Questionnaire_PostData,'end')
    }
}
const date_eventListener_setter = (YearLabels,MonthLabels,DayLabels,postData,date_type) => {
    let Year,Month,Day , Questionnaire_date;
    YearLabels.forEach((item,index) => {
        if(item.previousElementSibling.checked)
            Year = item.textContent;
        item.addEventListener('click',() => {
            Year = parseInt(item.textContent);
            post_data_date_setter(Year,Month,Day,postData,date_type)
        })
    })
    MonthLabels.forEach((item,index) => {
        if(item.previousElementSibling.checked)
            Month = item.textContent;
        item.addEventListener('click',() => {
            Month = index;
            post_data_date_setter(Year,Month,Day,postData,date_type)
        })
    })
    DayLabels.forEach((item,index) => {
        if(item.previousElementSibling.checked)
            Day = item.textContent;
        item.addEventListener('click',() => {
            Day = item.textContent;
            post_data_date_setter(Year,Month,Day,postData,date_type);
        })
    })
}
const post_data_date_setter = (Year,Month,Day,postData,date_type) => {
    let  Questionnaire_date = `${Year}/` + 
    `${(Month < 10) ? ('0' + Month) : Month}/` + 
    `${(Day < 10) ? ('0' + Day) : Day}`;

    switch(date_type)
    {
        case 'start':
            Form_Date_Updater(StartYearInputs,StartMonthInputs,StartDayInputs);
            if(QuestionnaireToEdit)
                LoadedQuestionnaire.pub_date = Questionnaire_date;
            else 
                postData.pub_date = Questionnaire_date;
            break;
        case 'end':
            Form_Date_Updater(endYearInputs,endMonthInputs,endDayInputs);
            if(LoadedQuestionnaire)
                LoadedQuestionnaire.end_date = Questionnaire_date;
            else
                postData.end_date = Questionnaire_date;
            break;
    }
}
QuestionnaireNameInputs.addEventListener('input',nameSetter);
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
Timer_EventListener_Setter()
Form_Date_Updater(StartYearInputs,StartMonthInputs,StartDayInputs);
Form_Date_Updater(endYearInputs,endMonthInputs,endDayInputs);
if(QuestionnaireToEdit)
{
    await QuestionnaireInfoSetter(QuestionnaireToEdit.uuid)
    LoadedQuestionnaire =  await getRequest(baseUrl + '/question-api/questionnaires/' + QuestionnaireToEdit.uuid + '/')
}
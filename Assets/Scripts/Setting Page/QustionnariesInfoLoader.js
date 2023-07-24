import { baseUrl , getRequest } from "../ajax/ajaxRequsts.js"
import  { current_date_getter, DateSetter  }  from "./QuestionnaireSetting.js";

const QuestionnaireNameInputs = document.querySelector("#form-name-input");
const QuestionnaireStartDateToggle = document.querySelector(".date-start .Switch-toggle input");
const QuestionnaireEndDateToggle = document.querySelector(".date-end .Switch-toggle input");
const QuestionnaireIsolator = document.querySelector(".Isolator .Switch-toggle input")
const QuestionnaireProgressBar = document.querySelector(".ProgressBar .Switch-toggle input");
const QuestionnaireStartDatePicker = document.querySelector(".start-picker");
const QuestionnaireEndDatePicker = document.querySelector(".end-picker");
const QuestionnaireTimerToggleLabel = document.querySelector(".ResponeTiming .ResponseAutoSet input");
const QuestionnaireTimerContainer = document.querySelector(".ResponePicker");
const QuestionnaireTimerInputsH = document.querySelector(".ResponeTiming .ResponePicker .RhourPicker input");
const QuestionnaireTimerInputsM = document.querySelector(".ResponeTiming .ResponePicker .RminutePicker input");
const QuestionnaireTimerInputsS = document.querySelector(".ResponeTiming .ResponePicker .RsecondPicker input");
let StartYearInputs = document.querySelectorAll(".start-picker .YearPicker input");
let endYearInputs = document.querySelectorAll(".end-picker .YearPicker input");
const StartYearItems = document.querySelectorAll(".start-picker .YearPicker label");
const StartMonthItems = document.querySelectorAll(".start-picker .MonthPicker label");
const StartDayItems = document.querySelectorAll(".start-picker .DayPicker label");

const endYearItems = document.querySelectorAll(".end-picker .YearPicker label");
const endMonthItems = document.querySelectorAll(".end-picker .MonthPicker label");
const endDayItems = document.querySelectorAll(".end-picker .DayPicker label");

const QuestionnaireInfoGetter = async (QuestionnaireUUID) => {
    return await getRequest(baseUrl + '/question-api/questionnaires/' + QuestionnaireUUID + '/')
}
export const QuestionnaireInfoSetter = async (QuestionnaireUUID) => {
    $('.block__header').addClass('loading');
   let QuestionnaireRes =  await QuestionnaireInfoGetter(QuestionnaireUUID);
   QuestionnaireNameInputs.value = QuestionnaireRes.name 
   if(QuestionnaireRes.progress_bar)
        QuestionnaireProgressBar.checked = QuestionnaireRes.progress_bar;
    if(QuestionnaireRes.show_question_in_pages)
        QuestionnaireIsolator.checked = QuestionnaireRes.show_question_in_pages;
    if(QuestionnaireRes.pub_date)
    {
        QuestionnaireStartDateToggle.checked = true;
        QuestionnaireStartDatePicker.classList.add('active');
        date_setter(StartYearItems,StartMonthItems,StartDayItems,date_transformer(QuestionnaireRes.pub_date));
        DateSetter();
        data_updater(StartYearItems,StartMonthItems,StartDayItems,date_transformer(QuestionnaireRes.pub_date))
    }
    if(QuestionnaireRes.end_date)
    {
        QuestionnaireEndDateToggle.checked = true;
        QuestionnaireEndDatePicker.classList.add('active');
        date_setter(endYearItems,endMonthItems,endDayItems,date_transformer(QuestionnaireRes.end_date));
        DateSetter();
        data_updater(endYearItems,endMonthItems,endDayItems,date_transformer(QuestionnaireRes.end_date))
    }
    if(QuestionnaireRes.timer)
    {
        QuestionnaireTimerToggleLabel.checked = true;
        QuestionnaireTimerContainer.classList.add('active');

        QuestionnaireTimerInputsH.value = parseInt(QuestionnaireRes.timer.split(":")[0]);
        QuestionnaireTimerInputsM.value = parseInt(QuestionnaireRes.timer.split(":")[1]);
        QuestionnaireTimerInputsS.value = parseInt(QuestionnaireRes.timer.split(":")[2]);
    }
    $('.block__header').removeClass('loading');
}   
const date_transformer = (Date_to_transform) => {
    let Year =  parseInt(Date_to_transform.split("-")[0])
    let Month = parseInt(Date_to_transform.split("-")[1])
    let Day =  parseInt(Date_to_transform.split("-")[2])

    return farvardin.gregorianToSolar(Year,Month,Day);
}
const date_setter = (Year_Labels,Month_Labels,Day_Labels,Date) => {
    Year_Labels.forEach((item) => {
        if(item.textContent == Date[0])
            item.previousElementSibling.checked = true;
    })
    Month_Labels.forEach((item,index) => {
        if(index + 1 == Date[1])
            item.previousElementSibling.checked = true;
    })
    Day_Labels.forEach((item) => {
        if(item.textContent == Date[2])
            item.previousElementSibling.checked = true;
    })
}
const data_updater = (Year_Labels,Month_Labels,Day_Labels,Date) => {
    let currentDate = current_date_getter();
    if(Date[0] == currentDate[0])
    {
        Month_Labels.forEach((item,index) => {
            if(index + 1 < currentDate[1])
                item.previousElementSibling.disabled = true;
        })
        if(Date[1] == currentDate[1])
        {
            Day_Labels.forEach((Day_Label,index) => {
                if(index + 1 < currentDate[2])
                    Day_Label.previousElementSibling.disabled = true;
            })
        }
        if(Date[1] < currentDate[1])
        {
            Day_Labels.forEach((Day_Label,index) => {
                Day_Label.previousElementSibling.disabled = true;
            })
        }
    }
}
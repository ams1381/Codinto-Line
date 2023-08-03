import { postRequest , baseUrl, patchRequest , getRequest} from '../ajax/ajaxRequsts.js';
import { Questionnaire_PostData } from "../ajax/QuestionPostData.js";
import { showAlert } from "../Question Design Pages/CommonActions/CommonActions.js";
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
const cancel_button = document.querySelector('.cancel-Form.cancelQuestion')
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
let dateChanged = false;
let LoadedQuestionnaire;

export const current_date_getter = () => {
    let currentDate = new Date();
    let currentDateString = currentDate.toLocaleDateString();

    currentDate = farvardin.gregorianToSolar(
        parseInt(currentDateString.split("/")[2])
        ,
        parseInt(currentDateString.split("/")[0])
        ,
        parseInt(currentDateString.split("/")[1])
        );
    return currentDate;
}
const isGregorianDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
export const Form_Date_Updater = (YearInputs,MonthInputs,DayInputs) => {
    let currentDate = current_date_getter();
   
    YearInputs.forEach((YearInput) => {
        if(YearInput.value < currentDate[0])
            YearInput.disabled  = true;
    })
    StartMonthItems.forEach((StartMonthItem,index) => {
        StartMonthItem.addEventListener('click',() => {
            if(parseInt(StartMonthInputs[index].value.split("m")[1]) <= 6)
            {
                $('.start-picker #sd31 + label').show(50);
            }
            else if(parseInt(StartMonthInputs[index].value.split("m")[1]) > 6)
            {
                $('.start-picker #sd31 + label').hide(50);
            }
        })
    })
    endMonthItems.forEach((EndMonthItem,index) => {
        EndMonthItem.addEventListener('click',() => {
            if(parseInt(endMonthInputs[index].value.split("m")[1]) <= 6)
            {
                $('.end-picker #sd31 + label').show(50);
            }
            else if(parseInt(endMonthInputs[index].value.split("m")[1]) > 6)
            {
                $('.end-picker #sd31 + label').hide(50);
            }
        })
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
                DayInputs.forEach((DayInput) => {
                        DayInput.disabled = false;
                })
                if(MonthInput.value.split("m")[1] == currentDate[1] && SelectedYear.value == currentDate[0])
                {
                    DayInputs.forEach((DayInput) => {
                        if(parseInt(DayInput.value.split("d")[1]) < currentDate[2])
                            DayInput.disabled = true;
                    })
                    if(parseInt(MonthInput.value.split("m")[1]) <= 6)
                    {
                        $('#sd31 + label').show(50);
                        $('#sd31').attr('checked','false')
                    }
                    if(parseInt(MonthInput.value.split("m")[1]) > 6)
                    {
                        $('#sd31 + label').hide(50);
                        $('#sd31').attr('checked','false')
                    }
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
                    if(parseInt(MonthInput.value.split("m")[1]) < currentDate[1] && MonthInput.checked)
                    {
                        DayInputs.forEach((DayInput) => {
                                DayInput.disabled = true;
                        })
                    }
                    else if(parseInt(MonthInput.value.split("m")[1]) == currentDate[1])
                    {
                        DayInputs.forEach((DayInput) => {
                            if(parseInt(DayInput.value.split("d")[1]) < currentDate[2])
                                DayInput.disabled = true;
                        })
                    }
                });
                
            }
        })
    })
}
const date_inputs_InActive_setter = (YearInputs,MonthInputs,DayInputs) => {
    YearInputs.forEach((YearInput) => {
        YearInput.checked = false;
    })
    MonthInputs.forEach((YearInput) => {
        YearInput.checked = false;
    })
    DayInputs.forEach((YearInput) => {
        YearInput.checked = false;
    })
}
const compareDates = (date1, date2) => new Date(date1) - new Date(date2);

const form_date_convertor_to_Gregorian = (Date) => {
    let GregorianDate = farvardin.solarToGregorian(parseInt(Date.split("/")[0]) , parseInt(Date.split("/")[1]) , parseInt(Date.split("/")[2]));
    return (GregorianDate[0] + '-' + GregorianDate[1] + '-' + GregorianDate[2]);
}
const create_questionnaire = async (e) => {
    QuestionnaireSaveBtn.classList.add('operating');

    e.preventDefault();
    try
    {
        if(LoadedQuestionnaire)
        {
            if(LoadedQuestionnaire.pub_date && !isGregorianDate(LoadedQuestionnaire.pub_date))
                LoadedQuestionnaire.pub_date = form_date_convertor_to_Gregorian(LoadedQuestionnaire.pub_date)
                
            if(LoadedQuestionnaire.end_date && !isGregorianDate(LoadedQuestionnaire.end_date))
              LoadedQuestionnaire.end_date = form_date_convertor_to_Gregorian(LoadedQuestionnaire.end_date)
        }
        else
        {
            if(Questionnaire_PostData.pub_date && !isGregorianDate(Questionnaire_PostData.pub_date))
                Questionnaire_PostData.pub_date = form_date_convertor_to_Gregorian(Questionnaire_PostData.pub_date);
            if(Questionnaire_PostData.end_date && !isGregorianDate(Questionnaire_PostData.end_date))
                Questionnaire_PostData.end_date = form_date_convertor_to_Gregorian(Questionnaire_PostData.end_date);

        }
    }
    catch(err)
    {
        QuestionnaireSaveBtn.classList.remove('operating');
    }
        let create_questionnaire_res;
    try 
    {
        if(LoadedQuestionnaire)
        {
            if(!dateChanged)
                delete LoadedQuestionnaire.pub_date
            create_questionnaire_res = await patchRequest(baseUrl + '/question-api/questionnaires/' + QuestionnaireToEdit.uuid + '/',LoadedQuestionnaire);
            if(create_questionnaire_res)
                localStorage.setItem("SelectedQuestionnaire",JSON.stringify(LoadedQuestionnaire));
            
        }
        else
        {
            create_questionnaire_res = await postRequest(baseUrl + '/question-api/questionnaires/','application/json',Questionnaire_PostData); 
            if(create_questionnaire_res)
                localStorage.setItem("SelectedQuestionnaire",JSON.stringify(create_questionnaire_res.data));
            
        }
        if(create_questionnaire_res)
            window.open("/Pages/FormDesign.html","_self");
    }
    catch(error)
    {
        QuestionnaireSaveBtn.classList.remove('operating');
    }
        
}
const nameSetter = (e) => {
    QuestionnaireNameInputs.classList.remove("error");
    if(LoadedQuestionnaire)
        LoadedQuestionnaire.name = e.target.value;
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
        if($(QuestionnaireTimerInputsS).val() > 60)
        {
             $(QuestionnaireTimerInputsS).val($(QuestionnaireTimerInputsS).val().substr(0, 2));
             return
        }
           
        TimerMinute = e.target.value;
        Timer_Setter(TimerHour,TimerMinute,TimerSecond)
        
    });
    QuestionnaireTimerInputsS.addEventListener('input',(e) => {
        if($(QuestionnaireTimerInputsS).val() > 60)
        {
            $(QuestionnaireTimerInputsS).val($(QuestionnaireTimerInputsS).val().substr(0, 2));
            return
        }
           
        TimerSecond = e.target.value;
        Timer_Setter(TimerHour,TimerMinute,TimerSecond)
    });
    
}
const Timer_Setter = (TimerHour,TimerMinute,TimerSecond) => {
    let questionnaire_timer = `${(TimerHour < 10) ? ('0' + TimerHour) : TimerHour}:` + 
    `${(TimerMinute < 10) ? ('0' + TimerMinute) : TimerMinute}:` + 
    `${(TimerSecond < 10) ? ('0' + TimerSecond) : TimerSecond}`;
    if(LoadedQuestionnaire)
        LoadedQuestionnaire.timer = questionnaire_timer;
    else
        Questionnaire_PostData.timer = questionnaire_timer;
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
            Month = index + 1
        item.addEventListener('click',() => {
            Month = index + 1;
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
    if(!dateChanged)
    {
        dateChanged = true;
        if(QuestionnaireToEdit && !QuestionnaireToEdit.pub_date)
            delete QuestionnaireToEdit.pub_date;
    }
        
    QuestionnaireStartDatePicker.classList.remove('error');
    QuestionnaireEndDatePicker.classList.remove('error');
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
        Questionnaire_PostData['pub_date'] = null;
    }
    else
    {
        QuestionnaireStartDatePicker.classList.remove('active')
        if(LoadedQuestionnaire)
        {
            delete LoadedQuestionnaire.pub_date;
        }
         //   LoadedQuestionnaire.pub_date = null;
        else
        {
            delete Questionnaire_PostData.pub_date
           // Questionnaire_PostData.pub_date = null;
        }
        date_inputs_InActive_setter(StartYearInputs,StartMonthInputs,StartDayInputs)  

    }
})
QuestionnaireEndDateToggle.addEventListener('click',() => {
    if(!QuestionnaireEndDateToggle.previousElementSibling.checked)
    {
        DateSetter();
        QuestionnaireEndDatePicker.classList.add('active');
    }
    else
    {
        QuestionnaireEndDatePicker.classList.remove('active')
        if(LoadedQuestionnaire)
            LoadedQuestionnaire.end_date = null;
        else
            Questionnaire_PostData.end_date = null;

        date_inputs_InActive_setter(endYearInputs,endMonthInputs,endDayInputs)  
    }
          
})
QuestionnaireTimerToggleLabel.addEventListener('click',() => {
    if(!QuestionnaireTimerToggleInput.checked)
        QuestionnaireTimerPicker.classList.add("active");
    else    
    {
        QuestionnaireTimerPicker.classList.remove("active");
        LoadedQuestionnaire ? LoadedQuestionnaire.timer = null : Questionnaire_PostData.timer = null;
    }
})
QuestionnaireProgressBar.addEventListener('click',() => {
    if(LoadedQuestionnaire)
        LoadedQuestionnaire.progress_bar = !QuestionnaireProgressBar.previousElementSibling.checked;
    else
        Questionnaire_PostData.progress_bar = !QuestionnaireProgressBar.previousElementSibling.checked;
})
QuestionnaireIsolator.addEventListener('click',() => {
    if(LoadedQuestionnaire)
        LoadedQuestionnaire.show_question_in_pages = !QuestionnaireIsolator.previousElementSibling.checked;
    else
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
cancel_button.addEventListener('click',(e) => {
    e.preventDefault();
    window.open('Folders.html',"_Self")
})
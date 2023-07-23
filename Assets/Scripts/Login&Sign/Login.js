import { postRequest , baseUrl } from '../ajax/ajaxRequsts.js';
import { showAlert } from '../Question Design Pages/CommonActions.js'

const login_confirm_button = document.querySelector('#loginForm .Login__btn');
const user_phone_phoneNumber_input = document.querySelector('#PhoneNumberInput');
const login_confirm_handler = async (e) => {
    login_confirm_button.classList.add("loading");
    e.preventDefault();
    try
    {
        await postRequest(baseUrl + '/user-api/auth/gateway/','application/json',{ 'phone_number' : user_phone_phoneNumber_input.value });
        localStorage.setItem("enteredPhoneNumber",user_phone_phoneNumber_input.value);
       
    }
   catch(err)
   {
    showAlert('شماره تلفن نا معتبر است')
    login_confirm_button.classList.remove("loading");
    return
   }
   window.open('/Pages/SignUpSMS.html','_Self');
}

login_confirm_button.addEventListener('click',login_confirm_handler)
// user_phone_phoneNumber_input.addEventListener('mousewheel',(e) => {
//     $(e.target).blur(function (e) { 
//         e.preventDefault();
//     })();
// })
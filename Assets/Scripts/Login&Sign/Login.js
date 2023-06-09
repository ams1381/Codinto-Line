import { postRequest , baseUrl } from '../ajax/ajaxRequsts.js';
import { showAlert } from '../Question Design Pages/CommonActions.js'

const login_confirm_button = document.querySelector('#loginForm .Login__btn');
const user_phone_phoneNumber_input = document.querySelector('#PhoneNumberInput');


const login_confirm_handler = async (e) => {
    e.preventDefault();
    try
    {
        await postRequest(baseUrl + '/user-api/auth/gateway/',{ 'phone_number' : user_phone_phoneNumber_input.value });
        localStorage.setItem("enteredPhoneNumber",user_phone_phoneNumber_input.value);
        window.open('/Pages/SignUpSMS.html','_Self');
    }
   catch(err)
   {
    showAlert('شماره تلفن نا معتبر است')
   }
}

login_confirm_button.addEventListener('click',login_confirm_handler)
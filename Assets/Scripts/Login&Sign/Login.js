import postRequest from '../ajax/ajaxRequsts.js';
import { baseUrl } from '../ajax/ajaxRequsts.js';
import showAlert from '../Question Design Pages/CommonActions.js'

const login_confirm_button = document.querySelector('#loginForm .Login__btn');
const user_phone_phoneNumber_input = document.querySelector('#PhoneNumberInput');


const login_confirm_handler = async () => {
   let loginRes =  await postRequest(baseUrl + '/auth/jwt/create/',{ phoneNumber : user_phone_phoneNumber_input.value });

    if(loginRes.status == 201)
       {
        localStorage.setItem("enteredPhoneNumber",user_phone_phoneNumber_input.value);
        window.open('/Pages/SignUpSMS.html','_Self');
       }
    else
    {
        showAlert('شماره تلفن نا معتبر است')
    }
}
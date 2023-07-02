import { postRequest , baseUrl , TokenInitializer} from '../ajax/ajaxRequsts.js';
import { showAlert } from '../Question Design Pages/CommonActions.js'

const login_sms_confirm_button = document.getElementById('sms_confirm_button');
const sms_inputs = document.querySelectorAll(".SMS_SignUp_LContainer__inputs input");

const sent_sms_handler = async (e) => {
    e.preventDefault();
    let sms_code = '';
    sms_inputs.forEach((sms_input) => {
        sms_code += sms_input.value;
    })
    sms_code = sms_code.split('').reverse().join('');
    try
    {
        let accessToken = await postRequest(baseUrl + '/user-api/auth/verify-otp/',{ 'token' : sms_code });
        localStorage.setItem("ACCESS_TOKEN",accessToken.data.access)
        window.open("/Pages/Folders.html","_Self");
    }
    catch(err)
    {
        showAlert('کد وارد شده نا معتبر است')
        console.log(err)
    }
}
sms_inputs.forEach((sms_input,index) => 
{
    sms_input.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 1) {
          this.value = this.value.slice(0,1);
        }
        if(sms_inputs[index - 1])
            sms_inputs[index - 1].focus();
      });
})
login_sms_confirm_button.addEventListener('click',sent_sms_handler)

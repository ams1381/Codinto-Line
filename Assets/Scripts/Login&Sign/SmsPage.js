import { postRequest , baseUrl , cookie_setter} from '../ajax/ajaxRequsts.js';
import { showAlert } from '../Question Design Pages/CommonActions.js'

const login_sms_confirm_button = document.getElementById('sms_confirm_button');
const sms_inputs = document.querySelectorAll(".SMS_SignUp_LContainer__inputs input");
sms_inputs[sms_inputs.length - 1].focus();
const sent_sms_handler = async (e) => {
    login_sms_confirm_button.classList.add("loading");
    e.preventDefault();
    let sms_code = '';
    sms_inputs.forEach((sms_input) => {
        sms_code += sms_input.value;
    })
    sms_code = sms_code.split('').reverse().join('');
    
        try
        {
            let accessToken = await postRequest(baseUrl + '/user-api/auth/verify-otp/','application/json',{ 'token' : sms_code });
            if(accessToken)
            {
                localStorage.setItem("ACCESS_TOKEN",accessToken.data.access)
                cookie_setter('access',accessToken.data.access);
                window.open("/Pages/Folders.html","_Self");
            }
        }
        catch(error)
        {
            showAlert('کد وارد شده نا معتبر است')
            console.log(error)
            login_sms_confirm_button.classList.remove("loading");
        } 
}
sms_inputs.forEach((sms_input,index) => 
{
    sms_input.addEventListener("input", async function(e) {
        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 1) {
          this.value = this.value.slice(0,1);
        }
        if(sms_inputs[index - 1])
            sms_inputs[index - 1].focus();
        if(sms_inputs[0] == sms_input)
        {
            await sent_sms_handler(e)
        }
      });
})
login_sms_confirm_button.addEventListener('click',async (e) => {
   await sent_sms_handler(e);
} )

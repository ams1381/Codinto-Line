import { showAlert } from "../Question Design Pages/CommonActions.js";
let baseUrl = 'http://codinto-line.codinguy.ir';
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NDg1NTk5LCJqdGkiOiJhNDZlZGMzOTg3MTE0ZDc0OTYzMDI2MWY2MTMxMzZlMSIsInVzZXJfaWQiOjF9.S4jJOFS7nMjhwb5q4fssHslS1H7W--a5ktAOZTikjzI";
let accessToken;
const cookies_reader = (cname) => 
{
  var name = cname + "=";
  var decoded_cookie = decodeURIComponent(document.cookie);
  var carr = decoded_cookie.split(';');
  for(var i=0; i<carr.length;i++){
  var c = carr[i];
  while(c.charAt(0)==' '){
      c=c.substring(1);
  }
  if(c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
   }
   }
   return "";
}
export const cookie_setter = (name, value, expirationDays, path, domain) => {
  var expires = "";
  
  if (expirationDays) {
    var date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  
  var cookiePath = path ? "; path=" + path : "";
  var cookieDomain = domain ? "; domain=" + domain : "";
  
  document.cookie = name + "=" + encodeURIComponent(value) + expires + cookiePath + cookieDomain;
  console.log(document.cookie)
}
const getRequest = async (url) => 
  {
    console.log(localStorage.getItem("ACCESS_TOKEN"))
    accessToken = localStorage.getItem("ACCESS_TOKEN");
    console.log(cookies_reader('access'))
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } 
    catch (error) 
    {
       await errorHandler(error.response.status,error,url)
    }
};
const patchRequest = async (url, patchData) => {
  console.log(cookies_reader('access'))
  accessToken = localStorage.getItem("ACCESS_TOKEN");
    try {
      const response = await axios.patch(url, patchData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response;
    } 
    catch (error) 
    {
      await errorHandler(error.response,error.status,error,url)
    }
};  
const postRequest = async (url,content_type, postData) => {
  console.log(cookies_reader('access'))
  if(accessToken)
    token = accessToken;
  else if(localStorage.getItem("ACCESS_TOKEN"))
    token = localStorage.getItem("ACCESS_TOKEN");
    
    try {
      const response = await axios.post(url , postData, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Content-Type' : content_type,
          Authorization: `Bearer ${token}`
        }
      });
      if(response.data.access)
      {
        token = response.data.access;
      }
      return response;
    } 
    catch (error) 
    {
       await errorHandler(error.response,error.status,error,url)
    }
}; 
const deleteRequest = async (url) => {
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.status;
    }
    catch (error) 
    {
       await errorHandler(error.response.status,error,url)
    }
}
async function renewToken() {
    try {
      const response = await axios.post(`${baseUrl}/user-api/auth/refresh-token`, {
      });
      // localStorage.removeItem("ACCESS_TOKEN")
      // localStorage.setItem("ACCESS_TOKEN",response.data.access)
      localStorage.getItem("ACCESS_TOKEN") = response.data.access;
      accessToken = response.data.access;
    } 
    catch (error) 
    {
      return error;
    }
}
async function errorHandler(errorRes,errorCode,error,url)
{
    switch(errorRes.status)
    {
        case 401:
           await er401handler(error,url);
            break;
        case 400:
            er400handler(errorRes);
            break;
        case 404:
            er404handler(error);
            break;
    }
}
function er400handler(error) 
{
  //TODO for in list of errors 
  console.log(error.data)
    Object.keys(error.data).forEach((item) => {
      const errorElements = document.querySelectorAll(`[data-title="${item}"]`)
      
      errorElements.forEach((errorElement) => {
        errorElement.classList.add('error');
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      })      
      showAlert(error.data[`${item}`][0]);
    })
}
async function er401handler(error,url) 
{
    if (error.response && error.response.status === 401) {
        try {
          await renewToken();
          return getRequest(url); // Retry the request
        } 
        catch (error) {
          console.error('Error renewing token:', error);
          throw error;
        }
      } 
      //  if refresh token not valid redirect to login page 
      else 
      {
        console.error('GET request failed:', error);
        throw error;
      }
}
function er404handler(error) 
{
    showAlert("یافت نشد")
}


// function errorHandler2(errors,element){
//   errors.forEach(error => {
//     const errorElement = element.querySelector(`[data-value=${error.key}]`)
//     if (!errorElement) return;
    
    
//   });
// }


export  { getRequest ,  patchRequest ,  postRequest ,  deleteRequest , baseUrl , renewToken }
// async function getRequest(url){
//         return axios.get(url, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
// }
// async function patchRequest(url,patchData){
//     return axios.patch(url,patchData ,{
//         headers: {

//             Authorization: `Bearer ${token}`
//         }
//     });
// }

// async function postRequest(url,postData){
//   console.log(accessToken)
//     return axios.post(url, postData , {
//         headers: {
//             // 'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${token}`

//         }
//     });
// }
// // async function deleteRequest(url){
//     return axios.delete(url, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });

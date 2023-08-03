import { showAlert } from "../Question Design Pages/CommonActions/CommonActions.js";

// let baseUrl = 'https://codinto-line.codinguy.ir';

let baseUrl = 'https://mostafarm7.pythonanywhere.com'

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
export const cookie_setter = (cname, cvalue, exdays = 2) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const getRequest = async (url) => 
  {
    accessToken = cookies_reader('access');

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
  accessToken = cookies_reader('access');
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
      return(await errorHandler(error.response,error.status,error,url))
    }
};  
const postRequest = async (url,content_type, postData) => {
  if(accessToken)
    token = accessToken;
  else if(cookies_reader('access'))
    token = cookies_reader('access');
    
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
      cookie_setter('access',response.data.access)
      response.data.access = cookies_reader('access') 
      token = cookies_reader('access');
    } 
    catch (error) 
    {
      window.open('LoginPage.html')
      return error;
    }
}
export async function errorHandler(errorRes,errorCode,error,url)
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

  if(Array.isArray(error.data))
  {
    error.data.forEach((item) => {
      if(document.querySelector(`#Q${Object.keys(item)[0]}`))
      {
        document.querySelector(`#Q${Object.keys(item)[0]}`).classList.add('error_occur')
        document.querySelector(`#Q${Object.keys(item)[0]}`).scrollIntoView()
        showAlert(item[Object.keys(item)[0]][0])
      }
    })
  }
      else
      {
        Object.keys(error.data).forEach((item) => {
          const errorElements = document.querySelectorAll(`[data-title="${item}"]`)
          
          errorElements.forEach((errorElement) => {
            errorElement.classList.add('error');
            errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          })      
          showAlert(error.data[`${item}`][0]);
        })
      }
      throw error;
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
    window.open("404Page.html")
}


export  { getRequest ,  patchRequest ,  postRequest ,  deleteRequest , baseUrl , renewToken }

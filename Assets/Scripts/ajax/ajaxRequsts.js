import { showAlert } from "../Question Design Pages/CommonActions.js";
let baseUrl = 'http://codinto-line.codinguy.ir';
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NDg1NTk5LCJqdGkiOiJhNDZlZGMzOTg3MTE0ZDc0OTYzMDI2MWY2MTMxMzZlMSIsInVzZXJfaWQiOjF9.S4jJOFS7nMjhwb5q4fssHslS1H7W--a5ktAOZTikjzI";
let accessToken;

const getRequest = async (url) => 
  {
    accessToken = localStorage.getItem("ACCESS_TOKEN");
    console.log(accessToken)
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
  
const postRequest = async (url, postData) => {
  console.log(accessToken)
  if(accessToken)
    token = accessToken;
  else
    token = accessToken = localStorage.getItem("ACCESS_TOKEN");
    try {
      const response = await axios.post(url, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
      localStorage.removeItem("ACCESS_TOKEN")
      localStorage.setItem("ACCESS_TOKEN",response.data.access)
      accessToken = response.data.access;
    } 
    catch (error) 
    {
      return error;
    }
  }

async function errorHandler(errorRes,errorCode,error,url)
{
    switch(errorCode)
    {
        case 401:
           await er401handler(error,url);
            break;
        case 400:
            er400handler(error);
            break;
        case 404:
            er404handler(error);
            break;
    }
}
function er400handler(error) 
{
    console.log('400 er ' + error)
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

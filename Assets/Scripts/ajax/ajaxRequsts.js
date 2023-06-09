let baseUrl = 'http://codinto-line.codinguy.ir';
let token;
// 
function TokenInitializer(InitToken) {
    token = InitToken
}
const getRequest = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
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
    try {
      const response = await axios.patch(url, patchData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data;
    } 
    catch (error) 
    {
       await errorHandler(error.response.status,error)
    }
  };
  
  const postRequest = async (url, postData) => {
    try {
      const response = await axios.post(url, postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data;
    } 
    catch (error) 
    {
       await errorHandler(error.response.status,error,url)
    }
  };
  
  const deleteRequest = async (url) => {
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
      token= response.data.access;
    } 
    catch (error) 
    {
      return error;
    }
  }
export  { getRequest ,  patchRequest ,  postRequest ,  deleteRequest , baseUrl , renewToken , TokenInitializer}
async function errorHandler(errorCode,error,url)
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
   
      
}
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
//     return axios.post(url, postData , {
//         headers: {

//             'Authorization': `Bearer ${token}`

//         }
        
//     });
// }
// async function deleteRequest(url){
//     return axios.delete(url, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });

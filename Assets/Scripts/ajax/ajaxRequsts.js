let baseUrl = 'http://codinto-line.web97.ir';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NDg1NTk5LCJqdGkiOiJhNDZlZGMzOTg3MTE0ZDc0OTYzMDI2MWY2MTMxMzZlMSIsInVzZXJfaWQiOjF9.S4jJOFS7nMjhwb5q4fssHslS1H7W--a5ktAOZTikjzI"
async function getRequest(url){
        return axios.get(url, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NDg1NTk5LCJqdGkiOiJhNDZlZGMzOTg3MTE0ZDc0OTYzMDI2MWY2MTMxMzZlMSIsInVzZXJfaWQiOjF9.S4jJOFS7nMjhwb5q4fssHslS1H7W--a5ktAOZTikjzI`
            }
        });
}
async function patchRequest(url,patchData){
    return axios.patch(url,patchData ,{
        headers: {

            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NDg1NTk5LCJqdGkiOiJhNDZlZGMzOTg3MTE0ZDc0OTYzMDI2MWY2MTMxMzZlMSIsInVzZXJfaWQiOjF9.S4jJOFS7nMjhwb5q4fssHslS1H7W--a5ktAOZTikjzI`
        }
    });
}

async function postRequest(url,postData){
    return axios.post(url, postData , {
        headers: {

            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NDg1NTk5LCJqdGkiOiJhNDZlZGMzOTg3MTE0ZDc0OTYzMDI2MWY2MTMxMzZlMSIsInVzZXJfaWQiOjF9.S4jJOFS7nMjhwb5q4fssHslS1H7W--a5ktAOZTikjzI`

        }
        
    });
}
async function deleteRequest(url){
    return axios.delete(url, {
        headers: {

            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NDg1NTk5LCJqdGkiOiJhNDZlZGMzOTg3MTE0ZDc0OTYzMDI2MWY2MTMxMzZlMSIsInVzZXJfaWQiOjF9.S4jJOFS7nMjhwb5q4fssHslS1H7W--a5ktAOZTikjzI`
        }
    });
}


export  { getRequest ,  patchRequest ,  postRequest ,  deleteRequest , baseUrl}




function response400(){

}

function response401(){

}
function response404(){

}
function response403(){

}
function response500(){

}




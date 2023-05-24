let baseUrl = 'http://codinto-line-flash.web97.ir';
async function getRequest(url){
        return axios.get(url, {
            headers: {
                Authorization: "Bearer git "
            }
        });
}
async function patchRequest(url,patchData){
    return axios.patch(url,patchData ,{
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2MzA2NjQzLCJqdGkiOiJlNzhlMTJkZDM3MDA0NTU3YjE1ZTkwMDcyOWNkOWE2MSIsInVzZXJfaWQiOjF9.73y9EcnEXIsViTgGWkHbdA25tamDaV_o_jpuuG7qGIY"
        }
    });
}

async function postRequest(url,postData){
    return axios.post(url, postData , {
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2MzA2NjQzLCJqdGkiOiJlNzhlMTJkZDM3MDA0NTU3YjE1ZTkwMDcyOWNkOWE2MSIsInVzZXJfaWQiOjF9.73y9EcnEXIsViTgGWkHbdA25tamDaV_o_jpuuG7qGIY",
<<<<<<< HEAD
            'Content-Type': 'multipart/form-data'

=======
            'Content-Type': 'application/json'
>>>>>>> 71597a747cd77bb5e015e49f78c1a94968348ee5
        }
    });
}
async function deleteRequest(url){
    return axios.delete(url, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2MzA2NjQzLCJqdGkiOiJlNzhlMTJkZDM3MDA0NTU3YjE1ZTkwMDcyOWNkOWE2MSIsInVzZXJfaWQiOjF9.73y9EcnEXIsViTgGWkHbdA25tamDaV_o_jpuuG7qGIY"
        }
    });
}
export  { getRequest ,  patchRequest ,  postRequest ,  deleteRequest , baseUrl}
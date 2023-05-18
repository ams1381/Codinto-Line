let baseUrl = 'http://codinto-line-flash.web97.ir';
async function getRequest(url){
        return axios.get(url, {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0NTY1MTQ5LCJqdGkiOiI2ZDk2MTZlODY2ZjA0ZTNjYjU5ODgyODRmMDkwZjZmMiIsInVzZXJfaWQiOjF9.Htd-3K2LmyOtF3rPcpd9pc2Xez-fMe4g8UvMFGNKRJM"
            }
        });
}
async function patchRequest(url,patchData){
    return axios.patch(url,patchData ,{
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0NTY1MTQ5LCJqdGkiOiI2ZDk2MTZlODY2ZjA0ZTNjYjU5ODgyODRmMDkwZjZmMiIsInVzZXJfaWQiOjF9.Htd-3K2LmyOtF3rPcpd9pc2Xez-fMe4g8UvMFGNKRJM"
        }
    });
}
async function postRequest(url,postData){
    return axios.post(url, postData , {
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0NTY1MTQ5LCJqdGkiOiI2ZDk2MTZlODY2ZjA0ZTNjYjU5ODgyODRmMDkwZjZmMiIsInVzZXJfaWQiOjF9.Htd-3K2LmyOtF3rPcpd9pc2Xez-fMe4g8UvMFGNKRJM",
            'Content-Type': 'application/json'
        }
    });
}
async function deleteRequest(url){
    return axios.delete(url, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0NTY1MTQ5LCJqdGkiOiI2ZDk2MTZlODY2ZjA0ZTNjYjU5ODgyODRmMDkwZjZmMiIsInVzZXJfaWQiOjF9.Htd-3K2LmyOtF3rPcpd9pc2Xez-fMe4g8UvMFGNKRJM"
        }
    });
}
export  { getRequest ,  patchRequest ,  postRequest ,  deleteRequest , baseUrl}
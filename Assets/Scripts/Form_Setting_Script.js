const cancel_form = document.querySelector(".cancel-Form");
const confirm_form = document.querySelector('.FormFooter .save-Form');

cancel_form.addEventListener('click',() => {
    window.open('Folders.html')
})
const create_folder_handler = async () => {
    const data = await axios.post('http://codinto-line-flash.web97.ir/user-api/folders/', {
        name : 'amir',

        headers : {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0NTY1MTQ5LCJqdGkiOiI2ZDk2MTZlODY2ZjA0ZTNjYjU5ODgyODRmMDkwZjZmMiIsInVzZXJfaWQiOjF9.Htd-3K2LmyOtF3rPcpd9pc2Xez-fMe4g8UvMFGNKRJM'
        }
    })
    console.log(data)
}
confirm_form.addEventListener("click",create_folder_handler);


const rename_folder_popup = document.querySelector(".renameFolderPopUp");
const folder_cancel_button = document.querySelectorAll(".cancel-button");
const rename_folder_button = document.querySelectorAll(".FolderEdit");
const add_form_item = document.querySelector(".form.AddForm");
const create_folder_confirm_btn = document.querySelector(".createFolderPopUp .confirm-button");
const rename_folder_confirm_btn = document.querySelector(".renameFolderPopUp .confirm-button")
const create_folder_name_input = document.querySelector("#create_folder_name");
const rename_folder_input = document.querySelector("#rename_folder_name");
const addFormButton = document.querySelector(".form.AddForm");
const create_folder_popup = document.querySelector(".createFolderPopUp");
const add_folder_button = document.querySelector(".AddFolder");
const search_folder_button = document.querySelector(".FolderSearch");
const search_folder_input = document.querySelector("#search-input");
const search_folder_container = document.querySelector(".search-box");
const folder_items = document.querySelectorAll(".sideBody .Folder");
const removeFolder = document.querySelectorAll(".Selected .FolderRemove");


const folder_mask_close_panel = () => {
   if(create_folder_popup.classList.contains("active"))
         create_folder_popup.classList.remove("active");
   if(rename_folder_popup.classList.contains("active"))
         rename_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");  
}
const search_button_handler = () => {
    nav_search_container.classList.toggle("search-active");
    search_folder_button.classList.toggle("search-active");
    search_folder_container.classList.toggle("search-active");
}
const folder_creator_handler = () => {
    console.log(create_folder_name_input.value)
}
const setActive_folder = (folder_item,elements) => {
    if(folder_item.classList.contains("Selected"))
        return;
    folder_items.forEach((item) => {
        
      if (item !== folder_item) {
        item.classList.remove('Selected');
      }
    });
    folder_item.classList.toggle('Selected');
  }
const folder_rename_handler = () => {
    let folder_name = document.querySelector(".Selected .FolderName p");

    folder_name.textContent = rename_folder_input.value;
    rename_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active"); 
}
const folder_remove_handler = () => {
    document.querySelector(".Selected.Folder").remove();
}
addFormButton.addEventListener('click',() => {
    window.open('Setting.html','_self')
});

nav_mask.addEventListener("click" , folder_mask_close_panel);

add_folder_button.addEventListener("click",create_folder_popup_handler);

search_folder_button.addEventListener("click",search_button_handler)

folder_cancel_button.forEach((item,index) => { item.addEventListener('click',folder_mask_close_panel) })

rename_folder_button.forEach((item,index) => { item.addEventListener('click',rename_folder_popup_handler); })

create_folder_confirm_btn.addEventListener('click',folder_creator_handler);

rename_folder_confirm_btn.addEventListener('click',folder_rename_handler);

removeFolder.forEach((item,index) => { item.addEventListener('click',folder_remove_handler) })

folder_items.forEach((folder_item,index) => {
    folder_item.addEventListener('click',(item,index) => {
       setActive_folder(folder_item,folder_items);
    })
})
const nav_menu = document.querySelector(".navMenu");
const nav_menu_toggle = document.querySelector(".navToggleButton");
const nav_mask = document.querySelector(".screen-mask");
const create_folder_popup = document.querySelector(".createFolderPopUp");
const add_folder_button = document.querySelector(".AddFolder");
const nav_search_container = document.querySelector(".navTitle");
const search_folder_button = document.querySelector(".FolderSearch");
const search_folder_input = document.querySelector("#search-input");
const search_folder_container = document.querySelector(".search-box");
const nav_title_text = document.querySelector(".sidebar-codinto-title");

const menu_toggle_handler = () => {
    nav_menu.classList.toggle("active");
    nav_mask.classList.toggle("active");
}
const mask_close_panel = () => {
    if(nav_menu.classList.contains("active"))
         nav_menu.classList.remove("active");

    else if(create_folder_popup.classList.contains("active"))
         create_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");  
}
const folder_popup_handler = () => {
    create_folder_popup.classList.add("active");
    nav_mask.classList.add("active");
}
const search_button_handler = () => {
    nav_search_container.classList.toggle("search-active");
    search_folder_button.classList.toggle("search-active");
    search_folder_container.classList.toggle("search-active");
}
nav_menu_toggle.addEventListener("click" , menu_toggle_handler);
nav_mask.addEventListener("click" , mask_close_panel);

if(add_folder_button)
    add_folder_button.addEventListener("click",folder_popup_handler);
if(search_folder_button)
    search_folder_button.addEventListener("click",search_button_handler)
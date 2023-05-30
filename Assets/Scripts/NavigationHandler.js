const nav_menu = document.querySelector(".navMenu");
const nav_menu_toggle = document.querySelector(".navToggleButton");
const nav_mask = document.querySelector(".screen-mask");
const nav_title_text = document.querySelector(".sidebar-codinto-title");


const menu_toggle_handler = () => {
    nav_menu.classList.toggle("active");
    nav_mask.classList.toggle("active");
}
const mask_close_panel = () => {
    if(nav_menu.classList.contains("active"))
         nav_menu.classList.remove("active");
    nav_mask.classList.remove("active");  
}


nav_menu_toggle.addEventListener("click" , menu_toggle_handler);
nav_mask.addEventListener("click" , mask_close_panel);


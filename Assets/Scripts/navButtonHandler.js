const nav_menu = document.querySelector(".navMenu");
const nav_menu_toggle = document.querySelector(".navToggleButton");
const nav_mask = document.querySelector(".nav-mask");


const menu_toggle_handler = () => {
    nav_menu.classList.toggle("hide");
    nav_mask.classList.toggle("active");
}
nav_menu_toggle.addEventListener("click" , menu_toggle_handler());
nav_mask.addEventListener("click" , menu_toggle_handler());
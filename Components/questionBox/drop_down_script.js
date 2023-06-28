const slider_button = document.querySelector(".slider_toggle_button");
const slider_options = document.querySelectorAll('.selection__item');

slider_button.addEventListener('click',() => {
        if(slider_button.classList.contains("up"))
        {
            $(slider_options).slideDown(100);
            slider_button.classList.remove("up");
        }
        else
        {
            $(slider_options).slideUp(10);
            slider_button.classList.add("up");
        }
    })
    slider_options.forEach((item) => {
        item.addEventListener('click',() => {
            setActive_slide_item(item,slider_options);
            $(slider_options).not(".slide_selected").slideUp(10);
            slider_button.classList.add("up");
            if(item.firstElementChild.checked)
                console.log(item)
        })
        
    })
    const setActive_slide_item = (slide_option,slide_options) => {
        if(slide_option.classList.contains("slide_selected"))
            return;
        slide_options.forEach((item) => {
            item.classList.remove('slide_selected');
        })
        slide_option.classList.add("slide_selected")
    }


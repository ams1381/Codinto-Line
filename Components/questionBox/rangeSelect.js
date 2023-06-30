export const range_item_eventListener_setter = (range_select_options) => {
    range_select_options.forEach((range_select_option) => {
        range_select_option.addEventListener('click', () => {
            setActive_range_item(range_select_option,range_select_options)
        })
    });
    const setActive_range_item = (slide_option,slide_options) => {
        if(slide_option.classList.contains("range__active"))
            return;
            range_select_options.forEach((item) => {
            item.classList.remove('range__active');
        })
        slide_option.classList.add("range__active")
    }
}

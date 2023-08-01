import {showAlert} from "./CommonActions.js";
const preview_options_container = document.querySelector(".multiple_answer_block-options");
const preview_slider_container = document.querySelector(".selection__box");
const answer_options_container = document.querySelector(".Answer-Options");
const all_options_toggle = document.querySelector(".all_options .Switch-Container .slider-button");
const no_options_toggle = document.querySelector(".nothing_selected .Switch-Container .slider-button");
let answer_options = document.querySelectorAll(".Answer-Option");

export const preview_answer_option_remover = (Option_Type) => {
    let preview_answer_options;
    switch (Option_Type) {
        case 'MultipleOption' :
            preview_answer_options = document.querySelectorAll(".multiple_answer_block-option");
            if (preview_answer_options.length > 2) {
                $(preview_answer_options[preview_answer_options.length - 1]).hide(300);
                preview_answer_options[preview_answer_options.length - 1].remove();
            }

            break;
        case 'SliderOption' :
            preview_answer_options = document.querySelectorAll(".selection__box  .selection__item");
            if (preview_answer_options.length > 2) {
                $(preview_answer_options[preview_answer_options.length - 1]).hide(300);
                preview_answer_options[preview_answer_options.length - 1].remove();
            }

            break;
    }
}
export const answer_option_remover = (Option_Type, PostData) => {
    answer_options = document.querySelectorAll(".Answer-Option");
    let last_answer_option = answer_options[answer_options.length - 1];
    let last_option_input = document.querySelector(`#${last_answer_option.getAttribute("id")} .anw-option-input`);
    if (answer_options.length > 2) {
        $(last_answer_option).hide(80);
        last_answer_option.remove();
        preview_answer_option_remover(Option_Type);
        if (PostData)
            PostData.options.pop();
    }
    if (last_option_input.value == 'هیچ کدام') {
        no_options_toggle.previousElementSibling.checked = false;
        PostData.options.forEach((item, index) => {
            if (item.text == 'هیچ کدام') {
                PostData.options.splice(index, 1);
            }
        })
        PostData.nothing_selected = false;
    }
    if (last_option_input.value == 'همه گزینه ها') {
        all_options_toggle.previousElementSibling.checked = false;
        PostData.options.forEach((item, index) => {
            if (item.text == 'همه گزینه ها') {
                PostData.options.splice(index, 1);
            }
        })
        PostData.all_options = false;
    }
    if (answer_options.length == 2) {
        showAlert('دو گزینه را نمی توان حذف یا مخفی کرد')
    }
}
export const preview_answer_option_generator = (preview_option_number, Option_Type, Option_Text) => {
    let preview_answer_option;
    let container_to_append;
    switch (Option_Type) {
        case 'MultipleOption' :
            preview_answer_option = `
            <div class="multiple_answer_block-option" id="preview-option-${preview_option_number}">
                <input type="radio" name="answer__option" id="answer-n${preview_option_number}">
                <label class="answer_option-label" for="answer-n${preview_option_number}">${Option_Text}</label>
            </div>
            `
            container_to_append = preview_options_container;
            break;
        case 'SliderOption':
            preview_answer_option = `
            <span class="selection__item" id="select_item_${preview_option_number}">
                <input class="select_item_input" type="radio" id="select_item_input_${preview_option_number}">
                <label for="select_item_input_${preview_option_number}">${Option_Text}</label>
            </span>
            `
            container_to_append = preview_slider_container;
            break;
    }
    const parser = new DOMParser();
    const parsed_preview_answer_option = parser.parseFromString((preview_answer_option), 'text/html').firstChild.lastChild.firstChild;
    $(parsed_preview_answer_option).hide(50);
    container_to_append.append(parsed_preview_answer_option);
    $(parsed_preview_answer_option).show(100);
}
export const preview_answer_option_hider = (view_button, option_number, Option_Type) => {
    answer_options = document.querySelectorAll(".Answer-Option");
    let preview_answer_options, totalElements, hiddenELements;

    switch (Option_Type) {
        case 'MultipleOption' :
            preview_answer_options = document.querySelectorAll(".multiple_answer_block-option");
            hiddenELements = document.querySelectorAll(".multiple_answer_block-option.hidden_option");
            break;

        case 'SliderOption' :
            preview_answer_options = document.querySelectorAll(".selection__item");
            hiddenELements = document.querySelectorAll(".selection__item.hidden_option");
            break;
    }
    if (answer_options.length > 2) {
        if (!view_button.classList.contains("hidden-option") && (preview_answer_options.length - hiddenELements.length > 2)) {
            document.querySelector(`#anw-option-${option_number + 1} .answer-option-view i`).className = 'fa fa-eye-slash';
            $(preview_answer_options[option_number]).hide(50)
            preview_answer_options[option_number].classList.add("hidden_option");
        } else {
            document.querySelector(`#anw-option-${option_number + 1} .answer-option-view i`).className = 'fa fa-eye';
            $(preview_answer_options[option_number]).show(50);
            preview_answer_options[option_number].classList.remove("hidden_option");
        }
        view_button.classList.toggle("hidden-option");
    }
    if (answer_options.length == 2) {
        showAlert('دو گزینه را نمی توان حذف یا مخفی کرد')
    }
}
export const answer_option_adder = (Option_Type, Option_Text, PostData) => {
    answer_options = document.querySelectorAll(".Answer-Option");
    let Last_answer_option = answer_options[answer_options.length - 1];
    let last_answer_option_number = parseInt(Last_answer_option.getAttribute("id").split("-")[2]);
    const answer_option_element = `
    <div class="Answer-Option" id="anw-option-${last_answer_option_number + 1}">
            <div class="anw-option-number">
                <label class="anw-option-label">
                  ${(last_answer_option_number + 1)}
                </label>  
                <input type="text" class="anw-option-input" id="option_input_${last_answer_option_number + 1}" placeholder="${Option_Text ? Option_Text : `گزینه ${last_answer_option_number + 1}`}">    
            </div>
            <div class="anw-option-tools">
                <button class="answer-option-view">
                    <i class="fa fa-eye"></i>
                </button>
                <button class="answer-option-remove">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="answer-option-add">
                    <i class="fa fa-plus-circle"></i>
                </button>
            </div>
     </div>`
    const parser = new DOMParser();
    const parsed_answer_option_element = parser.parseFromString((answer_option_element), 'text/html').firstChild.lastChild.lastChild;

    answer_options_container.append(parsed_answer_option_element);
    answer_option_eventListener_setter(last_answer_option_number + 1, Option_Type, PostData);

    preview_answer_option_generator(last_answer_option_number + 1,
        Option_Type, Option_Text ? Option_Text : `گزینه  ${last_answer_option_number + 1}`);
    switch (Option_Type) {
        case 'MultipleOption':
            PostData.options.push(
                {text: Option_Text ? Option_Text : `${last_answer_option_number + 1} گزینه`}
            )
            break;
        case 'SliderOption':
            PostData.options.push(
                {text: Option_Text ? Option_Text : `${last_answer_option_number + 1} گزینه`}
            )
            break;
    }
}
export const answer_option_eventListener_setter = (OptionNumber, Option_Type, PostData) => {
    let answer_option_adder_button = document.querySelector(`#anw-option-${OptionNumber} .anw-option-tools .answer-option-add`);
    let answer_option_remover_button = document.querySelector(`#anw-option-${OptionNumber} .anw-option-tools .answer-option-remove`);
    let answer_option_input = document.querySelector(`#option_input_${OptionNumber}`);
    let answer_option_view_button = document.querySelector(`#anw-option-${OptionNumber} .answer-option-view`);
    answer_option_view_button.addEventListener('click', () => {
        preview_answer_option_hider(answer_option_view_button, OptionNumber - 1, Option_Type);
    })
    answer_option_adder_button.addEventListener("click", () => {
        answer_option_adder(Option_Type, null, PostData);
    })
    answer_option_remover_button.addEventListener("click", () => {
        answer_option_remover(Option_Type, PostData)
    })
    answer_option_input.addEventListener('input', (e) => {
        preview_option_label_updater(OptionNumber - 1, answer_option_input.value, Option_Type, PostData);
    })
}
export const preview_option_label_updater = (input_number, input_value, Option_Type, PostData) => {
    let changed_label;
    switch (Option_Type) {
        case 'MultipleOption' :
            changed_label = document.querySelector(`#preview-option-${input_number + 1} label`);
            PostData.options[input_number]['text'] = input_value.toString();
            ;
            break;
        case 'SliderOption' :
            changed_label = document.querySelector(`#select_item_${input_number + 1} label`);
            PostData.options[input_number]['text'] = input_value.toString();
    }
    changed_label.textContent = input_value;

}
export const additional_options_handler = (Addition_type, state, PostData) => {
    let answer_options = document.querySelectorAll(".Answer-Option");
    all_options_toggle.previousElementSibling.checked = false;
    no_options_toggle.previousElementSibling.checked = false;
    PostData.all_options = false;
    PostData.nothing_selected = false;
    if (Addition_type == 'additional_toggle' && state == 'deActive') {
        PostData.options.forEach((item, index) => {
            if (item.text == 'همه گزینه ها') {
                let item_index = PostData.options.indexOf(item);
                PostData.options.splice(item_index, 1);
            }
        })
        PostData.options.forEach((item, index) => {
            if (item.text == 'هیچ کدام') {
                let item_index = PostData.options.indexOf(item);
                PostData.options.splice(item_index, 1);
            }
        })
        answer_options.forEach((answer_option) => {
            let answer_option_input = document.querySelector(`#${answer_option.getAttribute("id")} .anw-option-input`);
            if (answer_option_input.placeholder == 'همه گزینه ها' || answer_option_input.placeholder == 'هیچ کدام') {
                $(answer_option).hide(70);
                answer_option.remove();
                $(`#preview-option-${answer_option.getAttribute("id").split("-")[2]}`).hide()
                document.querySelector(`#preview-option-${answer_option.getAttribute("id").split("-")[2]}`).remove()
            }
        })
    }
}
export const single_additional_option_toggle_handler = (Addition_text, PostData) => {
    let answer_options = document.querySelectorAll(".Answer-Option");
    PostData.options.forEach((item, index) => {
        if (item.text == Addition_text) {
            PostData.options.splice(index, 1);
        }
    })
    answer_options.forEach((answer_option, index) => {
        let answer_option_input = document.querySelector(`#${answer_option.getAttribute("id")} .anw-option-input`);
        if (answer_option_input.placeholder == Addition_text) {
            $(answer_option).hide(70);
            answer_option.remove();
            $(`#preview-option-${answer_option.getAttribute("id").split("-")[2]}`).hide()
            document.querySelector(`#preview-option-${answer_option.getAttribute("id").split("-")[2]}`).remove();
        }
    })
}
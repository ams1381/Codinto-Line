import { postRequest } from '../ajax/ajaxRequsts.js'
import { baseUrl } from '../ajax/ajaxRequsts.js';

const QuestionnaireUUID = localStorage.getItem("QuestionnaireUUID");
const CreateQuestionUrl = `${baseUrl}/question-api/questionnaires/${QuestionnaireUUID}/optional-questions/`

const Title_input = document.getElementById("title__input");
const Description_input = document.getElementById("desc_input");
const question_preview_title = document.querySelector(".QuestionContainer .Question-Title p");
const question_preview_description = document.querySelector('.QuestionContainer .description_block p');
const multiple_answer_toggle = document.querySelector(".multiple_choice .Switch-toggle .slider-button");
const multiple_answer_selector = document.querySelector(".answer-number-selector");
const answer_options_container = document.querySelector(".Answer-Options");
const additional_options_toggle = document.querySelector(".additional-options-toggle .Switch-Container .slider-button");
const randomize_options_toggle = document.querySelector(".is_random_options .Switch-Container .slider-button");
const vertical_order_toggle = document.querySelector(".is_vertical .Switch-Container .slider-button");
const all_options_toggle = document.querySelector(".all_options .Switch-Container .slider-button");
const no_options_toggle = document.querySelector(".nothing_selected .Switch-Container .slider-button");
const show_number_toggle = document.querySelector(".show_number .Switch-Container .slider-button")
const required_toggle = document.querySelector('.is_required .Switch-Container .slider-button');
const additional_options_selector = document.querySelector(".additional_options");
const preview_options_container = document.querySelector(".multiple_answer_block-options");
const answer_option_inputs = document.querySelectorAll(".anw-option-input");
const answer_option_view_buttons = document.querySelectorAll(".answer-option-view");
const file_input = document.querySelector("#file.box__file")
const answer_number_selector_inputs = document.querySelectorAll('.answer-number-selector .label-text-input');
const save_question_btn = document.querySelector('.SideFooter .saveQuestion')
let answer_options = document.querySelectorAll(".Answer-Option");
let answer_option_buttons = document.querySelectorAll(".anw-option-tools button");

const postData = {
    title : null,
    question_text : null,
    is_required : false,
    multiple_choice : false,
    is_random_options : false,
    max_selected_options : null,
    min_selected_options : null,
    additional_options : false,
    media : null,
    show_number : false,
    all_options : false ,
    nothing_selected : false,
    is_vertical : false,
    options : [
        { text : 'گزینه 1' },
        { text : 'گزینه 2'}
    ]
}
const preview_answer_option_generator = (preview_option_number) => {
    const preview_answer_option = `
    <div class="multiple_answer_block-option">
        <input type="radio" name="answer__option" id="answer-n${preview_option_number}">
        <label class="answer_option-label" for="answer-n${preview_option_number}">گزینه ${preview_option_number}</label>
    </div>
    `
    const parser = new DOMParser();
    const parsed_preview_answer_option = parser.parseFromString((preview_answer_option),'text/html').firstChild.lastChild.firstChild;
    $(parsed_preview_answer_option).hide(50);
    preview_options_container.append(parsed_preview_answer_option);
    $(parsed_preview_answer_option).show(100);
}
const preview_option_label_updater = (input_number,input_value) => {
   let changed_label = document.getElementById(`answer-n${input_number + 1}`).nextElementSibling;
   changed_label.textContent = input_value;

   postData.options[input_number].text = input_value;
}
const preview_answer_option_hider = (view_button,option_number) => {
    answer_options = document.querySelectorAll(".Answer-Option");
    let preview_answer_options = document.querySelectorAll(".multiple_answer_block-option");
    if(answer_options.length > 2)
    {
        if(!view_button.classList.contains("hidden-option"))
        {
            view_button.children[0].className = 'fa fa-eye-slash';
            $(preview_answer_options[option_number]).hide()
        }
            
        else 
        {
            view_button.children[0].className = 'fa fa-eye';
            $(preview_answer_options[option_number]).show(50)
        }
           

         view_button.classList.toggle("hidden-option");

        
    }
        

}
const preview_answer_option_remover = () => {
    let preview_answer_options = document.querySelectorAll(".multiple_answer_block-option");
    if(preview_answer_options.length > 2)
       preview_answer_options[preview_answer_options.length - 1].remove();
}
const preview_change_handler = (ACTION) => 
{
    switch(ACTION) 
    {
        case 'Title-change':
            question_preview_title.textContent = Title_input.value;
            postData.title = Title_input.value;
            break;
        case 'Desc-change':
            question_preview_description.textContent = Description_input.value;
            postData.question_text = Description_input.value;
            break;
    }
}
const answer_option_adder = () => {
    answer_options = document.querySelectorAll(".Answer-Option");
    let Last_answer_option = answer_options[answer_options.length - 1];
    let last_answer_option_number = parseInt(Last_answer_option.getAttribute("id").split("-")[2]);
    const answer_option_element = `
    <div class="Answer-Option" id="anw-option-${last_answer_option_number + 1}">
            <div class="anw-option-number">
                <label class="anw-option-label">
                  ${last_answer_option_number + 1}
                </label>  
                <input type="text" class="anw-option-input" id="option_input_${last_answer_option_number + 1}">    
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
    const parsed_answer_option_element = parser.parseFromString((answer_option_element),'text/html').firstChild.lastChild.lastChild;
    
    answer_options_container.append(parsed_answer_option_element);

    let answer_option_adder_button = document.querySelector(`#anw-option-${last_answer_option_number + 1} .anw-option-tools .answer-option-add`);
    let answer_option_remover_button = document.querySelector(`#anw-option-${last_answer_option_number + 1} .anw-option-tools .answer-option-remove`);
    let answer_option_input = document.querySelector(`#option_input_${last_answer_option_number + 1}`);
    let answer_option_view_button = document.querySelector(`#anw-option-${last_answer_option_number + 1} .answer-option-view`)

    answer_option_view_button.addEventListener('click',() => {
        preview_answer_option_hider(answer_option_view_button,last_answer_option_number);
    })
    answer_option_adder_button.addEventListener("click",() => {
        answer_option_adder();
    })
    answer_option_remover_button.addEventListener("click",() => {
        answer_option_remover();
    })
    answer_option_input.addEventListener('input',(e) => {
        preview_option_label_updater(last_answer_option_number,e.target.value)
    })
    preview_answer_option_generator(last_answer_option_number + 1);

    postData.options.push(
        { text : `${last_answer_option_number + 1} گزینه` }
    )
}
const answer_option_remover = () => {
    answer_options = document.querySelectorAll(".Answer-Option");
    let last_answer_option = answer_options[answer_options.length - 1];
    if(answer_options.length > 2)
    {
        $(last_answer_option).hide(80);
        last_answer_option.remove();
        preview_answer_option_remover();
    }
    
}
const toggle_handler = (toggle_element,toggle_button) => {
    if(!toggle_button.previousElementSibling.checked)
    {
        postData[`${toggle_element.classList[0]}`] = true;
        if(toggle_element)
            toggle_element.classList.add("active");
    }
    else 
    {
        if(toggle_element)
            toggle_element.classList.remove("active");
        if(toggle_element.classList[0] == 'additional_options')
        {
            postData.all_options = false;
            postData.nothing_selected = false;

            all_options_toggle.previousElementSibling.checked = false;
            no_options_toggle.previousElementSibling.checked = false;
        }
        postData[`${toggle_element.classList[0]}`] = false;
        
    }
    console.log(postData)
}
const question_creator =  async () => {
   let createRes = await postRequest(CreateQuestionUrl,postData);
   if(createRes.status == 201)
    {
        window.open("/Pages/FormDesign.html","_Self");
    }
}
save_question_btn.addEventListener('click',question_creator)
answer_number_selector_inputs.forEach((answer_number_selector_input) => {
    answer_number_selector_input.addEventListener('input',() => {
        if(answer_number_selector_input.getAttribute("id") == 'Answermin')
            postData.min_selected_options = answer_number_selector_input.value;
        else 
            postData.max_selected_options = answer_number_selector_input.value;
        
            console.log(postData)
    })
})
answer_option_inputs.forEach((answer_option_input,index) => {
    answer_option_input.addEventListener('input',(e) => {
        preview_option_label_updater(index,e.target.value)
    })
})
answer_option_buttons.forEach((answer_option_button) => {
    if(answer_option_button.classList.contains('answer-option-add'))
        answer_option_button.addEventListener('click',() => {
            answer_option_adder();
        })
    if(answer_option_button.classList.contains('answer-option-remove'))
        answer_option_button.addEventListener('click',() => {
            answer_option_remover();
            preview_answer_option_remover();
        })
})
multiple_answer_toggle.addEventListener('click',() => {
    toggle_handler(multiple_answer_selector,multiple_answer_toggle)
})
file_input.addEventListener('input',() => {
   postData.media = file_input.files[0].name;
})
additional_options_toggle.addEventListener("click",() => {
    toggle_handler(additional_options_selector,additional_options_toggle)
})
answer_option_view_buttons.forEach((answer_option_view_button,index) => {
    answer_option_view_button.addEventListener('click',() => {
        preview_answer_option_hider(answer_option_view_button,index);
    })
})
randomize_options_toggle.addEventListener('click',() => {
    toggle_handler(randomize_options_toggle.parentElement.parentElement.parentElement,randomize_options_toggle);
})
vertical_order_toggle.addEventListener('click',() => {
    toggle_handler(vertical_order_toggle.parentElement.parentElement.parentElement,vertical_order_toggle);
})
all_options_toggle.addEventListener('click',() => {
    toggle_handler(all_options_toggle.parentElement.parentElement.parentElement,all_options_toggle);
})
no_options_toggle.addEventListener('click',() => {
    toggle_handler(no_options_toggle.parentElement.parentElement.parentElement,no_options_toggle);
})
show_number_toggle.addEventListener('click',() => {
    toggle_handler(show_number_toggle.parentElement.parentElement.parentElement,show_number_toggle);
})
required_toggle.addEventListener('click',() => {
    toggle_handler(required_toggle.parentElement.parentElement.parentElement,required_toggle);
})
Title_input.addEventListener('input',() => {preview_change_handler('Title-change')});
Description_input.addEventListener('input',() => {preview_change_handler('Desc-change')});
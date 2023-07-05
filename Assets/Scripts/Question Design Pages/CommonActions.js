import { baseUrl , postRequest , patchRequest} from "../ajax/ajaxRequsts.js";
import { multiple_option_postData } from "../ajax/QuestionPostData.js";
import { slider_option_postData } from "../ajax/QuestionPostData.js";

const block_main = document.querySelector('.block__main');
const block_side = document.querySelector('.block__side');

const preview_container_main = document.querySelector(".preview_file_box");
const is_alphabetic_toggle = document.querySelector('.is_alphabetic_order .Switch-Container .slider-button')
const randomize_options_toggle = document.querySelector(".is_random_options .Switch-Container .slider-button");
const preview_image_main = document.querySelector(".preview_file_box .preview_image");
const preview_video_main = document.querySelector(".preview_file_box .preview_video");
const preview_image_side = document.querySelector(".inputUploader .uploaded_file_image");
const preview_file_name_side = document.querySelector(".inputUploader .uploaded_file_name p");
const preview_image_cancel_button = document.querySelector(".inputUploader ")
const question_preview_title = document.querySelector(".QuestionContainer .Question-Title p");
const question_preview_description = document.querySelector('.QuestionContainer .description_block p');
const preview_options_container = document.querySelector(".multiple_answer_block-options");
const preview_slider_container = document.querySelector(".selection__box");
const answer_options_container = document.querySelector(".Answer-Options");
const wrongAlert = document.querySelector(".wrongEntry");
const Title_input = document.getElementById("title__input");
const all_options_toggle = document.querySelector(".all_options .Switch-Container .slider-button");
const no_options_toggle = document.querySelector(".nothing_selected .Switch-Container .slider-button");
const Description_input = document.getElementById("desc_input");
const preview_answer_options_container = document.querySelector(".multiple_answer_block-options")
const question_preview_number = document.querySelector(".QuestionContainer .Question-Title label");
const save_button = document.querySelector('.SideFooter .saveQuestion');
let answer_options = document.querySelectorAll(".Answer-Option");

const file_input_container = document.querySelector(".inputUploader");

export const  showAlert = (text) => 
{
    wrongAlert.style.opacity = "1";
    if(document.querySelector('.block__side'))
       document.querySelector('.block__side').scrollTo(0,0)
    window.scrollTo(0,0)
    let spanInput =  wrongAlert.childNodes[1]
    spanInput.innerText = `${text}`
    setTimeout(()=> 
    {
        wrongAlert.style.opacity = "0";
    }, 3000);
}
export const text_style_setter = (EditableQuestion,text_type,PostData,Style,preview_text,input,input_text) => {
    switch(Style)
    {
        case 'fa fa-bold':
            if(EditableQuestion)
                text_style_class_setter(input,input_text,text_type,'bold',preview_text,"strong",EditableQuestion);
            else 
                text_style_class_setter(input,input_text,text_type,'bold',preview_text,"strong",PostData);
            break;
        case 'fa fa-italic':
            if(EditableQuestion)
                text_style_class_setter(input,input_text,text_type,'italic',preview_text,"em",EditableQuestion);
            else 
                text_style_class_setter(input,input_text,text_type,'italic',preview_text,"em",PostData);
            break;
        case 'fa fa-underline':
            if(EditableQuestion)
                text_style_class_setter(input,input_text,text_type,'underline',preview_text,"u",EditableQuestion);
            else 
                text_style_class_setter(input,input_text,text_type,'underline',preview_text,"u",PostData);
            break;
    }
}
const text_style_class_setter = (input,input_text,text_type,text_style,preview_text,style_tag,PostData) => {
    input.classList.toggle(text_style)
    if(![...input.classList].includes(text_style))
    {
        preview_text.classList.remove(`${text_style}`);
        if(text_type == "title")
            PostData.title = input_text;
        else if(text_type == "description")
            PostData.question_text = input_text;
    }
    else   
    {
        preview_text.classList.add(text_style)
        if(text_type == "title")
            PostData.title = `<${style_tag}>${input_text}</${style_tag}>`
        else if(text_type == "description")
            PostData.question_text = `<${style_tag}>${input_text}</${style_tag}>`;
    }
}
export const preview_question_toggle = () => {
    if(block_main.classList.contains('preview_active'))
    {
        block_main.classList.remove('preview_active');
        block_side.classList.remove('preview_active');
        $(block_main).hide(80);
        $(block_side).show(120);
    }
    else
    {
        block_main.classList.add('preview_active');
        block_side.classList.add('preview_active');
        $(block_main).show(80);
        $(block_side).hide(120);
    }
    window.addEventListener('resize',() => {
        if(window.innerWidth > 770)
        {
            block_main.classList.remove('preview_active');
            block_side.classList.remove('preview_active');
            $(block_side).show(120);
        }
        
    })
}
export const preview_answer_option_remover = (Option_Type) => {
    let preview_answer_options;
    switch(Option_Type)
    {
        case 'MultipleOption' :
            preview_answer_options = document.querySelectorAll(".multiple_answer_block-option");
            if(preview_answer_options.length > 2)
            {
                $(preview_answer_options[preview_answer_options.length - 1]).hide(300);
                preview_answer_options[preview_answer_options.length - 1].remove();
            }
               
            break;
        case 'SliderOption' : 
            preview_answer_options = document.querySelectorAll(".selection__box  .selection__item");
            if(preview_answer_options.length > 2)
            {
                $(preview_answer_options[preview_answer_options.length - 1]).hide(300);
                preview_answer_options[preview_answer_options.length - 1].remove();
            }
              
            break;
    }
}
export const preview_answer_option_generator = (preview_option_number,Option_Type,Option_Text) => 
{
    let preview_answer_option;
    let container_to_append;
    switch(Option_Type)
    {
        case 'MultipleOption' : 
            preview_answer_option = `
            <div class="multiple_answer_block-option">
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
                <label for="select_item_input_${preview_option_number}">گزینه ${preview_option_number}</label>
            </span>
            `
            container_to_append = preview_slider_container;
            break;
    }
    const parser = new DOMParser();
    const parsed_preview_answer_option = parser.parseFromString((preview_answer_option),'text/html').firstChild.lastChild.firstChild;
    $(parsed_preview_answer_option).hide(50);
    container_to_append.append(parsed_preview_answer_option);
    $(parsed_preview_answer_option).show(100);
}
export const preview_change_handler = (EditableQuestion,ACTION,PostData) => 
{
    switch(ACTION) 
    {
        case 'Title-change':
            question_preview_title.textContent = Title_input.value;
            PostData.title = Title_input.value;
            if(EditableQuestion)  
                EditableQuestion.title = Title_input.value;
            break;
        case 'Desc-change':
            question_preview_description.textContent = Description_input.value;
            if(PostData.description !== undefined) 
                PostData.description = Description_input.value;
            else
              PostData.question_text = Description_input.value;
            if(EditableQuestion)
            {
                if(EditableQuestion.question_text) 
                  EditableQuestion.question_text = Description_input.value;
                else
                  EditableQuestion.description = Description_input.value;
            }
            break;
    }
}
export const preview_answer_option_hider = (view_button,option_number,Option_Type) => {
    answer_options = document.querySelectorAll(".Answer-Option");
    let preview_answer_options;
    switch(Option_Type)
    {
        case 'MultipleOption' :
            preview_answer_options = document.querySelectorAll(".multiple_answer_block-option");
            break;

        case 'SliderOption' :
            preview_answer_options = document.querySelectorAll(".selection__item");
            break;
    }
    if(answer_options.length > 2)
    {
        let totalElements = document.querySelectorAll(".selection__item");
        let hiddenELements =  document.querySelectorAll(".selection__item.hidden_option");
        console.log(totalElements.length - hiddenELements.length)
        if(!view_button.classList.contains("hidden-option") && (totalElements.length - hiddenELements.length > 2))
        {
            view_button.children[0].className = 'fa fa-eye-slash';
            $(preview_answer_options[option_number]).hide(50)
            preview_answer_options[option_number].classList.add("hidden_option");
        }
        else 
        {
            view_button.children[0].className = 'fa fa-eye';
            $(preview_answer_options[option_number]).show(50);
            preview_answer_options[option_number].classList.remove("hidden_option");
        }
         view_button.classList.toggle("hidden-option");
    } 
}
export const answer_option_adder = (Option_Type,Option_Text,PostData) => {
    answer_options = document.querySelectorAll(".Answer-Option");
    let Last_answer_option = answer_options[answer_options.length - 1];
    let last_answer_option_number = parseInt(Last_answer_option.getAttribute("id").split("-")[2]);
    const answer_option_element = `
    <div class="Answer-Option" id="anw-option-${last_answer_option_number + 1}">
            <div class="anw-option-number">
                <label class="anw-option-label">
                  ${(last_answer_option_number + 1)}
                </label>  
                <input type="text" class="anw-option-input" id="option_input_${last_answer_option_number + 1}" value="${Option_Text ? Option_Text : ''}">    
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
    answer_option_eventListener_setter(last_answer_option_number + 1,Option_Type,PostData);
    
    preview_answer_option_generator(last_answer_option_number + 1,
        Option_Type ,Option_Text ?  Option_Text :`گزینه ی ${last_answer_option_number + 1}`);

    switch(Option_Type)
    {
        case 'MultipleOption':
            PostData.options.push(
                { text : Option_Text ? Option_Text : last_answer_option_number + 1 }
            )
            break;
        case 'SliderOption':
            PostData.options.push(
                { text : Option_Text ? Option_Text : last_answer_option_number + 1 }
            )
            break;
    }
    
}
export const answer_option_eventListener_setter = (OptionNumber,Option_Type,PostData) => {
    
    let answer_option_adder_button = document.querySelector(`#anw-option-${OptionNumber} .anw-option-tools .answer-option-add`);
    let answer_option_remover_button = document.querySelector(`#anw-option-${OptionNumber} .anw-option-tools .answer-option-remove`);
    let answer_option_input = document.querySelector(`#option_input_${OptionNumber}`);
    let answer_option_view_button = document.querySelector(`#anw-option-${OptionNumber} .answer-option-view`);

    answer_option_view_button.addEventListener('click',() => {
        preview_answer_option_hider(answer_option_view_button,OptionNumber - 1,Option_Type);
    })
    answer_option_adder_button.addEventListener("click",() => {
        answer_option_adder(Option_Type,PostData);
    })
    answer_option_remover_button.addEventListener("click",() => {
        answer_option_remover(Option_Type);
    })
    answer_option_input.addEventListener('input',(e) => {
        preview_option_label_updater(OptionNumber - 1,e.target.value,Option_Type);
    })
}
export const answer_option_remover = (Option_Type,Option_Number) => {
    answer_options = document.querySelectorAll(".Answer-Option");
    let last_answer_option = answer_options[answer_options.length - 1];
    if(answer_options.length > 2)
    {
        $(last_answer_option).hide(80);
        last_answer_option.remove();
        preview_answer_option_remover(Option_Type);
    }
    
}
export const preview_option_label_updater = (input_number,input_value,Option_Type) => {
    let changed_label;
    switch(Option_Type)
    {
        case 'MultipleOption' :
            changed_label = document.getElementById(`answer-n${input_number + 1}`).nextElementSibling;
            multiple_option_postData.options[input_number]['text'] = input_value.toString();;
            break;
        case 'SliderOption' :
            changed_label = document.querySelector(`#select_item_${input_number + 1} label`);
            slider_option_postData.options[input_number]['text'] = input_value.toString();
    }
    changed_label.textContent = input_value;
    
 }
export const toggle_handler = (EditableQuestion,toggle_element,toggle_button,PostData) => {
    if(!toggle_button.previousElementSibling.checked)
    {
            PostData[`${toggle_element.classList[0]}`] = true;
            if(EditableQuestion)
              EditableQuestion[`${toggle_element.classList[0]}`] = true;
        if(toggle_element)
            toggle_element.classList.add("active");
        switch(toggle_element.classList[0])
        {
            case 'is_vertical' :
                preview_answer_options_container.classList.add('vertical-order')
                break;
            case 'is_required':
                question_preview_title.textContent += '*';
                break;
            case 'show_number': 
                $(question_preview_number).hide(100);
                break;
            case 'is_random_options':
                is_alphabetic_toggle.previousElementSibling.checked = false;
                break;
            case 'all_options':
                multiple_option_postData.options.push(
                    { text : 'همه گزینه ها' }
                )
                if(EditableQuestion)
                    answer_option_adder('MultipleOption','همه ی گزینه ها',EditableQuestion);
                else
                    answer_option_adder('MultipleOption','همه ی گزینه ها',multiple_option_postData);
                break;
            case 'nothing_selected':
                multiple_option_postData.options.push(
                    { text : 'هیچ کدام'}
                )
                if(EditableQuestion)
                    answer_option_adder('MultipleOption','هیچ کدام',EditableQuestion);
                else
                    answer_option_adder('MultipleOption','هیچ کدام',multiple_option_postData);
                break;
            case 'multiple_choice':
                if(EditableQuestion)
                    EditableQuestion.multiple_choice = true;
                else
                    PostData.multiple_choice = true;
                break;
        }   
    }
    else 
    {
        if(toggle_element)
            toggle_element.classList.remove("active");
        switch(toggle_element.classList[0])
        {
            case 'additional_options' : 
                answer_options = document.querySelectorAll(".Answer-Option .answer_option-label");
                if(EditableQuestion)
                {
                    PostData.all_options = false;
                    PostData.nothing_selected = false;
                }
                    PostData.all_options = false;
                    PostData.nothing_selected = false;
                all_options_toggle.previousElementSibling.checked = false;
                no_options_toggle.previousElementSibling.checked = false;
                multiple_option_postData.options.forEach((item,index) => {
                    if(item.text = 'همه ی گزینه ها' || item.text == 'هیچ کدام')
                    {
                        multiple_option_postData.options.splice(index,1);
                    } 
                })
                answer_options.forEach((answer_option) => {
                    console.log(answer_option)
                 })
                break;
            case 'is_vertical':
                preview_answer_options_container.classList.remove('vertical-order')
                break;
            case 'is_required':
                question_preview_title.textContent = question_preview_title.textContent.split("*")[0];
                break;
            case 'show_number': 
                $(question_preview_number).show(100);
                break;
            case 'all_options':
                answer_options = document.querySelectorAll(".Answer-Option .answer_option-label")
                multiple_option_postData.options.forEach((item,index) => {
                    if(item.text == 'همه ی گزینه ها')
                        delete multiple_option_postData.options[index];
                     })
                     answer_options.forEach((answer_option) => {
                        if(answer_option.value == 'همه گزینه ها')
                            $(answer_option).hide(30);
                            answer_option.parentElement.parentElement.remove();
                     })
                    break;
            case 'nothing_selected':
                answer_options = document.querySelectorAll(".Answer-Option")
                multiple_option_postData.options.forEach((item,index) => {
                    if(item.class == 'هیچ کدام')
                        delete multiple_option_postData.options[index];
                     })
                answer_options.forEach((answer_option) => {
                    if(answer_option.firstElementChild.lastElementChild.value == 'هیچ کدام')
                        $(answer_option).hide(30);
                        answer_option.remove();
                    })
                    break;
            case 'multiple_choice':
                        if(EditableQuestion)
                            EditableQuestion.multiple_choice = false;
                        else
                            PostData.multiple_choice = false;
                        break;
        }
        PostData[`${toggle_element.classList[0]}`] = false;
        if(EditableQuestion)
            EditableQuestion[`${toggle_element.classList[0]}`] = false;
    }
    console.log(EditableQuestion)
}
export const file_upload_handler = (FileType,FileInput,EditableQuestion,PostData) =>
{   
    if(detectFileFormat(FileInput.files[0].name) == 'UNKNOWN' || detectFileFormat(FileInput.files[0].name) != FileType)
    {
        showAlert('فرمت فایل پذیرفته نیست');
        return
    }
    else
    {
        file_src_setter(URL.createObjectURL(FileInput.files[0]),FileInput.files[0].name,FileType,EditableQuestion);
        preview_image_cancel_button.addEventListener('click',() => {
            file_input_container.classList.remove("uploaded");
            preview_container_main.classList.remove("preview_image_active","preview_video_active");
            if(FileType.files)
                FileType.files.length = 0;
            preview_image_main.src = '';
            preview_video_main.src = ''
            PostData.media = 'null';
        })
    }
}
export const file_src_setter = (Src,FileName,FileType,EditableQuestion) => {
    preview_file_name_side.textContent = FileName;
    file_input_container.classList.add("uploaded");
    
    switch(FileType)
    {
        case 'Picture' :  
            preview_container_main.classList.add('preview_image_active')
            preview_image_main.src = Src;
            preview_image_side.src = Src;  
            preview_video_main.src = ''
            break;
        case 'Video':
            console.log('video')
            preview_image_main.src = '';
            preview_container_main.classList.add("preview_video_active");
            preview_video_main.src = Src;
            preview_file_name_side.textContent = FileName;
            break;         
    }
    preview_image_cancel_button.addEventListener('click',() => {
        file_input_container.classList.remove("uploaded");
        preview_container_main.classList.remove("preview_image_active","preview_video_active");
        if(FileType.files)
            FileType.files.length = 0;
        preview_image_main.src = '';
        preview_video_main.src = ''
        if(EditableQuestion)
            EditableQuestion.media = null;
            
            
    })
}
export const detectFileFormat = (fileName) => {
    if(!fileName)
     return
    let pictureFormats = ['jpg', 'jpeg', 'png', 'gif'];
    let videoFormats = ['mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv'];
    
    let fileFormat = fileName.split(".")[fileName.split(".").length - 1];
    
    return pictureFormats.includes(fileFormat) ? 'Picture' :
           videoFormats.includes(fileFormat) ? 'Video' : 'UNKNOWN';
  }
export const form_data_convertor =  (obj,formData,namespace) => {
    formData = formData || new FormData();
    namespace = namespace || '';

    for(var property in obj){
        if(Array.isArray(obj[property])){
            obj[property].map((item,i)=> {
                formData.append(`${property}[${i}]text`, item.text !== null ? item.text : 'null')
            })
        }
        else {
            if(obj[property] !== null){
                formData.append(property, obj[property] !== null ? obj[property] : 'null')
            }  
        }  
    }
  
    return formData;
}
export const question_creator =  async (ACTION_TYPE,Question,QuestionPostType,QuestionnaireUUID,DataForPost) => {
    save_button.classList.add('saving');
    if(!DataForPost.title && !DataForPost.question_text && ACTION_TYPE == 'Create')
    {
        save_button.classList.remove('saving');
        showAlert('عنوان و متن سوال را وارد کنید.')
        return
    }
        console.log(Question)
        let createRes;
        try 
        {
            switch(ACTION_TYPE)
            {
                case 'Edit':
                    createRes = await patchRequest(`${baseUrl}/question-api/questionnaires/${QuestionnaireUUID}/${QuestionPostType}/${Question.id}/`,form_data_convertor(DataForPost));
                    break;
                case 'Create':
                    createRes = await postRequest(`${baseUrl}/question-api/questionnaires/${QuestionnaireUUID}/${QuestionPostType}/`, form_data_convertor(DataForPost));
                    break;
                case 'Copy':
                    createRes = await postRequest(`${baseUrl}/question-api/questionnaires/${QuestionnaireUUID}/${QuestionPostType}/`, form_data_convertor(DataForPost));
                    break;
            }
        }
        catch(err)
        {
            console.log(err)
        }
        if((createRes.status == 201 || createRes.status == 200))
         {
             window.open("/Pages/FormDesign.html","_Self");
         }
         save_button.classList.remove('saving');
}

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
const preview_video_side = document.querySelector('.uploaded_file_video')
const preview_image_cancel_button = document.querySelector(".inputUploader .cancel_uploaded_file_button")
const question_preview_title = document.querySelector(".QuestionContainer .Question-Title p");
const question_preview_description = document.querySelector('.QuestionContainer .description_block p');
const preview_options_container = document.querySelector(".multiple_answer_block-options");
const preview_slider_container = document.querySelector(".selection__box");
const answer_options_container = document.querySelector(".Answer-Options");
const wrongAlert = document.querySelector(".wrongEntry");
const title_text_style_labels  = document.querySelectorAll(".GTitle .TitleInputOptions label i");
const desc_text_style_labels = document.querySelectorAll(".GDesc .DescInputOptions label i");
const button_text_style_labels = document.querySelectorAll(".ButtonTextInputOptions label i")
const button_text_input = document.querySelector('.GEntryButton .ButtonTextInput');
const preview_title_container = document.querySelector('.Question-Title p');
const preview_desc_container = document.querySelector('.description_block p');
const preview_button = document.querySelector(".QuestionStart .QuestionStartButton p")
const Title_input = document.getElementById("title__input");
const all_options_toggle = document.querySelector(".all_options .Switch-Container .slider-button");
const no_options_toggle = document.querySelector(".nothing_selected .Switch-Container .slider-button");
const Description_input = document.getElementById("desc_input");
const preview_answer_options_container = document.querySelector(".multiple_answer_block-options")
const question_preview_number = document.querySelector(".QuestionContainer .Question-Title label");
const save_button = document.querySelector('.SideFooter .saveQuestion');
let answer_options = document.querySelectorAll(".Answer-Option");

const file_input_container = document.querySelector(".inputUploader");
export const question_placement_setter = (placement_number,PostData) => {
    if(!placement_number)
    {
        question_preview_number.textContent  = ' 1 '
        PostData.placement = 1;
    }
    else
    {
        PostData.placement = placement_number;
        question_preview_number.textContent = ` ${placement_number} `;
    }
}
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
export const text_style_setter = (PostData,DataToChange,Style,preview_text,input,input_text) => {
    console.log(PostData)
    switch(Style)
    {
        case 'fa fa-bold':
                text_style_class_setter(input,input_text,'bold',preview_text,"strong",DataToChange,PostData);
            break;
        case 'fa fa-italic':
                text_style_class_setter(input,input_text,'italic',preview_text,"em",DataToChange,PostData);
            break;
        case 'fa fa-underline':
                text_style_class_setter(input,input_text,'underline',preview_text,"u",DataToChange,PostData);
            break;
    }
}
const text_style_class_setter = (input,input_text,text_style,preview_text,style_tag,DataToChange,PostData) => {
    input.classList.toggle(text_style)
    if(![...input.classList].includes(text_style))
    {
        preview_text.classList.remove(`${text_style}`);
        input.classList.remove(`${text_style}`)
        if(isHTMLElement(PostData[`${DataToChange}`]))
            PostData[`${DataToChange}`] = PostData[`${DataToChange}`].replace(`<${style_tag}>`, "").replace(`</${style_tag}>`, "")
        else
            PostData[`${DataToChange}`] = input_text;
    }
    else   
    {
        preview_text.classList.add(text_style)
        input.classList.add(`${text_style}`)
      if(isHTMLElement(PostData[`${DataToChange}`]))
        PostData[`${DataToChange}`] = `<${style_tag}>${PostData[`${DataToChange}`]}</${style_tag}>`;
    else
        PostData[`${DataToChange}`] = `<${style_tag}>${input_text}</${style_tag}>`;

    }
    console.log(DataToChange)
}
export const shuffleArray = (array,PostData,Option_Type,preview_option_className) => {
    let preview_options = document.querySelectorAll(`.${preview_option_className}`);
    let options_random_numbers = [...Array(array.length)].map((_,index) => index + 1);
    let newArray = [...array]; // Create a new array to avoid modifying the original array
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      [options_random_numbers[i] , options_random_numbers[j]] = [options_random_numbers[j] , options_random_numbers[i]];
    }
    preview_options.forEach((preview_option) => {
        $(preview_option).hide(20)
        preview_option.remove();
    })
    PostData.options = newArray;
        PostData.options.forEach((option,index) => {
            preview_answer_option_generator(options_random_numbers[index],Option_Type,option.text);
        })

};
export const text_style_label_eventListener_setter = (EditableQuestion,PostData) => {
    title_text_style_labels.forEach((title_text_style_label) => {
        title_text_style_label.addEventListener('click',() => {
            let style_name = title_text_style_label.className;
            if(EditableQuestion)
                text_style_setter(EditableQuestion,'title',style_name,preview_title_container,Title_input,Title_input.value);
            else
                text_style_setter(PostData,'title',style_name,preview_title_container,Title_input,Title_input.value);
        })
    })
    desc_text_style_labels.forEach((desc_text_style_label) => {
        desc_text_style_label.addEventListener('click',() => {
            let style_name = desc_text_style_label.className;
            if(EditableQuestion)
                text_style_setter(EditableQuestion,'question_text',style_name,preview_desc_container,Description_input,Description_input.value);
            else
                text_style_setter(PostData,'question_text',style_name,preview_desc_container,Description_input,Description_input.value);
        })
    })
    if(button_text_style_labels)
    button_text_style_labels.forEach((button_text_style_label) => {
        button_text_style_label.addEventListener('click',() => {
            let style_name = button_text_style_label.className;
            if(EditableQuestion)
                text_style_setter(EditableQuestion,'button_text',style_name,preview_button,button_text_input,button_text_input.value);
            else
                text_style_setter(PostData,'button_text',style_name,preview_button,button_text_input,button_text_input.value);
        })
    })
}
const isHTMLElement = (str) => 
{
    var tempElement = document.createElement('div');
    tempElement.innerHTML = str;
    return tempElement.firstChild instanceof HTMLElement;
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
            Title_input.classList.remove("error")
            PostData.title = Title_input.value;
            if(EditableQuestion)  
                EditableQuestion.title = Title_input.value;
            break;
        case 'Desc-change':
            question_preview_description.textContent = Description_input.value;
            Description_input.classList.remove("error")
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
    let preview_answer_options , totalElements , hiddenELements;
    
    switch(Option_Type)
    {
        case 'MultipleOption' :
            preview_answer_options = document.querySelectorAll(".multiple_answer_block-option");
            hiddenELements = document.querySelectorAll(".multiple_answer_block-option.hidden_option");
            break;

        case 'SliderOption' :
            preview_answer_options = document.querySelectorAll(".selection__item");
            hiddenELements =  document.querySelectorAll(".selection__item.hidden_option");
            break;
    }
    if(answer_options.length > 2)
    {       
        if(!view_button.classList.contains("hidden-option") && (preview_answer_options.length - hiddenELements.length > 2))
        {
             document.querySelector(`#anw-option-${option_number + 1} .answer-option-view i`).className = 'fa fa-eye-slash';
            $(preview_answer_options[option_number]).hide(50)
            preview_answer_options[option_number].classList.add("hidden_option");
        }
        else 
        {
            document.querySelector(`#anw-option-${option_number + 1} .answer-option-view i`).className = 'fa fa-eye';
            $(preview_answer_options[option_number]).show(50);
            preview_answer_options[option_number].classList.remove("hidden_option");
        }
         view_button.classList.toggle("hidden-option");
    } 
    if(answer_options.length == 2)
    {
        showAlert('دو گزینه را نمی توان حذف یا مخفی کرد')
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
                <input type="text" class="anw-option-input" id="option_input_${last_answer_option_number + 1}" value="${Option_Text ? Option_Text : `گزینه ${last_answer_option_number + 1}`}">    
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
        Option_Type ,Option_Text ?  Option_Text :`گزینه  ${last_answer_option_number + 1}`);
    switch(Option_Type)
    {
        case 'MultipleOption':
            PostData.options.push(
                { text : Option_Text ? Option_Text : `${last_answer_option_number + 1} گزینه`}
            )
            break;
        case 'SliderOption':
            PostData.options.push(
                { text : Option_Text ? Option_Text : `${last_answer_option_number + 1} گزینه`}
            )
            break;
    }
    console.log(PostData)
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
        answer_option_adder(Option_Type,null,PostData);
    })
    answer_option_remover_button.addEventListener("click",() => {
            answer_option_remover(Option_Type,PostData)
    })
    answer_option_input.addEventListener('input',(e) => {
        preview_option_label_updater(OptionNumber - 1,answer_option_input.value,Option_Type,PostData);
    })
}
export const answer_option_remover = (Option_Type,PostData) => {
    answer_options = document.querySelectorAll(".Answer-Option");
    let last_answer_option = answer_options[answer_options.length - 1];
    let last_option_input =  document.querySelector(`#${last_answer_option.getAttribute("id")} .anw-option-input`);
    if(answer_options.length > 2)
    {
        $(last_answer_option).hide(80);
        last_answer_option.remove();
        preview_answer_option_remover(Option_Type);
        if(PostData)
            PostData.options.pop();
    }
    if(last_option_input.value == 'هیچ کدام')
    {
        no_options_toggle.previousElementSibling.checked = false;
        PostData.options.forEach((item,index) => {
            if(item.text == 'هیچ کدام')
            {
                PostData.options.splice(index,1);
            }  
        })
        PostData.nothing_selected = false;
    }
    if(last_option_input.value == 'همه گزینه ها')
    {
        all_options_toggle.previousElementSibling.checked = false;
        PostData.options.forEach((item,index) => {
            if(item.text == 'همه گزینه ها')
            {
                PostData.options.splice(index,1);
            }  
        })
        PostData.all_options = false;
    }           
    if(answer_options.length == 2)
    {
        showAlert('دو گزینه را نمی توان حذف یا مخفی کرد')
    }
    console.log(PostData)
}
export const preview_option_label_updater = (input_number,input_value,Option_Type,PostData) => {
    let changed_label;
    switch(Option_Type)
    {
        case 'MultipleOption' :
            changed_label = document.querySelector(`#preview-option-${input_number + 1} label`);
            PostData.options[input_number]['text'] = input_value.toString();;
            break;
        case 'SliderOption' :
            changed_label = document.querySelector(`#select_item_${input_number + 1} label`);
            PostData.options[input_number]['text'] = input_value.toString();
    }
    changed_label.textContent = input_value;
    
}
const additional_options_handler = (Addition_type,state,PostData) =>
{
    let answer_options = document.querySelectorAll(".Answer-Option");
    all_options_toggle.previousElementSibling.checked = false;
    no_options_toggle.previousElementSibling.checked = false;
    PostData.all_options = false;
    PostData.nothing_selected = false;
    if(Addition_type == 'additional_toggle' && state == 'deActive')
    {
        PostData.options.forEach((item,index) => {
            if(item.text == 'همه گزینه ها')
            {
                let item_index = PostData.options.indexOf(item);
                PostData.options.splice(item_index,1);
            } 
        })
        PostData.options.forEach((item,index) => {
            if(item.text == 'هیچ کدام')
            {
                let item_index = PostData.options.indexOf(item);
                PostData.options.splice(item_index,1);
            } 
        })
        answer_options.forEach((answer_option) => {
           let answer_option_input = document.querySelector(`#${answer_option.getAttribute("id")} .anw-option-input`);
            if(answer_option_input.value == 'همه گزینه ها' || answer_option_input.value == 'هیچ کدام')
            {
                $(answer_option).hide(70);
                answer_option.remove();
                $(`#preview-option-${answer_option.getAttribute("id").split("-")[2]}`).hide()
                document.querySelector(`#preview-option-${answer_option.getAttribute("id").split("-")[2]}`).remove()
            }  
         })
    }
    console.log(PostData)
}
const single_additional_option_toggle_handler = (Addition_text,PostData) => {
    let answer_options = document.querySelectorAll(".Answer-Option");
    PostData.options.forEach((item,index) => {
        if(item.text == Addition_text)
        {
            PostData.options.splice(index,1);
        }  
         })
         answer_options.forEach((answer_option,index) => {
            let answer_option_input = document.querySelector(`#${answer_option.getAttribute("id")} .anw-option-input`);
            if(answer_option_input.value == Addition_text)
            {
                $(answer_option).hide(70);
                answer_option.remove();
                $(`#preview-option-${answer_option.getAttribute("id").split("-")[2]}`).hide()
                document.querySelector(`#preview-option-${answer_option.getAttribute("id").split("-")[2]}`).remove();
            }
         })
         console.log(PostData)
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
                $('.Question-Title span').hide(100);
                break;
            case 'is_random_options':
                randomize_options_toggle.previousElementSibling.checked = false;
                break;
            case 'all_options':
                if(EditableQuestion)
                    answer_option_adder('MultipleOption','همه گزینه ها',EditableQuestion);
                else
                    answer_option_adder('MultipleOption','همه گزینه ها',multiple_option_postData);
                break;
            case 'nothing_selected':
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
            console.log(EditableQuestion)
            if(EditableQuestion)
                additional_options_handler('additional_toggle','deActive',EditableQuestion)
            else
                additional_options_handler('additional_toggle','deActive',multiple_option_postData)
                break;
            case 'is_vertical':
                preview_answer_options_container.classList.remove('vertical-order')
                break;
            case 'is_required':
                question_preview_title.textContent = question_preview_title.textContent.split("*")[0];
                break;
            case 'show_number': 
                $(question_preview_number).show(100);
                $('.Question-Title span').show(100);
                break;
            case 'all_options':
                if(EditableQuestion)
                    single_additional_option_toggle_handler('همه گزینه ها',EditableQuestion)
                else
                  single_additional_option_toggle_handler('همه گزینه ها',multiple_option_postData)
                    break;
            case 'nothing_selected':
                if(EditableQuestion)
                    single_additional_option_toggle_handler('هیچ کدام',EditableQuestion)
                else
                  single_additional_option_toggle_handler('هیچ کدام',multiple_option_postData)
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
}
export const file_upload_handler = (FileType,FileInput,EditableQuestion,PostData) =>
{   
    if(detectFileFormat(FileInput.files[0].name) == 'UNKNOWN' || detectFileFormat(FileInput.files[0].name) != FileType)
    {
        showAlert('فرمت فایل پذیرفته نیست');
        return
    }
    
    if(EditableQuestion)
    {
        file_data_setter(EditableQuestion,FileInput.files[0]);
        file_src_setter(URL.createObjectURL(FileInput.files[0]),FileInput.files[0].name,FileType,EditableQuestion);
        preview_image_cancel_button.addEventListener('click',() => {
            file_input_empty_setter(FileInput,EditableQuestion);
    })
    console.log(EditableQuestion)
    }
        
    else 
    {
        file_data_setter(PostData,FileInput.files[0]);
        file_src_setter(URL.createObjectURL(FileInput.files[0]),FileInput.files[0].name,FileType,PostData);
        preview_image_cancel_button.addEventListener('click',() => {
            file_input_empty_setter(FileInput,PostData);
        })
    }   
    document.querySelectorAll(".fileFormat input").forEach((item) => { 
        item.addEventListener('click',() => {
            if(item.value != FileType)
                file_input_empty_setter(FileInput,PostData)
        })                
    })
}
export const file_input_empty_setter = (FileInput,PostData) => {
    
    file_input_container.classList.remove("uploaded");
    preview_container_main.classList.remove("preview_image_active","preview_video_active");
    if(FileInput)
        FileInput.value = null;
    preview_image_main.removeAttribute("src");
    preview_video_main.removeAttribute("src");
    PostData.media = '';
    console.log(PostData)
}
const getVideoCoverImage = (videoElement) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const width = videoElement.videoWidth;
        const height = videoElement.videoHeight;
    
        canvas.width = width;
        canvas.height = height;
    
        const captureFrame = () => {
          ctx.drawImage(videoElement, 0, 0, width, height);
          const coverImage = canvas.toDataURL('image/png');
          resolve(coverImage);
        };
    
        if (videoElement.readyState >= HTMLMediaElement.HAVE_METADATA) {
          captureFrame();
        } else {
          videoElement.addEventListener('loadedmetadata', () => {
            captureFrame();
          });
        }
    
        videoElement.addEventListener('error', reject);
        videoElement.addEventListener('seeked', () => {
          captureFrame();
        });
      });
}
export const file_src_setter = async (Src,FileName,FileType) => {
    file_input_container.classList.add("uploaded");
    switch(FileType)
    {
        case 'Picture' :
            file_input_container.classList.add("image_uploaded"); 
            file_input_container.classList.remove("video_uploaded");  
            preview_container_main.classList.add('preview_image_active')
            preview_image_main.src = Src;
            preview_image_side.src = Src;  
            preview_video_side.removeAttribute("src");
            preview_video_main.removeAttribute("src")
            break;
        case 'Video':
            file_input_container.classList.add("video_uploaded");  
            file_input_container.classList.remove("image_uploaded");  
            preview_image_main.removeAttribute("src")
            preview_video_main.src = Src;
            preview_image_side.src = await getVideoCoverImage(preview_video_main);
            preview_video_side.src = Src;
            preview_container_main.classList.add("preview_video_active")
            
            break;         
    }
}
const file_data_setter = (PostData,file) => {
    PostData.media = file;
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
    let form_Data = new FormData();
    namespace = namespace || '';
    for(var property in obj)
    {
        if(Array.isArray(obj[property]))
        {
            obj[property].map((item,i)=> {
                form_Data.append(`${property}[${i}]text`, item.text !== null ? item.text : 'null')
            })
        }
        else {
            if(obj[property] !== null){
                form_Data.append(property, obj[property] !== null ? obj[property] : 'null')
            }  
        }  
    }
  
    return form_Data;
}
export const question_creator =  async (ACTION_TYPE,Question,QuestionPostType,QuestionnaireUUID,DataForPost) => {
    save_button.classList.add('saving');
        let createRes;
        try 
        {
            switch(ACTION_TYPE)
            {
                case 'Edit':
                    createRes = await patchRequest(`${baseUrl}/question-api/questionnaires/${QuestionnaireUUID}/${QuestionPostType}/${Question.id}/`,form_data_convertor(Question));
                    break;
                case 'Create':
                    createRes = await postRequest(`${baseUrl}/question-api/questionnaires/${QuestionnaireUUID}/${QuestionPostType}/`,'multipart/form-data', form_data_convertor(DataForPost));
                    break;
                case 'Copy':
                    createRes = await postRequest(`${baseUrl}/question-api/questionnaires/${QuestionnaireUUID}/${QuestionPostType}/`,'multipart/form-data', form_data_convertor(Question));
                    break;
        }
        if((createRes.status == 201 || createRes.status == 200))
            {
                window.open("/Pages/FormDesign.html","_Self");
                
            }
        }
        catch(err)
        {
            save_button.classList.remove('saving');
            return;
        }
}

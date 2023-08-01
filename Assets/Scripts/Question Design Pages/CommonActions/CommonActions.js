import {multiple_option_postData} from "../../ajax/QuestionPostData.js";
import {
    additional_options_handler,
    answer_option_adder,
    preview_answer_option_generator,
    single_additional_option_toggle_handler
} from "./OptionHandler.js";

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
const wrongAlert = document.querySelector(".wrongEntry");
const title_text_style_labels  = document.querySelectorAll(".GTitle .TitleInputOptions label i");
const desc_text_style_labels = document.querySelectorAll(".GDesc .DescInputOptions label i");
const button_text_style_labels = document.querySelectorAll(".ButtonTextInputOptions label i")
const button_text_input = document.querySelector('.GEntryButton .ButtonTextInput');
const preview_title_container = document.querySelector('.Question-Title p');
const preview_desc_container = document.querySelector('.description_block p');
const preview_button = document.querySelector(".QuestionStart .QuestionStartButton p")
const Title_input = document.getElementById("title__input");
const Description_input = document.getElementById("desc_input");
const preview_answer_options_container = document.querySelector(".multiple_answer_block-options")
const question_preview_number = document.querySelector(".QuestionContainer .Question-Title label");



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
}
export const shuffleArray = (array,PostData,Option_Type,preview_option_className) => {
    let preview_options = document.querySelectorAll(`.${preview_option_className}`);
    let options_random_numbers = [...Array(array.length)].map((_,index) => index + 1);
    let newArray = [...array];
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
    if(FileInput.files[0].size > 3000000)
    {
        FileInput.value = null;
        showAlert('حجم فایل نباید بیشتر از 3 مگابایت باشد')
        return;
    }
    if(EditableQuestion)
    {
        file_data_setter(EditableQuestion,FileInput.files[0]);
        file_src_setter(URL.createObjectURL(FileInput.files[0]),FileInput.files[0].name,FileType,EditableQuestion);
        preview_image_cancel_button.addEventListener('click',() => {
            file_input_empty_setter(FileInput,EditableQuestion);
    })
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
     fileName = fileName.toLowerCase();
    let pictureFormats = ['jpg', 'jpeg', 'png', 'gif'];
    let videoFormats = ['mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv'];
    let zip_formats  = ['zip','rar','7z'];
    let audio_formats = ['mp3','wav','ogg','mpeg-1']
    let fileFormat = fileName.split(".")[fileName.split(".").length - 1];

    return pictureFormats.includes(fileFormat) ? 'Picture' :
           videoFormats.includes(fileFormat) ? 'Video' : zip_formats.includes(fileFormat) ?
            'Zip' : audio_formats.includes(fileFormat) ? 'Audio' : 'UNKNOWN';
}

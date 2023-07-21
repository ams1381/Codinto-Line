import { baseUrl } from "../../ajax/ajaxRequsts.js";
import { detectFileFormat } from "../../Question Design Pages/CommonActions.js";

export const welcome_component_generator = (welcome) => {
    let preview_file_className = '';
    switch(detectFileFormat(welcome.media))
    {
        case 'Picture':
            preview_file_className = 'preview_image_active';
            break;
        case "Video":
            preview_file_className - 'preview_video_active';
            break;
        default:
            preview_file_className = ' ';
            break;
    }
    let media_src = welcome.media;
    return `<div class="QuestionContainer Greeting welcome-page">
                <div class="Question-Title Greeting-Title">
                    <p>${welcome.title}</p>
                </div>
                <div class="description_block">
                   <p>${welcome.description ? welcome.description : ''}</p>
                </div>
                <div class="preview_file_box ${preview_file_className}">
                ${
                    (detectFileFormat(welcome.media) == 'Picture') ? 
                    `<img class="preview_image" src=${media_src ? media_src : " "}></img>` :
                     `<video class="preview_video" src=${media_src ? media_src + 'controls' : " "} ></video>`
                 }
                </div>
                <div class="QuestionStart">
                    <button class="QuestionStartButton ${welcome.is_solid_button ? 'solid' : 'empty'} ${welcome.button_shape}">
                       <p> ${welcome.button_text} </p>
                    </button>
                 </div>
            </div>
    `
}

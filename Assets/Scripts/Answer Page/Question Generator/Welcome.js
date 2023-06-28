import { baseUrl } from "../../ajax/ajaxRequsts.js";
import { detectFileFormat } from "../../Question Design Pages/CommonActions.js";

export const welcome_component_generator = (welcome) => {
    let media_src = welcome.media;
    return `<div class="QuestionContainer Greeting welcome-page">
                <div class="Question-Title Greeting-Title">
                    <p>${welcome.title}</p>
                </div>
                <div class="description_block">
                   <p>${welcome.description}</p>
                </div>
                <div class="preview_file_box ${detectFileFormat(welcome.media) == 'PICTURE' ? 'preview_image_active' : detectFileFormat(welcome.media) == 'VIDEO' ? 'preview_video_active' : ' '}">
                ${
                    (detectFileFormat(welcome.media) == 'PICTURE') ? 
                    `<img class="preview_image" src=${media_src}></img>` :
                     `<video class="preview_video" src=${media_src} controls></video>`
                 }
                </div>
                <div class="QuestionStart">
                    <button class="QuestionStartButton ${welcome.is_solid_button ? 'solid' : 'empty'} ${welcome.button_shape}">
                       ${welcome.button_text}
                    </button>
                 </div>
            </div>
    `
}

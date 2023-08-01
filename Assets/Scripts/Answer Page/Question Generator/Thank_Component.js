import { baseUrl } from "../../ajax/ajaxRequsts.js";
import { detectFileFormat } from "../../Question Design Pages/CommonActions/CommonActions.js";

export const thank_component_generator = (thank) => {
    let media_src = thank.media;
    return `<div class="QuestionContainer Greeting thank-page">
                <div class="Question-Title Greeting-Title">
                    <p>${thank.title}</p>
                </div>
                <div class="description_block">
                   <p>${thank.description ? thank.description : ''}</p>
                </div>
                <div class="preview_file_box ${detectFileFormat(thank.media) == 'PICTURE' ? 'preview_image_active' : detectFileFormat(thank.media) == 'VIDEO' ? 'preview_video_active' : ' '}">
                ${
                    (detectFileFormat(thank.media) == 'PICTURE') ? 
                    `<img class="preview_image" src=${media_src}></img>` :
                     `<video class="preview_video" src=${media_src} controls></video>`
                 }
                </div>
                ${
                    thank.share_link ?
                    `
                    <div class="shareLink" style="display : block; !important">
                        <p>
                            ${window.location.href}
                        </p>
                </div>` :
                ' '
                }
               
            </div>`
}

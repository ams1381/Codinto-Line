import {postRequest} from "../ajax/ajaxRequsts.js";
import {folderLoader} from "./FoldersGetter.js";
import {folderUrl} from './FoldersGetter.js'
import { folder_remove_handler } from "./FolderRemover.js";
import {questionnaire_generator} from "./QuestionnaireAjax.js";
import { folder_rename_handler } from "./FolderRenamer.js";
import { search_button_handler } from "./SearchQuestionnaire.js";

const SideBodyContainer= document.querySelector('.sideBody');
const rename_folder_popup = document.querySelector(".renameFolderPopUp");
const folder_cancel_button = document.querySelectorAll(".cancel-button");
const create_folder_confirm_btn = document.querySelector(".createFolderPopUp .confirm-button");
const rename_folder_confirm_btn = document.querySelector(".renameFolderPopUp .confirm-button");
const remove_folder_confirm_btn = document.querySelector(".removeFolderPopUp .confirm-button");
const create_folder_name_input = document.querySelector("#create_folder_name");
const rename_folder_input = document.querySelector("#rename_folder_name");
const create_folder_popup = document.querySelector(".createFolderPopUp");
const remove_folder_popup = document.querySelector(".removeFolderPopUp");
const add_folder_button = document.querySelector(".AddFolder");
let remove_folder_button = document.querySelectorAll(".Folder .FolderRemove");
let folder_items = document.querySelectorAll(".sideBody .Folder");
let rename_folder_button = document.querySelectorAll(".FolderEdit");
const Folders_Slide_toggle = document.querySelector('.folder_slide_toggle');
const search_Questionnaire_button = document.querySelectorAll(".FolderSearch");
const add_Questionnaire_button = document.querySelector(".form.AddForm")
let SelectedFolderId;
export const folder_generator = (folderName, id , Questionnaires) => {
    create_folder_confirm_btn.classList.add('operating');
    const folder_element_item = `<div class="Folder" id="${id}" style="">
        <button class="FolderEdit navButton">
        <i>
            <svg width="31" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3F52E3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_01"> <path id="Vector" d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="#3F52E3" stroke-width="1.32" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
            </i>
        </button>
        <div class="FolderName">
        <p>${folderName}</p>
        </div>
        <button class="FolderRemove navButton">
            <i>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3F52E3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Trash_Full"> <path id="Vector" d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#3F52E3" stroke-width="1.512" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
            </i>
        </button>
        <div class="folder_control">
            <button class="FolderEdit navButton">
                <i>
                    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3F52E3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_01"> <path id="Vector" d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="#3F52E3" stroke-width="1.32" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                </i>
            </button>
            <button class="FolderRemove navButton">
                <i>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3F52E3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Trash_Full"> <path id="Vector" d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#3F52E3" stroke-width="1.512" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                </i>
            </button>
        </div>
    </div>`
    
    const parser = new DOMParser();
    const parsed_folder_element_item = parser.parseFromString((folder_element_item),'text/html').firstChild.lastChild.lastChild;
    SideBodyContainer.prepend(parsed_folder_element_item);
    parsed_folder_element_item.addEventListener('click',() => {
        setActive_folder(parsed_folder_element_item,folder_items,Questionnaires);
    })
    if(window.innerWidth < 768)
        parsed_folder_element_item.style.display = 'none';
    $(parsed_folder_element_item).hide(200);

    $(parsed_folder_element_item).show(200);

    folder_items = document.querySelectorAll('.sideBody .Folder');

    if(folder_items.length == 1)
    {
       folder_items[0].classList.add('Selected');
        let QuestionnaireForms = document.querySelectorAll('.form');
               QuestionnaireForms.forEach((item) => {
                if(!item.classList.contains("AddForm"))
                    item.remove();
            })
        if(Questionnaires)
            Questionnaires.forEach((Questionnaire) => {
                questionnaire_generator(Questionnaire)
            })  
    }

    rename_folder_button = document.querySelectorAll('.FolderEdit');
    remove_folder_button = document.querySelectorAll(".Folder .FolderRemove");

    remove_folder_button.forEach((item) => {
        item.addEventListener("click",() => {
            folder_popup_handler(remove_folder_popup, null , null)
        });
    })
    rename_folder_button.forEach((item,index) => {
        item.addEventListener('click', () => {
            folder_popup_handler(rename_folder_popup,rename_folder_input,"rename")
        });
    });

    EventListenerSetter(folder_items);
    create_folder_confirm_btn.classList.remove('operating');
};
export const folder_reloader = () => {
    folder_items.forEach((item,index) => {
        item.remove()
    })
}
const folder_creator_handler = async () => {

    create_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");
    await postRequest(folderUrl,'application/json',{name : create_folder_name_input.value});
    if(!folder_items[folder_items.length - 1])
        folder_generator(create_folder_name_input.value,1)
    else
    folder_generator(create_folder_name_input.value,parseInt(folder_items[folder_items.length - 1].getAttribute('id')) + 1);

    folder_reloader();
    await folderLoader();
}
const folder_mask_close_panel = () => {

   if(create_folder_popup.classList.contains("active"))
         create_folder_popup.classList.remove("active");
   if(rename_folder_popup.classList.contains("active"))
         rename_folder_popup.classList.remove("active");
    if(remove_folder_popup.classList.contains("active"))
        remove_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");  
}

const setActive_folder = (folder_item,elements,questionnaires) => {
    SelectedFolderId = parseInt(folder_item.getAttribute('id'));
    if(folder_item.classList.contains("Selected"))
        return;
    folder_items.forEach((item) => {
        item.classList.remove('Selected');
    });
    folder_item.classList.add('Selected');

    if(!questionnaires)
        return;
        if(questionnaires.length)
        {
            let QuestionnaireForms = document.querySelectorAll('.form');
            QuestionnaireForms.forEach((item) => {
                if(!item.classList.contains("AddForm"))
                    item.remove();
            })
            questionnaires.forEach((item) => {
                questionnaire_generator(item)
            })
            
        }
        else
        {
            let questionnaires = document.querySelectorAll('.form');
            questionnaires.forEach((item) => {
                if(!item.classList.contains("AddForm"))
                    item.remove();
            })
        }
        $('.form.AddForm').hide(10);
        $('.form.AddForm').show(250);
}
const folder_popup_handler = (popup_element,popup_input,popup_type) => {
    if(popup_type == 'remove')
        popup_input.value = '';
    if(popup_type == 'rename')
    {
        popup_input.value = document.querySelector('.Folder.Selected .FolderName p').textContent;
    }
    popup_element.classList.add("active");
    nav_mask.classList.add("active");
}
nav_mask.addEventListener("click" , folder_mask_close_panel);

add_folder_button.addEventListener("click",() => {
    folder_popup_handler(create_folder_popup,create_folder_name_input,"create");
});
folder_cancel_button.forEach((item,index) => { item.addEventListener('click',folder_mask_close_panel) })

rename_folder_button.forEach((item,index) => { 
    item.addEventListener('click',() => {
        console.log(item)
        folder_popup_handler(rename_folder_popup,rename_folder_input,"rename");
    });
})
create_folder_confirm_btn.addEventListener('click',folder_creator_handler);

Folders_Slide_toggle.addEventListener('click',() => {
    if(window.innerWidth < 768)
    {
        $('.Folder').not('.Selected').slideToggle(200);
        Folders_Slide_toggle.classList.toggle('active');
    }
})
const EventListenerSetter = (Folder_Items) =>  {

    Folder_Items.forEach((folder_item,index) => {
        folder_item.addEventListener('click',(item,index) => {
            setActive_folder(folder_item,Folder_Items);
        })
    })
}
window.addEventListener('resize',() => {
    if(window.innerWidth > 768)
    {
        folder_items.forEach((item,index) => {
            if(item.style.display === 'none')
            {
                item.style.display = 'flex';
            }
        })
    }
})
EventListenerSetter(folder_items);
rename_folder_confirm_btn.addEventListener('click', () => {

       folder_rename_handler(SelectedFolderId);
});
remove_folder_confirm_btn.addEventListener('click',() => {
    remove_folder_confirm_btn.classList.add('operating');
    let Selected_folder = document.querySelector(".Folder.Selected");
    let Selected_folder_id = document.querySelector(".Folder.Selected").getAttribute("id");

    folder_remove_handler(Selected_folder_id,Selected_folder);

    remove_folder_confirm_btn.classList.remove('operating');
    remove_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");

})
add_Questionnaire_button.addEventListener('click',() => {
    let Selected_folder_id = document.querySelector(".Folder.Selected").getAttribute("id");
    localStorage.setItem("SETTING_ACTION_TYPE","Create");
    localStorage.setItem("SelectedFolderID",Selected_folder_id)
    localStorage.removeItem('QuestionnaireToEdit');
    window.open("Setting.html","_self")
    
})
search_Questionnaire_button.forEach((item) => {
    item.addEventListener("click",async () => {
        await search_button_handler(item);
    } )
}) 
export default folder_generator;
folderLoader();
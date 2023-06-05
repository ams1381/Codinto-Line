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
const add_form_item = document.querySelector(".form.AddForm");
const create_folder_confirm_btn = document.querySelector(".createFolderPopUp .confirm-button");
const rename_folder_confirm_btn = document.querySelector(".renameFolderPopUp .confirm-button");
const remove_folder_confirm_btn = document.querySelector(".removeFolderPopUp .confirm-button");
const create_folder_name_input = document.querySelector("#create_folder_name");
const rename_folder_input = document.querySelector("#rename_folder_name");
const addFormButton = document.querySelector(".form.AddForm");
const create_folder_popup = document.querySelector(".createFolderPopUp");
const remove_folder_popup = document.querySelector(".removeFolderPopUp");
const add_folder_button = document.querySelector(".AddFolder");
let remove_folder_button = document.querySelectorAll(".Folder .FolderRemove");
let folder_items = document.querySelectorAll(".sideBody .Folder");
let rename_folder_button = document.querySelectorAll(".FolderEdit");
const Folders_Slide_toggle = document.querySelector('.folder_slide_toggle');
const search_Questionnaire_button = document.querySelector(".FolderSearch");
const add_Questionnaire_button = document.querySelector(".form.AddForm")
let SelectedFolderId;
export const folder_generator = (folderName, id , Questionnaires) => {
    const folder_element_item = `<div class="Folder" id="${id}" style="">
        <button class="FolderEdit navButton">
        <i class="fa fa-pencil"></i>
        </button>
        <div class="FolderName">
        <p>${folderName}</p>
        </div>
        <button class="FolderRemove navButton">
        <i class="fa fa-trash-o"></i>
        </button>
        <div class="folder_control">
            <button class="FolderEdit navButton">
            <i class="fa fa-pencil"></i></button>
            <button class="FolderRemove navButton">
            <i class="fa fa-trash-o"></i></button>
        </div>
    </div>`
    
    const parser = new DOMParser();
    const parsed_folder_element_item = parser.parseFromString((folder_element_item),'text/html').firstChild.lastChild.lastChild;
    SideBodyContainer.append(parsed_folder_element_item);
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

};
export const folder_reloader = () => {
    folder_items.forEach((item,index) => {
        item.remove()
    })
}
const folder_creator_handler = async () => {

    create_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");
    await postRequest(folderUrl,{'name' : create_folder_name_input.value});
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
}
const folder_popup_handler = (popup_element,popup_input,popup_type) => {
    if(popup_type == 'rename' || popup_type == 'remove' && popup_input)
        popup_input.value = '';
    popup_element.classList.add("active");
    nav_mask.classList.add("active");
}
addFormButton.addEventListener('click',() => {
    window.open('Setting.html','_self')
});
nav_mask.addEventListener("click" , folder_mask_close_panel);

add_folder_button.addEventListener("click",() => {
    folder_popup_handler(create_folder_popup,create_folder_name_input,"create");
});
folder_cancel_button.forEach((item,index) => { item.addEventListener('click',folder_mask_close_panel) })

rename_folder_button.forEach((item,index) => { item.addEventListener('click',() => {
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
    let Selected_folder = document.querySelector(".Folder.Selected");
    let Selected_folder_id = document.querySelector(".Folder.Selected").getAttribute("id");

    folder_remove_handler(Selected_folder_id,Selected_folder);

    remove_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");

})
add_Questionnaire_button.addEventListener('click',() => {
    let Selected_folder_id = document.querySelector(".Folder.Selected").getAttribute("id");
    window.open("Setting.html","_self")
    localStorage.setItem("SETTING_ACTION_TYPE","Create");
    localStorage.setItem("SelectedFolderID",Selected_folder_id)
})
search_Questionnaire_button.addEventListener("click",search_button_handler)
export default folder_generator;
folderLoader();
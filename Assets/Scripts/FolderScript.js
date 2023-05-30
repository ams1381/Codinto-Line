import {getRequest, patchRequest, postRequest} from "./ajax/ajaxRequsts.js";
import {deleteRequest} from "./ajax/ajaxRequsts.js";
import {folderLoader} from "./ajax/FoldersAjax.js";
import {folderUrl} from './ajax/FoldersAjax.js'
import {questionnaire_generator} from "./ajax/QuestionnaireAjax.js";


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
const Folders_Slide_toggle = document.querySelector('.folder_slide_toggle')
const add_Questionnaire_button = document.querySelector(".form.AddForm")
let folder_generator;
let SelectedFolderId;
export default folder_generator = (folderName, id , Questionnaires) => {

    let FolderDiv = document.createElement('div');
    let RenameButton = document.createElement('button');
    let DeleteButton = document.createElement('button');
    let FolderNameDiv = document.createElement('div');
    let FolderNameDivP = document.createElement('p');
    let FolderControlDiv = document.createElement('div');
    let SubRenameButton = document.createElement('button');
    let SubDeleteButton = document.createElement('button');
    let RenameIcon = document.createElement('i');
    let DeleteIcon = document.createElement('i');

    FolderNameDivP.textContent = folderName;
    FolderDiv.classList.add('Folder');

    FolderControlDiv.classList.add('folder_control');
    FolderNameDiv.classList.add('FolderName');

    RenameButton.classList.add('FolderEdit','navButton');
    DeleteButton.classList.add('FolderRemove','navButton');

    RenameIcon.className = "fa fa-pencil";
    DeleteIcon.className = "fa fa-trash-o";

    let SubRenameIcon = document.createElement('i');
    SubRenameIcon.className = 'fa fa-pencil';
    let SubDeleteIcon = document.createElement('i');
    SubDeleteIcon.className ='fa fa-trash-o';

    SubRenameButton.classList.add('FolderEdit','navButton');
    SubRenameButton.append(SubRenameIcon);
    SubDeleteButton.classList.add('FolderRemove','navButton');
    SubDeleteButton.append(SubDeleteIcon);

    FolderControlDiv.append(SubRenameButton , SubDeleteButton);

    RenameButton.append(RenameIcon);
    DeleteButton.append(DeleteIcon);

    FolderNameDiv.append(FolderNameDivP);

    FolderDiv.append(RenameButton , FolderNameDiv , DeleteButton , FolderControlDiv);

    FolderDiv.setAttribute('id',id)
    FolderDiv.addEventListener('click',() => {
        setActive_folder(FolderDiv,folder_items,Questionnaires);
    })
    if(window.innerWidth < 768)
        FolderDiv.style.display = 'none';
    $(FolderDiv).hide(200);
    SideBodyContainer.append(FolderDiv);

    $(FolderDiv).show(200);

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
        item.addEventListener("click",remove_folder_popup_handler);
    })
    rename_folder_button.forEach((item,index) => {
        item.addEventListener('click',rename_folder_popup_handler);
    });

    EventListenerSetter(folder_items);

};
const folder_reloader = () => {
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

    if(questionnaires === undefined)
        return;
    else
    {
        if(questionnaires.length !== 0)
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
  }
const folder_rename_handler = async (FolderItemId) => {
    let RenameUrl = folderUrl + FolderItemId + '/';
    let renameRes = await patchRequest(RenameUrl,{ 'name' : rename_folder_input.value });

    let folder_name = document.getElementById(`${FolderItemId}`).children[1].firstChild;

    folder_name.textContent = rename_folder_input.value;
    rename_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");

    folder_reloader();
    await folderLoader();
}
const folder_remove_handler = async (FolderItemId , deletedFolderItem) => {
    let delUrl = folderUrl + FolderItemId + '/'
    console.log(delUrl)
    let delRes = await deleteRequest(delUrl)
    if(delRes.status === 204)
    {
        $(deletedFolderItem).hide('200',() => {
            $(deletedFolderItem).remove();
        })
    }
    folder_reloader();
    await folderLoader();

    folder_items = document.querySelectorAll('.sideBody .Folder');
}
const create_folder_popup_handler = () => {
    create_folder_name_input.value = '';
    create_folder_popup.classList.add("active");
    nav_mask.classList.add("active");
}
const rename_folder_popup_handler = () => {
    rename_folder_input.value = '';
    rename_folder_popup.classList.add("active");
    nav_mask.classList.add("active");
}
const remove_folder_popup_handler = () => {
    remove_folder_popup.classList.add("active");
    nav_mask.classList.add("active");
}
addFormButton.addEventListener('click',() => {
    window.open('Setting.html','_self')
});

nav_mask.addEventListener("click" , folder_mask_close_panel);

add_folder_button.addEventListener("click",create_folder_popup_handler);

folder_cancel_button.forEach((item,index) => { item.addEventListener('click',folder_mask_close_panel) })

rename_folder_button.forEach((item,index) => { item.addEventListener('click',rename_folder_popup_handler); })

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
    localStorage.setItem("SelectedFolderID",Selected_folder_id)
})

const SideBodyContainer= document.querySelector('.sideBody');
const rename_folder_popup = document.querySelector(".renameFolderPopUp");
const folder_cancel_button = document.querySelectorAll(".cancel-button");
const add_form_item = document.querySelector(".form.AddForm");
const create_folder_confirm_btn = document.querySelector(".createFolderPopUp .confirm-button");
const rename_folder_confirm_btn = document.querySelector(".renameFolderPopUp .confirm-button")
const create_folder_name_input = document.querySelector("#create_folder_name");
const rename_folder_input = document.querySelector("#rename_folder_name");
const addFormButton = document.querySelector(".form.AddForm");
const create_folder_popup = document.querySelector(".createFolderPopUp");
const add_folder_button = document.querySelector(".AddFolder");
const search_folder_button = document.querySelector(".FolderSearch");
const search_folder_input = document.querySelector("#search-input");
const search_folder_container = document.querySelector(".search-box");
let remove_folder_button = document.querySelectorAll(".Folder .FolderRemove");
let folder_items = document.querySelectorAll(".sideBody .Folder");
let rename_folder_button = document.querySelectorAll(".FolderEdit");
const Folders_Slide_toggle = document.querySelector('.folder_slide_toggle')

const folder_generator = (folderName) => {
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

    FolderDiv.addEventListener('click',() => {
        setActive_folder(FolderDiv,folder_items);
    })
    SideBodyContainer.append(FolderDiv);

    folder_items = document.querySelectorAll('.sideBody .Folder');
    rename_folder_button = document.querySelectorAll('.FolderEdit');
    remove_folder_button = document.querySelectorAll(".Folder .FolderRemove");

    rename_folder_button.forEach((item,index) => { item.addEventListener('click',rename_folder_popup_handler); });

    remove_folder_button.forEach((item,index) => { item.addEventListener('click',folder_remove_handler) });

    EventListenerSetter(folder_items);
}
const folder_creator_handler = () => {
    folder_generator(create_folder_name_input.value);
    create_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");
}
const folder_mask_close_panel = () => {
   if(create_folder_popup.classList.contains("active"))
         create_folder_popup.classList.remove("active");
   if(rename_folder_popup.classList.contains("active"))
         rename_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");  
}
const search_button_handler = () => {
    nav_search_container.classList.toggle("search-active");
    search_folder_button.classList.toggle("search-active");
    search_folder_container.classList.toggle("search-active");
}

const setActive_folder = (folder_item,elements) => {
    console.log(elements)
    if(folder_item.classList.contains("Selected"))
        return;
    folder_items.forEach((item) => {
        item.classList.remove('Selected');
    });
    folder_item.classList.add('Selected');
  }
const folder_rename_handler = () => {
    let folder_name = document.querySelector(".Selected .FolderName p");

    folder_name.textContent = rename_folder_input.value;
    rename_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active"); 
}
const folder_remove_handler = () => {
    document.querySelector(".Selected.Folder").remove();
}
addFormButton.addEventListener('click',() => {
    window.open('Setting.html','_self')
});

nav_mask.addEventListener("click" , folder_mask_close_panel);

add_folder_button.addEventListener("click",create_folder_popup_handler);

search_folder_button.addEventListener("click",search_button_handler)

folder_cancel_button.forEach((item,index) => { item.addEventListener('click',folder_mask_close_panel) })

rename_folder_button.forEach((item,index) => { item.addEventListener('click',rename_folder_popup_handler); })

create_folder_confirm_btn.addEventListener('click',folder_creator_handler);

rename_folder_confirm_btn.addEventListener('click',folder_rename_handler);

remove_folder_button.forEach((item,index) => { item.addEventListener('click',folder_remove_handler) })

Folders_Slide_toggle.addEventListener('click',() => {
    $('.Folder').not('.Selected').slideToggle(200);
    Folders_Slide_toggle.classList.toggle('active');
})

function EventListenerSetter (Folder_Items)  {

    Folder_Items.forEach((folder_item,index) => {
        folder_item.addEventListener('click',(item,index) => {
            setActive_folder(folder_item,Folder_Items);
        })
    })
}
EventListenerSetter(folder_items);
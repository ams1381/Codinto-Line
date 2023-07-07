import {folderUrl} from './FoldersGetter.js'
import { patchRequest } from '../ajax/ajaxRequsts.js';
import { folderLoader } from './FoldersGetter.js';
import { folder_reloader } from './FolderScript.js';

const rename_folder_input = document.querySelector("#rename_folder_name");
const rename_folder_popup = document.querySelector(".renameFolderPopUp");
const rename_folder_confirm_button = document.querySelector('.renameFolderPopUp .confirm-button')

export const folder_rename_handler = async (FolderItemId) => {
    rename_folder_confirm_button.classList.add('operating');
    let RenameUrl = folderUrl + FolderItemId + '/';
    await patchRequest(RenameUrl,{ 'name' : rename_folder_input.value });

    let folder_name = document.getElementById(`${FolderItemId}`).children[1].firstChild;
    folder_name.textContent = rename_folder_input.value;
    rename_folder_popup.classList.remove("active");
    nav_mask.classList.remove("active");

    folder_reloader();
    await folderLoader();
    rename_folder_confirm_button.classList.remove('operating');
}
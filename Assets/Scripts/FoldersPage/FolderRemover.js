import {folderUrl} from './FoldersGetter.js';
import { deleteRequest } from '../ajax/ajaxRequsts.js';
import { folder_reloader } from './FolderScript.js';
import { folderLoader } from './FoldersGetter.js';
export const folder_remove_handler = async (FolderItemId , deletedFolderItem) => {
    let delUrl = folderUrl + FolderItemId + '/'
    let delRes = await deleteRequest(delUrl)
    if(delRes.status === 204)
    {
        $(deletedFolderItem).hide('200',() => {
            $(deletedFolderItem).remove();
        })
    }
    folder_reloader();
    await folderLoader();
}
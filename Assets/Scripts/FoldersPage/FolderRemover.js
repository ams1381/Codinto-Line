import {folderUrl} from './FoldersGetter.js';
import { deleteRequest } from '../ajax/ajaxRequsts.js';
import { folder_reloader } from './FolderScript.js';
import { folderLoader } from './FoldersGetter.js';
import { QuestionnaireCleaner } from './SearchQuestionnaire.js';
import { showAlert } from '../Question Design Pages/CommonActions/CommonActions.js';
export const folder_remove_handler = async (FolderItemId , deletedFolderItem) => {
    let delUrl = folderUrl + FolderItemId + '/'
    let delRes = await deleteRequest(delUrl)
    if(delRes == 204)
    {
        folder_reloader();
        QuestionnaireCleaner();
        await folderLoader();
    }
    else
         showAlert("پوشه پاک نشد")
}
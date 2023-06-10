import {getRequest} from "../ajax/ajaxRequsts.js";
import {baseUrl} from "../ajax/ajaxRequsts.js";
import  folder_generator  from './FolderScript.js'

const folderUrl = baseUrl + '/user-api/folders/';

const folderLoader =  async () => {
    try
        {
            let FoldersRes = await getRequest(folderUrl);
            if(FoldersRes)
                FoldersRes.forEach((item, index) => {
                        folder_generator(item.name,item.id,item.questionnaires);
                })
        }
    catch (err)
        {
            console.log(err)
        }
}
await folderLoader();
export { folderUrl , folderLoader};
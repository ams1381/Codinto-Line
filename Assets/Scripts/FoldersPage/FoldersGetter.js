import {getRequest} from "../ajax/ajaxRequsts.js";
import {baseUrl} from "../ajax/ajaxRequsts.js";
import  folder_generator  from './FolderScript.js'

const folderUrl = baseUrl + '/user-api/folders/';

const folderLoader =  async () => {
    try
        {
            let FoldersRes = await getRequest(folderUrl);

            const response_Data = FoldersRes.data;
            response_Data.forEach((item, index) => {
                if (folder_generator)
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
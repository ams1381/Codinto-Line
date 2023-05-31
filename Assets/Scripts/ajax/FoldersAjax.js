import {getRequest} from "./ajaxRequsts.js";
import {baseUrl} from "./ajaxRequsts.js";

import  folder_generator  from '../FolderScript.js'
const folderUrl = baseUrl + '/user-api/folders/';
const reqUrl = baseUrl + "/question-api/questionnaires/e4f2305e-d282-4417-9484-e429f9a661a2/textanswer-questions/";

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
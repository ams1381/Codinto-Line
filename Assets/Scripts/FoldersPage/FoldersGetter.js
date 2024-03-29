import {getRequest} from "../ajax/ajaxRequsts.js";
import {baseUrl} from "../ajax/ajaxRequsts.js";
import  folder_generator  from './FolderScript.js'
const folder_side_body = document.querySelector('.sideBody');
const folder_main = document.querySelector(".block__main");
const loading_container = document.getElementById('loading-animation');
        
const folderUrl = baseUrl + '/user-api/folders/';

const folderLoader =  async () => {
    $('.block__main').addClass('loading');
    loading_container.classList.remove('hide');
    try
        {
            let FoldersRes = await getRequest(folderUrl);
                if(FoldersRes.length == 0)
                {
                    $(loading_container).hide(100);
                    loading_container.classList.add('hide');
                    folder_side_body.classList.add("emptyActive");
                    folder_main.classList.add("emptyActive");
                    $('.block__main #loading-animation').addClass('hide');
                    $('.block__main').removeClass('loading')
                }   
                else
                {
                    folder_side_body.classList.remove("emptyActive");
                    folder_main.classList.remove("emptyActive");
                    FoldersRes.forEach((item, index) => {
                        folder_generator(item.name,item.id,item.questionnaires);
                    })  
                    $('.block__main').removeClass('loading');
                    $('.block__main #loading-animation').addClass('hide');
                    $('.block__main').removeClass('loading');
                }
                   
                loading_container.classList.add('hide');
            
            
        }
    catch (err)
        {
           
        }
}
await folderLoader();
export { folderUrl , folderLoader};
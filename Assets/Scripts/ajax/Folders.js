import {postRequest} from "./ajaxRequsts.js";
import {getRequest} from "./ajaxRequsts.js";
import {baseUrl} from "./ajaxRequsts.js";
const postUrl = baseUrl + '/user-api/folders/';
const reqUrl = baseUrl + "/question-api/questionnaires/e4f2305e-d282-4417-9484-e429f9a661a2/textanswer-questions/";

getRequest(postUrl).then((res) => {
    console.log(res.data)
})
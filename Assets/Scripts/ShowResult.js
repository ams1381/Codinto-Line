import { baseUrl ,  getRequest } from "./ajax/ajaxRequsts.js" 
const Questionnaire = JSON.parse(localStorage.getItem('QuestionnaireToShowResult'));
const result_table_head_row = document.querySelector('#result_table_head_row');
const result_table_head = document.querySelector('.resultTable thead')
const result_table_body = document.querySelector('#result_table_body');
const excel_export_button = document.getElementById('exportButton');
const table = document.querySelector('.resultTable');
const result_loader = async () => {
   let result_response = await getRequest(baseUrl + `/question-api/questionnaires/${Questionnaire.uuid}/answer-sets/`);
   let questionnaire_response = await getRequest(baseUrl + '/question-api/questionnaires/' + Questionnaire.uuid + '/')
   let head_items_html = ``;
   questionnaire_response.questions.forEach((question) => {
      if(!Array.isArray(question.question))
         head_item_generator(question.question)
   })
   
   result_response.forEach((result_item) => {
      body_row_generator(result_item,questionnaire_response.questions)
   })
   let table_body_trs = document.querySelectorAll("#result_table_body tr")
   if(table_body_trs.length)
   {
      table_body_trs.forEach((table_body_tr) => {
         if(!table_body_tr.firstElementChild)
               table_body_tr.remove()
      })
   }
}
const head_item_generator = (Head_item) => {
   
      let head_items_html = `
      <th scope="col" id="${Head_item.id}" ${Head_item.child_questions ? 'colspan=' + Head_item.child_questions.length : '' }>
         ${$(new DOMParser().parseFromString(Head_item.title,'text/html').firstChild.lastChild.firstChild).text()}
      </th>
      `
      result_table_head_row.innerHTML += head_items_html;
      console.log(head_items_html)
   if(Head_item.question_type == 'group' &&  Head_item.child_questions)
   {
      let sub_tr = ''
      let sub_ths = '';
      Head_item.child_questions.forEach((child_question) => {
         sub_ths += `
         <th scope="col" id="${child_question.question.id}" >
             ${$(new DOMParser().parseFromString(child_question.question.title,'text/html').firstChild.lastChild.firstChild).text()}
          </th>
         `
      })
      sub_tr = `
      <tr>
         ${sub_ths}
      </tr>
      `  
      result_table_head.innerHTML += sub_tr;
   }
      
}
const body_row_generator = (RowTextItems,questions) => {
   
   let body_row_td_items_html = ``;
   console.log(RowTextItems)
   RowTextItems.answers.forEach((answer) => {
      
      let td_data_label;
      let body_row_html;
      let td_items = '';
      
      answer.answer[Object.keys(answer.answer)[0]].forEach((item) => {
            if(item.id)
            {
               td_items += " "  + item.id + " ";
               body_row_td_items_html = `
               <td>
                  ${td_items}
               </td>
               ` 
            }
            else
            {
               body_row_td_items_html = `
               <td>
                  ${item}
               </td>
               ` 
            }
               
      })
      body_row_html = `
      <tr>
         ${body_row_td_items_html}
      <tr>
         `;
         result_table_body.innerHTML += body_row_html;
      // questions.forEach((Question) => {
         
      //    if(Question.question.id === answer.question)
      //      td_data_label = $(new DOMParser().parseFromString(Question.question.title,'text/html').firstChild.lastChild.firstChild).text();
           
      //      if(Array.isArray(answer.answer[Object.keys(answer.answer)[0]]))
      //      {
      //         answer.answer[Object.keys(answer.answer)[0]].forEach((item,index) => {
      //            td_items += " " + item.id + " ";
      //         })
      //      }
      //      else
      //         td_items = answer.answer[Object.keys(answer.answer)[0]];
      //      body_row_td_items_html += `
      //      <td data-label="${td_data_label}">
      //         ${td_items}
      //      </td>`
           
      //      if(new DOMParser().parseFromString(body_row_td_items_html,'text/html').firstChild.lastChild.firstChild)
      //    {
      //       let body_row_html = `
      //       <tr>
      //          ${body_row_td_items_html}
      //       <tr>
      //          `;

      //       result_table_body.innerHTML += body_row_html;
      //    }
      // })
      
      
   })
}
const exportTableToExcel = (table, filename = 'table') => {
   
   const workbook = XLSX.utils.table_to_book(table);
   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

   const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

   // Create a download link
   const link = document.createElement('a');
   link.href = URL.createObjectURL(blob);
   link.download = `${filename}.xlsx`;

   // Add the link to the document
   document.body.appendChild(link);

   link.click();

   document.body.removeChild(link);
}
excel_export_button.addEventListener('click',() => {
   exportTableToExcel(table,'exported_table')
})
await result_loader();
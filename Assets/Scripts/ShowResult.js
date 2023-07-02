import { baseUrl ,  getRequest } from "./ajax/ajaxRequsts.js" 
const Questionnaire = JSON.parse(localStorage.getItem('QuestionnaireToShowResult'));
const result_table_head_row = document.querySelector('#result_table_head_row');
const result_table_body = document.querySelector('#result_table_body');
const excel_export_button = document.getElementById('exportButton');
const table = document.querySelector('.resultTable');
const result_loader = async () => {
   let result_response = await getRequest(baseUrl + `/question-api/questionnaires/${Questionnaire.uuid}/answer-sets/`);
   let questionnaire_response = await getRequest(baseUrl + '/question-api/questionnaires/' + Questionnaire.uuid + '/')
   let head_items_html = ``;
   questionnaire_response.questions.forEach((question) => {
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
   $(".resultTable").resizableColumns({
      store: window.store
    });
}
const head_item_generator = (Head_item) => {
   let head_items_html = `
      <th scope="col" id="${Head_item.id}" >${Head_item.title}</th>
      `
   result_table_head_row.innerHTML += head_items_html;
}
const body_row_generator = (RowTextItems,questions) => {
   console.log(RowTextItems.answers)
   let body_row_td_items_html = ``;
   
   RowTextItems.answers.forEach((answer) => {
      let td_data_label;
      questions.forEach((Question) => {
         if(Question.question.id === answer.question)
           td_data_label = Question.question.title;
      })
      body_row_td_items_html += `<td data-label="${td_data_label}">${answer.answer[`${Object.keys(answer.answer)[0]}`]}</td>`
   })

   if(new DOMParser().parseFromString(body_row_td_items_html,'text/html').firstChild.lastChild.firstChild)
   {
      let body_row_html = `
      <tr>
         ${body_row_td_items_html}
      <tr>
         `;

      result_table_body.innerHTML += body_row_html;
   }
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
// const question_title_getter = (Questions,answerID) => {
//    Questions.forEach((Question) => {
//       if(Question.question.id === answerID)
//          return Question.question.title;
//    })
// }
await result_loader();
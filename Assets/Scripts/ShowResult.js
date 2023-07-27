import { baseUrl ,  getRequest } from "./ajax/ajaxRequsts.js" 
import { detectFileFormat } from "./Question Design Pages/CommonActions.js";
const Questionnaire = JSON.parse(localStorage.getItem('QuestionnaireToShowResult'));
const result_table_head_row = document.querySelector('#result_table_head_row');
const result_table_head = document.querySelector('.resultTable thead')
const result_table_body = document.querySelector('#result_table_body');
const excel_export_button = document.getElementById('exportButton');
const result_container = document.querySelector('.container');
const table = document.querySelector('.resultTable');
const search_result_button = document.querySelector('.Search_results');
const search_result_container = document.querySelector('.search_result_box');
const search_result_input = document.querySelector('#result_search_input')
const Line_charts_container = document.querySelector('.Line_charts_container');
const Bar_charts_container = document.querySelector('.Bar_charts_container');
const Pie_chart_container = document.querySelector('.Pie_chart_container')
const Shape_chart_container = document.querySelector('.Shape_chart_container')
let question_ids = [...document.querySelectorAll('#result_table_head_row th')].map((item) => item.getAttribute('id'));
let loaded_questions;
let result_response;
let questionnaire_response
const result_loader = async () => {
   let result_response = await getRequest(`${baseUrl}/result-api/${Questionnaire.uuid}/answer-sets/`);
   let questionnaire_response = await getRequest(baseUrl + '/question-api/questionnaires/' + Questionnaire.uuid + '/');
   console.log(result_response)
   loaded_questions = questionnaire_response.questions;
   result_container.classList.remove('loading');
   $('#loading-animation').addClass('hide');
   $(table).show(100);
   let head_items_html = ``;
   questionnaire_response.questions.forEach((question) => {
      if(question.question)
         head_item_generator(question.question)
   })
   question_ids = [...document.querySelectorAll('#result_table_head_row th')].map((item) => item.getAttribute('id'))
   result_response.forEach((result_item) => {
      body_row_generator(result_item,questionnaire_response.questions,question_ids)
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
   if(Head_item.question_type == 'no_answer')
      return
   if(Head_item.question_type != 'group')
   {
      let head_items_html = `
      <th  id="${Head_item.id}" data-label="${$(new DOMParser().parseFromString(Head_item.title,'text/html').firstChild.lastChild.firstChild).text()}" >
         ${$(new DOMParser().parseFromString(Head_item.title,'text/html').firstChild.lastChild.firstChild).text()}
      </th>
      `
      result_table_head_row.innerHTML += head_items_html;
   }
      
   if(Head_item.question_type == 'group' &&  Head_item.child_questions)
   {
      let sub_tr = ''
      let sub_ths = '';
      Head_item.child_questions.forEach((child_question) => {
         sub_ths += `
         <th  id="${child_question.question.id}" data-label="${$(new DOMParser().parseFromString(child_question.question.title,'text/html').firstChild.lastChild.firstChild).text()}">
             ${$(new DOMParser().parseFromString(child_question.question.title,'text/html').firstChild.lastChild.firstChild).text()}
          </th>
         `
      })
      result_table_head_row.innerHTML += sub_ths;
   }
   $(result_table_head_row).hide();
   $(result_table_head_row).show(100); 
}
const padArrayWithNull = (array, indices,maxLength) => {
  const paddedArray = Array.from({ length: maxLength }, (_, index) =>
    indices.includes(index) ? array[indices.indexOf(index)] : null
  );
  return paddedArray;
}
const body_row_generator = (RowTextItems,Questions,question_ids) => {
   if(RowTextItems.answers.length == 0)
      return
   let table_row = '';
   let table_row_data = ''
   let multiple_option_data = '';
   let sort_of_empty_row = []
   let data_label = ''
   RowTextItems.answers.forEach((item) => {
      
      Questions.map((Question) => {
         if(Question.question && Question.question.id == item.question_id)
            data_label = Question.question.title;
      })
      data_label = $(new DOMParser().parseFromString(data_label,'text/html').firstChild.lastChild.firstChild).text();
      if(Array.isArray(item.answer))
      {
         multiple_option_data = '';
         item.answer.forEach((item) => {
            multiple_option_data += ' ' + item.text + ' '
      })

         table_row_data += `<td data-label="${data_label}" id="${item.question_id}"><p>${multiple_option_data ? multiple_option_data : '&nbsp'}</p></td>`
      }
      else
      {
         if(typeof item.answer == 'string' && item.answer.includes('media'))
            {
               
               detectFileFormat(item.answer) == 'Picture' ?
               table_row_data += `<td data-label="${data_label}" id="${item.question_id}"><img class="td_image" src=${baseUrl + item.answer} /></td>`
               : detectFileFormat(item.answer) == 'Video' ?
               table_row_data += `<td data-label="${data_label}" id="${item.question_id}"><video class="td_image" src=${baseUrl + item.answer} controls></video></td>`
               : table_row_data += `<td data-label="${data_label}" id="${item.question_id}"><svg width="47" height="47" viewBox="0 0 32.00 32.00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#3F52E3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>file-document</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke-width="0.00032" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-154.000000, -99.000000)" fill="#3F52E3"> <path d="M174,107 C172.896,107 172,106.104 172,105 L172,101 L178,107 L174,107 L174,107 Z M178,127 C178,128.104 177.104,129 176,129 L158,129 C156.896,129 156,128.104 156,127 L156,103 C156,101.896 156.896,101 158,101 L169.972,101 C169.954,103.395 170,105 170,105 C170,107.209 171.791,109 174,109 L178,109 L178,127 L178,127 Z M172,99 L172,99.028 C171.872,99.028 171.338,98.979 170,99 L158,99 C155.791,99 154,100.791 154,103 L154,127 C154,129.209 155.791,131 158,131 L176,131 C178.209,131 180,129.209 180,127 L180,109 L180,107 L172,99 L172,99 Z" id="file-document" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg></td>`
            } 
         else
            table_row_data += `<td data-label="${data_label}" id="${item.question_id}"><p>${item.answer ? item.answer : '&nbsp'}</p></td>`
            
      }
      // table_row_data += item.answer
      table_row = `
      <tr id="R${RowTextItems.id}">
         ${table_row_data}
      </tr>
      `
      
   })
   result_table_body.innerHTML += table_row;
   
   if(RowTextItems.answers.length < question_ids.length)
   {
      RowTextItems.answers.forEach((item) => {
         sort_of_empty_row.push(question_ids.findIndex(element => element == item.question_id))
      })
   }
   sort_of_empty_row.sort()
   let table_data = [...document.querySelectorAll(`#R${RowTextItems.id} td`)]
   document.querySelectorAll(`#R${RowTextItems.id} td`).forEach((item) => { item.remove() })
   table_data = [... new Set(question_ids.map(id => table_data.find(element => element.id === id)))]
   
   table_data = table_data.filter((element) => element !== undefined)
   
   if(table_data.length < question_ids.length)
      table_data = padArrayWithNull(table_data,sort_of_empty_row,question_ids.length)
  
   table_data.forEach((item,index) => {
      if(item)
         document.querySelector(`#R${RowTextItems.id}`).innerHTML += item.outerHTML;
      else
      {
         Questions.forEach((Question) => {
            if(Question.question && Question.question.id == question_ids[index])
               data_label = $(new DOMParser().parseFromString(Question.question.title,'text/html').firstChild.lastChild.firstChild).text()
         }) 
         document.querySelector(`#R${RowTextItems.id}`).innerHTML += `<td data-label="${data_label}">&nbsp</td>`;
      }
         
   })
   $(result_table_body).hide();
   $(result_table_body).show(100);
}
const exportTableToExcel = (table, filename = 'table') => {
   
   const workbook = XLSX.utils.table_to_book(table);
   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

   const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

   const link = document.createElement('a');
   link.href = URL.createObjectURL(blob);
   link.download = `${filename}.xlsx`;

   document.body.appendChild(link);

   link.click();

   document.body.removeChild(link);
}
excel_export_button.addEventListener('click',() => {
   exportTableToExcel(table,'exported_table')
})
const result_searcher = async (search_text) => {
   let result_search_res = await getRequest(`${baseUrl}/result-api/${Questionnaire.uuid}/answer-sets/search/?search=${search_text}`);
   document.querySelectorAll('tbody tr').forEach((item) => { item.remove() })
   result_search_res.forEach((item) => {
      body_row_generator(item,loaded_questions,question_ids)
   })
}

search_result_button.addEventListener('click',async () => {
   if(search_result_button.classList.contains('search-active'))
   {
      search_result_button.classList.remove('search-active');
      search_result_container.classList.remove('search_active');
      document.querySelectorAll('td').forEach((item) => { item.remove() });
      document.querySelectorAll('th').forEach((item) => { item.remove() });
      $('#loading-animation').removeClass('hide');
      await result_loader();
      $('#loading-animation').addClass('hide');
   }
   else
   {
      search_result_button.classList.add('search-active');
      search_result_container.classList.add('search_active');
   }
   window.innerWidth < 600 ? $('.navbar-codinto-title').toggle() : ''
})
search_result_input.addEventListener('input',async (e) => {
   await result_searcher(e.target.value)
})
const chart_loader = async () => {
   let plot_res;
   try
   {
      plot_res = await getRequest(`${baseUrl}/result-api/${Questionnaire.uuid}/plots/`);
   }
   catch(err)
   {
      return
   }
   plot_res.forEach((item) => {
      let Question_title = $(new DOMParser().parseFromString(item.question,'text/html').firstChild.lastChild.firstChild).text()
      if(item.question_type != 'integer_selective')
      {
         Line_chart_generator(Question_title,`LineChart${item.question_id}`,item.options.map(option => option.text),Object.values(item.counts));
         Bar_chart_generator(Question_title,`BarChart${item.question_id}`,item.options.map(option => option.text),Object.values(item.counts));
         Pie_chart_generator(Question_title,`PierChart${item.question_id}`,item.options.map(option => option.text),Object.values(item.counts));
      }
      else if(item.question_type =='integer_selective')
      {
         Shape_chart_generator(Question_title,`ShapeChart${item.question_id}`,item.count,item.average,item.shape)
      }
   })
}
const Line_chart_generator = (QuestionTitle,ChartID,xValues,yValues) => {
   let chart_canvas  = `
   <div class="chart_graph">
   <p>
      ${QuestionTitle}
   </P>
       <canvas id="${ChartID}" class="chart_canvas" style="width:100%;max-width:600px"></canvas>
   </div>
   `;

   Line_charts_container.appendChild(new DOMParser().parseFromString(chart_canvas,'text/html').firstChild.lastChild.firstChild)
   new Chart(ChartID, {
     type: "line",
     data: {
       labels: xValues,
       datasets: [{
         fill: false,
         lineTension: 0,
         backgroundColor: "rgba(0,0,255,1.0)",
         borderColor: "rgba(0,0,255,0.1)",
         fontFamily : 'IRANSans',
         data: yValues
       }]
     },
     options: {
      plugins: {
         title: {
           font: {
             family: 'IRANSans', // Set your desired font family here
             weight: 'bold' // You can also set the font weight if needed
           }
         },
         legend: {
           display: false
         },
         tooltip: {
           bodyFont: {
             family: 'IRANSANS'
           }
         }
       },
       scales: {
         x: {
           ticks: {
             font: {
               family: 'IRANSANS'
             }
           }
         },
         y: {
           ticks: {
             font: {
               family: 'IRANSANS'
             }
           }
         }
       }
    }
   });
}
const Pie_chart_generator = (QuestionTitle,ChartID,xValues,yValues) => {
   let chart_canvas  = `
   <div class="chart_graph">
   <p>
      ${QuestionTitle}
   </P>
       <canvas id="${ChartID}" class="chart_canvas" style="width:100%;max-width:600px"></canvas>
   </div>
   `;
   Pie_chart_container.appendChild(new DOMParser().parseFromString(chart_canvas,'text/html').firstChild.lastChild.firstChild)
   let barColors = generateRandomColors(yValues.length)

   new Chart(ChartID, {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
        },
        plugins: {
         legend: {
           labels: {
             font: {
               family: 'IRANSANS' // Set font family for the legend labels
             }
           }
         }
      }
   }
    });
}
const Bar_chart_generator = (QuestionTitle,ChartID,xValues,yValues) => {
      let chart_canvas  = `
      <div class="chart_graph">
         <p>
            ${QuestionTitle}
         </P>
         <canvas id="${ChartID}" class="chart_canvas" style="width:100%;max-width:600px"></canvas>
      </div>
      `;

      Bar_charts_container.appendChild(new DOMParser().parseFromString(chart_canvas,'text/html').firstChild.lastChild.firstChild)
      var barColors = generateRandomColors(xValues.length)

      new Chart(ChartID, {
      type: "bar",
      data: {
         labels: xValues,
         datasets: [{
            backgroundColor: barColors,
            data: yValues
         }]
      },
      options: {
         legend: {display: false},
         title: {
            display: true,
            text: "World Wine Production 2018"
          },
          plugins: {
            tooltip: {
              enabled: false // Hide the tooltip
            }
          },
         scales: {
            x: {
              ticks: {
                font: {
                  family: 'IRANSANS'
                }
              }
            },
            y: {
               beginAtZero: true,
               ticks: {
                  font: {
                     family: 'IRANSANS'
                  }
              }
            }
          }
      }
      });
}
const Shape_chart_generator = (QuestionTitle,ChartID,count,average,shape) => {
      console.log(shape)
      let chart_shape_icon = '';
      let chart_shape_before_content = '';
      if(shape == 'H')
         chart_shape_icon = '❤'
      else if(shape == 'S')
         chart_shape_icon = '★'
      else if(shape == 'L')
         chart_shape_icon = '👍'
         Array.from({ length : count }).forEach(() => {
            chart_shape_before_content += chart_shape_icon;
         })
      let Shape_chart_html = `
      <div class="shape_chart">
      <p>
         ${QuestionTitle}
      </p>
      <span> میانگین انتخاب ${Math.round(average * 10) / 10} است </span>
      <div class="Stars" class="shapes" id="${ChartID}">
         </div>
         </div>
      `
   console.log(count,average)
   Shape_chart_container.append(new DOMParser().parseFromString(Shape_chart_html,'text/html').firstChild.lastChild.firstChild)
   $(`#${ChartID}`).css({
      "--percent": `calc(${average} / ${count} * 100%)`,
      "font-size" : "1.5rem" ,
      "font-family": "Times",
      "line-height" : "1",
      "margin": "10px auto",
      "display": "flex",
   })
   document.head.innerHTML += `
   <style>
   #${ChartID}::before 
   {
      content: '${chart_shape_before_content}';
      letter-spacing: 3px;
      filter: drop-shadow(2px 4px 0px #0000001A);
      background: linear-gradient(90deg, #ffff2a  calc(${average} / ${count} * 100%), #dbdbdb  calc(${average} / ${count} * 100%));
      -webkit-background-clip : text;
      -webkit-text-fill-color: transparent;
      font-size: 3rem;
      margin: 0 auto;
      word-break: break-word;
   }
   </style>
   `
}
const generateRandomColors = (count) => {
   const colors = [];
   const letters = '0123456789ABCDEF';
 
   while (colors.length < count) {
     const color = '#' + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('');
     colors.push(color);
   }
 
   return colors;
};

await result_loader();
await chart_loader();
import { baseUrl ,  getRequest } from "./ajax/ajaxRequsts.js" 
import { detectFileFormat } from "./Question Design Pages/CommonActions/CommonActions.js";
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

const charts_main_container = document.querySelector('.charts_box');
let question_ids = [...document.querySelectorAll('#result_table_head_row th')].map((item) => item.getAttribute('id'));
let loaded_questions;
let result_response;
let questionnaire_response
const result_loader = async () => {
   let result_response = await getRequest(`${baseUrl}/result-api/${Questionnaire.uuid}/answer-sets/`);
   let questionnaire_response = await getRequest(baseUrl + '/question-api/questionnaires/' + Questionnaire.uuid + '/');
   console.log(result_response)
   if(!result_response.length)
   {
      $(".resultTable , .charts_box , #exportButton").remove();
      $('.container').addClass('empty_result')
      result_container.innerHTML = `
         <p>نتیجه ای جهت نمایش وجود ندارد</p>
      `
      return
   }
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
   await chart_loader();
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
   $('.charts_box').show(10);
   plot_res.forEach((item) => {
      let question_plot_row = `
      <div class="question_chart_row" id="chartRow${item.question_id}">
                <div class="row__top_part">
                    <p>${$(new DOMParser().parseFromString(item.question,'text/html').firstChild.lastChild.firstChild).text()}</p>
                    
                    <div class="chart_icons_selector">
                        <label id="bar_chart${item.question_id}_checkbox">
                           <i class="bar_chart">
                              <svg height="32" width="32" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.40 490.40" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M17.2,251.55c-9.5,0-17.2,7.7-17.2,17.1v179.7c0,9.5,7.7,17.2,17.2,17.2h113c9.5,0,17.1-7.7,17.1-17.2v-179.7 c0-9.5-7.7-17.1-17.1-17.1L17.2,251.55L17.2,251.55z M113,431.25H34.3v-145.4H113V431.25z"></path> <path d="M490.4,448.45v-283.7c0-9.5-7.7-17.2-17.2-17.2h-113c-9.5,0-17.2,7.7-17.2,17.2v283.6c0,9.5,7.7,17.2,17.2,17.2h113 C482.7,465.55,490.4,457.85,490.4,448.45z M456.1,431.25h-78.7v-249.3h78.7L456.1,431.25L456.1,431.25z"></path> <path d="M301.7,465.55c9.5,0,17.1-7.7,17.1-17.2V42.05c0-9.5-7.7-17.2-17.1-17.2h-113c-9.5,0-17.2,7.7-17.2,17.2v406.3 c0,9.5,7.7,17.2,17.2,17.2H301.7z M205.9,59.25h78.7v372h-78.7L205.9,59.25L205.9,59.25z"></path> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
                           </i>
                        </label>
                        <label id="pie_chart${item.question_id}_checkbox">
                           <i class="pie_chart">
                              <svg width="30" height="30" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3M21 12C21 7.02944 16.9706 3 12 3M21 12H12M12 3V12M12 12L16.9948 19.4879" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </i>
                        </label>
                        <label id="line_chart${item.question_id}_checkbox">
                           <i class="line_chart">
                              <svg width="30" height="30" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M15 10V17M7 13V17M19 5V17M11 7V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                           </i>
                        </label>
                        
                    </div>
                </div>
                <div class="row_down_part">
                    <div class="chart_container">
                    <button class="png_export_button"> 
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke="#3F52E3" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5" stroke="#3F52E3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                     </button
                    </div>
                </div>
            </div>
      `
      charts_main_container.append(new DOMParser().parseFromString(question_plot_row,'text/html').firstChild.lastChild.firstChild)
      let Question_title = $(new DOMParser().parseFromString(item.question,'text/html').firstChild.lastChild.firstChild).text()

         let axis_x_variables = item.options ? 
            item.options.map(option => option.text)
          : Object.keys(item.counts)

            Line_chart_generator(Question_title,item.question_id,`LineChart${item.question_id}`,axis_x_variables,Object.values(item.counts));
            Bar_chart_generator(Question_title,item.question_id,`BarChart${item.question_id}`,axis_x_variables,Object.values(item.counts));
            Pie_chart_generator(Question_title,item.question_id,`PieChart${item.question_id}`,axis_x_variables,Object.values(item.counts));

      let chart_icons = document.querySelectorAll(`#chartRow${item.question_id} .chart_icons_selector label`);
      chart_icons.forEach((chart_icon) => {
         chart_icon.addEventListener('click',() => {
            document.querySelectorAll(`#chartRow${item.question_id} canvas`).forEach((canvasItem) => {
               canvasItem.style.display = 'none'
            })
            document.querySelectorAll(`#chartRow${item.question_id} .chart_icons_selector label`).forEach((LabelItem) => {
               if(LabelItem.getAttribute('id') !== chart_icon.getAttribute('id'))
                     LabelItem.classList.remove('checked');
            })
            if(!chart_icon.classList.contains('checked'))
            {
               $(`#chartRow${item.question_id} .png_export_button`).off('click')
               $(`#chartRow${item.question_id} .png_export_button`).show(40);
               $(`#chartRow${item.question_id} .png_export_button`).on('click',() => {
                  exportChart($(`#chartRow${item.question_id} canvas.${chart_icon.firstElementChild.className}`).attr("id"))
               })
               chart_icon.classList.add('checked')
               document.querySelector(`#chartRow${item.question_id} canvas.${chart_icon.firstElementChild.className}`).setAttribute('style','display : block !important;');
            }
            else
            {
               $(`#chartRow${item.question_id} .png_export_button`).off('click')
               $(`#chartRow${item.question_id} .png_export_button`).hide(20);
               chart_icon.classList.remove('checked')
               $(`#chartRow${item.question_id} canvas.${chart_icon.firstElementChild.className}`).hide(140);
               // document.querySelector(`#chartRow${item.question_id} canvas.${chart_icon.firstElementChild.className}`).setAttribute('style','display : none !important;');
            }   
         })
      })
   })
   
}
const Line_chart_generator = (QuestionTitle,QuestionID,ChartID,xValues,yValues) => {
   xValues = xValues.map(item => item.includes('<span>','</span>') ? item = item.replace("<span>","").replace("</span>","") : item)

   let chart_canvas  = `
       <canvas class="line_chart chart_canvas" id="${ChartID}"  style="width:100%;max-width:600px"></canvas>
   `;

   document.querySelector(`#chartRow${QuestionID} .row_down_part .chart_container`).appendChild(new DOMParser().parseFromString(chart_canvas,'text/html').firstChild.lastChild.firstChild)
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
      aspectRatio: 1,
      plugins: {
         title: {
           font: {
             family: 'IRANSans', 
             weight: 'bold' 
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
const Pie_chart_generator = (QuestionTitle,QuestionID,ChartID,xValues,yValues) => {
   xValues = xValues.map(item => item.includes('<span>','</span>') ? item = item.replace("<span>","").replace("</span>","") : item)
   let chart_canvas  = `
       <canvas class="pie_chart chart_canvas" id="${ChartID}" style="width:100%;max-width:600px"></canvas>
   `;
   document.querySelector(`#chartRow${QuestionID} .row_down_part .chart_container`).appendChild(new DOMParser().parseFromString(chart_canvas,'text/html').firstChild.lastChild.firstChild)
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
               family: 'IRANSANS'
             }
           }
         }
      }
   }
    });
}
const Bar_chart_generator = (QuestionTitle,QuestionID,ChartID,xValues,yValues) => {
   xValues = xValues.map(item => item.includes('<span>','</span>') ? item = item.replace("<span>","").replace("</span>","") : item)
   console.log(xValues,yValues)
      let chart_canvas  = `
         <canvas id="${ChartID}" class="bar_chart chart_canvas" style="width:100%;max-width:600px"></canvas>
      `;

      document.querySelector(`#chartRow${QuestionID} .row_down_part .chart_container`).appendChild(new DOMParser().parseFromString(chart_canvas,'text/html').firstChild.lastChild.firstChild)
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
         aspectRatio: 1,
         legend: {display: false},
         title: {
            display: false,
          },
          tooltips: {
            enabled: false
         },
          plugins: {
            legend: {
               display: false
           },
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
   document.querySelector(`#chartRow${QuestionID} .row_down_part .chart_container`).append(new DOMParser().parseFromString(Shape_chart_html,'text/html').firstChild.lastChild.firstChild)
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
const exportChart = async (ChartID) => {
      const canvas = document.getElementById(ChartID);
      console.log(canvas)
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'chart.png';
      link.click();
};
await result_loader();

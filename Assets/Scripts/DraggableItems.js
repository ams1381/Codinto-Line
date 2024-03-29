import { getRequest , patchRequest, postRequest } from "./ajax/ajaxRequsts.js";
import { baseUrl } from "./ajax/ajaxRequsts.js";

const SelectedQuestionnaire = JSON.parse(localStorage.getItem("SelectedQuestionnaire"));

export const drag_drop_setter = (container_to_Set) => {
  let mainDrake = dragula(
    [...container_to_Set], {
         direction: 'vertical',
         slideFactorX: 0,
         'dom-autoscroller' : 'window',
         mirrorContainer: document.body, 
         moves: function (el, source, handle, sibling) {
          $('.gu-mirror').css({
            'width' : '50%',
            'height' : 'auto' ,
            'display' : 'flex' , 
            'border' : '2px solid var(--brand-color)' ,
            'border-radius' : '20px'
            
          })
            const draggedItem = el;
            if(draggedItem.className.indexOf('welcome-page') != -1 
            || draggedItem.className.indexOf('thank-page') != -1 )
                return false;
            return true; 
          },
          accepts: function (el, target, source, sibling) {
          ;
          if(!$('.gu-mirror').hasClass('Question-Nested'))
            $('.gu-mirror').css({
              'width' : '50%',
              'height' : 'auto' ,
              'display' : 'flex' , 
              'border' : '2px solid var(--brand-color)' , 
              'border-radius' : '20px'
            })
            else 
            {
              $('.gu-mirror .Questionitem').css({
                'width' : '100%',
                'height' : 'auto' ,
                'display' : 'flex' , 
                'border' : '2px solid var(--brand-color)' , 
                'border-radius' : '20px'
              }) 
            }
        
            if(el.nextElementSibling)
               return  !(el.nextElementSibling.className.indexOf('welcome-page') != -1);
            if(el.previousElementSibling)
              return !(el.previousElementSibling.className.indexOf('thank-page') != -1)
            return true; 
          },
          invalid: function (el, handle) {
            return false; 
          },
         revertOnSpill: true,
         removeOnSpill: false,
    }
  );
    mainDrake.on('drag',() => {
      document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive:false });
    })
    mainDrake.on('drop',async (	el, target, source, sibling) => {
        await MainDroppedHandler(el,target)
        await ReorderQuestionsPoster();
        $(document).off('touchstart')
    })
    autoScroll([
      document.querySelector('.block__main')
    ],{
      margin: 110,
      autoScroll: function(){
        return this.down && mainDrake.dragging;
      }
    });

}
const MainDroppedHandler = async (el,target) => {
    
  let sup_labels = document.querySelectorAll(".sup-label");
    if(el.parentElement.parentElement.className.includes('Question-Nested-items'))
    {
      let sub_question_id;
      let sub_question_type = el.classList[1];
      if(el.getAttribute("id"))
      {
        sub_question_id = parseInt(el.getAttribute("id").split("Question")[1]);
        sub_question_type = el.classList[1]
      }
        
      else 
      {
        sub_question_id = parseInt(el.firstElementChild.getAttribute("id").split("Question")[1]);
        sub_question_type = el.firstElementChild.classList[1];
      }
        
      
      let group_question_id = parseInt(el.parentElement.parentElement.previousElementSibling.getAttribute("id").split("Question")[1])
      await group_question_patcher(sub_question_type,sub_question_id , group_question_id,'group')
      el.firstElementChild.className = 'QuestionLabel sub-label';
      let sub_labels = [...document.querySelectorAll(".sub-label")]
      question_subNumber_setter(sub_labels,target)
      sup_labels = document.querySelectorAll(".sup-label")
    }
      
    else
    {
      if(el.firstElementChild.className.includes('sub-label'))
      {
        let sub_question_id = parseInt(el.getAttribute("id").split("Question")[1]);
        await group_question_patcher(el.classList[1],sub_question_id , null,'ungroup')
      }
      if(el.firstElementChild.className.includes('sub-label'))
        el.firstElementChild.className = 'QuestionLabel sup-label';
      sup_labels = document.querySelectorAll(".sup-label")
      sup_labels.forEach((item,index) => {
        item.textContent = index + 1;
      })
      
      DashedNumberSorter();
      return;
    }  
    
    sup_labels = document.querySelectorAll(".sup-label")
    let sup_labels_numbers = []
    sup_labels.forEach((item) => {
      sup_labels_numbers.push(parseInt(item.innerHTML))
    })
    sup_labels_numbers = [...new Set(sup_labels_numbers)];
    
     
    sup_labels_numbers.sort((a,b) => a - b);        
    sup_labels.forEach((item,index) => {
            item.textContent =  sup_labels_numbers[index];       
    })
    DashedNumberSorter();
    sup_labels = document.querySelectorAll(".sup-label")
    
}
const DashedNumberSorter = () => {
    var sub_labels = [...document.querySelectorAll(".sub-label")];
    sub_labels = [...new Set(sub_labels)];

    var QuestionSubNumbers = sub_labels.map((item) => item.textContent)
    var nestedLabels = [...document.querySelectorAll(".Question-Nested .QuestionLabel.sup-label")]
    nestedLabels = [...new Set(nestedLabels)]
    const splitByDash = str => str.split(/-/).map(Number);

    const compareArrays = (a, b) =>
      a.reduce((result, number, index) =>
        result || (number - b[index]) * Math.pow(10, (a.length - index) * 2), 0);
    
    QuestionSubNumbers = [...new Set(QuestionSubNumbers)].sort((a, b) =>
      compareArrays(splitByDash(a), splitByDash(b))
    );

    QuestionSubNumbers.forEach((item,index) => {
        
        let QuestionNumber =  QuestionSubNumbers[index];
        let sup_number = sub_labels[index].parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.textContent; 
        QuestionNumber =  QuestionNumber.slice(1,QuestionNumber.length)
        sub_labels[index].textContent = sup_number + '-' + QuestionNumber.split('-')[1];
     }
    ) 
}
const ReorderQuestionsPoster = async () => {
    let QuestionItems = document.querySelectorAll(".Questionitem");
    var QuestionSupLabels =[...document.querySelectorAll(".QuestionLabel")];
    QuestionSupLabels.forEach((item,index) => {
      if(item.parentElement.classList.contains('welcome-page') || item.parentElement.classList.contains('thank-page'))
      {
          QuestionSupLabels.splice(index,1)
      }
    })
    let replacementPostObject = {
       'placements' : []
    } ;

    QuestionSupLabels.forEach((QuestionSupLabel) => {
      let placement = QuestionSupLabel.textContent.split("-")[1] ? QuestionSupLabel.textContent.split("-")[1] : QuestionSupLabel.textContent.split("-")[0]
        replacementPostObject.placements.push(
          {
            'question_id' : parseInt(QuestionSupLabel.parentElement.getAttribute("id").split("Question")[1]) ,
            'new_placement' : parseInt(placement)
            }
        )
    })
    replacementPostObject.placements == removeDuplicates(replacementPostObject.placements)

  await postRequest(`${baseUrl}/question-api/questionnaires/${SelectedQuestionnaire.uuid}/change-questions-placements/`,'application/json',replacementPostObject)
  
}
const removeDuplicates = (ArrayToIterate) => {
  let jsonObject = ArrayToIterate.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  let uniqueArray = Array.from(uniqueSet).map(JSON.parse);

  return uniqueArray
}
const question_subNumber_setter = (sub_labels,target) => {
    sub_labels.forEach((item,index) => {
      item.textContent = parseInt(item.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.textContent) + `-${index + 1}`;
    })
}
const group_question_patcher = async (Question_Type,QuestionID,group_question_id,Group_state) => {

    let retrieved_question;
    if(Question_Type == 'integer_range')
      Question_Type = 'integerrange';
    else if(Question_Type == 'email_field')
      Question_Type = 'email';
    else if(Question_Type == 'drop_down')
      Question_Type = 'dropdown';
    else if(Question_Type == 'no_answer')
      Question_Type = 'noanswer';
    else if(Question_Type == 'integer_selective')
      Question_Type = 'integerselective';
    else if(Question_Type == 'text_answer')
      Question_Type = 'textanswer';
    else if(Question_Type == 'number_answer')
      Question_Type = 'numberanswer';
    retrieved_question = await  getRequest(`${baseUrl}/question-api/questionnaires/${SelectedQuestionnaire.uuid}/${Question_Type}-questions/${QuestionID}/`);
    if(Question_Type == 'group')
      retrieved_question = await  getRequest(`${baseUrl}/question-api/questionnaires/${SelectedQuestionnaire.uuid}/question-groups/${QuestionID}/`);
    

    
    if(Group_state == 'group')
      retrieved_question.group = group_question_id;
    else if(Group_state != 'group')
      retrieved_question.group = null;

      delete retrieved_question.media;
    await patchRequest(`${baseUrl}/question-api/questionnaires/${SelectedQuestionnaire.uuid}/${Question_Type}-questions/${QuestionID}/`,retrieved_question)
}


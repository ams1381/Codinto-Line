const nestedContainer = document.querySelectorAll('.nested');
const nestedQuestionContainer = document.querySelectorAll(".nested-container");
const sideContainer = document.querySelectorAll(".block__side");
const QuestionBoxContainer = document.querySelector('.QuestionsBox');
const ThankPageItem = document.querySelector('.ThankPage');

const mainDrake = dragula(
    [...nestedContainer], {
         direction: 'vertical',
         slideFactorX: 0,
         mirrorContainer: document.body,  
         moves: function (el, source, handle, sibling) {
            const draggedItem = el;
            if(draggedItem.className.indexOf('GreetingPage') != -1 
            || draggedItem.className.indexOf('ThankPage') != -1 )
                return false;
            return true; 
          },
          accepts: function (el, target, source, sibling) {
            if(sibling)
            {
                if(sibling.className.indexOf('GreetingPage') != -1 )
                return false;
            }
            return true; 
          },
          invalid: function (el, handle) {
            if(el.className.indexOf('Question-Nested-items') != -1)
                return true;
            return false; 
          },
         revertOnSpill: true,
         removeOnSpill: false,
    }
);
const InnerNestedContainer = dragula(
    [...nestedQuestionContainer], {
        direction: 'vertical',
        slideFactorX: 0,
        mirrorContainer: document.body,  
        revertOnSpill: true,
        removeOnSpill: false,
   }
)
const MainDroppedHandler = (el, target, source, sibling) => {
    
    var QuestionSupLabels = document.querySelectorAll(".sup-label");
    var QuestionNumbers = [];
    
    QuestionSupLabels.forEach((QuestionLabel,index) => {
        QuestionNumbers.push(parseInt(QuestionLabel.firstChild.textContent))    
    })
        QuestionNumbers.pop();
     
    QuestionNumbers.sort((a,b) => a - b);        
    
    QuestionSupLabels.forEach((item,index) => {
            QuestionSupLabels[index].textContent =  QuestionNumbers[index]
    })
       DashedNumberSorter();
}

const DashedNumberSorter = () => {
    
    var QuestionSubLabels = document.querySelectorAll(".sub-label");
    var QuestionSubNumbers = Array.from(QuestionSubLabels).map((item) => item.textContent)
    var nestedLabels = document.querySelectorAll(".Question-Nested .QuestionLabel")
    
    const splitByDash = str => str.split(/-/).map(Number);
  
    const compareArrays = (a, b) =>
      a.reduce((result, number, index) =>
        result || (number - b[index]) * Math.pow(10, (a.length - index) * 2), 0);
    
    QuestionSubNumbers = [...new Set(QuestionSubNumbers)].sort((a, b) =>
      compareArrays(splitByDash(a), splitByDash(b))
    );
    Array.from(QuestionSubNumbers).forEach((item,index) => {
        let QuestionNumber =  QuestionSubNumbers[index];
        QuestionNumber =  QuestionNumber.slice(1,QuestionNumber.length)
        QuestionSubLabels[index].textContent = nestedLabels[0].textContent.trim()[0] + QuestionNumber;
     }
    ) 
}

mainDrake.on('drop',MainDroppedHandler)
InnerNestedContainer.on('drop',DashedNumberSorter)


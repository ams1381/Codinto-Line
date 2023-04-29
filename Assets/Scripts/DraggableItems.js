const nestedContainer = document.querySelectorAll('.nested');
const nestedQuestionContainer = document.querySelectorAll(".nested-container");
const sideContainer = document.querySelectorAll(".block__side");


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
                if(sibling.className.indexOf('GreetingPage') != -1 ||
                sibling.className.indexOf('ThankPage') != -1)
                return false;
            }
            return true; 
          },
         revertOnSpill: true,
         removeOnSpill: false,
    }
);

const MainDroppedHandler = (el, target, source, sibling) => {
    
    let QuestionSupLabels = document.querySelectorAll(".sup-label");
    let QuestionSubLabels = document.querySelectorAll(".sub-label");
    let nestedLabels = document.querySelectorAll(".Question-Nested .QuestionLabel")
    var QuestionNumbers = [];
    QuestionSupLabels.forEach((QuestionLabel,index) => {
        QuestionNumbers.push(parseInt(QuestionLabel.firstChild.textContent))    
    })
        QuestionNumbers.pop();
     
    QuestionNumbers.sort((a,b) => a - b);        
    
    QuestionSupLabels.forEach((item,index) => {
            QuestionSupLabels[index].textContent =  QuestionNumbers[index]
    })
    QuestionSubLabels.forEach((QuestionSubLabel,index) => {
            let subLabelFirstNumber = QuestionSubLabel.textContent.toString().split('-')[0] = nestedLabels[0].textContent;
            let subLabelSecondNumber = QuestionSubLabel.textContent.toString().split('-')[1];

            QuestionSubLabel.textContent = subLabelFirstNumber + '-' + subLabelSecondNumber;
    })
}
mainDrake.on('drop',MainDroppedHandler)


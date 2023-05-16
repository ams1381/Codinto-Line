
const AssistiveItems = document.querySelector(".AssistiveButton .AssistiveItems");
const AssistiveToggleButton = document.querySelector(".AssistiveToggleButton");
const AssistiveToggleButtonIcon = document.querySelector(".AssistiveToggleButton i");
const DesTextInputToggle = document.querySelector('.GDesc .Switch-Container .Switch-toggle input');
const Switch_toggle_input = document.querySelectorAll('.Switch-Container .Switch-toggle input');

const TextEditorContainers = document.querySelectorAll('.GOptions')

// TextEditorContainers.forEach((TextEditorContainer,index) => {
//     const  TextEditorLabels = TextEditorContainer.children;

//     Array.from(TextEditorLabels).forEach((TextEditorLabel) => {
//         TextEditorLabel.addEventListener('click',() => {
//             console.log('test')
//         })
//     //     const TextEditorInput = TextEditorLabel.firstChild;
//     //     const TextEditorIcon = TextEditorLabel.lastChild;

//     //     console.log(TextEditorIcon)
//     //     TextEditorIcon.addEventListener('click',() => {
//     //  //       if(TextEditorIcon.previousSibling.checked)
//     //             console.log('ams')
//     //     })
//     })    
// })

const AssistiveItemsHandler = () => {
    AssistiveItems.classList.toggle('active');

    AssistiveToggleButtonIcon.classList.toggle('active');
}
AssistiveToggleButton.addEventListener('click', AssistiveItemsHandler);

if (Switch_toggle_input)
    Switch_toggle_input.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (item.checked)
                item.parentElement.parentElement.parentElement.nextElementSibling.classList.add('active')
            else
                item.parentElement.parentElement.parentElement.nextElementSibling.classList.remove('active')

        })
    })







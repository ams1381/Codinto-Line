
const AssistiveItems = document.querySelector(".AssistiveButton .AssistiveItems");
const AssistiveToggleButton = document.querySelector(".AssistiveToggleButton");
const AssistiveToggleButtonIcon = document.querySelector(".AssistiveToggleButton i");
const DesTextInputToggle = document.querySelector('.GDesc .Switch-Container .Switch-toggle input');
const Switch_toggle_input = document.querySelectorAll('.Switch-Container .Switch-toggle input');
const TextEditorContainers = document.querySelectorAll('.GOptions');

const AssistiveItemsHandler = () => {
    AssistiveItems.classList.toggle('active');

    AssistiveToggleButtonIcon.classList.toggle('active');
}
<<<<<<< HEAD
AssistiveToggleButton.addEventListener('click', AssistiveItemsHandler);



// if(Switch_toggle_input) {
//
// if (Switch_toggle_input)
//
//     Switch_toggle_input.forEach((item, index) => {
//         item.addEventListener('click', () => {
//             if (item.checked)
//                 item.parentElement.parentElement.parentElement.nextElementSibling.classList.add('active')
//             else
//                 item.parentElement.parentElement.parentElement.nextElementSibling.classList.remove('active')
//
//
//
//
//         })
//     })
// }
//
=======
AssistiveToggleButton.addEventListener('click', AssistiveItemsHandler);
>>>>>>> 71597a747cd77bb5e015e49f78c1a94968348ee5


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
AssistiveToggleButton.addEventListener('click', AssistiveItemsHandler);
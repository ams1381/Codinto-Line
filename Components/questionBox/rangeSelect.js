const rangeSelect = document.querySelector('.range__select');
rangeSelect.addEventListener('click', (e) => {
    // console.log(e.target.classList.value);
    if (e.target.classList.value === 'range__number') {
        e.target.classList.add('range__active');
    }else if(e.target.classList.contains('range__active')){
        e.target.classList.remove('range__active');
    }
});
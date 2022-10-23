'use-strict';

const cols = document.querySelectorAll('.col');
document.addEventListener('keydown', e => {
    e.preventDefault();
    if (e.code.toLowerCase() == 'space') {
        setRandomColors();
    }
});// смена цветов при нажатии на пробел

document.addEventListener('click', e => {
    const type = e.target.dataset.type;

    if (type == 'lock') {
       const node = e.target.tagName.toLowerCase() == 'i' ? e.target : e.target.children[0];
       node.classList.toggle('fa-lock-open');
       node.classList.toggle('fa-lock'); 
    } 
    else if (type == 'copy') {
        copyToClick(e.target.textContent);
    }
});// переключение замочка в состояние открыт/закрыт при нажатии

function randomColorGenerator() {
    const hexCodes = '0123456789ABCDF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return '#' + color;
}// генерация случайного цвета

function setRandomColors(isInitial) {
    const colors = isInitial ? getHashColors() : [];
    cols.forEach((col,i) => {

        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        const color = isInitial 
                        ? colors[i] 
                            ? colors[i] 
                                : randomColorGenerator() 
                            : randomColorGenerator();

        if (isLocked) {
            colors.push(text.textContent);
            return;
        }
        if (!isInitial) {
            colors.push(color);
        }
        

        text.textContent = color;
        col.style.background = color;
        
        setTextColor(text, color);
        setTextColor(button, color);
});
updateHash(colors);
}// отображение цветов на сайт

function copyToClick(text) {
    return navigator.clipboard.writeText(text);
}// копирование кода цвета при нажатии на него

function setTextColor(text, color) {
   const luminance = chroma(color).luminance();
   text.style.color = luminance > 0.5 ? 'black' : 'white';
}// смена цвета замка и текста, если их плохо видно

function updateHash(colors= []) {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1);}).join('-');
}// заполнение хеша(адресной строки) кодами сгенерированных цветов

function getHashColors() {
     
    if (document.location.hash.length > 1) {        
        return document.location.hash.substring(1).split('-').map(color => '#' + color);
    }
    return [];
}// получение цветов из хеша, для отображения цветов на сайте, если сайт был открыт по ссылке


setRandomColors(true);
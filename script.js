const container = document.getElementById('container');
const body = document.querySelector('body');
const colorButtons = document.querySelectorAll('.colorButtons');
const clear = document.getElementById('clrBtn');
const gridTgl = document.getElementById('gridTgl');
const buttons = document.querySelectorAll('button');
let color = "black";

makeRows(32, 32);
const cell = document.querySelectorAll('.cell');

function makeRows(rows, cols) {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
    }
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (i = 0; i < (rows * cols); i++) {
        let cell = document.createElement('div');
        cell.style.backgroundColor = '#fff';
        cell.addEventListener('mouseover', colorSwitch);
        container.appendChild(cell).className = "cell";
    }
}

function rand(min, max) {
    return min + Math.random() * (max - min);
}
function randomColors() {
    let h = rand(1, 360);
    let s = rand(0, 100);
    let l = rand(0, 100);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

function colorSwitch() {
    let randomColor;
    switch (color) {
        case 'rainbow':
            this.style.backgroundColor = 'hsl(0,0,0)';
            this.style.backgroundColor = randomColors();
        break;
        case 'black':
            this.style.backgroundColor = '#000';
        break;
        case 'eraser':
            this.style.backgroundColor = '#fff';
        break;
        case 'darken':
            if (this.style.backgroundColor == '#fff' || this.style.backgroundColor == 'rgb(255, 255, 255)') {
                this.style.backgroundColor = "rgba(0,0,0,0)";
            }
            let arr = this.style.backgroundColor.slice(5, -1);
            arr = arr.split(',').map(function(item) {
                return Number(item);
            }); 
            arr[3] += 0.2;
            (arr[3] > 1) ? arr[3] = "0" : false;
            this.style.backgroundColor = `rgba(0,0,0,${arr[3]})`;
        break;
    }

}

function changeColor (e) {
    switch (e.target.dataset.color) {
        case 'rainbow':
            color = 'rainbow';
        break;
        case 'black':
            color = 'black';
        break;
        case 'eraser':
            color = 'eraser';
        break;
        case 'darken':
            color = 'darken';
        break;
    } 
}

function redrawBoard() {
    let rows = 0;
    let cols = 0;
    for (i = 0; i < cell.length; i++) {
        cell[i].style.backgroundColor = 'white';
    }
    rows = prompt("How many squares on each side?");

    while (isNaN(rows) || rows < 2 || rows > 100 ) {
        rows = prompt("Please enter a number between 2 and 100");
    }
    cols = rows;
    makeRows(rows, cols);
}

function toggleGrid()  {
    for (i = 0; i < cell.length; i++) {
        if (cell[i].style.border == "0px") {
            cell[i].style.border = '1px solid #000';
        } else {
            cell[i].style.border = '0px';
        }
    }
}
buttons.forEach(buttons => buttons.className ="buttons");
clear.addEventListener('click', redrawBoard);
gridTgl.addEventListener('click', toggleGrid);
colorButtons.forEach(colorButtons => colorButtons.addEventListener('click', changeColor));
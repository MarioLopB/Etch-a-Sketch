const select_btn = document.getElementById('selectbtn');
const container = document.getElementById('container');
const grid_size = document.getElementById('grid_size');
const background_color = document.getElementById('grid_color');
const pen_color = document.getElementById('pen_color');
const grid_lines_btn = document.getElementById('grid_lines_btn');
const clear_btn = document.getElementById('clear_btn');
const rainbow_btn = document.getElementById('rainbow_btn');

let isClicked = false;
let isLinesPulsed = false;
let isRainbowPulsed = false;

function createGrid() {
    console.log(typeof grid_size.value);

    console.log(parseInt(grid_size.value));

    if (!isNaN(parseInt(grid_size.value))) {

        container.style.setProperty('--grid-rows', grid_size.value);
        container.style.setProperty('--grid-cols', grid_size.value);
        for (let i = 0; i < (grid_size.value * grid_size.value); i++) {
            let cell = document.createElement('div');
            container.appendChild(cell);
            cell.classList.add('grid-item');
            console.log("div created");
        }
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach((gridItem) => {
            console.log(background_color.value);
            if(isLinesPulsed){
                gridItem.style.border = "1px solid #ddd";
            } else {
                gridItem.style.border = "none";
            }

            gridItem.style.backgroundColor = background_color.value;
            gridItem.addEventListener('mouseover', () => {
                if (isClicked) {
                    if (isRainbowPulsed) {
                        gridItem.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    } else {
                        gridItem.style.backgroundColor = pen_color.value;
                    }
                }
            });
        });
    } else {
        alert("Please enter a number");
    }

}

function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((gridItem) => {
        container.removeChild(gridItem);
    });
}

document.addEventListener('mousedown', (e) => {
    isClicked = true;
});

document.addEventListener('mouseup', (e) => {
    isClicked = false;
});

grid_size.addEventListener('input', (e) => {
    if (isClicked) {
        clearGrid();
        createGrid();
    }
});

grid_lines_btn.addEventListener('click', (e) => {
    const gridItems = document.querySelectorAll('.grid-item');
    if (!isLinesPulsed) {
        gridItems.forEach((gridItem) => {
            gridItem.style.border = "1px solid #ddd";
        });
        grid_lines_btn.style.cssText = "background-color: #4CAF50; color: white;";
        isLinesPulsed = true;
    } else {
        gridItems.forEach((gridItem) => {
            gridItem.style.border = "none";
        });
        grid_lines_btn.style.cssText = "background-color: 7f99de;";
        isLinesPulsed = false;
    }

});

clear_btn.addEventListener('click', (e) => {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((gridItem) => {
        gridItem.style.backgroundColor = background_color.value;
    });
});

rainbow_btn.addEventListener('click', (e) => {
    const gridItems = document.querySelectorAll('.grid-item');
    if (!isRainbowPulsed) {
        rainbow_btn.style.cssText = "background-color: #4CAF50; color: white;";
        isRainbowPulsed = true;
    } else {
        rainbow_btn.style.cssText = "background-color: 7f99de;";
        isRainbowPulsed = false;
    }

});
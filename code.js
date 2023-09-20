// Author: Mario López Barazón

// DOM Elements
const select_btn = document.getElementById('selectbtn');
const container = document.getElementById('container');
const grid_size = document.getElementById('grid_size');
const background_color = document.getElementById('grid_color');
const pen_color = document.getElementById('pen_color');
const grid_lines_btn = document.getElementById('grid_lines_btn');
const clear_btn = document.getElementById('clear_btn');
const rainbow_btn = document.getElementById('rainbow_btn');
const eraser_btn = document.getElementById('eraser_btn');
const size_label = document.getElementById('size_label');

// Variables
let isClicked = false;
let isLinesPulsed = false;
let isRainbowPulsed = false;
let isEraserPulsed = false;

// Functions
// Function to paint the grid
function paintGrid(gridItem) {
    if (isRainbowPulsed) {
        gridItem.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    } else if (isEraserPulsed) {
        gridItem.style.backgroundColor = background_color.value;
    } else {
        gridItem.style.backgroundColor = pen_color.value;
    }
}

// Function to clear the background
function clearBackground() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((gridItem) => {
        gridItem.style.backgroundColor = background_color.value;
    });
}

// Function to set the grid lines
function setGridLines() {
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

}

// Function to set the rainbow mode
function setRainbowMode() {
    if (!isRainbowPulsed) {
        if (isEraserPulsed) {
            eraser_btn.style.cssText = "background-color: 7f99de;";
            isEraserPulsed = false;
        }
        rainbow_btn.style.cssText = "background-color: #4CAF50; color: white;";
        isRainbowPulsed = true;
    } else {
        rainbow_btn.style.cssText = "background-color: 7f99de;";
        isRainbowPulsed = false;
    }
}

function setEraserMode() {
    if (!isEraserPulsed) {
        if (isRainbowPulsed) {
            rainbow_btn.style.cssText = "background-color: 7f99de;";
            isRainbowPulsed = false;
        }
        eraser_btn.style.cssText = "background-color: #4CAF50; color: white;";
        isEraserPulsed = true;
    } else {
        eraser_btn.style.cssText = "background-color: 7f99de;";
        isEraserPulsed = false;
    }
}

// Function to create the grid
function createGrid() {

    // Set the grid size
    container.style.setProperty('--grid-rows', grid_size.value);
    container.style.setProperty('--grid-cols', grid_size.value);

    // Create the grid
    for (let i = 0; i < (grid_size.value * grid_size.value); i++) {
        let cell = document.createElement('div');
        container.appendChild(cell);
        cell.classList.add('grid-item');
        console.log("div created");
    }

    // Give the grid lines at the start
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((gridItem) => {
        if (isLinesPulsed) {
            gridItem.style.border = "1px solid #ddd";
        } else {
            gridItem.style.border = "none";
        }

        // Set the background color
        gridItem.style.backgroundColor = background_color.value;

        // Add the event listeners
        // Event listener to paint the grid when the mouse is over
        gridItem.addEventListener('mouseover', () => {
            if (isClicked) {
                paintGrid(gridItem);
            }
        });

        // Event listener to paint the grid when the mouse is clicked
        gridItem.addEventListener('mousedown', () => {
            paintGrid(gridItem);
        });
    });

}

// Function to clear the grid
function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((gridItem) => {
        container.removeChild(gridItem);
    });
}

// Function to change the text of the label
function changeText() {
    size_label.textContent = grid_size.value + "x" + grid_size.value;
}

// Event Listeners
// Event listener to monitor the mouse click down
document.addEventListener('mousedown', (e) => {
    isClicked = true;
});

// Event listener to monitor the mouse click up
document.addEventListener('mouseup', (e) => {
    isClicked = false;
});

// Event listener to create a new grid
grid_size.addEventListener('mouseup', (e) => {
    clearGrid();
    createGrid();
});

// Event listener to change the text of the label
grid_size.addEventListener('input', (e) => {
    changeText();
});

// Event listener to put the grid lines
grid_lines_btn.addEventListener('click', (e) => {
    setGridLines();
});

// Event listener to clear the grid
clear_btn.addEventListener('click', (e) => {
    clearBackground();
});

// Event listener to set the rainbow mode
rainbow_btn.addEventListener('click', (e) => {
    setRainbowMode();
});

// Event listener to set the eraser mode
eraser_btn.addEventListener('click', (e) => {
    setEraserMode();
});

// Create the grid at the start
createGrid();
// Change the text of the label at the start
changeText();
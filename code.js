const select_btn = document.getElementById('selectbtn');
const container = document.getElementById('container');
const grid_size = document.getElementById('grid-size');
const pen_color = document.getElementById('pen_color');
let isClicked = false;

document.addEventListener('mousedown', (e) => {
    isClicked = true;
});

document.addEventListener('mouseup', (e) => {
    isClicked = false;
});

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
            gridItem.addEventListener('mouseover', () => {
                if (isClicked) {
                    gridItem.style.backgroundColor = pen_color.value;
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

grid_size.addEventListener('input', (e) => {
    if (isClicked) {
        clearGrid();
        createGrid();
    }
});
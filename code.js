const selectBtn = document.getElementById('selectbtn');
const container = document.getElementById('container');
const grid_size = document.getElementById('grid-size');

function createGrid(grid_size) {
    console.log(grid_size);
    container.style.setProperty('--grid-rows', grid_size);
    container.style.setProperty('--grid-cols', grid_size);
    for (let i = 0; i < (grid_size * grid_size); i++) {
        let cell = document.createElement('div');
        container.appendChild(cell);
        cell.classList.add('grid-item');
        console.log("div created");
    }
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((gridItem) => {
        gridItem.addEventListener('mouseover', (e) => {
            gridItem.style.backgroundColor = 'black';
        });
    });
}

function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((gridItem) => {
        container.removeChild(gridItem);
    });
}

selectBtn.addEventListener('click', (e) => {
    clearGrid();
    createGrid(grid_size.value);
});
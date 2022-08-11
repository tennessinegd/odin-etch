// get etch container to create grid
const etch = document.querySelector(".etch-container");

function createGrid(container, size) {
    // wipe etch container
    while(container.firstElementChild) {
        container.removeChild(container.firstElementChild);
    }

    // set a max size of 100 for the grid
    size = (size > 100) ? 100 : size;

    // create rows and pixels
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < size; j++) {
            let pixel = document.createElement("div");
            pixel.classList.add("pixel");
            row.appendChild(pixel);
        }
        container.appendChild(row);
    }

    // add event listeners to pixels
    const pixels = document.querySelectorAll(".pixel");
    for (let pixel of pixels) {
        pixel.addEventListener("mouseenter", (e) => {
            e.target.classList.add("painted");
            })
    }
}

// create initial grid
createGrid(etch, 16);

function createCustomGrid() {
    const size = prompt("How big should the new grid be? (max: 100)", "16");
    createGrid(etch, size);
}
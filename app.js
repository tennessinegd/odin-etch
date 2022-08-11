const etch = document.querySelector(".etch-container");

function createGrid(container, size) {
    while(container.firstElementChild) {
        container.removeChild(container.firstElementChild);
    }

    size = (size > 100) ? 100 : size;
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < size; j++) {
            let pixel = document.createElement("div");
            pixel.classList.add("pixel");
            row.appendChild(pixel);
        }
        container.appendChild(row);
        
        const pixels = document.querySelectorAll(".pixel");
        for (let pixel of pixels) {
            pixel.addEventListener("mouseenter", (e) => {
                e.target.classList.add("painted");
            })
        }
    }
}

createGrid(etch, 16);

function createCustomGrid() {
    const size = prompt("How large should the new grid be? (max: 100)", "16");
    createGrid(etch, size);
}
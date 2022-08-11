const etch = document.querySelector(".etch-container");

function createGrid(container, size) {
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
    }
}

createGrid(etch, 16);

const pixels = document.querySelectorAll(".pixel");
for (let pixel of pixels) {
    pixel.addEventListener("mouseenter", (e) => {
        e.target.classList.add("painted");
    })
}

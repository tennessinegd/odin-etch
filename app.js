const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = "#06080b";
const shadeList = ["#ffffff", "#e6e6e6", "#cccccc", "#b3b3b3", "#999999", "#808080", "#666666", "#4d4d4d", "#333333", "#1a1a1a", "#000000"]

let mode = "default";

// magic rgb to hex converter i found on StackOverflow
const rgbToHex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

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
            const pixelStyle = e.target.style;
            switch (mode) {
                case "default":
                    pixelStyle.backgroundColor = DEFAULT_COLOR;
                    break;
                case "color":
                    // replace each instance of 0 with a random hex digit
                    // the double tilde (~~) is used to floor the number faster
                    pixelStyle.backgroundColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
                    break;
                case "shade":
                    // get the index of the current number
                    /* for some reason the background-color turns into an rgb
                       value as soon as you apply it so we'll have to turn it
                       back into a hex code with some magic */
                    let shadeIndex = 0;
                    if (pixelStyle.backgroundColor) {
                        shadeIndex = shadeList.indexOf(rgbToHex(pixelStyle.backgroundColor));
                    }
                    // increment the index to get the next color
                    // reset to black if too high
                    if (++shadeIndex >= 11) shadeIndex = 10;
                    pixelStyle.backgroundColor = shadeList[shadeIndex];
            }
        })
    }
}

function wipeGrid() {
    const pixels = document.querySelectorAll(".pixel");
    for (let pixel of pixels) {
        pixel.removeAttribute("style");
    }
}

// create initial grid
createGrid(etch, DEFAULT_GRID_SIZE);

function createCustomGrid() {
    const size = prompt("How big should the new grid be? (max: 100)", DEFAULT_GRID_SIZE);
    size ? size : DEFAULT_GRID_SIZE;
    createGrid(etch, size);
}

const buttons = document.querySelectorAll(".options>button");
for (let button of buttons) {
    button.addEventListener("click", () => {
        wipeGrid();
        mode = button.id;
    });
}
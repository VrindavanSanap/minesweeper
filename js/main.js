let grid;
let cols;
let rows;
let resolution = 40;
let mouse_col;
let mouse_row;
let last_clicked_row;
let last_clicked_col;

let is_running = true;

let gameover_dom; 
let reset_btn;

function setup() {
    createCanvas(500, 500);
    frameRate(30);
    cols = Math.floor(width / resolution);
    rows = Math.floor(height / resolution);
    console.log(cols, rows)
    grid = new Grid(rows, cols);
    nj.config.printThreshold = 100;
    reset_btn = document.getElementById("reset_btn")
    gameover_dom = document.querySelector(".gameover");
    reset_btn.addEventListener('click', function () {
        grid.reset();
        gameover_dom.style.display = "none";
    });
}
function keyPressed() {

    if (key === "r") {
        grid.reset();
        console.clear()

    }
}


function draw() {
    background(0);
    mouse_col = Math.floor(mouseX / resolution);
    mouse_row = Math.floor(mouseY / resolution);

    grid.display(resolution);
    if (mouse_row < rows && mouse_col < cols) {
        grid.highlight(mouse_row, mouse_col, resolution);
    }

    if (mouseIsPressed & grid.is_running) {
        if (!(last_clicked_col === mouse_col && last_clicked_row === mouse_row)) {
            grid.flip(mouse_row, mouse_col);
            if (grid.is_running == false) {
                gameover_dom.style.display = "block";
            }
            last_clicked_col = mouse_col;
            last_clicked_row = mouse_row;
        }
    }
}

function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
}
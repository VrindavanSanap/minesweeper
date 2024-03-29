let grid;
let cols;
let rows;
let resolution = 25;
let mouse_col;
let mouse_row;
let last_clicked_row;
let last_clicked_col;

let is_running = true;

let gameover_dom;
let reset_btn;
let flag_btn;
let flag_mode;
function setup() {
    createCanvas(400, 400);
    frameRate(30);
    cols = Math.floor(width / resolution);
    rows = Math.floor(height / resolution);
    grid = new Grid(rows, cols);
    flag_mode = false;
    nj.config.printThreshold = 100;

    reset_btn = document.getElementById("reset_btn")
    flag_btn = document.getElementById("flag_btn")
    gameover_dom = document.querySelector(".gameover");
    reset_btn.addEventListener('click', function () {
        grid.reset();
        gameover_dom.style.display = "none";
    });
    flag_btn.addEventListener('click', function () {
        flag_mode = !flag_mode;
        if (flag_mode) {
            flag_btn.innerText = "Flag mode 🚩: ON"

        } else {
            flag_btn.innerText = "Flag mode 🚩: OFF"
        }

    });


}
function keyPressed() {

    if (key === "r") {
        grid.reset();
        console.clear()

    }
}

function mouseClicked() {
    if (mouseButton === RIGHT) {
        grid.set_flag(mouse_row, mouse_col)
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
            if (!(flag_mode)) {
                grid.flip(mouse_row, mouse_col);
                if (grid.is_running == false) {
                    gameover_dom.style.display = "block";
                } else {
                    grid.flood_fill(mouse_row, mouse_col)
                }

            } else {
                grid.set_flag(mouse_row, mouse_col)
            }
            last_clicked_col = mouse_col;
            last_clicked_row = mouse_row;
        }
    }
}

function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
}
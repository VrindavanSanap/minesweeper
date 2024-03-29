class Grid {
    constructor(rows, cols) {
        this.cols = cols;
        this.rows = rows;
        this.n_mines = 40;
        this.grid = nj.zeros([rows, cols]);
        this.visible = nj.zeros([rows, cols]);
        this.flags = nj.zeros([rows, cols]);
        let set_mines = 0
        this.is_running = true
        while (set_mines != this.n_mines) {
            let i = Math.floor(Math.random() * rows)
            let j = Math.floor(Math.random() * cols)
            if (this.grid.get(i, j) != 1) {
                this.grid.set(i, j, 1)
                set_mines += 1
            }
        }
        this.n_neibours = get_n_neibours(this.grid);
        nj.config.printThreshold = 100;
    }

    display(resolution) {
        fill(255);
        let half_res = resolution / 2
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let x = j * resolution;
                let y = i * resolution;
                stroke(0)
                strokeWeight(.7)
                if (this.visible.get(i, j) == 1) {
                    fill(255)
                    rect(x, y, resolution, resolution);
                    fill(0)
                    text(this.n_neibours.get(i, j), x + half_res, y + half_res)
                    if (this.grid.get(i, j) == 1) {
                        fill(0)
                        circle(x + half_res, y + half_res, resolution * 0.6);
                    }
                } else if (this.flags.get(i, j) == 1) {
                        fill(255, 0, 0, 100);
                        rect(x, y, resolution, resolution);
                        fill(0);
                        // textSize(20);
                        text("🚩", x + half_res, y + half_res);

                } else {
                    fill(0, 0, 0)
                    stroke(255)
                    rect(x, y, resolution, resolution);

                }
            }
        }
    }

    highlight(row, col, resolution) {
        let x = col * resolution;
        let y = row * resolution;
        fill(0, 0, 0, 0);
        stroke(255, 0, 0);
        strokeWeight(2)
        rect(x, y, resolution, resolution);
    }
    flood_fill(row, col) {
        this.flags.set(row, col, 0);
        let dx_dy = [[0, -1], [0, 1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
        for (let i = 0; i < 8; i++) {
            let row_ = row + dx_dy[i][0]
            let col_ = col + dx_dy[i][1]
            if (this.rows > row_ && row_ > -1 && this.cols > col_ && col_ > -1) {
                if (this.grid.get(row_, col_) == 0 && this.visible.get(row_, col_) == false) {
                    this.flip(row_, col_)
                    if (this.n_neibours.get(row_, col_) == 0) {
                        this.flood_fill(row_, col_)
                    }
                }
            }
        }
    }
    flip(row, col) {
        if (this.visible.get(row, col) === 0) {
            this.visible.set(row, col, 1);
        }
        if (this.grid.get(row, col) == 1) {
            this.is_running = false;
            return
        }
        this.is_running = true;
    }
    set_flag(row, col) {
        if (this.visible.get(row, col) == 0) {
            this.flags.set(row, col, !this.flags.get(row,col));
        } else {
            // this.visible.set(row, col, 0);
        }
    }
    reset() {
        this.grid = nj.zeros([rows, cols]);
        this.visible = nj.zeros([rows, cols]);
        this.flags =nj.zeros([rows, cols]);

        let set_mines = 0
        this.is_running = true
        while (set_mines != this.n_mines) {
            let i = Math.floor(Math.random() * rows)
            let j = Math.floor(Math.random() * cols)
            if (this.grid.get(i, j) != 1) {
                this.grid.set(i, j, 1)
                set_mines += 1
            }
        }
        this.n_neibours = get_n_neibours(this.grid);
    }
}
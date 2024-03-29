class Grid {
    constructor(rows, cols) {
        this.cols = cols;
        this.rows = rows;
        this.n_mines = 50
        this.grid = nj.zeros([rows, cols]);
        this.visible = nj.zeros([rows, cols]);
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
                if (this.visible.get(i, j)) {
                    fill(255)
                    rect(x, y, resolution, resolution);
                    fill(0)
                    text(this.n_neibours.get(i, j), x + half_res, y + half_res)
                    if (this.grid.get(i, j)) {
                        fill(0)
                        circle(x + half_res, y + half_res, resolution * 0.8);
                    }
                }
            }
        }
    }

    highlight(row, col, resolution) {
        let x = col * resolution;
        let y = row * resolution;
        fill(0, 0, 0, 0);
        stroke(255);
        rect(x, y, resolution, resolution);
    }

    step() {

    }

    flip(row, col) {

        if (this.visible.get(row, col) === 1) {
            this.visible.set(row, col, 0);

        } else if (this.visible.get(row, col) === 0) {
            this.visible.set(row, col, 1);
        }
        if (this.grid.get(row, col) == 1) {
            this.is_running = false;
            return
        }
        this.is_running = true;
    }
    reset() {
        this.grid = nj.zeros([rows, cols]);
        this.visible = nj.zeros([rows, cols]);
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
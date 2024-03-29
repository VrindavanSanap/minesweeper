function conv2d(input, kernel) {
    let ix = input.shape[0];
    let iy = input.shape[1];
    let kx = kernel.shape[0];
    let ky = kernel.shape[1];
    let padded_input = nj.zeros([ix + (kx - 1) * 2, iy + (ky - 1) * 2]);

    // Padding input
    padded_input.slice([kx - 1, kx - 1 + ix], [ky - 1, ky - 1 + iy]).assign(input, false)
    let out = nj.convolve(padded_input, kernel);

    return out;
}
function get_n_neibours(grid) {
    let kernel = nj.ones([3, 3]);
    let conv_prod = conv2d(grid, kernel).slice([1, -1], [1, -1]);
    let n_neibours = conv_prod.subtract(grid);
    return n_neibours
}


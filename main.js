//Class Board-----------------------

class Board {

    //Constructor:

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.gameOver = false;
        this.bars = [];
        this.ball = null;
    }
}


Board.prototype = {
    get elements() {
        let elements = this.bars;
        elements.push(ball);
        return elements;
    }
}

//-----------------------------------

//Class Boradview--------------------

class BoardView {

    //Constructor:

    constructor(canvas, board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

}

//-----------------------------------

window.addEventListener("Load", main());

//Funcion Principal:

function main() {
    let board = new Board(800, 400);
    let canvas = document.getElementById('canvas');
    let boardView = new BoardView(canvas, board);

}
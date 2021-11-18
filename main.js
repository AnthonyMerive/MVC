//Borard:

(function () {

    self.Board = function (width, height) {

        this.width = width;
        this.height = height;
        this.playing = false;
        this.gameOver = false;
        this.bars = [];
        this.ball = null;

    }

    self.Board.prototype = {

        get elements() {
            let elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }

})();

//Bar:

(function () {

    self.Bar = function (x, y, width, height, board) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;

    }

    self.Bar.prototype = {

        down: function () {
            this.y += this.speed;
        },

        up: function () {
            this.y -= this.speed;
        },
        toString: function () {
            return "x: " + this.x + " y: " + this.y;
        }
    }

})();

//BoardView:

(function () {

    self.BoardView = function (canvas, board) {

        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");

    }

    self.BoardView.prototype = {
        draw: function () {

            for (let i = this.board.elements.length - 1; i >= 0; i--) {

                let el = this.board.elements[i];

                draw(this.ctx, el);
            };
        }
    }

    function draw(ctx, element) {
        if (element !== null && element.hasOwnProperty("kind")) {

            switch (element.kind) {
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
            }

        }

    }

})();

let board = new Board(800, 400);
var bar = new Bar(20, 100, 40, 100, board);
var bar = new Bar(740, 100, 40, 100, board);
let canvas = document.getElementById('canvas');
let boardView = new BoardView(canvas, board);


document.addEventListener("keydown", function (e) {

    e.keyCode == 38 ? bar.up() : e.keyCode == 40 && bar.down();

    console.log(bar.toString())
})

boardView.draw();



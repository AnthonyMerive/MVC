//Borard:

(function () {

    self.Board = function (width, height) {

        this.width = width;
        this.height = height;
        this.playing = false;
        this.gameOver = false;
        this.bars = [];
        this.ball = null;
        this.playing = false;
    }

    self.Board.prototype = {

        get elements() {
            let elements = this.bars.map(function (bar) {
                return bar;
            });
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

//Ball:

(function () {

    self.Ball = function (x, y, radius, board) {

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedY = 0;
        this.speedX = 3;
        this.speed = 3;
        this.board = board;
        board.ball = this;
        this.kind = "circle";
        this.direction = 1;
        this.bounceAngle = 0;
        this.maxBounceAngle = Math.PI/2;
    }

    self.Ball.prototype = {

        move: function () {
            this.x += (this.speedX * this.direction);
            this.y += (this.speedY);
        },
        get width(){
			return this.radius * 2;
		},
		get height(){
			return this.radius * 2;
		},
        collision: function (bar) {

            let relative_intersect_y = ( bar.y + (bar.height / 2) ) - this.y;

			let normalized_intersect_y = relative_intersect_y / (bar.height / 2);

			this.bounceAngle = normalized_intersect_y * this.maxBounceAngle;
			console.log(this.bounceAngle);
			this.speedY = this.speed * -Math.sin(this.bounceAngle);
			this.speedX = this.speed * Math.cos(this.bounceAngle);

			if(this.x > (this.board.width / 2)) this.direction = -1;
			else this.direction = 1;
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

        clean: function () {
            this.ctx.clearRect(0, 0, board.width, board.height);
        },
        draw: function () {

            for (let i = this.board.elements.length - 1; i >= 0; i--) {

                let el = this.board.elements[i];

                draw(this.ctx, el);
            };
        },
        checkCollisions: function () {
            for (let j = this.board.bars.length - 1; j >= 0; j--) {
                let bar = this.board.bars[j];
                if (hit(bar, this.board.ball)) {
                    this.board.ball.collision(bar);
                }

            }
        },
        play: function () {
            if (this.board.playing) {
                this.clean();
                this.draw();
                this.checkCollisions();
                this.board.ball.move();
            }
        }

    }

    function hit(a, b) {

        let hit = false;
        //Colsiones horizontales
        if (b.x + b.width >= a.x && b.x < a.x + a.width) {
            //Colisiones verticales
            if (b.y + b.height >= a.y && b.y < a.y + a.height)
                hit = true;
        }
        //Colisión de a con b
        if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
            if (b.y <= a.y && b.y + b.height >= a.y + a.height)
                hit = true;
        }
        //Colisión b con a
        if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
            if (a.y <= b.y && a.y + a.height >= b.y + b.height)
                hit = true;
        }

        return hit;

    }

    function draw(ctx, element) {
        // if (element !== null && element.hasOwnProperty("kind")) {

        switch (element.kind) {
            case "rectangle":

                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;

            case "circle":

                ctx.beginPath();
                ctx.arc(element.x, element.y, element.radius, 0, 7);
                ctx.fill();
                ctx.closePath();
                break;
        }

        // }

    }

})();

let board = new Board(800, 400);
let bar1 = new Bar(20, 100, 40, 100, board);
let bar2 = new Bar(740, 100, 40, 100, board);
let ball = new Ball(350, 100, 10, board);
let canvas = document.getElementById('canvas');
let boardView = new BoardView(canvas, board);

//Eventos de teclado:

document.addEventListener("keydown", function (e) {

    //Barra derecha:
    e.keyCode == 38 ? bar2.up()
        : e.keyCode == 40 ? bar2.down()
            //Barra izquierda:
            : e.keyCode == 87 ? bar1.up()
                : e.keyCode == 83 ? bar1.down()
                    //Barra espaciadora:
                    : e.keyCode == 32 && (board.playing = !board.playing)

})

boardView.draw();

window.requestAnimationFrame(controller);
// setTimeout(function () {
//     ball.direction = -1;
// }, 2000)

function controller() {
    boardView.play();
    window.requestAnimationFrame(controller);
}




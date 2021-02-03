var gamePiece;
var obstacles = [];
function startGame() {
    myGameArea.start();
    gamePiece = new component(30, 30, "red", 400, 300);
}
                

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
    this.canvas.width = 700;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateCanvas, 20);
    window.addEventListener('keydown', function (e) {
        myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
        myGameArea.key = false
    })
    // window.addEventListener("touchmove", function (t) {
    //     myGameArea.x = e.touches[0].screenX;
    //     myGameArea.y = e.touches[0].screenY;
    // })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function everyinterval(e) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
        return false;
    }

function component(width, height, color, x, y) {
    this.gameArea = myGameArea
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
                
function updateCanvas() {
    var x, y;
    for (i = 0; i < obstacles.length; i += 1) {
        if (gamePiece.crashWith(obstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 200
        obstacles.push(new component(10, 200, "green", x, y));
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1;
        obstacles[i].update();
    }
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key === 38) {gamePiece.speedY = -1; };
    gamePiece.newPos();
    // if (myGameArea.x && myGameArea.y) {
    //     GamePiece.x = myGameArea.x;
    //     GamePiece.y = myGameArea.y;
    // }
    gamePiece.update();
    }
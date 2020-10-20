var gameConfig = {
    width: 500,
    height: 400,
    rows: 3,
    cols: 3,
    imgurl: "img/1.jpg",
    dom: document.getElementById("game"),
    isOver:false
}
// 每一个小块的宽高
gameConfig.pieceWidth = gameConfig.width / gameConfig.cols;
gameConfig.pieceHeight = gameConfig.height / gameConfig.rows;
//小块的数量
gameConfig.pleceNumber = gameConfig.rows * gameConfig.cols;
console.log(gameConfig)
var blocks = [];
function isEqual(n1, n2) {
    return parseInt(n1) == parseInt(n2)
}
function Block(left, top, isVisible) {
    this.left = left;
    this.top = top;
    this.isVisible = isVisible;
    this.correctLeft = this.left;
    this.correctTop = this.top;
    this.dom = document.createElement('div');
    this.dom.style.width = gameConfig.pieceWidth + "px";
    this.dom.style.height = gameConfig.pieceHeight + "px";
    this.dom.style.background = `url("${gameConfig.imgurl}") -${this.correctLeft}px -${this.correctTop}px`
    this.dom.style.borderBox = "border-box";
    this.dom.style.border = "1px solid #fff";
    this.dom.style.position = "absolute"
    this.dom.style.cursor = "pointer"
    this.dom.style.transition = ".5s"
    if (!isVisible) {
        this.dom.style.display = "none"
    }
    gameConfig.dom.appendChild(this.dom);
    this.show = function () {
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px"
    }
    this.isCorrect = function () {
        return isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop)
    }
    this.show()
}
function init() {
    //初始化游戏容器
    initGameDom()
    function initGameDom() {
        gameConfig.dom.style.width = gameConfig.width + 'px';
        gameConfig.dom.style.height = gameConfig.height + 'px';
        gameConfig.dom.style.border = "2px solid #ccc"
        gameConfig.dom.style.position = "relative"
    }  
    initBlocksArray()
    //初始化小方块
    function initBlocksArray() {
        for (var i = 0; i < gameConfig.rows; i++) {
            for (var j = 0; j < gameConfig.cols; j++) {
                var isVisible = true;
                if (i == gameConfig.rows - 1 && j == gameConfig.cols - 1) {
                    isVisible = false;
                }
                var b = new Block(j * gameConfig.pieceWidth, i * gameConfig.pieceHeight, isVisible)
                blocks.push(b)
            }
        }
    }
    //随机数
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }
    //交换两个的位置
    function exchange(b1, b2) {
        var temp = b1.left;
        b1.left = b2.left;
        b2.left = temp;
        var temp = b1.top;
        b1.top = b2.top;
        b2.top = temp;
        b1.show()
        b2.show()
    }
    shuffle()
    //数组洗牌
    function shuffle() {
        for (var i = 0; i < blocks.length - 1; i++) {
            var index = getRandom(0, blocks.length - 2);
            exchange(blocks[i], blocks[index])
        }

    }
    //注册点击事件
    regEvent()
    function regEvent() {
        var inVisibleBlock = blocks.find(function (b) {
            return !b.isVisible;
        })
        blocks.forEach(function (b) {
            b.dom.onclick = function () {
                if(gameConfig.isOver){
                    return 
                }
                if (b.top === inVisibleBlock.top &&
                    isEqual(Math.abs(b.left - inVisibleBlock.left), gameConfig.pieceWidth)
                    || b.left === inVisibleBlock.left &&
                    isEqual(Math.abs(b.top - inVisibleBlock.top), gameConfig.pieceHeight)) {
                    exchange(b, inVisibleBlock)
                    isWin()
                }
                // console.log("132")
                exchange(b, inVisibleBlock)
                isWin()
            }
          
        })
    }
    function isWin() {
        var wrongs = blocks.filter(function (item) {
            return !item.isCorrect()
        })
        if (wrongs.length == 0) {
            gameConfig.isOver = true
            blocks.forEach(function (b) {
                b.dom.style.border = "none"
                b.dom.style.display = "block"
            })
        }
    }
}
init()
console.log(blocks)
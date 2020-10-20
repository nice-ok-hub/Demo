var box = document.querySelector('.textCon')

function init() {
    var width = box.offsetWidth;
    var count = parseInt(width / 10)
    for (var i = 0; i < count; i++) {
        var ele = document.createElement('div');
        ele.classList.add('item');
        var size = getRandom(6, 12);
        ele.style.width = size + 'px';
        ele.style.height = size + 'px';

        ele.style.left = getRandom(0, 95) + '%';
        ele.style.top = getRandom(20, 85) + '%';
        box.appendChild(ele)
        ele.style.animationDelay = getRandom(1, 3) + 's'

    }
}
init()

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
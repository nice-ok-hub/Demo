var timer;
var divContainer = document.querySelector('.container')
var colors = ['#f26395', '#62efab', '#ef7658', '#ffe868', '#80e3f7', '#d781f9']
var divCenter = document.querySelector('.center')
var num = 1

function start() {
    if (timer) {
        return
    }
    timer = setInterval(addNumber, 50);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function addNumber() {
    var span = document.createElement('span')
    var color = colors[getRandom(0, colors.length)]
    span.innerText = num

    if (isRight()) {
        span.style.color = color
        span.style.textShadow = ` 0 0 3px ${color}`
        divCenter.innerText = num
        var div = document.createElement('div');
        div.className = 'center';
        div.style.color = color;
        div.innerText = num
        document.body.appendChild(div)
        setTimeout(() => {
            div.style.transform = `translate(${getRandom(-300,300)}px,${getRandom(-300,300)}px)`
            div.style.opacity = '0'
        }, 30);
        div.addEventListener('transitionend',function(){
            div.remove()
        })
    }
    divContainer.appendChild(span)
    num++
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
}

function stop() {
    if (timer) {
        clearInterval(timer)
    }
    timer = null
}

function isRight() {
    return num % 2 == 0
}
document.documentElement.onclick = function () {
    if (timer) {
        stop()
    } else {
        start()
    }
}
start()
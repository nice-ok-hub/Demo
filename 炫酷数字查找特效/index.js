var num = 1;
var timer; //计数器
var divContainer = document.querySelector('.container')
var colors = ['#f26395', '#62efab', '#ef7658', '#ffe868', '#80e3f7', '#d781f9']
var divCenter = document.querySelector('.center')

//开始添加数字
function start() {
    if (timer) {
        return;
    }
    timer = setInterval(addNumber, 55);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function addNumber() {
    var span = document.createElement('span')
    span.innerText = num
    divCenter.innerText = num
    if (isRight()) {
        var color = colors[getRandom(0, colors.length)]
        span.style.color = color;
        span.style.textShadow = ` 0 0 3px ${color}`
        var div = document.createElement('div')
        div.className = 'center';
        div.innerText = num;
        div.style.color = color;
        setTimeout(() => {
            div.style.transform = `translate(${getRandom(-300,300)}px,${getRandom(-300,300)}px)`
            div.style.opacity= '0'
        }, 30);
        document.body.appendChild(div)
        div.addEventListener('transitionend',function(){
            div.remove()
        })
    }
    divContainer.appendChild(span)
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
    num++
}
//判断当前的数字是否满足条件
function isRight() {
    return num % 2 !== 0
}
start()

function stop() {
    if (timer) {
        clearInterval(timer)
        timer = null;
    }
}
document.documentElement.onclick = function () {
    if (timer) {
        stop()
    } else {
        start()
    }
}
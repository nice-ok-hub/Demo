var c1 = document.querySelector('#c1');
var c2 = document.querySelector('#c2');
var c3 = document.querySelector('#c3');
var config = {
    c1: [3, 2, 1],
    c2: [],
    c3: []
}
var minWidth = 50;
var CJ = 30;

function render() {
    var arr1 = config.c1
    var arr2 = config.c2
    var arr3 = config.c3
    allRender(arr1, c1)
    allRender(arr2, c2)
    allRender(arr3, c3)
}

function allRender(arr, demo) {
    demo.innerHTML = ''
    for (var i = 0; i < arr.length; i++) {
        var div = document.createElement('div');
        div.style.width = minWidth + (arr[i] - 1) * CJ + 'px';
        demo.appendChild(div)
    }
}
var btnAll = document.querySelectorAll('button')

render()
for (var i = 0; i < btnAll.length; i++) {
    btnAll[i].onclick = function () {
        var form = this.dataset.form
        var to = this.dataset.to
        pd(form, to)
    }
}

function pd(form, to) {
    var formArr = config[form].length;
    var toArr = config[to].length;
    if (formArr == 0) {
        return
    }
    if (toArr == 0) {
        change(form, to)
    } else {
        var F = config[form][formArr - 1]
        var P = config[to][toArr - 1]
        if (P > F) {
            change(form, to)
        }
    }
}

function change(form, to) {
    config[to].push(config[form].pop())
    render()
    if(config.c1.length == 0 && config.c2.length == 0){
        console.log("你赢了")
    }
}
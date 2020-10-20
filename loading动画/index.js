var per = 0;
var bar = document.querySelector('.bar')
var page = document.querySelector('.page');
var timer = setInterval(function () {
    bar.style.width = per + '%';
    per += 1;
    if (per > 100) {
        clearInterval(timer)
        page.classList.add('hidden')
    }
}, 30)
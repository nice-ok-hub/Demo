// (function () {
//     var sel = document.querySelectorAll('select[data-beauty]')
//     console.log(sel)
//     for (let i = 0; i < sel.length; i++) {
//         var sell = sel[i]
//         befaultifySelect(sell)
//     }
//     //美化单个下拉列表
//     function befaultifySelect(sel) {
//         // sel.style.display = 'none'
//         //隐藏原始下拉列表
//         //生成div元素放在原始的前边
//         var div = document.createElement('div');
//         div.className = 'beauty-select expand'
//         sel.parentNode.insertBefore(div, sel)
//         setContent(div, sel)
//         //真实的下拉列表改变事件
//         sel.onchange = function () {
//             setDivValue(div, sel)
//         }
//         var divBeautyValue = div.querySelector('.beauty-value');
//         divBeautyValue.onclick = function () {
//             if (div.classList.contains('expand')) {
//                 div.classList.remove('expand')
//             } else {
//                 div.classList.add('expand')
//             }
//         }
//         var lis = div.querySelectorAll('.beauty-options li');

//         for (var i = 0; i < lis.length; i++) {
//             var li = lis[i];

//             li.onclick = function () {
//                 sel.value = this.dataset.value
//                 setDivValue(div,sel)
//                 divBeautyValue.click()
//             }
//         }
//     }

//     function setDivValue(div, sel) {
//         var op = getSelectedOption(sel)
//         if (op) {
//             var span = document.querySelector('.beauty-value span')
//             span.innerHTML = op.innerHTML;
//         }
//         var opts = document.querySelectorAll('option');
//         var lis = document.querySelectorAll('.beauty-options li');
//         for (var i = 0; i < opts.length; i++) {
//             op = opts[i];
//             if (op.selected) {
//                 var active = document.querySelector('.active')
//                 if (active) {
//                     active.className = ''
//                 }
//                 lis[i].className = 'active'
//             }
//         }
//     }
//     //参考下拉列表中为div添加内容
//     function setContent(div, sel) {
//         var op = getSelectedOption(sel)
//         var html = `<div class="beauty-value">
//          <span>${op?op.innerHTML:''}</span>
//         <i class="btn">∧</i>
//     </div>`
//         html += `        <ul class="beauty-options">`
//         opts = document.querySelectorAll('option');
//         for (var i = 0; i < opts.length; i++) {

//             op = opts[i];
//             html += `<li data-value = ${op.value} class=${op.selected?'active':''}>${op.innerHTML}</li>`
//         }
//         html += '</ul>'
//         div.innerHTML = html
//     }
//     //得到下拉列表选中的sel
//     function getSelectedOption(sel) {
//         var opts = sel.querySelectorAll('option');
//         for (var i = 0; i < opts.length; i++) {
//             var op = opts[i]
//             if (op.selected) {
//                 return op
//             }
//         }
//     }
// })()
(function () {
    var sels = document.querySelectorAll('select[data-beauty]');
    for (var i = 0; i < sels.length; i++) {
        outerPackage(sels[i])
    }
    //创建外层包裹元素
    function outerPackage(sel) {
        var div = document.createElement('div')
        div.className = 'beauty-select expand'
        sel.parentNode.insertBefore(div, sel)
        //设置内部样式
        interiorStyle(div, sel)
        sel.onchange = function () {
            setDivValue(div, sel)
        }
        var divBeautyValue = div.querySelector('.beauty-value');
        divBeautyValue.onclick = function () {
            if (div.classList.contains('expand')) {
                div.classList.remove('expand')
            } else {
                div.classList.add('expand')
            }
        }
        var lis = document.querySelectorAll('.beauty-options li');
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i]
            li.onclick = function () {
                sel.value = this.dataset.value
                setDivValue(div,sel)
                divBeautyValue.click()
            }
        }
    }

    function setDivValue(div, sel) {
        var op = getStatus(sel)
        var span = document.querySelector('.beauty-value span')
        span.innerHTML = op.innerHTML
        var opts = sel.querySelectorAll('option');
        var li = document.querySelectorAll('.beauty-options li');
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].selected) {
                var active = document.querySelector('.active')
                if (active) {
                    active.className = ''
                }
                li[i].className = 'active'
            }
        }
    }

    function interiorStyle(div, sel) {
        var html = '';
        var opt = getStatus(sel)

        html += `<div class="beauty-value">
        <span>${opt.innerHTML}</span>
        <i class="btn">∧</i>
    </div>`
        html += `<ul class="beauty-options">`
        var opts = sel.querySelectorAll('option')
        for (var i = 0; i < opts.length; i++) {
            html += `<li data-value=${opts[i].value} class=${opts[i].selected?'active':''}>${opts[i].innerHTML}</li>`
        }
        html += '</ul>'
        div.innerHTML = html
    }

    function getStatus(sel) {
        var opts = sel.querySelectorAll('option')
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].selected) {
                return opts[i]
            }
        }
    }
})()
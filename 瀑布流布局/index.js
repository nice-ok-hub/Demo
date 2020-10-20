if (!window.myPlugin) {
    window.myPlugin = {}
}
window.myPlugin.createWaterFall = function (option) {
    var defaulOption = {
        minHGap: 10,
        imgSrcs: [],
        imgWisth: 220,
        container: document.body
    }
    var option = Object.assign({}, defaulOption, option)
    var imgs = [];
    handleParent()
    createImgs()

    //创建图片元素
    function createImgs() {
        for (var i = 0; i < option.imgSrcs.length; i++) {
            var img = document.createElement('img');
            img.src = option.imgSrcs[i];
            img.style.width = option.imgWisth + 'px'
            img.style.position = 'absolute'
            img.style.transition = '.5s'
            imgs.push(img)
            img.onload = function () {
                throttle()
            }
            option.container.appendChild(img)
        }
    }
    //处理父元素,因为图片是绝对定位,父元素必须是一个定位元素  
    function handleParent() {
        var style = getComputedStyle(option.container);
        if (style.position == 'static') {
            option.container.style.position = 'relative'
        }

    }
    //设置每一个图片的坐标
    function setImgPosition() {
        console.log("123")
        var info = getHorizontalInfo()
        var arr = new Array(info.number);
        arr.fill(0);
        imgs.forEach(function (img) {
            //设置图片坐标
            var minTop = Math.min.apply(null, arr);
            img.style.top = minTop + 'px';
            var index = arr.indexOf(minTop);
            arr[index] += img.clientHeight + info.gap;
            //横坐标
            img.style.left = index * (option.imgWisth + info.gap) + 'px'
        })
        var maxTop = Math.max.apply(null, arr);
        option.container.style.height = maxTop + 'px'
    }
    //得到图片水平方向的信息
    function getHorizontalInfo() {
        var obj = {}
        //容器宽度
        obj.containerWidth = option.container.clientWidth;
        //计算一行图片的数量
        obj.number = (obj.containerWidth - option.minHGap) / (option.imgWisth + option.minHGap)

        obj.number = Math.floor(obj.number);
        obj.gap = (obj.containerWidth - obj.number * option.imgWisth) / (obj.number - 1);
        return obj
    }
    //防抖
    function FD(callback, time) {
        var timer
        return function () {
            clearTimeout(timer)
            timer = setTimeout(function () {
                callback()
            }, time)
        }
    }
    var throttle = FD(setImgPosition, 0)
    //窗口尺寸变化事件
    window.onresize = throttle
}


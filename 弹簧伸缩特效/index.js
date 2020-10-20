var lis=document.querySelectorAll('.wrap li'),
	shadowBox=document.querySelector('.shadowBox'),
	showPic=document.querySelector('.showPic'),
	prev=document.querySelector('.prev'),
	next=document.querySelector('.next'),
	imgCon=document.querySelector('.showPic .img'),
	bigImgs=imgCon.children;

var curNum=0;	//当前图片的索引
var canClick=true;	//用户是否可以点击


//图片预加载功能函数
function loadImg(imgs,callBack){
	var loadImgs=[],loadImgNum=0;

	for(var i=0;i<imgs.length;i++){
		loadImgs[i]=new Image();
		loadImgs[i].onload=function(){
			loadImgNum++;
			if(loadImgNum==imgs.length){
				callBack(loadImgs);
			}
		};
		loadImgs[i].src=imgs[i];
	}
}
//把所有的图片都获取并存储到一个数组里
var imgs=[];
for(var i=0;i<lis.length;i++){
	imgs.push('images/work_'+i+'_big.jpg');
}

loadImg(imgs,function(images){
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			shadowBox.style.height=document.documentElement.offsetHeight+'px';
			shadowBox.style.display=showPic.style.display='block';

			//缩放需要一个过程，所以让它延迟一会再出来
			setTimeout(function(){
				shadowBox.style.opacity=showPic.style.opacity=1;
				showPic.style.transform='scale(1)';
			},50);

			//把点击的那个索引更新给curNum
			curNum=this.index;

			bigImgs[1].src=images[curNum].src;	//弹出层出来以后，前面那张图片应该是点击对应的那个图。此时后面那张图要改么？不需要。它应该在点击的时候确定，往右走与往左走是不一样的。

			nextClick(images);
			prevClick(images);
		};
	}
});

//鼠标点击遮罩(yalh)层，隐藏弹出层
shadowBox.addEventListener('click',function(){
	//如果点击遮罩层的时候正在运动，那就禁止用户点击，只有在运动停止的时候才能点击。这一点最后说
	if(!canClick){
		return;
	}

	shadowBox.style.display=showPic.style.display='none';
	shadowBox.style.opacity=showPic.style.opacity=0;
	showPic.style.transform='scale(0)';
});

//下一张点击
function nextClick(images){
	var nextNum=0;	//下一张图片的索引（背后那张图片的索引）

	next.onclick=function(){
		if(!canClick){
			return;
		}
		canClick=false;	//点击后立马变成false，再书合上后再变成true，只有为true的时候才能点
		/*
			点击的时候要做的事情
				1、背后图片的地址要换成正确的
				1、上面的图片走到右边
				2、下面的图片像翻书(tonn)一样打开（上一步结束后进行）
				3、上面的图片回到原始位置、下面图片合上（上一步结束后进行）
		 */


		//往右点击后下一张图片的索引是当前图片的索引+1
		nextNum=curNum+1;
		if(nextNum==lis.length){	//走到最后了，再回到起点
			nextNum=0;
		}
		bigImgs[0].src=images[nextNum].src;	//换后面那张图片的地址

		

		var endNum1=0;	//记录上面图片运动结束的次数
		var endNum2=0;	//记录下面图片运动结束的次数
		

		bigImgs[0].className=bigImgs[1].className='moveToRight';	//上面图往右走、下面图张开的时候，旋转不太对劲，是因为旋转中心没有设置
		bigImgs[1].style.transform='translateX(600px) rotateY(-10deg)';	//上面图片往右走
		bigImgs[1].addEventListener('transitionend',function(){	//上面图片已经走到右边了
			endNum1++;

			bigImgs[0].style.transform='rotateY(-10deg)';	//下面图张开
			bigImgs[1].style.transform='translateX(0) rotateY(0deg)';	//上面图回去


			/*
				这里要注意
					1、按正常的逻辑应该是上面的图回去了，然后下面图上再合上。所以需要知道什么时候上面的图回去了
					2、可能大家会再来个transitionend方法，其实不需要
					3、先在这里console.log(1)，看到会弹出两次
					3、在外面声明一个变量，用来存储结束事件发生的次数，当这个数字加到2的时候就代表上面的图片回去的结束事件发生了
			 */
			if(endNum1==2){	//这个条件成立说明，现在是上面的图上已经回到原点了
				bigImgs[0].style.transform='rotateY(0)';	//下面的图合上
				bigImgs[1].style.zIndex=1;	//上面的图跑后面
				bigImgs[0].style.zIndex=2;	//下面的图跑前面
			}
		});


		//下面的图合上了
		bigImgs[0].addEventListener('transitionend',function(){
			//这里也会发生两次，因为下面的图，张开又合上，是两次过渡
			//console.log(1);

			endNum2++;
			if(endNum2==2){	
				/* 
					1、这个条件成立，说明现在的end事件对应的是书合上的过渡
					2、这里需要做两件事件
						1、更改当前图片的索引，下一张的索引在函数一开始就修改了
						2、还原图片的层级到初始状态
				 */
				//书合上了，也代表一次完整的运动走完了，然后就要改索引了。这里只需要
				curNum++;
				if(curNum==lis.length){	//走到最后了，再回到起点
					curNum=0;
				}

				bigImgs[0].style.zIndex=1;	//后面图片的zIndex
				bigImgs[1].style.zIndex=2;	//前面图片的zIndex，既然层级变了，那图片的路径也要变
				bigImgs[1].src=images[nextNum].src;	//只用变前面那张图片的地址，变成下一张图片的地址

				canClick=true;	//书合上了，才可以进行下次的点击
			}
		})
	};
}

//上一张点击
function prevClick(images){
	var prevNum=0;	//修改

	prev.onclick=function(){	//修改
		if(!canClick){
			return;
		}
		canClick=false;

		//这一块全部修改
		prevNum=curNum-1;
		if(prevNum==-1){
			prevNum=lis.length-1;
		}
		bigImgs[0].src=images[prevNum].src;

		

		var endNum1=0;
		var endNum2=0;
		

		bigImgs[0].className=bigImgs[1].className='moveToLeft';	//修改
		bigImgs[1].style.transform='translateX(-600px) rotateY(10deg)';	//修改
		bigImgs[1].addEventListener('transitionend',function(){
			endNum1++;

			bigImgs[0].style.transform='rotateY(10deg)';	//修改
			bigImgs[1].style.transform='translateX(0) rotateY(0deg)';


			if(endNum1==2){
				bigImgs[0].style.transform='rotateY(0)';
				bigImgs[1].style.zIndex=1;
				bigImgs[0].style.zIndex=2;
			}
		});


		bigImgs[0].addEventListener('transitionend',function(){
			endNum2++;
			if(endNum2==2){

				//这一块修改
				curNum--;
				if(curNum==-1){
					curNum=lis.length-1;
				}

				bigImgs[0].style.zIndex=1;
				bigImgs[1].style.zIndex=2;
				bigImgs[1].src=images[prevNum].src;	//修改

				canClick=true;
			}
		})
	};
}
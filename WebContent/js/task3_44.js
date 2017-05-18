/**
 * Created by lh on 2016/10/27.
 */
var datas = {data: [{src:"img/1.jpg"},{src:"img/2.jpg"},{src:"img/x.jpg"},{src:"img/z.jpg"},
    {src:"img/1.jpg"}]}
$(document).ready(function(){
    waterfall();
   window.onscroll = function () {
       var oParent = document.getElementById("main");
       var oLast = oParent.lastElementChild;
       var oHeight = oLast.offsetTop + Math.floor(1/2 * oLast.clientWidth);
       var sHeight = document.documentElement.scrollTop + document.documentElement.clientHeight
       console.log(oHeight +"   " + sHeight);
       if(oHeight > sHeight){//加载数据
            for(var i = 0; i < datas.data.length; i++){
                var pic = document.createElement("div");
                pic.className = "pic";
                var owaterfall = document.createElement("div");
                owaterfall.className = "waterfall";
                var img = document.createElement("img");
                img.src = datas.data[i].src;
                owaterfall.appendChild(img);
                pic.appendChild(owaterfall);
                oParent.appendChild(pic);

            }
           waterfall();
       }
   };

});
/**
 *
 *
 */
var waterfall = function(){
    var oPics = $(".pic");
    console.log(oPics.length)
    //计算列数(页面宽 / 盒子宽度)
    var oBoxW = oPics[0].offsetWidth;//offsetWidth获取的宽高不包括margin
    // console.log("clientWidth:"+oPics[0].clientWidth);
    // console.log('offset:'+oBoxW);
    var cols = Math.floor( (document.documentElement.clientWidth)/ oBoxW );
    //设置main的宽度
    var main = $("#main").css({width : oBoxW * cols + 'px',
        margin :"0 auto"  })
    var height = [];//存放数组的高度
    for (var i = 0; i < oPics.length; i++){
        if (i < cols){
            height.push(oPics[i].offsetHeight);
        }
        else {//第二行及之后的
            var minH = Math.min.apply(null, height)
            var index = getMinIndex(height, minH);
            console.log(index)
            oPics[i].style.position = "absolute";
            oPics[i].style.top = minH + 'px';
            oPics[i].style.left = oPics[index].offsetLeft + 'px'
            height[index] += oPics[i].offsetHeight;
        }
    }
}
/**
 * 获取数组中最小高度的index
 * @param arr
 * @param min
 */
var getMinIndex = function (arr, min) {
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == min){
            return i;
        }
    }
}

/**
 * Created by lh on 2016/12/6.
 * 采用jquery来实现瀑布流布局
 */
var datas = {data: [{src:"img/1.jpg"},{src:"img/2.jpg"},{src:"img/x.jpg"},{src:"img/z.jpg"},
    {src:"img/1.jpg"},{src:"img/1.jpg"},{src:"img/2.jpg"},{src:"img/x.jpg"},{src:"img/z.jpg"},
    {src:"img/1.jpg"}]}
$(window).on("load",function(){
    waterfall();
    $(window).on('scroll',function () {
        if(checkScrollSide()){
            datas.data.forEach(function(obj, index){
                var oPic = $('<div>').addClass('pic');
                var oWaterfall = $('<div>').addClass('waterfall');
                var img = $('<img>').attr('src', obj.src);
                oWaterfall.append(img);
                oPic.append(oWaterfall);
                $("#main").append(oPic);
            })
            waterfall();
        }
    })
})
/**
 * 先计算列数
 */
function waterfall() {
    var $pic = $("#main > div");
    var w = $pic.eq(0).outerWidth();
    var cols = Math.floor($(window).width() / w);
    $("#main").width(w * cols).css('margin','0 auto');
    var hArr = [];
    $pic.each(function (index, value) {
        if(index < cols){
            hArr.push($pic.eq(index).outerHeight());
        }
        else {
            var minHeight = Math.min.apply(null, hArr);
            var i = $.inArray(minHeight, hArr);//找到高度最小的序号
            $(value).css({//$pic.eq(index)
                'position':'absolute',
                'top': minHeight+'px',
                'left':$pic.eq(i).offset().left+'px'
            })
            hArr[i] += $pic.eq(index).outerHeight();
        }
    })
}

function checkScrollSide(){
    var $lastPic = $("#main > div").last();
    var lastBoxDis = $lastPic.offset().top;
    var oHeight = lastBoxDis + $lastPic.height() / 2;
    var sHeight = $(window).scrollTop() + $(window).height();
    return (oHeight < sHeight) ? true : false;
}

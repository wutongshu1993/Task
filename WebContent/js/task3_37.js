/**
 * Created by lh on 2016/10/17.
 */
window.onload = init;
var $model = $(".model")

function init(){
    var top = $(".top")[0];
    var content = $(".content")[0];
    addEventHandler(top, "click", show);
    addEventHandler(content, "click", function(e){
        dismiss(e);
    });
    DragDrop().dragStart();

}
/**
 * 产生浮出层
 */
function show(){
$model.css({
    display: "block",
    transitionDuration: "5s"/*如何做出一个慢慢显示效果*/
})
    // console.log($(".model")[0].offsetLeft);
}
/**
 * 浮出层消失
 */
function dismiss(e){
    if(getTarget(e).id == "model" || getTarget(e).parentNode.id == "model"){
        e.stopPropagation();
        return;
    }
    $model.css({
        display: "none"
    })
}
/**
 * 鼠标拖拽
 */

var  DragDrop = function(){
    var target = document.getElementById("model");
    var content = $(".content")[0];
    var dragging = null;
    var flag = 0;
    function drag(e){
        e = getEvent(e);
        switch(e.type){
            case "mousedown":
                var t = getTarget(e).id;
                if(getTarget(e).id  == "model" || getTarget(e).parentNode.id == "model" ){
                    dragging = target;
                    flag = 1;
                }

                break;
            case "mousemove":

                if(flag === 1){
                    console.log("----flag:----"+flag);
                    var sTop =  document.documentElement.scrollTop || document.body.scrollTop;
                    console.log("sTop:"+sTop)
                    console.log("aaaaa"+target.style.top)
                    console.log("sssss"+e.clientX )
                    // target.style.left = (e.clientX - content.offsetLeft - target.offsetWidth / 2) + 'px';
                    // target.style.top = (e.clientY + sTop - content.offsetTop - target.offsetHeight / 2) + 'px';
                    target.style.left = (e.clientX ) + 'px';
                    target.style.top = (e.clientY ) + 'px';
                    var left = parseInt(target.style.left);
                    var top = parseInt(target.style.top);
                //     if(left < 0){
                //         target.style.left  = 0 + 'px';
                //         console.log("left<0")
                //     }
                //     if(top < 0){
                //         target.style.top  = 0 + 'px';
                //         console.log("top<0")
                //     }
                //     if(left > content.offsetWidth - target.offsetWidth){
                //         target.style.left  = (content.offsetWidth - target.offsetWidth) + 'px';
                //         console.log("left>da"+content.offsetWidth - target.offsetWidth)
                //
                //     }
                //     if(top > content.offsetHeight - target.offsetHeight){
                //         target.style.top  = (content.offsetHeight - target.offsetHeight) + 'px';
                //         console.log("top>da"+content.offsetHeight - target.offsetHeight)
                //         console.log(dragging.style.left)
                //     }
                //     console.log("---top:"+target.style.top+"---left:"+target.style.left);
                //     console.log("---top:"+dragging.style.top+"---left:"+dragging.style.left);
                }
                break;
            case "mouseup":
                console.log("-----flag=0-----")
                flag = 0;
                    // removeEvent($(".model")[0], "mousemove",drag)
                break
        }
    }
return {
    dragStart : function(){
        addEventHandler( $(".model")[0], "mousedown", drag);
        addEventHandler( $(".model")[0], "mousemove", drag);
        addEventHandler( $(".model")[0], "mouseup", drag);
    }
}

}
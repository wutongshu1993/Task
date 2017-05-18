/**
 * Created by lh on 2016/10/19.
 */
window.onload = init;
window.onscroll = function(){
    // alert(1)

    var top = tableShow.offsetTop;
    var height = tableShow.clientHeight + top;
    document.documentElement.scrollTop;
    pre_scrollTop

    if(this.scrollY > top){
        sticky.style.position = "fixed";
        sticky.style.top = 0;
        if(this.scrollY > height){
            sticky.style.position = "absolute";
        }
    }
    else{
        sticky.style.position = "static";
    }
    // console.log(getById("table").offsetTop);
    // if(pre_scrollTop != (document.documentElement.scrollTop || document.body.scrollTop)){
    //     pre_scrollTop = (document.documentElement.scrollTop || document.body.scrollTop);
    //     sticky.style.top = pre_scrollTop + "px";
    // }
};
var sticky;
var pre_scrollTop = 0;
var tableShow;
function init(){
    initData();
    sticky = getById("sticky");
    pre_scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//获得哪个的位置？？？？滚动的距离
    var table = new Table(datas);
    table.render(tbody);
    tableShow = getById("table")

}
function Stu(name, chinese, math, english) {
    this.name = name;
    this.chinese = chinese;
    this.math = math;
    this.english = english;
    this.sum = chinese + math + english;
}
var tbody = getById("data");
var datas = [];
/**
 * 将数据放入datas数组中
 */
function initData(){
    for(var i = 0 ;i <30; i++){
        var chi = Math.floor(Math.random()*101);
        var math = Math.floor(Math.random()*101);
        var eng = Math.floor(Math.random()*101);
        datas.push(new Stu("王"+i,chi, math, eng));
    }
}

function Table(data){
    this.data = data;
}
Table.prototype.render = function(tbody){
    tbody.innerHTML = "";
    var itemsData = "";
    for(var i = 0; i<datas.length; i++){
        itemsData += "<tr>"+"<td>"+datas[i].name+ "</td>"+"<td>"+datas[i].chinese +"</td>"+ "<td>"+datas[i].math+"</td>" + "<td>"+datas[i].english+"</td>"+ "<td>"+datas[i].sum+"</td>";
    }
    tbody.innerHTML = itemsData;
    /*getById("box").style.overflow = "hidden";*/

}

function scrollHandle(){
    alert(1);
    console.log(111)
    if(pre_scrollTop != (document.documentElement.scrollTop || document.body.scrollTop)){
        pre_scrollTop = (document.documentElement.scrollTop || document.body.scrollTop);
        sticky.style.top = pre_scrollTop + "px";
    }
}






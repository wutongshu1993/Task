/**
 * Created by lh on 2016/10/18.
 */
var table = getById("data");

// var datas = [{name:"小明", chinese : 80, math:90, english:70, total:230},
//     {name: "小红", chinese : 90, math:70, english:90, total:240},
//     {name: "小亮", chinese : 70, math:100, english:60, total:220},
// ];
var datas = [{name:"小明", "chinese" : 80, math:90, english:70, total:230},
    {name: "小红", "chinese" : 90, math:70, english:90, total:240},
    {name: "小亮", "chinese" : 70, math:100, english:60, total:220},
];
window.onload = init;
function init(){
    showData();
    addEventHandler(document, "click", function(e){handle2(e)});

}
/**
 * 显示
 */
function showData(){
    //注意，这个是对象数组，而不能算是json数组，因为json的属性必须加上双引号
    table.innerHTML = "";
    var itemsHtml = "";
for (var i = 0; i<datas.length; i++){
            itemsHtml +="<tr>"+"<td>"+datas[i].name+ "</td>"+"<td>"+datas[i].chinese +"</td>"+ "<td>"+datas[i].math+"</td>" + "<td>"+datas[i].english+"</td>"+ "<td>"+datas[i].total+"</td>";
}
table.innerHTML += itemsHtml;
}


var Sort = {
    c_up : function (a, b) {
        return a.chinese - b.chinese;
    },
    c_down :  function (a, b) {
    return b.chinese - a.chinese;
},
    m_up : function(a, b) {
    return a.math - b.math;
},
    m_down : function (a, b) {
    return b.math - a.math;
},
    e_up :function (a, b) {
    return a.english - b.english;
},
    e_down : function (a, b) {
    return b.english - a.english;
}
}



function handle(e){
    e = getTarget(e);
    switch(e.id){
        case "c-up":
            datas.sort(Sort.c_up);//这里不能加括号，加括号是调用
            table.innerHTML = "";
            showData();
           break;
        case "c-down":
            datas.sort(Sort.c_down);
            table.innerHTML = "";
            showData();
            break;
        case "e-up":
            datas.sort(Sort.e_up);
            table.innerHTML = "";
            showData();
            break;
        case "e-down":
            datas.sort(Sort.e_down);
            table.innerHTML = "";
            showData();
            break;
        case "m-up":
            datas.sort(Sort.m_up);
            table.innerHTML = "";
            showData();
            break;
        case "m-down":
            datas.sort(Sort.m_down);
            table.innerHTML = "";
            showData();
            break;
        default:
            break;
    }
}
function sortUp(type){
    datas.sort(function(a, b){
        return a[type] - b[type];//用a.th没用
        // return a.type - b.type;//用a.th没用
    })
}

var sortDown = function(th){
    datas.sort(function (a, b) {
        return b[th] - a[th];//因为传过来的参数th是字符串，所以智能用a[th]而不能用a.th
    })
}
/**
 * 这种写法就只用写升序和降序两种方法了
 * @param e
 */
function handle2(e){
    e = getTarget(e);
    switch (e.className){
        case "up":
            // sortUp(e.parentNode.id);
            var id = e.parentNode.id;
            sortUp(id);
            // datas.sort(Sort.c_up);
            showData();
            break;
        case "down":
            sortDown(e.parentNode.id);
            showData();
            break;
        default:
            break;
    }
}



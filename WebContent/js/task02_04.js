
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
function City(name, value, id){
	this.name = name;
	this.value = value;
	this.id = id;
}
var aqiData = {};
var cityId = 0;
var index = 1;
//var resultDiv = document.getElementById("resultDiv");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
var name = document.getElementById("aqi-city-input").value.trim();
checkCity(name);
var value = document.getElementById("aqi-value-input").value.trim();
checkValue(value);
//console.log(name+" "+value);
//var tempCity = new City(name,value,cityId++);
////alert(row.innerHTML);
//aqiData.push(tempCity);
aqiData[name] = value;
//alert(8);
}
/**
 * 验证城市输入是否合法
 * @param name
 */
function checkCity(name){
	if(name=="" || name==null){
		alert ("输入不能为空");
		return;
	}
	var reg =  /^[a-zA-Z\u0391-\uFFE5]+$/;
	/*var regChina = /^[\u0391-\uFFE5]+$/;*/
	if(!reg.test(name)){
		alert("请输入中英文字符");
		return;
	}
}
/**
 * 验证空气质量输入是否合法
 * @param value
 */
function checkValue(value){
	if(value==""||value==null){
		alert("输入不能为空");
	}
	var regNum=/^\d*$/;
	if(!regNum.test(value)){
		alert("请输入数字");
	}
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
////alert(33);
//	index = 1;
//var table = document.getElementById("aqi-table");
//for(var i=aqiData.length-1;i>0;i--){
//	table.deleteRow(i);
//}
////alert(table);
//for(var i=0;i<aqiData.length;i++){
//	var row = table.insertRow(index++);
//	var cell = row.insertCell(0);
//	cell.innerHTML=aqiData[i].name;
//	cell = row.insertCell(1);
//	cell.innerHTML=aqiData[i].value;
//	cell = row.insertCell(2);
//	cell.innerHTML="<button name='deleteButton' id='deleteId' onclick='delBtnHandle(this)' cityId="+i+"> 删除</button>";
//	aqiData[i].id = i;
////	cell.innerHTML="<button class='delete' id="+row.rowIndex"> 删除</button>";
//}
	var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
		for(var city in aqiData){
			items +="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>";
		}
	  document.getElementById("aqi-table").innerHTML = city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  //alert("add");
  addAqiData();
  renderAqiList();
//  delBtnHandle();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
//	var cityId = button.getAttribute("cityId");
//	aqiData.splice(cityId,1);
//	var table = document.getElementById("aqi-table");
//	var i = button.parentNode.parentNode.rowIndex;
//	alert(i);
//	table.deleteRow(i);
delete aqiData[city];
renderAqiList();
  
}


function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	//alert("init()");
var addButton = document.getElementById("add-btn");
addButton.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数,原先我是用在td中写一个onclick
document.getElementById("aqi-table").addEventListener("click", function(event){
    if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
})
}

//init();
window.onload = init;

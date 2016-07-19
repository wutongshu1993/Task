/**
 * 
 */
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;//因为月份是0-11,所以需要加一
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);//Math.cell()，对一个数进行上舍入（大于等于的最小整数）
    dat.setDate(dat.getDate() + 1);//这个地方比如31再加一之后，month位会有进位吗，会！！！
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}
/**
 * 渲染图表
 */
function renderChart() {
var wrap = document.getElementById("aqi-chart-wrap");
//wrap.style.width = document.body.clientWidth*0.8 +"px";
//wrap.style.height = document.body.clientHeight + "px";
var width = wrap.clientWidth;
var height =wrap.clientHeight;
var arr = Object.keys(chartData);//获取数组的所有的key组成的组合
var len = arr.length;
//alert(height +" "+width);
var text = "";
wrap.innerHTML = text;//每次绘画之前都要清空
for(var chart in chartData){//这里用innerHtml更简洁
	//math.floor(),进行下舍入，Number.toString(num),将数组转化为字符串，按照16进制进行转化
	var color = "#"+ Math.floor(Math.random() * 0xFFFFFF).toString(16);
	var div = document.createElement("div");
//	div.class=
	div.style.background = color;
	div.style.display = "inline-block";
	//如何设置宽高
	div.style.height = ((height/600)*chartData[chart])+"px";
	div.style.width = (width/len)+"px";
//	div.style.position ="absolute";
	div.style.padding="auto 0px 5px 0px";
	div.title = chart+" "+chartData[chart];
	wrap.appendChild(div);
}


}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
 if (pageState.nowGraTime == newTime) return;
 pageState.nowGraTime = newTime;
// alert(newTime);
  // 设置对应数据
 initAqiChartData();
  // 调用图表渲染函数
 renderChart();
	
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
	var citySelect = document.getElementById("city-select");
	//获取select选择的值，首先获得索引号，然后再取值
	var index = citySelect.selectedIndex;
	pageState.nowSelectCity = citySelect.options[index].value ;
//	alert(citySelect.options[index].value);
  // 设置对应数据
	initAqiChartData();
  // 调用图表渲染函数
	renderChart();
}
var newTime;
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	
var formGraTime = document.getElementById("form-gra-time");
formGraTime.addEventListener("click",function(event){
	if(event.target.name="gra-time"){
		var graTimes = document.getElementsByName("gra-time");//获得的是一个数组
		for(var graTime in graTimes){//其实相当于是普通的for循环
			if(graTimes[graTime].checked){
				newTime = graTimes[graTime].value;
//				alert(graTimes[graTime].value);
				graTimeChange();
			}
		}
	}
});


}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
var citySelect = document.getElementById("city-select");
for(var cityData in aqiSourceData ){
	var option = document.createElement("option");
	option.innerHTML = cityData;
	option.setAttribute("value",cityData);
	citySelect.appendChild(option);
}
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
citySelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
	var data = aqiSourceData[pageState.nowSelectCity];//该城市92天所有数据
	var i=1;//第几周
	var count=0;//一周的天数
	var sum = 0;//一周或者一个月的污染指数总和
	var oldMon =new Date((Object.keys(data))[0]).getMonth();
	//根据月、周、日的选择的不同，把数据放在chartData中
	switch(pageState.nowGraTime){
	case 'month':
		chartData = {};
		for(day in data){
			var month = new Date(day).getMonth();//返回月份0-11
				if(month!=oldMon){
					//计算
					if(count!=0){
					chartData["第"+i+"月"] = Math.ceil(chartData["第"+i+"月"] /  count);
					i++;
					count=0;
					sum = 0;
					oldMon = month;
					}
				}
				count++;
//				var temp = data[day];
				sum += data[day];
				chartData["第"+i+"月"]=sum;
		}	
		chartData["第"+i+"月"] = Math.ceil(chartData["第"+i+"月"] /  count);
		break;
		
		//周的转换与计算已经没有问题了
	case 'week':
		chartData = {};
		for(day in data){
			//getUTCDay()获取星期几 0(周天)-6(周六)
			var weekday = new Date(day).getUTCDay();
			if(weekday==1){
				//计算
				if(count!=0){
				chartData["第"+i+"周"] = Math.ceil(chartData["第"+i+"周"] /  count);
//				alert("第"+i+"周:"+chartData["第"+i+"周"]);
				i++;
				count=0;
				sum = 0;}
			}
			count++;
			var temp = data[day];
			sum += data[day];
			chartData["第"+i+"周"]=sum;
			
		}
		chartData["第"+i+"周"] = Math.ceil(chartData["第"+i+"周"] /  count);
		alert("第"+i+"周:"+chartData["第"+i+"周"]);
		break;
	case 'day':
		chartData = {};
		chartData = aqiSourceData[pageState.nowSelectCity];
		break;
	}
	
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

window.onload = init;

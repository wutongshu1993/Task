/**
 * 
 */
window.onload = init;

var setting = document.getElementById("setting"),
rule = document.getElementById("rule"),
length = document.getElementById("length"),
options = document.getElementById("options");
//var submitBtn = $("#submit");
var submitBtn = document.getElementById("submit");
var jsonValue = {};
function init(){
	var typeArea = $("#type")[0];

	addEventHandler(typeArea,"click",function(event){
	var e = getTarget(event);
	if(e != typeArea){
	var type = e.getAttribute("value");
	render(type);
	};

});

	addEventHandler(rule, "click", function (event) {
		var e = getTarget(event);
		$("#name")[0].value = e.getAttribute("rule");
		render2(e.getAttribute("value"));

	})
	/**
	 * 提交的时候，将那些设置好的数据以json的形式封装
	 */
	addEventHandler(submitBtn, "click", function () {
		var ruleValue = null;
		var fromValue = null;
		var toVal = null;

		if($("#length").is(":visible")){
			fromValue = $("#from").val();
			toVal = $("#to").val();
		}
		if ($("#rule").is(":visible")){
			ruleValue = $("input[name = 'rule']:checked").val();
		}
		jsonValue = {
			type1: $("input[name = 'type']:checked").val(),//类型
			name1: $("#name").val(),//名称
			setting1:  $("input[name = 'setting']:checked").val(),//设置，选填、必填
			rule1:  ruleValue,//规则
			length1: {
				from:fromValue,
				to : toVal
			},
			//tag : $() 选项分割，暂时不写
		}
		parse(jsonValue);
	})
}
/**
 * 根据选取的类型，显示不同的菜单内容
 * @param type
 */
function render(type){	
	$("#name")[0].setAttribute("value", type);
	switch(type){
	case "text":
		$("#rule").show();
		$("#length").show();
		$("#options").hide();
		break;
	case "textarea":
		$("#rule").hide();
		$("#length").show();
		$("#options").hide();
		break;
	case "radio":
	case "checkbox":
	case "select":
		$("#rule").hide();
		$("#length").hide();
		$("#options").show();
		break;
	}
}
/**
 * 根据选择的规则，决定下面的长度限制是否显示
 * @param type
 */
function render2(type){
	switch (type){
		case "text":
		case "password":{
			$("#length").show();
			break;
		}
		case "num":
		case"email":{
			$("#length").hide();

		}
	}
}
/**
 * 解析json类型数据，并绑定验证函数
 * @param jsonType
 */
function parse(jsonType){
var newElem;
var isRequired = jsonType.setting1;
var lengthSetting = jsonType.length1;
var ruleSetting = jsonType.rule1;
switch(jsonType.type1){
	case "text":
	{
		newElem = document.createElement("input");
		newElem.setAttribute("type", "text");


		break;
	}
	case "textarea":
	{
		newElem = document.createElement("textarea");
		break;
	}
	case "radio":
	{
		newElem = document.createElement("input");
		newElem.setAttribute("type", "radio");
		break;
	}
	case "checkbox":
	{
		newElem = document.createElement("input");
		newElem.setAttribute("type", "checkbox");
		break;
	}
	case "select":
	{
		newElem = document.createElement("select");
		break;
	}
	default: {
		newElem = '';
		break;
	}
}
var  show = document.getElementById("show");
var tips = document.createElement("span");
var label = document.createElement("label");
var divEle = document.createElement("div");
divEle.setAttribute("class","showElement");
// divEle.addClass("showElement")
newElem.setAttribute("jsonType",JSON.stringify(jsonType));
//show.innerHTML += '</br>';
label.innerHTML = jsonType.name1+": ";
divEle.appendChild(label);
divEle.appendChild(newElem);
divEle.appendChild(tips);
	newElem.onblur = function(){
		validate(newElem);
	}
	show.appendChild(divEle);
// 	newElem.setAttribute("onblur",validate());
// newElem.setAttribute("onblur",function (e) {
// 	validate(e.target());
// });
	//addEventHandler(newElem, "blur", validate(newElem, isRequired, ruleSetting,lengthSetting,tips));
}
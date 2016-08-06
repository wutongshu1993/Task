/**
 *前中后序遍历 
 */
window.onload=init;
var preSearch;
var midSearch;
var postSearch;
var root = $(".root")[0];
var rootNode = new node(root);
/**
 * 兼容的事件处理函数
 * @param ele 元素
 * @param event 事件 是不带on的，比如click
 * @param handler 对应的处理函数
 */
function addEventHandler(ele, event, handler){
	/*var regHandler = handler;
	if(param){
		regHandler = function (e){
		handler.call(this, param);//继承监听函数，并传入参数以初始化
	}
	}*/
	if(ele.addEventListener){
		ele.addEventListener(event,handler,false);
	}
	else if(ele.attachEvent){
		ele.attachEvent("on"+event,handler);
	}
	else{
		ele["on"+event] = handler;
	}
}
function init(){
//	preSearch = $("#pre");
	preSearch = document.getElementById("pre");
	midSearch = $("#middle");
	postSearch = $("#post");
	addEventHandler(preSearch,"click",preHandler);
	
}
function sleep(numberMillis){
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while(true){
		now = new Date();
		if(now.getTime() > exitTime){
			return ;
		}
	}
}
function node(ele){
	this.domNode = ele;
	if(ele.firstElementChild!=null){
		this.left = new node(ele.firstElementChild);
	}
	else{
		this.left = null;
	}
	if(ele.lastElementChild!=null){
		this.right = new node(ele.lastElementChild);
	}
	else{
		this.right = null;
	}
	this.render = function(){
		ele.style.background = "blue"; 
//		sleep(500);
//		var i=0
//		while(i<1000){
//			ele.style.background = "blue"; 
//			i++;
//		}
//		ele.style.backgroundColor = 'white';
	}
	this.reset = function(){
		ele.style.backgroundColor = 'white';
	}
}
/**
 * 不知道为啥，这样写变化不起作用啊！！！！！！！！！！！！！！！！
 * @param node
 */
function preeSearch(node){
	if(node!=null){
		node.render();
		console.log(node.domNode.style.background);
//		sleep(500);
//		node.reset();
		console.log("after:"+node.domNode.style.background);
		preeSearch(node.left);
		preeSearch(node.right);
	}
}
function preHandler(){
	preeSearch(rootNode);
}



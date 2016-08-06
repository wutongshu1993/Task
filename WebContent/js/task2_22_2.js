/**
 *前中后序遍历 
 */
window.onload=init;
var preSearch;
var midSearch;
var postSearch;
var root ;
var divList=[];
var timer = null;
/**
 * 兼容的事件处理函数
 * @param ele 元素
 * @param event 事件 是不带on的，比如click
 * @param handler 对应的处理函数
 */
function addEventHandler(ele, event, handler){
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
	midSearch = document.getElementById("middle");;
	postSearch = document.getElementById("post");;
	addEventHandler(preSearch,"click",preHandler);
	addEventHandler(midSearch,"click",inHandler);
	addEventHandler(postSearch,"click",postHandler);
	root = $(".root")[0];
}


function preOrder(node){
	if(node!=null){
//		divList.push(function(){
//			visitNode(node);
//		});
		divList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}
function preHandler(){
//	reset();
//	preOrder(root);
//	changeColor();
	preOrder(root);
//	render();
}
function inHandler(){
	reset();
	inOrder(root);
	changeColor();
}
function inOrder(node){
	if(node!=null){
		inOrder(node.firstElementChild);
		divList.push(node);
		inOrder(node.lastElementChild);
	}
}
function postHandler(){
	reset();
	postOrder(root);
	changeColor();
}
function postOrder(node){
	if(node!=null){
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		divList.push(node);
	}
}
function reset(){
	divList = [];
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for(var i=0;i<divs.length;i++){
		divs[i].style.background = "white";
	}
}

function changeColor(){
	var i = 0;
	divList[i].style.background = "blue";
	timer = setInterval(function(){
		i++;
		if(i<divList.length){
			divList[i-1].style.background = "white";
			divList[i].style.background = "blue";
		}
		else{
			clearInterval(timer);
			divList[i-1].style.background = "white";
		}
	}, 1000);
}

/*function visitNode(node){
	node.style.background = "blue";
	setTimeout(function(){
		node.style.background = "white";
	},1000);
}*/

/**
 * 
 */
window.onload = init;
var show;
function init(){
	var inleft = document.getElementById("inLeft");
	var inright = document.getElementById("inRight");
	var outleft = document.getElementById("outLeft");
	var outright = document.getElementById("outRight");

	show = document.getElementById("show");
//	inright.onclick = inLeftFuc(number);
	inright.addEventListener("click",inLeftFuc);
	inleft.addEventListener("click",inRightHandler);
	outright.addEventListener("click",outRightHandler);
	outleft.addEventListener("click",outLeftHandler);
}
function inLeftFuc(){
	var number = document.getElementById("number").value;
	if(checkNum(number)){
	var item = document.createElement("div");
	item.setAttribute("class","item");
	item.innerHTML = number;
	show.appendChild(item);
	}
}

function inRightHandler(){
	var number = document.getElementById("number").value;
	if(checkNum(number)){
		var item = document.createElement("div");
		item.setAttribute("class","item");
		item.innerHTML = number;
		var firstItem = show.firstChild;
		if(firstItem==null){
			show.appendChild(item);
		}
		else{
		show.insertBefore(item,firstItem);
		}
		}
}

function outRightHandler(){
	var lastItem = show.lastChild;
	if(lastItem==null){
		alert("栈内元素已经为空了！！");
		return;
	}
	else{
		show.removeChild(lastItem);
	}
}

function outLeftHandler(){
	var firstItem = show.firstChild;
	if(firstItem==null){
		alert("栈内元素已经为空了！！");
		return;
	}
	else{
		show.removeChild(firstItem);
	}
}
function checkNum(number){
	var reg = /^[0-9]*$/;
	if(!reg.test(number)){
		alert("请输入数字！！");
		return false;
	}
	return true;
	
}
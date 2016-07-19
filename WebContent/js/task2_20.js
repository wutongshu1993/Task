/**
 * 
 */
window.onload = init;
var words;
var showDiv;
var targetText;
var dics;
function init(){
	words = document.getElementById("words");
	showDiv = document.getElementById("show");
	var insertButton = document.getElementById("insert");
	targetText = document.getElementById("target");
	var queryButton = document.getElementById("query");
	
	
	insertButton.addEventListener("click",insertHandler);
	queryButton.addEventListener("click",queryHandler);
}

function insertHandler(){
	var wordsArray = splitWords(words.value.trim());
//	dics = dics.concat(disc, wordsArray);
	showWords(wordsArray);
}
function queryHandler(){
	var items = showDiv.childNodes;
	for(var i=0;i<items.length;i++){
		if(items[i].innerHTML.indexOf(targetText.value.trim())!=-1){
			items[i].innerHTML = items[i].innerHTML.replace(targetText.value.trim(),"<span class='match'>"+targetText.value.trim()+"</span>");
		}
	}
//	document.write(txt);
}
//将分割好的字符串显示
function showWords(wordsArray){
	for(var i=0;i<wordsArray.length;i++){
		var item = document.createElement("div");
		item.innerHTML = wordsArray[i];
		item.setAttribute("class","item");
		show.appendChild(item);
	};
}
function render(){
	
}
//将输入的字符串分割(,和、的正则表达式怎么写)
function splitWords(words){
	var reg = /\s+/;
	var wordsArray = words.split(reg);
	return wordsArray;
}
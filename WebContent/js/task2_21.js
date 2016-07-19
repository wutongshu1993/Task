/**
 * 
 */
window.onload = init;
var interests;
var interestShow;
var tagInput;
var tagShow;
var interestDics = [];//存放兴趣的数组
var tagDics = [];//存放tag标签的数组
function init(){
	tagInput = document.getElementById("tag");
	interests = document.getElementById("interests");
	interestShow = document.getElementById("interestShow");
	tagShow =  document.getElementById("tagShow");
	var insertButton = document.getElementById("insert");
	
	insertButton.addEventListener("click",insertHandler);
	tagInput.onkeydown = keyListenner;//当在tagInput中按下分割按键，按键注册监听函数
}

function insertHandler(){
	var wordsArray = splitWords(interests.value.trim());
	//wordsArray = deleteRepeated(interestDics, wordsArray);
	deleteRepeated(interestDics, wordsArray);
	//需要维护10个最新的元素
	interestDics = maintainTen(interestDics, wordsArray, 10, interestShow);
	interests.value="";
}
/**
 * 监听tag标签是否按下键
 */
function keyListenner(evt){
	var targetKeycodes = [9,13,188,32];//tab,enter,,;,space keychar = String.fromCharCode(keynum)
	evt = (evt) ? evt : window.event;
	if(targetKeycodes.indexOf(evt.keyCode)!=-1){//按下分隔符，进行处理
		insertTag();
	}
	/*if(/[,，;；、\s\n]+/.test(tagInput.value) || evt.keyCode == 13){
		insertTag();
	}*/
	
}
/**
 * 插入tag标签的函数
 */
function insertTag(){
	var tag = [];
	tag.push(tagInput.value);
	tagDics = maintainTen(tagDics, tag, 10, tagShow);
	//给新增加的tag增加删除的标志
	tagInput.value = "";
}
//维护数组中为10个最新的元素
function maintainTen(dics, arr , num, parentNode ){
	if(dics.length + arr.length >= num){
		for(var i=0;i<arr.length;i++){
			if(dics.length + 1 >= num){
				dics.splice(0,1);
				deleteDOMItem(parentNode);
			}
			dics.push(arr[i]);
			addDOMItem(parentNode,arr[i] );
		}
	}
	else{
		deleteRepeated(dics, arr);
		dics = dics.concat(arr);
		showWords(arr, parentNode);
	}
	return dics;
	
}
/**
 * 删除对应dom中的第一个节点
 * @param parentNode
 */
function deleteDOMItem(parentNode){
	var firstChild = parentNode.firstChild;
	parentNode.removeChild(firstChild);
}
function addDOMItem(parentNode, value){
	var li = document.createElement("li");
	var item = document.createElement("span");
	item.innerHTML = value;
	item.setAttribute("class","interestShow");
	li.appendChild(item);
	parentNode.appendChild(li);
}
function deleteRepeated(dics, arr){
	//在将dics和arr比对之前，应该先对arr本身进行去重，想法是先排序，再比较
	arr.sort();
	for(var i=arr.length-1;i>0;i--){
		if(arr[i] == arr[i-1]){
			arr.splice(i,1);
		}
	}
	
	for(var i=arr.length-1;i>=0;i--){
		if(contains(dics, arr[i]) != -1){//如果发现arr中的元素存在总数组中，就把arr中对应的元素删除
			arr.splice(i,1);//splice方法会改变原来的数组
		}
	}
}
function contains(array, value){
	if(!Array.indexOf){//如果Array没有indexof方法,就重写一个
		Array.prototype.indexOf = function(obj){
			for(var i=0;i<this.length;i++){
				if(this[i] == obj){
					return i;
				}
			}
			return -1;
		}
	}
	var index = array.indexOf(value);
	return index;
}
//将分割好的字符串显示
function showWords(wordsArray, parentNode){
	for(var i=0;i<wordsArray.length;i++){
		var li = document.createElement("li");
		var item = document.createElement("span");
		item.innerHTML = wordsArray[i];
		var text = wordsArray[i];//这个text是为了之后删除时文字的显示
		item.setAttribute("class","interestShow");
		li.appendChild(item);
		li.setAttribute("id",wordsArray[i]);//给li增加id属性，利于后期的删除
		parentNode.appendChild(li);
		
		//应该是只为tag添加删除标签功能的
		if(parentNode.id == "tagShow"){
		li.onmouseover = function(){
			item.innerHTML ="删除"+text;
			li.setAttribute("class","tagDelete");
			li.onclick = removeItem;//既要删除dom，也要删除对应的字符数组
		}
		li.onmouseout = function(){
			item.innerHTML =text;
		}
		}
	};
}
//
function removeItem(e){
	var key = e.target.id;
	if(e.target.tagName.toLowerCase() == "span"){//如果是在文字上点击的
		key = e.target.parentNode.id;
	}
	for(var i=0;i<tagDics.length;i++){
		if(tagDics[i] == key){
			tagDics.splice(i,1);//将tag数组中对应的元素删除
		}
	}
	removeStickyFromDom(key);
}

function removeStickyFromDom(key){
	var li = document.getElementById(key);
	li.parentNode.removeChild(li);
}

//将输入的字符串分割(,和、的正则表达式怎么写)
function splitWords(words){
	var reg = /[,，;；、。.\s\n]+/;
	var wordsArray = words.split(reg);
	return wordsArray;
}
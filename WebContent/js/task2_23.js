/**
 * 
 */
window.onload = init;
function init(){
	var btns = document.querySelectorAll("button");
		preBtn = btns[0];
		inBtn = btns[1];
		postBtn = btns[2];
		root = document.querySelector(".root");
		treeWalker = new TreeWalker();
		addEventHandler(preBtn,"click",function(){
			treeWalker.preOrder(root);
			treeWalker.render();
		});
}
/**
 * 一颗树
 */
function TreeWalker(){
	this.stack = [];
	this.lastIndex;
}
/**
 * 前序遍历
 * @param node
 */
TreeWalker.prototype.preOrder = function(node){
	var value = node.dataset.value;
	var obj = {node : node,
				value:value
	};
	this.stack.push( obj);
	if(node.hasChildNodes()){
		var children = node.childNodes;
		for(var i=0;i<children.length;i++){
			if(children[i].nodeType==1){
				this.preOrder(children[i]);
			}
		}
	}
	
}
TreeWalker.prototype.render = function(){
	var stack = this.stack;
	var searchVal= document.getElementById("nodeSearch").value;//需要查询的节点文字
	var j=0,i=0;
		index = this.lastIndex;//上一次查找到的点，每一次新的查找需要将原来的查找样式还原。
	if(searchVal == null || searchVal==""){
		//没有输入内容，进行普通的查询
		var i = 0;
		var timer = null;
			timer = setInterval(function(){
				stack[i].node.style.background = "blue";
				i++;
				if(i < stack.length){
				stack[i-1].node.style.background = "white";
				stack[i].node.style.background = "blue";
				}
				else if(i == stack.length){
					stack[i-1].node.style.background = "white";
					clearInterval(timer);
					this.stack = [];
				}
			},800)
	}
	//进行查找
	else{
		//清除样式
		if(index!=null){
		stack[index].node.style.background = "white";}
		this.lastIndex = null;
		for(j=0;j<stack.length;j++){
			if(stack[j].value == searchVal){
				break;
			}
		}
		if(j == stack.length-1){//没查到
			var tips = document.querySelector(".tips").innerHtml = "查无此点";
		}
		else{//查到了
			this.lastIndex = j;
			i = 0;
			stack[i].node.style.background = "blue";
			var timer = null;
				timer = setInterval(function(){
					stack[i].node.style.background = "blue";
					i++;
					if(i <= j){
					stack[i-1].node.style.background = "white";
					stack[i].node.style.background = "blue";
					}
					else {
						clearInterval(timer);
						this.stack = [];
					}
				},800)
		}
	}
}



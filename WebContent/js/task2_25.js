/**
 * 
 */
window.onload = init;
function init(){
	var btns = document.querySelectorAll("button");
		queryBtn = btns[0];
		addBtn = btns[1];
		deleteBtn = btns[2];
		root = document.getElementById("root");
		showNodes = null;
		treeWalker = new TreeWalker();
		showNodes = document.querySelectorAll("span");
		i=0;
		len = 0;
	showNodes = collectionToArray(showNodes);
	treeWalker.showNodes = showNodes;
	for(i=0,len=showNodes.length;i<len;i++){
		addEventHandler(showNodes[i],"click",function(e){
			treeWalker.resetStyle();//将上一个选中的节点背景格式重置
			treeWalker.lastSelected = e.target;
			treeWalker.selectRender();//将选中节点的样式修改
			treeWalker.showTrigger();//切换显示或者不显示子类
		});
	}
	addEventHandler(queryBtn,"click",function(){
		treeWalker.stack = [];
		treeWalker.preOrder(root);
		treeWalker.render();
	});
	//改删除按钮绑定函数，删除该节点及该节点下的所有子节点
	addEventHandler(deleteBtn,"click",function(){
		treeWalker.deleteHandler();
	});
	//给增加按钮绑定函数，在该节点的最后一个子节点后面增加
	addEventHandler(addBtn,"click",function(){
		treeWalker.addHandler();
	});
		
}
function TreeWalker(){
	this.stack = [];
	this.lastIndex;
	this.showNodes = [];
}
TreeWalker.prototype.resetStyle = function(){
	if (this.lastSelected != null){
		this.lastSelected.style.color="gray";
	}
}
TreeWalker.prototype.selectRender = function(){
	var lastSelected = this.lastSelected;
	this.lastSelected.style.color="red";
}
TreeWalker.prototype.showTrigger = function(){
	var selected = this.lastSelected;
	var parent = selected.parentNode;
	var children = parent.childNodes;
	var i=0;
	for(i=0;i<children.length;i++){
		if(children[i].nodeName == "DIV"){//如果孩子是div
			if(children[i].className == "show"){
				children[i].setAttribute("class","hidden");
			}
 			else {
				children[i].setAttribute("class", "show");
			}
		}
	}
}

TreeWalker.prototype.preOrder = function(node){
	var value = node.firstElementChild.innerHTML;
	var obj = {node : node,
				value:value
	};
	this.stack.push( obj);
	if(node.hasChildNodes()){
		var children = node.childNodes;
		for(var i=0;i<children.length;i++){
			if(children[i].nodeName=="DIV"){//获取节点的元素孩子节点，通过判断childNodes节点中的nodeType是否为1（div类型），有其他办法吗？？？？？、
				this.preOrder(children[i]);
			}
		}
	}
	
}

TreeWalker.prototype.render = function(){
	var stack = this.stack;
	var searchVal= document.getElementById("nodeSearch").value;//需要查询的节点文字
	var tips = document.getElementById("tips");
	var j=0,i=0;
		index = this.lastIndex;//上一次查找到的点，每一次新的查找需要将原来的查找样式还原。
		if(searchVal==""){
			tips.innerHTML = "请输入查找内容"
		}
		else{
			//清除样式
			if(index!=null){
			stack[index].node.style.background = "#c4fcff";}
			this.lastIndex = null;
			for(j=0;j<stack.length;j++){
				if(stack[j].value == searchVal){
					break;
				}
			}
			if(j == stack.length){//没查到
				tips.innerHTML = "查无此点";
			}
			else{
				this.lastIndex = j;
				stack[j].node.style.background = "#15d1f9";
				tips.innerHTML = "";
			}
		}
}

/**
 * delete的处理函数
 */
TreeWalker.prototype.deleteHandler = function(){
	var lastSelected = this.lastSelected;
	//获取选中节点的最后一个孩子节点
	var parent = lastSelected.parentNode;
	var lastChild = parent.lastElementChild.firstElementChild;
		showNodes = [];
		showNodes = this.showNodes;
		from = null;
		last = null;
		num = 0;
	//计算选中节点及他的最后一个孩子节点在数组中的位置
	for(var i=0;i<showNodes.length;i++){
		if(showNodes[i] == lastSelected)
			from = i;
		if(showNodes[i] == lastChild)
			{last = i;
			break;}
	}
	if(lastChild!=null){	
		num = last-from+1;
	}
	console.log(showNodes instanceof NodeList);
	
	showNodes.splice(from,num);
	this.showNodes = showNodes;
	//页面中删除节点
	parent.parentNode.removeChild(parent);	
}
/**
 * 增加节点的处理办法
 */
TreeWalker.prototype.addHandler = function(){
	var lastSelected = this.lastSelected;
		parent = lastSelected.parentNode;
		nodeValue = document.getElementById("nodeSearch").value;
		showNodes = this.showNodes;
		index = null;
	//获取选中节点的最后一个孩子节点
	var lastChild = parent.lastElementChild.firstElementChild;;
	//在数组中增加，在lastChild的后面增加
	for(var i=0;i<showNodes.length;i++){
		if(showNodes[i] == lastChild){
			index = i;
			break;
		}
	}
	var div = document.createElement("div");
	var span = document.createElement("span");
	span.innerHTML = nodeValue;
	div.appendChild(span);
	div.setAttribute("class","show");
	parent.appendChild(div);
	//在数组中插入
	showNodes.splice(i+1,0,span);
	
	addEventHandler(span,"click",function(e){
		this.resetStyle();//将上一个选中的节点背景格式重置
		this.lastSelected = e.target;
		this.selectRender();//将选中节点的样式修改
		this.showTrigger();//切换显示或者不显示子类
	});
}
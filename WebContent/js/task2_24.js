/**
 * 
 */
window.onload = init;
function init(){
	var btns = document.querySelectorAll("button");
		preBtn = btns[0];
		inBtn = btns[1];
		postBtn = btns[2];
		addBtn = btns[3];//增加
		deleteBtn = btns[4];//删除按钮
		root = document.querySelector(".root");
		treeWalker = new TreeWalker();
		addEventHandler(preBtn,"click",function(){
			treeWalker.preOrder(root);
			treeWalker.render();
		});
		//需要给所有的节点绑定click监听事件
		showNodes = document.querySelectorAll(".show");//这里可以考虑前序遍历，然后便把stack的值赋值给showNodes即可
		//由于querySelectorAll返回的是NodeList类型数据，这里把它转化为数组
		showNodes = collectionToArray(showNodes);
		//		treeWalker.preOrder(root);
//		showNodes = treeNode.stack;
		treeWalker.showNodes = showNodes;
		for(var i=0;i<showNodes.length;i++){
			addEventHandler(showNodes[i],"click",function(e){
				treeWalker.resetStyle();//将上一个选中的节点背景格式重置
				treeWalker.lastSelected = e.target;
				treeWalker.selectRender();//将选中节点的背景样式修改
			});
		}
		//改删除按钮绑定函数，删除该节点及该节点下的所有子节点
		addEventHandler(deleteBtn,"click",function(){
			treeWalker.deleteHandler();
		});
		//给增加按钮绑定函数，在该节点的最后一个子节点后面增加
		addEventHandler(addBtn,"click",function(){
			treeWalker.addHandler();
		});
}
/**
 * 一颗树
 */
function TreeWalker(){
	this.stack = [];
	this.lastIndex;
	this.showNodes = [];
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
			if(children[i].nodeType==1){//获取节点的元素孩子节点，通过判断childNodes节点中的nodeType是否为1（div类型），有其他办法吗？？？？？、
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

TreeWalker.prototype.resetStyle = function(){
	if (this.lastSelected != null){
		this.lastSelected.style.background = "white";
	}
}
TreeWalker.prototype.selectRender = function(){
	var lastSelected = this.lastSelected;
	lastSelected.style.background = "red";
}
/**
 * delete的处理函数
 */
TreeWalker.prototype.deleteHandler = function(){
	var lastSelected = this.lastSelected;
	//获取选中节点的最后一个孩子节点
	var lastChild = lastSelected.lastElementChild;
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
	lastSelected.parentNode.removeChild(lastSelected);	
}
/**
 * 增加节点的处理办法
 */
TreeWalker.prototype.addHandler = function(){
	var lastSelected = this.lastSelected;
		nodeValue = document.getElementById("nodeAdd").value;
		showNodes = this.showNodes;
		index = null;
	//获取选中节点的最后一个孩子节点
	var lastChild = lastSelected.lastElementChild;
		className = lastChild.getAttribute("class");//获取子节点class的类型;考虑是否有子节点？？？
	//在数组中增加，在lastChild的后面增加
	for(var i=0;i<showNodes.length;i++){
		if(showNodes[i] == lastSelected){
			index = i;
			break;
		}
	}
	var div = document.createElement("div");
	div.innnerHTML = nodeValue;
	div.setAttribute("class",className+" show");
	lastSelected.appendChild(div);
	//在数组中插入
	showNodes.splice(i+1,0,div);
}


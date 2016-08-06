/**
 * 
 */
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
/**
 * 将NodeList转化为数组
 * @param collection
 * @returns {Array}
 */
function collectionToArray(collection){ 
	var ary = []; 
	for(var i=0, len = collection.length; i < len; i++){ 
	ary.push(collection[i]); 
	} 
	return ary; 
	}
/**
 * 将度转为弧
 * @param degrees
 * @returns {Number}
 */
function degreeToRadians(degrees){
	return (degrees * Math.PI)/180;
}
/**
 * 获取target
 * @param event
 * @returns
 */
function getTarget(event) {
    event = event || window.event;
    return event.target || event.srcElement;
};
/**
 * 表单验证
 */
window.onload = init;
function init(){
	var username = document.getElementById("username"),
	submitBtn = document.getElementById("submit1"),
	tipsSpan =  document.getElementById("tips"),
	usernameTxt = "";
	addEventHandler(submitBtn,"click",function(){
		usernameTxt = username.value.trim();
		if(validateUsername(usernameTxt)){
			tipsSpan.innerHTML = "验证通过";
			tipsSpan.setAttribute("class","successed");
		}
		else{
			tipsSpan.innerHTML = "验证失败";
			tipsSpan.setAttribute("class","error");
		}
	})
}
//function submitHandler(){
//	usernameTxt = username.value.trim();
//	if(validateUsername(usernameTxt)){
//		tipsSpan.innerHTML = "验证通过";
//		tipsSpan.setAttribute("class","successed");
//	}
//	else{
//		tipsSpan.innerHTML = "验证失败";
//		tipsSpan.setAttribute("class","error");
//	}
//}
/**
 * 4-16个字符 
 * 1.字符数为4~16位
2.每个英文字母、数字、英文符号长度为1
3.每个汉字，中文符号长度为2
 * @param text
 */
function validateUsername(text){
	var length = getLength(text);
	if( length > 3 && length < 17){
		return true;
	}
	else {
		return false;
	}
}
/**
 * 获得字符串长度，英文1 中文2
 * @param text
 */
function getLength(text){
	var len = text.length,
	i = 0,
	code,
	length = 0;
	for(i=0;i<len;i++){
		code = text.charCodeAt(i);
		if(code > 256){
			length += 2;
		}
		else{
			length++;
		}
	}
	return length;
	
}
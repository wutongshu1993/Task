/**
 * 表单验证
 */
window.onload = init;
function init(){
	var username = document.getElementById("username"),
	usernameTips = document.getElementById("usernameTips"),
	emailTips = document.getElementById("emailTips"),
	name = document.getElementById("name"),
	email = document.getElementById("email"),
	submitBtn = document.getElementById("submit1"),
//	tipsSpan =  document.getElementById("tips"),
	usernameTxt = "",
	nameTxt = '';
	addEventHandler(username, "focus", function(){
		showTips(usernameTips);
	});
	addEventHandler(username, "blur", function(){
		usernameTxt = username.value.trim();
		if(validateUsername(usernameTxt)){
			usernameTips.innerHTML = "验证通过";
			usernameTips.setAttribute("class","successed");
	}
	else{
		usernameTips.innerHTML = "验证失败";
		usernameTips.setAttribute("class","error");
	}
	});
	
	addEventHandler(email, "focus", function(){
		showTips(emailTips);
	});
	addEventHandler(email, "blur", function(){
		emailTxt = email.value.trim();
		if(validatEmail(emailTxt)){
			emailTips.innerHTML = "验证通过";
			emailTips.setAttribute("class","successed");
	}
	else{
		emailTips.innerHTML = "验证失败";
		emailTips.setAttribute("class","error");
	}
	});
	addEventHandler(submitBtn, 'click', function(){
		emailTxt = email.value.trim();
		usernameTxt = username.value.trim();
		if(validateUsername(usernameTxt)&& validatEmail(emailTxt) ){
			alert("验证通过");
		}
		else{
			alert("验证失败");
		}
	});
	/**
	 * 邮箱验证
	 */
	function validatEmail(text){
		var reg =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(reg.test(text)){
			return true;
		}
		else{
			return false;
		}
	}
	/**
	 * 显示id对应的提示字符串
	 */
	function showTips(id, text){
		if(text != null){
			id.innerHTML = text;
		}
		id.removeAttribute("hidden");
	}
//	addEventHandler(submitBtn,"click",function(){
//		usernameTxt = username.value.trim();
//		if(validateUsername(usernameTxt)){
//			tipsSpan.innerHTML = "验证通过";
//			tipsSpan.setAttribute("class","successed");
//		}
//		else{
//			tipsSpan.innerHTML = "验证失败";
//			tipsSpan.setAttribute("class","error");
//		}
//	})
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
	reg = /[u00-uff]/,
	i = 0,
	code,
	length = 0;
	for(i=0;i<len;i++){
		code = text.charCodeAt(i);
//		if(code > 256){
//			length += 2;
//		}
		if(reg.test(code)){
			length += 2;
		}
		else{
			length++;
		}
	}
	return length;
	
}
/**
 * 验证函数,先进行是否为空的判断，再进行是否满足正则表达式，最后验证是否规定字符数
 */
function validate(e) {
// var e = getTarget(elem);
var jsonType = JSON.parse(e.getAttribute("jsonType"));
    var isrequired = jsonType.setting1;
    var ruleSetting = jsonType.rule1;
    var length = jsonType.length1;
    //var tips = document.nextSibling;
    var tips = e.nextSibling;
var str = e.value.trim();
if (isrequired == "required"){//不能为空
    if(str == '' ){
        tips.innerHTML = "必填";
    }
    else {//不为空
        var reg;
        switch (ruleSetting){
            case "num":{
              reg = /^[0-9]*$/;
                if(!reg.test(str)){
                    tips.innerHTML = "请填入数字";
                }
                else {
                    tips.innerHTML = "符合规范";
                }
                break;
            }
            case "email":{
                reg =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if(!reg.test(str)){
                    tips.innerHTML = "请填入有效邮箱";
                }
                else {
                    tips.innerHTML = "符合规范";
                }
                break;
            }
            case "password":
            case "text":
                {
                var len = str.length;
                    var from = length.from;
                    var to = length.to;
                    if(len >= from && len <= to){
                        tips.innerHTML = "符合规范";
                    }
                    else{
                        tips.innerHTML = "请输入"+from+"-"+to+"个字符";
                    }
                    break;
            }
            default:
                break;
        }
    }
}
else{//可以为空
    tips.innerHTML = "选填";
    }

//insertAfter(tips, e);
}
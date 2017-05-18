/**
 * Created by lh on 2016/12/6.
 */
/*trim的实现*/
/*
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g,'');
}
var str = '    Mike, come here!   ';
// var r = new RegExp('(^\\s*)|(\\s*$)','g');
var newStr = str.trim();
console.log("---"+newStr +"----"+str);*/
//this的用法
var func = (function(a){
    this.a = a;
    return function (a) {
        a += this.a;
        return a;
    }
})(function (a, b){
    return a;
}(1, 2));
console.log(func(4));

/**
 * Created by lh on 2016/12/14.
 */
var Factoty = function (type, content) {
    if(this instanceof  Factoty){
        console.log(this.type);
        return new this[type](content);;
    }
    else {
        return new Factoty(type, content);
    }
}
Factoty.prototype = {
    Java : function (content) {
        this.content = content;
        console.log(content);
    },
    PHP : function (content) {
        this.content = content;
        console.log(content)
    }
}
var data = [
    {type : 'Java', content : 'java是世界上最好的语言'},
    {type : 'PHP', content : 'php是世界上最好的语言'}
]
 for(var i = 0; i < data.length; i++){
        Factoty(data[i].type, data[i].content);
 }
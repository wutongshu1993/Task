/**
 * Created by lh on 2016/12/19.
 */
//原型式继承
function inheritObject(o){
    function F() {

    }
    F.prototype = o;
    return new F();
}
//寄生式继承
function inheritPrototype(subClass, superClass) {
    var f = inheritObject(superClass);
    f.constructor = superClass;
    subClass.prototype = f;
}
//虚拟父类
var News = function () {
    this.children = [];
    this.element = null;
}
News.prototype = {
    init : function () {
        throw new Error("请重写你的方法");
    },
    add : function () {
        throw new Error("请重写你的方法");
    },
    getElement : function () {
        throw new Error("请重写你的方法");
    }

}
var Container = function (id, parent) {
    News.call(this);
    this.id = id;
    //模块的父容器
    this.parent = parent;
    //构建方法,当做是初始化吧
    this.init();
}
Container.prototype.init = function () {
    this.element = document.createElement('ul');
    this.element.id = this.id;
    this.className = 'new-container'
}
Container.prototype.add = function (child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
}
Container.prototype.getElement = function () {
    return this.element;
}
Container.prototype.show = function () {
    this.parent.appendChild(this.element);
}

//行成员集合
var Item = function (classname) {
    News.call(this);
    this.classname = classname || '';
    this.init();
}
inheritPrototype(Item, News)
Item.prototype.init = function () {
    this.element = document.createElement('li');
    this.element.className = this.classname;
}
Item.prototype.add = function () {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
}
Item.prototype.getElement = function () {
    return this.element;
}

var NewsGroup = function (classname) {
    News.call(this);
    this.classname = classname || '';
    this.init();
}
inheritPrototype(NewsGroup, News);
NewsGroup.prototype.init = function () {
    this.element = document.createElement('li');
    this.element.className = this.classname;
}
NewsGroup.prototype.add = function () {
    this.children.push(child);
    this.element.appendChild(child.getElement());
    return this;
}
NewsGroup.prototype.getElement = function () {
    return this.element;
}

var ImageNews = function (url, href, classname) {
    News.call(this);
    this.url = url;
    this.href = href;
    this.classname = classname || 'normal'
    this.init();
}
inheritPrototype(ImageNews, News);
ImageNews.prototype.init = function () {
    this.element = document.createElement("a");
    var img = new Image();
    img.src = this.url;
    this.element.appendChild(img);
    this.element.className = 'image-news'+this.classname;
    this.element.href = this.href;
}
ImageNews.prototype.getElement = function () {
    return this.element;
}
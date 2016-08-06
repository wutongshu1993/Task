/**
 * 
 */
window.onload = init;
function init(){
//	var canvas = document.getElementById("space");
//	var context = canvas.getContext("2d");
//	context.strokeStyle="green";
//	context.beginPath();
//	context.arc(500,400,150,0,2*Math.PI);
//	context.stroke();
	var commander = new Commander(),
		cmd = document.querySelector(".command"),
		signal = {};
		//创建飞船的监听事件
		addEventHandler(cmd,'click',function(e){
			var cmdBtn = getTarget(e);
			var parentNode = cmdBtn.parentNode;
			
			if(cmdBtn.id === "create"){
				for(var i=0;i<4;i++){//如何保证最多只能创建4个飞船???
					if(mediator.ships[i]==null){
						signal = {index:i,
								command:'create'}
						commander.command(signal);
						break;
					}
				}
			}
			else if(cmdBtn.tagName ==="BUTTON"){
				var cmdBtns = parentNode.querySelectorAll('button'),
					startBtn = cmdBtns[0],
				    stopBtn = cmdBtns[1],
					destoryBtn = cmdBtns[2],
					id,
					cmdBars = document.querySelectorAll('.cmd');
				    
				[].forEach.call(cmdBars, function(item, index, array){
					if(item == parentNode){
						id = index;
					}
				});
				/*for(var i=0;i<cmdBars.length;i++){
					if(cmdBars[i]==parentNode){
						id = i;
						break;
					}
				}
				*/
					if(cmdBtn === startBtn){
						signal = {index:id,
								command:'start'}
						commander.command(signal);
					}
					else if(cmdBtn === stopBtn){
						signal = {index:id,
								command:'stop'}
						commander.command(signal);
					}
					else if(cmdBtn === destoryBtn){
						cmd.removeChild(parentNode);
						signal = {index:id,
								command:'destory'}
						commander.command(signal);
					}
				}
				
				
				
			
			
			
		});
		

}
function AirShip(index){
	this.index = index;
	this.energe = 100;//初始能量值
	this.state = 0;//两个状态 0：停止 1：飞行
	this.consume = -5;//消耗速度
	this.speed = 2;//飞行速度
	this.charging = 5;//充电速度
	this.cmdBar;//控制块
	this.ship;//ship对应的dom对象
	this.interval;
	this.rotate = 0;
}
//动力系统
AirShip.prototype= {
	constructor : AirShip,	
	//创建
	create : function(){
		var command = document.querySelector(".command"),
			//对控制块初始化
			cmdBar = document.createElement("div"),
			tips = document.createElement("span"),
			startBtn = document.createElement("button"),
			stopBtn = document.createElement("button"),
			destoryBtn = document.createElement("button");
			tips.innerHTML = '对'+this.index+'号飞船命令';
			startBtn.innerHTML = '开始飞行';
			stopBtn.innerHTML = '停止飞行';
			destoryBtn.innerHTML = '销毁';
			cmdBar.appendChild(tips);
			cmdBar.appendChild(startBtn);
			cmdBar.appendChild(stopBtn);
			cmdBar.appendChild(destoryBtn);
			cmdBar.setAttribute('class','cmd');//每个飞船单独一个控制块
			command.appendChild(cmdBar);
			earth = document.querySelector(".earth");
			//生成飞船
			ship = document.createElement("div");
			ship.innerHTML = this.energe+'%';
			ship.className = 'ship'+this.index;
			earth.appendChild(ship);
			/////将飞船添加到DOM中////canvas怎么添加
			
			
			this.ship = ship;
			this.cmdBar = cmdBar;
			
	},
	//开始
	start:function(){
		var self = this;
		if(self.state == 1){
			return ;
		}
		self.state = 1;
		this.interval = setInterval(function(){
			//小于10 ，停止
			if(self.energe < 10){
				self.stop();
				return;
			}
			//飞行过程，能量减少
			self.energe += self.consume;
			self.rotate += self.speed;
			
			self.ship.innerHTML = self.energe + "%";
			
			if(self.rotate > 360){
				self.rotate = 0;
			}
			self.ship.style.webkitTransform = "rotate("+self.rotate+"deg)";
			self.ship.style.mozTransform    = "rotate("+self.rotate+"deg)";
			self.ship.style.msTransform     = "rotate("+self.rotate+"deg)";
			self.ship.style.oTransform      = "rotate("+self.rotate+"deg)";
			self.ship.style.transform       = "rotate("+self.rotate+"deg)";
		},500);
		
	},
	//停止
	stop : function(){
		var self = this;
		if(self.state == 0){
			return ;
		}
		self.state = 0;
		clearInterval(self.interval);
		self.interval = setInterval(function(){
			if(self.energe >= 100){
				self.energe = 100;
				self.ship.innerHTML = self.energe + "%";
				clearInterval(self.interval);
				return ;
			}
			self.ship.innerHTML = self.energe + "%";
			self.energe += self.charging;
		},500);
		
	},
	
	//信号处理系统，接收信号
	receive : function(signal){
		var self = this;
		//接收信号需要1s
		setTimeout(function(){
			if(signal.index == self.index){
				if(signal.command == 'start'){
					self.start();
				}
				else if(signal.command == 'stop'){
					self.stop();
				}
				else if(signal.command == 'destory'){
					self.destory();
				}
				else if(signal.command == 'create'){
					self.create();
				}
			}
		},1000);
		//需要判断这个命令是否是针对自己的
		
	},
	//销毁
	destory : function(){
		//页面删除
		var earth = document.querySelector(".earth");
		earth.removeChild(this.ship);
	}
}


//单例模式的中介者
var mediator = {
	//中介者需要知道自己应该给哪些飞船广播
	ships :[null,null,null,null],
	//向中介者中添加飞船
	addShip : function(ship,index){
		this.ships[index] = ship;
	},
	//中介者接收命令，并广播，（广播有30%的失效率）
	receive : function(signal){
		var ships = this.ships;
		console.log("publishing...");
		//创建飞船的时候，需要在中介者的ships里面增加飞船,需要先创建，再操作
		if(signal.command == 'create'){
			var ship = new AirShip(signal.index);
			this.addShip(ship, signal.index);
			//保证创建的时候，不受丢包率的影响
			for(i=0;i<ships.length;i++){
				if(ships[i] != null){
				ships[i].receive(signal);
				}
			}
		}
		else{
		this.publish(signal);
		//需要判断得到的命令是否是销毁，如果是，则需要更新ships中的状态,在publish命令之后销毁
		if(signal.command=='destory'){
			ships[signal.index] = null;
		}
		}
		
		
	},
	//需要模仿30%的失效率
	publish : function(signal){
		var randNum = Math.random()*100;
		var rate = 30;
		var i=0;
		var ships = this.ships;
		if(randNum > rate){
			for(i=0;i<ships.length;i++){
				if(ships[i] != null){
				ships[i].receive(signal);
				}
			}
			console.log(signal.command+"广播成功");
		}
		else{
			console.log(signal.command+"广播失败");
		}
	}
	
}
var Commander = function(){};
Commander.prototype.command = function(signal){
	//指挥官发出命令，中介者接收
	mediator.receive(signal);
}

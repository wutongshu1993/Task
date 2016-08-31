/**
 * 飞船，这个类不能写成构造函数模式，因为这样每个对象的方法都是不一样的 而应该考虑原型+构造函数模式 即：组合模式
 */
(function(window){
	var AirShip = function(index,  energeSystem, powerSystem){
		var self = this;
		
		this.index = index;
		this.energe = 100;//初始能量值
		this.state = 0;//两个状态 0：停止 1：飞行
		this.consume = energeSystem.consume;//消耗速度
		this.speed = energeSystem.speed;//飞行速度
		this.charging = powerSystem.charging;//充电速度
		this.cmdBar;//控制块
		this.ship;//ship对应的dom对象
		this.interval;
		this.rotate = 0;
	}
		/**
		 * 动力系统，飞行和停止
		 */
		AirShip.prototype={
		constructor : AirShip,
				energeSystem : {
					//self:this,
				start : function(that){
					var self = that;
					if(self.state == 1){
						return ;
					}
					self.state = 1;
					self.interval = setInterval(function(){
						//小于5 ，停止
						if(self.energe < 5){
							self.energeSystem.stop(self);
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
				stop : function(that){
					var self = that;
					if(self.state == 0){
						return ;
					}
					self.state = 0;
					clearInterval(self.interval);
					self.powerSystem.charging(self);//如果将self改为this，this指向energySystem
				}
		},
		/**
		 * 能源系统，包括充电
		 */
		powerSystem : {
				charging : function(that){
					var self = that;
					self.interval = setInterval(function(){
						if(self.energe < 100){
							self.energe += self.charging;
							self.ship.innerHTML = self.energe + "%";
						}
						else{
							self.energe = 100;
							self.ship.innerHTML = self.energe + "%";
							clearInterval(self.interval);
						}
					},500);
//					self.energe += self.charging;
//					if(self.energe < 100){
//						self.ship.innerHTML = self.energe + "%";
//						setTimeout(self.powerSystem.charging(), 500);
//					}
//					else{
//						self.energe = 100;
//						self.ship.innerHTML = self.energe + "%";
////						clearTimeout(timeout);
//					}
			}
		},
		//自毁系统
		destory : function(){
			//页面删除
			var earth = document.querySelector(".earth");
			earth.removeChild(this.ship);
		},
		//建立飞船
		create : function(){
			var self = this;
			var command = document.querySelector(".command"),
				//对控制块初始化
				cmdBar = document.createElement("div"),
				tips = document.createElement("span"),
				startBtn = document.createElement("button"),
				stopBtn = document.createElement("button"),
				destoryBtn = document.createElement("button"),
				ship = document.createElement("div");
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
				
				ship.innerHTML = this.energe+'%';
				ship.className = 'ship'+this.index;
				earth.appendChild(ship);
				/////将飞船添加到DOM中////canvas怎么添加
				
				
				this.ship = ship;
				this.cmdBar = cmdBar;
				
		
		},
		receive : function(digitSignal){
				//接收信号需要1s
			//接收信号后需要先解码
			var self = this;
			var signal = adapter.decode(digitSignal);
				setTimeout(function(){
					if(signal.index == self.index){
						if(signal.command == 'start'){
							self.energeSystem.start(self);
						}
						else if(signal.command == 'stop'){
							self.energeSystem.stop(self);
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
				
			
			}
		}
		
	
	window.AirShip = AirShip;
})(window);
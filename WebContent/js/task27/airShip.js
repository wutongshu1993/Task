/**
 * 飞船
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
		
		/**
		 * 动力系统，飞行和停止
		 */
		this.energeSystem = {
				start : function(){
					if(self.state == 1){
						return ;
					}
					self.state = 1;
					this.interval = setInterval(function(){
						//小于5 ，停止
						if(self.energe < 5){
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
					this.powerSystem.charging();
				}
		},
		/**
		 * 能源系统，包括充电
		 */
		this.powerSystem = {
				charging : function(){
					self.ennerge += self.charging;
					if(self.energe < 100){
						self.ship.innerHTML = self.energe + "%";
						setTimeout(self.powerSystem.charging(), 500);
					}
					else{
						self.energe = 100;
						self.ship.innerHTML = self.energe + "%";
						clearTimeout(timeout);
					}
			}
		},
		
		this.communication = {
				
		}
	}
})();
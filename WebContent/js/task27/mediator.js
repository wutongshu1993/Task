/**
 * mediator接收commander的命令，并广播给飞船
 */
(function(window){
	var mediator = {
	//中介者需要知道自己应该给哪些飞船广播
	ships : [null,null,null,null],
	//向中介者中添加飞船
	addShip : function(ship,index){
		this.ships[index] = ship;
	},
	//中介者接收命令，并广播，（广播有30%的失效率）
	receive : function(signal){
		var ships = this.ships,
			powerSystem =systemType.powerSystem,
			digitSig = '',
			command = '';
			energeSystem = systemType.energeSystem;
		
		console.log("publishing...");
		
		
		//智能传输二进制的命令，因此接收到命令的时候，需要先encode
		digitSig = adapter.encode(signal);
		//解析命令
//		command = digitSig.substring(4,8);
		
		
		//创建飞船的时候，需要在中介者的ships里面增加飞船,需要先创建，再操作
		if(signal.command == 'create'){
			//使用的是构造函数模式
			var ship = new AirShip(signal.index, energeSystem[signal.energe], powerSystem[signal.power]);
			this.addShip(ship, signal.index);
			//保证创建的时候，不受丢包率的影响
			for(i=0;i<ships.length;i++){
				if(ships[i] != null){
					ships[i].receive(digitSig);
				}
			}
		}
		else{
		this.publish(digitSig);
		//需要判断得到的命令是否是销毁，如果是，则需要更新ships中的状态,在publish命令之后销毁
		if(signal.command=='destory'){
			ships[signal.index] = null;
		}
		}
		
		
	},
	//新的 介质，失效率为10%，并且可以多次重试，但是可以多次尝试，一定会成功
	publish : function(signal){
		var randNum = Math.random()*100;
		var rate = 10;
		var i=0;
		var flag = 0;//是否成功发送 0：未成功， 1：成功
		var ships = this.ships;
		//多次尝试，直到发送成功为止
		while(flag == 0){
		if(randNum > rate){
			flag = 1;
			for(i=0;i<ships.length;i++){
				if(ships[i] != null){
				ships[i].receive(signal);
				}
			}
			console.log(signal+"广播成功");
		}
		else{
			console.log(signal+"广播失败,再次尝试");
		}
		}
	},
	
}
	window.mediator = mediator;
})(window);
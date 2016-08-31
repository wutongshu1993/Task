/**
 * 
 */
(function(window) {
	
	var cmd = document.querySelector(".command"),
		energe = 0,
		power = 0,
		signal = {};
	var systemType = {
		energeSystem : [ {
			type : "advanced",
			speed : 2,
			consume : -3
		}, {
			type : "pentium",
			speed : 4,
			consume : -5
		}, {
			type : "super",
			speed : 6,
			consume : -7
		}, ],
		powerSystem : [ {
			type : "powerful",
			charging : 3
		}, {
			type : "optical",
			charging : 4
		}, {
			type : "super",
			charging : 5
		}, ]
	};
	//创建飞船的监听事件
	addEventHandler(cmd,'click',function(e){
		var cmdBtn = getTarget(e);
		var parentNode = cmdBtn.parentNode;
		energe = $("input[name='energe']:checked ").val();
		power = $("input[name='power']:checked ").val();
//		energe = 0;
//		power = 0;
//		alert(energe);
		if(cmdBtn.id === "create"){
			for(var i=0;i<4;i++){//如何保证最多只能创建4个飞船???
				if(mediator.ships[i]==null){
					signal = {index : i,
							command : 'create',
							energe : energe,
							power : power}
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
	window.systemType = systemType;
})(window);
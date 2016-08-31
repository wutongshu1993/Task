/**
 * 
 */

//Adapter
(function(window){
	var Adapter = {
			
			//将信号转化为二进制
		encode : function(signal){
			var self = this;
			var index = signal.index.toString(2);
			index = self.format(4,index);//将1转化为0001；
			var command = signal.command;
			var digitSig = "";
			switch(command){
			case 'create':
				digtaSig = index+'0001';
				break;
			case 'start':
				digtaSig = index+'0010';
				break;
			case 'stop':
				digtaSig = index+'0011';
				break;
			case 'destory':
				digtaSig = index+'0100';
				break;
			}
			return digtaSig;
		},
		//将二进制信号转化为文字信号
		decode : function(digital){
			var id = parseInt(digital.substring(0,4),2);
			var command =digital.substring(4,8);
			var signal = {};
			switch (command){
			case '0001':
				command = "create";
				break;
			case '0010':
				command = "start";
				break;
			case '0011':
				command = "stop";
				break;
			case '0100':
				command = "destory";
				break;
			}
			signal.index = id;
			signal.command = command;
			return signal;
		},
		//将二进制转化为统一的格式，如4位二进制数 num:几位 str：数
		format : function(num, str){
			while(str.length < num){
				str = insertString(str, 0, '0');
			}
			return str;
		}
		
	};
	window.adapter = Adapter;
})(window);
		
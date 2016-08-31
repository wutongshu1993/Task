/**
 * commander发布命令
 */
(function(window){
	var commander = {
			command : function(signal){
				mediator.receive(signal);
			}
	};
	window.commander = commander;
})(window);
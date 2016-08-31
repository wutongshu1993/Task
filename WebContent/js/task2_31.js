/**
 * 
 */
window.onload = init;
function init(){
	var type = $("input[name='type']"),
	student =  document.querySelector(".student"),
	nonStudent =document.querySelector(".non_student"),
	select1 = document.getElementById("select1"),
	select2 = document.getElementById("select2"),
	typeValue = '',
	i = 0,
	len = 0,
	checked = false;
	for(i = 0, len = type.length; i<len; i++){
		addEventHandler(type[i], "click", function(e){
			checked = e.target.checked;
			typeValue = e.target.value;
			if(checked && typeValue == 'student'){
//				student.setAttribute("class","visible");
//				nonStudent.setAttribute("class","hidden");
				student.removeAttribute("hidden");
				nonStudent.setAttribute("hidden","hidden");
			}
			else if(checked && typeValue == 'non_student'){
				student.setAttribute("hidden","hidden");
				nonStudent.removeAttribute("hidden");
			}
		});
	};
	/**
	 * 为级联创造效果
	 */
	addEventHandler(select1, "change", function(e){
		var index = e.target.selectedIndex,
		select2 = document.getElementById("select2"),
		i = 0,
		len = 0,
		city = e.target.options[index].value;
		select2.innerHTML = '';
//		showSelect(select2, schools[index]);
		showSelect2(select2, data[city])
//		for(i = 0, len = citys.length; i<len; i++){
//			if(city == citys[i].value){
//				removeSelect(select2);
//				showSelect(select2, schools[i]);
//				break;
//			}
//		}
	});
	/**
	 * 移除下拉列表的所有选项
	 */
	function removeSelect(ele){
		var i = 0,
		len = 0;
		for(i = 0, len = ele.options.length; i< len; i++){
			ele.remove(0);
		}
	}
	/**
	 * 为下拉列表增添选项
	 */
	function showSelect(ele, array){
		var i = 0,
		option = null,
		fragment = document.createDocumentFragment(),
		len = 0;
		for(i = 0, len = array.length; i< len; i++){
			option = document.createElement("option");
			option.value = array[i].value;
			option.text = array[i].option;
			fragment.appendChild(option);
		}
		ele.appendChild(fragment);
	}
	function showSelect2(ele, array){
		var i = 0,
		option = null,
		fragment = document.createDocumentFragment(),
		len = 0;
		for(i = 0, len = array.length; i< len; i++){
			option = document.createElement("option");
			option.value = array[i];
			option.text = array[i];
			fragment.appendChild(option);
		}
		ele.appendChild(fragment);
	}
	//数据也可以这样表示
	var data = {
			'BJ' : ['清华大学', '北京大学'],
			'SC' : ['四川大学', '电子科技大学']
	};
	var citys = [ {
		value : 'BJ',
		option : '北京'
	}, {
		value : 'SC',
		option : '四川'
	} ];
	
	var schools1 = [ {
		value : 'qhdx',
		option : '清华大学'
	}, {
		value : 'bjdx',
		option : '北京大学'
	} ];
	var schools2 = [ {
		value : 'scdx',
		option : '四川大学'
	}, {
		value : 'dzkjdx',
		option : '电子科技大学'
	} ];
	var schools = [schools1, schools2];
	
	
	
}
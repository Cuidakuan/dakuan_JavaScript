             //自己定义一个移动函数move用来调用
				/*
				 参数
				   obj 要执行动画的对象
				   attr 要执行动画的样式 比如：left top width height
				   target 执行动画的目标位置
				   speed 移动的速度
				   callback 回调函数，这个函数将会在动画执行完毕后执行
				   
				   * */
				function move(obj, attr,target,speed,callback){
					//关闭上一个定时器
					clearInterval(obj.timer);
					
					//解决传值时的正负问题
					//获取元素的当前位置
					var current=parseInt(getStyle(obj,attr));
					/*
					 判断元素的正负值
					 0->800,speed 为正
					 800->0,speed 未负*/
					if(current>target){
						speed=-speed;
					}
					//box1动就是一直在修改left值
					//开启一个定时器
					//向执行动画的对象中添加一个timer属性，用来保存他自己的定时器的标识
					obj.timer=setInterval(function(){
						//获取box1旧值
						var oldValue=parseInt(getStyle(obj,attr));
						//在旧值的基础上增加
						var newValue=oldValue+speed;
						//判断newValue是否大于800
						//向左移动时，需要判断newValue是否小于target
						//向右移动时，需要判断newValue是否大于target
						if((speed<0&&newValue<target) || (speed>0&&newValue>target)){
							newValue=target;
						}
						//将新值设置给box1
						obj.style[attr]=newValue+"px";
						
						//当元素移动到800px时，停止
						if(newValue==target){
							clearInterval(obj.timer);
						//动画执行完毕调用回调函数
						callback&&callback();
						}
						
					},30);
				};
				
	    /*自己定义一个函数获取当前样式
	    * obj 要获取样式的元素
	    * name 要获取的样式名*/
	   	    function getStyle(obj,name){
	    	//正常浏览器
	    	//return getComputedStyle(obj,null)[name];
	    	if(window.getComputedStyle){
	    		return getComputedStyle(obj,null)[name];
	    	}
	    	else{
	    		return obj.currentStyle[name];
	    	}
	    	
			};	
				//定义一个函数，用来向中添加指定的class属性值
			/*参数
			 *   obj 要添加class属性的元素
			 *   cn  要添加的class值
			 */
			function addClass(obj, cn){
				//检查obj中是否含有cn
				if(!hasClass(obj,cn)){
					obj.className+=" "+cn;
				}
			}
			
			//判断一个元素中是否含有指定的元素值
			/*参数
			 * obj 
			 * cn
			 */
			function hasClass(obj,cn){
				//判断obj中有没有cn class
				//创建一个正则表达式
				//var reg =/\bb2\b/;
		       //构造函数
				var reg=new RegExp("\\b"+cn+"\\b");
				return reg.test(obj.className);
			}
			
			//删除一个元素指定的class
			function removeClass(obj,cn){
				//创建一个正则表达式
				var reg =new RegExp("\\b"+cn+"\\b");
				//删除class
				obj.className=obj.className.replace(reg," ");
			}
			 
			 /* 
			  * toggleClass可以用来切换一个类
			  * 有则删除
			  * 没有则添加
			  */
			function toggleClass(obj,cn){
				if(hasClass(obj,cn)){
				    removeClass(obj,cn);
				}else{
					addClass(obj,cn);
				}
			}
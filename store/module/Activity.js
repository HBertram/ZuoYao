//定义类
export default class Activity{

  // 类的静态方法,相当于Person.test = function(){console.log("类的静态方法");}
  static test() {
    console.log("类的静态方法");
    
  }

  //constructor构造函数
  constructor(name, value, desc = "", detail = "", attention = "", checked = false){
	this.id = 0;
    this.name = name;
    this.value = value;
	this.desc = desc;
	this.detail = detail;
	this.attention = attention;	
	this.checked = checked;
  }

  //类的一般方法,定义在实例对象的原型对象上,相当于Person.prototype.show = function(){console.log("this.name,this.age");}
  show(){
  }
}
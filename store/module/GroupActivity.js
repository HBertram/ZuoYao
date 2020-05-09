//定义类
export default class GroupActivity{

  // 类的静态方法,相当于Person.test = function(){console.log("类的静态方法");}
  static test() {
    console.log("类的静态方法");
  }

  //constructor构造函数
  constructor(name, type, activityList){
    this.name = name;
    this.activityList = activityList;
  }

  getValue() {
	  let lst = this.activityList.filter((o)=>o.checked).map((o)=>o.value)
	  return lst.length == 0 ? 0 : lst.reduce((i,j) => i+j)
  }
  
  getTotalValue() {
	  let lst = this.activityList.map((o)=>o.value)
	  return lst.length == 0 ? 0 : lst.reduce((i,j) => i+j)
  }

  //类的一般方法,定义在实例对象的原型对象上,相当于Person.prototype.show = function(){console.log("this.name,this.age");}
  show(){
  }
}
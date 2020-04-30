//定义类
export default class Chapter{

  // 类的静态方法,相当于Person.test = function(){console.log("类的静态方法");}
  static test() {
    console.log("类的静态方法");
    
  }
  //constructor构造函数
  constructor(type, title, groupActivityList = []){
    this.type = type;
    this.title = title;
    this.groupActivityList = groupActivityList;
    this.totalValue =  groupActivityList.map((o) => o.getTotalValue()).reduce((i,j)=> i+j);
  }
  
  getCheckedValue() {
	  return this.groupActivityList.map((o) => o.getValue()).reduce((i,j)=> i+j);
  }
  
  //类的一般方法,定义在实例对象的原型对象上,相当于Person.prototype.show = function(){console.log("this.name,this.age");}
  show(){
  }
}
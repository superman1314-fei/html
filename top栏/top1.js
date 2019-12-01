class Tab{
    constructor(options){
      options = options || {};
      this.itemClass = options.itemClass || '.item';
      this.eventType = options.eventType || 'mouseover';
      this.itemActiveClass = options.itemActiveClass || 'active';
      this.contentClass = options.contentClass || '.content';
      this.contentShowClass = options.contentShowClass || 'show';
      // 获取元素
      this.items = document.querySelectorAll(this.itemClass);
      this.contetns = document.querySelectorAll(this.contentClass);
  
      // 必然new了之后要有效果，需要调用addEvent方法实现
      this.addEvent();
    }
    // 封装方法
    // 注册事件
    addEvent(){
      // 注册事件
      this.items.forEach((e,i)=>{ // 这个地方要使用箭头幻术
        e.addEventListener(this.eventType,(e)=>{
          let target = e.target;// 这个就是我们点击的item
          // 切换分类
          this.changeItems(target);
          // 切换内容
          this.changeContent(i);
        })
      })
    }
    // 切换分类
    changeItems(current){
      // 把当前点击的那一个变红，把其他的变白
      this.items.forEach(e=>{
        e.classList.remove(this.itemActiveClass);
      })
      // 把点击的那一个变红
      current.classList.add(this.itemActiveClass);
    }
    // 切换内容
    changeContent(index){
      // 把所有的内容隐藏
      this.contetns.forEach(e=>{
        e.classList.remove(this.contentShowClass);
      })
      // 把对应的内容显示
      this.contetns[index].classList.add(this.contentShowClass);
    }
  }
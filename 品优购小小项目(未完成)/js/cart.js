$(function(){
  let arr=kits.loadData('cartListData');
  let html='';
  arr.forEach(e=>(
    html+=`<div class="item" data-id="${e.pID}">
    <div class="row">
      <div class="cell col-1 row">
        <div class="cell col-1">
          <input type="checkbox" class="item-ck" ${e.isChecked ? "checked":''}>
        </div>
        <div class="cell col-4">
          <img src="${e.imgSrc}" alt="">
        </div>
      </div>
      <div class="cell col-4 row">
        <div class="item-name">${e.name}</div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="price">${e.price}</em>
      </div>
      <div class="cell col-1 tc lh70">
        <div class="item-count">
          <a href="javascript:void(0);" class="reduce fl ">-</a>
          <input autocomplete="off" type="text" class="number fl" value="${e.number}">
          <a href="javascript:void(0);" class="add fl">+</a>
        </div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="computed">${e.number * e.price}</em>
      </div>
      <div class="cell col-1">
        <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
      </div>
    </div>
  </div>`
  ))
  $('.item-list').append(html);
  if(arr.length!=0){
    $('.empty-tip').hide();
    $('.total-of').show();
    $('.cart-header').show();
  };

  
 // 如果arr里面的数据不是全都勾选的，需要把全选的勾选去掉
let noCKAll=arr.find(e=>{
  return !e.isChecked;
});
// if(noCKAll){
//   // 判断有没有勾选产品
//   $('.pick-all').prop('checked',false);
// }
$('.pick-all').prop('checked',!noCKAll);
// 功能2点击全选和点选
$('.pick-all').on('click',function(){
  let status=$(this).prop('checked');
  $('.item-ck').prop('checked',status);
  $('.pick-all').prop('checked',status);
  // 把本地的数据都勾选
  arr.forEach(e=>{
    e.isChecked=status;
  })
  // 重新存进数据
  kits.saveData('cartListData',arr);
  calcTotal();

})
// 实现点选
$('.item-list').on('click','.item-ck',function(){
      // 如果勾选的个数和总个数一致 = 全选
    
      let ckall = $('.item-ck').length === $('.item-ck:checked').length;
      // 设置全选的状态和ckall一致就行
      $('.pick-all').prop('checked', ckall);
      // $('.pick-all').prop('checked', ckall);
       // 点选的同时，要修改该多选框对应的本地数据里面的选中状态
    // 需要根据点选的商品的id，到本地数据中，修改 isChecked 属性
    let pID = $(this).parents('.item').attr('data-id');
    let isChecked = $(this).prop('checked');
    
    
    arr.forEach(e=>{
      if(e.pID == pID){
         // 就需要把当前这个产品的选中状态改成和勾选状态一致

         e.isChecked = isChecked;
      }
    });
    kits.saveData('cartListData',arr);
    calcTotal();
})
// 封装一个计算总价格和总件数的函数，方便每次使用就调用
function calcTotal(){
    // 第三个功能： 计算总价和总件数
    // 每次需要计算总价和总件数，都是直接从本地数据里面，得到 isChecked 为true的数据，然后计算总价和总件数
    let totalCount=0;//总件数
    let totalMoney=0;//总价格
    arr.forEach(e=>{
      if(e.isChecked){
        totalCount+=e.number;
        totalMoney+=e.number*e.price;
      }
    })
    // 把总件数和总价格更新到页面中
    $('.selected').text(totalCount);
    $('.total-money').text(totalMoney);
}
// 需要一开始就调用一下
calcTotal();

  // 第三个功能 - 实现数量的加减
  // 用委托实现加号
  $('.item-list').on('click','.add',function(){
          // 让 输入框里面的 数量增加
    let prev=$(this).prev();
    let current =prev.val();
    prev.val(++current);
    // 数量也要更新到本地数据
    let id = $(this).parents('.item').attr('data-id');
    let obj=arr.find(e=>{
      return e.pID==id;
    });
    // 把current变成数据里面number的
    obj.number=current;
    //把数据存到本地存储里面
    kits.saveData('cartListData',arr);
    // 更新总价格
    calcTotal();
      // 更新右边的走价
  $(this).parents('.item').find('.computed').text(obj.number*obj.price);

  })

// 减号
$('.item-list').on('click','.reduce',function(){
  
    // 让 输入框里面的 数量减少
    let next=$(this).next();
    let current=next.val();
    // 用户交互
    // 判断是否等于一
    if(current<=1){
    alert(' 商品不能少于1');
    return;
    }
    next.val(--current);
    // 数量也要更新到本地数据
    let id = $(this).parents('.item').attr('data-id');
    let obj=arr.find(e=>{
      return e.pID==id;
    });
    // 把current变成数据里面number的
    obj.number=current;
    //把数据存到本地存储里面
    kits.saveData('cartListData',arr);
    // 更新总价格
    calcTotal();
      // 更新右边的走价
  $(this).parents('.item').find('.computed').text(obj.number*obj.price);

});
  // 当得到焦点的时候，把当前的值，先保存 起来，如果失焦的时候输入的结果是不合理的，我们可以恢复原来的数字
$('.item-list').on('focus','.number',function(){
    // 把旧的，正确的数量先存储起来
    let old=$(this).val();
    $(this).attr('data-old',old);
});
  // 当输入框失去焦点的时候，需要把当前的值也同步到本地数据里面
  $('.item-list').on('blur','.number',function(){
    // 跟加减的操作是一样的，只不过我们需要对用户的输入进行验证
    let current=$(this).val();
     // 每次让用户自己输入的内容，一定要做合法性判断
     if(current.trim().length===0||isNaN(current)||parseInt(current)<=0){
       let old=$(this).attr('data-old');
       // 如果用户输入的不正确，恢复以前的正确的数字
       $(this).val(old);
       alert('商品数量不正确，请输入阿拉伯数字');
       return;
     }
  // 如果验证通过，把总价之类数据更新即可
  // 数量也要更新到本地数据
  let id = $(this).parents('.item').attr('data-id');
  let obj=arr.find(e=>{
    return e.pID==id;
  });
  // 把current变成数据里面number的
  obj.number=current;
  //把数据存到本地存储里面
  kits.saveData('cartListData',arr);
  // 更新总价格
  calcTotal();
    // 更新右边的走价
$(this).parents('.item').find('.computed').text(obj.number*obj.price);
});


// 实现删除
$('.item-list').on('click','.item-del',function(){
  layer.confirm('你确定要删除吗?', {icon: 0, title:'提示'}, (index)=>{
    layer.close(index);
    // 在这里执行 删除的逻辑
    // 先得到要删除的数据的id
    let id = $(this).parents('.item').attr('data-id');
  // 把当前点击的这个删除对应的这一行删掉
    $(this).parents('.item').remove();
      // 还要把本地存储里面的数据删除
      arr=arr.filter(e=>{
        return e.pID!=id;
      });
      kits.saveData('cartListData',arr);
      // 重新更新总件数和总价
      calcTotal();
  });
})



})
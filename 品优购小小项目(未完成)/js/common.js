// 把页面顶上的购物车的气泡实现
let arr = kits.loadData('cartListData');
let total = 0;
arr.forEach(e=>{
  total += e.number;
})
$('.count').text(total);
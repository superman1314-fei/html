$(()=>{
    // 获取id
let id = location.search.substring(4);

// 第一种方式
//到数组里面把对应的id数据获取出来
// phoneData.forEach(function(e){
//     if(e.pID==id){
//         console.log(e); 
        
//     }
// })
//第二种方式
//从数组获取指定条件元素的方法
let target = phoneData.find(e=>{
    //返回你的条件
    return e.pID ==id
    
});
// 改价格
$('.summary-price em').text(`￥${target.price}`);
// 改名字
$('.sku-name').text(target.name);
// 改图片
$('.preview-img>img').attr('src',target.imgSrc)
// 如果还有别的地方要改(找数据要)

})
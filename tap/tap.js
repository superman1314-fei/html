/** 
 * 注册轻机操作的函数
 * @param{Element}e 绑定tap事件的元素
 *  @param{Function}callback 事件处理程序
 *  @param{Number}spanTime 轻机操作的时限
 *  @param{Number}distance 轻机操作的距离
 * @return{undefined}
*/
function tap(e,callback,spanTime,distance,){
    spanTime = spanTime||250;
    distance=distance||50;
    let startTime;
let startX,startY;
// 注册开始事件
e.addEventListener('touchstart',function(e){
    if(e.touches.length!==1){
        console.log('不是单指操作');
        return;
    }
    // 记录点下的时间
      startTime = Date.now();
    // 记录开始的位置
    startX = e.touches[0].screenX;
    startY = e.touches[0].screenY;
  
    // console.log(e.touches[0]);
    })

// 注册结束事件
e.addEventListener('touchend',function(e){
    // 在触摸结束事件里面只能使用changedTouches结束事件
    if(e.changedTouches.length!==1){
        console.log('不是单指操作');
        return;
    }
    let endTime = Date.now();  
    if(endTime-startTime>spanTime){
        console.log('按下的时间太长了');
        return;
        
    }
    // 判断松手的位置
    let endX=e.changedTouches[0].screenX;
    let endY= e.changedTouches[0].screenY;
    // 判断距离，但是要忽略方向，使用最大值
    if(Math.abs(endX-startX)>distance || Math.abs(endX-startX) >distance){
        console.log('太远了');
        return;
    }
    // 以上的条件不成立，就是tap操作
    // console.log('轻机');
    callback();
})
}
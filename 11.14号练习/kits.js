function formatDate(){
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var d = now.getDate();
  var h = now.getHours();
  var mm = now.getMinutes();
  var s = now.getSeconds();
  return y + '-' + patchZero(m) + '-' + patchZero(d) + ' ' + patchZero(h) + ":" + patchZero(mm) + ':' + patchZero(s);
}

function patchZero(v){
  return v < 10 ? '0' + v : v;
}
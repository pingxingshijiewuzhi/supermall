       // 放抖动效果debounce
export function debounce(func,delay){
  let timer = null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

export function formatDate(date, fmt) {
  // 1.获取年份
  // y
  // y+ -> 1个或者多个y
  // y* -> 0个或者多个y
  // y？ ->0个或者1个y

  // 2019输入几个yyyy就显示几位年数
  // yy - 19 
  // yyyy - 2019
  // yyy - 019
  // 判断是否传入的参数fmt是否有y，有几个？

  // 喵喵喵，妙不可言
  if (/(y+)/.test(fmt)) {
    // RegExp.$1 这里拿到就是传入的几个yyy,RegExp.$1.length可以判断传入的个数
    // 把传入的个数给substr做截取
    // 如果传入三个y，那么4-3=1，即从年份中去除第一个数，返回剩余三位数年份替换三个yyy
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+ '').substr(4-RegExp.$1.length))
  }

  // 因为年份和其余不一样处理方式，所以分开处理
  let O = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in O) {
    // 这里是ES6语法，怎么砸没有``情况下用${}呢
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = O[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
    
  }
    return fmt;
  };

    function padLeftZero(str) {
      return ('00' + str).substr(str.length);
    }
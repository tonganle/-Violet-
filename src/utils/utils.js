/* eslint-disable */

import crypto from 'crypto';

export { getCookie, setCookie, setMd5, isPlaintObject, getNowTime, toString, timestamp, concat, trimStr, checkPwd, upDigit,deepCopyObj };

function getCookie(name) {
  if (document.cookie.length > 0) {
    var start = document.cookie.indexOf(name + '=');
    if (start !== -1) {
      start = start + name.length + 1;
      var end = document.cookie.indexOf(';', start);
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
}

function setCookie(name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) + (expiredays === null ? '' : ';expires=' + exdate.toGMTString());
}

function setMd5(val) {
  var md5 = crypto.createHash('md5');
  md5.update(val);
  var md5pwd = md5.digest('hex');
  var md5pwds = md5pwd.slice(8, 24);
  return md5pwds;
}

function isPlaintObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function toString(sth) {
  if (sth === 0) {
    return '0';
  } else {
    return sth ? sth.toString() : sth;
  }
}

// 接口加时间戳
function timestamp(url) {
  //  var getTimestamp=Math.random();
  var getTimestamp = new Date().getTime();
  if (url.indexOf('?') > -1) {
    url = url + '&timestamp=' + getTimestamp;
  } else {
    url = url + '?timestamp=' + getTimestamp;
  }
  return url;
}

// 多个数组组合去重
function concat(arr1, arr2, arr3) {
  if (arguments.length <= 1) {
    return false;
  }
  var concat_ = function (arr1, arr2) {
    let arr = arr1.concat();
    for (let i = 0; i < arr2.length; i++) {
      arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
    }
    return arr;
  };
  var result = concat_(arr1, arr2);
  for (var i = 2; i < arguments.length; i++) {
    result = concat_(result, arguments[i]);
  }
  return result;
}
// type 类型 年月日 ，data:今天距离前后多少天，around：前还是后传递0，获取今天之前的信息，传递1获取今天之后的信息，0|1类型是数字。
function getNowTime(type, data, around) {
  var time = new Date();
  if (type === 'day') {
    if (around) {
      time.setDate(time.getDate() + data);
    } else {
      time.setDate(time.getDate() - data);
    }
  } else if (type === 'month') {
    if (around) {
      time.setMonth(time.getMonth() + data);
    } else {
      time.setMonth(time.getMonth() - data);
    }
  } else if (type === 'year') {
    if (around) {
      time.setFullYear(time.getFullYear() + data);
    } else {
      time.setFullYear(time.getFullYear() - data);
    }
  }
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var min = time.getMinutes()
  var s = time.getSeconds()
  y < 10 ? y = '0' + y : y
  m < 10 ? m = '0' + m : m
  d < 10 ? d = '0' + d : d
  h < 10 ? h = '0' + h : h
  min < 10 ? min = '0' + min : min
  s < 10 ? s = '0' + s : s
  var t = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
  return t;
}
/*去除空格*/
//  type 1-所有空格  2-前后空格  3-前空格 4-后空格
function trimStr(str, type) {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, "");
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s*)/g, "");
    case 4:
      return str.replace(/(\s*$)/g, "");
    default:
      return str;
  }
}
/*检测密码强度*/
//checkPwd('12asdASAD')
//3(强度等级为3)
function checkPwd(str) {
  var nowLv = 0;
  if (str.length < 6) {
    return "等级为" + nowLv
  };
  if (/[0-9]/.test(str)) {
    nowLv++
  };
  if (/[a-z]/.test(str)) {
    nowLv++
  };
  if (/[A-Z]/.test(str)) {
    nowLv++
  };
  if (/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im.test(str)) {
    nowLv++
  };
  return "等级为" + nowLv;
}

/*现金额大写转换*/
//upDigit(168752632)
//"人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
//upDigit(1682)
//"人民币壹仟陆佰捌拾贰元整"
//upDigit(-1693)
//"欠人民币壹仟陆佰玖拾叁元整"
function upDigit(n, type) {
  var fraction = ['角', '分', '厘'];
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  var head;
  switch (type) {
    case 0:
      head = n < 0 ? '欠人民币' : '人民币';
      break
    case 1:
      head = n < 0 ? '欠美元' : '美元';
      break

    case 2:
      head = n < 0 ? '欠欧元' : '欧元';
      break

    default:
      head = n < 0 ? '欠人民币' : '人民币';
  }
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}


/** 
 *     深度对象拷贝
 *   
 */
function deepCopyObj(obj){
  if(typeof obj != 'object'){
      return obj;
  }
  var newObj = {};
  for(var attr in obj){
      newObj[attr] = deepCopyObj(obj[attr]);
  }
  return newObj;
}
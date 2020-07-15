/* eslint-disable */


export { maxArr, minArr, sumArr, covArr,getEleCount,getCount};



/*数组最大值最小值*/
//这一块的封装，主要是针对数字类型的数组
function maxArr(arr) {
  return Math.max.apply(null, arr);
}
function minArr(arr) {
  return Math.min.apply(null, arr);
}


/*数组求和，平均值*/
//这一块的封装，主要是针对数字类型的数组
//求和
function sumArr(arr) {
  var sumText = 0;
  for (var i = 0, len = arr.length; i < len; i++) {
    sumText += arr[i];
  }
  return sumText;
}
//平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
function covArr(arr,num) {
  num = num || 2
  var sumText = sumArr(arr);
  var covText = (sumText / arr.length).toFixed(num);
  return covText;
}
/*返回数组（字符串）出现的次数*/
//getEleCount('asd56+asdasdwqe','a')
//3

function getEleCount(obj, ele) {
  var num = 0;
  for (var i = 0, len = obj.length; i < len; i++) {
    if (ele == obj[i]) {
      num++;
    }
  }
  return num;
}
/*返回数组（字符串）出现最多的元素和次数*/
//arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
//getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])默认情况，返回所有元素出现的次数
//getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)传参（rank=3），只返回出现次数排序前三的
//getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)传参（ranktype=1,rank=null），升序返回所有元素出现次数
//getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
function getCount(arr, rank, ranktype) {
  var obj = {};
  var k, arr1 = [];
  //记录每一元素出现的次数
  for (var i = 0, len = arr.length; i < len; i++) {
    k = arr[i];
    if (obj[k]) {
      obj[k]++;
    } else {
      obj[k] = 1;
    }
  }
  //保存结果{el-'元素'，count-出现次数}
  for (var o in obj) {
    arr1.push({
      el: o,
      count: obj[o]
    });
  }
  //排序（降序）
  arr1.sort(function (n1, n2) {
    return n2.count - n1.count
  });
  //如果ranktype为1，则为升序，反转数组
  if (ranktype === 1) {
    arr1 = arr1.reverse();
  }
  var rank1 = rank || arr1.length;
  return arr1.slice(0, rank1);
}

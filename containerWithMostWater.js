//能围最大水量的问题（https://www.bilibili.com/video/BV1y34y1v78b?p=63）
//https://leetcode.com/problems/container-with-most-water/
//给定一个正数数组，以数组中每个值的大小作为边界
//现在取数组中其中两个值来围水，水量 = 边界大小 * 两个值索引差的大小
//返回能够围出最大水量

//解题思路
//以数组[3,4,8,7,2,6]为例
//准备左指针l(0)和右指针(arr.length - 1)
//对于两指针处的值，谁小谁往中间移动并同时计算出此时的围水量，直至两指针相遇
//最后返回那个最大的水量值

function containerWithMostWater1(arr){
    let res = 0;
    let l = 0;
    let r = arr.length - 1;
    while (l < r){
        //Math.min(arr[l],arr[r])取两边界的较小值
        //Math.min(arr[l],arr[r]) * (r - l)计算此时的围水量
        //Math.max(res, Math.min(arr[l],arr[r]) * (r - l))取最后最大的围水量
        res = Math.max(res, Math.min(arr[l],arr[r]) * (r - l));
        if(arr[l] < arr[r])
            l++;
        else
            r--;
    }
    return res;
}

console.log(containerWithMostWater1([3,4,8,7,2,6]));

//对数器
//测试方法
function containerWithMostWater(arr){
    let res = 0;
    let n = arr.length;
    for(let i = 0; i < n; i++){
        for(let j = i + 1; j < n; j++)
            res = Math.max(res,Math.min(arr[i],arr[j]) * (j - i));
    }
    return res;
}

//产生随机数组
function randomArr(maxLength,maxValue){
    let arr = new Array(maxLength);
    for(let i = 0; i < arr.length; i++){
        arr[i] = Math.ceil(Math.random() * maxValue);
    }
    return arr;
}
//复制数组
function copyArr(arr){
     let copiedArr = new Array(arr.length);
     for(let i = 0; i < arr.length; i++)
         copiedArr[i] = arr[i];
     return copiedArr;
}

function main(){
    let testTime = 500000;
    let maxLength = 20;
    let maxValue = 50;
    console.log("测试开始！");
    for(let i = 0; i < testTime; i++){
        let arr = randomArr(maxLength,maxValue);
        let copiedArr = copyArr(arr);
        let res1 = containerWithMostWater1(arr);
        let res2 = containerWithMostWater(copiedArr);
        if(res1 !== res2){
            console.log("测试失败！");
            break;
        }
    }
    console.log("测试成功！")
}
main();
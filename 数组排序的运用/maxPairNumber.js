//能同时比赛的最多场次问题(https://www.bilibili.com/video/BV1y34y1v78b?p=55&spm_id_from=pageDriver)
//给定一个数组arr,代表每个人的能力值,再给定一个非负数k.
//如果两个人的能力差值刚好为k,那么可以凑在一起比赛,一局比赛只有两个人
//返回最多可以同时有多少场比赛

//解题思路
//窗口，贪心
//先将数组进行排序，然后准备l(0)和r(0)指针作为窗口的左右边界
//如果l === r,直接r++;如果l处的值与r处的值的差值刚好等于k,结果res++,并记录此时r处被使用过的值，l++,r++,
//如果l处的值与r处的值的差值不等与k,r++,如果r到终点了，l++
function maxPairNumber1(arr,k){
    if(k < 0 || arr === null || arr.length < 2)
        return 0;
//    对arr进行排序
    arr.sort((a,b)=>{
        return a - b;
    });
    let res = 0;
    let n = arr.length;
    //窗口的左边界
    let l = 0;
//    窗口的右边界
    let r = 0;
    //记录符合条件时已经使用过的r处的值
    let usedR = [];
    while(l < n && r < n){
        let isIn = false;
        for(let i = 0; i < usedR.length; i++){
            if(l === usedR[i])
                isIn = true;
        }
        if(isIn)
            l++;
        else if(l >= r)
            r++;
        else{
            let distance = arr[r] - arr[l];
            if(distance === k){
                res++;
                usedR.push(r++);
                l++;
            }else if(distance < k)
                r++;
            else
                l++;
        }
    }
    return res;
}

// console.log(maxPairNumber1([3,1,5,7,0,8,10],2))

//归并排序的运用？？？

//对数器
//测试方法
//暴力解法，贪心，全排列
function maxPairNumber(arr,k){
    if(k < 0)
        return -1;
    return process(arr,0,k);
    function process(arr,index,k){
        let res = 0;
        if(index === arr.length){
            for(let i = 1; i < arr.length; i += 2){
                if(arr[i] - arr[i - 1] === k)
                    res++;
            }
        }else{
            for(let r = index; r < arr.length; r++){
                swap(arr,index,r);
                res = Math.max(res, process(arr,index + 1, k));
                swap(arr,index,r);
            }
        }
        return res;
        function swap(arr,i,j){
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}
// console.log(maxPairNumber([3,6,5,4,0,8,10],2))

//产生随机数组
function randomArr(maxLength,maxValue){
    let arr = [];
    for(let i = 0; i < maxLength; i++)
        arr[i] = Math.ceil(Math.random()*maxValue);
    return arr;
}

//复制数组
function copyArr(arr){
    if(arr === null)
        return;
    let copyArr = [];
    for(let i = 0; i < arr.length; i++)
        copyArr[i] = arr[i];
    return copyArr;
}

// console.log(copyArr([1,2,3]))
function main(){
    let testTime = 50;
    let maxLength = 10;
    let maxValue = 10;
    let maxK = 5;
    console.log("测试开始！");
    for(let i = 0; i < testTime; i++){
        let Arr = randomArr(maxLength,maxValue);
        let copiedArr = copyArr(Arr);
        // console.log(copiedArr);
        let k = Math.ceil(Math.random() * maxK);
        let res1 = maxPairNumber1(Arr,k);
        let res2 = maxPairNumber(copiedArr,k);
        if(res1 !== res2){
            console.log("测试失败！");
            console.log(Arr,k,res1);
            console.log(res2);
            break;
        }
    }
    console.log("测试结束！")
}
main()
//子数组的最大累加和（https://www.bilibili.com/video/BV1y34y1v78b?p=57&spm_id_from=pageDriver）
//返回一个数组的子数组最大累加和
function subArrayMaxSum1(arr){
    if(arr === null || arr.length === 0)
        return -1;
    let n = arr.length;
    //记录当前数前面子数组的最大累加和
    let pre = arr[0];
    //记录整个数组的最大子数组累加和（最后的返回值）
    let max = pre;
    for(let i = 1; i < n; i++){
        // //当前数本身形成的累加和
        // let p1 = arr[end];
        // //当前数加前面子数组最大累加和形成的累加和
        // let p2 = pre + arr[end];
        // max = Math.max(max,Math.max(p1,p2));
        // pre = Math.max(p1,p2);
    //    等价于
        pre = Math.max(arr[i],arr[i] + pre);
        max = Math.max(max,pre);
    }
    return max;
}

// console.log(subArrayMaxSum1([12,13,0,-1,-2,3,5]))

function subArrayMaxSum2(arr){
    if(arr === null || arr.length === 0)
        return -1;
    let n = arr.length;
    let max = Number.MIN_SAFE_INTEGER;
    for(let l = 0; l < n; l++){
        for(let r = l; r < n; r++){
            let sum = 0;
            for(let i = l; i <= r; i++){
                sum += arr[i];
            }
            max = Math.max(max,sum);
        }
    }
    return max;
}

//对数器
//测试方法
function subArrayMaxSum(arr){
    if(arr === null || arr.length === 0)
        return -1;
    let max = Number.MIN_SAFE_INTEGER;
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        if(sum < 0 && arr[i] > sum){
            sum = arr[i];
        }else
            sum += arr[i];
        max = Math.max(sum,max);
    }
    return max;
}
//产生随机数组
function randomArr(maxLength,maxValue){
    let randomArr = [];
    for(let i = 0; i < maxLength; i++)
        randomArr[i] = Math.ceil(Math.random() * maxValue);
    return randomArr;
}

function main(){
    let testTime = 2000;
    let maxLength = 30;
    let maxValue = 30;
    console.log("测试开始！")
    for(let i = 0; i < testTime; i++){
        let arr = randomArr(maxLength,maxValue);
        let res1 = subArrayMaxSum1(arr);
        let res2 = subArrayMaxSum2(arr);
        let res = subArrayMaxSum(arr);
        if(res1 !== res){
            console.log("测试失败！");
            break;
        }
    }
    console.log("测试结束！")
}
main()
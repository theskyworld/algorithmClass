//最长递增子序列问题（https://www.bilibili.com/video/BV1y34y1v78b?p=65&spm_id_from=pageDriver）
//https://leetcode.com/problems/longest-increasing-subsequence
//给定一个整数数组序列，返回该序列的最长递增子序列（不要求连续）

//解题思路
//O(N^2)
//例如整数数组[4,1,3,2,3,9,5,6]
//准备一个数组表dp，记录arr中每个以i位置的数结尾能得到的最长递增子序列
//现在填写dp中的值
//i从0出发，不断递增至终点，i=0时的dp值为1，从i=1开始，i位置的dp值=i位置左边所有小于i位置的值处中dp值的最大值+1
//最后返回dp中的最大值

//O(N*logN)
//准备一个数组表end，记录end表中长度为i+1的递增子序列arr中的最小值
//现填写end表
//例如arr=[3,2,1,2,3,0,4,6,2,7]
//则对于该arr，相对应的最后end=[0,2,3,4,6]
//i                         0 1 2 3 4
//end中值的含义为
//例如i=0时的0，表示当递增子序列的长度为i+1=1时，arr中能取的最小值为0；
//i=1时的2，表示当递增子序列的长度为i+1=2时，arr中能取的最小值为2
//....
//填写end表：从左到右遍历arr，将以i位置处的值填到end中以该值结尾能得到的最大递增子序列的长度值处，
// 如果遇到同一长度值，则如果此时i处的值更小的话可以覆盖前一个值

function lengthOfLIS1(arr){
    if(arr === null || arr.length === 0)
        return 0;
    let end = new Array(arr.length);
    end[0] = arr[0];
    let right = 0;
    let l = 0,r = 0,m = 0,res = 1;
    for(let i = 1; i < arr.length; i++){
        l = 0;
        r = right;
        while(l <= r){
            m = (l + r) >> 1;
            if(arr[i] > end[m])
                l = m + 1;
            else
                r = m - 1;
        }
        right = Math.max(right,l);
        end[l] = arr[i];
        res = Math.max(res,l + 1);
    }
    return res;
}

//对数器
//测试方法
function lengthOfLIS(arr){
    if(arr === null || arr.length === 0)
        return 0;
    let n = arr.length;
    let dp = new Array(arr.length);
    dp[0] = 1;
    let res = 1;
    for(let i = 0; i < n; i++){
        dp[i] = 1;
        let preMax = 0;
        for(let j = 0; j < i; j++){
            if(arr[j] < arr[i]){
                preMax = Math.max(preMax,dp[j]);
            }
        }
        dp[i] = Math.max(dp[i],preMax + 1);
        //取dp中的最大值
        res = Math.max(res,dp[i])
    }
    return res;
}

//产生随机数组
function randomArr(maxLength,maxValue){
    let arr = new Array(maxLength);
    for(let i = 0; i < arr.length; i++)
        arr[i] = Math.ceil(Math.random() * maxValue);
    return arr;
}
//复制数组
function copyArr(arr){
    let copiedArr = new Array(arr.length);
    for(let i = 0; i < arr.length; i++)
        copiedArr[i] = arr[i];
    return arr;
}

function main(){
    let testTime = 5000;
    let maxLength = 50;
    let maxValue = 100;
    console.log("测试开始！");
    for(let i = 0; i < testTime; i++){
        let arr1 = randomArr(maxLength,maxValue);
        let res1 = lengthOfLIS1(arr1);
        let arr = copyArr(arr1);
        let res = lengthOfLIS(arr);
        if(res1 !== res){
            console.log("测试失败！");
            break;
        }
    }
    console.log("测试成功！")
}
main();
//分发糖果问题（https://www.bilibili.com/video/BV1y34y1v78b?p=58&spm_id_from=pageDriver）
// https://leetcode-cn.com/problems/candy/?utm_source=LCUS&utm_medium=ip_redirect&utm_campaign=transfer2china
//n个孩子站成一排，同时给定一个数组arr表示每个孩子的评分
//按以下要求分发糖果
//1.每个孩子最少分到1颗糖果
//2.相邻两个孩子评分更高的孩子得的糖果更多
//现在给每个孩子分发糖果，返回需要准备的最少糖果数目

//解题思路
//1.使用辅助数组
//先从左到右遍历一遍数组，i=0位置的糖果数初始为1，
//对于从i=0之后的每个位置的数，如果i位置的数大于i-1位置的数，则该位置分发的糖果数相对于i位置的++，如果等于则不变，如果小于则回1
//再从右到左遍历一边数组，i=arr.length-1位置的糖果数初始为1
//对于从i=arr.length-1之前的每个位置的数，如果i-1位置的数大于i位置的数，则该位置分发的糖果数相对于i位置的++，如果等于则不变，如果小于则回1
//然后对于每个位置两次分发的糖果数取较大值得到最终的分发糖果数
//最后将每个位置的最终分发糖果数进行累加得到最后的返回值
function candy1(ratings){
    if(ratings === null || ratings.length === 0)
        return 0;
    let n = ratings.length;
    let res = 0;
//    从左到右遍历
//    记录分发糖果数
    let leftArr = [];
    //初始每个人糖果数为0
    for(let i = 0; i < n; i++)
        leftArr[i] = 0;
    for(let i = 1; i < n; i++){
        if(ratings[i - 1] < ratings[i])
            leftArr[i] = leftArr[i - 1] + 1;
    }
    console.log(leftArr);
//    从右到左遍历
//    记录分发的糖果数
    let rightArr = [];
    for(let i = 0; i < n; i++)
        rightArr[i] = 0;
    for(let i = n - 2; i >= 0; i--){
        if(ratings[i] > ratings[i + 1])
            rightArr[i] = rightArr[i + 1] + 1;
    }
    console.log(rightArr);
    for(let i = 0; i < n; i++)
        res += Math.max(leftArr[i],rightArr[i]);
    return res + n;
}

// console.log(candy1([1,1,2,3,3,1,2,4,1,3,2]));
// console.log(candy1([1,2,3,5,4,2,1,3,4,6,5,2,0]))

//不使用辅助数组，原地遍历
function candy2(ratings){
    if(ratings === null || ratings.length === 0)
        return 0;
    let index = nextMinIndex(ratings,0);
    let res = rightCandies(ratings,0,index++);
    let lBase = 1;
    let next = 0;
    let rCandies = 0;
    let rBase = 0;
    while(index !== ratings.length){
        if(ratings[index] > ratings[index - 1]){
            res += ++lBase;
            index++;
        }else if(ratings[index] < ratings[index - 1]){
            next = nextMinIndex(ratings,index - 1);
            rCandies = rightCandies(ratings,index - 1,next++);
            rBase = next - index + 1;
            res += rCandies + (rBase > lBase ? -lBase : -rBase);
            lBase = 1;
            index = next;
        }else{
            res += 1;
            lBase = 1;
            index++;
        }
    }
    return res;
    function nextMinIndex(arr,start){
        for(let i = start; i !== arr.length - 1; i++){
            if(arr[i] <= arr[i + 1])
                return i;
        }
        return arr.length - 1;
    }
    function rightCandies(arr,left,right){
        let n = right - left + 1;
        return n + n * (n - 1) / 2;
    }
}


function candy(arr){
//    先不考虑存在相邻重复值的情况
//    参考数组：[1,2,3,5,4,2,1,3,4,6,5,2,0]
//    第一区域
//    找该区域最大值的索引
    //该区域的起始索引值
    let res = 0;
    let startI1 = 0;
    let hereMaxIndex = 0;
    //记录每个区域被处理的总元素个数
    let used = 0;
    for(let i = startI1; i + (used - 1) < arr.length; i += (used - 1)){
        console.log(i);
        for(let j = i; j < arr.length; j++){
            if(arr[j] > arr[j - 1 ] && arr[j] > arr[j + 1]){
                hereMaxIndex = j;
                break;
            }
        }
        // console.log(hereMaxIndex)
//    计算该区域最大值索引前小于该最大值且连续递增数的总个数
        let beforeSmallIndexSum = 0;
        for(let j = i; j < hereMaxIndex; j++){
            if(arr[j] < arr[j + 1])
                beforeSmallIndexSum++;
        }
        // beforeSmallIndexSum = hereMaxIndex;
        // console.log(beforeSmallIndexSum)
//    因为连续递增，所以前面部分的总糖果数为1 + 2 + 3 + 4 +.。。+ beforeSmallIndexSum
        let beforeCandySum = 0;
        for(let i = 1; i <= beforeSmallIndexSum; i++)
            beforeCandySum+=i;
//    且最大的糖果数为
        let beforeMaxCandyNum = beforeSmallIndexSum;

//    计算该区域最大值索引后小于该最大值且连续递减数的总个数
        let afterSmallIndexSum = 1;
        for(let j = hereMaxIndex + 1; j < arr.length; j++){
            if(arr[j] > arr[j + 1])
                afterSmallIndexSum++;
            //    一旦不递减了就结束
            if(arr[j] < arr[j + 1])
                break;
        }
        // console.log(afterSmallIndexSum);
//    因为连续递减，所以后面部分总的糖果数为（从右往左）1 + 2 +3 + 4 +。。。 + afterSmallIndexSum
        let afterCandySum = 0;
        for(let i = 1; i <= afterSmallIndexSum; i++)
            afterCandySum+=i;
//    且最大的糖果数为
        let afterMaxCandyNum = afterSmallIndexSum;

//    根据两边的较大值确定hereMaxIndex处的糖果数
        let hereMaxIndexCandyNum = Math.max(beforeMaxCandyNum + 1, afterMaxCandyNum + 1);
//    第一区域总的糖果数
        res += beforeCandySum + hereMaxIndexCandyNum + afterCandySum + 1;
        // console.log(res)
        used = beforeSmallIndexSum + afterSmallIndexSum + 1;
        // console.log(used)
    }
    // res = res - 1;
    // return res;
//    第二区域
//    起始索引值
//     let startI2 = hereMaxIndex + afterSmallIndexSum;
//     console.log(startI2)

}

candy([1,2,3,5,4,2,1,3,4,6,5,2,0,3,4,5,2,1,3,6,3]);
//超级洗衣机问题（https://www.bilibili.com/video/BV1y34y1v78b?p=70）
//https://leetcode.com/problems/super-washing-machines/
//给定一个数组arr表示每台洗衣机中衣服的数量
//现在需要使得每台洗衣机中衣服的数量都相等，并且每轮只能向相邻的洗衣机中均分一件衣服
//返回最少需要几轮

//单点思维解法
//求出在数组中每个位置进行分析时的结果，然后对所有的结果取其中最后的返回值——例如字串、子数组、接雨水问题
//创建指针i(0)表示数组中每个值的位置，i++
//在每个i位置处进行分析：求出最后均分衣服时，每台洗衣机中衣服的数量：sum(arr) / arr.length
//                   求出i位置处左侧所有洗衣机中为达到均分衣服的需求多或少的衣服数量
//                   求出i位置处右侧侧所有洗衣机中为达到均分衣服的需求多或少的衣服数量
//计算a和b的方法：sum(arr) - sum(i左），sum(arr) - sum(i右)
//则
//      左侧      i位置     右侧
//      -a件               +b件         此时的结果为至少需要Math.max(a,b)轮
//      +b件               -a件         此时的结果为至少需要Math.max(a,b)轮
//      +a件               +b件         此时的结果为至少需要Math.max(a,b)轮
//      -a件               -b件         此时的结果为至少需要a + b轮
//最后当计算出每个i位置的结果后，返回所有结果中的最大值

function superWashingMachines(arr){
    if(arr === null || arr.length === 0)
        return 0;
    //洗衣机的总数量
    let num = arr.length;
    //总的衣服数量
    let sum = 0;
    arr.forEach(value=>{return sum += value});
    //始终无法均分衣服的情况
    if(sum % num !== 0)
        return -1;
    //均分之后每台洗衣机中衣服的数量
    let avg = sum / num;
    let leftSum = 0;
    let res = 0;
    for(let i = 0; i < arr.length; i++){
        //i左侧衣服多或少的总数量
        let leftDif = leftSum - i * avg;
        //i右侧衣服多或少的总数量
        let rightDif = (sum - leftSum - arr[i]) - (num - i - 1) * avg;
        //      -a件               -b件         此时的结果为至少需要a + b轮
        if(leftDif < 0 && rightDif < 0)
            //最外层的Math.max表示对所有的res取最大值
            res = Math.max(res,Math.abs(leftDif) + Math.abs(rightDif));
            //      -a件               +b件         此时的结果为至少需要Math.max(a,b)轮
           //      +b件               -a件         此时的结果为至少需要Math.max(a,b)轮
          //      +a件               +b件         此时的结果为至少需要Math.max(a,b)轮
        else
            res = Math.max(res,Math.max(Math.abs(leftDif),Math.abs(rightDif)));
        leftSum += arr[i];
    }
    return res;
}

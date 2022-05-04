//步骤和问题（https://www.bilibili.com/video/BV1y34y1v78b?p=66&spm_id_from=pageDriver）
//定义一个概念step sum
//例如680 680 + 68 + 6 = 754,则此时的754是680的step sum
//给定一个整数num，判断它是不是某个数的step sum

//单调性解法，二分
//如果一个数num1 > num2，则num1的步骤和也会 > num2的步骤和
//对数字1 - num之间进行二分，如果存在一个数的步骤和是num则直接返回true，否则小于则往左二分，大于则往右二分

function isStepSum(num){
    let l = 0, r = num, m = 0, cur = 0;
    while(l <= r){
        //二分的中间点
        m = l + ((r - l) >> 1);
        // console.log(m)
        //判断当前的num是否是一个数的步骤和
        cur = process(m);
        if(cur === num){
            //打印出num是那个数的步骤和
            console.log(m);
            return true;
        }
        else if(cur < num)
            l = m + 1;
        else
            r = m - 1;
    }
    return false;
    //计算一个数的步骤和
    function process(n){
        let stepSum = 0;
        while(n !== 0){
            stepSum += n;
            n = Math.floor(n / 10);
        }
        return stepSum;
    }
}

console.log(isStepSum(754))

// stepSum + 754 + 75 + 7
//754 / 10 = 75.4
//75.4 / 10 = 7.54
//谷歌面试题（https://www.bilibili.com/video/BV1y34y1v78b?p=69&spm_id_from=pageDriver）
// 面值为1~10的牌组成一组，
// 每次你从组里等概率的抽出1~10中的一张
// 下次抽会换一个新的组，有无限组
// 当累加和<17时，你将一直抽牌
// 当累加和>=17且<21时，你将获胜
// 当累加和>=21时，你将失败
// 返回获胜的概率

//解题思路
//当抽到的累加和>=17且<21时，获胜的概率为1.0
//当抽到的累加和>=21时，获胜的概率为0.0
//当抽到的累加和<17时，获胜的概率 = 抽到的面值的累加和的概率（抽到每张牌的概率的累计和）
//                           = 抽到的面值的累加和 / 每组的牌数（10）

function NCardsABWin(){
    return process(0);
    function process(curSum){
        //当累加和>=17且<21时
        if(curSum >= 17 && curSum < 21)
            return 1.0;
        //当累加和>=21时
        if(curSum >= 21)
            return 0.0;
        // 当累加和<17时
        let win = 0.0;
        for(let i = 0; i <= 10; i++)
            win += process(curSum + i);
        //抽到当前面值的概率
        return win / 10;
    }
}

// 谷歌面试题扩展版
// 面值为1~N的牌组成一组，
// 每次你从组里等概率的抽出1~N中的一张
// 下次抽会换一个新的组，有无限组
// 当累加和<a时，你将一直抽牌
// 当累加和>=a且<b时，你将获胜
// 当累加和>=b时，你将失败
// 给定的参数为N，a，b，返回获胜的概率

//暴力解法
function NCardsABWinMore(N,a,b){
    //参数不合法时
    //逻辑不对，导致无法抽牌，或者累加和比较的区间不对时
    if(N < 1 || a >= b || a < 0 || b < 0)
        return 0.0;
    //就算不抽牌，但是通过给定的N,a和b就能获胜时
    if((b - a) >= N)
        return 1.0;

//    参数合法时，并且b - a < N
    return process(0,N,a,b);
    function process(curSum,N,a,b){
        //当累加和>=a且<b时
        if(curSum >= a && curSum < b)
            return 1.0;
        //当累加和>=b时
        if(curSum >= b)
            return 0.0;
        // 当累加和<a时
        let win = 0.0;
        for(let i = 0; i <= N; i++)
            win += process(curSum + i,N,a,b);
        //抽到当前面值的概率
        return win / N;
    }
}

//求累计和的优化(不进行枚举求累加和，根据规律和计算得出)
//部分1
//当抽到的面值累加和始终 < a时（面值累加和始终不会出现因 > a导致赢得概率为1甚至0的情况）
//f(curSum)表示累加和为curSum时抽N张牌获胜的总概率
//假定N = 4,f(6) = a, f(7) = b, f(8) = c, f(9) = d
//则f(5) = (a + b + c + d) / 4
//现求f(4)
//f(4) = (f(5) + f(6) + f(7) + f(8)) / 4
//     = ((a + b + c + d) / 4 + a + b + c) / 4
//4(f(4)) = (a + b + c + d + 4a + 4b + 4c) / 4
//        = (a + b + c + d + 4(4(f(5)) - f(9))) / 4
//   f(4) = ((a + b + c + d) / 4 + 4f(5) - f(9)) / 4
//        = (f(5) + f(5) * 4 - f(9)) / 4
//即f(curSum) = (f(curSum + 1) + f(curSum + 1) * N - f(curSum + N + 1)) / N
//部分2
//当抽到的面值和可能会 > a时
//1.当curSum = a - 1时，f(curSum) = (b - a) / N
//2.当curSum > a - 5 且 < a - 1时，f(curSum) = (f(curSum + 1) + f(curSum + 1) * N)) / N

function NCardsABWinMore1(N,a,b){
    if(N < 1 || a >= b || a < 0 || b < 0)
        return 0.0;
    //就算不抽牌，但是通过给定的N,a和b就能获胜时
    if((b - a) >= N)
        return 1.0;
    return process(0,N,a,b);
    function process(curSum,N,a,b){
        if(curSum >= a && curSum < b)
            return 1.0;
        if(curSum >= b)
            return 0.0
        let win = 0;
        // 当curSum = a - 1时
        if(curSum === a - 1)
            return (b - a) / N;
        // 当curSum > a - 5 且 < a - 1时
        win = process(curSum + 1,N,a,b) + process(curSum + 1,N,a,b) * N
        //当抽到的面值累加和始终 < a时
        if(curSum + 1 + N < b)
            win -= process(curSum + 1 + N,N,a,b);
        return win / N;
    }
}

//NCardsABWinMore1的动态规划
function NCardsABWinMore2(N,a,b){
    if(N < 1 || a >= b || a < 0 || b < 0)
        return 0.0;
    if((b - a) >= N)
        return 1.0;
    let dp = new Array(b);
    for(let i = a; i < b; i++)
        dp[i] = 1.0;
    if(a - 1 >= 0)
        dp[a - 1] = ((b - a) / N)
    for(let curSum = a - 2; curSum >= 0; curSum--){
        let win = dp[curSum + 1] + dp[curSum + 1] * N;
        if(curSum + 1 + N < b)
            win -= dp[curSum + 1 + N];
        dp[curSum] = win / N;
    }
    return dp[0];
}

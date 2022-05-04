//布尔表达式的期待方法数（https://www.bilibili.com/video/BV1y34y1v78b?p=68&spm_id_from=pageDriver）
// https://leetcode-cn.com/problems/boolean-evaluation-lcci/
//给定一个布尔表达式字符串s
//s由0、1、&、|和^组成，并且偶数位置一定为0或者1，奇数位置一定为运算符号
//先通过向s中添加()的方法来实现指定的表达式运算得到结果result
//返回能够得到result（true或者false）的方法数

//范围尝试模型
//准备变量m(1)，i的值始终为奇数，作为每次向左右进行划分的中间值
//最后总的方法数的计算
//1.如果i位置的运算符号为&，并且result = true，如果左侧result为ture返回的方法数为a,右侧result为true返回的方法数为b,则最后的结果res=a*b;
//                                  false，如果左true=a,左false=b;右true=c,右false=d,最后的结果res = a*d + b*c


//记忆化搜索法，暴力方法（二分递归）的基础上添加dp二维表
function booleanEvaluation1(s,result){
    if(s === null || s === "")
        return 0;
//    字符串转ascii码数组
    let sArr = new Array(s.length);
    for(let i = 0; i < sArr.length; i++)
        sArr[i] = s[i].charCodeAt(0);
    let n = sArr.length;
    //dp二维表
    //dp表中存的结果
    class Info{
        constructor(t,f) {
            this.t = t;
            this.f = f;
        }
    }
    let dp = new Array(n).fill().map(()=>{return new Array(n).fill(null)});
    let allRes = process(sArr,0,sArr.length - 1,dp);
    // console.log(allRes);
    return result === 1 ? allRes.t : allRes.f;
    //l、r为进行划分时每个区间的左右边界
    function process(sArr,l,r,dp){
        //直接使用dp表中已保存的结果（dp表最右下角的值）
        if(dp[l][r] !== null)
            return dp[l][r];
    //    result为true时的最后方法数
        let t = 0;
    //    result为false时的最后方法数
        let f = 0;
        //递归终止的时候
        //当l-r之间只存在一个数字（0或者1）时
        if(l === r){
            t = sArr[l] === "1".charCodeAt(0) ? 1 : 0;
            f = sArr[l] === "0".charCodeAt(0) ? 1 : 0;
        }else{
            //m为划分的中间值，从1开始，且所处的位置始终是运算符号的位置（奇数位）
            for(let m = l + 1; m < r; m += 2){
                //取左边的结果
                let leftRes = process(sArr,l,m - 1, dp);
                //取右边的结果
                let rightRes = process(sArr,m + 1,r,dp);
                //左边结果为true时的方法数
                let a = leftRes.t;
                let b = leftRes.f;
                let c = rightRes.t;
                let d = rightRes.f;
                switch (String.fromCodePoint(sArr[m])){
                    case "&":
                        t += a * c;
                        f += b * c + b * d + a * d;
                        break;
                    case "|":
                        t += a * c + a * d + b * c;
                        f += b * d;
                        break;
                    case '^':
                        t += a * d + b * c;
                        f += a * c + b * d;
                        break;
                }
            }
        }
    //    向dp表中添加新的结果
        dp[l][r] = new Info(t,f);
        //返回最后的结果(dp表最右下角的值)
        return dp[l][r];
    }
}

// console.log(booleanEvaluation("0&0&0&1^1|0",1))


function booleanEvaluation2(s,result){
    if(s === null || s === "")
        return 0;
    let sArr = new Array(s.length);
    for(let i = 0; i < sArr.length; i++)
        sArr[i] = s[i].charCodeAt(0);
    let n = sArr.length;
//    准备三维数组dp
    let dp = new Array(2).fill().map(()=>{return new Array(n).fill().map(()=>{return new Array(n).fill(0)})});
    // console.log(dp)
    //result为false时的结果
    dp[0][0][0] = sArr[0] === "0".charCodeAt(0) ? 1 : 0;
    //result为true时的结果
    dp[1][0][0] = dp[0][0][0] ^ 1;
    //m从2开始
    for(let m = 2; m < sArr.length; m += 2){
        //result为false时的结果
        dp[0][m][m] = sArr[m] === "1".charCodeAt(0) ? 0 : 1;
        //result为true时的结果
        dp[1][m][m] = sArr[m] === "0".charCodeAt(0) ? 0 : 1;
        for(let j = m - 2; j >= 0; j -= 2){
            for(let k = j; k < m; k +=2){
                if(String.fromCodePoint(sArr[k + 1]) === "&"){
                    dp[1][j][m] += dp[1][j][k] * dp[1][k + 2][m];
                    dp[0][j][m] += (dp[0][j][k] + dp[1][j][k]) * dp[0][k + 2][m] + dp[0][j][k] * dp[1][k + 2][m];
                }else if(String.fromCodePoint(sArr[k + 1]) === "|"){
                    dp[1][j][m] += (dp[0][j][k] + dp[1][j][k]) * dp[1][k + 2][m] + dp[1][j][k] * dp[0][k + 2][m];
                    dp[0][j][m] += dp[0][j][k] * dp[0][k + 2][m];
                }else {
                    dp[1][j][m] += dp[0][j][k] * dp[1][k + 2][m] + dp[1][j][k] * dp[0][k + 2][m];
                    dp[0][j][m] += dp[0][j][k] * dp[0][k + 2][m] + dp[1][j][k] * dp[1][k + 2][m];
                }
            }
        }
    }
    return dp[result][0][n - 1];
}

// console.log((booleanEvaluation2("0&0&0&1^1|0",1)))
//对数器
//产生随机字符串s
function randomS(maxLength){
    let arr1 = ["0","1"]
    let arr2 = ["&","|","^"];
    let s = "";
    for(let j = 0, i = 1; j < maxLength - 1, i < maxLength; j += 2, i +=2){
        s += arr1[Math.floor(Math.random() * 2)];
        s += arr2[Math.floor(Math.random() * 3)];
    }
    return s;
}

// console.log(randomS(10))
//复制字符串
function copyS(s){
    let copiedS ="";
    for(let i = 0; i < s.length; i++)
        copiedS += s[i];
    return copiedS;
}

// console.log(copyS("0&0&0&1^1"))
//测试方法，暴力解
function booleanEvaluation(s,result){
    if(s === null || s === "")
        return 0;
    let sArr = new Array(s.length);
    for(let i = 0; i < sArr.length; i++)
        sArr[i] = s[i].charCodeAt(0);
    return process(sArr,0,sArr.length - 1,result);
    function process(sArr,l,r,result){
        if(l === r){
            if(sArr[l] === "1".charCodeAt(0))
                return result;
            else
                return result ^ 1;
        }
        let res = 0;
        //计算result = 1时的总结果
        if(result === 1){
            for(let m = l + 1; m < r; m += 2){
                switch (String.fromCodePoint(sArr[m])){
                    case "&":
                        res += process(sArr,l,m - 1,1) * process(sArr,m + 1,r,1);
                        break;
                    case "|":
                        res += process(sArr,l,m - 1,1) * process(sArr,m + 1,r,0);
                        res += process(sArr,l,m - 1,0) * process(sArr,m + 1,r,1);
                        res += process(sArr,l,m - 1,1) * process(sArr,m + 1,r,1);
                        break;
                    case "^":
                        res += process(sArr,l,m - 1,1) * process(sArr,m + 1,r,0);
                        res += process(sArr,l,m - 1,0) * process(sArr,m + 1,r,1);
                        break;
                }
            }
            //计算result = 0时的总结果
        }else{
            for(let m = l + 1; m < r; m += 2){
                switch (String.fromCodePoint(sArr[m])){
                    case "&":
                        res += process(sArr,l,m - 1,0) * process(sArr,m + 1,r,1);
                        res += process(sArr,l,m - 1,1) * process(sArr,m + 1,r,0);
                        res += process(sArr,l,m - 1,0) * process(sArr,m + 1,r,0);
                        break;
                    case "|":
                        res += process(sArr,l,m - 1,0) * process(sArr,m + 1,r,0);
                        break;
                    case "^":
                        res += process(sArr,l,m - 1,1) * process(sArr,m + 1,r,1);
                        res += process(sArr,l,m - 1,0) * process(sArr,m + 1,r,0);
                        break;
                }
            }
        }
        return res;
    }
}
// console.log(booleanEvaluation("0&0&0&1^1|0",1))

function main(){
    let testTime = 5000;
    let maxLength = 15;
    console.log("测试开始！");
    for(let i = 0; i < testTime; i++){
        let length = Math.ceil(Math.random() * maxLength);
        let s = randomS(length);
        let s1 = copyS(s);
        let result = Math.floor(Math.random() * 2);
        let res = booleanEvaluation(s,result);
        let res1 = booleanEvaluation1(s1,result);
        // let res1 = booleanEvaluation2(s1,result);
        if(res !== res1){
            console.log("测试失败!");
            break;
        }
    }
    console.log("测试成功！")
}
main()
// //生成含默认值数组的方式——arr.fill()
// const arr = new Array(5).fill("默认值");
// //生成含默认值矩阵的方式——arr.fill().map()
// //一个5*5的矩阵
// const matrix = new Array(5).fill().map(()=>new Array(5).fill('默认值'))


//字符串交错组成问题（https://www.bilibili.com/video/BV1y34y1v78b?p=59&spm_id_from=pageDriver）
//https://leetcode-cn.com/problems/interleaving-string/
//给定三个字符串：s1,s2和s3
//同时定义字符串交错组成的方式：
//例如字符串t1 = "aabcc",t2 = "dbbca",t3 = "aadbbcbcac"是前两个字符串其中一种的交错组成方式
//先需要判断s3是否是s1和s2交错组成的字符串

//解题思路
//样本对应模型
//准备一个二维数组，字符串s1 = "aaabsk" 和 s2 = "aacfk" 以及 s3 = "aaacaabfskk"
//s1的长度  0     1      2      3      4      5       6
//s    0   T     T      T
//2    1
//的   2
//长   3
//度   4
//     5
//随机连续取还是按次序连续取？？？？
//矩阵中填值：连续取s1的长度为0以及s2的长度为0，能否拼出s3的0连续长度
//          连续取s1的长度为1以及s2的长度为0，能否拼出s3的1连续长度
//          连续取s1的长度为2以及s2的长度为0，能否拼出s3的2连续长度
//          。。。。。
//          连续取s2的长度为0以及s1的长度为0，能否拼出s3的0连续长度
//          连续取s2的长度为1以及s1的长度为0，能否拼出s3的1连续长度
//          连续取s2的长度为1以及s1的长度为0，能否拼出s3的2连续长度
//每一行及每一列中只要其中一个位置出现了false,该行/列之后就全为false

function isInterleave1(s1,s2,s3){
    if(s1 === null || s2 === null || s3 === null)
        return false;
    if(s3.length !== s1.length + s2.length)
        return false;
    let s1Arr = [];
    for(let i = 0; i < s1.length; i++)
        s1Arr[i] = s1[i].charCodeAt(0);
    let s2Arr = [];
    for(let i = 0; i < s2.length; i++)
        s2Arr[i] = s2[i].charCodeAt(0);
    let s3Arr = [];
    for(let i = 0; i < s3.length; i++)
        s3Arr[i] = s3[i].charCodeAt(0);
    let dp = [[]];
    //初始化矩阵
    for(let i = 0; i <= s1Arr.length; i++){
        dp[i] = [];
        for(let j = 0; j <= s2Arr.length; j++){
            dp[i][j] = 0;
        }
    }
    dp[0][0] = true;
    // console.log(dp)
    for(let i = 1; i <= s1Arr.length; i++){
        if(s1Arr[i - 1] !== s3Arr[i - 1])
            break;
        dp[i][0] = true;
    }
    for(let j = 1; j <= s2Arr.length; j++){
        if(s2Arr[j - 1] !== s3Arr[j - 1])
            break;
        dp[0][j] = true;
    }
    for(let i = 1; i <= s1Arr.length; i++){
        for(let j = 1; j <= s2Arr.length; j++){
            if(
                s1Arr[i - 1] === s3Arr[i + j - 1] && dp[i - 1][j]
                ||
                s2Arr[j - 1] === s3Arr[i + j - 1] && dp[i][j - 1]
            ){
                // console.log(i,j);
                dp[i][j] = true;
            }
        }
    }
    return dp[s1Arr.length][s2Arr.length];
}

// console.log(isInterleave1("aaabsk","aacfk","aaacaabfskk"))


//
function isInterleave(s1,s2,s3){
        let m = s1.length, n = s2.length, o = s3.length;

        if(m + n !== o) return false;
        //矩阵大小: (m + 1)*(n + 1)
        const memo = new Array(m + 1).fill().map(()=> new Array(n + 1).fill(null));
        // console.log(memo);
        const check = (i,j,k)=>
        {
            if(memo[i][j] !== null) return memo[i][j];
            if(k === o) return true;
            let isValid = false;
            if(i < m && s1[i] === s3[k]){
                isValid = check(i+1,j,k+1);
            }
            if(j < n && s2[j] === s3[k]){
                isValid = isValid || check(i,j+1,k+1);
            }
            return memo[i][j] = isValid;
        }
        return check(0,0,0);
}

console.log(isInterleave("aaa","acddc","asdsacdf"));


//编辑距离问题（https://www.bilibili.com/video/BV1y34y1v78b?p=61&spm_id_from=pageDriver）
//https://leetcode-cn.com/problems/edit-distance/
//给定字符串s1和s2
//现假定由s1变为s2的方式存在保留、删除、添加和替换四种
//四种方式的代价分别为0,a,b,c
//返回由s1变为s2的最少代价

//解题思路
//样本模型，使用矩阵
//例如字符串s1 = "aab151" 和s2 = "a1b51"
//矩阵(dp)中值的含义
//取s1 i的长度和s2 j的长度时s1变为s2的最小代价，则最右下角(取s1 6和s2 5的长度)的值就是最后的返回值
//取s1的长度(i)  0     1      2      3      4      5       6
//取       0    0     b      2b    3b     4b     5b      6b
//s        1    a
//2        2    2a
//的       3    3a
//长       4    4a
//度       5    5a
//(j)
//则对于矩阵中其他位置值的求法为
// 根据字符串最后一个位置来划分情况
// 可能性1：s1的长度大于s2: dp[i - 1][j] + b
// 取s1的长度为i - 1，s2的长度为j时，先通过矩阵计算出由s1前i-1个字符变为s2的最小代价，然后再减去s1多余的那最后一个字符的代价(代价为b)
//可能性2：s1的长度小于s2: dp[i][j - 1] + a
// 取s1的长度为i，s2的长度为j - 1时，先通过矩阵计算出由s1前i个字符变为s2前j - 1个字符的最小代价，然后再加上s2多余的那最后一个字符的代价（代价为a）
//可能性3：s1和s2的最后一个字符相同: dp[i - 1][j - 1]
//通过矩阵计算出取s1前i - 1个字符变为s2前j - 1个字符的最小代价即可，s1和s2最后一个字符相同，保留即可，代价为0
//可能性4：s1和s2的最后一个字符不相同: dp[i - 1][j - 1] + c
//通过矩阵计算出取s1前i - 1个字符变为s2前j - 1个字符的最小代价，然后再将s1的最后一个字符替换成s2的最后一个字符，代价为c

function minEditCost1(s1,s2,a,b,c){
    if(s1 === null || s2 === null)
        return 0;
//    将字符串转为ascii码数组
    let s1Arr = new Array(s1.length);
    for(let i = 0; i < s1Arr.length; i++)
        s1Arr[i] = s1[i].charCodeAt(0);
    let s2Arr = new Array(s2.length);
    for(let i = 0; i < s2Arr.length; i++)
        s2Arr[i] = s2[i].charCodeAt(0);
    // console.log(s1Arr);
//    矩阵行的索引个数
    let l = s1Arr.length + 1;
//    矩阵列的索引个数
    let r = s2Arr.length + 1;
//    矩阵
    let dp = new Array(r).fill().map(()=>new Array(l).fill(0));
    // console.log(dp);
//    填写矩阵第一行的值
    for(let i = 1; i < l; i++)
        dp[0][i] = b * i;
    // console.log(dp)
//    填写矩阵第一列的值
    for(let j = 1; j < r; j++)
        dp[j][0] = a * j;
//    填写其他位置的值·
    for(let i = 1; i < l; i++){
        for(let j = 1; j < r; j++){
            //情况3和4
            dp[j][i] = dp[j - 1][i - 1] + (s1Arr[i - 1] === s2Arr[j - 1] ? 0 : c);
            //情况1
            dp[j][i] = Math.min(dp[j][i],dp[j][i - 1] + b);
            //情况2
            dp[j][i] = Math.min(dp[j][i],dp[j - 1][i] + a);
        }
    }
    return dp[r - 1][l - 1];
}

// minEditCost1("aab151","a1b51",5,6,7)

//空间压缩技巧，将矩阵转化为一维数组
function minEditCost(s1,s2,a,b,c){
    if(s1 === null || s2 === null)
        return 0;
    // 将字符串转为ascii码数组
    let s1Arr = new Array(s1.length);
    for(let i = 0; i < s1Arr.length; i++)
        s1Arr[i] = s1[i].charCodeAt(0);
    let s2Arr = new Array(s2.length);
    for(let i = 0; i < s2Arr.length; i++)
        s2Arr[i] = s2[i].charCodeAt(0);
    //长度更长的字符串数组
    let longer = s1Arr.length >= s2Arr.length ? s1Arr : s2Arr;
    //长度更短的字符串数组
    let shorter = s1Arr.length < s2Arr.length ? s1Arr : s2Arr;
    if(s1Arr.length < s2Arr.length){
        let temp = a;
        a = b;
        b = temp;
    }
    let dp = new Array(shorter.length + 1).fill(0);
    console.log(dp)
    for(let i = 1; i <= shorter.length; i++)
        dp[i] = a * i;
    for(let i = 1; i <= longer.length; i++){
        let pre = dp[0];
        dp[0] = b * i;
        for(let j = 1; j <= shorter.length; j++){
            let temp = dp[i];
            if(longer[i - 1] === shorter[j - 1])
                dp[j] = pre;
            else
                dp[j] = pre + c;
            dp[j] = Math.min(dp[j],dp[j - 1] + a);
            dp[j] = Math.min(dp[j],temp + b);
            pre = temp;
        }
    }
    console.log(dp);
    return dp[shorter.length];
}

//对数器
function main(){
    let s1 = "ab12cd3";
    let s2 = "abcdf";
    console.log(minEditCost1(s1,s2,5,3,2));
    console.log(minEditCost(s1,s2,5,3,2));
}
main()
//最长无重复字符字串问题(https://www.bilibili.com/video/BV1y34y1v78b?p=54)
//求一个字符串中,最长无重复字符字串的长度

//解题思路
//动态规划解法
//从index=0位置开始往左推,求此时能够得到的最长无重复字符字串的长度
//从index=1位置开始往左推,求此时能够得到的最长无重复字符字串的长度
//从index=2位置开始往左推,求此时能够得到的最长无重复字符字串的长度
// ...
//从index=str.length-1位置开始往左推,求此时能够得到的最长无重复字符字串的长度
//最后从所有最长无重复字符串长度中取最大值即是最后的结果
//每次求时需要考虑的问题
//1.当前字符上次出现的位置,并计算当前字符和当前字符上次出现位置的索引差值
//2.i-1位置的字符往左推得到的最长无重复字符字串的长度
//对第一个问题的结果与第二个问题的结果+1取较小值即是此次的最长无重复字符字串的长度
function lengthOfLongestSubString1(str){
    if(str === null || str === "")
        return 0;
//    将字符串转换成字符串数组,值为该字符相应的ascii码
    let strArr = [];
    for(let i = 0; i < str.length; i++)
        strArr[i] = str[i].charCodeAt(0);
    // console.log(strArr)
    //记录每个字符上次出现的位置(初始均为-1),0-255为每个字符相应的ascii码
    let map = new Array(256);
    for(let i = 0; i < 256; i++)
        map[i] = -1;
    //index = 0 时
    map[strArr[0]] = 0;
    let n = str.length;
    let res = 1;
//    i-1位置的字符往左推得到的最长无重复字符字串的长度
    let preLength = 1;
    for(let i = 1; i < n; i++){
        //对第一个问题的结果与第二个问题的结果+1取较小值
        preLength = Math.min(i - map[strArr[i]], preLength + 1);
        res = Math.max(res,preLength);
        map[strArr[i]] = i;
    }
    return res;
}

console.log(lengthOfLongestSubString1("acfbcb"))

//暴力解法
function lengthOfLongestSubString(str){
    if(str === null || str === "")
        return 0;
    let res = 1;
    let resArr = [];
    let helpArr = [];
    let h = 0;
    let i = 0;
    for(let m = 0; m < str.length; m++){
        let isEqual = false;
        for(i; i < str.length; i++){
            for(let j = 0; j < helpArr.length; j++){
                if(str[i] === helpArr[j])
                    isEqual = true;
            }
            if(isEqual === false){
                helpArr[h++] = str[i];
                if(helpArr.length >= res){
                    res = helpArr.length;
                    resArr = helpArr;
                }
            }
        }
        helpArr = [];
        h = 0;
        i = m + 1;
    }
    return res;
}

console.log(lengthOfLongestSubString("acfbcb"))
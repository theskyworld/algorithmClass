//题目（https://www.bilibili.com/video/BV1y34y1v78b?p=50）
//一个数组中只有"G"和"B"两种字符
//现在需要让所有的G都放左边，所有的B都放右边
//或者所有的G都放右边，所有的B都放左边
//但是每次都只能在相邻的字符之间进行交换操作
//问至少需要交换几次

//解题思路
//当把所有的G都放左边时
//准备l1(0)和i(0)指针，如果此时i位置处的字符不是G，则i++
//如果i位置处的字符是G，则计算将此时i位置处的G向左依次交换到此时l的位置时交换的次数，l1++
//最后得出当所有的G都在左边时总的需要交换的次数
//当把所有的B都放在左边时
//准备l2(0)和i(0)指针，如果此时i位置处的字符不是B，则i++
//如果i位置处的字符是B，则计算将此时i位置处的B向左依次交换到此时l的位置时交换的次数，l2++
//最后得出当所有的B都在左边时总的需要交换的次数
//最后取两次情况时的较小值
function minSwapSteps1(s){
    if(s === null || s === "")
        return 0
//    将字符串s转换成字符串数组
    let sArr = [];
    for(let i = 0; i < s.length; i++){
        sArr[i] = s[i];
    }
    //当把所有的G都放在左边时
    //记录交换G字符时，需要进行交换的总次数
    let step1 = 0;
    let l1 = 0;
    for(let i = 0; i < sArr.length; i++){
        //如果此时i位置处的字符为G,计算此时需要将G交换至l位置处时的交换次数
        if(sArr[i] === 'G'){
            step1 += i - (l1++)
        }
    }
//    当把所有的B都放在左边时
    let step2 = 0;
    let l2 = 0;
    for(let i = 0; i < sArr.length; i++){
        //如果此时i位置处的字符为B,计算此时需要将B交换至l位置处时的交换次数
        if(sArr[i] === 'B'){
            step2 += i - (l2++)
        }
    }
//    取两种情况中，较小的那个step
    return Math.min(step1,step2);
}

// console.log(minSwapSteps1('BBBGGGBGBGGGB'))

//对数器
//对数器方法
function minSwapSteps(s){
    if(s === null || s === "")
        return 0
    //    将字符串s转换成字符串数组
    let sArr = [];
    for(let i = 0; i < s.length; i++){
        sArr[i] = s[i];
    }
    let step1 = 0;
    let step2 = 0;
    let l1 = 0;
    let l2 = 0;
    for(let i = 0; i < sArr.length; i++){
        //情况1
        if(sArr[i] === "G")
            step1 += i - (l1++)
        //    情况2
        else
            step2 += i - (l2++);
    }
    return Math.min(step1,step2);
}
//产生随机的GB字符串
function randomString(maxLength){
    let s = "";
    for(let i = 0; i < maxLength; i++){
        s += Math.random() < 0.5 ? "G" : "B";
    }
    return s;
}
//测试方法
function main(){
    let maxLength = 100;
    let testTime = 100000;
    console.log("测试开始！")
    for(let i = 0; i < testTime; i++){
        let s = randomString(maxLength);
        let res1 = minSwapSteps1(s);
        let res2 = minSwapSteps(s);
        if(res1 !== res2){
            console.log("测试失败！");
            break;
        }
    }
    console.log("测试结束！")
}
main();
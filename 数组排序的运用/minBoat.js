//最多装两个人的船同时过河问题（https://www.bilibili.com/video/BV1y34y1v78b?p=56&spm_id_from=pageDriver）
//给定一个正数数组arr，表示若干人的体重;再给定一个正数limit，表示所有船共同的载重量
//每艘船最多坐两人，且不能超过载重量
//想让所有人同时过河，并且用最好的分配方法让船尽量少
//问最少的船数

//解题思路
//先将数组进行排序
//在排序后的数组中找到(limit/2)的那个值的位置m
//准备l(m)和r(m+1)指针，如果此时arr[l]+arr[r]>limit,l--,直至arr[l]+arr[r]<=limit;
//当arr[l]+arr[r]<=limit时，从r开始往右数，看有几个值等于r处的值，将r直接跳到最后一个等于r处的值处，r跳了几步，相应地l也跳几步
//
function minBoat1(arr,limit){
    if(arr === null)
        return -1;
//    对数组进行排序
    arr.sort((a,b)=>{
        return a - b;
    });
    //如果数组中存在体重大于载重量的人，直接返回-1
    if(arr[arr.length - 1] > limit)
        return -1;
    //记录最后的结果
    let res = 0;
    //记录m左边需要单独考虑的人数
    let Ln = 0;
    //记录m右边需要单独考虑的人数
    let Rn = 0;
    //找中间位置的m值
    let m = 0;
    for(let i = arr.length - 1; i >= 0; i--){
        if(arr[i] <= Math.floor(limit / 2)){
            m = i;
            break;
        }
    }
    let l = m;
    let r = m + 1;
    // console.log(l,r)
    while(l >= 0 && r < arr.length){
        //如果l处的值加上r处的值大于limit，则l--,同时m左边需要单独考虑的人数++，直到<= limit
        if(arr[l] + arr[r] > limit){
            l--;
            Ln++;
        //    如果l处的值加上r处的值小于等于limit，则直接这两个人坐船走，res++,l--,r++
        }else{
            res++;
            l--;
            r++;
        }
    }
    // console.log(l,r);
    //怕最后l不能减到0的位置，此时m左边需要单独考虑的人数增加
    Ln += (l + 1);
    //m右边需要单独考虑的总人数
    Rn = (arr.length - 1) - (r - 1);
    //res加左边的
    res += Math.ceil(Ln / 2);
    //res加右边的
    res += Rn;
    return res;
}

// console.log(minBoat1([1,1,2,4,4,4,5,6,6,6,8,9,10],7))
// console.log(minBoat1([1,3,3,4,6,7,7,8,8],15))
//对数器
//测试方法
function minBoat(arr,limit){
    if(arr === null || arr.length === 0)
        return -1;
    let n = arr.length;
    arr.sort((a,b)=>{
        return a - b;
    });
    if(arr[n - 1] > limit)
        return -1;
    let lessR = -1;
    for(let i = n - 1; i >= 0; i--){
        if(arr[i] <= Math.floor(limit / 2)){
            lessR = i;
            break;
        }
    }
    if(lessR === -1)
        return n;
    let l = lessR;
    let r = lessR + 1;
    let noUsed = 0;
    while(l >= 0){
        let solved = 0;
        while(r < n && arr[l] + arr[r] <= limit){
            r++;
            solved++;
        }
        if(solved === 0){
            noUsed++;
            l--;
        }else
            l = Math.max(-1,l - solved);
    }
    let all = lessR + 1;
    let used = all - noUsed;
    let moreUnsolved = (n - all) - used;
    return used + ((noUsed + 1) >> 1) + moreUnsolved;
}

// console.log(minBoat([1,1,2,4,4,4,5,6,6,6],7))

//产生随机数组
function randomArr(maxLength,maxValue){
    let randomArr = [];
    for(let i = 0; i < maxLength; i++)
        randomArr[i] = Math.ceil(Math.random() * maxValue);
    return randomArr;
}
//复制数组
function copyArr(arr){
    let copyArr = [];
    for(let i = 0; i < arr.length; i++)
        copyArr[i] = arr[i];
    return copyArr;
}
function main(){
    let testTime = 2000;
    let maxLength = 30;
    let maxValue = 25;
    let maxLimit = 35;
    console.log("测试开始！")
    for(let i = 0; i < testTime; i++){
        let arr1 = randomArr(maxLength,maxValue);
        let arr = copyArr(arr1);
        let limit = Math.ceil(Math.random() * (maxLimit - maxValue) + maxValue);
        let res1 = minBoat1(arr1,limit);
        let res2 = minBoat(arr,limit);
        if(res1 !== res2){
            console.log("测试失败！");
            console.log(arr1,arr);
            console.log(res1,res2,limit);
            break;
        }
    }
    console.log("测试结束！")
}
// main()

//对题目添加条件
//如果两个人坐一艘船，则两个人的体重相加需要是偶数

function minBoatEvenWeight(arr,limit){
    arr.sort((a,b)=>{
        return a - b;
    });
//    记录体重为奇数的总人数
    let odd = 0;
//    记录体重为偶数的总人数
    let even = 0;
    for(let i = 0; i < arr.length; i++){
        //偶数
        if((arr[i] & 1) === 0)
            even++;
        else
            odd++;
    }
    let oddArr = [];
    let evenArr = [];
    for(let i = arr.length - 1; i >= 0; i--){
        if((arr[i] & 1) === 0)
            evenArr[--even] = arr[i];
        else
            oddArr[--odd] = arr[i];
    }
    return minBoat1(oddArr,limit) + minBoat1(evenArr,limit);
}

// console.log(minBoatEvenWeight([2,5,4,6,7,7,3,9,8],10))
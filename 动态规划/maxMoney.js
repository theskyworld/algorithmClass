//司机最大收入问题(https://www.bilibili.com/video/BV1y34y1v78b?p=52)
//现在有司机2*N人,调度中心会将所有司机平均分配给A和B两个区域
//第i个司机去A区域可得的收入为income[i][0],去B区域可得的收入为income[i][1].(其中income为2*N的矩阵)
//先需要求能够使所有司机总收入最高的方案为多少钱

//解题思路
//动态规划法
function maxMoney1(income){
    //income为2*N的矩阵,长度代表总的司机人数
    //如果income为空或者长度小于2或者长度为奇数,最后返回0
    if(income === null || income.length < 2 || (income.length & 1) !== 0)
        return 0;
    //总的司机人数
    let n = income.length;
    //其中要去A区域的人数(去A区域,B区域平均分配)
    let m = n >> 1; //m = n / 2
    return process(income,0,m);
    //index表示,将income中index及之后的所有司机往A和B区域分配
    //rest表示A区域还有rest个名额可以接纳司机
    //最后返回在把index及之后的所有司机全部分配完,并且最终A和B区域司机人数一样多的情况下,index及之后的这些司机整体的收入最大值
    function process(income,index,rest){
    //    如果index及之后没有司机可以分配了
        if(index === income.length)
            return 0;
        //如果index及之后还有司机,并且这些司机刚好全部要分配到A区域
        //income.length - index表示index及之后司机的总人数
        if(income.length - index === rest)
            //income[index][0]表示将index位的该司机分配到A区域所能得到的收益
            //process(income,index + 1, rest - 1)表示将index + 1及之后的所有司机进行process计算
            return income[index][0] + process(income,index + 1, rest - 1);
    //    如果index及之后还有司机,并且这些司机刚好全部要分配到B区域(A区域可接纳的司机人数为0)
        if(rest === 0)
            return income[index][1] + process(income,index + 1, rest);
    //    如果index及之后还有司机,并且这些司机既可以分配到A区域,又可以分配到B区域
    //    将index位的司机分配到A区域,所能得到的收入
        let p1 = income[index][0] + process(income,index + 1, rest - 1);
        //将index位的司机分配到B区域,所能得到的收入
        let p2 = income[index][1] + process(income, index + 1,rest);
    //    取两者的较大值
        return Math.max(p1,p2);
    }
}

//贪心策略
//假设一共有10个司机，思路是先让所有司机去A，得到一个总收益
//然后看看哪5个司机改变策略去B区域,能够得到更大的额外收益
function maxMoney2(income){
    let n = income.length;
    //记录每个司机去B区域和去A区域的收入差值
    let arr = new Array(n);
    let sum = 0;
    for(let i = 0; i < n; i++){
        //当前司机去B区域和去A区域的收入差值
        arr[i] = income[i][1] - income[i][0];
        //司机去A区域的总的收入
        sum += income[i][0];
    }
    //从小到大对arr进行排序
    arr.sort((a,b)=>{
        return a - b;
    })
    let m = n >> 1;
    //取arr中后五个值(五个最大的值),并将sum累加这五个值作为司机该去B区域能够得到的更大收入和
    for(let i = n - 1; i >= m; i--)
        sum += arr[i];
    return sum;
}

//对数器
//测试方法
function maxMoney(income){
    let n = income.length;
    let m = n >> 1;
    let dp = [new Array(0,0)];
    // console.log(dp)
    //初始化dp
    // for(let i = 0; i < income.length; i++){
    //     dp[i][0] = 0;
    //     dp[i][1] = 0;
    // }
    // dp[0] = [50,70];
    // console.log(dp[0][0]);
    for(let i = n - 1; i >= 0; i--){
        for(let j = 0; j <= m; j++){
            if(n - i === j)
                dp[i][j] = income[i][0] + dp[i + 1][j - 1];
            else if(j === 0)
                dp[i][j] = income[i][1] + dp[i + 1][j];
            else{
                let p1 = income[i][0] + dp[i + 1][j - 1];
                let p2 = income[i][1] + dp[i + 1][j];
                dp[i][j] = Math.max(p1,p2);
            }
        }
    }
    return dp[0][m];
}
maxMoney([[70,50],[30,10],[50,60]])
//产生随机的income二维矩阵
function matrix(maxlength){
    //如果maxlength的值不是偶数,则转换为偶数
    if((maxlength & 1) !== 0)
        maxlength += 1;
    let outerArr = [];
    let innerArr = [];
    for(let i = 0; i < maxlength; i++){
        //i位置的司机去A区域(innerArr[0])的收入
        innerArr[0] = Math.ceil(Math.random()*100);
        //i位置的司机去A区域(innerArr[1])的收入
        innerArr[1] = Math.ceil(Math.random()*100);
        outerArr[i] = innerArr;
    }
    return outerArr;
}
function main(){
    //总的司机最大人数
    let n = 10;
    let testTime = 500;
    console.log("测试开始!");
    for(let i = 0; i < testTime; i++){
        let maxlength = Math.ceil(Math.random()*n);
        let res1 = maxMoney(matrix(maxlength));
        let res2 = maxMoney1(matrix(maxlength));
        if(res1 !== res2){
            console.log("测试失败!");
            break;
        }
    }
    console.log("测试结束!")
}
// main();
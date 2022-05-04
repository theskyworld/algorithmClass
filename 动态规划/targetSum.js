//动态规划?
// 记忆化搜索法?
//题目（https://www.bilibili.com/video/BV1y34y1v78b?p=51&spm_id_from=pageDriver）
//给定一个数组arr，你可以对数组中的每个数字之间决定+或者-（对该数字进行+或-运算）
//并且必须所有数字的参与
//再给定一个目标值target,问最后算出target的方法数为多少

//解题思路
//暴力递归法
//index,rest的含义
//能自由使用arr中索引为index及之后的所有数,
//使用这些数来通过+或-运算得出结果rest
//此时返回的是此时的方法数
function targetSum1(arr,target){
    return process(arr,0,target);
    function process(arr,index,rest){
        //当index及之后没数字时
        if(index === arr.length)
            return rest === 0 ? 1 : 0;
        //        对当前数进行+运算的方法数
        return process(arr,index + 1,rest + arr[index]) +
               //对当前数进行-运算的方法数
               process(arr,index + 1,rest - arr[index])
    }
}

console.log(targetSum1([3,1,2,1,1,4,9,3,5],29))

//记忆化搜索法
//哈希表
//此处的哈希表是这样的一种结构
//这个哈希表的本质是一个数组,数组的值为一个节点(包含key和value两个参数)
//哈希表的接口
//containsKey(key):判断当前哈希表中是否存在key值为key的节点
//get(key):获取当前哈希表中key值为key的节点的value值
//put(key,value):向哈希表中添加节点,节点的key为key,value为value
class Node{
    constructor(key,value) {
        this.key = key;
        this.value = value;
    }
}
class HashMap{
    constructor() {
        this.map = [];
        this.size = 0;
    }
    containsKey(key){
        for(let i = 0; i < this.map.length; i++){
            if(this.map[i].key === key)
                return true;
        }
        return false;
    }
    get(key){
        for(let i = 0; i < this.map.length; i++){
            if(this.map[i].key === key)
                return this.map[i].value;
        }
    }
    put(key,value){
        let node = new Node(key,value);
        this.map.push(node);
        this.size++;
    }
}
// class HashMap {
//     constructor(size) {
//         this.table = new Array(size)
//         this.size = 0
//     }
//     //哈希函数，将value转化，计算出存储的key
//     // hashConversion(value) {
//     //     let keyCode = 0
//     //     for(let item of value) {
//     //         keyCode += item.charCodeAt(0)
//     //     }
//     //     let key = keyCode % this.table.length
//     //     return key
//     // }
//     put(index,value) {
//         // let key = this.hashConversion(value)
//         this.size++
//         this.table[index] = value
//     }
//     get(index) {
//         // let key = this.hashConversion(value)
//         return this.table[index]
//     }
//     // delete(value) {
//     //     let key = this.hashConversion(value)
//     //     if(this.table[key] !== undefined) {
//     //         this.table[key] = undefined
//     //         this.size--
//     //         return true
//     //     } else {
//     //         return false
//     //     }
//     // }
//     hasValue(value) {
//         let key = this.hashConversion(value)
//         if(this.table[key] !== undefined) {
//             return true
//         } else {
//             return false
//         }
//     }
//     containsKey(key){
//
//     }
//     showAllData() {
//         let result = []
//         for (let item of this.table) {
//             if(item !== undefined) {
//                 result.push(item)
//             }
//         }
//         return result
//     }
// }

//targetSum2函数中哈希表的结构(两层hashmap)
//外层hashmap:[{index,hashmap},...]
//                     ⬇
//内层hashmap:       [{rest,res},....]
//index,rest,res的含义
//可以自由使用arr中索引为index及之后的所有数字,使用+或-运算最后能得出rest值的方法数res
//然后将以上所有的信息存入hashMap中
//每次进行targetSum计算之前先访问hashMap中是是否存在key为index的信息,有则直接使用(返回此时index对应的res)
//否则进行原始暴力递归计算,并将计算之后的相关信息作为新的值存入hashMap中,以便以后使用
function targetSum2(arr,target){
    return process(arr,0,target,new HashMap())
    function process(arr,index,rest,hashMap){
        //先访问hashMap,看是否存在所需要的信息,存在则直接返回res
        if(hashMap.containsKey(index) && hashMap.get(index).containsKey(rest))
            return hashMap.get(index).get(rest);
        //不存在,则进行原始的暴力递归计算
        let res = 0;
        if(index === arr.length)
            res = rest === 0 ? 1 : 0;
        else
            res = process(arr,index + 1,rest + arr[index],hashMap) +
                  process(arr,index + 1,rest - arr[index],hashMap)
        //并将新的信息存入hahMap中
        //如果此时哈希表中不存在key值为index的节点
        if(!hashMap.containsKey(index))
            //就向哈希表中添加key为index,value为新的hashmap的节点
            hashMap.put(index,new HashMap());
        //并向value为hashmap中添加key为rest,value为res的节点
        hashMap.get(index).put(rest,res);
        return res;
    }
}

//优化1
//可以认为arr中都是非负数
//因为+或-的运算可以自由使用,即使在arr中存在负数,例如[3,-4,2]
//也可以使用-将负数转换成非负数
//最后[3,-4,2]和[3,4,2]的效果是等价的

//优化2
//首先arr中的所有数字一定全是非负数(即使存在负数,也可以转换成非负数)
//如果arr数组中所有数字的累加和为sum(即所有正数和0的累加和为sum),那么如果sum < target,则最后的结果res为0

//优化3
// arr内部的所有数字,不管怎么+和-,最后的结果都不会改变所有数字累加和的奇偶性
//所以,如果arr中所有数字的累加和是sum,并且sum与target的奇偶性不一致,则方法数res为0

//优化4(经典背包动态规划)
//假如给定的arr为[1,2,3,4,5],并且target = 3,求方法数res
//并且此时经过计算得出其中的一种方法为: +1 -2 + 3 -4 +5 = 3
//在此时的方法中,归纳出正数的集合为p = {1,3,5}
//                  负数的集合为N = {2,4}
//经过上述的分析可以推导出,对于所有的方法,都存在sum(P) - sum(N) = target的结论
//现在对以上等式进行处理:sum(P) - sum(N) + sum(P) - sum(N) = target + sum(P) - sum(N)
//                                             2sum(P) = target + sum(P) + sum(N)
//即                                           2sum(P) = target + 数组中所有数字的累加和sum
//也即                                          sum(P) = (target + sum) / 2
//所以得出,对于任意一个arr,在可以不要求使用数组中全部数字的前提下,自由使用这些出的进行+或-运算最后能得出结果为sum(P)即(target + sum) / 2的方法数即是最后res的值
//例如,对于一个非负数组arr,target为7,并且所有数的累加和为11,在要求使用数组中全部数字的前提下求方法数res
//此时的解法为:可以不要求使用全部数字,自由使用数字进行+或-运算,最后得出结果为(7 + 11) / 2 = 9的方法数即是res的值

//优化5(二维动态规划的空间压缩技巧)

function targetSum3(arr,target){
    //求数组arr中的累加和sum
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += arr[i];
    }
//    如果满足优化2或者优化3的情况,则此时的res为0
//     if(sum < target || ((target & 1) ^ (sum & 1)) !== 0)
//         return 0;
//     return process2(arr,(target + sum >> 1));
//    等价于
    return sum < target || ((target & 1) ^ (sum & 1)) !== 0 ? 0 : process2(arr,(target + sum) >> 1);
    function process2(arr,target){
        if(target < 0)
            return 0;
        let dp = [];
        dp[0] = 1;
        for(let i = 0; i < arr.length; i++){
            for(let j = target; j >= arr[i]; j--){
                dp[j] += dp[j - arr[i]];
            }
        }
        return dp[target];
    }
}


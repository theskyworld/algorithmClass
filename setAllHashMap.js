//题目(https://www.bilibili.com/video/BV1y34y1v78b?p=53)
//对哈希表添加一个setAll(value)的接口,实现将哈希表中所有的值改为value的功能
//要求setAll(value)的时间复杂度为O(1),同时添加setAll(value)之后的其他接口,例如put等的时间复杂度依旧为O(1)

//解题思路
//对哈希表中的value值添加一个time参数,记录每次添加/更改该value值的时间
//在setAll方法中,准备一个setAllTime(系统最大值)参数,记录每次进行setAll操作的时间
//             同时准备一个setAllValue参数,记录要修改的新的value值
//

//重写原来hashMap中的value
//新的value包含value和time参数
//value:原始value的值
//time:添加或修改该value时的时间
class MyValue{
    constructor(value,time) {
        this.value = value;
        this.time = time;
    }
}

class MyHashMap{
    constructor() {
        this.map = [[]];
        this.value = new MyValue(0,0);
    }
    put(key,value){
        this.map.push()
    }
}
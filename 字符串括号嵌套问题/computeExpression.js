//公式字符串的计算结果（https://www.bilibili.com/video/BV1y34y1v78b?p=62&spm_id_from=pageDriver）
// https://leetcode.com/problems/basic-calculator-iii/
//给定一个有效字符串str,str表示一个公式
//公式中可能有整数、加减乘除符合和左右括号
//返回这个公式字符串的计算结果
//例如str = "48 * ((70 - 65) - 43) + 8 - 1，返回-1816
//   str = "3 + 1*4"，返回7
//同时，如果是负数则需要使用括号括起来，比如"4*(-3)"，但是如果负数作为公式开头或者括号部分开头的话，则不需要括起来，例如"-3*4"和"(-3*4)"
//不考虑计算溢出的情况

//解题思路
//先不考虑左右括号
//准备一个栈，然后对数组进行从左往右进行遍历，同时准备一个变量cur(0++)
//遍历时，如果遇到的是整数，则cur * 10 + s[i]
//       如果遇到的是+或者-或者*或者/，则将cur和+或者-或者*或者/依次放入栈中，同时让cur变为初始的0
//       如果遇到的是+或者-，每次跟其前面的整数放入栈之前先看看栈顶的元素是否是*或者/
//                        如果是，则弹出栈顶的前两个元素，跟此时+或者-前面的整数进行*或者/运算之后再将运算的结果和+或者-放入栈中
//考虑左右括号（字符串括号嵌套问题解题思路）
//将不考虑左右括号时的方法包装成函数f()，传入值为开始下标，返回值为当前计算结果和当前结束位置
//调用f()函数，从索引0开始进行放入栈计算
//如果遇到"("，则暂停当前阶段的计算，从当前位置的下一个位置开始调用f()函数
//如果遇到")"，则结束当前的计算，然后返回最后的计算结果和当前结束位置
//直至最后结束位置为s.length - 1时，返回最后的结果

//字符串括号嵌套问题
//例如"aaaaa" 与 5(a),"aabaabaabk"与3(aab)k等的相互变换

class Node{
    constructor(value,next) {
        this.value = value;
        this.next = next;
    }
}
class LinkedList{
    constructor() {
        this.dummyHead = new Node('dummyHead');
        this.size = 0;
    }
    getSize() {
        return this.size;
    }
    isEmpty() {
        return this.size === 0;
    }
    add(index,value){
        if(index < 0 || index > this.size){
            return '输入的index无效!'
        }
        let temp =this.dummyHead;
        for(let i = 0; i < index; i++){
            temp = temp.next;
        }
        temp.next = new Node(value,temp.next);
        this.size++;
    }
    addFirst(value){
        this.add(0,value);
    }
    addLast(value){
        this.add(this.size,value);
    }

    getValue(index){
        if(index < 0 || index >= this.size)
            return '输入的index无效!'
        let temp = this.dummyHead;
        for(let i = 0; i < index; i++){
            temp = temp.next;
        }
        return temp.next.value;
    }
    getFirstValue(){
        return this.getValue(0);
    }
    getLastValue(){
        return this.getValue(this.size-1);
    }

    removeNode(index){
        if(index < 0 || index >= this.size)
            return '输入的index无效!'
        if(this.size === 0)
            return '链表当前为空!'
        let temp = this.dummyHead;
        for(let i = 0; i < index; i++){
            temp = temp.next;
        }
        let removedNode = temp.next;
        temp.next = removedNode.next;
        removedNode.next = null;
        this.size--;
        return removedNode;
    }
    removeLastNode(){
        return this.removeNode(this.size-1)
    }
    removeFirstNode(){
        return this.removeNode(0);
    }
}

function computeExpression(s){
//    链表结构（代替栈）

//    将字符串转换为ascii码数组
    let sArr = new Array(s.length);
    for(let i = 0; i < s.length; i++)
        sArr[i] = s[i].charCodeAt(0);

        return f(sArr,0)[0];

        function f(sArr,i){
            let linkedList = new LinkedList();
            let cur = 0;
            let part = null;
            //到终点或者遇到")"之前不断进行f()的过程
            while(i < sArr.length && sArr[i] !== ")"){
                //遇到数字字符
                if(sArr[i] >= '0' && sArr[i] <= "9"){
                    cur = cur * 10 + Number.parseInt(sArr[i++])
                //    遇到+或者-或者*或者/
                }else if(sArr[i] === "+" || sArr[i] === "-"){
                    let top1 = linkedList.getValue(sArr.length - 1);
                    let top2 = linkedList.getValue(sArr.length - 2);
                    if(top1 === "*"){
                        let cal = cur * Number.parseInt(top2);
                        linkedList.addLast(cal);
                        linkedList.addLast(sArr[i]);
                        cur = 0;
                    }else if(top1 === "/"){
                        let cal = cur / Number.parseInt(top2);
                        linkedList.addLast(cal);
                        linkedList.addLast(sArr[i]);
                        cur = 0;
                    }else{
                        linkedList.addLast(cur);
                        linkedList.addLast(sArr[i]);
                        cur = 0;
                    }
                }else if(sArr[i] === "*" || sArr[i] === "/"){
                    linkedList.addLast(cur);
                    linkedList.addLast(sArr[i]);
                    cur = 0;
                    //    遇到"("
                } else{
                //    将i + 1位置开始的部分进行f()过程，并记录该部分进行f()过程之后的返回值
                    part = f(sArr,i + 1);
                    cur = part[0];
                    i = part[1 + 1];
                }
            }
        //    最后到终点或遇到")"时
            let partNum = calNum(linkedList,cur);
            linkedList.addLast(partNum)
            let resArr = new Array(2);
            resArr[0] = partNum;
            resArr[1] = i;
            return resArr;
            function calNum(linkedList,num){
                linkedList.addLast(num);
                let calRes = 0;
                //计算链表中前三个值的运算结果
                let f1 = linkedList.getValue(0);
                let f2 = linkedList.getValue(1);
                let f3 = linkedList.getValue(2);
                if(f2 === "+"){
                    calRes = Number.parseInt(f1) + Number.parseInt(f3);
                }else if(f2 === "-"){
                    calRes = Number.parseInt(f1) - Number.parseInt(f3);
                }else if(f2 === "*"){
                    calRes = Number.parseInt(f1) * Number.parseInt(f3);
                }else if(f2 === "/"){
                    calRes = Number.parseInt(f1) / Number.parseInt(f3);
                }
                for(let i = 3; i <= linkedList.size; i+=2){
                    if(linkedList.getValue(i) === "+"){
                        calRes += Number.parseInt(linkedList.getValue(i + 1));
                    }else if(linkedList.getValue(i) === "-"){
                        calRes -= Number.parseInt(linkedList.getValue(i + 1));
                    }else if(linkedList.getValue(i) === "*"){
                        calRes *= Number.parseInt(linkedList.getValue(i + 1));
                    }else if(linkedList.getValue(i) === "/"){
                        calRes /= Number.parseInt(linkedList.getValue(i + 1));
                    }
                }
                return calRes;
            }
        }
}
// "52+13*(5+2-(5*(23-4)))-40+((3*2)+(5/2))"

console.log(computeExpression("52+13*(5+2-(5*(23-5)))-40+((3*2)+(5/2))"))

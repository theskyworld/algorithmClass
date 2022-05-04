//相等子树数量问题（https://www.bilibili.com/video/BV1y34y1v78b?p=60&spm_id_from=pageDriver）
//如果一个节点x，它的左子树结构和右子树结构完全一样（值也相同），那么就可以说以x为头的树是相等树
//给定一棵头节点为head的二叉树，返回head整棵树上有多少棵相等子树

//思路
//判断的考虑条件
//1.当前树左子树上相等子树的数量a
//2.当前树右子树上相等子树的数量b
//3.当前树是否为相等树
//返回的最后结果res = a + b (+ 1(如果当前树是相等子树))

//创建函数,传入x.left和x.right，分别求出当前树左右子树上相等子树的数量a和b
//创建函数，判断当前树是否为相等树

function sameTreeNumber1(head){
    // class Node{
    //     constructor(value,left,right) {
    //         this.value = value;
    //         this.left = left;
    //         this.right = right;
    //     }
    // }
    if(head === null)
        return 0;
    return sameTreeNumber1(head.left) + sameTreeNumber1(head.right) + (same(head.left,head.right) ? 1 : 0);
    function same(h1,h2){
        //h1为空但h2不为空，或者h1不为空但h2为空的情况
        if(h1 === null ^ h2 === null)
            return false;
        //h1和h2均为空
        if(h1 === null && h2 === null)
            return true;
    //    h1和h2均不为空
    //    判断是否h1与h2的值相等以及左右子树是否结构完全相同（包括值是否相等）
        return h1.value === h2.value && same(h1.left,h2.left) && same(h1.right,h2.right);
    }
}

//使用哈希函数
function sameTreeNumber(head){
    class Info{
        constructor(a,s) {
            this.res = a;
            this.str = s;
        }
    }
    // let algorithm = "SHA-256";
    // let hash = new Hash(algorithm);
    let hash = createHash()
    return process(head,hash).res;
    function process(head,hash){
        if(head === null)
            return new Info(0,hashCode('#',""));
        let l = process(head.left,hash);
        let r = process(head.right,hash);
        let res = (l.str === r.str ? 1 : 0) + l.res + r.res;
        let str = hash.hashCode(head.value.valueOf() + "," + l.str + r.str);
        return new Info(res,str);
    }

}
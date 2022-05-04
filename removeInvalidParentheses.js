//无效括号变有效括号问题（https://www.bilibili.com/video/BV1y34y1v78b?p=64&spm_id_from=pageDriver）
//https://leetcode.com/problems/remove-invalid-parentheses/
//给定一个无效的括号
//先需要通过删除其中无效的部分然后使其变成有效的括号
//以最少的删除代价返回最终所有有效括号的可能


//以无效的括号"( ( ) ( ) ) )"为例
//（（（））））））（）））
//先删除多余的")"
//准备检查指针checkIndex(0)和删除指针deleteIndex(0)以及计数变量count(0)
//如果checkIndex当前的符号是"("，则count++，反之如果是")"，则count--
//当count的值小于0时，deleteIndex开始不断++，直至到达当前的符号为")"时，将当前的")"从原字符串中删除
//然后从当前的checkIndex和deleteIndex位置开始再次执行以上过程，直至checkIndex到达s.length - 1处
//然后再将字符串进行反转，执行以上过程，删除多余的"("

function removeInvalidParentheses(s){
    let sArr = [];
    for(let i = 0; i < s.length; i++)
        sArr[i] = s[i];
    let res = [];
    remove(sArr,res,0,0,["(",")"]);
    return res;
    function remove(s,res,checkIndex,deleteIndex,par){
        for(let count = 0, i = checkIndex; i < s.length; i++){
            //当前符号为"("
            if(s[i] === par[0])
                count++;
            if(s[i] === par[1])
                count--;
            if(count < 0){
                for(let j = deleteIndex; j <= i; ++j){
                    if(s[j] === par[1] && (j === deleteIndex || s[i - 1] !== par[1])) {
                        //进行j位置")"的删除
                        //以0-j（不包含）和j + 1 - s.length位置的字符组成的新字符串来继续执行remove过程，实现j位置字符的删除
                        let beforePart = [];
                        for(let i = 0; i < j; i++)
                            beforePart[i] = s[i];
                        let afterPart = [];
                        for(let i = j + 1; i < s.length; i++)
                            afterPart[i] = s[i];
                        remove(
                            beforePart + afterPart, res, i, j, par
                        )
                    }
                }
                return;
            }
        }
        let reversed = s.reverse();
        if(par[0] === "("){
            remove(reversed,res,0,0,[")","("]);
        }else{
            res.push(reversed);
        }
    }
}

console.log(removeInvalidParentheses("(()()))"))

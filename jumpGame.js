//跳跃游戏（https://www.bilibili.com/video/BV1y34y1v78b?p=67&spm_id_from=pageDriver）
//https://leetcode.com/problems/jump-game-ii/
//给定一个非负整数数组nums，小人最开始位于数组的第一个位置
//数组中每个位置的值代表你在该位置可以跳跃的最大长度
//返回以最少的跳跃次数到达数组最后一个位置时的总跳跃次数

//解题思路
//以数组nums = [3,4,1,3,2,4,2,1,2,4,2,3,2]为例
//准备变量step(0)记录目前位置已经跳跃的次数（尽量使step值最小）
//       cur(0)记录当前已经跳跃的次数（step）之内，最远能到达的距离
//       next(arr[1])记录能多跳跃一次时，能够到达的最远距离
//变量的变化
//使用变量i(0)记录小人当前在的位置， cur的下一个值等于next的当前值，并且只有当当前i距离上一次i的值大于cur的当前值时才更新
//每当cur的值更新时，step++
//next的下一个值等于i处的值+i，并且只有下一个值大于next当前值时才更新
//最后返回step的值

function jumpGame(nums) {
    if (nums === null || nums.length === 0)
        return 0;
    let step = 0, cur = 0, next = 0;
    for (let i = 0; i < nums.length; i++) {
        // cur的下一个值等于next的当前值，并且只有当当前i距离上一次i的值大于cur的当前值时才更新
        if (cur < i) {// cur  < i - 0
            // 每当cur的值更新时，step++
            step++;
            cur = next;
        }
        // next的下一个值等于i处的值+i，并且只有下一个值大于next当前值时才更新
        next = Math.max(next, i + nums[i]);
    }
    return step;
}


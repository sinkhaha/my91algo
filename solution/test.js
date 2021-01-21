
/**
 * 依次删除第i个字符，判断是否有效，有效则添加进最终的返回数组
 * 
 * 只需要递归调用依次删除第i个字符的功能就可以
 * 
 * bfs
 * 
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
    if (!s || s.length === 0) {
        return [''];
    }

    const ret = [];

    const queue = [s];
    const visited = {}; // 标记是否访问过
    let current = null;
    // 只记录最小改动
    let removedParentheses = 0; 

    while ((current = queue.shift())) {
        // 是否有效
        let hit = isValid(current);
        if (hit) {
            if (!removedParentheses) {
                removedParentheses = s.length - current.length
            }
            if (s.length - current.length > removedParentheses) return ret.length === 0 ? [""] : ret;;
            ret.unshift(current);
            continue;
        }

        for (let i = 0; i < current.length; i++) {
            if (current[i] !== ')' && current[i] !== '(') {
                continue;
            }

            const subString = current.slice(0, i).concat(current.slice(i + 1));
            
            if (visited[subString]) {
                continue;
            }

            visited[subString] = true;
            queue.push(subString);
        }
    }

    return ret.length === 0 ? [''] : ret;
};

/**
 * 判断给定字符串是否是有效的
 * @param {*} s 
 */
var isValid = function (s) {
    let openParenthes = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            openParenthes++;
        } else if (s[i] === ')') {
            if (openParenthes === 0) return false;
            openParenthes--;
        }
    }
    return openParenthes === 0;
};
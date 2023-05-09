const inputs = document.querySelectorAll(".controls input");

/**
 * 上面已经选取了两个取色器
 * 请添加相应的 JS 事件处理函数并绑定到合适的事件监听器上（提示：change 事件）
 * 这样我们就可以用取色器选取颜色来生成下方的渐变色背景啦
 *  */
function getColors () {
    let s = ''
    for (let i = 0; i < inputs.length; i++) {
        s += ',' + inputs[i].value
    }
    return s
}
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', () => {
        document.querySelector('.gradient').style.background =
            'linear-gradient(45deg' + getColors() + ')';
    })
}



// 这个列子里面，包含了宏任务，微任务，分别看看浏览器和node 打印的结果
console.log(1)
// 栈
setTimeout(function(){
    console.log(2)
    // 微任务
    Promise.resolve(100).then(function(){
        console.log('promise')
    })
})
// 栈
let promise = new Promise(function(resolve, reject){
    console.log(7)
    resolve(100)
}).then(function(data){
    // 微任务
    console.log(data)
})
// 栈
setTimeout(function(){
    console.log(3)
})
console.log(5)
//node 1 7 5 100 2 3 promise
//浏览器 1 7 5 100 2 promise 3
//浏览器和 node 环境执行顺序不同，浏览器是先把一个栈以及栈中的微任务走完，才会走下一个栈。node 环境里面是把所以栈走完，才走微任务
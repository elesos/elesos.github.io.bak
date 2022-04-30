---
layout: post
title: Node.js 简明教程
date: 2022-04-30 05:30:00 +0800
categories: [Node.js]
tags: [Node.js]
---
在Node上运行的JavaScript相比其他后端开发语言有何优势？

最大的优势是借助JavaScript天生的事件驱动机制加V8高性能引擎，使编写高性能Web服务轻而易举。

## fs
```
fs.readFile('sample.txt', 'utf-8', function (err, data) {
   if (err) {
       console.log(err);
   } else {
       console.log(data);
   }
});
```
上面是一个标准的回调函数。

当正常读取时，err参数为null，data参数为读取到的String。当读取发生错误时，err参数代表一个错误对象，data为undefined。这也是Node.js标准的回调函数：第一个参数代表错误信息，第二个参数代表结果。后面我们还会经常编写这种回调函数。

模块导出


输出多个
```
module.exports = {
    greet: greet,     hi: hi,     goodbye: goodbye

};
```
使用
```
const hello = require('./hello');
hello.greet(s);
hello.goodbye(s);
```
果我们响应exit事件，就可以在程序即将退出时执行某个回调函数：
```
process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);

}); //process对象代表当前Node.js进程
```
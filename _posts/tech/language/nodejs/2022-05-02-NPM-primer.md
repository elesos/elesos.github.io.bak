---
layout: post
title: npm 使用手册
date: 2022-05-02 05:30:00 +0800
categories: [nodejs]
tags: [nodejs]
---
npm install  #安装，也可以写成 npm i
npm run dev  #编译 CSS 和 JavaScript 文件 
npm run watch #监视和自动重新编译发生变化的组件，比如修改了vue组件后。 
如果package.json里面有如下内容：

"dev": "node build/dev-server.js",
"build": "node build/build.js",
那么运行”npm run dev”的时候执行的是build/dev-server.js文件，

运行”npm run build”的时候执行的是build/build.js文件。
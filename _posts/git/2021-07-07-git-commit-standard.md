---
layout: post
title: git 常用操作
date: 2021-07-07 23:48:33.000000000 +09:00
categories: [git]
tags: [git]
---
提交时Commit message 包括三个部分：Header，Body 和 Footer。

> ```bash
> <type>(<scope>): <subject>
> // 空一行
> <body>
> // 空一行
> <footer>
> ```

其中，Header 是必需的，Header部分里面：type`（必需）、`scope`（可选）和`subject（必需）

`type`用于说明 commit 的类别，只允许使用下面8个标识。

> - feat：新功能（feature）
> - fix：修补bug
> - docs：文档（documentation）
> - style： 格式（不影响代码运行的变动）
> - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
> - test：增加测试
> - chore：构建过程或辅助工具的变动
> - revert: 如果当前 commit 用于撤销以前的 commit，则必须以`revert:`开头，后面跟被撤销 Commit 的 Header。



`scope`用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同，比如使用模块名。

subject 以动词开头，第一个字母小写，结尾不加句号
## 参考
https://www.ruanyifeng.com/blogimg/asset/2016/bg2016010604.png

https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html
  

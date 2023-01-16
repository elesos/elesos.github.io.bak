---
layout: post
title: 关于commit提交规范中scope的说明
date: 2022-05-20 23:30:00 +0800
categories: [git]
tags: [git]
---
scope一般用于说明所在模块，


附：

常用提交格式：
```
<type>(<scope>): <subject>

type有以下8种取值：

feat：新功能（feature）

fix：修补bug

docs：文档（documentation）

style： 格式（不影响代码运行的变动）

refactor：重构（即不是新增功能，也不是修改bug的代码变动）

test：增加测试

chore：构建过程或辅助工具的变动

revert: 如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟被撤销 Commit 的 Header。
```


如
```
       fix($xxx):修复 BUG-1442 xxxx

revert:fix($xxx):修复 BUG-1442 xxxx
```




## 参考：

https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html
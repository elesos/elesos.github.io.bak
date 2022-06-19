---
layout: post
title: PhpMyAdmin 1440秒 登录超时
date: 2022-04-30 05:30:00 +0800
categories: [php]
tags: [php]
---
phpMyAdmin打开一段时间后会出现“登录超时 (1440 秒未活动)，请重新登录”的问题

## 永久
vim config.inc.php
加上下面这一行：

$cfg['LoginCookieValidity'] = 1440000 ;
修改php.ini中 session.gc_maxlifetime 的值，然后重启PHP

## 临时
点击“服务器:localhost”->“设置”->“功能”

将“登录cookie有效期”设置为一个比较大的值即可，页面底部会出现
```
“您的 PHP 参数 session.gc_maxlifetime 短于您在 phpMyAdmin 中设置的 Cookies 有效期，因此您的登录会话有效期将会比您在 phpMyAdmin 中设置的时间要更短。”
```
不用管它！
---
layout: post
title: 多用户属性 设计
date: 2022-05-21 05:30:00 +0800
categories: [php]
tags: [php]
---

先定义1，2，4，8，16，32...的用户类型

define('VIP3',          1);
define('VIP2',          2);
define('VIP1',          4);
去掉用户属性

$vipLevel & (~VIP3);
判断是否有用户属性

if($userType & VIP3)
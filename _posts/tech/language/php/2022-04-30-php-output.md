---
layout: post
title: Php 输出控制
date: 2022-04-30 05:30:00 +0800
categories: [php]
tags: [php]
---
当PHP有输出时，输出控制函数可以用这些来控制输出。

比如在开始输出 数据后，发送http头信息到浏览器。

```
<?php

ob_start();
echo "Hello\n";

setcookie("cookiename", "cookiedata");

ob_end_flush();
```
echo函数的输出将一直被保存在输出缓冲区中直到调用 ob_end_flush() 。

同时，也成功存储了一个cookie,（通常，在数据被发送到浏览器后，就不能再发送http头信息了。）
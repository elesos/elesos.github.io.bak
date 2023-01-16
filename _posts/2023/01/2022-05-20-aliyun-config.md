---
layout: post
title: 阿里云 安全组 配置
date: 2022-05-20 22:30:00 +0800
categories: [sdk]
tags: [aliyun]
---
入方向：外网访问服务器，一般配置这个。

出方向：服务器上网

测试时，可以先全部放开：即协议类型选择“全部”，授权对象填“0.0.0.0/0”（表示所有IP地址）。

参考
https://help.aliyun.com/document_detail/25471.html
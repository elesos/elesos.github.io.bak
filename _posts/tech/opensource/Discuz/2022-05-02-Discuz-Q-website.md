---
layout: post
title: Discuz  Q 建站小结
date: 2022-05-02 05:30:00 +0800
categories: [Discuz]
tags: [Discuz]
---
官网https://discuz.com/

文档站 https://discuz.com/docs/

后台操作文档 https://discuz.com/manual-admin/

更新记录： https://discuz.com/docs/%E6%9B%B4%E6%96%B0%E8%AE%B0%E5%BD%95.html 最新包可以通过 https://dl.discuz.chat/dzq_latest_install.zip 下载

## 安装
访问 http://<站点域名>/dl.php ，如果是git上传的源码，有可能.gitignore文件里面忽略了vendor文件夹。会导致安装失败。

升级也是访问dl.php，要先删除lock文件,如果无法解压，chown apache.apache -R dzq

安装成功后，需要先在服务器上提交，然后才能在本地提交，不然可能有冲突。

## 修改Logo
h5端修改了public\_nuxt\img下面的logo，制作一张透明背景，不是白色背景的logo，用网络字体生成艺术字

pc的logo：public\static
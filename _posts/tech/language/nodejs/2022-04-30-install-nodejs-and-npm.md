---
layout: post
title: Node.js与npm安装
date: 2022-04-30 05:30:00 +0800
categories: [nodejs]
tags: [nodejs]
---
配置：package.json file

nodejs (Node.js): https://nodejs.org/en/download/ 官方还有docker镜像

是基于 Chrome V8 引擎的 JavaScript 运行环境。

npm: https://www.npmjs.com/ 是Node.js 的包管理器(Node package manager)

## 安装
安装Node.js 的最佳方式是使用 nvm(Node Version Manager)

安装依赖

yum install git python gcc-c++ make
## 安装nvm
```
wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
#https://gitee.com/elesos/nvm/raw/master/install.sh
```
安装完成后，打开一个新的终端安装 Node.js

## 安装Node.js
nvm install stable
安装完成后，查看一下

nvm ls
绿色小箭头的意思就是现在正在使用的版本
```
nvm ls-remote #列出远程服务器上所有的可用版本
nvm install 13.0
nvm use 13.0
```
## 使用淘宝镜像
```
npm install -g cnpm --registry=https://registry.npm.taobao.org #以后就可以使用cnpm代替npm命令了。
```
## 参考
https://developer.aliyun.com/mirror/NPM
---
layout: post
title: Go语言 快速上手
date: 2022-04-30 05:30:00 +0800
categories: [Go]
tags: [Go]
---
2009 年开源 https://golang.google.cn/

## 安装
```
wget  https://storage.googleapis.com/golang/go1.8.3.linux-amd64.tar.gz  #Linux x86-64
wget https://storage.googleapis.com/golang/go1.9.2.linux-armv6l.tar.gz  #ARMv6
wget https://dl.google.com/go/go1.12.7.linux-arm64.tar.gz               #ARMv8
tar -C /usr/local/ -xzf go1.8.3.linux-amd64.tar.gz   #最好安装在/usr/local目录下，不然必须设置GOROOT.如果需要更新Go，把local里面的老版本重命名后，将下载的覆盖就可以了，比如 wget https://dl.google.com/go/go1.13.6.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
验证：

go version
```
设置 GOPATH 指向你的工程目录（注意：绝对不要和go的安装目录一样！！！）
```
export GOPATH=/root/go_workspace
go env GOPATH   #打印当前的GOPATH值
export PATH=$PATH:/root/go_workspace/bin
```
在工程目录创建一个目录src/hello,然后在里面生成一个hello.go文件

进入hello目录，
```
go run hello.go   #compile and run,不会生成执行文件
go build          #compile 并生成执行文件
go install        #compile and install执行文件到bin目录；如果是包，会将package object生成到pkg目录
```
## 学习
在win上安装A Tour of Go
```
mkdir -p $GOPATH/src/golang.org/x
cd $GOPATH/src/golang.org/x
git clone https://github.com/golang/tour.git
cd tour/
go install
```
运行bin目录下的tour.exe

中文版：
```
go get -u github.com/Go-zh/tour
import
import "./elesos"  //导入当前目录elesos里的所有的go文件
import "elesos"   //导入目录$GOPATH/src/elesos里的所有go文件
```
## 其它
为什么要使用 Go 语言？Go 语言的优势在哪里？

* 部署简单
* 我发现我花了四年时间锤炼自己用 C 语言构建系统的能力，试图找到一个规范，可以更好的编写软件。结果发现只是对 Go 的模仿。缺乏语言层面的支持，只能是一个拙劣的模仿。
* 对于大多数后台应用场景，选择Golang是极为明智的选择。
* 如果你是C爱好者，强烈建议你学习和使用Go。Go可以调用C/C++程序
* 你用来学89个C++高级特性的时间，估计已经用Go写了64个开源项目了。
## 参考
https://github.com/Unknwon/the-way-to-go_ZH_CN/blob/master/eBook/directory.md
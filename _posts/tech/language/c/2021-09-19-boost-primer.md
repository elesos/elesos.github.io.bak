---
layout: post
title: Boost简明教程
date: 2021-09-19 17:15:14 +0800
categories: [艺搜科技,编程]
tags: [C/C++]
---



编译



Boost.Jam（**BJam**）包含在知名的Boost C++ library 中，類似make 的建構工具。

bjam.exe 是老版本，b2是bjam的升级版本

vs2017

bjam.exe install --prefix="boost_1_70_vs2017" --libdir="boost_1_70_vs2017/lib/Win" --toolset=msvc-14.1 link=static runtime-link=shared threading=multi address-model=64 --with-filesystem debug release

mac

./bootstrap.sh --with-libraries=filesystem,system --prefix=/Users/xxx/Desktop/boost 

sudo ./b2 cxxflags=-std=c++11 --libdir=/Users/xxx/Desktop/boost/lib/Mac link=static runtime-link=shared threading=multi address-model=64 --with-filesystem --with-system install

boost库大多数组件不需要编译链接就可以使用，在自己的工程中直接包含头文件即可。

`b2 --show-libraries`命令可查看所有必须编译才能使用的库。

完全安装boost
`bjam --buildtype=complete`

runtime-link=shared指定动态链接C和C++ 运行库

https://www.cnblogs.com/wondering/archive/2009/05/21/boost_setup.html



执行根目录下的bootstrap.bat，编译后的bjam.exe会自动拷贝到该目录下（


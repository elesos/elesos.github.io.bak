---
layout: post
title: Python3 安装
date: 2022-04-30 05:30:00 +0800
categories: [Python]
tags: [Python]
---
Python有两个版本，一个是2.x版，一个是3.x版，这两个版本是不兼容的。3.x版越来越普及。

自2020年1月1日起，Python 2将不再得到支持。
```
yum install epel-release
yum install python34  #yum install python36
python3 -V
```
建立软连接，使系统默认的 python指向 python3
```
mv /usr/bin/python /usr/bin/python2.6.6  
ln -s /usr/local/bin/python3 /usr/bin/python
python  -V
```
Python软链接指向 Python3后，yum不能正常工作。需要指定 yum 的Python版本

vim /usr/bin/yum
将文件头部的

#!/usr/bin/python
改成
```
#!/usr/bin/python2.6.6
```
vim /usr/libexec/urlgrabber-ext-down修改方式和yum一样，修改第一行。

## Mac OS 安装 Python3
```
vim ~/.zshrc
alias python2='/System/Library/Frameworks/Python.framework/Versions/2.7/bin/python2.7' 
alias python3='/usr/local/Cellar/python/3.7.3/bin/python3.7' 
alias python=python3
```
安装地址：https://www.python.org/downloads/

python3.8 默认安装地址：/Library/Frameworks/Python.framework/Versions/3.8

## 版本历史
Python 3.8.2的Release date是2020-02-24

Python 3.7.4的Release date是2019-07-08

## 参考
https://www.centos.bz/2018/01/%E5%9C%A8centos%E4%B8%8A%E5%AE%89%E8%A3%85python3%E7%9A%84%E4%B8%89%E7%A7%8D%E6%96%B9%E6%B3%95/
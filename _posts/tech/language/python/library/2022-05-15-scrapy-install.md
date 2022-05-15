---
layout: post
title: Scrapy 安装
date: 2022-05-15 05:30:00 +0800
categories: [Scrapy]
tags: [Scrapy]
---

需要Python 2.7或3.4及以上

需要安装pip

## 依赖
lxml, an efficient XML and HTML parser

parsel, an HTML/XML data extraction library written on top of lxml,

w3lib, a multi-purpose helper for dealing with URLs and web page encodings

twisted, an asynchronous networking framework

cryptography and pyOpenSSL, to deal with various network-level security needs

### 安装依赖
lxml requires libxml2 and libxslt，不然可能会报 AttributeError: 'module' object has no attribute 'HTTPSConnection' 错误

yum install -y libxml2 libxml2-devel  libxslt libxslt-devel  libffi-devel  python-devel openssl-devel
pip install lxml
pip install parsel  #如果报 Couldn't find index page for 'pytest-runner'，需要更新下pip setuptools
pip install twisted
pip install cryptography
pip install pyopenssl
## 安装Scrapy
pip install Scrapy
scrapy
## 安装ipython
http://ipython.org/install.html

pip install ipython
## 问题
报错：

 
Traceback (most recent call last):

  File "/usr/local/bin/scrapy", line 5, in <module>

    from pkg_resources import load_entry_point

  File "/usr/local/lib/python2.7/site-packages/setuptools-0.6c11-py2.7.egg/pkg_resources.py", line 2607, in <module>

  File "/usr/local/lib/python2.7/site-packages/setuptools-0.6c11-py2.7.egg/pkg_resources.py", line 565, in resolve

pkg_resources.DistributionNotFound: setuptools>=1.0
解决

pip install --upgrade scrapy
## 参考
http://doc.scrapy.org/en/latest/intro/install.html
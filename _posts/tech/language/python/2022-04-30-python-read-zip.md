---
layout: post
title: How to read zip file directly in Python
date: 2022-04-30 05:30:00 +0800
categories: [Python]
tags: [Python]
---
zip文件名可以任意 my_b_package.1.2.3.zip

ZIP import of dynamic modules (.pyd, .so) is disallowed.

注意里面正常是不能有子目录的，也可以这样： example.zip/lib/ would only import from the lib/ subdirectory within the archive.

## 问题
```
<class 'FileNotFoundError'> certifi/cacert.pem
```
文件读取路径不对。暂未解决。

https://docs.python.org/3/library/zipimport.html

https://fredrikaverpil.github.io/2018/06/07/distributing-python-scripts-as-zip-file/
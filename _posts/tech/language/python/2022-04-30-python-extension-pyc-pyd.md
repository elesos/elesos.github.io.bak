---
layout: post
title: Python 各种扩展名 pyc  pyd 区别
date: 2022-04-30 05:30:00 +0800
categories: [Python]
tags: [Python]
---
pyc文件。这是python源码编译后的字节码
```
python -m compileall .  // https://stackoverflow.com/questions/5607283/how-can-i-manually-generate-a-pyc-file-from-a-py-file/38426786
```
pyd并非从python程序生成，而是其他语言写成的可以被python调用的扩展，例如C++写的动态连接库供python调用

python 要导入 .pyd 文件，实际上是在 .pyd 文件中封装了一个 module，在 python 中使用时，把它当成 module 来用就可以了，即：import 路径名.modulename 即可，路径名为 .pyd 文件所在的路径。
---
layout: post
title: Mac如何编译支持老版本系统的库
date: 2021-12-12 23:30:00 +0800
categories: [艺搜科技, 技术, 库]
tags: [库]
---
Xcode 可以指定 general -> deployment info-> deployment target

会影响 MACOSX_DEPLOYMENT_TARGET 变量

以编译openssl为例

```
export MACOSX_DEPLOYMENT_TARGET=10.13 &&  ./Configure darwin64-x86_64-cc shared --prefix=xxx --openssldir=xxx 
```

怎么查编译出来的dylib支持什么系统 Determine minimum OSX version a binary was compiled for

```
otool -l libssl.dylib | grep os  //or grep LC_VERSION_MIN_MACOSX
```

参考

https://github.com/realm/realm-cocoa/issues/2180

https://stackoverflow.com/questions/6363993/mac-os-x-libcurl-dylib-compatibility-version

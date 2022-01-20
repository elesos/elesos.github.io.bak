---
layout: post
title: C++库管理器vcpkg
date: 2021-07-04 17:18:23 +0800
categories: [艺搜科技,编程]
tags: [编程]
---

```
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
./bootstrap-vcpkg.sh
./vcpkg integrate install   若您希望在 Visual Studio 中使用vcpkg
./vcpkg install kcp   // ./vcpkg install sdl2 curl     ./vcpkg install cpr         
```

上面will install x86 libraries by default. To install x64

```
vcpkg install package:x64-windows
```

需要vs英文语言包

## 参考

https://github.com/Microsoft/vcpkg

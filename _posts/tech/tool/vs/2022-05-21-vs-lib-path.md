---
layout: post
title: 关于vs 附加库目录
date: 2022-05-21 05:30:00 +0800
categories: [vs]
tags: [vs]
---

如果 添加了lib/Win

vs会自动加上 lib/Win/$(Configuration)，其中Configuration会根据配置，自动替换成Debug或Release

就是说可以在库目录里面建立 Debug或Release 2个目录，分别放上对应的库。不过不太建议，因为如果换了一些不支持多配置的IDE，附加库目录就不会自动添加当前配置

最好是全路径 -lD:\fvbl\3rdparty\OpenSSL\win\lib\ssl ，这样提供全路径的库文件就不用附加库目录了，不用-L选项。

xcode 也会默认添加lib\debug 或lib\release的目录。
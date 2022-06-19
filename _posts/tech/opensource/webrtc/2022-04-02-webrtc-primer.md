---
layout: post
title: WebRTC 教程
date: 2022-04-02 23:30:00 +0800
categories: [webrtc]
tags: [webrtc]
---

webrtc的下载方式跟chromium差不多，也是fetch。

webrtc代码库中没有third_party目录（https://webrtc.googlesource.com/src/+/refs/heads/main），但是chromium有https://chromium.googlesource.com/chromium/src/+/refs/heads/main/third_party/

不过如果通过fetch方式下载的webrtc，也会生成third_party目录



gn gen时报错

ERROR at //build/timestamp.gni:31:19: Script returned non-zero exit code.

可以执行 ./build/util/lastchange.py  build/util/LASTCHANGE 

报错：

needed by 'py_quality_assessment/noise_tracks/city.wav', missing and no known rule to make it

需要运行一下`gclient sync`




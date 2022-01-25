---
layout: post
title: webrtc 入门
date: 2021-07-03 11:10:12 +0800
categories: [艺搜科技,多媒体]
tags: [webrtc]
---

# 下载

```
git clone https://webrtc.googlesource.com/src
```

API:  https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API

# 参考

https://webrtc.org/  官网

https://webrtc.github.io/webrtc-org/   我搭建的文档站 https://elesos.github.io/webrtc.org/

https://webrtc.github.io/samples/       我搭建的示例https://elesos.github.io/sites/webrtc/samples/



# 目录结构

sdk\android\src\jni\audio_device与modules\audio_device\android 下面都有一个opensles_common.h

sdk的函数在jni的namespace下。



# 架构

https://webrtc.github.io/webrtc-org/architecture/


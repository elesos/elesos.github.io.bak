---
layout: post
title: X265 编码指南
date: 2021-07-02 21:27:19 +0800
categories: [艺搜科技,多媒体]
tags: [ffmpeg]
---
比x264节省约25-50％的码率

选择ultrafast，编码过程将快速运行，但与medium相比，文件大小会更大。视觉质量将是相同的。

```
ffmpeg -y -i input -c:v libx265 -b:v 2600k -x265-params pass=1 -an -f mp4 /dev/null 
ffmpeg -i input -c:v libx265 -b:v 2600k -x265-params pass=2 -c:a aac -b:a 128k output.mp4
```

参考

https://trac.ffmpeg.org/wiki/Encode/H.265
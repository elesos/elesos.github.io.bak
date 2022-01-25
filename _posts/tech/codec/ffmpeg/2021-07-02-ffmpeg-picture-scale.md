---
layout: post
title: FFmpeg 调整图片宽高
date: 2021-07-02 21:27:19 +0800
categories: [艺搜科技,多媒体]
tags: [ffmpeg]
---
如将200*200裁剪到178*178

```
ffmpeg -i 42.png -s 178x178 178.png
ffmpeg -i input.png -vf scale=960:540 output.jpg //如果540写成-1，即scale=960:-1, 将会保持原始的宽高比。
```
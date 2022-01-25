---
layout: post
title: PCM格式
date: 2021-07-02 21:28:55 +0800
categories: [艺搜科技,多媒体]
tags: [多媒体]
---
48000Hz=48000采样/s

PCM16LE双声道数据左声道和右声道的采样值是间隔存储的

pcm大小计算：

```
声道数*采样率*位深度（每个采样所占字节数）
2 tracks * 44,100 samples/second * 16 bits/sample = 1,411,200 bits/second.   = 176400Byte
```

```
ffmpeg -ar 48000 -ac 1 -f s16le -i in.pcm -ar 16000 -ac 1  -f s16le -c:a pcm_s16le aec_far_16k.pcm
```

http://www.lehman.edu/faculty/hoffmann/itc/techteach/audio/audiotechinfo.html

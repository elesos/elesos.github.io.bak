---
layout: post
title: FFmpeg 树莓派 硬编 264
date: 2021-07-02 21:27:19 +0800
categories: [艺搜科技,多媒体]
tags: [ffmpeg]
---
编译出来后，验证编译出来的库是否支持（这个只能查编译出来的）：

```
ffmpeg -decoders | grep mmal
V..... h264_mmal h264 (mmal) (codec h264) 
V..... mpeg2_mmal mpeg2 (mmal) (codec mpeg2video) 
V..... mpeg4_mmal mpeg4 (mmal) (codec mpeg4) 
V..... vc1_mmal vc1 (mmal) (codec vc1)


ffmpeg -encoders | grep omx  //或用-codecs 
V..... h264_omx             OpenMAX IL H.264 video encoder (codec h264)
```

也可以通过编译ffmpeg的config.h中查看。比如

```
#define CONFIG_H264_VAAPI_ENCODER 1
```

如果想要查询所有编码器：要用configure

```
./configure --list-encoders   | grep omx
ffmpeg -i input -c:a copy -c:v h264_omx output
```

参考

http://www.redhenlab.org/home/the-cognitive-core-research-topics-in-red-hen/the-barnyard/hardware-encoding-with-the-raspberry-pi

https://www.jianshu.com/p/61e2c3cbc412
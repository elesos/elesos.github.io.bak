---
layout: post
title: YUV格式分析
date: 2021-07-01 08:07:24 +0800
categories: [艺搜科技,多媒体]
tags: [多媒体]
---

## 大小计算

RGB24 size＝w×h×3 Byte

RGB32 size＝w×h×4 Byte

I420（yuv420p）的数据量是 size＝w×h×1.5 Byte。 # w*h+ (w*h) / 4 + (w*h) / 4 = (w*h) * 3 / 2

yuv420p示意图：

- ![](/assets/codec/yuv-1.jpeg)

其中前w*h Byte存储Y，接着的（w*h)/4 Byte存储U，最后(w*h)/4 Byte存储V

注意上图中的yuv颜色对应关系，4个Y对应一组uv

即： I420: YYYYYYYY UU VV =>YUV420P

YV12: YYYYYYYY VV UU =>YUV420P # YV12虽然也是（4：2：0）,但是和I420在存储空间上面有些区别：UV的顺序不同，Plane模式, 类似格式：YU12

NV12: YYYYYYYY UV UV =>YUV420SP

NV21: YYYYYYYY VU VU =>YUV420SP

ffmpeg中像素格式名称后面有“P”的，代表是planar格式，否则有可能是packed格式

YUV格式有两大类：planar和packed。对于planar的YUV格式，先连续存储所有像素点的Y，紧接着存储所有像素点的U，随后是所有像素点的V。对于packed的YUV格式，每个像素点的Y,U,V是连续**交叉存储**的。

```
AV_PIX_FMT_YUV420P,    ///< planar YUV 4:2:0, 12bpp=1.5B*8=12, (1 Cr & Cb sample per 2x2 Y samples, 相当1比4的关系)   
AV_PIX_FMT_NV12,       ///< planar YUV 4:2:0, 12bpp, 1 plane for Y and 1 plane for the UV components, which are interleaved (first byte U and the 
following byte V)  ，一种two-plane模式，即Y和UV分为两个Plane，但是UV（CbCr）为交错存储,U=Cb
AV_PIX_FMT_NV21,       ///< as above, but U and V bytes are swapped  
AV_PIX_FMT_YUYV422,   ///< packed YUV 4:2:2, 16bpp
```

## 采样方式

主流的采样方式有三种，YUV4:4:4，YUV4:2:2，YUV4:2:0

以黑点表示采样该像素点的Y分量，以空心圆圈表示采用该像素点的UV分量:

![](/assets/codec/yuv-2.png)

YUV 4:2:0采样，每四个Y共用一组UV分量， 1.5B*8=12

YUV 4:2:2采样，每两个Y共用一组UV分量， wh+wh/2+wh/2=2wh=16bit

YUV 4:4:4采样，每一个Y对应一组UV分量

## YUYV

属于YUV422,每两个Y共用一组UV分量

## YUV422P

属于YUV422,先存所有的Y，然后存所有的U，最后存所有的V

## YUY2

4:2:2，应该是指YUYV

![](/assets/codec/yuy2.gif)

Y0 U0 Y1 V0, Y2 U1 Y3 V1

## UYVY

4:2:2

![](/assets/codec/uyvy.gif)

U0 Y0 V0 Y1,U1 Y2 V1 Y3

# 读

# 写

## 保存YUV420P

```
fwrite(pFrameYUV->data[0],wxh,1,output); 
fwrite(pFrameYUV->data[1],wxh/4,1,output); 
fwrite(pFrameYUV->data[2],wxh/4,1,output);
```

# 编码器需要的格式

x264 支持直接输入YUV420P，NV12 h264_omx，mpeg1video支持YUV420P

# 参考

https://docs.microsoft.com/en-us/windows/win32/medfound/recommended-8-bit-yuv-formats-for-video-rendering

https://wiki.multimedia.cx/index.php/PIX_FMT_YUYV422

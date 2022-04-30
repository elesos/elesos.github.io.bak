---
layout: post
title: FFprobe 输出 帧信息
date: 2022-04-30 05:30:00 +0800
categories: [编解码]
tags: [编解码]
---
输出每个视频帧的信息(如是否为关键帧)：

ffprobe  -print_format ini -select_streams v -show_frames input.mp4 > video_frame_info.ini
或者加上-pretty参数

ffprobe  -print_format ini -select_streams v -show_frames -pretty input.mp4 > video_frame_info.ini
其它

ffprobe -v error -show_format -show_streams input.mp4
if you would only want "size":

ffprobe -v error -show_entries format=size -of default=noprint_wrappers=1 input.mp4  #-print_format=-of

## 时长
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1 input.mp4  # -sexagesimal选项会输出 0:00:30.024000 （最后是微秒）
Duration of the first video stream：

ffprobe -v error -select_streams v:0 -show_entries stream=duration -of default=noprint_wrappers=1 input.mp4
通过整个解码获得时间

ffmpeg -i input.webm -f null - # null muxer is used so no output file is created
## 帧率
ffprobe -v error -select_streams v:0 -show_entries stream=avg_frame_rate -of default=noprint_wrappers=1 input.mp4 #有些流可能是可变帧率
## 分辨率
ffprobe -v error -select_streams v:0 -show_entries stream=height,width -of csv=s=x:p=0 input.mp4
## 参考
https://trac.ffmpeg.org/wiki/FFprobeTips
---
layout: post
title: FFmpeg 字幕处理
date: 2021-07-02 21:27:19 +0800
categories: [艺搜科技,多媒体]
tags: [ffmpeg]
---
mkv等格式文件以流的形式存储字幕，而mp4不支持这种方式。如果希望生成带字幕的mp4文件，只能将字幕“烧录”到视频中。

2个滤镜: subtitles和ass

编译时需要指定：

```
--enable-libass # ASS (Advanced SSA), SSA (SubStation Alpha) subtitle
```

从容器中提取字幕流，生成字幕文件

```
ffmpeg -i input.mkv output.srt
ffmpeg -i in.avi -vf subtitles=subtitle.srt out.avi 

ffmpeg -i in.avi -vf "ass=subtitle.ass" out.avi  #注意需要先转换为ass:
ffmpeg -i subtitle.srt subtitle.ass
```

list all the subtitle codecs that FFmpeg supports:

```
ffmpeg -codecs | grep "^...S"
ffmpeg -i video.mkv -vf subtitles=video.mkv out.avi# 如果字幕在video.mkv中，将输入文件的第一个字幕流合成到视频流中,最好用上面的那种先导出字幕，然后合成。
```

将某容器第二个字幕流合成到另一个容器的视频流中输出：

```
ffmpeg -i input.mkv -vf subtitles=video.mkv:si=1 output.mkv  # index?
```

基于图片的字幕

dvdsub is a type of picture-based overlay subtitles

```
ffmpeg -i input.mkv -filter_complex [0:v][0:s]overlay[v" -map [v] -map 0:a <output options> output.mkv
```

参考

http://trac.ffmpeg.org/wiki/HowToBurnSubtitlesIntoVideo
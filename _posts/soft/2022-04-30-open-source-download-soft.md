---
layout: post
title: 开源下载工具
date: 2022-04-30 05:30:00 +0800
categories: [艺搜软件]
tags: [艺搜软件]
---
## youtube-dl
youtube-dl [OPTIONS] URL //默认会下载质量最好的
--abort-on-error
视频选项
--max-downloads NUMBER
--no-playlist //如果url指向视频和一个列表，只下载视频
下载选项
--abort-on-unavailable-fragment 
文件系统选项
--no-overwrites
--write-description
--write-info-json
视频格式选型
--youtube-skip-dash-manifest
字幕选项
--write-auto-sub
授权选型
--username
后期处理
--recode-video FORMAT 
--keep-video 
--embed-subs  
--add-metadata
其它选型
--get-description
--get-duration
--newline
--verbose
--no-check-certificate
## you-get
需要安装Python3.2及以上，FFmpeg

pip3 install you-get
--info //查看可用的分辨率
you-get "Richard Stallman eats" //会进行谷歌搜索，然后下载相关视频
--output-dir
--output-filename
## 参考
https://github.com/ytdl-org/youtube-dl

https://github.com/soimort/you-get
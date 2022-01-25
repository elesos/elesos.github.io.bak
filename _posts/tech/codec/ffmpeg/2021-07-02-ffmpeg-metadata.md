---
layout: post
title: FFmpeg Metadata 处理
date: 2021-07-02 21:27:19 +0800
categories: [艺搜科技,多媒体]
tags: [ffmpeg]
---
```
ffmpeg -i cuc_ieschool.flv -metadata title="elesos title" -metadata year="2020" out.flv //有些需要容器格式支持才能写进去，此外还有copyright，author等
```

可以在打开码流前指定各种参数，比如：探测时间、超时时间、最大延时、支持的协议白名单等

```
-map_metadata -1 表示清除所有元数据
AVDictionary *options = NULL;
av_dict_set(&options, “probesize”, “4096", 0);
av_dict_set(&options, “max_delay”, “5000000”, 0);

AVFormatContext *ic = avformat_alloc_context();
if (avformat_open_input(&ic, url, NULL, &options) < 0) {
    loge("could not open source %s", url);
    return -1;
}
```

av_dict_set支持配置哪些key呢？搜索一下probesize关键字，可以发现

```
libavformat\options_table.h
```

AVCodec相关的 options 选项在

```
libavcodec/options_table.h 
```

如何通过api设置metadata：

可以在avformat_write_header之前(不是调用时)设置 AVFormatContext>metadata

```
if(av_dict_set(&ofmt_ctx->metadata,"title","elesos.com", 0) < 0){
		av_log(NULL, AV_LOG_ERROR, "av_dict_set failed.\n");
	}
...
ret = avformat_write_header(ofmt_ctx, NULL);
```

参考

https://wiki.multimedia.cx/index.php/FFmpeg_Metadata

https://blog.51cto.com/ticktick/1891948
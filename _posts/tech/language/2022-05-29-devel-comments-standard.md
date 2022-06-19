---
layout: post
title: 常用函数注释规范
date: 2022-05-29 05:30:00 +0800
categories: [开发]
tags: [开发]
---

## c
``` 
/**
 * Open an input stream and read the header. The codecs are not opened.
 * The stream must be closed with avformat_close_input().
 *
 * @param ps Pointer to user-supplied AVFormatContext (allocated by avformat_alloc_context).
 *           May be a pointer to NULL, in which case an AVFormatContext is allocated by this
 *           function and written into ps.
 *           Note that a user-supplied AVFormatContext will be freed on failure.
 * @param url URL of the stream to open.
 * @param fmt If non-NULL, this parameter forces a specific input format.
 *            Otherwise the format is autodetected.
 * @param options  A dictionary filled with AVFormatContext and demuxer-private options.
 *                 On return this parameter will be destroyed and replaced with a dict containing
 *                 options that were not found. May be NULL.
 *
 * @return 0 on success, a negative AVERROR on failure.
 *
 * @note If you want to use custom IO, preallocate the format context and set its pb field.
 *
int avformat_open_input(AVFormatContext **ps, const char *url, ff_const59 AVInputFormat *fmt, AVDictionary **options);

/**
 * Find a registered decoder with a matching codec ID.
 *
 * @param id AVCodecID of the requested decoder
 * @return A decoder if one was found, NULL otherwise.
 */
AVCodec *avcodec_find_decoder(enum AVCodecID id);

/**
* @return zero on success, a negative value on error 
*/
int avcodec_open2(AVCodecContext *avctx, const AVCodec *codec, AVDictionary **options);
```
## php
```
/**
 * Get a validator for an incoming registration request.
 *
 * @param  xxx
 * @return xxx
 */
```
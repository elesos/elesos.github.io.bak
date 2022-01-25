---
layout: post
title: X264 编码指南
date: 2021-07-02 21:27:19 +0800
categories: [艺搜科技,多媒体]
tags: [ffmpeg]
---
通常有2种码率控制模式：Constant Rate Factor (CRF) or Two-Pass ABR

#### CRF恒定码率系数

目的是为了输出质量，而不关心大小；

码率不可控，不推荐用于网络流

选择一个CRF值：

范围为 0-51，0 为无损，默认23，建议值17，18

CRF值每加6，码率大概减少一半；每次减6则会使码率增加一倍。

选择一个预设preset：

预设是一系列选项的集合，能够在编码速度和压缩率之间做出一个权衡，

速度稍慢的预设，相同质量时，占用空间更小。从而码率也更低

通过x264 --fullhelp 可以看到各个preset的具体设置

你也可以根据输入文件的特性选择-tune选项，

如果你的输入文件是动画，则可以用animation。

另一个可选的参数是-profile:v，通常不用，除非目标设备仅支持某种profile.

```
ffmpeg -i input -c:v libx264 -preset slow -crf 22 -c:a copy output.mkv
ffmpeg -i input -c:v libx264 -preset slow -crf 18 -c:a copy -pix_fmt yuv420p output.mkv  # 质量与输入差不多，但可能大小更小一些
```

使用静态图像创建视频：

```
ffmpeg -loop 1 -framerate 2 -i input.png -i audio.m4a -c:v libx264 -preset medium -tune stillimage -crf 18 -c:a copy -shortest -pix_fmt yuv420p output.mkv
```

#### Two-Pass

确定大小的文件，视频质量并不重要。

例如：你的视频时长 10 minutes 想要输出一个 50 MB大小的文件.(比特率= 文件大小/ 时长)

```
(50 MB * 1024*8 [converts MB to kbit]) / 600 seconds = ~683 kilobits/s （总码率）
683k - 128k (期望的音频码率) = 555k （视频比特率）
```

从而：

```
ffmpeg -y -i input -c:v libx264 -b:v 555k -pass 1 -an -f mp4 /dev/null 
ffmpeg -i input -c:v libx264  -b:v 555k -pass 2 -c:a libfdk_aac -b:a 128k output.mp4
```

#### 无损H.264编码

通过 -crf 0实现，可同时配合2个有用的预设ultrafast 或 veryslow。

快速编码

```
ffmpeg -i input -c:v libx264 -preset ultrafast -crf 0 output.mkv
```

高压缩比

```
ffmpeg -i input -c:v libx264 -preset veryslow -crf 0 output.mkv
```

#### 覆盖默认preset值

通过x264-params，或libx264 私有选项，（参见ffmpeg -h encoder=libx264）。一般不建议使用。

```
ffmpeg -i input -c:v libx264 -preset slow -crf 22 -x264-params keyint=123:min-keyint=20 -c:a copy output.mkv
```

#### ABR (Average Bit Rate)

```
ffmpeg -i input -c:v libx264 -b:v 1000k output.mp4
```

对简单的画面，用小于设定的码率去编码，而对于复杂的画面，将进行高质量的编码，从而在整体上达到指定的码率，和2-pass一起用效果更好，同时也可以指定max bit rate防止码率产生大的波动。

#### CBR (Constant Bit Rate)

没有原生的CBR模式，但可模拟。

```
ffmpeg -i input -c:v libx264 -x264-params "nal-hrd=cbr"  -b:v 1M -minrate 1M -maxrate 1M -bufsize 2M out.m2v
```

-bufsize是一个“码率控制buffer”, 会在每2M数据内达到你要求的均值

```
ffmpeg -i input -c:v libx264 -crf 20-maxrate 1M -bufsize 2M output.mp4
```

这会有效地接近crf 20，但当输出超过1MBit/s时，会增加crf的值。 To reach a perfect maximum bit rate, use two-pass

```
ffmpeg -i input -c:v libx264 -b:v 1M -maxrate 1M -bufsize 2M -pass 1 -f mp4 /dev/null
ffmpeg -i input -c:v libx264 -b:v 1M -maxrate 1M -bufsize 2M -pass 2 output.mp4
```

#### 视频兼容性

可以指定-profile:v baseline -level 3.0

#### 网络视频

对于mp4,m4v,mov,不适用于mkv,可以在输出选项中加上-movflags +faststart，可以在全部下载完成之前就可以开始播放。(会将moov atom 放在文件开头)

```
ffmpeg -i input.mp4 -c copy -movflags +faststart output.mp4 #不会编码
```

If your input files are RGB, Use -c:v libx264rgb instead. 某些音乐文件包含专辑封面，一般是音频文件里面有个视频流，如果没有专辑封面，可以自已创建一个，用上面一样的命令：

```
ffmpeg -loop 1 -framerate 2 -i input.png -i audio.m4a -c:v libx264 -preset medium -tune stillimage -crf 18 -c:a copy -shortest -pix_fmt yuv420p output.mkv
```

给音乐加上特效

```
ffmpeg -i input.mp3 -filter_complex \
"[0:a]avectorscope=s=640x518[left]; \
[0:a]showspectrum=mode=separate:color=intensity:scale=cbrt:s=640x518[right]; \
[0:a]showwaves=s=1280x202:mode=line[bottom]; \
[left][right]hstack[top]; \
[top][bottom]vstack,drawtext=fontfile=Vera.ttf:fontcolor=white:x=10:y=10:text='\"Song Title\" by Artist'[out]" \
-map "[out]" -map 0:a -c:v libx264 -preset fast -crf 18 -c:a copy output.mkv
```

带宽有限制时，应该使用VBV (Video Buffer Verifier) with the -maxrate and -bufsize options

假设上传速率为1024kbit / s，可以利用80％= 820 kbit / s。音频会消耗128kbit/s，最后晟大约692 kbit / s的视频：这就是你-maxrate值。

If you use -maxrate 960k then use a -bufsize of 960k-1920k.（会有1到2秒的延迟）

参考

https://trac.ffmpeg.org/wiki/Encode/H.264
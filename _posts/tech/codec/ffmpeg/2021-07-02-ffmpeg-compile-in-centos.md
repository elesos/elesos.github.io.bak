---
layout: post
title: 在CentOS下编译FFmpeg
date: 2021-07-02 21:27:19 +0800
categories: [艺搜科技,多媒体]
tags: [ffmpeg]
---
Get the Dependencies

```
yum install autoconf automake cmake freetype-devel gcc gcc-c++ git libtool make mercurial nasm pkgconfig zlib-devel bzip2  # mercurial 就是hg
mkdir ~/ffmpeg_sources
```

NASM

An assembler 汇编程序 used by some libraries. Highly recommended or your resulting build may be very slow.

```
cd ~/ffmpeg_sources
curl -O -L https://www.nasm.us/pub/nasm/releasebuilds/2.14.02/nasm-2.14.02.tar.bz2
./autogen.sh
./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin"
make && make install
```

Yasm

Yasm is an assembler used by x264 and FFmpeg.

```
cd ~/ffmpeg_sources
git clone --depth 1 git://github.com/yasm/yasm.git
或curl -O -L https://www.tortall.net/projects/yasm/releases/yasm-1.3.0.tar.gz
autoreconf -fiv
./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin"
make && make install
make distclean
```

libx264

H.264 video encoder.

Requires ffmpeg to be configured with --enable-gpl --enable-libx264.

```
cd ~/ffmpeg_sources
git clone --branch stable --depth 1 https://code.videolan.org/videolan/x264.git
PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig"./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin" --enable-static
make && make install
make distclean
```

libx265

H.265/HEVC video encoder.

Requires ffmpeg to be configured with --enable-gpl --enable-libx265.

```
cd ~/ffmpeg_sources
hg clone https://bitbucket.org/multicoreware/x265
cd ~/ffmpeg_sources/x265/build/linux
cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$HOME/ffmpeg_build" -DENABLE_SHARED:bool=off ../../source
make
make install
```

libfdk_aac

AAC audio encoder.

Requires ffmpeg to be configured with --enable-libfdk-aac (and --enable-nonfree if you also included --enable-gpl).

```
cd ~/ffmpeg_sources
git clone --depth 1 git://git.code.sf.net/p/opencore-amr/fdk-aac
autoreconf -fiv
./configure --prefix="$HOME/ffmpeg_build" --disable-shared
make && make install 
make distclean
```

libmp3lame

MP3 audio encoder.

Requires ffmpeg to be configured with --enable-libmp3lame.

```
cd ~/ffmpeg_sources
curl -L -O http://downloads.sourceforge.net/project/lame/lame/3.99/lame-3.99.5.tar.gz
./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin" --disable-shared --enable-nasm
make && make install
make distclean
```

libopus

Opus audio decoder and encoder.

Requires ffmpeg to be configured with --enable-libopus.

```
cd ~/ffmpeg_sources
git clone git://git.opus-codec.org/opus.git
autoreconf -fiv
./configure --prefix="$HOME/ffmpeg_build" --disable-shared
make && make install
make distclean
```

libogg

Ogg bitstream library. Required by libtheora and libvorbis.

```
cd ~/ffmpeg_sources
curl -O http://downloads.xiph.org/releases/ogg/libogg-1.3.2.tar.gz
./configure --prefix="$HOME/ffmpeg_build" --disable-shared
make && make install
make distclean
```

libvorbis

Vorbis audio encoder. Requires libogg.

Requires ffmpeg to be configured with --enable-libvorbis.

```
cd ~/ffmpeg_sources
curl -O http://downloads.xiph.org/releases/vorbis/libvorbis-1.3.4.tar.gz
LDFLAGS="-L$HOME/ffmeg_build/lib" CPPFLAGS="-I$HOME/ffmpeg_build/include" ./configure --prefix="$HOME/ffmpeg_build" --with-ogg="$HOME/ffmpeg_build" --disable-shared
make && make install
make distclean
```

libvpx

VP8/VP9 video encoder and decoder.

Requires ffmpeg to be configured with --enable-libvpx.

```
cd ~/ffmpeg_sources
git clone --depth 1 https://chromium.googlesource.com/webm/libvpx.git
地址要改为  git clone https://github.com/webmproject/libvpx
./configure --prefix="$HOME/ffmpeg_build" --disable-examples --disable-unit-tests --enable-vp9-highbitdepth --as=yasm
make && make install
```

FFmpeg

```
cd ~/ffmpeg_sources
git clone --depth 1 git://source.ffmpeg.org/ffmpeg
PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure --prefix="$HOME/ffmpeg_build" --extra-cflags="-I$HOME/ffmpeg_build/include" --extra-ldflags="-L$HOME/ffmpeg_build/lib" --bindir="$HOME/bin" --pkg-config-flags="--static" --enable-gpl --enable-nonfree --enable-libfdk-aac --enable-libfreetype --enable-libmp3lame --enable-libopus --enable-libvorbis --enable-libvpx --enable-libx264 --enable-libx265
make && make install 
make distclean
hash -r  //最新的是hash -d ffmpeg是什么意思？
```

更新

Keep the ffmpeg_sources directory and all contents if you intend to update as shown below. Otherwise you can delete this directory.

Updating Development of FFmpeg is active and an occasional update can give you new features and bug fixes. First, remove the old files and then update the dependencies:

```
rm -rf ~/ffmpeg_build ~/bin/{ffmpeg,ffprobe,ffserver,lame,vsyasm,x264,x265,yasm,ytasm}
```

1. yum install autoconf automake cmake gcc gcc-c++ git libtool make mercurial nasm pkgconfig zlib-devel

Update Yasm

```
cd ~/ffmpeg_sources/yasm
make distclean
git pull
```

Then run ./configure, make, and make install as shown in the Install yasm section.

Update x264

```
cd ~/ffmpeg_sources/x264
make distclean
git pull
```

Then run ./configure, make, and make install as shown in the Install x264 section.

Update x265

```
cd ~/ffmpeg_sources/x265
rm -rf ~/ffmpeg_sources/x265/build/linux/*
hg update
cd ~/ffmpeg_sources/x265/build/linux
```

Then run cmake, make, and make install as shown in the Install x265 section.

Update libfdk_aac

```
cd ~/ffmpeg_sources/fdk_aac
make distclean
git pull
```

Then run ./configure, make, and make install as shown in the Install libfdk_aac section.

Update libvpx

```
cd ~/ffmpeg_sources/libvpx
make clean
git pull
```

Then run ./configure, make, and make install as shown in the Install libvpx section.

Update FFmpeg

```
cd ~/ffmpeg_sources/ffmpeg
make distclean
git pull
```

Then run ./configure, make, and make install as shown in the Install FFmpeg section.

Reverting changes made by this guide

```
rm -rf ~/ffmpeg_build ~/ffmpeg_sources ~/bin/{ffmpeg,ffprobe,ffserver,lame,vsyasm,x264,yasm,ytasm}
# yum erase  xxx
hash -r
```

参考

https://trac.ffmpeg.org/wiki/CompilationGuide/Centos
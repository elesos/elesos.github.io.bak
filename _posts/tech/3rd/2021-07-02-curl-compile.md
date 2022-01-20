---
layout: post
title: Curl 源码编译
date: 2021-07-02 21:09:41 +0800
categories: [艺搜科技,第三方库]
tags: [第三方库]
---

先编译openssl

```
git clone https://github.com/curl/curl.git
autoreconf -fi	#只有git下载的有这一步 https://github.com/curl/curl/blob/master/GIT-INFO
./configure  --with-ssl=/usr/local/ssl  --prefix=   
make 
make install
```

If you have OpenSSL installed in /usr/local/ssl, you can run configure like:

```
./configure --with-openssl
```

否则

```
./configure --with-openssl=/opt/OpenSSL
```

If you have OpenSSL installed, but with the libraries in one place and the header files somewhere else, you have to set the LDFLAGS and CPPFLAGS environment variables prior to running configure. Something like this should work:

```
CPPFLAGS="-I/path/to/ssl/include" LDFLAGS="-L/path/to/ssl/lib" ./configure  //如果删除了动态库的软链接，还需要修改pc文件。
```

If you have shared SSL libs installed in a directory where your run-time linker doesn't find them (which usually causes configure failures), you can provide this option to gcc to set a hard-coded path to the run-time linker:

```
LDFLAGS=-Wl,-R/usr/local/ssl/lib ./configure --with-openssl
```

## Mac

```
Apple's SSL/TLS implementation ,secure transport: --with-secure-transport  or --with-darwin-ssl
```

```
export ARCH=x86_64
export SDK=macosx
export DEPLOYMENT_TARGET=10.8

export CFLAGS="-arch $ARCH -isysroot $(xcrun -sdk $SDK --show-sdk-path) -m$SDK-version-min=$DEPLOYMENT_TARGET"
./configure --host=$ARCH-apple-darwin --prefix $(pwd)/artifacts --with-darwin-ssl
make -j8
make install
```

其它选项

```
--disable-static --with-zlib=PATH
```

## win

开始菜单中打开 Visual Studio 目录中的 VS2017的开发人员命令提示符，并切换到 curl 解压目录下的 winbuild 目录下；

```
nmake /f Makefile.vc mode=dll //输出在 curl 目录 builds 下。
静态 nmake /f Makefile.vc mode=static ENABLE_IDN=no

nmake /f Makefile.vc mode=dll ZLIB_PATH=D:\fvbl\3rdparty\libz\win SSL_PATH=D:\fvbl\3rdparty\OpenSSL\win ENABLE_WINSSL=no WITH_SSL=dll WITH_ZLIB=dll MACHINE=x64
```

## 小结

```
./configure --prefix=xxx --with-ssl=xxx/OpenSSL--with-zlib=/xxx/zlib/ --disable-static
```



如果需要debug版，将DEBUG=no改为DEBUG=yes。

//#define USE_SOCKETPAIR 1  修改这个不让使用Curl_socketpair

https://github.com/curl/curl-for-win





## 参考

https://curl.haxx.se/docs/install.html

https://curl.se/download.html

https://www.cnblogs.com/rxbook/p/10881822.html

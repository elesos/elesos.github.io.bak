---
layout: post
title: Libzip vs zlib
date: 2022-04-30 05:30:00 +0800
categories: [c]
tags: [c]
---
libzip is an open source library for handling zip archives. It is written in portable C and can thus be used on multiple operating systems. It is based on zlib.

libzip依赖zlib

https://libzip.org/

https://zlib.net/ # zlib is already included as part of macOS


Libzip编译 https://github.com/nih-at/libzip/blob/master/INSTALL.md

## mac
CMakeLists.txt

将下面的全部关掉，压缩包里面已经改过了
```
OPTION(ENABLE_COMMONCRYPTO "Enable use of CommonCrypto" ON)
OPTION(ENABLE_GNUTLS "Enable use of GnuTLS" ON)
OPTION(ENABLE_MBEDTLS "Enable use of mbed TLS" ON)
OPTION(ENABLE_OPENSSL "Enable use of OpenSSL" ON)
OPTION(ENABLE_WINDOWS_CRYPTO "Enable use of Windows cryptography libraries" ON)
OPTION(ENABLE_BZIP2 "Enable use of BZip2" ON)
OPTION(ENABLE_LZMA "Enable use of LZMA" ON)
OPTION(BUILD_TOOLS "Build tools in the src directory (zipcmp, zipmerge, ziptool)" ON)
OPTION(BUILD_REGRESS "Build regression tests" ON)
OPTION(BUILD_EXAMPLES "Build examples" ON)
OPTION(BUILD_DOC "Build documentation" ON)  
export MACOSX_DEPLOYMENT_TARGET=10.13 && cmake .. -DCMAKE_PREFIX_PATH="/Users/xxx/3rdparty/libz/mac"  -DCMAKE_MODULE_PATH="/Users/xxx/3rdparty/libz/mac" -DCMAKE_INSTALL_PREFIX="/Users/xxx/3rdparty/libzip/libzip-1.6.1/install"
```
目前找不到自己的zlib,需要建立软链接libz.dylib

make
make install
## arm64
cmake .. -DCMAKE_PREFIX_PATH="/Users/xxx/3rdparty/libz/arm64" -DCMAKE_MODULE_PATH="/Users/xxx/3rdparty/libz/arm64" -DCMAKE_INSTALL_PREFIX="/Users/xxx/3rdparty/libzip/libzip-1.6.1/install"
make
make install
## win
需要zlib install里面的头文件，不能与mac共用头文件。

注意：win编译后需要install的头文件(里面会针对win做一些修改)，不然可能找不到一些头文件。比如unistd.h

cmake .. -G "Visual Studio 15 2017 Win64" -DCMAKE_PREFIX_PATH="D:\fvbl\3rdparty\libz\win"    
然后用vs编译
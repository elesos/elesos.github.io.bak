---
layout: post
title: openssl编译
date: 2021-07-05  17:18:23 +0800
categories: [艺搜科技,第三方库]
tags: [openssl]
---

the second generation abandons the monolithic Configure and places individual configurations in the Configurations directory.

you should always perform a make test to ensure the library performs as expected under its self tests.

If you are building OpenSSL 1.1.0 and above, then you will also need PERL 5.10 or higher (see README.PERL for details).


using Configure and config. 最好用Configure

You can run Configure LIST to see a list of available platforms.

You can also configure on Darwin by exporting KERNEL_BITS: $ export KERNEL_BITS=64

```
./config shared no-ssl2 no-ssl3 enable-ec_nistp_64_gcc_128 --openssldir=/usr/local/ssl/macosx-x64/
```

you should perform a make clean to ensure the list of objects files is accurate after a reconfiguration.

when building a shared object, both the static archive and shared objects are built. You do not need to do anything special to build both when shared is specified.

```
--prefix=XXX --openssldir shared no-ssl2 
```

Using RPATHs

```
./config -Wl,-rpath=/usr/local/ssl/lib -Wl,--enable-new-dtags
```

verify the settings stuck: $ readelf -d ./libssl.so | grep -i -E 'rpath|runpath'

$ ldd /usr/local/ssl/lib/libssl.so linux-vdso.so.1 => (0x00007ffceff6c000)

```
ibcrypto.so.1.0.0 => /usr/local/ssl/lib/libcrypto.so.1.0.0 (0x00007ff5eff96000)
```



make

make test

sudo make install

## OS X

./Configure darwin64-x86_64-cc shared enable-ec_nistp_64_gcc_128 no-ssl2 no-ssl3 no-comp --openssldir=/usr/local/ssl/macos-x86_64 make depend sudo make install



```
./Configure darwin64-x86_64-cc shared no-ssl2 --prefix=/Users/ws/Downloads/openssl_build --openssldir=/Users/ws/Downloads/openssl_build -Wl,-rpath=/usr/local/myssl/lib -Wl,--enable-new-dtags
./config shared no-ssl2 --prefix=/Users/ws/Downloads/openssl_build --openssldir=/Users/ws/Downloads/openssl_build -Wl,-rpath=/usr/local/myssl/lib -Wl,--enable-new-dtags
 '-Wl,--enable-new-dtags,-rpath,$(LIBRPATH)'
```

如果不识别 RPATH

unknown option: -rpath=

hard coding the RPATH into a configure line. For example, on Debian x86_64 open the file Configure in an editor, copy linux-x86_64, name it linux-x86_64-rpath, and make the following change to add the -rpath option. Notice the addition of -Wl,-rpath=... in two places.

```
"linux-x86_64-rpath", "gcc:-m64 -DL_ENDIAN -O3 -Wall -Wl,-rpath=/usr/local/ssl/lib::
 -D_REENTRANT::-Wl,-rpath=/usr/local/ssl/lib -ldl:SIXTY_FOUR_BIT_LONG RC4_CHUNK DES_INT DES_UNROLL:
 ${x86_64_asm}:elf:dlfcn:linux-shared:-fPIC:-m64:.so.\$(SHLIB_MAJOR).\$(SHLIB_MINOR):::64",
```

Above, fields 2 and 6 were changed. They correspond to $cflag and $ldflag in OpenSSL's builds system. Then, Configure with the new configuration:

```
$  ./Configure linux-x86_64-rpath
```

小结：

```
export MACOSX_DEPLOYMENT_TARGET=10.13 &&  ./Configure darwin64-x86_64-cc shared --prefix=xxx --openssldir=xxx
```

## 版本

/usr/include/openssl/opensslv.h

```
openssl version -a
```

## 参考

https://wiki.openssl.org/index.php/Compilation_and_Installation

https://github.com/openssl/openssl/blob/master/INSTALL.md

https://www.openssl.org/docs/faq.html

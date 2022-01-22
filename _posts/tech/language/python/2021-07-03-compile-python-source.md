---
layout: post
title: 源码编译Python
date: 2021-07-03 08:33:29 +0800
categories: [艺搜科技,编程]
tags: [Python]
---

注意xcode里面也有python framework

```
Contents/Developer/SDKs/MacOSX.sdk/System/Library/Frameworks/Python.framework
```

https://devguide.python.org/setup/

以下在mac下测试

libzma

```
brew install openssl xz gdbm zlib
```


GNU dbm (or GDBM, for short) is a library of database functions that use extensible hashing and work similar to the standard UNIX dbm. These routines are provided to a programmer needing to create and manipulate a hashed database.

The basic use of GDBM is to store key/data pairs in a data file. Each key must be unique and each key is paired with only one data item.


https://github.com/python/cpython/blob/master/Mac/README.rst

```
 ./configure --with-pydebug --with-openssl=$(brew --prefix openssl) --with-zlib
```

unrecognized options: --with-zlib

```
--with-libs=zlib CPPFLAGS='-I/opt/zlib/include' LDFLAGS='-L/opt/zlib/lib'
```



```
brew --prefix openssl=/usr/local/opt/openssl@1.1/ 里面放的是include，bin和lib,如果是源码安装的openssl，自己指定目录，不要用brew的
```

You might need to run make clean before or after re-running configure in a particular build directory.

```
mkdir debug
cd debug
../configure --with-pydebug
make
$ ./configure --enable-framework=/Users/ronald/Library/Frameworks
$ make && make install
```


This will install the framework itself in /Users/ronald/Library/Frameworks, the applications in a subdirectory of /Users/ronald/Applications and the command-line tools in /Users/ronald/bin.


https://github.com/python/cpython/tree/master/Mac#building-and-using-a-framework-based-python-on-macos

有用选项

```
--prefix= --enable-shared 
--with-pydebug          build with Py_DEBUG defined
--with-libs='lib1 ...'  link against additional libs

../configure --with-openssl=/usr/local/opt/openssl@1.1 --prefix=/Users/ws/Downloads/python_build_2 --enable-shared --with-libs=zlib CPPFLAGS='-I/Users/xx/Downloads/zlib_build/include' LDFLAGS='-L/Users/xx/Downloads/zlib_build/lib'
LDFLAGS="-L/usr/local/lib $LDFLAGS"
--with-libs=libz 
```



```
/configure --prefix=/Users/ws/Downloads/build/python --enable-optimizations --disable-shared --disable-ipv6 --with-libs=libz --with-openssl=/Users/ws/Downloads/build/openssl CPPFLAGS=-I/Users/ws/Downloads/build/zlib LDFLAGS=-L/Users/ws/Downloads/build/zlib

./python3 -c "import zlib; print(zlib.__version__)"
Edit /Modules/Setup and uncomment the line:
```

zlib zlibmodule.c -I$(prefix)/include -L$(exec_prefix)/lib -lz

```
./configure --enable-shared --prefix=/Users/ws/build/python --with-openssl=/Users/ws/build/openssl CPPFLAGS=-I/Users/ws/build/zlib/include LDFLAGS=-L/Users/ws/build/zlib/lib
```

## 小结

```
./configure --prefix=xxx --with-openssl=xxx/OpenSSL/ --enable-shared 
```

记得最后确认下输出，以确保ssl被链接上。如果ssl有rpath,把ssl库拷贝到python源码目录就可以。

```
Python build finished, but the necessary bits to build these modules were not found:
```

## 精简

```
rm -rf __pycache__ \
rm -rf asyncio/__pycache__ \
rm -rf collections/__pycache__ \
rm -rf concurrent/__pycache__  \
rm -rf concurrent/futures/__pycache__  \
rm -rf config-3.8-darwin  \
rm -rf ctypes/__pycache__  \
rm -rf ctypes/macholib/__pycache__  \
rm -rf ctypes/test/__pycache__  \
rm -rf ctypes/test  \
rm -rf curses/__pycache__  \
rm -rf dbm/__pycache__  \
rm -rf distutils/__pycache__  \
rm -rf distutils/command/__pycache__  \
rm -rf distutils/tests  \
rm -rf email/__pycache__  \
rm -rf email/mime/__pycache__  \
rm -rf encodings/__pycache__  \
rm -rf ensurepip/__pycache__  \
rm -rf html/__pycache__  \
rm -rf http/__pycache__  \
rm -rf idlelib/__pycache__  \
rm -rf idlelib/idle_test  \
rm -rf importlib/__pycache__  \
rm -rf json/__pycache__  \
rm -rf lib2to3/__pycache__  \
rm -rf lib2to3/fixes/__pycache__  \
rm -rf lib2to3/pgen2/__pycache__  \
rm -rf lib2to3/tests  \
rm -rf logging/__pycache__  \
rm -rf multiprocessing/__pycache__  \
rm -rf multiprocessing/dummy/__pycache__  \
rm -rf pydoc_data/__pycache__ \
rm -rf sqlite3/__pycache__  \
rm -rf sqlite3/test  \
rm -rf test  \
rm -rf tkinter/__pycache__  \
rm -rf tkinter/test  \
rm -rf turtledemo/__pycache__  \
rm -rf unittest  \
rm -rf urllib/__pycache__  \
rm -rf venv/__pycache__  \
rm -rf wsgiref/__pycache__  \
rm -rf xml/__pycache__  \
rm -rf xml/dom/__pycache__  \
rm -rf xml/etree/__pycache__  \
rm -rf xml/parsers/__pycache__  \
rm -rf xml/sax/__pycache__  \
rm -rf xmlrpc/__pycache__ 


distutils\command\下的exe
rm -rf site-packages/*
```

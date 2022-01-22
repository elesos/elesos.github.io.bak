---
layout: post
title: 利用 install_name_tool 修改 rpath
date: 2021-11-08 20:38:06 +0800
categories: [艺搜科技,编程]
tags: [编程]
---

@executable_path 表示可执行程序所在的目录. 比如 /path/taobao.app/Contents/MacOS/

@loader_path 表示每一个被加载的 binary (包括可执行程序, dylib, framework 等) 所在的目录.


ABC.dylib的Build Settings中设置Installation Directory 在 softA.app或softB.app 中设置 Run path Search Paths(对应了@rpath)

在编译一个动态库比如 libfoo.dylib 的时候, 你需要指定 INSTALL_PATH. 也就是它的安装路径.

install_name_tool 还可以删除/替换/添加 @rpath, 比如:

$ install_name_tool -add_rpath @executable_path/../frameworks testA.app/Contents/MacOS/testA



修改依赖的动态库的加载路径, 比如:

```
install_name_tool -change {old.dylib}          {new.dylib} {filename}
install_name_tool -change @rpath/libTest.dylib @loader_path/libTest.dylib testA.app/Contents/MacOS/testA
```



修改自身的安装路径，比如：

$ install_name_tool -id @rpath/libTest.dylib libTest.dylib


在XCode中设置

```
 在编译动态链接库文件(*.dylib)时，应当将install name设置为@rpath/library.dylib。
```

在其他程序中使用这个动态库时，需要设置好run path。打开XCode的Build Settings，直接搜索"runpath"：


查到otool -D 命令可以显示某个dylib的install name属性:


https://blog.csdn.net/liangzhao_jay/article/details/72732132


@executable_path就等于/Users/USER/Documents/quawindow.app/Contents/MacOS/quawindow

假如quawindow.app引用了一个插件Share.appex,位于quawindow.app/Contents/Extention/Share.appex

Share.appex又引用了libquazip.1.dylib,位quawindow.app/Contents/Extention/Share.appex/Contents/Frameworks/libquazip.1.dylib:

1,把libquazip.1.dylib的install name指定为@loader_path/../Frameworks/libquazip.1.dylib

@loader_path等于/Users/hxq/Documents/quawindow.app/Contents/Extention/Share.appex/Contents/MacOS/Share

@executable_path依旧等于/Users/USER/Documents/quawindow.app/Contents/MacOS/quawindow

因此使用@loader_path设定libquazip.1.dylib加载路径,能够保证不论被引用的Share.appex放入quawindow.app里面的任意位置,都能够让libquazip.1.dylib正确的加载.

2,例如把libquazip.1.dylib的install name指定为@rpath/libquazip.1.dylib后,加载路径归属权就交给了引用它的quawindow.app. 要在编译时候去指定quawindow.app的@rpath

quawindow.app启动查找引用的libquazip.1.dylib路径,发现其install name是@rpath, 发现主动权在自己手中.就立马去查找自身设定的@rpath,设定为@executable_path/../Frameworks, @loader_path/../Frameworks 然后@executable_path或者@loader_path都被解析成了/Users/USER/Documents/quawindow.app/Contents/MacOS/quawindow 既而@executable_path/../Frameworks成功找到Frameworks下的libquazip.1.dylib.


怎么在构建动态库的xcode工程里面设定这个install name:搜索Install找到

https://www.jianshu.com/p/5bf7795db50d

命令行怎么使用那些路径是rpath的库？export DYLD_LIBRARY_PATH=sss/lib:DYLD_LIBRARY_PATH



# 查看 mac 动态库 dylib 的版本

```
otool -L /Developer/SDKs/MacOSX10.4u.sdk/usr/lib/libSystem.B.dylib
```


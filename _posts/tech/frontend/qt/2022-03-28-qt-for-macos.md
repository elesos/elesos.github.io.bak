---
layout: post
title: Qt for macOS 打包
date: 2022-03-28 23:30:00 +0800
categories: [Qt]
tags: [Qt]
---

https://doc.qt.io/qt-5/macos.html

https://doc.qt.io/qt-5/macos-deployment.html



/Users/#####/Qt5.2.1/5.2.1/clang_64/bin加到环境变量

安装xcode后，需要，sudo xcode-select --switch /Applications/Xcode.app

```
验证
xcode-select -print-path
```

```
 xcrun -sdk macosx -find clang
 xcrun -sdk macosx --show-sdk-path
```

`qmake` can generate project files for Xcode with `-spec macx-xcode`. 

```
qmake -spec macx-xcode project.pro
```

qmake报错：Your Evaluation license has expired.  用老版本的qmake即可。

又报Project ERROR: Cannot run compiler 'cl'. 添加环境变量

改用cmake, 不用qmake   https://doc.qt.io/qt-5/cmake-manual.html

为了find_package能成功找到包，需要设置环境变量：CMAKE_PREFIX_PATH





The main difference is that X11 is not used as the windowing system. Instead, macOS uses its own native windowing system that is accessible through the Cocoa API.



You can check what other libraries your application links to using the `otool`:

```
otool -L plugandpaint.app/Contents/MacOs/plugandpaint
```

For more information on how to build Qt without Frameworks, visit the [Qt for macOS - Specific Issues](https://doc.qt.io/qt-5/macos-issues.html) documentation.











```
install_name_tool -id @executable_path/../Frameworks/QtCore.framework/Versions/4.0/QtCore
       plugandpaint.app/Contents/Frameworks/QtCore.framework/Versions/4.0/QtCore
```

```
install_name_tool -change path/to/Qt/lib/QtCore.framework/Versions/4.0/QtCore
        @executable_path/../Frameworks/QtCore.framework/Versions/4.0/QtCore
        plugandpaint.app/Contents/MacOs/plugandpaint
```

Finally, the [QtGui](https://doc.qt.io/qt-5/qtgui-module.html) framework depends on [QtCore](https://doc.qt.io/qt-5/qtcore-module.html), 需要install_name_tool修改路径。

拷贝文件时用-R选项，As frameworks contain symbolic links, we use the `-R` option.

https://doc.qt.io/qt-5/macos-issues.html



打包dmg 

先编译release版本app

```
macdeployqt MyApp.app  -dmg
```

生成的.app文件还不能直接发布，因为app使用的各种依赖库并没有包含在app中，所以需要进行额外的流程将对应的依赖库打包进来

动态库如果想在让程序在bundle里面找，需要install_name_tool改一下路径为@rpath/xxxx/libXXXX.1.dylib形式的，然后放在Frameworks/xxxxx目录
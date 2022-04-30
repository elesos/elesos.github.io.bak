---
layout: post
title: Make cmake link against the correct Python framework
date: 2022-04-30 05:30:00 +0800
categories: [Python]
tags: [Python]
---
How can I make cmake link against the correct Python framework found in

/opt/local/Library/Frameworks/Python.framework/Python rather than the system one in

/System/Library/Frameworks/Python.framework/Python


Adding the following in ~/.bash_profile

export DYLD_FRAMEWORK_PATH=/opt/local/Library/Frameworks

pass the -F flag to specify a new framework search path. For example, -F/opt/local/Library/Frameworks


https://cmake.org/cmake/help/latest/search.html?q=mac

https://cmake.org/cmake/help/latest/prop_sf/MACOSX_PACKAGE_LOCATION.html?highlight=mac#prop_sf:MACOSX_PACKAGE_LOCATION


CMAKE_CXX_FLAGS 指定头文件（.h文件）的路径 如：CFLAGS=-I/usr/include -I/path/include

LDFLAGS：用于指定库文件的位置。用法：LDFLAGS=-L/usr/lib -L/path/to/your/lib

LIBS：告诉链接器要链接哪些库文件，如LIBS = -lpthread -liconv
How to export the user-defined variable in to the parent directory sing PARENT_SCOPE should work:
```
set(foo "abc" PARENT_SCOPE)

set_property(GLOBAL .... )

and then access it from anywhere else

get_property(GLOBAL ....)


target_link_libraries(program "-framework CoreFoundation")

target_link_libraries(program "-framework your_frame_work_name")

set_target_properties(program PROPERTIES LINK_FLAGS "-Wl,-F/Library/Frameworks")
```

https://cmake.org/pipermail/cmake/2012-July/051337.html
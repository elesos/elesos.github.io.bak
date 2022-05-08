---
layout: post
title: cmake 设置app bundle应用程序图标
date: 2022-05-02 05:30:00 +0800
categories: [cmake]
tags: [cmake]
---

set(MACOSX_BUNDLE_ICON_FILE myAppImage.icns) #这个里面不能带路径，是用于设置Info.plist的
set(myApp_ICON ${CMAKE_CURRENT_SOURCE_DIR}/images/myAppImage.icns)
set_source_files_properties(${myApp_ICON} PROPERTIES
       MACOSX_PACKAGE_LOCATION "Resources")

add_executable(myApp MACOSX_BUNDLE ${myApp_ICON} ${allSources})

 Info.plist会有下面的key-value
<key>CFBundleIconFile</key>
<string>myAppImage.icns</string>
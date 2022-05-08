---
layout: post
title: cmake 将plist info 编译到可执行程序里面
date: 2022-05-02 05:30:00 +0800
categories: [cmake]
tags: [cmake]
---

target_link_options(${target} PRIVATE LINKER:-sectcreate,__TEXT,__info_plist,${CMAKE_CURRENT_SOURCE_DIR}/Info.plist)

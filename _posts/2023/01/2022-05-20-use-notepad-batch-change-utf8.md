---
layout: post
title: 使用 notepad++宏 批量替换文件编码
date: 2022-05-20 22:30:00 +0800
categories: [软件]
tags: [软件]
---



Open shortcuts.xml 和english.xml

设置后要重启notepad++才行

```
<Macro name="Convert To UTF8Bom" Ctrl="no" Alt="no" Shift="no" Key="0">
        <Action type="2" message="0" wParam="45011" lParam="0" sParam="" />
        <Action type="2" message="0" wParam="41006" lParam="0" sParam="" />
        <Action type="2" message="0" wParam="41003" lParam="0" sParam="" />
</Macro>
```
设置后要重启notepad++才行

https://community.notepad-plus-plus.org/topic/14642/macro-acting-out
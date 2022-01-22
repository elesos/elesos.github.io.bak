---
layout: post
title: 解决python中文路径问题
date: 2021-07-01 07:58:19 +0800
categories: [艺搜科技,编程]
tags: [Python]
---
```

  File "<string>", line 1
SyntaxError: (unicode error) 'utf-8' codec can't decode byte



std::string mul_path = strUtf8Path + "python38.zip;";
mul_path.append(strUtf8Path + "pythondlls");
 std::wstring python_lib = utf8_to_utf16(mul_path);
Py_SetPath(python_lib.c_str());
```
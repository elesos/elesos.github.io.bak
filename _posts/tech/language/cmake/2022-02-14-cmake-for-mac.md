---
layout: post
title: cmake 设置xcode属性
date: 2022-02-14 23:30:00 +0800
categories: [cmake]
tags: [cmake]
---



xcode属性

https://help.apple.com/xcode/mac/current/#/itcaec37c2a6

在每一个属性前面加上CMAKE_XCODE_ATTRIBUTE_即可

```javascript

```

```bash
set_target_properties(${PROJECT_NAME}
                      PROPERTIES
                      XCODE_ATTRIBUTE_ONLY_ACTIVE_ARCH "YES"
)
```





## cmake macro vs function

宏执行的是替换。
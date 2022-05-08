---
layout: post
title: abseil系列1
date: 2022-05-02 05:30:00 +0800
categories: [abseil]
tags: [abseil]
---

有很多组件，比如strings

https://abseil.io/docs/cpp/quickstart-cmake#c-quickstart-with-cmake



```
mkdir build && cd build
cmake -DABSL_BUILD_TESTING=ON -DABSL_USE_GOOGLETEST_HEAD=ON -DCMAKE_CXX_STANDARD=11 ..
cmake --build . --target all
```

target就是add_executable里面指定的名字。



https://github.com/abseil/abseil-cpp/blob/master/CMake/README.md



vs boost 

If you want the newest, shiniest, most exciting / cutting edge APIs and dont' care about long term support, use Boost.

If you want compatibility for pre-compiled code over many years, use the standard.

If you can build from source and want performance and (maybe) more user-friendly APIs, use Abseil. 
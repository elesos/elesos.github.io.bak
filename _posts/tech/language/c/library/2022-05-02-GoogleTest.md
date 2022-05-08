---
layout: post
title: GoogleTest
date: 2022-05-02 05:30:00 +0800
categories: [c]
tags: [c]
---

ASSERT_* versions generate fatal failures when they fail, and abort the current function.
EXPECT_* versions generate nonfatal failures, which don’t abort the current function.
provide a custom failure message

c字符串用ASSERT_STREQ

After defining your tests, you can run them with RUN_ALL_TESTS()

* How to run single google test in visual studio?
调试-命令参数：--gtest_filter=  //https://google.github.io/googletest/advanced.html
https://google.github.io/googletest/primer.html
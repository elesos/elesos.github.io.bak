---
layout: post
title: 如何将一个区间映射到另一个区间
date: 2021-12-08 23:30:00 +0800
categories: [算法]
tags: [算法]
---
```
float input_start = -1.0f;
float input_end   = 2.0f;
float output_start = -1000.0f;
float output_end   = 1000.0f;
float input = 1.25;
float output = output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start);
```
## 参考
https://stackoverflow.com/questions/5731863/mapping-a-numeric-range-onto-another

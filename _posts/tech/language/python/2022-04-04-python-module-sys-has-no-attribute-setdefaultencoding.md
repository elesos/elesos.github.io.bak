---
layout: post
title: AttributeError module sys has no attribute setdefaultencoding
date: 2022-04-04 23:30:00 +0800
categories: [python]
tags: [python]
---
python报错 AttributeError: module sys has no attribute setdefaultencoding
Python3字符串默认编码unicode, 所以sys.setdefaultencoding也不存在了

去掉，sys.setdefaultencoding
---
layout: post
title: What is pycache
date: 2022-05-21 05:30:00 +0800
categories: [python]
tags: [python]
---

What is __pycache__?

__pycache__ is a folder containing Python 3 bytecode compiled and ready to be executed.

When you import a module,

import file_name
Python stores the compiled bytecode in __pycache__ directory so that future imports can use it directly, rather than having to parse and compile the source again.

What is python's site-packages directory?
When you build and install Python packages from source , probably by executing

python setup.py install
you will find the installed modules in site-packages by default.
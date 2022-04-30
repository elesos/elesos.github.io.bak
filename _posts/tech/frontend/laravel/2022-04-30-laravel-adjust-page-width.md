---
layout: post
title: Laravel 如何调整页面宽度
date: 2022-04-30 05:30:00 +0800
categories: [Laravel]
tags: [Laravel]
---
先F12,点击左上方的“select an element in the page to inspect it”,然后点一下页面中你想要调整宽度的元素，这里会在控制台上打开页面的源码，找到对应的html元素，修改，如把宽度8改12 可将

<div class="col-md-8"> 
改成

<div class="col-md-12">
---
layout: post
title: SVN 如何更改库的URL地址
date: 2022-04-30 05:30:00 +0800
categories: [svn]
tags: [svn]
---
先svn info查看下地址：Repository Root，替换这个地址就可以

svn switch --relocate FROM TO
windows可右键TortoiseSVN->Relocate，在里面修改下IP
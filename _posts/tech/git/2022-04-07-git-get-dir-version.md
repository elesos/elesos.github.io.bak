---
layout: post
title: Git 获取某个目录的提交版本号
date: 2022-04-07 23:30:00 +0800
categories: [git]
tags: [git]
---

version=$(git log -1 --pretty=format:%h "$repo_dir/Resource")

其中%h表示abbreviated commit hash简短的id



git status -s -- "$repo_dir/Resource"

https://stackoverflow.com/questions/22750028/in-git-what-does-dash-dash-mean

--表示Do not interpret解释 any more arguments as options，separates options from parameters.


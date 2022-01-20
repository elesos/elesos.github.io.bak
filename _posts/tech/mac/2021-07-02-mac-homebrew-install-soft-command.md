---
layout: post
title: mac Homebrew 用命令行安装软件
date: 2021-07-02 21:32:49 +0800
categories: [艺搜科技,操作系统]
tags: [mac]
---

Homebrew 是 MacOS 系统里的软件包管理系统，类似于 Ubuntu 中的 apt-get

```
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

```
install <formula> ：安装软件
uninstall <formula> ：卸载软件 
list ：列出所有已通过 brew 命令安装的软件
```

查询可用包

```
brew search <packageName>
```

Homebrew安装成功后，会自动创建目录 /usr/local/Cellar 来存放Homebrew安装的程序。

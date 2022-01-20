---
layout: post
title: 利用Jekyll或Hexo搭建GitHub Pages的区别
date: 2021-07-04 23:48:33.000000000 +09:00
categories: [blog]
tags: [blog]
---

不用mediawiki或wordpress是因为要自己买服务器。哪天没续费，数据就没有了。

Jekyll 和 hexo 都是静态网站生成工具



## Hexo博客搭建

是台湾小伙使用nodejs开发的，需要在本地生成静态页面后再提交到github，不过hexo内置了hexo deploy命令，提交也是挺方便的。

windows下 

1. 安装git https://git-scm.com/downloads，

2. 安装nodejs时，勾选Add to PATH选项

https://nodejs.org/en/download/

3. 安装Hexo:
   `npm install -g hexo-cli`

4. 写作，必须这样才能自动生成文章的创建时间，不要复制md文件再改
   `hexo new post xxx`    

  可能需要运行npm install

5. 发布
   `hexo clean && hexo g -d -b -f`

其中hexo clean清除public, windows可能需要手动删除public目录

-g表示生成，-d表示生成后立即部署，-b生成过程中如果发生异常则抛出异常, -f 强制重新生成。

6. 其它问题 码云可能需要手动更新:https://gitee.com/elesos/elesos/pages

码云创建时不用username.gitee.io,只需要username即可, 码云还支持Hugo

github上username.github.io只能发布到master分支。错误，在master有源码的情况下，gh-pages分支也能发布，测试过。（github将默认分支从master改为main了，可在settings/repositories里修改Repository default branch）

其它库开启github pages后生成到username.github.io/projectname目录,其它的库可以使用master,gh-pages分支或在master分支的docs文件夹

gh-pages分支的创建与提交

```
git checkout --orphan gh-pages //Creates a new branch, with no history or contents
git push origin gh-pages
```

如何实现提交代码或在线修改了md并提交后，自动生成网站？

如果在设置的默认的Pages分支做了修改，就会自动生成。从而可以将代码分支设置为默认。不过不支持hexo。所以要换成jekyll

## jekyll

用ruby开发，需要安装ruby,python等，github内置了jekyll，可以直接将jekyll相关的文件提交到github，github会自动生成静态页面。

https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/docs/README.zh-CN.md#%E4%BB%8E-github-%E4%B8%8A-fork

文章需要year-moth-day-name.md

安装 `Ruby`，`RubyGems`，`Jekyll` 和 `Bundler`。

```
yum install epel-release -y
```

```
yum install dnf -y
```

dnf install ruby ruby-devel

dnf group install "Development Tools"

gem install jekyll bundler 需要ruby 2.5:

centos upgrade ruby to 2.5：https://linuxtut.com/install-ruby-2.5-on-centos-7-using-scl-51801/

update-alternatives使用详解 https://www.jianshu.com/p/4d27fa2dce86

mv /usr/bin/ruby /usr/bin/ruby_bak



[gem install bundler, bundle not working](https://unix.stackexchange.com/questions/453115/gem-install-bundler-bundle-not-working)

gem env

如何添加评论系统：

https://utteranc.es/

1，安装https://github.com/apps/utterances

2，在_includes里面创建utterances.html

3，在_layouts修改post.html和post.html

## 问题

1. YAMLException: end of the stream or a document separator is expected
   在:冒号之后要有空格

2. TypeError [ERR_INVALID_ARG_TYPE]: The "list[0]" argument must be one of type Buffer or Uint8Array. Received type string
   有可能是npm安装的软件版本问题

## 参考

https://zhuanlan.zhihu.com/p/77651304
https://gitee.com/help/articles/4136
https://hexo.io/zh-cn/docs/commands#clean

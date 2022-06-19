---
layout: post
title: 常用维基语法
date: 2022-05-29 05:30:00 +0800
categories: [mediawiki]
tags: [mediawiki]
---
MediaWiki，是一款wiki程序，维基百科就在使用此系统。

使用这套系统进行页面编辑需要掌握一些特定的wiki语法。以下是常用的wiki语法：

保存之前请先点击页面下方的“显示预览”确认是否正确。

保存之前请先点击页面下方的“显示预览”确认是否正确。

保存之前请先点击页面下方的“显示预览”确认是否正确。

```
1,斜体文本	
''italic''

2,粗体文字	
'''粗体'''


3,保留原样	
<nowiki> 保留 ''原样'' </nowiki>

4,标题（2级标题下会自动生成分隔线，
当标题大于等于4时会自动生成目录，不要使用一级标题！）


== 2级标题 ==

=== 3级标题 ===

==== 4级标题 ====





5,分隔线	

之前文本

----

之后文本



6,部链接	
[[首页]]


7,重命名外部链接	
[https://mediawiki.org MediaWiki]

8,文字颜色	
<font color="red">红色文字</font>

```

## 换行或分段
需要换行或者分段的地方，请空一行

## 列表
符号列表用*号

编号列表用#号

## 图片
图片直接粘贴外部图片的链接即可

## 分类
[[Category:分类名]]

## 代码
需要将代码放在：
```
<syntaxhighlight lang="bash"> 

</syntaxhighlight>

<syntaxhighlight lang="c"> 

</syntaxhighlight>

或高亮显示某些行

<syntaxhighlight lang="bash" highlight="8-10,12-15"> 

</syntaxhighlight>
```
里，其中bash对应你的编程语言，参见支持的语言

## 参考
https://www.mediawiki.org/wiki/Help:Formatting
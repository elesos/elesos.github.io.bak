---
layout: post
title: MediaWiki常用操作
date: 2021-07-05 23:48:33.000000000 +09:00
categories: [mediawiki]
tags: [mediawiki]
---

# 修改站点通知

在搜索框中输入

```
MediaWiki:Sitenotice 
```

如插入一个链接：

```
[http://www.elesos.com/ <font color="red"><b><big>欢迎访问</big></b></font>]
```

# 创建模板

比如输入

```
Template:Fake heading
```

创建一个模板页面。

# 如何编辑左侧导航栏

在搜索框里输入

```
MediaWiki:Sidebar
```

# 安装编辑器

在LocalSettings.php加上

```
wfLoadExtension( 'WikiEditor' );
```

即可

# 显示外部图片

修改 Localsetting.php：

```
$wgAllowExternalImages = true; 
```

然后直接放上外部图片url即可。

参考

https://www.mediawiki.org/wiki/Manual:Linked_images



# 添加评论功能

来必力评论系统 https://www.livere.com/apply 韩国的，最近发现插入广告了。已关闭

打开skins\Vector\includes\VectorTemplate.php

```
		<div id="footer" role="contentinfo"<?php $this->html( 'userlangattributes' ) ?>>
			
			<!-- 来必力City版安装代码 -->
			<div id="lv-container" data-id="city" data-uid="MTAyMC80OTg0NS8yNjMzNg==">
				<script type="text/javascript">			
				var refer = "www.elesos.com/index.php?title=<?php echo urlencode($this->get( 'thispage', '' )) ?>".replace("http://","");
				
				(function(d, s) {
				   var j, e = d.getElementsByTagName(s)[0];

				   if (typeof LivereTower === 'function') { return; }

				   j = d.createElement(s);
				   j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
				   j.async = true;

				   e.parentNode.insertBefore(j, e);
				})(document, 'script');
				</script>
			<noscript> 为正常使用来必力评论功能请激活JavaScript</noscript>
			</div>
			<!-- City版安装代码已完成 -->
			
			<?php
			foreach ( $this->getFooterLinks() as $category => $links ) {
			?>
```

# 添加cnzz流量统计与备案号

使用cnzz，效果如下所示，其中年份会动态变化

![](/assets/mediawiki/1.png)

老版在Skins\Vector.php中，新版在Skins\Vector\includes/VectorTemplate.php中找到</body></html>

在这2个标签上面插入你的统计代码，如下所示：

```
  <!-- add cnzz -->
<div id="cnzzwidget" style="text-align:center">
<nobr><font size="1">
<script type="text/javascript">
document.write("Copyright &copy; 2013-"+new Date().getFullYear()+" <a href='http://www.elesos.com'>Elesos.com</a> All Rights Reserved.")
</script> 京ICP备13034632号 </font><script src="http://s14.cnzz.com/stat.php?id=5561967&web_id=5561967&show=pic" language="JavaScript"></script></nobr>
</div>
<!-- add cnzz -->

</body>
</html>
```

记得修改网站id和备案号。

# 配置语法高亮

需要安装python3，参见[Python3 安装](http://wiki.elesos.com/index.php?title=Python3_安装)

将扩展文件放在 extensions/SyntaxHighlight_GeSHi 目录

在LocalSettings.php加上

```
wfLoadExtension( 'SyntaxHighlight_GeSHi' );
```

加权限：

```
chmod a+x /path/to/extensions/SyntaxHighlight_GeSHi/pygments/pygmentize
```

参考

https://www.mediawiki.org/wiki/Extension:SyntaxHighlight#Installation

---
layout: post
title: Linux 如何安装phpMyAdmin
date: 2022-04-12 23:30:00 +0800
categories: [Linux操作]
tags: [Linux操作]
---

https://www.phpmyadmin.net/files/

```
wget https://files.phpmyadmin.net/phpMyAdmin/4.0.6/phpMyAdmin-4.0.6-all-languages.zip
unzip phpMyAdmin-4.0.6-all-languages.tar.bz2
mv phpMyAdmin-4.0.6-all-languages phpmyadmin
mv phpmyadmin/ /opt/nginx/html/  #移到web目录下
cd /opt/nginx/html/phpmyadmin/
cp config.sample.inc.php config.inc.php
```

修改用户名和密码

```
vim config.inc.php
```

修改下面2行：

```
$cfg['Servers'][$i]['controluser'] = 'root';     // MySQL用户
$cfg['Servers'][$i]['controlpass'] = 'password'; // MySQL用户密码
```
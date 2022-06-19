---
layout: post
title: CentOS安装PHP
date: 2022-04-30 05:30:00 +0800
categories: [php]
tags: [php]
---
## 启动
service php-fpm start //docker里面是/usr/sbin/php-fpm &
ps -aux | grep php-fpm
## 安装php7
1. install and enable EPEL and Remi repository
```
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm  #https://github.com/elesos/assets/raw/master/2019/07/epel-release-latest-7.noarch.rpm
yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm
```
2. install yum-utils, a collection of useful programs for managing yum repositories and packages.

It can be used for managing (enabling or disabling) yum repositories as well as packages without any manual configuration
```
yum install yum-utils
```
3. One of the programs provided by yum-utils is yum-config-manager, which you can use to enable Remi repository as the default repository for installing different PHP versions as shown.
```
yum-config-manager --enable remi-php70   [Install PHP 7.0] 中括号里面的不运行
```
If you want to install PHP 7.1, PHP 7.2 or PHP 7.3 on CentOS 7, just enable it as shown.
```
yum-config-manager --enable remi-php71   [Install PHP 7.1]
yum-config-manager --enable remi-php72   [Install PHP 7.2]
yum-config-manager --enable remi-php73   [Install PHP 7.3] 
```
4. Now install PHP 7 with all necessary modules with the command below.
```
yum install -y php php-fpm php-mysql php-devel php-mbstring php-gd php-dom php-mcrypt php-cli php-curl php-ldap php-zip php-fileinfo 
php -v
```
## 以root运行
```
/usr/sbin/php-fpm -R &   
php-fpm --help
-R, --allow-to-run-as-root              Allow pool to run as root (disabled by default)
```
## 问题
* /usr/sbin/php-fpm 运行时报 Unable to create the PID file (/run/php-fpm/php-fpm.pid).: No such file or directory
```
mkdir /run/php-fpm/
```
* please specify user and group other than root
```
/usr/sbin/php-fpm -R &  //加上-R参数：--allow-to-run-as-root
```
## 参考
https://www.tecmint.com/install-php-7-in-centos-7/
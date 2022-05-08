---
layout: post
title: Linux安装Nginx
date: 2022-04-12 23:30:00 +0800
categories: [Nginx]
tags: [Nginx]
---

## CentOS

```
yum install -y pcre-devel zlib-devel openssl openssl-devel   #openssl用于https
```

## Ubuntu

```
apt install build-essential libtool openssl libssl-dev libpcre3 libpcre3-dev
```

## 安装Nginx

```
wget https://nginx.org/download/nginx-1.14.0.tar.gz
tar -zxf nginx-1.14.0.tar.gz 
cd nginx-1.14.0
./configure --prefix=/opt/nginx --with-http_ssl_module
make && make install
```

查看配置信息是否正确

```
cd /opt/nginx/sbin/
./nginx -t
```

启动Nginx

```
/opt/nginx/sbin/nginx
```

开机启动

```
echo /opt/nginx/sbin/nginx >> /etc/rc.local
```

## 问题

- 配置nginx后，启动时如果报unknown directive "ssl"

原因：没有将ssl模块编译进nginx, 在configure的时候加上“--with-http_ssl_module”即可

Package libpcre3-dev is not available

PCRE=（Perl Compatible Regular Expressions）库

安装：

```
wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.40.tar.gz
tar -zxvf pcre-8.30.tar.gz  
cd pcre-8.30  
./configure  
make  && make install
```

## 其它

zlib库，压缩用

```
wget https://zlib.net/zlib-1.2.11.tar.gz
tar -zxvf zlib-1.2.8.tar.gz  
cd zlib-1.2.8  
./configure  
make && make install
#apt-get install zlib1g-dev
```

## 常见问题

- 查看配置文件所在位置

```
nginx -t
```

- server_tokens

是否显示nginx的版本信息
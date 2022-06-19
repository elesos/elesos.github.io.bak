---
layout: post
title: Laravel 安装
date: 2022-04-30 05:30:00 +0800
categories: [laravel]
tags: [laravel]
---
Laravel 使用Composer 来管理自身的依赖包。因此，在使用 Laravel 之前，请确保安装了 Composer 。参考Composer 安装

## 安装
```
composer global require "laravel/installer" #使用 Composer 下载 Laravel 安装包
将~/.composer/vendor/bin放在path环境变量里面，其中~代表你的家目录，比如/root/
vim /etc/profile
加入下面这行
export PATH=$PATH:~/.composer/vendor/bin/
source /etc/profile
laravel new blog
```
## 配置Nginx
``` 
server {
    listen 80;
    #listen 443 ssl http2;
    server_name laravel.elesos.com www.laravel.elesos.com;
    root "/opt/nginx/html/laravel/blog/public";  #网站在public目录

    index index.html index.htm index.php;

    charset utf-8;
    

    location / {
        try_files $uri $uri/ /index.php?$query_string;
        
    }

    

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    #error_log  /opt/nginx/logs/laravel_error.log error;

    sendfile off;

    client_max_body_size 10m;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        #fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;  #测试通过
        fastcgi_pass 127.0.0.1:9000;   #测试通过
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        

        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }

    location ~ /\.ht {
        deny all;
    }

    #ssl_certificate     /opt/nginx/conf/laravel.crt;
    #ssl_certificate_key /opt/nginx/conf/laravel.key;
}
```
修改目录权限：
```
chown -R apache:apache storage #或者是www-data用户
chmod -R 0755 storage
chown -R apache:apache bootstrap/cache 
chmod -R 0755 bootstrap/cache
```
然后即可访问
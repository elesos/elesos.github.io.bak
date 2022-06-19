---
layout: post
title: Nginx配置HTTPS
date: 2022-04-30 05:30:00 +0800
categories: [nginx]
tags: [nginx]
---
超文本传输安全协议,是一种基于SSL/TLS的HTTP,默认端口443

以下以CentOS为例

## 依赖
yum install openssl openssl-devel
## 配置
将ssl模块编译进nginx, 在configure的时候加上“--with-http_ssl_module”即可
```
./configure --prefix=/opt/nginx --with-http_ssl_module
 
server {

        listen       443;
        server_name  elesos.com www.elesos.com;

        access_log /opt/nginx/logs/elesos.log access;

        ssl                  on;
        ssl_certificate      /opt/nginx/conf/starrtc.pem;
        ssl_certificate_key  /opt/nginx/conf/starrtc.key;

        ssl_session_timeout  5m;
        ssl_session_cache    shared:SSL:10m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols  SSLv2 SSLv3 TLSv1;
        ssl_prefer_server_ciphers   on;


        location / {

            root   /opt/nginx/html/elesos;
            add_header Access-Control-Allow-Origin *;
            index  index.php index.html index.htm;

        }

        error_page 500 502 503 504/50x.html;

        location = /50x.html {
                root /opt/nginx/html;
        }


        location ~ \.php$ {
                add_header Access-Control-Allow-Origin *;
                fastcgi_pass   127.0.0.1:9000;
                fastcgi_index  index.php;
                fastcgi_param  SCRIPT_FILENAME  /opt/nginx/html/starRTC_demo$fastcgi_script_name;
                include        fastcgi_params;
        }


        location ~ /\.ht {
                deny all;
        }
    }
```
检查配置是否正常
```
nginx -t
```
正常的话，就运行
```
nginx -s reload
```
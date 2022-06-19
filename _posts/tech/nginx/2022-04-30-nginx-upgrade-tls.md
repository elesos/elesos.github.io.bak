---
layout: post
title: Nginx 升级支持 TLS1.2
date: 2022-04-30 05:30:00 +0800
categories: [nginx]
tags: [nginx]
---
用于加载此网站的连接使用的是 TLS 1.0 或 TLS 1.1，这两个 TLS 版本都已过时，将在不久后完全停用。届时，用户将无法再加载此网站。服务器应启用 TLS 1.2 或更高版本。
```
openssl version -a
OpenSSL 1.0.2k-fips  26 Jan 2017
```
1.0.1以上的版本支持 TLS1.2

1.1.1以上的版本支持 TLS1.3
```
ssl_protocols  SSLv2 SSLv3 TLSv1;
```
改为
```
ssl_protocols TLSv1.2;
```
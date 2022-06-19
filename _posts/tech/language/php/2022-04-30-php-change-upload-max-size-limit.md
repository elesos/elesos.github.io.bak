---
layout: post
title: PHP 如何修改文件上传大小限制
date: 2022-04-30 05:30:00 +0800
categories: [php]
tags: [php]
---
打开php.ini
```
file_uploads = On;是否允许上传文件。
upload_tmp_dir ;服务器上存储临时文件的地方，如果没指定就会用系统默认的临时文件夹
upload_max_filesize = 20m ;允许上传文件大小的最大值。
post_max_size = 8m ;通过表单POST给PHP的所能接收的最大值，包括表单里的所有值。
```
如果要上传非常大的文件，还可能需要进一步配置以下参数
```
max_execution_time = 600 ;每个PHP页面运行的最大时间(秒)
max_input_time = 600 ;每个PHP页面接收数据所需的最大时间
memory_limit = 8m ;每个PHP页面所占用的最大内存
```
修改nginx.conf 文件，找到http{}段，查找client_max_body_size修改或者添加
```
client_max_body_size 20m;
```
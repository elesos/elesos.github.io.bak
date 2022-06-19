---
layout: post
title: Linux 计划任务
date: 2022-04-12 23:30:00 +0800
categories: [linux操作]
tags: [linux操作]
---

```
crontab -e 编辑当前用户的cron服务
crontab -l 列出当前用户的cron服务的详细内容
```

启动

```
/sbin/service crond start
```

docker里面启动

```
/usr/sbin/crond start
```

每天的0点0分执行

```
0 0 * * * /opt/nginx/db_bak.sh
```

## 常用功能

定时备份数据库

```
#!/bin/bash

bak_path="/opt/mysql_bak/"

# 2016/03/
mkdir -p ${bak_path}$(date -d "yesterday" +"%Y")/$(date -d "yesterday" +"%m")/

cd /var/lib/mysql

# YourDatabaseName_20160305.sql
mysqldump -uroot -pYourPassword YourDatabaseName > ${bak_path}$(date -d "yesterday" +"%Y")/$(date -d "yesterday" +"%m")/YourDatabaseName_$(date -d "yesterday" +"%Y%m%d").sql
```
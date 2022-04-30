---
layout: post
title: Laravel 数据库 常见问题
date: 2022-04-30 05:30:00 +0800
categories: [Laravel]
tags: [Laravel]
---
* 如何修改表的结构
```
composer require doctrine/dbal  #安装依赖库
php artisan make:migration update_users_table --table=users
```
比如设置name字段为unique，在remember_token字段后面添加一个test_int字段
```
$table->unique('name');
$table->integer('test_int')->default(100)->after('remember_token');
```
比如去掉unique

$table->dropUnique('users_email_unique');
比如给email字段添加默认值

$table->string('email')->default('admin@elesos.com')->change();//修改必须加后面的change
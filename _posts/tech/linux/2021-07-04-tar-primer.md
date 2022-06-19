---
layout: post
title: Linux 压缩与解压命令 tar 使用介绍
date: 2021-07-04 12:12:30 +0800
categories: [艺搜科技,编程]
tags: [linux]
---

## 常见压缩文件的扩展名

- .gz：gzip压缩的；
- .bz2：bzip2压缩的；

- .tar：tar程序打包但没有压缩的；

- .tar.gz：打包后并经过gzip压缩的；
- .tar.bz2：打包后并经过bzip2压缩的；

## 语法

```
tar [-j或-z][cv][-f 生成的压缩文件名]  要被压缩的文件或目录   //打包与压缩
tar [-j或-z][xv][-f 生成的压缩文件名][-C  解压目录]       //解压
tar [-j或-z][tv][-f 生成的压缩文件名]                  //查看
```

参数解释： c建立打包档案，x解压, t查看含有哪些文件，（cxt不能同时使用）v显示处理信息

j用于tar.bz2

z用于.tar.gz，tgz

## 排除某些文件夹

```
tar zcvf  tomcat.tar.gz --exclude=tomcat/logs --exclude=tomcat/webapp/xxxx//WEB-INF/logs tomcat
```

将tomcat目录中，除了tomcat/logs 和 tomcat/webapp/xxxx//WEB-INF/logs 之外的文件压缩成压缩包：tomcat.tar.gz

注意，去除的文件夹后面不能带/,否则该文件夹依然会被压缩！

又如：如果123目录下有3个子目录，aa、bb、cc。我现在想只对aa和bb目录打包压缩，命令如下：

```
tar -zcvf 123.tar.gz --exclude=cc 123    #在123目录的外面运行
```

使用exclude参数来过滤不需要的目录或文件，排除某个文件的操作和目录一样。

## 示例

以test目录为例：

### 压缩

首先进入上一层目录

```
tar -jcv-f test.tar.bz2 test
```

查看压缩包里有什么文件:（t重点在查看含有哪些文件，v显示详细信息）

```
tar -jtv-f test.tar.bz2
tar -jt-f test.tar.bz2
```

### 解压

```
tar -jx-f test.tar.bz2 -C/tmp   //熟悉后，可以直接tar-jxf test.tar.bz2 -C/tmp
```

## 解压xz

解压tar.xz文件：

```
tar -xvf test.tar.xz
```

如果不能解压，请先执行

```
yum -y install xz xz-devel 
```

## 解压rar

```
wget http://www.rarlab.com/rar/rarlinux-3.8.0.tar.gz 
tar zxvf rarlinux-3.8.0.tar.gz   
cd rar 
make install
```

解压rar文件，可以使用unrar x **.rar

如果报错：unrar: error while loading shared libraries: libstdc++.so.6: cannot open shared object file: No such file or directory

解决：

```
yum-y install libstdc++.so.6
```

## zip文件unzip

```
yum install -y unzip zip
tar (child): bzip2: Cannot exec: No such file or directory
yum install bzip2
tar: command not found
yum install tar -y
```

# Zip 只打包不压缩

```
zip -0 -r mydirectory.zip mydirectory
-0 means store and don't compress (-r recursive, -p preserve relative path).
```



**Zip**: you have a folder `foo`, and want to zip it to `myzip.zip`

```
"C:\Program Files\7-Zip\7z.exe" a  -r myzip.zip -w foo -mem=AES256
```

**Unzip**: you want to unzip it (`myzip.zip`) to current directory (`./`)

```
"C:\Program Files\7-Zip\7z.exe" x  myzip.zip  -o./ -y -r  //注意-o后面没有空格
```



## 参考

http://www.ha97.com/4024.html

http://dl528888.blog.51cto.com/2382721/739871

http://blog.is36.com/rar_for_linux/

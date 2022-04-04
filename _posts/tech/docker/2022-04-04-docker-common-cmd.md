---
layout: post
title: Docker 常用操作
date: 2022-04-04 23:30:00 +0800
categories: [Docker]
tags: [Docker]
---
## 安装
```
curl -sSL https://get.daocloud.io/docker | sh #国内
curl -sSL https://get.docker.com/ | sh
systemctl enable docker && systemctl start docker
```
运行
```
docker run -d -it -p 80:80 --privileged=true --name elesos centos /bin/bash
docker run -d -it --net=host --name hexo centos:centos7 /bin/bash
```
## 镜像
### 显示镜像
`docker images `
### 创建镜像
使用commit

把有修改的container提交成新的image

`docker commit 容器id elesos/test:version1  #以后有修改，可以重复提交到同一个名字`
使用Dockerfile

待写

## 删除images
先停止并删除依赖该image的container：
```
docker stop 容器id
docker rm 容器id
```
然后删除镜像
```
docker rmi 镜像id
```
删除images

先停止并删除依赖该image的container：
```
docker stop 容器id
docker rm 容器id
```
然后删除镜像

docker rmi 镜像id
## 导出导入
```
docker export 7691a814370e > elesos.tar
cat elesos.tar | docker import - elesos/ubuntu:v1.0
```
进入容器
```
wget -P ~ https://raw.githubusercontent.com/elesos/assets/master/.bashrc_docker; # https://gitee.com/elesos/assets/raw/master/2020/09/.bashrc_docker
echo "[ -f ~/.bashrc_docker ] && . ~/.bashrc_docker" >> ~/.bashrc; source ~/.bashrc
docker-enter 容器名  #或docker exec -it ffmerge /bin/bash
```
拷贝文件

把容器內的文件复制出来：注意后面有个点
```
docker cp ff35dcd5168e:/home/elesos.h264 .
```
拷贝到容器中去：
```
docker cp test.flv svn_server:/test.flv
```
问题
CentOS 8.0 安装docker 报错package docker-ce-3:19.03.12-3.el7.x86_64 requires containerd.io >= 1.2.2-3, but none of the providers can be installed
```
wget https://download.docker.com/linux/centos/7/x86_64/edge/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm
yum install -y  containerd.io-1.2.6-3.3.el7.x86_64.rpm
```
然后再安装docker即可

不能ping通baidu.com，但却能ping通百度的ip，生成容器时加上：
`--net=host`
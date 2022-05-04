---
layout: post
title: Flutter 安装
date: 2022-05-02 05:30:00 +0800
categories: [Flutter]
tags: [Flutter]
---
为了正常升级 Flutter 和获取 packages，你需要设置如下两个环境变量：

export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
若希望长期使用

echo 'export FLUTTER_STORAGE_BASE_URL="xxx"' >> ~/.bashrc
git clone -b dev    https://github.com/flutter/flutter.git 
或

git clone -b stable https://github.com/flutter/flutter.git
export PATH="$PWD/flutter/bin:$PATH"
cd ./flutter
flutter doctor   需要android sdk,安装后再次运行来确认是否成功。
flutter devices 命令确保 Flutter 能够识别出你所连接的 Android 设备
androis studio需要 Settings > Plugins，选择 Flutter 插件并安装

创建工程：Start a new Flutter project-》选择 Flutter 应用程序 ，代码在 ‘lib/main.dart’

hot reload只需要保存一下就行了，不需要其它额外操作

## 问题
如果一直让你brew upgrade cocoapods,即时已经安装过，可运行
gem source -a https://gems.ruby-china.com
sudo gem install cocoapods
Android license status unknown
看看JAVA_HOME 是否设置正确了

## 参考
https://flutter-io.cn/docs/get-started/install

https://flutter.dev/docs/get-started/install
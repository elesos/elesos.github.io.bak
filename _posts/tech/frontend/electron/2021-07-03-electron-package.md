---
layout: post
title: Electron如何打包
date: 2021-07-03 08:17:04 +0800
categories: [艺搜科技,编程]
tags: [Electron]
---

打包用electron-builder，它比electron-packager有更丰富的的功能，可以生成安装程序，支持自动更新

https://github.com/electron-userland/electron-builder

```
cnpm install -g yarn  # package manager，类似npm
yarn add electron-builder --dev 
```

需要在package.json里面指定build配置，

比如files指定把哪些文件打包，在scripts里面定义打包的key，如

```
"scripts": {
  "pack": "electron-builder --dir",   //运行yarn pack,用于测试
  "dist": "electron-builder",  //运行yarn dist打包成windows installer等
"postinstall": "electron-builder install-app-deps"  //依赖
}
```

electron-webpack：Scripts and configurations to compile Electron applications using webpack

## 示例

```
git clone https://github.com/electron-userland/electron-webpack-quick-start.git
yarn  # install dependencies，可能需要如下配置：
yarn config set registry https://registry.npm.taobao.org
yarn dist  #compile source code ,create webpack output and build with electron-builder,这步会下载https://github.com/electron/electron/releases/download/v8.2.0/electron-v8.2.0-win32-x64.zip,可以自已下载后放到%LOCALAPPDATA%/electron/Cache
```

最终会生成一个安装包程序。

- 32位系统的包怎么打？

https://www.electron.build/cli

```
"build": {
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": [
          "x64",
          "ia32"
        ]
      }
    ]
  }
}
```

electron-forge combines electron-packager and electron-builder together into one tool in order to perform both parts in one go (plus other features).

## 参考

https://www.cnblogs.com/xiaoniuzai/p/12356208.html

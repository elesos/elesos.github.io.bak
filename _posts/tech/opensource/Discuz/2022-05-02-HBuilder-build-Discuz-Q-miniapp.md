---
layout: post
title: HBuilder构建Discuz! Q小程序
date: 2022-05-02 05:30:00 +0800
categories: [软件]
tags: [软件]
---
## 关于HBuilderX版本
标准版可直接用于web开发，做App仍需要安装插件。做小程序和H5，使用标准版就可以。

在 scss/sass编译下载页面登录 HBuilderX 账号，并单击【使用 HBuilderX 导入插件】。

在弹出的窗口中，单击【打开 HBuilderX】。即可完成安装sass编译插件操作。

启动微信开发者工具，选择 工具 > 设置 > 安全 设置，将服务端口开启。

打开 HBuilder X，选择【文件】 >【新建】 >【项目】 > 【uni-app】 > 选择 Discuz! Q 模板。

修改如下 common/const.js 文件中的以下两行配置信息，指向自己的服务器。

export const DISCUZ_TITLE = "设置为自己小程序的标题";
let host = "设置为自己Discuz! Q的访问地址， 例如 https://payask.elesos.com";
【发行】 >【小程序-微信（仅适用于uni-app）】

发行红色主题，请单击选择【发行】 >【mp-weixin-play】。

生成微信小程序，并自动在微信开发工具中打开。在打开的微信开发者工具中，单击菜单栏【上传】

如果修改了 Discuz! Q 的前端代码，想对服务器上的 H5 页面进行更新，也可以选择 【发行】 > 【网站 】> 【H5手机版】 ，生成 H5 页面，然后上传到 Discuz! Q 的服务器上，覆盖原 public 目录下的 index.html 和 static 目录。

需要在小程序平台配置 request合法域名、uploadFile合法域名、downloadFile 合法域名。

以后如果要更新官方最新版的小程序，需要重新搞一遍上面的。

## npm 构建
下载代码https://dl.discuz.chat/uniapp_latest.zip

修改目录中 .env.production

修改 src 下的 manifest.json 文件，将其中的小程序 ID 换成自己的 AppID (小程序ID),name 在src目录上层

npm config set registry http://mirrors.cloud.tencent.com/npm/
npm install
npm run build:mp-weixin  #若您需构建红色主题，请使用 npm run build:mp-weixin-play
微信开发工具，选择【导入项目】，输入项目相关信息并选择构建完成的小程序目录。单击工具栏【上传】按钮，即可完成上传 Discuz! Q 小程序操作。
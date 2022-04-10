---
layout: post
title: 配置 IPsec/XAuth VPN 客户端
date: 2022-04-08 23:30:00 +0800
categories: [vpn]
tags: [vpn]
---

IPsec/XAuth ("Cisco IPsec") 在 Android, iOS 和 OS X 上均受支持，无需安装额外的软件。Windows 用户可以使用免费的 [Shrew Soft 客户端](https://www.shrew.net/download/vpn)。如果无法连接,请首先检查是否输入了正确的 VPN 登录凭证。

IPsec/XAuth 模式也称为 "Cisco IPsec"。该模式通常能够比 IPsec/L2TP **更高效**地传输数据（较低的额外开销）。

---
* 平台名称
  * [Windows](#windows)
  * [OS X (macOS)](#os-x)
  * [Android](#android)
  * [iOS (iPhone/iPad)](#ios)
  * [Linux](#linux)

## Windows



1. 下载并安装免费的 [Shrew Soft VPN 客户端](https://www.shrew.net/download/vpn)。在安装时请选择 **Standard Edition**。   
   **注：** 该 VPN 客户端 **不支持** Windows 10/11。
1. 单击开始菜单 -> 所有程序 -> ShrewSoft VPN Client -> VPN Access Manager
1. 单击工具栏中的 **Add (+)** 按钮。
1. 在 **Host Name or IP Address** 字段中输入`你的 VPN 服务器 IP`。
1. 单击 **Authentication** 选项卡，从 **Authentication Method** 下拉菜单中选择 **Mutual PSK + XAuth**。
1. 在 **Local Identity** 子选项卡中，从 **Identification Type** 下拉菜单中选择 **IP Address**。
1. 单击 **Credentials** 子选项卡，并在 **Pre Shared Key** 字段中输入`你的 VPN IPsec PSK`。
1. 单击 **Phase 1** 选项卡，从 **Exchange Type** 下拉菜单中选择 **main**。
1. 单击 **Phase 2** 选项卡，从 **HMAC Algorithm** 下拉菜单中选择 **sha1**。
1. 单击 **Save** 保存 VPN 连接的详细信息。
1. 选择新添加的 VPN 连接。单击工具栏中的 **Connect** 按钮。
1. 在 **Username** 字段中输入`你的 VPN 用户名`。
1. 在 **Password** 字段中输入`你的 VPN 密码`。
1. 单击 **Connect**。

VPN 连接成功后，你会在 VPN Connect 状态窗口中看到 **tunnel enabled** 字样。单击 "Network" 选项卡，并确认 **Established - 1** 显示在 "Security Associations" 下面。最后你可以到 [这里](https://www.ipchicken.com) 检测你的 IP 地址，应该显示为`你的 VPN 服务器 IP`。

如果在连接过程中遇到错误，请参见 [故障排除](clients-zh.md#故障排除)。

## OS X



1. 打开系统偏好设置并转到网络部分。
1. 在窗口左下角单击 **+** 按钮。
1. 从 **接口** 下拉菜单选择 **VPN**。
1. 从 **VPN类型** 下拉菜单选择 **Cisco IPSec**。
1. 在 **服务名称** 字段中输入任意内容。
1. 单击 **创建**。
1. 在 **服务器地址** 字段中输入`你的 VPN 服务器 IP`。
1. 在 **帐户名称** 字段中输入`你的 VPN 用户名`。
1. 在 **密码** 字段中输入`你的 VPN 密码`。
1. 单击 **认证设置** 按钮。
1. 在 **机器认证** 部分，选择 **共享的密钥** 单选按钮，然后输入`你的 VPN IPsec PSK`。
1. 保持 **群组名称** 字段空白。
1. 单击 **好**。
1. 选中 **在菜单栏中显示 VPN 状态** 复选框。
1. 单击 **应用** 保存VPN连接信息。

要连接到 VPN：使用菜单栏中的图标，或者打开系统偏好设置的网络部分，选择 VPN 并单击 **连接**。最后你可以到 [这里](https://www.ipchicken.com) 检测你的 IP 地址，应该显示为`你的 VPN 服务器 IP`。

如果在连接过程中遇到错误，请参见 [故障排除](clients-zh.md#故障排除)。

## Android

> Android 12 仅支持 [IKEv2](ikev2-howto-zh.md) 模式。

1. 启动 **设置** 应用程序。
1. 单击 **网络和互联网**。或者，如果你使用 Android 7 或更早版本，在 **无线和网络** 部分单击 **更多...**。
1. 单击 **VPN**。
1. 单击 **添加VPN配置文件** 或窗口右上角的 **+**。
1. 在 **名称** 字段中输入任意内容。
1. 在 **类型** 下拉菜单选择 **IPSec Xauth PSK**。
1. 在 **服务器地址** 字段中输入`你的 VPN 服务器 IP`。
1. 保持 **IPSec 标识符** 字段空白。
1. 在 **IPSec 预共享密钥** 字段中输入`你的 VPN IPsec PSK`。
1. 单击 **保存**。
1. 单击新的VPN连接。
1. 在 **用户名** 字段中输入`你的 VPN 用户名`。
1. 在 **密码** 字段中输入`你的 VPN 密码`。
1. 选中 **保存帐户信息** 复选框。
1. 单击 **连接**。

VPN 连接成功后，会在通知栏显示图标。最后你可以到 [这里](https://www.ipchicken.com) 检测你的 IP 地址，应该显示为`你的 VPN 服务器 IP`。

如果在连接过程中遇到错误，请参见 [故障排除](clients-zh.md#故障排除)。

## iOS

> 

1. 进入设置 -> 通用 -> VPN。
1. 单击 **添加VPN配置...**。
1. 单击 **类型** 。选择 **IPSec** 并返回。
1. 在 **描述** 字段中输入任意内容。
1. 在 **服务器** 字段中输入`你的 VPN 服务器 IP`。
1. 在 **帐户** 字段中输入`你的 VPN 用户名`。
1. 在 **密码** 字段中输入`你的 VPN 密码`。
1. 保持 **群组名称** 字段空白。
1. 在 **密钥** 字段中输入`你的 VPN IPsec PSK`。
1. 单击右上角的 **完成**。
1. 启用 **VPN** 连接。

VPN 连接成功后，会在通知栏显示图标。最后你可以到 [这里](https://www.ipchicken.com) 检测你的 IP 地址，应该显示为`你的 VPN 服务器 IP`。

如果在连接过程中遇到错误，请参见 [故障排除](clients-zh.md#故障排除)。

## Linux

> 

### Fedora 和 CentOS

Fedora 28 （和更新版本）和 CentOS 8/7 用户可以使用 `yum` 安装 `NetworkManager-libreswan-gnome` 软件包，然后通过 GUI 配置 IPsec/XAuth VPN 客户端。

1. 进入 Settings -> Network -> VPN。单击 **+** 按钮。
1. 选择 **IPsec based VPN**。
1. 在 **Name** 字段中输入任意内容。
1. 在 **Gateway** 字段中输入`你的 VPN 服务器 IP`。
1. 在 **Type** 下拉菜单选择 **IKEv1 (XAUTH)**。
1. 在 **User name** 字段中输入`你的 VPN 用户名`。
1. 右键单击 **User password** 字段中的 **?**，选择 **Store the password only for this user**。
1. 在 **User password** 字段中输入`你的 VPN 密码`。
1. 保持 **Group name** 字段空白。
1. 右键单击 **Secret** 字段中的 **?**，选择 **Store the password only for this user**。
1. 在 **Secret** 字段中输入`你的 VPN IPsec PSK`。
1. 保持 **Remote ID** 字段空白。
1. 单击 **Add** 保存 VPN 连接信息。
1. 启用 **VPN** 连接。

VPN 连接成功后，你可以到 [这里](https://www.ipchicken.com) 检测你的 IP 地址，应该显示为`你的 VPN 服务器 IP`。

### 其它 Linux

其它 Linux 版本用户可以使用 [IPsec/L2TP](clients-zh.md#linux) 模式连接。

## 致谢

本文档是在 [Streisand](https://github.com/StreisandEffect/streisand) 项目文档基础上翻译和修改。该项目由 Joshua Lund 和其他开发者维护。



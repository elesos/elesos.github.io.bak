---
layout: post
title: VMware常见问题
date: 2022-04-30 05:30:00 +0800
categories: [vmware]
tags: [vmware]
---
The VMware Authorization Service is not running
```
services.msc
```
找到VMwareAuthorization Service服务,改为自动启动

启动里面的系统时，VMware Workstation and Hyper-V are not compatible. Remove the Hyper-V role from the system before running VMware Workstation.
```
Control Panel > Uninstall a Program > Turn Windows features on or off to turn off Hyper-V.
```
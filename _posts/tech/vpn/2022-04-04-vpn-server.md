---
layout: post
title: 搭建vpn服务器
date: 2022-04-04 23:30:00 +0800
categories: [vpn]
tags: [vpn]
---

本文搭建参考：[https://github.com/hwdsl2/setup-ipsec-vpn/blob/master/README-zh.md](https://github.com/hwdsl2/setup-ipsec-vpn/blob/master/README-zh.md)

使用 [Libreswan](https://libreswan.org/) (IPsec VPN 软件)作为 IPsec 服务器 和 [xl2tpd](https://github.com/xelerance/xl2tpd) (L2TP 服务进程)作为 L2TP 提供者。

## 手动安装

一键快速搭建！！！

```

apt-get update

wget https://git.io/vpnsetup -O vpnsetup.sh && sudo sh vpnsetup.sh

```

注意：https://git.io/vpnsetup其实是

[https://raw.githubusercontent.com/hwdsl2/setup-ipsec-vpn/master/vpnsetup.sh](https://raw.githubusercontent.com/hwdsl2/setup-ipsec-vpn/master/vpnsetup.sh)

如果使用 CentOS，先yum update一下，然后将上面的地址换成 https://git.io/vpnsetup-centos。

VPN 登录凭证会被自动随机生成，并在安装完成后显示在屏幕上。

## docker版本

[https://github.com/hwdsl2/docker-ipsec-vpn-server/blob/master/README-zh.md](https://github.com/hwdsl2/docker-ipsec-vpn-server/blob/master/README-zh.md)

[https://github.com/gaomd/docker-ikev2-vpn-server](https://github.com/gaomd/docker-ikev2-vpn-server)  这个链接没有看

```

docker pull hwdsl2/ipsec-vpn-server

```

IPsec PSK (预共享密钥) ：your_ipsec_pre_shared_key

重要： 首先需要在 Docker 主机上加载 IPsec af_key 内核模块：

```

sudo modprobe af_key

**docker run \**

**--name vpn   --restart=always \**

**-p 500:500/udp \
    -p 4500:4500/udp \
    ~~-v /lib/modules:/lib/modules:ro \~~
    -d --privileged \
    hwdsl2/ipsec-vpn-server**

**```**

最新的已经不需要modprobe af_key了，也不需要-v选项。

不要加it选项

**我实际运行的**

**```**

docker run --name vpn --restart=always -p 500:500/udp -p 4500:4500/udp -d --privileged hwdsl2/ipsec-vpn-server

```

记得打开阿里云的端口。

登录信息，可以查看容器的日志：

```

docker logs vpn

Server IP: 你的VPN服务器IP
IPsec PSK: 你的IPsec预共享密钥
Username: 你的VPN用户名
Password: 你的VPN密码

```

查看你的 IPsec VPN 服务器状态

```

docker exec -it vpn ipsec status

```

查看当前已建立的 VPN 连接：

```

docker exec -it vpn ipsec whack --trafficstatus

```

更新你的 Docker 镜像和容器

```

docker pull hwdsl2/ipsec-vpn-server

```

如果 Docker 镜像已经是最新的，你会看到提示：

Status: Image is up to date for hwdsl2/ipsec-vpn-server:latest

## 客户端配置

本文参考下面2个链接

1，[配置 IPsec/L2TP VPN 客户端](https://github.com/hwdsl2/setup-ipsec-vpn/blob/master/docs/clients-zh.md)

2，[配置 IPsec/XAuth ("Cisco IPsec") VPN 客户端](https://github.com/hwdsl2/setup-ipsec-vpn/blob/master/docs/clients-xauth-zh.md)

对于1，L2TP的，Windows 7在首次连接之前需要[修改一次注册表](https://github.com/hwdsl2/setup-ipsec-vpn/blob/master/docs/clients-zh.md#windows-%E9%94%99%E8%AF%AF-809)

管理员运行

![](/assets/other/vpn/fix_vpn_error_809_windows_vista_7_8_10_reboot_required.reg)
![](/assets/other/vpn/fix_vpn_error_809_allow_ipsec_reboot_required.reg.reg)


然后重启电脑

最后你可以到 [这里](https://www.ipchicken.com/) 检测你的 IP 地址

对于有外部防火墙的服务器，请为 VPN 打开 UDP 端口 500 和 4500。

以上实践成功！！！

2,IPsec/XAuth 模式也称为 "Cisco IPsec"。比 IPsec/L2TP 更高效地传输数据（较低的额外开销）

IPsec/XAuth ("Cisco IPsec") 在 Android, iOS 和 OS X 上均受支持，无需安装额外的软件。Windows 用户可以使用免费的 [Shrew Soft 客户端](https://www.shrew.net/download/vpn)。

这种跟方法一差不多，就是改了一下协议的类型。

已备份到[https://github.com/myforkers/docker-ipsec-vpn-server](https://github.com/myforkers/docker-ipsec-vpn-server)

docker也备份了，elesos/vpn_server但不知道是不是能用的。如果不能用，就用上面文章里面官方的。

## 小结

```

docker run --name vpn --restart=always -p 500:500/udp -p 4500:4500/udp -d --privileged hwdsl2/ipsec-vpn-server

```
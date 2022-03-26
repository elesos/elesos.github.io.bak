---
layout: post
title: OpenWRT 路由配置技巧
date: 2015-07-03 23:30:00 +0800
categories: [路由器]
tags: [路由器]
---
https://www.williamlong.info/archives/3922.html

随着最近 Google 在国内已经完全无法访问，使得通过 VPN 访问网络的需求更加强烈，本文介绍的方法可以使一个普通的路由具备稳定连接 VPN 的能力，并能够自动选择国内外线路，从而得到一个既没有限制，也不会影响速度的 Wifi 环境，连接到这个网络的设备不需要任何配置即可安全上网，完全感觉不到任何不便。
## chnroutes 路由表
这个路由表集中了所有分配到中国大陆的 IP 段，根据 http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest 每天自动更新，可使得在访问国内地址时不经过 VPN。

想想如果能够让家里的路由直接连接 VPN，在家连接 WiFi 的所有设备直接达到Fan墙的效果，应该很 Cool，所以最近在某宝整了一个 Netgear WNDR3800 二手路由回来，先后分别在 DD-WRT 和 OpenWRT 成功配置 VPN + chnroutes，最后还是选择了 OpenWRT。
## DD-WRT vs OpenWRT
关于 DD-WRT 和 OpenWRT，我选择 OpenWRT 主要因为 DD-WRT ROM 中集成的软件太多，绝大多数用不到，要配置 jffs2 来保存脚本文件，一般配置则保存在nvram中，而且无线较不稳定，5G频段常搜索不到（当然可能是我这个路由器型号的支持问题）。OpenWRT 的配置文件语法统一，配置都存储在文件系统中，且 ROM 本身仅集成了必备组件，非常小，可以只安装需要的东西，WEB管理界面也是可选安装，简洁强大，经过若干天的使用一直比较稳定。
## 配置
已配置好 OpenWRT 上网的童鞋们可以直接跳过 1.刷 ROM 和 2.初始配置
　###　1.刷 ROM
a.首先确定你的设备可以被 OpenWRT 所支持（到这里查看支持的设备列表：http://wiki.openwrt.org/toh/start），然后到这里下载编译好的 ROM：http://downloads.openwrt.org/ 。最新的 stable 版本是 attitude_adjustment(12.09)，我下载的是 trunk 版本。
b.在 OpenWRT 官网找相应设备的 Wiki 页面查看刷机方法，一般都是在路由器官方Web固件升级页面直接刷入（我的 WNDR3800 Wiki页面是：http://wiki.openwrt.org/toh/netgear/wndr3800）
　###　2.初始配置
a.路由器启动后，有的型号没有安装 Wifi 模块，需要先用网线连接到 LAN 口，本机 IP 配置为静态 192.168.1.x，然后 telnet 到 192.168.1.1，更改 root 密码，然后 ssh 连入，参考：http://wiki.openwrt.org/doc/start#configuring.openwrt

![](/assets/other/router/1.jpeg)

b.配置 WAN 口，让路由连上 Internet，参考：http://wiki.openwrt.org/doc/howto/internet.connection 。
比如要配置 PPPoE：
```
uci set network.wan.proto=pppoe
uci set network.wan.username='yougotthisfromyour@isp.su'
uci set network.wan.password='yourpassword'
uci commit network
ifup wan
```
　　c.安装 LuCI Web 管理界面并设置开机自动启动，参考：http://wiki.openwrt.org/doc/howto/luci.essentials

```
opkg update
opkg install luci
/etc/init.d/uhttpd start
/etc/init.d/uhttpd enable
```
　　d.浏览器输入路由器 LAN 侧 IP（多为192.168.1.1），进行 Wifi 等配置


![](/assets/other/router/2.jpeg)

　　3.配置 DNS
a.创建 /etc/config/sec_resolv.conf
vim /etc/config/sec_resolv.conf
填入以下 DNS Servers:
```
nameserver 8.8.8.8
nameserver 8.8.4.4
nameserver 208.67.222.222
```
　　b.编辑 /etc/config/dhcp
vim /etc/config/dhcp
找到 option resolvfile 选项，替换为：
```
option resolvfile '/etc/config/sec_resolv.conf'
```
　　4.配置 PPTP
a.安装 ppp-mod-pptp
```
opkg update
opkg install ppp-mod-pptp
```
　　如果需要 LuCI 支持（推荐）：
```
opkg install luci-proto-ppp
```
　　b.配置 vpn 接口，编辑 /etc/config/network 文件，应该已经有以下内容（如果没有，需要插入），并配置里面的 server、username 和 password：
```
        config 'interface' 'vpn' 
        option 'ifname'    'pptp-vpn'  
        option 'proto'     'pptp'
        option 'username'  'vpnusername'
        option 'password'  'vpnpassword'
        option 'server'    'vpn.example.org or ipaddress' 
        option 'buffering' '1' 
```
　　c.进入 Network -> Firewall ，把 vpn 加入 wan zone，效果如图：

![](/assets/other/router/3.jpeg)


d.进入 Network -> Interfaces ，此时应该已经可以看到 VPN Interface 并可以连接，效果如图：

![](/assets/other/router/4.jpeg)





e.此时在本机 traceroute www.google.com，应该能得到类似以下的结果：
```
$ traceroute www.google.com 
traceroute: Warning: www.google.com has multiple addresses; using 74.125.239.113 
traceroute to www.google.com (74.125.239.113), 64 hops max, 52 byte packets
 1  fc_r0.lan (192.168.7.1)  2.266 ms  0.999 ms  0.946 ms
 2  10.7.0.1 (10.7.0.1)  189.259 ms  187.813 ms  188.368 ms
 3  23.92.24.2 (23.92.24.2)  189.847 ms  190.489 ms  188.939 ms
 4  10ge7-6.core3.fmt2.he.net (65.49.10.217)  188.508 ms  192.216 ms  202.863 ms
 5  10ge10-1.core1.sjc2.he.net (184.105.222.14)  195.695 ms  195.691 ms  284.242 ms
 6  72.14.219.161 (72.14.219.161)  189.196 ms  192.287 ms  193.220 ms
 7  216.239.49.170 (216.239.49.170)  192.496 ms  188.547 ms  189.881 ms
 8  66.249.95.29 (66.249.95.29)  190.125 ms  190.335 ms  190.026 ms
 9  nuq05s01-in-f17.1e100.net (74.125.239.113)  189.804 ms  190.556 ms  190.242 ms
```
可以看出，其中第二跳是 VPN 的网关，而 traceroute www.baidu.com 的话第二跳应该也是同样的结果。
这时已经可以访问 Google, Baidu 等国内外的站点了。
　　5.配置 chnroutes
a.到 chnroutes 项目的下载页面：http://chnroutes-dl.appspot.com/ 下载 linux.zip，解压
b.把 ip-pre-up 重命名为 chnroutes.sh，打开编辑，在 if [ ! -e /tmp/vpn_oldgw ]; then 前插入以下代码，以避免 ppp 连接脚本重复执行导致重复添加路由表项：
```
if [ $OLDGW == 'x.x.x.x' ]; then    exit 0
fi
```
其中 x.x.x.x 是 VPN 的网关，可以先本机连接上去之后查看一下网关地址。
c.ssh 连接到路由器，执行以下命令：
```
cd /etc/config/
mkdir pptp-vpn
cd pptp-vpn
vim chnroutes.sh
```
在 vim 中把编辑好的 chnroutes.sh 粘贴进去（当然也可以通过 ssh 直接把 chnroutes.sh 文件传过去，或者上传到某个地方再 wget 下载）
执行以下命令，设置权限为可执行：
```
chmod a+x chnroutes.sh
```
d.用 vim 编辑 /lib/netifd/ppp-up 文件：

在 [ -d /etc/ppp/ip-up.d ] && { 这一行前插入以下内容，确保 ppp 连接脚本能够被执行：
```
sh /etc/config/pptp-vpn/chnroutes.sh
```
　　e.重启路由，启动好之后，进入 LuCI 查看接口状态，等 WAN 和 VPN 都连接成功后，ssh进去，执行 route -n | head -n 10 ，效果应该类似这样：
```
# route -n | head -n 10 
Kernel IP routing table 
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface 
0.0.0.0         10.7.0.1      0.0.0.0         UG    0      0        0 pptp-vpn 
1.0.1.0         58.111.43.1   255.255.255.0   UG    0      0        0 pppoe-wan 
1.0.2.0         58.111.43.1   255.255.254.0   UG    0      0        0 pppoe-wan 
1.0.8.0         58.111.43.1   255.255.248.0   UG    0      0        0 pppoe-wan 
1.0.32.0        58.111.43.1   255.255.224.0   UG    0      0        0 pppoe-wan 
1.1.0.0         58.111.43.1   255.255.255.0   UG    0      0        0 pppoe-wan 
1.1.2.0         58.111.43.1   255.255.254.0   UG    0      0        0 pppoe-wan 
1.1.4.0         58.111.43.1   255.255.252.0   UG    0      0        0 pppoe-wan
```
其中 Destination 为 0.0.0.0 的是默认路由，网关为 VPN 网关，意味着默认流量都经过 VPN，而以下的条目则把目的为国内的网段都指向了 ISP 提供的网关。

至此 PPTP VPN 和 chnroutes 已经配置完毕。
　　6.配置 VPN 断线自动重连
a.创建 /etc/config/pptp-vpn/status-check.sh：
```
vim /etc/config/pptp-vpn/status-check.sh
```
在 vim 中粘贴以下内容（此脚本检测 VPN 连接状态，并在断线后会断开 WAN 和 VPN 接口，10秒后重新连接 WAN，并在 30 秒后重连 VPN）：
```
#!/bin/sh
if [ -f "/tmp/vpn_status_check.lock" ]
then
        exit 0
fi
VPN_CONN=`ifconfig | grep pptp-vpn`
if [ -z "$VPN_CONN" ]
then
        touch /tmp/vpn_status_check.lock
        echo WAN_VPN_RECONNECT at: >> /tmp/vpn_status_check_reconn.log
        date >> /tmp/vpn_status_check_reconn.log
        ifdown vpn
        ifdown wan
        sleep 10
        ifup wan
        sleep 30
        ifdown vpn
        sleep 10
        ifup vpn
        sleep 40
        rm /tmp/vpn_status_check.lock
else
        date > /tmp/vpn_status_check.log
fi
```
执行以下命令，设置权限为可执行：
```
chmod a+x /etc/config/pptp-vpn/status-check.sh
```
b.进入LuCI 的 System -> Scheduled Tasks 填入以下内容，并保存：
```
*/1 * * * * /etc/config/pptp-vpn/status-check.sh
```
以上实际上是编辑了 cron 配置，cron 每分钟运行检测 / 重连脚本，重启 cron：
```
/etc/init.d/cron restart
```
　　c.静待几分钟，查看 /tmp 目录，应该能看到 vpn_oldgw 和 vpn_status_check.log 文件，查看 vpn_status_check.log 文件，可以看到最近一次检测 VPN 连接状态的时间。
```
# ls vpn*
vpn_oldgw             vpn_status_check.log
# cat vpn_status_check.log 
Tue Jul 15 00:04:02 HKT 2014

你可以在 LuCI 中断开 VPN 接口，在接下来的4-5分钟，观察 WAN 和 VPN 的重连情况。
d.分别 traceroute www.google.com 和 www.baidu.com ，观察第二跳的地址：
```
$ traceroute www.google.com | head -n 3
traceroute: Warning: www.google.com has multiple addresses; using 74.125.239.115
traceroute to www.google.com (74.125.239.115), 64 hops max, 52 byte packets
 1  fc_r0.lan (192.168.7.1)  2.161 ms  0.912 ms  0.895 ms
 2  10.7.0.1 (10.7.0.1)  193.747 ms  187.789 ms  289.744 ms
 3  23.92.24.2 (23.92.24.2)  259.323 ms  354.625 ms  408.535 ms

$ traceroute www.baidu.com | head -n 3
traceroute to www.a.shifen.com (180.76.3.151), 64 hops max, 52 byte packets
 1  fc_r0.lan (192.168.7.1)  1.190 ms  0.984 ms  0.731 ms
 2  58.111.43.1 (58.111.43.1)  20.616 ms  38.822 ms  18.484 ms
 3  183.56.35.133 (183.56.35.133)  20.056 ms  52.353 ms  87.841 ms
```
可以看出，已成功对国内外的目标地址进行了路由选择。
至此，OpenWRT 路由的基本配置、PPTP VPN、chnroutes 和自动重连已经配置完成。

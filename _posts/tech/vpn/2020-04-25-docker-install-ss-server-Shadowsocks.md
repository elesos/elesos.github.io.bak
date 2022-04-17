---
layout: post
title: docker部署 Shadowsocks 服务器
date: 2020-04-25 23:30:00 +0800
categories: [vpn]
tags: [vpn]
---

https://github.com/shadowsocks/shadowsocks-libev/blob/master/README.md#docker
```
docker pull shadowsocks/shadowsocks-libev

docker run -e PASSWORD=<password> -p<server-port>:8388 -p<server-port>:8388/udp -d shadowsocks/shadowsocks-libev
```
注意也要打开安全组的相应端口。

实际用的
```
docker run --name ss -e PASSWORD=Password -e METHOD=aes-256-cfb -p 8388:8388 -p 8388:8388/udp -d --restart always shadowsocks/shadowsocks-libev
```
已备份到docker pull elesos/ss_server

已备份到 https://github.com/myforkers/shadowsocks-libev

密码尽量不要搞@符号！！！

用docker inspect ss 查密码

METHOD: encryption method to use, defaults to aes-256-gcm

IMEOUT: defaults to 300

DNS_ADDRS: DNS servers to redirect NS lookup requests to, defaults to 8.8.8.8,8.8.4.4

TZ: Timezone, defaults to UTC


At last, download shadowsocks client here. Don't forget to share internet with your friends.

```
{
    "server": "your-vps-ip",
    "server_port": 8388,
    "local_address": "0.0.0.0",
    "local_port": 1080,
    "password": "9MLSpPmNt",
    "timeout": 600,
    "method": "aes-256-gcm"
}
```
ios客户端

PP助手去下载Shadowrocket。![](/assets/other/vpn/shadowrocket-2.1.10.ipa)

windows客户端 ;

https://github.com/shadowsocks/shadowsocks-windows/releases其它

https://shadowsocks.org/en/download/clients.html 这个链接包含了上面windows的

```
docker run -p 8388:8388 -p 8388:8388/udp -d --restart always shadowsocks/shadowsocks-libev:latest
```
上面这个等价于
```
$ ss-server -s 0.0.0.0 -p 8388 -k "$(hostname)" -m aes-256-gcm -t 300 --fast-open -d "8.8.8.8,8.8.4.4" -u
the hostname in the container that is used as the password, not that of the host.

ss-server -s 0.0.0.0        -p 8388 -k bao231@164808711 -m aes-256-cfb -t 300 --fast-open -d 8.8.8.8 -d 8.8.4.4 -u
```


https://www.flyzy2005.com/fan-qiang/shadowsocks/shadowsocks-iphone-ios-config/
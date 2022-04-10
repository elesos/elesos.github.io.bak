---
layout: post
title: IPsec L2TP PPTP协议介绍
date: 2020-04-25 23:30:00 +0800
categories: [协议]
tags: [协议]
---

## IPsec

Internet Protocol Security 互联网安全协议

## L2TP

Layer Two Tunneling Protocol第二层隧道协议，是一种虚拟隧道协议，通常用于虚拟专用网。

L2TP协议自身不提供加密与可靠性验证的功能，可以和安全协议搭配使用，从而实现数据的加密传输。

经常与L2TP协议搭配的加密协议是IPsec，当这两个协议搭配使用时，通常合称L2TP/IPsec

IPsec/XAuth 模式也称为 "Cisco IPsec"。可以比 IPsec/L2TP 更高效地传输数据（较低的额外开销）

## PPTP

Point to Point Tunneling Protocol，点对点隧道协议，是实现虚拟专用网（VPN）的方式之一

## IKEv2

Internet Key Exchange 因特网密钥交换，简称 IKE 或 IKEv2， 是一种网络协议，归属于 IPsec 协议族之下，用以创建安全关联 (Security Association, SA)。
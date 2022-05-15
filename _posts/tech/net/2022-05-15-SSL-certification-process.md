---
layout: post
title: SSL certification process
date: 2022-05-15 05:30:00 +0800
categories: [网络]
tags: [ssl]
---

After the TCP connection is established, the SSL client sends a message to the server, and then the server returns a packet and the certificate of the SSL server ( Contains the public key) to the client.

The client then encrypts and then transmits the message with the received public key. The encrypted message can only be decrypted with the SSL server private key
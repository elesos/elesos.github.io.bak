---
layout: post
title: Enable certification chain verification on SSL TLS connection 安全设置
date: 2022-05-02 05:30:00 +0800
categories: [c]
tags: [c]
---
CURLOPT_SSL_VERIFYPEER :verify the peer's SSL certificate

curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // Compliant; CURLOPT_SSL_VERIFYPEER is set to 1
for openssl

SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, NULL); // Compliant; CURLOPT_SSL_VERIFYPEER enable OpenSSL's built-in verification of the peer certificate.
Enable server hostname verification on this SSL/TLS connection
Server hostnames should be verified during SSL/TLS connections

curl_easy_setopt(curl, CURLOPT_SSL_VERIFYHOST, 2L); // Compliant
for openssl

SSL_set1_host(ssl, HOST_NAME); // Compliant
## 参考
https://linux.die.net/man/1/verify

verify - Utility to verify certificates.
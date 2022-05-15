---
layout: post
title: Use stronger SSL and TLS versions
date: 2022-05-15 05:30:00 +0800
categories: [c]
tags: [c]
---

"SSLv3" have been proven to be insecure

curl_easy_setopt(curl, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2); // Compliant; enables TLSv1.2 / TLSv1.3 version only
如果是openssl
```
SSL_CTX *ctx = SSL_CTX_new(method);
SSL_CTX_set_min_proto_version(ctx, TLS1_2_VERSION); // Compliant; enables TLSv1.2 / TLSv1.3 version only
```
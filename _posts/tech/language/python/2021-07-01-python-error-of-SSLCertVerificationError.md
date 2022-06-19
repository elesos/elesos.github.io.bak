---
layout: post
title: 解决python错误 'SSLCertVerificationError' object has no attribute 'message'
date: 2021-07-01 07:55:19 +0800
categories: [艺搜科技,编程]
tags: [python]
---

# 

'SSLCertVerificationError' object has no attribute 'message' 错误：调试python后定位到

'[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1125)'

The error indicates that a certificate is missing.

one solution: Run /Applications/Python\ 3.7/Install\ Certificates.command（this command replaces the root certificates of the default Python installation with the ones shipped through the certifi package. ） certifi模块目录下面有一个cacert.pem，上面的命令应该是拷贝那个certifi下面的证书到openssl目录下。

https://www.openssl.org/docs/faq.html Why does <SSL program> fail with a certificate verify error?

This problem is usually indicated by log messages saying something like "unable to get local issuer certificate" or "self signed certificate".

When a certificate is verified its root CA must be "trusted" by OpenSSL this typically means that

the CA certificate must be placed in a directory or file

and the relevant相关的 program configured to read it.

you trust one specific certificate because you trust the parent of that certificate

https://stackoverflow.com/questions/52805115/certificate-verify-failed-unable-to-get-local-issuer-certificate

指定编译的python3.8.0时, 在vs code中遇到 调试设置中的 python 路径无效， 无法使用自定义的python解释器:最后发现需要搞一个没有rpath的python3.8.0才能调试。

在settings.json

`"python.pythonPath":"python3.8.0_for_debug"`

在launch.json

```
"env":{"DYLD_LIBRARY_PATH":"/path/to/python3/mac/lib:/path/to/openssl/lib"}
```

最后通过在代码中加入下面2行解决。

```
os.environ['REQUESTS_CA_BUNDLE']= '/path/to/lib/python3.8/site-packages/pip/_vendor/certifi/cacert.pem'
os.environ['SSL_CERT_FILE']='/path/to/lib/python3.8/site-packages/pip/_vendor/certifi/cacert.pem' 或者参考上面的命令Install Certificates.command里面建立软链接。不过openssl的目录可能不对。
或者用certifi.where() 代替上面的路径！！！
```

## 参考

https://stackoverflow.com/questions/10667960/python-requests-throwing-sslerror




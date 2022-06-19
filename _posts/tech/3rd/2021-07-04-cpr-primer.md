---
layout: post
title: cpr库简明教程
date: 2021-07-04 10:57:28 +0800
categories: [艺搜科技,c++库]
tags: [C++库]
---

HTTP library for C++

https://github.com/whoshuu/cpr

is a simple wrapper around libcurl inspired by the excellent Python Requests project.

```
cpr::util::urlDecode(name);
```



代理

### HTTP proxy

Standard ports 80, 8080, 3128.

### HTTPS proxy

Standard ports 80, 8080, 3128.

### Socks proxy

Standard ports 1080, 1081.

now uses two protocol versions:

- Socks 4 supports only TCP connection

- Socks 5 supports TCP, UDP, authorization by login and password, and remote DNS-query

  https://thesafety.us/http-socks-proxy



https://curl.se/libcurl/c/CURLOPT_PROXY.html

https://everything.curl.dev/libcurl/proxies

https://curl.se/libcurl/c/CURLOPT_PROXYUSERPWD.html

https://github.com/whoshuu/cpr/issues/138  cpr uses protocol of your URL to decide proxy 



So if your URL is '[http://xxxx](http://xxxx/)' then it will try to use proxy like {'http', 'something'}



https://github.com/whoshuu/cpr/issues/248

不支持认证





https://curl.se/libcurl/c/CURLOPT_PROXYUSERPWD.html Both the name and the password will be URL decoded before use。需要Urlencode下



curl_easy_setopt(curl_->handle, CURLOPT_PROXY, proxies_.getServerAndPortStr().c_str());
        switch (proxies_.getProxyType()) {
            case 1:
                curl_easy_setopt(curl_->handle, CURLOPT_PROXYTYPE, CURLPROXY_HTTP);
                break;
            case 2:
                curl_easy_setopt(curl_->handle, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS4);
                break;
            case 3:
                curl_easy_setopt(curl_->handle, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5);
                break;
            default:
                curl_easy_setopt(curl_->handle, CURLOPT_PROXY, nullptr);
                break;
        }
        if (!proxies_.getUserAndPwdStr().empty())
            curl_easy_setopt(curl_->handle, CURLOPT_PROXYUSERPWD, proxies_.getUserAndPwdStr().c_str()); //需要urlencode后用冒号隔开。
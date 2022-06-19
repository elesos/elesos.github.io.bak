---
layout: post
title: 微信公众平台开发
date: 2022-05-21 05:30:00 +0800
categories: [微信开发]
tags: [微信开发]
---

注：运营主体为个人，只可创建订阅号,不能创建服务号。

而且订阅号只有300元认证后，才能拥有菜单功能（现在订阅号可以免费创建菜单了）,而且年审认证需要另行支付审核费。

示例代码设置

微信公众平台提供了一个php示例代码：wx-sample.zip

define("TOKEN", "elesos");

注意先不要注释示例代码中的“$wechatObj->valid();”, 微信需要验证。

注意：微信公众号接口只支持80接口。故不能用https形式的网址,URL要填到最终的接口地址，如xxx.com/api.php

公众平台设置里面的Token 填写代码自定义的token 值，这里为elesos。

声明一个类 wechatCallbackapiTest，该类中包含有三个方法。

valid() 申请 成为开发者 时向微信发送验证信息。验证通过后，需要注释掉对此函数的调用。

responseMsg()处理并回复用户发送过来的消息，也是用的最多的一个函数，几乎所有的功能都在这里实现。在此处可以获取到用户的openid

发一条消息给公众号，微信转过来是这样的
```
 
<xml><ToUserName><![CDATA[gh_a50xxxfa6c3]]></ToUserName>
<FromUserName><![CDATA[oeMNut4uO-xxx_hSG9os]]></FromUserName>
<CreateTime>1514192456</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[北京天气]]></Content>
<MsgId>6503407078838837886</MsgId>
</xml>
```
checkSignature():开发者通过检验signature对请求进行校验。若请求来自微信服务器，原样返回echostr参数内容，则接入生效，否则接入失败。



## 事件
新用户关注产生订阅事件，即subscribe事件，默认代码中没有对这一事件进行相应处理。

在新用户关注公众平台后，可能想知道该平台提供了哪些功能，以及怎样使用该平台，通俗一点讲就是该平台的“使用说明书”。

收到消息后，首先需要对消息类型做出判断，然后再针对不同类型的消息做出处理。在事件推送中，事件类型又分为三种，subscribe（订阅）、unsubscribe（取消订阅）、CLICK（自定义菜单点击事件）；判断为subscribe事件后，根据设定好的欢迎消息，回复给用户。

如何判断用户输入的文字并回复：

根据用户发送的信息进行判断，然后给出对应的回复，具有良好的交互性。

用户发送过来的文本信息，我们可以提取关键字，通过简单的 if...elseif...else... 实现。

 
```
if($keyword=="你好"){
    $contentStr="hello";
}elseif($keyword=="苏州"){
    $contentStr="上有天堂，下有苏杭";
}else{
    $contentStr="感谢关注";
}
```
可以将key-value存入数据库。

## 天气预报
首先对用户发过来的消息进行判断，判断消息里是否含有“天气”关键字，如果含有，则需要继续提取地区信息，然后再通过中国天气网 提供的API查询。

实时天气信息API：http://www.weather.com.cn/data/sk/101110101.html

其中URL中的数字指代城市的编号101110101（西安）。 返回信息格式如下：

 
{"weatherinfo":{"city":"西安","cityid":"101110101","temp":"24","WD":"东南风","WS":"2级","SD":"62%","WSE":"2","time":"21:00","isRadar":"1","Radar":"JC_RADAR_AZ9290_JB"}}

其中：
cityid为城市编码，
temp为当前温度
WD //风向
WS //风力
SD//相对湿度
WSE //风力
isRadar "1"//是否有雷达图
Radar "JC_RADAR_AZ9010_JB"//雷达图地址：http://products.weather.com.cn/product/radar/index/procode/JC_RADAR_AZ9290_JB
## 翻译功能
有道翻译API：http://fanyi.youdao.com/openapi?path=data-mode，记下申请时的API key 和keyfrom

6ecd40cd5_o.jpeg

数据接口： http://fanyi.youdao.com/openapi.do?keyfrom=<keyfrom>&key=<key>&type=data&doctype=json&version=1.1&q=要翻译的文本

keyfrom 和key换成上面申请的内容，如：
```
 
http://fanyi.youdao.com/openapi.do?keyfrom=<keyfrom>&key=<key>&type=data&doctype=json&version=1.1&q=good
{"errorCode":0"query":"good",
    "translation":["好"], // 有道翻译
    "basic":{// 有道词典-基本词典
        "phonetic":"gʊd""uk-phonetic":"gʊd"//英式发音
        "us-phonetic":"ɡʊd"//美式发音
        "explains":["好处",
            "好的""好"]
      },
    "web":[// 有道词典-网络释义
        {"key":"good",
            "value":["良好","善","美好"]},
        {...}
         ]
}
```
access_token

关于网页授权access_token和普通access_token的区别

通过code换取网页授权access_token（与基础支持中的普通access_token不同）

由于access_token拥有较短的有效期，当access_token超时后，可以使用refresh_token进行刷新，refresh_token有效期为30天，当refresh_token失效之后，需要用户重新授权。

## 参考
https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Getting_Started_Guide.html

http://mp.weixin.qq.com/wiki?id=mp1445241432&lang=zh_CN

http://www.cnblogs.com/mchina/archive/2013/06/05/3108618.html

http://www.cnblogs.com/mchina/archive/2013/06/07/3120592.html

http://www.cnblogs.com/mchina/p/3120531.html

http://www.cnblogs.com/mchina/p/3155072.html

https://www.zhihu.com/question/20575288

http://z3sm2012.iteye.com/blog/1880973

http://www.cnblogs.com/mchina/p/3170551.html

http://www.cnblogs.com/mchina/p/3170565.html

http://www.crazyant.net/920.html

http://stackoverflow.com/questions/8068220/check-if-array-is-null-or-not-in-php
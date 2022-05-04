---
layout: post
title: Rapidjson 使用
date: 2022-05-02 05:30:00 +0800
categories: [C]
tags: [C]
---
https://github.com/Tencent/rapidjson

http://rapidjson.org/zh-cn/

document.HasMember("hello")
document["hello"].IsString()
document["hello"].GetString()
 const Value& a = document["a"];
a.IsArray()
 for (SizeType i = 0; i < a.Size(); i++) // rapidjson uses SizeType instead of size_t.
           printf("a[%d] = %d\n", i, a[i].GetInt());

// Iterating array with iterators       
       for (Value::ConstValueIterator itr = a.Begin(); itr != a.End(); ++itr)
           printf("%d ", itr->GetInt());
修改
```
document["i"] = f20; 
 StringBuffer buffer;
   Writer<StringBuffer> writer(buffer); //PrettyWriter<StringBuffer>
   d.Accept(writer);   
   std::cout << buffer.GetString() << std::endl;
```
https://github.com/Tencent/rapidjson/blob/master/example/tutorial/tutorial.cpp

Parse an array of objects https://github.com/Tencent/rapidjson/issues/1235
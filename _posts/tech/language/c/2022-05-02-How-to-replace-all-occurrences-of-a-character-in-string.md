---
layout: post
title: How to replace all occurrences of a character in string
date: 2022-05-02 05:30:00 +0800
categories: [c]
tags: [c]
---

include <algorithm>
include <string>
void some_func() {

 std::string s = "example string";
 std::replace( s.begin(), s.end(), 'x', 'y'); // replace all 'x' to 'y'
}

Replace substring with another substring C++

#include <string>
include <regex>
std::string test = "abc def abc def"; test = std::regex_replace(test, std::regex("def"), "klm");
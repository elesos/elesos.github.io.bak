---
layout: post
title: C++ noexcept
date: 2022-04-30 05:30:00 +0800
categories: [c++]
tags: [c++]
---
void doSomething() noexcept; // this function is non-throwing
if an exception exits a noexcept function, std::terminate will be called.

Functions that are non-throwing by default:

default constructors copy constructors move constructors destructors copy assignment operators move assignment operators

The following are potentially throwing by default:

Normal functions User-defined constructors Some operators, such as new

## When to use noexcept
Use the noexcept specifier in specific cases where you want to express a no-fail or no-throw guarantee.If you are uncertain whether a function should have a no-fail/no-throw guarantee, error on the side of caution and do not mark it with noexcept.
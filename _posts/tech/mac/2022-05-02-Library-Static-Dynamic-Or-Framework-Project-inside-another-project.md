---
layout: post
title: Library Static Dynamic Or Framework when Project inside another project
date: 2022-05-02 05:30:00 +0800
categories: [ios]
tags: [ios]
---

iOS static libraries are not allowed to contain images/assets (only code). As of iOS 8, Apple now permits developers to create dynamic frameworks!

Dynamic library - a unit of code and/or assets ,However, only Apple is allowed to create dynamic libraries for iOS . You're not allowed to create these, as this will get your app rejected.

Software Framework - a compiled set of code that accomplishes a task... hence, you can actually have a static framework or a dynamic framework, which are typically just the compiled versions of the above.

on iOS, your only option is basically to use a static library or static framework

a special kind of libraries exists: Text Based .dylib stubs — .tbd, is a text file that contains the names of the methods without their bodies, declared in a dynamic library .


## Framework
Framework is a package that can contain resources such as dynamic libraries, strings, headers, images, storyboards etc. With small changes to its structure, it can even contain other frameworks. Such aggregate is known as umbrella framework.

frameworks are hierarchial directories with different kinds of files, including other libraries and frameworks.

Frameworks are also bundles ending with .framework extension. They can be accessed by NSBundle / Bundle class from code

https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Frameworks.html#//apple_ref/doc/uid/10000183-SW1

## Bundle
https://developer.apple.com/library/archive/documentation/CoreFoundation/Conceptual/CFBundles/BundleTypes/BundleTypes.html#//apple_ref/doc/uid/10000123i-CH101-SW1

## Frameworks vs. Bundles
Both bundles and frameworks are file structures that contain various resources that your app can use. A framework is like a library -- it's something your program links against when you build it. A bundle, on the other hand, is essentially a folder structure containing compiled code that you load at runtime.

## 如何创建
https://github.com/myforkers/iOS-Framework

sample/Serenity directory.

three targets: a static library, a bundle, and an aggregate聚合的.（ File > New Target > iOS > Other and create a new Aggregate target. ）
The static library target will build the source into a static library (.a) and specify which headers will be "public", 意味着they will be accessible from the .framework when we distribute it.

The bundle target will contain all of our resources and will be loadable from the framework.

The aggregate target will build the static library for i386/armv6/armv7/armv7s, generate the fat framework binary, and also build the bundle. You will run this target when you plan to distribute the .framework.

Public headers are headers that will be copied to the .framework and can be imported by those using your framework.
在"Target Membership" 里面设置 public headers are copied to a separate directory： "Build Settings" tab. Search for "public headers" and then set the "Public Headers Folder Path" to "$(PROJECT_NAME)Headers" make sure that this folder is unique.

Enable all architecture support
change this in your project file (not your target files !): "Build Active Architecture Only" => No (for all settings)
Create the Bundle Target
File > New > Target > OS X > Bundle. name the bundle something different from your framework name


Add the Framework Project to your Application Project

drag the framework's .xcodeproj to Xcode and drop it in your application's frameworks folder. This will add a reference to the framework's xcodeproj folder.

## 动态库
Creating Dynamic Libraries

https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/DynamicLibraries/100-Articles/CreatingDynamicLibraries.html
---
layout: post
title: 禁用 android studio 自身的ndk编译
date: 2022-05-21 05:30:00 +0800
categories: [vs]
tags: [vs]
---

让studio不自动编译jni文件，而是我们手动通过ndk-build编译

打开工程下面的app文件夹里面的build.gradle

添加如下：
```
defaultConfig {

        applicationId "com.elesos.jnidemux"

        minSdkVersion 15

        targetSdkVersion 21

        versionCode 1

        versionName "1.0"

         ndk {

           moduleName "codec"    //libcodec.so

         }

    }

    sourceSets.main {

        jniLibs.srcDir 'src/main/libs'         //set .so files location to libs

        jni.srcDirs = []                       //disable automatic ndk-build call

    }


    buildTypes {

        release {

            minifyEnabled false

            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'

        }

    }
```
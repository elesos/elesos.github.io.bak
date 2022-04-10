---
layout: post
title: vscode 编译调试环境搭建
date: 2022-04-04 23:30:00 +0800
categories: [vscode]
tags: [vscode]
---

插件：

- **C/C++ Extension Pack**
- **CMake  tools**
  
    CMake工程的辅助工具，该插件提供了两个可选择使用的配置文件，分别位于 .vscode/cmake-kits.json 和 "工程根目录"/cmake-variants.yaml
    

必要软件：

- **CMake**
- **VS编译套件**

## VSCODE 常用操作

### Ctrl+shift+p  快速输入命令，安装的插件一般都会提供相应命令，方便操作

![](/assets/other/vscode/Untitled.png)

### 底部工具栏快捷操作选项

![](/assets/other/vscode/1.png)

## 环境配置

1. CMake Tools 自动搜索设备上的MSVC等编译套件，也可以通过配置文件自定义所需套件。

![](/assets/other/vscode/2.png)

1. 在设置中配置CMake tools，会根据配置生成相应json文件

![](/assets/other/vscode/3.png)

1. 这里配置cmake生成时传递的参数

```cpp
-DPRJ_GLOBAL_KEYWORD="Qt4VSv1.0" -DPRJ_FOR_DEV=ON -DFILMORA_USE_ANTIPIRACY=OFF -G "Visual Studio 15 2017 Win64" -DcustomQtDir="D:\Qt5.15\5.15.2\msvc2019_64" ..
```

![](/assets/other/vscode/4.png)

1. 设置对应生成的json :

![](/assets/other/vscode/5.png)

配置完上述即可，执行cmake:build 生成vs工程

![](/assets/other/vscode/6.png)

## 配置DEBUG

**launch.json ，task.json 具体的关键词含义详见官方文档：**

[https://code.visualstudio.com/docs/editor/debugging](https://code.visualstudio.com/docs/editor/debugging)

### launch.json

```cpp
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    // 调试配置数组
    "configurations": [
        {
            "name": "(vsdbg) 启动",
            "type": "cppvsdbg",
            "request": "launch",
            "program": "${command:cmake.launchTargetPath}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${command:cmake.launchTargetDirectory}",
            "environment": [],
            "console": "externalTerminal",
            "logging": {
                "moduleLoad": false,
                "trace": true
            },
            "visualizerFile": "c:\\Users\\ws\\AppData\\Roaming\\Code\\User\\workspaceStorage\\5333b3f705b91649f6199aa414b50edd\\tonka3000.qtvsctools\\qt.natvis.xml"
        },
        {
            "name": "(vsdbg) 附加",
            "type": "cppvsdbg",
            "request": "attach",
            "processId": "${command:pickProcess}",
            "logging": {
                "moduleLoad": false,
                "trace": true
            },
            "visualizerFile": "c:\\Users\\ws\\AppData\\Roaming\\Code\\User\\workspaceStorage\\5333b3f705b91649f6199aa414b50edd\\tonka3000.qtvsctools\\qt.natvis.xml"
        }
    ]
}
```

### task.json

```cpp
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    // 测试方式，尽量使用cmake_tools自带的编译方式
    "version": "2.0.0",
    "tasks": [
        // 用来输出command配置，用于检测command配置的值是否正确
        {
            "label": "echo vscode",
            "type": "shell",
            "command": "echo command: ${command:cmake.launchTargetDirectory}"
        },
        // MSVC编译器编译
        {
            // 标签名
            "label": "MSbuild",
            // 类型
            "type": "process",
            // 命令-使用CMake执行CMake命令
            "command": "${config:cmake.cmakePath}",
            // CMake参数
            "args": [
                "--build", "${command:cmake.buildDirectory}", // 编译的生成路径
                "--config", "${command:cmake.buildType}",     // 配置类型release,debug等
                "--target", "${input:buildTargetName}",       // 待执行的CMake目标名称，input变量可以在下拉框中选择该变量集合中的某个字符串
                "-j"                                          // 多线程执行
            ],
            "group": "build",
            "problemMatcher": ["$msCompile"]                  // 错误显示匹配器
        },
        // MinGW 编译
        {
            "label": "MingWbuild",
            "type": "process",
            "command": "${config:cmake.cmakePath}",
            "args": [
                "--build", "${command:cmake.buildDirectory}",
                "--config", "${command:cmake.buildType}",
                "--target", "${input:buildTargetName}",
                "-j"
            ],
            "group": "build",
            "problemMatcher":{
                "owner": "cpp",
                // 文件所在文件夹
                "fileLocation": ["relative", "${workspaceFolder}"],
                "pattern": {
                    "regexp": "^(.*):(\\d+):(\\d+):.*\\s+(warning|error):\\s+(.*)$",
                    "file": 1,
                    "line": 2,
                    "column": 3,
                    "severity": 4,
                    "message": 5
                }
            }
        },
        // Doxygen生成
        {
            "label": "DocGen",
            "type": "process",
            "command": "${config:cmake.cmakePath}",
            "args": [
                "--build", "${command:cmake.buildDirectory}",
                "--config", "${command:cmake.buildType}",
                "--target", "${input:doxygenTargetName}",
                "-j"
            ],
            "group": "build",
            "problemMatcher": ["$msCompile"]
        },
        // 安装生成的动态库、PDB、头文件、可执行体、静态库等
        {
            "label": "Install",
            "type": "shell",
            "command": "${config:cmake.cmakePath}",
            "args": [
                "-DBUILD_TYPE=${command:cmake.buildType}",
                "-P", "${command:cmake.buildDirectory}/cmake_install.cmake"
            ],
            "group": "build",
            "problemMatcher": []
        },
        // 拷贝Doxygen生成的结果至指定目录
        {
            "label": "InstallDocs",
            "type": "process",
            "command": "${config:cmake.cmakePath}",
            "args": [
                "--build", "${command:cmake.buildDirectory}",
                "--config", "${command:cmake.buildType}",
                "--target", "Install_Docs",
                "-j"
            ],
            "group": "build",
            "problemMatcher": ["$msCompile"]
        }
    ],
    "inputs": [
        // 编译对目标集合，用于input:buildTargetName
        {
            "type": "pickString",
            // input的唯一ID，使用时的关键字段
            "id": "buildTargetName",
            "description": "What target will be builded?",
            // 选项数组
            "options": [
                "ALL_BUILD",
                "CASCEFEngine",
                "CASCEFWidget",
                "CASCefWing",
                "CEFWidgetTest"
            ],
            // 缺省值
            "default": "ALL_BUILD"
        },
        // Doxygen生成目标集合，用于input:doxygenTargetName
        {
            "type": "pickString",
            "id": "doxygenTargetName",
            "description": "What target will be doxygen?",
            "options": [
                "CASCEFEgine_DOX",
                "CASCEFWidget_DOX"
            ],
            "default": "CASCEFEgine_DOX"
        }
    ]
}
```

配置上述自定义规则，完成后进行调试

![](/assets/other/vscode/7.png)

![](/assets/other/vscode/8.png)

## 参考

https://zhuanlan.zhihu.com/p/370211322
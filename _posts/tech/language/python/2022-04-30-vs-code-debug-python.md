---
layout: post
title: 用vs code调试python
date: 2022-04-30 05:30:00 +0800
categories: [Python]
tags: [Python]
---
## Mac
Open the Command Palette (Cmd+Shift+P) and type 'shell command' to find the Shell Command: Install 'code' command in PATH command.

Select a Python interpreter
```
opening the Command Palette (⇧⌘P) :shift+win+P , start typing the Python: Select Interpreter command to search
```
点击右上角的运行按钮。(这个不是调试的)

Since this is your first time debugging this file, a configuration menu will open from the Command Palette allowing you to select the type of debug configuration you would like for the opened file. 选择Python File

A debug toolbar会出现在上方

https://code.visualstudio.com/docs/python/python-tutorial

The Status Bar always shows the current interpreter.

debug configuration 在launch.json （stored in a .vscode folder in your workspace.），这个可以通过vs创建的（Click the create a launch.json file link）

VS Code applies the following order of precedence when determining which interpreter to use for debugging:

* pythonPath property of the selected debug configuration in launch.json
* python.pythonPath setting in the workspace settings.json
* python.pythonPath setting in the user settings.json
The PYTHONPATH environment variable specifies additional locations where the Python interpreter should look for modules. In VS Code, PYTHONPATH can be set through the terminal settings (terminal.integrated.env.*) and/or within an .env file.

调试设置中的 python 路径无效:搞一个没有rpath的python3.8.0
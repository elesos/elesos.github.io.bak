---
layout: post
title: Electron window的使用
date: 2021-07-03 08:50:34 +0800
categories: [艺搜科技,编程]
tags: [Electron]
---


 https://www.electronjs.org/docs/api/browser-window

 

使窗口显示时没有视觉闪烁:建议立刻显示窗口，并使用接近应用程序背景的 backgroundColor

 

const win = new BrowserWindow({ backgroundColor: '#2e2c29' })
 win.loadURL('https://github.com')

 

子窗口
  const top = new BrowserWindow()
  const child = new BrowserWindow({ parent: top }) 

 

 创建时设置show=false可以用来执行后台任务
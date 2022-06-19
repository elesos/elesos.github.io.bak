---
layout: post
title: SDL1.x与SDL2.x的区别
date: 2022-04-30 05:30:00 +0800
categories: [sdl]
tags: [sdl]
---
## SDL1
SDL1显示YUV流程图：

https://raw.githubusercontent.com/elesos/assets/master/2020/05/1.jpeg
```
 SDL_Surface就是使用SDL时弹出的那个窗口。SDL1.x版本中，只能创建一个SDL_Surface。
 SDL_Overlay用于显示YUV数据。一个SDL_Overlay对应一帧YUV数据。
 SDL_Rect用于确定SDL_Overlay显示的位置。
```
注：一个SDL_Overlay可以指定多个SDL_Rect，这样就可以在SDL_Surface不同位置显示相同的内容。
## SDL2
SDL2显示YUV流程图：

https://raw.githubusercontent.com/elesos/assets/master/2020/05/2.jpg

几乎所有的API都发生了变化。对应关系：
```
 SDL_SetVideoMode()————SDL_CreateWindow()
 SDL_Surface————SDL_Window
 SDL_CreateYUVOverlay()————SDL_CreateTexture()
 SDL_Overlay————SDL_Texture

 SDL_Window就是使用SDL时弹出的那个窗口。在SDL1.x版本中，只能创建一个窗口。在SDL2.0版本中，可以创建多个窗口。
 SDL_Texture用于显示YUV数据。一个SDL_Texture对应一帧YUV数据。
 SDL_Renderer用于渲染SDL_Texture至SDL_Window。
 SDL_Rect用于确定SDL_Texture显示的位置。注意：一个SDL_Texture可以指定多个SDL_Rect，这样就可以在SDL_Window不同位置显示相同的内容（使用SDL_RenderCopy()函数）。
```
但是SDL2.x和SDL1.x关于音频方面的API是一模一样的，唯独在回调函数中，SDL2.x必须先使用SDL_memset()将stream中的数据设置为0。

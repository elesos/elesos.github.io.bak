---
layout: post
title: 在windows上编译chrome浏览器
date: 2022-03-30 22:30:00 +0800
categories: [chromium]
tags: [chromium]
---



 需要100GB磁盘空间

![](/assets/src_study/1.png)


Chromium requires Visual Studio 2017 (15.7.2) to build.

错误：Exception: Visual Studio Version 2017 (from GYP_MSVS_VERSION) not found.

安装“使用C ++进行桌面开发”组件和“MFC和ATL支持”子组件。



必须安装版本10.0.17134 Windows 10 SDK。可以通过选中Visual Studio Installer中的相应框来安装。

还必须安装SDK调试工具(The SDK Debugging Tools)。如果通过Visual Studio安装程序安装了Windows 10 SDK，则可以通过以下方式安装它们：控制面板→程序→程序和功能→选择“Windows Software Development Kit”→更改→更改→检查“Windows调试工具(Debugging Tools For Windows)” “→改变。



## 安装 depot_tools

添加PATH,放在开头

DEPOT_TOOLS_WIN_TOOLCHAIN system variable, set it to 0.

这告诉depot_tools使用本地安装的Visual Studio版本（默认情况下，depot_tools将尝试使用google内部版本）

**GYP_MSVS_VERSION = 2017**

**GYP_MSVS_OVERRIDE_PATH = D:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise**

vs2017_install=D:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise

## [disable Windows Indexing](http://tortoisesvn.tigris.org/faq.html#cantmove2).

- Click on “Indexing Options也可以在控制面板中打开索引选项” that should come up in the search
- When the Indexing Options box comes up, Click on the Modify button. This will pop up an Indexed Locations dialog, where you should see a list of some “locations”, with your hard drive(s) being in the list.
- Expand the desired hard drive, down to the root folder of the files you’re using SVN with, and make sure the box is unchecked. Also note that the hard drive will most likely be collapsed, and will have its box unchecked, even though once you expand it, you may find checked boxes.

如果有其它版本python,最好先卸载掉

From a cmd.exe,  run the command `gclient` (without arguments). On first run, gclient will install all the Windows-specific bits needed to work with the code, including msysgit and python.

下载到了depot_tools目录中。



**where python**

会在：depot_tools\python.bat



## 获取代码

首先，配置Git



`$ git config --global user.name "My Name"` 

`$ git config --global user.email "my-name@chromium.org"` 

`$ git config --global core.autocrlf false` 

`$ git config --global core.filemode false`

 `$ git config --global branch.autosetuprebase always`

`mkdir chromium && cd chromium`

如果您不想要完整的仓库历史记录，可以通过添加--no-history标记来节省大量时间

`fetch --no-history chromium`

webrtc 下载只需要把chromium改成webrtc即可，chromium大概有10几个G，webrtc有6个G左右。

中间断了的话，可以通过`gclient sync`来同步代码

The remaining instructions assume you have switched to the src directory

`cd src`

use [GN](https://gn.googlesource.com/gn/+/master/docs/quick_start.md) to generate .ninja files.

`gn gen out/Default`

 out目录是可以删除的，刚开始是空的

autoninja -C out\Default chrome  （autoninja` is a wrapper that automatically provides optimal values for the arguments passed to `ninja， 编译时用到src\third_party\llvm-build\Release+Asserts\bin\clang-cl.exe）

(花了将近5个小时编译出来了 chrome.exe ,不过又多出来了50多个G的编译临时文件，在out目录)



可以用Ninja编译其它的target, 传递给Ninja时，前面没有“//”（因此//chrome/test:unit_tests使用`ninja -C out/Default chrome/test：unit_tests`）。

运行:

`$ out\Default\chrome.exe`



update an existing checkout, you can

在 src同级目录

`$ git rebase-update` 

`$ gclient sync`

**生成vs2017解决方案：**

`$ gn gen --ide=vs out\vs`  

` $ devenv out\Default\all.sln` 打开后，右键生成即可，会调用Ninja.exe编译的。



![](/assets/src_study/image-20220331121834244.jpeg)


**之前就有4701多****个****projects**

will be very slow to load. 可以

`gn gen --ide=vs --filters=//chrome --no-deps out\Default`   不过其它工程就不会显示在vs中了。

其它：--filters=//chrome;//third_party/WebKit/*;//gpu/*



## 错误

Exception: Visual Studio Version 2017 (from GYP_MSVS_VERSION) not found.

please supply those settings in a .boto file pointed to by the NO_AUTH_BOTO_CONFIG environment var.



这个一般是running hooks造成的

在src/DEPS的hooks = [ 区域里面，这个主要下载一些文件

因为在老版的指南https://www.chromium.org/developers/how-tos/old-get-the-code里面有

Run hooks to fetch everything needed for your build setup.

`gclient runhooks`



Failed to fetch file gs://chromium-gn/22d302b1658a293a4997205350751ff309b138c9 for src/buildtools/win/gn.exe,

gn.exe.sha1里面内容为

22d302b1658a293a4997205350751ff309b138c9

gs:// 替换为 https://storage.googleapis.com/ 就可以直接在浏览器下载了。前提当然是你还开着翻墙代理。所以任务就变成了下载下面这个地址的文件到刚刚那个目录。

http://storage.googleapis.com/chromium-gn/a68b194afb05d6a6357cf2e2464136ed7723c305

wget --no-check-certificate https://storage.googleapis.com/chromium-gn/a68b194afb05d6a6357cf2e2464136ed7723c305 -O src/buildtools/mac/gn



http://www.debugrun.com/a/86KOtUb.html

https://idom.me/articles/843.html



放在src同级目录下

**chmod** +x ./gs

./gs src/DEPS

windows下

**node** gs.js src/DEPS

![](/assets/src_study/gs.js)


_downloader_worker_thread使用封装类gsutil实现对google云存储的访问。上述代码中file_url代表下载的url,是gs://格式的。该方法首先采用gsutil.check_call('ls', file_url)检查目标文件是否存在，之后采用gsutil.check_call('cp', file_url, output_filename)将file_url下载到目标文件output_filename。

上述的方法均要访问gs://，我们的代理目前访问不了这个地址，



![](/assets/src_study/2.png)



You have unstaged changes.

Please commit, stash, or reset.

`gclient sync -f`

Failed to fetch file gs://chromium-clang-format/c8455d43d052eb79f65d046c6b02c169857b963b for src/buildtools/win/clang-format.exe

 gs://chromium-browser-clang/rc/ba51d69039ffb88310b72b6568efa9f0de148f8f for src/build/toolchain/win/rc/win/rc.exe

gs://chromium-fonts/a22de844e32a3f720d219e3911c3da3478039f89 for src/third_party/test_fonts/test_fonts.tar.gz

并解压

gs://chromium-browser-clang/orderfiles/f7e302e7d120961ef0cda7faeb1f53bcdad01a33 for src/chrome/build\chrome_child.x86.orderfile

gs://chromium-browser-clang/orderfiles/a0ff6a0859090f8a990b54acf18310a9bd8b2c85 for src/chrome/build\chrome_child.x64.orderfile



错误:UnicodeDecodeError: 'ascii' codec can't decode byte 0xb0 in position

![](/assets/src_study/3.png)



mimetypes.py文件



![](/assets/src_study/4.png)

`if sys.getdefaultencoding() != 'gbk':`

​	`reload(sys)`

​	`sys.setdefaultencoding('gbk')`



chromium的编译和webrtc的编译方式相同，webrtc官网也是使用的chromium的编译文档

https://www.cnblogs.com/Forever-Kenlen-Ja/p/7653144.html  项目需要什么轮子，就来chromium和webrtc里面找，肯定没错。

https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md
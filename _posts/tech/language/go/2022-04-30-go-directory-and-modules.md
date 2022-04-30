---
layout: post
title: Go 目录结构与模块
date: 2022-04-30 05:30:00 +0800
categories: [Go]
tags: [Go]
---
workspace里面的src目录含有多个git repositories仓库，每个仓库又含有多个packages包，

每个包是一个单独的目录，里面含有一到多个源文件（同一个包里不同文件里面定义的变量可以相互可见）。

新版中一个仓库里面含一个或多个modules,然后一个module由多个packages组成。

package name  // 每个代码文件第一行都必须此行，包目录下面的所有文件要用同一个name,这个name用于其它地方import，最好跟目录名相同
可执行程序的包名永远是package main
## 目录结构
```
 
bin/
    hello                          # command executable
    outyet                         # command executable
src/
    github.com/golang/example/
        .git/                      # Git repository metadata
	hello/
	    hello.go               # command source
	outyet/
	    main.go                # command source
	    main_test.go           # test source
	stringutil/
	    reverse.go             # package source
	    reverse_test.go        # test source
    golang.org/x/image/
        .git/                      # Git repository metadata
	bmp/
	    reader.go              # package source
	    writer.go              # package source
    ... (many more repositories and packages omitted) ...
```
上面有2个仓库，example仓库有2个命令（hello和outyet）,一个library(stringutil).

image仓库有一个bmp包和其它东西

不要使用软链接

mkdir -p $GOPATH/src/github.com/user/hello
进入上面目录写代码vim hello.go

go install github.com/user/hello  #可以在任意目录运行，会在GOPATH里面找的,如果已经在包目录里面，就只需要运行go install
可选的，可以将这个hello库添加到版本库里面

 
cd $GOPATH/src/github.com/user/hello
git init
git add hello.go
git ci -m "first blood"
如何将代码push到远程库

TODO

## 写个库
```
mkdir $GOPATH/src/github.com/user/stringutil
vim  reverse.go 
 
package stringutil

// Reverse returns its argument string reversed rune-wise left to right.
func Reverse(s string) string {  //大写字母开头的函数可以被引用的程序调用，相当于exported，大写的变量名也一样，比如math.Pi
	r := []rune(s)   //TODO
	for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}
go build github.com/user/stringutil  //不会生成输出文件，用go install才会生成文件到pkg目录，一般库不用go install, 因为在go install可执行程序时会自动将依赖的包（比如stringutil）install到pkg目录

```
## 使用库
 
导入多个包时，最好按照字母顺序排列包名
```
import (
	"fmt"
	"github.com/user/stringutil"
)
go install github.com/user/hello //会自动install stringutil 依赖包
```
可以使用别名来解决包名之间的命名冲突：import fm "fmt"

## 测试
用testing 包
```
vim $GOPATH/src/github.com/user/stringutil/reverse_test.go //文件名必须_test.go结尾，
```
同时文件里面的测试函数必须以Test开头，如果测试函数里面的sError or t.Fail函数被调用，则测试失败
```
 
package stringutil

import "testing"

func TestReverse(t *testing.T) {
	cases := []struct {
		in, want string
	}{
		{"Hello, world", "dlrow ,olleH"},
		{"Hello, 世界", "界世 ,olleH"},
		{"", ""},
	}
	for _, c := range cases {
		got := Reverse(c.in)
		if got != c.want {
			t.Errorf("Reverse(%q) == %q, want %q", c.in, got, c.want)
		}
	}
}
go test github.com/user/stringutil
```
## 模块
模块需要1.13版本及以上，

一个仓库里面通常只有一个module,在根目录下会有一个go.mod（会声明module的path）
```
cd  src/example.com/user/hello
go mod init example.com/user/hello
```
写hello.go
```
go install example.com/user/hello 
```
//如果有外部的包下载不了,cannot find package "github.com/google/go-cmp/cmp"

可以试试 go get github.com/google/go-cmp

cat go.mod
```
module example.com/user/hello

go 1.14

require github.com/google/go-cmp v0.4.0
```
## 参考
https://golang.google.cn/doc/gopath_code.html

https://golang.google.cn/doc/code.html
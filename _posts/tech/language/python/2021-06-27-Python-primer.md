---
layout: post
title: Python 简明教程
date: 2021-06-27 18:01:58 +0800
categories: [艺搜科技,编程]
tags: [Python]
---

```
# -*- coding: utf-8 -*-
print8+8  程序员的计算器
```

检查python语法正确性

```
pip install pyflakes
pyflakes xxx.py
```

Python的语句末尾什么也不加。

以冒号:结尾时，缩进的语句视为代码块。

字符串是以单引号'或双引号"括起来的任意文本,

用'''...'''的格式表示**多行内容**

注释

`#This is a comment`

多行注释使用三个单引号(**)或三个双引号(""")。与字符串一样，只是没有赋值给变量。**

新建一个test.py文件，右键选择“Edit with IDLE”，编辑完成后，Ctrl+S保存，然后按下F5就可以执行代码了。

注：IDLE是Python官方提供的一个IDE工具。


and、or和not运算

空值是Python里一个特殊的值，用None表示。None不能理解为0，因为0是有意义的，而None是一个特殊的空值。

如果print时你不太确定应该用什么，%s永远起作用，它会把任何数据类型转换为字符串

```
cars =100 //变量
print"There are", cars,"cars available."
print"Let's talk about",my_name
print"You're %s old." % age
print"Let's talk about %s and %s." %(my_name, your_name)
```

## list，中括号

`classmates = ['Michael', 'Bob', 'Tracy']`

list里面的元素的数据类型也可以不同

## tuple，小括号

和list非常类似，但是tuple一旦初始化就不能修改

`classmates = ('Michael', 'Bob', 'Tracy')`

因为tuple不可变，所以代码更安全。如果可能，能用tuple代替list就尽量用tuple。

只有1个元素的tuple定义时必须加一个逗号

\>>> t = (1,)

for x in ...循环就是把每个元素代入变量x，然后执行缩进块的语

## 字典，大括号

Python内置了字典：dict的支持，dict全称dictionary，在其他语言中也称为map，使用键-值（key-value）存储，具有极快的查找速度

d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}

set和dict类似，也是一组key的集合，但不存储value

要创建一个set，需要提供一个list作为输入集合：

\>>> s = set([1, 2, 3]) >>> s {1, 2, 3}


对于不可变对象，比如str，对str进行操作呢：

\>>> a = 'abc' >>> a.replace('a', 'A') 'Abc' >>> a 'abc'


参数类型做检查:只允许整数和浮点数类型的参数。数据类型检查可以用内置函数isinstance()实现：

```
def my_abs(x):
   if not isinstance(x, (int, float)):
       raise TypeError('bad operand type')
```

## 可变参数

只需要在参数前面加一个*号。在函数内部，参数numbers接收到的是一个tuple

如果已经有一个list或者tuple，要调用一个可变参数怎么办？在list或tuple变量前面加一个*号，把list或tuple的元素变成可变参数传进去

## 关键字参数

关键字参数在函数内部自动组装为一个dict

```
def person(name, age, **kw):
   print('name:', name, 'age:', age, 'other:', kw)
```

可以只传入必选参数：

```
>>> person('Michael', 30)
name: Michael age: 30 other: {}
```

也可以传入任意个数的关键字参数：

```
>>> person('Bob', 35, city='Beijing')
name: Bob age: 35 other: {'city': 'Beijing'}
```

比如用户注册的功能，除了用户名和年龄是必填项外，其他都是可选项，利用关键字参数来定义这个函数就能满足注册的需求。

```
>>> extra = {'city': 'Beijing', 'job': 'Engineer'}
>>> person('Jack', 24, **extra)
```

```**extra表示把extra这个dict的所有key-value用关键字参数传入到函数的**kw参数```

## 切片，截取字符串

取一个list或tuple的部分元素

取前3个元素，用一行代码就可以完成切片：

\>>> L[0:3]

倒数切片

` L[-2:] 从倒数第2个一直到结束，全取出来`

创建一个0-99的数列：

\>>> L = list(range(100)) //创建list除了这种方法，还有一种中括号的，比如列出当前目录下的所有文件和目录名 ,会生成一个列表： [d for d in os.listdir('.')] # os.listdir可以列出文件和目录， 注意中括号，然后生成的元素d 放到前面，后面跟for循环。要熟悉这种写法

如果列表元素可以按照某种算法推算出来，在循环的过程中不断推算出后续的元素，这样就不必创建完整的list，从而节省大量的空间。这种一边循环一边计算的机制，称为生成器：generator。

只要把上面[]改成()，就创建了一个generator

`g = (x * x for x in range(10))`

generator也是可迭代对象，见下。就可以用for in,

`for n in g:`

函数要改造成generator，一般是把print改成yield : 如果一个函数包含yield关键字，那么这个函数就不再是一个普通函数，而是一个generator：遇到yield语句返回，再次执行时从上次返回的yield语句处继续执行

字符串也可以用切片操作，只是操作结果仍是字符串

```
'ABCDEFG'[0:3]
'ABC'
```

## 迭代，遍历

通过for ... in来完成，只要是可迭代对象，无论有无下标，都可以迭代，比如dict就可以迭代

for key in d 默认情况下，dict迭代的是key。如果要迭代value： for value in d.values()，如果要同时迭代key和value，可以用for k, v in d.items()

如何判断一个对象是可迭代对象呢？

```
from collections import Iterable
>>> isinstance('abc', Iterable) # str是否可迭代
True
```

如果要对list实现下标循环怎么办？enumerate函数可以把一个list变成索引-元素对，这样就可以同时迭代索引和元素本身：

```
>>> for i, value in enumerate(['A', 'B', 'C']):
...     print(i, value)
...
0 A
1 B
2 C
```

赋值语句：

`a, b = b, a + b`

相当于：

```
t = (b, a + b) # t是一个tuple
a = t[0]
b = t[1]
```

## 函数

一个函数可以接收另一个函数作为参数，函数名其实就是一个变量。

map()和reduce()函数，目前看好像一般用不上。

map()函数接收两个参数，一个是函数，一个是Iterable，map将传入的函数依次作用到序列的每个元素，结果用list函数转换

把list里面的所有数字转为字符串

```
list(map(str, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
['1', '2', '3', '4', '5', '6', '7', '8', '9']
```

reduce把一个函数作用在一个序列[x1, x2, x3, ...]上，这个函数必须接收两个参数，reduce把结果继续和序列的下一个元素做累积计算，其效果就是：

`reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)`

filter()把传入的函数依次作用于每个元素，然后根据返回值是True还是False决定保留还是丢弃该元素，结果也要用list函数转换

sorted()函数可以对list进行排序

它还可以接收一个key函数来实现自定义的排序，例如按绝对值大小排序：

```
>>> sorted([36, 5, -12, 9, -21], key=abs)
[5, 9, -12, -21, 36]
```

匿名函数lambda ：

`list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9]))   //关键字lambda表示匿名函数，冒号前面的x表示函数参数`

匿名函数lambda x: x * x实际上就是：

```
def f(x):
   return x * x
```

函数有一个__name__属性，可以拿到函数的名字

## 模块

一个.py文件就称之为一个模块,一个abc.py的文件就是一个名字叫abc的模块

如果不同的人编写的模块名相同怎么办？按目录来组织模块的方法，称为包（Package）

每一个包目录下面都会有一个__init__.py的文件，这个文件是必须存在的，否则，Python就把这个目录当成普通目录，而不是一个包。__init__.py可以是空文件，也可以有Python代码，因为__init__.py本身就是一个模块，而它的模块名就是目录名，也就是包名。

`import sys`

导入sys模块后，我们就有了变量sys指向该模块，利用sys这个变量，就可以访问sys模块的所有功能。

```
if __name__=='__main__':  当我们在命令行运行hello模块文件时，Python解释器把一个特殊变量__name__置为__main__，而如果在其他地方导入该hello模块时，if判断将失败，因此，这种if测试可以让一个模块通过命令行运行时执行一些额外的代码，最常见的就是运行测试。
```

模块内变量的作用域，有的函数和变量我们希望仅仅在模块内部使用。通过_前缀来实现，

类似__xxx__这样的变量是特殊变量，可以被直接引用，但是有特殊用途，比如上面的__author__，__name__就是特殊变量，我们自己的变量一般不要用这种变量名；

类似_xxx和__xxx这样的函数或变量就是非公开的（private），不应该被直接引用。函数也可以加_前缀，相当于私有函数。

有可能并存Python 3.x和Python 2.x，因此对应的pip命令是pip3, 一般第三方库都会在Python官方的pypi.python.org网站注册

安装第三方模块，是通过setuptools这个工具完成的。Python有两个封装了setuptools的包管理工具：easy_install和pip。目前官方推荐使用pip。

`pip install PIL //安装Python Imaging Library(方便生成缩略图)的命令`

用pip一个一个安装费时费力，还需要考虑兼容性。推荐直接使用Anaconda （是一个基于Python的数据处理和科学计算平台，它已经内置了许多非常有用的第三方库，我们装上Anaconda，就相当于把数十个第三方模块自动安装好了 ）https://www.anaconda.com/download/ 下载GUI安装包

模块搜索路径：sys.path

`sys.path.append('/Users/elesos/my_py_scripts')  对应PYTHONPATH`

## 类

```
class Student(object):
   def __init__(self, name, score):
       self.name = name
       self.score = score
       
 def print_score(self):
       print('%s: %s' % (self.name, self.score))
```

类名通常是大写开头的单词,通常，如果没有合适的继承类，就使用object类，这是所有类最终都会继承的类。

在类中定义的函数只有一点不同，就是第一个参数永远是实例自己self

变量名如果以__开头，就变成了一个私有变量

如果暂时没想好怎么写的话，可以用pass来代替，如果你留空，程序则会报错。

对扩展开放：允许新增Animal子类；

对修改封闭：不需要修改依赖Animal类型的run_twice()等函数。 对于静态语言（例如Java）来说，如果需要传入Animal类型，则传入的对象必须是Animal类型或者它的子类，否则，将无法调用run()方法。

对于Python这样的动态语言来说，则不一定需要传入Animal类型。我们只需要保证传入的对象有一个run()方法就可以了：

## 如何知道这个对象是什么类型、有哪些方法呢

```
type(123)==int
 type('abc')==str  isinstance('a', str)
type(fn)==types.FunctionType
type(abs)==types.BuiltinFunctionType
 isinstance(b'a', bytes)
 
 
isinstance(h, Animal)
```

我们自己写的类，如果也想用len(myObj)的话，就自己写一个__len__()方法

由于Python是动态语言，创建的实例可以任意绑定属性。

```
class Student(object):
   def __init__(self, name):
       self.name = name
       
s = Student('Bob')
s.score = 90
```

内置的@property装饰器负责把一个方法变成属性

```
@property
   def score(self):
       return self._score
       
       
@score.setter
   def score(self, value):
       if not isinstance(value, int):
           raise ValueError('score must be an integer!')
       if value < 0 or value > 100:
           raise ValueError('score must between 0 ~ 100!')
       self._score = value
```

如果不定义setter方法就是一个只读属性

https://www.liaoxuefeng.com/wiki/1016959663602400/1017595944503424



python 自带的 Tcl/Tk 界面库
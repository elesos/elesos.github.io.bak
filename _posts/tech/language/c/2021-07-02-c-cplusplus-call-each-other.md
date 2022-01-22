---
layout: post
title: c++与其它语言的互相调用
date: 2021-07-02 08:13:01 +0800
categories: [艺搜科技,编程]
tags: [C/C++]
---

# C++调C

```
#ifdef __cplusplus
extern "C" {               // 告诉编译器下列代码要以C链接约定的模式进行链接
#endif
 
//c头文件或函数
 
#ifdef __cplusplus
}
#endif
```

# C++中调用C库

做一个C动态库：

```
#include <stdio.h>
void hello(){  
 
}
gcc -shared -fPIC -o libhello.so hello.c
```

C++程序调用它：

```
g++ test.cpp  -lhello
```

# C中调用C++库

将 C++ 函数声明为extern "C"（在你的 C++ 代码里做这个声明）

```
#include <iostream>
void world()
{  

  std::cout << "world" << std::endl;
}
```

编译并copy到系统库目录下:

```
g++ -shared -fPIC -o libworld.so world.cpp 
cp libworld.so /lib/
```

做一个中间接口库，对C++库进行二次封装：

```
// mid.cpp
#include <iostream>
void world();
 
#ifdef __cplusplus
extern "C" {  // 即使这是一个C++程序，下列这个函数的实现也要以C约定的风格！
#endif  
 
void m_world()  
{    

  world();  

}
 

#ifdef __cplusplus
}
#endif
```

其中m_world为libworld库中world方法的二次封装， 编译并copy到系统库目录下:

```
g++ -shared  -fPIC -o libmid.so mid.cpp -lworld
cp libmid.so /lib/
```

在C程序中通过链接**二次接口库**去调用C++库：

```
#include <stdio.h>
int main()
{
  m_world(); 
  return 0;
}

gcc test.c -lmid -o test
```

注：对于C++库中含有类的，可以在二次接口函数中生成临时对象来调用对应的功能函数。

http://www.cppblog.com/wolf/articles/77828.html

# C++ 调用 Python

Python 本身就是一个C库。

```
PyRun_SimpleString("print 'Hello Python!'\n");
所有Python元素，module、function、tuple、string等等，实际上都是PyObject。C语言里操纵它们，一律使用PyObject *
创建Python类型的变量，使用PyXXX_New可以创建类型为XXX的变量 PyTuple_New(1);
```

环境变量：

```
export PYTHONPATH=.:$PYTHONPATH
```

//加载模块

```
PyObject* PyImport_ImportModule(char *name)
PyObject* PyImport_Import(PyObject *name)
PyObject* PyString_FromString(const char*)
```

上面两个api都是用来动态加载python模块的。区别在于前者一个使用的是C的字符串，而后者的name是一个python对象，这个python对象需要通过PyString_FromString(const char*)来生成，其值为要导入的模块名

//导入函数

```
PyObject* PyModule_GetDict( PyObject *module)
```

可以获得Python模块中的函数列表。函数返回一个字典。字典中的关键字为函数名，值为函数的调用地址。 字典里面的值可以通过PyObject* PyDict_GetItemString( PyObject *p, const char *key) 函数来获取，其中p是PyModule_GetDict()的字典，而key则是对应的函数名

```
PyObject* PyObject_GetAttrString(PyObject *o, char *attr_name)
```

返回模块对象中的attr_name属性或**函数**，相当于Python中表达式语句：o.attr_name

//调用函数相关

```
PyObject* PyObject_CallObject( PyObject *callable_object, PyObject *args)
PyObject* PyObject_CallFunction( PyObject *callable_object, char *format, ...)
```

使用上面两个函数可以在C程序中调用Python中的函数。callable_object为要调用的函数对象，也就是通过上述导入函数得到的函数对象，

区别在于前者使用python的tuple来传参，后者则使用类似c语言printf的风格进行传参。

如果不需要参数，那么args可能为NULL。返回成功时调用的结果，或失败时返回NULL。

相当于Python表达式 apply(callable_object, args) 或 callable_object(*args)

对数字和字符串进行转换处理，使之变成Python中相应的数据类型。 PyObject* Py_BuildValue( const char *format, ...) format是要构造的参数的类型列表，函数中剩余的参数即要转换的C语言中的整型、浮点型或者字符串等。其返回值为PyObject型的指针。

PyObject* PyList_New( Py_ssize_t len)

```
   创建一个新的Python列表，len为所创建列表的长度
```


PyObject* PyTuple_New( Py_ssize_t len)

```
   PyTuple_New()函数返回所创建的元组。
```


PyObject* PyDict_New()

```
   PyDict_New()函数返回所创建的字典。
```

向 Python 传递参数 使用 PyTuple_New 创建元组， PyTuple_SetItem 设置元组值


转换 Python 返回值

库里面的一些函数将返回值转换为 C++ , 例如 PyInt_AsLong，PyFloat_AsDouble， PyString_AsString 等。

还可以使用 PyArg_ParseTuple 函数来将返回值作为元组解析

把Python代码直接变成C代码 easy_install -U cython http://docs.cython.org/en/latest/index.html


https://docs.python.org/2/c-api/index.html

https://docs.python.org/2/extending/embedding.html

https://zhuanlan.zhihu.com/p/20150641

https://zhuanlan.zhihu.com/p/79896193

https://blog.csdn.net/tobacco5648/article/details/50890106


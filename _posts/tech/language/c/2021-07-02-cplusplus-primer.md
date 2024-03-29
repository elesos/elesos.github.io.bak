---
layout: post
title: C++常用语法手册
date: 2021-07-02 21:17:07 +0800
categories: [艺搜科技,编程]
tags: [c++]
---

C++98是第一个C++标准，1998年发布。

C++11，第三个C++标准，2011年

C++14，第四个C++标准，2014年

C++17，第五个C++标准，2017年

C++20 , 2020

下一代是C++23



## 关键字

https://www.runoob.com/w3cnote/cpp-keyword-intro.html



C++库 https://en.cppreference.com/w/cpp/links/libs



范围for

using代替typedef

`using SI=Sales_item`



用vector和迭代器代替数组和指针

用string代替c风格字符串 常量对象只能调用常成员函数


拷贝构造函数何时调用：

一个对象初始化另一个对象；函数参数；返回对象

构造函数调用顺序：先调用内嵌对象的构造函数，按定义顺序 在类外对静态数据成员定义和初始化

静态函数成员一般用于访问静态数据成员，如果要访问非静态数据，需要传递对象进来。

常对象（数据成员不能改变）只能调用常成员函数（不能改数据成员，不能调普通函数）

explicit 构造函数用来防止隐式转换

```
= default; 指示编译器自动生成函数体
建议重载的方法都加了override 关键字。防止出现不正确的继承行为
```

http://c.biancheng.net/view/400.html

p792 匿名的命名空间替代static声明

# 宏

```
#表示：对应变量字符串化  

##表示：把宏参数名与宏定义代码序列中的标识符连接在一起，形成一个新的标识符
```

# namespace

匿名命名空间

```
当定义一个命名空间时，可以忽略这个命名空间的名称：
    namespce {
        char c;
        int i;
        double d;
    }
    编译器在内部会为这个命名空间生成一个唯一的名字，而且还会为这个匿名的命名空间生成一条using指令。所以上面的代码在效果上等同于：
    namespace __UNIQUE_NAME_ {
        char c;
        int i;
        double d;
    }
    using namespace __UNIQUE_NAME_;
```

在匿名命名空间中声明的名称,具有internal链接属性，这和声明为static的全局名称的链接属性是相同的，即名称的作用域被限制在当前文件中

**C++ 新的标准中提倡使用匿名命名空间,而不推荐使用static**

可以在匿名的空间里面声明很多变量和函数,这样可以省去了对每个变量和函数添加static声明. 实质上匿名空间的功能跟static声明是一样的.

# max

 int max: Value of INT_MAX is 2147483647

https://docs.microsoft.com/en-us/cpp/c-language/cpp-integer-limits?view=msvc-160

# 乘法注意

```
interval = 29LL * 24 * 3600 * 1000;
```

不加LL会在赋值之前就溢出

# 常用运算符

## %

取模运算符“%”的作用是求两个数相除的余数。

通常用来判断一个数是否能被另一个数整除。



向上取整 ceil

# 文件读写

https://www.cplusplus.com/reference/cstdio/fread/

```
 fseek (pFile , 0 , SEEK_END);
 lSize = ftell (pFile);
 rewind (pFile); //Set position of stream to the beginning
```

# Std::atomic 用法

C++中对共享数据的存取在并发条件下可能会引起data race的undifined行为，需要限制并发程序以某种特定的顺序执行，有两种方式：使用mutex保护共享数据，原子操作

原子类型操作要不一步完成，要么不做，不可能出现操作一半被切换CPU，这样防止由于多线程指令交叉执行带来的可能错误。非原子操作下，某个线程可能看见的是一个其它线程操作未完成的数据。

atomic 原子操作支持bool、int、char等数据类型

```
std::atomic <bool>   atomic_bool_test1(false);
a.load() 返回数值a的copy
```

# Std::async

Call function asynchronously

https://www.cplusplus.com/reference/future/async/

The value returned by fn can be accessed through the future object returned (by calling its member future::get).

# Static 关键字的作用

\1. 全局静态变量

在全局变量前加上关键字static，全局变量就定义成一个全局静态变量.

静态存储区，在整个程序运行期间一直存在。

初始化：未经初始化的全局静态变量会被自动初始化为0（自动对象的值是任意的，除非被显式初始化）；

作用域：全局静态变量在声明他的文件之外是不可见的，准确地说是从定义处开始，到本文件结尾。

\2. 局部静态变量

在局部变量前加上关键字static，局部变量就成为一个局部静态变量。

内存中的位置：静态存储区

初始化：未经初始化的局部静态变量会被自动初始化为0（自动对象的值是任意的，除非被显式初始化）；

作用域：作用域仍为局部作用域，当定义它的函数或者语句块结束的时候，作用域结束。但是当局部静态变量离开作用域后，并没有销毁，而是仍然驻留在内存当中，只不过我们不能再对它进行访问，直到该函数再次被调用，并且值不变；

\3. 静态函数

函数的定义和声明默认情况下都是extern的，但静态函数只是在声明他的文件当中可见，不能被其他文件所用。

函数的实现使用static修饰，那么这个函数只可在本cpp内使用，不会同其他cpp中的同名函数引起冲突；

注：不要在头文件中声明static的全局函数，不要在cpp内声明非static的全局函数，如果你要在多个cpp中复用该函数，就把它的声明提到头文件里去，否则cpp内部声明需加上static修饰；

\4. 类的静态成员

在类中，静态成员可以实现多个对象之间的数据共享，并且使用静态数据成员还不会破坏隐藏的原则，即保证了安全性。因此，静态成员是类的所有对象中共享的成员，而不是某个对象的成员。对多个对象来说，静态数据成员只存储一处，供所有对象共用

\5. 类的静态函数

静态成员函数和静态数据成员一样，它们都属于类的静态成员，它们都不是对象成员。因此，对静态成员的引用不需要用对象名。

在静态成员函数的实现中不能直接引用类中说明的非静态成员，可以引用类中说明的静态成员（这点非常重要）。如果静态成员函数中要引用非静态成员时，可通过对象来引用。

# Sprintf

```
int sprintf ( char * str, const char * format, ... );
```

stored C string in the buffer pointed by str.

On success, the total number of characters written is returned. 否则返回负数

https://www.cplusplus.com/reference/cstdio/sprintf/

# Std::bind

```
bind (Fn&& fn, Args&&... args);
```

Returns a function object based on fn, but with its arguments bound to args.

```
std::bind(&callback);
std::bind(&aClass::callback, this);
std::bind(&aClass::callback, this， info);
```

https://www.cplusplus.com/reference/functional/bind/

```
using namespace std::placeholders;    // adds visibility of _1, _2, _3  占位
```

# Std::condition variable

https://www.cplusplus.com/reference/condition_variable/condition_variable/

block the calling thread until notified to resume.

It uses a unique_lock to lock the thread when one of its wait functions is called. The thread remains blocked until woken up by another thread that calls a notification function on the same condition_variable object.

```
wait  The execution of the current thread  is blocked until notified. 第2个参数：A callable object or function that takes no arguments and returns a value that can be evaluated as a bool. This is called repeatedly until it evaluates to true.
notify_one
notify_all
```

# Std::remove

Remove value from range

https://www.cplusplus.com/reference/algorithm/remove/



# 新特性

c++11开始，可以将大型的对象直接返回，不必担心拷贝代价



# 智能指针

auto_ptr, shared_ptr, weak_ptr, unique_ptr 其中后三个是c++11支持，第一个已经被11弃用。

智能指针的作用是管理一个指针，因为存在以下这种情况：申请的空间在函数结束时忘记释放，造成内存泄漏。使用智能指针可以很大程度上避免这个问题， 因为智能指针就是一个类，当超出了类的作用域时，类会自动调用析构函数，析构函数会自动释放资源。 所以智能指针的作用就是在函数结束时自动释放内存空间，不需要手动释放内存空间。

## auto_ptr

c++98的方案，cpp11已经抛弃

采用所有权模式。

```
auto_ptr< string> p1 (new string ("hello world”));
auto_ptr<string>  p2;
p2 = p1; //auto_ptr不会报错.
```

此时不会报错，p2剥夺了p1的所有权，但是当程序运行时访问p1将会报错。所以auto_ptr的缺点是：存在潜在的内存崩溃问题！

## unique_ptr

unique_ptr（替换auto_ptr）

unique_ptr实现独占式拥有或严格拥有概念，保证同一时间内只有一个智能指针可以指向该对象。它对于避免资源泄露 (例如“以new创建对象后因为发生异常而忘记调用delete”)特别有用。

采用所有权模式，还是上面那个例子

```
unique_ptr<string> p3 (new string ("auto"));   //#4
unique_ptr<string> p4；                       //#5
p4 = p3;//此时会报错！！
```

编译器认为p4=p3非法，避免了p3不再指向有效数据的问题。因此，unique_ptr比auto_ptr更安全。

另外unique_ptr还有更聪明的地方：当程序试图将一个 unique_ptr 赋值给另一个时，如果源 unique_ptr 是个临时右值，编译器允许这么做； 如果源 unique_ptr 将存在一段时间，编译器将禁止这么做，比如：

```
unique_ptr<string> pu1(new string ("hello world"));
unique_ptr<string> pu2;
pu2 = pu1;                                      // #1 not allowed
unique_ptr<string> pu3;
pu3 = unique_ptr<string>(new string ("You"));   // #2 allowed
```

其中#1留下悬挂的unique_ptr(pu1)，可能导致危害。而#2不会留下悬挂的unique_ptr，因为它调用 unique_ptr 的构造函数， 该构造函数创建的临时对象在其所有权让给 pu3 后就会被销毁。

注：如果确实想执行类似与#1的操作，要安全的重用这种指针，可给它赋新值。C++有一个标准库函数std::move()，让你能够将一个unique_ptr赋给另一个。例如：

```
unique_ptr<string> ps1, ps2;
ps1 = demo("hello");
ps2 = move(ps1);  //#3
ps1 = demo("elesos");
cout << *ps2 << *ps1 << endl;
```

## shared_ptr

shared_ptr实现共享式拥有。多个智能指针可以指向相同对象，该对象和其相关资源会在“最后一个引用被销毁”时释放。 从名字share就可以看出资源可以被多个指针共享，它使用计数机制来表明资源被几个指针共享。 可以通过成员函数use_count()来查看资源的所有者个数。除了可以通过new来构造，还可以通过传入auto_ptr, unique_ptr,weak_ptr来构造。 当我们调用release()时，当前指针会释放资源所有权，计数减一。当计数等于0时，资源会被释放。

shared_ptr 是为了解决 auto_ptr 在对象所有权上的局限性(auto_ptr 是独占的), 在使用引用计数的机制上提供了可以共享所有权的智能指针。

成员函数：

```
use_count 返回引用计数的个数
unique 返回是否是独占所有权( use_count 为 1)
swap 交换两个 shared_ptr 对象(即交换所拥有的对象)
reset 放弃内部原对象的所有权, 会引起原有对象的引用计数减少  https://www.cplusplus.com/reference/memory/shared_ptr/reset/

  std::shared_ptr<int> sp;  // empty
  sp.reset (new int);       // takes ownership of pointer
  *sp=10;
  std::cout << *sp << '\n';//10

  sp.reset (new int);       // deletes managed object, acquires new pointer
  *sp=20;
  std::cout << *sp << '\n';  //20

  sp.reset();               // deletes managed object


get 返回内部对象(指针), 由于已经重载了()方法, 因此和直接使用对象是一样的.如 shared_ptr<int> sp(new int(1)); sp 与 sp.get()是等价的  ，Returns the stored pointer.   https://www.cplusplus.com/reference/memory/shared_ptr/get/

int* p = new int (10);
 std::shared_ptr<int> a (p);
 if (a.get()==p)
   std::cout << "a and p point to the same location\n";
 // three ways of accessing the same address:
 std::cout << *a.get() << "\n";  //不是a.get()! a.get()==p
 std::cout << *a << "\n";
 std::cout << *p << "\n";
```

## weak_ptr

weak_ptr是一种不控制对象生命周期的智能指针, 它指向一个 shared_ptr 管理的对象. 进行该对象内存管理的是那个强引用的 shared_ptr. weak_ptr只是提供了对管理对象的一个访问手段。weak_ptr 设计的目的是为了配合 shared_ptr 而引入的，用来协助 shared_ptr 工作, 它只可以从一个 shared_ptr 或另一个 weak_ptr 对象构造,

它的构造和析构不会引起引用记数的增加或减少。

weak_ptr是用来解决shared_ptr相互引用时的死锁问题,如果两个shared_ptr相互引用,那么这两个指针的引用计数永远不可能为0,资源永远不会释放。

weak_ptr是对对象的一种弱引用，不会增加对象的引用计数，和shared_ptr之间可以相互转化，shared_ptr可以直接赋值给它，

它可以通过调用lock函数来获得shared_ptr。

```
class B;
class A{
	public:
	shared_ptr<B> pb_;
	~A(){
		cout<<"A delete\n";
	}
};

class B{
    public:
	shared_ptr<A> pa_;
	~B(){
		cout<<"B delete\n";
	}
};

void fun(){
	shared_ptr<B> pb(new B());
	shared_ptr<A> pa(new A());
	pb->pa_ = pa;
	pa->pb_ = pb;
	cout<<pb.use_count()<<endl;
	cout<<pa.use_count()<<endl;
}

int main(){
	fun();
	return 0;
}
```

可以看到fun函数中pa ，pb之间互相引用，两个资源的引用计数为2，当跳出函数时，智能指针pa，pb析构时两个资源的引用计数会减一， 但是两者引用计数还是为1，导致跳出函数时资源没有被释放（A B的析构函数没有被调用），如果把其中一个改为weak_ptr就可以了， 我们把类A里面的shared_ptr pb_; 改为weak_ptr pb_; 这样的话，资源B的引用开始就只有1，当pb析构时，B的计数变为0，B得到释放，B释放的同时也会使A的计数减一，同时pa析构时使A的计数减一，那么A的计数为0，A得到释放。

注意我们不能通过weak_ptr直接访问对象的方法，比如B对象中有一个方法print(),我们不能这样访问，pa->pb_->print(); pb_是一个weak_ptr，应该先把它转化为shared_ptr,如：

```
shared_ptr p = pa->pb_.lock(); 
p->print();
```



# 线程thread



```
std::thread thread_obj(func, params);

std::thread::join()  //wait for a thread 


 std::thread t1(callable);   // Start thread t1   
 t1.join(); // Wait for t1 to finish
 
 if(joinable()){

}

线程是可结合joinable或者可分离detached的。
一个可结合线程是可以被其它线程回收资源和杀死结束的，
而对于detached状态的线程，其资源不能被其它线程回收和杀死，只能等待线程结束才能由系统自动释放。

只有处于活动状态线程才能调用join，可以通过joinable()函数检查;
join 会使当前线程阻塞，直到目标线程执行完毕
join只能被调用一次，之后joinable就会变为false，表示线程执行完毕；

以下情况不可结合 检查线程是否可被join
1,默认构造的
2，已调用过join或detach
https://vimsky.com/zh-tw/examples/usage/thread-joinable-function-in-c.html



终止线程，需要先设置一个循环退出变量，然后检查是否joinable,然后用join等待退出
```



## sleep



```
  std::this_thread::sleep_for(std::chrono::seconds(1));
 std::this_thread::sleep_for(std::chrono::milliseconds(interval));
 
 #include <chrono>
 auto start = std::chrono::high_resolution_clock::now(); //
   std::this_thread::sleep_for(2000ms);  //Blocks the execution of the current thread
   auto end = std::chrono::high_resolution_clock::now();
   std::chrono::duration<double, std::milli> elapsed = end-start;
   std::cout << "Waited " << elapsed.count() << " ms\n";   //Waited 2000.12 ms
```



Sleep 函数告诉操作系统 “在未来的多少毫秒内我不参与 CPU 竞争”。

Thread.Sleep(0) 的作用是 “触发操作系统立刻重新进行一次 CPU 竞争”。竞争的结果也许是当前线程仍然获得 CPU 控制权，也许会换成别的线程获得 CPU 控制权。


1秒(s) ＝1000毫秒(ms)

1毫秒(ms)＝1000微秒 (us)

1微秒(us)＝1000纳秒 (ns)

1秒=10的9次方

[https://zh.wikipedia.org/zh-hans/%E6%95%B0%E9%87%8F%E7%BA%A7_(%E6%97%B6%E9%97%B4)](https://zh.wikipedia.org/zh-hans/数量级_(时间))

1ks千秒=10的3次方秒

1Ms兆秒=10的6次方秒

1吉秒Gs=10的9次方秒，约31.7年。



```
离开作用域就释放mutex了
std::lock_guard<std::mutex> lock(io_mutex); //lock_guard是一个类，是mutex的包装 https://en.cppreference.com/w/cpp/thread/lock_guard
std::unique_lock<std::mutex> locker(mutex_); 
```

https://www.cplusplus.com/reference/mutex/unique_lock/

A `lock_guard` always holds a lock from its construction to its destruction. A `unique_lock` can be created without immediately locking, can unlock at any point in its existence, and can transfer ownership of the lock from one instance to another.

## detach

使用join(),线程运行完,main函数才能结束。

当使用detach()函数时，主调线程继续运行，被调线程驻留后台运行，主调线程无法再取得该被调线程的控制权。当主调线程结束时，由运行时库负责清理与被调线程相关的资源。使用detach(),main函数不用等待线程结束才能结束。有时候线程还没运行完，main函数就已经结束了。

## 参考

https://en.cppreference.com/w/cpp/thread/thread/detach

https://en.cppreference.com/w/cpp/thread/thread/joinable

https://www.cplusplus.com/reference/thread/thread/detach/

https://www.geeksforgeeks.org/multithreading-in-cpp/



# 常用数据结构

## list

```
 std::list<int> first;                                // empty list of ints
 std::list<int> second (4,100);                       // four ints with value 100
 std::list<int> third (second.begin(),second.end());  // iterating through second
 std::list<int> fourth (third);                       // a copy of third
 
 
mylist.push_back(77);

mylist.front()

 std::list< std::pair<int,char> > mylist;
 mylist.emplace_front(10,'a');
 
 mylist.emplace_back(10,'a');
 mylist.emplace_back(20,'b');
 
 first.assign (7,100);                      // 7 ints with value 100
 second.assign (first.begin(),first.end()); // a copy of first
 
 
 std::list< std::pair<int,char> > mylist;
 mylist.emplace ( mylist.begin(), 100, 'x' );
 
erase  根据位置删除
remove 根据值删除
double mydoubles[]={ 12.15,  2.72, 73.0,  12.77,  3.14,  12.77, 73.35, 72.25, 15.3,  72.25 };
std::list<double> mylist (mydoubles,mydoubles+10);
```

https://www.cplusplus.com/reference/list/list/



## string



```
std::string s2 (s0); //copy 
 std::string s3 (s0, 8, 3);  // 获取子串 http://www.cplusplus.com/reference/string/string/string/
 std::string s4 ("A character sequence");
 std::string s5 ("Another character sequence", 12); 
 std::string s6a (10, 'x');   //填充x
 std::string s6b (10, 42);      // 42 is the ASCII code for '*'
 std::string s7 (s0.begin(), s0.begin()+7);
 
 str.size()跟str.length()一样返回大小
str.clear();

assign
append
str.push_back('s');
insert

find_first_of
substr (pos = 0, len = npos)
compare

判断标志npos

const char* data() const;//
```



```
char greeting[] = "Hello";//C风格 #include <cstring>
strchr(s1, ch);返回指针，指向字符串 s1 中字符 ch 第一次出现的位置，如果输出会输出剩余字符串。
strstr(s1, s2);返回指针，指向字符串 s1 中字符串 s2 第一次出现的位置，如果输出会输出剩余字符串。
```



```
#include <string>
构造函数：
string s1();         // si = ""
string s2("Hello");  // s2 = "Hello"
string s3(4, 'K');  // s3 = "KKKK"
string s4("12345", 1, 3);  //s4 = "234"，从下标 1 开始，长度为 3 的子串
长度：length 和size
```

```
子串：
s1 = "this is ok";
s2 = s1.substr(2, 4);  // s2 = "is i"

```



```
查找子串和字符，返回值都是子串或字符的位置：
find：从前往后查找子串或字符出现的位置。
rfind：从后往前查找子串或字符出现的位置。
find_first_of：从前往后查找何处出现另一个字符串中包含的字符。如：s1.find_first_of("abc");  //查找s1中第一次出现"abc"中任一字符的位置
find_last_of： 从后往前查找何处出现另一个字符串中包含的字符。
find_first_not_of：从前往后查找何处出现另一个字符串中没有包含的字符。
find_last_not_of：从后往前查找何处出现另一个字符串中没有包含的字符。
```



```
if ((n = s1.find('u')) != string::npos) //查找 u 出现的位置，查不到则返回静态常量string::npos
       cout << "1) " << n << "," << s1.substr(n) << endl;

替换：replace
删除子串：erase 
插入字符串：insert
```

用算法操作string

```
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

int main(){
    string s("afgcbed");
    string::iterator p = find(s.begin(), s.end(), 'c');
    if (p!= s.end())
        cout << p - s.begin() << endl;  //输出 3
    sort(s.begin(), s.end());
    cout << s << endl;  //输出 abcdefg  
    return 0;
}
```



http://www.cplusplus.com/reference/string/string/

https://www.geeksforgeeks.org/stdstring-class-in-c/

https://www.tutorialspoint.com/cplusplus/cpp_strings.htm

## vector

```
c.clear()                   移除容器中所有数据。
c.empty()                 判断容器是否为空。
c.erase(pos)             删除pos位置的数据
c.erase(beg,end)       删除[beg,end)区间的数据
c.front()                  传回第一个数据。
c.insert(pos,elem)      在pos位置插入一个elem拷贝
c.pop_back()            删除最后一个数据。
c.push_back(elem)     在尾部加入一个数据。
emplace_back
c.resize(num)            重新设置该容器的大小
c.size()                    返回容器中实际数据的个数。
c.begin()                  返回指向容器第一个元素的迭代器
c.end()                    返回指向容器最后一个元素的迭代器
```

## map

### pair



```
#include <utility>      // std::pair, std::make_pair

pair <string,double> product1;                     // default constructor
pair <string,double> product2 ("tomatoes",2.30);   // value init
pair <string,double> product3 (product2);          // copy constructor

product1 = make_pair(string("lightbulbs"), 0.99);   // using make_pair (move)
g2 = make_pair(1, 'a');

product2.first = "shoes";                //赋值
product2.second = 39.90;        
```

https://www.cplusplus.com/reference/utility/pair/pair/

https://www.geeksforgeeks.org/pair-in-cpp-stl/

### map

map are slower than unordered_map containers to access individual elements by their key, but they allow the direct iteration迭代 on subsets based on their order.

#### 特性

元素排了序

#### 操作

```
mymap.insert ( pair<char,int>('a',100) );  //map_name.insert({key, element})
mymap.insert (it, pair<char,int>('b',300));
anothermap.insert(mymap.begin(),mymap.find('c'));  

map<char,int> mymap;
mymap.emplace('x',100);  //map_name.emplace(key, element)
for (auto &x: mymap)
   cout << " [" << x.first << ':' << x.second << ']';
   
   
 find
 
 删除
 mymap.erase (it);  
 mymap.erase ('c');                  // erasing by key
 mymap.erase ( it, mymap.end() );    // erasing by range

clear
count(key) //Count elements with a specific key


 
```

#### 对比

all containers (vector, stack, queue, set, map, etc) support both insert and emplace operations.

emplace不copy of object.

```
ms.insert(make_pair('b', 25)); 
```

https://www.geeksforgeeks.org/map-associative-containers-the-c-standard-template-library-stl/

https://www.cplusplus.com/reference/map/map/



## 类

protected成员：对于子女、朋友来说，就是public的，可以自由使用，没有任何限制，

而对于其他的外部class，protected就变成private。



## Lambda

方便定义匿名函数

```
[capture list] (params list) mutable exception-> return type { function body }
[capture list] (params list) -> return type {function body}
[capture list] (params list) {function body}
[capture list] {function body}
```

capture list：捕获外部变量列表 , &, a, b除a和b按值进行传递外，其他参数都按引用进行传递。 a, &b 将a按值进行传递，b按引用进行传递。 =，&a, &b 除a和b按引用进行传递外，其他参数都按值进行传递。

params list：形参

mutable指示符：用来说明是否可以修改捕获的变量

exception：异常设定

return type：返回类型

function body：函数体



```
int a = 123;
  auto f = [a]()mutable { cout << ++a; }; // 不会报错
  cout << a << endl; // 输出：123
  f(); // 输出：124
```

### 可调用对象

对于一个对象或者一个表达式，如果可以对其使用调用运算符，则称为可调用对象，如果类定义了调用运算符，则该类的对象称作函数对象

一个 lambda 表达式表示一个可调用的代码单元



头文件相互包含：

  a) 分别定义ClassA和ClassB，并在cpp文件中实现之
      b) 在两个头文件的开头分别用class ClassB;和class ClassA;声明对方
      c) 在两个cpp文件中分别包含另外一个类的头文件

这种方法切记不可使用类名来定义变量和函数的变量参数，只可用来定义引用或者指针。  



# Winsock

https://docs.microsoft.com/en-us/windows/win32/winsock/getting-started-with-winsock

f a server wants to listen on both IPv6 and IPv4, two listen sockets must be created, one for IPv6 and one for IPv4. These two sockets must be handled separately by the application.Windows Vista and later offer the ability to create a single IPv6 socket that is put in dual stack mode to listen on both IPv6 and IPv4. 

如果有相关包含错误：

\#define WIN32_LEAN_AND_MEAN

# 远程调试

https://docs.microsoft.com/zh-cn/visualstudio/debugger/remote-debugging-cpp?view=vs-2019

1,安装远程工具并启动

2,在“解决方案资源管理器”中，右键单击该项目并选择“属性”。 打开“调试”选项卡。将“要启动的调试器”更改为“远程 Windows 调试器” 。



![remote_debug](/images/2022/c/remote_debug.png)





# 时间转换



类型time_t

```
strftime ：格式化struct tm；
那结构体如何构造？localtime 可以返回，通过传time_t 
time_t sec = (time_t)1647993599;
struct tm * timeinfo = localtime(&sec);
char buffer[80];
strftime(buffer, 80, "%Y-%m-%d", timeinfo);

```



虚基类

https://www.cnblogs.com/qrlozte/p/4168807.html

典型的需要用虚基类的情况如下：
      A
      / \
     B  C
      \ /
      D
其中D继承自BC,BC分别继承自A,所以A要分别**被BC**虚拟继承

```
class B:virtual public A;
class C:virtual public A;
class D:public B,public C;
```



进制

二进制使用时必须以`0b`或`0B`（不区分大小写）开头



## 常成员函数 - const 关键字

函数名（参数表）const；

在实现部分也要带该关键字。

const关键字可以用于对重载函数的区分。

常成员函数不能更新类的成员变量，也不能调用该类中没有用const修饰的成员函数，只能调用常成员函数。

常成员函数可以被其他成员函数调用。
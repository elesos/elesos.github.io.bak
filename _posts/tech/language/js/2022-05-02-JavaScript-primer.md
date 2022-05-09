---
layout: post
title: JavaScript 简明教程
date: 2022-05-02 05:30:00 +0800
categories: [js]
tags: [js]
---
区分大小写

第一行总是写上'use strict';是因为我们总是以严格模式运行JavaScript代码，避免各种潜在陷阱。

## 简介
为了让JavaScript成为全球标准，几个公司联合ECMA（European Computer Manufacturers Association）组织制定了JavaScript标准，被称为ECMAScript标准。

ECMAScript是一种语言标准，而JavaScript是网景公司对ECMAScript标准的一种实现。

如果你遇到ECMAScript这个词，简单把它替换为JavaScript就行了。

chrome的Console里可以直接输入JavaScript代码，按回车后执行。

使用console.log()代替alert()的好处是可以避免弹出烦人的对话框。

## 比较
不区分整数和浮点数，统一用Number表示

如果一个变量没有通过var声明就被使用，那么该变量就自动被声明为全局变量：

在同一个页面的不同的js文件中，如果都不用var声明，恰好都使用了变量i，将造成变量i互相影响，产生难以调试的错误结果。

==比较，会自动转换数据类型再比较，很多时候，会得到非常诡异的结果； ===比较，不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。不要使用==比较，始终坚持使用===比较。

一个例外是NaN这个特殊的Number与所有其他值都不相等，包括它自己：

NaN === NaN; // false， NaN表示Not a Number
唯一能判断NaN的方法是通过isNaN()函数：

isNaN(NaN); // true
要比较两个浮点数是否相等，只能计算它们之差的绝对值，看是否小于某个阈值：

Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // true
注意字符串可以用单引号

字符串拼接，

var message = `你好, ${name}, 你今年${age}岁了!`;
不可以对字符串的某个索引赋值

## 空值
null表示一个“空”的值，和0以及空字符串不同，0是一个数值，表示长度为0的字符串，而null表示“空”。其他语言中，也有类似null的，例如Java也用null，Swift用nil，Python用None。

undefined表示“未定义”。

用null表示一个空的值，而undefined表示值未定义。区分两者的意义不大。大多数情况下，我们都应该用null。undefined仅仅在判断函数参数是否传递的情况下有用。

var a; // 声明了变量a，此时a的值为undefined
var t = null; // t的值是null
## 数组
数组可以包括任意数据类型。

[1, 2, 3.14, 'Hello', null, true];
## 对象
一组由键-值组成的无序集合，例如：

var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
    city: 'Beijing',
    hasCar: true,
    zipcode: null
};
对象的键都是字符串类型，值可以是任意数据类型。

person.name; // 'Bob'
可以把任意数据类型赋值给变量，同 而且可以是不同类型的变量

var a = 123; // a的值是整数123
a = 'ABC'; // a变为字符串
## Map和set
JavaScript的默认对象表示方式{}可以视为其他语言中的Map或Dictionary的数据结构，即一组键值对。

但是JavaScript的对象有个小问题，就是键必须是字符串。但实际上Number或者其他数据类型作为键也是非常合理的。

为了解决这个问题，引入了新的数据类型Map。

初始化Map需要一个二维数组，或者直接初始化一个空Map

var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
var m = new Map(); // 空Map
创建set需要一个Array作为输入，或者直接创建一个空Set

var s2 = new Set([1, 2, 3]); 
遍历for ... of //别用for...in

for (var x of m) { // 遍历Map
    console.log(x[0] + '=' + x[1]);
}
也可以用iterable内置的forEach方法，它接收一个函数（数组和map都可以用）：

a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element + ', index = ' + index);
});
set没有索引，所以回调函数的前两个参数都是元素本身

s.forEach(function (element, sameElement, set) {
    console.log(element);
});
## 函数
函数可以像变量一样使用

如果没有return语句，函数执行完毕后也会返回结果，只是结果为undefined。

由于js的函数也是一个对象，上述定义的abs()函数实际上是一个函数对象，而函数名abs可以视为指向该函数的变量。

因此，函数也可以如下定义：

var abs = function (x) {
    
};
function (x) { ... }是一个匿名函数，它没有函数名。但是，这个匿名函数赋值给了变量abs，所以，通过变量abs就可以调用该函数。

abs(); // 返回NaN，此时abs(x)函数的参数x将收到undefined，计算结果为NaN。
要避免收到undefined，可以对参数进行检查：

function abs(x) {
    if (typeof x !== 'number') {
        throw 'Not a number';
    }
  ...
}
严格遵守“在函数内部首先声明所有变量”这一规则。最常见的做法是用一个var申明函数内部用到的所有变量：

function foo() {
    var
        x = 1, // x初始化为1
        y = x + 1, // y初始化为2
        z, i; // z和i为undefined
    // 其他语句:
 
}
### 匿名函数
创建一个匿名函数并立刻执行：

(function (x) {
     return x * x;
})(3); // 9
需要用括号把整个函数定义括起来

### 箭头函数
x => x * x
相当于匿名函数：

function (x) {
    return x * x;
}
还有一种可以包含多条语句，不能省略{ ... }和return：

x => {
    if (x > 0) {
        return x * x;
    }
    else {
        return - x * x;
    }
}
如果参数不是一个，就需要用括号()括起来：

(x, y) => x * x + y * y// 两个参数:
() => 3.14// 无参数:        
如果要返回一个对象，需要加小括号

x => ({ foo: x })
## 作用域
### 全局作用域
不在任何函数内定义的变量具有全局作用域,默认有一个全局对象window，全局作用域的变量实际上是window的一个属性

以变量方式var foo = function () {}定义的函数实际上也是一个全局变量，因此，顶层函数的定义也被视为一个全局变量，并绑到window对象：

function foo() {
    
}
foo(); // 直接调用foo()
window.foo(); // 通过window.foo()调用
不同的js文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突。

减少冲突的一个方法是把所有变量和函数全部绑定到一个全局变量中。如：

// 唯一的全局变量MYAPP:
var MYAPP = {};
// 其他变量:
MYAPP.name = 'myapp';
// 其他函数:
MYAPP.foo = function () {
   
};
### 局部作用域
注意：在for循环等语句块中无法定义具有局部作用域的变量：

function foo() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
}
为了解决块级作用域，引入了关键字let，用let替代var可以申明一个块级作用域的变量：

function foo() {
    var sum = 0;
    for (let i=0; i<100; i++) {
        sum += i;
    }
    // SyntaxError:
    i += 1;
}
## 解构赋值
解构赋值，可以同时对一组变量进行赋值。

var [x, y, z] = ['hello', 'JavaScript', 'ES6'];
注意，对数组元素进行解构赋值时，多个变量要用[...]括起来。

如果数组本身还有嵌套：

let [x, [y, z]] = ['hello', ['JavaScript', 'ES6']];
如果需要从一个对象中取出若干属性，也可以使用解构赋值，便于快速获取对象的指定属性：

var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};
var {name, age, passport} = person;
同样可以对嵌套的对象属性进行赋值：

var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school',
    address: {
        city: 'Beijing',
        street: 'No.1 Road',
        zipcode: '100001'
    }
};
var {name, address: {city, zip}} = person;
city; // 'Beijing'
zip; // undefined, 因为属性名是zipcode而不是zip
// 注意: address不是变量，而是为了让city和zip获得嵌套的address对象的属性:
address; // Uncaught ReferenceError: address is not defined
解构赋值还可以使用默认值，这样就避免了不存在的属性返回undefined的问题：

var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678'
};
var {name, single=true} = person;
有些时候，如果变量已经被声明了，再次赋值的时候，正确的写法也会报语法错误：

var x, y;// 声明变量:
{x, y} = { name: '小明', x: 100, y: 200};// 语法错误: Uncaught SyntaxError: Unexpected token =
这是因为js引擎把{开头的语句当作了块处理，于是=不再合法。解决方法是用小括号括起来：

({x, y} = { name: '小明', x: 100, y: 200});
对象的方法

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

xiaoming.age;
xiaoming.age();
让我们拆开写：

function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25, 正常结果
getAge(); // NaN
函数内部如果调用了this，这个this到底指向谁？视情况而定:

如果以对象的方法形式调用，比如xiaoming.age()，该函数的this指向被调用的对象，也就是xiaoming，这是符合我们预期的。

如果单独调用函数，比如getAge()，此时，该函数的this指向全局对象，也就是window。

已完结
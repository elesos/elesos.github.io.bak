---
layout: post
title: c 重载
date: 2022-05-25 22:30:00 +0800
categories: [c]
tags: [c]
---

重载一般是这种形式
返回值类型 operator 运算符名称 (形参表列)
 
但强转重载有点不一样

1,对 double 类型强制转换运算符 进行重载
operator double() 
{

}


class Complex
{
    double real, imag;
public:
    Complex(double r = 0, double i = 0) :real(r), imag(i) {};
    operator double() { return real; }  //重载强制类型转换运算符 double
};

int main()
{
    Complex c(1.2, 3.4);
    cout << (double)c << endl;  //输出 1.2  
}

重载强制类型转换运算符时，不需要指定返回值类型，因为返回值类型是确定的，就是运算符本身代表的类型，在这里就是 double。

class KTreeNode{
operator PTreeNode() const;
}

KTreeNode::operator PTreeNode() const
{
	
}


http://c.biancheng.net/view/244.html
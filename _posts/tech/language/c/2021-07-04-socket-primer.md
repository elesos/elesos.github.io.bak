---
layout: post
title: socket简明教程
date: 2021-07-04 10:44:51 +0800
categories: [艺搜科技,编程]
tags: [C/C++]
---

## 数据传输方式

常用的有两种：SOCK_STREAM 可靠和 SOCK_DGRAM不可靠，效率高。

client 运行后，通过 connect() 函数向 server 发起请求，处于监听状态的 server 被激活，执行 accept() 函数，接受客户端的请求，然后执行 **write() 函数**向 client 传回数据。client 接收到传回的数据后，connect() 才运行结束，然后使用 read() 将数据读取出来。

**程序运行到 accept() 函数会被阻塞，等待客户端发起请求**

**windows**下,用send代替write,recv代替read

关闭 socket 时，Linux 使用 close() 函数，而 Windows 使用 closesocket() 函数。

Linux上对于所有的文件，都可以使用 read() 函数读取数据，使用 write() 函数写入数据。

<sys/socket.h> //windows上是WinSock2.h

## 常用结构体

```
struct sockaddr_in{
    sa_family_t     sin_family;   //如AF_INET6 表示 IPv6 地址
    uint16_t        sin_port;     //16位的端口号。端口号需要用 htons() 函数转换
    struct in_addr  sin_addr;     //32位IP地址
    char            sin_zero[8];  //不使用，一般用0填充
};

struct in_addr{
    in_addr_t  s_addr;  //32位的IP地址，<netinet/in.h>,    可赋值htonl(INADDR_ANY)表示自动获取IP地址，INADDR_ANY等于0，或inet_addr("127.0.0.1");
};

struct sockaddr{
    sa_family_t  sin_family;   
    char         sa_data[14];  //IP地址和端口号
};
可以认为，sockaddr 是一种通用的结构体，可以用来保存多种类型的IP地址和端口号，而 sockaddr_in 是专门用来保存 IPv4 地址的结构体。另外还有 sockaddr_in6，用来保存 IPv6 地址，先对 sockaddr_in 结构体赋值，然后再强制转换为 sockaddr 类型。

struct sockaddr_in6 { 
    sa_family_t sin6_family;  //(2)地址类型，取值为AF_INET6
    in_port_t sin6_port;  //(2)16位端口号
    uint32_t sin6_flowinfo;  //(4)IPv6流信息
    struct in6_addr sin6_addr;  //(4)具体的IPv6地址
    uint32_t sin6_scope_id;  //(4)接口范围ID
};
```

server中 close() 不仅会关闭服务器端的 socket，还会通知客户端连接已断开，客户端也会清理 socket 相关资源， client下次发起请求时需要重新创建socket。

缓冲区的默认大小一般是 8K,

write时如果缓存区不满足条件，会被阻塞，**read时如果没有数据，也会阻塞**，直到收到数据。

注：read()/recv() 函数并不知道数据包的开始或结束标志。

connect() 建立连接时，**三次握手**（Three-way Handshaking）：

- [Shake 1] 套接字A：“你好，套接字B，我这里有数据要传送给你，建立连接吧。”
- [Shake 2] 套接字B：“好的，我这边已准备就绪。”
- [Shake 3] 套接字A：“谢谢你受理我的请求。”

断开连接需要**四次握手**：

- [Shake 1] 套接字A：“任务处理完毕，我希望断开连接。”
- [Shake 2] 套接字B：“哦，是吗？请稍等，我准备一下。”
- 等待片刻后……
- [Shake 3] 套接字B：“我准备好了，可以断开连接了。”
- [Shake 4] 套接字A：“好的，谢谢合作。”

UDP 没有建立连接和断开连接的过程，也不需要ACK包确认。**server不必调用 listen() 和 accept(),client也不必调用connect,**

TCP中，如果要向10个客户端提供服务，那么除了负责监听的套接字外，还需要创建10个套接字。但在UDP中，不管是服务器端还是客户端都只需要1个套接字，不过每次传输数据都要添加目标地址信息，发送数据使用 sendto，接收数据使用 recvfrom()

UDP不同于TCP，不存在请求连接和受理过程，因此在某种意义上无法明确区分服务器端和客户端

## 使用域名

gethostbyname将域名转换成IP地址，返回的结构体如下，只需关注最后一个成员 h_addr_list

```
struct hostent{
    char *h_name;  //official name
    char **h_aliases;  //alias list
    int  h_addrtype;  //host address type，如IPv6 对应 AF_INET6
    int  h_length;  //保存IP地址长度。IPv4 的长度为4个字节，IPv6 的长度为16个字节。
    char **h_addr_list;  //address list
}
//IP地址
for(int i=0; host->h_addr_list[i]; i++){
   printf("IP addr %d: %s\n", i+1, inet_ntoa( *(struct in_addr*)host->h_addr_list[i] ) );
}
```

close和shutdown的区别

close 会立即向网络中发送FIN包，不管发送缓冲区中是否还有数据，而shutdown() 会等发送缓冲区中的数据传输完毕再发送FIN包。

## setsockopt

```
int setsockopt(int sock, int level, int optname, const void * optval, ,socklen_t optlen);
```

成功则返回0

level一般设置为SOL_SOCKET

第3个参数表示要设置的选项：

- SO_REUSEADDR ：本地地址重复使用
- SO_DONTROUTE： 送出的数据包不要利用路由设备来传输.
- SO_BROADCAST： 使用广播方式传送
- SO_SNDBUF 设置送出的暂存区大小
- SO_RCVBUF 设置接收的暂存区大小
- SO_KEEPALIVE 保持连接
- SO_OOBINLINE 当接收到OOB 数据时会马上送至标准输入设备
- SO_LINGER 确保数据安全且可靠的传送出去.

```
// 接收缓冲区，对于客户，O_RCVBUF选项必须在connect之前设置；对于服务器，SO_RCVBUF选项必须在listen前设置。
int nRecvBuf=32*1024;         //设置为32K
setsockopt(s,SOL_SOCKET,SO_RCVBUF,(const char*)&nRecvBuf,sizeof(int));
//发送缓冲区
int nSendBuf=32*1024;//设置为32K
setsockopt(s,SOL_SOCKET,SO_SNDBUF,(const char*)&nSendBuf,sizeof(int));
```

## fcntl

file control文件控制函数

```
int fcntl(int fd, int cmd);
int fcntl(int fd, int cmd, long arg);
```

cmd:欲操作的指令:

- 获得／设置文件描述符标记(cmd=F_GETFD或F_SETFD).
- 获得／设置文件状态标记(cmd=F_GETFL或F_SETFL).参数arg 为新旗标, 但只允许O_APPEND、O_NONBLOCK非阻塞 和O_ASYNC 位的改变

```
flags |= O_NONBLOCK; //非阻塞
flags &= ~O_NONBLOCK; //关闭非阻塞，即阻塞
```

## 参考

http://c.biancheng.net/cpp/socket/

https://www.cnblogs.com/eeexu123/p/5275783.html

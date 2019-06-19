# TCP协议

TCP(Transmission control protocal)，传输控制协议，即机器与机器间传输信息的基础协议。

## 三次握手

#### 第一次握手

TCP协议中，服务器对新的客户端都会置于Listen(等待响应)状态。客户端向服务器发送报文，发出请求SYN=1，同时选择一个初始序号seq=x(SYN是synchronization同步的简称，seq为sequcence序号的缩写)。这时，客户端的状态更改为SYN-SENT(synchronization_sent同步已发送)状态。这就是"第一次握手"。

#### 第二次握手

服务器对客户端发送的同步请求SYN=1和具体信息seq=x做出响应，状态由Listen变为SYNC_RCVD(synchronization_received同步已收到)。当服务器收到请求报文，会向客户端发出确认报文。SYN=1，ACK=1，ack=x+1，同时发送序号为seq=y(ACK是acknowledgement确认的简称，小写ack是确认编号)。客户端此时的状态为established(建立连接)，此为"第二次握手"。

#### 第三次握手

在客户端收到服务端发送的TCP建立验证请求后，客户端向服务器给出确认。返回服务器ACK=1，确认编号ack=y+1，在自己的序号上加上seq=x+1。服务端状态此时变为established，此为"第三次握手"。

![tcp](/JenayLee/images/tcp_1.jpg)

## 四次挥手

#### 第一次挥手

客户端进程发出连接释放报文，并停止发送数据，设置报文FIN=1，其序列号为seq=u(FIN的意思是finish终结的意思)。此时客户端的状态是FIN-WAIT-1(终止等待1)。

#### 第二次挥手

服务器收到连接释放报文，发出确认报文，ACK=1，ack=u+1,seq=v。从第一次挥手到服务器发出响应，服务器处于CLOSE_WAIT状态。客户端进入FIN_WAIT-2状态。

#### 第三次挥手

服务器将最后的数据发送完毕后，就向客户端发送连接释放报文FIN=1,ACK=1,ack=u+1，服务器又发送了一些数据后截止，序列号为seq=w。服务器变为LAST_ACK(最终动作)状态，客户端进入TIME_WAIT阶段。

#### 第四次挥手

客户端收到服务器的连接释放报文后，必须发出确认，ACK=1，ack=w+1，而自己的序列号是seq=u+1。服务器随之进入CLOSED(关闭连接)状态。客户端等了2MSL(两次交谈响应时间那么长)之后进入CLOSED状态。

![tcp](/JenayLee/images/tcp_2.jpg)

- 每一次通讯，都带有seq序列码。每一次通讯，状态都会变更。
- SYN=1在握手阶段双方各发送一次。FIN=1在挥手阶段双方各发送一次。
- 有确认码的时候ACK=1，必带有确认号ack。ack在上一条接收到的序号上+1。

## 网页从输入网址到渲染完成经历了哪些过程

大致分为如下7步：

1. 输入网址

2. 发送到DNS服务器，并获取域名对应的web服务器对应的IP地址

3. 与web服务器建立TCP连接

4. 浏览器向web服务器发送http请求

5. web服务器响应请求，并返回指定url的数据（或错误信息，或重定向新的url地址）

6. 浏览器下载web服务器返回的数据及解析html源文件

7. 生成DOM树，解析css和js，渲染页面，直至显示完成


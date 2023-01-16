---
layout: post
title: Qt书籍学习系列1
date: 2022-05-09 23:30:00 +0800
categories: [Qt书籍学习]
tags: [Qt书籍学习]
---
所用书籍《Qt Creator 快速入门 第3版》霍亚飞

所用源码 https://github.com/myforkers/Qt-Creator-quick-start

每节有推荐的示例演示程序的关键字！

2.2.2 程序的发布 p21
需要拷贝几个文件


2.3.1 p27
窗口太小resize
 
2.3.2 p34
如何嵌入ui文件
setupUi() 将设计好的界面应用到参数所表示的父窗口内。

2.3.3 继承ui类 p37
将ui作为类的私有成员，类还是继承Qt的类，如QDialog
也可以多继承，同时继承Ui::类，就不用添加私有成员了。

2.3.4 p38
创建空项目Other Project->Empty qmake Project
创建ui文件：Qt->Qt Designer Form

推荐：Qt->Qt设计师界面类(Qt Designer Form Class),名称比上面的多一个Class, 这种方式是自己定义C++类与ui文件的结合，将2个文件一起生成了，不用一个一个地添加。

## 第3章 窗口部件
3.1.1 p45
窗口类型:  如无边框
3.1.2 p46 
窗口的坐标, 有边框用move，无边框用rect,size.

3.2 QDialog p50
3.2.1 p51
exec模态，必须关闭才会返回
setModal后调用show,也可以模态,但是程序可以继续运行. setWindowModality可以设置要阻塞的窗口

3.2.2 p53
在Qt Creator中信号槽关联:按住左键拖动到某对象上然后松开左键(适合在设计器的部件之间进行). 或者右键:转到槽,自己编辑代码

p54: 使用exec实现的模态,可以用accept隐藏.

登录窗口与主界面之间切换 p55  close()关闭主界面,其实是隐藏了(没有父窗口的界面调用才会退出). 再次调用show即可显示出来


3.2.3 p57
颜色 alpha 0表示完全透明,1不透明, 255表示颜色最深.

文件过滤器 tr("图片文件(*png *jpg)")  注意空格, 不同类别用2个分号隔开.   tr("图片文件(*png *jpg);;文本文件(*txt)")

QInputDialog获取输入的字符串,整数,浮点数, 还有获取下拉列表的项.

p60 进度对话框: QProgressDialog, 避免界面冻结 QCoreApplication::processEvents(),  如果要非模态的,需要定时器协助.

p61: 错误提示对话框QErrorMessage

p62 类似下一步的向导对话框

3.3.1
边框与阴影的效果图 p64

p65 QLabel可以显示图片, wordWrap实现文本的自动换行.
QFontMetrics 可以计算字符串的大小, 文本省略
在标签中使用图片: label->setPixmap(QPixmap("e:/elesos.png")), 可以显示gif : QMoive *m= new QMovie("e:/elesos.gif"); label->setMovie(m); m->start();//开始播放

p66 QStackedWidget 含多个界面,每次只能显示一个.  需要使用QComboBox或QlistWidget来选择页面. listWidget->currentRowChanged关联到了stackedWidget->setCurrentIndex

p67 QPushButton 
按钮设置图标 setIcon(QIcon("../elesos.png"))

按钮设置下拉菜单
menu->addAction(QIcon("../elesos.png"), tr("放大"))
button->setMenu(menu);

除了QGroupBox,也可用QButtonGroup管理多个按钮

p68 QLineEdit 有撤销功能,可看源码参考.
通过setInputMask限制输入内容
还可以设置验证器对输入进行约束setValidator, 
还可以自动补全QCompleter

p72 QAbstractSlider 滑块,有3个基类 QScrollBar(常用于QScrollArea类中), QSlider,QDial
滚动条有一个tracking属性:在拖动滑块时,每移动一个刻度,都会发valueChanged信号.否则只有在拖动滑块释放时才发信号

## 第4章 布局
p75 QHBoxLayout 基本布局
将所有空间分成一行盒子,每个部件放入一个盒子
layoutLeftMargin 布局到界面左边界的距离 setContentsMargins
layoutSpacing 部件间距 setSpacing

p76 QFormLayout 窗体布局:用于表单的输入部件和他们的标签, 2列. addRow
设置伙伴关系表示,按下快捷键时,光标自动跳到标签对应的行编辑器.


p77 sizeHint 建议大小， minimumSizeHint建议的最小大小
p78 QsizePolicy 比如无法伸缩Fixed,
伸缩因子来控制比例 layoutStretch 

p79 窗体布局相关属性,如ExpandingFieldsGrow,AlignHCenter水平居中
窗口无法变化大小SetDefaultConstraint->setFixedSize

p81 QSplitter : 可以布局， 右键->使用分裂器水平布局 , 可以设置边框。

p82 可以在creator 中进入伙伴编辑模式，或setBuddy

p83 tab顺序 可以在ui文件中编辑，或setTabOrder

## 第5章 程序主窗口
p85 主窗口类关系图

p86 拖动作到工具栏

p87 资源文件要放在qrc文件同级或子级目录下。可以在Ui文件中为动作添加图片和快捷键

p89 添加菜单：各种菜单项都是一个QAction类对象
```
QMenu *editMenu     = ui->menuBar->addMenu(tr("编辑(&E)"));
QAction *actionOpen = editMenu->addAction(QIcon(":/images/elesos.png"), tr("打开文件(&O)")); 
actionOpen->setShortcut(QkeySequence("Ctrl+O"));
ui->mainToolBar->addAction(actionOpen); //在工具栏上添加动作

```
p90 QActionGroup动作组，可设置互斥动作。
工具栏除了添加动作，还可以添加窗口部件。mainToolBar->addWidget
```
QToolButton *toolBtn = new QToolButton(this);
...
toolBtn->setMenu(xxx);
```
其实，向工具栏添加一个QAction类对象时就会自动创建一个QToolButton实例。

p91:QMdiArea 多文档 addSubWindow
可以在Action编辑器上右击->转到槽

p92 QDockWidget可以悬浮

p93 状态栏

p93：使用QWidgetAction 自定义菜单
inherits()判断父部件
parent->inherits("QMenu")

QSplitter 可以addWidget

p96 使用QWidgetAction的派生类创建动作：
```
MyAction *action = new MyAction;
QMenu *editMenu = ui->menuBar->addMenu(tr("编辑(&E)"));
editMenu->addAction(action);
```

p96 富文本处理读取和编辑是2组不同的接口
padding 边界内与内容间的空白,
margin 边界外与其它内容间的空白

p98 文本块的格式：对齐由QTextBlockFormat处理insertBlock，但字体由QTextCharFormat处理setCharFormat。
p100 什么也不写，文本块的长度也是1

p101 在文本框内插入表格 insertTable，插入列表（比如编号列表）
p103 textEdit->find

p104 语法高亮

p106 拖放 
接收动作 event->acceptProposedAction 默认是复制
文本流对象 
```
QTextStream in(&file);
textEdit->setText(in.readAll());
```
p107 QMimeData常用 hasUrls, hasImage...
setAcceptDrops 接收放下事件。接收拖入，接收拖放操作

dragMoveEvent 拖动

p108
```
将鼠标指针所在位置的部件强制转换为QLable
QLable *child = static_cast<QLable*>(childAt(event->pos()));
if(!child->inherits("QLable"))
	return;//如果不是QLable 则返回
```
自定义MIME类型
字节数组与数据流的使用
```
QByteArray itemData;
QDataStream dataStream(&itemData, QIODevice::WriteOnly);//创建数据流
dataStream<<pixmap<<QPoint(event->pos() - child->pos()); //将图片，位置输入到字节数组中    //鼠标指针的坐标-图片左上角的坐标
```
可以在移动过程中显示图片
拖动时鼠标指针的位置不变 drag->setHotSpot(event->pos() - child->pos()); //设置鼠标在图片上单击的位置，这里是相对于图片左上角的位置，如果不设置，拖动图片时，指针会位于图片的左上角

给原图片添加阴影 QPainter的fillRect

p110 mousePressEvent里面的drag->exec执行拖放操作，可以是复制和移动，到底是什么，由dropEvent函数中的设置决定。（比如dragEnterEvent和dragMoveEvent,dropEvnet放下）setDropAction

p112 打印
textEdit->textCursor().hasSelection() //选中区域
生成pdf

## 第6章 事件
类图 p115
比如单击按钮，会产生鼠标事件（不是按钮产生的），而因为按钮被按下了，所以它会发射clicked单击信号（是按钮产生的）

p116 事件的处理 5种
1（常用），重新实现mousePressEvent：处理特定部件的特定事件
2，重新实现notify，完全控制，可以在事件过滤器得到事件之前就获得它们。，一次只能处理一个事件
3，向QApplication对象上安装事件过滤器，与notify相同，但可以同时处理多个事件
4，重新实现 event() ,在到达 默认的事件处理函数之前 获得
5（常用），在对象上安装事件过滤器，可以在一个界面类中同时处理不同子部件的不同事件。 lineEdit->installEventFilter(this); //在Widget上为lineEdit安装事件过滤器
实现在一个部件中监控其它多个部件的事件。

事件的传递：
子部件LineEdit键盘按下事件 ---(event->ignore)---> Widget按键按下事件
即先传给获得焦点的部件，如果该部件忽略了，那么就会传递给它的父部件。反之，如果不忽略，则不会传递。有时就会可能造成部件收不到相应事件。


p119 顺序：Widget事件过滤器->lineEdit的event函数->lineEdit的键盘按下事件----(event->ignore)----->Widget键盘按下

p120鼠标及其滚轮事件： 实现按左键拖动窗口，双击全屏，右键则使指针变为一个自定义的图片，使用滚轮可以放大或缩小编辑器中的内容。

获取指针位置和窗口位置的差值event->globalPos()->pos(); //globalPos 鼠标指针在桌面上的位置， pos()窗口的位置就是它在桌面上的位置
```
QCursor cursor(QPixmap("../elesos.png"));
QApplication::setOverrideCursor(cursor);
```

QMouseEvent的pos()是鼠标指针在窗口中的位置

全屏后，恢复以前的窗口大小setWindowState(Qt::WindowNoState);

p122 默认是按下鼠标按键时移动鼠标，鼠标移动事件才会产生。
如果想 不按鼠标按键 ，也可以获取鼠标移动事件，那需要setMouseTracking(true);设置鼠标跟踪。

p123 Ctrl,shift按键需要通过QKeyEvent的modifiers获取。

p124 QKeyEvent->isAutoRepeat 如果按了一下键便松开，不会自动重复。但如果一直按着那个键不松开，就会自动重复
如果想实现2个普通按键同时按下，就要避免自动重复。

p126 对QObject的子类，只要调用startTimer就可以开启定时器。用 timerEvent 函数进行需要的操作。QTimerEvent->timerId()
另一种是使用QTimer类。可以使用信号和槽。

随机数qrand,qsrand p127

QTime.secsTo表示2个时间点之间的秒数。

p128 事件过滤器 
在eventFilter里面，如果返回true，表示该事件已经被处理。不希望再被处理。false表示可以进行进一步的处理。

p129 发送事件 QCoreApplication::sendEvent(recevier, QEvent); 会立即处理给定的事件；其evnet无法自动删除，需要在栈上（变量）创建QEvent对象
如QKeyEvent myEvent(QEvent::KeyPress, Qt::Key_Up, Qt::NoModifier)
或postEvent(recevier,QEvent, int priority)，放在队列中。必须用new在堆上创建。会自动删除。

## 对象模型 与 容器类 
p134 信号 没有返回值，只能是void，声明即可，不能实现。
槽可以声明为虚函数
默认，发射信号后，会立即执行槽，只有槽执行完了，才会执行emit后面的代码。而QueuedConnection是立即执行emit后面的代码，不管槽是否执行。UniqueConnection是为了防止重复connect

p138 
断开与一个对象的所有信号的所有关联 myObject->disconnect();
断开与一个指定信号的所有关联 myObject->disconnect(SIGNAL(mySignal()));
断开与一个指定的receiver的所有关联 myObject->disconnect(myReceiver)

p139 QSingalMapper 信号映射器，对多个相同部件的相同信号进行映射


p140 read, write,reset可以被继承，也可以是virtual
setProperty 可设置类中没有的动态属性，只对实例有效，对类的其它对象无效。  property()

p143 如果关闭窗口时，窗口是顶层窗口，则销毁。如果不是顶层窗口，关闭时只是隐藏，不会销毁。
销毁时，先删除自己，然后调子部件的析构。

children() 获取一个部件的所有子部件列表

p145 元对象系统其它特性：metaObject返回一个类的元对象；className返回类名， inherits

p146 Qt容器类,顺序容器 QList, QlinkedList,QVector, QStack,QQueue，关联容器QMap（如果不关心存储顺序，可用QHash）, QMultiMap,QHash,QMultiHash,QSet(快速查询),还有QCache，QContiguousCache

QList.contains

map 使用[]时，如果没有该键，会自动插入，用value不会

p150 QListIterator 迭代器，此外还有STL风格的迭代器，如QList<T>::const_iterator, 当不愿意使用迭代器时，可以用Qt的foreach

p157 算法：copy/equal/find/fill/count/lower_bound/sort/stable_sort/greater/swap

p159 引用计数

p159 主要的隐式共享类有QByteArray,QCursor,QFont,QPixmap,QString.QUrl, QVariant,所有的容器类等。

p163 QByteArray 有和QString相似的接口。

p164 QVariant::value或qvariant_cast

p165 正则表达式 

## 第8章 外观
p174预览不同风格Tools->Form Editor->Preview in
a.setStyle(QStyleFactory::create("fusion"));//fusion风格，还可能有macintosh风格

p175调色板QPalette包含了部件各种状态的颜色组，3种状态：激活，失效disbaled和非激活inactive

p176颜色角色：ui编辑器中也可以设置palette属性来预览。

Qt样式表 setStyleSheet 存放在.qss文件中

p177 在设计模式中设置样式表:右键->改变样式表
QPushButton,QLineEdit{color:red} 

p179：
QPushButton[flat="false"]
.QPushButton 匹配所有QPushButton实例，但不包含它的子类。
QPushButton#okButton 以okButton为对象名的实例
QDialog QPushButton 所有QPushButton实例，它们必须是QDialog的子孙部件 
QDialog>QPushButton 所有QPushButton实例，它们必须是QDialog的直接子部件 

子控件，比如QComboBox的下拉按钮 QComboBox::drop-down{image:url(elesos.png)} 
QComboBox::drop-down:hover{}

p180 QPushButton:hover{color::white}//鼠标悬停  ，用感叹号表示否定!hover表示没有悬停时
连用，达到逻辑与的效果，QCheckBox:hover:checked, 悬停在一个被选中的QCheckBox上时才应用规则
逻辑或用逗号 QCheckBox：hover,QCheckBox:checked

p181 不会自动继承字体和颜色设置，如果想要QGroupBox的颜色设置到其子部件上，可以QGroupBox,QGroupBox * {}

属性的样式表“qproperty-属性名称”，如MyLabel{qproperty-pixmap：url(elesos.png);}


p181 盒子模型
Margin边距>border边框>padding填衬>content 四个矩形

p184 tr(qssFile->readAll())//tr将内容转换为QString

p186 不规则窗体 setMask

p187 透明窗体 setWindowOpacity，不想让窗口中的部件透明：
// 无边框窗口显示
setWindowFlags(Qt::FramelessWindowHint);
//设置窗体背景透明，而其中的部件不受影响
setAttribute(Qt::WA_TranslucentBackground);
上面是完全透明了，加上paintEvent可以实现半透明。

p188 阴影效果：QGraphicsDropShadowEffect

## 第9章 国际化、插件
p191 3步：lupdate生成ts文件（xml格式）->翻译->lrelease从ts获得qm(二进制)
ts文件是供翻译人员使用的。

p192 tr函数有3个参数

p197 加速键的值最好使用 QKeySequence

编码 QTextCodec与QTextStream

p198 QByteArray encodedString = codec->fromUnicode(string);
要将Unicode转为本地8位编码QString::toLocal8Bit
QString::toUtf8 返回使用8位UTF-8编码的文本
其它编码转为Unicode编码 QTextCodec->toUincode


p199 QWhatsThis
setWhatsThis

p200 定制Qt Assistant
html->qhp->qch->qhcp->qhc
p205 终止进程

p207 在设计器中使用自己的类

p208 插件dll
插件类中 Q_INTERFACES Q_PLUGIN_METADATA, 接口类中 Q_DECLARE_INTERFACE
使用插件的类 

p211 遍历 
```
foreach(QString fileName, Dir.entryList(QDir::Files))
```
# 图形动画
## 第10章 2D绘图
p216 QPainter可以在QPaintDevice类的任何子类上进行绘制。

(0,0)窗口的原点，不包含标题栏

绘制函数：p218

画笔QPen 风格见p219
画笔端点风格 p219
画笔连接风格 p219

drawArc p220

画刷进行填充 QBrush，设置纹理 QBrush.setTexture ，效果p222

使用画刷填充矩形
painter.fillRect(QRect(10,,100,150,20), QBrush(Qt::darkYellow))

线性渐变填充 辐射渐变 锥形渐变		QLinearGradient QRadialGradient QConicalGradient p223

p226 抗锯齿（反走样）：对边缘进行平滑处理。
p228 QRectF会返回真实的右下角坐标，但QRect会偏离。

坐标平移：translate,坐标旋转：rotate
		
窗口与视口转换 p229,视口表示物理坐标下指定的一个任意矩形。窗口表示逻辑坐标下的相同矩形。

QPainter：setWindow 设置逻辑坐标起点，还有将宽高进行等分的值

p232 
QString pos = QString("%1,%2").arg(event->pos().x()).arg(event->pos().y())//在widget上的物理坐标
QToolTip::showText(event->globalPos(), pos, this);

p232 setWindow(-50,-50, 100,100)//逻辑坐标的(-50,-50)对应物理坐标的（0，0）
那么drawRect(0,0,20,20)，实际在（200，150），宽和高变成了(*4)=80，(*3)=60。因为物理坐标矩形是(0,0,400,300)

p234 模拟时钟旋转
QTransform：translate scale(当窗口大小改变时，绘制的内容也会跟着变化大小) rotate
QPainter：setWorldTransform 

p236 QFontDatabase获取支持的所有字体


p239 4个类 绘制图像。
p240 QImage
p242 QPixmap,通常是先操作QImage，然后转换为QPixmap显示到屏幕上。
p243 截屏
p244 QPicture：可以记录QPainter命令并重演。
p244 复合模式QPainter：setCompositionMode(图画叠加规则)
p246 双缓冲绘图
p248 QRubberBand 橡皮筋线
p248 发生重绘事件的地方：1,repaint（立即重绘）,update（有可能合并成一次重绘）;2,隐藏的部件重新显示，3，其它
不要在paintEvent里面调用update或repaint

p249 QMoives可以播放gif

## 第11章 设计各种动画和游戏
p251 Graphics View Framework图形视图框架由场景、视图、图形项组成。
多个视图可以查看一个场景。场景中包含图形项
场景：可以传播事件到图形项，管理图形项的状态（如选择和焦点）
QGraphicsScene::addItem

p252 没有设置视图，不会出现图形界面，哪怕addItem了

p253 QGraphicsScene::selectedItems

p253 setDragMode(ScrollHandDrag)拖动场景，
setDragMode(RubberBandDrag):拖出橡皮筋框来选择图形项
setViewport可以使用OpenGL渲染

为场景创建视图
view(&scene)  //多个视图可以连接到同一个场景来为相同的数据集提供多个视口。
view.show()

场景分3层：图形项层，前景层和背景层。先绘制背景层，最后是前景层。注意调用视图的setForegroundBrush，不要用场景的同名函数，因为场景的对所有视图都有效。

p255 视图将事件发送到场景。场景传递给图形项。
p255 自定义图形项:重新实现：boundingRect paint

p257 绘图时，场景坐标对应QPainter的逻辑坐标，视图坐标对应设备坐标。

p258 哪个图形项会先获取鼠标输入：父图形项最先绘制，然后绘制子图形项。setZValue，大在兄弟图形项上面，小在下面。

p258 sceneBoundingRect 场景中的边界矩形。

p258 259 坐标 映射函数

p260 先添加到场景中的会被后面绘制覆盖。

p261 setSceneRect设置场景矩形，会生成滚动条。

p262 如果场景没有焦点，所有的键盘事件都会被丢弃。

图形项默认无法接收悬停事件，默认可以接收鼠标事件。

p266 moveBy 相对移动

p267 QGraphicsEffect 图形效果

p269 advance推进场景，实现动画


p271 QGraphicsItemGroup *group = scene->createItemGroup(scene->selecteditems()) //一般用来选取场景中的图形项

p272 屏幕快照

p272 QGraphicsWidget 支持几何与布局的图形项。继承于QGraphicsItem

p273 scene->addWidget()

p274 动画框架 4.6引入 和上面的QGraphicsEffect 图形效果 可以搞动画

p275 QPropertyAnimation 属性动画

p276 动画组

p278 继承自 QGraphicsObject的类可以使用属性动画.

p280 状态机

p282 在状态机中使用动画 

## 第12章 3D绘图
p291 QOpenGLWidget
QOpenGLShader 着色器
3个虚函数 initializeGL...

p295 绘制多边形
p297 使用缓存 QOpenGLBuffer

p297 12.3 绘制彩色3D

p299 3D效果

p300 纹理贴图 QOpenGLTexture

## 第13章 音视频播放
p305 可以实现的功能列表和用到的类

p308 播放视频
gif用QMovie

p314 QMediaPlayer
mediaStatusChanged 
p319 元数据

p319 播放列表

## 第14章 相机与音频录制
p323 QCameraImageCapture 拍照
p329 录制音频

## 第15章 文件 目录 和输入输出
p337 QFile
p338 QFileInfo
p339 临时目录QDir::tempPath()

p339 QDir
p341 canonicalPath 规范的路径  cleanPath
p341 QFileSystemWatcher  :fileChanged

p343 QTextStream
p346 QSettings

p347 QBuffer

## 第16章 模型 视图
p352 模型类 
p353 QModelIndex
p353 项角色 QVariant value = model->data(index, role);

p356 创建新的模型
dataChanged信号告诉视图数据已经改变

p361 子类化QHeaderView设置标头的显示
p362 QItemSelectionModel 选择
p364 addAction(tr("xx"), this, &MainWindow::slotGetCurItemData)

p366 委托 
p367 自定义委托
p369 tableView->setItemDelegate

p370 QListWidget
p371 QTreeWidget
index = parent->indexOfChild(treeWidget->currentItem())

p373 拖放
p375 QByteArray QDataStream QMimeData
p377 代理模型
p378 数据窗口映射

## 第17章 数据库 xml
p396 QSqlRelationalDelegate

p405 SAX 只读，效率高
p407 readFile
p409 xml流

## 第18章  网络编程
p415 显示下载进度
p417  从url获取文件名
p417 ftp
p422 itemActivated 单击或双击时发射
p424 编码转换， 日期格式化
p425 路径截断

p428 QDnsLookup

p429 UDP 
p432 TCP
p434 QDataStream 设置版本
p440 获取文件名

## 第19章 进程与线程
p447 state() 查找当前进程的状态

p449 进程间通信：
1，TCP/IP
2，共享内存
3，D-Bus
4，QProcess
5，会话管理
6，QLocalSocket

p456 使用moveToThread创建线程
p457 同步线程 QReadWritLock（多个同时读） QMutex（保护一个资源）, 信号量QSemaphore（保护一定数量的相同资源）， 条件变量


p460  只有标记线程安全的类，才可以用于多线程

p461 使用QMutex使类成为线程安全
p463 postEvent向任何线程的任何对象发送事件
p463 信号与槽的关联类型

## 第20章 webEngine
p470 网络请求示例 get
p470 QAction
p472 addAction
p473 addAction

p495 lambda

# 日志管理

操作路径：首页->【系统管理】->【日志管理】

通过Kibana对日志自动提取和可视化呈现，实时把握分布式系统运行状态，并根据收集的海量异常日志快速搜索，实现高效问题定位。
 
 ![](/articles/devops/3-/images/image60.png)
 
图4 48日志管理

kibana中的可控制对象可分为搜索、视图、和面板等三个对象。

## 建立搜索

在搜索框中输入要搜索的内容，点击 ![](/articles/devops/3-/images/image61.png)按钮即展示搜索结果，此时可点击 ![](/articles/devops/3-/images/image62.png)按钮保存当前搜索。

![](/articles/devops/3-/images/image63.png)

图4 49 建立搜索

输入搜索的名称后，点击保存（Save）按钮。
 
 ![](/articles/devops/3-/images/image64.png)
 
图4 50 保存搜索

## 建立视图

视图即每一个监控点或描述项的具体展现，当前kibana支持的视图形式有如下几种：


```
a. 区域填充图（Area 

b. 数据表（Data table）

c. 线形图（Line chart）

d. 标记部件（Markdown widget）

e. 数值（Metric）

f. 饼图（Pie chart）

g. 地图（Tile map）

h. 柱状图（Vertical bar chart）
```


建立视图的方法如下。
1. 点击页面上方的Visualize，选择一种视图方式。本示例选择线性视图。
 
 ![](/articles/devops/3-/images/image65.png)
 
图4 51 建立视图

2. 选择一种搜索源，或建立新的搜索。在此处可根据需要选择已保存的搜索结果，或直接创建搜索。
 
 ![](/articles/devops/3-/images/image66.png)
 
图4 52 选择搜索源

3. 在页面左侧配置X轴和Y轴要展示的信息。例子为X轴为时间，Y轴为结果计数。此结果即可作为PV（页面访问数）进行展示。
 
 ![](/articles/devops/3-/images/image67.png)
 
图4 53配置视图

4. 点击页面上方 ![](/articles/devops/3-/images/image68.png)的按钮进行保存。
 
 ![](/articles/devops/3-/images/image69.png)
 
图4 54 保存视图

## 建立面板

面板（看板）是将创建好的视图汇聚其中，方便统一查看视图的页面。
创建面板的方法如下。

1. 点击页面上方的Dashboard。
 
 ![](/articles/devops/3-/images/image70.png)
 
图4 55 日志监控标题栏中面板位置

2.点击 ![](/articles/devops/3-/images/image71.png)按钮，新建一个面板，或点击 ![](/articles/devops/3-/images/image72.png)按钮，打开一个现有面板。

3.点击 ![](/articles/devops/3-/images/image73.png)按钮，载入一个现有视图。

4.调整视图大小及位置，并多次载入视图，最终即可根据自己的需要组装为完整的面板。

5.点击页面右上角处的 ![](/articles/devops/3-/images/image74.png)按钮，可选则时间段，或者快速选择过去的一段时间，视图中仅展示该时间段中的数据信息。
 
 ![](/articles/devops/3-/images/image75.png)
 
图4 56 选择时间段

6.点击 ![](/articles/devops/3-/images/image76.png)按钮，保存当前面板。保存时，若选中保存时间段至面板（Store time with dashboard）即可将选择的时间段随着面板一起保存，下次载入该面板时，应用此时间段。
 
 ![](/articles/devops/3-/images/image77.png)
 
图4 57 保存面板

当前安装运维平台后，已经默认配置好了面板“业务监控总览”。在该面板中，已经包含了包括独立用户访问数（UV）、独立页面访问数（PV）、流量统计、访问反馈情况、来访IP前10、访问主机情况、页面访问请求线形图、用户操作系统分布、用户浏览器分布、实时响应时间、API访问状态码、用户访问量、热点分布图、访问量区分用户（柱状图）、实时Tomcat响应时间、按地区展示响应时间、分访问类型展示实时流量、用户访问refer、按天统计的PV及UV表格等视图。
 
 ![](/articles/devops/3-/images/image78.png)
 
图4 58 监控面板展示1

![](/articles/devops/3-/images/image79.png)
 
图4 59 监控面板展示2

![](/articles/devops/3-/images/image80.png)
 
图4 60 监控面板展示3

![](/articles/devops/3-/images/image81.png)
 
图4 61 监控面板展示4

同时，运维平台也默认配置了实时响应时间及实时流量面板，可快速的对nginx的访问情况进行查看。
 
 ![](/articles/devops/3-/images/image82.png)
 
图4 62 实时响应时间展示

![](/articles/devops/3-/images/image83.png)
 
图4 63 实时流量面板展示1

![](/articles/devops/3-/images/image84.png)
 
图4 64 实时流量面板展示2

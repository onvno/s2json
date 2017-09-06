# s2json
markdown summary convert to json

gitbook概览文件`summary.md`转为数据`json`,方便请求使用。

#### 安装

```
npm install -g s2json
```



#### 使用

1. 下载测试demo，clone本仓库，进入项目目录

   ```
   cd demo
   ```

   目录结构为：

   ```
   demo
   └── md
       └── SUMMARY.md
   ```

2. 执行命令：

   ```
   s2json
   ```

3. 完成build，输出结果：

   ```
   demo
   ├── md
   │   └── SUMMARY.md
   └── md-build
       └── SUMMARY.json
   ```

4. json文件内容形式:

   ```
   {
       "ary": [
           {
               "tit": "Introduction",
               "link": "README.md"
           },
           {
               "tit": "产品介绍",
               "link": "product.md",
               "sub": [
                   {
                       "link": "basic.md",
                       "tit": "基本介绍"
                   },
                   {
                       "link": "system.md",
                       "tit": "系统介绍"
                   }
               ]
           },
           {
               "tit": "用户管理",
               "link": "",
               "sub": [
                   {
                       "link": "user.md",
                       "tit": "用户管理"
                   },
                   {
                       "link": "menu.md",
                       "tit": "菜单管理"
                   }
               ]
           },
           {
               "tit": "系统管理",
               "link": "systems.md"
           }
       ],
       "title": "Summary"
   }
   ```




#### 参数

*默认*

* 默认入口目录为`md`

* 默认输出目录为`md-build`

* 输出json结构为:

  ```
  {
  	"title": "Summary",
      "ary": [
          {
              "tit": "title",
              "link": "link/address",
              "sub": [
                  {
                      "link": "submenu title1",
                      "tit": "submenu/link/address"
                  },
                  {
                      "link": "submenu title2",
                      "tit": "submenu2/link/address"
                  }
              ]
          }
      ]
  }
  ```



*[选项]*

* 自定义入口目录`--entry newEntryDir`或`-E newEntryDir`
* 自定义输出目录`--out newOutDir`或`-O newOutDir`
* 设置相对路径：暂略
* 设置`json`输出格式内容：暂未提供

如入口目录为`doc`,输出目录为`dist`,则进入项目目录后执行：

```
s2json -E doc -O dist
```



#### 备注

* 支持文档多层级目录，即`summary`可在入口目录下任何层级
* 支持`summary`数据的无限层级
* `_index.js`为第一版,初期思路为正则匹配只能实现两级



#### Todo

* 提供设置相对路径
* 提供设置输出`json`字段修改
* 提供设置输出命名修改
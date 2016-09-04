[![Stories in Ready](https://badge.waffle.io/TylerGarlick/angular-redactor.png?label=ready&title=Ready)](https://waffle.io/TylerGarlick/angular-redactor)
angular-redactor
================

角主编是为主编的编辑的角度指令.  http://imperavi.com/redactor/


重要的变化
--------------

存在用于主编II的附加文件（角主编-2）。
作为1.1.0版本，有一个附加的文件（角主编-9.x中）已被添加到容纳主编的9.x版本的，所述角度redactor.js将支持最新版本主编的。

用法
--------------

1. 包括来自修订者库 http://imperavi.com/redactor/ （主编的亭子版本不受支持）
2. 在您的应用程序的角度登记角主编作为一个依赖。
3.添加必要的HTML查看编辑器。

注册

```js

//角注册
angular.module('app', ['angular-redactor']);

```

最低限度的Html
```html
<textarea ng-model="content" redactor></textarea>
```

随着选项
```html
<textarea ng-model="content" redactor="{buttons: ['formatting', '|', 'bold', 'italic']}" cols="30" rows="10"></textarea>
```

随着插件
```html
<textarea ng-model="content" redactor="{plugins: ['source']}" cols="30" rows="10"></textarea>
```

您可以通过指定它们作为的价值直接将选项传递给主编 `redactor` 属性.

全局选项
```js
angular.module('app', ['angular-redactor'])
  .config(function(redactorOptions) {
    redactorOptions.buttons = ['formatting', '|', 'bold', 'italic']; 
  });
```


退房的演示文件夹，在这里你可以看到一个工作示例.  https://github.com/TylerGarlick/angular-redactor/tree/master/demo



鲍尔安装
--------------
```js
bower install angular-redactor
```

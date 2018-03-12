fed-template ——— 用gulp配置的前端自动化工程包
=============================================


前端自动化工程搭建，内置快速编写 CSS 样式的基础 SASS 库 [MUSS](https://github.com/zyj1022/muss)，响应式前端框架 [WEE](https://github.com/zyj1022/wee), [FontAwesome](http://www.bootcss.com/p/font-awesome/)图标字库。


使用方法
========


请先确保已经安装Gulp(需要 [Node.js](https://github.com/zyj1022/FE-build) 环境) ，全局安装


	$ npm install --global gulp


进入你的项目文件夹下clone 本 git 项目


	git clone https://github.com/zyj1022/fed-template.git


安装相关Node 模块


	npm install

然后就可以运行了，默认任务：

	$ gulp

运行后即可实时预览项目静态文件


文件描述
========

开发目录为src，输出目录为dist，

具体文件结构如下

```
  fed-template/
  ├── src/
  │   ├── css/
  │   ├── images/
  │   ├── js/
  │   └── scss/
  │       └── muss/
  └── dist/
      ├── css/
      ├── images/
      └── js/  
```

功能模块（插件）
============

##具体如下


	  gulp        = require('gulp'),  		
    watch       = require('gulp-watch'),
    sass        = require('gulp-sass'),    // CSS预处理器
    path        = require('path'),		 
    concat      = require('gulp-concat'),  // 文件合并
    rename      = require('gulp-rename'),  // 重命名
    notify      = require('gulp-notify'),  // 任务通知
    cache       = require('gulp-cache'),   //
    uglify      = require('gulp-uglify'),  // js文件压缩
    imagemin    = require('gulp-imagemin'),// 图片压缩
    csso        = require('gulp-cssnano'), // css压缩
    browserSync = require('browser-sync'), // 浏览器同步预览
    runSequence = require('run-sequence');


版本改进
============

- 引入 gulp-load-plugins 方便调用 gulp 插件
- css 压缩 gulp-cssnano

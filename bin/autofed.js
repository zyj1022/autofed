#!/usr/bin/env node
// 处理命令行工具的包 commander  https://www.npmjs.com/package/commander
var program = require('commander'),
    gs = require('../lib/generateStructure');

//Commander 帮我们做好了用法（Usage）信息，以及两个参数（Options）-h, --help 和 -V, --version。
program
  .version(require('../package.json').version)
  .usage('[options] [project name]')
  .parse(process.argv);

// program.args 是获取到 命令后 的参数,是一个数组
var pname = program.args[0]

// 输入命令 没有传入项目名，返回帮助信息
if (!pname) program.help();

gs(pname);

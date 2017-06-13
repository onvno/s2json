#!/usr/bin/env node --harmony

const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');
const argv = require('yargs')
  .option('out', {
    alias: 'O',
    describe: '输出路径,默认"out"',
  })
  .option('entry', {
    alias: 'E',
    describe: '输入路径,默认"demo"',
  })
  .option('base', {
    alias: 'B',
    describe: '基本相对路径,默认运行命令当前路径"./"',
  }).help().argv;

// console.log(argv);

// 配置文件
const SET = {
  BASE: argv.base || './', // 根目录
  ENTRY: argv.entry || 'demo', // 入口目录
  OUT: argv.out || 'out', // 输出目录
}

// const pattern = path.join(__dirname,SET.DEMO,'**/SUMMARY.md')
const pattern = path.join(process.cwd(), SET.BASE, SET.ENTRY,'**/SUMMARY.md')
const enters = glob.sync(pattern);

function matchLine(str){
  let tit,link,level;
  
  if(str.indexOf('#')== -1 && str.trim()){
    const result = /^\*/.test(str);
    level = result ? 1 : 2;
    tit = str.match(/\[(\S*)\]/);
    link = str.match(/\((\S*)\)/);
    // console.log("tit:",tit[1]);
    // console.log("link:",link[1]);
    return {
      "level": level,
      "tit": tit[1],
      "link": link[1]
    }
  } else {
    return {}
  }
  
}

enters.forEach(function(item,index){
  // console.log("item:",item,"\nindex:",index)
  let obj = [];
  fs.readFileSync(item).toString().split('\n').forEach(function (line) { 
    // console.log(line);
    const back = matchLine(line);
    const lastIndex = obj.length - 1;
    if(back.level && back.level == 1){
      obj.push({
        tit: back.tit,
        link: back.link
      })
    } else if(back.level && back.level == 2) {
      if(!obj[lastIndex].sub){
        obj[lastIndex].sub=[];
      }
      obj[lastIndex].sub.push({
        "tit": back.tit,
        "link": back.link
      })
    }
  });
  const objStr = JSON.stringify(obj,null, 4);
  const outPath = item.replace(SET.ENTRY,SET.OUT).replace('.md','.json');
  fse.ensureFileSync(outPath);
  fse.writeFileSync(outPath,objStr,'utf-8');
})



#!/usr/bin/env node --harmony

const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const marked = require('marked');
const cheerio = require('cheerio');
const path = require('path');
const argv = require('yargs')
  .option('out', {
    alias: 'O',
    describe: '输出路径,默认"md-build"',
  })
  .option('entry', {
    alias: 'E',
    describe: '输入路径,默认"md"',
  })
  .option('base', {
    alias: 'B',
    describe: '基本相对路径,默认运行命令当前路径"./"',
  }).help().argv;

// console.log(argv);

// 配置文件
const SET = {
  BASE: argv.base || './', // 根目录
  ENTRY: argv.entry || 'md', // 入口目录
  OUT: argv.out || 'md-build', // 输出目录
}

// const pattern = path.join(__dirname,SET.DEMO,'**/SUMMARY.md')
const pattern = path.join(process.cwd(), SET.BASE, SET.ENTRY,'**/SUMMARY.md')
const enters = glob.sync(pattern);

enters.forEach(function(item,index){
  // get .md file name
  const pathSplit = item.split(path.sep)
  const mdName = pathSplit[pathSplit.length-2];

  // 读取文件
  var reader = fs.readFileSync(item, 'utf-8');
  var result = marked(reader);
  var $ = cheerio.load(result,
    {
      decodeEntities: false,
    }
  );

  let obj = {};
  obj.ary = [];
  obj.title = $('h1').text();

  function jsonBuild($, obj){
    // menu
    var menu = $('body>ul>li');
  
    for(var i=0; i<menu.length; i++){
      
      // lister contain : tit, link, sub
      var lister={
        tit: '',
        link: '',
        sub: []
      };
      
      var local = menu.eq(i);
      var local_head = has(local,'p') ? local.children('p') : local;

      if(local_head.children('a').length) {
        lister.link = local_head.children('a').attr('href');
        lister.tit = local_head.children('a').text();
      } else {
        lister.link = '';
        lister.tit = local_head.contents().filter(function(){
          return this.nodeType == 3
        }).text().replace('\n','');
      }

      var hasSub = has(local, 'ul');
      if(hasSub){
        // 对象包含tit,link及子集
        var subli = local.children('ul').children('li');
        for(var j=0; j<subli.length; j++){
          subAdd(subli.eq(j),lister.sub);
        }
      } else {
        delete lister.sub;
      }

      obj.ary.push(lister);
    }
  }
  jsonBuild($, obj);

  /**
   * 判断父集元素是否包含子集元素
   */
  function has(topEle,subEle){
    var len = topEle.children(subEle).length;
    return len ? true : false;
  }

  // ele : li
  function subAdd(ele,subAry){
    // 元素分为有link 和 有子级两种情况
    
    var hasLink = has(ele,'a')
    let localLink = {
      sub:[]
    }
    
    if(hasLink) {
      localLink.link = ele.children('a').attr('href');
      
      // 实际查询文档，部分有子级的情况，父集也有链接
      // delete localLink.sub;
      localLink.tit = ele.children('a').text();
      var subEles = ele.children('ul').children('li');
      var hasSub = has(ele, 'ul');
      if(hasSub){
        for(var i=0; i<subEles.length; i++) {
          subAdd(subEles.eq(i), localLink.sub);
        }
      } else {
        delete localLink.sub
      }
      

    } else {
      localLink.link = '';
      // 获取子级元素
      var subEles = ele.children('ul').children('li');
      localLink.tit = ele.contents().filter(function(){
        return this.nodeType == 3
      }).text().replace('\n','');
      for(var i=0; i<subEles.length; i++) {
        subAdd(subEles.eq(i), localLink.sub);
      }
    }
    subAry.push(localLink);
  }

  const objStr = JSON.stringify(obj,null, 4);
  const outPath = item.replace(SET.ENTRY,SET.OUT).replace('.md','.json');
  fse.ensureFileSync(outPath);
  fse.writeFileSync(outPath,objStr,'utf-8');
})



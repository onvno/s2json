const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');

// 配置文件
const SET = {
  OUT: 'out', // 输出目录
  DEMO: 'demo', // demo目录
}

const pattern = path.join(__dirname,SET.DEMO,'**/SUMMARY.md')
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
  const outPath = item.replace(SET.DEMO,SET.OUT).replace('.md','.json');
  fse.ensureFileSync(outPath);
  fse.writeFileSync(outPath,objStr,'utf-8');
})



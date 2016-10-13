/**
 * @author: zououq
 * @date: 2016-06-12 14:33
 * 工具集
 */

 var fs = require("fs");

var Utils = {};

// 获取文件
Utils.getFileSync = function(path, encoding){
	if(encoding === undefined){
		encoding = 'utf8';
	}
	var fileCon = '';
    if(fs.existsSync(path)){
    	fileCon = fs.readFileSync(path, encoding);
    }
    return fileCon;
};
// 获取文件json对象
Utils.getJSONSync = function(path){
    var fileCon = Utils.getFileSync(path),
    	data = null;
    if(fileCon){
    	fileCon =fileCon.replace(/ \/\/[^\n]*/g, '');
    	try{
			data = JSON.parse(fileCon);
    	}catch(e){
    		console.log(e);
			return null;
    	}
    }
    return data;
};

module.exports = Utils;
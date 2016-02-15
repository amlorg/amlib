;amlib = (function() {
//如果加载过amlib，则直接返回
if(amlib) return amlib;

var amlib = {
	loaded_module: {}, //已加载模块
	paths: [], //相对路径时搜索的路径
	formats: ['js', 'jsx', 'jsxbin'] //支持的格式
}

amlib.require = function(module_name) {
	if(module_name == '') return null;
	//检测是否存在模块文件
	var module_file = getFile(module_name);
	if(!module_file) return null;
	//检测是否已经加载过该模块
	var module_name = getFileName(module_file);
	if(amlib.loaded_module[module_name]) return amlib.loaded_module[module_name].exports;
	//未加载，则加在模块
	var require_module = {
		exports: null,
		path: module_name
	}
	amlib.loaded_module[require_module.path] = require_module;
	loadFile(module_file, module_name);
	return require_module.exports;
}
amlib.require.path_queue = []; //栈

function getFile(module_name) {
	var hasformat = hasFormat(module_name);
	if(module_name[0] == '/') {//绝对路径
		return absPath(module_name, hasformat);
	}else {//相对路径
		if(amlib.require.path_queue.length) amlib.paths.unshift(amlib.require.path_queue[0]);//***
		var file = relPath(module_name, hasformat);
		if(amlib.require.path_queue.length) amlib.paths.shift();//***
		return file;
	}
}

function hasFormat(module_name) {
	var formatLen = amlib.formats.length;
	for(var i = 0; i < formatLen; i++) {
		if(module_name.match('.' + amlib.formats[i])) return true;
	}
	return false;
}

function absPath(module_name, hasformat) {
	var path, file;
	var pathLen = amlib.paths.length;
	if(hasformat) {//包含格式
		file = File(module_name);
		if(file.exists) return file;
	}else {//不包含格式
		var formatLen = amlib.formats.length;
		for(var j = 0; j < formatLen; j++) {
			path = module_name + '.' + amlib.formats[j];
			file = File(path);
			if(file.exists) return file;
		}
	}
	return null;
}

function relPath(module_name, hasformat) {
	var path, file;
	var pathLen = amlib.paths.length;
	if(hasformat) {//包含格式
		for(var i = 0; i < pathLen; i++) {
			path = amlib.paths[i] + module_name;
			file = File(path);
			if(file.exists) return file;
		}
	}else {//不包含格式
		var formatLen = amlib.formats.length;
		for(var i = 0; i < pathLen; i++) {
			for(var j = 0; j < formatLen; j++) {
				path = amlib.paths[i] + module_name + '.' + amlib.formats[j];
				file = File(path);
				if(file.exists) return file;
			}
		}
	}
	return null;
}

function loadFile(module_file, module_name) {
	var module_str = ';var module = amlib.loaded_module["' + module_name + '"];\n';
	module_str += readFile(module_file);
	amlib.require.path_queue.unshift(getPath(module_file));
	eval(module_str);
	amlib.require.path_queue.shift();
}

function getFileName(module_file) {
	return module_file.path + '/' + module_file.name;
}

function readFile(module_file) {
	module_file.open("r");
	var str = module_file.read();
	module_file.close();
	return str;
}

function getPath(file) {
	return file.path + '/';
}

var filePath = File($.fileName).path + '/';
amlib.paths.push(filePath);
amlib.paths.push(filePath + 'node_modules/');

return amlib;

})();
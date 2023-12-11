#!/usr/bin/env node

var FS = require('fs');
var http = require('http');
var https = require('https');
var Path = require("path");
var os = require('os');
var PLATFORM = os.platform();
var CHARSET = "utf-8";
var BASE_URL = "https://storage.googleapis.com/";
/**
 * 读取文本文件,返回打开文本的字符串内容，若失败，返回"".
 * @param path 要打开的文件路径
 */
function read(path) {
    try {
        var text = FS.readFileSync(path, CHARSET);
        text = text.replace(/^\uFEFF/, '');
    }
    catch (err0) {
        return "";
    }
    return text;
}
/**
 * 创建文件夹
 */
function createDirectory(path, mode, made) {
    if (mode === undefined) {
        mode = 511 & (~process.umask());
    }
    if (!made)
        made = null;
    if (typeof mode === 'string')
        mode = parseInt(mode, 8);
    path = Path.resolve(path);
    try {
        FS.mkdirSync(path, mode);
        made = made || path;
    }
    catch (err0) {
        switch (err0.code) {
            case 'ENOENT':
                made = createDirectory(Path.dirname(path), mode, made);
                createDirectory(path, mode, made);
                break;
            default:
                var stat;
                try {
                    stat = FS.statSync(path);
                }
                catch (err1) {
                    throw err0;
                }
                if (!stat.isDirectory())
                    throw err0;
                break;
        }
    }
    return made;
}
/**
 * 使用指定扩展名搜索文件夹及其子文件夹下所有的文件
 * @param dir 要搜索的文件夹
 * @param extension 要搜索的文件扩展名,不包含点字符，例如："png"。不设置表示获取所有类型文件。
 */
function search(dir, extension) {
    var list = [];
    try {
        var stat = FS.statSync(dir);
    }
    catch (e) {
        return list;
    }
    if (stat.isDirectory()) {
        findFiles(dir, list, extension, null);
    }
    return list;
}
function findFiles(filePath, list, extension, filterFunc, checkDir) {
    var files = FS.readdirSync(filePath);
    var length = files.length;
    for (var i = 0; i < length; i++) {
        if (files[i].charAt(0) == ".") {
            continue;
        }
        var path = Path.join(filePath, files[i]);
        var stat = FS.statSync(path);
        if (stat.isDirectory()) {
            if (checkDir) {
                if (!filterFunc(path)) {
                    continue;
                }
            }
            findFiles(path, list, extension, filterFunc);
        }
        else if (filterFunc != null) {
            if (filterFunc(path)) {
                list.push(path);
            }
        }
        else if (extension) {
            var len = extension.length;
            if (path.charAt(path.length - len - 1) == "." &&
                path.substr(path.length - len, len).toLowerCase() == extension) {
                list.push(path);
            }
        }
        else {
            list.push(path);
        }
    }
}


function parseAction(actions, hook) {
	// shift把数组的第一个元素从其中删除，并返回删除的第一个元素的值
	//有2种情况，一种是第一元素为download_from_google_storage
	//还有一种是 第2个元素为 src/third_party/depot_tools/download_from_google_storage.py
    if (actions.shift() != "download_from_google_storage") {
		if(actions.shift() != "src/third_party/depot_tools/download_from_google_storage.py"){
			 return null;
		}
    }
	
	
	
    var result = { bucket: "", path: actions.pop() }; //删除并返回数组的最后一个元素, 如test_fonts.tar.gz.sha1
    
	

		
	if (hook.condition == 'host_os == "win"') {
		//console.log("test:", hook.condition);
		//process.exit(1);
	}else if(hook.name == 'rc_win'){
		
	}else if(hook.name == 'orderfiles_win'){
		
	}else if(hook.name == 'wasm_fuzzer'){
		
	}else if(hook.name == 'webui_node_modules'){
		
	}else if(hook.name == 'tools_traffic_annotation_windows'){
		
	}else if(hook.name == 'zucchini_testdata'){
		
	}else{
		return null;
	}
	
	//console.log("test2:", hook.condition);
	//process.exit(1);
	
	while (actions.length) {//循环处理actions元素
        var action = actions.shift();
        if (action.indexOf("--platform") != -1) {  //在字符串中首次出现的位置,从0开始算起,没有出现，则该方法返回 -1。
            var platform = action.split("=")[1];
            if (platform.charAt(platform.length - 1) == "*") {
                platform.substring(0, platform.length - 1);
            }
            if (PLATFORM.indexOf(platform) == -1) {
                return null;
            }
        }else if (action == "--bucket") {
            result.bucket = actions.shift();
        }
    }
	
	
    return result;
}
function readItem(bucket, sha1Path) {
    var item = { url: "", path: "" };
    var sha1 = read(sha1Path).trim();
    item.url = BASE_URL + bucket + "/" + sha1;
    item.path = sha1Path.substring(0, sha1Path.length - 5);
    return item;
}
// function downloadFiles(list) {
    // function next() {
        // if (list.length == 0) {
            // return;
        // }
        // var item = list.shift();
        // console.log("downloading...", item.url, " to ", item.path);
        // download(item.url, item.path, function () {
            // next();
        // });
    // }
    // next();
// }




// function download(url, path, callback) {
    // var httpClient = url.slice(0, 5) === 'https' ? https : http;
    // createDirectory(Path.dirname(path));
    // var writer = FS.createWriteStream(path);
    // writer.on('finish', function () {
        // FS.chmod(path, '777');
        // callback && callback();
    // });
    // httpClient.get(url, function (response) {
        // response.pipe(writer);
    // });
// }


function downloadFiles(list) {
	
	while (list.length) {
		var item = list.shift();	
		
		if (FS.existsSync(item.path)) {//存在			
			console.log("文件存在：",  item.path);
		}else{
			console.log("downloading...", item.url, " to ", item.path);	
			download(item.url, item.path);
		}
	
		
	}   
   
}


function download(url, path) {
    var httpClient = url.slice(0, 5) === 'https' ? https : http;
    createDirectory(Path.dirname(path));
    var writer = FS.createWriteStream(path);
	
	// writer.on('finish', () => {
	  // console.error('下载成功');
	// });
	writer.on('finish', function () {
		console.error('下载成功:', path);       
    });
 
    httpClient.get(url, function (response) {
        response.pipe(writer);
    });
}


var args = process.argv.slice(2); //  src/DEPS


var depsPath = args[0];  //  src/DEPS


if (args[1]) {
    var currentPath = args[1];
}
else {
    currentPath = process.cwd();//当前脚本所在目录
}


var depsText = read(depsPath);//读取文本文件,返回打开文本的字符串内容
if (!depsText) {
    depsText = read(Path.join(currentPath, depsPath));
}



if (!depsText) {
    console.log("找不到DEPS文件！");
    process.exit(1);
}



var lines = depsText.split("\n");//一行一行



depsText = "";
while (lines.length) {
    var line = lines.shift();
    var index = line.indexOf("#");//在字符串中首次出现的位置,从0开始算起,没有出现，则该方法返回 -1。
    if (index != -1) {//出现了#号注释，则处理 line， 取开始到#的这一段空白，将注释形成空白行
        line = line.substring(0, index);// (start,stop), 如果省略stop参数，那么返回的子串会一直到字符串的结尾。
    }
    depsText += line + "\n"; //取非注释的行
	
	
}

var index = depsText.indexOf("hooks = [");  // 1918行 有 hooks = [


depsText = "var " + depsText.substring(index);




var hooks;
// eval() 函数会将传入的字符串当做 JavaScript 代码进行执行, 就是对hooks赋值，var  hooks = [ 
eval(depsText); 




var list = [];
while (hooks.length) {
    var hook = hooks.shift(); //取数组里面的一个{} 元素
	
	
    var action = parseAction(hook.action, hook);
    if (!action) {
        continue;
    }
	
	
	
	
    var actionPath = Path.join(currentPath, action.path);
    if (actionPath.substring(actionPath.length - 5).toLowerCase() == ".sha1") {
        var item = readItem(action.bucket, actionPath);
        list.push(item);
    }
    else {
        var files = search(actionPath, "sha1");
        while (files.length) {
            var file = files.shift();
            item = readItem(action.bucket, file);
            list.push(item);
        }
    }
}

//https://storage.googleapis.com/chromium-fonts/a22de844e32a3f720d219e3911c3da3478039f89
//F:\\devel\\chromium_source_code\\chromium\\src\\third_party\\test_fonts\\test_fonts.tar.gz
//console.log("test:", list);
//process.exit(1);	
	

downloadFiles(list);

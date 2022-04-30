---
layout: post
title: PHP 常用操作
date: 2022-04-30 05:30:00 +0800
categories: [PHP]
tags: [PHP]
---
## 调试
pdo错误：
```
print_r($mdb->errorInfo());
如果出现问题，先打开错误输出功能：

ini_set("display_errors","On");
error_reporting(E_ALL|E_STRICT);
```
代码在 http://cn.piliapp.com/php-syntax-check/ 检查没有错误，但报500错误，多是没包含头文件。如检查dirname

## 字符处理
ltrim:移除字符串左侧的单个字符(注意不是字符串)

explode字符串转数组与implode数组转字符串

注意base64每编码76个字符，会自动加上回车换行

查找字符串是否存在：strpos

```
$pos = strpos($mystring, $findme);
if ($pos === false) {
   echo "The string  was not found";
}
```
strstr查找首次出现并返回从该位置到字符串结尾的所有字符,如果只是想确定字符串是否存在，请使用strpos，strrchr查找最后一次出现并返回字符串.

字符串替换 str_replace

substr:返回字符串的子串

parse_str处理url的查询字符串，注意处理后，是urldecode过的数据了。

urldecode :超全局变量$_REQUEST 已经被解码了。对$_REQUEST 里的元素使用 urldecode() 将导致不可知的结果。

json_encode时如果输出 \uXXXX, 需要加 JSON_UNESCAPED_UNICODE 选项

## 数组
删除数组中的元素

unset($result[$i]['filters']);
一次删除数组中的多个元素
```
$del_key_arr = array("storagepath_high" => "delete", "storagepath_low" => "delete");
$result      = array_diff_key($jsonArr, $del_key_arr);
```
## 文件
权限问题，可检查下php脚本运行的用户，写个php：

echo shell_exec("id -a");
查看执行php的用户

echo exec("whoami", $arr); //apache
然后

chown -R www:www dir
或

chown -R apache:apache dir
如果仍执行不了，vim /etc/php-fpm.d/www.conf

修改用户为root，启动也为root(-R参数) /usr/sbin/php-fpm -R &

http.conf中
```
User apache
Group apache
```
pathinfo 解析 路径，获取文件名，扩展名

## 换行
"\r\n"  适合命令提示符下执行

   适合网页端执行
PHP_EOL  写到文件中换行
## 分区间处理
```
$start = 1;
$end   = 99999;
$cur_index_start = $start;
$cur_index_end   = $start+1000;
do{
	echo "$cur_index_start-$cur_index_end\r\n";	
	$offset = $cur_index_end - $cur_index_start + 1;	
	fwrite_log($file, $cur_index_start, $cur_index_end);
	$cur_index_start += $offset;
	$cur_index_end   += 1000;
	usleep(1);
}while($cur_index_start < $end);
```
## 参考
https://www.php.net/manual/zh/funcref.php
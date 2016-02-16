## 第一步	引入amlib

``` c
#include 'amlib.js' 
```

## 第二步	require模块

``` javascript
var json = amlib.require(path);

```

​	path以 / 开头，默认为绝对路径

​	以字母开头，即没有 / ，默认为相对路径。相对路径时，会依次将path与amlib.paths的路径进行组合

​	若path后面没有写文件扩展名，将依次添加.js  .jsx  .jsxbin进行尝试

## 第三步	使用已经require的模块

``` javascript
var j = {a: 1, b: 2};
json.stringify(j) // '{"a": 1, "b": 2}'
```

***

amlib.paths [] 相对位置方式导入模块时会检索的路径

amlib.formats [] 支持的文件格式

amlib.loaded_module {} 已经加载过的模块

***

自定义模块时，将要暴露出来的部分赋给 module.exports 即可


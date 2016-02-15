#include 'amlib.js'

var json = amlib.require('json');

var j = {a:1, b:2}
var str = json.stringify(j);
alert(str);
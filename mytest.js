#include 'amlib.js'
try{

var json = amlib.require('json');

var j = {a:1, b:2}
var str = json.stringify(j);
alert(str);








}catch(err){alert(err.toString()+"\rError line:"+err.line.toString())}
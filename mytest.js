#include 'amlib.js'

var json = amlib.require('json');
var ttc = amlib.require('textTypeCtrl');

var j = {a:1, b:2}
var str = json.stringify(j);
alert(str);

var s = '00123qwe456rty0';
var digit = ttc('digit');
alert( digit(s) );
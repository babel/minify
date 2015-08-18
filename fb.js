/*!CK:995955236!*//*1439825661,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["hr1Z6"]); }

/** Path: html/js/downstream/polyfill/Array.es6.js */
/**
 * @generated SignedSource<<06a29dc8f57caa90ae7ea371dbdb5585>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2013-2014 Facebook, Inc.
 * @provides Array.es6
 * @polyfill
 */






if(!Array.from){
Array.from = function(arrayLike){
if(arrayLike == null){
throw new TypeError('Object is null or undefined');}



var mapFn=arguments[1];
var thisArg=arguments[2];

var C=this;
var items=Object(arrayLike);
var symbolIterator=typeof Symbol === 'function'?typeof Symbol === 'function'?
Symbol.iterator:'@@iterator':
'@@iterator';
var mapping=typeof mapFn === 'function';
var usingIterator=typeof items[symbolIterator] === 'function';
var key=0;
var ret;
var value;

if(usingIterator){
ret = typeof C === 'function'?
new C():
[];
var it=items[symbolIterator]();
var next;

while(!(next = it.next()).done) {
value = next.value;

if(mapping){
value = mapFn.call(thisArg,value,key);}


ret[key] = value;
key += 1;}


ret.length = key;
return ret;}


var len=items.length;
if(isNaN(len) || len < 0){
len = 0;}


ret = typeof C === 'function'?
new C(len):
new Array(len);

while(key < len) {
value = items[key];

if(mapping){
value = mapFn.call(thisArg,value,key);}


ret[key] = value;

key += 1;}


ret.length = key;
return ret;};}
/** Path: html/js/downstream/polyfill/Array.js */

/** Path: html/js/downstream/polyfill/__DEV__.js */
/**
 * @generated SignedSource<<c0e2ef40ba979065e0c0e6ac71466766>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * @provides __DEV__
 * @polyfill
 */


self['__DEV__'] = self['__DEV__'] || 0;

if(__DEV__){
if(self.__BOOTSTRAPPED__){
throw new Error(
'The JavaScript bootstrapping environment can be included only once. ' +
'Fix the page including it multiple times.');}


self.__BOOTSTRAPPED__ = true;}
/** Path: html/js/downstream/polyfill/Array.prototype.es6.js */
/**
 * @generated SignedSource<<c801d96cdcbd85be20a0c7af24dd7a48>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @provides Array.prototype.es6
 * @polyfill
 * @requires __DEV__
 */



(function(undefined){
if(__DEV__){


try{
Object.defineProperty && Object.defineProperty(
Array.prototype,
'__ARRAY_ENUMERATION_GUARD__',
{
configurable:true,
enumerable:true,
get:function(){
console.error(
'Your code is broken! Do not iterate over arrays with ' +
'for...in. See https://fburl.com/31944000 for more information.');}});}




catch(e) {}}





function findIndex(predicate,context){


















if(this == null){
throw new TypeError(
'Array.prototype.findIndex called on null or undefined');}


if(typeof predicate !== 'function'){
throw new TypeError('predicate must be a function');}

var list=Object(this);
var length=list.length >>> 0;
for(var i=0;i < length;i++) {
if(predicate.call(context,list[i],i,list)){
return i;}}


return -1;}


if(!Array.prototype.findIndex){
Array.prototype.findIndex = findIndex;}



if(!Array.prototype.find){
Array.prototype.find = function(predicate,context){


















if(this == null){
throw new TypeError('Array.prototype.find called on null or undefined');}

var index=findIndex.call(this,predicate,context);
return index === -1?undefined:this[index];};}})();
/** Path: html/js/downstream/polyfill/Array.prototype.js */

/** Path: html/js/downstream/polyfill/Date.js */

/** Path: html/js/downstream/polyfill/Date.prototype.toISOString.js */

/** Path: html/js/downstream/polyfill/Function.prototype.js */

/** Path: html/js/downstream/polyfill/Function.prototype-shield.js */
/**
 * @generated SignedSource<<42da3b4bbbcca3ae4ca9683ccec5fbd6>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * @provides Function.prototype-shield
 * @requires __DEV__ Function.prototype
 * @polyfill
 * @nostacktrace
 */







if(__DEV__){
(function(bind){
Function.prototype.bind = function(){
var bound=bind.apply(this,arguments);
bound.toString = bind.call(this.toString,this);
return bound;};})(

Function.prototype.bind);


if(Object.preventExtensions){
Object.preventExtensions(Function.prototype);}}
/** Path: html/js/downstream/polyfill/GenericFunctionVisitor.js */
/**
 * @generated SignedSource<<c08ae7cb38fd761137a759ab955d052d>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @provides GenericFunctionVisitor
 * @polyfill
 *
 * This file contains the functions used for the generic JS function
 * transform. Please add your functionality to these functions if you
 * want to wrap or annotate functions.
 *
 * Please see the DEX https://fburl.com/80903169 for more information.
 */


(function(){
var funcCalls={};

var createMeta=function(type,signature){
if(!type && !signature){
return null;}


var meta={};
if(typeof type !== 'undefined'){
meta.type = type;}


if(typeof signature !== 'undefined'){
meta.signature = signature;}


return meta;};


var getMeta=function(name,params){
return createMeta(
name && /^[A-Z]/.test(name)?name:undefined,
params && (params.params && params.params.length || params.returns)?
'function(' + (
params.params?params.params.map(function(param){
return (/\?/.test(param)?
'?' + param.replace('?',''):
param);}).
join(','):'') +
')' + (
params.returns?':' + params.returns:''):
undefined);};



var noopAnnotator=function(fn,funcMeta,params){
return fn;};


var genericAnnotator=function(fn,funcMeta,params){
if('sourcemeta' in __transform_includes){
fn.__SMmeta = funcMeta;}


if('typechecks' in __transform_includes){
var meta=getMeta(funcMeta?funcMeta.name:undefined,params);
if(meta){
__w(fn,meta);}}


return fn;};


var noopBodyWrapper=function(scope,args,fn){
return fn.apply(scope,args);};


var typecheckBodyWrapper=function(scope,args,fn,params){
if(params && params.params){
__t.apply(scope,params.params);}


var result=fn.apply(scope,args);

if(params && params.returns){
__t([result,params.returns]);}


return result;};


var codeUsageBodyWrapper=function(scope,args,fn,params,funcMeta){
if(funcMeta){
if(!funcMeta.callId){


funcMeta.callId = funcMeta.module + ':' + (
funcMeta.line || 0) + ':' + (
funcMeta.column || 0);}

var key=funcMeta.callId;
funcCalls[key] = (funcCalls[key] || 0) + 1;}

return fn.apply(scope,args);};



if(typeof __transform_includes === 'undefined'){
__annotator = noopAnnotator;
__bodyWrapper = noopBodyWrapper;}else
{
__annotator = genericAnnotator;

if('codeusage' in __transform_includes){
__annotator = noopAnnotator;
__bodyWrapper = codeUsageBodyWrapper;
__bodyWrapper.getCodeUsage = function(){return funcCalls;};
__bodyWrapper.clearCodeUsage = function(){funcCalls = {};};}else
if('typechecks' in __transform_includes){
__bodyWrapper = typecheckBodyWrapper;}else
{
__bodyWrapper = noopBodyWrapper;}}})();
/** Path: html/js/downstream/polyfill/JSON.js */

/** Path: html/js/downstream/polyfill/JSON-shield.js */
/**
 * @generated SignedSource<<84043f6cf7bf1fafa84c900737b55d16>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * @provides JSON-shield
 * @requires JSON
 * @polyfill
 */













if(JSON.stringify(["\u2028\u2029"]) === '["\u2028\u2029"]'){
JSON.stringify = (function(stringify){

var u2028=/\u2028/g,
u2029=/\u2029/g;

return function(any,replacer,space){
var json=stringify.call(this,any,replacer,space);
if(json){
if(-1 < json.indexOf('\u2028')){
json = json.replace(u2028,'\\u2028');}

if(-1 < json.indexOf('\u2029')){
json = json.replace(u2029,'\\u2029');}}


return json;};})(

JSON.stringify);}
/** Path: html/js/downstream/polyfill/JSON.parse.js */

/** Path: html/js/downstream/polyfill/Math.es6.js */

/** Path: html/js/downstream/polyfill/Number.es6.js */

/** Path: html/js/downstream/polyfill/Object.js */

/** Path: html/js/downstream/polyfill/Object-shield.js */
/**
 * @generated SignedSource<<697bafbe703a6036e33b93ce236439b2>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * @provides Object-shield
 * @requires __DEV__ Object
 * @polyfill
 */





if(__DEV__){
if(!Object.create.__fb){
Object.create = (function(original){
function create(proto){
if(arguments.length > 1){
throw new Error(
'Object.create implementation supports only the first parameter');}

return original.call(this,proto);}

create.__fb = true;
return create;})(
Object.create);}}
/** Path: html/js/downstream/polyfill/Object.enumFix.js */

/** Path: html/js/downstream/polyfill/Object.es6.js */
/**
 * @generated SignedSource<<fd6a161ebc7c2dd5347ff590a7621560>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * @provides Object.es6
 * @requires Object
 * @polyfill
 */



(function(){

if(Object.assign){
return;}


var hasOwnProperty=Object.prototype.hasOwnProperty;






var _assign;
if(Object.keys && Object.keys.name !== 'object_keys_polyfill'){
_assign = function(to,from){
var keys=Object.keys(from);
for(var i=0;i < keys.length;i++) {
to[keys[i]] = from[keys[i]];}};}else


{
_assign = function(to,from){
for(var key in from) {
if(hasOwnProperty.call(from,key)){
to[key] = from[key];}}};}





Object.assign = function(target,sources){
if(target == null){
throw new TypeError('Object.assign target cannot be null or undefined');}


var to=Object(target);

for(var nextIndex=1;nextIndex < arguments.length;nextIndex++) {
var nextSource=arguments[nextIndex];
if(nextSource != null){
_assign(to,Object(nextSource));}}



return to;};})();
/** Path: html/js/downstream/polyfill/Object.prototype.js */

/** Path: html/js/downstream/polyfill/SourceMetaAnnotator.js */
/**
 * @generated SignedSource<<df4044cdfdf817c3c00a10c74c706394>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * @provides SourceMetaAnnotator
 * @nostacktrace
 * @nosourcemeta
 * @polyfill
 */

(function(global){
global.__m = function(fn,meta){
fn.__SMmeta = meta;
return fn;};})(

this);
/** Path: html/js/downstream/polyfill/String.prototype.es6.js */
/**
 * @generated SignedSource<<db1b4a2cbf6c59ceaa0ac3f7c4a7062d>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * @provides String.prototype.es6
 * @polyfill
 */







if(!String.prototype.startsWith){
String.prototype.startsWith = function(search){
"use strict";
if(this == null){
throw TypeError();}

var string=String(this);
var pos=arguments.length > 1?
Number(arguments[1]) || 0:0;
var start=Math.min(Math.max(pos,0),string.length);
return string.indexOf(String(search),pos) == start;};}



if(!String.prototype.endsWith){
String.prototype.endsWith = function(search){
"use strict";
if(this == null){
throw TypeError();}

var string=String(this);
var stringLength=string.length;
var searchString=String(search);
var pos=arguments.length > 1?
Number(arguments[1]) || 0:stringLength;
var end=Math.min(Math.max(pos,0),stringLength);
var start=end - searchString.length;
if(start < 0){
return false;}

return string.lastIndexOf(searchString,start) == start;};}



if(!String.prototype.contains){
String.prototype.contains = function(search){
"use strict";
if(this == null){
throw TypeError();}

var string=String(this);
var pos=arguments.length > 1?
Number(arguments[1]) || 0:0;
return string.indexOf(String(search),pos) != -1;};}



if(!String.prototype.repeat){
String.prototype.repeat = function(count){
"use strict";
if(this == null){
throw TypeError();}

var string=String(this);
count = Number(count) || 0;
if(count < 0 || count === Infinity){
throw RangeError();}

if(count === 1){
return string;}

var result='';
while(count) {
if(count & 1){
result += string;}

if(count >>= 1){
string += string;}}


return result;};}
/** Path: html/js/downstream/polyfill/String.prototype.es7.js */
/**
 * @generated SignedSource<<3e0d739b06a6ca09a9e89081c936f452>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @provides String.prototype.es7
 * @polyfill
 */

if(!String.prototype.trimLeft){
String.prototype.trimLeft = function(){
return this.replace(/^\s+/,'');};}



if(!String.prototype.trimRight){
String.prototype.trimRight = function(){
return this.replace(/\s+$/,'');};}
/** Path: html/js/downstream/polyfill/String.prototype.js */

/** Path: html/js/downstream/polyfill/String.prototype.split.js */

/** Path: html/js/downstream/polyfill/TypeChecker.js */
/**
 * @generated SignedSource<<664308d5ae46929cca6b3ea8971dcd9f>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * This is a very basic typechecker that does primitives as well as boxed
 * versions of the primitives.
 *
 * @provides TypeChecker
 * @nostacktrace
 * @polyfill
 */


(function(){
var handler;
var currentType=[];
var toStringFunc=Object.prototype.toString;
var paused=false;
var disabled=false;


var nextType;
var nextValue;




var typeInterfaceMap={
'HTMLElement':{'DOMEventTarget':true,'DOMNode':true},
'DOMElement':{'DOMEventTarget':true,'DOMNode':true},
'DOMDocument':{'DOMEventTarget':true,'DOMNode':true},
'DocumentFragment':{
'DOMElement':true,
'DOMEventTarget':true,
'DOMNode':true},

'DOMWindow':{'DOMEventTarget':true},
'DOMTextNode':{'DOMNode':true},
'Comment':{'DOMNode':true},
'file':{'blob':true},
'worker':{'DOMEventTarget':true},

'Set':{'set':true},
'Map':{'map':true},
'FbtResult':{'Fbt':true},
'string':{'Fbt':true},
'array':{'Fbt':true}};







function stringType(value){
return toStringFunc.call(value).slice(8,-1);}


function getTagName(string){
switch(string){
case 'A':
return 'Anchor';
case 'IMG':
return 'Image';
case 'TEXTAREA':
return 'TextArea';}

return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();}





function isDOMNode(type,value,nodeType){
if(type === 'function'){


if(typeof value.call !== 'undefined'){
return false;}}else

if(type !== 'object'){
return false;}


return typeof value.nodeName === 'string' && value.nodeType === nodeType;}





function getObjectType(type,value,node,checkNextNode){
nextValue = null;


var toStringType=stringType(value);
if(value === null){
type = 'null';}else
if(toStringType === 'Function'){
if(node === '$Class'){

type = '$Class';
if(checkNextNode && value.__TCmeta && value.__TCmeta.type){
nextType = value.__TCmeta.type;}}else

{
if(value.__TCmeta){

type = node === 'function'?'function':value.__TCmeta.signature;}else
{

type = node.indexOf('function') === 0?node:'function';}}}else


if(type === 'object' || type === 'function'){
var constructor=value.constructor;
if(constructor && constructor.__TCmeta){


if(node === 'object'){
type = 'object';}else
{
type = constructor.__TCmeta.type;
while(constructor && constructor.__TCmeta) {
if(constructor.__TCmeta.type == node){
type = node;
break;}

constructor = constructor.__TCmeta.superClass;}}}else


if(typeof value.nodeType === 'number' &&
typeof value.nodeName === 'string'){


switch(value.nodeType){
case 1:
if(node === 'HTMLElement'){

type = 'HTMLElement';}else
{
type = 'HTML' + getTagName(value.nodeName) + 'Element';
typeInterfaceMap[type] = typeInterfaceMap['HTMLElement'];}

break;
case 3:type = 'DOMTextNode';break;
case 8:type = 'Comment';break;
case 9:type = 'DOMDocument';break;
case 11:type = 'DocumentFragment';break;}}else

if(value == value.window && value == value.self){
type = 'DOMWindow';}else
if(toStringType == 'XMLHttpRequest' ||
'setRequestHeader' in value){

type = 'XMLHttpRequest';}else
{

switch(toStringType){
case 'Error':

type = node === 'Error'?
'Error':
value.name;
break;
case 'Array':
if(checkNextNode && value.length){
nextValue = value[0];}

type = toStringType.toLowerCase();
break;
case 'Object':
if(node === 'Set' && value['@@__IMMUTABLE_SET__@@'] ||
node === 'Map' && value['@@__IMMUTABLE_MAP__@@']){
type = node;}else
{
if(checkNextNode){
for(var key in value) {
if(value.hasOwnProperty(key)){
nextValue = value[key];
break;}}}



type = toStringType.toLowerCase();}

break;
case 'RegExp':
case 'Date':
case 'Blob':
case 'File':
case 'FileList':
case 'Worker':
case 'Map':
case 'Set':

case 'Uint8Array':
case 'Int8Array':
case 'Uint16Array':
case 'Int16Array':
case 'Uint32Array':
case 'Int32Array':
case 'Float32Array':
case 'Float64Array':
type = toStringType.toLowerCase();
break;}}}



return type;}











function equals(value,node){



var nullable=node.charAt(0) === '?';


if(value == null){
currentType.push(typeof value === 'undefined'?'undefined':'null');
return nullable;}else
if(nullable){
node = node.substring(1);}


var type=typeof value;

if(node === 'Fbt' && type === 'string'){
return true;}


switch(type){
case 'boolean':
case 'number':
case 'string':


currentType.push(type);
return node === type;}





var simpleMatch=false;
switch(node){
case 'function':

simpleMatch = type === 'function' && typeof value.call === 'function';
break;
case 'object':

simpleMatch = type === 'object' && stringType(value) === 'Object';
break;
case 'array':
simpleMatch = type === 'object' && stringType(value) === 'Array';
break;
case 'promise':
simpleMatch = type === 'object' && typeof value.then === 'function';
break;
case 'HTMLElement':
simpleMatch = isDOMNode(type,value,1);
break;
case 'DOMTextNode':
simpleMatch = isDOMNode(type,value,3);
break;
case 'Iterator':
simpleMatch = type === 'object' && typeof value.next === 'function';
break;
case 'IteratorResult':
simpleMatch = type === 'object' && typeof value.done === 'boolean';
break;
case 'OrderedMap':

case 'ImmOrderedMap':
simpleMatch = type === 'object' &&
value['@@__IMMUTABLE_ORDERED__@@'] &&
value['@@__IMMUTABLE_MAP__@@'];
break;
case 'OrderedSet':

case 'ImmOrderedSet':
simpleMatch = type === 'object' &&
value['@@__IMMUTABLE_ORDERED__@@'] &&
value['@@__IMMUTABLE_SET__@@'];
break;
case 'ImmMap':
simpleMatch = type === 'object' && value['@@__IMMUTABLE_MAP__@@'];
break;
case 'ImmSet':
simpleMatch = type === 'object' && value['@@__IMMUTABLE_SET__@@'];
break;
case 'List':
simpleMatch = type === 'object' && value['@@__IMMUTABLE_LIST__@@'];
break;}


if(simpleMatch){
currentType.push(node);
return true;}



var indexOfFirstAngle=node.indexOf('<');
var nextNode;

if(indexOfFirstAngle !== -1 && node.indexOf('function') !== 0){
nextNode = node.substring(indexOfFirstAngle + 1,node.lastIndexOf('>'));
node = node.substring(0,indexOfFirstAngle);}



type = getObjectType(type,value,node,!!nextNode);



var interfaces;
if(type !== node && (interfaces = typeInterfaceMap[type])){
if(interfaces[node]){
type = node;}}




currentType.push(type);

if(node !== type){
return false;}



if(nextNode){

if(nextType && nextNode !== nextType){
return false;}


if(nextValue && !equals(nextValue,nextNode)){
return false;}}


return true;}







function matches(value,node){
if(node.indexOf('|') === -1){
currentType.length = 0;
return equals(value,node);}else
{
var nodes=node.split('|');
for(var i=0;i < nodes.length;i++) {
currentType.length = 0;
if(equals(value,nodes[i])){
return true;}}}



return false;}










function check(){
if(!paused && !disabled){
var args=arguments;
var ii=args.length;
while(ii--) {
var value=args[ii][0];
var expected=args[ii][1];
var name=args[ii][2] || 'return value';

if(!matches(value,expected)){
var actual=currentType.shift();
while(currentType.length) {
actual += '<' + currentType.shift() + '>';}


var isReturn=!!args[ii][2];
var stackBoundary;
try{
stackBoundary = isReturn?arguments.callee.caller:check;}
catch(e) {}




var message=
'Type Mismatch for ' + name + ': expected `' + expected + '`, ' +
'actual `' + actual + '` (' + toStringFunc.call(value) + ').';




if(actual === 'object' &&
expected.match(/^[A-Z]/) &&
!value.__TCmeta){
message +=
' Check the constructor\'s module is marked as typechecked -' +
' see http://fburl.com/typechecks for more information.';}


var error=new TypeError(message);

if(Error.captureStackTrace){
Error.captureStackTrace(error,stackBoundary || check);}else
{


error.framesToPop = isReturn?2:1;}


if(typeof handler == 'function'){
handler(error);

paused = true;

setTimeout(function(){return paused = false;},0);}else
if(handler === 'throw'){
throw error;}}}}






return arguments[0][0];}






check.setHandler = function(fn){
handler = fn;};


check.disable = function(){
disabled = true;};





function annotate(fn,meta){
meta.superClass = fn.__superConstructor__;
fn.__TCmeta = meta;
return fn;}



__t = check;
__w = annotate;})();
/** Path: html/js/downstream/polyfill/console.js */

/** Path: html/js/downstream/polyfill/require.js */
/**
 * @generated SignedSource<<2985f30d30763ced9287a0efc5c77b1f>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * @provides commonjs-require
 * @requires Date
 *           Function.prototype
 *           JSON
 *           Object
 *           __DEV__
 * @polyfill
 */
(function(global){


if(global.require){
return;}














var modulesMap={};





var modulesTimeMap={};







var dependencyMap={};




var predefinedRefCounts={};

var _counter=0;

var REQUIRE_WHEN_READY=0x1;
var USED_AS_TRANSPORT=0x2;
var HAS_SIDE_EFFECTS=0x4;


var DUMMY_EXPORTS={};

var hasOwnProperty=Object.prototype.hasOwnProperty;
var toString=Object.prototype.toString;

function _debugUnresolvedDependencies(names){
var unresolved=Array.prototype.slice.call(names);
var visited={};
var ii,name,module,dependency;

while(unresolved.length) {
name = unresolved.shift();
if(visited[name]){
continue;}

visited[name] = true;

module = modulesMap[name];
if(!module || !module.waiting){
continue;}


for(ii = 0;ii < module.dependencies.length;ii++) {
dependency = module.dependencies[ii];
if(!modulesMap[dependency] || modulesMap[dependency].waiting){
unresolved.push(dependency);}}}




for(name in visited) {
if(hasOwnProperty.call(visited,name)){
unresolved.push(name);}}



var messages=[];
for(ii = 0;ii < unresolved.length;ii++) {
name = unresolved[ii];
var message=name;
module = modulesMap[name];
if(!module){
message += ' is not defined';}else
if(!module.waiting){
message += ' is ready';}else
{
var unresolvedDependencies=[];
for(var jj=0;jj < module.dependencies.length;jj++) {
dependency = module.dependencies[jj];
if(!modulesMap[dependency] || modulesMap[dependency].waiting){
unresolvedDependencies.push(dependency);}}


message += ' is waiting for ' + unresolvedDependencies.join(', ');}

messages.push(message);}

return messages.join('\n');}





function ModuleError(msg){
this.name = 'ModuleError';
this.message = msg;
this.stack = Error(msg).stack;
this.framesToPop = 2;}

ModuleError.prototype = Object.create(Error.prototype);
ModuleError.prototype.constructor = ModuleError;

var _now;
var _absoluteNow;
_now = _absoluteNow = Date.now.bind(Date);

var _performance=
global.performance ||
global.msPerformance ||
global.webkitPerformance || {};

if(_performance.now){
_now = _performance.now.bind(_performance);
var navigationStart=
_performance.timing && _performance.timing.navigationStart;
if(navigationStart){
_absoluteNow = function(){return _now() + navigationStart;};}}



var _factoryStack=[0];
var _compiledTimeStack=[];
var _totalFactories=0;
var _totalRequireCalls=0;
























































function require(id){
_totalRequireCalls++;

var module=modulesMap[id];
if(module && module.exports != null){


if((module.refcount--) === 1){
delete modulesMap[id];}

return module.exports;}


return requireImpl(id);}


function requireImpl(id){
if(global.ErrorUtils && !global.ErrorUtils.inGuard()){
return global.ErrorUtils.applyWithGuard(requireImpl,null,[id]);}


var module=modulesMap[id];

if(!module){
var msg='Requiring unknown module "' + id + '"';
if(__DEV__){
msg += '. It may not be loaded yet. Did you forget to run arc build?';}

throw new ModuleError(msg);}


if(module.hasError){
throw new ModuleError(
'Requiring module "' + id + '" which threw an exception');}



if(module.waiting){
throw new ModuleError(
'Requiring module "' + id + '" with unresolved dependencies: ' +
_debugUnresolvedDependencies([id]));}



var exports=module.exports = {};
var factory=module.factory;
if(toString.call(factory) === '[object Function]'){

var dependencies=module.dependencies;
var length=dependencies.length;
var ret;

if(module.special & USED_AS_TRANSPORT){
length = Math.min(length,factory.length);}


try{
try{
_runRecursiveSideEffectDependencies(module);}
catch(e) {
throwErrorWithModuleID(e,id);}


var args=[];
for(var i=0;args.length < length;i++) {
var dep=dependencies[i];
if(!module.inlineRequires[dep]){
args.push(dep === 'module'?module:
dep === 'exports'?exports:
require.call(null,dep));}}



++_totalFactories;
_factoryStack.push(0);
_compiledTimeStack.push(NaN);
var startTime=_absoluteNow();
try{
ret = factory.apply(module.context || global,args);}
catch(e) {
throwErrorWithModuleID(e,id);}finally
{
var completeTime=_absoluteNow();
var inclusiveTime=completeTime - startTime;
var exclusiveTime=inclusiveTime - _factoryStack.pop();

var compiledTimeStamp=_compiledTimeStack.pop();

_factoryStack[_factoryStack.length - 1] += inclusiveTime;

var timeRecord=modulesTimeMap[module.id];
timeRecord.factoryTime = exclusiveTime;
timeRecord.factoryEnd = completeTime;

if(!isNaN(compiledTimeStamp)){
timeRecord.compileTime = compiledTimeStamp - startTime;
timeRecord.factoryTime -= timeRecord.compileTime;
timeRecord.compileEnd = compiledTimeStamp;}


if(factory.__SMmeta){
for(var metaKey in factory.__SMmeta) {
if(factory.__SMmeta.hasOwnProperty(metaKey)){
timeRecord[metaKey] = factory.__SMmeta[metaKey];}}}}}




catch(e) {
module.hasError = true;
module.exports = null;
throw e;}

if(ret){
if(__DEV__){
if(typeof ret != 'object' && typeof ret != 'function'){
throw new ModuleError(
'Factory for module "' + id + '" returned ' +
'an invalid value "' + ret + '". ' +
'Returned value should be either a function or an object.');}}



module.exports = ret;}}else

{
module.exports = factory;}



var rid=id + ':__required__';
if(dependencyMap[rid]){
define(rid,DUMMY_EXPORTS);}




if((module.refcount--) === 1){
delete modulesMap[id];}

return module.exports;}


function throwErrorWithModuleID(e,id){
if(modulesMap.ex && modulesMap.erx){


var ex=require.call(null,'ex');
var erx=require.call(null,'erx');
var messageWithParams=erx(e.message);
if(messageWithParams[0].indexOf(' from module "%s"') < 0){
messageWithParams[0] += ' from module "%s"';
messageWithParams[messageWithParams.length] = id;}

e.message = ex.apply(null,messageWithParams);}

throw e;}


require.__markCompiled = function(){
_compiledTimeStack[_compiledTimeStack.length - 1] = _absoluteNow();};


require.__getFactoryTime = function(){
var total=0;
for(var key in modulesTimeMap) {
if(modulesTimeMap.hasOwnProperty(key)){
total += modulesTimeMap[key].factoryTime;}}


return total;};


require.__getCompileTime = function(){
var total=0;
for(var key in modulesTimeMap) {
if(modulesTimeMap.hasOwnProperty(key)){
total += modulesTimeMap[key].compileTime;}}


return total;};


require.__getTotalFactories = function(){
return _totalFactories;};


require.__getTotalRequireCalls = function(){
return _totalRequireCalls;};


require.__getModuleTimeDetails = function(){
var clone={};
for(var key in modulesTimeMap) {
if(modulesTimeMap.hasOwnProperty(key)){
clone[key] = modulesTimeMap[key];}}


return clone;};

























































function define(id,dependencies,factory,
_special,_context,_refCount,_inlineRequires){
if(global.TimeSlice && !global.TimeSlice.inGuard()){
return global.TimeSlice.guard(function(){
define(id,dependencies,factory,
_special,_context,_refCount,_inlineRequires);},
'define ' + id)();}


if(dependencies === undefined){

dependencies = [];
factory = id;
id = _uid();}else
if(factory === undefined){

factory = dependencies;
if(toString.call(id) === '[object Array]'){
dependencies = id;
id = _uid(dependencies.join(','));}else
{
dependencies = [];}}





var canceler={cancel:_undefine.bind(this,id)};

var record=modulesMap[id];






if(record){
if(_refCount){
record.refcount += _refCount;}


return canceler;}else
if(!dependencies && !factory && _refCount){


predefinedRefCounts[id] = (predefinedRefCounts[id] || 0) + _refCount;
return canceler;}


var refCount=(predefinedRefCounts[id] || 0) + (_refCount || 0);
delete predefinedRefCounts[id];

if(__DEV__){
if(
!factory ||
typeof factory != 'object' && typeof factory != 'function' &&
typeof factory != 'string'){
throw new ModuleError(
'Invalid factory "' + factory + '" for module "' + id + '". ' +
'Factory should be either a function or an object.');}



if(toString.call(dependencies) !== '[object Array]'){
throw new ModuleError(
'Invalid dependencies for module "' + id + '". ' +
'Dependencies must be passed as an array.');}}




record = new ModuleRecord(
id,
refCount,
null,
factory,
dependencies,
_context,
_special,
_inlineRequires || {});

modulesMap[id] = record;
modulesTimeMap[id] = {
id:id,
compileTime:null,
factoryTime:null,
compileEnd:null,
factoryEnd:null};

_initDependencies(id);

return canceler;}


function ModuleRecord(
id,refcount,exports,factory,dependencies,context,special,
inlineRequires)
{
this.id = id;
this.refcount = refcount;
this.exports = exports || null;
this.factory = factory;
this.dependencies = dependencies;
this.context = context;
this.special = special || 0;
this.inlineRequires = inlineRequires;
this.waitingMap = {};
this.waiting = 0;
this.hasError = false;
this.ranRecursiveSideEffects = false;
this.sideEffectDependencyException = null;}


function _undefine(id){
if(!modulesMap[id]){
return;}


var module=modulesMap[id];
delete modulesMap[id];

for(var dep in module.waitingMap) {
if(module.waitingMap[dep]){
delete dependencyMap[dep][id];}}



for(var ii=0;ii < module.dependencies.length;ii++) {
dep = module.dependencies[ii];
if(modulesMap[dep]){
if((modulesMap[dep].refcount--) === 1){
_undefine(dep);}}else

if(predefinedRefCounts[dep]){
predefinedRefCounts[dep]--;}}}













































function requireLazy(dependencies,factory,context){
return define(
'__requireLazy__' + (
dependencies.length > 0?dependencies.join(',') + '__':'') + (
_counter++),
dependencies,
factory,
REQUIRE_WHEN_READY,
context,
1);}





function _uid(desc){
return '__mod__' + (desc?desc + '__':'') + (_counter++);}


function _addDependency(module,dep){

if(!module.waitingMap[dep] && module.id !== dep){
module.waiting++;
module.waitingMap[dep] = 1;
dependencyMap[dep] || (dependencyMap[dep] = {});
dependencyMap[dep][module.id] = 1;}}



function _initDependencies(id){
var modulesToRequire=[];
var module=modulesMap[id];
var dep,i,subdep;


for(i = 0;i < module.dependencies.length;i++) {
dep = module.dependencies[i];
if(!modulesMap[dep]){
_addDependency(module,dep);}else
if(modulesMap[dep].waiting){
for(subdep in modulesMap[dep].waitingMap) {
if(modulesMap[dep].waitingMap[subdep]){
_addDependency(module,subdep);}}}}




if(module.waiting === 0 && module.special & REQUIRE_WHEN_READY){
modulesToRequire.push(id);}



if(dependencyMap[id]){
var deps=dependencyMap[id];
var submodule;
dependencyMap[id] = undefined;
for(dep in deps) {
submodule = modulesMap[dep];


for(subdep in module.waitingMap) {
if(module.waitingMap[subdep]){
_addDependency(submodule,subdep);}}



if(submodule.waitingMap[id]){
submodule.waitingMap[id] = 0;
submodule.waiting--;}

if(submodule.waiting === 0 &&
submodule.special & REQUIRE_WHEN_READY){
modulesToRequire.push(dep);}}}





for(i = 0;i < modulesToRequire.length;i++) {
require.call(null,modulesToRequire[i]);}}








function _runRecursiveSideEffectDependencies(module){
if(module.sideEffectDependencyException){
throw module.sideEffectDependencyException;}


if(module.ranRecursiveSideEffects){
return;}


module.ranRecursiveSideEffects = true;

var deps=module.dependencies;
if(deps){
for(var i=0;i < deps.length;i++) {
var dep=deps[i];
var mod=modulesMap[dep];

try{
_runRecursiveSideEffectDependencies(mod);}
catch(e) {
module.sideEffectDependencyException = e;
throw e;}


if(mod.special & HAS_SIDE_EFFECTS){
try{
require.call(null,dep);}
catch(e) {
module.sideEffectDependencyException = e;
throw e;}}}}}






function _register(id,exports){
modulesMap[id] = new ModuleRecord(id,0,exports);
modulesTimeMap[id] = {
id:id,
compileTime:null,
factoryTime:null,
compileEnd:null,
factoryEnd:null};}





_register('module',0);
_register('exports',0);

_register('define',define);
_register('global',global);
_register('require',require);
_register('requireDynamic',require);
_register('requireLazy',requireLazy);
_register('requireWeak',requireWeak);
_register('ifRequired',ifRequired);

define.amd = {};

global.define = define;
global.require = require;
global.requireDynamic = require;
global.requireLazy = requireLazy;

function requireWeak(id,cb){

if(toString.call(id) === '[object Array]'){
if(id.length !== 1){
throw new Error(
'requireWeak only supports a one-arg array for push safety');}


id = id[0];}



ifRequired.call(null,id,function(module){
cb(module);},
function(){
define(
'__requireWeak__' + id + '__' + (_counter++),
[id + ':__required__'],
function(){
cb(modulesMap[id].exports);},

REQUIRE_WHEN_READY,
null,
1);});}










function ifRequired(id,cbYes,cbNo){
var mod=modulesMap[id];
if(mod && mod.exports != null && !mod.hasError){
if(typeof cbYes === 'function'){
cbYes(mod.exports);}}else

if(typeof cbNo === 'function'){
cbNo();}}



require.__debug = {
modules:modulesMap,
deps:dependencyMap,
printDependencyInfo:function(){
if(!global.console){
return;}

var names=Object.keys(require.__debug.deps);
global.console.log(_debugUnresolvedDependencies(names));}};



if(__DEV__){
var getAllDependencies=function(id){
var visitedIDs={};
collectAllDependencies(id,visitedIDs);
return visitedIDs;};


var collectAllDependencies=function(id,visitedIDs){
var module=modulesMap[id];
if(module && !visitedIDs[id]){
visitedIDs[id] = true;
if(module.dependencies){
module.dependencies.forEach(function(depID){
collectAllDependencies(depID,visitedIDs);});}}};





var getDependentMap=function(){
var dependentMap={};
var allDependencies={};

Object.keys(modulesMap).forEach(function(id){
dependentMap[id] = {
common:null,
dependents:[]};});



Object.keys(dependentMap).forEach(function(id){
var module=modulesMap[id];
if(module.dependencies){
module.dependencies.forEach(function(requiredID){
if(dependentMap[requiredID]){
dependentMap[requiredID].dependents.push(id);}});}});





Object.keys(dependentMap).forEach(function(id){
var module=dependentMap[id];
module.common = findCommonDependent(module.dependents);});


function isDependentOn(id,dependency){
allDependencies[id] = allDependencies[id] || getAllDependencies(id);
return !!allDependencies[id][dependency];}


function findCommonDependent(ids){
var ancestor=ids.length > 0?ids[0]:null;
for(var i=1;i < ids.length;i++) {
var candidate=ids[i];
if(isDependentOn(ancestor,candidate)){
ancestor = candidate;}else
if(!isDependentOn(candidate,ancestor)){
return null;}}


return ancestor;}


return dependentMap;};


var calculateInclusiveFactoryTime=function(id,visitedIDs){
return Object.keys(getAllDependencies(id)).
map(function(id){
return modulesTimeMap[id].factoryTime;}).

reduce(function(total,depTime){
return total + depTime;},
0);};


var getFactoryTimes=function(){
return Object.keys(modulesTimeMap).
map(function(id){
return modulesTimeMap[id];}).

filter(function(module){
return module.factoryTime;}).

map(function(module){
return {
module:module.id,
compileTime:module.compileTime,
inclusiveTime:calculateInclusiveFactoryTime(module.id),
exclusiveTime:module.factoryTime};});};




var calculateParseTime=function(factory){

var start=_now();

new Function(
'var factory = ' + factory.toString() + ';' +
'var random = ' + Math.random() + ';');


return _now() - start;};


var getParseTimes=function(){
return Object.keys(modulesMap).
map(function(id){
return modulesMap[id];}).

filter(function(module){
return module && module.factory;}).

map(function(module){
var median;

try{
var times=[];
for(var i=0;i < 5;i++) {
times.push(calculateParseTime(module.factory));}

times.sort();
median = times[Math.floor(times.length / 2)];}
catch(e) {}

return {
id:module.id,
time:median,
initialized:module.refcount !== 0};});};




var getDependentRecords=function(costFn){
function getCostFor(id){
var module=modulesMap[id];
var cost=module?costFn(module):0;
var record={
id:id,
exclusiveCost:cost,
subtreeCost:cost,
dependencies:[]};


Object.keys(dependentMap).forEach(function(depID){
if(dependentMap[depID].common == id){
var depCost=getCostFor(depID);
record.subtreeCost += depCost.subtreeCost;
record.dependencies.push(depCost);}});



return record;}


function collectRecordsFor(records,branches,history){
branches.sort(function(a,b){
return b.subtreeCost - a.subtreeCost;});

branches.forEach(function(branch){
var path=history.concat(branch.id);
records.push({
path:path.join(' > '),
subtreeCost:branch.subtreeCost,
exclusiveCost:branch.exclusiveCost,
dependents:dependentMap[branch.id].dependents.join(', ')});

collectRecordsFor(records,branch.dependencies,path);});}



var dependentMap=getDependentMap();
var costTree=[];

Object.keys(dependentMap).forEach(function(id){
if(dependentMap[id].common == null){
costTree.push(getCostFor(id));}});



var records=[];
collectRecordsFor(records,costTree,[]);
return records;};


var printTable=function(description,rows,count){
console.table(rows.slice(0,count || 20));
console.log('All ' + description + ' as CSV',csvFor(rows));};


var csvFor=function(rows){
if(rows && rows.length >= 1){
var csv=
Object.keys(rows[0]).join(',') + '\n' +
rows.map(function(row){
return Object.keys(row).map(function(key){
return JSON.stringify(String(row[key]));}).
join(',');}).
join('\n');
return 'data:text/csv;base64,' + btoa(csv);}};



require.__debug.printDependentSizes = function(count){
var records=getDependentRecords(function(module){
return module.factory?module.factory.toString().length:0;});

printTable('sizes',records,count);};


require.__debug.printDependentTimes = function(count){
var records=getDependentRecords(function(module){
return modulesTimeMap[module.id].factoryTime;});

printTable('factory times',records,count);};


require.__debug.printParseTimes = function(count){
var times=getParseTimes();
times.sort(function(a,b){
return b.time - a.time;});

printTable('parse times',times,count);};


require.__debug.printFactoryTimes = function(count){
var times=getFactoryTimes();
times.sort(function(a,b){
return b.exclusiveTime - a.exclusiveTime;});

printTable('factory times',times,count);};}









global.__d = function(id,deps,factory,_special,_inlineRequires){
var defaultDeps=['global','require','requireDynamic','requireLazy',
'module','exports'];
define(id,defaultDeps.concat(deps),factory,_special || USED_AS_TRANSPORT,
null,null,_inlineRequires);};})(


this);
/** Path: html/js/downstream/error/eprintf.js */
/**
 * @generated SignedSource<<3009c9496f1f1237d0c5577747fa07a6>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule eprintf
 * @typechecks
 * @nostacktrace
 */__d('eprintf',[],__annotator(function $module_eprintf(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();











var eprintf=__annotator(function(errorMessage){return __bodyWrapper(this,arguments,function(){
var args=Array.prototype.slice.call(arguments).map(__annotator(function(arg){
return String(arg);},{'module':'eprintf','line':33,'column':55}));

var expectedLength=errorMessage.split('%s').length - 1;

if(expectedLength !== args.length - 1){

return eprintf('eprintf args number mismatch: %s',JSON.stringify(args));}


var index=1;
return errorMessage.replace(/%s/g,__annotator(function(whole){
return String(args[index++]);},{'module':'eprintf','line':44,'column':37}));},{params:[[errorMessage,'string','errorMessage']]});},{'module':'eprintf','line':32,'column':14},{params:['string']});



module.exports = eprintf;},{'module':'eprintf','line':0,'column':0,'name':'$module_eprintf'}),null);
/** Path: html/js/downstream/error/ex.js */
/**
 * @generated SignedSource<<2c2979cbad14fb7d605f43146cab45dd>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ex
 * @typechecks
 * @nostacktrace
 */__d('ex',['eprintf'],__annotator(function $module_ex(global,require,requireDynamic,requireLazy,module,exports,eprintf){if(require.__markCompiled)require.__markCompiled();

















var ex=__annotator(function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}
args = args.map(__annotator(function(arg){return String(arg);},{'module':'ex','line':39,'column':18}));
if(args[0].split('%s').length !== args.length){

return ex('ex args number mismatch: %s',JSON.stringify(args));}


if(__DEV__){
return eprintf.apply(null,args);}else
{
return ex._prefix + JSON.stringify(args) + ex._suffix;}},{'module':'ex','line':38,'column':9});




ex._prefix = '<![EX[';
ex._suffix = ']]>';

module.exports = ex;},{'module':'ex','line':0,'column':0,'name':'$module_ex'}),null);
/** Path: html/js/downstream/core/$.js */
/**
 * @generated SignedSource<<e5cc47d1ef8106743e838902b36b943e>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule $
 * @typechecks
 */__d('$',['ex'],__annotator(function $module__(global,require,requireDynamic,requireLazy,module,exports,ex){if(require.__markCompiled)require.__markCompiled();












function getRequiredElement(id){
var element=typeof id === 'string'?document.getElementById(id):id;
if(!element){
throw new Error(ex(
'Tried to get element with id of "%s" but it is not present on the page.',
id));}


return element;}__annotator(getRequiredElement,{'module':'$','line':32,'column':0,'name':'getRequiredElement'});








function $(id){return __bodyWrapper(this,arguments,function(){
return getRequiredElement(id);},{params:[[id,'string|DOMDocument|HTMLElement|DOMTextNode|Comment','id']],returns:'DOMDocument|HTMLElement|DOMTextNode|Comment'});}__annotator($,{'module':'$','line':49,'column':0,'name':'$'},{params:['string|DOMDocument|HTMLElement|DOMTextNode|Comment'],returns:'DOMDocument|HTMLElement|DOMTextNode|Comment'});









$.unsafe = getRequiredElement;

module.exports = $;},{'module':'$','line':0,'column':0,'name':'$module__'}),null);
/** Path: html/js/downstream/core/sprintf.js */
/**
 * @generated SignedSource<<18a0f7edbae549327a1a25562bbc6af6>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule sprintf
 * @typechecks
 */__d("sprintf",[],__annotator(function $module_sprintf(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();










function sprintf(format){for(var _len=arguments.length,args=Array(_len > 1?_len - 1:0),_key=1;_key < _len;_key++) {args[_key - 1] = arguments[_key];}return __bodyWrapper(this,arguments,function(){
var index=0;
return format.replace(/%s/g,__annotator(function(match){return args[index++];},{"module":"sprintf","line":32,"column":31}));},{params:[[format,"string","format"]],returns:"string"});}__annotator(sprintf,{"module":"sprintf","line":30,"column":0,"name":"sprintf"},{params:["string"],returns:"string"});


module.exports = sprintf;},{"module":"sprintf","line":0,"column":0,"name":"$module_sprintf"}),null);
/** Path: html/js/downstream/core/invariant.js */
/**
 * @generated SignedSource<<34572bd1767119a8bb8b872b43cbc1b8>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule invariant
 */__d('invariant',['ex','sprintf'],__annotator(function $module_invariant(global,require,requireDynamic,requireLazy,module,exports,ex,sprintf){if(require.__markCompiled)require.__markCompiled();



'use strict';




var printingFunction=ex;
if(__DEV__){
printingFunction = sprintf;}













var invariant=__annotator(function(condition,format){
if(__DEV__){
if(format === undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error;
if(format === undefined){
error = new Error(
'Minified exception occurred; use the non-minified dev environment ' +
'for the full error message and additional helpful warnings.');}else

{
var messageWithParams=['Invariant Violation: ' + format];
for(var i=2,l=arguments.length;i < l;i++) {
messageWithParams.push(arguments[i]);}

error = new Error(printingFunction.apply(null,messageWithParams));
error.messageWithParams = messageWithParams;}


error.framesToPop = 1;
throw error;}},{'module':'invariant','line':55,'column':16});



module.exports = invariant;},{'module':'invariant','line':0,'column':0,'name':'$module_invariant'}),null);
/** Path: html/js/downstream/core/CSSCore.js */
/**
 * @generated SignedSource<<c4af5bdb784114fca0e41d8b891448fb>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule CSSCore
 * @typechecks
 */__d('CSSCore',['invariant'],__annotator(function $module_CSSCore(global,require,requireDynamic,requireLazy,module,exports,invariant){if(require.__markCompiled)require.__markCompiled();











var CSSCore={








addClass:__annotator(function(element,className){return __bodyWrapper(this,arguments,function(){
!
!/\s/.test(className)?invariant(0,
'CSSCore.addClass takes only a single class name. "%s" contains ' +
'multiple classes.',className):undefined;


if(className){
if(element.classList){
element.classList.add(className);}else
if(!CSSCore.hasClass(element,className)){
element.className = element.className + ' ' + className;}}


return element;},{params:[[element,'HTMLElement','element'],[className,'string','className']],returns:'HTMLElement'});},{'module':'CSSCore','line':40,'column':12},{params:['HTMLElement','string'],returns:'HTMLElement'}),









removeClass:__annotator(function(element,className){return __bodyWrapper(this,arguments,function(){
!
!/\s/.test(className)?invariant(0,
'CSSCore.removeClass takes only a single class name. "%s" contains ' +
'multiple classes.',className):undefined;


if(className){
if(element.classList){
element.classList.remove(className);}else
if(CSSCore.hasClass(element,className)){
element.className = element.className.
replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)','g'),'$1').
replace(/\s+/g,' ').
replace(/^\s*|\s*$/g,'');}}


return element;},{params:[[element,'HTMLElement','element'],[className,'string','className']],returns:'HTMLElement'});},{'module':'CSSCore','line':64,'column':15},{params:['HTMLElement','string'],returns:'HTMLElement'}),










conditionClass:__annotator(function(element,className,bool){return __bodyWrapper(this,arguments,function(){
return (bool?CSSCore.addClass:CSSCore.removeClass)(element,className);},{params:[[element,'HTMLElement','element'],[className,'string','className']],returns:'HTMLElement'});},{'module':'CSSCore','line':92,'column':18},{params:['HTMLElement','string'],returns:'HTMLElement'}),









hasClass:__annotator(function(element,className){return __bodyWrapper(this,arguments,function(){
!
!/\s/.test(className)?invariant(0,
'CSS.hasClass takes only a single class name.'):undefined;

if(element.classList){
return !!className && element.classList.contains(className);}

return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;},{params:[[element,'DOMNode|DOMWindow','element'],[className,'string','className']],returns:'boolean'});},{'module':'CSSCore','line':103,'column':12},{params:['DOMNode|DOMWindow','string'],returns:'boolean'})};




module.exports = CSSCore;},{'module':'CSSCore','line':0,'column':0,'name':'$module_CSSCore'}),null);
/** Path: html/js/modules/CSS.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule CSS
 * @typechecks
 */__d('CSS',['CSSCore','$'],__annotator(function $module_CSS(global,require,requireDynamic,requireLazy,module,exports,CSSCore){if(require.__markCompiled)require.__markCompiled();

var $=require('$').unsafe;



var hiddenClass='hidden_elem';









var CSS={









setClass:__annotator(function(element,className){return __bodyWrapper(this,arguments,function(){
$(element).className = className || '';
return element;},{params:[[element,'HTMLElement|string','element'],[className,'?string','className']],returns:'HTMLElement|string'});},{'module':'CSS','line':32,'column':12},{params:['HTMLElement|string','?string'],returns:'HTMLElement|string'}),









hasClass:__annotator(function(element,className){return __bodyWrapper(this,arguments,function(){
return CSSCore.hasClass($(element),className);},{params:[[element,'HTMLElement|DOMTextNode|DOMDocument|string','element'],[className,'string','className']],returns:'boolean'});},{'module':'CSS','line':44,'column':12},{params:['HTMLElement|DOMTextNode|DOMDocument|string','string'],returns:'boolean'}),









addClass:__annotator(function(element,className){return __bodyWrapper(this,arguments,function(){
return CSSCore.addClass($(element),className);},{params:[[element,'HTMLElement|string','element'],[className,'string','className']],returns:'HTMLElement'});},{'module':'CSS','line':55,'column':12},{params:['HTMLElement|string','string'],returns:'HTMLElement'}),









removeClass:__annotator(function(element,className){return __bodyWrapper(this,arguments,function(){
return CSSCore.removeClass($(element),className);},{params:[[element,'HTMLElement|string','element'],[className,'string','className']],returns:'HTMLElement'});},{'module':'CSS','line':66,'column':15},{params:['HTMLElement|string','string'],returns:'HTMLElement'}),










conditionClass:__annotator(function(element,className,bool){return __bodyWrapper(this,arguments,function(){
return CSSCore.conditionClass($(element),className,bool);},{params:[[element,'HTMLElement|string','element'],[className,'string','className']],returns:'HTMLElement'});},{'module':'CSS','line':78,'column':18},{params:['HTMLElement|string','string'],returns:'HTMLElement'}),










toggleClass:__annotator(function(element,className){return __bodyWrapper(this,arguments,function(){
return CSS.conditionClass(
element,
className,
!CSS.hasClass(element,className));},{params:[[element,'HTMLElement|string','element'],[className,'string','className']],returns:'HTMLElement'});},{'module':'CSS','line':90,'column':15},{params:['HTMLElement|string','string'],returns:'HTMLElement'}),










shown:__annotator(function(element){return __bodyWrapper(this,arguments,function(){
return !CSS.hasClass(element,hiddenClass);},{params:[[element,'HTMLElement|string','element']],returns:'boolean'});},{'module':'CSS','line':105,'column':9},{params:['HTMLElement|string'],returns:'boolean'}),








hide:__annotator(function(element){return __bodyWrapper(this,arguments,function(){
return CSS.addClass(element,hiddenClass);},{params:[[element,'HTMLElement|string','element']],returns:'HTMLElement'});},{'module':'CSS','line':115,'column':8},{params:['HTMLElement|string'],returns:'HTMLElement'}),








show:__annotator(function(element){return __bodyWrapper(this,arguments,function(){
return CSS.removeClass(element,hiddenClass);},{params:[[element,'HTMLElement|string','element']],returns:'HTMLElement'});},{'module':'CSS','line':125,'column':8},{params:['HTMLElement|string'],returns:'HTMLElement'}),








toggle:__annotator(function(element){return __bodyWrapper(this,arguments,function(){
return CSS.toggleClass(element,hiddenClass);},{params:[[element,'HTMLElement|string','element']],returns:'HTMLElement'});},{'module':'CSS','line':135,'column':10},{params:['HTMLElement|string'],returns:'HTMLElement'}),










conditionShow:__annotator(function(element,bool){return __bodyWrapper(this,arguments,function(){
return CSS.conditionClass(element,hiddenClass,!bool);},{params:[[element,'HTMLElement|string','element']],returns:'HTMLElement'});},{'module':'CSS','line':147,'column':17},{params:['HTMLElement|string'],returns:'HTMLElement'})};



module.exports = CSS;},{'module':'CSS','line':0,'column':0,'name':'$module_CSS'}),null);
/** Path: html/js/deprecated/css-legacy.js */
/**
 * @providesLegacy css
 */__d('legacy:css',['CSS'],__annotator(function $module_legacy_css(global,require,requireDynamic,requireLazy){if(require.__markCompiled)require.__markCompiled();

global.CSS = require('CSS');},{'module':'legacy:css','line':0,'column':0,'name':'$module_legacy_css'}),3);
/** Path: html/js/downstream/core/ge.js */
/**
 * @generated SignedSource<<3f27691147fa33846820db0ee3ff659a>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ge
 */__d('ge',[],__annotator(function $module_ge(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();










function ge(arg,root,tag){
return typeof arg != 'string'?arg:
!root?document.getElementById(arg):
_geFromSubtree(arg,root,tag);}__annotator(ge,{'module':'ge','line':29,'column':0,'name':'ge'});


function _geFromSubtree(id,root,tag){
var elem,children,ii;

if(_getNodeID(root) == id){
return root;}else
if(root.getElementsByTagName){


children = root.getElementsByTagName(tag || '*');
for(ii = 0;ii < children.length;ii++) {
if(_getNodeID(children[ii]) == id){
return children[ii];}}}else


{



children = root.childNodes;
for(ii = 0;ii < children.length;ii++) {
elem = _geFromSubtree(id,children[ii]);
if(elem){
return elem;}}}




return null;}__annotator(_geFromSubtree,{'module':'ge','line':35,'column':0,'name':'_geFromSubtree'});








function _getNodeID(node){

return node.getAttribute?node.getAttribute('id'):null;}__annotator(_getNodeID,{'module':'ge','line':71,'column':0,'name':'_getNodeID'});


module.exports = ge;},{'module':'ge','line':0,'column':0,'name':'$module_ge'}),null);
/** Path: html/js/deprecated/dom-core.js */
/**
 * @providesLegacy dom-core
 */__d('legacy:dom-core',['$','ge'],__annotator(function $module_legacy_dom_core(global,require,requireDynamic,requireLazy){if(require.__markCompiled)require.__markCompiled();

global.$ = global.$ || require('$');
global.ge = require('ge');},{'module':'legacy:dom-core','line':0,'column':0,'name':'$module_legacy_dom_core'}),3);
/** Path: html/js/downstream/core/dom/Parent.js */
/**
 * @generated SignedSource<<bfa7eef19fa7bca0bcfa82e3b4f93d2d>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Parent
 * @typechecks
 */__d('Parent',['CSSCore'],__annotator(function $module_Parent(global,require,requireDynamic,requireLazy,module,exports,CSSCore){if(require.__markCompiled)require.__markCompiled();



var Parent={






byTag:__annotator(function(element,tagName){return __bodyWrapper(this,arguments,function(){
tagName = tagName.toUpperCase();
while(element && element.nodeName !== tagName) {
element = element.parentNode;}

return element;},{params:[[tagName,'string','tagName']]});},{'module':'Parent','line':30,'column':9},{params:['string']}),







byClass:__annotator(function(node,className){return __bodyWrapper(this,arguments,function(){
while(node && !CSSCore.hasClass(node,className)) {
node = node.parentNode;}

return node;},{params:[[className,'string','className']]});},{'module':'Parent','line':43,'column':11},{params:['string']}),







byAttribute:__annotator(function(node,attributeName){return __bodyWrapper(this,arguments,function(){
while(node && (!node.getAttribute || !node.getAttribute(attributeName))) {
node = node.parentNode;}

return node;},{params:[[attributeName,'string','attributeName']]});},{'module':'Parent','line':55,'column':15},{params:['string']})};




module.exports = Parent;},{'module':'Parent','line':0,'column':0,'name':'$module_Parent'}),null);
/** Path: html/js/deprecated/parent.js */
/**
 * @providesLegacy parent
 */__d('legacy:parent',['Parent'],__annotator(function $module_legacy_parent(global,require,requireDynamic,requireLazy){if(require.__markCompiled)require.__markCompiled();

global.Parent = require('Parent');},{'module':'legacy:parent','line':0,'column':0,'name':'$module_legacy_parent'}),3);
/** Path: html/js/modules/Env.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Env
 */__d("Env",[],__annotator(function $module_Env(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var Env={
start:Date.now()};




if(global.Env){
Object.assign(Env,global.Env);




global.Env = undefined;}


module.exports = Env;},{"module":"Env","line":0,"column":0,"name":"$module_Env"}),null);
/** Path: html/js/downstream/error/erx.js */
/**
 * @generated SignedSource<<2655338b5dfd949c13e98821c0578d38>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule erx
 * @typechecks
 * @nostacktrace
 */__d('erx',['ex'],__annotator(function $module_erx(global,require,requireDynamic,requireLazy,module,exports,ex){if(require.__markCompiled)require.__markCompiled();



















var erx=__annotator(function(transformedMessage){return __bodyWrapper(this,arguments,function(){
if(typeof transformedMessage !== 'string'){

return transformedMessage;}


var prefixLeft=transformedMessage.indexOf(ex._prefix);
var suffixLeft=transformedMessage.lastIndexOf(ex._suffix);
if(prefixLeft < 0 || suffixLeft < 0){

return [transformedMessage];}


var prefixRight=prefixLeft + ex._prefix.length;
var suffixRight=suffixLeft + ex._suffix.length;
if(prefixRight >= suffixLeft){
return ['erx slice failure: %s',transformedMessage];}


var leftSlice=transformedMessage.substring(0,prefixLeft);
var rightSlice=transformedMessage.substring(suffixRight);
transformedMessage = transformedMessage.substring(prefixRight,suffixLeft);

var messageWithParams;
try{
messageWithParams = JSON.parse(transformedMessage);
messageWithParams[0] =
leftSlice + messageWithParams[0] + rightSlice;}
catch(err) {
return ['erx parse failure: %s',transformedMessage];}


return messageWithParams;},{params:[[transformedMessage,'string|array<string>','transformedMessage']]});},{'module':'erx','line':40,'column':10},{params:['string|array<string>']});


module.exports = erx;},{'module':'erx','line':0,'column':0,'name':'$module_erx'}),null);
/** Path: html/js/downstream/error/ErrorUtils.js */
/**
 * @generated SignedSource<<8320225fd8c50b1ce02f583a2a53ae98>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ErrorUtils
 * @has-side-effects
 */__d('ErrorUtils',['Env','eprintf','erx'],__annotator(function $module_ErrorUtils(global,require,requireDynamic,requireLazy,module,exports,Env,eprintf,erx){if(require.__markCompiled)require.__markCompiled();



var ErrorUtilsConfig={};





var ANONYMOUS_GUARD_TAG='<anonymous guard>';
var GENERATED_GUARD_TAG='<generated guard>';
var GLOBAL_ERROR_HANDLER_TAG='<window.onerror>';

var HTTP_OR_HTTPS_URI_PATTERN=/^https?:\/\//i;
var TYPECHECKER_ERROR_PATTERN=/^Type Mismatch for/;




var IE_STACK_TRACE_REFERENCES=[
'Unknown script code',
'Function code',
'eval code'];

var IE_STACK_FRAME_PATTERN=
new RegExp('(.*?)(\\s)(?:' + IE_STACK_TRACE_REFERENCES.join('|') + ')$');


var listeners=[];


var sourceResolver;


var history=[];
var MAX_HISTORY=50;

var guardList=[];


var isGuarding=false;



var isReporting=false;

var nocatch=
ErrorUtilsConfig.nocatch ||
/nocatch/.test(location.search);





function normalizeStack(input){
if(!input){
return [];}

var stack=input.split(/\n\n/)[0].
replace(/[\(\)]|\[.*?\]|^\w+:\s.*?\n/g,'').
split('\n').
map(__annotator(function(frame){
var identifier,line,col;

frame = frame.trim();

if(/(:(\d+)(:(\d+))?)$/.test(frame)){
line = RegExp.$2;
col = RegExp.$4;
frame = frame.slice(0,-RegExp.$1.length);}



if(
IE_STACK_FRAME_PATTERN.test(frame) ||
/(.*)(@|\s)[^\s]+$/.test(frame))
{
frame = frame.substring(RegExp.$1.length + 1);
identifier =
/(at)?\s*(.*)([^\s]+|$)/.test(RegExp.$1)?RegExp.$2:'';}


var stackFrame={
identifier:identifier,
script:frame,
line:line,
column:col};


if(sourceResolver){
sourceResolver(stackFrame);}



stackFrame.text = '    at' + (
stackFrame.identifier?' ' + stackFrame.identifier + ' (':' ') +
stackFrame.script + (
stackFrame.line?':' + stackFrame.line:'') + (
stackFrame.column?':' + stackFrame.column:'') + (
stackFrame.identifier?')':'');

return stackFrame;},{'module':'ErrorUtils','line':81,'column':11}));


return stack;}__annotator(normalizeStack,{'module':'ErrorUtils','line':74,'column':0,'name':'normalizeStack'});









function normalizeError(err){
if(!err){
return {};}else
if(err._originalError){
return err;}


var stackData=normalizeStack(err.stackTrace || err.stack);
var stackPopped=false;

if(err.framesToPop){

var framesToPop=err.framesToPop;
var lastPoppedFrame;
while(framesToPop > 0 && stackData.length > 0) {
lastPoppedFrame = stackData.shift();
framesToPop--;
stackPopped = true;}

if(
TYPECHECKER_ERROR_PATTERN.test(err.message) &&
err.framesToPop === 2 &&
lastPoppedFrame)
{





if(HTTP_OR_HTTPS_URI_PATTERN.test(lastPoppedFrame.script)){
err.message += ' at ' + lastPoppedFrame.script + (
lastPoppedFrame.line?':' + lastPoppedFrame.line:'') + (
lastPoppedFrame.column?':' + lastPoppedFrame.column:'');}}


delete err.framesToPop;}


var info={
line:
err.lineNumber ||
err.line,
column:
err.columnNumber ||
err.column,
name:err.name,
message:err.message,
messageWithParams:err.messageWithParams,
type:err.type,
script:
err.fileName ||
err.sourceURL ||
err.script,
stack:stackData.map(__annotator(function(frame){return frame.text;},{'module':'ErrorUtils','line':187,'column':25})).join('\n'),
stackFrames:stackData,
guard:err.guard,
guardList:err.guardList,
extra:err.extra,
snapshot:err.snapshot};


if(typeof info.message === 'string' && !info.messageWithParams){
info.messageWithParams = erx(info.message);
info.message = eprintf.apply(global,info.messageWithParams);}else
{
info.messageObject = info.message;
info.message = String(info.message);}




if(sourceResolver){
sourceResolver(info);}




if(stackPopped){
delete info.script;
delete info.line;
delete info.column;}



if(stackData[0]){
info.script = info.script || stackData[0].script;
info.line = info.line || stackData[0].line;
info.column = info.column || stackData[0].column;}



info._originalError = err;


for(var k in info) {
info[k] == null && delete info[k];}

return info;}__annotator(normalizeError,{'module':'ErrorUtils','line':134,'column':0,'name':'normalizeError'});






function reportError(err,quiet){
if(isReporting){

console.error('Error reported during error processing',err);
return false;}




if(guardList.length > 0){
err.guard = err.guard || guardList[0];
err.guardList = guardList.slice();}


err = normalizeError(err);
if(!quiet){



console.error(err._originalError.message + '\n' +
err.stack + '\n' +
'Original error:' + err._originalError);}



if(history.length > MAX_HISTORY){
history.splice(MAX_HISTORY / 2,1);}

history.push(err);

isReporting = true;
for(var i=0;i < listeners.length;i++) {
try{
listeners[i](err);}
catch(e) {
console.error('Error thrown from listener during error processing',e);}}


isReporting = false;
return true;}__annotator(reportError,{'module':'ErrorUtils','line':238,'column':0,'name':'reportError'});



function inGuard(){
return isGuarding;}__annotator(inGuard,{'module':'ErrorUtils','line':281,'column':0,'name':'inGuard'});


function pushGuard(name){
guardList.unshift(name);
isGuarding = true;}__annotator(pushGuard,{'module':'ErrorUtils','line':285,'column':0,'name':'pushGuard'});


function popGuard(){
guardList.shift();
isGuarding = guardList.length !== 0;}__annotator(popGuard,{'module':'ErrorUtils','line':290,'column':0,'name':'popGuard'});














function applyWithGuard(func,context,args,onError,name){
pushGuard(name || ANONYMOUS_GUARD_TAG);

var returnValue;




if(Env.nocatch){
nocatch = true;}


if(nocatch){
try{
returnValue = func.apply(context,args || []);}finally
{



popGuard();}

return returnValue;}


try{

returnValue = func.apply(context,args || []);
return returnValue;}
catch(ex) {
var err=normalizeError(ex);
if(onError){
onError(err);}



if(func){
err.callee = func.toString().substring(0,100);}

if(args){
err.args = Array.prototype.slice.call(args).toString().substring(0,100);}

err.guard = guardList[0];
err.guardList = guardList.slice();

if(__DEV__){

if(!nocatch && !applyWithGuard.warned){
console.warn('Note: Error catching is enabled, which may lead to ' +
'misleading stack traces in the JS debugger.  To disable, ' +
'whitelist yourself in the "js_nocatch" gatekeeper.  See ' +
'ErrorUtils.js for more info.');
applyWithGuard.warned = true;}}



reportError(err);}finally
{
popGuard();}}__annotator(applyWithGuard,{'module':'ErrorUtils','line':307,'column':0,'name':'applyWithGuard'});













function guard(f,name,context){
name = name || f.name || GENERATED_GUARD_TAG;
function guarded(){
return applyWithGuard(f,context || this,arguments,null,name);}__annotator(guarded,{'module':'ErrorUtils','line':380,'column':2,'name':'guarded'});

if(f.__SMmeta){
guarded.__SMmeta = f.__SMmeta;}


if(__DEV__){
guarded.toString = f.toString.bind(f);}


return guarded;}__annotator(guard,{'module':'ErrorUtils','line':378,'column':0,'name':'guard'});












function onerror(message,script,line,column,error){
error = error || {};
error.message = error.message || message;
error.script = error.script || script;
error.line = error.line || line;
error.column = error.column || column;
error.guard = GLOBAL_ERROR_HANDLER_TAG;
error.guardList = [GLOBAL_ERROR_HANDLER_TAG];
reportError(error,true);}__annotator(onerror,{'module':'ErrorUtils','line':404,'column':0,'name':'onerror'});

window.onerror = onerror;









function addListener(listener,noPlayback){
listeners.push(listener);

if(!noPlayback){
history.forEach(listener);}}__annotator(addListener,{'module':'ErrorUtils','line':424,'column':0,'name':'addListener'});








function setSourceResolver(resolver){
sourceResolver = resolver;}__annotator(setSourceResolver,{'module':'ErrorUtils','line':437,'column':0,'name':'setSourceResolver'});


var ErrorUtils={
ANONYMOUS_GUARD_TAG:ANONYMOUS_GUARD_TAG,
GENERATED_GUARD_TAG:GENERATED_GUARD_TAG,
GLOBAL_ERROR_HANDLER_TAG:GLOBAL_ERROR_HANDLER_TAG,
addListener:addListener,
setSourceResolver:setSourceResolver,
applyWithGuard:applyWithGuard,
guard:guard,
history:history,
inGuard:inGuard,
normalizeError:normalizeError,
onerror:onerror,
reportError:reportError};


module.exports = global.ErrorUtils = ErrorUtils;


if(typeof __t === 'function' && __t.setHandler){
__t.setHandler(reportError);}},{'module':'ErrorUtils','line':0,'column':0,'name':'$module_ErrorUtils'}),6);
/** Path: html/js/downstream/callback_manager/CallbackDependencyManager.js */
/**
 * @generated SignedSource<<ef284e44ba84ac907779894992a45086>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule CallbackDependencyManager
 * @typechecks
 *
 * This is a minimal version of a "callback manager" that varies slightly from
 * the [Keyed|Ranged]CallbackManager classes. Its currently intended for use
 * within Bootloader and Arbiter.registerCallback(), but there are plans to come
 * back to this and generalize it so it can be used as part of the
 * implementation of the [Keyed|Ranged]CallbackManager classes (see #2153027).
 *
 * The primary intent of this class is to address the pattern where a callback
 * needs to be called only when a *set* of dependency signals/events have been
 * marked as satisfied.
 *
 * Example:
 * In Bootloader we want to be able to fire a callback only after two
 * independent JS files finish downloading. To do this, we would do something
 * like:
 *
 *   function onBothFilesLoaded() {
 *     alert('Both JS files are now loaded!');
 *   }
 *
 *   var callbackManager = new CallbackDependencyManager();
 *   callbackManager.registerCallback(
 *     onBothFilesLoaded,
 *     ['file1', 'file2']
 *   );
 *
 *  FileLoader.load('file1', function() {
 *    callbackManager.satisfyPersistentResource('file1');
 *  });
 *
 *  FileLoader.load('file2', function() {
 *    callbackManager.satisfyPersistentDependency('file2');
 *  });
 *
 */__d('CallbackDependencyManager',['ErrorUtils'],__annotator(function $module_CallbackDependencyManager(global,require,requireDynamic,requireLazy,module,exports,ErrorUtils){if(require.__markCompiled)require.__markCompiled();




function CallbackDependencyManager(){'use strict';
this.$CallbackDependencyManager_callbackDependencyCounts = {};
this.$CallbackDependencyManager_callbacks = {};
this.$CallbackDependencyManager_lastCallbackID = 1;
this.$CallbackDependencyManager_satisfiedDependencies = {};}__annotator(CallbackDependencyManager,{'module':'CallbackDependencyManager','line':58,'column':2,'name':'CallbackDependencyManager'});CallbackDependencyManager.prototype.






$CallbackDependencyManager_addDependenciesToCallback = __annotator(function(callbackID,deps){return __bodyWrapper(this,arguments,function(){'use strict';
var pendingDepCount=0;
var uniqDeps={};
for(var i=0,il=deps.length;i < il;i++) {
uniqDeps[deps[i]] = 1;}


for(var depName in uniqDeps) {
if(this.$CallbackDependencyManager_satisfiedDependencies[depName]){
continue;}

pendingDepCount++;


if(this.$CallbackDependencyManager_callbackDependencyCounts[depName] === undefined){
this.$CallbackDependencyManager_callbackDependencyCounts[depName] = {};}

this.$CallbackDependencyManager_callbackDependencyCounts[depName][callbackID] =
(this.$CallbackDependencyManager_callbackDependencyCounts[depName][callbackID] || 0) + 1;}


return pendingDepCount;},{params:[[callbackID,'number','callbackID'],[deps,'array<string>','deps']]});},{'module':'CallbackDependencyManager','line':69,'column':28},{params:['number','array<string>']});CallbackDependencyManager.prototype.





$CallbackDependencyManager_resolveCallbacksForDependency = __annotator(function(depName){return __bodyWrapper(this,arguments,function(){'use strict';
if(!this.$CallbackDependencyManager_callbackDependencyCounts[depName]){
return;}


for(var callbackID in this.$CallbackDependencyManager_callbackDependencyCounts[depName]) {
this.$CallbackDependencyManager_callbackDependencyCounts[depName][callbackID]--;
if(this.$CallbackDependencyManager_callbackDependencyCounts[depName][callbackID] <= 0){
delete this.$CallbackDependencyManager_callbackDependencyCounts[depName][callbackID];}


this.$CallbackDependencyManager_callbacks[callbackID].$CallbackDependencyManager_pendingDepCount--;
if(this.$CallbackDependencyManager_callbacks[callbackID].$CallbackDependencyManager_pendingDepCount <= 0){
var callback=this.$CallbackDependencyManager_callbacks[callbackID].$CallbackDependencyManager_callback;
delete this.$CallbackDependencyManager_callbacks[callbackID];
ErrorUtils.applyWithGuard(callback);}}},{params:[[depName,'string','depName']]});},{'module':'CallbackDependencyManager','line':96,'column':32},{params:['string']});CallbackDependencyManager.prototype.









addDependenciesToExistingCallback = __annotator(function(callbackID,newDeps){return __bodyWrapper(this,arguments,function(){'use strict';
if(!this.$CallbackDependencyManager_callbacks[callbackID]){
return null;}

var pendingDepCount=this.$CallbackDependencyManager_addDependenciesToCallback(callbackID,newDeps);
this.$CallbackDependencyManager_callbacks[callbackID].$CallbackDependencyManager_pendingDepCount += pendingDepCount;
return callbackID;},{params:[[callbackID,'number','callbackID'],[newDeps,'array<string>','newDeps']],returns:'?number'});},{'module':'CallbackDependencyManager','line':121,'column':35},{params:['number','array<string>'],returns:'?number'});CallbackDependencyManager.prototype.






isPersistentDependencySatisfied = __annotator(function(depName){return __bodyWrapper(this,arguments,function(){'use strict';
return !!this.$CallbackDependencyManager_satisfiedDependencies[depName];},{params:[[depName,'string','depName']],returns:'boolean'});},{'module':'CallbackDependencyManager','line':134,'column':33},{params:['string'],returns:'boolean'});CallbackDependencyManager.prototype.








satisfyPersistentDependency = __annotator(function(depName){return __bodyWrapper(this,arguments,function(){'use strict';
this.$CallbackDependencyManager_satisfiedDependencies[depName] = 1;
this.$CallbackDependencyManager_resolveCallbacksForDependency(depName);},{params:[[depName,'string','depName']]});},{'module':'CallbackDependencyManager','line':144,'column':29},{params:['string']});CallbackDependencyManager.prototype.








satisfyNonPersistentDependency = __annotator(function(depName){return __bodyWrapper(this,arguments,function(){'use strict';
var alreadySatisfied=this.$CallbackDependencyManager_satisfiedDependencies[depName] === 1;
if(!alreadySatisfied){
this.$CallbackDependencyManager_satisfiedDependencies[depName] = 1;}

this.$CallbackDependencyManager_resolveCallbacksForDependency(depName);
if(!alreadySatisfied){
delete this.$CallbackDependencyManager_satisfiedDependencies[depName];}},{params:[[depName,'string','depName']]});},{'module':'CallbackDependencyManager','line':155,'column':32},{params:['string']});CallbackDependencyManager.prototype.








registerCallback = __annotator(function(callback,deps){return __bodyWrapper(this,arguments,function(){'use strict';
var callbackID=this.$CallbackDependencyManager_lastCallbackID;
this.$CallbackDependencyManager_lastCallbackID++;
var pendingDepCount=this.$CallbackDependencyManager_addDependenciesToCallback(callbackID,deps);




if(pendingDepCount === 0){
ErrorUtils.applyWithGuard(callback);
return null;}


this.$CallbackDependencyManager_callbacks[callbackID] = {
$CallbackDependencyManager_callback:callback,
$CallbackDependencyManager_pendingDepCount:pendingDepCount};


return callbackID;},{params:[[callback,'function','callback'],[deps,'array<string>','deps']],returns:'?number'});},{'module':'CallbackDependencyManager','line':171,'column':18},{params:['function','array<string>'],returns:'?number'});CallbackDependencyManager.prototype.





unsatisfyPersistentDependency = __annotator(function(depName){return __bodyWrapper(this,arguments,function(){'use strict';
delete this.$CallbackDependencyManager_satisfiedDependencies[depName];},{params:[[depName,'string','depName']]});},{'module':'CallbackDependencyManager','line':195,'column':31},{params:['string']});



module.exports = CallbackDependencyManager;},{'module':'CallbackDependencyManager','line':0,'column':0,'name':'$module_CallbackDependencyManager'}),null);
/** Path: html/js/downstream/emitter/EventSubscription.js */
/**
 * @generated SignedSource<<3cdc05202ead86618e4b4d6bce24a6b7>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule EventSubscription
 * @typechecks
 */__d('EventSubscription',[],__annotator(function $module_EventSubscription(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

'use strict';













function EventSubscription(subscriber){
this.subscriber = subscriber;}__annotator(EventSubscription,{'module':'EventSubscription','line':35,'column':2,'name':'EventSubscription'});EventSubscription.prototype.





remove = __annotator(function(){
if(this.subscriber){
this.subscriber.removeSubscription(this);
this.subscriber = null;}},{'module':'EventSubscription','line':42,'column':8});




module.exports = EventSubscription;},{'module':'EventSubscription','line':0,'column':0,'name':'$module_EventSubscription'}),null);
/** Path: html/js/downstream/emitter/EmitterSubscription.js */
/**
 * @generated SignedSource<<567bf28373e3dc774b56949f996eef32>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule EmitterSubscription
 * @typechecks
 */__d('EmitterSubscription',['EventSubscription'],__annotator(function $module_EmitterSubscription(global,require,requireDynamic,requireLazy,module,exports,EventSubscription){if(require.__markCompiled)require.__markCompiled();var _EventSubscription,_superProto;

'use strict';_EventSubscription =






EventSubscription;_superProto = _EventSubscription && _EventSubscription.prototype;Object.assign(EmitterSubscription,_EventSubscription);EmitterSubscription.prototype = Object.create(_EventSubscription.prototype);EmitterSubscription.prototype.constructor = EmitterSubscription;EmitterSubscription.__superConstructor__ = _EventSubscription;









function EmitterSubscription(subscriber,listener,context){return __bodyWrapper(this,arguments,function(){
_superProto.constructor.call(this,subscriber);
this.listener = listener;
this.context = context;},{params:[[listener,'function','listener'],[context,'?object','context']]});}__annotator(EmitterSubscription,{'module':'EmitterSubscription','line':38,'column':2,'name':'EmitterSubscription'},{params:['function','?object']});



module.exports = EmitterSubscription;},{'module':'EmitterSubscription','line':0,'column':0,'name':'$module_EmitterSubscription'}),null);
/** Path: html/js/downstream/emitter/EventSubscriptionVendor.js */
/**
 * @generated SignedSource<<71176b75352a63aeefa194cd71b02d27>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule EventSubscriptionVendor
 * @typechecks
 */__d('EventSubscriptionVendor',['invariant'],__annotator(function $module_EventSubscriptionVendor(global,require,requireDynamic,requireLazy,module,exports,invariant){if(require.__markCompiled)require.__markCompiled();

'use strict';









function EventSubscriptionVendor(){
this.$EventSubscriptionVendor_subscriptionsForType = {};
this.$EventSubscriptionVendor_currentSubscription = null;}__annotator(EventSubscriptionVendor,{'module':'EventSubscriptionVendor','line':31,'column':2,'name':'EventSubscriptionVendor'});EventSubscriptionVendor.prototype.








addSubscription = __annotator(function(
eventType,subscription){
!(
subscription.subscriber === this)?invariant(0,
'The subscriber of the subscription is incorrectly set.'):undefined;
if(!this.$EventSubscriptionVendor_subscriptionsForType[eventType]){
this.$EventSubscriptionVendor_subscriptionsForType[eventType] = [];}

var key=this.$EventSubscriptionVendor_subscriptionsForType[eventType].length;
this.$EventSubscriptionVendor_subscriptionsForType[eventType].push(subscription);
subscription.eventType = eventType;
subscription.key = key;
return subscription;},{'module':'EventSubscriptionVendor','line':42,'column':17});EventSubscriptionVendor.prototype.








removeAllSubscriptions = __annotator(function(eventType){
if(eventType === undefined){
this.$EventSubscriptionVendor_subscriptionsForType = {};}else
{
delete this.$EventSubscriptionVendor_subscriptionsForType[eventType];}},{'module':'EventSubscriptionVendor','line':63,'column':24});EventSubscriptionVendor.prototype.









removeSubscription = __annotator(function(subscription){return __bodyWrapper(this,arguments,function(){
var eventType=subscription.eventType;
var key=subscription.key;

var subscriptionsForType=this.$EventSubscriptionVendor_subscriptionsForType[eventType];
if(subscriptionsForType){
delete subscriptionsForType[key];}},{params:[[subscription,'object','subscription']]});},{'module':'EventSubscriptionVendor','line':77,'column':20},{params:['object']});EventSubscriptionVendor.prototype.















getSubscriptionsForType = __annotator(function(eventType){return __bodyWrapper(this,arguments,function(){
return this.$EventSubscriptionVendor_subscriptionsForType[eventType];},{returns:'?array'});},{'module':'EventSubscriptionVendor','line':99,'column':25},{returns:'?array'});



module.exports = EventSubscriptionVendor;},{'module':'EventSubscriptionVendor','line':0,'column':0,'name':'$module_EventSubscriptionVendor'}),null);
/** Path: html/js/downstream/core/emptyFunction.js */
/**
 * @generated SignedSource<<917fb0b0785cff415a4d268b652c4f38>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule emptyFunction
 */__d("emptyFunction",[],__annotator(function $module_emptyFunction(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

function makeEmptyFunction(arg){
return __annotator(function(){
return arg;},{"module":"emptyFunction","line":21,"column":9});}__annotator(makeEmptyFunction,{"module":"emptyFunction","line":20,"column":0,"name":"makeEmptyFunction"});








function emptyFunction(){}__annotator(emptyFunction,{"module":"emptyFunction","line":31,"column":0,"name":"emptyFunction"});

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = __annotator(function(){return this;},{"module":"emptyFunction","line":37,"column":32});
emptyFunction.thatReturnsArgument = __annotator(function(arg){return arg;},{"module":"emptyFunction","line":38,"column":36});

module.exports = emptyFunction;},{"module":"emptyFunction","line":0,"column":0,"name":"$module_emptyFunction"}),null);
/** Path: html/js/downstream/emitter/BaseEventEmitter.js */
/**
 * @generated SignedSource<<90a17ed852f8b85239acd3ec767aa667>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule BaseEventEmitter
 * @typechecks
 */__d('BaseEventEmitter',['EmitterSubscription','EventSubscriptionVendor','emptyFunction','invariant'],__annotator(function $module_BaseEventEmitter(global,require,requireDynamic,requireLazy,module,exports,EmitterSubscription,EventSubscriptionVendor,emptyFunction,invariant){if(require.__markCompiled)require.__markCompiled();
























function BaseEventEmitter(){'use strict';
this.$BaseEventEmitter_subscriber = new EventSubscriptionVendor();
this.$BaseEventEmitter_currentSubscription = null;}__annotator(BaseEventEmitter,{'module':'BaseEventEmitter','line':44,'column':2,'name':'BaseEventEmitter'});BaseEventEmitter.prototype.
















addListener = __annotator(function(
eventType,listener,context){return __bodyWrapper(this,arguments,function(){'use strict';
return this.$BaseEventEmitter_subscriber.addSubscription(
eventType,
new EmitterSubscription(this.$BaseEventEmitter_subscriber,listener,context));},{params:[[eventType,'string','eventType'],[listener,'function','listener'],[context,'?object','context']],returns:'EmitterSubscription'});},{'module':'BaseEventEmitter','line':63,'column':13},{params:['string','function','?object'],returns:'EmitterSubscription'});BaseEventEmitter.prototype.












once = __annotator(function(eventType,listener,context){return __bodyWrapper(this,arguments,function(){'use strict';
var emitter=this;
return this.addListener(eventType,__annotator(function(){
emitter.removeCurrentListener();
listener.apply(context,arguments);},{'module':'BaseEventEmitter','line':82,'column':39}));},{params:[[eventType,'string','eventType'],[listener,'function','listener'],[context,'?object','context']],returns:'EmitterSubscription'});},{'module':'BaseEventEmitter','line':80,'column':6},{params:['string','function','?object'],returns:'EmitterSubscription'});BaseEventEmitter.prototype.










removeAllListeners = __annotator(function(eventType){'use strict';
this.$BaseEventEmitter_subscriber.removeAllSubscriptions(eventType);},{'module':'BaseEventEmitter','line':95,'column':20});BaseEventEmitter.prototype.























removeCurrentListener = __annotator(function(){'use strict';
!
!!this.$BaseEventEmitter_currentSubscription?invariant(0,
'Not in an emitting cycle; there is no current subscription'):undefined;

this.$BaseEventEmitter_subscriber.removeSubscription(this.$BaseEventEmitter_currentSubscription);},{'module':'BaseEventEmitter','line':120,'column':23});BaseEventEmitter.prototype.









listeners = __annotator(function(eventType){return __bodyWrapper(this,arguments,function(){'use strict';
var subscriptions=this.$BaseEventEmitter_subscriber.getSubscriptionsForType(eventType);
return subscriptions?
subscriptions.filter(emptyFunction.thatReturnsTrue).map(__annotator(
function(subscription){
return subscription.listener;},{'module':'BaseEventEmitter','line':139,'column':10})):

[];},{params:[[eventType,'string','eventType']],returns:'array'});},{'module':'BaseEventEmitter','line':135,'column':11},{params:['string'],returns:'array'});BaseEventEmitter.prototype.
















emit = __annotator(function(eventType){return __bodyWrapper(this,arguments,function(){'use strict';
var subscriptions=this.$BaseEventEmitter_subscriber.getSubscriptionsForType(eventType);
if(subscriptions){
var keys=Object.keys(subscriptions);
for(var ii=0;ii < keys.length;ii++) {
var key=keys[ii];
var subscription=subscriptions[key];

if(subscription){
this.$BaseEventEmitter_currentSubscription = subscription;
this.__emitToSubscription.apply(
this,
[subscription].concat(Array.prototype.slice.call(arguments)));}}



this.$BaseEventEmitter_currentSubscription = null;}},{params:[[eventType,'string','eventType']]});},{'module':'BaseEventEmitter','line':159,'column':6},{params:['string']});BaseEventEmitter.prototype.












__emitToSubscription = __annotator(function(subscription,eventType){return __bodyWrapper(this,arguments,function(){'use strict';
var args=Array.prototype.slice.call(arguments,2);
subscription.listener.apply(subscription.context,args);},{params:[[subscription,'EmitterSubscription','subscription'],[eventType,'string','eventType']]});},{'module':'BaseEventEmitter','line':188,'column':22},{params:['EmitterSubscription','string']});



module.exports = BaseEventEmitter;},{'module':'BaseEventEmitter','line':0,'column':0,'name':'$module_BaseEventEmitter'}),null);
/** Path: html/js/downstream/struct/CircularBuffer.js */
/**
 * @generated SignedSource<<347249440b5f3fdae8030c092194b1a9>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule CircularBuffer
 */__d('CircularBuffer',['invariant'],__annotator(function $module_CircularBuffer(global,require,requireDynamic,requireLazy,module,exports,invariant){if(require.__markCompiled)require.__markCompiled();




function CircularBuffer(size){'use strict';
!(
size > 0)?invariant(0,
'Buffer size should be a positive integer'):undefined;

this.$CircularBuffer_size = size;
this.$CircularBuffer_head = 0;
this.$CircularBuffer_buffer = [];}__annotator(CircularBuffer,{'module':'CircularBuffer','line':23,'column':2,'name':'CircularBuffer'});CircularBuffer.prototype.


write = __annotator(function(entry){'use strict';
if(this.$CircularBuffer_buffer.length < this.$CircularBuffer_size){
this.$CircularBuffer_buffer.push(entry);}else
{
this.$CircularBuffer_buffer[this.$CircularBuffer_head] = entry;
this.$CircularBuffer_head++;
this.$CircularBuffer_head %= this.$CircularBuffer_size;}

return this;},{'module':'CircularBuffer','line':33,'column':7});CircularBuffer.prototype.


read = __annotator(function(){'use strict';
return this.$CircularBuffer_buffer.slice(this.$CircularBuffer_head).concat(
this.$CircularBuffer_buffer.slice(0,this.$CircularBuffer_head));},{'module':'CircularBuffer','line':44,'column':6});CircularBuffer.prototype.



clear = __annotator(function(){'use strict';
this.$CircularBuffer_head = 0;
this.$CircularBuffer_buffer = [];
return this;},{'module':'CircularBuffer','line':50,'column':7});



module.exports = CircularBuffer;},{'module':'CircularBuffer','line':0,'column':0,'name':'$module_CircularBuffer'}),null);
/** Path: html/js/downstream/logging/LogBuffer.js */
/**
 * @generated SignedSource<<eb81601e6a0358d3a0543c6f6a7845c4>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule LogBuffer
 * @nostacktrace
 */__d('LogBuffer',['CircularBuffer'],__annotator(function $module_LogBuffer(global,require,requireDynamic,requireLazy,module,exports,CircularBuffer){if(require.__markCompiled)require.__markCompiled();







var setTimeout=global.setTimeout.nativeBackup || global.setTimeout;
































var DEFAULT_RETENTION=5000;


var buffers={};

var tailers={};

var LogBuffer={
write:__annotator(function(category,log){
var buffer=
buffers[category] =
buffers[category] || new CircularBuffer(DEFAULT_RETENTION);

buffer.write(log);

if(tailers[category]){
tailers[category].forEach(__annotator(function(tailer){
try{
tailer(log);}
catch(e) {}},{'module':'LogBuffer','line':76,'column':32}));}},{'module':'LogBuffer','line':68,'column':9}),






read:__annotator(function(category){
if(!buffers[category]){
return [];}else
{
return buffers[category].read();}},{'module':'LogBuffer','line':86,'column':8}),



tail:__annotator(function(category,callback){
if(typeof callback !== 'function'){
return;}


tailers[category] = tailers[category] || [];
tailers[category].push(callback);

if(buffers[category]){
var buffer=buffers[category];

buffer.read().forEach(__annotator(function(log){
try{
callback(log);}
catch(e) {}},{'module':'LogBuffer','line':105,'column':28}));}},{'module':'LogBuffer','line':94,'column':8}),






clear:__annotator(function(category){
if(buffers[category]){

setTimeout(__annotator(function(){
buffers[category].clear();},{'module':'LogBuffer','line':118,'column':17}),
0);}},{'module':'LogBuffer','line':115,'column':9})};




module.exports = LogBuffer;},{'module':'LogBuffer','line':0,'column':0,'name':'$module_LogBuffer'}),null);
/** Path: html/js/downstream/core/ExecutionEnvironment.js */
/**
 * @generated SignedSource<<96f319f13974e64cfb3cefe564ecdfa6>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ExecutionEnvironment
 */__d('ExecutionEnvironment',[],__annotator(function $module_ExecutionEnvironment(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

'use strict';

var canUseDOM=!!(
typeof window !== 'undefined' &&
window.document &&
window.document.createElement);








var ExecutionEnvironment={

canUseDOM:canUseDOM,

canUseWorkers:typeof Worker !== 'undefined',

canUseEventListeners:
canUseDOM && !!(window.addEventListener || window.attachEvent),

canUseViewport:canUseDOM && !!window.screen,

isInWorker:!canUseDOM};



module.exports = ExecutionEnvironment;},{'module':'ExecutionEnvironment','line':0,'column':0,'name':'$module_ExecutionEnvironment'}),null);
/** Path: html/js/downstream/performance/performance.js */
/**
 * @generated SignedSource<<2297abaae169fe11df55dc01159d52e4>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule performance
 * @typechecks
 */__d('performance',['ExecutionEnvironment'],__annotator(function $module_performance(global,require,requireDynamic,requireLazy,module,exports,ExecutionEnvironment){if(require.__markCompiled)require.__markCompiled();

'use strict';



var performance;

if(ExecutionEnvironment.canUseDOM){
performance =
window.performance ||
window.msPerformance ||
window.webkitPerformance;}


module.exports = performance || {};},{'module':'performance','line':0,'column':0,'name':'$module_performance'}),null);
/** Path: html/js/downstream/performance/performanceNow.js */
/**
 * @generated SignedSource<<27e04dbbfe3fac24d389bf47eeec07cd>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule performanceNow
 * @typechecks
 */__d('performanceNow',['performance'],__annotator(function $module_performanceNow(global,require,requireDynamic,requireLazy,module,exports,performance){if(require.__markCompiled)require.__markCompiled();


var curPerformance=performance;






if(!curPerformance || !curPerformance.now){
curPerformance = Date;}


var performanceNow=curPerformance.now.bind(curPerformance);

module.exports = performanceNow;},{'module':'performanceNow','line':0,'column':0,'name':'$module_performanceNow'}),null);
/** Path: html/js/downstream/emitter/internal/EventEmitter.js */
/**
 * @generated SignedSource<<ff22376c568c3fc65a840c751490006c>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule EventEmitter
 * @typechecks
 */__d('EventEmitter',['BaseEventEmitter','ErrorUtils','LogBuffer','performanceNow'],__annotator(function $module_EventEmitter(global,require,requireDynamic,requireLazy,module,exports,BaseEventEmitter,ErrorUtils,LogBuffer,performanceNow){if(require.__markCompiled)require.__markCompiled();var _BaseEventEmitter,_superProto;_BaseEventEmitter =











BaseEventEmitter;_superProto = _BaseEventEmitter && _BaseEventEmitter.prototype;Object.assign(EventEmitter,_BaseEventEmitter);EventEmitter.prototype = Object.create(_BaseEventEmitter.prototype);EventEmitter.prototype.constructor = EventEmitter;EventEmitter.__superConstructor__ = _BaseEventEmitter;EventEmitter.prototype.
__emitToSubscription = __annotator(function(subscription,eventType){'use strict';
var functionMeta=
subscription.listener.__SMmeta ||
{
name:subscription.listener.name || '<anonymous function>'};

var start=performanceNow();
ErrorUtils.applyWithGuard(
subscription.listener,
subscription.context,
Array.prototype.slice.call(arguments,2),
null,
'EventEmitter:' + eventType);

var time=performanceNow() - start;
LogBuffer.write('event_handler_performance',{
functionMeta:functionMeta,
time:time,
context:eventType});},{'module':'EventEmitter','line':32,'column':22});function EventEmitter(){'use strict';_BaseEventEmitter.apply(this,arguments);}__annotator(EventEmitter,{'module':'EventEmitter','line':0,'column':0,'name':'EventEmitter'});




module.exports = EventEmitter;},{'module':'EventEmitter','line':0,'column':0,'name':'$module_EventEmitter'}),null);
/** Path: html/js/downstream/emitter/internal/EventEmitterWithHolding.js */
/**
 * @generated SignedSource<<9935f2849a5b8262574cd0b1c0e49c8e>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule EventEmitterWithHolding
 * @typechecks
 */__d('EventEmitterWithHolding',[],__annotator(function $module_EventEmitterWithHolding(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

'use strict';























function EventEmitterWithHolding(emitter,holder){
this.$EventEmitterWithHolding_emitter = emitter;
this.$EventEmitterWithHolding_eventHolder = holder;
this.$EventEmitterWithHolding_currentEventToken = null;
this.$EventEmitterWithHolding_heldEventsRemovalStack = [];
this.$EventEmitterWithHolding_heldEventsEmitDepth = 0;}__annotator(EventEmitterWithHolding,{'module':'EventEmitterWithHolding','line':45,'column':2,'name':'EventEmitterWithHolding'});EventEmitterWithHolding.prototype.





addListener = __annotator(function(eventType,listener,context){return __bodyWrapper(this,arguments,function(){
return this.$EventEmitterWithHolding_emitter.addListener(eventType,listener,context);},{params:[[context,'?object','context']]});},{'module':'EventEmitterWithHolding','line':56,'column':13},{params:['?object']});EventEmitterWithHolding.prototype.





once = __annotator(function(eventType,listener,context){return __bodyWrapper(this,arguments,function(){
return this.$EventEmitterWithHolding_emitter.once(eventType,listener,context);},{params:[[context,'?object','context']]});},{'module':'EventEmitterWithHolding','line':63,'column':6},{params:['?object']});EventEmitterWithHolding.prototype.






















addRetroactiveListener = __annotator(function(
eventType,listener,context){return __bodyWrapper(this,arguments,function(){
var subscription=this.$EventEmitterWithHolding_emitter.addListener(eventType,listener,context);

var removeListenerStack=this.$EventEmitterWithHolding_heldEventsRemovalStack;
removeListenerStack.push(false);
this.$EventEmitterWithHolding_heldEventsEmitDepth++;
this.$EventEmitterWithHolding_eventHolder.emitToListener(eventType,listener,context);
this.$EventEmitterWithHolding_heldEventsEmitDepth--;

if(removeListenerStack[removeListenerStack.length - 1]){
subscription.remove();}

removeListenerStack.pop();

return subscription;},{params:[[listener,'function','listener'],[context,'?object','context']]});},{'module':'EventEmitterWithHolding','line':87,'column':24},{params:['function','?object']});EventEmitterWithHolding.prototype.





removeAllListeners = __annotator(function(eventType){
this.$EventEmitterWithHolding_emitter.removeAllListeners(eventType);},{'module':'EventEmitterWithHolding','line':108,'column':20});EventEmitterWithHolding.prototype.





removeCurrentListener = __annotator(function(){
if(this.$EventEmitterWithHolding_heldEventsEmitDepth){
var removeListenerStack=this.$EventEmitterWithHolding_heldEventsRemovalStack;
removeListenerStack[removeListenerStack.length - 1] = true;}else
{
this.$EventEmitterWithHolding_emitter.removeCurrentListener();}},{'module':'EventEmitterWithHolding','line':115,'column':23});EventEmitterWithHolding.prototype.






listeners = __annotator(function(eventType){
return this.$EventEmitterWithHolding_emitter.listeners(eventType);},{'module':'EventEmitterWithHolding','line':127,'column':11});EventEmitterWithHolding.prototype.





emit = __annotator(function(eventType,a,b,c,d,e,_){
this.$EventEmitterWithHolding_emitter.emit(eventType,a,b,c,d,e,_);},{'module':'EventEmitterWithHolding','line':134,'column':6});EventEmitterWithHolding.prototype.

















emitAndHold = __annotator(function(eventType,a,b,c,d,e,_){
this.$EventEmitterWithHolding_currentEventToken = this.$EventEmitterWithHolding_eventHolder.holdEvent(
eventType,
a,b,c,d,e,_);

this.$EventEmitterWithHolding_emitter.emit(eventType,a,b,c,d,e,_);
this.$EventEmitterWithHolding_currentEventToken = null;},{'module':'EventEmitterWithHolding','line':153,'column':13});EventEmitterWithHolding.prototype.





releaseCurrentEvent = __annotator(function(){
if(this.$EventEmitterWithHolding_currentEventToken !== null){
this.$EventEmitterWithHolding_eventHolder.releaseEvent(this.$EventEmitterWithHolding_currentEventToken);}else
if(!!this.$EventEmitterWithHolding_heldEventsEmitDepth){
this.$EventEmitterWithHolding_eventHolder.releaseCurrentEvent();}},{'module':'EventEmitterWithHolding','line':165,'column':21});EventEmitterWithHolding.prototype.







releaseHeldEventType = __annotator(function(eventType){
this.$EventEmitterWithHolding_eventHolder.releaseEventType(eventType);},{'module':'EventEmitterWithHolding','line':177,'column':22});



module.exports = EventEmitterWithHolding;},{'module':'EventEmitterWithHolding','line':0,'column':0,'name':'$module_EventEmitterWithHolding'}),null);
/** Path: html/js/downstream/emitter/internal/EventHolder.js */
/**
 * @generated SignedSource<<37c5d574368490b658432aaf25abf075>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule EventHolder
 * @typechecks
 */__d('EventHolder',['invariant'],__annotator(function $module_EventHolder(global,require,requireDynamic,requireLazy,module,exports,invariant){if(require.__markCompiled)require.__markCompiled();

'use strict';




function EventHolder(){
this.$EventHolder_heldEvents = {};
this.$EventHolder_currentEventKey = [];}__annotator(EventHolder,{'module':'EventHolder','line':26,'column':2,'name':'EventHolder'});EventHolder.prototype.























holdEvent = __annotator(function(eventType,a,b,c,d,e,_){return __bodyWrapper(this,arguments,function(){
this.$EventHolder_heldEvents[eventType] = this.$EventHolder_heldEvents[eventType] || [];
var eventsOfType=this.$EventHolder_heldEvents[eventType];
var key={
eventType:eventType,
index:eventsOfType.length};

eventsOfType.push([a,b,c,d,e,_]);
return key;},{returns:'object'});},{'module':'EventHolder','line':52,'column':11},{returns:'object'});EventHolder.prototype.










emitToListener = __annotator(function(eventType,listener,context){return __bodyWrapper(this,arguments,function(){
var eventsOfType=this.$EventHolder_heldEvents[eventType];
if(!eventsOfType){
return;}

eventsOfType.forEach(__annotator(function(eventHeld,index){
if(!eventHeld){
return;}

this.$EventHolder_currentEventKey.push({
eventType:eventType,
index:index});

listener.apply(context,eventHeld);
this.$EventHolder_currentEventKey.pop();},{'module':'EventHolder','line':76,'column':25}).bind(this));},{params:[[listener,'function','listener'],[context,'?object','context']]});},{'module':'EventHolder','line':71,'column':16},{params:['function','?object']});EventHolder.prototype.











releaseCurrentEvent = __annotator(function(){
!
this.$EventHolder_currentEventKey.length?invariant(0,
'Not in an emitting cycle; there is no current event'):undefined;

this.releaseEvent(this.$EventHolder_currentEventKey[this.$EventHolder_currentEventKey.length - 1]);},{'module':'EventHolder','line':97,'column':21});EventHolder.prototype.








releaseEvent = __annotator(function(token){return __bodyWrapper(this,arguments,function(){
delete this.$EventHolder_heldEvents[token.eventType][token.index];},{params:[[token,'object','token']]});},{'module':'EventHolder','line':111,'column':14},{params:['object']});EventHolder.prototype.







releaseEventType = __annotator(function(type){
this.$EventHolder_heldEvents[type] = [];},{'module':'EventHolder','line':120,'column':18});



module.exports = EventHolder;},{'module':'EventHolder','line':0,'column':0,'name':'$module_EventHolder'}),null);
/** Path: html/js/downstream/core/toArray.js */
/**
 * @generated SignedSource<<8938247b881845c61099ca4e342917b8>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule toArray
 * @typechecks
 */__d('toArray',['invariant'],__annotator(function $module_toArray(global,require,requireDynamic,requireLazy,module,exports,invariant){if(require.__markCompiled)require.__markCompiled();












function toArray(obj){return __bodyWrapper(this,arguments,function(){
var length=obj.length;



!(
!Array.isArray(obj) && (
typeof obj === 'object' || typeof obj === 'function'))?invariant(0,
'toArray: Array-like object expected'):undefined;


!(
typeof length === 'number')?invariant(0,
'toArray: Object needs a length property'):undefined;


!(
length === 0 ||
length - 1 in obj)?invariant(0,
'toArray: Object should have keys for indices'):undefined;





if(obj.hasOwnProperty){
try{
return Array.prototype.slice.call(obj);}
catch(e) {}}






var ret=Array(length);
for(var ii=0;ii < length;ii++) {
ret[ii] = obj[ii];}

return ret;},{params:[[obj,'object|function|filelist','obj']],returns:'array'});}__annotator(toArray,{'module':'toArray','line':32,'column':0,'name':'toArray'},{params:['object|function|filelist'],returns:'array'});


module.exports = toArray;},{'module':'toArray','line':0,'column':0,'name':'$module_toArray'}),null);
/** Path: html/js/downstream/core/createArrayFromMixed.js */
/**
 * @generated SignedSource<<e8fb0b20d8f70774abd56babec4a245b>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule createArrayFromMixed
 * @typechecks
 */__d('createArrayFromMixed',['toArray'],__annotator(function $module_createArrayFromMixed(global,require,requireDynamic,requireLazy,module,exports,toArray){if(require.__markCompiled)require.__markCompiled();


















function hasArrayNature(obj){return __bodyWrapper(this,arguments,function(){
return (

!!obj && (

typeof obj == 'object' || typeof obj == 'function') &&

'length' in obj &&

!('setInterval' in obj) &&


typeof obj.nodeType != 'number' && (


Array.isArray(obj) ||

'callee' in obj ||

'item' in obj));},{returns:'boolean'});}__annotator(hasArrayNature,{'module':'createArrayFromMixed','line':38,'column':0,'name':'hasArrayNature'},{returns:'boolean'});

























function createArrayFromMixed(obj){return __bodyWrapper(this,arguments,function(){
if(!hasArrayNature(obj)){
return [obj];}else
if(Array.isArray(obj)){
return obj.slice();}else
{
return toArray(obj);}},{returns:'array'});}__annotator(createArrayFromMixed,{'module':'createArrayFromMixed','line':83,'column':0,'name':'createArrayFromMixed'},{returns:'array'});



module.exports = createArrayFromMixed;},{'module':'createArrayFromMixed','line':0,'column':0,'name':'$module_createArrayFromMixed'}),null);
/** Path: html/js/modules/Arbiter.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Arbiter
 * @typechecks
 */__d('Arbiter',['CallbackDependencyManager','ErrorUtils','EventEmitter','EventEmitterWithHolding','EventHolder','createArrayFromMixed','invariant'],__annotator(function $module_Arbiter(global,require,requireDynamic,requireLazy,module,exports,CallbackDependencyManager,ErrorUtils,EventEmitter,EventEmitterWithHolding,EventHolder,createArrayFromMixed,invariant){if(require.__markCompiled)require.__markCompiled();var _EventHolder,_superProto;

'use strict';























function Arbiter(){
var emitter=new EventEmitter();
this.$Arbiter_holder = new ArbiterEventHolder();
this.$Arbiter_emitter = new EventEmitterWithHolding(emitter,this.$Arbiter_holder);
this.$Arbiter_callbackManager = new CallbackDependencyManager();


this.$Arbiter_returnValueStack = [];}__annotator(Arbiter,{'module':'Arbiter','line':32,'column':2,'name':'Arbiter'});Arbiter.prototype.


















subscribe = __annotator(function(types,callback,policy){return __bodyWrapper(this,arguments,function(){
types = createArrayFromMixed(types);
types.forEach(__annotator(function(type){
!(type && typeof type === 'string')?invariant(0,'Invalid type: %s',type):undefined;},{'module':'Arbiter','line':60,'column':18}));


!(typeof callback === 'function')?invariant(0,'Invalid callback: %s',callback):undefined;

policy = policy || Arbiter.SUBSCRIBE_ALL;
!(
policy === Arbiter.SUBSCRIBE_NEW || policy === Arbiter.SUBSCRIBE_ALL)?invariant(0,
'Unknown policy: %s',policy):undefined;


var subscriptions=types.map(__annotator(function(type){
var listener=this.$Arbiter_proxyListener.bind(this,callback,type);
listener.__SMmeta = callback.__SMmeta;
if(policy === Arbiter.SUBSCRIBE_NEW){
return this.$Arbiter_emitter.addListener(type,listener);}

this.$Arbiter_returnValueStack.push({});
var subscription=this.$Arbiter_emitter.addRetroactiveListener(type,listener);
this.$Arbiter_returnValueStack.pop();
return subscription;},{'module':'Arbiter','line':72,'column':34}),
this);
return new ArbiterToken(this,subscriptions);},{params:[[types,'string|array<string>','types'],[callback,'function','callback'],[policy,'?string','policy']],returns:'ArbiterToken'});},{'module':'Arbiter','line':58,'column':11},{params:['string|array<string>','function','?string'],returns:'ArbiterToken'});Arbiter.prototype.


$Arbiter_proxyListener = __annotator(function(callback,type,data){
var returnValues=
this.$Arbiter_returnValueStack[this.$Arbiter_returnValueStack.length - 1];
if(returnValues[type] === false){
return;}


var value=ErrorUtils.applyWithGuard(callback,null,[type,data]);
if(value === false){
this.$Arbiter_emitter.releaseCurrentEvent();}

returnValues[type] = value;},{'module':'Arbiter','line':86,'column':16});Arbiter.prototype.


unsubscribeCurrentSubscription = __annotator(function(){
this.$Arbiter_emitter.removeCurrentListener();},{'module':'Arbiter','line':100,'column':32});Arbiter.prototype.


releaseCurrentPersistentEvent = __annotator(function(){
this.$Arbiter_emitter.releaseCurrentEvent();},{'module':'Arbiter','line':104,'column':31});Arbiter.prototype.


subscribeOnce = __annotator(function(types,callback,policy){
var token=this.subscribe(types,__annotator(function(type,data){
this.unsubscribeCurrentSubscription();
return callback(type,data);},{'module':'Arbiter','line':109,'column':38}).bind(this),
policy);
return token;},{'module':'Arbiter','line':108,'column':15});Arbiter.prototype.







unsubscribe = __annotator(function(token){return __bodyWrapper(this,arguments,function(){
!
token.isForArbiterInstance(this)?invariant(0,
'Unsubscribing from another instance'):undefined;

token.unsubscribe();},{params:[[token,'ArbiterToken','token']]});},{'module':'Arbiter','line':121,'column':13},{params:['ArbiterToken']});Arbiter.prototype.





















inform = __annotator(function(types,data,behavior){return __bodyWrapper(this,arguments,function(){
var expectsArrayReturn=Array.isArray(types);
types = createArrayFromMixed(types);

behavior = behavior || Arbiter.BEHAVIOR_EVENT;
var isPersistentEvent=
behavior === Arbiter.BEHAVIOR_STATE ||
behavior === Arbiter.BEHAVIOR_PERSISTENT;

this.$Arbiter_returnValueStack.push({});

for(var ii=0;ii < types.length;ii++) {
var type=types[ii];
!type?invariant(0,'Event types must be non-empty strings: %s',type):undefined;

this.$Arbiter_holder.setHoldingBehavior(type,behavior);

this.$Arbiter_emitter.emitAndHold(type,data);
this.$Arbiter_updateCallbacks(type,data,isPersistentEvent);}


var returnValues=this.$Arbiter_returnValueStack.pop();
return expectsArrayReturn?returnValues:returnValues[types[0]];},{params:[[types,'string|array<string>','types'],[behavior,'?string','behavior']]});},{'module':'Arbiter','line':148,'column':8},{params:['string|array<string>','?string']});Arbiter.prototype.












query = __annotator(function(type){return __bodyWrapper(this,arguments,function(){
var holdingBehavior=this.$Arbiter_holder.getHoldingBehavior(type);
!(
!holdingBehavior || holdingBehavior === Arbiter.BEHAVIOR_STATE)?invariant(0,
'Querying state of an unstateful event: %s',
type):undefined;

var value=null;
this.$Arbiter_holder.emitToListener(type,__annotator(function(data){value = data;},{'module':'Arbiter','line':191,'column':38}));
return value;},{params:[[type,'string','type']]});},{'module':'Arbiter','line':183,'column':7},{params:['string']});Arbiter.prototype.














registerCallback = __annotator(function(callbackOrCallbackID,deps){return __bodyWrapper(this,arguments,function(){
if(typeof callbackOrCallbackID === 'function'){
return this.$Arbiter_callbackManager.registerCallback(callbackOrCallbackID,deps);}else
{
return this.$Arbiter_callbackManager.addDependenciesToExistingCallback(
callbackOrCallbackID,
deps);}},{params:[[callbackOrCallbackID,'function|number','callbackOrCallbackID'],[deps,'array<string>','deps']],returns:'?number'});},{'module':'Arbiter','line':207,'column':18},{params:['function|number','array<string>'],returns:'?number'});Arbiter.prototype.







$Arbiter_updateCallbacks = __annotator(function(type,data,isPersistentEvent){
if(data === null){
return;}

if(isPersistentEvent){
this.$Arbiter_callbackManager.satisfyPersistentDependency(type);}else
{
this.$Arbiter_callbackManager.satisfyNonPersistentDependency(type);}},{'module':'Arbiter','line':221,'column':18});_EventHolder =




EventHolder;_superProto = _EventHolder && _EventHolder.prototype;Object.assign(ArbiterEventHolder,_EventHolder);ArbiterEventHolder.prototype = Object.create(_EventHolder.prototype);ArbiterEventHolder.prototype.constructor = ArbiterEventHolder;ArbiterEventHolder.__superConstructor__ = _EventHolder;
function ArbiterEventHolder(){
_superProto.constructor.call(this);
this.$ArbiterEventHolder_holdingBehaviors = {};}__annotator(ArbiterEventHolder,{'module':'Arbiter','line':234,'column':2,'name':'ArbiterEventHolder'});ArbiterEventHolder.prototype.













setHoldingBehavior = __annotator(function(type,behavior){return __bodyWrapper(this,arguments,function(){
this.$ArbiterEventHolder_holdingBehaviors[type] = behavior;},{params:[[type,'string','type'],[behavior,'string','behavior']]});},{'module':'Arbiter','line':250,'column':20},{params:['string','string']});ArbiterEventHolder.prototype.


getHoldingBehavior = __annotator(function(type){
return this.$ArbiterEventHolder_holdingBehaviors[type];},{'module':'Arbiter','line':254,'column':20});ArbiterEventHolder.prototype.


holdEvent = __annotator(function(type,arg1,arg2,arg3,_){
var behavior=this.$ArbiterEventHolder_holdingBehaviors[type];
if(behavior !== Arbiter.BEHAVIOR_PERSISTENT){
this.$ArbiterEventHolder_releaseAllEvents(type);}

if(behavior !== Arbiter.BEHAVIOR_EVENT){
return _superProto.holdEvent.call(this,type,arg1,arg2,arg3,_);}},{'module':'Arbiter','line':258,'column':11});ArbiterEventHolder.prototype.



$ArbiterEventHolder_releaseAllEvents = __annotator(function(type){


this.emitToListener(type,this.releaseCurrentEvent,this);},{'module':'Arbiter','line':268,'column':19});ArbiterEventHolder.prototype.


releaseEvent = __annotator(function(token){
if(token){
_superProto.releaseEvent.call(this,token);}},{'module':'Arbiter','line':274,'column':14});




Object.assign(Arbiter,{
SUBSCRIBE_NEW:'new',
SUBSCRIBE_ALL:'all',

BEHAVIOR_EVENT:'event',
BEHAVIOR_STATE:'state',
BEHAVIOR_PERSISTENT:'persistent'});











function ArbiterToken(arbiter,subscriptions){'use strict';
this.$ArbiterToken_arbiterInstance = arbiter;
this.$ArbiterToken_subscriptions = subscriptions;}__annotator(ArbiterToken,{'module':'Arbiter','line':299,'column':2,'name':'ArbiterToken'});ArbiterToken.prototype.





unsubscribe = __annotator(function(){'use strict';
for(var ii=0;ii < this.$ArbiterToken_subscriptions.length;ii++) {
this.$ArbiterToken_subscriptions[ii].remove();}

if(__DEV__){
this.$ArbiterToken_arbiterInstance = null;}

this.$ArbiterToken_subscriptions.length = 0;},{'module':'Arbiter','line':307,'column':13});ArbiterToken.prototype.


isForArbiterInstance = __annotator(function(arbiter){'use strict';
!this.$ArbiterToken_arbiterInstance?invariant(0,'Token has already been unsubscribed'):undefined;
return this.$ArbiterToken_arbiterInstance === arbiter;},{'module':'Arbiter','line':317,'column':22});




Object.keys(Arbiter.prototype).forEach(__annotator(function(property){
Arbiter[property] = __annotator(function(){

var context=this instanceof Arbiter?this:Arbiter;
return Arbiter.prototype[property].apply(context,arguments);},{'module':'Arbiter','line':325,'column':22});},{'module':'Arbiter','line':324,'column':39}));


Arbiter.call(Arbiter);

module.exports = Arbiter;},{'module':'Arbiter','line':0,'column':0,'name':'$module_Arbiter'}),null);
/** Path: html/js/downstream/core/CookieCore.js */
/**
 * @generated SignedSource<<0e00855206a20919d869c09171ec97c9>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule CookieCore
 */__d('CookieCore',[],__annotator(function $module_CookieCore(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();





var DOMAIN_REGEX=/^.*(\.(facebook|messenger)\..*)$/i;
var CookieCore={

set:__annotator(function(cookieName,cookieValue,nMilliSecs,path,secure){
if(__DEV__){
_verifyName(cookieName);}


document.cookie = cookieName + '=' + encodeURIComponent(cookieValue) +
'; ' + (nMilliSecs?'expires=' +
new Date(Date.now() + nMilliSecs).toGMTString() + '; ':'') +
'path=' + (path || '/') + '; domain=' +
window.location.hostname.replace(DOMAIN_REGEX,'$1') + (
secure?'; secure':'');},{'module':'CookieCore','line':27,'column':7}),


clear:__annotator(function(cookieName,path){
path = path || '/';
document.cookie =
cookieName + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; ' +
'path=' + path + '; domain=' +
window.location.hostname.replace(DOMAIN_REGEX,'$1');},{'module':'CookieCore','line':40,'column':9}),


get:__annotator(function(name){
if(__DEV__){
_verifyName(name);}

var match=document.cookie.match('(?:^|;\\s*)' + name + '=(.*?)(?:;|$)');
return match?decodeURIComponent(match[1]):match;},{'module':'CookieCore','line':48,'column':7})};



var _verifyName;
if(__DEV__){
_verifyName = __annotator(function _verifyName(name){
var pattern=/[*+?^=$()[\\|.{}]/;
if(pattern.test(name)){
throw new Error('Your cookie name contains invalid characters. ' +
'Please do not use any of the following *+?^=$()[\\|.{}');}},{'module':'CookieCore','line':59,'column':16,'name':'_verifyName'});}




module.exports = CookieCore;},{'module':'CookieCore','line':0,'column':0,'name':'$module_CookieCore'}),null);
/** Path: html/js/modules/Cookie.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Cookie
 */__d('Cookie',['CookieCore','Env'],__annotator(function $module_Cookie(global,require,requireDynamic,requireLazy,module,exports,CookieCore,Env){if(require.__markCompiled)require.__markCompiled();var _extends=Object.assign || __annotator(function(target){for(var i=1;i < arguments.length;i++) {var source=arguments[i];for(var key in source) {if(Object.prototype.hasOwnProperty.call(source,key)){target[key] = source[key];}}}return target;},{'module':'Cookie','line':0,'column':0});








function set(cookieName,cookieValue,nMilliSecs,path,secure){




if(Env.no_cookies && cookieName != 'tpa'){
return;}


CookieCore.set(cookieName,cookieValue,nMilliSecs,path,secure);}__annotator(set,{'module':'Cookie','line':14,'column':0,'name':'set'});
;

function setIfFirstPartyContext(name,value,nMilliSecs,path,secure){
if(window.self != window.top){
if(__DEV__){
console.info(
'Not setting %s cookie because we are not in a first party context',
name);}


return;}

set(name,value,nMilliSecs,path,secure);}__annotator(setIfFirstPartyContext,{'module':'Cookie','line':26,'column':0,'name':'setIfFirstPartyContext'});


module.exports = _extends({},
CookieCore,{
set:set,
setIfFirstPartyContext:setIfFirstPartyContext});},{'module':'Cookie','line':0,'column':0,'name':'$module_Cookie'}),null);
/** Path: html/js/downstream/env/CurrentUser.js */
/**
 * @generated SignedSource<<c3a4bb5dd04207b99bc4bc4cfa1d1de4>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule CurrentUser
 * @typechecks
 */__d('CurrentUser',['Cookie','CurrentUserInitialData'],__annotator(function $module_CurrentUser(global,require,requireDynamic,requireLazy,module,exports,Cookie,CurrentUserInitialData){if(require.__markCompiled)require.__markCompiled();




var CurrentUser={










getID:__annotator(function(){
return CurrentUserInitialData.USER_ID;},{'module':'CurrentUser','line':35,'column':9}),







getAccountID:__annotator(function(){
return CurrentUserInitialData.ACCOUNT_ID;},{'module':'CurrentUser','line':44,'column':16}),





isLoggedIn:__annotator(function(){
return CurrentUserInitialData.USER_ID &&
CurrentUserInitialData.USER_ID !== '0';},{'module':'CurrentUser','line':51,'column':14}),








isLoggedInNow:__annotator(function(){
if(!CurrentUser.isLoggedIn()){
return false;}





if(CurrentUserInitialData.IS_INTERN_SITE){
return true;}



if(CurrentUserInitialData.ORIGINAL_USER_ID){
return CurrentUserInitialData.ORIGINAL_USER_ID === Cookie.get('c_user');}


return CurrentUserInitialData.USER_ID === Cookie.get('c_user');},{'module':'CurrentUser','line':62,'column':17}),





isEmployee:__annotator(function(){
return !!CurrentUserInitialData.IS_EMPLOYEE;},{'module':'CurrentUser','line':85,'column':14}),







hasWorkUser:__annotator(function(){
return !!CurrentUserInitialData.HAS_WORK_USER;},{'module':'CurrentUser','line':94,'column':15}),





isGray:__annotator(function(){
return !!CurrentUserInitialData.IS_GRAY;},{'module':'CurrentUser','line':101,'column':10})};




module.exports = CurrentUser;},{'module':'CurrentUser','line':0,'column':0,'name':'$module_CurrentUser'}),null);
/** Path: html/js/logging/Miny.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Miny
 *
 * A compression algorithm for sending text (e.g. JSON) over
 * HTTP. All characters used are valid www-form-urlencoded characters so
 * it doesn't suffer from the encoding bloat that other algorithms do.
 */__d('Miny',[],__annotator(function $module_Miny(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var MAGIC='Miny1';


var _indexMap={encode:[],decode:{}};
var LO='wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');
function getIndexMap(length){
for(var i=_indexMap.encode.length;i < length;i++) {

var s=i.toString(32).split('');
s[s.length - 1] = LO[parseInt(s[s.length - 1],32)];
s = s.join('');

_indexMap.encode[i] = s;
_indexMap.decode[s] = i;}


return _indexMap;}__annotator(getIndexMap,{'module':'Miny','line':16,'column':0,'name':'getIndexMap'});



function encode(s){
if(/^$|[~\\]|__proto__/.test(s))return s;


var parts=s.match(/\w+|\W+/g);



var dict={};
for(var i=0;i < parts.length;i++) {
dict[parts[i]] = (dict[parts[i]] || 0) + 1;}




var byCount=Object.keys(dict);
byCount.sort(__annotator(function(a,b){
return dict[a] < dict[b]?1:dict[b] < dict[a]?-1:0;},{'module':'Miny','line':47,'column':15}));



var encodeMap=getIndexMap(byCount.length).encode;
for(i = 0;i < byCount.length;i++) {
dict[byCount[i]] = encodeMap[i];}



var codes=[];
for(i = 0;i < parts.length;i++) {
codes[i] = dict[parts[i]];}


return [MAGIC,byCount.length].
concat(byCount).
concat(codes.join('')).
join('~');}__annotator(encode,{'module':'Miny','line':31,'column':0,'name':'encode'});



function decode(s){
var fields=s.split('~');

if(fields.shift() != MAGIC){

return s;}

var nKeys=parseInt(fields.shift(),10);
var codes=fields.pop();
codes = codes.match(/[0-9a-v]*[\-w-zA-Z_]/g);

var dict=fields;

var decodeMap=getIndexMap(nKeys).decode;
var parts=[];
for(var i=0;i < codes.length;i++) {
parts[i] = dict[decodeMap[codes[i]]];}


return parts.join('');}__annotator(decode,{'module':'Miny','line':70,'column':0,'name':'decode'});


var Miny={
encode:encode,
decode:decode};


module.exports = Miny;},{'module':'Miny','line':0,'column':0,'name':'$module_Miny'}),null);
/** Path: html/js/downstream/core/QueryString.js */
/**
 * @generated SignedSource<<3c580169526e75a639cbb34eac6ab1c7>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * Provides QueryString encoding/decoding.
 *
 * @providesModule QueryString
 * @typechecks
 *
 */__d('QueryString',[],__annotator(function $module_QueryString(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();






function encode(bag){return __bodyWrapper(this,arguments,function(){
var pairs=[];
Object.keys(bag).sort().forEach(__annotator(function(key){
var value=bag[key];

if(typeof value === 'undefined'){
return;}


if(value === null){
pairs.push(key);
return;}


pairs.push(encodeURIComponent(key) +
'=' +
encodeURIComponent(value));},{'module':'QueryString','line':31,'column':34}));

return pairs.join('&');},{params:[[bag,'object','bag']],returns:'string'});}__annotator(encode,{'module':'QueryString','line':29,'column':0,'name':'encode'},{params:['object'],returns:'string'});





function decode(str,strict){return __bodyWrapper(this,arguments,function(){
var data={};
if(str === ''){
return data;}


var pairs=str.split('&');
for(var i=0;i < pairs.length;i++) {
var pair=pairs[i].split('=',2);
var key=decodeURIComponent(pair[0]);
if(strict && data.hasOwnProperty(key)){
throw new URIError('Duplicate key: ' + key);}

data[key] = pair.length === 2?
decodeURIComponent(pair[1]):
null;}

return data;},{params:[[str,'string','str'],[strict,'?boolean','strict']],returns:'object'});}__annotator(decode,{'module':'QueryString','line':53,'column':0,'name':'decode'},{params:['string','?boolean'],returns:'object'});







function appendToUrl(url,params){return __bodyWrapper(this,arguments,function(){
return url + (
url.indexOf('?') !== -1?'&':'?') + (
typeof params === 'string'?
params:
QueryString.encode(params));},{params:[[url,'string','url']],returns:'string'});}__annotator(appendToUrl,{'module':'QueryString','line':78,'column':0,'name':'appendToUrl'},{params:['string'],returns:'string'});


var QueryString={
encode:encode,
decode:decode,
appendToUrl:appendToUrl};


module.exports = QueryString;},{'module':'QueryString','line':0,'column':0,'name':'$module_QueryString'}),null);
/** Path: html/js/modules/PageEvents.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule PageEvents
 */__d('PageEvents',[],__annotator(function $module_PageEvents(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var PageEvents={




NATIVE_ONLOAD:'onload/onload',





BIGPIPE_ONLOAD:'onload/onload_callback',




AJAXPIPE_ONLOAD:'ajaxpipe/onload_callback',





NATIVE_DOMREADY:'onload/dom_content_ready',





BIGPIPE_DOMREADY:'onload/domcontent_callback',




AJAXPIPE_DOMREADY:'ajaxpipe/domcontent_callback',


NATIVE_ONBEFOREUNLOAD:'onload/beforeunload',


NATIVE_ONUNLOAD:'onload/unload',






AJAXPIPE_ONUNLOAD:'onload/exit',

AJAXPIPE_SEND:'ajaxpipe/send'};


module.exports = PageEvents;},{'module':'PageEvents','line':0,'column':0,'name':'$module_PageEvents'}),null);
/** Path: html/js/modules/createCancelableFunction.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule createCancelableFunction
 * @typechecks
 */__d('createCancelableFunction',['emptyFunction'],__annotator(function $module_createCancelableFunction(global,require,requireDynamic,requireLazy,module,exports,emptyFunction){if(require.__markCompiled)require.__markCompiled();







function createCancelableFunction(func){return __bodyWrapper(this,arguments,function(){
var newFunction=__annotator(function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}return func.apply(null,args);},{'module':'createCancelableFunction','line':15,'column':20});
newFunction.cancel = __annotator(function(){func = emptyFunction;},{'module':'createCancelableFunction','line':16,'column':23});
return newFunction;},{params:[[func,'function','func']],returns:'function'});}__annotator(createCancelableFunction,{'module':'createCancelableFunction','line':14,'column':0,'name':'createCancelableFunction'},{params:['function'],returns:'function'});


module.exports = createCancelableFunction;},{'module':'createCancelableFunction','line':0,'column':0,'name':'$module_createCancelableFunction'}),null);
/** Path: html/js/downstream/performance/performanceAbsoluteNow.js */
/**
 * @generated SignedSource<<28bb18e48a9334d2df8321e0a874e585>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule performanceAbsoluteNow
 * @typechecks
 *
 * Sometimes we want absolute time (e.g. when reporting to Artillery) and we
 * also want high resolution timestamp. This function provides high resolution
 * timestamp in absolute time.
 *
 * Known problem: Precision will be limited to 1/1000 millisecond. That's what
 * the spec requires for high resolution timestamp. Chrome provides higher
 * precision, but the limit of double precision floating point number cuts that
 * down to 1/1000 milliseconds when representing absolute time.
 */__d('performanceAbsoluteNow',['performance'],__annotator(function $module_performanceAbsoluteNow(global,require,requireDynamic,requireLazy,module,exports,performance){if(require.__markCompiled)require.__markCompiled();



var performanceAbsoluteNow;

if(
performance.now &&
performance.timing &&
performance.timing.navigationStart)
{
var navigationStart=performance.timing.navigationStart;
performanceAbsoluteNow = __annotator(function(){
return performance.now.apply(performance,arguments) + navigationStart;},{'module':'performanceAbsoluteNow','line':40,'column':27});}else

{
performanceAbsoluteNow = Date.now.bind(Date);}


module.exports = performanceAbsoluteNow;},{'module':'performanceAbsoluteNow','line':0,'column':0,'name':'$module_performanceAbsoluteNow'}),null);
/** Path: html/js/modules/Run.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Run
 */__d('Run',['Arbiter','ExecutionEnvironment','PageEvents','createCancelableFunction','emptyFunction','performanceAbsoluteNow'],__annotator(function $module_Run(global,require,requireDynamic,requireLazy,module,exports,Arbiter,ExecutionEnvironment,PageEvents,createCancelableFunction,emptyFunction,performanceAbsoluteNow){if(require.__markCompiled)require.__markCompiled();









var UNLOAD_HOOK='onunloadhooks';
var AFTER_UNLOAD_HOOK='onafterunloadhooks';
var STATE=Arbiter.BEHAVIOR_STATE;
function clog(name){
var CavalryLogger=global.CavalryLogger;
CavalryLogger && CavalryLogger.getInstance().setTimeStamp(name);}__annotator(clog,{'module':'Run','line':18,'column':0,'name':'clog'});
;













function _include_quickling_events_default(){
return !window.loading_page_chrome;}__annotator(_include_quickling_events_default,{'module':'Run','line':35,'column':0,'name':'_include_quickling_events_default'});
























function domreadyRegister(handler){
var PageHooks=global.PageHooks;
if(window.domready && PageHooks){
PageHooks.runHook(handler,'domreadyhooks:late');
return {remove:emptyFunction};}else
{
return _addHook('domreadyhooks',handler);}}__annotator(domreadyRegister,{'module':'Run','line':61,'column':0,'name':'domreadyRegister'});












function onloadRegister(handler){
var PageHooks=global.PageHooks;
if(window.loaded && PageHooks){
var timeout=setTimeout(__annotator(function(){
PageHooks.runHook(handler,'onloadhooks:late');},{'module':'Run','line':83,'column':29}),
0);
return {remove:__annotator(function(){return clearTimeout(timeout);},{'module':'Run','line':86,'column':20})};}else
{
return _addHook('onloadhooks',handler);}}__annotator(onloadRegister,{'module':'Run','line':80,'column':0,'name':'onloadRegister'});































function onbeforeunloadRegister(handler,include_quickling_events){
if(include_quickling_events === undefined){
include_quickling_events = _include_quickling_events_default();}

return include_quickling_events?
_addHook('onbeforeleavehooks',handler):
_addHook('onbeforeunloadhooks',handler);}__annotator(onbeforeunloadRegister,{'module':'Run','line':120,'column':0,'name':'onbeforeunloadRegister'});








function _onunloadRegister(hooks,handler){



if(!window.onunload){
window.onunload = __annotator(function(){
Arbiter.inform(PageEvents.NATIVE_ONUNLOAD,true,STATE);},{'module':'Run','line':140,'column':22});}


return _addHook(hooks,handler);}__annotator(_onunloadRegister,{'module':'Run','line':135,'column':0,'name':'_onunloadRegister'});





function onunloadRegister(handler){
return _onunloadRegister(UNLOAD_HOOK,handler);}__annotator(onunloadRegister,{'module':'Run','line':150,'column':0,'name':'onunloadRegister'});





function onafterunloadRegister(handler){
return _onunloadRegister(AFTER_UNLOAD_HOOK,handler);}__annotator(onafterunloadRegister,{'module':'Run','line':157,'column':0,'name':'onafterunloadRegister'});






function onleaveRegister(handler){
return _addHook('onleavehooks',handler);}__annotator(onleaveRegister,{'module':'Run','line':165,'column':0,'name':'onleaveRegister'});


function _addHook(hooks,handler){
if(__DEV__){
if(!handler){
throw new Error('Undefined handler is not allowed');}}



handler = createCancelableFunction(handler);
window[hooks] = (window[hooks] || []).concat(handler);

return {
remove:__annotator(function(){
handler.cancel();},{'module':'Run','line':180,'column':10})};}__annotator(_addHook,{'module':'Run','line':169,'column':0,'name':'_addHook'});




function removeHook(hooks){
window[hooks] = [];}__annotator(removeHook,{'module':'Run','line':186,'column':0,'name':'removeHook'});




function _domcontentready(){
Arbiter.inform(PageEvents.NATIVE_DOMREADY,true,STATE);}__annotator(_domcontentready,{'module':'Run','line':192,'column':0,'name':'_domcontentready'});

global._domcontentready = _domcontentready;








function _bootstrapEventHandlers(){
var d=document,w=window;
if(d.addEventListener){
var webkit=/AppleWebKit.(\d+)/.exec(navigator.userAgent);
if(webkit && webkit[1] < 525){
var timeout=setInterval(__annotator(function(){
if(/loaded|complete/.test(d.readyState)){
_domcontentready();
clearInterval(timeout);}},{'module':'Run','line':209,'column':32}),

10);}else
{
d.addEventListener("DOMContentLoaded",_domcontentready,true);}}else

{
var src='javascript:void(0)';
if(w.location.protocol == 'https:'){


src = '//:';}






d.write(
'<script onreadystatechange="if (this.readyState==\'complete\') {' +
'this.parentNode.removeChild(this);_domcontentready();}" ' +
'defer="defer" src="' + src + '"><\/script\>');}



var onload=w.onload;
w.onload = __annotator(function(){
clog('t_layout');
onload && onload();
Arbiter.inform(PageEvents.NATIVE_ONLOAD,true,STATE);},{'module':'Run','line':238,'column':13});


w.onbeforeunload = __annotator(function(){
var e={};
Arbiter.inform(PageEvents.NATIVE_ONBEFOREUNLOAD,e,STATE);






if(!e.warn){
Arbiter.inform(PageEvents.AJAXPIPE_ONUNLOAD,true);}

return e.warn;},{'module':'Run','line':244,'column':21});}__annotator(_bootstrapEventHandlers,{'module':'Run','line':204,'column':0,'name':'_bootstrapEventHandlers'});



var onload_callback=Arbiter.registerCallback(__annotator(function(){
clog('t_onload');
Arbiter.inform(
PageEvents.BIGPIPE_ONLOAD,
{
ts:performanceAbsoluteNow()},

STATE);},{'module':'Run','line':260,'column':47}),

[PageEvents.NATIVE_ONLOAD]);

var domcontent_callback=Arbiter.registerCallback(__annotator(function(){
clog('t_domcontent');



var parameters={timeTriggered:Date.now()};
Arbiter.inform(PageEvents.BIGPIPE_DOMREADY,parameters,STATE);},{'module':'Run','line':271,'column':51}),
[PageEvents.NATIVE_DOMREADY]);

if(ExecutionEnvironment.canUseDOM){
_bootstrapEventHandlers();}


var Run={
onLoad:domreadyRegister,
onAfterLoad:onloadRegister,
onLeave:onleaveRegister,
onBeforeUnload:onbeforeunloadRegister,
onUnload:onunloadRegister,
onAfterUnload:onafterunloadRegister,

__domContentCallback:domcontent_callback,
__onloadCallback:onload_callback,

__removeHook:removeHook};


module.exports = Run;},{'module':'Run','line':0,'column':0,'name':'$module_Run'}),null);
/** Path: html/js/downstream/useragent/VersionRange.js */
/**
 * @generated SignedSource<<86144fa35b3fa5f9ed5662176e6c1855>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule VersionRange
 */__d('VersionRange',['invariant'],__annotator(function $module_VersionRange(global,require,requireDynamic,requireLazy,module,exports,invariant){if(require.__markCompiled)require.__markCompiled();

'use strict';



var componentRegex=/\./;
var orRegex=/\|\|/;
var rangeRegex=/\s+\-\s+/;
var modifierRegex=/^(<=|<|=|>=|~>|~|>|)?\s*(.+)/;
var numericRegex=/^(\d*)(.*)/;









function checkOrExpression(range,version){
var expressions=range.split(orRegex);

if(expressions.length > 1){
return expressions.some(__annotator(function(range){return VersionRange.contains(range,version);},{'module':'VersionRange','line':42,'column':28}));}else
{
range = expressions[0].trim();
return checkRangeExpression(range,version);}}__annotator(checkOrExpression,{'module':'VersionRange','line':38,'column':0,'name':'checkOrExpression'});











function checkRangeExpression(range,version){
var expressions=range.split(rangeRegex);

!(
expressions.length > 0 && expressions.length <= 2)?invariant(0,
'the "-" operator expects exactly 2 operands'):undefined;


if(expressions.length === 1){
return checkSimpleExpression(expressions[0],version);}else
{var
startVersion=expressions[0];var endVersion=expressions[1];
!(
isSimpleVersion(startVersion) && isSimpleVersion(endVersion))?invariant(0,
'operands to the "-" operator must be simple (no modifiers)'):undefined;


return (
checkSimpleExpression('>=' + startVersion,version) &&
checkSimpleExpression('<=' + endVersion,version));}}__annotator(checkRangeExpression,{'module':'VersionRange','line':57,'column':0,'name':'checkRangeExpression'});












function checkSimpleExpression(range,version){
range = range.trim();
if(range === ''){
return true;}


var versionComponents=version.split(componentRegex);var _getModifierAndComponents=
getModifierAndComponents(range);var modifier=_getModifierAndComponents.modifier;var rangeComponents=_getModifierAndComponents.rangeComponents;
switch(modifier){
case '<':
return checkLessThan(versionComponents,rangeComponents);
case '<=':
return checkLessThanOrEqual(versionComponents,rangeComponents);
case '>=':
return checkGreaterThanOrEqual(versionComponents,rangeComponents);
case '>':
return checkGreaterThan(versionComponents,rangeComponents);
case '~':
case '~>':
return checkApproximateVersion(versionComponents,rangeComponents);
default:
return checkEqual(versionComponents,rangeComponents);}}__annotator(checkSimpleExpression,{'module':'VersionRange','line':89,'column':0,'name':'checkSimpleExpression'});










function checkLessThan(a,b){
return compareComponents(a,b) === -1;}__annotator(checkLessThan,{'module':'VersionRange','line':121,'column':0,'name':'checkLessThan'});









function checkLessThanOrEqual(a,b){
var result=compareComponents(a,b);
return result === -1 || result === 0;}__annotator(checkLessThanOrEqual,{'module':'VersionRange','line':132,'column':0,'name':'checkLessThanOrEqual'});









function checkEqual(a,b){
return compareComponents(a,b) === 0;}__annotator(checkEqual,{'module':'VersionRange','line':144,'column':0,'name':'checkEqual'});









function checkGreaterThanOrEqual(a,b){
var result=compareComponents(a,b);
return result === 1 || result === 0;}__annotator(checkGreaterThanOrEqual,{'module':'VersionRange','line':155,'column':0,'name':'checkGreaterThanOrEqual'});









function checkGreaterThan(a,b){
return compareComponents(a,b) === 1;}__annotator(checkGreaterThan,{'module':'VersionRange','line':167,'column':0,'name':'checkGreaterThan'});











function checkApproximateVersion(a,b){
var lowerBound=b.slice();
var upperBound=b.slice();

if(upperBound.length > 1){
upperBound.pop();}

var lastIndex=upperBound.length - 1;
var numeric=parseInt(upperBound[lastIndex],10);
if(isNumber(numeric)){
upperBound[lastIndex] = numeric + 1 + '';}


return (
checkGreaterThanOrEqual(a,lowerBound) &&
checkLessThan(a,upperBound));}__annotator(checkApproximateVersion,{'module':'VersionRange','line':180,'column':0,'name':'checkApproximateVersion'});













function getModifierAndComponents(range){
var rangeComponents=range.split(componentRegex);
var matches=rangeComponents[0].match(modifierRegex);
!matches?invariant(0,'expected regex to match but it did not'):undefined;

return {
modifier:matches[1],
rangeComponents:[matches[2]].concat(rangeComponents.slice(1))};}__annotator(getModifierAndComponents,{'module':'VersionRange','line':209,'column':0,'name':'getModifierAndComponents'});









function isNumber(number){
return !isNaN(number) && isFinite(number);}__annotator(isNumber,{'module':'VersionRange','line':226,'column':0,'name':'isNumber'});









function isSimpleVersion(range){
return !getModifierAndComponents(range).modifier;}__annotator(isSimpleVersion,{'module':'VersionRange','line':237,'column':0,'name':'isSimpleVersion'});








function zeroPad(array,length){
for(var i=array.length;i < length;i++) {
array[i] = '0';}}__annotator(zeroPad,{'module':'VersionRange','line':247,'column':0,'name':'zeroPad'});
















function normalizeVersions(a,b){
a = a.slice();
b = b.slice();

zeroPad(a,b.length);


for(var i=0;i < b.length;i++) {
var matches=b[i].match(/^[x*]$/i);
if(matches){
b[i] = a[i] = '0';


if(matches[0] === '*' && i === b.length - 1){
for(var j=i;j < a.length;j++) {
a[j] = '0';}}}}





zeroPad(b,a.length);

return [a,b];}__annotator(normalizeVersions,{'module':'VersionRange','line':266,'column':0,'name':'normalizeVersions'});












function compareNumeric(a,b){
var aPrefix=a.match(numericRegex)[1];
var bPrefix=b.match(numericRegex)[1];
var aNumeric=parseInt(aPrefix,10);
var bNumeric=parseInt(bPrefix,10);

if(isNumber(aNumeric) && isNumber(bNumeric) && aNumeric !== bNumeric){
return compare(aNumeric,bNumeric);}else
{
return compare(a,b);}}__annotator(compareNumeric,{'module':'VersionRange','line':302,'column':0,'name':'compareNumeric'});











function compare(a,b){
!(typeof a === typeof b)?invariant(0,'"a" and "b" must be of the same type'):undefined;

if(a > b){
return 1;}else
if(a < b){
return -1;}else
{
return 0;}}__annotator(compare,{'module':'VersionRange','line':323,'column':0,'name':'compare'});











function compareComponents(a,b){var _normalizeVersions=
normalizeVersions(a,b);var aNormalized=_normalizeVersions[0];var bNormalized=_normalizeVersions[1];

for(var i=0;i < bNormalized.length;i++) {
var result=compareNumeric(aNormalized[i],bNormalized[i]);
if(result){
return result;}}



return 0;}__annotator(compareComponents,{'module':'VersionRange','line':343,'column':0,'name':'compareComponents'});


var VersionRange={































contains:__annotator(function(range,version){
return checkOrExpression(range.trim(),version.trim());},{'module':'VersionRange','line':388,'column':10})};



module.exports = VersionRange;},{'module':'VersionRange','line':0,'column':0,'name':'$module_VersionRange'}),null);
/** Path: html/js/downstream/functional/mapObject.js */
/**
 * @generated SignedSource<<edc696285bdc8bd95cf16892cfbfc68b>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule mapObject
 */__d('mapObject',[],__annotator(function $module_mapObject(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

'use strict';

var hasOwnProperty=Object.prototype.hasOwnProperty;























function mapObject(object,callback,context){
if(!object){
return null;}

var result={};
for(var name in object) {
if(hasOwnProperty.call(object,name)){
result[name] = callback.call(context,object[name],name,object);}}


return result;}__annotator(mapObject,{'module':'mapObject','line':46,'column':0,'name':'mapObject'});


module.exports = mapObject;},{'module':'mapObject','line':0,'column':0,'name':'$module_mapObject'}),null);
/** Path: html/js/downstream/react/shared/utils/memoizeStringOnly.js */
/**
 * @generated SignedSource<<e041528049adab1a2fd9da5d1314966a>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule memoizeStringOnly
 * @typechecks static-only
 */__d('memoizeStringOnly',[],__annotator(function $module_memoizeStringOnly(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

'use strict';







function memoizeStringOnly(callback){
var cache={};
return __annotator(function(string){
if(!cache.hasOwnProperty(string)){
cache[string] = callback.call(this,string);}

return cache[string];},{'module':'memoizeStringOnly','line':36,'column':9});}__annotator(memoizeStringOnly,{'module':'memoizeStringOnly','line':34,'column':0,'name':'memoizeStringOnly'});



module.exports = memoizeStringOnly;},{'module':'memoizeStringOnly','line':0,'column':0,'name':'$module_memoizeStringOnly'}),null);
/** Path: html/js/downstream/useragent/UserAgent.js */
/**
 * @generated SignedSource<<f53cc9782e207508dace60c0f22eb489>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule UserAgent
 */__d('UserAgent',['UserAgentData','VersionRange','mapObject','memoizeStringOnly'],__annotator(function $module_UserAgent(global,require,requireDynamic,requireLazy,module,exports,UserAgentData,VersionRange,mapObject,memoizeStringOnly){if(require.__markCompiled)require.__markCompiled();

'use strict';
















function compare(name,version,query,normalizer){

if(name === query){
return true;}



if(!query.startsWith(name)){
return false;}



var range=query.slice(name.length);
if(version){
range = normalizer?normalizer(range):range;
return VersionRange.contains(range,version);}


return false;}__annotator(compare,{'module':'UserAgent','line':37,'column':0,'name':'compare'});











function normalizePlatformVersion(version){
if(UserAgentData.platformName === 'Windows'){
return version.replace(/^\s*NT/,'');}


return version;}__annotator(normalizePlatformVersion,{'module':'UserAgent','line':67,'column':0,'name':'normalizePlatformVersion'});






var UserAgent={











































isBrowser:__annotator(function(query){
return compare(
UserAgentData.browserName,
UserAgentData.browserFullVersion,
query);},{'module':'UserAgent','line':123,'column':11}),











isBrowserArchitecture:__annotator(function(query){
return compare(
UserAgentData.browserArchitecture,
null,
query);},{'module':'UserAgent','line':139,'column':23}),



























isDevice:__annotator(function(query){
return compare(UserAgentData.deviceName,null,query);},{'module':'UserAgent','line':171,'column':10}),
























isEngine:__annotator(function(query){
return compare(
UserAgentData.engineName,
UserAgentData.engineVersion,
query);},{'module':'UserAgent','line':197,'column':10}),






































isPlatform:__annotator(function(query){
return compare(
UserAgentData.platformName,
UserAgentData.platformFullVersion,
query,
normalizePlatformVersion);},{'module':'UserAgent','line':240,'column':12}),











isPlatformArchitecture:__annotator(function(query){
return compare(
UserAgentData.platformArchitecture,
null,
query);},{'module':'UserAgent','line':257,'column':24})};





module.exports = mapObject(UserAgent,memoizeStringOnly);},{'module':'UserAgent','line':0,'column':0,'name':'$module_UserAgent'}),null);
/** Path: html/js/downstream/env/CurrentCommunity.js */
/**
 * @generated SignedSource<<cd271c194598b04eeec741d81d9f2208>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule CurrentCommunity
 * @typechecks
 */__d('CurrentCommunity',['CurrentCommunityInitialData'],__annotator(function $module_CurrentCommunity(global,require,requireDynamic,requireLazy,module,exports,CurrentCommunityInitialData){if(require.__markCompiled)require.__markCompiled();






var CurrentCommunity={




getID:__annotator(function(){
return CurrentCommunityInitialData.COMMUNITY_ID || '0';},{'module':'CurrentCommunity','line':31,'column':9})};



module.exports = CurrentCommunity;},{'module':'CurrentCommunity','line':0,'column':0,'name':'$module_CurrentCommunity'}),null);
/** Path: html/js/downstream/dtsg/DTSG.js */
/**
 * @generated SignedSource<<eadd5638cf78c93e22dac1e33cec69e1>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule DTSG
 * @typechecks
 */__d('DTSG',['DTSGInitialData'],__annotator(function $module_DTSG(global,require,requireDynamic,requireLazy,module,exports,DTSGInitialData){if(require.__markCompiled)require.__markCompiled();



var token=DTSGInitialData.token || null;

var DTSG={

setToken:__annotator(function(newToken){return __bodyWrapper(this,arguments,function(){
token = newToken;},{params:[[newToken,'?string','newToken']]});},{'module':'DTSG','line':27,'column':12},{params:['?string']}),


getToken:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return token;},{returns:'?string'});},{'module':'DTSG','line':31,'column':12},{returns:'?string'})};




module.exports = DTSG;},{'module':'DTSG','line':0,'column':0,'name':'$module_DTSG'}),null);
/** Path: html/js/downstream/bit_map/BitMap.js */
/**
 * @generated SignedSource<<7dc6665459a14ce97d376b44cd196829>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule BitMap
 */__d('BitMap',[],__annotator(function $module_BitMap(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();


var b64='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';


function BitMap(){'use strict';
this.$BitMap_bits = [];}__annotator(BitMap,{'module':'BitMap','line':24,'column':2,'name':'BitMap'});BitMap.prototype.


set = __annotator(function(index){'use strict';
this.$BitMap_bits[index] = 1;
return this;},{'module':'BitMap','line':28,'column':5});BitMap.prototype.







toString = __annotator(function(){'use strict';
var bits=[];
for(var ii=0;ii < this.$BitMap_bits.length;ii++) {
bits.push(this.$BitMap_bits[ii]?1:0);}

return bits.length?encodeBitString(bits.join('')):'';},{'module':'BitMap','line':38,'column':10});BitMap.prototype.












toCompressedString = __annotator(function(){'use strict';
if(this.$BitMap_bits.length === 0){
return '';}


var runLengths=[];
var runCount=1;
var prevBit=this.$BitMap_bits[0] || 0;
var polarity=prevBit.toString(2);

for(var ii=1;ii < this.$BitMap_bits.length;ii++) {
var bit=this.$BitMap_bits[ii] || 0;
if(bit === prevBit){
runCount++;}else
{
runLengths.push(eliasGammaCode(runCount));
prevBit = bit;
runCount = 1;}}



if(runCount){
runLengths.push(eliasGammaCode(runCount));}


return encodeBitString(polarity + runLengths.join(''));},{'module':'BitMap','line':56,'column':20});



function eliasGammaCode(num){
var bitString=num.toString(2);
var zeros='0'.repeat(bitString.length - 1);
return zeros + bitString;}__annotator(eliasGammaCode,{'module':'BitMap','line':85,'column':0,'name':'eliasGammaCode'});


function encodeBitString(bitString){


var sextets=(bitString + '00000').match(/[01]{6}/g);
var result='';
for(var ii=0;ii < sextets.length;ii++) {
result += b64[parseInt(sextets[ii],2)];}

return result;}__annotator(encodeBitString,{'module':'BitMap','line':91,'column':0,'name':'encodeBitString'});


module.exports = BitMap;},{'module':'BitMap','line':0,'column':0,'name':'$module_BitMap'}),null);
/** Path: html/js/downstream/serverjs/replaceTransportMarkers.js */
/**
 * @generated SignedSource<<84b9ff56b8d16fb39d786f4ed534f412>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule replaceTransportMarkers
 */__d('replaceTransportMarkers',['ge'],__annotator(function $module_replaceTransportMarkers(global,require,requireDynamic,requireLazy,module,exports,ge){if(require.__markCompiled)require.__markCompiled();
















function replaceTransportMarkers(relativeTo,parent,index){
var obj=typeof index !== 'undefined'?parent[index]:parent;
var ii;
if(Array.isArray(obj)){
for(ii = 0;ii < obj.length;ii++) {
replaceTransportMarkers(relativeTo,obj,ii);}}else

if(obj && typeof obj == 'object'){
if(obj.__m){


parent[index] = require.call(null,obj.__m);}else
if(obj.__e){
parent[index] = ge(obj.__e);}else
if(obj.__rel){
parent[index] = relativeTo;}else
{
for(var key in obj) {
replaceTransportMarkers(relativeTo,obj,key);}}}}__annotator(replaceTransportMarkers,{'module':'replaceTransportMarkers','line':35,'column':0,'name':'replaceTransportMarkers'});





module.exports = replaceTransportMarkers;},{'module':'replaceTransportMarkers','line':0,'column':0,'name':'$module_replaceTransportMarkers'}),null);
/** Path: html/js/downstream/serverjs/ServerJSDefine.js */
/**
 * @generated SignedSource<<b870e3034c317f0c9e640cd5540e27d6>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ServerJSDefine
 */__d('ServerJSDefine',['BitMap','replaceTransportMarkers'],__annotator(function $module_ServerJSDefine(global,require,requireDynamic,requireLazy,module,exports,BitMap,replaceTransportMarkers){if(require.__markCompiled)require.__markCompiled();





var _dynamicModuleIndices=new BitMap();

var ServerJSDefine={

getLoadedModuleHash:__annotator(function(){
return _dynamicModuleIndices.toCompressedString();},{'module':'ServerJSDefine','line':28,'column':23}),


handleDefine:__annotator(function(moduleName,deps,data,index,relativeTo){
_dynamicModuleIndices.set(index);
define(moduleName,deps,__annotator(function(){
replaceTransportMarkers(relativeTo,data);
return data;},{'module':'ServerJSDefine','line':34,'column':29}));},{'module':'ServerJSDefine','line':32,'column':16}),



handleDefines:__annotator(function(defines,relativeTo){
defines.map(__annotator(function(define){
if(relativeTo){
define.push(relativeTo);}

ServerJSDefine.handleDefine.apply(null,define);},{'module':'ServerJSDefine','line':41,'column':16}));},{'module':'ServerJSDefine','line':40,'column':17})};





module.exports = ServerJSDefine;},{'module':'ServerJSDefine','line':0,'column':0,'name':'$module_ServerJSDefine'}),null);
/** Path: html/js/downstream/core/URIRFC3986.js */
/**
 * @generated SignedSource<<af9c4c9ee77f16125a0437e1d3cb772e>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule URIRFC3986
 * @typechecks
 */__d('URIRFC3986',[],__annotator(function $module_URIRFC3986(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var PARSE_PATTERN=new RegExp(
'^' +
'([^:/?#]+:)?' +
'(//' +
'([^\\\\/?#@]*@)?' +
'(' +
'\\[[A-Fa-f0-9:.]+\\]|' +
'[^\\/?#:]*' +
')' +
'(:[0-9]*)?' +
')?' +
'([^?#]*)' +
'(\\?[^#]*)?' +
'(#.*)?');








var URIRFC3986={








parse:__annotator(function(uriString){return __bodyWrapper(this,arguments,function(){
if(uriString.trim() === ''){
return null;}

var captures=uriString.match(PARSE_PATTERN);
var uri={};




uri.uri = captures[0]?captures[0]:null;
uri.scheme = captures[1]?
captures[1].substr(0,captures[1].length - 1):
null;
uri.authority = captures[2]?captures[2].substr(2):null;
uri.userinfo = captures[3]?
captures[3].substr(0,captures[3].length - 1):
null;
uri.host = captures[2]?captures[4]:null;
uri.port = captures[5]?
captures[5].substr(1)?parseInt(captures[5].substr(1),10):null:
null;
uri.path = captures[6]?captures[6]:null;
uri.query = captures[7]?captures[7].substr(1):null;
uri.fragment = captures[8]?captures[8].substr(1):null;
uri.isGenericURI = uri.authority === null && !!uri.scheme;
return uri;},{params:[[uriString,'string','uriString']],returns:'?object'});},{'module':'URIRFC3986','line':52,'column':9},{params:['string'],returns:'?object'})};



module.exports = URIRFC3986;},{'module':'URIRFC3986','line':0,'column':0,'name':'$module_URIRFC3986'}),null);
/** Path: html/js/downstream/core/createObjectFrom.js */
/**
 * @generated SignedSource<<8a08ecc150dbb22afd87fc4058c07b4f>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule createObjectFrom
 *
 */__d('createObjectFrom',[],__annotator(function $module_createObjectFrom(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();
























function createObjectFrom(
keys,
values)
{
if(__DEV__){
if(!Array.isArray(keys)){
throw new TypeError('Must pass an array of keys.');}}



var object={};
var isArray=Array.isArray(values);
if(values === undefined){
values = true;}


for(var ii=keys.length - 1;ii >= 0;ii--) {
object[keys[ii]] = isArray?values[ii]:values;}

return object;}__annotator(createObjectFrom,{'module':'createObjectFrom','line':44,'column':0,'name':'createObjectFrom'});


module.exports = createObjectFrom;},{'module':'createObjectFrom','line':0,'column':0,'name':'$module_createObjectFrom'}),null);
/** Path: html/js/downstream/core/URISchemes.js */
/**
 * @generated SignedSource<<bd5583725e83a34ce991693bc7f67eb1>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule URISchemes
 * @typechecks
 */__d('URISchemes',['createObjectFrom'],__annotator(function $module_URISchemes(global,require,requireDynamic,requireLazy,module,exports,createObjectFrom){if(require.__markCompiled)require.__markCompiled();



var defaultSchemes=createObjectFrom([
'fb',
'fb-ama',
'fb-messenger',
'fbcf',
'fbconnect',
'fbmobilehome',
'fbrpc',
'file',
'ftp',
'http',
'https',
'mailto',
'ms-app',
'intent',
'itms',
'itms-apps',
'itms-services',
'market',
'svn+ssh',
'fbstaging',
'tel',
'sms',
'pebblejs',
'sftp']);


var URISchemes={





isAllowed:__annotator(function(schema){return __bodyWrapper(this,arguments,function(){
if(!schema){
return true;}

return defaultSchemes.hasOwnProperty(schema.toLowerCase());},{params:[[schema,'?string','schema']],returns:'boolean'});},{'module':'URISchemes','line':56,'column':13},{params:['?string'],returns:'boolean'})};



module.exports = URISchemes;},{'module':'URISchemes','line':0,'column':0,'name':'$module_URISchemes'}),null);
/** Path: html/js/downstream/core/URIBase.js */
/**
 * @generated SignedSource<<9ac43a9a44ed401baab0870eced36b8d>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule URIBase
 */__d('URIBase',['URIRFC3986','URISchemes','ex','invariant'],__annotator(function $module_URIBase(global,require,requireDynamic,requireLazy,module,exports,URIRFC3986,URISchemes,ex,invariant){if(require.__markCompiled)require.__markCompiled();







var UNSAFE_DOMAIN_PATTERN=new RegExp(


'[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f' +

'\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF' +

'\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]');


var SECURITY_PATTERN=new RegExp(

'^(?:[^/]*:|' +

'[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');














function parse(uri,uriToParse,shouldThrow,serializer){
if(!uriToParse){
return true;}



if(uriToParse instanceof URIBase){
uri.setProtocol(uriToParse.getProtocol());
uri.setDomain(uriToParse.getDomain());
uri.setPort(uriToParse.getPort());
uri.setPath(uriToParse.getPath());
uri.setQueryData(
serializer.deserialize(
serializer.serialize(uriToParse.getQueryData())));


uri.setFragment(uriToParse.getFragment());
uri.setForceFragmentSeparator(uriToParse.getForceFragmentSeparator());
return true;}


uriToParse = uriToParse.toString().trim();
var components=URIRFC3986.parse(uriToParse) || {};
if(!shouldThrow && !URISchemes.isAllowed(components.scheme)){
return false;}

uri.setProtocol(components.scheme || '');
if(!shouldThrow && UNSAFE_DOMAIN_PATTERN.test(components.host)){
return false;}

uri.setDomain(components.host || '');
uri.setPort(components.port || '');
uri.setPath(components.path || '');
if(shouldThrow){
uri.setQueryData(serializer.deserialize(components.query) || {});}else
{
try{
uri.setQueryData(serializer.deserialize(components.query) || {});}
catch(err) {
return false;}}


uri.setFragment(components.fragment || '');


if(components.fragment === ''){
uri.setForceFragmentSeparator(true);}


if(components.userinfo !== null){
if(shouldThrow){
throw new Error(ex(
'URI.parse: invalid URI (userinfo is not allowed in a URI): %s',
uri.toString()));}else

{
return false;}}





if(!uri.getDomain() && uri.getPath().indexOf('\\') !== -1){
if(shouldThrow){
throw new Error(ex(
'URI.parse: invalid URI (no domain but multiple back-slashes): %s',
uri.toString()));}else

{
return false;}}





if(!uri.getProtocol() && SECURITY_PATTERN.test(uriToParse)){
if(shouldThrow){
throw new Error(ex(
'URI.parse: invalid URI (unsafe protocol-relative URLs): %s',
uri.toString()));}else

{
return false;}}


return true;}__annotator(parse,{'module':'URIBase','line':55,'column':0,'name':'parse'});





var uriFilters=[];
































function URIBase(uri,serializer){'use strict';
!serializer?invariant(0,'no serializer set'):undefined;
this.$URIBase_serializer = serializer;

this.$URIBase_protocol = '';
this.$URIBase_domain = '';
this.$URIBase_port = '';
this.$URIBase_path = '';
this.$URIBase_fragment = '';
this.$URIBase_queryData = {};
this.$URIBase_forceFragmentSeparator = false;
parse(this,uri,true,serializer);}__annotator(URIBase,{'module':'URIBase','line':179,'column':2,'name':'URIBase'});URIBase.prototype.








setProtocol = __annotator(function(protocol){'use strict';
!
URISchemes.isAllowed(protocol)?invariant(0,
'"%s" is not a valid protocol for a URI.',protocol):undefined;

this.$URIBase_protocol = protocol;
return this;},{'module':'URIBase','line':199,'column':13});URIBase.prototype.







getProtocol = __annotator(function(protocol){'use strict';
return this.$URIBase_protocol;},{'module':'URIBase','line':213,'column':13});URIBase.prototype.








setSecure = __annotator(function(secure){'use strict';
return this.setProtocol(secure?'https':'http');},{'module':'URIBase','line':223,'column':11});URIBase.prototype.







isSecure = __annotator(function(){'use strict';
return this.getProtocol() === 'https';},{'module':'URIBase','line':232,'column':10});URIBase.prototype.








setDomain = __annotator(function(domain){'use strict';




if(UNSAFE_DOMAIN_PATTERN.test(domain)){
throw new Error(ex(
'URI.setDomain: unsafe domain specified: %s for url %s',
domain,
this.toString()));}



this.$URIBase_domain = domain;
return this;},{'module':'URIBase','line':242,'column':11});URIBase.prototype.







getDomain = __annotator(function(){'use strict';
return this.$URIBase_domain;},{'module':'URIBase','line':264,'column':11});URIBase.prototype.








setPort = __annotator(function(port){'use strict';
this.$URIBase_port = port;
return this;},{'module':'URIBase','line':274,'column':9});URIBase.prototype.







getPort = __annotator(function(){'use strict';
return this.$URIBase_port;},{'module':'URIBase','line':284,'column':9});URIBase.prototype.








setPath = __annotator(function(path){'use strict';
if(__DEV__){
if(path && path.charAt(0) !== '/'){
console.warn('Path does not begin with a "/" which means this URI ' +
'will likely be malformed. Ensure any string passed to .setPath() ' +
'leads with "/"');}}


this.$URIBase_path = path;
return this;},{'module':'URIBase','line':294,'column':9});URIBase.prototype.







getPath = __annotator(function(){'use strict';
return this.$URIBase_path;},{'module':'URIBase','line':311,'column':9});URIBase.prototype.









addQueryData = __annotator(function(mapOrKey,value){'use strict';

if(Object.prototype.toString.call(mapOrKey) === '[object Object]'){
Object.assign(this.$URIBase_queryData,mapOrKey);}else
{
this.$URIBase_queryData[mapOrKey] = value;}

return this;},{'module':'URIBase','line':322,'column':14});URIBase.prototype.









setQueryData = __annotator(function(map){'use strict';
this.$URIBase_queryData = map;
return this;},{'module':'URIBase','line':339,'column':14});URIBase.prototype.







getQueryData = __annotator(function(){'use strict';
return this.$URIBase_queryData;},{'module':'URIBase','line':349,'column':14});URIBase.prototype.








removeQueryData = __annotator(function(keys){'use strict';
if(!Array.isArray(keys)){
keys = [keys];}

for(var i=0,length=keys.length;i < length;++i) {
delete this.$URIBase_queryData[keys[i]];}

return this;},{'module':'URIBase','line':359,'column':17});URIBase.prototype.








setFragment = __annotator(function(fragment){'use strict';
this.$URIBase_fragment = fragment;

this.setForceFragmentSeparator(false);
return this;},{'module':'URIBase','line':375,'column':13});URIBase.prototype.







getFragment = __annotator(function(){'use strict';
return this.$URIBase_fragment;},{'module':'URIBase','line':387,'column':13});URIBase.prototype.

















setForceFragmentSeparator = __annotator(function(shouldForce){'use strict';
this.$URIBase_forceFragmentSeparator = shouldForce;
return this;},{'module':'URIBase','line':406,'column':27});URIBase.prototype.








getForceFragmentSeparator = __annotator(function(){'use strict';
return this.$URIBase_forceFragmentSeparator;},{'module':'URIBase','line':417,'column':27});URIBase.prototype.







isEmpty = __annotator(function(){'use strict';
return !(
this.getPath() ||
this.getProtocol() ||
this.getDomain() ||
this.getPort() ||
Object.keys(this.getQueryData()).length > 0 ||
this.getFragment());},{'module':'URIBase','line':426,'column':9});URIBase.prototype.








toString = __annotator(function(){'use strict';
var uri=this;
for(var i=0;i < uriFilters.length;i++) {
uri = uriFilters[i](uri);}

return uri.$URIBase_toStringImpl();},{'module':'URIBase','line':442,'column':10});URIBase.prototype.








$URIBase_toStringImpl = __annotator(function(){'use strict';
var str='';
var protocol=this.getProtocol();
if(protocol){
str += protocol + '://';}

var domain=this.getDomain();
if(domain){
str += domain;}

var port=this.getPort();
if(port){
str += ':' + port;}





var path=this.getPath();
if(path){
str += path;}else
if(str){
str += '/';}

var queryStr=this.$URIBase_serializer.serialize(this.getQueryData());
if(queryStr){
str += '?' + queryStr;}

var fragment=this.getFragment();
if(fragment){
str += '#' + fragment;}else
if(this.getForceFragmentSeparator()){
str += '#';}

return str;},{'module':'URIBase','line':456,'column':15});URIBase.









registerFilter = __annotator(function(filter){'use strict';
uriFilters.push(filter);},{'module':'URIBase','line':500,'column':23});URIBase.prototype.






getOrigin = __annotator(function(){'use strict';
var port=this.getPort();
return this.getProtocol() +
'://' +
this.getDomain() + (
port?':' + port:'');},{'module':'URIBase','line':508,'column':11});













URIBase.isValidURI = __annotator(function(uri,serializer){
return parse(new URIBase(null,serializer),uri,false,serializer);},{'module':'URIBase','line':527,'column':21});


module.exports = URIBase;},{'module':'URIBase','line':0,'column':0,'name':'$module_URIBase'}),null);
/** Path: html/js/downstream/core/PHPQuerySerializer.js */
/**
 * @generated SignedSource<<5b911bc04b30f4ccc5b1fb5715a1c303>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule PHPQuerySerializer
 */__d('PHPQuerySerializer',['invariant'],__annotator(function $module_PHPQuerySerializer(global,require,requireDynamic,requireLazy,module,exports,invariant){if(require.__markCompiled)require.__markCompiled();













function serialize(obj){
return _serializeElement(obj,null);}__annotator(serialize,{'module':'PHPQuerySerializer','line':32,'column':0,'name':'serialize'});


function _serializeElement(obj,name){

name = name || '';
var kv_pairs=[];

if(obj === null || obj === undefined){
kv_pairs.push(encodeComponent(name));}else
if(typeof obj == 'object'){

!
!('nodeName' in obj || 'nodeType' in obj)?invariant(0,
'PHPQuerySerializer serializing a DOM element, not good ...'):undefined;


for(var k in obj) {
if(obj.hasOwnProperty(k) && obj[k] !== undefined){
kv_pairs.push(_serializeElement(
obj[k],
name?name + '[' + k + ']':k));}}}else




{
kv_pairs.push(encodeComponent(name) + '=' + encodeComponent(obj));}


return kv_pairs.join('&');}__annotator(_serializeElement,{'module':'PHPQuerySerializer','line':36,'column':0,'name':'_serializeElement'});











function encodeComponent(raw){
return encodeURIComponent(raw).replace(/%5D/g,']').replace(/%5B/g,'[');}__annotator(encodeComponent,{'module':'PHPQuerySerializer','line':75,'column':0,'name':'encodeComponent'});





var ARRAY_QUERY_PATTERN=/^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;








function deserialize(q){
if(!q){
return {};}


var result={};





q = q.replace(/%5B/ig,'[').replace(/%5D/ig,']');

q = q.split('&');

var hasOwnProp=Object.prototype.hasOwnProperty;

for(var ii=0,length=q.length;ii < length;ii++) {
var match=q[ii].match(ARRAY_QUERY_PATTERN);

if(!match){
var term=q[ii].split('=');
result[decodeComponent(term[0])] =
term[1] === undefined?null:decodeComponent(term[1]);}else
{
var indices=match[2].split(/\]\[|\[|\]/).slice(0,-1);
var name=match[1];
var value=decodeComponent(match[3] || '');
indices[0] = name;



var resultNode=result;
for(var i=0;i < indices.length - 1;i++) {
if(indices[i]){
if(!hasOwnProp.call(resultNode,indices[i])){
var nv=indices[i + 1] && !indices[i + 1].match(/^\d{1,3}$/)?
{}:[];
resultNode[indices[i]] = nv;
if(resultNode[indices[i]] !== nv){




return result;}}



resultNode = resultNode[indices[i]];}else
{
if(indices[i + 1] && !indices[i + 1].match(/^\d{1,3}$/)){
resultNode.push({});}else
{
resultNode.push([]);}

resultNode = resultNode[resultNode.length - 1];}}



if(resultNode instanceof Array && indices[indices.length - 1] === ''){
resultNode.push(value);}else
{
resultNode[indices[indices.length - 1]] = value;}}}



return result;}__annotator(deserialize,{'module':'PHPQuerySerializer','line':91,'column':0,'name':'deserialize'});











function decodeComponent(encoded_s){
return decodeURIComponent(encoded_s.replace(/\+/g,' '));}__annotator(decodeComponent,{'module':'PHPQuerySerializer','line':169,'column':0,'name':'decodeComponent'});


var PHPQuerySerializer={
serialize:serialize,
encodeComponent:encodeComponent,
deserialize:deserialize,
decodeComponent:decodeComponent};


module.exports = PHPQuerySerializer;},{'module':'PHPQuerySerializer','line':0,'column':0,'name':'$module_PHPQuerySerializer'}),null);
/** Path: html/js/downstream/request/getAsyncParams.js */
/**
 * @generated SignedSource<<26d67b4b42504e7dcad745d8799cc6fd>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule getAsyncParams
 * @typechecks
 */__d('getAsyncParams',['CurrentCommunity','CurrentUser','DTSG','ISB','LSD','ServerJSDefine','SiteData','URIBase','PHPQuerySerializer'],__annotator(function $module_getAsyncParams(global,require,requireDynamic,requireLazy,module,exports,CurrentCommunity,CurrentUser,DTSG,ISB,LSD,ServerJSDefine,SiteData,URIBase,PHPQuerySerializer){if(require.__markCompiled)require.__markCompiled();











var _count=1;







function getAsyncParams(method){return __bodyWrapper(this,arguments,function(){
var params={
__user:CurrentUser.getID(),
__a:1,




__dyn:ServerJSDefine.getLoadedModuleHash(),








__req:(_count++).toString(36)};


var queryData=new URIBase(
window.location.href,
PHPQuerySerializer).
getQueryData();

for(var key in queryData) {
if(queryData.hasOwnProperty(key)){
if(key === 'locale' || key.substr(0,3) === 'mh_'){
params[key] = queryData[key];}}}






if(method == 'POST'){
if(DTSG.getToken()){
params.fb_dtsg = DTSG.getToken();


var numeric_dtsg_value='';
for(var ii=0;ii < params.fb_dtsg.length;ii++) {
numeric_dtsg_value += params.fb_dtsg.charCodeAt(ii);}

params.ttstamp = '2' + numeric_dtsg_value;}


if(LSD.token){
params.lsd = LSD.token;}}





if(ISB.token){
params.fb_isb = ISB.token;}


if(SiteData.revision){
params.__rev = SiteData.revision;}


if(CurrentCommunity.getID() !== '0'){
params.__cid = CurrentCommunity.getID();}


return params;},{params:[[method,'string','method']],returns:'object'});}__annotator(getAsyncParams,{'module':'getAsyncParams','line':39,'column':0,'name':'getAsyncParams'},{params:['string'],returns:'object'});


module.exports = getAsyncParams;},{'module':'getAsyncParams','line':0,'column':0,'name':'$module_getAsyncParams'}),null);
/** Path: html/js/downstream/request/getSameOriginTransport.js */
/**
 * @generated SignedSource<<93d14015a3fc2f48c45b150dc1263523>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule getSameOriginTransport
 */__d('getSameOriginTransport',['ex'],__annotator(function $module_getSameOriginTransport(global,require,requireDynamic,requireLazy,module,exports,ex){if(require.__markCompiled)require.__markCompiled();



function getSameOriginTransport(){
try{
return global.XMLHttpRequest?
new global.XMLHttpRequest():
new ActiveXObject("MSXML2.XMLHTTP.3.0");}
catch(error) {
throw new Error(ex('getSameOriginTransport: %s',error.message));}}__annotator(getSameOriginTransport,{'module':'getSameOriginTransport','line':22,'column':0,'name':'getSameOriginTransport'});



module.exports = getSameOriginTransport;},{'module':'getSameOriginTransport','line':0,'column':0,'name':'$module_getSameOriginTransport'}),null);
/** Path: html/js/downstream/error/wrapFunction.js */
/**
 * @generated SignedSource<<8f7c8d142fb7f53d5f7a5b63e2904a79>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule wrapFunction
 * @typechecks
 *
 * This module has a very generic purpose, to either act as an identity
 * function, or to return a function that when invoked will invoke the
 * original function wrapped inside a handler.
 *
 * Typical use of this is when you want to inject a layer of error handling,
 * logging, or similar around the invokation of a function, but don't want
 * the calling module to be coupled to the implementation.
 */__d('wrapFunction',[],__annotator(function $module_wrapFunction(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var wrappers={};
function wrapFunction(fn,type,source){return __bodyWrapper(this,arguments,function()
{
type = type || 'default';

return __annotator(function(){
var callee=type in wrappers?
wrappers[type](fn,source):
fn;

return callee.apply(this,arguments);},{'module':'wrapFunction','line':34,'column':9});},{params:[[fn,'function','fn'],[type,'?string','type'],[source,'?string','source']],returns:'function'});}__annotator(wrapFunction,{'module':'wrapFunction','line':30,'column':0,'name':'wrapFunction'},{params:['function','?string','?string'],returns:'function'});



wrapFunction.setWrapper = __annotator(function(fn,type){return __bodyWrapper(this,arguments,function(){
type = type || 'default';
wrappers[type] = fn;},{params:[[fn,'function','fn'],[type,'?string','type']]});},{'module':'wrapFunction','line':43,'column':26},{params:['function','?string']});


module.exports = wrapFunction;},{'module':'wrapFunction','line':0,'column':0,'name':'$module_wrapFunction'}),null);
/** Path: html/js/downstream/core/TimeSlice.js */
/**
 * @generated SignedSource<<a76c110c27193f39e21ae6dfa0fc1ac3>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule TimeSlice
 */__d('TimeSlice',['ErrorUtils','LogBuffer','invariant','performanceAbsoluteNow','wrapFunction'],__annotator(function $module_TimeSlice(global,require,requireDynamic,requireLazy,module,exports,ErrorUtils,LogBuffer,invariant,performanceAbsoluteNow,wrapFunction){if(require.__markCompiled)require.__markCompiled();var _extends=Object.assign || __annotator(function(target){for(var i=1;i < arguments.length;i++) {var source=arguments[i];for(var key in source) {if(Object.prototype.hasOwnProperty.call(source,key)){target[key] = source[key];}}}return target;},{'module':'TimeSlice','line':0,'column':0});













var guarded=false;
var contextName;
var tasks=[];
var taskDepth;

var TimeSlice={





guard:__annotator(function(fn,name){
var mainGuardName='TimeSlice' + (name?': ' + name:'');
var taskGuardName='TimeSlice Task' + (name?': ' + name:'');

return __annotator(function timeSliceGuarded(){
if(guarded){

return fn.apply(this,arguments);}


var beginTime=performanceAbsoluteNow();

guarded = true;
contextName = name;
tasks.length = 0;
taskDepth = 0;

var result=ErrorUtils.
applyWithGuard(fn,this,arguments,null,mainGuardName);

while(tasks.length > 0) {
var task=tasks.shift();
taskDepth = task.depth;
ErrorUtils.
applyWithGuard(task.fn,global,null,null,taskGuardName);}


guarded = false;

var endTime=performanceAbsoluteNow();

LogBuffer.write('time_slice',_extends({
begin:beginTime,
end:endTime,
guard:name},
fn.__SMmeta));



return result;},{'module':'TimeSlice','line':47,'column':11,'name':'timeSliceGuarded'});},{'module':'TimeSlice','line':43,'column':9}),




enqueue:__annotator(function(fn){
!
guarded?invariant(0,
'TimeSlice can\'t append tasks in non-guarded context'):undefined;

!(
taskDepth < 1000)?invariant(0,
'TimeSlice shouldn\'t be used for infinite deferred recursion'):undefined;

tasks.push({
fn:fn,
depth:taskDepth + 1});},{'module':'TimeSlice','line':87,'column':11}),




inGuard:__annotator(function(){
return guarded;},{'module':'TimeSlice','line':103,'column':11})};



TimeSlice.getContext = __annotator(function(){
if(!guarded){
return null;}

return {
name:contextName,
depth:taskDepth};},{'module':'TimeSlice','line':108,'column':23});



wrapFunction.setWrapper(TimeSlice.guard,'entry');
global.TimeSlice = TimeSlice;

module.exports = TimeSlice;},{'module':'TimeSlice','line':0,'column':0,'name':'$module_TimeSlice'}),null);
/** Path: html/js/downstream/page/setTimeoutAcrossTransitions.js */
/**
 * @generated SignedSource<<992a0ae0b6882b88229db3bb0b4fa1fc>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule setTimeoutAcrossTransitions
 */__d('setTimeoutAcrossTransitions',['TimeSlice'],__annotator(function $module_setTimeoutAcrossTransitions(global,require,requireDynamic,requireLazy,module,exports,TimeSlice){if(require.__markCompiled)require.__markCompiled();




var setTimeout=global.setTimeout.nativeBackup || global.setTimeout;





module.exports = __annotator(function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}
args[0] = TimeSlice.guard(args[0],'setTimeout');

return Function.prototype.apply.call(setTimeout,global,args);},{'module':'setTimeoutAcrossTransitions','line':29,'column':17});},{'module':'setTimeoutAcrossTransitions','line':0,'column':0,'name':'$module_setTimeoutAcrossTransitions'}),null);
/** Path: html/js/logging/BanzaiAdapter.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule BanzaiAdapter
 *
 * DO NOT REQUIRE THIS. The only module that should depend on this is Banzai.js.
 */__d('BanzaiAdapter',['Arbiter','CurrentUser','Miny','QueryString','Run','SiteData','UserAgent','getAsyncParams','getSameOriginTransport','setTimeoutAcrossTransitions','BanzaiConfig'],__annotator(function $module_BanzaiAdapter(global,require,requireDynamic,requireLazy,module,exports,Arbiter,CurrentUser,Miny,QueryString,Run,SiteData,UserAgent,getAsyncParams,getSameOriginTransport,setTimeoutAcrossTransitions,config){if(require.__markCompiled)require.__markCompiled();













var inflight=[];
var _arbiter=new Arbiter();







var ENDPOINT='/ajax/bz';

var Banzai={};



var adapter=Banzai.adapter = {
config:config,

getUserID:__annotator(function(){
return CurrentUser.getID();},{'module':'BanzaiAdapter','line':39,'column':13}),


inform:__annotator(function(message){
_arbiter.inform(message);},{'module':'BanzaiAdapter','line':43,'column':10}),


subscribe:__annotator(function(event_type,callback){
_arbiter.subscribe(event_type,callback);},{'module':'BanzaiAdapter','line':47,'column':13}),


cleanup:__annotator(function(){
var reqs=inflight;
inflight = [];
reqs.forEach(__annotator(function(req){
if(req.readyState < 4){
req.abort();}},{'module':'BanzaiAdapter','line':54,'column':17}));},{'module':'BanzaiAdapter','line':51,'column':11}),




readyToSend:__annotator(function(){


return UserAgent.isBrowser('IE <= 8') || navigator.onLine;},{'module':'BanzaiAdapter','line':61,'column':15}),


send:__annotator(function(payload,onSuccess,onError,signal){
var method='POST';
var xhr=getSameOriginTransport();
xhr.open(method,ENDPOINT,true);
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

xhr.onreadystatechange = __annotator(function(){
if(xhr.readyState >= 4){






var stat;
try{
stat = xhr.status;}
catch(e) {
stat = 0;}



if(__DEV__){
if(Banzai._xhrTestError){
stat = Banzai._xhrTestError;}}



if(stat == 200){
if(onSuccess){
onSuccess();}

if(!signal){
adapter.inform(Banzai.OK);}}else

{
if(onError){
onError(stat);}

if(!signal){
adapter.inform(Banzai.ERROR);}}}},{'module':'BanzaiAdapter','line':73,'column':29});






setTimeoutAcrossTransitions(__annotator(
function(){
if(xhr.readyState < 4){
xhr.abort();}},{'module':'BanzaiAdapter','line':115,'column':6}),


Banzai.SEND_TIMEOUT);


inflight.push(xhr);


var data=getAsyncParams(method);
data.q = JSON.stringify(payload);
data.ts = Date.now();
data.ph = SiteData.push_phase;

if(Banzai.FBTRACE){
data.fbtrace = Banzai.FBTRACE;}


if(Banzai.isEnabled('miny_compression')){
var start=Date.now();
var encoded=Miny.encode(data.q);


if(encoded.length < data.q.length){
data.q = encoded;
data.miny_encode_ms = Date.now() - start;}}



xhr.send(QueryString.encode(data));},{'module':'BanzaiAdapter','line':67,'column':8}),


setHooks:__annotator(function(){









Run.onAfterUnload(Banzai._unload);},{'module':'BanzaiAdapter','line':149,'column':12}),


onUnload:__annotator(function(callback){
Run.onAfterUnload(callback);},{'module':'BanzaiAdapter','line':162,'column':12})};



module.exports = Banzai;},{'module':'BanzaiAdapter','line':0,'column':0,'name':'$module_BanzaiAdapter'}),null);
/** Path: html/js/lib/FBJSON.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule FBJSON
 * @typechecks
 *
 * Usage:
 *   var FBJSON = require('FBJSON');
 *   var obj = FBJSON.parse('{"id": 4}', 'ModuleName');
 *   var str = FBJSON.stringify(obj);
 */__d("FBJSON",[],__annotator(function $module_FBJSON(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

module.exports = {
parse:JSON.parse,
stringify:JSON.stringify};},{"module":"FBJSON","line":0,"column":0,"name":"$module_FBJSON"}),null);
/** Path: html/js/downstream/core/isEmpty.js */
/**
 * @generated SignedSource<<38398127df3acc421c08cb0ad7954737>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule isEmpty
 */__d('isEmpty',[],__annotator(function $module_isEmpty(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();






function isEmpty(obj){
if(Array.isArray(obj)){
return obj.length === 0;}else
if(typeof obj === 'object'){
for(var i in obj) {
return false;}

return true;}else
{
return !obj;}}__annotator(isEmpty,{'module':'isEmpty','line':25,'column':0,'name':'isEmpty'});



module.exports = isEmpty;},{'module':'isEmpty','line':0,'column':0,'name':'$module_isEmpty'}),null);
/** Path: html/js/downstream/page/setIntervalAcrossTransitions.js */
/**
 * @generated SignedSource<<44ef80856f4a55a32874edac5c0f9afa>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule setIntervalAcrossTransitions
 */__d('setIntervalAcrossTransitions',['TimeSlice'],__annotator(function $module_setIntervalAcrossTransitions(global,require,requireDynamic,requireLazy,module,exports,TimeSlice){if(require.__markCompiled)require.__markCompiled();




var setInterval=global.setInterval.nativeBackup || global.setInterval;





module.exports = __annotator(function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}
args[0] = TimeSlice.guard(args[0],'setInterval');

return Function.prototype.apply.call(setInterval,global,args);},{'module':'setIntervalAcrossTransitions','line':29,'column':17});},{'module':'setIntervalAcrossTransitions','line':0,'column':0,'name':'$module_setIntervalAcrossTransitions'}),null);
/** Path: html/js/downstream/bootloader/CSSLoader.js */
/**
 * @generated SignedSource<<acb1f22a023394980f5002be775f7f03>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule CSSLoader
 */__d('CSSLoader',['CSSLoaderConfig','TimeSlice','isEmpty','setIntervalAcrossTransitions'],__annotator(function $module_CSSLoader(global,require,requireDynamic,requireLazy,module,exports,CSSLoaderConfig,TimeSlice,isEmpty,setIntervalAcrossTransitions){if(require.__markCompiled)require.__markCompiled();














var CSS_POLL_INTERVAL=20;
var CSS_POLL_TIMEOUT=CSSLoaderConfig.timeout;

var _loadEventSupported=CSSLoaderConfig.loadEventSupported;
var _testingLoadEvent;




var _styleSheetMap={};

var _ieStyleSheets=[];

var _expirationTime;
var _activeCSSPolls={};







function _testLoadEvent(hardpoint){
if(_testingLoadEvent){
return;}

_testingLoadEvent = true;

var link=document.createElement('link');
link.onload = __annotator(function(){
_loadEventSupported = true;
link.parentNode.removeChild(link);},{'module':'CSSLoader','line':62,'column':16});

link.rel = 'stylesheet';
link.href = 'data:text/css;base64,';
hardpoint.appendChild(link);}__annotator(_testLoadEvent,{'module':'CSSLoader','line':55,'column':0,'name':'_testLoadEvent'});






function _runCSSPolls(){
var name;
var callbacks=[];
var finishedSignals=[];

if(Date.now() >= _expirationTime){
for(name in _activeCSSPolls) {
finishedSignals.push(_activeCSSPolls[name].signal);
callbacks.push(_activeCSSPolls[name].error);}

_activeCSSPolls = {};}else
{
for(name in _activeCSSPolls) {
var signal=_activeCSSPolls[name].signal;
var style=window.getComputedStyle?
getComputedStyle(signal,null):
signal.currentStyle;
if(style && parseInt(style.height,10) > 1){
callbacks.push(_activeCSSPolls[name].load);
finishedSignals.push(signal);
delete _activeCSSPolls[name];}}}




for(var ii=0;ii < finishedSignals.length;ii++) {
finishedSignals[ii].parentNode.removeChild(finishedSignals[ii]);}


if(!isEmpty(callbacks)){
for(ii = 0;ii < callbacks.length;ii++) {
callbacks[ii]();}

_expirationTime = Date.now() + CSS_POLL_TIMEOUT;}


return isEmpty(_activeCSSPolls);}__annotator(_runCSSPolls,{'module':'CSSLoader','line':75,'column':0,'name':'_runCSSPolls'});








function _startCSSPoll(name,hardpoint,onLoad,onError){


var signal=document.createElement('meta');
signal.id = 'bootloader_' + name.replace(/[^a-z0-9]/ig,'_');
hardpoint.appendChild(signal);

var alreadyPolling=!isEmpty(_activeCSSPolls);
_expirationTime = Date.now() + CSS_POLL_TIMEOUT;
_activeCSSPolls[name] = {signal:signal,load:onLoad,error:onError};
if(!alreadyPolling){
var interval=setIntervalAcrossTransitions(__annotator(function _pollCSS(){
if(_runCSSPolls()){
clearInterval(interval);}},{'module':'CSSLoader','line':131,'column':48,'name':'_pollCSS'}),

CSS_POLL_INTERVAL);}}__annotator(_startCSSPoll,{'module':'CSSLoader','line':120,'column':0,'name':'_startCSSPoll'});



var CSSLoader={











loadStyleSheet:__annotator(function(name,uri,hardpoint,crossOrigin,onLoad,onError){
if(_styleSheetMap[name]){
throw new Error('CSS component ' + name + ' has already been requested.');}


if(document.createStyleSheet){


var sheetIndex;
for(var ii=0;ii < _ieStyleSheets.length;ii++) {
if(_ieStyleSheets[ii].imports.length < 31){
sheetIndex = ii;
break;}}


if(sheetIndex === undefined){
try{
_ieStyleSheets.push(document.createStyleSheet());}
catch(e) {


onError();
return;}

sheetIndex = _ieStyleSheets.length - 1;}

_ieStyleSheets[sheetIndex].addImport(uri);
_styleSheetMap[name] = {
styleSheet:_ieStyleSheets[sheetIndex],
uri:uri};

_startCSSPoll(name,hardpoint,onLoad,onError);
return;}


var link=document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = uri;
if(crossOrigin){
link.crossOrigin = 'anonymous';}

_styleSheetMap[name] = {link:link};

if(_loadEventSupported){
link.onload = TimeSlice.guard(__annotator(function(){
link.onload = link.onerror = null;
onLoad();},{'module':'CSSLoader','line':196,'column':36}),
'CSSLoader link.onload');
link.onerror = TimeSlice.guard(__annotator(function(){
link.onload = link.onerror = null;
onError();},{'module':'CSSLoader','line':200,'column':37}),
'CSSLoader link.onerror');}else
{

_startCSSPoll(name,hardpoint,onLoad,onError);
if(_loadEventSupported === undefined){
_testLoadEvent(hardpoint);}}


hardpoint.appendChild(link);},{'module':'CSSLoader','line':151,'column':18}),









registerLoadedStyleSheet:__annotator(function(name,link){
if(_styleSheetMap[name]){
throw new Error(
'CSS component ' + name + ' has been requested and should not be ' +
'loaded more than once.');}

_styleSheetMap[name] = {link:link};},{'module':'CSSLoader','line':221,'column':28}),







unloadStyleSheet:__annotator(function(name){
if(!name in _styleSheetMap){
return;}

var info=_styleSheetMap[name];
var link=info.link;
if(link){
link.onload = link.onerror = null;
link.parentNode.removeChild(link);}else
{


var styleSheet=info.styleSheet;
for(var ii=0;ii < styleSheet.imports.length;ii++) {
if(styleSheet.imports[ii].href == info.uri){
styleSheet.removeImport(ii);
break;}}}



delete _activeCSSPolls[name];
delete _styleSheetMap[name];},{'module':'CSSLoader','line':235,'column':20})};



module.exports = CSSLoader;},{'module':'CSSLoader','line':0,'column':0,'name':'$module_CSSLoader'}),null);
/** Path: html/js/downstream/bootloader/Bootloader.js */
/**
 * @generated SignedSource<<499e10df64454d3e50b9178f255e4076>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Bootloader
 * @typechecks
 *
 * "Bootload" resources into a page dynamically.
 * https://our.intern.facebook.com/intern/dex/haste/bootloader/
 */__d('Bootloader',['CSSLoader','CallbackDependencyManager','TimeSlice','ErrorUtils','ex'],__annotator(function $module_Bootloader(global,require,requireDynamic,requireLazy,module,exports,CSSLoader,CallbackDependencyManager,TimeSlice,ErrorUtils,ex){if(require.__markCompiled)require.__markCompiled();







var _requested={};
var _permanent={};


var _componentMap={};
var _timers={};

var _hardpoint=null;


var _resources={};
var _loading={};
var _loaded={};
var _errors={};
var _retries={};



var _earlyResources={};

var _pageScanned=false;

var _bootloadEnabled=false;
var _waitForBootloadEnabled=[];

var _callbackManager=new CallbackDependencyManager();

var _startTime=Date.now();

ErrorUtils.addListener(__annotator(function(err){
err.loadingUrls = Object.keys(_loading);},{'module':'Bootloader','line':59,'column':23}),
true);

function _logError(msg){
var err=new Error(msg);
err.guard = 'Bootloader';
ErrorUtils.reportError(err);}__annotator(_logError,{'module':'Bootloader','line':63,'column':0,'name':'_logError'});





function _isBrowserIE(){
return document.documentMode ||
+(/MSIE.(\d+)/.exec(navigator.userAgent) || [])[1];}__annotator(_isBrowserIE,{'module':'Bootloader','line':72,'column':0,'name':'_isBrowserIE'});


function objectToArray(
obj){return __bodyWrapper(this,arguments,function()
{
return Array.isArray(obj)?obj:[obj];},{params:[[obj,'array<string>|array<object>|string|object','obj']],returns:'array<string>|array<object>'});}__annotator(objectToArray,{'module':'Bootloader','line':77,'column':0,'name':'objectToArray'},{params:['array<string>|array<object>|string|object'],returns:'array<string>|array<object>'});


function _getHardpoint(){
if(!_hardpoint){
var heads=document.getElementsByTagName('head');
_hardpoint = heads.length && heads[0] || document.body;}

return _hardpoint;}__annotator(_getHardpoint,{'module':'Bootloader','line':83,'column':0,'name':'_getHardpoint'});





function _loadJS(source,name,callback,hardpoint){
var script=document.createElement('script');
script.src = source;
script.async = true;
var resource=_resources[name];
if(resource && resource.crossOrigin){
script.crossOrigin = 'anonymous';}

script.onload = TimeSlice.guard(callback,'Bootloader script.onload');
script.onerror = TimeSlice.guard(__annotator(function(){
_errors[source] = true;
callback();},{'module':'Bootloader','line':103,'column':35}),
'Bootloader script.onerror');
script.onreadystatechange = TimeSlice.guard(__annotator(function(){
if(this.readyState in {loaded:1,complete:1}){
callback();}},{'module':'Bootloader','line':107,'column':46}),

'Bootloader script.onreadystatechange');
hardpoint.appendChild(script);
return script;}__annotator(_loadJS,{'module':'Bootloader','line':94,'column':0,'name':'_loadJS'});





function _requestResourceIntoHardpoint(type,source,name,hardpoint){
if(__DEV__){
if(type != 'js' && type != 'css'){
throw new TypeError('Bad resource type "' + type + '".');}}



var callback=Bootloader.done.bind(
null,
[name],
source);

_loading[source] = Date.now();
if(type == 'js'){
_loadJS(source,name,callback,hardpoint);}else
if(type == 'css'){
var resource=_resources[name];
var crossOrigin=resource && resource.crossOrigin;
CSSLoader.loadStyleSheet(name,source,hardpoint,crossOrigin,callback,__annotator(
function(){
_logError(ex('CSS timeout [%s] at %s',name,source));
_errors[source] = true;
callback();},{'module':'Bootloader','line':138,'column':6}));}}__annotator(_requestResourceIntoHardpoint,{'module':'Bootloader','line':119,'column':0,'name':'_requestResourceIntoHardpoint'});







function _unloadResource(name){return __bodyWrapper(this,arguments,function(){
if(!_resources[name]){
_logError(ex('Missing unloading resource %s',name));
return;}


if(_resources[name].type == 'css'){
CSSLoader.unloadStyleSheet(name);
delete _requested[name];
_callbackManager.unsatisfyPersistentDependency(name);}},{params:[[name,'string','name']]});}__annotator(_unloadResource,{'module':'Bootloader','line':149,'column':0,'name':'_unloadResource'},{params:['string']});







function _loadComponents(components,callback){return __bodyWrapper(this,arguments,function(){



if(!_bootloadEnabled){
_waitForBootloadEnabled.push([components,callback]);
return;}


components = objectToArray(components);
var required_resources=[];
for(var ii=0;ii < components.length;++ii) {
if(!components[ii]){
_logError(ex('Empty component!'));
continue;}


var metadata=_componentMap[components[ii]];
if(metadata){
var component_resource_list=metadata.resources;


for(var jj=0;jj < component_resource_list.length;++jj) {
required_resources.push(component_resource_list[jj]);}}else

{}}



Bootloader.loadResources(required_resources,callback);},{params:[[components,'array<string>|string','components'],[callback,'function|number','callback']]});}__annotator(_loadComponents,{'module':'Bootloader','line':166,'column':0,'name':'_loadComponents'},{params:['array<string>|string','function|number']});






function _resolveResources(resources){return __bodyWrapper(this,arguments,function(){
if(!resources){
return [];}

var resolved=[];
for(var ii=0;ii < resources.length;++ii) {
if(typeof resources[ii] == 'string'){
if(resources[ii] in _resources){
resolved.push(_resources[resources[ii]]);}else
{
_logError(ex('Unable to resolve resource %s.',resources[ii]));}}else

{
resolved.push(resources[ii]);}}


return resolved;},{params:[[resources,'array<string>|array<object>','resources']],returns:'array<object>'});}__annotator(_resolveResources,{'module':'Bootloader','line':202,'column':0,'name':'_resolveResources'},{params:['array<string>|array<object>'],returns:'array<object>'});






function _pickupPageResources(){
if(_pageScanned){
return;}

_pageScanned = true;
var el,hash,i;
var links=document.getElementsByTagName('link');
for(i = 0;i < links.length;i++) {
el = links[i];


if(hash = el.getAttribute('data-bootloader-hash')){
_resources[hash] = {name:hash,src:el.href,type:'css'};

if(el.getAttribute('data-permanent')){
_resources[hash].permanent = _permanent[hash] = true;}


CSSLoader.registerLoadedStyleSheet(hash,el);
Bootloader.done([hash]);
_earlyResources[hash] = true;}}



var scripts=document.getElementsByTagName('script');
for(i = 0;i < scripts.length;i++) {
el = scripts[i];
if(hash = el.getAttribute('data-bootloader-hash')){
_resources[hash] = {name:hash,src:el.src,type:'js'};
if(el.getAttribute('async')){

if(window._btldr && window._btldr[hash]){

Bootloader.done([hash]);}else
{

el.setAttribute('onload',el.getAttribute('onload') +
";require" + "('Bootloader').done(['" + hash + "']);");
el.setAttribute('onerror',el.getAttribute('onerror') +
";require" + "('Bootloader').done(['" + hash + "']);");
_requested[hash] = true;}}else

{

Bootloader.done([hash]);}

_earlyResources[hash] = true;}}}__annotator(_pickupPageResources,{'module':'Bootloader','line':225,'column':0,'name':'_pickupPageResources'});










var Bootloader={















loadComponents:__annotator(function(components,callback){return __bodyWrapper(this,arguments,function(){
components = objectToArray(components);
var modules=[];
for(var ii=0;ii < components.length;ii++) {
var metadata=_componentMap[components[ii]];
var legacy_component='legacy:' + components[ii];
if(_componentMap[legacy_component]){
if(metadata){
_logError(ex('%s has a conflicting legacy component. ' +
'That cannot happen and legacy won btw.',components[ii]));}

components[ii] = legacy_component;
modules.push(legacy_component);
continue;}

if(!metadata){
_logError(ex('loadComponents: %s is not in the component map.',
components[ii]));}else
if(metadata.module){
modules.push(components[ii]);
_logError(ex('loadComponents: Loading module %s!',components[ii]));}}



_loadComponents(
components,
modules.length?requireLazy.bind(null,modules,callback):callback);},{params:[[components,'string|array<string>','components'],[callback,'function|number','callback']]});},{'module':'Bootloader','line':298,'column':18},{params:['string|array<string>','function|number']}),

















loadModules:__annotator(function(components,callback){return __bodyWrapper(this,arguments,function(){
var modules=[];
for(var ii=0;ii < components.length;ii++) {
var metadata=_componentMap[components[ii]];
if(!metadata){
_logError(ex('loadModules: %s is not in the component map.',
components[ii]));

modules.push(components[ii]);}else
if(metadata.module){
modules.push(components[ii]);}else
{
var rsrc_list=metadata.resources,css=true;
for(var j=0;j < rsrc_list.length;j++) {
var rsrc=_resources[rsrc_list[j]];
if(!rsrc || rsrc.type != 'css'){
css = false;}}


if(!css){
_logError(ex('loadModules: %s is not a module!',
components[ii]));}}}




_loadComponents(components,requireLazy.bind(null,modules,callback));},{params:[[components,'array<string>','components'],[callback,'function|number','callback']]});},{'module':'Bootloader','line':342,'column':15},{params:['array<string>','function|number']}),















loadResources:__annotator(function(resources,callbackOrCallbackID,replace,tag){return __bodyWrapper(this,arguments,function(){
var ii;

_pickupPageResources();

resources = _resolveResources(objectToArray(resources));
if(replace){
var map={};

for(ii = 0;ii < resources.length;++ii) {
map[resources[ii].name] = true;}


for(var k in _requested) {
if(!(k in _permanent || k in map || k in _earlyResources)){
_unloadResource(k);}}















_earlyResources = {};}

var will_request=[];
var pending=[];
for(ii = 0;ii < resources.length;++ii) {
var rsrc=resources[ii];

if(rsrc.permanent){
_permanent[rsrc.name] = true;}


if(_callbackManager.isPersistentDependencySatisfied(rsrc.name)){
continue;}


if(!rsrc.nonblocking){
pending.push(rsrc.name);}


if(!_requested[rsrc.name]){
_requested[rsrc.name] = true;
will_request.push(rsrc);
window.CavalryLogger &&
window.CavalryLogger.getInstance().measureResources(rsrc,tag);}}



var callbackID;
if(callbackOrCallbackID){
if(typeof callbackOrCallbackID === 'function'){
callbackID = _callbackManager.registerCallback(
callbackOrCallbackID,
pending);}else

{
callbackID = _callbackManager.addDependenciesToExistingCallback(
callbackOrCallbackID,
pending);}}






var hardpoint=_getHardpoint();
var batching_hardpoint=
_isBrowserIE()?hardpoint:document.createDocumentFragment();

for(ii = 0;ii < will_request.length;++ii) {
_requestResourceIntoHardpoint(
will_request[ii].type,
will_request[ii].src,
will_request[ii].name,
batching_hardpoint);}

if(hardpoint !== batching_hardpoint){
hardpoint.appendChild(batching_hardpoint);}


return callbackID;},{params:[[resources,'object|array<string>|array<object>','resources'],[callbackOrCallbackID,'?function|number','callbackOrCallbackID'],[replace,'?boolean','replace'],[tag,'?string','tag']],returns:'?number'});},{'module':'Bootloader','line':384,'column':17},{params:['object|array<string>|array<object>','?function|number','?boolean','?string'],returns:'?number'}),











requestJSResource:__annotator(function(source){return __bodyWrapper(this,arguments,function(){
var hardpoint=_getHardpoint();
_requestResourceIntoHardpoint('js',source,null,hardpoint);},{params:[[source,'string','source']]});},{'module':'Bootloader','line':486,'column':21},{params:['string']}),













done:__annotator(function(names,url){return __bodyWrapper(this,arguments,function(){
if(url){
_loaded[url] = Date.now() - _loading[url];
delete _loading[url];
if(_timers[url]){
clearTimeout(_timers[url]);
delete _timers[url];}}










if(window.CavalryLogger){
window.CavalryLogger.done_js(names);}





for(var ii=0;ii < names.length;++ii) {
var loaded_resource=names[ii];




if(loaded_resource){
_requested[loaded_resource] = true;
_callbackManager.satisfyPersistentDependency(loaded_resource);}}},{params:[[names,'array<string>','names'],[url,'?string','url']]});},{'module':'Bootloader','line':502,'column':8},{params:['array<string>','?string']}),












enableBootload:__annotator(function(map){return __bodyWrapper(this,arguments,function(){
for(var resource in map) {






if(!_componentMap[resource]){
_componentMap[resource] = map[resource];}}









if(!_bootloadEnabled){
_bootloadEnabled = true;
for(var ii=0;ii < _waitForBootloadEnabled.length;ii++) {
_loadComponents.apply(null,_waitForBootloadEnabled[ii]);}

_waitForBootloadEnabled = [];}},{params:[[map,'object','map']]});},{'module':'Bootloader','line':547,'column':18},{params:['object']}),









setResourceMap:__annotator(function(resources){return __bodyWrapper(this,arguments,function(){
for(var id in resources) {
if(!_resources[id]){
resources[id].name = id;
_resources[id] = resources[id];}}},{params:[[resources,'object','resources']]});},{'module':'Bootloader','line':581,'column':18},{params:['object']}),








getResourceURLs:__annotator(function(){
var resources={};
for(var id in _resources) {
var url=_resources[id].src;
resources[url] = id in _requested && !(url in _errors) &&
!(url in _loading);}

return resources;},{'module':'Bootloader','line':594,'column':19}),







loadEarlyResources:__annotator(function(resources){return __bodyWrapper(this,arguments,function(){
Bootloader.setResourceMap(resources);

var resolve_map=[];
for(var id in resources) {
var resource=_resources[id];
resolve_map.push(resource);
if(!resource.permanent){
_earlyResources[resource.name] = true;}}


Bootloader.loadResources(resolve_map);},{params:[[resources,'object','resources']]});},{'module':'Bootloader','line':609,'column':22},{params:['object']}),






getLoadingUrls:__annotator(function(){
var results={};
var nowTime=Date.now();
for(var url in _loading) {
results[url] = nowTime - _loading[url];}

return results;},{'module':'Bootloader','line':627,'column':18}),





getLoadedUrlTimes:__annotator(function(){
return _loaded;},{'module':'Bootloader','line':639,'column':21}),





getErrorUrls:__annotator(function(){
return Object.keys(_errors);},{'module':'Bootloader','line':646,'column':16}),





getStartTime:__annotator(function(){
return _startTime;},{'module':'Bootloader','line':653,'column':16}),




__debug:{
callbackManager:_callbackManager,
componentMap:_componentMap,
requested:_requested,
resources:_resources,
retries:_retries,
earlyResources:_earlyResources}};



module.exports = Bootloader;},{'module':'Bootloader','line':0,'column':0,'name':'$module_Bootloader'}),null);
/** Path: html/js/modules/JSCC.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule JSCC
 */__d('JSCC',[],__annotator(function $module_JSCC(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var factories={};

function createFactory(constructor){
var instance;
var constructed=false;
return __annotator(function(){
if(!constructed){
instance = constructor();
constructed = true;}

return instance;},{'module':'JSCC','line':12,'column':9});}__annotator(createFactory,{'module':'JSCC','line':9,'column':0,'name':'createFactory'});



var JSCC={
get:__annotator(function(key){
if(!factories[key]){
console.error(
'%s is not in JSCC. Either JSCC.init() did not receive the JSCC map ' +
'or it was prematurely cleared.',
key);
throw new Error('JSCC entry is missing');}

return factories[key]();},{'module':'JSCC','line':22,'column':7}),







init:__annotator(function(constructors){
for(var key in constructors) {
factories[key] = createFactory(constructors[key]);}


return __annotator(function clearJSCC(){
for(var key in constructors) {
delete factories[key];}},{'module':'JSCC','line':43,'column':11,'name':'clearJSCC'});},{'module':'JSCC','line':38,'column':8})};





module.exports = JSCC;},{'module':'JSCC','line':0,'column':0,'name':'$module_JSCC'}),null);
/** Path: html/js/modules/pagelets/PageletSet.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule PageletSet
 * @preventMunge
 */__d('PageletSet',['Arbiter'],__annotator(function $module_PageletSet(global,require,requireDynamic,requireLazy,module,exports,Arbiter){if(require.__markCompiled)require.__markCompiled();







var _pagelets={};

var PageletSet={
hasPagelet:__annotator(function(id){
return _pagelets.hasOwnProperty(id);},{'module':'PageletSet','line':17,'column':14}),


getPagelet:__annotator(function(id){
if(__DEV__){
if(!PageletSet.hasPagelet(id)){
throw new Error('Pagelet "' + id + '" is not on the page');}}


return _pagelets[id];},{'module':'PageletSet','line':21,'column':14}),


getOrCreatePagelet:__annotator(function(id){
if(!PageletSet.hasPagelet(id)){
var pagelet=new Pagelet(id);
_pagelets[id] = pagelet;}

return PageletSet.getPagelet(id);},{'module':'PageletSet','line':30,'column':22}),


getPageletIDs:__annotator(function(){
return Object.keys(_pagelets);},{'module':'PageletSet','line':38,'column':17}),


removePagelet:__annotator(function(id){
if(PageletSet.hasPagelet(id)){
_pagelets[id].destroy();
delete _pagelets[id];}else
if(__DEV__){
throw new Error('Pagelet "' + id + '" is not on the page');}},{'module':'PageletSet','line':42,'column':17})};




function _contains(outer,inner){
return outer.contains?
outer.contains(inner):

outer.compareDocumentPosition(inner) & 16;}__annotator(_contains,{'module':'PageletSet','line':52,'column':0,'name':'_contains'});



function Pagelet(id){'use strict';
this.id = id;
this._root = null;
this._destructors = [];

this.addDestructor(__annotator(function broadcastDemise(){
Arbiter.inform('pagelet/destroy',{id:this.id,root:this._root});},{'module':'PageletSet','line':65,'column':23,'name':'broadcastDemise'}).
bind(this));}__annotator(Pagelet,{'module':'PageletSet','line':60,'column':2,'name':'Pagelet'});Pagelet.prototype.


setRoot = __annotator(function(root){'use strict';
if(__DEV__){
if(this._root && root !== this._root){
throw new Error(
'Pagelet "' + this.id + '" already has a root element: ' +
this._root.id);}}



this._root = root;},{'module':'PageletSet','line':70,'column':9});Pagelet.prototype.


_getDescendantPagelets = __annotator(function(){'use strict';
var descendants=[];
if(!this._root){
return descendants;}


var pageletIDs=PageletSet.getPageletIDs();
for(var ii=0;ii < pageletIDs.length;ii++) {
var id=pageletIDs[ii];
if(id === this.id){
continue;}

var pagelet=_pagelets[id];
if(pagelet._root && _contains(this._root,pagelet._root)){
descendants.push(pagelet);}}



return descendants;},{'module':'PageletSet','line':82,'column':24});Pagelet.prototype.


addDestructor = __annotator(function(destructor){'use strict';
this._destructors.push(destructor);},{'module':'PageletSet','line':103,'column':15});Pagelet.prototype.


destroy = __annotator(function(){'use strict';

var descendants=this._getDescendantPagelets();
for(var ii=0;ii < descendants.length;ii++) {
var descendant=descendants[ii];
if(PageletSet.hasPagelet(descendant.id)){
PageletSet.removePagelet(descendant.id);}}



for(ii = 0;ii < this._destructors.length;ii++) {
this._destructors[ii]();}


if(this._root){
while(this._root.firstChild) {
this._root.removeChild(this._root.firstChild);}}},{'module':'PageletSet','line':107,'column':9});





module.exports = PageletSet;},{'module':'PageletSet','line':0,'column':0,'name':'$module_PageletSet'}),null);
/** Path: html/js/downstream/functional/forEachObject.js */
/**
 * @generated SignedSource<<63d238473f2f7d1918fccf00f9ca824b>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule forEachObject
 * @typechecks
 */__d('forEachObject',[],__annotator(function $module_forEachObject(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

'use strict';

var hasOwnProperty=Object.prototype.hasOwnProperty;



















function forEachObject(object,callback,context){return __bodyWrapper(this,arguments,function(){
for(var name in object) {
if(hasOwnProperty.call(object,name)){
callback.call(context,object[name],name,object);}}},{params:[[object,'?object','object'],[callback,'function','callback']]});}__annotator(forEachObject,{'module':'forEachObject','line':43,'column':0,'name':'forEachObject'},{params:['?object','function']});




module.exports = forEachObject;},{'module':'forEachObject','line':0,'column':0,'name':'$module_forEachObject'}),null);
/** Path: html/js/downstream/page/TimerStorage.js */
/**
 * @generated SignedSource<<6d120adb91dd9e5c4edfb129386f1c2b>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule TimerStorage
 */__d('TimerStorage',['forEachObject'],__annotator(function $module_TimerStorage(global,require,requireDynamic,requireLazy,module,exports,forEachObject){if(require.__markCompiled)require.__markCompiled();







var _storageNames={
TIMEOUT:'TIMEOUT',
INTERVAL:'INTERVAL',
IMMEDIATE:'IMMEDIATE',
ANIMATION_FRAME:'ANIMATION_FRAME'};


var _storages={};

forEachObject(_storageNames,__annotator(function(_,name){return _storages[name] = [];},{'module':'TimerStorage','line':35,'column':29}));

var TimerStorage={
push:__annotator(function(name,id){
_storages[name].push(id);},{'module':'TimerStorage','line':38,'column':6}),


popAll:__annotator(function(name,callback){
_storages[name].forEach(callback);
_storages[name].length = 0;},{'module':'TimerStorage','line':42,'column':8})};



Object.assign(TimerStorage,_storageNames);

module.exports = TimerStorage;},{'module':'TimerStorage','line':0,'column':0,'name':'$module_TimerStorage'}),null);
/** Path: html/js/downstream/core/nativeRequestAnimationFrame.js */
/**
 * @generated SignedSource<<97623fb6b843426f368ddf3ff905a4d0>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule nativeRequestAnimationFrame
 */__d("nativeRequestAnimationFrame",[],__annotator(function $module_nativeRequestAnimationFrame(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var nativeRequestAnimationFrame=
global.requestAnimationFrame ||
global.webkitRequestAnimationFrame ||
global.mozRequestAnimationFrame ||
global.oRequestAnimationFrame ||
global.msRequestAnimationFrame;

module.exports = nativeRequestAnimationFrame;},{"module":"nativeRequestAnimationFrame","line":0,"column":0,"name":"$module_nativeRequestAnimationFrame"}),null);
/** Path: html/js/downstream/core/requestAnimationFramePolyfill.js */
/**
 * @generated SignedSource<<22e8e5a7aa45779803b7027e1c116a61>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule requestAnimationFramePolyfill
 */__d('requestAnimationFramePolyfill',['emptyFunction','nativeRequestAnimationFrame'],__annotator(function $module_requestAnimationFramePolyfill(global,require,requireDynamic,requireLazy,module,exports,emptyFunction,nativeRequestAnimationFrame){if(require.__markCompiled)require.__markCompiled();




var lastTime=0;





var requestAnimationFrame=
nativeRequestAnimationFrame || __annotator(
function(callback){
var currTime=Date.now();
var timeDelay=Math.max(0,16 - (currTime - lastTime));
lastTime = currTime + timeDelay;
return global.setTimeout(__annotator(function(){
callback(Date.now());},{'module':'requestAnimationFramePolyfill','line':35,'column':29}),
timeDelay);},{'module':'requestAnimationFramePolyfill','line':31,'column':2});



requestAnimationFrame(emptyFunction);

module.exports = requestAnimationFrame;},{'module':'requestAnimationFramePolyfill','line':0,'column':0,'name':'$module_requestAnimationFramePolyfill'}),null);
/** Path: html/js/downstream/page/requestAnimationFrameAcrossTransitions.js */
/**
 * @generated SignedSource<<84964d909d9f9bf6c23eec24d2df46f7>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule requestAnimationFrameAcrossTransitions
 */__d('requestAnimationFrameAcrossTransitions',['TimeSlice','requestAnimationFramePolyfill'],__annotator(function $module_requestAnimationFrameAcrossTransitions(global,require,requireDynamic,requireLazy,module,exports,TimeSlice,requestAnimationFramePolyfill){if(require.__markCompiled)require.__markCompiled();









module.exports = __annotator(function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}
args[0] = TimeSlice.guard(args[0],'requestAnimationFrame');
return requestAnimationFramePolyfill.apply(global,args);},{'module':'requestAnimationFrameAcrossTransitions','line':28,'column':18});},{'module':'requestAnimationFrameAcrossTransitions','line':0,'column':0,'name':'$module_requestAnimationFrameAcrossTransitions'}),null);
/** Path: html/js/downstream/page/requestAnimationFrame.js */
/**
 * @generated SignedSource<<40742e37f4cec92e88cad7520daae8be>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule requestAnimationFrame
 */__d('requestAnimationFrame',['TimerStorage','requestAnimationFrameAcrossTransitions'],__annotator(function $module_requestAnimationFrame(global,require,requireDynamic,requireLazy,module,exports,TimerStorage,requestAnimationFrameAcrossTransitions){if(require.__markCompiled)require.__markCompiled();









module.exports = __annotator(function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key < _len;_key++) {args[_key] = arguments[_key];}
var id=requestAnimationFrameAcrossTransitions.apply(global,args);
TimerStorage.push(TimerStorage.ANIMATION_FRAME,id);
return id;},{'module':'requestAnimationFrame','line':28,'column':17});},{'module':'requestAnimationFrame','line':0,'column':0,'name':'$module_requestAnimationFrame'}),null);
/** Path: html/js/modules/ResourceLazyLoader.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ResourceLazyLoader
 * @has-side-effects
 */__d('ResourceLazyLoader',['requestAnimationFrame'],__annotator(function $module_ResourceLazyLoader(global,require,requireDynamic,requireLazy,module,exports,requestAnimationFrame){if(require.__markCompiled)require.__markCompiled();




var doc=document.documentElement;

var PIXEL=
'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';
var ONLOAD='onload';
var ONLOAD_FN='__RLZ';
var DATA_KEY='data-lazy-src';
var ONLOAD_KEY=DATA_KEY + '-' + ONLOAD;

var canLazyLoad=!!(doc && doc.getBoundingClientRect);
var imagesQueued={};
var imageState={
SHOWN:0,
HIDDEN:1};


var integrateWithReact=false;
var stopLazyLoading=false;

function lazifyResourcesInMarkup(markup){
if(canLazyLoad){
var div=document.createElement('div');
div.innerHTML = markup;
var resources=[].slice.call(div.getElementsByTagName('img'));
for(var i=0,l=resources.length;i < l;i++) {
var resource=resources[i];
var src=resource.getAttribute('src');
if(src && !/^data:image\//.test(src)){
var onload=resource.getAttribute(ONLOAD);
if(onload){
resource.setAttribute(ONLOAD_KEY,onload);}

resource.setAttribute(ONLOAD,ONLOAD_FN + '(this);');
resource.setAttribute(DATA_KEY,src);
resource.setAttribute('src',PIXEL);}}


return div.innerHTML;}

return markup;}__annotator(lazifyResourcesInMarkup,{'module':'ResourceLazyLoader','line':30,'column':0,'name':'lazifyResourcesInMarkup'});


function showNode(node){
var src;
if(node.lazyLoad){
node.lazyLoad();
src = node.getSrc();}else
{
var onload=node.getAttribute(ONLOAD_KEY);
node.setAttribute('onload',onload);
src = node.getAttribute(DATA_KEY);
node.setAttribute('src',src);
node.removeAttribute(DATA_KEY);
node.removeAttribute(ONLOAD_KEY);}

imagesQueued[src] = imageState.SHOWN;}__annotator(showNode,{'module':'ResourceLazyLoader','line':53,'column':0,'name':'showNode'});


function isInViewport(node){
if(doc.contains(node)){
var rect=node.getBoundingClientRect();
var top=rect.top - doc.clientTop;
return window.innerHeight > top && rect.bottom > 0;}

return false;}__annotator(isInViewport,{'module':'ResourceLazyLoader','line':69,'column':0,'name':'isInViewport'});


var requestedCheckOnLoadNodes=[];
var scheduledCheckRecentlyLoadedNodes;
function onLoad(node){
requestedCheckOnLoadNodes.push(node);
if(!scheduledCheckRecentlyLoadedNodes){
scheduledCheckRecentlyLoadedNodes = true;
requestAnimationFrame(checkRecentlyLoadedNodes);}}__annotator(onLoad,{'module':'ResourceLazyLoader','line':80,'column':0,'name':'onLoad'});



var nodesToLazyLoad=[];
var listening;
function checkRecentlyLoadedNodes(){
var nodesInViewportCheck=requestedCheckOnLoadNodes.map(isInViewport);
for(var i=0,l=requestedCheckOnLoadNodes.length;i < l;i++) {
var node=requestedCheckOnLoadNodes[i];
if(nodesInViewportCheck[i]){
showNode(node);}else
{
nodesToLazyLoad.push(node);
if(!listening){
listening = true;
window.addEventListener('scroll',throttledCheckForVisibleNodes);
doc.addEventListener('resize',throttledCheckForVisibleNodes);}

var src;
if(node.getSrc){
src = node.getSrc();}else
{
src = node.getAttribute(DATA_KEY);}

if(imagesQueued[src] !== imageState.SHOWN){
imagesQueued[src] = imageState.HIDDEN;}}}



requestedCheckOnLoadNodes = [];
scheduledCheckRecentlyLoadedNodes = false;}__annotator(checkRecentlyLoadedNodes,{'module':'ResourceLazyLoader','line':90,'column':0,'name':'checkRecentlyLoadedNodes'});


function checkForVisibleNodes(loadAll){
if(loadAll){
nodesToLazyLoad.forEach(showNode);
nodesToLazyLoad = [];}else
{
var nodesInViewportCheck=nodesToLazyLoad.map(isInViewport);
for(var i=0,j=0;i < nodesToLazyLoad.length;i++) {
var node=nodesToLazyLoad[i - j];
if(nodesInViewportCheck[i]){
nodesToLazyLoad.splice(i - j,1);
j += 1;
showNode(node);}}}



if(!nodesToLazyLoad.length){
listening = false;
window.removeEventListener('scroll',throttledCheckForVisibleNodes);
doc.removeEventListener('resize',throttledCheckForVisibleNodes);}}__annotator(checkForVisibleNodes,{'module':'ResourceLazyLoader','line':118,'column':0,'name':'checkForVisibleNodes'});



var lastTime=0;
var hasTimeout;
function throttledCheckForVisibleNodes(){
var now=Date.now();
var diff=now - lastTime;
if(diff > 200){
lastTime = now;
clearTimeout(hasTimeout);
hasTimeout = false;
requestAnimationFrame(checkForVisibleNodes.bind(null,false));}else
if(!hasTimeout){
hasTimeout = setTimeout(throttledCheckForVisibleNodes,diff);}}__annotator(throttledCheckForVisibleNodes,{'module':'ResourceLazyLoader','line':142,'column':0,'name':'throttledCheckForVisibleNodes'});



global[ONLOAD_FN] = onLoad;

module.exports = {
lazifyResourcesInMarkup:lazifyResourcesInMarkup,
loadAllResourcesAndStopLazyLoading:__annotator(function(){
stopLazyLoading = true;
requestAnimationFrame(checkForVisibleNodes.bind(null,true));},{'module':'ResourceLazyLoader','line':159,'column':36}),

getNotLoadedCount:__annotator(function(){
var notLoadedCount=0;
for(var key in imagesQueued) {
notLoadedCount += imagesQueued[key];}

return notLoadedCount;},{'module':'ResourceLazyLoader','line':163,'column':19}),

integrateWithReact:__annotator(function(){
integrateWithReact = true;},{'module':'ResourceLazyLoader','line':170,'column':20}),


_isReactIntegrated:__annotator(function(){
return integrateWithReact;},{'module':'ResourceLazyLoader','line':174,'column':20}),

_didStopLazyLoading:__annotator(function(){
return stopLazyLoading;},{'module':'ResourceLazyLoader','line':177,'column':21}),

_onLoad:onLoad,
PIXEL:PIXEL};},{'module':'ResourceLazyLoader','line':0,'column':0,'name':'$module_ResourceLazyLoader'}),6);
/** Path: html/js/downstream/core/getMarkupWrap.js */
/**
 * @generated SignedSource<<dfc29a94fb2a115212e3e76a01f56331>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule getMarkupWrap
 */__d('getMarkupWrap',['ExecutionEnvironment','invariant'],__annotator(function $module_getMarkupWrap(global,require,requireDynamic,requireLazy,module,exports,ExecutionEnvironment,invariant){if(require.__markCompiled)require.__markCompiled();










var dummyNode=
ExecutionEnvironment.canUseDOM?document.createElement('div'):null;








var shouldWrap={};

var selectWrap=[1,'<select multiple="true">','</select>'];
var tableWrap=[1,'<table>','</table>'];
var trWrap=[3,'<table><tbody><tr>','</tr></tbody></table>'];

var svgWrap=[1,'<svg xmlns="http://www.w3.org/2000/svg">','</svg>'];

var markupWrap={
'*':[1,'?<div>','</div>'],

'area':[1,'<map>','</map>'],
'col':[2,'<table><tbody></tbody><colgroup>','</colgroup></table>'],
'legend':[1,'<fieldset>','</fieldset>'],
'param':[1,'<object>','</object>'],
'tr':[2,'<table><tbody>','</tbody></table>'],

'optgroup':selectWrap,
'option':selectWrap,

'caption':tableWrap,
'colgroup':tableWrap,
'tbody':tableWrap,
'tfoot':tableWrap,
'thead':tableWrap,

'td':trWrap,
'th':trWrap};





var svgElements=[
'circle',
'clipPath',
'defs',
'ellipse',
'g',
'image',
'line',
'linearGradient',
'mask',
'path',
'pattern',
'polygon',
'polyline',
'radialGradient',
'rect',
'stop',
'text',
'tspan'];

svgElements.forEach(__annotator(function(nodeName){
markupWrap[nodeName] = svgWrap;
shouldWrap[nodeName] = true;},{'module':'getMarkupWrap','line':92,'column':20}));










function getMarkupWrap(nodeName){
!!!dummyNode?invariant(0,'Markup wrapping node not initialized'):undefined;
if(!markupWrap.hasOwnProperty(nodeName)){
nodeName = '*';}

if(!shouldWrap.hasOwnProperty(nodeName)){
if(nodeName === '*'){
dummyNode.innerHTML = '<link />';}else
{
dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';}

shouldWrap[nodeName] = !dummyNode.firstChild;}

return shouldWrap[nodeName]?markupWrap[nodeName]:null;}__annotator(getMarkupWrap,{'module':'getMarkupWrap','line':105,'column':0,'name':'getMarkupWrap'});



module.exports = getMarkupWrap;},{'module':'getMarkupWrap','line':0,'column':0,'name':'$module_getMarkupWrap'}),null);
/** Path: html/js/downstream/core/createNodesFromMarkup.js */
/**
 * @generated SignedSource<<dddc94589fbf43d04d5f65981b4bc91d>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule createNodesFromMarkup
 * @typechecks
 */__d('createNodesFromMarkup',['ExecutionEnvironment','createArrayFromMixed','getMarkupWrap','invariant'],__annotator(function $module_createNodesFromMarkup(global,require,requireDynamic,requireLazy,module,exports,ExecutionEnvironment,createArrayFromMixed,getMarkupWrap,invariant){if(require.__markCompiled)require.__markCompiled();












var dummyNode=
ExecutionEnvironment.canUseDOM?document.createElement('div'):null;




var nodeNamePattern=/^\s*<(\w+)/;







function getNodeName(markup){return __bodyWrapper(this,arguments,function(){
var nodeNameMatch=markup.match(nodeNamePattern);
return nodeNameMatch && nodeNameMatch[1].toLowerCase();},{params:[[markup,'string','markup']],returns:'?string'});}__annotator(getNodeName,{'module':'createNodesFromMarkup','line':46,'column':0,'name':'getNodeName'},{params:['string'],returns:'?string'});












function createNodesFromMarkup(markup,handleScript){return __bodyWrapper(this,arguments,function(){
var node=dummyNode;
!!!dummyNode?invariant(0,'createNodesFromMarkup dummy not initialized'):undefined;
var nodeName=getNodeName(markup);

var wrap=nodeName && getMarkupWrap(nodeName);
if(wrap){
node.innerHTML = wrap[1] + markup + wrap[2];

var wrapDepth=wrap[0];
while(wrapDepth--) {
node = node.lastChild;}}else

{
node.innerHTML = markup;}


var scripts=node.getElementsByTagName('script');
if(scripts.length){
!
handleScript?invariant(0,
'createNodesFromMarkup(...): Unexpected <script> element rendered.'):undefined;

createArrayFromMixed(scripts).forEach(handleScript);}


var nodes=createArrayFromMixed(node.childNodes);
while(node.lastChild) {
node.removeChild(node.lastChild);}

return nodes;},{params:[[markup,'string','markup'],[handleScript,'?function','handleScript']],returns:'array<HTMLElement>|array<DOMTextNode>'});}__annotator(createNodesFromMarkup,{'module':'createNodesFromMarkup','line':61,'column':0,'name':'createNodesFromMarkup'},{params:['string','?function'],returns:'array<HTMLElement>|array<DOMTextNode>'});


module.exports = createNodesFromMarkup;},{'module':'createNodesFromMarkup','line':0,'column':0,'name':'$module_createNodesFromMarkup'}),null);
/** Path: html/js/downstream/core/evalGlobal.js */
/**
 * @generated SignedSource<<ba802051ad965a4479b1a69ced52e27c>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule evalGlobal
 */__d('evalGlobal',[],__annotator(function $module_evalGlobal(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();








function evalGlobal(js){
if(typeof js != 'string'){
throw new TypeError(
'JS sent to evalGlobal is not a string. Only strings are permitted.');}


if(!js){
return;}


var script=document.createElement('script');
try{
script.appendChild(document.createTextNode(js));}
catch(e) {
script.text = js;}

var head=document.getElementsByTagName('head')[0] ||
document.documentElement;
head.appendChild(script);
head.removeChild(script);}__annotator(evalGlobal,{'module':'evalGlobal','line':27,'column':0,'name':'evalGlobal'});


module.exports = evalGlobal;},{'module':'evalGlobal','line':0,'column':0,'name':'$module_evalGlobal'}),null);
/** Path: html/js/downstream/html/HTML.js */
/**
 * @generated SignedSource<<26d4a69814d99c363fc64224beb9fcdf>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule HTML
 * @preventMunge
 */__d('HTML',['Bootloader','createNodesFromMarkup','emptyFunction','evalGlobal','invariant'],__annotator(function $module_HTML(global,require,requireDynamic,requireLazy,module,exports,Bootloader,createNodesFromMarkup,emptyFunction,evalGlobal,invariant){if(require.__markCompiled)require.__markCompiled();










var selfClosingTagsPattern=/(<(\w+)[^>]*?)\/>/g;

var selfClosingTags={
'abbr':true,
'area':true,
'br':true,
'col':true,
'embed':true,
'hr':true,
'img':true,
'input':true,
'link':true,
'meta':true,
'param':true};





















function HTML(markup){'use strict';
if(markup && typeof markup.__html === 'string'){



console.warn('HTML: Superfluous HTML() call.');
markup = markup.__html;}


if(!(this instanceof HTML)){
if(markup instanceof HTML){
return markup;}

return new HTML(markup);}


if(markup){
var markupType=typeof markup;
!(
markupType === 'string')?invariant(0,
'HTML: Markup argument must be a string, got %s.',
markupType):undefined;}



this._markup = markup || '';
this._defer = false;
this._extraAction = '';
this._nodes = null;
this._inlineJS = emptyFunction;
this._rootNode = null;}__annotator(HTML,{'module':'HTML','line':65,'column':2,'name':'HTML'});HTML.prototype.








toString = __annotator(function(){'use strict';
var markup=this._markup;
if(this._extraAction){
markup += '<script type="text/javascript">' + this._extraAction +
'</scr' + 'ipt>';}

return markup;},{'module':'HTML','line':104,'column':10});HTML.prototype.







getContent = __annotator(function(){'use strict';
return this._markup;},{'module':'HTML','line':118,'column':12});HTML.prototype.












getNodes = __annotator(function(){'use strict';
this._fillCache();
return this._nodes;},{'module':'HTML','line':132,'column':10});HTML.prototype.









getRootNode = __annotator(function(){'use strict';
!
!this._rootNode?invariant(0,
'HTML: You cannot call `getRootNode` on an HTML instance more than once.'):undefined;

var nodes=this.getNodes();

if(nodes.length === 1){

this._rootNode = nodes[0];}else
{

var fragment=document.createDocumentFragment();
for(var ii=0;ii < nodes.length;ii++) {
fragment.appendChild(nodes[ii]);}

this._rootNode = fragment;}


return this._rootNode;},{'module':'HTML','line':144,'column':13});HTML.prototype.








getAction = __annotator(function(){'use strict';
this._fillCache();
var evaluateJS=__annotator(function(){
this._inlineJS();
evalGlobal(this._extraAction);},{'module':'HTML','line':174,'column':21}).bind(this);

return this._defer?__annotator(
function(){setTimeout(evaluateJS,0);},{'module':'HTML','line':179,'column':6}):
evaluateJS;},{'module':'HTML','line':172,'column':11});HTML.prototype.






_fillCache = __annotator(function(){'use strict';
if(this._nodes !== null){
return;}

if(!this._markup){
this._nodes = [];
return;}



var markup=this._markup.replace(
selfClosingTagsPattern,__annotator(
function(match,front,tag){
return selfClosingTags[tag.toLowerCase()]?
match:
front + '></' + tag + '>';},{'module':'HTML','line':199,'column':6}));



var callbacks=null;

var nodes=createNodesFromMarkup(markup,__annotator(function(scriptNode){

callbacks = callbacks || [];
callbacks.push(
scriptNode.src?
Bootloader.requestJSResource.bind(Bootloader,scriptNode.src):
evalGlobal.bind(null,scriptNode.innerHTML));

scriptNode.parentNode.removeChild(scriptNode);},{'module':'HTML','line':208,'column':46}));


if(callbacks){
this._inlineJS = __annotator(function(){
for(var i=0;i < callbacks.length;i++) {
callbacks[i]();}},{'module':'HTML','line':220,'column':23});}




this._nodes = nodes;},{'module':'HTML','line':187,'column':12});HTML.prototype.













setAction = __annotator(function(js){'use strict';
this._extraAction = js;
return this;},{'module':'HTML','line':241,'column':11});HTML.prototype.












setDeferred = __annotator(function(defer){'use strict';
this._defer = !!defer;
return this;},{'module':'HTML','line':256,'column':13});HTML.









isHTML = __annotator(function(thing){'use strict';
return !!thing && (thing instanceof HTML || thing.__html !== undefined);},{'module':'HTML','line':268,'column':15});HTML.








replaceJSONWrapper = __annotator(function(stub){'use strict';
return stub && stub.__html !== undefined?new HTML(stub.__html):stub;},{'module':'HTML','line':278,'column':27});



module.exports = HTML;},{'module':'HTML','line':0,'column':0,'name':'$module_HTML'}),null);
/** Path: html/js/downstream/serverjs/ServerJS.js */
/**
 * @generated SignedSource<<1cc444a98921c3e60abababbd8e74edf>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ServerJS
 */__d('ServerJS',['ErrorUtils','ServerJSDefine','ex','ge','replaceTransportMarkers'],__annotator(function $module_ServerJS(global,require,requireDynamic,requireLazy,module,exports,ErrorUtils,ServerJSDefine,ex,ge,replaceTransportMarkers){if(require.__markCompiled)require.__markCompiled();








var _counter=0;








function ServerJS(){'use strict';
this.$ServerJS_moduleMap = {};
this.$ServerJS_relativeTo = null;
this.$ServerJS_moduleIDsToCleanup = {};}__annotator(ServerJS,{'module':'ServerJS','line':36,'column':2,'name':'ServerJS'});ServerJS.prototype.






















handle = __annotator(function(data){'use strict';
if(data.__guard){
throw new Error(
'ServerJS.handle called on data that has already been handled');}

data.__guard = true;






applyEach(data.define || [],this.$ServerJS_handleDefine,this);
applyEach(data.markup || [],this.$ServerJS_handleMarkup,this);
applyEach(data.elements || [],this.$ServerJS_handleElement,this);
applyEach(data.instances || [],this.$ServerJS_handleInstance,this);
var cancelers=applyEach(data.require || [],this.$ServerJS_handleRequire,this);

return {
cancel:__annotator(function(){
for(var ii=0;ii < cancelers.length;ii++) {
if(cancelers[ii]){
cancelers[ii].cancel();}}},{'module':'ServerJS','line':81,'column':12})};},{'module':'ServerJS','line':62,'column':8});ServerJS.prototype.













handlePartial = __annotator(function(data){'use strict';
(data.instances || []).forEach(
_addModuleName.bind(null,this.$ServerJS_moduleMap,3));

(data.markup || []).forEach(
_addModuleName.bind(null,this.$ServerJS_moduleMap,2));

(data.elements || []).forEach(
_addModuleName.bind(null,this.$ServerJS_moduleMap,2));

return this.handle(data);},{'module':'ServerJS','line':98,'column':15});ServerJS.prototype.







setRelativeTo = __annotator(function(relativeElem){'use strict';
this.$ServerJS_relativeTo = relativeElem;
return this;},{'module':'ServerJS','line':116,'column':15});ServerJS.prototype.









cleanup = __annotator(function(){'use strict';
var modules=Object.keys(this.$ServerJS_moduleMap);


requireLazy.call(null,modules,emptyModule);
this.$ServerJS_moduleMap = {};



function thrower(id){
var info=this.$ServerJS_moduleIDsToCleanup[id];
var module=info[0];
var method=info[1];

delete this.$ServerJS_moduleIDsToCleanup[id];

var fnCall=method?
'JS::call("' + module + '", "' + method + '", ...)':
'JS::requireModule("' + module + '")';
var err=fnCall + ' did not fire because it has missing dependencies.';
if(__DEV__){
console.error(err + ' See http://fburl.com/jsdefine');


require.call(null,id);}

throw new Error(err);}__annotator(thrower,{'module':'ServerJS','line':137,'column':4,'name':'thrower'});


for(var id in this.$ServerJS_moduleIDsToCleanup) {
ErrorUtils.applyWithGuard(
thrower,
this,
[id],
null,
'ServerJS:cleanup' + ' id: ' + id);}},{'module':'ServerJS','line':128,'column':9});ServerJS.prototype.








$ServerJS_handleDefine = __annotator(function(moduleName,deps,data,index){'use strict';
return ErrorUtils.applyWithGuard(
ServerJSDefine.handleDefine,
ServerJSDefine,
[moduleName,deps,data,index,this.$ServerJS_relativeTo],
null,
'JS::define');},{'module':'ServerJS','line':172,'column':15});ServerJS.prototype.















$ServerJS_handleRequire = __annotator(function(moduleName,method,deps,args){'use strict';
return ErrorUtils.applyWithGuard(
this.$ServerJS_handleRequireUnguarded,
this,
[moduleName,method,deps,args],
null,
method?'JS::call':'JS::requireModule');},{'module':'ServerJS','line':194,'column':16});ServerJS.prototype.



$ServerJS_handleRequireUnguarded = __annotator(function(moduleName,method,deps,args){'use strict';
var modules=[moduleName].concat(deps || []);
var id;
if(method){
id = '__call__' + moduleName + '.' + method;}else
{
id = '__requireModule__' + moduleName;}

id += '__' + (_counter++);



this.$ServerJS_moduleIDsToCleanup[id] = [moduleName,method];

var tempFactory=ErrorUtils.guard(__annotator(function(module){


delete this.$ServerJS_moduleIDsToCleanup[id];

args && replaceTransportMarkers(this.$ServerJS_relativeTo,args);
if(method){
if(!module[method]){
throw new TypeError(ex(
'Module %s has no method "%s"',
moduleName,
method));}



module[method].apply(module,args || []);

tempFactory.__SMmeta = module[method].__SMmeta || {};
tempFactory.__SMmeta.module = tempFactory.__SMmeta.module || moduleName;
tempFactory.__SMmeta.name = tempFactory.__SMmeta.name || method;}},{'module':'ServerJS','line':218,'column':39}).bind(this),

method?
"JS::call('" + moduleName + "', '" + method + "', ...)":
"JS::requireModule('" + moduleName + "')");


return define(
id,
modules,
tempFactory,
1,
this,
1);},{'module':'ServerJS','line':204,'column':25});ServerJS.prototype.




















$ServerJS_handleInstance = __annotator(function(moduleName,deps,args,refCount){'use strict';
return ErrorUtils.applyWithGuard(
this.$ServerJS_handleInstanceUnguarded,
this,
[moduleName,deps,args,refCount],
null,
'JS::instance');},{'module':'ServerJS','line':271,'column':17});ServerJS.prototype.



$ServerJS_handleInstanceUnguarded = __annotator(function(moduleName,deps,args,refCount){'use strict';
var constructor=null;
if(deps){
constructor = __annotator(function(dep){
if(__DEV__){
var type=Object.prototype.toString.call(dep);
if(type !== "[object Function]"){
throw new Error(ex(
'%s does not export a function (got %s)',
deps[0],
type));}}




replaceTransportMarkers(this.$ServerJS_relativeTo,args);
var instance=Object.create(dep.prototype);
dep.apply(instance,args);
return instance;},{'module':'ServerJS','line':284,'column':20}).bind(this);}


define(moduleName,deps,constructor,0,null,refCount);},{'module':'ServerJS','line':281,'column':26});ServerJS.prototype.











$ServerJS_handleMarkup = __annotator(function(moduleName,markup,refCount){'use strict';
return ErrorUtils.applyWithGuard(
this.$ServerJS_handleMarkupUnguarded,
this,
[moduleName,markup,refCount],
null,
'JS::markup');},{'module':'ServerJS','line':314,'column':15});ServerJS.prototype.



$ServerJS_handleMarkupUnguarded = __annotator(function(moduleName,markup,refCount){'use strict';
define(moduleName,['HTML'],__annotator(function(HTML){
return HTML.replaceJSONWrapper(markup).getRootNode();},{'module':'ServerJS','line':325,'column':33}),
0,null,refCount);},{'module':'ServerJS','line':324,'column':24});ServerJS.prototype.








$ServerJS_handleElement = __annotator(function(moduleName,elementID,refCount,markupDependency){'use strict';
return ErrorUtils.applyWithGuard(
this.$ServerJS_handleElementUnguarded,
this,
[moduleName,elementID,refCount,markupDependency],
null,
'JS::element');},{'module':'ServerJS','line':336,'column':16});ServerJS.prototype.



$ServerJS_handleElementUnguarded = __annotator(function(moduleName,elementID,refCount,markupDependency){'use strict';






if(elementID === null && refCount){
define(moduleName,null,null,0,null,refCount);
return;}


var deps=[];
var special=0;















if(markupDependency){
deps.push(markupDependency);
special = 1;
refCount++;}


define(moduleName,deps,__annotator(function(rootNode){
var elem=ge(elementID,rootNode);
if(!elem){
var msg='Could not find element "%s"';
if(__DEV__){
msg +=
'. This usually means that the element was sent as a string ' +
'instead of XHP or JS::markup, or never rendered.';}

throw new Error(ex(msg,elementID));}

return elem;},{'module':'ServerJS','line':381,'column':29}),
special,null,refCount);},{'module':'ServerJS','line':346,'column':25});





__annotator(function(){requireLazy(['HTML'],__annotator(function(HTML){},{'module':'ServerJS','line':399,'column':31}));},{'module':'ServerJS','line':399,'column':1});







function applyEach(arr,handler,context){
return arr.map(__annotator(function(args){return handler.apply(context,args);},{'module':'ServerJS','line':408,'column':17}));}__annotator(applyEach,{'module':'ServerJS','line':407,'column':0,'name':'applyEach'});






function _addModuleName(moduleMap,refCountIndex,module){
var moduleName=module[0];
if(!(moduleName in moduleMap)){
module[refCountIndex] = (module[refCountIndex] || 0) + 1;}

moduleMap[moduleName] = true;}__annotator(_addModuleName,{'module':'ServerJS','line':415,'column':0,'name':'_addModuleName'});


function emptyModule(){
return {};}__annotator(emptyModule,{'module':'ServerJS','line':423,'column':0,'name':'emptyModule'});


module.exports = ServerJS;},{'module':'ServerJS','line':0,'column':0,'name':'$module_ServerJS'}),null);
/** Path: html/js/modules/invokeCallbacks.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule invokeCallbacks
 */__d('invokeCallbacks',['ErrorUtils'],__annotator(function $module_invokeCallbacks(global,require,requireDynamic,requireLazy,module,exports,ErrorUtils){if(require.__markCompiled)require.__markCompiled();



function invokeCallbacks(hooks,obj){
if(hooks){
for(var ii=0;ii < hooks.length;ii++) {
ErrorUtils.applyWithGuard(new Function(hooks[ii]),obj);}}}__annotator(invokeCallbacks,{'module':'invokeCallbacks','line':9,'column':0,'name':'invokeCallbacks'});


;

module.exports = invokeCallbacks;},{'module':'invokeCallbacks','line':0,'column':0,'name':'$module_invokeCallbacks'}),null);
/** Path: html/js/downstream/haste/ix.js */
/**
 * @generated SignedSource<<e861869b5428ea725faba457fd733044>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ix
 */__d('ix',['invariant'],__annotator(function $module_ix(global,require,requireDynamic,requireLazy,module,exports,invariant){if(require.__markCompiled)require.__markCompiled();



var _map={};
















function ix(path){
var img=_map[path];
!
!!img?invariant(0,
'ix' + '(...): ' +
'Unknown image path "%s". Did you forget to run arc build?',
path):undefined;

return img;}__annotator(ix,{'module':'ix','line':39,'column':0,'name':'ix'});






ix.add = __annotator(function(map){
var warned=false;
for(var k in map) {
if(!(k in _map)){
_map[k] = map[k];}else
if(__DEV__){
var new_data=JSON.stringify(map[k]);
var cur_data=JSON.stringify(_map[k]);
if(cur_data == new_data || warned){
continue;}


console.log("'" + k + "': the sprite data is different " +
"(" + cur_data + " vs " + new_data + "). " +
"If your sandbox is stale, try refreshing it, " +
"otherwise please report the issue to #uie.");
warned = true;}}},{'module':'ix','line':54,'column':9});




module.exports = ix;},{'module':'ix','line':0,'column':0,'name':'$module_ix'}),null);
/** Path: html/js/modules/BigPipe.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule BigPipe
 * @preventMunge
 */__d('BigPipe',['Arbiter','BigPipeExperiments','Bootloader','Env','ErrorUtils','JSCC','PageEvents','PageletSet','ResourceLazyLoader','Run','ServerJS','$','ge','invokeCallbacks','ix','performanceAbsoluteNow'],__annotator(function $module_BigPipe(global,require,requireDynamic,requireLazy,module,exports,Arbiter,BigPipeExperiments,Bootloader,Env,ErrorUtils,JSCC,PageEvents,PageletSet,ResourceLazyLoader,Run,ServerJS,$,ge,invokeCallbacks,ix,performanceAbsoluteNow){if(require.__markCompiled)require.__markCompiled();var _extends=Object.assign || __annotator(function(target){for(var i=1;i < arguments.length;i++) {var source=arguments[i];for(var key in source) {if(Object.prototype.hasOwnProperty.call(source,key)){target[key] = source[key];}}}return target;},{'module':'BigPipe','line':0,'column':0});






































if(BigPipeExperiments.lazy_load_images){
if(BigPipeExperiments.lazy_load_react_images){
ResourceLazyLoader.integrateWithReact();}

Run.onAfterLoad(ResourceLazyLoader.loadAllResourcesAndStopLazyLoading);}


var ie=document.documentMode ||
+(/MSIE.(\d+)/.exec(navigator.userAgent) || [])[1];

var arbiter_state=Arbiter.BEHAVIOR_STATE;
var arbiter_persistent=Arbiter.BEHAVIOR_PERSISTENT;

var phaseTime=[];

var shouldPrintTimeStamp=console.timeStamp &&
window.location.search.indexOf('pagelet_ts=1') > 0;


function BigPipe(options){'use strict';

Object.assign(this,{
arbiter:Arbiter,
rootNodeID:'content',
lid:0,
isAjax:false,
domContentCallback:Run.__domContentCallback,
onloadCallback:Run.__onloadCallback,
domContentEvt:PageEvents.BIGPIPE_DOMREADY,
onloadEvt:PageEvents.BIGPIPE_ONLOAD,
forceFinish:false,
_phaseCSSEndCallbacks:[],
_phaseDisplayEndCallbacks:[],
_currentPhase:0,
_lastPhase:-1,
_livePagelets:{}},
options);

if(this.automatic){
this._relevant_instance = BigPipe._current_instance;}else
{
BigPipe._current_instance = this;}


this._serverJS = new ServerJS();




Arbiter.inform(BigPipe.Events.init,{lid:this.lid,arbiter:this.arbiter},
arbiter_persistent);

this.arbiter.registerCallback(this.domContentCallback,
['pagelet_displayed_all']);




this._prefetchPhase(0);
this._beginPhase(0);

this.onloadCallback =
this.arbiter.registerCallback(this.onloadCallback,
['pagelet_displayed_all']);




this.arbiter.registerCallback(
this._serverJS.cleanup.bind(this._serverJS),
[this.onloadEvt]);

this._secondFlushPendingJS = [];
this._secondFlushRan = false;}__annotator(BigPipe,{'module':'BigPipe','line':64,'column':2,'name':'BigPipe'});BigPipe.prototype.


_prefetchPhase = __annotator(function(phase){'use strict';
this._informEventExternal('phase_prefetch',{phase:phase});
this.arbiter.inform('phase_prefetch_' + phase,true,arbiter_state);},{'module':'BigPipe','line':121,'column':16});BigPipe.prototype.


_beginPhase = __annotator(function(phase){'use strict';
this._informEventExternal('phase_begin',{phase:phase});
this.arbiter.inform('phase_begin_' + phase,true,arbiter_state);},{'module':'BigPipe','line':126,'column':13});BigPipe.prototype.


_endPhase = __annotator(function(phase){'use strict';
this.arbiter.inform('phase_arrived_' + phase,true,arbiter_state);
if(!this.isAjax){

phaseTime.push(Date.now());}},{'module':'BigPipe','line':131,'column':11});BigPipe.prototype.



_displayPageletHandler = __annotator(function(pageletData){'use strict';
if(this.displayCallback){
this.displayCallback(this._displayPagelet.bind(this,pageletData));}else
{
this._displayPagelet(pageletData);}},{'module':'BigPipe','line':139,'column':24});BigPipe.prototype.






_displayPagelet = __annotator(function(pageletData){'use strict';
this._informPageletEvent('display_start',pageletData);
var pagelet=this._getPagelet(pageletData);

for(var target_id in pageletData.content) {
var content=pageletData.content[target_id];

if(pageletData.append){
target_id = this._getPageletRootID(pageletData);}

var target=ge(target_id);
if(!target){
console.error(
'Root element %s is missing for pagelet %s',
target_id,
pageletData.id);

continue;}


if(target_id === pagelet.id){
pagelet.setRoot(target);}


content = getContentMarkup(content);
if(content){
if(BigPipeExperiments.lazy_load_images && !this.isAjax){
content = ResourceLazyLoader.lazifyResourcesInMarkup(content);}

if(pageletData.append || ie < 8){



if(!pageletData.append){
while(target.firstChild) {
target.removeChild(target.firstChild);}}


appendNodes(target,content);}else
{
target.innerHTML = content;}}




var referrer=target.getAttribute('data-referrer');
if(!referrer){
target.setAttribute('data-referrer',target_id);}


if(__DEV__){
var pageletID=
(pageletData.id || '<unnamed>') + '(' + pageletData.phase + ')';
var pageletList=target.getAttribute('data-pagelets');
pageletList =
pageletList?pageletList + ' ' + pageletID:pageletID;
target.setAttribute('data-pagelets',pageletList);

var pageletCategories=target.getAttribute('data-categories');
if(pageletData.categories){
pageletData.categories.forEach(__annotator(function(category){
if(!
new RegExp('(^|\\s)' + category + '($|\\s)').
test(pageletCategories))
{
pageletCategories =
pageletCategories?
pageletCategories + ' ' + category:
category;}},{'module':'BigPipe','line':210,'column':41}));}



if(pageletCategories){
target.setAttribute('data-categories',pageletCategories);}}



if(pageletData.cache_hit && Env.pc_debug){
target.style.border = '1px red solid';}}



if(pageletData.jsmods){
var jsmods=JSON.parse(JSON.stringify(pageletData.jsmods));
var serverJSCanceler=this._serverJS.handlePartial(jsmods);
pagelet.addDestructor(serverJSCanceler.cancel.bind(serverJSCanceler));}


this._informPageletEvent('display',pageletData);
this.arbiter.inform(pageletData.id + '_displayed',true,arbiter_state);},{'module':'BigPipe','line':150,'column':17});BigPipe.prototype.


_onPhaseCSSEnd = __annotator(function(phase){'use strict';

this._prefetchPhase(phase + 1);},{'module':'BigPipe','line':242,'column':16});BigPipe.prototype.









_onPhaseDisplayEnd = __annotator(function(){'use strict';
this.arbiter.inform(
'phase_displayed_' + this._currentPhase);




if(this._currentPhase === this._ttiPhase){
var ef=Bootloader.__debug.earlyResources;
var requested=Bootloader.__debug.requested;
var rsrcs=0;
for(var hash in requested) {
rsrcs += !(hash in ef);}


var metrics={
pre_tti_non_ef_resources:rsrcs};


var extraProfilingData={};

var wrapper=window.__bodyWrapper;
if(wrapper.getCodeUsage){
extraProfilingData.js_calls_tti = _extends({},wrapper.getCodeUsage());
extraProfilingData.tti_html = document.body.outerHTML;

var tti_styleSheets={};
for(var i=0;i < document.styleSheets.length;i++) {
if(document.styleSheets[i].href){
tti_styleSheets[document.styleSheets[i].href] = true;}}


extraProfilingData.tti_styleSheets = tti_styleSheets;}


if(!this.isAjax){


metrics.cjs_factory_count_tti = require.__getTotalFactories();
metrics.cjs_compile_time_tti = require.__getCompileTime();
metrics.cjs_factory_time_tti = require.__getFactoryTime();}


this._informEventExternal(BigPipe.Events.tti,{
phase:this._ttiPhase,
rid:this.rid,
ajax:this.isAjax,
metrics:metrics,
extraProfilingData:extraProfilingData});

this.arbiter.inform('tti_pagelet_displayed',true,arbiter_state);

if(this._secondFlushResources){
this.loadSecondFlushResources(this._secondFlushResources);
delete this._secondFlushResources;}}



if(this._currentPhase === this._lastPhase && this._isRelevant()){

this.arbiter.inform('pagelet_displayed_all',true,arbiter_state);}


this._currentPhase++;

if(ie <= 8){



setTimeout(this._beginPhase.bind(this,this._currentPhase),20);}else
{
this._beginPhase(this._currentPhase);}},{'module':'BigPipe','line':254,'column':20});BigPipe.prototype.







_downloadJsForPagelet = __annotator(function(pageletData){'use strict';
this._informPageletEvent('jsstart',pageletData);
Bootloader.loadResources(pageletData.js || [],__annotator(function(){
this._informPageletEvent('jsdone',pageletData);
pageletData.requires = pageletData.requires || [];








if(!this.isAjax || pageletData.phase >= 1){
pageletData.requires.push('uipage_onload');}


var fire_onloads=__annotator(function(){
this._informPageletEvent('preonload',pageletData);
if(this._isRelevantPagelet(pageletData)){
invokeCallbacks(pageletData.onload);}

this._informPageletEvent('onload',pageletData);





this.arbiter.inform('pagelet_onload',true,Arbiter.BEHAVIOR_EVENT);

pageletData.provides &&
this.arbiter.inform(pageletData.provides,true,arbiter_state);},{'module':'BigPipe','line':350,'column':25}).
bind(this);

var fire_onafterloads=__annotator(function(){
this._isRelevantPagelet(pageletData) &&
invokeCallbacks(pageletData.onafterload);},{'module':'BigPipe','line':367,'column':30}).
bind(this);

this.arbiter.registerCallback(fire_onloads,pageletData.requires);
this.arbiter.registerCallback(fire_onafterloads,[this.onloadEvt]);},{'module':'BigPipe','line':335,'column':51}).
bind(this),false,pageletData.id);},{'module':'BigPipe','line':333,'column':23});BigPipe.prototype.


_getPagelet = __annotator(function(pageletData){'use strict';
var id=this._getPageletRootID(pageletData);
return PageletSet.getPagelet(id);},{'module':'BigPipe','line':377,'column':13});BigPipe.prototype.


_getPageletRootID = __annotator(function(pageletData){'use strict';
var appendTarget=pageletData.append;
if(appendTarget){
return appendTarget === 'bigpipe_root'?this.rootNodeID:appendTarget;}

return Object.keys(pageletData.content)[0] || null;},{'module':'BigPipe','line':382,'column':19});BigPipe.prototype.





_isRelevant = __annotator(function(){'use strict';
return this == BigPipe._current_instance ||
this.automatic &&
this._relevant_instance == BigPipe._current_instance ||
this.jsNonBlock ||
this.forceFinish ||
BigPipe._current_instance &&
BigPipe._current_instance.allowIrrelevantRequests;},{'module':'BigPipe','line':393,'column':13});BigPipe.prototype.


_isRelevantPagelet = __annotator(function(pageletData){'use strict';

if(!this._isRelevant()){
return false;}

var pageletID=this._getPageletRootID(pageletData);
return !!this._livePagelets[pageletID];},{'module':'BigPipe','line':403,'column':20});BigPipe.prototype.








_informEventExternal = __annotator(function(evt_name,data){'use strict';
data = data || {};

data.ts = performanceAbsoluteNow();
data.lid = this.lid;

if(shouldPrintTimeStamp){
console.timeStamp(evt_name + " " + JSON.stringify(data));}


this.arbiter.inform(evt_name,data,arbiter_persistent);},{'module':'BigPipe','line':418,'column':22});BigPipe.prototype.









_informPageletEvent = __annotator(function(evt_name,pageletData){'use strict';
var data={
event:evt_name,
id:pageletData.id};

if(pageletData.phase){
data.phase = pageletData.phase;}

if(pageletData.categories){
data.categories = pageletData.categories;}


this._informEventExternal('pagelet_event',data);},{'module':'BigPipe','line':438,'column':21});BigPipe.


getCurrentInstance = __annotator(function(){'use strict';
return BigPipe._current_instance;},{'module':'BigPipe','line':453,'column':27});BigPipe.prototype.


loadSecondFlushResources = __annotator(function(resources){'use strict';
Bootloader.loadEarlyResources(resources);
if(this._secondFlushPendingJS.length){
Bootloader.loadResources(this._secondFlushPendingJS);
this._secondFlushPendingJS = [];}

this._secondFlushRan = true;},{'module':'BigPipe','line':457,'column':26});



Object.assign(BigPipe.prototype,{






beforePageletArrive:__annotator(function(pageletId){
this._informPageletEvent('prearrive',{id:pageletId});},{'module':'BigPipe','line':474,'column':24}),


setSecondFlushResources:__annotator(function(resources){
if(this._ttiPhase != undefined && this._currentPhase > this._ttiPhase){
this.loadSecondFlushResources(resources);}else
{
this._secondFlushResources = resources;}},{'module':'BigPipe','line':478,'column':27}),









onPageletArrive:ErrorUtils.guard(__annotator(function(pageletData){
this._informPageletEvent('arrive',pageletData);
pageletData.content = pageletData.content || {};

var phase=pageletData.phase;

if(!this._phaseCSSEndCallbacks[phase]){
this._phaseCSSEndCallbacks[phase] = this.arbiter.registerCallback(
this._onPhaseCSSEnd.bind(this,phase),
['phase_arrived_' + phase]);}



this.arbiter.registerCallback(
this._phaseCSSEndCallbacks[phase],
[pageletData.id + '_css_end']);


if(!this._phaseDisplayEndCallbacks[phase]){
this._phaseDisplayEndCallbacks[phase] = this.arbiter.registerCallback(
this._onPhaseDisplayEnd.bind(this),
['phase_arrived_' + phase]);}



this.arbiter.registerCallback(
this._phaseDisplayEndCallbacks[phase],
[pageletData.id + '_displayed']);


var rootID=this._getPageletRootID(pageletData);
var pagelet=PageletSet.getOrCreatePagelet(rootID);

if(pageletData.the_end){
this._lastPhase = phase;}


if(pageletData.tti_phase !== undefined){
this._ttiPhase = pageletData.tti_phase;}


this._livePagelets[pagelet.id] = true;
pagelet.addDestructor(__annotator(function(){
delete this._livePagelets[pagelet.id];},{'module':'BigPipe','line':534,'column':26}).
bind(this));

if(pageletData.jscc_map){
var jsccMap=eval(pageletData.jscc_map);
var jsccDestructor=JSCC.init(jsccMap);
pagelet.addDestructor(jsccDestructor);}


if(pageletData.resource_map){
Bootloader.setResourceMap(pageletData.resource_map);}

if(pageletData.bootloadable){
Bootloader.enableBootload(pageletData.bootloadable);}

ix.add(pageletData.ixData);


this._informPageletEvent('setup',pageletData);


var pageletDisplayArbiter=new Arbiter();
pageletDisplayArbiter.registerCallback(
this._displayPageletHandler.bind(this,pageletData),
[
'phase_begin',
'preceding_pagelets_displayed',
'display_resources_downloaded']);



this.arbiter.registerCallback(__annotator(function(){
pageletDisplayArbiter.inform('phase_begin');},{'module':'BigPipe','line':566,'column':34}),
['phase_begin_' + pageletData.phase]);

var precedingPagelets=pageletData.display_dependency || [];
var pageletDisplayedEvents=precedingPagelets.map(__annotator(function(id){
return id + '_displayed';},{'module':'BigPipe','line':571,'column':55}));

this.arbiter.registerCallback(__annotator(function(){
pageletDisplayArbiter.inform('preceding_pagelets_displayed');},{'module':'BigPipe','line':574,'column':34}),
pageletDisplayedEvents);

var cssEventPrefix;
switch(BigPipeExperiments.prefetch){
case 'all':
cssEventPrefix = 'phase_prefetch_';
break;
case 'post_tti':


if(this._ttiPhase !== undefined && phase > this._ttiPhase + 1){
cssEventPrefix = 'phase_prefetch_';}else
{
cssEventPrefix = 'phase_begin_';}

break;
default:
cssEventPrefix = 'phase_begin_';
break;}



this.arbiter.registerCallback(__annotator(function(){
this._informPageletEvent('css',pageletData);
var displayResources=
(pageletData.css || []).concat(pageletData.displayJS || []);
Bootloader.loadResources(displayResources,__annotator(function(){
this._informPageletEvent('css_load',pageletData);
this.arbiter.inform(pageletData.id + '_css_end',true,arbiter_state);
pageletDisplayArbiter.inform('display_resources_downloaded');},{'module':'BigPipe','line':602,'column':49}).
bind(this),false,pageletData.id);},{'module':'BigPipe','line':598,'column':34}).
bind(this),[cssEventPrefix + phase]);

this.arbiter.registerCallback(this.onloadCallback,['pagelet_onload']);

var jsEvents=[pageletData.id + '_displayed'];
if(!this.jsNonBlock){
switch(BigPipeExperiments.download_js){
case 'post_tti':
jsEvents.push('tti_pagelet_displayed');
break;
default:
jsEvents.push(this.domContentEvt);
break;}}



if(this._secondFlushRan){
Bootloader.loadResources(pageletData.js || []);}else
{
Array.prototype.push.apply(this._secondFlushPendingJS,pageletData.js || []);}

this.arbiter.registerCallback(
this._downloadJsForPagelet.bind(this,pageletData),jsEvents);

if(pageletData.is_last){
this._endPhase(phase);}},{'module':'BigPipe','line':492,'column':37}),

'BigPipe#onPageletArrive')});


function getContentMarkup(content){
if(!content || typeof content === 'string'){
return content;}

if(content.container_id){
var container=$(content.container_id);
content = extractMarkup(container) || '';
container.parentNode.removeChild(container);
return content;}

return null;}__annotator(getContentMarkup,{'module':'BigPipe','line':637,'column':0,'name':'getContentMarkup'});


BigPipe.Events = {
init:'BigPipe/init',
tti:'tti_bigpipe'};


function extractMarkup(container){
if(!container.firstChild){
console.error('Pagelet markup container is empty.');
Bootloader.loadModules(["ErrorSignal"],__annotator(function(ErrorSignal){
ErrorSignal.sendErrorSignal(
'bigpipe',
'Pagelet markup container is empty.');},{'module':'BigPipe','line':658,'column':44}));

return null;}

if(container.firstChild.nodeType !== 8){
console.error('Child of pagelet markup container is not a comment.');
return null;}


var comment=container.firstChild.nodeValue;

comment = comment.substring(1,comment.length - 1);

return comment.replace(/\\([\s\S]|$)/g,'$1');}__annotator(extractMarkup,{'module':'BigPipe','line':655,'column':0,'name':'extractMarkup'});


function appendNodes(container,markup){
var nn=document.createElement('div');

var hax=ie < 7;
if(hax){







container.appendChild(nn);}


nn.innerHTML = markup;

var frag=document.createDocumentFragment();


while(nn.firstChild) {
frag.appendChild(nn.firstChild);}

container.appendChild(frag);


if(hax){
container.removeChild(nn);}}__annotator(appendNodes,{'module':'BigPipe','line':677,'column':0,'name':'appendNodes'});



module.exports = BigPipe;},{'module':'BigPipe','line':0,'column':0,'name':'$module_BigPipe'}),null);
/** Path: html/js/downstream/emitter/internal/EventEmitterWithValidation.js */
/**
 * @generated SignedSource<<8fe8e850937301ab58a0f038e1ac83f2>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule EventEmitterWithValidation
 * @typechecks
 */__d('EventEmitterWithValidation',['BaseEventEmitter'],__annotator(function $module_EventEmitterWithValidation(global,require,requireDynamic,requireLazy,module,exports,BaseEventEmitter){if(require.__markCompiled)require.__markCompiled();var _BaseEventEmitter,_superProto;

'use strict';_BaseEventEmitter =






BaseEventEmitter;_superProto = _BaseEventEmitter && _BaseEventEmitter.prototype;Object.assign(EventEmitterWithValidation,_BaseEventEmitter);EventEmitterWithValidation.prototype = Object.create(_BaseEventEmitter.prototype);EventEmitterWithValidation.prototype.constructor = EventEmitterWithValidation;EventEmitterWithValidation.__superConstructor__ = _BaseEventEmitter;




function EventEmitterWithValidation(eventTypes){return __bodyWrapper(this,arguments,function(){
_superProto.constructor.call(this);
this.$EventEmitterWithValidation_eventTypes = Object.keys(eventTypes);},{params:[[eventTypes,'object','eventTypes']]});}__annotator(EventEmitterWithValidation,{'module':'EventEmitterWithValidation','line':33,'column':2,'name':'EventEmitterWithValidation'},{params:['object']});EventEmitterWithValidation.prototype.






emit = __annotator(function(eventType){return __bodyWrapper(this,arguments,function(){
assertAllowsEventType(eventType,this.$EventEmitterWithValidation_eventTypes);
return _superProto.emit.apply(this,arguments);},{params:[[eventType,'string','eventType']]});},{'module':'EventEmitterWithValidation','line':42,'column':6},{params:['string']});



function assertAllowsEventType(type,allowedTypes){
if(allowedTypes.indexOf(type) === -1){
throw new TypeError(errorMessageFor(type,allowedTypes));}}__annotator(assertAllowsEventType,{'module':'EventEmitterWithValidation','line':48,'column':0,'name':'assertAllowsEventType'});



function errorMessageFor(type,allowedTypes){
var message='Unknown event type "' + type + '". ';
if(__DEV__){
message += recommendationFor(type,allowedTypes);}

message += 'Known event types: ' + allowedTypes.join(', ') + '.';
return message;}__annotator(errorMessageFor,{'module':'EventEmitterWithValidation','line':54,'column':0,'name':'errorMessageFor'});



if(__DEV__){
var recommendationFor=__annotator(function(type,allowedTypes){
var closestTypeRecommendation=closestTypeFor(type,allowedTypes);
if(isCloseEnough(closestTypeRecommendation,type)){
return 'Did you mean "' + closestTypeRecommendation.type + '"? ';}else
{
return '';}},{'module':'EventEmitterWithValidation','line':65,'column':26});



var closestTypeFor=__annotator(function(type,allowedTypes){
var typeRecommendations=allowedTypes.map(
typeRecommendationFor.bind(this,type));

return typeRecommendations.sort(recommendationSort)[0];},{'module':'EventEmitterWithValidation','line':74,'column':23});


var typeRecommendationFor=__annotator(function(type,recomendedType){
return {
type:recomendedType,
distance:damerauLevenshteinDistance(type,recomendedType)};},{'module':'EventEmitterWithValidation','line':81,'column':30});



var recommendationSort=__annotator(function(recommendationA,recommendationB){
if(recommendationA.distance < recommendationB.distance){
return -1;}else
if(recommendationA.distance > recommendationB.distance){
return 1;}else
{
return 0;}},{'module':'EventEmitterWithValidation','line':88,'column':27});



var isCloseEnough=__annotator(function(closestType,actualType){
return closestType.distance / actualType.length < 0.334;},{'module':'EventEmitterWithValidation','line':98,'column':22});


var damerauLevenshteinDistance=__annotator(function(a,b){
var i,j;
var d=[];

for(i = 0;i <= a.length;i++) {
d[i] = [i];}


for(j = 1;j <= b.length;j++) {
d[0][j] = j;}


for(i = 1;i <= a.length;i++) {
for(j = 1;j <= b.length;j++) {
var cost=a.charAt(i - 1) === b.charAt(j - 1)?0:1;

d[i][j] = Math.min(
d[i - 1][j] + 1,
d[i][j - 1] + 1,
d[i - 1][j - 1] + cost);


if(i > 1 && j > 1 &&
a.charAt(i - 1) == b.charAt(j - 2) &&
a.charAt(i - 2) == b.charAt(j - 1)){
d[i][j] = Math.min(d[i][j],d[i - 2][j - 2] + cost);}}}




return d[a.length][b.length];},{'module':'EventEmitterWithValidation','line':102,'column':35});}



module.exports = EventEmitterWithValidation;},{'module':'EventEmitterWithValidation','line':0,'column':0,'name':'$module_EventEmitterWithValidation'}),null);
/** Path: html/js/downstream/emitter/internal/mixInEventEmitter.js */
/**
 * @generated SignedSource<<f9e35510206188a30dc1fa0233fd7828>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule mixInEventEmitter
 */__d('mixInEventEmitter',['EventEmitterWithHolding','EventEmitterWithValidation','EventHolder','invariant'],__annotator(function $module_mixInEventEmitter(global,require,requireDynamic,requireLazy,module,exports,EventEmitterWithHolding,EventEmitterWithValidation,EventHolder,invariant){if(require.__markCompiled)require.__markCompiled();

'use strict';var _extends=Object.assign || __annotator(function(target){for(var i=1;i < arguments.length;i++) {var source=arguments[i];for(var key in source) {if(Object.prototype.hasOwnProperty.call(source,key)){target[key] = source[key];}}}return target;},{'module':'mixInEventEmitter','line':0,'column':0});




























function mixInEventEmitter(klass,types){
!types?invariant(0,'Must supply set of valid event types'):undefined;



var target=klass.prototype || klass;
!!target.__eventEmitter?invariant(0,'An active emitter is already mixed in'):undefined;

var ctor=klass.constructor;
if(ctor){
!(
ctor === Object || ctor === Function)?invariant(0,
'Mix EventEmitter into a class, not an instance'):undefined;}





target.__types = _extends({},target.__types,types);
Object.assign(target,EventEmitterMixin);}__annotator(mixInEventEmitter,{'module':'mixInEventEmitter','line':49,'column':0,'name':'mixInEventEmitter'});


var EventEmitterMixin={
emit:__annotator(function(eventType,a,b,c,d,e,_){
return this.__getEventEmitter().emit(eventType,a,b,c,d,e,_);},{'module':'mixInEventEmitter','line':72,'column':8}),


emitAndHold:__annotator(function(eventType,a,b,c,d,e,_){
return this.__getEventEmitter().emitAndHold(eventType,a,b,c,d,e,_);},{'module':'mixInEventEmitter','line':76,'column':15}),


addListener:__annotator(function(eventType,listener,context){
return this.__getEventEmitter().addListener(eventType,listener,context);},{'module':'mixInEventEmitter','line':80,'column':15}),


once:__annotator(function(eventType,listener,context){
return this.__getEventEmitter().once(eventType,listener,context);},{'module':'mixInEventEmitter','line':84,'column':8}),


addRetroactiveListener:__annotator(function(eventType,listener,context){
return this.__getEventEmitter().addRetroactiveListener(
eventType,
listener,
context);},{'module':'mixInEventEmitter','line':88,'column':26}),



addListenerMap:__annotator(function(listenerMap,context){
return this.__getEventEmitter().addListenerMap(listenerMap,context);},{'module':'mixInEventEmitter','line':96,'column':18}),


addRetroactiveListenerMap:__annotator(function(listenerMap,context){
return this.__getEventEmitter().addListenerMap(listenerMap,context);},{'module':'mixInEventEmitter','line':100,'column':29}),


listeners:__annotator(function(eventType){
return this.__getEventEmitter().listeners(eventType);},{'module':'mixInEventEmitter','line':104,'column':13}),


removeAllListeners:__annotator(function(){
this.__getEventEmitter().removeAllListeners();},{'module':'mixInEventEmitter','line':108,'column':22}),


removeCurrentListener:__annotator(function(){
this.__getEventEmitter().removeCurrentListener();},{'module':'mixInEventEmitter','line':112,'column':25}),


releaseHeldEventType:__annotator(function(eventType){
this.__getEventEmitter().releaseHeldEventType(eventType);},{'module':'mixInEventEmitter','line':116,'column':24}),


__getEventEmitter:__annotator(function(){
if(!this.__eventEmitter){
var emitter=new EventEmitterWithValidation(this.__types);
var holder=new EventHolder();
this.__eventEmitter = new EventEmitterWithHolding(emitter,holder);}

return this.__eventEmitter;},{'module':'mixInEventEmitter','line':120,'column':21})};



module.exports = mixInEventEmitter;},{'module':'mixInEventEmitter','line':0,'column':0,'name':'$module_mixInEventEmitter'}),null);
/** Path: html/js/downstream/core/pageID.js */
/**
 * @generated SignedSource<<3d46b47d2bd6b08510625a09d0a5d75a>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * A randomly generated (i.e. "unique-ish") identifier that remains constant
 * for the life of the page.  This value is not globally unique, but combined
 * with a client's datr cookie should be unique enough for most purposes.
 *
 * @providesModule pageID
 */__d("pageID",[],__annotator(function $module_pageID(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();
module.exports = Math.floor(0x80000000 * Math.random()).toString(36);},{"module":"pageID","line":0,"column":0,"name":"$module_pageID"}),null);
/** Path: html/js/downstream/core/NavigationMetrics.js */
/**
 * @generated SignedSource<<e2e076c7e68f1b71d86ea2a7aa7bcec0>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationMetrics-upstream
 * @typechecks
 */__d('NavigationMetrics-upstream',['mixInEventEmitter','pageID','performance'],__annotator(function $module_NavigationMetrics_upstream(global,require,requireDynamic,requireLazy,module,exports,mixInEventEmitter,pageID,performance){if(require.__markCompiled)require.__markCompiled();












































var initialized=false;
var loadCount=0;
var loadID;
var serverLID;

var Events={
NAVIGATION_DONE:'NAVIGATION_DONE'};


var start=performance.timing && performance.timing.navigationStart || 0;
var tti=0;
var e2e=0;
var page;
var pageType;
var pageURI;

function updateLoadID(){
loadID = pageID + ':' + loadCount;}__annotator(updateLoadID,{'module':'NavigationMetrics-upstream','line':80,'column':0,'name':'updateLoadID'});







var implementation={






setTTI:__annotator(function(timestamp){
tti = timestamp;
return this;},{'module':'NavigationMetrics-upstream','line':96,'column':10}),








setE2E:__annotator(function(timestamp){
e2e = timestamp;
return this;},{'module':'NavigationMetrics-upstream','line':107,'column':10}),





setServerLID:__annotator(function(lid){
serverLID = lid;
return this;},{'module':'NavigationMetrics-upstream','line':115,'column':16}),






doneNavigation:__annotator(function(){
loadCount++;
updateLoadID();

NavigationMetrics.emitAndHold(Events.NAVIGATION_DONE,loadID,{
page:page,
pageType:pageType,
pageURI:pageURI,
start:start,
tti:tti,
e2e:e2e,
serverLID:serverLID});


start = 0;
tti = 0;
e2e = 0;
serverLID = undefined;},{'module':'NavigationMetrics-upstream','line':124,'column':18}),


setStart:__annotator(function(timestamp){
start = timestamp;
return this;},{'module':'NavigationMetrics-upstream','line':144,'column':12})};



var NavigationMetrics={
Events:Events,

init:__annotator(function(implementation){
throw new Error('NavigationMetrics.init should be overridden by shim');},{'module':'NavigationMetrics-upstream','line':153,'column':8}),


setPage:__annotator(function(data){
if(!initialized){
initialized = true;
NavigationMetrics.init(implementation);}


page = data.page;
pageType = data.page_type;
pageURI = data.page_uri;},{'module':'NavigationMetrics-upstream','line':157,'column':11})};



mixInEventEmitter(NavigationMetrics,Events);

module.exports = NavigationMetrics;},{'module':'NavigationMetrics-upstream','line':0,'column':0,'name':'$module_NavigationMetrics_upstream'}),null);
/** Path: html/js/downstream/core/__shims__/NavigationMetrics.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationMetrics
 */__d('NavigationMetrics',['Arbiter','BigPipe','NavigationMetrics-upstream','PageEvents'],__annotator(function $module_NavigationMetrics(global,require,requireDynamic,requireLazy,module,exports,Arbiter,BigPipe,NavigationMetrics,PageEvents){if(require.__markCompiled)require.__markCompiled();










var quicklingRids={};

NavigationMetrics.init = __annotator(function(implementation){














Arbiter.subscribe(BigPipe.Events.init,__annotator(function(_,data){
var arbiterInstance=data.arbiter;
arbiterInstance.subscribe(BigPipe.Events.tti,__annotator(function(_,data){


implementation.setServerLID(data.lid);
if(data.ajax){
var previousData=quicklingRids[data.rid];
if(previousData){
previousData.tti = data.ts;}}else

{
implementation.setTTI(data.ts);}},{'module':'NavigationMetrics','line':35,'column':50}));


arbiterInstance.subscribe(PageEvents.AJAXPIPE_SEND,__annotator(function(_,data){
if(data.quickling){
quicklingRids[data.rid] = {start:data.ts};}},{'module':'NavigationMetrics','line':48,'column':56}));


arbiterInstance.subscribe(PageEvents.AJAXPIPE_ONLOAD,__annotator(function(_,data){
var previousData=quicklingRids[data.rid];
if(previousData){
implementation.setStart(previousData.start);
implementation.setTTI(previousData.tti);
implementation.setE2E(data.ts);
implementation.doneNavigation();}},{'module':'NavigationMetrics','line':53,'column':58}));},{'module':'NavigationMetrics','line':33,'column':41}));



Arbiter.subscribe(PageEvents.BIGPIPE_ONLOAD,__annotator(function(_,data){
implementation.setE2E(data.ts);
implementation.doneNavigation();},{'module':'NavigationMetrics','line':63,'column':47}));},{'module':'NavigationMetrics','line':18,'column':25});



module.exports = NavigationMetrics;},{'module':'NavigationMetrics','line':0,'column':0,'name':'$module_NavigationMetrics'}),null);
/** Path: html/js/downstream/storage/WebStorage.js */
/**
 * @generated SignedSource<<1956e39479f6d6b7a6db7faf7b0dd766>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule WebStorage
 * @typechecks
 */__d('WebStorage',['ErrorUtils','ex'],__annotator(function $module_WebStorage(global,require,requireDynamic,requireLazy,module,exports,ErrorUtils,ex){if(require.__markCompiled)require.__markCompiled();



var storageCache={};










function getCachedStorage(storageName){return __bodyWrapper(this,arguments,function(){
if(!storageCache.hasOwnProperty(storageName)){
storageCache[storageName] = getStorage(storageName);}

return storageCache[storageName];},{params:[[storageName,'string','storageName']]});}__annotator(getCachedStorage,{'module':'WebStorage','line':34,'column':0,'name':'getCachedStorage'},{params:['string']});


function getStorage(storageName){return __bodyWrapper(this,arguments,function(){
try{

var storage=window[storageName];



if(storage){
var key='__test__' + Date.now();
storage.setItem(key,'');
storage.removeItem(key);}

return storage;}
catch(e) {
console.error(e.message);}},{params:[[storageName,'string','storageName']]});}__annotator(getStorage,{'module':'WebStorage','line':41,'column':0,'name':'getStorage'},{params:['string']});



function getLocalStorage(){return __bodyWrapper(this,arguments,function(){
return getCachedStorage('localStorage');},{returns:'?object'});}__annotator(getLocalStorage,{'module':'WebStorage','line':59,'column':0,'name':'getLocalStorage'},{returns:'?object'});


function getSessionStorage(){return __bodyWrapper(this,arguments,function(){
return getCachedStorage('sessionStorage');},{returns:'?object'});}__annotator(getSessionStorage,{'module':'WebStorage','line':63,'column':0,'name':'getSessionStorage'},{returns:'?object'});





function getKeys(storage){return __bodyWrapper(this,arguments,function(){
var keys=[];
for(var i=0;i < storage.length;i++) {
keys.push(storage.key(i));}

return keys;},{params:[[storage,'object','storage']]});}__annotator(getKeys,{'module':'WebStorage','line':70,'column':0,'name':'getKeys'},{params:['object']});





function setItemGuarded(storage,key,value){return __bodyWrapper(this,arguments,function(){
var err=null;
try{
storage.setItem(key,value);}
catch(e) {

var keys=getKeys(storage).map(__annotator(function(key){
var len=storage.getItem(key).length;
return key + '(' + len + ')';},{'module':'WebStorage','line':87,'column':36}));


err = new Error(ex(
'Storage quota exceeded while setting %s(%s). Items(length) follows: %s',
key,
value.length,
keys.join()));

ErrorUtils.reportError(err);}


return err;},{params:[[storage,'object','storage'],[key,'string','key'],[value,'string','value']]});}__annotator(setItemGuarded,{'module':'WebStorage','line':81,'column':0,'name':'setItemGuarded'},{params:['object','string','string']});


var WebStorage={
getLocalStorage:getLocalStorage,
getSessionStorage:getSessionStorage,
setItemGuarded:setItemGuarded};


module.exports = WebStorage;},{'module':'WebStorage','line':0,'column':0,'name':'$module_WebStorage'}),null);
/** Path: html/js/downstream/core/isInIframe.js */
/**
 * @generated SignedSource<<48a4cf09fe43f5ec9b55f8d5680c0da5>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * Returns a value specifying whether the current browsing context is within an
 * iframe, or otherwise nested. Please use this module instead of implementing
 * the check yourself, as the check is susceptible to errors and an IE8 bug:
 * http://fburl.com/iframeie8bug
 *
 * @providesModule isInIframe
 */__d("isInIframe",[],__annotator(function $module_isInIframe(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();




var inFrame=window != window.top;

function isInIframe(){
return inFrame;}__annotator(isInIframe,{"module":"isInIframe","line":30,"column":0,"name":"isInIframe"});


module.exports = isInIframe;},{"module":"isInIframe","line":0,"column":0,"name":"$module_isInIframe"}),null);
/** Path: html/js/downstream/storage/WebStorageMutex.js */
/**
 * @generated SignedSource<<0afc6399946f47914573d43dc629e123>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule WebStorageMutex
 */__d('WebStorageMutex',['WebStorage','setTimeoutAcrossTransitions','pageID'],__annotator(function $module_WebStorageMutex(global,require,requireDynamic,requireLazy,module,exports,WebStorage,setTimeoutAcrossTransitions,pageID){if(require.__markCompiled)require.__markCompiled();


























var storage=WebStorage.getLocalStorage();
var curPageID=pageID;






function WebStorageMutex(name){'use strict';
this.name = name;}__annotator(WebStorageMutex,{'module':'WebStorageMutex','line':53,'column':2,'name':'WebStorageMutex'});WebStorageMutex.





testSetPageID = __annotator(function(id){'use strict';
curPageID = id;},{'module':'WebStorageMutex','line':60,'column':22});WebStorageMutex.prototype.






$WebStorageMutex_owner = __annotator(function(){'use strict';
if(!storage){

return curPageID;}

var val=storage.getItem('mutex_' + this.name);
val = val?val.split(':'):null;
return val && val[1] >= Date.now()?val[0]:null;},{'module':'WebStorageMutex','line':68,'column':8});WebStorageMutex.prototype.







$WebStorageMutex_writeLock = __annotator(function(expires){'use strict';
if(!storage){
return;}

var when=Date.now() + (expires || 10000);
WebStorage.setItemGuarded(
storage,
'mutex_' + this.name,
curPageID + ':' + when);},{'module':'WebStorageMutex','line':83,'column':12});WebStorageMutex.prototype.






hasLock = __annotator(function(){'use strict';
return this.$WebStorageMutex_owner() == curPageID;},{'module':'WebStorageMutex','line':98,'column':9});WebStorageMutex.prototype.











lock = __annotator(function(onLock,onError,expires){'use strict';
if(this.$WebStorageMutex_locking){
clearTimeout(this.$WebStorageMutex_locking);}



if(curPageID == (this.$WebStorageMutex_owner() || curPageID)){
this.$WebStorageMutex_writeLock(expires);}





this.$WebStorageMutex_locking = setTimeoutAcrossTransitions(__annotator(
function(){
this.$WebStorageMutex_locking = null;
var f=this.hasLock()?onLock:onError;
if(f){
f(this);}},{'module':'WebStorageMutex','line':125,'column':6}).bind(this),


0);},{'module':'WebStorageMutex','line':111,'column':6});WebStorageMutex.prototype.






unlock = __annotator(function(){'use strict';
if(this.$WebStorageMutex_locking){
clearTimeout(this.$WebStorageMutex_locking);}

if(storage && this.hasLock()){
storage.removeItem('mutex_' + this.name);}},{'module':'WebStorageMutex','line':139,'column':8});




module.exports = WebStorageMutex;},{'module':'WebStorageMutex','line':0,'column':0,'name':'$module_WebStorageMutex'}),null);
/** Path: html/js/downstream/banzai/Banzai.js */
/**
 * @generated SignedSource<<801ee15d558a628e355e57021b379c9c>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Banzai
 */__d('Banzai',['BanzaiAdapter','CurrentUser','ErrorUtils','ExecutionEnvironment','FBJSON','NavigationMetrics','WebStorage','emptyFunction','isInIframe','pageID','setTimeoutAcrossTransitions','WebStorageMutex'],__annotator(function $module_Banzai(global,require,requireDynamic,requireLazy,module,exports,Banzai,CurrentUser,ErrorUtils,ExecutionEnvironment,FBJSON,NavigationMetrics,WebStorage,emptyFunction,isInIframe,pageID,setTimeoutAcrossTransitions){if(require.__markCompiled)require.__markCompiled();



































































































var adapter=Banzai.adapter;
var inFrame=isInIframe();

var STORAGE_PREFIX='bz:';


var READY=0;
var INFLIGHT=1;
var SENT=2;

var timer;
var nextSend;

var postBuffer=[];

var triggerRoute=null;

function canSend(post){
return post[2] >= Date.now() - (adapter.config.EXPIRY || Banzai.EXPIRY);}__annotator(canSend,{'module':'Banzai','line':135,'column':0,'name':'canSend'});



function retryPost(post,httpStatus){

post.__meta.status = READY;
post[3] = (post[3] || 0) + 1;





if(!post.__meta.retry && httpStatus >= 400 && httpStatus < 600){
postBuffer.push(post);}}__annotator(retryPost,{'module':'Banzai','line':140,'column':0,'name':'retryPost'});







function schedule(ms){
var t=Date.now() + ms;
if(!nextSend || t < nextSend){
nextSend = t;
clearTimeout(timer);
timer = setTimeoutAcrossTransitions(send,ms);
return true;}}__annotator(schedule,{'module':'Banzai','line':158,'column':0,'name':'schedule'});




function send(){
sendWithCallbacks(null,null);}__annotator(send,{'module':'Banzai','line':169,'column':0,'name':'send'});


function sendWithCallbacks(onSuccess,onError){

nextSend = null;
schedule(Banzai.BASIC.delay);


if(!adapter.readyToSend()){
if(onError){
onError();}

return;}



adapter.inform(Banzai.SEND);







var inflightWads=[];
var inflightPosts=[];
var wadMap={};

postBuffer = postBuffer.filter(__annotator(function(post){
var m=post.__meta;


if(m.status >= SENT || !canSend(post)){
return false;}



if(m.status >= INFLIGHT){
return true;}



var hash=m.pageID + m.userID;
var wad=wadMap[hash];
if(!wad){
wad = {
user:m.userID,
page_id:m.pageID,
posts:[]};

wadMap[hash] = wad;
inflightWads.push(wad);}



m.status = INFLIGHT;
wad.posts.push(post);
inflightPosts.push(post);



return m.retry;},{'module':'Banzai','line':199,'column':33}));




if(inflightWads.length <= 0){

adapter.inform(Banzai.OK);
if(onSuccess){
onSuccess();}

return;}







inflightWads[0].trigger = triggerRoute;
triggerRoute = null;

adapter.send(inflightWads,__annotator(
function(){

inflightPosts.forEach(__annotator(function(post){
post.__meta.status = SENT;},{'module':'Banzai','line':257,'column':28}));

if(onSuccess){
onSuccess();}},{'module':'Banzai','line':255,'column':4}),__annotator(


function(httpStatus){


inflightPosts.forEach(__annotator(function(post){
retryPost(post,httpStatus);},{'module':'Banzai','line':267,'column':28}));


if(onError){
onError();}},{'module':'Banzai','line':264,'column':4}));}__annotator(sendWithCallbacks,{'module':'Banzai','line':173,'column':0,'name':'sendWithCallbacks'});






var storage;
function initializeStorage(){
if(!storage){
var webStore=WebStorage.getLocalStorage();
if(webStore && !inFrame){
storage = {
store:__annotator(function store(){
if(postBuffer.length <= 0){
return;}


var posts=postBuffer.map(__annotator(function(post){
return [post[0],post[1],post[2],post[3] || 0,post.__meta];},{'module':'Banzai','line':290,'column':37}));

postBuffer = [];


webStore.setItem(
STORAGE_PREFIX + pageID + '.' + Date.now(),
FBJSON.stringify(posts));},{'module':'Banzai','line':285,'column':15,'name':'store'}),



restore:__annotator(function restore(){


var WebStorageMutex=require('WebStorageMutex');
new WebStorageMutex('banzai').lock(__annotator(function(mutex){



var keys=[];
for(var i=0;i < webStore.length;i++) {
var key=webStore.key(i);


if(key.indexOf(STORAGE_PREFIX) === 0 && key.indexOf('bz:__') !== 0){
keys.push(key);}}




keys.forEach(__annotator(function(key){


var json=webStore.getItem(key);
webStore.removeItem(key);

if(!json){
return;}



var posts=FBJSON.parse(json,module.id);
posts.forEach(__annotator(function(post){
if(!post){return;}

var m=post.__meta = post.pop();

var postable=canSend(post);

if(!postable){
return;}


var currentUserId=CurrentUser.getID();
var useridMatch=m.userID === currentUserId;
var allowUserMismatch=
Banzai.isEnabled('allow_userid_mismatch') &&
currentUserId === '0';

if(useridMatch || allowUserMismatch){
m.status = READY;
postBuffer.push(post);}},{'module':'Banzai','line':333,'column':28}));},{'module':'Banzai','line':321,'column':25}));




mutex.unlock();},{'module':'Banzai','line':306,'column':47}));},{'module':'Banzai','line':302,'column':17,'name':'restore'})};}else



{
storage = {
store:emptyFunction,
restore:emptyFunction};}}}__annotator(initializeStorage,{'module':'Banzai','line':280,'column':0,'name':'initializeStorage'});










Banzai.SEND = 'Banzai:SEND';
Banzai.OK = 'Banzai:OK';
Banzai.ERROR = 'Banzai:ERROR';
Banzai.SHUTDOWN = 'Banzai:SHUTDOWN';
Banzai.SEND_TIMEOUT = 15000;
Banzai.VITAL_WAIT = 1000;
Banzai.BASIC_WAIT = 60000;



Banzai.EXPIRY = 30 * 60000;




Banzai.VITAL = {
delay:adapter.config.MIN_WAIT || Banzai.VITAL_WAIT};

Banzai.BASIC = {
delay:adapter.config.MAX_WAIT || Banzai.BASIC_WAIT};


Banzai.FBTRACE = adapter.config.fbtrace,

Banzai.isEnabled = __annotator(function(proj){
if(__DEV__){
if(!proj){
console.error('project name required');}}


return adapter.config.gks && adapter.config.gks[proj];},{'module':'Banzai','line':399,'column':19});



Banzai.post = __annotator(function(route,data,options){

if(!route){
ErrorUtils.reportError(
new Error('Banzai.post called without specifying a route'));}


options = options || {};
var retry=options.retry;


if(adapter.config.disabled){
return;}


if(!ExecutionEnvironment.canUseDOM){
return;}



var bl=adapter.config.blacklist;
if(bl){
if(bl.indexOf){
if(typeof bl.indexOf == 'function'){
if(bl.indexOf(route) != -1){
return;}}}}







if(inFrame && document.domain == 'facebook.com'){
var bz;
try{
bz = global.top.require('Banzai');}
catch(e) {


bz = null;}


if(bz){
bz.post.apply(bz,arguments);
return;}}




var post=[
route,
data,
Date.now(),
0];



post.__meta = {
retry:retry === true,
pageID:pageID,
userID:CurrentUser.getID(),
status:READY};


if(options.signal){


post.__meta.status = INFLIGHT;

var payload=[{
user:CurrentUser.getID(),
page_id:pageID,
posts:[post],
trigger:route}];


adapter.send(
payload,__annotator(
function(){
post.__meta.status = SENT;},{'module':'Banzai','line':488,'column':6}),__annotator(

function(httpStatus){
retryPost(post,httpStatus);},{'module':'Banzai','line':491,'column':6}),

true);




if(!retry){
return;}}



postBuffer.push(post);


var delay=options.delay;
if(delay == null){
delay = Banzai.BASIC_WAIT;}

if(schedule(delay) || !triggerRoute){
triggerRoute = route;}},{'module':'Banzai','line':409,'column':14});



Banzai.flush = __annotator(function(onSuccess,onError){
clearTimeout(timer);
timer = 0;
sendWithCallbacks(onSuccess,onError);},{'module':'Banzai','line':516,'column':15});


Banzai.subscribe = adapter.subscribe;




Banzai._schedule = schedule;




Banzai._store = __annotator(function(unstash){
initializeStorage();
ErrorUtils.applyWithGuard(storage.store,storage);},{'module':'Banzai','line':532,'column':16});





Banzai._restore = __annotator(function(unstash){
initializeStorage();
ErrorUtils.applyWithGuard(storage.restore,storage);


schedule(adapter.config.RESTORE_WAIT || Banzai.VITAL_WAIT);},{'module':'Banzai','line':540,'column':18});





Banzai._unload = __annotator(function(){

adapter.cleanup();
adapter.inform(Banzai.SHUTDOWN);
initializeStorage();
ErrorUtils.applyWithGuard(storage.store,storage);},{'module':'Banzai','line':551,'column':17});






Banzai._testState = __annotator(function(){
return {
postBuffer:postBuffer,
triggerRoute:triggerRoute};},{'module':'Banzai','line':563,'column':20});







if(ExecutionEnvironment.canUseDOM){

adapter.setHooks();


NavigationMetrics.addListener(
NavigationMetrics.Events.NAVIGATION_DONE,__annotator(
function(){
Banzai._restore();
NavigationMetrics.removeCurrentListener();},{'module':'Banzai','line':581,'column':4}));}




module.exports = Banzai;},{'module':'Banzai','line':0,'column':0,'name':'$module_Banzai'}),null);
/** Path: html/js/downstream/banzai/BanzaiODS.js */
/**
 * @generated SignedSource<<6ffe62089e030685fd04dbee08f3a352>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule BanzaiODS
 * @typechecks
 */__d('BanzaiODS',['Banzai','invariant'],__annotator(function $module_BanzaiODS(global,require,requireDynamic,requireLazy,module,exports,Banzai,invariant){if(require.__markCompiled)require.__markCompiled();



















function _create(){
var data={};
var sampleRate={};












function _bump(ent,key,n,d){return __bodyWrapper(this,arguments,function(){
if(__DEV__){


!!/^[0-9\.-]+$/.test(ent)?invariant(0,
'numeric entity %s not allowed',ent):undefined;
!!/^[0-9\.-]+$/.test(key)?invariant(0,
'numeric key %s not allowed (ent = %s)',key,ent):undefined;}



if(n === undefined){n = 1;}
if(d === undefined){d = 1;}

if(ent in sampleRate){
if(sampleRate[ent] <= 0){
return;}else
{

n /= sampleRate[ent];}}




var o=data[ent] || (data[ent] = {});
var vals=o[key] || (o[key] = [0]);




n = Number(n);
d = Number(d);


if(!isFinite(n) || !isFinite(d)){
if(__DEV__){
if(!isFinite(n)){
throw new TypeError('BanzaiODS: Non-numeric argument: ' + n);}

if(!isFinite(d)){
throw new TypeError('BanzaiODS: Non-numeric argument: ' + d);}}


return;}



vals[0] += n;


if(arguments.length >= 4){
if(!vals[1])vals[1] = 0;
vals[1] += d;}},{params:[[ent,'string','ent'],[key,'string','key'],[n,'?number','n'],[d,'?number','d']]});}__annotator(_bump,{'module':'BanzaiODS','line':54,'column':2,'name':'_bump'},{params:['string','string','?number','?number']});



return {





setEntitySample:__annotator(function(ent,rate){return __bodyWrapper(this,arguments,function(){
if(__DEV__){
!(rate <= 1)?invariant(0,'sample rate %n must be <= 1',rate):undefined;}

sampleRate[ent] = Math.random() < rate?rate:0;},{params:[[ent,'string','ent'],[rate,'number','rate']]});},{'module':'BanzaiODS','line':116,'column':21},{params:['string','number']}),





bumpEntityKey:__annotator(function(ent,key,n){return __bodyWrapper(this,arguments,function(){
_bump(ent,key,n);},{params:[[ent,'string','ent'],[key,'string','key'],[n,'?number','n']]});},{'module':'BanzaiODS','line':126,'column':19},{params:['string','string','?number']}),






bumpFraction:__annotator(function(ent,
key,
n,
d){return __bodyWrapper(this,arguments,function(){
_bump(ent,key,n,d);},{params:[[ent,'string','ent'],[key,'string','key'],[n,'?number','n'],[d,'?number','d']]});},{'module':'BanzaiODS','line':134,'column':18},{params:['string','string','?number','?number']}),


flush:__annotator(function(postOptions){return __bodyWrapper(this,arguments,function(){
for(var k in data) {
Banzai.post('ods:' + k,data[k],postOptions);}

data = {};},{params:[[postOptions,'?object','postOptions']]});},{'module':'BanzaiODS','line':141,'column':11},{params:['?object']})};}__annotator(_create,{'module':'BanzaiODS','line':39,'column':0,'name':'_create'});




var BanzaiODS=_create();
BanzaiODS.create = _create;


Banzai.subscribe(Banzai.SEND,BanzaiODS.flush.bind(BanzaiODS,null));

module.exports = BanzaiODS;},{'module':'BanzaiODS','line':0,'column':0,'name':'$module_BanzaiODS'}),null);
/** Path: html/js/downstream/component_utils/lowerDomain.js */
/**
 * @generated SignedSource<<465808499ecee493f3df025b1bb852f0>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule lowerDomain
 */__d("lowerDomain",[],__annotator(function $module_lowerDomain(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();







if(document.domain.toLowerCase().match(/(^|\.)facebook\..*/)){
document.domain = "facebook.com";}},{"module":"lowerDomain","line":0,"column":0,"name":"$module_lowerDomain"}),null);
/** Path: html/js/downstream/core/dom/Scroll.js */
/**
 * @generated SignedSource<<2839a6d644b3f7e3d0a6828aa2877a55>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Scroll
 */__d("Scroll",[],__annotator(function $module_Scroll(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();






function _isViewportScrollElement(element,doc){
return !!doc && (
element === doc.documentElement || element === doc.body);}__annotator(_isViewportScrollElement,{"module":"Scroll","line":25,"column":0,"name":"_isViewportScrollElement"});















var Scroll={




getTop:__annotator(function(element){
var doc=element.ownerDocument;
return _isViewportScrollElement(element,doc)?



doc.body.scrollTop || doc.documentElement.scrollTop:
element.scrollTop;},{"module":"Scroll","line":48,"column":10}),






setTop:__annotator(function(element,newTop){
var doc=element.ownerDocument;
if(_isViewportScrollElement(element,doc)){
doc.body.scrollTop = doc.documentElement.scrollTop = newTop;}else
{
element.scrollTop = newTop;}},{"module":"Scroll","line":62,"column":10}),







getLeft:__annotator(function(element){
var doc=element.ownerDocument;
return _isViewportScrollElement(element,doc)?
doc.body.scrollLeft || doc.documentElement.scrollLeft:
element.scrollLeft;},{"module":"Scroll","line":75,"column":11}),






setLeft:__annotator(function(element,newLeft){
var doc=element.ownerDocument;
if(_isViewportScrollElement(element,doc)){
doc.body.scrollLeft = doc.documentElement.scrollLeft = newLeft;}else
{
element.scrollLeft = newLeft;}},{"module":"Scroll","line":86,"column":11})};




module.exports = Scroll;},{"module":"Scroll","line":0,"column":0,"name":"$module_Scroll"}),null);
/** Path: html/js/downstream/core/dom/isNode.js */
/**
 * @generated SignedSource<<29f1b57d5f1e2d8067bb243ab98ca1f4>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule isNode
 * @typechecks
 */__d('isNode',[],__annotator(function $module_isNode(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();





function isNode(object){return __bodyWrapper(this,arguments,function(){
return !!(object && (
typeof Node === 'function'?object instanceof Node:
typeof object === 'object' &&
typeof object.nodeType === 'number' &&
typeof object.nodeName === 'string'));},{returns:'boolean'});}__annotator(isNode,{'module':'isNode','line':25,'column':0,'name':'isNode'},{returns:'boolean'});



module.exports = isNode;},{'module':'isNode','line':0,'column':0,'name':'$module_isNode'}),null);
/** Path: html/js/downstream/core/dom/isTextNode.js */
/**
 * @generated SignedSource<<a6d3ad442df1fb39fdad82b239b69cf8>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule isTextNode
 * @typechecks
 */__d('isTextNode',['isNode'],__annotator(function $module_isTextNode(global,require,requireDynamic,requireLazy,module,exports,isNode){if(require.__markCompiled)require.__markCompiled();







function isTextNode(object){return __bodyWrapper(this,arguments,function(){
return isNode(object) && object.nodeType == 3;},{returns:'boolean'});}__annotator(isTextNode,{'module':'isTextNode','line':27,'column':0,'name':'isTextNode'},{returns:'boolean'});


module.exports = isTextNode;},{'module':'isTextNode','line':0,'column':0,'name':'$module_isTextNode'}),null);
/** Path: html/js/downstream/core/dom/containsNode.js */
/**
 * @generated SignedSource<<3287e01149a10d8dc58e7b322f55bfbc>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule containsNode
 * @typechecks
 */__d('containsNode',['isTextNode'],__annotator(function $module_containsNode(global,require,requireDynamic,requireLazy,module,exports,isTextNode){if(require.__markCompiled)require.__markCompiled();












function containsNode(outerNode,innerNode){return __bodyWrapper(this,arguments,function(){
if(!outerNode || !innerNode){
return false;}else
if(outerNode === innerNode){
return true;}else
if(isTextNode(outerNode)){
return false;}else
if(isTextNode(innerNode)){
return containsNode(outerNode,innerNode.parentNode);}else
if(outerNode.contains){
return outerNode.contains(innerNode);}else
if(outerNode.compareDocumentPosition){
return !!(outerNode.compareDocumentPosition(innerNode) & 16);}else
{
return false;}},{params:[[outerNode,'?DOMNode','outerNode'],[innerNode,'?DOMNode','innerNode']],returns:'boolean'});}__annotator(containsNode,{'module':'containsNode','line':32,'column':0,'name':'containsNode'},{params:['?DOMNode','?DOMNode'],returns:'boolean'});



module.exports = containsNode;},{'module':'containsNode','line':0,'column':0,'name':'$module_containsNode'}),null);
/** Path: html/js/downstream/core/dom/getActiveElement.js */
/**
 * @generated SignedSource<<034376a693284fd416aef08098c1ea67>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule getActiveElement
 * @typechecks
 */__d("getActiveElement",[],__annotator(function $module_getActiveElement(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();







function getActiveElement(){return __bodyWrapper(this,arguments,function(){
try{
return document.activeElement || document.body;}
catch(e) {
return document.body;}},{returns:"?HTMLElement"});}__annotator(getActiveElement,{"module":"getActiveElement","line":27,"column":0,"name":"getActiveElement"},{returns:"?HTMLElement"});



module.exports = getActiveElement;},{"module":"getActiveElement","line":0,"column":0,"name":"$module_getActiveElement"}),null);
/** Path: html/js/downstream/core/dom/getDocumentScrollElement.js */
/**
 * @generated SignedSource<<1f8bddb473d73c9e3cc3bc79cf6df9bf>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule getDocumentScrollElement
 * @typechecks
 */__d('getDocumentScrollElement',[],__annotator(function $module_getDocumentScrollElement(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

'use strict';

var isWebkit=
typeof navigator !== 'undefined' &&
navigator.userAgent.indexOf('AppleWebKit') > -1;










function getDocumentScrollElement(doc){return __bodyWrapper(this,arguments,function(){
doc = doc || document;
return !isWebkit && doc.compatMode === 'CSS1Compat'?
doc.documentElement:
doc.body;},{params:[[doc,'?DOMDocument','doc']],returns:'?HTMLElement'});}__annotator(getDocumentScrollElement,{'module':'getDocumentScrollElement','line':36,'column':0,'name':'getDocumentScrollElement'},{params:['?DOMDocument'],returns:'?HTMLElement'});


module.exports = getDocumentScrollElement;},{'module':'getDocumentScrollElement','line':0,'column':0,'name':'$module_getDocumentScrollElement'}),null);
/** Path: html/js/downstream/core/dom/isElementNode.js */
/**
 * @generated SignedSource<<98ed910d79603f6436cd8b859a1d8abc>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule isElementNode
 * @typechecks
 */__d('isElementNode',['isNode'],__annotator(function $module_isElementNode(global,require,requireDynamic,requireLazy,module,exports,isNode){if(require.__markCompiled)require.__markCompiled();










function isElementNode(element){return __bodyWrapper(this,arguments,function(){
return isNode(element) && element.nodeType == 1;},{returns:'boolean'});}__annotator(isElementNode,{'module':'isElementNode','line':30,'column':0,'name':'isElementNode'},{returns:'boolean'});


module.exports = isElementNode;},{'module':'isElementNode','line':0,'column':0,'name':'$module_isElementNode'}),null);
/** Path: html/js/downstream/core/getObjectValues.js */
/**
 * @generated SignedSource<<7f38449ed45d2af16cce28984455ff69>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule getObjectValues
 * @typechecks
 */__d("getObjectValues",[],__annotator(function $module_getObjectValues(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();










function getObjectValues(obj){return __bodyWrapper(this,arguments,function(){
var values=[];
for(var key in obj) {
values.push(obj[key]);}

return values;},{params:[[obj,"object","obj"]],returns:"array"});}__annotator(getObjectValues,{"module":"getObjectValues","line":30,"column":0,"name":"getObjectValues"},{params:["object"],returns:"array"});


module.exports = getObjectValues;},{"module":"getObjectValues","line":0,"column":0,"name":"$module_getObjectValues"}),null);
/** Path: html/js/downstream/logging/ScriptPath.js */
/**
 * @generated SignedSource<<12e9018d81ca8b6561f190bd0747f40b>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ScriptPath
 * @typechecks
 */__d('ScriptPath',['WebStorage','ErrorUtils','isInIframe'],__annotator(function $module_ScriptPath(global,require,requireDynamic,requireLazy,module,exports,WebStorage,ErrorUtils,isInIframe){if(require.__markCompiled)require.__markCompiled();























var PAGEINFO_NAME='sp_pi';
var RETENTION_TIME=1000 * 30;

var _webStore=WebStorage.getLocalStorage();

var _sourcePageInfo=null;
var _pageInfo=null;
var _callbacks={};
var _counter=0;






var _lastClickPointInfo=null;

var CAUSE={
PAGE_LOAD:'load',
PAGE_UNLOAD:'unload',
OPEN_OVERLAY_VIEW:'open_overlay_view',
CLOSE_OVERLAY_VIEW:'close_overlay_view',
TRANSITION:'transition'};









var _overlayViewStack=[];

function _registerCallback(callback){return __bodyWrapper(this,arguments,function(){
var token=++_counter;
_callbacks[token] = callback;
return token;},{params:[[callback,'function','callback']],returns:'number'});}__annotator(_registerCallback,{'module':'ScriptPath','line':77,'column':0,'name':'_registerCallback'},{params:['function'],returns:'number'});


function _unregisterCallback(token){return __bodyWrapper(this,arguments,function(){
if(_callbacks[token]){
delete _callbacks[token];}},{params:[[token,'number','token']]});}__annotator(_unregisterCallback,{'module':'ScriptPath','line':83,'column':0,'name':'_unregisterCallback'},{params:['number']});



function _notify(cause){return __bodyWrapper(this,arguments,function(){
Object.keys(_callbacks).forEach(__annotator(function(key){
ErrorUtils.applyWithGuard(_callbacks[key],null,[{
source:_sourcePageInfo,
dest:_pageInfo,
cause:cause}]);},{'module':'ScriptPath','line':90,'column':34}));},{params:[[cause,'?string','cause']]});}__annotator(_notify,{'module':'ScriptPath','line':89,'column':0,'name':'_notify'},{params:['?string']});




function _getScriptPath(){
return _pageInfo?_pageInfo.scriptPath:undefined;}__annotator(_getScriptPath,{'module':'ScriptPath','line':99,'column':0,'name':'_getScriptPath'});


function _storeScriptPathInfo(){
if(!_webStore || isInIframe()){
return;}

_webStore.setItem(
PAGEINFO_NAME,
JSON.stringify({
pageInfo:_pageInfo,
clickPoint:_lastClickPointInfo,
time:Date.now()}));}__annotator(_storeScriptPathInfo,{'module':'ScriptPath','line':103,'column':0,'name':'_storeScriptPathInfo'});




function _loadScriptPathInfo(){
if(!_webStore){
return;}

var pageInfo=_webStore.getItem(PAGEINFO_NAME);
if(pageInfo){
var info=JSON.parse(pageInfo);
if(info){
if(info.time < Date.now() - RETENTION_TIME){
_webStore.removeItem(PAGEINFO_NAME);
return;}

_pageInfo = info.pageInfo;
_lastClickPointInfo = info.clickPoint;
if(_pageInfo){
_pageInfo.restored = true;}}}}__annotator(_loadScriptPathInfo,{'module':'ScriptPath','line':117,'column':0,'name':'_loadScriptPathInfo'});





_loadScriptPathInfo();

var ScriptPath={

set:__annotator(function(scriptPath,
categoryToken,
extraData){return __bodyWrapper(this,arguments,function(){
_sourcePageInfo = _pageInfo;

_pageInfo = {
scriptPath:scriptPath,
categoryToken:categoryToken,
extraData:extraData || {}};


_overlayViewStack = [];


window._script_path = scriptPath;

_notify();},{params:[[scriptPath,'string','scriptPath'],[categoryToken,'?string','categoryToken'],[extraData,'?object','extraData']]});},{'module':'ScriptPath','line':142,'column':7},{params:['string','?string','?object']}),


openOverlayView:__annotator(function(endpoint){return __bodyWrapper(this,arguments,function(){
if(!endpoint){
return;}

var stackSize=_overlayViewStack.length;
if(stackSize === 0 || _overlayViewStack[stackSize - 1] !== endpoint){
_sourcePageInfo = Object.assign({},_pageInfo);
_pageInfo.topViewEndpoint = endpoint;
_overlayViewStack.push(endpoint);
_notify(CAUSE.OPEN_OVERLAY_VIEW);}},{params:[[endpoint,'string','endpoint']]});},{'module':'ScriptPath','line':161,'column':17},{params:['string']}),



closeOverlayView:__annotator(function(endpoint){return __bodyWrapper(this,arguments,function(){
var index=_overlayViewStack.lastIndexOf(endpoint);
if(index === -1){
return;}

_sourcePageInfo = Object.assign({},_pageInfo);
if(index > 0){
_pageInfo.topViewEndpoint = _overlayViewStack[index - 1];}else
{
_pageInfo.topViewEndpoint = null;}

_overlayViewStack = _overlayViewStack.slice(0,index);
_notify(CAUSE.CLOSE_OVERLAY_VIEW);},{params:[[endpoint,'string','endpoint']]});},{'module':'ScriptPath','line':174,'column':18},{params:['string']}),





setClickPointInfo:__annotator(function(clickPointInfo){
_lastClickPointInfo = clickPointInfo;
_storeScriptPathInfo();},{'module':'ScriptPath','line':192,'column':21}),


getClickPointInfo:__annotator(function(){
return _lastClickPointInfo;},{'module':'ScriptPath','line':197,'column':21}),






getScriptPath:_getScriptPath,






getCategoryToken:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return _pageInfo?_pageInfo.categoryToken:undefined;},{returns:'?string'});},{'module':'ScriptPath','line':212,'column':20},{returns:'?string'}),






getTopViewEndpoint:__annotator(function(){return __bodyWrapper(this,arguments,function(){
var stackSize=_overlayViewStack.length;
return stackSize > 0?
_overlayViewStack[stackSize - 1]:
_getScriptPath();},{returns:'?string'});},{'module':'ScriptPath','line':220,'column':22},{returns:'?string'}),


getPageInfo:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return _pageInfo;},{returns:'?object'});},{'module':'ScriptPath','line':227,'column':15},{returns:'?object'}),


getSourcePageInfo:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return _sourcePageInfo;},{returns:'?object'});},{'module':'ScriptPath','line':231,'column':21},{returns:'?object'}),


subscribe:__annotator(function(callback){return __bodyWrapper(this,arguments,function(){
return _registerCallback(callback);},{params:[[callback,'function','callback']],returns:'number'});},{'module':'ScriptPath','line':235,'column':13},{params:['function'],returns:'number'}),


unsubscribe:__annotator(function(token){return __bodyWrapper(this,arguments,function(){
_unregisterCallback(token);},{params:[[token,'number','token']]});},{'module':'ScriptPath','line':239,'column':15},{params:['number']}),


shutdown:__annotator(function(){
_storeScriptPathInfo();},{'module':'ScriptPath','line':243,'column':12})};



ScriptPath.CAUSE = CAUSE;

module.exports = ScriptPath;},{'module':'ScriptPath','line':0,'column':0,'name':'$module_ScriptPath'}),null);
/** Path: html/js/downstream/useragent/UserAgent_DEPRECATED.js */
/**
 * @generated SignedSource<<ddd5a4505133b096155b2aaa9dec8832>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule UserAgent_DEPRECATED
 */__d('UserAgent_DEPRECATED',[],__annotator(function $module_UserAgent_DEPRECATED(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();









































var _populated=false;


var _ie,_firefox,_opera,_webkit,_chrome;


var _ie_real_version;


var _osx,_windows,_linux,_android;


var _win64;


var _iphone,_ipad,_native;

var _mobile;

function _populate(){
if(_populated){
return;}


_populated = true;






var uas=navigator.userAgent;
var agent=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
var os=/(Mac OS X)|(Windows)|(Linux)/.exec(uas);

_iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
_ipad = /\b(iP[ao]d)/.exec(uas);
_android = /Android/i.exec(uas);
_native = /FBAN\/\w+;/i.exec(uas);
_mobile = /Mobile/i.exec(uas);






_win64 = !!/Win64/.exec(uas);

if(agent){
_ie = agent[1]?parseFloat(agent[1]):
agent[5]?parseFloat(agent[5]):NaN;

if(_ie && document && document.documentMode){
_ie = document.documentMode;}


var trident=/(?:Trident\/(\d+.\d+))/.exec(uas);
_ie_real_version = trident?parseFloat(trident[1]) + 4:_ie;

_firefox = agent[2]?parseFloat(agent[2]):NaN;
_opera = agent[3]?parseFloat(agent[3]):NaN;
_webkit = agent[4]?parseFloat(agent[4]):NaN;
if(_webkit){



agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
_chrome = agent && agent[1]?parseFloat(agent[1]):NaN;}else
{
_chrome = NaN;}}else

{
_ie = _firefox = _opera = _chrome = _webkit = NaN;}


if(os){
if(os[1]){





var ver=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

_osx = ver?parseFloat(ver[1].replace('_','.')):true;}else
{
_osx = false;}

_windows = !!os[2];
_linux = !!os[3];}else
{
_osx = _windows = _linux = false;}}__annotator(_populate,{'module':'UserAgent_DEPRECATED','line':79,'column':0,'name':'_populate'});



var UserAgent_DEPRECATED={







ie:__annotator(function(){
return _populate() || _ie;},{'module':'UserAgent_DEPRECATED','line':163,'column':6}),








ieCompatibilityMode:__annotator(function(){
return _populate() || _ie_real_version > _ie;},{'module':'UserAgent_DEPRECATED','line':173,'column':23}),








ie64:__annotator(function(){
return UserAgent_DEPRECATED.ie() && _win64;},{'module':'UserAgent_DEPRECATED','line':183,'column':8}),








firefox:__annotator(function(){
return _populate() || _firefox;},{'module':'UserAgent_DEPRECATED','line':193,'column':11}),









opera:__annotator(function(){
return _populate() || _opera;},{'module':'UserAgent_DEPRECATED','line':204,'column':9}),









webkit:__annotator(function(){
return _populate() || _webkit;},{'module':'UserAgent_DEPRECATED','line':215,'column':10}),






safari:__annotator(function(){
return UserAgent_DEPRECATED.webkit();},{'module':'UserAgent_DEPRECATED','line':223,'column':10}),








chrome:__annotator(function(){
return _populate() || _chrome;},{'module':'UserAgent_DEPRECATED','line':233,'column':11}),








windows:__annotator(function(){
return _populate() || _windows;},{'module':'UserAgent_DEPRECATED','line':243,'column':11}),









osx:__annotator(function(){
return _populate() || _osx;},{'module':'UserAgent_DEPRECATED','line':254,'column':7}),







linux:__annotator(function(){
return _populate() || _linux;},{'module':'UserAgent_DEPRECATED','line':263,'column':9}),








iphone:__annotator(function(){
return _populate() || _iphone;},{'module':'UserAgent_DEPRECATED','line':273,'column':10}),


mobile:__annotator(function(){
return _populate() || (_iphone || _ipad || _android || _mobile);},{'module':'UserAgent_DEPRECATED','line':277,'column':10}),


nativeApp:__annotator(function(){

return _populate() || _native;},{'module':'UserAgent_DEPRECATED','line':281,'column':13}),


android:__annotator(function(){
return _populate() || _android;},{'module':'UserAgent_DEPRECATED','line':286,'column':11}),


ipad:__annotator(function(){
return _populate() || _ipad;},{'module':'UserAgent_DEPRECATED','line':290,'column':8})};



module.exports = UserAgent_DEPRECATED;},{'module':'UserAgent_DEPRECATED','line':0,'column':0,'name':'$module_UserAgent_DEPRECATED'}),null);
/** Path: html/js/emptyFunction.js */
/**
 * @providesLegacy emptyFunction
 */__d('legacy:emptyFunction',['emptyFunction'],__annotator(function $module_legacy_emptyFunction(global,require,requireDynamic,requireLazy){if(require.__markCompiled)require.__markCompiled();

global.emptyFunction = require('emptyFunction');},{'module':'legacy:emptyFunction','line':0,'column':0,'name':'$module_legacy_emptyFunction'}),3);
/** Path: html/js/lib/event/arbiter.js */
/**
 * @providesLegacy arbiter
 */__d('legacy:arbiter',['Arbiter'],__annotator(function $module_legacy_arbiter(global,require,requireDynamic,requireLazy){if(require.__markCompiled)require.__markCompiled();

global.Arbiter = require('Arbiter');},{'module':'legacy:arbiter','line':0,'column':0,'name':'$module_legacy_arbiter'}),3);
/** Path: html/js/lib/event/form_bubbling.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule event-form-bubbling
 * @runWhenReady_DEPRECATED
 */__d('event-form-bubbling',[],__annotator(function $module_event_form_bubbling(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

global.Event = global.Event || __annotator(function(){},{'module':'event-form-bubbling','line':8,'column':31});














global.Event.__inlineSubmit = __annotator(function(node,event){
var has_handler=
global.Event.__getHandler &&
global.Event.__getHandler(node,'submit');

return has_handler?null:global.Event.__bubbleSubmit(node,event);},{'module':'event-form-bubbling','line':23,'column':30});








global.Event.__bubbleSubmit = __annotator(function(node,event){
if(document.documentElement.attachEvent){
var r;
while(r !== false && (node = node.parentNode)) {
r = node.onsubmit?
node.onsubmit(event):
global.Event.__fire && global.Event.__fire(node,'submit',event);}

return r;}},{'module':'event-form-bubbling','line':37,'column':30});},{'module':'event-form-bubbling','line':0,'column':0,'name':'$module_event_form_bubbling'}),3);
/** Path: html/js/lib/event/onload.js */
/**
 * @providesLegacy onload
 */__d('legacy:onload',['Run','PageEvents'],__annotator(function $module_legacy_onload(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,Run){if(require.__markCompiled)require.__markCompiled();



global.PageEvents = require('PageEvents');

global.onloadRegister_DEPRECATED = Run.onLoad;
global.onloadRegister = __annotator(function(){
if(__DEV__){
console.warn(
'Calling onloadRegister from JS is deprecated. Change this call to ' +
'onloadRegister_DEPRECATED or modularize the entire call stack and its ' +
'dependencies.');}

return Run.onLoad.apply(this,arguments);},{'module':'legacy:onload','line':10,'column':24});


global.onafterloadRegister_DEPRECATED = Run.onAfterLoad;
global.onafterloadRegister = __annotator(function(){
if(__DEV__){
console.warn(
'Calling onafterloadRegister from JS is deprecated. Change this call ' +
'to onafterloadRegister_DEPRECATED or modularize the entire call stack ' +
'and its dependencies.');}

return Run.onAfterLoad.apply(this,arguments);},{'module':'legacy:onload','line':21,'column':29});


global.onleaveRegister = Run.onLeave;
global.onbeforeunloadRegister = Run.onBeforeUnload;
global.onunloadRegister = Run.onUnload;},{'module':'legacy:onload','line':0,'column':0,'name':'$module_legacy_onload'}),3);
/** Path: html/js/lib/event/wait_for_load.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule wait_for_load
 * @runWhenReady_DEPRECATED
 */__d('wait_for_load',['Bootloader','Run'],__annotator(function $module_wait_for_load(global,require,requireDynamic,requireLazy,module,exports,Bootloader,Run){if(require.__markCompiled)require.__markCompiled();







function run_if_loaded(element,f){
return window.domready && f.call(element);}__annotator(run_if_loaded,{'module':'wait_for_load','line':14,'column':0,'name':'run_if_loaded'});





function run_with(element,deps,f){

Bootloader.loadComponents.call(Bootloader,deps,f.bind(element));
return false;}__annotator(run_with,{'module':'wait_for_load','line':21,'column':0,'name':'run_with'});

















function wait_for_load(element,e,f){
f = f.bind(element,e);
if(window.domready){
return f();}

switch((e || event).type){
case 'load':
case 'focus':
Run.onAfterLoad(f);
return;
case 'click':
var es=element.style,
ds=document.body.style;

es.cursor = ds.cursor = 'progress';
Run.onAfterLoad(__annotator(function(){
es.cursor = ds.cursor = '';
if(element.tagName.toLowerCase() == 'a'){

if(false !== f() && element.href){
window.location.href = element.href;}}else

if(element.click){

element.click();}},{'module':'wait_for_load','line':57,'column':22}));


break;}

return false;}__annotator(wait_for_load,{'module':'wait_for_load','line':42,'column':0,'name':'wait_for_load'});


global.run_if_loaded = run_if_loaded;
global.run_with = run_with;
global.wait_for_load = wait_for_load;},{'module':'wait_for_load','line':0,'column':0,'name':'$module_wait_for_load'}),3);
/** Path: html/js/lib/markJSEnabled.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule markJSEnabled
 */__d('markJSEnabled',[],__annotator(function $module_markJSEnabled(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();


var rootElement=document.documentElement;
rootElement.className = rootElement.className.replace('no_js','');},{'module':'markJSEnabled','line':0,'column':0,'name':'$module_markJSEnabled'}),null);
/** Path: html/js/lib/util/bootloader.js */
/**
 * @providesLegacy bootloader
 */__d('legacy:bootloader',['Bootloader'],__annotator(function $module_legacy_bootloader(global,require,requireDynamic,requireLazy){if(require.__markCompiled)require.__markCompiled();

global.Bootloader = require('Bootloader');},{'module':'legacy:bootloader','line':0,'column':0,'name':'$module_legacy_bootloader'}),3);
/** Path: html/js/lib/util/constructor-cache.js */
/**
 * @providesLegacy constructor-cache
 */__d('legacy:constructor-cache',['JSCC'],__annotator(function $module_legacy_constructor_cache(global,require,requireDynamic,requireLazy){if(require.__markCompiled)require.__markCompiled();

global.JSCC = require('JSCC');},{'module':'legacy:constructor-cache','line':0,'column':0,'name':'$module_legacy_constructor_cache'}),3);
/** Path: html/js/modules/goURI.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule goURI
 */__d('goURI',['URISchemes'],__annotator(function $module_goURI(global,require,requireDynamic,requireLazy,module,exports,URISchemes){if(require.__markCompiled)require.__markCompiled();








function goURI(uri,force,replace){
uri = uri.toString();
if(/^([^.:/?#]+):/.test(uri) &&
!URISchemes.isAllowed(RegExp.$1)){
throw new Error('goURI: URI scheme rejected, URI: ' + uri);}

if(!force && global.PageTransitions){
global.PageTransitions.go(uri,replace);}else
if(window.location.href == uri){
window.location.reload();}else
{
window.location.href = uri;}}__annotator(goURI,{'module':'goURI','line':14,'column':0,'name':'goURI'});

;

module.exports = goURI;},{'module':'goURI','line':0,'column':0,'name':'$module_goURI'}),null);
/** Path: html/js/lib/util/goURI.js */
/**
 * @providesLegacy goURI
 */__d('legacy:goURI',['goURI'],__annotator(function $module_legacy_goURI(global,require,requireDynamic,requireLazy){if(require.__markCompiled)require.__markCompiled();

global.goURI = require('goURI');},{'module':'legacy:goURI','line':0,'column':0,'name':'$module_legacy_goURI'}),3);
/** Path: html/js/modules/InitialJSLoader.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule InitialJSLoader
 */__d('InitialJSLoader',['Arbiter','Bootloader','PageEvents','Run','ServerJS'],__annotator(function $module_InitialJSLoader(global,require,requireDynamic,requireLazy,module,exports,Arbiter,Bootloader,PageEvents,Run,ServerJS){if(require.__markCompiled)require.__markCompiled();







var InitialJSLoader={
INITIAL_JS_READY:'BOOTLOAD/JSREADY',






loadOnDOMContentReady:__annotator(function(resources,delay){
Arbiter.subscribe(PageEvents.BIGPIPE_DOMREADY,__annotator(function(){
function loadAndNotify(){
Bootloader.loadResources(resources,__annotator(function(){
Arbiter.inform(
InitialJSLoader.INITIAL_JS_READY,
true,
Arbiter.BEHAVIOR_STATE);},{'module':'InitialJSLoader','line':24,'column':44}));}__annotator(loadAndNotify,{'module':'InitialJSLoader','line':23,'column':6,'name':'loadAndNotify'});



if(delay){
setTimeout(loadAndNotify,delay);}else
{
loadAndNotify();}},{'module':'InitialJSLoader','line':22,'column':51}));},{'module':'InitialJSLoader','line':21,'column':25}),




handleServerJS:__annotator(function(json){
var serverJS=new ServerJS();
serverJS.handle(json);
Run.onAfterLoad(serverJS.cleanup.bind(serverJS));},{'module':'InitialJSLoader','line':40,'column':18})};



module.exports = InitialJSLoader;},{'module':'InitialJSLoader','line':0,'column':0,'name':'$module_InitialJSLoader'}),null);
/** Path: html/js/modules/DataStore.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule DataStore
 */__d('DataStore',['isEmpty'],__annotator(function $module_DataStore(global,require,requireDynamic,requireLazy,module,exports,isEmpty){if(require.__markCompiled)require.__markCompiled();


















var _storage={};
var _tokenCounter=1;







function _getToken(namespace){
if(typeof namespace == 'string'){
return 'str_' + namespace;}else
{





return 'elem_' +
(namespace.__FB_TOKEN || (
namespace.__FB_TOKEN = [_tokenCounter++]))[0];}}__annotator(_getToken,{'module':'DataStore','line':33,'column':0,'name':'_getToken'});










function _getStorage(namespace){
var token=_getToken(namespace);
return _storage[token] || (_storage[token] = {});}__annotator(_getStorage,{'module':'DataStore','line':55,'column':0,'name':'_getStorage'});


var DataStore={









set:__annotator(function(namespace,key,value){
if(!namespace){
throw new TypeError(
'DataStore.set: namespace is required, got ' + typeof namespace);}

var dataStore=_getStorage(namespace);
dataStore[key] = value;
return namespace;},{'module':'DataStore','line':70,'column':7}),

















get:__annotator(function(namespace,key,defaultValue){
if(!namespace){
throw new TypeError(
'DataStore.get: namespace is required, got ' + typeof namespace);}

var dataStore=_getStorage(namespace);
var value=dataStore[key];



if(typeof value === 'undefined' && namespace.getAttribute){





if(namespace.hasAttribute && !namespace.hasAttribute('data-' + key)){
value = undefined;}else
{
var attributeValue=namespace.getAttribute('data-' + key);

value = null === attributeValue?undefined:attributeValue;}}



if(defaultValue !== undefined && value === undefined){
value = dataStore[key] = defaultValue;}

return value;},{'module':'DataStore','line':95,'column':7}),









remove:__annotator(function(namespace,key){
if(!namespace){
throw new TypeError(
'DataStore.remove: namespace is required, got ' + typeof namespace);}

var dataStore=_getStorage(namespace);
var value=dataStore[key];
delete dataStore[key];



if(isEmpty(dataStore)){
DataStore.purge(namespace);}


return value;},{'module':'DataStore','line':133,'column':10}),







purge:__annotator(function(namespace){
delete _storage[_getToken(namespace)];},{'module':'DataStore','line':156,'column':9}),



_storage:_storage};


module.exports = DataStore;},{'module':'DataStore','line':0,'column':0,'name':'$module_DataStore'}),null);
/** Path: html/js/modules/DOMQuery.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule DOMQuery
 */__d('DOMQuery',['CSS','containsNode','createArrayFromMixed','createObjectFrom','ge','getDocumentScrollElement','isElementNode','isNode','isTextNode'],__annotator(function $module_DOMQuery(global,require,requireDynamic,requireLazy,module,exports,CSS,containsNode,createArrayFromMixed,createObjectFrom,ge,getDocumentScrollElement,isElementNode,isNode,isTextNode){if(require.__markCompiled)require.__markCompiled();






























function hasAttribute(element,attr){
return element.hasAttribute?
element.hasAttribute(attr):element.getAttribute(attr) !== null;}__annotator(hasAttribute,{'module':'DOMQuery','line':36,'column':0,'name':'hasAttribute'});


var DOMQuery={












find:__annotator(function(element,selector_str){
var elements=DOMQuery.scry(element,selector_str);

if(__DEV__){
if(1 != elements.length){
throw new Error(
'DOMQuery.find() located ' + elements.length +
' elements that matched the selector "' + selector_str + '". ' +
'You should only use DOMQuery.find when you are sure that 1 element' +
' will match, otherwise, use DOMQuery.scry().');}}



return elements[0];},{'module':'DOMQuery','line':54,'column':8}),
















findPushSafe:__annotator(function(element,selector_old,selector_new){
var elements_old=DOMQuery.scry(element,selector_old);
var elements_new=DOMQuery.scry(element,selector_new);

var elements;
if(elements_old.length === 1 &&
elements_new.length === 1 &&
elements_old[0] === elements_new[0]){
elements = elements_old;}else
{
elements = elements_old.concat(elements_new);}


if(__DEV__){
if(1 != elements.length){
throw new Error(
'DOMQuery.findPushSafe() located ' + elements.length +
' elements that matched the selectors "' + selector_old +
'" or "' + selector_new + '". You should only use' +
' DOMQuery.findPushSafe when you are sure that 1 element' +
' will match, otherwise, use DOMQuery.scry().');}}



return elements[0];},{'module':'DOMQuery','line':84,'column':16}),







































































scry:__annotator(function(element,selector_str){



if(!element || !element.getElementsByTagName){
if(__DEV__){
throw new Error('You must pass a valid reference element.');}

return [];}


var selectors=selector_str.split(' ');
var candidates=[element];
if(__DEV__){
var elem_is_document=!!element.documentElement;}



for(var i=0;i < selectors.length;i++) {

if(candidates.length === 0){
break;}



if(selectors[i] === ''){
continue;}



var selector=selectors[i];
var selector_org=selectors[i];
var new_candidates=[];


var upwards=false;
if(selector.charAt(0) == '^'){
if(i === 0){
upwards = true;
selector = selector.slice(1);}else
{
if(__DEV__){
throw new Error(
'DOMQuery.scry: upwards looking selectors (' + selector + ') ' +
'are only supported on the first selector');}

return [];}}










selector = selector.replace(/\[(?:[^=\]]*=(?:"[^"]*"|'[^']*'))?|[.#]/g,
' $&');

var sub_selectors=selector.split(' ');
var tag=sub_selectors[0] || '*';
var all=tag == '*';

var id_selector=sub_selectors[1] && sub_selectors[1].charAt(0) == '#';

if(__DEV__){
if(i === 0 && all && elem_is_document && !id_selector){
throw new Error(
'scry() was called without a tag in the selector, which is ' +
'very expensive. You should probably use scry() like `div' +
selector_str + '` instead of `' + selector_str + '`.');}}




if(id_selector){







var elem=ge(sub_selectors[1].slice(1),element,tag);

if(elem && (all || elem.tagName.toLowerCase() == tag)){


for(var iter=0;iter < candidates.length;iter++) {
if(upwards && DOMQuery.contains(elem,candidates[iter])){
new_candidates = [elem];
break;}else
if(
document == candidates[iter] ||

DOMQuery.contains(candidates[iter],elem) &&
candidates[iter] !== elem)

{

new_candidates = [elem];
break;}}}}else



{




var tag_candidates=[];
var candidate_l=candidates.length;
var elements;


var use_qsa=!upwards &&
selector_org.indexOf('[') < 0 &&
document.querySelectorAll;

for(var ii=0;ii < candidate_l;ii++) {

if(upwards){
elements = [];
var current=candidates[ii].parentNode;
while(isElementNode(current)) {
if(all || current.tagName.toLowerCase() == tag){
elements.push(current);}


current = current.parentNode;}}else


if(use_qsa){
elements = candidates[ii].querySelectorAll(selector_org);}else
{
elements = candidates[ii].getElementsByTagName(tag);}


var elements_l=elements.length;
for(var jj=0;jj < elements_l;jj++) {
tag_candidates.push(elements[jj]);}}



if(!use_qsa){
for(var sub_iter=1;sub_iter < sub_selectors.length;sub_iter++) {
var sub_selector=sub_selectors[sub_iter];
var is_class=sub_selector.charAt(0) == '.';
var className=sub_selector.substring(1);

for(ii = 0;ii < tag_candidates.length;ii++) {
var tag_candidate=tag_candidates[ii];


if(!tag_candidate || tag_candidate.nodeType !== 1){
continue;}




if(is_class){
if(!CSS.hasClass(tag_candidate,className)){
delete tag_candidates[ii];}

continue;}else
{





var class_selector=
sub_selector.slice(1,sub_selector.length - 1);
var equals_index=class_selector.indexOf('=');
if(equals_index < 0){


if(!hasAttribute(tag_candidate,class_selector)){
delete tag_candidates[ii];
continue;}}else

{


var attr=class_selector.substr(0,equals_index);
var value=class_selector.substr(equals_index + 1);

value = value.slice(1,value.length - 1);

if(tag_candidate.getAttribute(attr) != value){
delete tag_candidates[ii];
continue;}}}}}}






for(ii = 0;ii < tag_candidates.length;ii++) {
if(tag_candidates[ii]){
new_candidates.push(tag_candidates[ii]);
if(upwards){









break;}}}}







candidates = new_candidates;}


return candidates;},{'module':'DOMQuery','line':180,'column':8}),






getSelection:__annotator(function(){
var ws=window.getSelection,
ds=document.selection;
if(ws){
return ws() + '';}else
if(ds){
return ds.createRange().text;}

return null;},{'module':'DOMQuery','line':410,'column':16}),











contains:__annotator(function(outer_obj,inner_obj){
outer_obj = ge(outer_obj);
inner_obj = ge(inner_obj);
if(typeof outer_obj === 'string' ||
typeof inner_obj === 'string'){
console.warn('DOMQuery.contains: Support for node IDs is deprecated.');}

return containsNode(outer_obj,inner_obj);},{'module':'DOMQuery','line':430,'column':12}),





















getRootElement:__annotator(function(){
var elem=null;
if(window.Quickling && Quickling.isActive()){
elem = ge('content');}

return elem || document.body;},{'module':'DOMQuery','line':459,'column':18}),










isNode:__annotator(function(obj){
return isNode(obj);},{'module':'DOMQuery','line':475,'column':10}),














isNodeOfType:__annotator(function(obj,type){
if(__DEV__){
if(!type){
throw new Error('You must pass a type (or types) to isNodeOfType.');}}


var types=createArrayFromMixed(type).join('|').toUpperCase().split('|');
var map=createObjectFrom(types);
return isNode(obj) && obj.nodeName in map;},{'module':'DOMQuery','line':491,'column':16}),









isElementNode:__annotator(function(obj){
return isElementNode(obj);},{'module':'DOMQuery','line':509,'column':17}),








isTextNode:__annotator(function(obj){
return isTextNode(obj);},{'module':'DOMQuery','line':519,'column':14}),








isInputNode:__annotator(function(obj){

return DOMQuery.isNodeOfType(obj,['input','textarea']) ||
obj.contentEditable === 'true';},{'module':'DOMQuery','line':529,'column':15}),


getDocumentScrollElement:getDocumentScrollElement};



module.exports = DOMQuery;},{'module':'DOMQuery','line':0,'column':0,'name':'$module_DOMQuery'}),null);
/** Path: html/js/modules/DOMEvent.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * Wrapper to provide consistent API for working with browser events.
 * This lends itself well to use with the DOMEventListener module:
 *
 * DOMEventListener.add(dom, 'click', function(e) {
 *   new DOMEvent(e).kill();
 *   ...
 * });
 *
 * Do not extend this with further dependencies as it is designed to be a
 * low-level component usable for composition.
 *
 * @providesModule DOMEvent
 * @typechecks
 */__d('DOMEvent',['invariant'],__annotator(function $module_DOMEvent(global,require,requireDynamic,requireLazy,module,exports,invariant){if(require.__markCompiled)require.__markCompiled();




function DOMEvent(e){return __bodyWrapper(this,arguments,function(){'use strict';
this.event = e || window.event;







!(
typeof this.event.srcElement != 'unknown')?invariant(0,
'DOMEvent: stale event passed to constructor'):undefined;


this.target = this.event.target || this.event.srcElement;},{params:[[e,'object','e']]});}__annotator(DOMEvent,{'module':'DOMEvent','line':22,'column':2,'name':'DOMEvent'},{params:['object']});DOMEvent.prototype.


preventDefault = __annotator(function(){'use strict';
var e=this.event;
if(e.preventDefault){
e.preventDefault();
if(!('defaultPrevented' in e)){
e.defaultPrevented = true;}}else

{
e.returnValue = false;}

return this;},{'module':'DOMEvent','line':39,'column':16});DOMEvent.prototype.


isDefaultPrevented = __annotator(function(){'use strict';
var e=this.event;
return 'defaultPrevented' in e?
e.defaultPrevented:
e.returnValue === false;},{'module':'DOMEvent','line':52,'column':20});DOMEvent.prototype.


stopPropagation = __annotator(function(){'use strict';
var e=this.event;
e.stopPropagation?e.stopPropagation():e.cancelBubble = true;
return this;},{'module':'DOMEvent','line':59,'column':17});DOMEvent.prototype.


kill = __annotator(function(){'use strict';
this.stopPropagation().preventDefault();
return this;},{'module':'DOMEvent','line':65,'column':6});DOMEvent.





killThenCall = __annotator(function(func){return __bodyWrapper(this,arguments,function(){'use strict';
return __annotator(function(e){
new DOMEvent(e).kill();
return func();},{'module':'DOMEvent','line':74,'column':11});},{params:[[func,'function','func']]});},{'module':'DOMEvent','line':73,'column':21},{params:['function']});




module.exports = DOMEvent;},{'module':'DOMEvent','line':0,'column':0,'name':'$module_DOMEvent'}),null);
/** Path: html/js/modules/DOMEventListener.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This module provides a small and clean abstraction of the two main
 * methods available for attaching events.
 * This module does not provide a unified abstraction of the 'event'
 * itself, for that see the DOMEvent module.
 *
 * Do not extend this with further dependencies as it is designed to be a
 * low-level component usable for composition.
 *
 * @providesModule DOMEventListener
 * @typechecks
 */__d('DOMEventListener',['wrapFunction'],__annotator(function $module_DOMEventListener(global,require,requireDynamic,requireLazy,module,exports,wrapFunction){if(require.__markCompiled)require.__markCompiled();



var add,remove;

if(window.addEventListener){


add = __annotator(function(target,name,listener){return __bodyWrapper(this,arguments,function(){
listener.wrapper =
wrapFunction(listener,'entry','DOMEventListener.add ' + name);
target.addEventListener(name,listener.wrapper,false);},{params:[[name,'string','name'],[listener,'function','listener']]});},{'module':'DOMEventListener','line':23,'column':8},{params:['string','function']});

remove = __annotator(function(target,name,listener){return __bodyWrapper(this,arguments,function(){
target.removeEventListener(name,listener.wrapper,false);},{params:[[name,'string','name'],[listener,'function','listener']]});},{'module':'DOMEventListener','line':28,'column':11},{params:['string','function']});}else


if(window.attachEvent){


add = __annotator(function(target,name,listener){return __bodyWrapper(this,arguments,function(){
listener.wrapper =
wrapFunction(listener,'entry','DOMEventListener.add ' + name);
target.attachEvent('on' + name,listener.wrapper);},{params:[[name,'string','name'],[listener,'function','listener']]});},{'module':'DOMEventListener','line':35,'column':8},{params:['string','function']});

remove = __annotator(function(target,name,listener){return __bodyWrapper(this,arguments,function(){
target.detachEvent('on' + name,listener.wrapper);},{params:[[name,'string','name'],[listener,'function','listener']]});},{'module':'DOMEventListener','line':40,'column':11},{params:['string','function']});}else


{
remove = add = __annotator(function(){},{'module':'DOMEventListener','line':45,'column':17});}


var DOMEventListener={











add:__annotator(function(target,name,listener){return __bodyWrapper(this,arguments,function(){


add(target,name,listener);
return {



remove:__annotator(function(){
remove(target,name,listener);
target = null;},{'module':'DOMEventListener','line':68,'column':14})};},{params:[[name,'string','name'],[listener,'function','listener']]});},{'module':'DOMEventListener','line':60,'column':7},{params:['string','function']}),











remove:remove};


module.exports = DOMEventListener;},{'module':'DOMEventListener','line':0,'column':0,'name':'$module_DOMEventListener'}),null);
/** Path: html/js/modules/Event.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Event
 */__d('Event',['Arbiter','DataStore','DOMQuery','DOMEvent','ErrorUtils','ExecutionEnvironment','Parent','Scroll','UserAgent_DEPRECATED','DOMEventListener','$','invariant','getObjectValues','event-form-bubbling'],__annotator(function $module_Event(global,require,requireDynamic,requireLazy,module,exports,Arbiter,DataStore,DOMQuery,DOMEvent,ErrorUtils,ExecutionEnvironment,Parent,Scroll,UserAgent_DEPRECATED,DOMEventListener,$,invariant,getObjectValues){if(require.__markCompiled)require.__markCompiled();

require('event-form-bubbling');
















var Event=global.Event;




var DATASTORE_KEY='Event.listeners';
if(!Event.prototype){
Event.prototype = {};}







function informUserActivity(e){
if(e.type === 'click' ||
e.type === 'mouseover' ||
e.type === 'keydown'){
Arbiter.inform('Event/stop',{event:e});}}__annotator(informUserActivity,{'module':'Event','line':39,'column':0,'name':'informUserActivity'});



function CustomEvent(target,type,data){
this.target = target;
this.type = type;
this.data = data;}__annotator(CustomEvent,{'module':'Event','line':47,'column':0,'name':'CustomEvent'});


Object.assign(CustomEvent.prototype,{









getData:__annotator(function(){
this.data = this.data || {};
return this.data;},{'module':'Event','line':63,'column':11}),








stop:__annotator(function(){
return Event.stop(this);},{'module':'Event','line':74,'column':8}),






prevent:__annotator(function(){
return Event.prevent(this);},{'module':'Event','line':82,'column':11}),







isDefaultPrevented:__annotator(function(){
return Event.isDefaultPrevented(this);},{'module':'Event','line':91,'column':22}),























kill:__annotator(function(){
return Event.kill(this);},{'module':'Event','line':116,'column':8}),






getTarget:__annotator(function(){
return new DOMEvent(this).target || null;},{'module':'Event','line':124,'column':13})});



function $E(e){
if(e instanceof CustomEvent){
return e;}


if(!e){












if(!window.addEventListener && document.createEventObject){
e = window.event?document.createEventObject(window.event):{};}else
{
e = {};}}







if(!e._inherits_from_prototype){


for(var k in Event.prototype) {
try{
e[k] = Event.prototype[k];}
catch(ignored) {}}}




return e;}__annotator($E,{'module':'Event','line':129,'column':0,'name':'$E'});





Object.assign(Event.prototype,{

_inherits_from_prototype:true,






getRelatedTarget:__annotator(function(){
var target=this.relatedTarget || (
this.fromElement === this.srcElement?this.toElement:this.fromElement);
return target && target.nodeType?target:null;},{'module':'Event','line':184,'column':20}),











getModifiers:__annotator(function(){
var m={
control:!!this.ctrlKey,
shift:!!this.shiftKey,
alt:!!this.altKey,
meta:!!this.metaKey};

m.access = UserAgent_DEPRECATED.osx()?m.control:m.alt;
m.any = m.control || m.shift || m.alt || m.meta;
return m;},{'module':'Event','line':199,'column':16}),








isRightClick:__annotator(function(){
if(this.which){
return this.which === 3;}

return this.button && this.button === 2;},{'module':'Event','line':217,'column':16}),







isMiddleClick:__annotator(function(){
if(this.which){
return this.which === 2;}

return this.button && this.button === 4;},{'module':'Event','line':229,'column':17}),

























isDefaultRequested:__annotator(function(){
return this.getModifiers().any ||
this.isMiddleClick() ||
this.isRightClick();},{'module':'Event','line':259,'column':22})},


CustomEvent.prototype);




Object.assign(Event,{























listen:__annotator(function(element,type,handler,priority){
Arbiter.inform('Event/bindListen',{element:element,type:type,handler:handler});

if(!ExecutionEnvironment.canUseDOM){
return new EventHandlerRef(handler,handlers,type,priority,id);}


if(typeof element == 'string'){
element = $(element);}


if(typeof priority == 'undefined'){
priority = Event.Priority.NORMAL;}


if(typeof type == 'object'){
var events={};
for(var t in type) {
events[t] = Event.listen(element,t,type[t],priority);}

return events;}


if(type.match(/^on/i)){
throw new TypeError(
"Bad event name `" + type + "': use `click', not `onclick'.");}


if(element.nodeName == 'LABEL' && type == 'click'){
var inputs=element.getElementsByTagName('input');
element = inputs.length == 1?inputs[0]:element;}else
if(element === window && type === 'scroll'){
var scroll_element=DOMQuery.getDocumentScrollElement();
if(scroll_element !== document.documentElement &&
scroll_element !== document.body){
element = scroll_element;}}



var handlers=DataStore.get(element,DATASTORE_KEY,{});

var details=specialEvents[type];
if(details){
type = details.base;
if(details.wrap){
handler = details.wrap(handler);}}




attachHandler(element,handlers,type);

var typeHandlers=handlers[type];
if(!(priority in typeHandlers)){
typeHandlers[priority] = [];}


var id=typeHandlers[priority].length;
var ref=new EventHandlerRef(handler,handlers,type,priority,id);

typeHandlers[priority][id] = ref;
typeHandlers.numHandlers++;

return ref;},{'module':'Event','line':294,'column':10}),


stop:__annotator(function(e){
if(__DEV__){
if(!e){
throw new Error('Event.stop: you must pass an event!');}}


var ev=new DOMEvent(e).stopPropagation();
informUserActivity(ev.event);
return e;},{'module':'Event','line':360,'column':8}),


prevent:__annotator(function(e){
if(__DEV__){
if(!e){
throw new Error('Event.prevent: you must pass an event!');}}


new DOMEvent(e).preventDefault();
return e;},{'module':'Event','line':371,'column':11}),


isDefaultPrevented:__annotator(function(e){
if(__DEV__){
if(!e){
throw new Error('Event.isDefaultPrevented: you must pass an event!');}}


return new DOMEvent(e).isDefaultPrevented(e);},{'module':'Event','line':381,'column':22}),


kill:__annotator(function(e){
if(__DEV__){
if(!e){
throw new Error('Event.kill: you must pass an event!');}}


var ev=new DOMEvent(e).kill();
informUserActivity(ev.event);
return false;},{'module':'Event','line':390,'column':8}),


getKeyCode:__annotator(function(event){
event = new DOMEvent(event).event;
if(!event){
return false;}

switch(event.keyCode){
case 63232:
return 38;
case 63233:
return 40;
case 63234:
return 37;
case 63235:
return 39;
case 63272:
case 63273:
case 63275:
return null;
case 63276:
return 33;
case 63277:
return 34;}

if(event.shiftKey){
switch(event.keyCode){
case 33:
case 34:
case 37:
case 38:
case 39:
case 40:
return null;}}



return event.keyCode;},{'module':'Event','line':401,'column':14}),


getPriorities:__annotator(function(){
if(!priorities){
var ordered=getObjectValues(Event.Priority);

ordered.sort(__annotator(function(a,b){return a - b;},{'module':'Event','line':443,'column':19}));
priorities = ordered;}

return priorities;},{'module':'Event','line':439,'column':17}),

















fire:__annotator(function(node,type,data){
var evt=new CustomEvent(node,type,data);
var ret;
do {
var handler=Event.__getHandler(node,type);
if(handler){
ret = handler(evt);}

node = node.parentNode;}while(
node && ret !== false && !evt.cancelBubble);
return ret !== false;},{'module':'Event','line':464,'column':8}),










__fire:__annotator(function(element,type,event){
var handler=Event.__getHandler(element,type);
if(handler){
return handler($E(event));}},{'module':'Event','line':485,'column':10}),










__getHandler:__annotator(function(element,type){
var handlers=DataStore.get(element,DATASTORE_KEY);
if(handlers && handlers[type]){
return handlers[type].domHandler;}},{'module':'Event','line':499,'column':16}),



getPosition:__annotator(function(e){
e = new DOMEvent(e).event;

var scroll_element=DOMQuery.getDocumentScrollElement();
var x=e.clientX + Scroll.getLeft(scroll_element);
var y=e.clientY + Scroll.getTop(scroll_element);
return {x:x,y:y};},{'module':'Event','line':506,'column':15})});







var priorities=null;

var leaveFilter=__annotator(function(handler){
return __annotator(function(e){
if(!DOMQuery.contains(this,e.getRelatedTarget())){
return handler.call(this,e);}},{'module':'Event','line':523,'column':9});},{'module':'Event','line':522,'column':18});




var specialEvents;
if(!window.navigator.msPointerEnabled){
specialEvents = {
'mouseenter':{base:'mouseover',wrap:leaveFilter},
'mouseleave':{base:'mouseout',wrap:leaveFilter}};}else

{




specialEvents = {
'mousedown':{base:'MSPointerDown'},
'mousemove':{base:'MSPointerMove'},
'mouseup':{base:'MSPointerUp'},
'mouseover':{base:'MSPointerOver'},
'mouseout':{base:'MSPointerOut'},
'mouseenter':{base:'MSPointerOver',wrap:leaveFilter},
'mouseleave':{base:'MSPointerOut',wrap:leaveFilter}};}








if(UserAgent_DEPRECATED.firefox()){
var bubbleFocusOrBlur=__annotator(function(type,event){
event = $E(event);
var node=event.getTarget();
while(node) {
Event.__fire(node,type,event);
node = node.parentNode;}},{'module':'Event','line':558,'column':26});


document.documentElement.addEventListener(
'focus',
bubbleFocusOrBlur.bind(null,'focusin'),
true);

document.documentElement.addEventListener(
'blur',
bubbleFocusOrBlur.bind(null,'focusout'),
true);}













var attachHandler=__annotator(function(element,handlers,type){
if(type in handlers){
return;}


var listener=listenHandler.bind(element,type);

handlers[type] = {


numHandlers:0,

domHandlerRemover:DOMEventListener.add(element,type,listener),

domHandler:listener};






var fullName='on' + type;
if(element[fullName]){







var priority=element === document.documentElement?
Event.Priority._BUBBLE:
Event.Priority.TRADITIONAL;
var handler=element[fullName];
element[fullName] = null;
Event.listen(element,type,handler,priority);}




if(element.nodeName === 'FORM' && type === 'submit'){
Event.listen(
element,
type,
Event.__bubbleSubmit.bind(null,element),
Event.Priority._BUBBLE);}},{'module':'Event','line':588,'column':20});














var listenHandler=__annotator(function(type,event){
event = $E(event);

if(!DataStore.get(this,DATASTORE_KEY)){
throw new Error("Bad listenHandler context.");}


var type_handlers=DataStore.get(this,DATASTORE_KEY)[type];
if(!type_handlers){
throw new Error("No registered handlers for `" + type + "'.");}




if(type == 'click'){
var node=Parent.byTag(event.getTarget(),'a');


if(window.clickRefAction){
window.clickRefAction('click',node,event);}}





var priorities=Event.getPriorities();
for(var pri_idx=0;pri_idx < priorities.length;pri_idx++) {
var priority=priorities[pri_idx];
if(priority in type_handlers){
var handlers=type_handlers[priority];
for(var idx=0;idx < handlers.length;idx++) {
if(!handlers[idx]){

continue;}

var result=handlers[idx].fire(this,event);


if(result === false){
return event.kill();}else
if(event.cancelBubble){
event.stop();}}}}





return event.returnValue;},{'module':'Event','line':648,'column':20});










































Event.Priority = {
URGENT:-20,
TRADITIONAL:-10,
NORMAL:0,
_BUBBLE:1000};









function EventHandlerRef(handler,handlers,type,priority,id){
this._handler = handler;
this._handlers = handlers;
this._type = type;
this._priority = priority;
this._id = id;}__annotator(EventHandlerRef,{'module':'Event','line':752,'column':0,'name':'EventHandlerRef'});


Object.assign(EventHandlerRef.prototype,{












remove:__annotator(function(){
if(ExecutionEnvironment.canUseDOM){

!this._handlers?invariant(0,'Event handler has already been removed'):undefined;



var handlers=this._handlers[this._type];
if(handlers.numHandlers <= 1){
handlers.domHandlerRemover.remove();
delete this._handlers[this._type];}else
{
delete handlers[this._priority][this._id];
handlers.numHandlers--;}

this._handlers = null;}},{'module':'Event','line':773,'column':10}),










fire:__annotator(function(element,event){
if(ExecutionEnvironment.canUseDOM){
return ErrorUtils.applyWithGuard(this._handler,element,[event],__annotator(
function(err){
err.event_type = event.type;
err.dom_element = element.name || element.id;
err.category = 'eventhandler';},{'module':'Event','line':802,'column':8}));}




return true;},{'module':'Event','line':799,'column':8})});



global.$E = Event.$E = $E;

module.exports = Event;},{'module':'Event','line':0,'column':0,'name':'$module_Event'}),null);
/** Path: html/js/listeners/modules/FocusListener.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule FocusListener
 */__d('FocusListener',['Arbiter','CSS','Event','Parent','getActiveElement'],__annotator(function $module_FocusListener(global,require,requireDynamic,requireLazy,module,exports,Arbiter,CSS,Event,Parent,getActiveElement){if(require.__markCompiled)require.__markCompiled();








var FocusListener={
expandInput:__annotator(function(parent){
CSS.addClass(parent,'child_is_active');
CSS.addClass(parent,'child_is_focused');
CSS.addClass(parent,'child_was_focused');
Arbiter.inform('reflow');},{'module':'FocusListener','line':15,'column':15})};



function updateFocusClassNames(type,elem){

if(elem.getAttribute('data-silentfocuslistener')){
return;}


var parent=Parent.byClass(elem,'focus_target');
if(parent){
if('focus' == type || 'focusin' == type){
FocusListener.expandInput(parent);}else
{
if(elem.value === ''){
CSS.removeClass(parent,'child_is_active');}

CSS.removeClass(parent,'child_is_focused');}}}__annotator(updateFocusClassNames,{'module':'FocusListener','line':23,'column':0,'name':'updateFocusClassNames'});




var activeElement=getActiveElement();
if(activeElement){
updateFocusClassNames('focus',activeElement);}





function handleFocusOrBlur(event){
event = event || window.event;
updateFocusClassNames(event.type,event.target || event.srcElement);}__annotator(handleFocusOrBlur,{'module':'FocusListener','line':50,'column':0,'name':'handleFocusOrBlur'});


var htm=document.documentElement;
if(htm.addEventListener){
htm.addEventListener('focus',handleFocusOrBlur,true);
htm.addEventListener('blur',handleFocusOrBlur,true);}else
{
htm.attachEvent('onfocusin',handleFocusOrBlur);
htm.attachEvent('onfocusout',handleFocusOrBlur);}











Event.listen(document.documentElement,'submit',__annotator(function(){},{'module':'FocusListener','line':73,'column':49}));

module.exports = FocusListener;},{'module':'FocusListener','line':0,'column':0,'name':'$module_FocusListener'}),null);
/** Path: html/js/modules/clickRefAction.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule clickRefAction
 */__d('clickRefAction',['Arbiter'],__annotator(function $module_clickRefAction(global,require,requireDynamic,requireLazy,module,exports,Arbiter){if(require.__markCompiled)require.__markCompiled();








function ClickRefAction(ue_ts,ue_count,context,node,type){
var ue=ue_ts + '/' + ue_count;
this.ue = ue;
this._ue_ts = ue_ts;
this._ue_count = ue_count;
this._context = context;
this._ns = null;
this._node = node;
this._type = type;}__annotator(ClickRefAction,{'module':'clickRefAction','line':14,'column':0,'name':'ClickRefAction'});


ClickRefAction.prototype.set_namespace = __annotator(function(ns){
this._ns = ns;
return this;},{'module':'clickRefAction','line':25,'column':41});


ClickRefAction.prototype.coalesce_namespace = __annotator(function(ns){
if(this._ns === null){
this._ns = ns;}

return this;},{'module':'clickRefAction','line':30,'column':46});


ClickRefAction.prototype.add_event = __annotator(function(){
return this;},{'module':'clickRefAction','line':37,'column':37});


var ue_count=0;
var _stack=[];


















function clickRefAction(context,node,event,mode,data){

var ue_ts=Date.now();
var type=event && event.type;


data = data || {};
if(!node && event){
node = event.getTarget();}


if(__DEV__){
if(!context){
throw new Error("Can't create a clickRefAction with no context");}}








var min_ms=50;

if(node && mode != "FORCE"){
for(var i=_stack.length - 1;
i >= 0 && ue_ts - _stack[i]._ue_ts < min_ms;
--i) {
if(_stack[i]._node == node && _stack[i]._type == type){
return _stack[i];}}}




var obj=new ClickRefAction(ue_ts,ue_count,context,node,type);


_stack.push(obj);
while(_stack.length > 10) {
_stack.shift();}



Arbiter.inform("ClickRefAction/new",{
cfa:obj,
node:node,
mode:mode,
event:event,
extra_data:data},
Arbiter.BEHAVIOR_PERSISTENT);

ue_count++;

return obj;}__annotator(clickRefAction,{'module':'clickRefAction','line':61,'column':0,'name':'clickRefAction'});




module.exports = global.clickRefAction = clickRefAction;},{'module':'clickRefAction','line':0,'column':0,'name':'$module_clickRefAction'}),null);
/** Path: html/js/modules/trackReferrer.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule trackReferrer
 */__d('trackReferrer',['Parent'],__annotator(function $module_trackReferrer(global,require,requireDynamic,requireLazy,module,exports,Parent){if(require.__markCompiled)require.__markCompiled();








function trackReferrer(elem,uri){

elem = Parent.byAttribute(elem,'data-referrer');

if(elem){
















var path=
/^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/.
exec(uri)[1] || '';

if(!path){
return;}


var info=path + '|' + elem.getAttribute('data-referrer');

var expires=new Date();expires.setTime(Date.now() + 1000);
document.cookie = "x-src=" + encodeURIComponent(info) + "; " +
"expires=" + expires.toGMTString() + ";path=/; domain=" +
window.location.hostname.replace(/^.*(\.facebook\..*)$/i,'$1');}


return elem;}__annotator(trackReferrer,{'module':'trackReferrer','line':14,'column':0,'name':'trackReferrer'});


module.exports = trackReferrer;},{'module':'trackReferrer','line':0,'column':0,'name':'$module_trackReferrer'}),null);
/** Path: html/js/modules/Primer.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Primer
 */__d('Primer',['Bootloader','CSS','ErrorUtils','Parent','clickRefAction','trackReferrer'],__annotator(function $module_Primer(global,require,requireDynamic,requireLazy,module,exports,Bootloader,CSS,ErrorUtils,Parent,clickRefAction,trackReferrer){if(require.__markCompiled)require.__markCompiled();
























var lastClickTarget=null;
var validRels=/async(?:-post)?|dialog(?:-post)?|theater|toggle/;
var htm=document.documentElement;

function _runInlineHandlers(element,attribute){
element = Parent.byAttribute(element,attribute);
if(!element){
return;}


do {
var handlers=element.getAttribute(attribute);
JSON.parse(handlers).forEach(__annotator(function(handler){
var target=element;
Bootloader.loadModules.call(Bootloader,[handler[0]],__annotator(function(module){
module[handler[1]](target);},{'module':'Primer','line':44,'column':60}));},{'module':'Primer','line':42,'column':33}));}while(


element = Parent.byAttribute(element.parentNode,attribute));
return false;}__annotator(_runInlineHandlers,{'module':'Primer','line':34,'column':0,'name':'_runInlineHandlers'});


htm.onclick = ErrorUtils.guard(__annotator(function(e){
e = e || window.event;
lastClickTarget = e.target || e.srcElement;

var elem=Parent.byTag(lastClickTarget,'A');
if(!elem){
return _runInlineHandlers(lastClickTarget,'data-onclick');}


var ajax=elem.getAttribute('ajaxify');
var href=elem.href;
var url=ajax || href;

if(url){
clickRefAction('a',elem,e).coalesce_namespace('primer');}



if(ajax && href && !/#$/.test(href)){




var middle_click=e.which && e.which === 2;
var modifier_key=e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
if(middle_click || modifier_key){
return;}}



var returnValue=_runInlineHandlers(lastClickTarget,'data-onclick');

trackReferrer(elem,url);


var rel=elem.rel && elem.rel.match(validRels);
rel = rel && rel[0];

switch(rel){
case 'dialog':
case 'dialog-post':
Bootloader.loadModules(["AsyncDialog"],__annotator(function(AsyncDialog){
AsyncDialog.bootstrap(url,elem,rel);},{'module':'Primer','line':93,'column':46}));

break;
case 'async':
case 'async-post':
Bootloader.loadModules(["AsyncRequest"],__annotator(function(AsyncRequest){
AsyncRequest.bootstrap(url,elem);},{'module':'Primer','line':99,'column':47}));

break;
case 'theater':
Bootloader.loadModules(["PhotoSnowlift"],__annotator(function(PhotoSnowlift){
PhotoSnowlift.bootstrap(url,elem);},{'module':'Primer','line':104,'column':48}));

break;
case 'toggle':
CSS.toggleClass(elem.parentNode,'openToggler');
Bootloader.loadModules(["Toggler"],__annotator(function(Toggler){
Toggler.bootstrap(elem);},{'module':'Primer','line':110,'column':42}));

break;
default:
return returnValue;}


return false;},{'module':'Primer','line':52,'column':31}),
'Primer click');

htm.onsubmit = ErrorUtils.guard(__annotator(function(e){
e = e || window.event;
var elem=e.target || e.srcElement;

if(elem && elem.nodeName == 'FORM' && elem.getAttribute('rel') == 'async'){
clickRefAction('f',elem,e).coalesce_namespace('primer');

var target=lastClickTarget;
Bootloader.loadModules(["Form"],__annotator(function(Form){
Form.bootstrap(elem,target);},{'module':'Primer','line':129,'column':37}));


return false;}},{'module':'Primer','line':121,'column':32}),

'Primer submit');

var lastHoverTarget=null;

var onEventFunc=__annotator(function(eventType,e){
e = e || window.event;
lastHoverTarget = e.target || e.srcElement;

_runInlineHandlers(lastHoverTarget,'data-on' + eventType);

var elem=Parent.byAttribute(lastHoverTarget,'data-hover');
if(!elem){return;}

switch(elem.getAttribute('data-hover')){
case 'tooltip':
Bootloader.loadModules(["Tooltip"],__annotator(function(Tooltip){
Tooltip.process(elem,lastHoverTarget);},{'module':'Primer','line':150,'column':42}));

break;}},{'module':'Primer','line':139,'column':18});



htm.onmouseover = ErrorUtils.guard(
onEventFunc.bind(null,'mouseover'),'Primer mouseover');

var onfocus=ErrorUtils.guard(
onEventFunc.bind(null,'focus'),'Primer focus');
if(htm.addEventListener){
htm.addEventListener('focus',onfocus,true);}else
{
htm.attachEvent('onfocusin',onfocus);}},{'module':'Primer','line':0,'column':0,'name':'$module_Primer'}),null);
/** Path: html/js/modules/URLFragmentPrelude.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule URLFragmentPrelude
 *
 * Keep in sync with html/js/modules/QuicklingPrelude.js
 */__d('URLFragmentPrelude',['ScriptPath','URLFragmentPreludeConfig'],__annotator(function $module_URLFragmentPrelude(global,require,requireDynamic,requireLazy,module,exports,ScriptPath,URLFragmentPreludeConfig){if(require.__markCompiled)require.__markCompiled();
























var uri_re=
/^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/;
var target_domain='';



var hashtag_re=/^[^\/\\#!\.\?\*\&\^=]+$/;

window.location.href.replace(uri_re,__annotator(function(all,path,query,frag){
var dst,src,first,script_path;
dst = src = path + (query?'?' + query:'');
if(frag){
if(URLFragmentPreludeConfig.incorporateQuicklingFragment){



var path_frag=frag.replace(/^(!|%21)/,'');
first = path_frag.charAt(0);
if(first == '/' || first == '\\'){



dst = path_frag.replace(/^[\\\/]+/,'/');}}



if(URLFragmentPreludeConfig.hashtagRedirect){


if(src == dst){
var m=frag.match(hashtag_re);
if(m && !query && path == '/'){
dst = '/hashtag/' + frag;}}}}









if(dst != src){


script_path = ScriptPath.getScriptPath();
if(script_path){
document.cookie = "rdir=" + script_path + "; path=/; domain=" +
window.location.hostname.replace(/^.*(\.facebook\..*)$/i,'$1');}


window.location.replace(target_domain + dst);}},{'module':'URLFragmentPrelude','line':40,'column':37}));},{'module':'URLFragmentPrelude','line':0,'column':0,'name':'$module_URLFragmentPrelude'}),null);
/** Path: html/js/sidebar/SidebarPrelude.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule SidebarPrelude
 */__d('SidebarPrelude',[],__annotator(function $module_SidebarPrelude(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();

var SidebarPrelude={
addSidebarMode:__annotator(function(minWidth,miniSidebarMinWidth){


var htm=document.documentElement;
if(htm.clientWidth > miniSidebarMinWidth){
htm.className = htm.className + ' sidebarMode';
if(htm.clientWidth <= minWidth){
htm.className = htm.className + ' miniSidebar';}}},{'module':'SidebarPrelude','line':8,'column':18})};





module.exports = SidebarPrelude;},{'module':'SidebarPrelude','line':0,'column':0,'name':'$module_SidebarPrelude'}),null);
/** Path: html/js/listeners/modules/SubmitOnEnterListener.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule SubmitOnEnterListener
 */__d('SubmitOnEnterListener',['Bootloader','CSS'],__annotator(function $module_SubmitOnEnterListener(global,require,requireDynamic,requireLazy,module,exports,Bootloader,CSS){if(require.__markCompiled)require.__markCompiled();










document.documentElement.onkeydown = __annotator(function(e){
e = e || window.event;
var elem=e.target || e.srcElement;
var send_on_enter=
e.keyCode == 13 &&
!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey &&
CSS.hasClass(elem,'enter_submit');
if(send_on_enter){
Bootloader.loadModules(
["DOM","Input","trackReferrer","Form"],__annotator(
function(DOM,Input,trackReferrer,Form){
if(!Input.isEmpty(elem)){
var form=elem.form;
var input=
DOM.scry(form,'.enter_submit_target')[0] ||
DOM.scry(form,'[type="submit"]')[0];
if(input){
var action=
Form.getAttribute(form,'ajaxify') ||
Form.getAttribute(form,'action');
if(action){
trackReferrer(form,action);}

input.click();}}},{'module':'SubmitOnEnterListener','line':26,'column':6}));




return false;}},{'module':'SubmitOnEnterListener','line':16,'column':37});},{'module':'SubmitOnEnterListener','line':0,'column':0,'name':'$module_SubmitOnEnterListener'}),null);
/** Path: html/js/ufi/modules/CommentPrelude.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule CommentPrelude
 */__d('CommentPrelude',['Arbiter','BanzaiODS','ErrorUtils','CSS','Parent','clickRefAction','ex'],__annotator(function $module_CommentPrelude(global,require,requireDynamic,requireLazy,module,exports,Arbiter,BanzaiODS,ErrorUtils,CSS,Parent,clickRefAction,ex){if(require.__markCompiled)require.__markCompiled();










function logRef(ref,action){
if(
ref === 'ufi.react' ||
ref === 'ufi_mentions_input.react' ||
ref === 'ufi_controller' ||
ref === 'action_link_bling' ||
ref === 'action_link_timeline_bling')
{


return;}


var error=new Error(ex(
'Deprecated CommentPrelude action %s called from ref %s',
action || 'unknown',
ref || 'unknown'));

error.type = 'warn';
ErrorUtils.reportError(error);

BanzaiODS.bumpEntityKey('comment_prelude',ref);}__annotator(logRef,{'module':'CommentPrelude','line':16,'column':0,'name':'logRef'});



function click(elem,focus,ref){
logRef(ref,'click');

var item=Parent.byTag(elem,'form');
if(!item || !CSS.hasClass(item,'collapsible_comments')){
return;}


clickRefAction('ufi',elem,null,'FORCE');


return expand(elem,focus,ref);}__annotator(click,{'module':'CommentPrelude','line':41,'column':0,'name':'click'});



function expand(elem,focus,ref){
logRef(ref,'expand');

var item=Parent.byTag(elem,'form');
if(!item || !CSS.hasClass(item,'collapsible_comments')){
return;}


uncollapse(item,ref);
if(focus !== false){
var focus_item=item.add_comment_text_text || item.add_comment_text;


var len=focus_item.length;
if(len){
if(!Parent.byClass(focus_item[len - 1],'UFIReplyList')){
focus_item = focus_item[len - 1];}else
if(!Parent.byClass(focus_item[0],'UFIReplyList')){
focus_item = focus_item[0];}else
{
focus_item = null;}}


if(focus_item){
focus_item.focus();
Arbiter.inform('comment/focus',{element:focus_item});}}


return false;}__annotator(expand,{'module':'CommentPrelude','line':56,'column':0,'name':'expand'});


function uncollapse(form_elem,ref){
logRef(ref,'uncollapse');

if(!form_elem || !CSS.hasClass(form_elem,'collapsible_comments')){
return;}


var remove_class=CSS.removeClass.bind(null,form_elem,'collapsed_comments');
if(window.ScrollAwareDOM){
window.ScrollAwareDOM.monitor(form_elem,remove_class);}else
{
remove_class();}}__annotator(uncollapse,{'module':'CommentPrelude','line':87,'column':0,'name':'uncollapse'});



function onBlingboxClick(target){
var ref=target.getAttribute('data-comment-prelude-ref');
logRef(ref,'blingbox');

var item=Parent.byTag(target,'form');
if(!item || !CSS.hasClass(item,'collapsible_comments')){
return;}


CSS.toggleClass(item,'collapsed_comments');}__annotator(onBlingboxClick,{'module':'CommentPrelude','line':102,'column':0,'name':'onBlingboxClick'});


var CommentPrelude={
click:click,
expand:expand,
uncollapse:uncollapse,
onBlingboxClick:onBlingboxClick,
logRef:logRef};


module.exports = CommentPrelude;},{'module':'CommentPrelude','line':0,'column':0,'name':'$module_CommentPrelude'}),null);
/** Path: html/js/ufi/prelude.js */
/**
 * @providesLegacy ufi-comment-prelude-js
 */__d('legacy:ufi-comment-prelude-js',['CommentPrelude'],__annotator(function $module_legacy_ufi_comment_prelude_js(global,require,requireDynamic,requireLazy,__DO_NOT_USE__module,__DO_NOT_USE__exports,CommentPrelude){if(require.__markCompiled)require.__markCompiled();



global.fc_click = CommentPrelude.click;
global.fc_expand = CommentPrelude.expand;},{'module':'legacy:ufi-comment-prelude-js','line':0,'column':0,'name':'$module_legacy_ufi_comment_prelude_js'}),3);
/** Path: html/js/modules/ScriptMonitor.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule ScriptMonitor
 *
 * Activates the monitor that tracks all script/iframe tags injected into
 * the DOM and collects the URLs. The monitor is a part of prelude,
 * so it's always available, but not always active.
 */__d('ScriptMonitor',[],__annotator(function $module_ScriptMonitor(global,require,requireDynamic,requireLazy,module,exports){if(require.__markCompiled)require.__markCompiled();
var observer,urls=[];
var MutationObserver=window.MutationObserver ||
window.WebKitMutationObserver ||
window.MozMutationObserver;

module.exports = {
activate:__annotator(function(){
if(!MutationObserver){
return;}

observer = new MutationObserver(__annotator(function(records){
for(var i=0;i < records.length;i++) {
var r=records[i];
if(r.type == 'childList'){
for(var j=0;j < r.addedNodes.length;j++) {
var el=r.addedNodes[j];



if((el.tagName == 'SCRIPT' || el.tagName == 'IFRAME') && el.src){
urls.push(el.src);}}}else


if(r.type == 'attributes' && r.attributeName == 'src' && (
r.target.tagName == 'SCRIPT' || r.target.tagName == 'IFRAME')){
urls.push(r.target.src);}}},{'module':'ScriptMonitor','line':20,'column':36}));



observer.observe(document,{
attributes:true,
childList:true,
subtree:true});},{'module':'ScriptMonitor','line':16,'column':12}),



stop:__annotator(function(){
observer && observer.disconnect();
return urls;},{'module':'ScriptMonitor','line':46,'column':8})};},{'module':'ScriptMonitor','line':0,'column':0,'name':'$module_ScriptMonitor'}),null);
/** Path: html/js/modules/SyntaxErrorMonitor.js */
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule SyntaxErrorMonitor
 */__d('SyntaxErrorMonitor',['Cookie','ErrorUtils'],__annotator(function $module_SyntaxErrorMonitor(global,require,requireDynamic,requireLazy,module,exports,Cookie,ErrorUtils){if(require.__markCompiled)require.__markCompiled();




var COOKIE_NAME='js_ver';
var MILLISECONCDS_IN_DAY=86400000;

var EPOCH=1262304000000;

var _config=null;

function _isSyntaxError(error){
return error.name == 'SyntaxError' || /syntaxerror/i.test(error.message);}__annotator(_isSyntaxError,{'module':'SyntaxErrorMonitor','line':17,'column':0,'name':'_isSyntaxError'});


function _onError(error){
if(_isSyntaxError(error)){
var last_update=Cookie.get(COOKIE_NAME);
var days=Math.floor((Date.now() - EPOCH) / MILLISECONCDS_IN_DAY);
if(!last_update || days - last_update >= _config.bump_freq_day){
Cookie.set(COOKIE_NAME,days,_config.cookie_ttl_sec * 1000);}}}__annotator(_onError,{'module':'SyntaxErrorMonitor','line':21,'column':0,'name':'_onError'});




var SyntaxErrorMonitor={
init:__annotator(function(config){
_config = config;
ErrorUtils.addListener(_onError);},{'module':'SyntaxErrorMonitor','line':32,'column':8})};



module.exports = SyntaxErrorMonitor;},{'module':'SyntaxErrorMonitor','line':0,'column':0,'name':'$module_SyntaxErrorMonitor'}),null);
/** Path: html/js/lib/prelude.js */
/**
 * Resources to load in the head of the document
 *
 *
 * @providesMeta prelude
 * @requires arbiter
 *           BigPipe
 *           bootloader
 *           constructor-cache
 *           css
 *           dom-core
 *           event-form-bubbling
 *           goURI
 *           InitialJSLoader
 *           ix
 *           lowerDomain
 *           markJSEnabled
 *           onload
 *           parent
 *           FocusListener
 *           Primer
 *           URLFragmentPrelude
 *           ServerJSDefine
 *           ServerJS
 *           SidebarPrelude
 *           SubmitOnEnterListener
 *           TimeSlice
 *           ufi-comment-prelude-js
 *           wait_for_load
 *           emptyFunction
 *           ScriptMonitor
 *           SyntaxErrorMonitor
 */

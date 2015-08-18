/*!CK:2442145115!*//*1439779398,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["hr1Z6"]); }

/** js/downstream/polyfill/Array.es6.js */
























if(!Array.from)
Array.from=function(a){
if(a==null)
throw new TypeError('Object is null or undefined');



var b=arguments[1],
c=arguments[2],

d=this,
e=Object(a),
f=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator',
g=typeof b==='function',
h=typeof e[f]==='function',
i=0,
j,
k;

if(h){
j=typeof d==='function'?
new d():
[];
var l=e[f](),
m;

while(!(m=l.next()).done){
k=m.value;

if(g)
k=b.call(c,k,i);


j[i]=k;
i+=1;}


j.length=i;
return j;}


var n=e.length;
if(isNaN(n)||n<0)
n=0;


j=typeof d==='function'?
new d(n):
new Array(n);

while(i<n){
k=e[i];

if(g)
k=b.call(c,k,i);


j[i]=k;

i+=1;}


j.length=i;
return j;};

/** js/downstream/polyfill/Array.js */


/** js/downstream/polyfill/__DEV__.js */



















self.__DEV__=self.__DEV__||0;

/** js/downstream/polyfill/Array.prototype.es6.js */























(function(a){
























function b(c,d){


















if(this==null)
throw new TypeError
('Array.prototype.findIndex called on null or undefined');


if(typeof c!=='function')
throw new TypeError('predicate must be a function');

var e=Object(this),
f=e.length>>>0;
for(var g=0;g<f;g++)
if(c.call(d,e[g],g,e))
return g;


return -1;}


if(!Array.prototype.findIndex)
Array.prototype.findIndex=b;



if(!Array.prototype.find)
Array.prototype.find=function(c,d){


















if(this==null)
throw new TypeError('Array.prototype.find called on null or undefined');

var e=b.call(this,c,d);
return e===-1?a:this[e];};})();

/** js/downstream/polyfill/Array.prototype.js */


/** js/downstream/polyfill/Date.js */


/** js/downstream/polyfill/Date.prototype.toISOString.js */


/** js/downstream/polyfill/Function.prototype.js */


/** js/downstream/polyfill/Function.prototype-shield.js */







































/** js/downstream/polyfill/GenericFunctionVisitor.js */



























(function(){
var a={},

b=function(i,j){
if(!i&&!j)
return null;


var k={};
if(typeof i!=='undefined')
k.type=i;


if(typeof j!=='undefined')
k.signature=j;


return k;},


c=function(i,j){
return b
(i&&/^[A-Z]/.test(i)?i:undefined,
j&&(j.params&&j.params.length||j.returns)?
'function('+
(j.params?j.params.map(function(k){
return (/\?/.test(k)?
'?'+k.replace('?',''):
k);}).
join(','):'')+
')'+
(j.returns?':'+j.returns:''):
undefined);},



d=function(i,j,k){
return i;},


e=function(i,j,k){
if('sourcemeta' in __transform_includes)
i.__SMmeta=j;


if('typechecks' in __transform_includes){
var l=c(j?j.name:undefined,k);
if(l)
__w(i,l);}


return i;},


f=function(i,j,k){
return k.apply(i,j);},


g=function(i,j,k,l){
if(l&&l.params)
__t.apply(i,l.params);


var m=k.apply(i,j);

if(l&&l.returns)
__t([m,l.returns]);


return m;},


h=function(i,j,k,l,m){
if(m){
if(!m.callId)


m.callId=m.module+':'+
(m.line||0)+':'+
(m.column||0);

var n=m.callId;
a[n]=(a[n]||0)+1;}

return k.apply(i,j);};



if(typeof __transform_includes==='undefined'){
__annotator=d;
__bodyWrapper=f;}else{

__annotator=e;

if('codeusage' in __transform_includes){
__annotator=d;
__bodyWrapper=h;
__bodyWrapper.getCodeUsage=function(){return a;};
__bodyWrapper.clearCodeUsage=function(){a={};};}else
if('typechecks' in __transform_includes){
__bodyWrapper=g;}else

__bodyWrapper=f;}})();

/** js/downstream/polyfill/JSON.js */


/** js/downstream/polyfill/JSON-shield.js */































if(JSON.stringify(["\u2028\u2029"])==='["\u2028\u2029"]')
JSON.stringify=(function(a){

var b=/\u2028/g,
c=/\u2029/g;

return function(d,e,f){
var g=a.call(this,d,e,f);
if(g){
if(-1<g.indexOf('\u2028'))
g=g.replace(b,'\\u2028');

if(-1<g.indexOf('\u2029'))
g=g.replace(c,'\\u2029');}


return g;};})

(JSON.stringify);

/** js/downstream/polyfill/JSON.parse.js */


/** js/downstream/polyfill/Math.es6.js */


/** js/downstream/polyfill/Number.es6.js */


/** js/downstream/polyfill/Object.js */


/** js/downstream/polyfill/Object-shield.js */





































/** js/downstream/polyfill/Object.enumFix.js */


/** js/downstream/polyfill/Object.es6.js */





















(function(){

if(Object.assign)
return;


var a=Object.prototype.hasOwnProperty,






b;
if(Object.keys&&Object.keys.name!=='object_keys_polyfill'){
b=function(c,d){
var e=Object.keys(d);
for(var f=0;f<e.length;f++)
c[e[f]]=d[e[f]];};}else



b=function(c,d){
for(var e in d)
if(a.call(d,e))
c[e]=d[e];};





Object.assign=function(c,d){
if(c==null)
throw new TypeError('Object.assign target cannot be null or undefined');


var e=Object(c);

for(var f=1;f<arguments.length;f++){
var g=arguments[f];
if(g!=null)
b(e,Object(g));}



return e;};})();

/** js/downstream/polyfill/Object.prototype.js */


/** js/downstream/polyfill/SourceMetaAnnotator.js */




















(function(a){
a.__m=function(b,c){
b.__SMmeta=c;
return b;};})

(this);

/** js/downstream/polyfill/String.prototype.es6.js */
























if(!String.prototype.startsWith)
String.prototype.startsWith=function(a){
"use strict";
if(this==null)
throw TypeError();

var b=String(this),
c=arguments.length>1?
Number(arguments[1])||0:0,
d=Math.min(Math.max(c,0),b.length);
return b.indexOf(String(a),c)==d;};



if(!String.prototype.endsWith)
String.prototype.endsWith=function(a){
"use strict";
if(this==null)
throw TypeError();

var b=String(this),
c=b.length,
d=String(a),
e=arguments.length>1?
Number(arguments[1])||0:c,
f=Math.min(Math.max(e,0),c),
g=f-d.length;
if(g<0)
return false;

return b.lastIndexOf(d,g)==g;};



if(!String.prototype.contains)
String.prototype.contains=function(a){
"use strict";
if(this==null)
throw TypeError();

var b=String(this),
c=arguments.length>1?
Number(arguments[1])||0:0;
return b.indexOf(String(a),c)!=-1;};



if(!String.prototype.repeat)
String.prototype.repeat=function(a){
"use strict";
if(this==null)
throw TypeError();

var b=String(this);
a=Number(a)||0;
if(a<0||a===Infinity)
throw RangeError();

if(a===1)
return b;

var c='';
while(a){
if(a&1)
c+=b;

if(a>>=1)
b+=b;}


return c;};

/** js/downstream/polyfill/String.prototype.es7.js */




















if(!String.prototype.trimLeft)
String.prototype.trimLeft=function(){
return this.replace(/^\s+/,'');};



if(!String.prototype.trimRight)
String.prototype.trimRight=function(){
return this.replace(/\s+$/,'');};

/** js/downstream/polyfill/String.prototype.js */


/** js/downstream/polyfill/String.prototype.split.js */


/** js/downstream/polyfill/TypeChecker.js */























(function(){
var a,
b=[],
c=Object.prototype.toString,
d=false,
e=false,


f,
g,




h=
{HTMLElement:{DOMEventTarget:true,DOMNode:true},
DOMElement:{DOMEventTarget:true,DOMNode:true},
DOMDocument:{DOMEventTarget:true,DOMNode:true},
DocumentFragment:
{DOMElement:true,
DOMEventTarget:true,
DOMNode:true},

DOMWindow:{DOMEventTarget:true},
DOMTextNode:{DOMNode:true},
Comment:{DOMNode:true},
file:{blob:true},
worker:{DOMEventTarget:true},

Set:{set:true},
Map:{map:true},
FbtResult:{Fbt:true},
string:{Fbt:true},
array:{Fbt:true}};







function i(q){
return c.call(q).slice(8,-1);}


function j(q){
switch(q){
case 'A':
return 'Anchor';
case 'IMG':
return 'Image';
case 'TEXTAREA':
return 'TextArea';}

return q.charAt(0).toUpperCase()+q.substring(1).toLowerCase();}





function k(q,r,s){
if(q==='function'){


if(typeof r.call!=='undefined')
return false;}else

if(q!=='object')
return false;


return typeof r.nodeName==='string'&&r.nodeType===s;}





function l(q,r,s,t){
g=null;


var u=i(r);
if(r===null){
q='null';}else
if(u==='Function'){
if(s==='$Class'){

q='$Class';
if(t&&r.__TCmeta&&r.__TCmeta.type)
f=r.__TCmeta.type;}else


if(r.__TCmeta){

q=s==='function'?'function':r.__TCmeta.signature;}else


q=s.indexOf('function')===0?s:'function';}else


if(q==='object'||q==='function'){
var v=r.constructor;
if(v&&v.__TCmeta){


if(s==='object'){
q='object';}else{

q=v.__TCmeta.type;
while(v&&v.__TCmeta){
if(v.__TCmeta.type==s){
q=s;
break;}

v=v.__TCmeta.superClass;}}}else


if(typeof r.nodeType==='number'&&
typeof r.nodeName==='string'){


switch(r.nodeType){
case 1:
if(s==='HTMLElement'){

q='HTMLElement';}else{

q='HTML'+j(r.nodeName)+'Element';
h[q]=h.HTMLElement;}

break;
case 3:q='DOMTextNode';break;
case 8:q='Comment';break;
case 9:q='DOMDocument';break;
case 11:q='DocumentFragment';break;}}else

if(r==r.window&&r==r.self){
q='DOMWindow';}else
if(u=='XMLHttpRequest'||
'setRequestHeader' in r){

q='XMLHttpRequest';}else


switch(u){
case 'Error':

q=s==='Error'?
'Error':
r.name;
break;
case 'Array':
if(t&&r.length)
g=r[0];

q=u.toLowerCase();
break;
case 'Object':
if(s==='Set'&&r['@@__IMMUTABLE_SET__@@']||
s==='Map'&&r['@@__IMMUTABLE_MAP__@@']){
q=s;}else{

if(t)
for(var w in r)
if(r.hasOwnProperty(w)){
g=r[w];
break;}



q=u.toLowerCase();}

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
q=u.toLowerCase();
break;}}



return q;}











function m(q,r){



var s=r.charAt(0)==='?';


if(q==null){
b.push(typeof q==='undefined'?'undefined':'null');
return s;}else
if(s)
r=r.substring(1);


var t=typeof q;

if(r==='Fbt'&&t==='string')
return true;


switch(t){
case 'boolean':
case 'number':
case 'string':


b.push(t);
return r===t;}





var u=false;
switch(r){
case 'function':

u=t==='function'&&typeof q.call==='function';
break;
case 'object':

u=t==='object'&&i(q)==='Object';
break;
case 'array':
u=t==='object'&&i(q)==='Array';
break;
case 'promise':
u=t==='object'&&typeof q.then==='function';
break;
case 'HTMLElement':
u=k(t,q,1);
break;
case 'DOMTextNode':
u=k(t,q,3);
break;
case 'Iterator':
u=t==='object'&&typeof q.next==='function';
break;
case 'IteratorResult':
u=t==='object'&&typeof q.done==='boolean';
break;
case 'OrderedMap':

case 'ImmOrderedMap':
u=t==='object'&&
q['@@__IMMUTABLE_ORDERED__@@']&&
q['@@__IMMUTABLE_MAP__@@'];
break;
case 'OrderedSet':

case 'ImmOrderedSet':
u=t==='object'&&
q['@@__IMMUTABLE_ORDERED__@@']&&
q['@@__IMMUTABLE_SET__@@'];
break;
case 'ImmMap':
u=t==='object'&&q['@@__IMMUTABLE_MAP__@@'];
break;
case 'ImmSet':
u=t==='object'&&q['@@__IMMUTABLE_SET__@@'];
break;
case 'List':
u=t==='object'&&q['@@__IMMUTABLE_LIST__@@'];
break;}


if(u){
b.push(r);
return true;}



var v=r.indexOf('<'),
w;

if(v!==-1&&r.indexOf('function')!==0){
w=r.substring(v+1,r.lastIndexOf('>'));
r=r.substring(0,v);}



t=l(t,q,r,!!w);



var x;
if(t!==r&&(x=h[t]))
if(x[r])
t=r;




b.push(t);

if(r!==t)
return false;



if(w){

if(f&&w!==f)
return false;


if(g&&!m(g,w))
return false;}


return true;}







function n(q,r){
if(r.indexOf('|')===-1){
b.length=0;
return m(q,r);}else{

var s=r.split('|');
for(var t=0;t<s.length;t++){
b.length=0;
if(m(q,s[t]))
return true;}}



return false;}










function o(){
if(!d&&!e){
var q=arguments,
r=q.length;
while(r--){
var s=q[r][0],
t=q[r][1],
u=q[r][2]||'return value';

if(!n(s,t)){
var v=b.shift();
while(b.length)
v+='<'+b.shift()+'>';


var w=!!q[r][2],
x;

try{x=w?arguments.callee.caller:o;}catch(
y){}




var z=
'Type Mismatch for '+u+': expected `'+t+'`, '+
'actual `'+v+'` ('+c.call(s)+').';




if(v==='object'&&
t.match(/^[A-Z]/)&&
!s.__TCmeta)
z+=
' Check the constructor\'s module is marked as typechecked -'+
' see http://fburl.com/typechecks for more information.';


var aa=new TypeError(z);

if(Error.captureStackTrace){
Error.captureStackTrace(aa,x||o);}else



aa.framesToPop=w?2:1;


if(typeof a=='function'){
a(aa);

d=true;

setTimeout(function(){return d=false;},0);}else
if(a==='throw')
throw aa;}}}






return arguments[0][0];}






o.setHandler=function(q){
a=q;};


o.disable=function(){
e=true;};





function p(q,r){
r.superClass=q.__superConstructor__;
q.__TCmeta=r;
return q;}



__t=o;
__w=p;})();

/** js/downstream/polyfill/console.js */


/** js/downstream/polyfill/require.js */






















(function(a){


if(a.require)
return;














var b={},





c={},







d={},




e={},

f=0,

g=1,
h=2,
i=4,


j={},

k=Object.prototype.hasOwnProperty,
l=Object.prototype.toString;

function m(ka){
var la=Array.prototype.slice.call(ka),
ma={},
na,oa,pa,qa;

while(la.length){
oa=la.shift();
if(ma[oa])
continue;

ma[oa]=true;

pa=b[oa];
if(!pa||!pa.waiting)
continue;


for(na=0;na<pa.dependencies.length;na++){
qa=pa.dependencies[na];
if(!b[qa]||b[qa].waiting)
la.push(qa);}}




for(oa in ma)
if(k.call(ma,oa))
la.push(oa);



var ra=[];
for(na=0;na<la.length;na++){
oa=la[na];
var sa=oa;
pa=b[oa];
if(!pa){
sa+=' is not defined';}else
if(!pa.waiting){
sa+=' is ready';}else{

var ta=[];
for(var ua=0;ua<pa.dependencies.length;ua++){
qa=pa.dependencies[ua];
if(!b[qa]||b[qa].waiting)
ta.push(qa);}


sa+=' is waiting for '+ta.join(', ');}

ra.push(sa);}

return ra.join('\n');}





function n(ka){
this.name='ModuleError';
this.message=ka;
this.stack=Error(ka).stack;
this.framesToPop=2;}

n.prototype=Object.create(Error.prototype);
n.prototype.constructor=n;

var o,
p;
o=p=Date.now.bind(Date);

var q=
a.performance||
a.msPerformance||
a.webkitPerformance||{};

if(q.now){
o=q.now.bind(q);
var r=
q.timing&&q.timing.navigationStart;
if(r)
p=function(){return o()+r;};}



var s=[0],
t=[],
u=0,
v=0;
























































function w(ka){
v++;

var la=b[ka];
if(la&&la.exports!=null){


if((la.refcount--)===1)
delete b[ka];

return la.exports;}


return x(ka);}


function x(ka){
if(a.ErrorUtils&&!a.ErrorUtils.inGuard())
return a.ErrorUtils.applyWithGuard(x,null,[ka]);


var la=b[ka];

if(!la){
var ma='Requiring unknown module "'+ka+'"';



throw new n(ma);}


if(la.hasError)
throw new n
('Requiring module "'+ka+'" which threw an exception');



if(la.waiting)
throw new n
('Requiring module "'+ka+'" with unresolved dependencies: '+
m([ka]));



var na=la.exports={},
oa=la.factory;
if(l.call(oa)==='[object Function]'){

var pa=la.dependencies,
qa=pa.length,
ra;

if(la.special&h)
qa=Math.min(qa,oa.length);




try{try{ga(la);}catch(
sa){
y(sa,ka);}


var ta=[];
for(var ua=0;ta.length<qa;ua++){
var va=pa[ua];
if(!la.inlineRequires[va])
ta.push(va==='module'?la:
va==='exports'?na:
w.call(null,va));}



++u;
s.push(0);
t.push(NaN);
var wa=p();

try{ra=oa.apply(la.context||a,ta);}catch(
sa){
y(sa,ka);}finally{

var xa=p(),
ya=xa-wa,
za=ya-s.pop(),

ab=t.pop();

s[s.length-1]+=ya;

var bb=c[la.id];
bb.factoryTime=za;
bb.factoryEnd=xa;

if(!isNaN(ab)){
bb.compileTime=ab-wa;
bb.factoryTime-=bb.compileTime;
bb.compileEnd=ab;}


if(oa.__SMmeta)
for(var cb in oa.__SMmeta)
if(oa.__SMmeta.hasOwnProperty(cb))
bb[cb]=oa.__SMmeta[cb];}}catch(




sa){
la.hasError=true;
la.exports=null;
throw sa;}

if(ra)









la.exports=ra;}else


la.exports=oa;



var db=ka+':__required__';
if(d[db])
z(db,j);




if((la.refcount--)===1)
delete b[ka];

return la.exports;}


function y(ka,la){
if(b.ex&&b.erx){


var ma=w.call(null,'ex'),
na=w.call(null,'erx'),
oa=na(ka.message);
if(oa[0].indexOf(' from module "%s"')<0){
oa[0]+=' from module "%s"';
oa[oa.length]=la;}

ka.message=ma.apply(null,oa);}

throw ka;}


w.__markCompiled=function(){
t[t.length-1]=p();};


w.__getFactoryTime=function(){
var ka=0;
for(var la in c)
if(c.hasOwnProperty(la))
ka+=c[la].factoryTime;


return ka;};


w.__getCompileTime=function(){
var ka=0;
for(var la in c)
if(c.hasOwnProperty(la))
ka+=c[la].compileTime;


return ka;};


w.__getTotalFactories=function(){
return u;};


w.__getTotalRequireCalls=function(){
return v;};


w.__getModuleTimeDetails=function(){
var ka={};
for(var la in c)
if(c.hasOwnProperty(la))
ka[la]=c[la];


return ka;};

























































function z(ka,la,ma,
na,oa,pa,qa){
if(a.TimeSlice&&!a.TimeSlice.inGuard())
return a.TimeSlice.guard(function(){
z(ka,la,ma,
na,oa,pa,qa);},
'define '+ka)();


if(la===undefined){

la=[];
ma=ka;
ka=da();}else
if(ma===undefined){

ma=la;
if(l.call(ka)==='[object Array]'){
la=ka;
ka=da(la.join(','));}else

la=[];}





var ra={cancel:ba.bind(this,ka)},

sa=b[ka];






if(sa){
if(pa)
sa.refcount+=pa;


return ra;}else
if(!la&&!ma&&pa){


e[ka]=(e[ka]||0)+pa;
return ra;}


var ta=(e[ka]||0)+(pa||0);
delete e[ka];




















sa=new aa
(ka,
ta,
null,
ma,
la,
oa,
na,
qa||{});

b[ka]=sa;
c[ka]=
{id:ka,
compileTime:null,
factoryTime:null,
compileEnd:null,
factoryEnd:null};

fa(ka);

return ra;}


function aa
(ka,la,ma,na,oa,pa,qa,
ra){

this.id=ka;
this.refcount=la;
this.exports=ma||null;
this.factory=na;
this.dependencies=oa;
this.context=pa;
this.special=qa||0;
this.inlineRequires=ra;
this.waitingMap={};
this.waiting=0;
this.hasError=false;
this.ranRecursiveSideEffects=false;
this.sideEffectDependencyException=null;}


function ba(ka){
if(!b[ka])
return;


var la=b[ka];
delete b[ka];

for(var ma in la.waitingMap)
if(la.waitingMap[ma])
delete d[ma][ka];



for(var na=0;na<la.dependencies.length;na++){
ma=la.dependencies[na];
if(b[ma]){
if((b[ma].refcount--)===1)
ba(ma);}else

if(e[ma])
e[ma]--;}}













































function ca(ka,la,ma){
return z
('__requireLazy__'+
(ka.length>0?ka.join(',')+'__':'')+
(f++),
ka,
la,
g,
ma,
1);}





function da(ka){
return '__mod__'+(ka?ka+'__':'')+(f++);}


function ea(ka,la){

if(!ka.waitingMap[la]&&ka.id!==la){
ka.waiting++;
ka.waitingMap[la]=1;
d[la]||(d[la]={});
d[la][ka.id]=1;}}



function fa(ka){
var la=[],
ma=b[ka],
na,oa,pa;


for(oa=0;oa<ma.dependencies.length;oa++){
na=ma.dependencies[oa];
if(!b[na]){
ea(ma,na);}else
if(b[na].waiting)
for(pa in b[na].waitingMap)
if(b[na].waitingMap[pa])
ea(ma,pa);}




if(ma.waiting===0&&ma.special&g)
la.push(ka);



if(d[ka]){
var qa=d[ka],
ra;
d[ka]=undefined;
for(na in qa){
ra=b[na];


for(pa in ma.waitingMap)
if(ma.waitingMap[pa])
ea(ra,pa);



if(ra.waitingMap[ka]){
ra.waitingMap[ka]=0;
ra.waiting--;}

if(ra.waiting===0&&
ra.special&g)
la.push(na);}}





for(oa=0;oa<la.length;oa++)
w.call(null,la[oa]);}








function ga(ka){
if(ka.sideEffectDependencyException)
throw ka.sideEffectDependencyException;


if(ka.ranRecursiveSideEffects)
return;


ka.ranRecursiveSideEffects=true;

var la=ka.dependencies;
if(la)
for(var ma=0;ma<la.length;ma++){
var na=la[ma],
oa=b[na];


try{ga(oa);}catch(
pa){
ka.sideEffectDependencyException=pa;
throw pa;}


if(oa.special&i)

try{w.call(null,na);}catch(
pa){
ka.sideEffectDependencyException=pa;
throw pa;}}}






function ha(ka,la){
b[ka]=new aa(ka,0,la);
c[ka]=
{id:ka,
compileTime:null,
factoryTime:null,
compileEnd:null,
factoryEnd:null};}





ha('module',0);
ha('exports',0);

ha('define',z);
ha('global',a);
ha('require',w);
ha('requireDynamic',w);
ha('requireLazy',ca);
ha('requireWeak',ia);
ha('ifRequired',ja);

z.amd={};

a.define=z;
a.require=w;
a.requireDynamic=w;
a.requireLazy=ca;

function ia(ka,la){

if(l.call(ka)==='[object Array]'){
if(ka.length!==1)
throw new Error
('requireWeak only supports a one-arg array for push safety');


ka=ka[0];}



ja.call(null,ka,function(ma){
la(ma);},
function(){
z
('__requireWeak__'+ka+'__'+(f++),
[ka+':__required__'],
function(){
la(b[ka].exports);},

g,
null,
1);});}










function ja(ka,la,ma){
var na=b[ka];
if(na&&na.exports!=null&&!na.hasError){
if(typeof la==='function')
la(na.exports);}else

if(typeof ma==='function')
ma();}



w.__debug=
{modules:b,
deps:d,
printDependencyInfo:function(){
if(!a.console)
return;

var ka=Object.keys(w.__debug.deps);
a.console.log(m(ka));}};





















































































































































































































































a.__d=function(ka,la,ma,na,oa){
var pa=['global','require','requireDynamic','requireLazy',
'module','exports'];
z(ka,pa.concat(la),ma,na||h,
null,null,oa);};})


(this);

/** js/downstream/error/eprintf.js */



















__d('eprintf',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();











var h=__annotator(function(i){return __bodyWrapper(this,arguments,function(){
var j=Array.prototype.slice.call(arguments).map(__annotator(function(m){
return String(m);},{module:'eprintf',line:33,column:55})),

k=i.split('%s').length-1;

if(k!==j.length-1)

return h('eprintf args number mismatch: %s',JSON.stringify(j));


var l=1;
return i.replace(/%s/g,__annotator(function(m){
return String(j[l++]);},{module:'eprintf',line:44,column:37}));},{params:[[i,'string','errorMessage']]});},{module:'eprintf',line:32,column:14},{params:['string']});



f.exports=h;},{module:'eprintf',line:0,column:0,name:'$module_eprintf'}),null);

/** js/downstream/error/ex.js */



















__d('ex',['eprintf'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();

















var i=__annotator(function(){for(var j=arguments.length,k=Array(j),l=0;l<j;l++)k[l]=arguments[l];
k=k.map(__annotator(function(m){return String(m);},{module:'ex',line:39,column:18}));
if(k[0].split('%s').length!==k.length)

return i('ex args number mismatch: %s',JSON.stringify(k));





return i._prefix+JSON.stringify(k)+i._suffix;},{module:'ex',line:38,column:9});




i._prefix='<![EX[';
i._suffix=']]>';

f.exports=i;},{module:'ex',line:0,column:0,name:'$module_ex'}),null);

/** js/downstream/core/$.js */


















__d('$',['ex'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();












function i(k){
var l=typeof k==='string'?document.getElementById(k):k;
if(!l)
throw new Error(h
('Tried to get element with id of "%s" but it is not present on the page.',
k));


return l;}__annotator(i,{module:'$',line:32,column:0,name:'getRequiredElement'});








function j(k){return __bodyWrapper(this,arguments,function(){
return i(k);},{params:[[k,'string|DOMDocument|HTMLElement|DOMTextNode|Comment','id']],returns:'DOMDocument|HTMLElement|DOMTextNode|Comment'});}__annotator(j,{module:'$',line:49,column:0,name:'$'},{params:['string|DOMDocument|HTMLElement|DOMTextNode|Comment'],returns:'DOMDocument|HTMLElement|DOMTextNode|Comment'});









j.unsafe=i;

f.exports=j;},{module:'$',line:0,column:0,name:'$module__'}),null);

/** js/downstream/core/sprintf.js */


















__d("sprintf",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();










function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];return __bodyWrapper(this,arguments,function(){
var m=0;
return i.replace(/%s/g,__annotator(function(n){return k[m++];},{module:"sprintf",line:32,column:31}));},{params:[[i,"string","format"]],returns:"string"});}__annotator(h,{module:"sprintf",line:30,column:0,name:"sprintf"},{params:["string"],returns:"string"});


f.exports=h;},{module:"sprintf",line:0,column:0,name:"$module_sprintf"}),null);

/** js/downstream/core/invariant.js */





























__d('invariant',['ex','sprintf'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();



'use strict';




var j=h,















k=__annotator(function(l,m){






if(!l){
var n;
if(m===undefined){
n=new Error
('Minified exception occurred; use the non-minified dev environment '+
'for the full error message and additional helpful warnings.');}else{


var o=['Invariant Violation: '+m];
for(var p=2,q=arguments.length;p<q;p++)
o.push(arguments[p]);

n=new Error(j.apply(null,o));
n.messageWithParams=o;}


n.framesToPop=1;
throw n;}},{module:'invariant',line:55,column:16});



f.exports=k;},{module:'invariant',line:0,column:0,name:'$module_invariant'}),null);

/** js/downstream/core/CSSCore.js */


















__d('CSSCore',['invariant'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();











var i=








{addClass:__annotator(function(j,k){return __bodyWrapper(this,arguments,function(){

!!/\s/.test(k)?h(0,
'CSSCore.addClass takes only a single class name. "%s" contains '+
'multiple classes.',k):undefined;


if(k)
if(j.classList){
j.classList.add(k);}else
if(!i.hasClass(j,k))
j.className=j.className+' '+k;


return j;},{params:[[j,'HTMLElement','element'],[k,'string','className']],returns:'HTMLElement'});},{module:'CSSCore',line:40,column:12},{params:['HTMLElement','string'],returns:'HTMLElement'}),









removeClass:__annotator(function(j,k){return __bodyWrapper(this,arguments,function(){

!!/\s/.test(k)?h(0,
'CSSCore.removeClass takes only a single class name. "%s" contains '+
'multiple classes.',k):undefined;


if(k)
if(j.classList){
j.classList.remove(k);}else
if(i.hasClass(j,k))
j.className=j.className.
replace(new RegExp('(^|\\s)'+k+'(?:\\s|$)','g'),'$1').
replace(/\s+/g,' ').
replace(/^\s*|\s*$/g,'');


return j;},{params:[[j,'HTMLElement','element'],[k,'string','className']],returns:'HTMLElement'});},{module:'CSSCore',line:64,column:15},{params:['HTMLElement','string'],returns:'HTMLElement'}),










conditionClass:__annotator(function(j,k,l){return __bodyWrapper(this,arguments,function(){
return (l?i.addClass:i.removeClass)(j,k);},{params:[[j,'HTMLElement','element'],[k,'string','className']],returns:'HTMLElement'});},{module:'CSSCore',line:92,column:18},{params:['HTMLElement','string'],returns:'HTMLElement'}),









hasClass:__annotator(function(j,k){return __bodyWrapper(this,arguments,function(){

!!/\s/.test(k)?h(0,
'CSS.hasClass takes only a single class name.'):undefined;

if(j.classList)
return !!k&&j.classList.contains(k);

return (' '+j.className+' ').indexOf(' '+k+' ')>-1;},{params:[[j,'DOMNode|DOMWindow','element'],[k,'string','className']],returns:'boolean'});},{module:'CSSCore',line:103,column:12},{params:['DOMNode|DOMWindow','string'],returns:'boolean'})};




f.exports=i;},{module:'CSSCore',line:0,column:0,name:'$module_CSSCore'}),null);

/** js/modules/CSS.js */





__d('CSS',['CSSCore','$'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();

var i=c('$').unsafe,



j='hidden_elem',









k=









{setClass:__annotator(function(l,m){return __bodyWrapper(this,arguments,function(){
i(l).className=m||'';
return l;},{params:[[l,'HTMLElement|string','element'],[m,'?string','className']],returns:'HTMLElement|string'});},{module:'CSS',line:32,column:12},{params:['HTMLElement|string','?string'],returns:'HTMLElement|string'}),









hasClass:__annotator(function(l,m){return __bodyWrapper(this,arguments,function(){
return h.hasClass(i(l),m);},{params:[[l,'HTMLElement|DOMTextNode|DOMDocument|string','element'],[m,'string','className']],returns:'boolean'});},{module:'CSS',line:44,column:12},{params:['HTMLElement|DOMTextNode|DOMDocument|string','string'],returns:'boolean'}),









addClass:__annotator(function(l,m){return __bodyWrapper(this,arguments,function(){
return h.addClass(i(l),m);},{params:[[l,'HTMLElement|string','element'],[m,'string','className']],returns:'HTMLElement'});},{module:'CSS',line:55,column:12},{params:['HTMLElement|string','string'],returns:'HTMLElement'}),









removeClass:__annotator(function(l,m){return __bodyWrapper(this,arguments,function(){
return h.removeClass(i(l),m);},{params:[[l,'HTMLElement|string','element'],[m,'string','className']],returns:'HTMLElement'});},{module:'CSS',line:66,column:15},{params:['HTMLElement|string','string'],returns:'HTMLElement'}),










conditionClass:__annotator(function(l,m,n){return __bodyWrapper(this,arguments,function(){
return h.conditionClass(i(l),m,n);},{params:[[l,'HTMLElement|string','element'],[m,'string','className']],returns:'HTMLElement'});},{module:'CSS',line:78,column:18},{params:['HTMLElement|string','string'],returns:'HTMLElement'}),










toggleClass:__annotator(function(l,m){return __bodyWrapper(this,arguments,function(){
return k.conditionClass
(l,
m,
!k.hasClass(l,m));},{params:[[l,'HTMLElement|string','element'],[m,'string','className']],returns:'HTMLElement'});},{module:'CSS',line:90,column:15},{params:['HTMLElement|string','string'],returns:'HTMLElement'}),










shown:__annotator(function(l){return __bodyWrapper(this,arguments,function(){
return !k.hasClass(l,j);},{params:[[l,'HTMLElement|string','element']],returns:'boolean'});},{module:'CSS',line:105,column:9},{params:['HTMLElement|string'],returns:'boolean'}),








hide:__annotator(function(l){return __bodyWrapper(this,arguments,function(){
return k.addClass(l,j);},{params:[[l,'HTMLElement|string','element']],returns:'HTMLElement'});},{module:'CSS',line:115,column:8},{params:['HTMLElement|string'],returns:'HTMLElement'}),








show:__annotator(function(l){return __bodyWrapper(this,arguments,function(){
return k.removeClass(l,j);},{params:[[l,'HTMLElement|string','element']],returns:'HTMLElement'});},{module:'CSS',line:125,column:8},{params:['HTMLElement|string'],returns:'HTMLElement'}),








toggle:__annotator(function(l){return __bodyWrapper(this,arguments,function(){
return k.toggleClass(l,j);},{params:[[l,'HTMLElement|string','element']],returns:'HTMLElement'});},{module:'CSS',line:135,column:10},{params:['HTMLElement|string'],returns:'HTMLElement'}),










conditionShow:__annotator(function(l,m){return __bodyWrapper(this,arguments,function(){
return k.conditionClass(l,j,!m);},{params:[[l,'HTMLElement|string','element']],returns:'HTMLElement'});},{module:'CSS',line:147,column:17},{params:['HTMLElement|string'],returns:'HTMLElement'})};



f.exports=k;},{module:'CSS',line:0,column:0,name:'$module_CSS'}),null);

/** js/deprecated/css-legacy.js */


__d('legacy:css',['CSS'],__annotator(function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();

b.CSS=c('CSS');},{module:'legacy:css',line:0,column:0,name:'$module_legacy_css'}),3);

/** js/downstream/core/ge.js */

















__d('ge',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();










function h(k,l,m){
return typeof k!='string'?k:
!l?document.getElementById(k):
i(k,l,m);}__annotator(h,{module:'ge',line:29,column:0,name:'ge'});


function i(k,l,m){
var n,o,p;

if(j(l)==k){
return l;}else
if(l.getElementsByTagName){


o=l.getElementsByTagName(m||'*');
for(p=0;p<o.length;p++)
if(j(o[p])==k)
return o[p];}else{






o=l.childNodes;
for(p=0;p<o.length;p++){
n=i(k,o[p]);
if(n)
return n;}}




return null;}__annotator(i,{module:'ge',line:35,column:0,name:'_geFromSubtree'});








function j(k){

return k.getAttribute?k.getAttribute('id'):null;}__annotator(j,{module:'ge',line:71,column:0,name:'_getNodeID'});


f.exports=h;},{module:'ge',line:0,column:0,name:'$module_ge'}),null);

/** js/deprecated/dom-core.js */


__d('legacy:dom-core',['$','ge'],__annotator(function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();

b.$=b.$||c('$');
b.ge=c('ge');},{module:'legacy:dom-core',line:0,column:0,name:'$module_legacy_dom_core'}),3);

/** js/downstream/core/dom/Parent.js */


















__d('Parent',['CSSCore'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



var i=






{byTag:__annotator(function(j,k){return __bodyWrapper(this,arguments,function(){
k=k.toUpperCase();
while(j&&j.nodeName!==k)
j=j.parentNode;

return j;},{params:[[k,'string','tagName']]});},{module:'Parent',line:30,column:9},{params:['string']}),







byClass:__annotator(function(j,k){return __bodyWrapper(this,arguments,function(){
while(j&&!h.hasClass(j,k))
j=j.parentNode;

return j;},{params:[[k,'string','className']]});},{module:'Parent',line:43,column:11},{params:['string']}),







byAttribute:__annotator(function(j,k){return __bodyWrapper(this,arguments,function(){
while(j&&(!j.getAttribute||!j.getAttribute(k)))
j=j.parentNode;

return j;},{params:[[k,'string','attributeName']]});},{module:'Parent',line:55,column:15},{params:['string']})};




f.exports=i;},{module:'Parent',line:0,column:0,name:'$module_Parent'}),null);

/** js/deprecated/parent.js */


__d('legacy:parent',['Parent'],__annotator(function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();

b.Parent=c('Parent');},{module:'legacy:parent',line:0,column:0,name:'$module_legacy_parent'}),3);

/** js/modules/Env.js */




__d("Env",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

var h=
{start:Date.now()};




if(b.Env){
Object.assign(h,b.Env);




b.Env=undefined;}


f.exports=h;},{module:"Env",line:0,column:0,name:"$module_Env"}),null);

/** js/downstream/error/erx.js */



















__d('erx',['ex'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



















var i=__annotator(function(j){return __bodyWrapper(this,arguments,function(){
if(typeof j!=='string')

return j;


var k=j.indexOf(h._prefix),
l=j.lastIndexOf(h._suffix);
if(k<0||l<0)

return [j];


var m=k+h._prefix.length,
n=l+h._suffix.length;
if(m>=l)
return ['erx slice failure: %s',j];


var o=j.substring(0,k),
p=j.substring(n);
j=j.substring(m,l);

var q;

try{q=JSON.parse(j);
q[0]=
o+q[0]+p;}catch(
r){
return ['erx parse failure: %s',j];}


return q;},{params:[[j,'string|array<string>','transformedMessage']]});},{module:'erx',line:40,column:10},{params:['string|array<string>']});


f.exports=i;},{module:'erx',line:0,column:0,name:'$module_erx'}),null);

/** js/downstream/error/ErrorUtils.js */


















__d('ErrorUtils',['Env','eprintf','erx'],__annotator(function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();



var k={},





l='<anonymous guard>',
m='<generated guard>',
n='<window.onerror>',

o=/^https?:\/\//i,
p=/^Type Mismatch for/,




q=
['Unknown script code',
'Function code',
'eval code'],

r=
new RegExp('(.*?)(\\s)(?:'+q.join('|')+')$'),


s=[],


t,


u=[],
v=50,

w=[],


x=false,



y=false,

z=
k.nocatch||
/nocatch/.test(location.search);





function aa(ma){
if(!ma)
return [];

var na=ma.split(/\n\n/)[0].
replace(/[\(\)]|\[.*?\]|^\w+:\s.*?\n/g,'').
split('\n').
map(__annotator(function(oa){
var pa,qa,ra;

oa=oa.trim();

if(/(:(\d+)(:(\d+))?)$/.test(oa)){
qa=RegExp.$2;
ra=RegExp.$4;
oa=oa.slice(0,-RegExp.$1.length);}




if(r.test(oa)||
/(.*)(@|\s)[^\s]+$/.test(oa)){

oa=oa.substring(RegExp.$1.length+1);
pa=
/(at)?\s*(.*)([^\s]+|$)/.test(RegExp.$1)?RegExp.$2:'';}


var sa=
{identifier:pa,
script:oa,
line:qa,
column:ra};


if(t)
t(sa);



sa.text='    at'+
(sa.identifier?' '+sa.identifier+' (':' ')+
sa.script+
(sa.line?':'+sa.line:'')+
(sa.column?':'+sa.column:'')+
(sa.identifier?')':'');

return sa;},{module:'ErrorUtils',line:81,column:11}));


return na;}__annotator(aa,{module:'ErrorUtils',line:74,column:0,name:'normalizeStack'});









function ba(ma){
if(!ma){
return {};}else
if(ma._originalError)
return ma;


var na=aa(ma.stackTrace||ma.stack),
oa=false;

if(ma.framesToPop){

var pa=ma.framesToPop,
qa;
while(pa>0&&na.length>0){
qa=na.shift();
pa--;
oa=true;}


if(p.test(ma.message)&&
ma.framesToPop===2&&
qa)






if(o.test(qa.script))
ma.message+=' at '+qa.script+
(qa.line?':'+qa.line:'')+
(qa.column?':'+qa.column:'');


delete ma.framesToPop;}


var ra=
{line:
ma.lineNumber||
ma.line,
column:
ma.columnNumber||
ma.column,
name:ma.name,
message:ma.message,
messageWithParams:ma.messageWithParams,
type:ma.type,
script:
ma.fileName||
ma.sourceURL||
ma.script,
stack:na.map(__annotator(function(ta){return ta.text;},{module:'ErrorUtils',line:187,column:25})).join('\n'),
stackFrames:na,
guard:ma.guard,
guardList:ma.guardList,
extra:ma.extra,
snapshot:ma.snapshot};


if(typeof ra.message==='string'&&!ra.messageWithParams){
ra.messageWithParams=j(ra.message);
ra.message=i.apply(b,ra.messageWithParams);}else{

ra.messageObject=ra.message;
ra.message=String(ra.message);}




if(t)
t(ra);




if(oa){
delete ra.script;
delete ra.line;
delete ra.column;}



if(na[0]){
ra.script=ra.script||na[0].script;
ra.line=ra.line||na[0].line;
ra.column=ra.column||na[0].column;}



ra._originalError=ma;


for(var sa in ra)
ra[sa]==null&&delete ra[sa];

return ra;}__annotator(ba,{module:'ErrorUtils',line:134,column:0,name:'normalizeError'});






function ca(ma,na){
if(y)


return false;




if(w.length>0){
ma.guard=ma.guard||w[0];
ma.guardList=w.slice();}


ma=ba(ma);
!na;









if(u.length>v)
u.splice(v/2,1);

u.push(ma);

y=true;
for(var oa=0;oa<s.length;oa++)

try{s[oa](ma);}catch(
pa){
}


y=false;
return true;}__annotator(ca,{module:'ErrorUtils',line:238,column:0,name:'reportError'});



function da(){
return x;}__annotator(da,{module:'ErrorUtils',line:281,column:0,name:'inGuard'});


function ea(ma){
w.unshift(ma);
x=true;}__annotator(ea,{module:'ErrorUtils',line:285,column:0,name:'pushGuard'});


function fa(){
w.shift();
x=w.length!==0;}__annotator(fa,{module:'ErrorUtils',line:290,column:0,name:'popGuard'});














function ga(ma,na,oa,pa,qa){
ea(qa||l);

var ra;




if(h.nocatch)
z=true;


if(z){

try{ra=ma.apply(na,oa||[]);}finally{




fa();}

return ra;}




try{ra=ma.apply(na,oa||[]);
return ra;}catch(
sa){
var ta=ba(sa);
if(pa)
pa(ta);



if(ma)
ta.callee=ma.toString().substring(0,100);

if(oa)
ta.args=Array.prototype.slice.call(oa).toString().substring(0,100);

ta.guard=w[0];
ta.guardList=w.slice();












ca(ta);}finally{

fa();}}__annotator(ga,{module:'ErrorUtils',line:307,column:0,name:'applyWithGuard'});













function ha(ma,na,oa){
na=na||ma.name||m;
function pa(){
return ga(ma,oa||this,arguments,null,na);}__annotator(pa,{module:'ErrorUtils',line:380,column:2,name:'guarded'});

if(ma.__SMmeta)
pa.__SMmeta=ma.__SMmeta;






return pa;}__annotator(ha,{module:'ErrorUtils',line:378,column:0,name:'guard'});












function ia(ma,na,oa,pa,qa){
qa=qa||{};
qa.message=qa.message||ma;
qa.script=qa.script||na;
qa.line=qa.line||oa;
qa.column=qa.column||pa;
qa.guard=n;
qa.guardList=[n];
ca(qa,true);}__annotator(ia,{module:'ErrorUtils',line:404,column:0,name:'onerror'});

window.onerror=ia;









function ja(ma,na){
s.push(ma);

if(!na)
u.forEach(ma);}__annotator(ja,{module:'ErrorUtils',line:424,column:0,name:'addListener'});








function ka(ma){
t=ma;}__annotator(ka,{module:'ErrorUtils',line:437,column:0,name:'setSourceResolver'});


var la=
{ANONYMOUS_GUARD_TAG:l,
GENERATED_GUARD_TAG:m,
GLOBAL_ERROR_HANDLER_TAG:n,
addListener:ja,
setSourceResolver:ka,
applyWithGuard:ga,
guard:ha,
history:u,
inGuard:da,
normalizeError:ba,
onerror:ia,
reportError:ca};


f.exports=b.ErrorUtils=la;


if(typeof __t==='function'&&__t.setHandler)
__t.setHandler(ca);},{module:'ErrorUtils',line:0,column:0,name:'$module_ErrorUtils'}),6);

/** js/downstream/callback_manager/CallbackDependencyManager.js */




















































__d('CallbackDependencyManager',['ErrorUtils'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();




function i(){'use strict';
this.$CallbackDependencyManager_callbackDependencyCounts={};
this.$CallbackDependencyManager_callbacks={};
this.$CallbackDependencyManager_lastCallbackID=1;
this.$CallbackDependencyManager_satisfiedDependencies={};}__annotator(i,{module:'CallbackDependencyManager',line:58,column:2,name:'CallbackDependencyManager'});i.prototype.






$CallbackDependencyManager_addDependenciesToCallback=__annotator(function(j,k){return __bodyWrapper(this,arguments,function(){'use strict';
var l=0,
m={};
for(var n=0,o=k.length;n<o;n++)
m[k[n]]=1;


for(var p in m){
if(this.$CallbackDependencyManager_satisfiedDependencies[p])
continue;

l++;


if(this.$CallbackDependencyManager_callbackDependencyCounts[p]===undefined)
this.$CallbackDependencyManager_callbackDependencyCounts[p]={};

this.$CallbackDependencyManager_callbackDependencyCounts[p][j]=
(this.$CallbackDependencyManager_callbackDependencyCounts[p][j]||0)+1;}


return l;},{params:[[j,'number','callbackID'],[k,'array<string>','deps']]});},{module:'CallbackDependencyManager',line:69,column:28},{params:['number','array<string>']});i.prototype.





$CallbackDependencyManager_resolveCallbacksForDependency=__annotator(function(j){return __bodyWrapper(this,arguments,function(){'use strict';
if(!this.$CallbackDependencyManager_callbackDependencyCounts[j])
return;


for(var k in this.$CallbackDependencyManager_callbackDependencyCounts[j]){
this.$CallbackDependencyManager_callbackDependencyCounts[j][k]--;
if(this.$CallbackDependencyManager_callbackDependencyCounts[j][k]<=0)
delete this.$CallbackDependencyManager_callbackDependencyCounts[j][k];


this.$CallbackDependencyManager_callbacks[k].$CallbackDependencyManager_pendingDepCount--;
if(this.$CallbackDependencyManager_callbacks[k].$CallbackDependencyManager_pendingDepCount<=0){
var l=this.$CallbackDependencyManager_callbacks[k].$CallbackDependencyManager_callback;
delete this.$CallbackDependencyManager_callbacks[k];
h.applyWithGuard(l);}}},{params:[[j,'string','depName']]});},{module:'CallbackDependencyManager',line:96,column:32},{params:['string']});i.prototype.









addDependenciesToExistingCallback=__annotator(function(j,k){return __bodyWrapper(this,arguments,function(){'use strict';
if(!this.$CallbackDependencyManager_callbacks[j])
return null;

var l=this.$CallbackDependencyManager_addDependenciesToCallback(j,k);
this.$CallbackDependencyManager_callbacks[j].$CallbackDependencyManager_pendingDepCount+=l;
return j;},{params:[[j,'number','callbackID'],[k,'array<string>','newDeps']],returns:'?number'});},{module:'CallbackDependencyManager',line:121,column:35},{params:['number','array<string>'],returns:'?number'});i.prototype.






isPersistentDependencySatisfied=__annotator(function(j){return __bodyWrapper(this,arguments,function(){'use strict';
return !!this.$CallbackDependencyManager_satisfiedDependencies[j];},{params:[[j,'string','depName']],returns:'boolean'});},{module:'CallbackDependencyManager',line:134,column:33},{params:['string'],returns:'boolean'});i.prototype.








satisfyPersistentDependency=__annotator(function(j){return __bodyWrapper(this,arguments,function(){'use strict';
this.$CallbackDependencyManager_satisfiedDependencies[j]=1;
this.$CallbackDependencyManager_resolveCallbacksForDependency(j);},{params:[[j,'string','depName']]});},{module:'CallbackDependencyManager',line:144,column:29},{params:['string']});i.prototype.








satisfyNonPersistentDependency=__annotator(function(j){return __bodyWrapper(this,arguments,function(){'use strict';
var k=this.$CallbackDependencyManager_satisfiedDependencies[j]===1;
if(!k)
this.$CallbackDependencyManager_satisfiedDependencies[j]=1;

this.$CallbackDependencyManager_resolveCallbacksForDependency(j);
if(!k)
delete this.$CallbackDependencyManager_satisfiedDependencies[j];},{params:[[j,'string','depName']]});},{module:'CallbackDependencyManager',line:155,column:32},{params:['string']});i.prototype.








registerCallback=__annotator(function(j,k){return __bodyWrapper(this,arguments,function(){'use strict';
var l=this.$CallbackDependencyManager_lastCallbackID;
this.$CallbackDependencyManager_lastCallbackID++;
var m=this.$CallbackDependencyManager_addDependenciesToCallback(l,k);




if(m===0){
h.applyWithGuard(j);
return null;}


this.$CallbackDependencyManager_callbacks[l]=
{$CallbackDependencyManager_callback:j,
$CallbackDependencyManager_pendingDepCount:m};


return l;},{params:[[j,'function','callback'],[k,'array<string>','deps']],returns:'?number'});},{module:'CallbackDependencyManager',line:171,column:18},{params:['function','array<string>'],returns:'?number'});i.prototype.





unsatisfyPersistentDependency=__annotator(function(j){return __bodyWrapper(this,arguments,function(){'use strict';
delete this.$CallbackDependencyManager_satisfiedDependencies[j];},{params:[[j,'string','depName']]});},{module:'CallbackDependencyManager',line:195,column:31},{params:['string']});



f.exports=i;},{module:'CallbackDependencyManager',line:0,column:0,name:'$module_CallbackDependencyManager'}),null);

/** js/downstream/emitter/EventSubscription.js */


















__d('EventSubscription',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

'use strict';













function h(i){
this.subscriber=i;}__annotator(h,{module:'EventSubscription',line:35,column:2,name:'EventSubscription'});h.prototype.





remove=__annotator(function(){
if(this.subscriber){
this.subscriber.removeSubscription(this);
this.subscriber=null;}},{module:'EventSubscription',line:42,column:8});




f.exports=h;},{module:'EventSubscription',line:0,column:0,name:'$module_EventSubscription'}),null);

/** js/downstream/emitter/EmitterSubscription.js */


















__d('EmitterSubscription',['EventSubscription'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i,j;

'use strict';i=






h;j=i&&i.prototype;Object.assign(k,i);k.prototype=Object.create(i.prototype);k.prototype.constructor=k;k.__superConstructor__=i;









function k(l,m,n){return __bodyWrapper(this,arguments,function(){
j.constructor.call(this,l);
this.listener=m;
this.context=n;},{params:[[m,'function','listener'],[n,'?object','context']]});}__annotator(k,{module:'EmitterSubscription',line:38,column:2,name:'EmitterSubscription'},{params:['function','?object']});



f.exports=k;},{module:'EmitterSubscription',line:0,column:0,name:'$module_EmitterSubscription'}),null);

/** js/downstream/emitter/EventSubscriptionVendor.js */


















__d('EventSubscriptionVendor',['invariant'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();

'use strict';









function i(){
this.$EventSubscriptionVendor_subscriptionsForType={};
this.$EventSubscriptionVendor_currentSubscription=null;}__annotator(i,{module:'EventSubscriptionVendor',line:31,column:2,name:'EventSubscriptionVendor'});i.prototype.








addSubscription=__annotator
(function(j,k){

!(k.subscriber===this)?h(0,
'The subscriber of the subscription is incorrectly set.'):undefined;
if(!this.$EventSubscriptionVendor_subscriptionsForType[j])
this.$EventSubscriptionVendor_subscriptionsForType[j]=[];

var l=this.$EventSubscriptionVendor_subscriptionsForType[j].length;
this.$EventSubscriptionVendor_subscriptionsForType[j].push(k);
k.eventType=j;
k.key=l;
return k;},{module:'EventSubscriptionVendor',line:42,column:17});i.prototype.








removeAllSubscriptions=__annotator(function(j){
if(j===undefined){
this.$EventSubscriptionVendor_subscriptionsForType={};}else

delete this.$EventSubscriptionVendor_subscriptionsForType[j];},{module:'EventSubscriptionVendor',line:63,column:24});i.prototype.









removeSubscription=__annotator(function(j){return __bodyWrapper(this,arguments,function(){
var k=j.eventType,
l=j.key,

m=this.$EventSubscriptionVendor_subscriptionsForType[k];
if(m)
delete m[l];},{params:[[j,'object','subscription']]});},{module:'EventSubscriptionVendor',line:77,column:20},{params:['object']});i.prototype.















getSubscriptionsForType=__annotator(function(j){return __bodyWrapper(this,arguments,function(){
return this.$EventSubscriptionVendor_subscriptionsForType[j];},{returns:'?array'});},{module:'EventSubscriptionVendor',line:99,column:25},{returns:'?array'});



f.exports=i;},{module:'EventSubscriptionVendor',line:0,column:0,name:'$module_EventSubscriptionVendor'}),null);

/** js/downstream/core/emptyFunction.js */

















__d("emptyFunction",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

function h(j){
return __annotator(function(){
return j;},{module:"emptyFunction",line:21,column:9});}__annotator(h,{module:"emptyFunction",line:20,column:0,name:"makeEmptyFunction"});








function i(){}__annotator(i,{module:"emptyFunction",line:31,column:0,name:"emptyFunction"});

i.thatReturns=h;
i.thatReturnsFalse=h(false);
i.thatReturnsTrue=h(true);
i.thatReturnsNull=h(null);
i.thatReturnsThis=__annotator(function(){return this;},{module:"emptyFunction",line:37,column:32});
i.thatReturnsArgument=__annotator(function(j){return j;},{module:"emptyFunction",line:38,column:36});

f.exports=i;},{module:"emptyFunction",line:0,column:0,name:"$module_emptyFunction"}),null);

/** js/downstream/emitter/BaseEventEmitter.js */


















__d('BaseEventEmitter',['EmitterSubscription','EventSubscriptionVendor','emptyFunction','invariant'],__annotator(function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();
























function l(){'use strict';
this.$BaseEventEmitter_subscriber=new i();
this.$BaseEventEmitter_currentSubscription=null;}__annotator(l,{module:'BaseEventEmitter',line:44,column:2,name:'BaseEventEmitter'});l.prototype.
















addListener=__annotator
(function(m,n,o){return __bodyWrapper(this,arguments,function(){'use strict';
return this.$BaseEventEmitter_subscriber.addSubscription
(m,
new h(this.$BaseEventEmitter_subscriber,n,o));},{params:[[m,'string','eventType'],[n,'function','listener'],[o,'?object','context']],returns:'EmitterSubscription'});},{module:'BaseEventEmitter',line:63,column:13},{params:['string','function','?object'],returns:'EmitterSubscription'});l.prototype.












once=__annotator(function(m,n,o){return __bodyWrapper(this,arguments,function(){'use strict';
var p=this;
return this.addListener(m,__annotator(function(){
p.removeCurrentListener();
n.apply(o,arguments);},{module:'BaseEventEmitter',line:82,column:39}));},{params:[[m,'string','eventType'],[n,'function','listener'],[o,'?object','context']],returns:'EmitterSubscription'});},{module:'BaseEventEmitter',line:80,column:6},{params:['string','function','?object'],returns:'EmitterSubscription'});l.prototype.










removeAllListeners=__annotator(function(m){'use strict';
this.$BaseEventEmitter_subscriber.removeAllSubscriptions(m);},{module:'BaseEventEmitter',line:95,column:20});l.prototype.























removeCurrentListener=__annotator(function(){'use strict';

!!!this.$BaseEventEmitter_currentSubscription?k(0,
'Not in an emitting cycle; there is no current subscription'):undefined;

this.$BaseEventEmitter_subscriber.removeSubscription(this.$BaseEventEmitter_currentSubscription);},{module:'BaseEventEmitter',line:120,column:23});l.prototype.









listeners=__annotator(function(m){return __bodyWrapper(this,arguments,function(){'use strict';
var n=this.$BaseEventEmitter_subscriber.getSubscriptionsForType(m);
return n?
n.filter(j.thatReturnsTrue).map(__annotator
(function(o){
return o.listener;},{module:'BaseEventEmitter',line:139,column:10})):

[];},{params:[[m,'string','eventType']],returns:'array'});},{module:'BaseEventEmitter',line:135,column:11},{params:['string'],returns:'array'});l.prototype.
















emit=__annotator(function(m){return __bodyWrapper(this,arguments,function(){'use strict';
var n=this.$BaseEventEmitter_subscriber.getSubscriptionsForType(m);
if(n){
var o=Object.keys(n);
for(var p=0;p<o.length;p++){
var q=o[p],
r=n[q];

if(r){
this.$BaseEventEmitter_currentSubscription=r;
this.__emitToSubscription.apply
(this,
[r].concat(Array.prototype.slice.call(arguments)));}}



this.$BaseEventEmitter_currentSubscription=null;}},{params:[[m,'string','eventType']]});},{module:'BaseEventEmitter',line:159,column:6},{params:['string']});l.prototype.












__emitToSubscription=__annotator(function(m,n){return __bodyWrapper(this,arguments,function(){'use strict';
var o=Array.prototype.slice.call(arguments,2);
m.listener.apply(m.context,o);},{params:[[m,'EmitterSubscription','subscription'],[n,'string','eventType']]});},{module:'BaseEventEmitter',line:188,column:22},{params:['EmitterSubscription','string']});



f.exports=l;},{module:'BaseEventEmitter',line:0,column:0,name:'$module_BaseEventEmitter'}),null);

/** js/downstream/struct/CircularBuffer.js */

















__d('CircularBuffer',['invariant'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();




function i(j){'use strict';

!(j>0)?h(0,
'Buffer size should be a positive integer'):undefined;

this.$CircularBuffer_size=j;
this.$CircularBuffer_head=0;
this.$CircularBuffer_buffer=[];}__annotator(i,{module:'CircularBuffer',line:23,column:2,name:'CircularBuffer'});i.prototype.


write=__annotator(function(j){'use strict';
if(this.$CircularBuffer_buffer.length<this.$CircularBuffer_size){
this.$CircularBuffer_buffer.push(j);}else{

this.$CircularBuffer_buffer[this.$CircularBuffer_head]=j;
this.$CircularBuffer_head++;
this.$CircularBuffer_head%=this.$CircularBuffer_size;}

return this;},{module:'CircularBuffer',line:33,column:7});i.prototype.


read=__annotator(function(){'use strict';
return this.$CircularBuffer_buffer.slice(this.$CircularBuffer_head).concat
(this.$CircularBuffer_buffer.slice(0,this.$CircularBuffer_head));},{module:'CircularBuffer',line:44,column:6});i.prototype.



clear=__annotator(function(){'use strict';
this.$CircularBuffer_head=0;
this.$CircularBuffer_buffer=[];
return this;},{module:'CircularBuffer',line:50,column:7});



f.exports=i;},{module:'CircularBuffer',line:0,column:0,name:'$module_CircularBuffer'}),null);

/** js/downstream/logging/LogBuffer.js */


















__d('LogBuffer',['CircularBuffer'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();







var i=b.setTimeout.nativeBackup||b.setTimeout,
































j=5000,


k={},

l={},

m=
{write:__annotator(function(n,o){
var p=
k[n]=
k[n]||new h(j);

p.write(o);

if(l[n])
l[n].forEach(__annotator(function(q){

try{q(o);}catch(
r){}},{module:'LogBuffer',line:76,column:32}));},{module:'LogBuffer',line:68,column:9}),






read:__annotator(function(n){
if(!k[n]){
return [];}else

return k[n].read();},{module:'LogBuffer',line:86,column:8}),



tail:__annotator(function(n,o){
if(typeof o!=='function')
return;


l[n]=l[n]||[];
l[n].push(o);

if(k[n]){
var p=k[n];

p.read().forEach(__annotator(function(q){

try{o(q);}catch(
r){}},{module:'LogBuffer',line:105,column:28}));}},{module:'LogBuffer',line:94,column:8}),






clear:__annotator(function(n){
if(k[n])

i(__annotator(function(){
k[n].clear();},{module:'LogBuffer',line:118,column:17}),
0);},{module:'LogBuffer',line:115,column:9})};




f.exports=m;},{module:'LogBuffer',line:0,column:0,name:'$module_LogBuffer'}),null);

/** js/downstream/core/ExecutionEnvironment.js */

















__d('ExecutionEnvironment',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

'use strict';

var h=
!!(typeof window!=='undefined'&&
window.document&&
window.document.createElement),








i=

{canUseDOM:h,

canUseWorkers:typeof Worker!=='undefined',

canUseEventListeners:
h&&!!(window.addEventListener||window.attachEvent),

canUseViewport:h&&!!window.screen,

isInWorker:!h};



f.exports=i;},{module:'ExecutionEnvironment',line:0,column:0,name:'$module_ExecutionEnvironment'}),null);

/** js/downstream/performance/performance.js */


















__d('performance',['ExecutionEnvironment'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();

'use strict';



var i;

if(h.canUseDOM)
i=
window.performance||
window.msPerformance||
window.webkitPerformance;


f.exports=i||{};},{module:'performance',line:0,column:0,name:'$module_performance'}),null);

/** js/downstream/performance/performanceNow.js */


















__d('performanceNow',['performance'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();


var i=h;






if(!i||!i.now)
i=Date;


var j=i.now.bind(i);

f.exports=j;},{module:'performanceNow',line:0,column:0,name:'$module_performanceNow'}),null);

/** js/downstream/emitter/internal/EventEmitter.js */


















__d('EventEmitter',['BaseEventEmitter','ErrorUtils','LogBuffer','performanceNow'],__annotator(function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l,m;l=











h;m=l&&l.prototype;Object.assign(n,l);n.prototype=Object.create(l.prototype);n.prototype.constructor=n;n.__superConstructor__=l;n.prototype.
__emitToSubscription=__annotator(function(o,p){'use strict';
var q=
o.listener.__SMmeta||

{name:o.listener.name||'<anonymous function>'},

r=k();
i.applyWithGuard
(o.listener,
o.context,
Array.prototype.slice.call(arguments,2),
null,
'EventEmitter:'+p);

var s=k()-r;
j.write('event_handler_performance',
{functionMeta:q,
time:s,
context:p});},{module:'EventEmitter',line:32,column:22});function n(){'use strict';l.apply(this,arguments);}__annotator(n,{module:'EventEmitter',line:0,column:0,name:'EventEmitter'});




f.exports=n;},{module:'EventEmitter',line:0,column:0,name:'$module_EventEmitter'}),null);

/** js/downstream/emitter/internal/EventEmitterWithHolding.js */


















__d('EventEmitterWithHolding',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

'use strict';























function h(i,j){
this.$EventEmitterWithHolding_emitter=i;
this.$EventEmitterWithHolding_eventHolder=j;
this.$EventEmitterWithHolding_currentEventToken=null;
this.$EventEmitterWithHolding_heldEventsRemovalStack=[];
this.$EventEmitterWithHolding_heldEventsEmitDepth=0;}__annotator(h,{module:'EventEmitterWithHolding',line:45,column:2,name:'EventEmitterWithHolding'});h.prototype.





addListener=__annotator(function(i,j,k){return __bodyWrapper(this,arguments,function(){
return this.$EventEmitterWithHolding_emitter.addListener(i,j,k);},{params:[[k,'?object','context']]});},{module:'EventEmitterWithHolding',line:56,column:13},{params:['?object']});h.prototype.





once=__annotator(function(i,j,k){return __bodyWrapper(this,arguments,function(){
return this.$EventEmitterWithHolding_emitter.once(i,j,k);},{params:[[k,'?object','context']]});},{module:'EventEmitterWithHolding',line:63,column:6},{params:['?object']});h.prototype.






















addRetroactiveListener=__annotator
(function(i,j,k){return __bodyWrapper(this,arguments,function(){
var l=this.$EventEmitterWithHolding_emitter.addListener(i,j,k),

m=this.$EventEmitterWithHolding_heldEventsRemovalStack;
m.push(false);
this.$EventEmitterWithHolding_heldEventsEmitDepth++;
this.$EventEmitterWithHolding_eventHolder.emitToListener(i,j,k);
this.$EventEmitterWithHolding_heldEventsEmitDepth--;

if(m[m.length-1])
l.remove();

m.pop();

return l;},{params:[[j,'function','listener'],[k,'?object','context']]});},{module:'EventEmitterWithHolding',line:87,column:24},{params:['function','?object']});h.prototype.





removeAllListeners=__annotator(function(i){
this.$EventEmitterWithHolding_emitter.removeAllListeners(i);},{module:'EventEmitterWithHolding',line:108,column:20});h.prototype.





removeCurrentListener=__annotator(function(){
if(this.$EventEmitterWithHolding_heldEventsEmitDepth){
var i=this.$EventEmitterWithHolding_heldEventsRemovalStack;
i[i.length-1]=true;}else

this.$EventEmitterWithHolding_emitter.removeCurrentListener();},{module:'EventEmitterWithHolding',line:115,column:23});h.prototype.






listeners=__annotator(function(i){
return this.$EventEmitterWithHolding_emitter.listeners(i);},{module:'EventEmitterWithHolding',line:127,column:11});h.prototype.





emit=__annotator(function(i,j,k,l,m,n,o){
this.$EventEmitterWithHolding_emitter.emit(i,j,k,l,m,n,o);},{module:'EventEmitterWithHolding',line:134,column:6});h.prototype.

















emitAndHold=__annotator(function(i,j,k,l,m,n,o){
this.$EventEmitterWithHolding_currentEventToken=this.$EventEmitterWithHolding_eventHolder.holdEvent
(i,
j,k,l,m,n,o);

this.$EventEmitterWithHolding_emitter.emit(i,j,k,l,m,n,o);
this.$EventEmitterWithHolding_currentEventToken=null;},{module:'EventEmitterWithHolding',line:153,column:13});h.prototype.





releaseCurrentEvent=__annotator(function(){
if(this.$EventEmitterWithHolding_currentEventToken!==null){
this.$EventEmitterWithHolding_eventHolder.releaseEvent(this.$EventEmitterWithHolding_currentEventToken);}else
if(!!this.$EventEmitterWithHolding_heldEventsEmitDepth)
this.$EventEmitterWithHolding_eventHolder.releaseCurrentEvent();},{module:'EventEmitterWithHolding',line:165,column:21});h.prototype.







releaseHeldEventType=__annotator(function(i){
this.$EventEmitterWithHolding_eventHolder.releaseEventType(i);},{module:'EventEmitterWithHolding',line:177,column:22});



f.exports=h;},{module:'EventEmitterWithHolding',line:0,column:0,name:'$module_EventEmitterWithHolding'}),null);

/** js/downstream/emitter/internal/EventHolder.js */


















__d('EventHolder',['invariant'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();

'use strict';




function i(){
this.$EventHolder_heldEvents={};
this.$EventHolder_currentEventKey=[];}__annotator(i,{module:'EventHolder',line:26,column:2,name:'EventHolder'});i.prototype.























holdEvent=__annotator(function(j,k,l,m,n,o,p){return __bodyWrapper(this,arguments,function(){
this.$EventHolder_heldEvents[j]=this.$EventHolder_heldEvents[j]||[];
var q=this.$EventHolder_heldEvents[j],
r=
{eventType:j,
index:q.length};

q.push([k,l,m,n,o,p]);
return r;},{returns:'object'});},{module:'EventHolder',line:52,column:11},{returns:'object'});i.prototype.










emitToListener=__annotator(function(j,k,l){return __bodyWrapper(this,arguments,function(){
var m=this.$EventHolder_heldEvents[j];
if(!m)
return;

m.forEach(__annotator(function(n,o){
if(!n)
return;

this.$EventHolder_currentEventKey.push
({eventType:j,
index:o});

k.apply(l,n);
this.$EventHolder_currentEventKey.pop();},{module:'EventHolder',line:76,column:25}).bind(this));},{params:[[k,'function','listener'],[l,'?object','context']]});},{module:'EventHolder',line:71,column:16},{params:['function','?object']});i.prototype.











releaseCurrentEvent=__annotator(function(){

!this.$EventHolder_currentEventKey.length?h(0,
'Not in an emitting cycle; there is no current event'):undefined;

this.releaseEvent(this.$EventHolder_currentEventKey[this.$EventHolder_currentEventKey.length-1]);},{module:'EventHolder',line:97,column:21});i.prototype.








releaseEvent=__annotator(function(j){return __bodyWrapper(this,arguments,function(){
delete this.$EventHolder_heldEvents[j.eventType][j.index];},{params:[[j,'object','token']]});},{module:'EventHolder',line:111,column:14},{params:['object']});i.prototype.







releaseEventType=__annotator(function(j){
this.$EventHolder_heldEvents[j]=[];},{module:'EventHolder',line:120,column:18});



f.exports=i;},{module:'EventHolder',line:0,column:0,name:'$module_EventHolder'}),null);

/** js/downstream/core/toArray.js */


















__d('toArray',['invariant'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();












function i(j){return __bodyWrapper(this,arguments,function(){
var k=j.length;




!(!Array.isArray(j)&&
(typeof j==='object'||typeof j==='function'))?h(0,
'toArray: Array-like object expected'):undefined;



!(typeof k==='number')?h(0,
'toArray: Object needs a length property'):undefined;



!(k===0||
k-1 in j)?h(0,
'toArray: Object should have keys for indices'):undefined;





if(j.hasOwnProperty)

try{return Array.prototype.slice.call(j);}catch(
l){}






var m=Array(k);
for(var n=0;n<k;n++)
m[n]=j[n];

return m;},{params:[[j,'object|function|filelist','obj']],returns:'array'});}__annotator(i,{module:'toArray',line:32,column:0,name:'toArray'},{params:['object|function|filelist'],returns:'array'});


f.exports=i;},{module:'toArray',line:0,column:0,name:'$module_toArray'}),null);

/** js/downstream/core/createArrayFromMixed.js */


















__d('createArrayFromMixed',['toArray'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();


















function i(k){return __bodyWrapper(this,arguments,function(){


return (!!k&&

(typeof k=='object'||typeof k=='function')&&

'length' in k&&

!('setInterval' in k)&&


typeof k.nodeType!='number'&&


(Array.isArray(k)||

'callee' in k||

'item' in k));},{returns:'boolean'});}__annotator(i,{module:'createArrayFromMixed',line:38,column:0,name:'hasArrayNature'},{returns:'boolean'});

























function j(k){return __bodyWrapper(this,arguments,function(){
if(!i(k)){
return [k];}else
if(Array.isArray(k)){
return k.slice();}else

return h(k);},{returns:'array'});}__annotator(j,{module:'createArrayFromMixed',line:83,column:0,name:'createArrayFromMixed'},{returns:'array'});



f.exports=j;},{module:'createArrayFromMixed',line:0,column:0,name:'$module_createArrayFromMixed'}),null);

/** js/modules/Arbiter.js */





__d('Arbiter',['CallbackDependencyManager','ErrorUtils','EventEmitter','EventEmitterWithHolding','EventHolder','createArrayFromMixed','invariant'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o,p;

'use strict';























function q(){
var t=new j();
this.$Arbiter_holder=new r();
this.$Arbiter_emitter=new k(t,this.$Arbiter_holder);
this.$Arbiter_callbackManager=new h();


this.$Arbiter_returnValueStack=[];}__annotator(q,{module:'Arbiter',line:32,column:2,name:'Arbiter'});q.prototype.


















subscribe=__annotator(function(t,u,v){return __bodyWrapper(this,arguments,function(){
t=m(t);
t.forEach(__annotator(function(x){
!(x&&typeof x==='string')?n(0,'Invalid type: %s',x):undefined;},{module:'Arbiter',line:60,column:18}));


!(typeof u==='function')?n(0,'Invalid callback: %s',u):undefined;

v=v||q.SUBSCRIBE_ALL;

!(v===q.SUBSCRIBE_NEW||v===q.SUBSCRIBE_ALL)?n(0,
'Unknown policy: %s',v):undefined;


var w=t.map(__annotator(function(x){
var y=this.$Arbiter_proxyListener.bind(this,u,x);
y.__SMmeta=u.__SMmeta;
if(v===q.SUBSCRIBE_NEW)
return this.$Arbiter_emitter.addListener(x,y);

this.$Arbiter_returnValueStack.push({});
var z=this.$Arbiter_emitter.addRetroactiveListener(x,y);
this.$Arbiter_returnValueStack.pop();
return z;},{module:'Arbiter',line:72,column:34}),
this);
return new s(this,w);},{params:[[t,'string|array<string>','types'],[u,'function','callback'],[v,'?string','policy']],returns:'ArbiterToken'});},{module:'Arbiter',line:58,column:11},{params:['string|array<string>','function','?string'],returns:'ArbiterToken'});q.prototype.


$Arbiter_proxyListener=__annotator(function(t,u,v){
var w=
this.$Arbiter_returnValueStack[this.$Arbiter_returnValueStack.length-1];
if(w[u]===false)
return;


var x=i.applyWithGuard(t,null,[u,v]);
if(x===false)
this.$Arbiter_emitter.releaseCurrentEvent();

w[u]=x;},{module:'Arbiter',line:86,column:16});q.prototype.


unsubscribeCurrentSubscription=__annotator(function(){
this.$Arbiter_emitter.removeCurrentListener();},{module:'Arbiter',line:100,column:32});q.prototype.


releaseCurrentPersistentEvent=__annotator(function(){
this.$Arbiter_emitter.releaseCurrentEvent();},{module:'Arbiter',line:104,column:31});q.prototype.


subscribeOnce=__annotator(function(t,u,v){
var w=this.subscribe(t,__annotator(function(x,y){
this.unsubscribeCurrentSubscription();
return u(x,y);},{module:'Arbiter',line:109,column:38}).bind(this),
v);
return w;},{module:'Arbiter',line:108,column:15});q.prototype.







unsubscribe=__annotator(function(t){return __bodyWrapper(this,arguments,function(){

!t.isForArbiterInstance(this)?n(0,
'Unsubscribing from another instance'):undefined;

t.unsubscribe();},{params:[[t,'ArbiterToken','token']]});},{module:'Arbiter',line:121,column:13},{params:['ArbiterToken']});q.prototype.





















inform=__annotator(function(t,u,v){return __bodyWrapper(this,arguments,function(){
var w=Array.isArray(t);
t=m(t);

v=v||q.BEHAVIOR_EVENT;
var x=
v===q.BEHAVIOR_STATE||
v===q.BEHAVIOR_PERSISTENT;

this.$Arbiter_returnValueStack.push({});

for(var y=0;y<t.length;y++){
var z=t[y];
!z?n(0,'Event types must be non-empty strings: %s',z):undefined;

this.$Arbiter_holder.setHoldingBehavior(z,v);

this.$Arbiter_emitter.emitAndHold(z,u);
this.$Arbiter_updateCallbacks(z,u,x);}


var aa=this.$Arbiter_returnValueStack.pop();
return w?aa:aa[t[0]];},{params:[[t,'string|array<string>','types'],[v,'?string','behavior']]});},{module:'Arbiter',line:148,column:8},{params:['string|array<string>','?string']});q.prototype.












query=__annotator(function(t){return __bodyWrapper(this,arguments,function(){
var u=this.$Arbiter_holder.getHoldingBehavior(t);

!(!u||u===q.BEHAVIOR_STATE)?n(0,
'Querying state of an unstateful event: %s',
t):undefined;

var v=null;
this.$Arbiter_holder.emitToListener(t,__annotator(function(w){v=w;},{module:'Arbiter',line:191,column:38}));
return v;},{params:[[t,'string','type']]});},{module:'Arbiter',line:183,column:7},{params:['string']});q.prototype.














registerCallback=__annotator(function(t,u){return __bodyWrapper(this,arguments,function(){
if(typeof t==='function'){
return this.$Arbiter_callbackManager.registerCallback(t,u);}else

return this.$Arbiter_callbackManager.addDependenciesToExistingCallback
(t,
u);},{params:[[t,'function|number','callbackOrCallbackID'],[u,'array<string>','deps']],returns:'?number'});},{module:'Arbiter',line:207,column:18},{params:['function|number','array<string>'],returns:'?number'});q.prototype.







$Arbiter_updateCallbacks=__annotator(function(t,u,v){
if(u===null)
return;

if(v){
this.$Arbiter_callbackManager.satisfyPersistentDependency(t);}else

this.$Arbiter_callbackManager.satisfyNonPersistentDependency(t);},{module:'Arbiter',line:221,column:18});o=




l;p=o&&o.prototype;Object.assign(r,o);r.prototype=Object.create(o.prototype);r.prototype.constructor=r;r.__superConstructor__=o;
function r(){
p.constructor.call(this);
this.$ArbiterEventHolder_holdingBehaviors={};}__annotator(r,{module:'Arbiter',line:234,column:2,name:'ArbiterEventHolder'});r.prototype.













setHoldingBehavior=__annotator(function(t,u){return __bodyWrapper(this,arguments,function(){
this.$ArbiterEventHolder_holdingBehaviors[t]=u;},{params:[[t,'string','type'],[u,'string','behavior']]});},{module:'Arbiter',line:250,column:20},{params:['string','string']});r.prototype.


getHoldingBehavior=__annotator(function(t){
return this.$ArbiterEventHolder_holdingBehaviors[t];},{module:'Arbiter',line:254,column:20});r.prototype.


holdEvent=__annotator(function(t,u,v,w,x){
var y=this.$ArbiterEventHolder_holdingBehaviors[t];
if(y!==q.BEHAVIOR_PERSISTENT)
this.$ArbiterEventHolder_releaseAllEvents(t);

if(y!==q.BEHAVIOR_EVENT)
return p.holdEvent.call(this,t,u,v,w,x);},{module:'Arbiter',line:258,column:11});r.prototype.



$ArbiterEventHolder_releaseAllEvents=__annotator(function(t){


this.emitToListener(t,this.releaseCurrentEvent,this);},{module:'Arbiter',line:268,column:19});r.prototype.


releaseEvent=__annotator(function(t){
if(t)
p.releaseEvent.call(this,t);},{module:'Arbiter',line:274,column:14});




Object.assign(q,
{SUBSCRIBE_NEW:'new',
SUBSCRIBE_ALL:'all',

BEHAVIOR_EVENT:'event',
BEHAVIOR_STATE:'state',
BEHAVIOR_PERSISTENT:'persistent'});











function s(t,u){'use strict';
this.$ArbiterToken_arbiterInstance=t;
this.$ArbiterToken_subscriptions=u;}__annotator(s,{module:'Arbiter',line:299,column:2,name:'ArbiterToken'});s.prototype.





unsubscribe=__annotator(function(){'use strict';
for(var t=0;t<this.$ArbiterToken_subscriptions.length;t++)
this.$ArbiterToken_subscriptions[t].remove();




this.$ArbiterToken_subscriptions.length=0;},{module:'Arbiter',line:307,column:13});s.prototype.


isForArbiterInstance=__annotator(function(t){'use strict';
!this.$ArbiterToken_arbiterInstance?n(0,'Token has already been unsubscribed'):undefined;
return this.$ArbiterToken_arbiterInstance===t;},{module:'Arbiter',line:317,column:22});




Object.keys(q.prototype).forEach(__annotator(function(t){
q[t]=__annotator(function(){

var u=this instanceof q?this:q;
return q.prototype[t].apply(u,arguments);},{module:'Arbiter',line:325,column:22});},{module:'Arbiter',line:324,column:39}));


q.call(q);

f.exports=q;},{module:'Arbiter',line:0,column:0,name:'$module_Arbiter'}),null);

/** js/downstream/core/CookieCore.js */

















__d('CookieCore',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();





var h=/^.*(\.(facebook|messenger)\..*)$/i,
i=

{set:__annotator(function(k,l,m,n,o){




document.cookie=k+'='+encodeURIComponent(l)+
'; '+(m?'expires='+
new Date(Date.now()+m).toGMTString()+'; ':'')+
'path='+(n||'/')+'; domain='+
window.location.hostname.replace(h,'$1')+
(o?'; secure':'');},{module:'CookieCore',line:27,column:7}),


clear:__annotator(function(k,l){
l=l||'/';
document.cookie=
k+'=; expires=Thu, 01-Jan-1970 00:00:01 GMT; '+
'path='+l+'; domain='+
window.location.hostname.replace(h,'$1');},{module:'CookieCore',line:40,column:9}),


get:__annotator(function(k){



var l=document.cookie.match('(?:^|;\\s*)'+k+'=(.*?)(?:;|$)');
return l?decodeURIComponent(l[1]):l;},{module:'CookieCore',line:48,column:7})},



j;










f.exports=i;},{module:'CookieCore',line:0,column:0,name:'$module_CookieCore'}),null);

/** js/modules/Cookie.js */




__d('Cookie',['CookieCore','Env'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=Object.assign||__annotator(function(m){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var p in o)if(Object.prototype.hasOwnProperty.call(o,p))m[p]=o[p];}return m;},{module:'Cookie',line:0,column:0});








function k(m,n,o,p,q){




if(i.no_cookies&&m!='tpa')
return;


h.set(m,n,o,p,q);}__annotator(k,{module:'Cookie',line:14,column:0,name:'set'});


function l(m,n,o,p,q){
if(window.self!=window.top)






return;

k(m,n,o,p,q);}__annotator(l,{module:'Cookie',line:26,column:0,name:'setIfFirstPartyContext'});


f.exports=j({},
h,
{set:k,
setIfFirstPartyContext:l});},{module:'Cookie',line:0,column:0,name:'$module_Cookie'}),null);

/** js/downstream/env/CurrentUser.js */


















__d('CurrentUser',['Cookie','CurrentUserInitialData'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();




var j=










{getID:__annotator(function(){
return i.USER_ID;},{module:'CurrentUser',line:35,column:9}),







getAccountID:__annotator(function(){
return i.ACCOUNT_ID;},{module:'CurrentUser',line:44,column:16}),





isLoggedIn:__annotator(function(){
return i.USER_ID&&
i.USER_ID!=='0';},{module:'CurrentUser',line:51,column:14}),








isLoggedInNow:__annotator(function(){
if(!j.isLoggedIn())
return false;





if(i.IS_INTERN_SITE)
return true;



if(i.ORIGINAL_USER_ID)
return i.ORIGINAL_USER_ID===h.get('c_user');


return i.USER_ID===h.get('c_user');},{module:'CurrentUser',line:62,column:17}),





isEmployee:__annotator(function(){
return !!i.IS_EMPLOYEE;},{module:'CurrentUser',line:85,column:14}),







hasWorkUser:__annotator(function(){
return !!i.HAS_WORK_USER;},{module:'CurrentUser',line:94,column:15}),





isGray:__annotator(function(){
return !!i.IS_GRAY;},{module:'CurrentUser',line:101,column:10})};




f.exports=j;},{module:'CurrentUser',line:0,column:0,name:'$module_CurrentUser'}),null);

/** js/logging/Miny.js */








__d('Miny',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

var h='Miny1',


i={encode:[],decode:{}},
j='wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');
function k(o){
for(var p=i.encode.length;p<o;p++){

var q=p.toString(32).split('');
q[q.length-1]=j[parseInt(q[q.length-1],32)];
q=q.join('');

i.encode[p]=q;
i.decode[q]=p;}


return i;}__annotator(k,{module:'Miny',line:16,column:0,name:'getIndexMap'});



function l(o){
if(/^$|[~\\]|__proto__/.test(o))return o;


var p=o.match(/\w+|\W+/g),



q={};
for(var r=0;r<p.length;r++)
q[p[r]]=(q[p[r]]||0)+1;




var s=Object.keys(q);
s.sort(__annotator(function(v,w){
return q[v]<q[w]?1:q[w]<q[v]?-1:0;},{module:'Miny',line:47,column:15}));



var t=k(s.length).encode;
for(r=0;r<s.length;r++)
q[s[r]]=t[r];



var u=[];
for(r=0;r<p.length;r++)
u[r]=q[p[r]];


return [h,s.length].
concat(s).
concat(u.join('')).
join('~');}__annotator(l,{module:'Miny',line:31,column:0,name:'encode'});



function m(o){
var p=o.split('~');

if(p.shift()!=h)

return o;

var q=parseInt(p.shift(),10),
r=p.pop();
r=r.match(/[0-9a-v]*[\-w-zA-Z_]/g);

var s=p,

t=k(q).decode,
u=[];
for(var v=0;v<r.length;v++)
u[v]=s[t[r[v]]];


return u.join('');}__annotator(m,{module:'Miny',line:70,column:0,name:'decode'});


var n=
{encode:l,
decode:m};


f.exports=n;},{module:'Miny',line:0,column:0,name:'$module_Miny'}),null);

/** js/downstream/core/QueryString.js */





















__d('QueryString',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();






function h(l){return __bodyWrapper(this,arguments,function(){
var m=[];
Object.keys(l).sort().forEach(__annotator(function(n){
var o=l[n];

if(typeof o==='undefined')
return;


if(o===null){
m.push(n);
return;}


m.push(encodeURIComponent(n)+
'='+
encodeURIComponent(o));},{module:'QueryString',line:31,column:34}));

return m.join('&');},{params:[[l,'object','bag']],returns:'string'});}__annotator(h,{module:'QueryString',line:29,column:0,name:'encode'},{params:['object'],returns:'string'});





function i(l,m){return __bodyWrapper(this,arguments,function(){
var n={};
if(l==='')
return n;


var o=l.split('&');
for(var p=0;p<o.length;p++){
var q=o[p].split('=',2),
r=decodeURIComponent(q[0]);
if(m&&n.hasOwnProperty(r))
throw new URIError('Duplicate key: '+r);

n[r]=q.length===2?
decodeURIComponent(q[1]):
null;}

return n;},{params:[[l,'string','str'],[m,'?boolean','strict']],returns:'object'});}__annotator(i,{module:'QueryString',line:53,column:0,name:'decode'},{params:['string','?boolean'],returns:'object'});







function j(l,m){return __bodyWrapper(this,arguments,function(){
return l+
(l.indexOf('?')!==-1?'&':'?')+
(typeof m==='string'?
m:
k.encode(m));},{params:[[l,'string','url']],returns:'string'});}__annotator(j,{module:'QueryString',line:78,column:0,name:'appendToUrl'},{params:['string'],returns:'string'});


var k=
{encode:h,
decode:i,
appendToUrl:j};


f.exports=k;},{module:'QueryString',line:0,column:0,name:'$module_QueryString'}),null);

/** js/modules/PageEvents.js */




__d('PageEvents',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

var h=




{NATIVE_ONLOAD:'onload/onload',





BIGPIPE_ONLOAD:'onload/onload_callback',




AJAXPIPE_ONLOAD:'ajaxpipe/onload_callback',





NATIVE_DOMREADY:'onload/dom_content_ready',





BIGPIPE_DOMREADY:'onload/domcontent_callback',




AJAXPIPE_DOMREADY:'ajaxpipe/domcontent_callback',


NATIVE_ONBEFOREUNLOAD:'onload/beforeunload',


NATIVE_ONUNLOAD:'onload/unload',






AJAXPIPE_ONUNLOAD:'onload/exit',

AJAXPIPE_SEND:'ajaxpipe/send'};


f.exports=h;},{module:'PageEvents',line:0,column:0,name:'$module_PageEvents'}),null);

/** js/modules/createCancelableFunction.js */





__d('createCancelableFunction',['emptyFunction'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();







function i(j){return __bodyWrapper(this,arguments,function(){
var k=__annotator(function(){for(var l=arguments.length,m=Array(l),n=0;n<l;n++)m[n]=arguments[n];return j.apply(null,m);},{module:'createCancelableFunction',line:15,column:20});
k.cancel=__annotator(function(){j=h;},{module:'createCancelableFunction',line:16,column:23});
return k;},{params:[[j,'function','func']],returns:'function'});}__annotator(i,{module:'createCancelableFunction',line:14,column:0,name:'createCancelableFunction'},{params:['function'],returns:'function'});


f.exports=i;},{module:'createCancelableFunction',line:0,column:0,name:'$module_createCancelableFunction'}),null);

/** js/downstream/performance/performanceAbsoluteNow.js */



























__d('performanceAbsoluteNow',['performance'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



var i;


if(h.now&&
h.timing&&
h.timing.navigationStart){

var j=h.timing.navigationStart;
i=__annotator(function(){
return h.now.apply(h,arguments)+j;},{module:'performanceAbsoluteNow',line:40,column:27});}else


i=Date.now.bind(Date);


f.exports=i;},{module:'performanceAbsoluteNow',line:0,column:0,name:'$module_performanceAbsoluteNow'}),null);

/** js/modules/Run.js */




__d('Run',['Arbiter','ExecutionEnvironment','PageEvents','createCancelableFunction','emptyFunction','performanceAbsoluteNow'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();









var n='onunloadhooks',
o='onafterunloadhooks',
p=h.BEHAVIOR_STATE;
function q(ga){
var ha=b.CavalryLogger;
ha&&ha.getInstance().setTimeStamp(ga);}__annotator(q,{module:'Run',line:18,column:0,name:'clog'});














function r(){
return !window.loading_page_chrome;}__annotator(r,{module:'Run',line:35,column:0,name:'_include_quickling_events_default'});
























function s(ga){
var ha=b.PageHooks;
if(window.domready&&ha){
ha.runHook(ga,'domreadyhooks:late');
return {remove:l};}else

return z('domreadyhooks',ga);}__annotator(s,{module:'Run',line:61,column:0,name:'domreadyRegister'});












function t(ga){
var ha=b.PageHooks;
if(window.loaded&&ha){
var ia=setTimeout(__annotator(function(){
ha.runHook(ga,'onloadhooks:late');},{module:'Run',line:83,column:29}),
0);
return {remove:__annotator(function(){return clearTimeout(ia);},{module:'Run',line:86,column:20})};}else

return z('onloadhooks',ga);}__annotator(t,{module:'Run',line:80,column:0,name:'onloadRegister'});































function u(ga,ha){
if(ha===undefined)
ha=r();

return ha?
z('onbeforeleavehooks',ga):
z('onbeforeunloadhooks',ga);}__annotator(u,{module:'Run',line:120,column:0,name:'onbeforeunloadRegister'});








function v(ga,ha){



if(!window.onunload)
window.onunload=__annotator(function(){
h.inform(j.NATIVE_ONUNLOAD,true,p);},{module:'Run',line:140,column:22});


return z(ga,ha);}__annotator(v,{module:'Run',line:135,column:0,name:'_onunloadRegister'});





function w(ga){
return v(n,ga);}__annotator(w,{module:'Run',line:150,column:0,name:'onunloadRegister'});





function x(ga){
return v(o,ga);}__annotator(x,{module:'Run',line:157,column:0,name:'onafterunloadRegister'});






function y(ga){
return z('onleavehooks',ga);}__annotator(y,{module:'Run',line:165,column:0,name:'onleaveRegister'});


function z(ga,ha){






ha=k(ha);
window[ga]=(window[ga]||[]).concat(ha);


return {remove:__annotator(function(){
ha.cancel();},{module:'Run',line:180,column:10})};}__annotator(z,{module:'Run',line:169,column:0,name:'_addHook'});




function aa(ga){
window[ga]=[];}__annotator(aa,{module:'Run',line:186,column:0,name:'removeHook'});




function ba(){
h.inform(j.NATIVE_DOMREADY,true,p);}__annotator(ba,{module:'Run',line:192,column:0,name:'_domcontentready'});

b._domcontentready=ba;








function ca(){
var ga=document,ha=window;
if(ga.addEventListener){
var ia=/AppleWebKit.(\d+)/.exec(navigator.userAgent);
if(ia&&ia[1]<525){
var ja=setInterval(__annotator(function(){
if(/loaded|complete/.test(ga.readyState)){
ba();
clearInterval(ja);}},{module:'Run',line:209,column:32}),

10);}else

ga.addEventListener("DOMContentLoaded",ba,true);}else{


var ka='javascript:void(0)';
if(ha.location.protocol=='https:')


ka='//:';






ga.write
('<script onreadystatechange="if (this.readyState==\'complete\') {'+
'this.parentNode.removeChild(this);_domcontentready();}" '+
'defer="defer" src="'+ka+'"><\/script\>');}



var la=ha.onload;
ha.onload=__annotator(function(){
q('t_layout');
la&&la();
h.inform(j.NATIVE_ONLOAD,true,p);},{module:'Run',line:238,column:13});


ha.onbeforeunload=__annotator(function(){
var ma={};
h.inform(j.NATIVE_ONBEFOREUNLOAD,ma,p);






if(!ma.warn)
h.inform(j.AJAXPIPE_ONUNLOAD,true);

return ma.warn;},{module:'Run',line:244,column:21});}__annotator(ca,{module:'Run',line:204,column:0,name:'_bootstrapEventHandlers'});



var da=h.registerCallback(__annotator(function(){
q('t_onload');
h.inform
(j.BIGPIPE_ONLOAD,

{ts:m()},

p);},{module:'Run',line:260,column:47}),

[j.NATIVE_ONLOAD]),

ea=h.registerCallback(__annotator(function(){
q('t_domcontent');



var ga={timeTriggered:Date.now()};
h.inform(j.BIGPIPE_DOMREADY,ga,p);},{module:'Run',line:271,column:51}),
[j.NATIVE_DOMREADY]);

if(i.canUseDOM)
ca();


var fa=
{onLoad:s,
onAfterLoad:t,
onLeave:y,
onBeforeUnload:u,
onUnload:w,
onAfterUnload:x,

__domContentCallback:ea,
__onloadCallback:da,

__removeHook:aa};


f.exports=fa;},{module:'Run',line:0,column:0,name:'$module_Run'}),null);

/** js/downstream/useragent/VersionRange.js */

















__d('VersionRange',['invariant'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();

'use strict';



var i=/\./,
j=/\|\|/,
k=/\s+\-\s+/,
l=/^(<=|<|=|>=|~>|~|>|)?\s*(.+)/,
m=/^(\d*)(.*)/;









function n(fa,ga){
var ha=fa.split(j);

if(ha.length>1){
return ha.some(__annotator(function(ia){return ea.contains(ia,ga);},{module:'VersionRange',line:42,column:28}));}else{

fa=ha[0].trim();
return o(fa,ga);}}__annotator(n,{module:'VersionRange',line:38,column:0,name:'checkOrExpression'});











function o(fa,ga){
var ha=fa.split(k);


!(ha.length>0&&ha.length<=2)?h(0,
'the "-" operator expects exactly 2 operands'):undefined;


if(ha.length===1){
return p(ha[0],ga);}else{

var ia=ha[0],ja=ha[1];

!(y(ia)&&y(ja))?h(0,
'operands to the "-" operator must be simple (no modifiers)'):undefined;



return (p('>='+ia,ga)&&
p('<='+ja,ga));}}__annotator(o,{module:'VersionRange',line:57,column:0,name:'checkRangeExpression'});












function p(fa,ga){
fa=fa.trim();
if(fa==='')
return true;


var ha=ga.split(i),ia=
w(fa),ja=ia.modifier,ka=ia.rangeComponents;
switch(ja){
case '<':
return q(ha,ka);
case '<=':
return r(ha,ka);
case '>=':
return t(ha,ka);
case '>':
return u(ha,ka);
case '~':
case '~>':
return v(ha,ka);

default:return s(ha,ka);}}__annotator(p,{module:'VersionRange',line:89,column:0,name:'checkSimpleExpression'});










function q(fa,ga){
return da(fa,ga)===-1;}__annotator(q,{module:'VersionRange',line:121,column:0,name:'checkLessThan'});









function r(fa,ga){
var ha=da(fa,ga);
return ha===-1||ha===0;}__annotator(r,{module:'VersionRange',line:132,column:0,name:'checkLessThanOrEqual'});









function s(fa,ga){
return da(fa,ga)===0;}__annotator(s,{module:'VersionRange',line:144,column:0,name:'checkEqual'});









function t(fa,ga){
var ha=da(fa,ga);
return ha===1||ha===0;}__annotator(t,{module:'VersionRange',line:155,column:0,name:'checkGreaterThanOrEqual'});









function u(fa,ga){
return da(fa,ga)===1;}__annotator(u,{module:'VersionRange',line:167,column:0,name:'checkGreaterThan'});











function v(fa,ga){
var ha=ga.slice(),
ia=ga.slice();

if(ia.length>1)
ia.pop();

var ja=ia.length-1,
ka=parseInt(ia[ja],10);
if(x(ka))
ia[ja]=ka+1+'';



return (t(fa,ha)&&
q(fa,ia));}__annotator(v,{module:'VersionRange',line:180,column:0,name:'checkApproximateVersion'});













function w(fa){
var ga=fa.split(i),
ha=ga[0].match(l);
!ha?h(0,'expected regex to match but it did not'):undefined;


return {modifier:ha[1],
rangeComponents:[ha[2]].concat(ga.slice(1))};}__annotator(w,{module:'VersionRange',line:209,column:0,name:'getModifierAndComponents'});









function x(fa){
return !isNaN(fa)&&isFinite(fa);}__annotator(x,{module:'VersionRange',line:226,column:0,name:'isNumber'});









function y(fa){
return !w(fa).modifier;}__annotator(y,{module:'VersionRange',line:237,column:0,name:'isSimpleVersion'});








function z(fa,ga){
for(var ha=fa.length;ha<ga;ha++)
fa[ha]='0';}__annotator(z,{module:'VersionRange',line:247,column:0,name:'zeroPad'});
















function aa(fa,ga){
fa=fa.slice();
ga=ga.slice();

z(fa,ga.length);


for(var ha=0;ha<ga.length;ha++){
var ia=ga[ha].match(/^[x*]$/i);
if(ia){
ga[ha]=fa[ha]='0';


if(ia[0]==='*'&&ha===ga.length-1)
for(var ja=ha;ja<fa.length;ja++)
fa[ja]='0';}}





z(ga,fa.length);

return [fa,ga];}__annotator(aa,{module:'VersionRange',line:266,column:0,name:'normalizeVersions'});












function ba(fa,ga){
var ha=fa.match(m)[1],
ia=ga.match(m)[1],
ja=parseInt(ha,10),
ka=parseInt(ia,10);

if(x(ja)&&x(ka)&&ja!==ka){
return ca(ja,ka);}else

return ca(fa,ga);}__annotator(ba,{module:'VersionRange',line:302,column:0,name:'compareNumeric'});











function ca(fa,ga){
!(typeof fa===typeof ga)?h(0,'"a" and "b" must be of the same type'):undefined;

if(fa>ga){
return 1;}else
if(fa<ga){
return -1;}else

return 0;}__annotator(ca,{module:'VersionRange',line:323,column:0,name:'compare'});











function da(fa,ga){var ha=
aa(fa,ga),ia=ha[0],ja=ha[1];

for(var ka=0;ka<ja.length;ka++){
var la=ba(ia[ka],ja[ka]);
if(la)
return la;}



return 0;}__annotator(da,{module:'VersionRange',line:343,column:0,name:'compareComponents'});


var ea=































{contains:__annotator(function(fa,ga){
return n(fa.trim(),ga.trim());},{module:'VersionRange',line:388,column:10})};



f.exports=ea;},{module:'VersionRange',line:0,column:0,name:'$module_VersionRange'}),null);

/** js/downstream/functional/mapObject.js */

















__d('mapObject',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

'use strict';

var h=Object.prototype.hasOwnProperty;























function i(j,k,l){
if(!j)
return null;

var m={};
for(var n in j)
if(h.call(j,n))
m[n]=k.call(l,j[n],n,j);


return m;}__annotator(i,{module:'mapObject',line:46,column:0,name:'mapObject'});


f.exports=i;},{module:'mapObject',line:0,column:0,name:'$module_mapObject'}),null);

/** js/downstream/react/shared/utils/memoizeStringOnly.js */























__d('memoizeStringOnly',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

'use strict';







function h(i){
var j={};
return __annotator(function(k){
if(!j.hasOwnProperty(k))
j[k]=i.call(this,k);

return j[k];},{module:'memoizeStringOnly',line:36,column:9});}__annotator(h,{module:'memoizeStringOnly',line:34,column:0,name:'memoizeStringOnly'});



f.exports=h;},{module:'memoizeStringOnly',line:0,column:0,name:'$module_memoizeStringOnly'}),null);

/** js/downstream/useragent/UserAgent.js */

















__d('UserAgent',['UserAgentData','VersionRange','mapObject','memoizeStringOnly'],__annotator(function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();

'use strict';
















function l(o,p,q,r){

if(o===q)
return true;



if(!q.startsWith(o))
return false;



var s=q.slice(o.length);
if(p){
s=r?r(s):s;
return i.contains(s,p);}


return false;}__annotator(l,{module:'UserAgent',line:37,column:0,name:'compare'});











function m(o){
if(h.platformName==='Windows')
return o.replace(/^\s*NT/,'');


return o;}__annotator(m,{module:'UserAgent',line:67,column:0,name:'normalizePlatformVersion'});






var n=











































{isBrowser:__annotator(function(o){
return l
(h.browserName,
h.browserFullVersion,
o);},{module:'UserAgent',line:123,column:11}),











isBrowserArchitecture:__annotator(function(o){
return l
(h.browserArchitecture,
null,
o);},{module:'UserAgent',line:139,column:23}),



























isDevice:__annotator(function(o){
return l(h.deviceName,null,o);},{module:'UserAgent',line:171,column:10}),
























isEngine:__annotator(function(o){
return l
(h.engineName,
h.engineVersion,
o);},{module:'UserAgent',line:197,column:10}),






































isPlatform:__annotator(function(o){
return l
(h.platformName,
h.platformFullVersion,
o,
m);},{module:'UserAgent',line:240,column:12}),











isPlatformArchitecture:__annotator(function(o){
return l
(h.platformArchitecture,
null,
o);},{module:'UserAgent',line:257,column:24})};





f.exports=j(n,k);},{module:'UserAgent',line:0,column:0,name:'$module_UserAgent'}),null);

/** js/downstream/env/CurrentCommunity.js */


















__d('CurrentCommunity',['CurrentCommunityInitialData'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();






var i=




{getID:__annotator(function(){
return h.COMMUNITY_ID||'0';},{module:'CurrentCommunity',line:31,column:9})};



f.exports=i;},{module:'CurrentCommunity',line:0,column:0,name:'$module_CurrentCommunity'}),null);

/** js/downstream/dtsg/DTSG.js */


















__d('DTSG',['DTSGInitialData'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



var i=h.token||null,

j=

{setToken:__annotator(function(k){return __bodyWrapper(this,arguments,function(){
i=k;},{params:[[k,'?string','newToken']]});},{module:'DTSG',line:27,column:12},{params:['?string']}),


getToken:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return i;},{returns:'?string'});},{module:'DTSG',line:31,column:12},{returns:'?string'})};




f.exports=j;},{module:'DTSG',line:0,column:0,name:'$module_DTSG'}),null);

/** js/downstream/bit_map/BitMap.js */

















__d('BitMap',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();


var h='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';


function i(){'use strict';
this.$BitMap_bits=[];}__annotator(i,{module:'BitMap',line:24,column:2,name:'BitMap'});i.prototype.


set=__annotator(function(l){'use strict';
this.$BitMap_bits[l]=1;
return this;},{module:'BitMap',line:28,column:5});i.prototype.







toString=__annotator(function(){'use strict';
var l=[];
for(var m=0;m<this.$BitMap_bits.length;m++)
l.push(this.$BitMap_bits[m]?1:0);

return l.length?k(l.join('')):'';},{module:'BitMap',line:38,column:10});i.prototype.












toCompressedString=__annotator(function(){'use strict';
if(this.$BitMap_bits.length===0)
return '';


var l=[],
m=1,
n=this.$BitMap_bits[0]||0,
o=n.toString(2);

for(var p=1;p<this.$BitMap_bits.length;p++){
var q=this.$BitMap_bits[p]||0;
if(q===n){
m++;}else{

l.push(j(m));
n=q;
m=1;}}



if(m)
l.push(j(m));


return k(o+l.join(''));},{module:'BitMap',line:56,column:20});



function j(l){
var m=l.toString(2),
n='0'.repeat(m.length-1);
return n+m;}__annotator(j,{module:'BitMap',line:85,column:0,name:'eliasGammaCode'});


function k(l){


var m=(l+'00000').match(/[01]{6}/g),
n='';
for(var o=0;o<m.length;o++)
n+=h[parseInt(m[o],2)];

return n;}__annotator(k,{module:'BitMap',line:91,column:0,name:'encodeBitString'});


f.exports=i;},{module:'BitMap',line:0,column:0,name:'$module_BitMap'}),null);

/** js/downstream/serverjs/replaceTransportMarkers.js */

















__d('replaceTransportMarkers',['ge'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();
















function i(j,k,l){
var m=typeof l!=='undefined'?k[l]:k,
n;
if(Array.isArray(m)){
for(n=0;n<m.length;n++)
i(j,m,n);}else

if(m&&typeof m=='object')
if(m.__m){


k[l]=c.call(null,m.__m);}else
if(m.__e){
k[l]=h(m.__e);}else
if(m.__rel){
k[l]=j;}else

for(var o in m)
i(j,m,o);}__annotator(i,{module:'replaceTransportMarkers',line:35,column:0,name:'replaceTransportMarkers'});





f.exports=i;},{module:'replaceTransportMarkers',line:0,column:0,name:'$module_replaceTransportMarkers'}),null);

/** js/downstream/serverjs/ServerJSDefine.js */

















__d('ServerJSDefine',['BitMap','replaceTransportMarkers'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();





var j=new h(),

k=

{getLoadedModuleHash:__annotator(function(){
return j.toCompressedString();},{module:'ServerJSDefine',line:28,column:23}),


handleDefine:__annotator(function(l,m,n,o,p){
j.set(o);
define(l,m,__annotator(function(){
i(p,n);
return n;},{module:'ServerJSDefine',line:34,column:29}));},{module:'ServerJSDefine',line:32,column:16}),



handleDefines:__annotator(function(l,m){
l.map(__annotator(function(n){
if(m)
n.push(m);

k.handleDefine.apply(null,n);},{module:'ServerJSDefine',line:41,column:16}));},{module:'ServerJSDefine',line:40,column:17})};





f.exports=k;},{module:'ServerJSDefine',line:0,column:0,name:'$module_ServerJSDefine'}),null);

/** js/downstream/core/URIRFC3986.js */


















__d('URIRFC3986',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

var h=new RegExp
('^'+
'([^:/?#]+:)?'+
'(//'+
'([^\\\\/?#@]*@)?'+
'('+
'\\[[A-Fa-f0-9:.]+\\]|'+
'[^\\/?#:]*'+
')'+
'(:[0-9]*)?'+
')?'+
'([^?#]*)'+
'(\\?[^#]*)?'+
'(#.*)?'),








i=








{parse:__annotator(function(j){return __bodyWrapper(this,arguments,function(){
if(j.trim()==='')
return null;

var k=j.match(h),
l={};




l.uri=k[0]?k[0]:null;
l.scheme=k[1]?
k[1].substr(0,k[1].length-1):
null;
l.authority=k[2]?k[2].substr(2):null;
l.userinfo=k[3]?
k[3].substr(0,k[3].length-1):
null;
l.host=k[2]?k[4]:null;
l.port=k[5]?
k[5].substr(1)?parseInt(k[5].substr(1),10):null:
null;
l.path=k[6]?k[6]:null;
l.query=k[7]?k[7].substr(1):null;
l.fragment=k[8]?k[8].substr(1):null;
l.isGenericURI=l.authority===null&&!!l.scheme;
return l;},{params:[[j,'string','uriString']],returns:'?object'});},{module:'URIRFC3986',line:52,column:9},{params:['string'],returns:'?object'})};



f.exports=i;},{module:'URIRFC3986',line:0,column:0,name:'$module_URIRFC3986'}),null);

/** js/downstream/core/createObjectFrom.js */


















__d('createObjectFrom',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();
























function h
(i,
j){







var k={},
l=Array.isArray(j);
if(j===undefined)
j=true;


for(var m=i.length-1;m>=0;m--)
k[i[m]]=l?j[m]:j;

return k;}__annotator(h,{module:'createObjectFrom',line:44,column:0,name:'createObjectFrom'});


f.exports=h;},{module:'createObjectFrom',line:0,column:0,name:'$module_createObjectFrom'}),null);

/** js/downstream/core/URISchemes.js */


















__d('URISchemes',['createObjectFrom'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



var i=h
(['fb',
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
'sftp']),


j=





{isAllowed:__annotator(function(k){return __bodyWrapper(this,arguments,function(){
if(!k)
return true;

return i.hasOwnProperty(k.toLowerCase());},{params:[[k,'?string','schema']],returns:'boolean'});},{module:'URISchemes',line:56,column:13},{params:['?string'],returns:'boolean'})};



f.exports=j;},{module:'URISchemes',line:0,column:0,name:'$module_URISchemes'}),null);

/** js/downstream/core/URIBase.js */

















__d('URIBase',['URIRFC3986','URISchemes','ex','invariant'],__annotator(function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();







var l=new RegExp


('[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f'+

'\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF'+

'\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'),


m=new RegExp

('^(?:[^/]*:|'+

'[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');














function n(q,r,s,t){
if(!r)
return true;



if(r instanceof p){
q.setProtocol(r.getProtocol());
q.setDomain(r.getDomain());
q.setPort(r.getPort());
q.setPath(r.getPath());
q.setQueryData
(t.deserialize
(t.serialize(r.getQueryData())));


q.setFragment(r.getFragment());
q.setForceFragmentSeparator(r.getForceFragmentSeparator());
return true;}


r=r.toString().trim();
var u=h.parse(r)||{};
if(!s&&!i.isAllowed(u.scheme))
return false;

q.setProtocol(u.scheme||'');
if(!s&&l.test(u.host))
return false;

q.setDomain(u.host||'');
q.setPort(u.port||'');
q.setPath(u.path||'');
if(s){
q.setQueryData(t.deserialize(u.query)||{});}else


try{q.setQueryData(t.deserialize(u.query)||{});}catch(
v){
return false;}


q.setFragment(u.fragment||'');


if(u.fragment==='')
q.setForceFragmentSeparator(true);


if(u.userinfo!==null)
if(s){
throw new Error(j
('URI.parse: invalid URI (userinfo is not allowed in a URI): %s',
q.toString()));}else


return false;





if(!q.getDomain()&&q.getPath().indexOf('\\')!==-1)
if(s){
throw new Error(j
('URI.parse: invalid URI (no domain but multiple back-slashes): %s',
q.toString()));}else


return false;





if(!q.getProtocol()&&m.test(r))
if(s){
throw new Error(j
('URI.parse: invalid URI (unsafe protocol-relative URLs): %s',
q.toString()));}else


return false;


return true;}__annotator(n,{module:'URIBase',line:55,column:0,name:'parse'});





var o=[];
































function p(q,r){'use strict';
!r?k(0,'no serializer set'):undefined;
this.$URIBase_serializer=r;

this.$URIBase_protocol='';
this.$URIBase_domain='';
this.$URIBase_port='';
this.$URIBase_path='';
this.$URIBase_fragment='';
this.$URIBase_queryData={};
this.$URIBase_forceFragmentSeparator=false;
n(this,q,true,r);}__annotator(p,{module:'URIBase',line:179,column:2,name:'URIBase'});p.prototype.








setProtocol=__annotator(function(q){'use strict';

!i.isAllowed(q)?k(0,
'"%s" is not a valid protocol for a URI.',q):undefined;

this.$URIBase_protocol=q;
return this;},{module:'URIBase',line:199,column:13});p.prototype.







getProtocol=__annotator(function(q){'use strict';
return this.$URIBase_protocol;},{module:'URIBase',line:213,column:13});p.prototype.








setSecure=__annotator(function(q){'use strict';
return this.setProtocol(q?'https':'http');},{module:'URIBase',line:223,column:11});p.prototype.







isSecure=__annotator(function(){'use strict';
return this.getProtocol()==='https';},{module:'URIBase',line:232,column:10});p.prototype.








setDomain=__annotator(function(q){'use strict';




if(l.test(q))
throw new Error(j
('URI.setDomain: unsafe domain specified: %s for url %s',
q,
this.toString()));



this.$URIBase_domain=q;
return this;},{module:'URIBase',line:242,column:11});p.prototype.







getDomain=__annotator(function(){'use strict';
return this.$URIBase_domain;},{module:'URIBase',line:264,column:11});p.prototype.








setPort=__annotator(function(q){'use strict';
this.$URIBase_port=q;
return this;},{module:'URIBase',line:274,column:9});p.prototype.







getPort=__annotator(function(){'use strict';
return this.$URIBase_port;},{module:'URIBase',line:284,column:9});p.prototype.








setPath=__annotator(function(q){'use strict';







this.$URIBase_path=q;
return this;},{module:'URIBase',line:294,column:9});p.prototype.







getPath=__annotator(function(){'use strict';
return this.$URIBase_path;},{module:'URIBase',line:311,column:9});p.prototype.









addQueryData=__annotator(function(q,r){'use strict';

if(Object.prototype.toString.call(q)==='[object Object]'){
Object.assign(this.$URIBase_queryData,q);}else

this.$URIBase_queryData[q]=r;

return this;},{module:'URIBase',line:322,column:14});p.prototype.









setQueryData=__annotator(function(q){'use strict';
this.$URIBase_queryData=q;
return this;},{module:'URIBase',line:339,column:14});p.prototype.







getQueryData=__annotator(function(){'use strict';
return this.$URIBase_queryData;},{module:'URIBase',line:349,column:14});p.prototype.








removeQueryData=__annotator(function(q){'use strict';
if(!Array.isArray(q))
q=[q];

for(var r=0,s=q.length;r<s;++r)
delete this.$URIBase_queryData[q[r]];

return this;},{module:'URIBase',line:359,column:17});p.prototype.








setFragment=__annotator(function(q){'use strict';
this.$URIBase_fragment=q;

this.setForceFragmentSeparator(false);
return this;},{module:'URIBase',line:375,column:13});p.prototype.







getFragment=__annotator(function(){'use strict';
return this.$URIBase_fragment;},{module:'URIBase',line:387,column:13});p.prototype.

















setForceFragmentSeparator=__annotator(function(q){'use strict';
this.$URIBase_forceFragmentSeparator=q;
return this;},{module:'URIBase',line:406,column:27});p.prototype.








getForceFragmentSeparator=__annotator(function(){'use strict';
return this.$URIBase_forceFragmentSeparator;},{module:'URIBase',line:417,column:27});p.prototype.







isEmpty=__annotator(function(){'use strict';

return !(this.getPath()||
this.getProtocol()||
this.getDomain()||
this.getPort()||
Object.keys(this.getQueryData()).length>0||
this.getFragment());},{module:'URIBase',line:426,column:9});p.prototype.








toString=__annotator(function(){'use strict';
var q=this;
for(var r=0;r<o.length;r++)
q=o[r](q);

return q.$URIBase_toStringImpl();},{module:'URIBase',line:442,column:10});p.prototype.








$URIBase_toStringImpl=__annotator(function(){'use strict';
var q='',
r=this.getProtocol();
if(r)
q+=r+'://';

var s=this.getDomain();
if(s)
q+=s;

var t=this.getPort();
if(t)
q+=':'+t;





var u=this.getPath();
if(u){
q+=u;}else
if(q)
q+='/';

var v=this.$URIBase_serializer.serialize(this.getQueryData());
if(v)
q+='?'+v;

var w=this.getFragment();
if(w){
q+='#'+w;}else
if(this.getForceFragmentSeparator())
q+='#';

return q;},{module:'URIBase',line:456,column:15});p.









registerFilter=__annotator(function(q){'use strict';
o.push(q);},{module:'URIBase',line:500,column:23});p.prototype.






getOrigin=__annotator(function(){'use strict';
var q=this.getPort();
return this.getProtocol()+
'://'+
this.getDomain()+
(q?':'+q:'');},{module:'URIBase',line:508,column:11});













p.isValidURI=__annotator(function(q,r){
return n(new p(null,r),q,false,r);},{module:'URIBase',line:527,column:21});


f.exports=p;},{module:'URIBase',line:0,column:0,name:'$module_URIBase'}),null);

/** js/downstream/core/PHPQuerySerializer.js */

















__d('PHPQuerySerializer',['invariant'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();













function i(p){
return j(p,null);}__annotator(i,{module:'PHPQuerySerializer',line:32,column:0,name:'serialize'});


function j(p,q){

q=q||'';
var r=[];

if(p===null||p===undefined){
r.push(k(q));}else
if(typeof p=='object'){


!!('nodeName' in p||'nodeType' in p)?h(0,
'PHPQuerySerializer serializing a DOM element, not good ...'):undefined;


for(var s in p)
if(p.hasOwnProperty(s)&&p[s]!==undefined)
r.push(j
(p[s],
q?q+'['+s+']':s));}else





r.push(k(q)+'='+k(p));


return r.join('&');}__annotator(j,{module:'PHPQuerySerializer',line:36,column:0,name:'_serializeElement'});











function k(p){
return encodeURIComponent(p).replace(/%5D/g,']').replace(/%5B/g,'[');}__annotator(k,{module:'PHPQuerySerializer',line:75,column:0,name:'encodeComponent'});





var l=/^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;








function m(p){
if(!p)
return {};


var q={};





p=p.replace(/%5B/ig,'[').replace(/%5D/ig,']');

p=p.split('&');

var r=Object.prototype.hasOwnProperty;

for(var s=0,t=p.length;s<t;s++){
var u=p[s].match(l);

if(!u){
var v=p[s].split('=');
q[n(v[0])]=
v[1]===undefined?null:n(v[1]);}else{

var w=u[2].split(/\]\[|\[|\]/).slice(0,-1),
x=u[1],
y=n(u[3]||'');
w[0]=x;



var z=q;
for(var aa=0;aa<w.length-1;aa++)
if(w[aa]){
if(!r.call(z,w[aa])){
var ba=w[aa+1]&&!w[aa+1].match(/^\d{1,3}$/)?
{}:[];
z[w[aa]]=ba;
if(z[w[aa]]!==ba)




return q;}



z=z[w[aa]];}else{

if(w[aa+1]&&!w[aa+1].match(/^\d{1,3}$/)){
z.push({});}else

z.push([]);

z=z[z.length-1];}



if(z instanceof Array&&w[w.length-1]===''){
z.push(y);}else

z[w[w.length-1]]=y;}}



return q;}__annotator(m,{module:'PHPQuerySerializer',line:91,column:0,name:'deserialize'});











function n(p){
return decodeURIComponent(p.replace(/\+/g,' '));}__annotator(n,{module:'PHPQuerySerializer',line:169,column:0,name:'decodeComponent'});


var o=
{serialize:i,
encodeComponent:k,
deserialize:m,
decodeComponent:n};


f.exports=o;},{module:'PHPQuerySerializer',line:0,column:0,name:'$module_PHPQuerySerializer'}),null);

/** js/downstream/request/getAsyncParams.js */


















__d('getAsyncParams',['CurrentCommunity','CurrentUser','DTSG','ISB','LSD','ServerJSDefine','SiteData','URIBase','PHPQuerySerializer'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){if(c.__markCompiled)c.__markCompiled();











var q=1;







function r(s){return __bodyWrapper(this,arguments,function(){
var t=
{__user:i.getID(),
__a:1,




__dyn:m.getLoadedModuleHash(),








__req:(q++).toString(36)},


u=new o
(window.location.href,
p).
getQueryData();

for(var v in u)
if(u.hasOwnProperty(v))
if(v==='locale'||v.substr(0,3)==='mh_')
t[v]=u[v];






if(s=='POST'){
if(j.getToken()){
t.fb_dtsg=j.getToken();


var w='';
for(var x=0;x<t.fb_dtsg.length;x++)
w+=t.fb_dtsg.charCodeAt(x);

t.ttstamp='2'+w;}


if(l.token)
t.lsd=l.token;}





if(k.token)
t.fb_isb=k.token;


if(n.revision)
t.__rev=n.revision;


if(h.getID()!=='0')
t.__cid=h.getID();


return t;},{params:[[s,'string','method']],returns:'object'});}__annotator(r,{module:'getAsyncParams',line:39,column:0,name:'getAsyncParams'},{params:['string'],returns:'object'});


f.exports=r;},{module:'getAsyncParams',line:0,column:0,name:'$module_getAsyncParams'}),null);

/** js/downstream/request/getSameOriginTransport.js */

















__d('getSameOriginTransport',['ex'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



function i(){

try{return b.XMLHttpRequest?
new b.XMLHttpRequest():
new ActiveXObject("MSXML2.XMLHTTP.3.0");}catch(
j){
throw new Error(h('getSameOriginTransport: %s',j.message));}}__annotator(i,{module:'getSameOriginTransport',line:22,column:0,name:'getSameOriginTransport'});



f.exports=i;},{module:'getSameOriginTransport',line:0,column:0,name:'$module_getSameOriginTransport'}),null);

/** js/downstream/error/wrapFunction.js */


























__d('wrapFunction',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

var h={};
function i(j,k,l){return __bodyWrapper(this,arguments,function(){

k=k||'default';

return __annotator(function(){
var m=k in h?
h[k](j,l):
j;

return m.apply(this,arguments);},{module:'wrapFunction',line:34,column:9});},{params:[[j,'function','fn'],[k,'?string','type'],[l,'?string','source']],returns:'function'});}__annotator(i,{module:'wrapFunction',line:30,column:0,name:'wrapFunction'},{params:['function','?string','?string'],returns:'function'});



i.setWrapper=__annotator(function(j,k){return __bodyWrapper(this,arguments,function(){
k=k||'default';
h[k]=j;},{params:[[j,'function','fn'],[k,'?string','type']]});},{module:'wrapFunction',line:43,column:26},{params:['function','?string']});


f.exports=i;},{module:'wrapFunction',line:0,column:0,name:'$module_wrapFunction'}),null);

/** js/downstream/core/TimeSlice.js */

















__d('TimeSlice',['ErrorUtils','LogBuffer','invariant','performanceAbsoluteNow','wrapFunction'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();var m=Object.assign||__annotator(function(s){for(var t=1;t<arguments.length;t++){var u=arguments[t];for(var v in u)if(Object.prototype.hasOwnProperty.call(u,v))s[v]=u[v];}return s;},{module:'TimeSlice',line:0,column:0}),













n=false,
o,
p=[],
q,

r=





{guard:__annotator(function(s,t){
var u='TimeSlice'+(t?': '+t:''),
v='TimeSlice Task'+(t?': '+t:'');

return __annotator(function w(){
if(n)

return s.apply(this,arguments);


var x=k();

n=true;
o=t;
p.length=0;
q=0;

var y=h.
applyWithGuard(s,this,arguments,null,u);

while(p.length>0){
var z=p.shift();
q=z.depth;
h.
applyWithGuard(z.fn,b,null,null,v);}


n=false;

var aa=k();

i.write('time_slice',m
({begin:x,
end:aa,
guard:t},
s.__SMmeta));



return y;},{module:'TimeSlice',line:47,column:11,name:'timeSliceGuarded'});},{module:'TimeSlice',line:43,column:9}),




enqueue:__annotator(function(s){

!n?j(0,
'TimeSlice can\'t append tasks in non-guarded context'):undefined;


!(q<1000)?j(0,
'TimeSlice shouldn\'t be used for infinite deferred recursion'):undefined;

p.push
({fn:s,
depth:q+1});},{module:'TimeSlice',line:87,column:11}),




inGuard:__annotator(function(){
return n;},{module:'TimeSlice',line:103,column:11})};



r.getContext=__annotator(function(){
if(!n)
return null;


return {name:o,
depth:q};},{module:'TimeSlice',line:108,column:23});



l.setWrapper(r.guard,'entry');
b.TimeSlice=r;

f.exports=r;},{module:'TimeSlice',line:0,column:0,name:'$module_TimeSlice'}),null);

/** js/downstream/page/setTimeoutAcrossTransitions.js */

















__d('setTimeoutAcrossTransitions',['TimeSlice'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();




var i=b.setTimeout.nativeBackup||b.setTimeout;





f.exports=__annotator(function(){for(var j=arguments.length,k=Array(j),l=0;l<j;l++)k[l]=arguments[l];
k[0]=h.guard(k[0],'setTimeout');

return Function.prototype.apply.call(i,b,k);},{module:'setTimeoutAcrossTransitions',line:29,column:17});},{module:'setTimeoutAcrossTransitions',line:0,column:0,name:'$module_setTimeoutAcrossTransitions'}),null);

/** js/logging/BanzaiAdapter.js */






__d('BanzaiAdapter',['Arbiter','CurrentUser','Miny','QueryString','Run','SiteData','UserAgent','getAsyncParams','getSameOriginTransport','setTimeoutAcrossTransitions','BanzaiConfig'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){if(c.__markCompiled)c.__markCompiled();













var s=[],
t=new h(),







u='/ajax/bz',

v={},



w=v.adapter=
{config:r,

getUserID:__annotator(function(){
return i.getID();},{module:'BanzaiAdapter',line:39,column:13}),


inform:__annotator(function(x){
t.inform(x);},{module:'BanzaiAdapter',line:43,column:10}),


subscribe:__annotator(function(x,y){
t.subscribe(x,y);},{module:'BanzaiAdapter',line:47,column:13}),


cleanup:__annotator(function(){
var x=s;
s=[];
x.forEach(__annotator(function(y){
if(y.readyState<4)
y.abort();},{module:'BanzaiAdapter',line:54,column:17}));},{module:'BanzaiAdapter',line:51,column:11}),




readyToSend:__annotator(function(){


return n.isBrowser('IE <= 8')||navigator.onLine;},{module:'BanzaiAdapter',line:61,column:15}),


send:__annotator(function(x,y,z,aa){
var ba='POST',
ca=p();
ca.open(ba,u,true);
ca.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

ca.onreadystatechange=__annotator(function(){
if(ca.readyState>=4){






var ga;

try{ga=ca.status;}catch(
ha){
ga=0;}









if(ga==200){
if(y)
y();

if(!aa)
w.inform(v.OK);}else{


if(z)
z(ga);

if(!aa)
w.inform(v.ERROR);}}},{module:'BanzaiAdapter',line:73,column:29});






q(__annotator
(function(){
if(ca.readyState<4)
ca.abort();},{module:'BanzaiAdapter',line:115,column:6}),


v.SEND_TIMEOUT);


s.push(ca);


var da=o(ba);
da.q=JSON.stringify(x);
da.ts=Date.now();
da.ph=m.push_phase;

if(v.FBTRACE)
da.fbtrace=v.FBTRACE;


if(v.isEnabled('miny_compression')){
var ea=Date.now(),
fa=j.encode(da.q);


if(fa.length<da.q.length){
da.q=fa;
da.miny_encode_ms=Date.now()-ea;}}



ca.send(k.encode(da));},{module:'BanzaiAdapter',line:67,column:8}),


setHooks:__annotator(function(){









l.onAfterUnload(v._unload);},{module:'BanzaiAdapter',line:149,column:12}),


onUnload:__annotator(function(x){
l.onAfterUnload(x);},{module:'BanzaiAdapter',line:162,column:12})};



f.exports=v;},{module:'BanzaiAdapter',line:0,column:0,name:'$module_BanzaiAdapter'}),null);

/** js/lib/FBJSON.js */










__d("FBJSON",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

f.exports=
{parse:JSON.parse,
stringify:JSON.stringify};},{module:"FBJSON",line:0,column:0,name:"$module_FBJSON"}),null);

/** js/downstream/core/isEmpty.js */

















__d('isEmpty',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();






function h(i){
if(Array.isArray(i)){
return i.length===0;}else
if(typeof i==='object'){
for(var j in i)
return false;

return true;}else

return !i;}__annotator(h,{module:'isEmpty',line:25,column:0,name:'isEmpty'});



f.exports=h;},{module:'isEmpty',line:0,column:0,name:'$module_isEmpty'}),null);

/** js/downstream/page/setIntervalAcrossTransitions.js */

















__d('setIntervalAcrossTransitions',['TimeSlice'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();




var i=b.setInterval.nativeBackup||b.setInterval;





f.exports=__annotator(function(){for(var j=arguments.length,k=Array(j),l=0;l<j;l++)k[l]=arguments[l];
k[0]=h.guard(k[0],'setInterval');

return Function.prototype.apply.call(i,b,k);},{module:'setIntervalAcrossTransitions',line:29,column:17});},{module:'setIntervalAcrossTransitions',line:0,column:0,name:'$module_setIntervalAcrossTransitions'}),null);

/** js/downstream/bootloader/CSSLoader.js */

















__d('CSSLoader',['CSSLoaderConfig','TimeSlice','isEmpty','setIntervalAcrossTransitions'],__annotator(function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();














var l=20,
m=h.timeout,

n=h.loadEventSupported,
o,




p={},

q=[],

r,
s={};







function t(x){
if(o)
return;

o=true;

var y=document.createElement('link');
y.onload=__annotator(function(){
n=true;
y.parentNode.removeChild(y);},{module:'CSSLoader',line:62,column:16});

y.rel='stylesheet';
y.href='data:text/css;base64,';
x.appendChild(y);}__annotator(t,{module:'CSSLoader',line:55,column:0,name:'_testLoadEvent'});






function u(){
var x,
y=[],
z=[];

if(Date.now()>=r){
for(x in s){
z.push(s[x].signal);
y.push(s[x].error);}

s={};}else

for(x in s){
var aa=s[x].signal,
ba=window.getComputedStyle?
getComputedStyle(aa,null):
aa.currentStyle;
if(ba&&parseInt(ba.height,10)>1){
y.push(s[x].load);
z.push(aa);
delete s[x];}}




for(var ca=0;ca<z.length;ca++)
z[ca].parentNode.removeChild(z[ca]);


if(!j(y)){
for(ca=0;ca<y.length;ca++)
y[ca]();

r=Date.now()+m;}


return j(s);}__annotator(u,{module:'CSSLoader',line:75,column:0,name:'_runCSSPolls'});








function v(x,y,z,aa){


var ba=document.createElement('meta');
ba.id='bootloader_'+x.replace(/[^a-z0-9]/ig,'_');
y.appendChild(ba);

var ca=!j(s);
r=Date.now()+m;
s[x]={signal:ba,load:z,error:aa};
if(!ca)
var da=k(__annotator(function ea(){
if(u())
clearInterval(da);},{module:'CSSLoader',line:131,column:48,name:'_pollCSS'}),

l);}__annotator(v,{module:'CSSLoader',line:120,column:0,name:'_startCSSPoll'});



var w=











{loadStyleSheet:__annotator(function(x,y,z,aa,ba,ca){
if(p[x])
throw new Error('CSS component '+x+' has already been requested.');


if(document.createStyleSheet){


var da;
for(var ea=0;ea<q.length;ea++)
if(q[ea].imports.length<31){
da=ea;
break;}


if(da===undefined){

try{q.push(document.createStyleSheet());}catch(
fa){


ca();
return;}

da=q.length-1;}

q[da].addImport(y);
p[x]=
{styleSheet:q[da],
uri:y};

v(x,z,ba,ca);
return;}


var ga=document.createElement('link');
ga.rel='stylesheet';
ga.type='text/css';
ga.href=y;
if(aa)
ga.crossOrigin='anonymous';

p[x]={link:ga};

if(n){
ga.onload=i.guard(__annotator(function(){
ga.onload=ga.onerror=null;
ba();},{module:'CSSLoader',line:196,column:36}),
'CSSLoader link.onload');
ga.onerror=i.guard(__annotator(function(){
ga.onload=ga.onerror=null;
ca();},{module:'CSSLoader',line:200,column:37}),
'CSSLoader link.onerror');}else{


v(x,z,ba,ca);
if(n===undefined)
t(z);}


z.appendChild(ga);},{module:'CSSLoader',line:151,column:18}),









registerLoadedStyleSheet:__annotator(function(x,y){
if(p[x])
throw new Error
('CSS component '+x+' has been requested and should not be '+
'loaded more than once.');

p[x]={link:y};},{module:'CSSLoader',line:221,column:28}),







unloadStyleSheet:__annotator(function(x){
if(!x in p)
return;

var y=p[x],
z=y.link;
if(z){
z.onload=z.onerror=null;
z.parentNode.removeChild(z);}else{



var aa=y.styleSheet;
for(var ba=0;ba<aa.imports.length;ba++)
if(aa.imports[ba].href==y.uri){
aa.removeImport(ba);
break;}}



delete s[x];
delete p[x];},{module:'CSSLoader',line:235,column:20})};



f.exports=w;},{module:'CSSLoader',line:0,column:0,name:'$module_CSSLoader'}),null);

/** js/downstream/bootloader/Bootloader.js */





















__d('Bootloader',['CSSLoader','CallbackDependencyManager','TimeSlice','ErrorUtils','ex'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();







var m={},
n={},


o={},
p={},

q=null,


r={},
s={},
t={},
u={},
v={},



w={},

x=false,

y=false,
z=[],

aa=new i(),

ba=Date.now();

k.addListener(__annotator(function(na){
na.loadingUrls=Object.keys(s);},{module:'Bootloader',line:59,column:23}),
true);

function ca(na){
var oa=new Error(na);
oa.guard='Bootloader';
k.reportError(oa);}__annotator(ca,{module:'Bootloader',line:63,column:0,name:'_logError'});





function da(){
return document.documentMode||
+(/MSIE.(\d+)/.exec(navigator.userAgent)||[])[1];}__annotator(da,{module:'Bootloader',line:72,column:0,name:'_isBrowserIE'});


function ea
(na){return __bodyWrapper(this,arguments,function(){

return Array.isArray(na)?na:[na];},{params:[[na,'array<string>|array<object>|string|object','obj']],returns:'array<string>|array<object>'});}__annotator(ea,{module:'Bootloader',line:77,column:0,name:'objectToArray'},{params:['array<string>|array<object>|string|object'],returns:'array<string>|array<object>'});


function fa(){
if(!q){
var na=document.getElementsByTagName('head');
q=na.length&&na[0]||document.body;}

return q;}__annotator(fa,{module:'Bootloader',line:83,column:0,name:'_getHardpoint'});





function ga(na,oa,pa,qa){
var ra=document.createElement('script');
ra.src=na;
ra.async=true;
var sa=r[oa];
if(sa&&sa.crossOrigin)
ra.crossOrigin='anonymous';

ra.onload=j.guard(pa,'Bootloader script.onload');
ra.onerror=j.guard(__annotator(function(){
u[na]=true;
pa();},{module:'Bootloader',line:103,column:35}),
'Bootloader script.onerror');
ra.onreadystatechange=j.guard(__annotator(function(){
if(this.readyState in {loaded:1,complete:1})
pa();},{module:'Bootloader',line:107,column:46}),

'Bootloader script.onreadystatechange');
qa.appendChild(ra);
return ra;}__annotator(ga,{module:'Bootloader',line:94,column:0,name:'_loadJS'});





function ha(na,oa,pa,qa){






var ra=ma.done.bind
(null,
[pa],
oa);

s[oa]=Date.now();
if(na=='js'){
ga(oa,pa,ra,qa);}else
if(na=='css'){
var sa=r[pa],
ta=sa&&sa.crossOrigin;
h.loadStyleSheet(pa,oa,qa,ta,ra,__annotator
(function(){
ca(l('CSS timeout [%s] at %s',pa,oa));
u[oa]=true;
ra();},{module:'Bootloader',line:138,column:6}));}}__annotator(ha,{module:'Bootloader',line:119,column:0,name:'_requestResourceIntoHardpoint'});







function ia(na){return __bodyWrapper(this,arguments,function(){
if(!r[na]){
ca(l('Missing unloading resource %s',na));
return;}


if(r[na].type=='css'){
h.unloadStyleSheet(na);
delete m[na];
aa.unsatisfyPersistentDependency(na);}},{params:[[na,'string','name']]});}__annotator(ia,{module:'Bootloader',line:149,column:0,name:'_unloadResource'},{params:['string']});







function ja(na,oa){return __bodyWrapper(this,arguments,function(){



if(!y){
z.push([na,oa]);
return;}


na=ea(na);
var pa=[];
for(var qa=0;qa<na.length;++qa){
if(!na[qa]){
ca(l('Empty component!'));
continue;}


var ra=o[na[qa]];
if(ra){
var sa=ra.resources;


for(var ta=0;ta<sa.length;++ta)
pa.push(sa[ta]);}}





ma.loadResources(pa,oa);},{params:[[na,'array<string>|string','components'],[oa,'function|number','callback']]});}__annotator(ja,{module:'Bootloader',line:166,column:0,name:'_loadComponents'},{params:['array<string>|string','function|number']});






function ka(na){return __bodyWrapper(this,arguments,function(){
if(!na)
return [];

var oa=[];
for(var pa=0;pa<na.length;++pa)
if(typeof na[pa]=='string'){
if(na[pa] in r){
oa.push(r[na[pa]]);}else

ca(l('Unable to resolve resource %s.',na[pa]));}else


oa.push(na[pa]);


return oa;},{params:[[na,'array<string>|array<object>','resources']],returns:'array<object>'});}__annotator(ka,{module:'Bootloader',line:202,column:0,name:'_resolveResources'},{params:['array<string>|array<object>'],returns:'array<object>'});






function la(){
if(x)
return;

x=true;
var na,oa,pa,
qa=document.getElementsByTagName('link');
for(pa=0;pa<qa.length;pa++){
na=qa[pa];


if(oa=na.getAttribute('data-bootloader-hash')){
r[oa]={name:oa,src:na.href,type:'css'};

if(na.getAttribute('data-permanent'))
r[oa].permanent=n[oa]=true;


h.registerLoadedStyleSheet(oa,na);
ma.done([oa]);
w[oa]=true;}}



var ra=document.getElementsByTagName('script');
for(pa=0;pa<ra.length;pa++){
na=ra[pa];
if(oa=na.getAttribute('data-bootloader-hash')){
r[oa]={name:oa,src:na.src,type:'js'};
if(na.getAttribute('async')){

if(window._btldr&&window._btldr[oa]){

ma.done([oa]);}else{


na.setAttribute('onload',na.getAttribute('onload')+
";require"+"('Bootloader').done(['"+oa+"']);");
na.setAttribute('onerror',na.getAttribute('onerror')+
";require"+"('Bootloader').done(['"+oa+"']);");
m[oa]=true;}}else



ma.done([oa]);

w[oa]=true;}}}__annotator(la,{module:'Bootloader',line:225,column:0,name:'_pickupPageResources'});










var ma=















{loadComponents:__annotator(function(na,oa){return __bodyWrapper(this,arguments,function(){
na=ea(na);
var pa=[];
for(var qa=0;qa<na.length;qa++){
var ra=o[na[qa]],
sa='legacy:'+na[qa];
if(o[sa]){
if(ra)
ca(l('%s has a conflicting legacy component. '+
'That cannot happen and legacy won btw.',na[qa]));

na[qa]=sa;
pa.push(sa);
continue;}

if(!ra){
ca(l('loadComponents: %s is not in the component map.',
na[qa]));}else
if(ra.module){
pa.push(na[qa]);
ca(l('loadComponents: Loading module %s!',na[qa]));}}



ja
(na,
pa.length?e.bind(null,pa,oa):oa);},{params:[[na,'string|array<string>','components'],[oa,'function|number','callback']]});},{module:'Bootloader',line:298,column:18},{params:['string|array<string>','function|number']}),

















loadModules:__annotator(function(na,oa){return __bodyWrapper(this,arguments,function(){
var pa=[];
for(var qa=0;qa<na.length;qa++){
var ra=o[na[qa]];
if(!ra){
ca(l('loadModules: %s is not in the component map.',
na[qa]));

pa.push(na[qa]);}else
if(ra.module){
pa.push(na[qa]);}else{

var sa=ra.resources,ta=true;
for(var ua=0;ua<sa.length;ua++){
var va=r[sa[ua]];
if(!va||va.type!='css')
ta=false;}


if(!ta)
ca(l('loadModules: %s is not a module!',
na[qa]));}}




ja(na,e.bind(null,pa,oa));},{params:[[na,'array<string>','components'],[oa,'function|number','callback']]});},{module:'Bootloader',line:342,column:15},{params:['array<string>','function|number']}),















loadResources:__annotator(function(na,oa,pa,qa){return __bodyWrapper(this,arguments,function(){
var ra;

la();

na=ka(ea(na));
if(pa){
var sa={};

for(ra=0;ra<na.length;++ra)
sa[na[ra].name]=true;


for(var ta in m)
if(!(ta in n||ta in sa||ta in w))
ia(ta);















w={};}

var ua=[],
va=[];
for(ra=0;ra<na.length;++ra){
var wa=na[ra];

if(wa.permanent)
n[wa.name]=true;


if(aa.isPersistentDependencySatisfied(wa.name))
continue;


if(!wa.nonblocking)
va.push(wa.name);


if(!m[wa.name]){
m[wa.name]=true;
ua.push(wa);
window.CavalryLogger&&
window.CavalryLogger.getInstance().measureResources(wa,qa);}}



var xa;
if(oa)
if(typeof oa==='function'){
xa=aa.registerCallback
(oa,
va);}else


xa=aa.addDependenciesToExistingCallback
(oa,
va);






var ya=fa(),
za=
da()?ya:document.createDocumentFragment();

for(ra=0;ra<ua.length;++ra)
ha
(ua[ra].type,
ua[ra].src,
ua[ra].name,
za);

if(ya!==za)
ya.appendChild(za);


return xa;},{params:[[na,'object|array<string>|array<object>','resources'],[oa,'?function|number','callbackOrCallbackID'],[pa,'?boolean','replace'],[qa,'?string','tag']],returns:'?number'});},{module:'Bootloader',line:384,column:17},{params:['object|array<string>|array<object>','?function|number','?boolean','?string'],returns:'?number'}),











requestJSResource:__annotator(function(na){return __bodyWrapper(this,arguments,function(){
var oa=fa();
ha('js',na,null,oa);},{params:[[na,'string','source']]});},{module:'Bootloader',line:486,column:21},{params:['string']}),













done:__annotator(function(na,oa){return __bodyWrapper(this,arguments,function(){
if(oa){
t[oa]=Date.now()-s[oa];
delete s[oa];
if(p[oa]){
clearTimeout(p[oa]);
delete p[oa];}}










if(window.CavalryLogger)
window.CavalryLogger.done_js(na);





for(var pa=0;pa<na.length;++pa){
var qa=na[pa];




if(qa){
m[qa]=true;
aa.satisfyPersistentDependency(qa);}}},{params:[[na,'array<string>','names'],[oa,'?string','url']]});},{module:'Bootloader',line:502,column:8},{params:['array<string>','?string']}),












enableBootload:__annotator(function(na){return __bodyWrapper(this,arguments,function(){
for(var oa in na)






if(!o[oa])
o[oa]=na[oa];









if(!y){
y=true;
for(var pa=0;pa<z.length;pa++)
ja.apply(null,z[pa]);

z=[];}},{params:[[na,'object','map']]});},{module:'Bootloader',line:547,column:18},{params:['object']}),









setResourceMap:__annotator(function(na){return __bodyWrapper(this,arguments,function(){
for(var oa in na)
if(!r[oa]){
na[oa].name=oa;
r[oa]=na[oa];}},{params:[[na,'object','resources']]});},{module:'Bootloader',line:581,column:18},{params:['object']}),








getResourceURLs:__annotator(function(){
var na={};
for(var oa in r){
var pa=r[oa].src;
na[pa]=oa in m&&!(pa in u)&&
!(pa in s);}

return na;},{module:'Bootloader',line:594,column:19}),







loadEarlyResources:__annotator(function(na){return __bodyWrapper(this,arguments,function(){
ma.setResourceMap(na);

var oa=[];
for(var pa in na){
var qa=r[pa];
oa.push(qa);
if(!qa.permanent)
w[qa.name]=true;}


ma.loadResources(oa);},{params:[[na,'object','resources']]});},{module:'Bootloader',line:609,column:22},{params:['object']}),






getLoadingUrls:__annotator(function(){
var na={},
oa=Date.now();
for(var pa in s)
na[pa]=oa-s[pa];

return na;},{module:'Bootloader',line:627,column:18}),





getLoadedUrlTimes:__annotator(function(){
return t;},{module:'Bootloader',line:639,column:21}),





getErrorUrls:__annotator(function(){
return Object.keys(u);},{module:'Bootloader',line:646,column:16}),





getStartTime:__annotator(function(){
return ba;},{module:'Bootloader',line:653,column:16}),




__debug:
{callbackManager:aa,
componentMap:o,
requested:m,
resources:r,
retries:v,
earlyResources:w}};



f.exports=ma;},{module:'Bootloader',line:0,column:0,name:'$module_Bootloader'}),null);

/** js/modules/JSCC.js */




__d('JSCC',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

var h={};

function i(k){
var l,
m=false;
return __annotator(function(){
if(!m){
l=k();
m=true;}

return l;},{module:'JSCC',line:12,column:9});}__annotator(i,{module:'JSCC',line:9,column:0,name:'createFactory'});



var j=
{get:__annotator(function(k){
if(!h[k])




throw new Error('JSCC entry is missing');

return h[k]();},{module:'JSCC',line:22,column:7}),







init:__annotator(function(k){
for(var l in k)
h[l]=i(k[l]);


return __annotator(function m(){
for(var n in k)
delete h[n];},{module:'JSCC',line:43,column:11,name:'clearJSCC'});},{module:'JSCC',line:38,column:8})};





f.exports=j;},{module:'JSCC',line:0,column:0,name:'$module_JSCC'}),null);

/** js/modules/pagelets/PageletSet.js */





__d('PageletSet',['Arbiter'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();







var i={},

j=
{hasPagelet:__annotator(function(m){
return i.hasOwnProperty(m);},{module:'PageletSet',line:17,column:14}),


getPagelet:__annotator(function(m){





return i[m];},{module:'PageletSet',line:21,column:14}),


getOrCreatePagelet:__annotator(function(m){
if(!j.hasPagelet(m)){
var n=new l(m);
i[m]=n;}

return j.getPagelet(m);},{module:'PageletSet',line:30,column:22}),


getPageletIDs:__annotator(function(){
return Object.keys(i);},{module:'PageletSet',line:38,column:17}),


removePagelet:__annotator(function(m){
if(j.hasPagelet(m)){
i[m].destroy();
delete i[m];}},

{module:'PageletSet',line:42,column:17})};




function k(m,n){
return m.contains?
m.contains(n):

m.compareDocumentPosition(n)&16;}__annotator(k,{module:'PageletSet',line:52,column:0,name:'_contains'});



function l(m){'use strict';
this.id=m;
this._root=null;
this._destructors=[];

this.addDestructor(__annotator(function n(){
h.inform('pagelet/destroy',{id:this.id,root:this._root});},{module:'PageletSet',line:65,column:23,name:'broadcastDemise'}).
bind(this));}__annotator(l,{module:'PageletSet',line:60,column:2,name:'Pagelet'});l.prototype.


setRoot=__annotator(function(m){'use strict';








this._root=m;},{module:'PageletSet',line:70,column:9});l.prototype.


_getDescendantPagelets=__annotator(function(){'use strict';
var m=[];
if(!this._root)
return m;


var n=j.getPageletIDs();
for(var o=0;o<n.length;o++){
var p=n[o];
if(p===this.id)
continue;

var q=i[p];
if(q._root&&k(this._root,q._root))
m.push(q);}



return m;},{module:'PageletSet',line:82,column:24});l.prototype.


addDestructor=__annotator(function(m){'use strict';
this._destructors.push(m);},{module:'PageletSet',line:103,column:15});l.prototype.


destroy=__annotator(function(){'use strict';

var m=this._getDescendantPagelets();
for(var n=0;n<m.length;n++){
var o=m[n];
if(j.hasPagelet(o.id))
j.removePagelet(o.id);}



for(n=0;n<this._destructors.length;n++)
this._destructors[n]();


if(this._root)
while(this._root.firstChild)
this._root.removeChild(this._root.firstChild);},{module:'PageletSet',line:107,column:9});





f.exports=j;},{module:'PageletSet',line:0,column:0,name:'$module_PageletSet'}),null);

/** js/downstream/functional/forEachObject.js */


















__d('forEachObject',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

'use strict';

var h=Object.prototype.hasOwnProperty;



















function i(j,k,l){return __bodyWrapper(this,arguments,function(){
for(var m in j)
if(h.call(j,m))
k.call(l,j[m],m,j);},{params:[[j,'?object','object'],[k,'function','callback']]});}__annotator(i,{module:'forEachObject',line:43,column:0,name:'forEachObject'},{params:['?object','function']});




f.exports=i;},{module:'forEachObject',line:0,column:0,name:'$module_forEachObject'}),null);

/** js/downstream/page/TimerStorage.js */

















__d('TimerStorage',['forEachObject'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();







var i=
{TIMEOUT:'TIMEOUT',
INTERVAL:'INTERVAL',
IMMEDIATE:'IMMEDIATE',
ANIMATION_FRAME:'ANIMATION_FRAME'},


j={};

h(i,__annotator(function(l,m){return j[m]=[];},{module:'TimerStorage',line:35,column:29}));

var k=
{push:__annotator(function(l,m){
j[l].push(m);},{module:'TimerStorage',line:38,column:6}),


popAll:__annotator(function(l,m){
j[l].forEach(m);
j[l].length=0;},{module:'TimerStorage',line:42,column:8})};



Object.assign(k,i);

f.exports=k;},{module:'TimerStorage',line:0,column:0,name:'$module_TimerStorage'}),null);

/** js/downstream/core/nativeRequestAnimationFrame.js */

















__d("nativeRequestAnimationFrame",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

var h=
b.requestAnimationFrame||
b.webkitRequestAnimationFrame||
b.mozRequestAnimationFrame||
b.oRequestAnimationFrame||
b.msRequestAnimationFrame;

f.exports=h;},{module:"nativeRequestAnimationFrame",line:0,column:0,name:"$module_nativeRequestAnimationFrame"}),null);

/** js/downstream/core/requestAnimationFramePolyfill.js */

















__d('requestAnimationFramePolyfill',['emptyFunction','nativeRequestAnimationFrame'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();




var j=0,





k=
i||__annotator
(function(l){
var m=Date.now(),
n=Math.max(0,16-(m-j));
j=m+n;
return b.setTimeout(__annotator(function(){
l(Date.now());},{module:'requestAnimationFramePolyfill',line:35,column:29}),
n);},{module:'requestAnimationFramePolyfill',line:31,column:2});



k(h);

f.exports=k;},{module:'requestAnimationFramePolyfill',line:0,column:0,name:'$module_requestAnimationFramePolyfill'}),null);

/** js/downstream/page/requestAnimationFrameAcrossTransitions.js */

















__d('requestAnimationFrameAcrossTransitions',['TimeSlice','requestAnimationFramePolyfill'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();









f.exports=__annotator(function(){for(var j=arguments.length,k=Array(j),l=0;l<j;l++)k[l]=arguments[l];
k[0]=h.guard(k[0],'requestAnimationFrame');
return i.apply(b,k);},{module:'requestAnimationFrameAcrossTransitions',line:28,column:18});},{module:'requestAnimationFrameAcrossTransitions',line:0,column:0,name:'$module_requestAnimationFrameAcrossTransitions'}),null);

/** js/downstream/page/requestAnimationFrame.js */

















__d('requestAnimationFrame',['TimerStorage','requestAnimationFrameAcrossTransitions'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();









f.exports=__annotator(function(){for(var j=arguments.length,k=Array(j),l=0;l<j;l++)k[l]=arguments[l];
var m=i.apply(b,k);
h.push(h.ANIMATION_FRAME,m);
return m;},{module:'requestAnimationFrame',line:28,column:17});},{module:'requestAnimationFrame',line:0,column:0,name:'$module_requestAnimationFrame'}),null);

/** js/modules/ResourceLazyLoader.js */





__d('ResourceLazyLoader',['requestAnimationFrame'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();




var i=document.documentElement,

j=
'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
k='onload',
l='__RLZ',
m='data-lazy-src',
n=m+'-'+k,

o=!!(i&&i.getBoundingClientRect),
p={},
q=
{SHOWN:0,
HIDDEN:1},


r=false,
s=false;

function t(ga){
if(o){
var ha=document.createElement('div');
ha.innerHTML=ga;
var ia=[].slice.call(ha.getElementsByTagName('img'));
for(var ja=0,ka=ia.length;ja<ka;ja++){
var la=ia[ja],
ma=la.getAttribute('src');
if(ma&&!/^data:image\//.test(ma)){
var na=la.getAttribute(k);
if(na)
la.setAttribute(n,na);

la.setAttribute(k,l+'(this);');
la.setAttribute(m,ma);
la.setAttribute('src',j);}}


return ha.innerHTML;}

return ga;}__annotator(t,{module:'ResourceLazyLoader',line:30,column:0,name:'lazifyResourcesInMarkup'});


function u(ga){
var ha;
if(ga.lazyLoad){
ga.lazyLoad();
ha=ga.getSrc();}else{

var ia=ga.getAttribute(n);
ga.setAttribute('onload',ia);
ha=ga.getAttribute(m);
ga.setAttribute('src',ha);
ga.removeAttribute(m);
ga.removeAttribute(n);}

p[ha]=q.SHOWN;}__annotator(u,{module:'ResourceLazyLoader',line:53,column:0,name:'showNode'});


function v(ga){
if(i.contains(ga)){
var ha=ga.getBoundingClientRect(),
ia=ha.top-i.clientTop;
return window.innerHeight>ia&&ha.bottom>0;}

return false;}__annotator(v,{module:'ResourceLazyLoader',line:69,column:0,name:'isInViewport'});


var w=[],
x;
function y(ga){
w.push(ga);
if(!x){
x=true;
h(ba);}}__annotator(y,{module:'ResourceLazyLoader',line:80,column:0,name:'onLoad'});



var z=[],
aa;
function ba(){
var ga=w.map(v);
for(var ha=0,ia=w.length;ha<ia;ha++){
var ja=w[ha];
if(ga[ha]){
u(ja);}else{

z.push(ja);
if(!aa){
aa=true;
window.addEventListener('scroll',fa);
i.addEventListener('resize',fa);}

var ka;
if(ja.getSrc){
ka=ja.getSrc();}else

ka=ja.getAttribute(m);

if(p[ka]!==q.SHOWN)
p[ka]=q.HIDDEN;}}



w=[];
x=false;}__annotator(ba,{module:'ResourceLazyLoader',line:90,column:0,name:'checkRecentlyLoadedNodes'});


function ca(ga){
if(ga){
z.forEach(u);
z=[];}else{

var ha=z.map(v);
for(var ia=0,ja=0;ia<z.length;ia++){
var ka=z[ia-ja];
if(ha[ia]){
z.splice(ia-ja,1);
ja+=1;
u(ka);}}}



if(!z.length){
aa=false;
window.removeEventListener('scroll',fa);
i.removeEventListener('resize',fa);}}__annotator(ca,{module:'ResourceLazyLoader',line:118,column:0,name:'checkForVisibleNodes'});



var da=0,
ea;
function fa(){
var ga=Date.now(),
ha=ga-da;
if(ha>200){
da=ga;
clearTimeout(ea);
ea=false;
h(ca.bind(null,false));}else
if(!ea)
ea=setTimeout(fa,ha);}__annotator(fa,{module:'ResourceLazyLoader',line:142,column:0,name:'throttledCheckForVisibleNodes'});



b[l]=y;

f.exports=
{lazifyResourcesInMarkup:t,
loadAllResourcesAndStopLazyLoading:__annotator(function(){
s=true;
h(ca.bind(null,true));},{module:'ResourceLazyLoader',line:159,column:36}),

getNotLoadedCount:__annotator(function(){
var ga=0;
for(var ha in p)
ga+=p[ha];

return ga;},{module:'ResourceLazyLoader',line:163,column:19}),

integrateWithReact:__annotator(function(){
r=true;},{module:'ResourceLazyLoader',line:170,column:20}),


_isReactIntegrated:__annotator(function(){
return r;},{module:'ResourceLazyLoader',line:174,column:20}),

_didStopLazyLoading:__annotator(function(){
return s;},{module:'ResourceLazyLoader',line:177,column:21}),

_onLoad:y,
PIXEL:j};},{module:'ResourceLazyLoader',line:0,column:0,name:'$module_ResourceLazyLoader'}),6);

/** js/downstream/core/getMarkupWrap.js */

















__d('getMarkupWrap',['ExecutionEnvironment','invariant'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();










var j=
h.canUseDOM?document.createElement('div'):null,








k={},

l=[1,'<select multiple="true">','</select>'],
m=[1,'<table>','</table>'],
n=[3,'<table><tbody><tr>','</tr></tbody></table>'],

o=[1,'<svg xmlns="http://www.w3.org/2000/svg">','</svg>'],

p=
{'*':[1,'?<div>','</div>'],

area:[1,'<map>','</map>'],
col:[2,'<table><tbody></tbody><colgroup>','</colgroup></table>'],
legend:[1,'<fieldset>','</fieldset>'],
param:[1,'<object>','</object>'],
tr:[2,'<table><tbody>','</tbody></table>'],

optgroup:l,
option:l,

caption:m,
colgroup:m,
tbody:m,
tfoot:m,
thead:m,

td:n,
th:n},





q=
['circle',
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

q.forEach(__annotator(function(s){
p[s]=o;
k[s]=true;},{module:'getMarkupWrap',line:92,column:20}));










function r(s){
!!!j?i(0,'Markup wrapping node not initialized'):undefined;
if(!p.hasOwnProperty(s))
s='*';

if(!k.hasOwnProperty(s)){
if(s==='*'){
j.innerHTML='<link />';}else

j.innerHTML='<'+s+'></'+s+'>';

k[s]=!j.firstChild;}

return k[s]?p[s]:null;}__annotator(r,{module:'getMarkupWrap',line:105,column:0,name:'getMarkupWrap'});



f.exports=r;},{module:'getMarkupWrap',line:0,column:0,name:'$module_getMarkupWrap'}),null);

/** js/downstream/core/createNodesFromMarkup.js */


















__d('createNodesFromMarkup',['ExecutionEnvironment','createArrayFromMixed','getMarkupWrap','invariant'],__annotator(function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();












var l=
h.canUseDOM?document.createElement('div'):null,




m=/^\s*<(\w+)/;







function n(p){return __bodyWrapper(this,arguments,function(){
var q=p.match(m);
return q&&q[1].toLowerCase();},{params:[[p,'string','markup']],returns:'?string'});}__annotator(n,{module:'createNodesFromMarkup',line:46,column:0,name:'getNodeName'},{params:['string'],returns:'?string'});












function o(p,q){return __bodyWrapper(this,arguments,function(){
var r=l;
!!!l?k(0,'createNodesFromMarkup dummy not initialized'):undefined;
var s=n(p),

t=s&&j(s);
if(t){
r.innerHTML=t[1]+p+t[2];

var u=t[0];
while(u--)
r=r.lastChild;}else


r.innerHTML=p;


var v=r.getElementsByTagName('script');
if(v.length){

!q?k(0,
'createNodesFromMarkup(...): Unexpected <script> element rendered.'):undefined;

i(v).forEach(q);}


var w=i(r.childNodes);
while(r.lastChild)
r.removeChild(r.lastChild);

return w;},{params:[[p,'string','markup'],[q,'?function','handleScript']],returns:'array<HTMLElement>|array<DOMTextNode>'});}__annotator(o,{module:'createNodesFromMarkup',line:61,column:0,name:'createNodesFromMarkup'},{params:['string','?function'],returns:'array<HTMLElement>|array<DOMTextNode>'});


f.exports=o;},{module:'createNodesFromMarkup',line:0,column:0,name:'$module_createNodesFromMarkup'}),null);

/** js/downstream/core/evalGlobal.js */

















__d('evalGlobal',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();








function h(i){
if(typeof i!='string')
throw new TypeError
('JS sent to evalGlobal is not a string. Only strings are permitted.');


if(!i)
return;


var j=document.createElement('script');

try{j.appendChild(document.createTextNode(i));}catch(
k){
j.text=i;}

var l=document.getElementsByTagName('head')[0]||
document.documentElement;
l.appendChild(j);
l.removeChild(j);}__annotator(h,{module:'evalGlobal',line:27,column:0,name:'evalGlobal'});


f.exports=h;},{module:'evalGlobal',line:0,column:0,name:'$module_evalGlobal'}),null);

/** js/downstream/html/HTML.js */


















__d('HTML',['Bootloader','createNodesFromMarkup','emptyFunction','evalGlobal','invariant'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();










var m=/(<(\w+)[^>]*?)\/>/g,

n=
{abbr:true,
area:true,
br:true,
col:true,
embed:true,
hr:true,
img:true,
input:true,
link:true,
meta:true,
param:true};





















function o(p){'use strict';
if(p&&typeof p.__html==='string')




p=p.__html;


if(!(this instanceof o)){
if(p instanceof o)
return p;

return new o(p);}


if(p){
var q=typeof p;

!(q==='string')?l(0,
'HTML: Markup argument must be a string, got %s.',
q):undefined;}



this._markup=p||'';
this._defer=false;
this._extraAction='';
this._nodes=null;
this._inlineJS=j;
this._rootNode=null;}__annotator(o,{module:'HTML',line:65,column:2,name:'HTML'});o.prototype.








toString=__annotator(function(){'use strict';
var p=this._markup;
if(this._extraAction)
p+='<script type="text/javascript">'+this._extraAction+
'</scr'+'ipt>';

return p;},{module:'HTML',line:104,column:10});o.prototype.







getContent=__annotator(function(){'use strict';
return this._markup;},{module:'HTML',line:118,column:12});o.prototype.












getNodes=__annotator(function(){'use strict';
this._fillCache();
return this._nodes;},{module:'HTML',line:132,column:10});o.prototype.









getRootNode=__annotator(function(){'use strict';

!!this._rootNode?l(0,
'HTML: You cannot call `getRootNode` on an HTML instance more than once.'):undefined;

var p=this.getNodes();

if(p.length===1){

this._rootNode=p[0];}else{


var q=document.createDocumentFragment();
for(var r=0;r<p.length;r++)
q.appendChild(p[r]);

this._rootNode=q;}


return this._rootNode;},{module:'HTML',line:144,column:13});o.prototype.








getAction=__annotator(function(){'use strict';
this._fillCache();
var p=__annotator(function(){
this._inlineJS();
k(this._extraAction);},{module:'HTML',line:174,column:21}).bind(this);

return this._defer?__annotator
(function(){setTimeout(p,0);},{module:'HTML',line:179,column:6}):
p;},{module:'HTML',line:172,column:11});o.prototype.






_fillCache=__annotator(function(){'use strict';
if(this._nodes!==null)
return;

if(!this._markup){
this._nodes=[];
return;}



var p=this._markup.replace
(m,__annotator
(function(s,t,u){
return n[u.toLowerCase()]?
s:
t+'></'+u+'>';},{module:'HTML',line:199,column:6})),



q=null,

r=i(p,__annotator(function(s){

q=q||[];
q.push
(s.src?
h.requestJSResource.bind(h,s.src):
k.bind(null,s.innerHTML));

s.parentNode.removeChild(s);},{module:'HTML',line:208,column:46}));


if(q)
this._inlineJS=__annotator(function(){
for(var s=0;s<q.length;s++)
q[s]();},{module:'HTML',line:220,column:23});




this._nodes=r;},{module:'HTML',line:187,column:12});o.prototype.













setAction=__annotator(function(p){'use strict';
this._extraAction=p;
return this;},{module:'HTML',line:241,column:11});o.prototype.












setDeferred=__annotator(function(p){'use strict';
this._defer=!!p;
return this;},{module:'HTML',line:256,column:13});o.









isHTML=__annotator(function(p){'use strict';
return !!p&&(p instanceof o||p.__html!==undefined);},{module:'HTML',line:268,column:15});o.








replaceJSONWrapper=__annotator(function(p){'use strict';
return p&&p.__html!==undefined?new o(p.__html):p;},{module:'HTML',line:278,column:27});



f.exports=o;},{module:'HTML',line:0,column:0,name:'$module_HTML'}),null);

/** js/downstream/serverjs/ServerJS.js */

















__d('ServerJS',['ErrorUtils','ServerJSDefine','ex','ge','replaceTransportMarkers'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();








var m=0;








function n(){'use strict';
this.$ServerJS_moduleMap={};
this.$ServerJS_relativeTo=null;
this.$ServerJS_moduleIDsToCleanup={};}__annotator(n,{module:'ServerJS',line:36,column:2,name:'ServerJS'});n.prototype.






















handle=__annotator(function(r){'use strict';
if(r.__guard)
throw new Error
('ServerJS.handle called on data that has already been handled');

r.__guard=true;






o(r.define||[],this.$ServerJS_handleDefine,this);
o(r.markup||[],this.$ServerJS_handleMarkup,this);
o(r.elements||[],this.$ServerJS_handleElement,this);
o(r.instances||[],this.$ServerJS_handleInstance,this);
var s=o(r.require||[],this.$ServerJS_handleRequire,this);


return {cancel:__annotator(function(){
for(var t=0;t<s.length;t++)
if(s[t])
s[t].cancel();},{module:'ServerJS',line:81,column:12})};},{module:'ServerJS',line:62,column:8});n.prototype.













handlePartial=__annotator(function(r){'use strict';
(r.instances||[]).forEach
(p.bind(null,this.$ServerJS_moduleMap,3));

(r.markup||[]).forEach
(p.bind(null,this.$ServerJS_moduleMap,2));

(r.elements||[]).forEach
(p.bind(null,this.$ServerJS_moduleMap,2));

return this.handle(r);},{module:'ServerJS',line:98,column:15});n.prototype.







setRelativeTo=__annotator(function(r){'use strict';
this.$ServerJS_relativeTo=r;
return this;},{module:'ServerJS',line:116,column:15});n.prototype.









cleanup=__annotator(function(){'use strict';
var r=Object.keys(this.$ServerJS_moduleMap);


e.call(null,r,q);
this.$ServerJS_moduleMap={};



function s(u){
var v=this.$ServerJS_moduleIDsToCleanup[u],
w=v[0],
x=v[1];

delete this.$ServerJS_moduleIDsToCleanup[u];

var y=x?
'JS::call("'+w+'", "'+x+'", ...)':
'JS::requireModule("'+w+'")',
z=y+' did not fire because it has missing dependencies.';






throw new Error(z);}__annotator(s,{module:'ServerJS',line:137,column:4,name:'thrower'});


for(var t in this.$ServerJS_moduleIDsToCleanup)
h.applyWithGuard
(s,
this,
[t],
null,
'ServerJS:cleanup'+' id: '+t);},{module:'ServerJS',line:128,column:9});n.prototype.








$ServerJS_handleDefine=__annotator(function(r,s,t,u){'use strict';
return h.applyWithGuard
(i.handleDefine,
i,
[r,s,t,u,this.$ServerJS_relativeTo],
null,
'JS::define');},{module:'ServerJS',line:172,column:15});n.prototype.















$ServerJS_handleRequire=__annotator(function(r,s,t,u){'use strict';
return h.applyWithGuard
(this.$ServerJS_handleRequireUnguarded,
this,
[r,s,t,u],
null,
s?'JS::call':'JS::requireModule');},{module:'ServerJS',line:194,column:16});n.prototype.



$ServerJS_handleRequireUnguarded=__annotator(function(r,s,t,u){'use strict';
var v=[r].concat(t||[]),
w;
if(s){
w='__call__'+r+'.'+s;}else

w='__requireModule__'+r;

w+='__'+(m++);



this.$ServerJS_moduleIDsToCleanup[w]=[r,s];

var x=h.guard(__annotator(function(y){


delete this.$ServerJS_moduleIDsToCleanup[w];

u&&l(this.$ServerJS_relativeTo,u);
if(s){
if(!y[s])
throw new TypeError(j
('Module %s has no method "%s"',
r,
s));



y[s].apply(y,u||[]);

x.__SMmeta=y[s].__SMmeta||{};
x.__SMmeta.module=x.__SMmeta.module||r;
x.__SMmeta.name=x.__SMmeta.name||s;}},{module:'ServerJS',line:218,column:39}).bind(this),

s?
"JS::call('"+r+"', '"+s+"', ...)":
"JS::requireModule('"+r+"')");


return define
(w,
v,
x,
1,
this,
1);},{module:'ServerJS',line:204,column:25});n.prototype.




















$ServerJS_handleInstance=__annotator(function(r,s,t,u){'use strict';
return h.applyWithGuard
(this.$ServerJS_handleInstanceUnguarded,
this,
[r,s,t,u],
null,
'JS::instance');},{module:'ServerJS',line:271,column:17});n.prototype.



$ServerJS_handleInstanceUnguarded=__annotator(function(r,s,t,u){'use strict';
var v=null;
if(s)
v=__annotator(function(w){











l(this.$ServerJS_relativeTo,t);
var x=Object.create(w.prototype);
w.apply(x,t);
return x;},{module:'ServerJS',line:284,column:20}).bind(this);


define(r,s,v,0,null,u);},{module:'ServerJS',line:281,column:26});n.prototype.











$ServerJS_handleMarkup=__annotator(function(r,s,t){'use strict';
return h.applyWithGuard
(this.$ServerJS_handleMarkupUnguarded,
this,
[r,s,t],
null,
'JS::markup');},{module:'ServerJS',line:314,column:15});n.prototype.



$ServerJS_handleMarkupUnguarded=__annotator(function(r,s,t){'use strict';
define(r,['HTML'],__annotator(function(u){
return u.replaceJSONWrapper(s).getRootNode();},{module:'ServerJS',line:325,column:33}),
0,null,t);},{module:'ServerJS',line:324,column:24});n.prototype.








$ServerJS_handleElement=__annotator(function(r,s,t,u){'use strict';
return h.applyWithGuard
(this.$ServerJS_handleElementUnguarded,
this,
[r,s,t,u],
null,
'JS::element');},{module:'ServerJS',line:336,column:16});n.prototype.



$ServerJS_handleElementUnguarded=__annotator(function(r,s,t,u){'use strict';






if(s===null&&t){
define(r,null,null,0,null,t);
return;}


var v=[],
w=0;















if(u){
v.push(u);
w=1;
t++;}


define(r,v,__annotator(function(x){
var y=k(s,x);
if(!y){
var z='Could not find element "%s"';





throw new Error(j(z,s));}

return y;},{module:'ServerJS',line:381,column:29}),
w,null,t);},{module:'ServerJS',line:346,column:25});





__annotator(function(){e(['HTML'],__annotator(function(r){},{module:'ServerJS',line:399,column:31}));},{module:'ServerJS',line:399,column:1});







function o(r,s,t){
return r.map(__annotator(function(u){return s.apply(t,u);},{module:'ServerJS',line:408,column:17}));}__annotator(o,{module:'ServerJS',line:407,column:0,name:'applyEach'});






function p(r,s,t){
var u=t[0];
if(!(u in r))
t[s]=(t[s]||0)+1;

r[u]=true;}__annotator(p,{module:'ServerJS',line:415,column:0,name:'_addModuleName'});


function q(){
return {};}__annotator(q,{module:'ServerJS',line:423,column:0,name:'emptyModule'});


f.exports=n;},{module:'ServerJS',line:0,column:0,name:'$module_ServerJS'}),null);

/** js/modules/invokeCallbacks.js */




__d('invokeCallbacks',['ErrorUtils'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



function i(j,k){
if(j)
for(var l=0;l<j.length;l++)
h.applyWithGuard(new Function(j[l]),k);}__annotator(i,{module:'invokeCallbacks',line:9,column:0,name:'invokeCallbacks'});




f.exports=i;},{module:'invokeCallbacks',line:0,column:0,name:'$module_invokeCallbacks'}),null);

/** js/downstream/haste/ix.js */

















__d('ix',['invariant'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



var i={};
















function j(k){
var l=i[k];

!!!l?h(0,
'ix'+'(...): '+
'Unknown image path "%s". Did you forget to run arc build?',
k):undefined;

return l;}__annotator(j,{module:'ix',line:39,column:0,name:'ix'});






j.add=__annotator(function(k){
var l=false;
for(var m in k)
if(!(m in i))
i[m]=k[m];},











{module:'ix',line:54,column:9});




f.exports=j;},{module:'ix',line:0,column:0,name:'$module_ix'}),null);

/** js/modules/BigPipe.js */





__d('BigPipe',['Arbiter','BigPipeExperiments','Bootloader','Env','ErrorUtils','JSCC','PageEvents','PageletSet','ResourceLazyLoader','Run','ServerJS','$','ge','invokeCallbacks','ix','performanceAbsoluteNow'],__annotator(function a(global,require,requireDynamic,requireLazy,module,exports,Arbiter,BigPipeExperiments,Bootloader,Env,ErrorUtils,JSCC,PageEvents,PageletSet,ResourceLazyLoader,Run,ServerJS,$,ge,invokeCallbacks,ix,performanceAbsoluteNow){if(require.__markCompiled)require.__markCompiled();var _extends=Object.assign||__annotator(function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)if(Object.prototype.hasOwnProperty.call(source,key))target[key]=source[key];}return target;},{module:'BigPipe',line:0,column:0});






































if(BigPipeExperiments.lazy_load_images){
if(BigPipeExperiments.lazy_load_react_images)
ResourceLazyLoader.integrateWithReact();

Run.onAfterLoad(ResourceLazyLoader.loadAllResourcesAndStopLazyLoading);}


var ie=document.documentMode||
+(/MSIE.(\d+)/.exec(navigator.userAgent)||[])[1],

arbiter_state=Arbiter.BEHAVIOR_STATE,
arbiter_persistent=Arbiter.BEHAVIOR_PERSISTENT,

phaseTime=[],

shouldPrintTimeStamp=console.timeStamp&&
window.location.search.indexOf('pagelet_ts=1')>0;


function BigPipe(options){'use strict';

Object.assign(this,
{arbiter:Arbiter,
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
this._relevant_instance=BigPipe._current_instance;}else

BigPipe._current_instance=this;


this._serverJS=new ServerJS();




Arbiter.inform(BigPipe.Events.init,{lid:this.lid,arbiter:this.arbiter},
arbiter_persistent);

this.arbiter.registerCallback(this.domContentCallback,
['pagelet_displayed_all']);




this._prefetchPhase(0);
this._beginPhase(0);

this.onloadCallback=
this.arbiter.registerCallback(this.onloadCallback,
['pagelet_displayed_all']);




this.arbiter.registerCallback
(this._serverJS.cleanup.bind(this._serverJS),
[this.onloadEvt]);

this._secondFlushPendingJS=[];
this._secondFlushRan=false;}__annotator(BigPipe,{module:'BigPipe',line:64,column:2,name:'BigPipe'});BigPipe.prototype.


_prefetchPhase=__annotator(function(phase){'use strict';
this._informEventExternal('phase_prefetch',{phase:phase});
this.arbiter.inform('phase_prefetch_'+phase,true,arbiter_state);},{module:'BigPipe',line:121,column:16});BigPipe.prototype.


_beginPhase=__annotator(function(phase){'use strict';
this._informEventExternal('phase_begin',{phase:phase});
this.arbiter.inform('phase_begin_'+phase,true,arbiter_state);},{module:'BigPipe',line:126,column:13});BigPipe.prototype.


_endPhase=__annotator(function(phase){'use strict';
this.arbiter.inform('phase_arrived_'+phase,true,arbiter_state);
if(!this.isAjax)

phaseTime.push(Date.now());},{module:'BigPipe',line:131,column:11});BigPipe.prototype.



_displayPageletHandler=__annotator(function(pageletData){'use strict';
if(this.displayCallback){
this.displayCallback(this._displayPagelet.bind(this,pageletData));}else

this._displayPagelet(pageletData);},{module:'BigPipe',line:139,column:24});BigPipe.prototype.






_displayPagelet=__annotator(function(pageletData){'use strict';
this._informPageletEvent('display_start',pageletData);
var pagelet=this._getPagelet(pageletData);

for(var target_id in pageletData.content){
var content=pageletData.content[target_id];

if(pageletData.append)
target_id=this._getPageletRootID(pageletData);

var target=ge(target_id);
if(!target)





continue;


if(target_id===pagelet.id)
pagelet.setRoot(target);


content=getContentMarkup(content);
if(content){
if(BigPipeExperiments.lazy_load_images&&!this.isAjax)
content=ResourceLazyLoader.lazifyResourcesInMarkup(content);

if(pageletData.append||ie<8){



if(!pageletData.append)
while(target.firstChild)
target.removeChild(target.firstChild);


appendNodes(target,content);}else

target.innerHTML=content;}




var referrer=target.getAttribute('data-referrer');
if(!referrer)
target.setAttribute('data-referrer',target_id);





























if(pageletData.cache_hit&&Env.pc_debug)
target.style.border='1px red solid';}



if(pageletData.jsmods){
var jsmods=JSON.parse(JSON.stringify(pageletData.jsmods)),
serverJSCanceler=this._serverJS.handlePartial(jsmods);
pagelet.addDestructor(serverJSCanceler.cancel.bind(serverJSCanceler));}


this._informPageletEvent('display',pageletData);
this.arbiter.inform(pageletData.id+'_displayed',true,arbiter_state);},{module:'BigPipe',line:150,column:17});BigPipe.prototype.


_onPhaseCSSEnd=__annotator(function(phase){'use strict';

this._prefetchPhase(phase+1);},{module:'BigPipe',line:242,column:16});BigPipe.prototype.









_onPhaseDisplayEnd=__annotator(function(){'use strict';
this.arbiter.inform
('phase_displayed_'+this._currentPhase);




if(this._currentPhase===this._ttiPhase){
var ef=Bootloader.__debug.earlyResources,
requested=Bootloader.__debug.requested,
rsrcs=0;
for(var hash in requested)
rsrcs+=!(hash in ef);


var metrics=
{pre_tti_non_ef_resources:rsrcs},


extraProfilingData={},

wrapper=window.__bodyWrapper;
if(wrapper.getCodeUsage){
extraProfilingData.js_calls_tti=_extends({},wrapper.getCodeUsage());
extraProfilingData.tti_html=document.body.outerHTML;

var tti_styleSheets={};
for(var i=0;i<document.styleSheets.length;i++)
if(document.styleSheets[i].href)
tti_styleSheets[document.styleSheets[i].href]=true;


extraProfilingData.tti_styleSheets=tti_styleSheets;}


if(!this.isAjax){


metrics.cjs_factory_count_tti=require.__getTotalFactories();
metrics.cjs_compile_time_tti=require.__getCompileTime();
metrics.cjs_factory_time_tti=require.__getFactoryTime();}


this._informEventExternal(BigPipe.Events.tti,
{phase:this._ttiPhase,
rid:this.rid,
ajax:this.isAjax,
metrics:metrics,
extraProfilingData:extraProfilingData});

this.arbiter.inform('tti_pagelet_displayed',true,arbiter_state);

if(this._secondFlushResources){
this.loadSecondFlushResources(this._secondFlushResources);
delete this._secondFlushResources;}}



if(this._currentPhase===this._lastPhase&&this._isRelevant())

this.arbiter.inform('pagelet_displayed_all',true,arbiter_state);


this._currentPhase++;

if(ie<=8){



setTimeout(this._beginPhase.bind(this,this._currentPhase),20);}else

this._beginPhase(this._currentPhase);},{module:'BigPipe',line:254,column:20});BigPipe.prototype.







_downloadJsForPagelet=__annotator(function(pageletData){'use strict';
this._informPageletEvent('jsstart',pageletData);
Bootloader.loadResources(pageletData.js||[],__annotator(function(){
this._informPageletEvent('jsdone',pageletData);
pageletData.requires=pageletData.requires||[];








if(!this.isAjax||pageletData.phase>=1)
pageletData.requires.push('uipage_onload');


var fire_onloads=__annotator(function(){
this._informPageletEvent('preonload',pageletData);
if(this._isRelevantPagelet(pageletData))
invokeCallbacks(pageletData.onload);

this._informPageletEvent('onload',pageletData);





this.arbiter.inform('pagelet_onload',true,Arbiter.BEHAVIOR_EVENT);

pageletData.provides&&
this.arbiter.inform(pageletData.provides,true,arbiter_state);},{module:'BigPipe',line:350,column:25}).
bind(this),

fire_onafterloads=__annotator(function(){
this._isRelevantPagelet(pageletData)&&
invokeCallbacks(pageletData.onafterload);},{module:'BigPipe',line:367,column:30}).
bind(this);

this.arbiter.registerCallback(fire_onloads,pageletData.requires);
this.arbiter.registerCallback(fire_onafterloads,[this.onloadEvt]);},{module:'BigPipe',line:335,column:51}).
bind(this),false,pageletData.id);},{module:'BigPipe',line:333,column:23});BigPipe.prototype.


_getPagelet=__annotator(function(pageletData){'use strict';
var id=this._getPageletRootID(pageletData);
return PageletSet.getPagelet(id);},{module:'BigPipe',line:377,column:13});BigPipe.prototype.


_getPageletRootID=__annotator(function(pageletData){'use strict';
var appendTarget=pageletData.append;
if(appendTarget)
return appendTarget==='bigpipe_root'?this.rootNodeID:appendTarget;

return Object.keys(pageletData.content)[0]||null;},{module:'BigPipe',line:382,column:19});BigPipe.prototype.





_isRelevant=__annotator(function(){'use strict';
return this==BigPipe._current_instance||
this.automatic&&
this._relevant_instance==BigPipe._current_instance||
this.jsNonBlock||
this.forceFinish||
BigPipe._current_instance&&
BigPipe._current_instance.allowIrrelevantRequests;},{module:'BigPipe',line:393,column:13});BigPipe.prototype.


_isRelevantPagelet=__annotator(function(pageletData){'use strict';

if(!this._isRelevant())
return false;

var pageletID=this._getPageletRootID(pageletData);
return !!this._livePagelets[pageletID];},{module:'BigPipe',line:403,column:20});BigPipe.prototype.








_informEventExternal=__annotator(function(evt_name,data){'use strict';
data=data||{};

data.ts=performanceAbsoluteNow();
data.lid=this.lid;

if(shouldPrintTimeStamp)
console.timeStamp(evt_name+" "+JSON.stringify(data));


this.arbiter.inform(evt_name,data,arbiter_persistent);},{module:'BigPipe',line:418,column:22});BigPipe.prototype.









_informPageletEvent=__annotator(function(evt_name,pageletData){'use strict';
var data=
{event:evt_name,
id:pageletData.id};

if(pageletData.phase)
data.phase=pageletData.phase;

if(pageletData.categories)
data.categories=pageletData.categories;


this._informEventExternal('pagelet_event',data);},{module:'BigPipe',line:438,column:21});BigPipe.


getCurrentInstance=__annotator(function(){'use strict';
return BigPipe._current_instance;},{module:'BigPipe',line:453,column:27});BigPipe.prototype.


loadSecondFlushResources=__annotator(function(resources){'use strict';
Bootloader.loadEarlyResources(resources);
if(this._secondFlushPendingJS.length){
Bootloader.loadResources(this._secondFlushPendingJS);
this._secondFlushPendingJS=[];}

this._secondFlushRan=true;},{module:'BigPipe',line:457,column:26});



Object.assign(BigPipe.prototype,






{beforePageletArrive:__annotator(function(pageletId){
this._informPageletEvent('prearrive',{id:pageletId});},{module:'BigPipe',line:474,column:24}),


setSecondFlushResources:__annotator(function(resources){
if(this._ttiPhase!=undefined&&this._currentPhase>this._ttiPhase){
this.loadSecondFlushResources(resources);}else

this._secondFlushResources=resources;},{module:'BigPipe',line:478,column:27}),









onPageletArrive:ErrorUtils.guard(__annotator(function(pageletData){
this._informPageletEvent('arrive',pageletData);
pageletData.content=pageletData.content||{};

var phase=pageletData.phase;

if(!this._phaseCSSEndCallbacks[phase])
this._phaseCSSEndCallbacks[phase]=this.arbiter.registerCallback
(this._onPhaseCSSEnd.bind(this,phase),
['phase_arrived_'+phase]);



this.arbiter.registerCallback
(this._phaseCSSEndCallbacks[phase],
[pageletData.id+'_css_end']);


if(!this._phaseDisplayEndCallbacks[phase])
this._phaseDisplayEndCallbacks[phase]=this.arbiter.registerCallback
(this._onPhaseDisplayEnd.bind(this),
['phase_arrived_'+phase]);



this.arbiter.registerCallback
(this._phaseDisplayEndCallbacks[phase],
[pageletData.id+'_displayed']);


var rootID=this._getPageletRootID(pageletData),
pagelet=PageletSet.getOrCreatePagelet(rootID);

if(pageletData.the_end)
this._lastPhase=phase;


if(pageletData.tti_phase!==undefined)
this._ttiPhase=pageletData.tti_phase;


this._livePagelets[pagelet.id]=true;
pagelet.addDestructor(__annotator(function(){
delete this._livePagelets[pagelet.id];},{module:'BigPipe',line:534,column:26}).
bind(this));

if(pageletData.jscc_map){
var jsccMap=eval(pageletData.jscc_map),
jsccDestructor=JSCC.init(jsccMap);
pagelet.addDestructor(jsccDestructor);}


if(pageletData.resource_map)
Bootloader.setResourceMap(pageletData.resource_map);

if(pageletData.bootloadable)
Bootloader.enableBootload(pageletData.bootloadable);

ix.add(pageletData.ixData);


this._informPageletEvent('setup',pageletData);


var pageletDisplayArbiter=new Arbiter();
pageletDisplayArbiter.registerCallback
(this._displayPageletHandler.bind(this,pageletData),

['phase_begin',
'preceding_pagelets_displayed',
'display_resources_downloaded']);



this.arbiter.registerCallback(__annotator(function(){
pageletDisplayArbiter.inform('phase_begin');},{module:'BigPipe',line:566,column:34}),
['phase_begin_'+pageletData.phase]);

var precedingPagelets=pageletData.display_dependency||[],
pageletDisplayedEvents=precedingPagelets.map(__annotator(function(id){
return id+'_displayed';},{module:'BigPipe',line:571,column:55}));

this.arbiter.registerCallback(__annotator(function(){
pageletDisplayArbiter.inform('preceding_pagelets_displayed');},{module:'BigPipe',line:574,column:34}),
pageletDisplayedEvents);

var cssEventPrefix;
switch(BigPipeExperiments.prefetch){
case 'all':
cssEventPrefix='phase_prefetch_';
break;
case 'post_tti':


if(this._ttiPhase!==undefined&&phase>this._ttiPhase+1){
cssEventPrefix='phase_prefetch_';}else

cssEventPrefix='phase_begin_';

break;

default:cssEventPrefix='phase_begin_';
break;}



this.arbiter.registerCallback(__annotator(function(){
this._informPageletEvent('css',pageletData);
var displayResources=
(pageletData.css||[]).concat(pageletData.displayJS||[]);
Bootloader.loadResources(displayResources,__annotator(function(){
this._informPageletEvent('css_load',pageletData);
this.arbiter.inform(pageletData.id+'_css_end',true,arbiter_state);
pageletDisplayArbiter.inform('display_resources_downloaded');},{module:'BigPipe',line:602,column:49}).
bind(this),false,pageletData.id);},{module:'BigPipe',line:598,column:34}).
bind(this),[cssEventPrefix+phase]);

this.arbiter.registerCallback(this.onloadCallback,['pagelet_onload']);

var jsEvents=[pageletData.id+'_displayed'];
if(!this.jsNonBlock)
switch(BigPipeExperiments.download_js){
case 'post_tti':
jsEvents.push('tti_pagelet_displayed');
break;

default:jsEvents.push(this.domContentEvt);
break;}



if(this._secondFlushRan){
Bootloader.loadResources(pageletData.js||[]);}else

Array.prototype.push.apply(this._secondFlushPendingJS,pageletData.js||[]);

this.arbiter.registerCallback
(this._downloadJsForPagelet.bind(this,pageletData),jsEvents);

if(pageletData.is_last)
this._endPhase(phase);},{module:'BigPipe',line:492,column:37}),

'BigPipe#onPageletArrive')});


function getContentMarkup(content){
if(!content||typeof content==='string')
return content;

if(content.container_id){
var container=$(content.container_id);
content=extractMarkup(container)||'';
container.parentNode.removeChild(container);
return content;}

return null;}__annotator(getContentMarkup,{module:'BigPipe',line:637,column:0,name:'getContentMarkup'});


BigPipe.Events=
{init:'BigPipe/init',
tti:'tti_bigpipe'};


function extractMarkup(container){
if(!container.firstChild){

Bootloader.loadModules(["ErrorSignal"],__annotator(function(ErrorSignal){
ErrorSignal.sendErrorSignal
('bigpipe',
'Pagelet markup container is empty.');},{module:'BigPipe',line:658,column:44}));

return null;}

if(container.firstChild.nodeType!==8)

return null;


var comment=container.firstChild.nodeValue;

comment=comment.substring(1,comment.length-1);

return comment.replace(/\\([\s\S]|$)/g,'$1');}__annotator(extractMarkup,{module:'BigPipe',line:655,column:0,name:'extractMarkup'});


function appendNodes(container,markup){
var nn=document.createElement('div'),

hax=ie<7;
if(hax)







container.appendChild(nn);


nn.innerHTML=markup;

var frag=document.createDocumentFragment();


while(nn.firstChild)
frag.appendChild(nn.firstChild);

container.appendChild(frag);


if(hax)
container.removeChild(nn);}__annotator(appendNodes,{module:'BigPipe',line:677,column:0,name:'appendNodes'});



module.exports=BigPipe;},{module:'BigPipe',line:0,column:0,name:'$module_BigPipe'}),null);

/** js/downstream/emitter/internal/EventEmitterWithValidation.js */


















__d('EventEmitterWithValidation',['BaseEventEmitter'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i,j;

'use strict';i=






h;j=i&&i.prototype;Object.assign(k,i);k.prototype=Object.create(i.prototype);k.prototype.constructor=k;k.__superConstructor__=i;




function k(n){return __bodyWrapper(this,arguments,function(){
j.constructor.call(this);
this.$EventEmitterWithValidation_eventTypes=Object.keys(n);},{params:[[n,'object','eventTypes']]});}__annotator(k,{module:'EventEmitterWithValidation',line:33,column:2,name:'EventEmitterWithValidation'},{params:['object']});k.prototype.






emit=__annotator(function(n){return __bodyWrapper(this,arguments,function(){
l(n,this.$EventEmitterWithValidation_eventTypes);
return j.emit.apply(this,arguments);},{params:[[n,'string','eventType']]});},{module:'EventEmitterWithValidation',line:42,column:6},{params:['string']});



function l(n,o){
if(o.indexOf(n)===-1)
throw new TypeError(m(n,o));}__annotator(l,{module:'EventEmitterWithValidation',line:48,column:0,name:'assertAllowsEventType'});



function m(n,o){
var p='Unknown event type "'+n+'". ';



p+='Known event types: '+o.join(', ')+'.';
return p;}__annotator(m,{module:'EventEmitterWithValidation',line:54,column:0,name:'errorMessageFor'});











































































f.exports=k;},{module:'EventEmitterWithValidation',line:0,column:0,name:'$module_EventEmitterWithValidation'}),null);

/** js/downstream/emitter/internal/mixInEventEmitter.js */

















__d('mixInEventEmitter',['EventEmitterWithHolding','EventEmitterWithValidation','EventHolder','invariant'],__annotator(function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();

'use strict';var l=Object.assign||__annotator(function(o){for(var p=1;p<arguments.length;p++){var q=arguments[p];for(var r in q)if(Object.prototype.hasOwnProperty.call(q,r))o[r]=q[r];}return o;},{module:'mixInEventEmitter',line:0,column:0});




























function m(o,p){
!p?k(0,'Must supply set of valid event types'):undefined;



var q=o.prototype||o;
!!q.__eventEmitter?k(0,'An active emitter is already mixed in'):undefined;

var r=o.constructor;
if(r)

!(r===Object||r===Function)?k(0,
'Mix EventEmitter into a class, not an instance'):undefined;





q.__types=l({},q.__types,p);
Object.assign(q,n);}__annotator(m,{module:'mixInEventEmitter',line:49,column:0,name:'mixInEventEmitter'});


var n=
{emit:__annotator(function(o,p,q,r,s,t,u){
return this.__getEventEmitter().emit(o,p,q,r,s,t,u);},{module:'mixInEventEmitter',line:72,column:8}),


emitAndHold:__annotator(function(o,p,q,r,s,t,u){
return this.__getEventEmitter().emitAndHold(o,p,q,r,s,t,u);},{module:'mixInEventEmitter',line:76,column:15}),


addListener:__annotator(function(o,p,q){
return this.__getEventEmitter().addListener(o,p,q);},{module:'mixInEventEmitter',line:80,column:15}),


once:__annotator(function(o,p,q){
return this.__getEventEmitter().once(o,p,q);},{module:'mixInEventEmitter',line:84,column:8}),


addRetroactiveListener:__annotator(function(o,p,q){
return this.__getEventEmitter().addRetroactiveListener
(o,
p,
q);},{module:'mixInEventEmitter',line:88,column:26}),



addListenerMap:__annotator(function(o,p){
return this.__getEventEmitter().addListenerMap(o,p);},{module:'mixInEventEmitter',line:96,column:18}),


addRetroactiveListenerMap:__annotator(function(o,p){
return this.__getEventEmitter().addListenerMap(o,p);},{module:'mixInEventEmitter',line:100,column:29}),


listeners:__annotator(function(o){
return this.__getEventEmitter().listeners(o);},{module:'mixInEventEmitter',line:104,column:13}),


removeAllListeners:__annotator(function(){
this.__getEventEmitter().removeAllListeners();},{module:'mixInEventEmitter',line:108,column:22}),


removeCurrentListener:__annotator(function(){
this.__getEventEmitter().removeCurrentListener();},{module:'mixInEventEmitter',line:112,column:25}),


releaseHeldEventType:__annotator(function(o){
this.__getEventEmitter().releaseHeldEventType(o);},{module:'mixInEventEmitter',line:116,column:24}),


__getEventEmitter:__annotator(function(){
if(!this.__eventEmitter){
var o=new i(this.__types),
p=new j();
this.__eventEmitter=new h(o,p);}

return this.__eventEmitter;},{module:'mixInEventEmitter',line:120,column:21})};



f.exports=m;},{module:'mixInEventEmitter',line:0,column:0,name:'$module_mixInEventEmitter'}),null);

/** js/downstream/core/pageID.js */





















__d("pageID",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();
f.exports=Math.floor(2147483648*Math.random()).toString(36);},{module:"pageID",line:0,column:0,name:"$module_pageID"}),null);

/** js/downstream/core/NavigationMetrics.js */


















__d('NavigationMetrics-upstream',['mixInEventEmitter','pageID','performance'],__annotator(function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();












































var k=false,
l=0,
m,
n,

o=
{NAVIGATION_DONE:'NAVIGATION_DONE'},


p=j.timing&&j.timing.navigationStart||0,
q=0,
r=0,
s,
t,
u;

function v(){
m=i+':'+l;}__annotator(v,{module:'NavigationMetrics-upstream',line:80,column:0,name:'updateLoadID'});







var w=






{setTTI:__annotator(function(y){
q=y;
return this;},{module:'NavigationMetrics-upstream',line:96,column:10}),








setE2E:__annotator(function(y){
r=y;
return this;},{module:'NavigationMetrics-upstream',line:107,column:10}),





setServerLID:__annotator(function(y){
n=y;
return this;},{module:'NavigationMetrics-upstream',line:115,column:16}),






doneNavigation:__annotator(function(){
l++;
v();

x.emitAndHold(o.NAVIGATION_DONE,m,
{page:s,
pageType:t,
pageURI:u,
start:p,
tti:q,
e2e:r,
serverLID:n});


p=0;
q=0;
r=0;
n=undefined;},{module:'NavigationMetrics-upstream',line:124,column:18}),


setStart:__annotator(function(y){
p=y;
return this;},{module:'NavigationMetrics-upstream',line:144,column:12})},



x=
{Events:o,

init:__annotator(function(y){
throw new Error('NavigationMetrics.init should be overridden by shim');},{module:'NavigationMetrics-upstream',line:153,column:8}),


setPage:__annotator(function(y){
if(!k){
k=true;
x.init(w);}


s=y.page;
t=y.page_type;
u=y.page_uri;},{module:'NavigationMetrics-upstream',line:157,column:11})};



h(x,o);

f.exports=x;},{module:'NavigationMetrics-upstream',line:0,column:0,name:'$module_NavigationMetrics_upstream'}),null);

/** js/downstream/core/__shims__/NavigationMetrics.js */




__d('NavigationMetrics',['Arbiter','BigPipe','NavigationMetrics-upstream','PageEvents'],__annotator(function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();










var l={};

j.init=__annotator(function(m){














h.subscribe(i.Events.init,__annotator(function(n,o){
var p=o.arbiter;
p.subscribe(i.Events.tti,__annotator(function(q,r){


m.setServerLID(r.lid);
if(r.ajax){
var s=l[r.rid];
if(s)
s.tti=r.ts;}else


m.setTTI(r.ts);},{module:'NavigationMetrics',line:35,column:50}));


p.subscribe(k.AJAXPIPE_SEND,__annotator(function(q,r){
if(r.quickling)
l[r.rid]={start:r.ts};},{module:'NavigationMetrics',line:48,column:56}));


p.subscribe(k.AJAXPIPE_ONLOAD,__annotator(function(q,r){
var s=l[r.rid];
if(s){
m.setStart(s.start);
m.setTTI(s.tti);
m.setE2E(r.ts);
m.doneNavigation();}},{module:'NavigationMetrics',line:53,column:58}));},{module:'NavigationMetrics',line:33,column:41}));



h.subscribe(k.BIGPIPE_ONLOAD,__annotator(function(n,o){
m.setE2E(o.ts);
m.doneNavigation();},{module:'NavigationMetrics',line:63,column:47}));},{module:'NavigationMetrics',line:18,column:25});



f.exports=j;},{module:'NavigationMetrics',line:0,column:0,name:'$module_NavigationMetrics'}),null);

/** js/downstream/storage/WebStorage.js */


















__d('WebStorage',['ErrorUtils','ex'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();



var j={};










function k(r){return __bodyWrapper(this,arguments,function(){
if(!j.hasOwnProperty(r))
j[r]=l(r);

return j[r];},{params:[[r,'string','storageName']]});}__annotator(k,{module:'WebStorage',line:34,column:0,name:'getCachedStorage'},{params:['string']});


function l(r){return __bodyWrapper(this,arguments,function(){


try{var t=window[r];



if(t){
var u='__test__'+Date.now();
t.setItem(u,'');
t.removeItem(u);}

return t;}catch(
s){
}},{params:[[r,'string','storageName']]});}__annotator(l,{module:'WebStorage',line:41,column:0,name:'getStorage'},{params:['string']});



function m(){return __bodyWrapper(this,arguments,function(){
return k('localStorage');},{returns:'?object'});}__annotator(m,{module:'WebStorage',line:59,column:0,name:'getLocalStorage'},{returns:'?object'});


function n(){return __bodyWrapper(this,arguments,function(){
return k('sessionStorage');},{returns:'?object'});}__annotator(n,{module:'WebStorage',line:63,column:0,name:'getSessionStorage'},{returns:'?object'});





function o(r){return __bodyWrapper(this,arguments,function(){
var s=[];
for(var t=0;t<r.length;t++)
s.push(r.key(t));

return s;},{params:[[r,'object','storage']]});}__annotator(o,{module:'WebStorage',line:70,column:0,name:'getKeys'},{params:['object']});





function p(r,s,t){return __bodyWrapper(this,arguments,function(){
var u=null;

try{r.setItem(s,t);}catch(
v){

var w=o(r).map(__annotator(function(x){
var y=r.getItem(x).length;
return x+'('+y+')';},{module:'WebStorage',line:87,column:36}));


u=new Error(i
('Storage quota exceeded while setting %s(%s). Items(length) follows: %s',
s,
t.length,
w.join()));

h.reportError(u);}


return u;},{params:[[r,'object','storage'],[s,'string','key'],[t,'string','value']]});}__annotator(p,{module:'WebStorage',line:81,column:0,name:'setItemGuarded'},{params:['object','string','string']});


var q=
{getLocalStorage:m,
getSessionStorage:n,
setItemGuarded:p};


f.exports=q;},{module:'WebStorage',line:0,column:0,name:'$module_WebStorage'}),null);

/** js/downstream/core/isInIframe.js */






















__d("isInIframe",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();




var h=window!=window.top;

function i(){
return h;}__annotator(i,{module:"isInIframe",line:30,column:0,name:"isInIframe"});


f.exports=i;},{module:"isInIframe",line:0,column:0,name:"$module_isInIframe"}),null);

/** js/downstream/storage/WebStorageMutex.js */

















__d('WebStorageMutex',['WebStorage','setTimeoutAcrossTransitions','pageID'],__annotator(function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();


























var k=h.getLocalStorage(),
l=j;






function m(n){'use strict';
this.name=n;}__annotator(m,{module:'WebStorageMutex',line:53,column:2,name:'WebStorageMutex'});m.





testSetPageID=__annotator(function(n){'use strict';
l=n;},{module:'WebStorageMutex',line:60,column:22});m.prototype.






$WebStorageMutex_owner=__annotator(function(){'use strict';
if(!k)

return l;

var n=k.getItem('mutex_'+this.name);
n=n?n.split(':'):null;
return n&&n[1]>=Date.now()?n[0]:null;},{module:'WebStorageMutex',line:68,column:8});m.prototype.







$WebStorageMutex_writeLock=__annotator(function(n){'use strict';
if(!k)
return;

var o=Date.now()+(n||10000);
h.setItemGuarded
(k,
'mutex_'+this.name,
l+':'+o);},{module:'WebStorageMutex',line:83,column:12});m.prototype.






hasLock=__annotator(function(){'use strict';
return this.$WebStorageMutex_owner()==l;},{module:'WebStorageMutex',line:98,column:9});m.prototype.











lock=__annotator(function(n,o,p){'use strict';
if(this.$WebStorageMutex_locking)
clearTimeout(this.$WebStorageMutex_locking);



if(l==(this.$WebStorageMutex_owner()||l))
this.$WebStorageMutex_writeLock(p);





this.$WebStorageMutex_locking=i(__annotator
(function(){
this.$WebStorageMutex_locking=null;
var q=this.hasLock()?n:o;
if(q)
q(this);},{module:'WebStorageMutex',line:125,column:6}).bind(this),


0);},{module:'WebStorageMutex',line:111,column:6});m.prototype.






unlock=__annotator(function(){'use strict';
if(this.$WebStorageMutex_locking)
clearTimeout(this.$WebStorageMutex_locking);

if(k&&this.hasLock())
k.removeItem('mutex_'+this.name);},{module:'WebStorageMutex',line:139,column:8});




f.exports=m;},{module:'WebStorageMutex',line:0,column:0,name:'$module_WebStorageMutex'}),null);

/** js/downstream/banzai/Banzai.js */

















__d('Banzai',['BanzaiAdapter','CurrentUser','ErrorUtils','ExecutionEnvironment','FBJSON','NavigationMetrics','WebStorage','emptyFunction','isInIframe','pageID','setTimeoutAcrossTransitions','WebStorageMutex'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){if(c.__markCompiled)c.__markCompiled();



































































































var s=h.adapter,
t=p(),

u='bz:',


v=0,
w=1,
x=2,

y,
z,

aa=[],

ba=null;

function ca(ja){
return ja[2]>=Date.now()-(s.config.EXPIRY||h.EXPIRY);}__annotator(ca,{module:'Banzai',line:135,column:0,name:'canSend'});



function da(ja,ka){

ja.__meta.status=v;
ja[3]=(ja[3]||0)+1;





if(!ja.__meta.retry&&ka>=400&&ka<600)
aa.push(ja);}__annotator(da,{module:'Banzai',line:140,column:0,name:'retryPost'});







function ea(ja){
var ka=Date.now()+ja;
if(!z||ka<z){
z=ka;
clearTimeout(y);
y=r(fa,ja);
return true;}}__annotator(ea,{module:'Banzai',line:158,column:0,name:'schedule'});




function fa(){
ga(null,null);}__annotator(fa,{module:'Banzai',line:169,column:0,name:'send'});


function ga(ja,ka){

z=null;
ea(h.BASIC.delay);


if(!s.readyToSend()){
if(ka)
ka();

return;}



s.inform(h.SEND);







var la=[],
ma=[],
na={};

aa=aa.filter(__annotator(function(oa){
var pa=oa.__meta;


if(pa.status>=x||!ca(oa))
return false;



if(pa.status>=w)
return true;



var qa=pa.pageID+pa.userID,
ra=na[qa];
if(!ra){
ra=
{user:pa.userID,
page_id:pa.pageID,
posts:[]};

na[qa]=ra;
la.push(ra);}



pa.status=w;
ra.posts.push(oa);
ma.push(oa);



return pa.retry;},{module:'Banzai',line:199,column:33}));




if(la.length<=0){

s.inform(h.OK);
if(ja)
ja();

return;}







la[0].trigger=ba;
ba=null;

s.send(la,__annotator
(function(){

ma.forEach(__annotator(function(oa){
oa.__meta.status=x;},{module:'Banzai',line:257,column:28}));

if(ja)
ja();},{module:'Banzai',line:255,column:4}),__annotator


(function(oa){


ma.forEach(__annotator(function(pa){
da(pa,oa);},{module:'Banzai',line:267,column:28}));


if(ka)
ka();},{module:'Banzai',line:264,column:4}));}__annotator(ga,{module:'Banzai',line:173,column:0,name:'sendWithCallbacks'});






var ha;
function ia(){
if(!ha){
var ja=n.getLocalStorage();
if(ja&&!t){
ha=
{store:__annotator(function ka(){
if(aa.length<=0)
return;


var la=aa.map(__annotator(function(ma){
return [ma[0],ma[1],ma[2],ma[3]||0,ma.__meta];},{module:'Banzai',line:290,column:37}));

aa=[];


ja.setItem
(u+q+'.'+Date.now(),
l.stringify(la));},{module:'Banzai',line:285,column:15,name:'store'}),



restore:__annotator(function ka(){


var la=c('WebStorageMutex');
new la('banzai').lock(__annotator(function(ma){



var na=[];
for(var oa=0;oa<ja.length;oa++){
var pa=ja.key(oa);


if(pa.indexOf(u)===0&&pa.indexOf('bz:__')!==0)
na.push(pa);}




na.forEach(__annotator(function(qa){


var ra=ja.getItem(qa);
ja.removeItem(qa);

if(!ra)
return;



var sa=l.parse(ra,f.id);
sa.forEach(__annotator(function(ta){
if(!ta)return;

var ua=ta.__meta=ta.pop(),

va=ca(ta);

if(!va)
return;


var wa=i.getID(),
xa=ua.userID===wa,
ya=
h.isEnabled('allow_userid_mismatch')&&
wa==='0';

if(xa||ya){
ua.status=v;
aa.push(ta);}},{module:'Banzai',line:333,column:28}));},{module:'Banzai',line:321,column:25}));




ma.unlock();},{module:'Banzai',line:306,column:47}));},{module:'Banzai',line:302,column:17,name:'restore'})};}else




ha=
{store:o,
restore:o};}}__annotator(ia,{module:'Banzai',line:280,column:0,name:'initializeStorage'});










h.SEND='Banzai:SEND';
h.OK='Banzai:OK';
h.ERROR='Banzai:ERROR';
h.SHUTDOWN='Banzai:SHUTDOWN';
h.SEND_TIMEOUT=15000;
h.VITAL_WAIT=1000;
h.BASIC_WAIT=60000;



h.EXPIRY=30*60000;




h.VITAL=
{delay:s.config.MIN_WAIT||h.VITAL_WAIT};

h.BASIC=
{delay:s.config.MAX_WAIT||h.BASIC_WAIT};


h.FBTRACE=s.config.fbtrace,

h.isEnabled=__annotator(function(ja){





return s.config.gks&&s.config.gks[ja];},{module:'Banzai',line:399,column:19});



h.post=__annotator(function(ja,ka,la){

if(!ja)
j.reportError
(new Error('Banzai.post called without specifying a route'));


la=la||{};
var ma=la.retry;


if(s.config.disabled)
return;


if(!k.canUseDOM)
return;



var na=s.config.blacklist;
if(na)
if(na.indexOf)
if(typeof na.indexOf=='function')
if(na.indexOf(ja)!=-1)
return;







if(t&&document.domain=='facebook.com'){
var oa;

try{oa=b.top.require('Banzai');}catch(
pa){


oa=null;}


if(oa){
oa.post.apply(oa,arguments);
return;}}




var qa=
[ja,
ka,
Date.now(),
0];



qa.__meta=
{retry:ma===true,
pageID:q,
userID:i.getID(),
status:v};


if(la.signal){


qa.__meta.status=w;

var ra=
[{user:i.getID(),
page_id:q,
posts:[qa],
trigger:ja}];


s.send
(ra,__annotator
(function(){
qa.__meta.status=x;},{module:'Banzai',line:488,column:6}),__annotator

(function(ta){
da(qa,ta);},{module:'Banzai',line:491,column:6}),

true);




if(!ma)
return;}



aa.push(qa);


var sa=la.delay;
if(sa==null)
sa=h.BASIC_WAIT;

if(ea(sa)||!ba)
ba=ja;},{module:'Banzai',line:409,column:14});



h.flush=__annotator(function(ja,ka){
clearTimeout(y);
y=0;
ga(ja,ka);},{module:'Banzai',line:516,column:15});


h.subscribe=s.subscribe;




h._schedule=ea;




h._store=__annotator(function(ja){
ia();
j.applyWithGuard(ha.store,ha);},{module:'Banzai',line:532,column:16});





h._restore=__annotator(function(ja){
ia();
j.applyWithGuard(ha.restore,ha);


ea(s.config.RESTORE_WAIT||h.VITAL_WAIT);},{module:'Banzai',line:540,column:18});





h._unload=__annotator(function(){

s.cleanup();
s.inform(h.SHUTDOWN);
ia();
j.applyWithGuard(ha.store,ha);},{module:'Banzai',line:551,column:17});






h._testState=__annotator(function(){

return {postBuffer:aa,
triggerRoute:ba};},{module:'Banzai',line:563,column:20});







if(k.canUseDOM){

s.setHooks();


m.addListener
(m.Events.NAVIGATION_DONE,__annotator
(function(){
h._restore();
m.removeCurrentListener();},{module:'Banzai',line:581,column:4}));}




f.exports=h;},{module:'Banzai',line:0,column:0,name:'$module_Banzai'}),null);

/** js/downstream/banzai/BanzaiODS.js */


















__d('BanzaiODS',['Banzai','invariant'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();



















function j(){
var l={},
m={};












function n(o,p,q,r){return __bodyWrapper(this,arguments,function(){










if(q===undefined)q=1;
if(r===undefined)r=1;

if(o in m)
if(m[o]<=0){
return;}else


q/=m[o];




var s=l[o]||(l[o]={}),
t=s[p]||(s[p]=[0]);




q=Number(q);
r=Number(r);


if(!isFinite(q)||!isFinite(r))








return;



t[0]+=q;


if(arguments.length>=4){
if(!t[1])t[1]=0;
t[1]+=r;}},{params:[[o,'string','ent'],[p,'string','key'],[q,'?number','n'],[r,'?number','d']]});}__annotator(n,{module:'BanzaiODS',line:54,column:2,name:'_bump'},{params:['string','string','?number','?number']});









return {setEntitySample:__annotator(function(o,p){return __bodyWrapper(this,arguments,function(){



m[o]=Math.random()<p?p:0;},{params:[[o,'string','ent'],[p,'number','rate']]});},{module:'BanzaiODS',line:116,column:21},{params:['string','number']}),





bumpEntityKey:__annotator(function(o,p,q){return __bodyWrapper(this,arguments,function(){
n(o,p,q);},{params:[[o,'string','ent'],[p,'string','key'],[q,'?number','n']]});},{module:'BanzaiODS',line:126,column:19},{params:['string','string','?number']}),






bumpFraction:__annotator(function(o,
p,
q,
r){return __bodyWrapper(this,arguments,function(){
n(o,p,q,r);},{params:[[o,'string','ent'],[p,'string','key'],[q,'?number','n'],[r,'?number','d']]});},{module:'BanzaiODS',line:134,column:18},{params:['string','string','?number','?number']}),


flush:__annotator(function(o){return __bodyWrapper(this,arguments,function(){
for(var p in l)
h.post('ods:'+p,l[p],o);

l={};},{params:[[o,'?object','postOptions']]});},{module:'BanzaiODS',line:141,column:11},{params:['?object']})};}__annotator(j,{module:'BanzaiODS',line:39,column:0,name:'_create'});




var k=j();
k.create=j;


h.subscribe(h.SEND,k.flush.bind(k,null));

f.exports=k;},{module:'BanzaiODS',line:0,column:0,name:'$module_BanzaiODS'}),null);

/** js/downstream/component_utils/lowerDomain.js */

















__d("lowerDomain",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();







if(document.domain.toLowerCase().match(/(^|\.)facebook\..*/))
document.domain="facebook.com";},{module:"lowerDomain",line:0,column:0,name:"$module_lowerDomain"}),null);

/** js/downstream/core/dom/Scroll.js */

















__d("Scroll",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();






function h(j,k){
return !!k&&
(j===k.documentElement||j===k.body);}__annotator(h,{module:"Scroll",line:25,column:0,name:"_isViewportScrollElement"});















var i=




{getTop:__annotator(function(j){
var k=j.ownerDocument;
return h(j,k)?



k.body.scrollTop||k.documentElement.scrollTop:
j.scrollTop;},{module:"Scroll",line:48,column:10}),






setTop:__annotator(function(j,k){
var l=j.ownerDocument;
if(h(j,l)){
l.body.scrollTop=l.documentElement.scrollTop=k;}else

j.scrollTop=k;},{module:"Scroll",line:62,column:10}),







getLeft:__annotator(function(j){
var k=j.ownerDocument;
return h(j,k)?
k.body.scrollLeft||k.documentElement.scrollLeft:
j.scrollLeft;},{module:"Scroll",line:75,column:11}),






setLeft:__annotator(function(j,k){
var l=j.ownerDocument;
if(h(j,l)){
l.body.scrollLeft=l.documentElement.scrollLeft=k;}else

j.scrollLeft=k;},{module:"Scroll",line:86,column:11})};




f.exports=i;},{module:"Scroll",line:0,column:0,name:"$module_Scroll"}),null);

/** js/downstream/core/dom/isNode.js */


















__d('isNode',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();





function h(i){return __bodyWrapper(this,arguments,function(){
return !!(i&&
(typeof Node==='function'?i instanceof Node:
typeof i==='object'&&
typeof i.nodeType==='number'&&
typeof i.nodeName==='string'));},{returns:'boolean'});}__annotator(h,{module:'isNode',line:25,column:0,name:'isNode'},{returns:'boolean'});



f.exports=h;},{module:'isNode',line:0,column:0,name:'$module_isNode'}),null);

/** js/downstream/core/dom/isTextNode.js */


















__d('isTextNode',['isNode'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();







function i(j){return __bodyWrapper(this,arguments,function(){
return h(j)&&j.nodeType==3;},{returns:'boolean'});}__annotator(i,{module:'isTextNode',line:27,column:0,name:'isTextNode'},{returns:'boolean'});


f.exports=i;},{module:'isTextNode',line:0,column:0,name:'$module_isTextNode'}),null);

/** js/downstream/core/dom/containsNode.js */


















__d('containsNode',['isTextNode'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();












function i(j,k){return __bodyWrapper(this,arguments,function(){
if(!j||!k){
return false;}else
if(j===k){
return true;}else
if(h(j)){
return false;}else
if(h(k)){
return i(j,k.parentNode);}else
if(j.contains){
return j.contains(k);}else
if(j.compareDocumentPosition){
return !!(j.compareDocumentPosition(k)&16);}else

return false;},{params:[[j,'?DOMNode','outerNode'],[k,'?DOMNode','innerNode']],returns:'boolean'});}__annotator(i,{module:'containsNode',line:32,column:0,name:'containsNode'},{params:['?DOMNode','?DOMNode'],returns:'boolean'});



f.exports=i;},{module:'containsNode',line:0,column:0,name:'$module_containsNode'}),null);

/** js/downstream/core/dom/getActiveElement.js */


















__d("getActiveElement",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();







function h(){return __bodyWrapper(this,arguments,function(){

try{return document.activeElement||document.body;}catch(
i){
return document.body;}},{returns:"?HTMLElement"});}__annotator(h,{module:"getActiveElement",line:27,column:0,name:"getActiveElement"},{returns:"?HTMLElement"});



f.exports=h;},{module:"getActiveElement",line:0,column:0,name:"$module_getActiveElement"}),null);

/** js/downstream/core/dom/getDocumentScrollElement.js */


















__d('getDocumentScrollElement',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

'use strict';

var h=
typeof navigator!=='undefined'&&
navigator.userAgent.indexOf('AppleWebKit')>-1;










function i(j){return __bodyWrapper(this,arguments,function(){
j=j||document;
return !h&&j.compatMode==='CSS1Compat'?
j.documentElement:
j.body;},{params:[[j,'?DOMDocument','doc']],returns:'?HTMLElement'});}__annotator(i,{module:'getDocumentScrollElement',line:36,column:0,name:'getDocumentScrollElement'},{params:['?DOMDocument'],returns:'?HTMLElement'});


f.exports=i;},{module:'getDocumentScrollElement',line:0,column:0,name:'$module_getDocumentScrollElement'}),null);

/** js/downstream/core/dom/isElementNode.js */


















__d('isElementNode',['isNode'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();










function i(j){return __bodyWrapper(this,arguments,function(){
return h(j)&&j.nodeType==1;},{returns:'boolean'});}__annotator(i,{module:'isElementNode',line:30,column:0,name:'isElementNode'},{returns:'boolean'});


f.exports=i;},{module:'isElementNode',line:0,column:0,name:'$module_isElementNode'}),null);

/** js/downstream/core/getObjectValues.js */


















__d("getObjectValues",[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();










function h(i){return __bodyWrapper(this,arguments,function(){
var j=[];
for(var k in i)
j.push(i[k]);

return j;},{params:[[i,"object","obj"]],returns:"array"});}__annotator(h,{module:"getObjectValues",line:30,column:0,name:"getObjectValues"},{params:["object"],returns:"array"});


f.exports=h;},{module:"getObjectValues",line:0,column:0,name:"$module_getObjectValues"}),null);

/** js/downstream/logging/ScriptPath.js */


















__d('ScriptPath',['WebStorage','ErrorUtils','isInIframe'],__annotator(function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();























var k='sp_pi',
l=1000*30,

m=h.getLocalStorage(),

n=null,
o=null,
p={},
q=0,






r=null,

s=
{PAGE_LOAD:'load',
PAGE_UNLOAD:'unload',
OPEN_OVERLAY_VIEW:'open_overlay_view',
CLOSE_OVERLAY_VIEW:'close_overlay_view',
TRANSITION:'transition'},









t=[];

function u(ba){return __bodyWrapper(this,arguments,function(){
var ca=++q;
p[ca]=ba;
return ca;},{params:[[ba,'function','callback']],returns:'number'});}__annotator(u,{module:'ScriptPath',line:77,column:0,name:'_registerCallback'},{params:['function'],returns:'number'});


function v(ba){return __bodyWrapper(this,arguments,function(){
if(p[ba])
delete p[ba];},{params:[[ba,'number','token']]});}__annotator(v,{module:'ScriptPath',line:83,column:0,name:'_unregisterCallback'},{params:['number']});



function w(ba){return __bodyWrapper(this,arguments,function(){
Object.keys(p).forEach(__annotator(function(ca){
i.applyWithGuard(p[ca],null,
[{source:n,
dest:o,
cause:ba}]);},{module:'ScriptPath',line:90,column:34}));},{params:[[ba,'?string','cause']]});}__annotator(w,{module:'ScriptPath',line:89,column:0,name:'_notify'},{params:['?string']});




function x(){
return o?o.scriptPath:undefined;}__annotator(x,{module:'ScriptPath',line:99,column:0,name:'_getScriptPath'});


function y(){
if(!m||j())
return;

m.setItem
(k,
JSON.stringify
({pageInfo:o,
clickPoint:r,
time:Date.now()}));}__annotator(y,{module:'ScriptPath',line:103,column:0,name:'_storeScriptPathInfo'});




function z(){
if(!m)
return;

var ba=m.getItem(k);
if(ba){
var ca=JSON.parse(ba);
if(ca){
if(ca.time<Date.now()-l){
m.removeItem(k);
return;}

o=ca.pageInfo;
r=ca.clickPoint;
if(o)
o.restored=true;}}}__annotator(z,{module:'ScriptPath',line:117,column:0,name:'_loadScriptPathInfo'});





z();

var aa=

{set:__annotator(function(ba,
ca,
da){return __bodyWrapper(this,arguments,function(){
n=o;

o=
{scriptPath:ba,
categoryToken:ca,
extraData:da||{}};


t=[];


window._script_path=ba;

w();},{params:[[ba,'string','scriptPath'],[ca,'?string','categoryToken'],[da,'?object','extraData']]});},{module:'ScriptPath',line:142,column:7},{params:['string','?string','?object']}),


openOverlayView:__annotator(function(ba){return __bodyWrapper(this,arguments,function(){
if(!ba)
return;

var ca=t.length;
if(ca===0||t[ca-1]!==ba){
n=Object.assign({},o);
o.topViewEndpoint=ba;
t.push(ba);
w(s.OPEN_OVERLAY_VIEW);}},{params:[[ba,'string','endpoint']]});},{module:'ScriptPath',line:161,column:17},{params:['string']}),



closeOverlayView:__annotator(function(ba){return __bodyWrapper(this,arguments,function(){
var ca=t.lastIndexOf(ba);
if(ca===-1)
return;

n=Object.assign({},o);
if(ca>0){
o.topViewEndpoint=t[ca-1];}else

o.topViewEndpoint=null;

t=t.slice(0,ca);
w(s.CLOSE_OVERLAY_VIEW);},{params:[[ba,'string','endpoint']]});},{module:'ScriptPath',line:174,column:18},{params:['string']}),





setClickPointInfo:__annotator(function(ba){
r=ba;
y();},{module:'ScriptPath',line:192,column:21}),


getClickPointInfo:__annotator(function(){
return r;},{module:'ScriptPath',line:197,column:21}),






getScriptPath:x,






getCategoryToken:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return o?o.categoryToken:undefined;},{returns:'?string'});},{module:'ScriptPath',line:212,column:20},{returns:'?string'}),






getTopViewEndpoint:__annotator(function(){return __bodyWrapper(this,arguments,function(){
var ba=t.length;
return ba>0?
t[ba-1]:
x();},{returns:'?string'});},{module:'ScriptPath',line:220,column:22},{returns:'?string'}),


getPageInfo:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return o;},{returns:'?object'});},{module:'ScriptPath',line:227,column:15},{returns:'?object'}),


getSourcePageInfo:__annotator(function(){return __bodyWrapper(this,arguments,function(){
return n;},{returns:'?object'});},{module:'ScriptPath',line:231,column:21},{returns:'?object'}),


subscribe:__annotator(function(ba){return __bodyWrapper(this,arguments,function(){
return u(ba);},{params:[[ba,'function','callback']],returns:'number'});},{module:'ScriptPath',line:235,column:13},{params:['function'],returns:'number'}),


unsubscribe:__annotator(function(ba){return __bodyWrapper(this,arguments,function(){
v(ba);},{params:[[ba,'number','token']]});},{module:'ScriptPath',line:239,column:15},{params:['number']}),


shutdown:__annotator(function(){
y();},{module:'ScriptPath',line:243,column:12})};



aa.CAUSE=s;

f.exports=aa;},{module:'ScriptPath',line:0,column:0,name:'$module_ScriptPath'}),null);

/** js/downstream/useragent/UserAgent_DEPRECATED.js */

















__d('UserAgent_DEPRECATED',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();









































var h=false,


i,j,k,l,m,


n,


o,p,q,r,


s,


t,u,v,

w;

function x(){
if(h)
return;


h=true;






var z=navigator.userAgent,
aa=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(z),
ba=/(Mac OS X)|(Windows)|(Linux)/.exec(z);

t=/\b(iPhone|iP[ao]d)/.exec(z);
u=/\b(iP[ao]d)/.exec(z);
r=/Android/i.exec(z);
v=/FBAN\/\w+;/i.exec(z);
w=/Mobile/i.exec(z);






s=!!/Win64/.exec(z);

if(aa){
i=aa[1]?parseFloat(aa[1]):
aa[5]?parseFloat(aa[5]):NaN;

if(i&&document&&document.documentMode)
i=document.documentMode;


var ca=/(?:Trident\/(\d+.\d+))/.exec(z);
n=ca?parseFloat(ca[1])+4:i;

j=aa[2]?parseFloat(aa[2]):NaN;
k=aa[3]?parseFloat(aa[3]):NaN;
l=aa[4]?parseFloat(aa[4]):NaN;
if(l){



aa=/(?:Chrome\/(\d+\.\d+))/.exec(z);
m=aa&&aa[1]?parseFloat(aa[1]):NaN;}else

m=NaN;}else


i=j=k=m=l=NaN;


if(ba){
if(ba[1]){





var da=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(z);

o=da?parseFloat(da[1].replace('_','.')):true;}else

o=false;

p=!!ba[2];
q=!!ba[3];}else

o=p=q=false;}__annotator(x,{module:'UserAgent_DEPRECATED',line:79,column:0,name:'_populate'});



var y=







{ie:__annotator(function(){
return x()||i;},{module:'UserAgent_DEPRECATED',line:163,column:6}),








ieCompatibilityMode:__annotator(function(){
return x()||n>i;},{module:'UserAgent_DEPRECATED',line:173,column:23}),








ie64:__annotator(function(){
return y.ie()&&s;},{module:'UserAgent_DEPRECATED',line:183,column:8}),








firefox:__annotator(function(){
return x()||j;},{module:'UserAgent_DEPRECATED',line:193,column:11}),









opera:__annotator(function(){
return x()||k;},{module:'UserAgent_DEPRECATED',line:204,column:9}),









webkit:__annotator(function(){
return x()||l;},{module:'UserAgent_DEPRECATED',line:215,column:10}),






safari:__annotator(function(){
return y.webkit();},{module:'UserAgent_DEPRECATED',line:223,column:10}),








chrome:__annotator(function(){
return x()||m;},{module:'UserAgent_DEPRECATED',line:233,column:11}),








windows:__annotator(function(){
return x()||p;},{module:'UserAgent_DEPRECATED',line:243,column:11}),









osx:__annotator(function(){
return x()||o;},{module:'UserAgent_DEPRECATED',line:254,column:7}),







linux:__annotator(function(){
return x()||q;},{module:'UserAgent_DEPRECATED',line:263,column:9}),








iphone:__annotator(function(){
return x()||t;},{module:'UserAgent_DEPRECATED',line:273,column:10}),


mobile:__annotator(function(){
return x()||(t||u||r||w);},{module:'UserAgent_DEPRECATED',line:277,column:10}),


nativeApp:__annotator(function(){

return x()||v;},{module:'UserAgent_DEPRECATED',line:281,column:13}),


android:__annotator(function(){
return x()||r;},{module:'UserAgent_DEPRECATED',line:286,column:11}),


ipad:__annotator(function(){
return x()||u;},{module:'UserAgent_DEPRECATED',line:290,column:8})};



f.exports=y;},{module:'UserAgent_DEPRECATED',line:0,column:0,name:'$module_UserAgent_DEPRECATED'}),null);

/** js/emptyFunction.js */


__d('legacy:emptyFunction',['emptyFunction'],__annotator(function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();

b.emptyFunction=c('emptyFunction');},{module:'legacy:emptyFunction',line:0,column:0,name:'$module_legacy_emptyFunction'}),3);

/** js/lib/event/arbiter.js */


__d('legacy:arbiter',['Arbiter'],__annotator(function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();

b.Arbiter=c('Arbiter');},{module:'legacy:arbiter',line:0,column:0,name:'$module_legacy_arbiter'}),3);

/** js/lib/event/form_bubbling.js */





__d('event-form-bubbling',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

b.Event=b.Event||__annotator(function(){},{module:'event-form-bubbling',line:8,column:31});














b.Event.__inlineSubmit=__annotator(function(h,event){
var i=
b.Event.__getHandler&&
b.Event.__getHandler(h,'submit');

return i?null:b.Event.__bubbleSubmit(h,event);},{module:'event-form-bubbling',line:23,column:30});








b.Event.__bubbleSubmit=__annotator(function(h,event){
if(document.documentElement.attachEvent){
var i;
while(i!==false&&(h=h.parentNode))
i=h.onsubmit?
h.onsubmit(event):
b.Event.__fire&&b.Event.__fire(h,'submit',event);

return i;}},{module:'event-form-bubbling',line:37,column:30});},{module:'event-form-bubbling',line:0,column:0,name:'$module_event_form_bubbling'}),3);

/** js/lib/event/onload.js */


__d('legacy:onload',['Run','PageEvents'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



b.PageEvents=c('PageEvents');

b.onloadRegister_DEPRECATED=h.onLoad;
b.onloadRegister=__annotator(function(){






return h.onLoad.apply(this,arguments);},{module:'legacy:onload',line:10,column:24});


b.onafterloadRegister_DEPRECATED=h.onAfterLoad;
b.onafterloadRegister=__annotator(function(){






return h.onAfterLoad.apply(this,arguments);},{module:'legacy:onload',line:21,column:29});


b.onleaveRegister=h.onLeave;
b.onbeforeunloadRegister=h.onBeforeUnload;
b.onunloadRegister=h.onUnload;},{module:'legacy:onload',line:0,column:0,name:'$module_legacy_onload'}),3);

/** js/lib/event/wait_for_load.js */





__d('wait_for_load',['Bootloader','Run'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();







function j(m,n){
return window.domready&&n.call(m);}__annotator(j,{module:'wait_for_load',line:14,column:0,name:'run_if_loaded'});





function k(m,n,o){

h.loadComponents.call(h,n,o.bind(m));
return false;}__annotator(k,{module:'wait_for_load',line:21,column:0,name:'run_with'});

















function l(m,n,o){
o=o.bind(m,n);
if(window.domready)
return o();

switch((n||event).type){
case 'load':
case 'focus':
i.onAfterLoad(o);
return;
case 'click':
var p=m.style,
q=document.body.style;

p.cursor=q.cursor='progress';
i.onAfterLoad(__annotator(function(){
p.cursor=q.cursor='';
if(m.tagName.toLowerCase()=='a'){

if(false!==o()&&m.href)
window.location.href=m.href;}else

if(m.click)

m.click();},{module:'wait_for_load',line:57,column:22}));


break;}

return false;}__annotator(l,{module:'wait_for_load',line:42,column:0,name:'wait_for_load'});


b.run_if_loaded=j;
b.run_with=k;
b.wait_for_load=l;},{module:'wait_for_load',line:0,column:0,name:'$module_wait_for_load'}),3);

/** js/lib/markJSEnabled.js */




__d('markJSEnabled',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();


var h=document.documentElement;
h.className=h.className.replace('no_js','');},{module:'markJSEnabled',line:0,column:0,name:'$module_markJSEnabled'}),null);

/** js/lib/util/bootloader.js */


__d('legacy:bootloader',['Bootloader'],__annotator(function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();

b.Bootloader=c('Bootloader');},{module:'legacy:bootloader',line:0,column:0,name:'$module_legacy_bootloader'}),3);

/** js/lib/util/constructor-cache.js */


__d('legacy:constructor-cache',['JSCC'],__annotator(function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();

b.JSCC=c('JSCC');},{module:'legacy:constructor-cache',line:0,column:0,name:'$module_legacy_constructor_cache'}),3);

/** js/modules/goURI.js */




__d('goURI',['URISchemes'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();








function i(j,k,l){
j=j.toString();
if(/^([^.:/?#]+):/.test(j)&&
!h.isAllowed(RegExp.$1))
throw new Error('goURI: URI scheme rejected, URI: '+j);

if(!k&&b.PageTransitions){
b.PageTransitions.go(j,l);}else
if(window.location.href==j){
window.location.reload();}else

window.location.href=j;}__annotator(i,{module:'goURI',line:14,column:0,name:'goURI'});



f.exports=i;},{module:'goURI',line:0,column:0,name:'$module_goURI'}),null);

/** js/lib/util/goURI.js */


__d('legacy:goURI',['goURI'],__annotator(function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();

b.goURI=c('goURI');},{module:'legacy:goURI',line:0,column:0,name:'$module_legacy_goURI'}),3);

/** js/modules/InitialJSLoader.js */




__d('InitialJSLoader',['Arbiter','Bootloader','PageEvents','Run','ServerJS'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();







var m=
{INITIAL_JS_READY:'BOOTLOAD/JSREADY',






loadOnDOMContentReady:__annotator(function(n,o){
h.subscribe(j.BIGPIPE_DOMREADY,__annotator(function(){
function p(){
i.loadResources(n,__annotator(function(){
h.inform
(m.INITIAL_JS_READY,
true,
h.BEHAVIOR_STATE);},{module:'InitialJSLoader',line:24,column:44}));}__annotator(p,{module:'InitialJSLoader',line:23,column:6,name:'loadAndNotify'});



if(o){
setTimeout(p,o);}else

p();},{module:'InitialJSLoader',line:22,column:51}));},{module:'InitialJSLoader',line:21,column:25}),




handleServerJS:__annotator(function(n){
var o=new l();
o.handle(n);
k.onAfterLoad(o.cleanup.bind(o));},{module:'InitialJSLoader',line:40,column:18})};



f.exports=m;},{module:'InitialJSLoader',line:0,column:0,name:'$module_InitialJSLoader'}),null);

/** js/modules/DataStore.js */




__d('DataStore',['isEmpty'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();


















var i={},
j=1;







function k(n){
if(typeof n=='string'){
return 'str_'+n;}else






return 'elem_'+
(n.__FB_TOKEN||
(n.__FB_TOKEN=[j++]))[0];}__annotator(k,{module:'DataStore',line:33,column:0,name:'_getToken'});










function l(n){
var o=k(n);
return i[o]||(i[o]={});}__annotator(l,{module:'DataStore',line:55,column:0,name:'_getStorage'});


var m=









{set:__annotator(function(n,o,p){
if(!n)
throw new TypeError
('DataStore.set: namespace is required, got '+typeof n);

var q=l(n);
q[o]=p;
return n;},{module:'DataStore',line:70,column:7}),

















get:__annotator(function(n,o,p){
if(!n)
throw new TypeError
('DataStore.get: namespace is required, got '+typeof n);

var q=l(n),
r=q[o];



if(typeof r==='undefined'&&n.getAttribute)





if(n.hasAttribute&&!n.hasAttribute('data-'+o)){
r=undefined;}else{

var s=n.getAttribute('data-'+o);

r=null===s?undefined:s;}



if(p!==undefined&&r===undefined)
r=q[o]=p;

return r;},{module:'DataStore',line:95,column:7}),









remove:__annotator(function(n,o){
if(!n)
throw new TypeError
('DataStore.remove: namespace is required, got '+typeof n);

var p=l(n),
q=p[o];
delete p[o];



if(h(p))
m.purge(n);


return q;},{module:'DataStore',line:133,column:10}),







purge:__annotator(function(n){
delete i[k(n)];},{module:'DataStore',line:156,column:9}),



_storage:i};


f.exports=m;},{module:'DataStore',line:0,column:0,name:'$module_DataStore'}),null);

/** js/modules/DOMQuery.js */




__d('DOMQuery',['CSS','containsNode','createArrayFromMixed','createObjectFrom','ge','getDocumentScrollElement','isElementNode','isNode','isTextNode'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){if(c.__markCompiled)c.__markCompiled();






























function q(s,t){
return s.hasAttribute?
s.hasAttribute(t):s.getAttribute(t)!==null;}__annotator(q,{module:'DOMQuery',line:36,column:0,name:'hasAttribute'});


var r=












{find:__annotator(function(s,t){
var u=r.scry(s,t);











return u[0];},{module:'DOMQuery',line:54,column:8}),
















findPushSafe:__annotator(function(s,t,u){
var v=r.scry(s,t),
w=r.scry(s,u),

x;
if(v.length===1&&
w.length===1&&
v[0]===w[0]){
x=v;}else

x=v.concat(w);













return x[0];},{module:'DOMQuery',line:84,column:16}),







































































scry:__annotator(function(s,t){



if(!s||!s.getElementsByTagName)



return [];


var u=t.split(' '),
v=[s];





for(var w=0;w<u.length;w++){

if(v.length===0)
break;



if(u[w]==='')
continue;



var x=u[w],
y=u[w],
z=[],


aa=false;
if(x.charAt(0)=='^')
if(w===0){
aa=true;
x=x.slice(1);}else






return [];










x=x.replace(/\[(?:[^=\]]*=(?:"[^"]*"|'[^']*'))?|[.#]/g,
' $&');

var ba=x.split(' '),
ca=ba[0]||'*',
da=ca=='*',

ea=ba[1]&&ba[1].charAt(0)=='#';











if(ea){







var fa=l(ba[1].slice(1),s,ca);

if(fa&&(da||fa.tagName.toLowerCase()==ca))


for(var ga=0;ga<v.length;ga++)
if(aa&&r.contains(fa,v[ga])){
z=[fa];
break;}else

if(document==v[ga]||

r.contains(v[ga],fa)&&
v[ga]!==fa){



z=[fa];
break;}}else{








var ha=[],
ia=v.length,
ja,


ka=!aa&&
y.indexOf('[')<0&&
document.querySelectorAll;

for(var la=0;la<ia;la++){

if(aa){
ja=[];
var ma=v[la].parentNode;
while(n(ma)){
if(da||ma.tagName.toLowerCase()==ca)
ja.push(ma);


ma=ma.parentNode;}}else


if(ka){
ja=v[la].querySelectorAll(y);}else

ja=v[la].getElementsByTagName(ca);


var na=ja.length;
for(var oa=0;oa<na;oa++)
ha.push(ja[oa]);}



if(!ka)
for(var pa=1;pa<ba.length;pa++){
var qa=ba[pa],
ra=qa.charAt(0)=='.',
sa=qa.substring(1);

for(la=0;la<ha.length;la++){
var ta=ha[la];


if(!ta||ta.nodeType!==1)
continue;




if(ra){
if(!h.hasClass(ta,sa))
delete ha[la];

continue;}else{






var ua=
qa.slice(1,qa.length-1),
va=ua.indexOf('=');
if(va<0){


if(!q(ta,ua)){
delete ha[la];
continue;}}else{




var wa=ua.substr(0,va),
xa=ua.substr(va+1);

xa=xa.slice(1,xa.length-1);

if(ta.getAttribute(wa)!=xa){
delete ha[la];
continue;}}}}}






for(la=0;la<ha.length;la++)
if(ha[la]){
z.push(ha[la]);
if(aa)









break;}}







v=z;}


return v;},{module:'DOMQuery',line:180,column:8}),






getSelection:__annotator(function(){
var s=window.getSelection,
t=document.selection;
if(s){
return s()+'';}else
if(t)
return t.createRange().text;

return null;},{module:'DOMQuery',line:410,column:16}),











contains:__annotator(function(s,t){
s=l(s);
t=l(t);
typeof s==='string'||
typeof t==='string';


return i(s,t);},{module:'DOMQuery',line:430,column:12}),





















getRootElement:__annotator(function(){
var s=null;
if(window.Quickling&&Quickling.isActive())
s=l('content');

return s||document.body;},{module:'DOMQuery',line:459,column:18}),










isNode:__annotator(function(s){
return o(s);},{module:'DOMQuery',line:475,column:10}),














isNodeOfType:__annotator(function(s,t){





var u=j(t).join('|').toUpperCase().split('|'),
v=k(u);
return o(s)&&s.nodeName in v;},{module:'DOMQuery',line:491,column:16}),









isElementNode:__annotator(function(s){
return n(s);},{module:'DOMQuery',line:509,column:17}),








isTextNode:__annotator(function(s){
return p(s);},{module:'DOMQuery',line:519,column:14}),








isInputNode:__annotator(function(s){

return r.isNodeOfType(s,['input','textarea'])||
s.contentEditable==='true';},{module:'DOMQuery',line:529,column:15}),


getDocumentScrollElement:m};



f.exports=r;},{module:'DOMQuery',line:0,column:0,name:'$module_DOMQuery'}),null);

/** js/modules/DOMEvent.js */
















__d('DOMEvent',['invariant'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();




function i(j){return __bodyWrapper(this,arguments,function(){'use strict';
this.event=j||window.event;








!(typeof this.event.srcElement!='unknown')?h(0,
'DOMEvent: stale event passed to constructor'):undefined;


this.target=this.event.target||this.event.srcElement;},{params:[[j,'object','e']]});}__annotator(i,{module:'DOMEvent',line:22,column:2,name:'DOMEvent'},{params:['object']});i.prototype.


preventDefault=__annotator(function(){'use strict';
var j=this.event;
if(j.preventDefault){
j.preventDefault();
if(!('defaultPrevented' in j))
j.defaultPrevented=true;}else


j.returnValue=false;

return this;},{module:'DOMEvent',line:39,column:16});i.prototype.


isDefaultPrevented=__annotator(function(){'use strict';
var j=this.event;
return 'defaultPrevented' in j?
j.defaultPrevented:
j.returnValue===false;},{module:'DOMEvent',line:52,column:20});i.prototype.


stopPropagation=__annotator(function(){'use strict';
var j=this.event;
j.stopPropagation?j.stopPropagation():j.cancelBubble=true;
return this;},{module:'DOMEvent',line:59,column:17});i.prototype.


kill=__annotator(function(){'use strict';
this.stopPropagation().preventDefault();
return this;},{module:'DOMEvent',line:65,column:6});i.





killThenCall=__annotator(function(j){return __bodyWrapper(this,arguments,function(){'use strict';
return __annotator(function(k){
new i(k).kill();
return j();},{module:'DOMEvent',line:74,column:11});},{params:[[j,'function','func']]});},{module:'DOMEvent',line:73,column:21},{params:['function']});




f.exports=i;},{module:'DOMEvent',line:0,column:0,name:'$module_DOMEvent'}),null);

/** js/modules/DOMEventListener.js */













__d('DOMEventListener',['wrapFunction'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



var i,j;

if(window.addEventListener){


i=__annotator(function(l,m,n){return __bodyWrapper(this,arguments,function(){
n.wrapper=
h(n,'entry','DOMEventListener.add '+m);
l.addEventListener(m,n.wrapper,false);},{params:[[m,'string','name'],[n,'function','listener']]});},{module:'DOMEventListener',line:23,column:8},{params:['string','function']});

j=__annotator(function(l,m,n){return __bodyWrapper(this,arguments,function(){
l.removeEventListener(m,n.wrapper,false);},{params:[[m,'string','name'],[n,'function','listener']]});},{module:'DOMEventListener',line:28,column:11},{params:['string','function']});}else


if(window.attachEvent){


i=__annotator(function(l,m,n){return __bodyWrapper(this,arguments,function(){
n.wrapper=
h(n,'entry','DOMEventListener.add '+m);
l.attachEvent('on'+m,n.wrapper);},{params:[[m,'string','name'],[n,'function','listener']]});},{module:'DOMEventListener',line:35,column:8},{params:['string','function']});

j=__annotator(function(l,m,n){return __bodyWrapper(this,arguments,function(){
l.detachEvent('on'+m,n.wrapper);},{params:[[m,'string','name'],[n,'function','listener']]});},{module:'DOMEventListener',line:40,column:11},{params:['string','function']});}else



j=i=__annotator(function(){},{module:'DOMEventListener',line:45,column:17});


var k=











{add:__annotator(function(l,m,n){return __bodyWrapper(this,arguments,function(){


i(l,m,n);




return {remove:__annotator(function(){
j(l,m,n);
l=null;},{module:'DOMEventListener',line:68,column:14})};},{params:[[m,'string','name'],[n,'function','listener']]});},{module:'DOMEventListener',line:60,column:7},{params:['string','function']}),











remove:j};


f.exports=k;},{module:'DOMEventListener',line:0,column:0,name:'$module_DOMEventListener'}),null);

/** js/modules/Event.js */




__d('Event',['Arbiter','DataStore','DOMQuery','DOMEvent','ErrorUtils','ExecutionEnvironment','Parent','Scroll','UserAgent_DEPRECATED','DOMEventListener','$','invariant','getObjectValues','event-form-bubbling'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){if(c.__markCompiled)c.__markCompiled();

c('event-form-bubbling');
















var u=b.Event,




v='Event.listeners';
if(!u.prototype)
u.prototype={};







function w(ga){
if(ga.type==='click'||
ga.type==='mouseover'||
ga.type==='keydown')
h.inform('Event/stop',{event:ga});}__annotator(w,{module:'Event',line:39,column:0,name:'informUserActivity'});



function x(ga,ha,ia){
this.target=ga;
this.type=ha;
this.data=ia;}__annotator(x,{module:'Event',line:47,column:0,name:'CustomEvent'});


Object.assign(x.prototype,









{getData:__annotator(function(){
this.data=this.data||{};
return this.data;},{module:'Event',line:63,column:11}),








stop:__annotator(function(){
return u.stop(this);},{module:'Event',line:74,column:8}),






prevent:__annotator(function(){
return u.prevent(this);},{module:'Event',line:82,column:11}),







isDefaultPrevented:__annotator(function(){
return u.isDefaultPrevented(this);},{module:'Event',line:91,column:22}),























kill:__annotator(function(){
return u.kill(this);},{module:'Event',line:116,column:8}),






getTarget:__annotator(function(){
return new k(this).target||null;},{module:'Event',line:124,column:13})});



function y(ga){
if(ga instanceof x)
return ga;


if(!ga)












if(!window.addEventListener&&document.createEventObject){
ga=window.event?document.createEventObject(window.event):{};}else

ga={};







if(!ga._inherits_from_prototype)


for(var ha in u.prototype)

try{ga[ha]=u.prototype[ha];}catch(
ia){}




return ga;}__annotator(y,{module:'Event',line:129,column:0,name:'$E'});





Object.assign(u.prototype,

{_inherits_from_prototype:true,






getRelatedTarget:__annotator(function(){
var ga=this.relatedTarget||
(this.fromElement===this.srcElement?this.toElement:this.fromElement);
return ga&&ga.nodeType?ga:null;},{module:'Event',line:184,column:20}),











getModifiers:__annotator(function(){
var ga=
{control:!!this.ctrlKey,
shift:!!this.shiftKey,
alt:!!this.altKey,
meta:!!this.metaKey};

ga.access=p.osx()?ga.control:ga.alt;
ga.any=ga.control||ga.shift||ga.alt||ga.meta;
return ga;},{module:'Event',line:199,column:16}),








isRightClick:__annotator(function(){
if(this.which)
return this.which===3;

return this.button&&this.button===2;},{module:'Event',line:217,column:16}),







isMiddleClick:__annotator(function(){
if(this.which)
return this.which===2;

return this.button&&this.button===4;},{module:'Event',line:229,column:17}),

























isDefaultRequested:__annotator(function(){
return this.getModifiers().any||
this.isMiddleClick()||
this.isRightClick();},{module:'Event',line:259,column:22})},


x.prototype);




Object.assign(u,























{listen:__annotator(function(ga,ha,ia,ja){
h.inform('Event/bindListen',{element:ga,type:ha,handler:ia});

if(!m.canUseDOM)
return new fa(ia,oa,ha,ja,ra);


if(typeof ga=='string')
ga=r(ga);


if(typeof ja=='undefined')
ja=u.Priority.NORMAL;


if(typeof ha=='object'){
var ka={};
for(var la in ha)
ka[la]=u.listen(ga,la,ha[la],ja);

return ka;}


if(ha.match(/^on/i))
throw new TypeError
("Bad event name `"+ha+"': use `click', not `onclick'.");


if(ga.nodeName=='LABEL'&&ha=='click'){
var ma=ga.getElementsByTagName('input');
ga=ma.length==1?ma[0]:ga;}else
if(ga===window&&ha==='scroll'){
var na=j.getDocumentScrollElement();
if(na!==document.documentElement&&
na!==document.body)
ga=na;}



var oa=i.get(ga,v,{}),

pa=ba[ha];
if(pa){
ha=pa.base;
if(pa.wrap)
ia=pa.wrap(ia);}




da(ga,oa,ha);

var qa=oa[ha];
if(!(ja in qa))
qa[ja]=[];


var ra=qa[ja].length,
sa=new fa(ia,oa,ha,ja,ra);

qa[ja][ra]=sa;
qa.numHandlers++;

return sa;},{module:'Event',line:294,column:10}),


stop:__annotator(function(ga){





var ha=new k(ga).stopPropagation();
w(ha.event);
return ga;},{module:'Event',line:360,column:8}),


prevent:__annotator(function(ga){





new k(ga).preventDefault();
return ga;},{module:'Event',line:371,column:11}),


isDefaultPrevented:__annotator(function(ga){





return new k(ga).isDefaultPrevented(ga);},{module:'Event',line:381,column:22}),


kill:__annotator(function(ga){





var ha=new k(ga).kill();
w(ha.event);
return false;},{module:'Event',line:390,column:8}),


getKeyCode:__annotator(function(event){
event=new k(event).event;
if(!event)
return false;

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

if(event.shiftKey)
switch(event.keyCode){
case 33:
case 34:
case 37:
case 38:
case 39:
case 40:
return null;}



return event.keyCode;},{module:'Event',line:401,column:14}),


getPriorities:__annotator(function(){
if(!z){
var ga=t(u.Priority);

ga.sort(__annotator(function(ha,ia){return ha-ia;},{module:'Event',line:443,column:19}));
z=ga;}

return z;},{module:'Event',line:439,column:17}),

















fire:__annotator(function(ga,ha,ia){
var ja=new x(ga,ha,ia),
ka;

do{var la=u.__getHandler(ga,ha);
if(la)
ka=la(ja);

ga=ga.parentNode;}while(
ga&&ka!==false&&!ja.cancelBubble);
return ka!==false;},{module:'Event',line:464,column:8}),










__fire:__annotator(function(ga,ha,event){
var ia=u.__getHandler(ga,ha);
if(ia)
return ia(y(event));},{module:'Event',line:485,column:10}),










__getHandler:__annotator(function(ga,ha){
var ia=i.get(ga,v);
if(ia&&ia[ha])
return ia[ha].domHandler;},{module:'Event',line:499,column:16}),



getPosition:__annotator(function(ga){
ga=new k(ga).event;

var ha=j.getDocumentScrollElement(),
ia=ga.clientX+o.getLeft(ha),
ja=ga.clientY+o.getTop(ha);
return {x:ia,y:ja};},{module:'Event',line:506,column:15})});







var z=null,

aa=__annotator(function(ga){
return __annotator(function(ha){
if(!j.contains(this,ha.getRelatedTarget()))
return ga.call(this,ha);},{module:'Event',line:523,column:9});},{module:'Event',line:522,column:18}),




ba;
if(!window.navigator.msPointerEnabled){
ba=
{mouseenter:{base:'mouseover',wrap:aa},
mouseleave:{base:'mouseout',wrap:aa}};}else






ba=
{mousedown:{base:'MSPointerDown'},
mousemove:{base:'MSPointerMove'},
mouseup:{base:'MSPointerUp'},
mouseover:{base:'MSPointerOver'},
mouseout:{base:'MSPointerOut'},
mouseenter:{base:'MSPointerOver',wrap:aa},
mouseleave:{base:'MSPointerOut',wrap:aa}};








if(p.firefox()){
var ca=__annotator(function(ga,event){
event=y(event);
var ha=event.getTarget();
while(ha){
u.__fire(ha,ga,event);
ha=ha.parentNode;}},{module:'Event',line:558,column:26});


document.documentElement.addEventListener
('focus',
ca.bind(null,'focusin'),
true);

document.documentElement.addEventListener
('blur',
ca.bind(null,'focusout'),
true);}













var da=__annotator(function(ga,ha,ia){
if(ia in ha)
return;


var ja=ea.bind(ga,ia);

ha[ia]=


{numHandlers:0,

domHandlerRemover:q.add(ga,ia,ja),

domHandler:ja};






var ka='on'+ia;
if(ga[ka]){







var la=ga===document.documentElement?
u.Priority._BUBBLE:
u.Priority.TRADITIONAL,
ma=ga[ka];
ga[ka]=null;
u.listen(ga,ia,ma,la);}




if(ga.nodeName==='FORM'&&ia==='submit')
u.listen
(ga,
ia,
u.__bubbleSubmit.bind(null,ga),
u.Priority._BUBBLE);},{module:'Event',line:588,column:20}),














ea=__annotator(function(ga,event){
event=y(event);

if(!i.get(this,v))
throw new Error("Bad listenHandler context.");


var ha=i.get(this,v)[ga];
if(!ha)
throw new Error("No registered handlers for `"+ga+"'.");




if(ga=='click'){
var ia=n.byTag(event.getTarget(),'a');


if(window.clickRefAction)
window.clickRefAction('click',ia,event);}





var ja=u.getPriorities();
for(var ka=0;ka<ja.length;ka++){
var la=ja[ka];
if(la in ha){
var ma=ha[la];
for(var na=0;na<ma.length;na++){
if(!ma[na])

continue;

var oa=ma[na].fire(this,event);


if(oa===false){
return event.kill();}else
if(event.cancelBubble)
event.stop();}}}





return event.returnValue;},{module:'Event',line:648,column:20});










































u.Priority=
{URGENT:-20,
TRADITIONAL:-10,
NORMAL:0,
_BUBBLE:1000};









function fa(ga,ha,ia,ja,ka){
this._handler=ga;
this._handlers=ha;
this._type=ia;
this._priority=ja;
this._id=ka;}__annotator(fa,{module:'Event',line:752,column:0,name:'EventHandlerRef'});


Object.assign(fa.prototype,












{remove:__annotator(function(){
if(m.canUseDOM){

!this._handlers?s(0,'Event handler has already been removed'):undefined;



var ga=this._handlers[this._type];
if(ga.numHandlers<=1){
ga.domHandlerRemover.remove();
delete this._handlers[this._type];}else{

delete ga[this._priority][this._id];
ga.numHandlers--;}

this._handlers=null;}},{module:'Event',line:773,column:10}),










fire:__annotator(function(ga,event){
if(m.canUseDOM)
return l.applyWithGuard(this._handler,ga,[event],__annotator
(function(ha){
ha.event_type=event.type;
ha.dom_element=ga.name||ga.id;
ha.category='eventhandler';},{module:'Event',line:802,column:8}));




return true;},{module:'Event',line:799,column:8})});



b.$E=u.$E=y;

f.exports=u;},{module:'Event',line:0,column:0,name:'$module_Event'}),null);

/** js/listeners/modules/FocusListener.js */




__d('FocusListener',['Arbiter','CSS','Event','Parent','getActiveElement'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();








var m=
{expandInput:__annotator(function(r){
i.addClass(r,'child_is_active');
i.addClass(r,'child_is_focused');
i.addClass(r,'child_was_focused');
h.inform('reflow');},{module:'FocusListener',line:15,column:15})};



function n(r,s){

if(s.getAttribute('data-silentfocuslistener'))
return;


var t=k.byClass(s,'focus_target');
if(t)
if('focus'==r||'focusin'==r){
m.expandInput(t);}else{

if(s.value==='')
i.removeClass(t,'child_is_active');

i.removeClass(t,'child_is_focused');}}__annotator(n,{module:'FocusListener',line:23,column:0,name:'updateFocusClassNames'});




var o=l();
if(o)
n('focus',o);





function p(event){
event=event||window.event;
n(event.type,event.target||event.srcElement);}__annotator(p,{module:'FocusListener',line:50,column:0,name:'handleFocusOrBlur'});


var q=document.documentElement;
if(q.addEventListener){
q.addEventListener('focus',p,true);
q.addEventListener('blur',p,true);}else{

q.attachEvent('onfocusin',p);
q.attachEvent('onfocusout',p);}











j.listen(document.documentElement,'submit',__annotator(function(){},{module:'FocusListener',line:73,column:49}));

f.exports=m;},{module:'FocusListener',line:0,column:0,name:'$module_FocusListener'}),null);

/** js/modules/clickRefAction.js */




__d('clickRefAction',['Arbiter'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();








function i(m,n,o,p,q){
var r=m+'/'+n;
this.ue=r;
this._ue_ts=m;
this._ue_count=n;
this._context=o;
this._ns=null;
this._node=p;
this._type=q;}__annotator(i,{module:'clickRefAction',line:14,column:0,name:'ClickRefAction'});


i.prototype.set_namespace=__annotator(function(m){
this._ns=m;
return this;},{module:'clickRefAction',line:25,column:41});


i.prototype.coalesce_namespace=__annotator(function(m){
if(this._ns===null)
this._ns=m;

return this;},{module:'clickRefAction',line:30,column:46});


i.prototype.add_event=__annotator(function(){
return this;},{module:'clickRefAction',line:37,column:37});


var j=0,
k=[];


















function l(m,n,event,o,p){

var q=Date.now(),
r=event&&event.type;


p=p||{};
if(!n&&event)
n=event.getTarget();













var s=50;

if(n&&o!="FORCE")
for(var t=k.length-1;
t>=0&&q-k[t]._ue_ts<s;
--t)
if(k[t]._node==n&&k[t]._type==r)
return k[t];




var u=new i(q,j,m,n,r);


k.push(u);
while(k.length>10)
k.shift();



h.inform("ClickRefAction/new",
{cfa:u,
node:n,
mode:o,
event:event,
extra_data:p},
h.BEHAVIOR_PERSISTENT);

j++;

return u;}__annotator(l,{module:'clickRefAction',line:61,column:0,name:'clickRefAction'});




f.exports=b.clickRefAction=l;},{module:'clickRefAction',line:0,column:0,name:'$module_clickRefAction'}),null);

/** js/modules/trackReferrer.js */




__d('trackReferrer',['Parent'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();








function i(j,k){

j=h.byAttribute(j,'data-referrer');

if(j){
















var l=
/^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/.
exec(k)[1]||'';

if(!l)
return;


var m=l+'|'+j.getAttribute('data-referrer'),

n=new Date();n.setTime(Date.now()+1000);
document.cookie="x-src="+encodeURIComponent(m)+"; "+
"expires="+n.toGMTString()+";path=/; domain="+
window.location.hostname.replace(/^.*(\.facebook\..*)$/i,'$1');}


return j;}__annotator(i,{module:'trackReferrer',line:14,column:0,name:'trackReferrer'});


f.exports=i;},{module:'trackReferrer',line:0,column:0,name:'$module_trackReferrer'}),null);

/** js/modules/Primer.js */




__d('Primer',['Bootloader','CSS','ErrorUtils','Parent','clickRefAction','trackReferrer'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();
























var n=null,
o=/async(?:-post)?|dialog(?:-post)?|theater|toggle/,
p=document.documentElement;

function q(u,v){
u=k.byAttribute(u,v);
if(!u)
return;



do{var w=u.getAttribute(v);
JSON.parse(w).forEach(__annotator(function(x){
var y=u;
h.loadModules.call(h,[x[0]],__annotator(function(z){
z[x[1]](y);},{module:'Primer',line:44,column:60}));},{module:'Primer',line:42,column:33}));}while(


u=k.byAttribute(u.parentNode,v));
return false;}__annotator(q,{module:'Primer',line:34,column:0,name:'_runInlineHandlers'});


p.onclick=j.guard(__annotator(function(u){
u=u||window.event;
n=u.target||u.srcElement;

var v=k.byTag(n,'A');
if(!v)
return q(n,'data-onclick');


var w=v.getAttribute('ajaxify'),
x=v.href,
y=w||x;

if(y)
l('a',v,u).coalesce_namespace('primer');



if(w&&x&&!/#$/.test(x)){




var z=u.which&&u.which===2,
aa=u.altKey||u.ctrlKey||u.metaKey||u.shiftKey;
if(z||aa)
return;}



var ba=q(n,'data-onclick');

m(v,y);


var ca=v.rel&&v.rel.match(o);
ca=ca&&ca[0];

switch(ca){
case 'dialog':
case 'dialog-post':
h.loadModules(["AsyncDialog"],__annotator(function(da){
da.bootstrap(y,v,ca);},{module:'Primer',line:93,column:46}));

break;
case 'async':
case 'async-post':
h.loadModules(["AsyncRequest"],__annotator(function(da){
da.bootstrap(y,v);},{module:'Primer',line:99,column:47}));

break;
case 'theater':
h.loadModules(["PhotoSnowlift"],__annotator(function(da){
da.bootstrap(y,v);},{module:'Primer',line:104,column:48}));

break;
case 'toggle':
i.toggleClass(v.parentNode,'openToggler');
h.loadModules(["Toggler"],__annotator(function(da){
da.bootstrap(v);},{module:'Primer',line:110,column:42}));

break;

default:return ba;}


return false;},{module:'Primer',line:52,column:31}),
'Primer click');

p.onsubmit=j.guard(__annotator(function(u){
u=u||window.event;
var v=u.target||u.srcElement;

if(v&&v.nodeName=='FORM'&&v.getAttribute('rel')=='async'){
l('f',v,u).coalesce_namespace('primer');

var w=n;
h.loadModules(["Form"],__annotator(function(x){
x.bootstrap(v,w);},{module:'Primer',line:129,column:37}));


return false;}},{module:'Primer',line:121,column:32}),

'Primer submit');

var r=null,

s=__annotator(function(u,v){
v=v||window.event;
r=v.target||v.srcElement;

q(r,'data-on'+u);

var w=k.byAttribute(r,'data-hover');
if(!w)return;

switch(w.getAttribute('data-hover')){
case 'tooltip':
h.loadModules(["Tooltip"],__annotator(function(x){
x.process(w,r);},{module:'Primer',line:150,column:42}));

break;}},{module:'Primer',line:139,column:18});



p.onmouseover=j.guard
(s.bind(null,'mouseover'),'Primer mouseover');

var t=j.guard
(s.bind(null,'focus'),'Primer focus');
if(p.addEventListener){
p.addEventListener('focus',t,true);}else

p.attachEvent('onfocusin',t);},{module:'Primer',line:0,column:0,name:'$module_Primer'}),null);

/** js/modules/URLFragmentPrelude.js */






__d('URLFragmentPrelude',['ScriptPath','URLFragmentPreludeConfig'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();
























var j=
/^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,
k='',



l=/^[^\/\\#!\.\?\*\&\^=]+$/;

window.location.href.replace(j,__annotator(function(m,n,o,p){
var q,r,s,t;
q=r=n+(o?'?'+o:'');
if(p){
if(i.incorporateQuicklingFragment){



var u=p.replace(/^(!|%21)/,'');
s=u.charAt(0);
if(s=='/'||s=='\\')



q=u.replace(/^[\\\/]+/,'/');}



if(i.hashtagRedirect)


if(r==q){
var v=p.match(l);
if(v&&!o&&n=='/')
q='/hashtag/'+p;}}









if(q!=r){


t=h.getScriptPath();
if(t)
document.cookie="rdir="+t+"; path=/; domain="+
window.location.hostname.replace(/^.*(\.facebook\..*)$/i,'$1');


window.location.replace(k+q);}},{module:'URLFragmentPrelude',line:40,column:37}));},{module:'URLFragmentPrelude',line:0,column:0,name:'$module_URLFragmentPrelude'}),null);

/** js/sidebar/SidebarPrelude.js */




__d('SidebarPrelude',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();

var h=
{addSidebarMode:__annotator(function(i,j){


var k=document.documentElement;
if(k.clientWidth>j){
k.className=k.className+' sidebarMode';
if(k.clientWidth<=i)
k.className=k.className+' miniSidebar';}},{module:'SidebarPrelude',line:8,column:18})};





f.exports=h;},{module:'SidebarPrelude',line:0,column:0,name:'$module_SidebarPrelude'}),null);

/** js/listeners/modules/SubmitOnEnterListener.js */




__d('SubmitOnEnterListener',['Bootloader','CSS'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();










document.documentElement.onkeydown=__annotator(function(j){
j=j||window.event;
var k=j.target||j.srcElement,
l=
j.keyCode==13&&
!j.altKey&&!j.ctrlKey&&!j.metaKey&&!j.shiftKey&&
i.hasClass(k,'enter_submit');
if(l){
h.loadModules
(["DOM","Input","trackReferrer","Form"],__annotator
(function(m,n,o,p){
if(!n.isEmpty(k)){
var q=k.form,
r=
m.scry(q,'.enter_submit_target')[0]||
m.scry(q,'[type="submit"]')[0];
if(r){
var s=
p.getAttribute(q,'ajaxify')||
p.getAttribute(q,'action');
if(s)
o(q,s);

r.click();}}},{module:'SubmitOnEnterListener',line:26,column:6}));




return false;}},{module:'SubmitOnEnterListener',line:16,column:37});},{module:'SubmitOnEnterListener',line:0,column:0,name:'$module_SubmitOnEnterListener'}),null);

/** js/ufi/modules/CommentPrelude.js */




__d('CommentPrelude',['Arbiter','BanzaiODS','ErrorUtils','CSS','Parent','clickRefAction','ex'],__annotator(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();










function o(u,v){

if(u==='ufi.react'||
u==='ufi_mentions_input.react'||
u==='ufi_controller'||
u==='action_link_bling'||
u==='action_link_timeline_bling')



return;


var w=new Error(n
('Deprecated CommentPrelude action %s called from ref %s',
v||'unknown',
u||'unknown'));

w.type='warn';
j.reportError(w);

i.bumpEntityKey('comment_prelude',u);}__annotator(o,{module:'CommentPrelude',line:16,column:0,name:'logRef'});



function p(u,v,w){
o(w,'click');

var x=l.byTag(u,'form');
if(!x||!k.hasClass(x,'collapsible_comments'))
return;


m('ufi',u,null,'FORCE');


return q(u,v,w);}__annotator(p,{module:'CommentPrelude',line:41,column:0,name:'click'});



function q(u,v,w){
o(w,'expand');

var x=l.byTag(u,'form');
if(!x||!k.hasClass(x,'collapsible_comments'))
return;


r(x,w);
if(v!==false){
var y=x.add_comment_text_text||x.add_comment_text,


z=y.length;
if(z)
if(!l.byClass(y[z-1],'UFIReplyList')){
y=y[z-1];}else
if(!l.byClass(y[0],'UFIReplyList')){
y=y[0];}else

y=null;


if(y){
y.focus();
h.inform('comment/focus',{element:y});}}


return false;}__annotator(q,{module:'CommentPrelude',line:56,column:0,name:'expand'});


function r(u,v){
o(v,'uncollapse');

if(!u||!k.hasClass(u,'collapsible_comments'))
return;


var w=k.removeClass.bind(null,u,'collapsed_comments');
if(window.ScrollAwareDOM){
window.ScrollAwareDOM.monitor(u,w);}else

w();}__annotator(r,{module:'CommentPrelude',line:87,column:0,name:'uncollapse'});



function s(u){
var v=u.getAttribute('data-comment-prelude-ref');
o(v,'blingbox');

var w=l.byTag(u,'form');
if(!w||!k.hasClass(w,'collapsible_comments'))
return;


k.toggleClass(w,'collapsed_comments');}__annotator(s,{module:'CommentPrelude',line:102,column:0,name:'onBlingboxClick'});


var t=
{click:p,
expand:q,
uncollapse:r,
onBlingboxClick:s,
logRef:o};


f.exports=t;},{module:'CommentPrelude',line:0,column:0,name:'$module_CommentPrelude'}),null);

/** js/ufi/prelude.js */


__d('legacy:ufi-comment-prelude-js',['CommentPrelude'],__annotator(function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();



b.fc_click=h.click;
b.fc_expand=h.expand;},{module:'legacy:ufi-comment-prelude-js',line:0,column:0,name:'$module_legacy_ufi_comment_prelude_js'}),3);

/** js/modules/ScriptMonitor.js */








__d('ScriptMonitor',[],__annotator(function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();
var h,i=[],
j=window.MutationObserver||
window.WebKitMutationObserver||
window.MozMutationObserver;

f.exports=
{activate:__annotator(function(){
if(!j)
return;

h=new j(__annotator(function(k){
for(var l=0;l<k.length;l++){
var m=k[l];
if(m.type=='childList'){
for(var n=0;n<m.addedNodes.length;n++){
var o=m.addedNodes[n];



if((o.tagName=='SCRIPT'||o.tagName=='IFRAME')&&o.src)
i.push(o.src);}}else


if(m.type=='attributes'&&m.attributeName=='src'&&
(m.target.tagName=='SCRIPT'||m.target.tagName=='IFRAME'))
i.push(m.target.src);}},{module:'ScriptMonitor',line:20,column:36}));



h.observe(document,
{attributes:true,
childList:true,
subtree:true});},{module:'ScriptMonitor',line:16,column:12}),



stop:__annotator(function(){
h&&h.disconnect();
return i;},{module:'ScriptMonitor',line:46,column:8})};},{module:'ScriptMonitor',line:0,column:0,name:'$module_ScriptMonitor'}),null);

/** js/modules/SyntaxErrorMonitor.js */




__d('SyntaxErrorMonitor',['Cookie','ErrorUtils'],__annotator(function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();




var j='js_ver',
k=86400000,

l=1.262304e+12,

m=null;

function n(q){
return q.name=='SyntaxError'||/syntaxerror/i.test(q.message);}__annotator(n,{module:'SyntaxErrorMonitor',line:17,column:0,name:'_isSyntaxError'});


function o(q){
if(n(q)){
var r=h.get(j),
s=Math.floor((Date.now()-l)/k);
if(!r||s-r>=m.bump_freq_day)
h.set(j,s,m.cookie_ttl_sec*1000);}}__annotator(o,{module:'SyntaxErrorMonitor',line:21,column:0,name:'_onError'});




var p=
{init:__annotator(function(q){
m=q;
i.addListener(o);},{module:'SyntaxErrorMonitor',line:32,column:8})};



f.exports=p;},{module:'SyntaxErrorMonitor',line:0,column:0,name:'$module_SyntaxErrorMonitor'}),null);

/** js/lib/prelude.js */


































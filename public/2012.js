// assume jquery loaded
/*! Version: 0.5.1-dev */
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

var Mustache=typeof module!="undefined"&&module.exports||{};(function(a){function i(a){return h.test(a)}function n(a){return String(a).replace(/&(?!\w+;)|[<>"']/g,function(a){return m[a]||a})}function o(a,b,c,d){d=d||"<template>";var e=b.split("\n"),f=Math.max(c-3,0),g=Math.min(e.length,c+3),h=e.slice(f,g),i;for(var j=0,k=h.length;j<k;++j)i=j+f+1,h[j]=(i===c?" >> ":"    ")+h[j];return a.template=b,a.line=c,a.file=d,a.message=[d+":"+c,h.join("\n"),"",a.message].join("\n"),a}function p(a,b,c){if(a===".")return b[b.length-1];var d=a.split("."),e=d.length-1,f=d[e],g,h,i=b.length,j,k;while(i){k=b.slice(0),h=b[--i],j=0;while(j<e){h=h[d[j++]];if(h==null)break;k.push(h)}if(h&&typeof h=="object"&&f in h){g=h[f];break}}return typeof g=="function"&&(g=g.call(k[k.length-1])),g==null?c:g}function q(a,b,c,d){var e="",h=p(a,b);if(d){if(h==null||h===!1||f(h)&&h.length===0)e+=c()}else if(f(h))g(h,function(a){b.push(a),e+=c(),b.pop()});else if(typeof h=="object")b.push(h),e+=c(),b.pop();else if(typeof h=="function"){var i=b[b.length-1],j=function(a){return w(a,i)};e+=h.call(i,c(),j)||""}else h&&(e+=c());return e}function r(b,c){c=c||{};var d=c.tags||a.tags,e=d[0],f=d[d.length-1],g=['var buffer = "";',"\nvar line = 1;","\ntry {",'\nbuffer += "'],h=[],k=!1,l=!1,m=function(){if(k&&!l&&!c.space)while(h.length)g.splice(h.pop(),1);else h=[];k=!1,l=!1},n=[],p,q,r,s=function(a){d=j(a).split(/\s+/),q=d[0],r=d[d.length-1]},t=function(a){g.push('";',p,'\nvar partial = partials["'+j(a)+'"];',"\nif (partial) {","\n  buffer += render(partial,stack[stack.length - 1],partials);","\n}",'\nbuffer += "')},u=function(a,d){var e=j(a);if(e==="")throw o(new Error("Section name may not be empty"),b,z,c.file);n.push({name:e,inverted:d}),g.push('";',p,'\nvar name = "'+e+'";',"\nvar callback = (function () {","\n  return function () {",'\n    var buffer = "";','\nbuffer += "')},v=function(a){u(a,!0)},w=function(a){var d=j(a),e=n.length!=0&&n[n.length-1].name;if(!e||d!=e)throw o(new Error('Section named "'+d+'" was never opened'),b,z,c.file);var f=n.pop();g.push('";',"\n    return buffer;","\n  };","\n})();"),f.inverted?g.push("\nbuffer += renderSection(name,stack,callback,true);"):g.push("\nbuffer += renderSection(name,stack,callback);"),g.push('\nbuffer += "')},x=function(a){g.push('";',p,'\nbuffer += lookup("'+j(a)+'",stack,"");','\nbuffer += "')},y=function(a){g.push('";',p,'\nbuffer += escapeHTML(lookup("'+j(a)+'",stack,""));','\nbuffer += "')},z=1,A,B;for(var C=0,D=b.length;C<D;++C)if(b.slice(C,C+e.length)===e){C+=e.length,A=b.substr(C,1),p="\nline = "+z+";",q=e,r=f,k=!0;switch(A){case"!":C++,B=null;break;case"=":C++,f="="+f,B=s;break;case">":C++,B=t;break;case"#":C++,B=u;break;case"^":C++,B=v;break;case"/":C++,B=w;break;case"{":f="}"+f;case"&":C++,l=!0,B=x;break;default:l=!0,B=y}var E=b.indexOf(f,C);if(E===-1)throw o(new Error('Tag "'+e+'" was not closed properly'),b,z,c.file);var F=b.substring(C,E);B&&B(F);var G=0;while(~(G=F.indexOf("\n",G)))z++,G++;C=E+f.length-1,e=q,f=r}else{A=b.substr(C,1);switch(A){case'"':case"\\":l=!0,g.push("\\"+A);break;case"\r":break;case"\n":h.push(g.length),g.push("\\n"),m(),z++;break;default:i(A)?h.push(g.length):l=!0,g.push(A)}}if(n.length!=0)throw o(new Error('Section "'+n[n.length-1].name+'" was not closed properly'),b,z,c.file);m(),g.push('";',"\nreturn buffer;","\n} catch (e) { throw {error: e, line: line}; }");var H=g.join("").replace(/buffer \+= "";\n/g,"");return c.debug&&(typeof console!="undefined"&&console.log?console.log(H):typeof print=="function"&&print(H)),H}function s(a,b){var c="view,partials,stack,lookup,escapeHTML,renderSection,render",d=r(a,b),e=new Function(c,d);return function(c,d){d=d||{};var f=[c];try{return e(c,d,f,p,n,q,w)}catch(g){throw o(g.error,a,g.line,b.file)}}}function u(){t={}}function v(a,b){return b=b||{},b.cache!==!1?(t[a]||(t[a]=s(a,b)),t[a]):s(a,b)}function w(a,b,c){return v(a)(b,c)}a.name="mustache.js",a.version="0.5.0-dev",a.tags=["{{","}}"],a.parse=r,a.compile=v,a.render=w,a.clearCache=u,a.to_html=function(a,b,c,d){var e=w(a,b,c);if(typeof d!="function")return e;d(e)};var b=Object.prototype.toString,c=Array.isArray,d=Array.prototype.forEach,e=String.prototype.trim,f;c?f=c:f=function(a){return b.call(a)==="[object Array]"};var g;d?g=function(a,b,c){return d.call(a,b,c)}:g=function(a,b,c){for(var d=0,e=a.length;d<e;++d)b.call(c,a[d],d,a)};var h=/^\s*$/,j;if(e)j=function(a){return a==null?"":e.call(a)};else{var k,l;i(" ")?(k=/^\s+/,l=/\s+$/):(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),j=function(a){return a==null?"":String(a).replace(k,"").replace(l,"")}}var m={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t={}})(Mustache);

var speaker_template = "<div class='tb-name'>{{name}}</div><div class='tb-title'>{{title}}</div>";
var register_template = "<a href='/schedule/{{day}}/{{slot}}' class='tb-register'>Register For This Slot</a>";

function render_track_b(data) {
	var max = data.max;
	for (var day = 0; day < 2; day++) {
		for (var slot = 0; slot < max; slot++)	{
			var block;
			if (data.lineup[day][slot]) {
				var curr = data.lineup[day][slot];
				block = Mustache.render(speaker_template, { name: curr.name, title: curr.title });
			}  else {
				block = Mustache.render(register_template, { day: day, slot: slot});
			}
			$("#tb-"+day+"-"+slot).html(block);
		}
	}
	
}



$.getJSON("/schedule.json", render_track_b);
$(function () {
	$(document).on("click", "a.tb-register", function (e) {
		e.stopPropagation(); e.preventDefault();
		
	})
})
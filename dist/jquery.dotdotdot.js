;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.jquery_dotdotdot_js = factory(root.jQuery);
  }
}(this, function(jQuery) {
/*
 *	jQuery dotdotdot 3.2.2
 *	@requires jQuery 1.7.0 or later
 *
 *	dotdotdot.frebsite.nl
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	License: CC-BY-NC-4.0
 *	http://creativecommons.org/licenses/by-nc/4.0/
 */
!function(a){"use strict";var d,t,n,s,o="dotdotdot",e="3.2.2";a[o]&&a[o].version>e||(a[o]=function(t,e){this.$dot=t,this.api=["getInstance","truncate","restore","destroy","watch","unwatch"],this.opts=e;var i=this.$dot.data(o);return i&&i.destroy(),this.init(),this.truncate(),this.opts.watch&&this.watch(),this},a[o].version=e,a[o].uniqueId=0,a[o].defaults={ellipsis:"… ",callback:function(t){},truncate:"word",tolerance:0,keep:null,watch:"window",height:null},a[o].prototype={init:function(){this.watchTimeout=null,this.watchInterval=null,this.uniqueId=a[o].uniqueId++,this.originalStyle=this.$dot.attr("style")||"",this.originalContent=this._getOriginalContent(),"break-word"!==this.$dot.css("word-wrap")&&this.$dot.css("word-wrap","break-word"),"nowrap"===this.$dot.css("white-space")&&this.$dot.css("white-space","normal"),null===this.opts.height&&(this.opts.height=this._getMaxHeight()),"string"==typeof this.opts.ellipsis&&(this.opts.ellipsis=document.createTextNode(this.opts.ellipsis))},getInstance:function(){return this},truncate:function(){this.$inner=this.$dot.wrapInner("<div />").children().css({display:"block",height:"auto",width:"auto",border:"none",padding:0,margin:0}),this.$inner.empty().append(this.originalContent.clone(!0)),this.maxHeight=this._getMaxHeight();var t=!1;return this._fits()||(t=!0,this._truncateToNode(this.$inner[0])),this.$dot[t?"addClass":"removeClass"](d.truncated),this.$inner.replaceWith(this.$inner.contents()),this.$inner=null,this.opts.callback.call(this.$dot[0],t),t},restore:function(){this.unwatch(),this.$dot.empty().append(this.originalContent).attr("style",this.originalStyle).removeClass(d.truncated)},destroy:function(){this.restore(),this.$dot.data(o,null)},watch:function(){var e=this;this.unwatch();var i={};"window"==this.opts.watch?s.on(n.resize+e.uniqueId,function(t){e.watchTimeout&&clearTimeout(e.watchTimeout),e.watchTimeout=setTimeout(function(){i=e._watchSizes(i,s,"width","height")},100)}):this.watchInterval=setInterval(function(){i=e._watchSizes(i,e.$dot,"innerWidth","innerHeight")},500)},unwatch:function(){s.off(n.resize+this.uniqueId),this.watchInterval&&clearInterval(this.watchInterval),this.watchTimeout&&clearTimeout(this.watchTimeout)},_api:function(){var i=this,n={};return a.each(this.api,function(t){var e=this;n[e]=function(){var t=i[e].apply(i,arguments);return void 0===t?n:t}}),n},_truncateToNode:function(t){var i=[],n=[];if(a(t).contents().each(function(){var t=a(this);if(!t.hasClass(d.keep)){var e=document.createComment("");t.replaceWith(e),n.push(this),i.push(e)}}),n.length){for(var e=0;e<n.length;e++){a(i[e]).replaceWith(n[e]),a(n[e]).append(this.opts.ellipsis);var s=this._fits();if(a(this.opts.ellipsis,n[e]).remove(),!s){if("node"==this.opts.truncate&&1<e)return void a(n[e-2]).remove();break}}for(var o=e;o<i.length;o++)a(i[o]).remove();var r=n[Math.max(0,Math.min(e,n.length-1))];if(1==r.nodeType){var h=a("<"+r.nodeName+" />");h.append(this.opts.ellipsis),a(r).replaceWith(h),this._fits()?h.replaceWith(r):(h.remove(),r=n[Math.max(0,e-1)])}1==r.nodeType?this._truncateToNode(r):this._truncateToWord(r)}},_truncateToWord:function(t){for(var e=t,i=this,n=this.__getTextContent(e),s=-1!==n.indexOf(" ")?" ":"　",o=n.split(s),r="",h=o.length;0<=h;h--)if(r=o.slice(0,h).join(s),i.__setTextContent(e,i._addEllipsis(r)),i._fits()){"letter"==i.opts.truncate&&(i.__setTextContent(e,o.slice(0,h+1).join(s)),i._truncateToLetter(e));break}},_truncateToLetter:function(t){for(var e=this,i=this.__getTextContent(t).split(""),n="",s=i.length;0<=s&&(!(n=i.slice(0,s).join("")).length||(e.__setTextContent(t,e._addEllipsis(n)),!e._fits()));s--);},_fits:function(){return this.$inner.innerHeight()<=this.maxHeight+this.opts.tolerance},_addEllipsis:function(t){for(var e=[" ","　",",",";",".","!","?"];-1<a.inArray(t.slice(-1),e);)t=t.slice(0,-1);return t+=this.__getTextContent(this.opts.ellipsis)},_getOriginalContent:function(){var i=this;return this.$dot.find("script, style").addClass(d.keep),this.opts.keep&&this.$dot.find(this.opts.keep).addClass(d.keep),this.$dot.find("*").not("."+d.keep).add(this.$dot).contents().each(function(){var t=this,e=a(this);if(3==t.nodeType){if(""==a.trim(i.__getTextContent(t))){if(e.parent().is("table, thead, tbody, tfoot, tr, dl, ul, ol, video"))return void e.remove();if(e.prev().is("div, p, table, td, td, dt, dd, li"))return void e.remove();if(e.next().is("div, p, table, td, td, dt, dd, li"))return void e.remove();if(!e.prev().length)return void e.remove();if(!e.next().length)return void e.remove()}}else 8==t.nodeType&&e.remove()}),this.$dot.contents()},_getMaxHeight:function(){if("number"==typeof this.opts.height)return this.opts.height;for(var t=["maxHeight","height"],e=0,i=0;i<t.length;i++)if("px"==(e=window.getComputedStyle(this.$dot[0])[t[i]]).slice(-2)){e=parseFloat(e);break}t=[];switch(this.$dot.css("boxSizing")){case"border-box":t.push("borderTopWidth"),t.push("borderBottomWidth");case"padding-box":t.push("paddingTop"),t.push("paddingBottom")}for(i=0;i<t.length;i++){var n=window.getComputedStyle(this.$dot[0])[t[i]];"px"==n.slice(-2)&&(e-=parseFloat(n))}return Math.max(e,0)},_watchSizes:function(t,e,i,n){if(this.$dot.is(":visible")){var s={width:e[i](),height:e[n]()};return t.width==s.width&&t.height==s.height||this.truncate(),s}return t},__getTextContent:function(t){for(var e=["nodeValue","textContent","innerText"],i=0;i<e.length;i++)if("string"==typeof t[e[i]])return t[e[i]];return""},__setTextContent:function(t,e){for(var i=["nodeValue","textContent","innerText"],n=0;n<i.length;n++)t[i[n]]=e}},a.fn[o]=function(t){return i(),t=a.extend(!0,{},a[o].defaults,t),this.each(function(){a(this).data(o,new a[o](a(this),t)._api())})});function i(){s=a(window),d={},t={},n={},a.each([d,t,n],function(t,n){n.add=function(t){for(var e=0,i=(t=t.split(" ")).length;e<i;e++)n[t[e]]=n.ddd(t[e])}}),d.ddd=function(t){return"ddd-"+t},d.add("truncated keep"),t.ddd=function(t){return"ddd-"+t},n.ddd=function(t){return t+".ddd"},n.add("resize"),i=function(){}}}(jQuery);
return true;
}));

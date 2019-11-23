/*! modernizr 3.7.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-hovermq-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function i(e){var n=p.className,t=Modernizr._config.classPrefix||"";if(h&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(e.length>0&&(n+=" "+t+e.join(" "+t)),h?p.className.baseVal=n:p.className=n)}function s(e,n){if("object"==typeof e)for(var t in e)c(e,t)&&s(t,e[t]);else{e=e.toLowerCase();var o=e.split("."),a=Modernizr[o[0]];if(2===o.length&&(a=a[o[1]]),void 0!==a)return Modernizr;n="function"==typeof n?n():n,1===o.length?Modernizr[o[0]]=n:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=n),i([(n&&!1!==n?"":"no-")+o.join("-")]),Modernizr._trigger(e,n)}return Modernizr}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):h?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=a(h?"svg":"body"),e.fake=!0),e}function l(e,t,o,i){var s,l,f,u,c="modernizr",d=a("div"),h=r();if(parseInt(o,10))for(;o--;)f=a("div"),f.id=i?i[o]:c+(o+1),d.appendChild(f);return s=a("style"),s.type="text/css",s.id="s"+c,(h.fake?h:d).appendChild(s),h.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=c,h.fake&&(h.style.background="",h.style.overflow="hidden",u=p.style.overflow,p.style.overflow="hidden",p.appendChild(h)),l=t(d,e),h.fake?(h.parentNode.removeChild(h),p.style.overflow=u,p.offsetHeight):d.parentNode.removeChild(d),!!l}var f=[],u={_version:"3.7.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){f.push({name:e,fn:n,options:t})},addAsyncTest:function(e){f.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=u,Modernizr=new Modernizr;var c,d=[],p=n.documentElement,h="svg"===p.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;c=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),u._l={},u.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},u._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e;for(e=0;e<t.length;e++)(0,t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){u.addTest=s});var v=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var t=n(e);return t&&t.matches||!1}:function(n){var t=!1;return l("@media "+n+" { #modernizr { position: absolute; } }",function(n){t="absolute"===(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),t}}();u.mq=v,Modernizr.addTest("hovermq",v("(hover)")),function(){var e,n,t,i,s,a,r;for(var l in f)if(f.hasOwnProperty(l)){if(e=[],n=f[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(i=o(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)a=e[s],r=a.split("."),1===r.length?Modernizr[r[0]]=i:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=i),d.push((i?"":"no-")+r.join("-"))}}(),i(d),delete u.addTest,delete u.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);
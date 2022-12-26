document.addEventListener('DOMContentLoaded', () => {
    $(function() {
        /*! Viewer.js v1.10.5 https://fengyuanchen.github.io/viewerjs Copyright 2015-present Chen Fengyuan * Released under the MIT license * Date: 2022-04-05T08:21:02.491Z */
        !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Viewer=e()}(this,function(){"use strict";function s(e,t){var i,n=Object.keys(e);return Object.getOwnPropertySymbols&&(i=Object.getOwnPropertySymbols(e),t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)),n}function q(n){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?s(Object(o),!0).forEach(function(t){var e,i;e=n,i=o[t=t],t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):s(Object(o)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(o,t))})}return n}function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var h={backdrop:!0,button:!0,navbar:!0,title:!0,toolbar:!0,className:"",container:"body",filter:null,fullscreen:!0,inheritedAttributes:["crossOrigin","decoding","isMap","loading","referrerPolicy","sizes","srcset","useMap"],initialViewIndex:0,inline:!1,interval:5e3,keyboard:!0,focus:!0,loading:!0,loop:!0,minWidth:200,minHeight:100,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,slideOnTouch:!0,toggleOnDblclick:!0,tooltip:!0,transition:!0,zIndex:2015,zIndexInline:0,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null,move:null,moved:null,rotate:null,rotated:null,scale:null,scaled:null,zoom:null,zoomed:null,play:null,stop:null},t="undefined"!=typeof window&&void 0!==window.document,e=t?window:{},a=!(!t||!e.document.documentElement)&&"ontouchstart"in e.document.documentElement,i=t&&"PointerEvent"in e,g="viewer",l="move",W="switch",c="zoom",f="".concat(g,"-active"),j="".concat(g,"-close"),H="".concat(g,"-fade"),B="".concat(g,"-fixed"),V="".concat(g,"-fullscreen"),U="".concat(g,"-fullscreen-exit"),v="".concat(g,"-hide"),K="".concat(g,"-hide-md-down"),Z="".concat(g,"-hide-sm-down"),$="".concat(g,"-hide-xs-down"),u="".concat(g,"-in"),p="".concat(g,"-invisible"),b="".concat(g,"-loading"),_="".concat(g,"-move"),G="".concat(g,"-open"),d="".concat(g,"-show"),m="".concat(g,"-transition"),w="click",J="dblclick",Q="dragstart",tt="focusin",et="keydown",y="load",x="error",it=i?"pointerdown":a?"touchstart":"mousedown",nt=i?"pointermove":a?"touchmove":"mousemove",ot=i?"pointerup pointercancel":a?"touchend touchcancel":"mouseup",st="resize",k="transitionend",at="wheel",rt="ready",ht="show",z="viewed",lt="rotated",ct="".concat(g,"Action"),ut=/\s\s*/,dt=["zoom-in","zoom-out","one-to-one","reset","prev","play","next","rotate-left","rotate-right","flip-horizontal","flip-vertical"];function E(t){return"string"==typeof t}var mt=Number.isNaN||e.isNaN;function T(t){return"number"==typeof t&&!mt(t)}function D(t){return void 0===t}function o(t){return"object"===n(t)&&null!==t}var gt=Object.prototype.hasOwnProperty;function I(t){if(!o(t))return!1;try{var e=t.constructor,i=e.prototype;return e&&i&&gt.call(i,"isPrototypeOf")}catch(t){return!1}}function A(t){return"function"==typeof t}function S(e,i){if(e&&A(i))if(Array.isArray(e)||T(e.length))for(var t=e.length,n=0;n<t&&!1!==i.call(e,e[n],n,e);n+=1);else o(e)&&Object.keys(e).forEach(function(t){i.call(e,e[t],t,e)})}var O=Object.assign||function(i){for(var t=arguments.length,e=new Array(1<t?t-1:0),n=1;n<t;n++)e[n-1]=arguments[n];return o(i)&&0<e.length&&e.forEach(function(e){o(e)&&Object.keys(e).forEach(function(t){i[t]=e[t]})}),i},ft=/^(?:width|height|left|top|marginLeft|marginTop)$/;function C(t,e){var i=t.style;S(e,function(t,e){ft.test(e)&&T(t)&&(t+="px"),i[e]=t})}function L(t,e){return t&&e&&(t.classList?t.classList.contains(e):-1<t.className.indexOf(e))}function R(t,e){var i;t&&e&&(T(t.length)?S(t,function(t){R(t,e)}):t.classList?t.classList.add(e):(i=t.className.trim())?i.indexOf(e)<0&&(t.className="".concat(i," ").concat(e)):t.className=e)}function F(t,e){t&&e&&(T(t.length)?S(t,function(t){F(t,e)}):t.classList?t.classList.remove(e):0<=t.className.indexOf(e)&&(t.className=t.className.replace(e,"")))}function N(t,e,i){e&&(T(t.length)?S(t,function(t){N(t,e,i)}):(i?R:F)(t,e))}var vt=/([a-z\d])([A-Z])/g;function pt(t){return t.replace(vt,"$1-$2").toLowerCase()}function Y(t,e){return o(t[e])?t[e]:t.dataset?t.dataset[e]:t.getAttribute("data-".concat(pt(e)))}function bt(t,e,i){o(i)?t[e]=i:t.dataset?t.dataset[e]=i:t.setAttribute("data-".concat(pt(e)),i)}yt=!1,t&&(wt=!1,i=function(){},t=Object.defineProperty({},"once",{get:function(){return yt=!0,wt},set:function(t){wt=t}}),e.addEventListener("test",i,t),e.removeEventListener("test",i,t));var wt,yt,xt=yt;function X(i,t,n,e){var o=3<arguments.length&&void 0!==e?e:{},s=n;t.trim().split(ut).forEach(function(t){var e;xt||(e=i.listeners)&&e[t]&&e[t][n]&&(s=e[t][n],delete e[t][n],0===Object.keys(e[t]).length&&delete e[t],0===Object.keys(e).length&&delete i.listeners),i.removeEventListener(t,s,o)})}function M(s,t,a,e){var r=3<arguments.length&&void 0!==e?e:{},h=a;t.trim().split(ut).forEach(function(n){var t,o;r.once&&!xt&&(t=s.listeners,h=function(){delete o[n][a],s.removeEventListener(n,h,r);for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];a.apply(s,e)},(o=void 0===t?{}:t)[n]||(o[n]={}),o[n][a]&&s.removeEventListener(n,o[n][a],r),o[n][a]=h,s.listeners=o),s.addEventListener(n,h,r)})}function P(t,e,i,n){var o;return A(Event)&&A(CustomEvent)?o=new CustomEvent(e,q({bubbles:!0,cancelable:!0,detail:i},n)):(o=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,i),t.dispatchEvent(o)}function kt(t){var e=t.rotate,i=t.scaleX,n=t.scaleY,o=t.translateX,t=t.translateY,s=[],o=(T(o)&&0!==o&&s.push("translateX(".concat(o,"px)")),T(t)&&0!==t&&s.push("translateY(".concat(t,"px)")),T(e)&&0!==e&&s.push("rotate(".concat(e,"deg)")),T(i)&&1!==i&&s.push("scaleX(".concat(i,")")),T(n)&&1!==n&&s.push("scaleY(".concat(n,")")),s.length?s.join(" "):"none");return{WebkitTransform:o,msTransform:o,transform:o}}var zt=e.navigator&&/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(e.navigator.userAgent);function Et(i,t,e){var n=document.createElement("img");if(i.naturalWidth&&!zt)return e(i.naturalWidth,i.naturalHeight),n;var o=document.body||document.documentElement;return n.onload=function(){e(n.width,n.height),zt||o.removeChild(n)},S(t.inheritedAttributes,function(t){var e=i.getAttribute(t);null!==e&&n.setAttribute(t,e)}),n.src=i.src,zt||(n.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",o.appendChild(n)),n}function Tt(t){switch(t){case 2:return $;case 3:return Z;case 4:return K;default:return""}}function Dt(t,e){var i=t.pageX,t=t.pageY,n={endX:i,endY:t};return e?n:q({timeStamp:Date.now(),startX:i,startY:t},n)}var It,i={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initBody:function(){var t=this.element.ownerDocument,e=t.body||t.documentElement;this.body=e,this.scrollbarWidth=window.innerWidth-t.documentElement.clientWidth,this.initialBodyPaddingRight=e.style.paddingRight,this.initialBodyComputedPaddingRight=window.getComputedStyle(e).paddingRight},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}},initViewer:function(){var t,e=this.options,i=this.parent;e.inline&&(t={width:Math.max(i.offsetWidth,e.minWidth),height:Math.max(i.offsetHeight,e.minHeight)},this.parentData=t),!this.fulled&&t||(t=this.containerData),this.viewerData=O({},t)},renderViewer:function(){this.options.inline&&!this.fulled&&C(this.viewer,this.viewerData)},initList:function(){var r=this,t=this.element,h=this.options,l=this.list,c=[];l.innerHTML="",S(this.images,function(i,t){var e,n,o=i.src,s=i.alt||(E(s=o)?decodeURIComponent(s.replace(/^.*\//,"").replace(/[?&#].*$/,"")):""),a=r.getImageURL(i);(o||a)&&(e=document.createElement("li"),n=document.createElement("img"),S(h.inheritedAttributes,function(t){var e=i.getAttribute(t);null!==e&&n.setAttribute(t,e)}),n.src=o||a,n.alt=s,n.setAttribute("data-original-url",a||o),e.setAttribute("data-index",t),e.setAttribute("data-viewer-action","view"),e.setAttribute("role","button"),h.keyboard&&e.setAttribute("tabindex",0),e.appendChild(n),l.appendChild(e),c.push(e))}),S(this.items=c,function(e){var t,i,n=e.firstElementChild;bt(n,"filled",!0),h.loading&&R(e,b),M(n,y,t=function(t){X(n,x,i),h.loading&&F(e,b),r.loadImage(t)},{once:!0}),M(n,x,i=function(){X(n,y,t),h.loading&&F(e,b)},{once:!0})}),h.transition&&M(t,z,function(){R(l,m)},{once:!0})},renderList:function(){var t,e,i=this.index,n=this.items[i];n&&(t=n.nextElementSibling,t=parseInt(window.getComputedStyle(t||n).marginLeft,10),n=n.offsetWidth,C(this.list,O({width:(e=n+t)*this.length-t},kt({translateX:(this.viewerData.width-n)/2-e*i}))))},resetList:function(){var t=this.list;t.innerHTML="",F(t,m),C(t,kt({translateX:0}))},initImage:function(r){var t,h=this,l=this.options,e=this.image,i=this.viewerData,n=this.footer.offsetHeight,c=i.width,u=Math.max(i.height-n,n),d=this.imageData||{};this.imageInitializing={abort:function(){t.onload=null}},t=Et(e,l,function(t,e){var i=t/e,n=c,o=u,s=(h.imageInitializing=!1,c<u*i?o=c/i:n=u*i,n=Math.min(.9*n,t),o=Math.min(.9*o,e),(c-n)/2),a=(u-o)/2,s={left:s,top:a,x:s,y:a,width:n,height:o,oldRatio:1,ratio:n/t,aspectRatio:i,naturalWidth:t,naturalHeight:e},a=O({},s);l.rotatable&&(s.rotate=d.rotate||0,a.rotate=0),l.scalable&&(s.scaleX=d.scaleX||1,s.scaleY=d.scaleY||1,a.scaleX=1,a.
        scaleY=1),h.imageData=s,h.initialImageData=a,r&&r()})},renderImage:function(t){var e,i=this,n=this.image,o=this.imageData;C(n,O({width:o.width,height:o.height,marginLeft:o.x,marginTop:o.y},kt(o))),t&&((this.viewing||this.moving||this.rotating||this.scaling||this.zooming)&&this.options.transition&&L(n,m)?(e=function(){i.imageRendering=!1,t()},this.imageRendering={abort:function(){X(n,k,e)}},M(n,k,e,{once:!0})):t())},resetImage:function(){var t;(this.viewing||this.viewed)&&(t=this.image,this.viewing&&this.viewing.abort(),t.parentNode.removeChild(t),this.image=null)}},t={bind:function(){var t=this.options,e=this.viewer,i=this.canvas,n=this.element.ownerDocument;M(e,w,this.onClick=this.click.bind(this)),M(e,Q,this.onDragStart=this.dragstart.bind(this)),M(i,it,this.onPointerDown=this.pointerdown.bind(this)),M(n,nt,this.onPointerMove=this.pointermove.bind(this)),M(n,ot,this.onPointerUp=this.pointerup.bind(this)),M(n,et,this.onKeyDown=this.keydown.bind(this)),M(window,st,this.onResize=this.resize.bind(this)),t.zoomable&&t.zoomOnWheel&&M(e,at,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),t.toggleOnDblclick&&M(i,J,this.onDblclick=this.dblclick.bind(this))},unbind:function(){var t=this.options,e=this.viewer,i=this.canvas,n=this.element.ownerDocument;X(e,w,this.onClick),X(e,Q,this.onDragStart),X(i,it,this.onPointerDown),X(n,nt,this.onPointerMove),X(n,ot,this.onPointerUp),X(n,et,this.onKeyDown),X(window,st,this.onResize),t.zoomable&&t.zoomOnWheel&&X(e,at,this.onWheel,{passive:!1,capture:!0}),t.toggleOnDblclick&&X(i,J,this.onDblclick)}},At={click:function(t){var e=this.options,i=this.imageData,n=t.target,o=Y(n,ct);switch(o||"img"!==n.localName||"li"!==n.parentElement.localName||(o=Y(n=n.parentElement,ct)),a&&t.isTrusted&&n===this.canvas&&clearTimeout(this.clickCanvasTimeout),o){case"mix":this.played?this.stop():e.inline?this.fulled?this.exit():this.full():this.hide();break;case"hide":this.hide();break;case"view":this.view(Y(n,"index"));break;case"zoom-in":this.zoom(.1,!0);break;case"zoom-out":this.zoom(-.1,!0);break;case"one-to-one":this.toggle();break;case"reset":this.reset();break;case"prev":this.prev(e.loop);break;case"play":this.play(e.fullscreen);break;case"next":this.next(e.loop);break;case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-horizontal":this.scaleX(-i.scaleX||-1);break;case"flip-vertical":this.scaleY(-i.scaleY||-1);break;default:this.played&&this.stop()}},dblclick:function(t){t.preventDefault(),this.viewed&&t.target===this.image&&(a&&t.isTrusted&&clearTimeout(this.doubleClickImageTimeout),this.toggle(t.isTrusted?t:t.detail&&t.detail.originalEvent))},load:function(){var t=this,e=(this.timeout&&(clearTimeout(this.timeout),this.timeout=!1),this.element),i=this.options,n=this.image,o=this.index,s=this.viewerData;F(n,p),i.loading&&F(this.canvas,b),n.style.cssText="height:0;"+"margin-left:".concat(s.width/2,"px;")+"margin-top:".concat(s.height/2,"px;")+"max-width:none!important;position:relative;width:0;",this.initImage(function(){N(n,_,i.movable),N(n,m,i.transition),t.renderImage(function(){t.viewed=!0,t.viewing=!1,A(i.viewed)&&M(e,z,i.viewed,{once:!0}),P(e,z,{originalImage:t.images[o],index:o,image:n},{cancelable:!1})})})},loadImage:function(t){var n=t.target,t=n.parentNode,o=t.offsetWidth||30,s=t.offsetHeight||50,a=!!Y(n,"filled");Et(n,this.options,function(t,e){var t=t/e,e=o,i=s;o<s*t?a?e=s*t:i=o/t:a?i=o/t:e=s*t,C(n,O({width:e,height:i},kt({translateX:(o-e)/2,translateY:(s-i)/2})))})},keydown:function(t){var e=this.options;if(e.keyboard){var i=t.keyCode||t.which||t.charCode;if(13===i&&this.viewer.contains(t.target)&&this.click(t),this.fulled)switch(i){case 27:this.played?this.stop():e.inline?this.fulled&&this.exit():this.hide();break;case 32:this.played&&this.stop();break;case 37:this.prev(e.loop);break;case 38:t.preventDefault(),this.zoom(e.zoomRatio,!0);break;case 39:this.next(e.loop);break;case 40:t.preventDefault(),this.zoom(-e.zoomRatio,!0);break;case 48:case 49:t.ctrlKey&&(t.preventDefault(),this.toggle())}}},dragstart:function(t){"img"===t.target.localName&&t.preventDefault()},pointerdown:function(t){var e=this.options,i=this.pointers,n=t.buttons,o=t.button;!this.viewed||this.showing||this.viewing||this.hiding||("mousedown"===t.type||"pointerdown"===t.type&&"mouse"===t.pointerType)&&(T(n)&&1!==n||T(o)&&0!==o||t.ctrlKey)||(t.preventDefault(),t.changedTouches?S(t.changedTouches,function(t){i[t.identifier]=Dt(t)}):i[t.pointerId||0]=Dt(t),n=!!e.movable&&l,e.zoomOnTouch&&e.zoomable&&1<Object.keys(i).length?n=c:e.slideOnTouch&&("touch"===t.pointerType||"touchstart"===t.type)&&this.isSwitchable()&&(n=W),!e.transition||n!==l&&n!==c||F(this.image,m),this.action=n)},pointermove:function(t){var e=this.pointers,i=this.action;this.viewed&&i&&(t.preventDefault(),t.changedTouches?S(t.changedTouches,function(t){O(e[t.identifier]||{},Dt(t,!0))}):O(e[t.pointerId||0]||{},Dt(t,!0)),this.change(t))},pointerup:function(t){var e,i=this,n=this.options,o=this.action,s=this.pointers;t.changedTouches?S(t.changedTouches,function(t){e=s[t.identifier],delete s[t.identifier]}):(e=s[t.pointerId||0],delete s[t.pointerId||0]),o&&(t.preventDefault(),!n.transition||o!==l&&o!==c||R(this.image,m),this.action=!1,a&&o!==c&&e&&Date.now()-e.timeStamp<500&&(clearTimeout(this.clickCanvasTimeout),clearTimeout(this.doubleClickImageTimeout),n.toggleOnDblclick&&this.viewed&&t.target===this.image?this.imageClicked?(this.imageClicked=!1,this.doubleClickImageTimeout=setTimeout(function(){P(i.image,J,{originalEvent:t})},50)):(this.imageClicked=!0,this.doubleClickImageTimeout=setTimeout(function(){i.imageClicked=!1},500)):(this.imageClicked=!1,n.backdrop&&"static"!==n.backdrop&&t.target===this.canvas&&(this.clickCanvasTimeout=setTimeout(function(){P(i.canvas,w,{originalEvent:t})},50)))))},resize:function(){var e=this;this.isShown&&!this.hiding&&(this.fulled&&(this.close(),this.initBody(),this.open()),this.initContainer(),this.initViewer(),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){e.renderImage()}),this.played&&(this.options.fullscreen&&this.fulled&&!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)?this.stop():S(this.player.getElementsByTagName("img"),function(t){M(t,y,e.loadImage.bind(e),{once:!0}),P(t,y)})))},wheel:function(t){var e,i,n=this;this.viewed&&(t.preventDefault(),this.wheeling||(this.wheeling=!0,setTimeout(function(){n.wheeling=!1},50),e=Number(this.options.zoomRatio)||.1,i=1,t.deltaY?i=0<t.deltaY?1:-1:t.wheelDelta?i=-t.wheelDelta/120:t.detail&&(i=0<t.detail?1:-1),this.zoom(-i*e,!0,t)))}},St={show:function(){var t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],e=this.element,i=this.options;if(i.inline||this.showing||this.isShown||this.showing)return this;if(!this.ready)return this.build(),this.ready&&this.show(t),this;if(A(i.show)&&M(e,ht,i.show,{once:!0}),!1===P(e,ht)||!this.ready)return this;this.hiding&&this.transitioning.abort(),this.showing=!0,this.open();var n,o=this.viewer;return F(o,v),o.setAttribute("role","dialog"),o.setAttribute("aria-labelledby",this.title.id),o.setAttribute("aria-modal",!0),o.removeAttribute("aria-hidden"),i.transition&&!t?(n=this.shown.bind(this),this.transitioning={abort:function(){X(o,k,n),F(o,u)}},R(o,m),o.initialOffsetWidth=o.offsetWidth,M(o,k,n,{once:!0}),R(o,u)):(R(o,u),this.shown()),this},hide:function(){var i=this,t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],e=this.element,n=this.options;if(n.inline||this.hiding||!this.isShown&&!this.showing)return this;if(A(n.hide)&&M(e,"hide",n.hide,{once:!0}),!1===P(e,"hide"))return this;this.showing&&this.transitioning.abort(),this.hiding=!0,this.played?this.stop():this.viewing&&this.viewing.abort();var o,s,a=this.viewer,r=this.image,h=function(){F(a,u),i.hidden()};return n.transition&&!t?(o=function t(e){e&&e.target===a&&(X(a,k,t),i.hidden())},s=function(){L(a,m)?(M(a,k,o),F(a,u)):h()},this.transitioning={abort:function(){i.viewed&&L(r,m)?X(r,k,s):L(a,m)&&X(a,k,o)}},this.viewed&&L(r,m)?(M(r,k,s,{once:!0}),this.zoomTo(0,!1,null,!0)):s()):h(),this},view:function(){var i=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.options.initialViewIndex,t=Number(t)||0;if(this.hiding||this.played||t<0||t>=this.length||this.viewed&&t===this.index)return this;if(!this.isShown)return this.index=t,this.show();this.viewing&&this.viewing.abort();var e=this.element,n=this.options,o=this.title,s=this.canvas,a=this.items[t],r=a.querySelector("img"),h=Y(r,"originalUrl"),l=r.getAttribute("alt"),c=document.createElement("img");if(S(n.inheritedAttributes,function(t){var e=r.getAttribute(t);null!==e&&c.setAttribute(t,e)}),c.src=h,c.alt=l,A(n.view)&&M(e,"view",n.view,{once:!0}),!1===P(e,"view",{originalImage:this.images[t],index:t,image:c})||!this.isShown||this.hiding||this.played)return this;function u(){var t=i.imageData,e=Array.isArray(n.title)?n.title[1]:n.title;o.innerHTML=E(e=A(e)?e.call(i,c,t):"".concat(l," (").concat(t.naturalWidth," × ").concat(t.naturalHeight,")"))?e.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):e}var d,m,h=this.items[this.index];h&&(F(h,f),h.removeAttribute("aria-selected")),R(a,f),a.setAttribute("aria-selected",!0),n.focus&&a.focus(),this.image=c,this.viewed=!1,this.index=t,this.imageData={},R(c,p),n.loading&&R(s,b),s.innerHTML="",s.appendChild(c),this.renderList(),o.innerHTML="";return M(e,z,u,{once:!0}),this.viewing={abort:function(){X(e,z,u),c.complete?i.imageRendering?i.imageRendering.abort():i.imageInitializing&&i.imageInitializing.abort():(c.src="",X(c,y,d),i.timeout&&clearTimeout(i.timeout))}},c.complete?this.load():(M(c,y,d=function(){X(c,x,m),i.load()},{once:!0}),M(c,x,m=function(){X(c,y,d),i.timeout&&(clearTimeout(i.timeout),i.timeout=!1),F(c,p),n.loading&&F(i.canvas,b)},{once:!0}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){F(c,p),
        i.timeout=!1},1e3)),this},prev:function(){var t=this.index-1;return t<0&&(t=0<arguments.length&&void 0!==arguments[0]&&arguments[0]?this.length-1:0),this.view(t),this},next:function(){var t=this.length-1,e=this.index+1;return this.view(e=t<e?0<arguments.length&&void 0!==arguments[0]&&arguments[0]?0:t:e),this},move:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,i=this.imageData;return this.moveTo(D(t)?t:i.x+Number(t),D(e)?e:i.y+Number(e)),this},moveTo:function(t){var e=this,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,o=this.element,s=this.options,a=this.imageData;if(t=Number(t),i=Number(i),this.viewed&&!this.played&&s.movable){var r=a.x,h=a.y,l=!1;if(T(t)?l=!0:t=r,T(i)?l=!0:i=h,l){if(A(s.move)&&M(o,"move",s.move,{once:!0}),!1===P(o,"move",{x:t,y:i,oldX:r,oldY:h,originalEvent:n}))return this;a.x=t,a.y=i,a.left=t,a.top=i,this.moving=!0,this.renderImage(function(){e.moving=!1,A(s.moved)&&M(o,"moved",s.moved,{once:!0}),P(o,"moved",{x:t,y:i,oldX:r,oldY:h,originalEvent:n},{cancelable:!1})})}}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t)),this},rotateTo:function(t){var e=this,i=this.element,n=this.options,o=this.imageData;if(T(t=Number(t))&&this.viewed&&!this.played&&n.rotatable){var s=o.rotate;if(A(n.rotate)&&M(i,"rotate",n.rotate,{once:!0}),!1===P(i,"rotate",{degree:t,oldDegree:s}))return this;o.rotate=t,this.rotating=!0,this.renderImage(function(){e.rotating=!1,A(n.rotated)&&M(i,lt,n.rotated,{once:!0}),P(i,lt,{degree:t,oldDegree:s},{cancelable:!1})})}return this},scaleX:function(t){return this.scale(t,this.imageData.scaleY),this},scaleY:function(t){return this.scale(this.imageData.scaleX,t),this},scale:function(t){var e=this,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,n=this.element,o=this.options,s=this.imageData;if(t=Number(t),i=Number(i),this.viewed&&!this.played&&o.scalable){var a=s.scaleX,r=s.scaleY,h=!1;if(T(t)?h=!0:t=a,T(i)?h=!0:i=r,h){if(A(o.scale)&&M(n,"scale",o.scale,{once:!0}),!1===P(n,"scale",{scaleX:t,scaleY:i,oldScaleX:a,oldScaleY:r}))return this;s.scaleX=t,s.scaleY=i,this.scaling=!0,this.renderImage(function(){e.scaling=!1,A(o.scaled)&&M(n,"scaled",o.scaled,{once:!0}),P(n,"scaled",{scaleX:t,scaleY:i,oldScaleX:a,oldScaleY:r},{cancelable:!1})})}}return this},zoom:function(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1],i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,n=this.imageData;return t=Number(t),this.zoomTo(n.width*(t=t<0?1/(1-t):1+t)/n.naturalWidth,e,i),this},zoomTo:function(t){var i,n,o,e=this,s=1<arguments.length&&void 0!==arguments[1]&&arguments[1],a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,r=3<arguments.length&&void 0!==arguments[3]&&arguments[3],h=this.element,l=this.options,c=this.pointers,u=this.imageData,d=u.x,m=u.y,g=u.width,f=u.height,v=u.naturalWidth,p=u.naturalHeight;if(T(t=Math.max(0,t))&&this.viewed&&!this.played&&(r||l.zoomable)){if(r||(r=Math.max(.01,l.minZoomRatio),w=Math.min(100,l.maxZoomRatio),t=Math.min(Math.max(t,r),w)),a)switch(a.type){case"wheel":.055<=l.zoomRatio&&.95<t&&t<1.05&&(t=1);break;case"pointermove":case"touchmove":case"mousemove":.99<t&&t<1.01&&(t=1)}var b,r=v*t,w=p*t,v=r-g,p=w-f,y=u.ratio;if(A(l.zoom)&&M(h,"zoom",l.zoom,{once:!0}),!1===P(h,"zoom",{ratio:t,oldRatio:y,originalEvent:a}))return this;this.zooming=!0,a?(b={left:(b=(b=this.viewer).getBoundingClientRect()).left+(window.pageXOffset-document.documentElement.clientLeft),top:b.top+(window.pageYOffset-document.documentElement.clientTop)},c=c&&0<Object.keys(c).length?(o=n=i=0,S(c,function(t){var e=t.startX,t=t.startY;i+=e,n+=t,o+=1}),{pageX:i/=o,pageY:n/=o}):{pageX:a.pageX,pageY:a.pageY},u.x-=(c.pageX-b.left-d)/g*v,u.y-=(c.pageY-b.top-m)/f*p):(u.x-=v/2,u.y-=p/2),u.left=u.x,u.top=u.y,u.width=r,u.height=w,u.oldRatio=y,u.ratio=t,this.renderImage(function(){e.zooming=!1,A(l.zoomed)&&M(h,"zoomed",l.zoomed,{once:!0}),P(h,"zoomed",{ratio:t,oldRatio:y,originalEvent:a},{cancelable:!1})}),s&&this.tooltip()}return this},play:function(){var e=this,t=0<arguments.length&&void 0!==arguments[0]&&arguments[0];if(!this.isShown||this.played)return this;var i=this.element,o=this.options;if(A(o.play)&&M(i,"play",o.play,{once:!0}),!1===P(i,"play"))return this;var s=this.player,a=this.loadImage.bind(this),r=[],h=0,l=0;return this.played=!0,this.onLoadWhenPlay=a,t&&this.requestFullscreen(t),R(s,d),S(this.items,function(t,e){var i=t.querySelector("img"),n=document.createElement("img");n.src=Y(i,"originalUrl"),n.alt=i.getAttribute("alt"),n.referrerPolicy=i.referrerPolicy,h+=1,R(n,H),N(n,m,o.transition),L(t,f)&&(R(n,u),l=e),r.push(n),M(n,y,a,{once:!0}),s.appendChild(n)}),T(o.interval)&&0<o.interval&&1<h&&function t(){e.playing=setTimeout(function(){F(r[l],u),R(r[l=(l+=1)<h?l:0],u),t()},o.interval)}(),this},stop:function(){var e=this;if(!this.played)return this;var t=this.element,i=this.options;if(A(i.stop)&&M(t,"stop",i.stop,{once:!0}),!1===P(t,"stop"))return this;i=this.player;return this.played=!1,clearTimeout(this.playing),S(i.getElementsByTagName("img"),function(t){X(t,y,e.onLoadWhenPlay)}),F(i,d),i.innerHTML="",this.exitFullscreen(),this},full:function(){var t=this,e=this.options,i=this.viewer,n=this.image,o=this.list;return!this.isShown||this.played||this.fulled||!e.inline||(this.fulled=!0,this.open(),R(this.button,U),e.transition&&(F(o,m),this.viewed&&F(n,m)),R(i,B),i.setAttribute("role","dialog"),i.setAttribute("aria-labelledby",this.title.id),i.setAttribute("aria-modal",!0),i.removeAttribute("style"),C(i,{zIndex:e.zIndex}),e.focus&&this.enforceFocus(),this.initContainer(),this.viewerData=O({},this.containerData),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage(function(){e.transition&&setTimeout(function(){R(n,m),R(o,m)},0)})})),this},exit:function(){var t=this,e=this.options,i=this.viewer,n=this.image,o=this.list;return this.isShown&&!this.played&&this.fulled&&e.inline&&(this.fulled=!1,this.close(),F(this.button,U),e.transition&&(F(o,m),this.viewed&&F(n,m)),e.focus&&this.clearEnforceFocus(),i.removeAttribute("role"),i.removeAttribute("aria-labelledby"),i.removeAttribute("aria-modal"),F(i,B),C(i,{zIndex:e.zIndexInline}),this.viewerData=O({},this.parentData),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage(function(){e.transition&&setTimeout(function(){R(n,m),R(o,m)},0)})})),this},tooltip:function(){var t=this,e=this.options,i=this.tooltipBox,n=this.imageData;return this.viewed&&!this.played&&e.tooltip&&(i.textContent="".concat(Math.round(100*n.ratio),"%"),this.tooltipping?clearTimeout(this.tooltipping):e.transition?(this.fading&&P(i,k),R(i,d),R(i,H),R(i,m),i.removeAttribute("aria-hidden"),i.initialOffsetWidth=i.offsetWidth,R(i,u)):(R(i,d),i.removeAttribute("aria-hidden")),this.tooltipping=setTimeout(function(){e.transition?(M(i,k,function(){F(i,d),F(i,H),F(i,m),i.setAttribute("aria-hidden",!0),t.fading=!1},{once:!0}),F(i,u),t.fading=!0):(F(i,d),i.setAttribute("aria-hidden",!0)),t.tooltipping=!1},1e3)),this},toggle:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;return 1===this.imageData.ratio?this.zoomTo(this.imageData.oldRatio,!0,t):this.zoomTo(1,!0,t),this},reset:function(){return this.viewed&&!this.played&&(this.imageData=O({},this.initialImageData),this.renderImage()),this},update:function(){var e=this,t=this.element,i=this.options,n=this.isImg;if(n&&!t.parentNode)return this.destroy();var o,s=[];return S(n?[t]:t.querySelectorAll("img"),function(t){A(i.filter)?i.filter.call(e,t)&&s.push(t):e.getImageURL(t)&&s.push(t)}),s.length&&(this.images=s,this.length=s.length,this.ready?(o=[],S(this.items,function(t,e){var t=t.querySelector("img"),i=s[e];i&&t&&i.src===t.src&&i.alt===t.alt||o.push(e)}),C(this.list,{width:"auto"}),this.initList(),this.isShown&&(this.length?this.viewed&&(0<=(n=o.indexOf(this.index))?(this.viewed=!1,this.view(Math.max(Math.min(this.index-n,this.length-1),0))):(R(t=this.items[this.index],f),t.setAttribute("aria-selected",!0))):(this.image=null,this.viewed=!1,this.index=0,this.imageData={},this.canvas.innerHTML="",this.title.innerHTML=""))):this.build()),this},destroy:function(){var t=this.element,e=this.options;return t[g]&&(this.destroyed=!0,this.ready?(this.played&&this.stop(),e.inline?(this.fulled&&this.exit(),this.unbind()):this.isShown?(this.viewing&&(this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort()),this.hiding&&this.transitioning.abort(),this.hidden()):this.showing&&(this.transitioning.abort(),this.hidden()),this.ready=!1,this.viewer.parentNode.removeChild(this.viewer)):e.inline&&(this.delaying?this.delaying.abort():this.initializing&&this.initializing.abort()),e.inline||X(t,w,this.onStart),t[g]=void 0),this}},Ot={getImageURL:function(t){var e=this.options.url;return e=E(e)?t.getAttribute(e):A(e)?e.call(this,t):""},enforceFocus:function(){var n=this;this.clearEnforceFocus(),M(document,tt,this.onFocusin=function(t){var e=n.viewer,i=t.target;if(i!==document&&i!==e&&!e.contains(i)){for(;i;){if(null!==i.getAttribute("tabindex")||"true"===i.getAttribute("aria-modal"))return;i=i.parentElement}e.focus()}})},clearEnforceFocus:function(){this.onFocusin&&(X(document,tt,this.onFocusin),this.onFocusin=null)},open:function(){var t=this.body;R(t,G),t.style.paddingRight="".concat(this.scrollbarWidth+(parseFloat(this.initialBodyComputedPaddingRight)||0),"px")},close:function(){var t=this.body;F(t,G),t.style.paddingRight=this.initialBodyPaddingRight},shown:function(){var t=this.element,e=this.options,i=this.viewer;this.fulled=!0,this.isShown=!0,this.render(),this.bind(),this.showing=!1,e.focus&&(i.focus(),this.enforceFocus()),A(e.shown)&&M(t,"shown",e.shown,{once:!0}),!1!==P(t,"shown")&&this.ready&&this.isShown&&!this.hiding&&this.view(this.index)},hidden:function(){var t=this.element,e=this.options,i=this.viewer;e.fucus&&this.clearEnforceFocus(),this.fulled=!
        1,this.viewed=!1,this.isShown=!1,this.close(),this.unbind(),R(i,v),i.removeAttribute("role"),i.removeAttribute("aria-labelledby"),i.removeAttribute("aria-modal"),i.setAttribute("aria-hidden",!0),this.resetList(),this.resetImage(),this.hiding=!1,this.destroyed||(A(e.hidden)&&M(t,"hidden",e.hidden,{once:!0}),P(t,"hidden",null,{cancelable:!1}))},requestFullscreen:function(t){var e=this.element.ownerDocument;this.fulled&&!(e.fullscreenElement||e.webkitFullscreenElement||e.mozFullScreenElement||e.msFullscreenElement)&&((e=e.documentElement).requestFullscreen?I(t)?e.requestFullscreen(t):e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen&&e.msRequestFullscreen())},exitFullscreen:function(){var t=this.element.ownerDocument;this.fulled&&(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)&&(t.exitFullscreen?t.exitFullscreen():t.webkitExitFullscreen?t.webkitExitFullscreen():t.mozCancelFullScreen?t.mozCancelFullScreen():t.msExitFullscreen&&t.msExitFullscreen())},change:function(t){var e=this.options,i=this.pointers,n=i[Object.keys(i)[0]];if(n){var s,a,o=n.endX-n.startX,r=n.endY-n.startY;switch(this.action){case l:this.move(o,r,t);break;case c:this.zoom((s=q({},h=i),a=[],S(h,function(o,t){delete s[t],S(s,function(t){var e=Math.abs(o.startX-t.startX),i=Math.abs(o.startY-t.startY),n=Math.abs(o.endX-t.endX),t=Math.abs(o.endY-t.endY),e=Math.sqrt(e*e+i*i),i=Math.sqrt(n*n+t*t);a.push((i-e)/e)})}),a.sort(function(t,e){return Math.abs(t)<Math.abs(e)}),a[0]),!1,t);break;case W:this.action="switched";var h=Math.abs(o);1<h&&h>Math.abs(r)&&(this.pointers={},1<o?this.prev(e.loop):o<-1&&this.next(e.loop))}S(i,function(t){t.startX=t.endX,t.startY=t.endY})}},isSwitchable:function(){var t=this.imageData,e=this.viewerData;return 1<this.length&&0<=t.x&&0<=t.y&&t.width<=e.width&&t.height<=e.height}},Ct=e.Viewer,Lt=(It=-1,function(){return It+=1}),e=function(){function o(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},i=this,n=o;if(!(i instanceof n))throw new TypeError("Cannot call a class as a function");if(!t||1!==t.nodeType)throw new Error("The first argument is required and must be an element.");this.element=t,this.options=O({},h,I(e)&&e),this.action=!1,this.fading=!1,this.fulled=!1,this.hiding=!1,this.imageClicked=!1,this.imageData={},this.index=this.options.initialViewIndex,this.isImg=!1,this.isShown=!1,this.length=0,this.moving=!1,this.played=!1,this.playing=!1,this.pointers={},this.ready=!1,this.rotating=!1,this.scaling=!1,this.showing=!1,this.timeout=!1,this.tooltipping=!1,this.viewed=!1,this.viewing=!1,this.wheeling=!1,this.zooming=!1,this.id=Lt(),this.init()}var t,e,i;return t=o,i=[{key:"noConflict",value:function(){return window.Viewer=Ct,o}},{key:"setDefaults",value:function(t){O(h,I(t)&&t)}}],(e=[{key:"init",value:function(){var t,e,i,n,o=this,s=this.element,a=this.options;s[g]||(s[g]=this,a.focus&&!a.keyboard&&(a.focus=!1),t="img"===s.localName,e=[],S(t?[s]:s.querySelectorAll("img"),function(t){A(a.filter)?a.filter.call(o,t)&&e.push(t):o.getImageURL(t)&&e.push(t)}),this.isImg=t,this.length=e.length,this.images=e,this.initBody(),D(document.createElement(g).style.transition)&&(a.transition=!1),a.inline?(i=0,n=function(){var t;(i+=1)===o.length&&(o.initializing=!1,o.delaying={abort:function(){clearTimeout(t)}},t=setTimeout(function(){o.delaying=!1,o.build()},0))},this.initializing={abort:function(){S(e,function(t){t.complete||(X(t,y,n),X(t,x,n))})}},S(e,function(t){var e,i;t.complete?n():(M(t,y,e=function(){X(t,x,i),n()},{once:!0}),M(t,x,i=function(){X(t,y,e),n()},{once:!0}))})):M(s,w,this.onStart=function(t){t=t.target;"img"!==t.localName||A(a.filter)&&!a.filter.call(o,t)||o.view(o.images.indexOf(t))}))}},{key:"build",value:function(){var t,s,e,i,n,o,a,r,h,l,c,u,d,m;this.ready||(t=this.element,s=this.options,e=t.parentNode,(d=document.createElement("div")).innerHTML='<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list" role="navigation"></ul></div></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button"></div><div class="viewer-player"></div></div>',d=(i=d.querySelector(".".concat(g,"-container"))).querySelector(".".concat(g,"-title")),n=i.querySelector(".".concat(g,"-toolbar")),m=i.querySelector(".".concat(g,"-navbar")),o=i.querySelector(".".concat(g,"-button")),a=i.querySelector(".".concat(g,"-canvas")),this.parent=e,this.viewer=i,this.title=d,this.toolbar=n,this.navbar=m,this.button=o,this.canvas=a,this.footer=i.querySelector(".".concat(g,"-footer")),this.tooltipBox=i.querySelector(".".concat(g,"-tooltip")),this.player=i.querySelector(".".concat(g,"-player")),this.list=i.querySelector(".".concat(g,"-list")),i.id="".concat(g).concat(this.id),d.id="".concat(g,"Title").concat(this.id),R(d,s.title?Tt(Array.isArray(s.title)?s.title[0]:s.title):v),R(m,s.navbar?Tt(s.navbar):v),N(o,v,!s.button),s.keyboard&&o.setAttribute("tabindex",0),s.backdrop&&(R(i,"".concat(g,"-backdrop")),s.inline||"static"===s.backdrop||bt(a,ct,"hide")),E(s.className)&&s.className&&s.className.split(ut).forEach(function(t){R(i,t)}),s.toolbar?(r=document.createElement("ul"),h=I(s.toolbar),l=dt.slice(0,3),c=dt.slice(7,9),u=dt.slice(9),h||R(n,Tt(s.toolbar)),S(h?s.toolbar:dt,function(t,e){var i,n=h&&I(t),e=h?pt(e):t,o=n&&!D(t.show)?t.show:t;!o||!s.zoomable&&-1!==l.indexOf(e)||!s.rotatable&&-1!==c.indexOf(e)||!s.scalable&&-1!==u.indexOf(e)||(i=n&&!D(t.size)?t.size:t,n=n&&!D(t.click)?t.click:t,t=document.createElement("li"),s.keyboard&&t.setAttribute("tabindex",0),t.setAttribute("role","button"),R(t,"".concat(g,"-").concat(e)),A(n)||bt(t,ct,e),T(o)&&R(t,Tt(o)),-1!==["small","large"].indexOf(i)?R(t,"".concat(g,"-").concat(i)):"play"===e&&R(t,"".concat(g,"-large")),A(n)&&M(t,w,n),r.appendChild(t))}),n.appendChild(r)):R(n,v),s.rotatable||(R(d=n.querySelectorAll('li[class*="rotate"]'),p),S(d,function(t){n.appendChild(t)})),s.inline?(R(o,V),C(i,{zIndex:s.zIndexInline}),"static"===window.getComputedStyle(e).position&&C(e,{position:"relative"}),e.insertBefore(i,t.nextSibling)):(R(o,j),R(i,B),R(i,H),R(i,v),C(i,{zIndex:s.zIndex}),(m=(m=E(m=s.container)?t.ownerDocument.querySelector(m):m)||this.body).appendChild(i)),s.inline&&(this.render(),this.bind(),this.isShown=!0),this.ready=!0,A(s.ready)&&M(t,rt,s.ready,{once:!0}),!1===P(t,rt)?this.ready=!1:this.ready&&s.inline&&this.view(this.index))}}])&&r(t.prototype,e),i&&r(t,i),Object.defineProperty(t,"prototype",{writable:!1}),o}();return O(e.prototype,i,t,At,St,Ot),e});       

        const params = new URLSearchParams(window.location.search);
        const sc = params.get('sc');
        if (sc && !params.get('ru')) {
            $('html').scrollTop(sc);
        }

        // Detect touch screen and enable scrollbar if necessary
        function is_touch_device() {
            try {
                document.createEvent('TouchEvent');
                return true;
            } catch (e) {
                return false;
            }
        }

        if (is_touch_device()) {
            $('body').removeClass('no-touch').addClass('touch');
        } else {
            $('body').removeClass('touch').addClass('no-touch');
        }

        function compareString(a, b) {
            return a > b ? 1 : (a < b ? -1 : 0);
        }

        class AlgoliaFilters {
            constructor() {
                const algoliaclient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_FRONTEND_API_KEY);
                this.algoliaindex = algoliaclient.initIndex('products_releasedate_desc');

                this.filtersForFacets = {};
            }

            addFilterForFacets(key, val){
                this.filtersForFacets[key] = '"' + val + '"';;
            }

            filtersString(exclude = null) {
                const arr = [];
                for (let key in this.filtersForFacets) if (!exclude || key != exclude) arr.push(key + ':' + this.filtersForFacets[key]);
                return arr.join(' AND ');
            }
        }

        // Plugin initialization

        $('.carousel--hero').carousel({
            arrows: false,
            fullWidth: true,
            indicators: true,
            interval: 5000,
            onCycleTo: function(item, dragged) {}
        });

        $('.collapsible:not(.sidenav__collapsible)').collapsible({
            onOpenEnd: (el) => {
                const body = el.querySelector('.collapsible-body');
                if (body) body.scrollIntoView({behavior: 'smooth', block: 'nearest'});
            }
        });
        $('.sidenav__collapsible').collapsible({
            onOpenEnd: (el) => {
                const body = el.querySelector('.collapsible-body');
                if (body) body.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        });
        $('.collapsible.expandable').collapsible({
            accordion: false
        });

        $('.materialboxed').materialbox();
        $('.modal:not(.modal-ajax)').modal();
        $('.tabs').tabs();
        $('select').not('.disabled').formSelect();
        $('.sidenav').sidenav();
        $('input[data-length], textarea[data-length]').characterCounter();

        // AJAX
        if (
            $('.is-ligged-false').length ||
            $('.menu-auctions-links').length ||
            $('.header__bag-number').length
        ) getHeaderUpdate();

        getHomeWhatsNews();
        getHomeTopselling();

        // SIGN OUT SSO
        if ($('.signout-trigger').length) {
            $('.signout-trigger').on('click', function (e) {
                e.preventDefault();
                $('.loader-block').show();
                $.get(this.href)
                    .always(() => {
                        let params = '?action=signout&d=1&ru=/';
                        const scroll = $(window).scrollTop();
                        if (scroll > 100) params += '&sc=' + String(Math.round(scroll));
                        redirectPage(AUCTION_URL + params);
                    });
            });
        }

        // MODAL SIGNIN

        function ssoParams(params) {
            const ruParams = new URLSearchParams(window.location.search);
            if (ruParams.get('sc')) ruParams.delete('sc'); // delete old sc
            params.append('ru', encodeURIComponent(window.location.pathname + '?' + ruParams.toString()));
            const scroll = $(window).scrollTop();
            if (scroll > 100) params.append('sc', String(Math.round(scroll)));
        }

        $('#modal-signin').modal({ // load form on modal open
            onOpenStart: function (el, trigger) {
                el.classList.add('sync');
                const $form = $(el).find('.modal-signin-form');
                const params = new URLSearchParams('d=1');
                if ($(trigger).data('ru')) { // redirect to another page after sam login
                    $('body').data('ru', $(trigger).data('ru'));
                    params.append('ru', encodeURIComponent($(trigger).data('ru')));
                } else { // redirect to this page after sam login
                    ssoParams(params);
                }
                $form.data('params', params.toString());
                $.get('/ajax/modalSignIn.action')
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        $form.html(data);
                        M.updateTextFields();
                        initFacebookLoginButton($form.data('params'));
                    })
                    .fail(data => {
                        if (data && data.statusText) $form.html(data.statusText);
                    })
                    .always(data => {
                        el.classList.remove('sync');
                    });
            },
        });

        $('.modal-signin-form').submit(function (e) {
            e.preventDefault();
            this.classList.add('sync');
            $form = $(this);

            $.post(
                this.action,
                $(this).serialize(),
            )
                .done(data => {
                    if (!checkResponse(data)) return data;

                    if (data && data.trim() === 'success') {
                        $('.loader-block').show();
                        redirectPage('/sso.action?' + $form.data('params'));
                    } else {
                        this.innerHTML = data;
                        M.updateTextFields();
                        initFacebookLoginButton($form.data('params'));
                    }
                })
                .fail(data => {
                    if (data && data.statusText) this.innerHTML = data.statusText;
                })
                .always(data => {
                    this.classList.remove('sync');
                });
        });

        // MODAL REGISTER

        $('#modal-register').modal({ // load form on modal open
            onOpenStart: function (el) {
                el.classList.add('sync');
                const $form = $(el).find('.modal-register-form');
                const params = new URLSearchParams('d=1');
                if ($('body').data('ru')) { // redirect to another page after sam login
                    params.append('ru', encodeURIComponent($('body').data('ru')));
                } else { // redirect to this page after sam login
                    ssoParams(params);
                }
                $form.data('params', params.toString());
                $.get('/ajax/modalRegister.action')
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        $form.html(data);
                        M.updateTextFields();
                        grecaptchaRender('g-recaptcha-register');
                        initFacebookLoginButton($form.data('params'));
                        trackEvent('RegistrationForm');
                    })
                    .fail(data => {
                        if (data && data.statusText) $form.html(data.statusText);
                    })
                    .always(data => {
                        el.classList.remove('sync');
                    });
            },
            onCloseStart: function (el) {
                const $ssoTrigger = $(el).find('.modal-register__sso-trigger');
                if ($ssoTrigger.length) $ssoTrigger.trigger('click');
            },
        });

        $('.modal-register-form').submit(function (e) {
            e.preventDefault();
            this.classList.add('sync');
            $form = $(this);

            $.post(
                this.action,
                $(this).serialize(),
            )
                .done(data => {
                    if (!checkResponse(data)) return data;

                    this.innerHTML = data;
                    M.updateTextFields();
                    grecaptchaRender('g-recaptcha-register');
                    initFacebookLoginButton($form.data('params'));
                    if ($('.modal-register__sso-trigger').length) { // success
                        $('.modal-register__sso-trigger').on('click', function (e) {
                            e.preventDefault();
                            setTimeout(() => redirectPage('/sso.action?' + $form.data('params')));
                        });
                        trackEvent('SignUp');
                    }
                })
                .fail(data => {
                    if (data && data.statusText) this.innerHTML = data.statusText;
                })
                .always(data => {
                    this.classList.remove('sync');
                });
        });

        // MODAL PASSWORD

        $('#modal-password').modal({ // load form on modal open
            onOpenStart: function (el) {
                el.classList.add('sync');
                const $form = $(el).find('.modal-password-form');
                $.get('/ajax/modalPasswordAssistance.action')
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        $form.html(data);
                        M.updateTextFields();
                        grecaptchaRender('g-recaptcha-password');
                    })
                    .fail(data => {
                        if (data && data.statusText) $form.html(data.statusText);
                    })
                    .always(data => {
                        el.classList.remove('sync');
                    });
            }
        });

        $('.modal-password-form').submit(function (e) {
            e.preventDefault();
            this.classList.add('sync');
            $.post(
                this.action,
                $(this).serialize(),
            )
                .done(data => {
                    if (!checkResponse(data)) return data;

                    this.innerHTML = data;
                    M.updateTextFields();
                    grecaptchaRender('g-recaptcha-password');
                })
                .fail(data => {
                    if (data && data.statusText) this.innerHTML = data.statusText;
                })
                .always(data => {
                    this.classList.remove('sync');
                });
        });

        // CARD
        function cardsHandlers () {
            $('.card__add').on('click', function (e) {
                e.preventDefault();
                const $card = $(this).closest('.card');
                if (!$card.length) return;

                const productId = $card[0].getAttribute('data-id');
                const url = '/ajax/addProduct.action?product=' + productId;

                $.get(url)
                    .done(data => {
                        if ($('.bag__items').length) { // bag page
                            reloadPage();
                        } else {
                            $card.addClass('card--added');
                            bagCountUpdate();
                            M.toast({html: `<span>Added to cart&nbsp; <a href="/shoppingCart.action" class="h6">Open Cart</a></span>`});
                        }
                    });
            });

            $('.card__added').on('click', function (e) {
                e.preventDefault();
                redirectPage($(this).attr('href'));
            });

            // todo: server response always return OK, no exceptions handling
            $('.card__heart').on('click', function (e) {
                e.preventDefault();
                if (this.classList.contains('modal-trigger')) return; // signin modal

                const $card = $(this).closest('.card');
                if (!$card.length) return;

                const productId = $card[0].getAttribute('data-id');
                if ($card.hasClass('card--liked')) {
                    $.get('/ajax/removeFromFavorites.action?product=' + productId)
                        .done(data => {
                            $card.removeClass('card--liked');
                        });
                } else {
                    $.get('/ajax/addToFavorites.action?product=' + productId)
                        .done(data => {
                            $card.addClass('card--liked');
                        });
                }
            });

            $('.card__action-sell').on('click', function (e) {
                e.preventDefault();
                const $card = $(this).closest('.card');
                if (!$card.length) return;

                const productId = $card[0].getAttribute('data-id');
                redirectPage('/sellRequest.action?productId=' + productId + '#form');
            });

            const currency = document.querySelectorAll('.card__price-i, .product__price-i');
            if (currency) M.Dropdown.init(currency, { container: document.body });
        }
        cardsHandlers();

        // CARDS INFINITE LOADER
        const $cardsInfinite = $('.cards__list.infinite');
        if ($cardsInfinite.length) {
            let autoPagingBusy = false;

            function loadProducts() {
                if (!autoPagingBusy && $(document).height() - $(window).height() - $(window).scrollTop() < 1500) {
                    autoPagingBusy = true;

                    const regularItemsOffset = $('.card').not('.card--archived').length;
                    const archiveItemsOffset = $('.card--archived').length;
                    const auctionAdditionsCount = $('.card-auction').length;

                    $('#itemsOffset').val(regularItemsOffset + archiveItemsOffset + auctionAdditionsCount * 2);
                    $('#regularItemsOffset').val(regularItemsOffset);
                    $('#archiveItemsOffset').val(archiveItemsOffset);

                    $('.footer, .footer-signup').hide();

                    $.get('/ajax/products.action?' + $('#filterForm').serialize() + '&' + $('.header__filters').serialize(), function (data) {
                        if (!checkResponse(data, false)) return data;

                        const trim = $.trim(data);
                        if (trim === 'no results') {
                            $(window).off('scroll', loadProducts);
                            $('.footer, .footer-signup').show();
                        } else if (trim) {
                            $('.cards__list').append(data);
                            autoPagingBusy = false;
                            cardsHandlers();
                        }
                    });
                }
            }
            $(window).on('scroll', loadProducts);
        }

        // HEADER BAG DROPDOWN
        if (!$('.order').length) $('.header__bag').dropdown({ // no dropdown on order pages
            alignment: 'right',
            closeOnClick: false,
            onOpenStart: function () {
                this.isOpened = false;
                const dropdown = this;
                this.onOpenedAndLoaded = () => {
                    if (this.isOpened && !this.isSync) {
                        this.dropdownEl.classList.remove('sync');
                        this.recalculateDimensions();
                        $('.modal-bag__delete').on('click', function (e) {
                            e.preventDefault();
                            if (!this.dataset || !this.dataset.id) return;

                            $.get('/ajax/removeProduct.action?product=' + this.dataset.id)
                                .always(data => {
                                    getBag(true);
                                    const $card = $('.card--added[data-id="' + this.dataset.id + '"]');
                                    if ($card.length) {
                                        $card.removeClass('card--added');
                                    }
                                    const $product = $('.product--added[data-id="' + this.dataset.id + '"]');
                                    if ($product.length) {
                                        $product.removeClass('product--added');
                                    }
                                });
                        });
                        $('.modal-close').on('click', function () {
                            dropdown.close();
                        });
                    }
                }
                const getBag = (isDelete = false) => {
                    this.isSync = true;
                    const $form = $(this.dropdownEl).find('.modal-form');
                    this.dropdownEl.classList.add('sync');
                    $.get('/ajax/rest.action?actions=productBasket&actions=productBasketCount')
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            const $data = $('<div/>').html(data);
                            const bagCount = $data.find('#productBasketCount').text().trim();
                            const $bagItems = $data.find('#productBasket');
                            $form.html($bagItems);
                            bagCountToggle(bagCount);
                            if (isDelete && bagCount == 0) { // close after delete last item in bag
                                dropdown.close();
                            }
                        })
                        .fail(data => {
                            if (data && data.statusText) $form.html(data.statusText);
                        })
                        .always(data => {
                            this.isSync = false;
                            this.onOpenedAndLoaded();
                        });
                }
                getBag();
            },
            onOpenEnd: function () {
                this.isOpened = true;
                this.onOpenedAndLoaded();
            }
        });


        // CREDIT CARDS
        function creditCards () {
            $creditCards = $('.credit-cards');
            if ($creditCards.length) {
                const $removedCards = $('select[name="removedCards"] option:selected');
                if ($removedCards.length) {
                    $removedCards.each((i, option) => {
                        $('.credit-cards__item[data-value="' + option.value + '"]').addClass('remove');
                    });
                }
                $('.credit-cards__item-remove').on('click', function (e) {
                    $option = $('select[name="removedCards"] option[value="' + $(this).data('value') + '"]');
                    if ($option.length) {
                        const val = !$option[0].selected;
                        $option[0].selected = val;
                        $creditCard = $(this).closest('.credit-cards__item');
                        if ($creditCard.length) {
                            $creditCard.toggleClass('remove');
                            $input = $creditCard.find('input');
                            if ($input.length) {
                                if (val) $input[0].checked = false;
                                $input[0].disabled = val;
                            }
                        }
                    }
                });

                $('.credit-cards__add-button, .credit-cards__cancel-button').on('click', function (e) {
                    $stripe = $(this).closest('.credit-cards__stripe');
                    if ($stripe.length) {
                        const show = $(this).hasClass('credit-cards__add-button');
                        $stripe.toggleClass('new', show);
                        $stripeElements = $stripe.find('.stripeElements');
                        if ($stripeElements.length) $stripeElements[0].style.display = show ? 'block' : 'none';
                    }
                });
            }
        }
        creditCards();

        // STRIPE
        function stripeElements () {
            try { if ($('.stripeElements').length && !$('#checkoutStep').length) { // checkoutStep in checkout.js
                const stripe = Stripe($('#stripePublicKey').val());
                const elements = stripe.elements();

                const elementStyles = {
                    base: {
                        color: '#2D2E41',
                        fontSize: '16px',
                        fontSmoothing: 'antialiased',
                    },
                    invalid: {
                        color: '#F93838',
                        ':focus': {
                            color: '#2D2E41',
                        },
                    },
                };

                const elementClasses = {
                    focus: 'focus',
                    empty: 'empty',
                    invalid: 'invalid',
                };

                cardNumber = elements.create('cardNumber', {
                    style: elementStyles,
                    classes: elementClasses,
                });
                cardNumber.mount('#stipeCardNumber');

                const cardExpiry = elements.create('cardExpiry', {
                    style: elementStyles,
                    classes: elementClasses,
                });
                cardExpiry.mount('#stipeCardExpiry');

                const cardCvc = elements.create('cardCvc', {
                    style: elementStyles,
                    classes: elementClasses,
                });
                cardCvc.mount('#stipeCardCvc');

                $('.__PrivateStripeElement').attr('style', '');

                const stripeErrors = [];
                $stripeErrors = $('.stripeElements .input-field__helper');

                [cardNumber, cardExpiry, cardCvc].forEach(function (element, key) {
                    element.on('focus', function (event) {
                        $(element._component).addClass('focus');
                    });
                    element.on('blur', function (event) {
                        $(element._component).removeClass('focus');
                    });
                    element.on('change', function (event) {
                        if (event.error) {
                            stripeErrors[key] = event.error.message;
                        } else {
                            stripeErrors[key] = null;
                        }
                        const stripeErrorsExist = stripeErrors.filter(e => !!e);
                        if (stripeErrorsExist.length) {
                            $stripeErrors.addClass('error').html(stripeErrorsExist.join('<br>'));
                        } else {
                            $stripeErrors.removeClass('error').html('');
                        }
                    });
                });

                const cardData = {
                    address_zip: $('stipeCardZip').val()
                };

                $('.stripeElements').closest('form').submit(function (e) {
                    $stripeElements = $(this).find('.stripeElements');
                    if (this.classList.contains('sync') ||
                        !$stripeElements.length ||
                        $stripeElements[0].style.display == 'none') return;

                    e.preventDefault();
                    $('.loader-block').show();
                    $form = $(this);
                    $form.addClass('sync');
                    stripe.createToken(cardNumber, cardData).then(function (result) {
                        if (result.error) {
                            $('#stripeError').val(result.error.message);
                            $('.stripeElements .input-field__helper').text(result.error.message).addClass('error');
                            $('#stripeToken').val('');
                            $form.removeClass('sync');
                            $('.loader-block').hide();
                            $('body').removeClass('blocked');
                            scrollToError();
                        } else {
                            $('#stripeError').val('');
                            $('.stripeElements .input-field__helper').text('').removeClass('error');
                            $('#stripeToken').val(result.token.id);
                            $('#stripeTitle').val("***" + result.token.card.last4 + " " + result.token.card.exp_month + "/" + result.token.card.exp_year);
                            if ($stripeElements.length) $stripeElements[0].style.display = 'none';
                            $form.submit();
                        }
                    });
                });
            }} catch {}
        }
        stripeElements();

        // const out = document.createElement('div');
        // out.classList.add('out');
        // document.body.append(out);

        let isMobileFilter = false;
        let headerDebounce;
        function resize() {
            if (headerDebounce) clearTimeout(headerDebounce);
            headerDebounce = setTimeout(() => {
                headerFloat();
                mobileFilterToggle();
            }, 100);
        }
        resize();
        $(window).on('resize', resize);

        // HEADER
        const headerMainTop = $('.header__settings').height();
        const HEADER_THRESHOLD = 100; // px
        let previousScroll = 0;
        function headerFloat () {
            const $header = $('header');
            const $headerMain = $('.header__main');
            if ($header.length && $headerMain.length) {
                $header.css('maxWidth', $('main').width() + 'px');
                const bottom = $header.height();
                $(window).on('scroll', M.throttle((e) => {
                    const currentScroll = document.body.scrollTop || window.scrollY || document.documentElement.scrollTop;
                    if (previousScroll - currentScroll > HEADER_THRESHOLD ||
                        currentScroll < headerMainTop
                    ) {
                        if (document.body.classList.contains('autoscroll')) return; // dont show header if autoscroll
                        previousScroll = currentScroll;
                        $header.removeClass('sticky-out');
                        if (currentScroll < headerMainTop * 2) {
                            $header.removeClass('sticky-in');
                        } else if (currentScroll > bottom) {
                            $header.addClass('sticky-in');
                        }
                    } else if (currentScroll - previousScroll > HEADER_THRESHOLD) {
                        previousScroll = currentScroll;
                        if (
                            currentScroll > bottom &&
                            $header.hasClass('sticky-in')
                        ) {
                            $header.removeClass('sticky-in');
                            $header.addClass('sticky-out');
                            $('.header__filters .filters__body').removeClass('active');
                        }
                        menuClose();
                    }
                    filtersFloat(currentScroll);
                }, 100));
            }
        }

        function filtersFloat (currentScroll) {
            if (isMobileFilter) return;

            $filters = $('#filterForm .filters');
            $filtersPlaceholder = $('.filters-placeholder');
            if ($filters.length) {
                const bottom = $filters[0].offsetTop + $filters[0].offsetHeight;
                if (currentScroll > bottom + 40) {
                    if ($filtersPlaceholder.length) {
                        $filtersPlaceholder.show();
                    } else {
                        $('<div class="filters-placeholder" style="height: ' + $('.filters')[0].offsetHeight + 'px" />').insertAfter($filters);
                    }
                    $('.header__filters').append($filters);

                    $inputs = $('.filters .filters__body');
                    if ($inputs.length) {
                        $('.header__filters').append($inputs);
                        if (!$('#filters-in-header').length) {
                            $('<form id="filters-in-header" />').insertAfter($('#filters-search-input'));
                            $('#filters-in-header').append($('#filters-search-input'))
                                .submit(function () {
                                    filter();
                                });
                            $('#filters-search-input').on('change', function (e) {
                                $('main input[name="keyword"]').val(e.target.value);
                            });
                        }
                    }
                }
            } else {
                $filters = $('.header__filters .filters');
                if ($filters.length && $filtersPlaceholder.length) {
                    const bottom = $filtersPlaceholder[0].offsetTop + $filtersPlaceholder[0].offsetHeight;
                    if (currentScroll < bottom - 40) {
                        $filters.insertAfter($filtersPlaceholder);
                        $filtersPlaceholder.hide();

                        $inputs = $('.header__filters .filters__body');
                        if ($inputs.length) {
                            $inputs.removeClass('active');
                            $filters.append($inputs);
                        }
                    }
                }
            }
        }

        $('.filters__open-button-header-button').on('click', () => $('.header__filters .filters__body').toggleClass('active'));

        function mobileFilterToggle () {
            isMobileFilter = false;
            const button = document.querySelector('.filters__open-button');
            if (!button) return;

            if (getComputedStyle(button).display !== 'none') { // mobile button shown
                isMobileFilter = true;
                $('.sidenav__filter-inputs').append($('.filters__body .filters__inputs'));
            } else {
                $('.filters__body').append($('.sidenav__filter-inputs .filters__inputs'));
                const sidenav = M.Sidenav.getInstance($('.sidenav-filter'));
                if (sidenav) sidenav.close();
            }
        }

        // HEADER ACCOUNT DROPDOWN
        const account = document.querySelectorAll('.header__account');
        if (account) M.Dropdown.init(account, { alignment: 'right' });

        // MENU
        const MENU_THRESHOLD_OPEN = 100; // ms
        const MENU_THRESHOLD_CHANGE = 300; // ms
        const $menu = $('.header__menu');
        const $menuItems = $('.header__menu-link');
        let menuOpenTimer;
        function clearTimer () {
            if (menuOpenTimer) clearTimeout(menuOpenTimer);
            menuOpenTimer = null;
        }
        function menuClickOutside (e) {
            const $inside = $(e.target).closest('.header__menu');
            if (!$inside.length) menuClose();
        }
        function menuOpen (e) {
            $menu.addClass('active');
            $menuItems.removeClass('active');
            const $target = $(e.target).closest('.header__menu-link');
            $target.addClass('active');
            $('body').on('click', menuClickOutside);
        }
        function menuClose () {
            clearTimer();
            menuOpenTimer = setTimeout(() => {
                $menu.removeClass('active');
                $menuItems.removeClass('active');
                $('body').off('click', menuClickOutside);
            }, MENU_THRESHOLD_OPEN);
        }
        if ($menu.length && $menuItems.length) {
            function click (e) {
                clearTimer();
                if (e.target.classList.contains('active')) {
                    menuClose();
                } else {
                    menuOpen(e);
                }
            }
            function move (e) {
                clearTimer();
                menuOpenTimer = setTimeout(() => menuOpen(e), menuOpenTimer ? MENU_THRESHOLD_CHANGE : MENU_THRESHOLD_OPEN);
            }
            $menuItems.on('click', click);
            $('.header__menu-link-handle').on('mousemove', move);
            $menu.on('mouseleave', menuClose);
            $('.header__menu-level1').on('mousemove', clearTimer);
        }

        // SIDENAV
        $('.sidenav__menu-back').on('click', function () {
            $('.sidenav__links').focus();
        });

        if (!$('.order').length) { // own errors in checkout
            // ERRORS
            function scrollToError(container = $('body')) {
                const $error = container.find('.error');
                // if ($error.length) $error[0].scrollIntoView({behavior: 'smooth', block: 'center'});
                if ($error.length) {
                    $('html, body').animate({
                        scrollTop: $error.offset().top - $(window).height() / 2
                    }, 200);
                }
            }
            setTimeout(scrollToError, 100); // wait display
        }

        // WHATS NEW
        function getHomeWhatsNews () {
            const $homeNews = $('#whatsnew-auctions');
            if (!$homeNews.length) return;

            $.get('/ajax/rest.action?actions=auctionedNewAdditions')
                .done(data => {
                    if (!checkResponse(data, false)) return data;

                    const $data = $('<div/>').html(data);
                    let auctions = $data.find('#auctionedNewAdditions').html();
                    if (auctions) auctions = auctions.trim();
                    if (!auctions) {
                        $('.whatsnew__tabs').hide();
                        $homeNews.hide().removeClass('active');
                        $('#whatsnew-buy').show().addClass('active');
                    }
                    $('#whatsnew-auctions .whatsnew__cards-scroll').html(auctions);
                    cardsHandlers();
                });

            $.get('/ajax/rest.action?actions=buyNowNewAdditions')
                .done(data => {
                    if (!checkResponse(data, false)) return data;

                    const $data = $('<div/>').html(data);
                    $('#whatsnew-buy .whatsnew__cards-scroll').html($data.find('#buyNowNewAdditions').html());
                    cardsHandlers();
                });
        }

        const whatsnewArrowLeft = document.querySelector('.whatsnew__cards-arrow--left');
        const whatsnewArrowRight = document.querySelector('.whatsnew__cards-arrow--right');
        if (whatsnewArrowLeft && whatsnewArrowRight) {
            let whatsnewScrolling;
            let whatsnewScrollingTimer;
            function onScroll () { // debounce while scrolling
                if (whatsnewScrollingTimer) clearTimeout(whatsnewScrollingTimer);
                whatsnewScrollingTimer = setTimeout(() => {
                    whatsnewScrolling.removeEventListener('scroll', onScroll);
                    whatsnewScrolling = null;
                }, 100);
            }
            function move (forward = true) {
                if (whatsnewScrolling) return;
                const cards = document.querySelector('.whatsnew__cards.active .whatsnew__cards-scroll');
                if (cards) {
                    if (!forward && cards.scrollLeft <= 0) return;
                    if (forward && cards.scrollLeft + cards.clientWidth >= cards.scrollWidth) return;
                    const card1 = cards.querySelector('.card');
                    const card2 = cards.querySelector('.card + .card');
                    if (card1 && card2) {
                        const card = card2.getBoundingClientRect().left - card1.getBoundingClientRect().left; // width from the first card left side to the second card left side
                        const cardsWidth = cards.clientWidth;
                        const cardsCount = Math.floor((cardsWidth + 16) / card);
                        const sign = forward ? 1 : -1;
                        cards.scrollLeft += sign * cardsCount * card;
                        whatsnewScrolling = cards;
                        cards.addEventListener('scroll', onScroll); // wait scroll end
                    }
                }
            }
            function left () {
                move(false);
            }
            whatsnewArrowLeft.addEventListener('click', left);
            whatsnewArrowRight.addEventListener('click', move);
        }

        // HOME TOP SELLING
        function getHomeTopselling () {
            const $homeTopselling = $('#home-topselling');
            if (!$homeTopselling.length) return;

            $.get('/ajax/rest.action?actions=recordSelling')
                .done(data => {
                    if (!checkResponse(data, false)) return data;

                    const $data = $('<div/>').html(data);
                    let html = $data.find('#recordSelling').html();
                    if (html) html = html.trim();
                    $homeTopselling .html(html);
                });
        }

        // CURRENCY DROPDOWN
        const currency = document.querySelectorAll('.card__price-i, .product__price-i');
        if (currency) M.Dropdown.init(currency, { container: document.body });

        // MARGIN DROPDOWN
        const margin = document.querySelectorAll('.margin-dropdown');
        if (margin) M.Dropdown.init(margin, { container: document.body });

        // SET ALERT DROPDOWN
        const setalert = document.querySelectorAll('.setalert-dropdown');
        if (setalert) M.Dropdown.init(setalert, { container: document.body });

        // CART

        if ($('.bag__item').length) {
            $('.bag-item-dec-trigger').on('click', function (e) {
                e.preventDefault();
                const id = $(this).closest('.bag__item').data('id');
                if (id) redirectPage('/shoppingCartDec.action?product=' + id);
            });

            $('.bag-item-inc-trigger').on('click', function (e) {
                e.preventDefault();
                const id = $(this).closest('.bag__item').data('id');
                if (id) redirectPage('/shoppingCartInc.action?product=' + id);
            });

            $('.bag-item-remove-trigger').on('click', function (e) {
                e.preventDefault();
                const id = $(this).closest('.bag__item').data('id');
                if (id) redirectPage('/shoppingCartRemove.action?product=' + id);
            });
        }

        // SELL
        if ($('.sell-from').length) {
            const $valuationFormNext = $('.sell__valuation-form-next-button');
            if ($valuationFormNext.length) {
                function valuationFormNextClick () {
                    $('.sell__valuation-form-thank').hide();
                    $('.sell__valuation-form-container').show();
                }
                $valuationFormNext.on('click', valuationFormNextClick);
                trackEvent('SellForm');
            }

            $droppable = $('.droppable');
            if ($droppable.length) {
                $files = $('#files');

                function renderPreview(file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        the_url = e.target.result;
                        $preview = $('<div class="files-preview__item" style="background-image:url(' + the_url + ')" title="' + file.name + '"/>');
                        $('.files-preview').append($preview);
                    }
                    reader.readAsDataURL(file);
                }

                function renderPreviews(files) {
                    $('.files-preview').html('');
                    if (files && files.length) {
                        const filesArray = Array.prototype.slice.call(files);
                        filesArray.forEach(file => {
                            renderPreview(file);
                        });
                    }
                }

                $droppable.on('dragover dragenter', function(e) {
                    e.preventDefault();
                    this.classList.add('drop');
                });

                $droppable.on('dragleave dragend drop', function(e) {
                    this.classList.remove('drop');
                });

                $droppable.on('drop', function(e) {
                    e.preventDefault();
                    const dt = (e.originalEvent.target.files && e.originalEvent.target.files.length > 0) ||
                        (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files);
                    $files[0].files = dt;
                    setTimeout(() => renderPreviews(dt));
                });

                $files.on('change', function() {
                    renderPreviews(this.files);
                });
            }

            const algoliaFilters = new AlgoliaFilters();
            function initializeAutocomplete() {
                const moviesAutocomplete = M.Autocomplete.init($('#moviesAutocomplete'), {
                    data: {},
                    addCustom: ' ',
                    onAutocomplete: function (val) {
                        if (val.substr(0, 9) === 'addcustom') {
                            $('input[name="movieName"]').val(val.substr(9));
                            $('input[name="movieId"]').val(0);
                            $('#moviesAutocomplete').val(val.substr(9));
                        } else {
                            $('input[name="movieName"]').val(val);
                            $('input[name="movieId"]').val(null);
                        }
                    },
                    sortFunction: compareString
                });

                function clearAutocomplete() {
                    Object.keys(moviesAutocomplete[0].options.data).forEach(key => delete moviesAutocomplete[0].options.data[key]);
                }

                function fetchAutocomplete(value = '', isInit) {
                    algoliaFilters.algoliaindex.searchForFacetValues('movieName', value, {
                        filters: algoliaFilters.filtersString('movieName')
                    }).then(({ facetHits }) => {
                        if (!isInit && value.length > 1 ||
                            facetHits.length < 100
                        ) {
                            facetHits.forEach(hit => moviesAutocomplete[0].options.data[hit.value] = hit.value);
                            if (!isInit) setTimeout(() => moviesAutocomplete[0].open(), 200);
                        } else {
                            moviesAutocomplete[0].close();
                        }
                    });
                }

                $('#moviesAutocomplete').on('keyup', function (e) {
                    if (!e || !e.target) return;

                    if (e.target.dataset.val !== e.target.value || !e.target.value) {
                        e.target.dataset.val = e.target.value;
                        clearAutocomplete();
                        fetchAutocomplete(e.target.value);
                    }
                });
            }
            initializeAutocomplete();

            $('#sellRequestSubmit').submit(function (e) {
                $('.loader-block').show();
            });
        }

        // GUIDE STEPS

        const $sellStepButtons = $('.sell__step-button');
        const $sellSteps = $('.sell__step');
        if ($sellStepButtons.length && $sellSteps.length) {
            function sellStepButtonClick () {
                if (this.dataset && this.dataset.step) {
                    const step = this.dataset.step;
                    $sellSteps.hide();
                    const $stepActive = $('#sell__step-' + step);
                    if ($stepActive.length) {
                        $stepActive.show();
                        if (this.classList.contains('sell__step-button--next')) { // bottom buttons -> scroll up to the step top
                            $('body').addClass('autoscroll');
                            $stepActive[0].scrollIntoView ({behavior: 'smooth', block: 'nearest'});
                            setTimeout(() => {
                                $('body').removeClass('autoscroll');
                            }, 500);
                        }
                    }
                    $sellStepButtons.each((index, button) => {
                        if (button.dataset && button.dataset.step && button.dataset.step <= step) {
                            $(button).addClass('filled');
                        } else {
                            $(button).removeClass('filled');
                        }
                    });
                }
            }
            $sellStepButtons.on('click', sellStepButtonClick);

            const hash = window.location.hash;
            if (hash && hash.includes('#guide-1') &&
                $('#dropdown-account').length) { // signedIn
                $sellStepButtons.eq(1).trigger('click');
            }
        }

        // RELATED
        const $relatedMoviesScroll = $('.related-movies__scroll');
        if ($relatedMoviesScroll.length) {
            const scrollWidth = $relatedMoviesScroll.outerWidth();
            const listWidth = $relatedMoviesScroll[0].scrollWidth;
            if (scrollWidth < listWidth) {
                const isTouch = is_touch_device();
                $relatedMoviesScroll.addClass('arrow-right');
                if (!isTouch) $relatedMoviesScroll.addClass('arrow-left');
                const cardWidth = listWidth / $('.related-movies__item').length;
                const moveWidth = Math.floor(scrollWidth / cardWidth - 1) * cardWidth;
                const SCROLL_THRESHOLD = 50;
                let curScroll = 0;
                let relatedScrolling;
                let relatedScrollingTimer;
                $relatedMoviesScroll.prepend($('.related-movies__item').clone()); // duplicate for infinite
                $relatedMoviesScroll.prepend($('.related-movies__item').clone()); // duplicate for infinite

                function scrollCycle (sign = 1) {
                    let scroll = $relatedMoviesScroll[0].scrollLeft + sign * listWidth;
                    $relatedMoviesScroll[0].style.scrollBehavior = 'unset';
                    $relatedMoviesScroll[0].scrollLeft = scroll;
                    requestAnimationFrame(()=>$relatedMoviesScroll[0].style.scrollBehavior = 'smooth');
                    return scroll;
                }

                setTimeout(()=>{
                    $relatedMoviesScroll.on('scroll', function () {
                        if (relatedScrollingTimer) clearTimeout(relatedScrollingTimer);
                        relatedScrollingTimer = setTimeout(() => { // debounce while scrolling
                            relatedScrolling = null;
                            if (isTouch) return;

                            let scroll = $(this).scrollLeft();
                            if (scroll - curScroll > SCROLL_THRESHOLD) { // right
                                if (scroll > listWidth + scrollWidth) scroll = scrollCycle(-1);
                                curScroll = scroll;
                            } else if (curScroll - scroll > SCROLL_THRESHOLD) { // left
                                if (scroll < listWidth - scrollWidth) scroll = scrollCycle(1);
                                curScroll = scroll;
                            }
                        }, 200);
                    });
                    if (!isTouch) curScroll = scrollCycle(1);
                }, 1000);

                function move (sign = 1) {
                    if (relatedScrolling) return;
                    relatedScrolling = true;
                    $relatedMoviesScroll[0].scrollLeft += sign * moveWidth;
                }

                $('.related-movies__arrow--left').on('click', () => move(-1));
                $('.related-movies__arrow--right').on('click', () => move(1));
            }
        }

        // PRODUCTS
        if ($('.filters__inputs').length) {
            let params = new URLSearchParams(window.location.search);
            let scroll = parseInt(params.get('scroll'));
            if (scroll) $('html').scrollTop(scroll);

            const algoliaFilters = new AlgoliaFilters();

            if ($('#filterForm').find('#auction').val() != $('#filterForm').find('#buyNow').val()) {
                algoliaFilters.addFilterForFacets('auctioned', $('#filterForm').find('#auction').val() > 0); }
            if ($('#filterForm').find('#archive').val() != 1) algoliaFilters.addFilterForFacets('inArchive', $('#filterForm').find('#archive').val() > 1); // 0 = false, 1 = any, 2 = true
            if ($('#categoryName').val()) algoliaFilters.addFilterForFacets('categories', $('#categoryName').val());
            if ($('#movieName').val()) algoliaFilters.addFilterForFacets('movieName', $('#movieName').val());
            if ($('#auctionName').val()) algoliaFilters.addFilterForFacets('auctionName', $('#auctionName').val());
            if ($('#officeName').val()) algoliaFilters.addFilterForFacets('office', $('#officeName').val());

            function clearFilters() {
                $('.input-field__clean').click();
                $('input[type="search"]').val('');
            }

            let filterTimeout;

            function filterNow() {
                let $filters = $('#filterForm .filters');
                if (!$filters.length) $filters = $('.filters-placeholder');
                let scroll = $filters.offset().top;
                if ($(window).scrollTop() < scroll) scroll = $(window).scrollTop();
                if (scroll) $('#filterForm').find('#scroll').val(Math.round(scroll));
                
                filtersFloat(0);
                $('#itemsOffset').val('');
                $('#filterForm').submit();
            }

            function filter() {
                if (filterTimeout) clearTimeout(filterTimeout);

                filterTimeout = setTimeout(function () {
                    if (!isMobileFilter) {
                        filterNow();
                    }
                }, 100);
            }

            algoliaFilters.algoliaindex.searchForFacetValues('categories', '', {
                query: $('#filters-search-input').val(),
                filters: algoliaFilters.filtersString('categories')
            }).then(({ facetHits }) => {
                const facetsMap = facetHits.reduce((facets, facet) => {
                    facets[facet.value] = facet;
                    return facets;
                }, {});
                $('#categoryId option').each(function (key, option) {
                    const facet = facetsMap[$(option).text()];
                    if (facet) {
                        $(option).html($(option).html() + ' (' + facet.count + ')');
                    } else if (option.selected) {
                        let text = $(option).html();
                        if ($(option).val() > 0) text += ' (0)';
                        $(option).html(text);
                    } else if ($(option).val() > 0) {
                        $(option).remove();
                    }
                });
                $('#categoryId').formSelect();
            });

            function initializeAutocomplete() {
                const moviesAutocomplete = M.Autocomplete.init($('#moviesAutocomplete'), {
                    data: {},
                    onAutocomplete: function (movieName) {
                        $('#movieName').val(movieName);
                        filter();
                    },
                    sortFunction: compareString
                });

                function clearAutocomplete() {
                    Object.keys(moviesAutocomplete[0].options.data).forEach(key => delete moviesAutocomplete[0].options.data[key]);
                }

                function fetchAutocomplete(value = '', isInit) {
                    let open = isInit ? ()=>{} : ()=>setTimeout(() => moviesAutocomplete[0].open(), 200);
                    if (value) {
                        algoliaFilters.algoliaindex.searchForFacetValues('movieName', value, {
                            query: $('#filters-search-input').val(),
                            filters: algoliaFilters.filtersString('movieName')
                        }).then(({ facetHits }) => {
                            facetHits.forEach(hit => moviesAutocomplete[0].options.data[hit.value+ ' (' + hit.count + ')'] = hit.value);
                            open();
                        });
                    } else {
                        algoliaFilters.algoliaindex.search('', {
                            query: $('#filters-search-input').val(),
                            facets: ['movieName'],
                            filters: algoliaFilters.filtersString('movieName')
                        }).then(({ facets }) => {
                            for (let i in facets.movieName) {
                                moviesAutocomplete[0].options.data[i + ' (' + facets.movieName[i] + ')'] = i;
                                open();
                            }
                        });
                    }
                }

                $('#moviesAutocomplete').on('keyup', function (e) {
                    if (!e || !e.target) return;

                    if (e.target.dataset.val !== e.target.value || !e.target.value) {
                        e.target.dataset.val = e.target.value;
                        clearAutocomplete();
                        fetchAutocomplete(e.target.value);
                    }
                });

                fetchAutocomplete('', true);
            }
            initializeAutocomplete();

            function initializeAuctionsAutocomplete() {
                const auctionAutocomplete = M.Autocomplete.init($('#auctionIdAutocomplete'), {
                    data: {},
                    onAutocomplete: function (val) {
                        $('#auctionName').val(val);
                        filter();
                    },
                    sortFunction: compareString
                });

                algoliaFilters.algoliaindex.search('', {
                    query: $('#filters-search-input').val(),
                    facets: ['auctionName'],
                    filters: algoliaFilters.filtersString('auctionName')
                }).then(({ facets }) => {
                    for (let i in facets.auctionName) {
                        auctionAutocomplete[0].options.data[i + ' (' + facets.auctionName[i] + ')'] = i;
                    }
                });
            }
            initializeAuctionsAutocomplete();

            algoliaFilters.algoliaindex.searchForFacetValues('office', '', {
                query: $('#filters-search-input').val(),
                filters: algoliaFilters.filtersString('office')
            }).then(({ facetHits }) => {
                const facetsMap = facetHits.reduce((facets, facet) => {
                    facets[facet.value] = facet;
                    return facets;
                }, {});
                $('#office option').each(function (key, option) {
                    const facet = facetsMap[$(option).text()];
                    if (facet) {
                        $(option).html($(option).html() + ' (' + facet.count + ')');
                    } else if (option.selected) {
                        let text = $(option).html();
                        if ($(option).val() > 0) text += ' (0)';
                        $(option).html(text);
                    } else if ($(option).val() > 0) {
                        $(option).remove();
                    }
                });
                $('#office').formSelect();
            });

            function countEnabledFilters() {
                setTimeout(function () { // wait inputs
                    const $counter = $('.filters__enabled');
                    if ($counter.length) {
                        const $enabled = $('.filters__inputs .input-field--filled');
                        if ($enabled.length) {
                            $counter.text($enabled.length).show();
                        } else {
                            $counter.text(0).hide();
                        }
                    }
                }, 100);
            }
            countEnabledFilters();

            $('#categoryId').on('change', function () {
                filter();
            });

            $('#office').on('change', function () {
                filter();
            });

            $('#sortTypeList').on('change', function () {
                filter();
            });

            $('#moviesAutocompleteDiv .input-field__clean').on('click', function () {
                $('#moviesAutocomplete').val('');
                if ($('#movieName').val()) {
                    $('#movieName').val(null);
                    filter();
                }
            });

            $('#clearFilters').on('click', function () {
                clearFilters();
            });

            $('#clearAndSearch').on('click', function () {
                clearFilters();
                $('#filterForm').submit();
            });

            $('#auctionIdAutocompleteDiv .input-field__clean').on('click', function () {
                $('#auctionIdAutocomplete').val('');
                if ($('#auctionName').val()) {
                    $('#auctionName').val(null);
                    filter();
                }
            });

            const $autocomplete = $('.sidenav__filter-inputs input.autocomplete');
            $autocomplete.on('focus', function () {
                setTimeout(() => { // wait virtual keyboard
                    if (document.activeElement === this) {
                        this.scrollIntoView();
                    }
                }, 300);
            });

            $tabs = $('.filters__tab');
            if ($tabs.length) {
                $tabs.on('click', function (e) {
                    e.preventDefault();
                    if ($(this).attr('data-archive')) {
                        $('#filterForm').find('#archive').val($(this).data('archive'));
                    } else {
                        if ($(this).attr('data-auction')) {
                            $('#filterForm').find('#auction').val($(this).data('auction'));
                        } else if ($(this).attr('data-buynow')) {
                            $('#filterForm').find('#buyNow').val($(this).data('buynow'));
                        }
                    }
                    filterNow();
                });
            }

            $('#sidenav-filters-search-input').on('change', function (e) {
                $('main input[name="keyword"]').val(e.target.value);
            });

            if ($('.filters__found-plus').length) {
                setTimeout(() => { // wait header ajax
                    const $formClone = $('#filterForm').clone();
                    const $formCloneAuction = $formClone.find('#auction');
                    const $formCloneBuyNow = $formClone.find('#buyNow');
                    const $formCloneArchive = $formClone.find('#archive');
                    if ($formCloneAuction.val() < 1 || $formCloneBuyNow.val() < 1 || $formCloneArchive.val() < 1) {
                        $formCloneAuction.val(1);
                        $formCloneBuyNow.val(1);
                        $formCloneArchive.val(1);
                        const more = [];
                        $('.filters__tab:not(.active)').each(function() {
                            more.push($(this).text());
                        });
                        if (more.length) {
                            $('.filters__found-in').text('in ' + more.join(' & '));
                        }
                    } else {
                        return; // all showed
                    }

                    $.get('/ajax/count.action?' + $formClone.serialize(), function (data) {
                        if (!checkResponse(data, false)) return data;

                        data = Number(data.trim());
                        if (data > 0) data -= $('#productsCount').val();
                        if (data > 0) {
                            const dataCommas = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            $('.filters__found-plus').text('+' + dataCommas);
                            $('.filters__found-all-inner').show();

                            $('.filters__found-all a').on('click', function () {
                                redirectPage($formClone[0].action + '?' + $formClone.serialize());
                            });
                        }
                    });
                }, 100);
            }

            $('#filterForm').submit(function () {
                $('.loader-block').show();
            });
        }

        function addProductGallery() {
            const $productItems = $('.product__slider .carousel-item');
            const $productThumbnails = $('.product__thumbnail');
            if ($productItems.length && $productThumbnails.length) {
                let productSlider;
                function productCarousel () {
                    if (productSlider && productSlider[0]) productSlider[0].destroy();
                    productSlider = M.Carousel.init(document.querySelectorAll('.product__slider'), {
                        onCycleTo: function(item, dragged) {
                            const index = $productItems.index(item);
                            const $thumbnail = $productThumbnails.eq(index);
                            $productThumbnails.removeClass('active');
                            $thumbnail.addClass('active');
                        },
                        onDestroy: function() {
                            $productThumbnails.off('mousemove', onClickProductThumbnail);
                        },
                    });
                    function onClickProductThumbnail (e) {
                        const index = $productThumbnails.index(e.target);
                        productSlider[0].set(index);
                    }
                    $productThumbnails.on('mousemove', onClickProductThumbnail);
                }
                productCarousel();
                $(window).on('resize', productCarousel);
            }
            let modalGallery;
            let modalSlider;
            let modalSliderIndex;
            let zoomViewer;
            const slide = (prev = false) => {
                if (prev) {
                    if (zoomViewer && zoomViewer.isShown) zoomViewer.prev(true);
                    if (modalSlider && modalSlider[0]) modalSlider[0].prev();
                } else {
                    if (zoomViewer && zoomViewer.isShown) zoomViewer.next(true);
                    if (modalSlider && modalSlider[0]) modalSlider[0].next();
                }
            }
            function modalCarouselKeydown ({ key }) {
                const callback = {
                    'ArrowLeft': () => slide(true),
                    'ArrowRight': () => slide(false),
                }[key];
                callback?.();
            }
            function modalCarousel () {
                if (modalSlider && modalSlider[0]) modalSlider[0].destroy();
                modalSlider = M.Carousel.init($('#modal-product-gallery').find('.modal-gallery__carousel'), {
                    fullWidth: true,
                    indicators: true,
                    onCycleTo: (item, dragged) => {
                        modalSliderIndex = $('#modal-product-gallery .carousel-item').index(item);
                    },
                });

                if (!$('.zoom-viewer').length) {
                    $('#modal-product-gallery .carousel-item').each((index, item) => {
                        const url = item.style.backgroundImage.slice(4, -1).replace(/["']/g, '');
                        $('#zoom-viewer-images').append('<img src="' + url + '" class="zoom-viewer"/>');
                    });
                }

                if ($('.zoom-viewer').length) {
                    if (zoomViewer) {
                        zoomViewer.destroy();
                        $('.zoom-viewer__toggler').remove();
                    }
                    zoomViewer = new Viewer($('#zoom-viewer-images')[0], {
                        navbar: false,
                        title: false,
                        toolbar: false,
                        zoomRatio: .5,
                        maxZoomRatio: 2,
                        keyboard: false,
                        viewed() {
                            zoomViewer.zoomTo(1.5);
                            if (!$('.viewer-button--close-modal').length) {
                                $('.viewer-close').append('<div class="zoom-viewer__toggler-label">Use scroll wheel to&nbsp;control zoom</div>');
                                $('.viewer-container').append('<div class="viewer-button viewer-button--close-modal">', '<div class="arrows"><div class="arrow arrow--prev"></div><div class="arrow arrow--next"></div></div>');
                                $('.viewer-button--close-modal').on('click', ()=>{
                                    if (zoomViewer) zoomViewer.destroy();
                                    if (modalGallery && modalGallery[0]) modalGallery[0].close();
                                });
                                $('.viewer-container .arrow--prev').on('click', ()=>slide(true));
                                $('.viewer-container .arrow--next').on('click', ()=>slide(false));
                            }
                        },
                    });
                    $('#modal-product-gallery').append('<div class="zoom-viewer__toggler">');
                    $('.zoom-viewer__toggler').append('<div class="zoom-viewer__toggler-label">Click To&nbsp;Zoom</div>');
                    $('.zoom-viewer__toggler').on('click', ()=>{
                        zoomViewer.view(modalSliderIndex);
                    });
                }
            }
            modalGallery = M.Modal.init(document.querySelectorAll('#modal-product-gallery'), {
                opacity: .75,
                onCloseStart: (el) => {
                    if (modalSlider && modalSlider[0]) modalSlider[0].destroy();
                    $(window).off('resize', modalCarousel);
                    document.removeEventListener('keydown', modalCarouselKeydown);
                },
                onOpenEnd: (el, trigger) => {
                    modalCarousel();
                    $(window).on('resize', modalCarousel);
                    const $productGallery = $(trigger).closest('.product__gallery');
                    if ($productGallery.length) {
                        const timer = document.body.classList.contains('touch') ? 300 : 0; // on touch wait for active
                        setTimeout(() => {
                            const $active = $productGallery.find('.carousel-item.active');
                            const index = $productItems.index($active);
                            modalSlider[0].set(index);
                        }, timer);
                    }
                    document.addEventListener('keydown', modalCarouselKeydown);
                }
            });
        }

        // PRODUCT
        if ($('.product').length) {
            addProductGallery();

            $('.product__add').on('click', function (e) {
                e.preventDefault();
                $.get(this.href)
                    .done(data => {
                        reloadPage();
                    });
            });

            $('#modal-payment-plan').modal({ // load form on modal open
                onOpenStart: function (el) {
                    el.classList.add('sync');
                    const $form = $(el).find('.modal-payment-plan-form');
                    $.get($form.attr('action'))
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            $form.html(data);
                            M.updateTextFields();
                            $($('.modal-payment-plan__months-buttons input:checked').data('tab')).show();

                            $('.modal-payment-plan__months-buttons input').on('change', function () {
                                $('.modal-payment-plan__tab').hide();
                                $($(this).data('tab')).show();
                            });

                            $('.modal-payment-plan-form').submit(function (e) {
                                e.preventDefault();
                                this.classList.add('sync');
                                $.get(
                                    '/ajax/addProduct.action?' + $(this).serialize(),
                                )
                                    .done(data => {
                                        reloadPage(); // change added button, update bag count
                                    })
                                    .fail(data => {
                                        if (data && data.statusText) this.innerHTML = data.statusText;
                                    })
                                    .always(data => {
                                        this.classList.remove('sync');
                                    });
                            });
                        })
                        .fail(data => {
                            if (data && data.statusText) $form.html(data.statusText);
                        })
                        .always(data => {
                            el.classList.remove('sync');
                        });
                }
            });

            $('.product__heart').on('click', function (e) {
                e.preventDefault();
                if (this.classList.contains('modal-trigger')) return; // signin modal

                const $heart = $(this);
                const $product = $(this).closest('.product');
                if (!$product.length) return;

                const productId = $product[0].getAttribute('data-id');
                if ($heart.hasClass('active')) {
                    $.get('/ajax/removeFromFavorites.action?product=' + productId)
                        .done(data => {
                            $heart.removeClass('active');
                        });
                } else {
                    $.get('/ajax/addToFavorites.action?product=' + productId)
                        .done(data => {
                            $heart.addClass('active');
                        });
                }
            });

            // GET EMAIL NOTICES WHEN WE HAVE NEW ITEMS FROM THIS TITLE
            $('#product-movie-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        $('.loader-block').hide();
                        M.Toast.dismissAll();
                        const toast = `<span>Movie added&nbsp; <a href="/emailNotifications.action" class="h6">Open Email Notifications</a></span>`;
                        setTimeout(() => M.toast({html: toast}), 100);
                    })
                    .fail(data => {
                        redirectPage($('#product-movie-button')[0].href);
                    });
            });
            $('#product-movie-button').on('click', function (e) {
                e.preventDefault();
                $('#product-movie-form').submit();
            });
        }

        //MODAL ASK PRIVATE SALE
        if ($('#modal-private-sales').length) {
            $('#modal-private-sales').modal({ // load form on modal open
                onOpenStart: function (el) {
                    el.classList.add('sync');
                    const $form = $('#modal-private-sales-form');
                    $.get($form.attr('action'))
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            $form.html(data);
                            M.updateTextFields();
                            grecaptchaRender('g-recaptcha-private-sales');
                        })
                        .fail(data => {
                            if (data && data.statusText) $form.html(data.statusText);
                        })
                        .always(data => {
                            el.classList.remove('sync');
                        });
                },
            });

            $('#modal-private-sales-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    '/ajax/requestSubmit.action',
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        this.innerHTML = data;
                        M.updateTextFields();
                        grecaptchaRender('g-recaptcha-private-sales');
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    })
                    .always(() => {
                        $('.loader-block').hide();
                    }) ;
            });
        }

        // MODAL SHIPPING QUOTE
        if ($('#modal-shipping-quote').length) {
            $('#modal-shipping-quote').modal({ // load form on modal open
                onOpenStart: function (el, trigger) {
                    el.classList.add('sync');
                    const $form = $(el).find('.modal-shipping-quote-form');
                    const contentURL = $(trigger).data('form-content-url');
                    $.get(contentURL)
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            $form.html(data);
                            M.updateTextFields();
                            $('#modal-shipping-quote-country').formSelect({dropdownOptions: {container: document.body}});
                            grecaptchaRender('g-recaptcha-quote');
                        })
                        .fail(data => {
                            if (data && data.statusText) $form.html(data.statusText);
                        })
                        .always(data => {
                            el.classList.remove('sync');
                        });
                }
            });

            $('.modal-shipping-quote-form').submit(function (e) {
                e.preventDefault();
                this.classList.add('sync');
                let data = $(this).serialize();
                if (e.originalEvent.submitter && e.originalEvent.submitter.name === 'question') {
                    data += '&question=1';
                }
                $.post(
                    this.action,
                    data,
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        this.innerHTML = data;
                        M.updateTextFields();
                        $('select').formSelect({dropdownOptions: {container: document.body}});
                        grecaptchaRender('g-recaptcha-quote');
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    })
                    .always(data => {
                        this.classList.remove('sync');
                    });
            });
        }

        //MODAL OFFER
        if ($('#modal-offer').length) {
            const $form = $('#modal-offer-form');
            function formHandler (data) {
                $form.html(data);
                M.updateTextFields();
                grecaptchaRender('g-recaptcha-offer');
                offerPremium();
                $form.find('#offer').on('keyup', offerPremium);
            }
            function offerPremium () {
                const offer = +$form.find('#offer').val() || 0;
                $form.find('#offerPremium').val(offer * 1.25);
            }

            $('#modal-offer').modal({ // load form on modal open
                onOpenStart: function (el, trigger) {
                    el.classList.add('sync');

                    const url = trigger && trigger.dataset && trigger.dataset.url;
                    if (url) $.get(url)
                        .done(data => {
                            if (!checkResponse(data)) return data;
                            formHandler(data);
                        })
                        .fail(data => {
                            if (data && data.statusText) $form.html(data.statusText);
                        })
                        .always(data => {
                            el.classList.remove('sync');
                        });
                },
            });

            $('#modal-offer-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;
                        formHandler(data);
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    })
                    .always(() => {
                        $('.loader-block').hide();
                    }) ;
            });
        }

        // PROFILE
        if ($('#userProfileSubmit').length) {
            $('#userProfileSubmit').submit(function (e) {
                $('.loader-block').show();
            });

            //billingAsShipping
            const $shippingAddressCheckbox = $('#userProfileSubmit input[name="billingAsShipping"]');
            if ($shippingAddressCheckbox.length) {
                function accountBillingAddress() {
                    const $form = $('.account-billing-address-form');
                    $shippingAddressCheckbox[0].checked ? $form.hide() : $form.show();
                }

                $shippingAddressCheckbox.on('change', accountBillingAddress);
                accountBillingAddress();
            }

            // BILLING ADDRESS STATE
            const $billingCountry = $('select[name="billingAddress.countryId"]');
            if ($billingCountry.length) {
                const $billingStateInput = $('.billing-address-state__input input');
                const $billingStateInputDiv = $('.billing-address-state__input');
                const $billingStateSelect = $('.billing-address-state__select select');
                const $billingStateSelectDiv = $('.billing-address-state__select');

                function isBillingStateSelect() {
                    if ($billingCountry.val() == 2) { // USA
                        $billingStateSelectDiv.show();
                        $billingStateSelect.attr('name', 'billingAddress.state');
                        $billingStateInputDiv.hide();
                        $billingStateInput.attr('name', 'billingAddress.state.tmp');
                    } else {
                        $billingStateSelectDiv.hide();
                        $billingStateSelect.attr('name', 'billingAddress.state.tmp');
                        $billingStateInputDiv.show();
                        $billingStateInput.attr('name', 'billingAddress.state');
                    }
                }
                $billingCountry.on('change', isBillingStateSelect);
                isBillingStateSelect();
            }

            // SHIPPING ADDRESS STATE
            const $shippingCountry = $('select[name="shippingAddress.countryId"]');
            if ($shippingCountry.length) {
                const $shippingStateInput = $('.shipping-address-state__input input');
                const $shippingStateInputDiv = $('.shipping-address-state__input');
                const $shippingStateSelect = $('.shipping-address-state__select select');
                const $shippingStateSelectDiv = $('.shipping-address-state__select');

                function isShippingStateSelect() {
                    if ($shippingCountry.val() == 2) { // USA
                        $shippingStateSelectDiv.show();
                        $shippingStateSelect.attr('name', 'shippingAddress.state');
                        $shippingStateInputDiv.hide();
                        $shippingStateInput.attr('name', 'shippingAddress.state.tmp');
                    } else {
                        $shippingStateSelectDiv.hide();
                        $shippingStateSelect.attr('name', 'shippingAddress.state.tmp');
                        $shippingStateInputDiv.show();
                        $shippingStateInput.attr('name', 'shippingAddress.state');
                    }
                }
                $shippingCountry.on('change', isShippingStateSelect);
                isShippingStateSelect();
            }

            // REGISTERED BUSINESS
            const $businessCheckbox = $('#userProfileSubmit_business');
            if ($businessCheckbox.length) {
                function isRegisteredBusiness() {
                    const $form = $('.business-form');
                    if ($businessCheckbox[0].checked) {
                        $form.show();
                    } else {
                        $form.hide();
                        $('#userProfileSubmit_businessNumber').val('');
                    }
                }

                $businessCheckbox.on('change', isRegisteredBusiness);
                isRegisteredBusiness();
            }
        }

        // FAVORITES
        if ($('.account__favorites').length) {
            const algoliaFilters = new AlgoliaFilters();
            function initializeAutocomplete() {
                const moviesAutocomplete = M.Autocomplete.init($('#moviesAutocomplete'), {
                    data: {},
                    addCustom: 'Add',
                    onAutocomplete: function (val) {
                        if (val.substr(0, 9) == 'addcustom') {
                            $('input[name="movieName"]').val(val.substr(9));
                            $('#moviesAutocomplete').val('');
                        } else {
                            $('input[name="movieName"]').val(val);
                        }
                        $('#form-movie').submit();
                    },
                    sortFunction: compareString
                });

                function clearAutocomplete() {
                    Object.keys(moviesAutocomplete[0].options.data).forEach(key => delete moviesAutocomplete[0].options.data[key]);
                }

                function fetchAutocomplete(value = '', isInit) {
                    algoliaFilters.algoliaindex.searchForFacetValues('movieName', value, {
                        filters: algoliaFilters.filtersString('movieName')
                    }).then(({ facetHits }) => {
                        if (!isInit && value.length > 1 ||
                            facetHits.length < 100
                        ) {
                            facetHits.forEach(hit => moviesAutocomplete[0].options.data[hit.value] = hit.value);
                            if (!isInit) setTimeout(() => moviesAutocomplete[0].open(), 200);
                        } else {
                            moviesAutocomplete[0].close();
                        }
                    });
                }

                $('#moviesAutocomplete').on('keyup', function (e) {
                    if (!e || !e.target) return;

                    if (e.target.dataset.val !== e.target.value || !e.target.value) {
                        e.target.dataset.val = e.target.value;
                        clearAutocomplete();
                        fetchAutocomplete(e.target.value);
                    }
                });
            }
            initializeAutocomplete();

            $('#genreId').on('change', function () {
                $('#form-genre').submit();
            });

            $('#form-movie').submit(function (e) {
                const val = $('#moviesAutocomplete').val();
                if (val) {
                    $('input[name="movieName"]').val(val);
                }
                $('.loader-block').show();
            });

            $('#form-genre').submit(function () {
                $('.loader-block').show();
            });

            $('[name="toggleCategory"]').on('change', function (e) {
                const movieLinkId = $(this).data().movieLinkId;
                const categoryId = $(this).data().categoryId;
                const toast = $(this).prop('checked') ? 'Category added' : 'Category removed';

                $.post('/ajax/accountFavoritesToggleMovieCategory.action', {
                    movieLinkId: movieLinkId,
                    categoryId: categoryId
                }, function (data) {
                    M.Toast.dismissAll();
                    setTimeout(() => M.toast({html: toast}), 300);
                })
            });

            $('.account__favorites-item-delete a').on('click', function () {
                $('.loader-block').show();
            });
        }

        // ACCOUNT PURCHASED
        if ($('#purchasedFilterForm').length) {
            function filter() {
                $('#purchasedFilterForm').submit();
            }
            $('#type').on('change', filter);
            $('#categoryId').on('change', filter);
            $('#movieId').on('change', filter);
            $('#sortTypeList').on('change', filter);

            $('#purchasedFilterForm').submit(function () {
                $('.loader-block').show();
            });
        }

        // ACCOUNT EMAIL PREFERENCES
        if ($('#form-email-preferences').length) {
            $('#form-email-preferences input').on('change', function () {
                $('#form-email-preferences').submit();
            });

            $('#form-email-preferences').submit(function () {
                $('.loader-block').show();
            });
        }

        // BLOG
        $('.card-blog').on('click', function(event) {
            const fakeUrl = $(event.target).data('href');
            if (fakeUrl) {
                event.preventDefault();
                redirectPage(fakeUrl);
            }
        });
        if ($('.wp.blog').length || $('.wp.archive').length || $('.wp.search').length) {
            $('.filters__select-category select').on('change', function(event) {
                redirectPage(event.target.value);
            });
        }

        // FAQ
        if ($('.wp .faq').length) {

            function scrollToElement(elem) {
                if (window.location.hash) {
                    setTimeout(function () {
                        $('html, body').animate({
                            scrollTop: $(elem).offset().top - 50
                        }, 2000);
                    }, 1000);
                    setTimeout(function () {
                        $('.faq__collapsible li.active .collapsible-header').click();
                        $(elem).parent().click();
                        $(elem).parent().parent().addClass('active');
                    }, 1300);
                }
            }

            if (!location.hash.includes('/')) {
                scrollToElement($(location.hash));
            }

            function changeCategory (category) {
                if (category == 0) {
                    $('.faq__item').show();
                } else {
                    $('.faq__item:not(.category-' + category + ')').hide();
                    $('.category-' + category).show();
                }
            }

            $('.filters__menu-category').on('click', function(event) {
                $('.filters__menu-category').removeClass('active');
                $(this).addClass('active');
                $('.faq__collapsible li.active .collapsible-header').click();
                $('.filters__select-category select').val($(this).data('category'));
                changeCategory($(this).data('category'));
            });

            $('.filters__select-category select').on('change', function(event) {
                changeCategory($(this).val());
            });

            try {
                function highlight() {
                    var searchValue = $('.input-field--faq-search input').val();

                    //escape all regex symbols
                    searchValue = searchValue.replace(/[\$\&\+\,\:\:\=\?\@\#\|\/\'\{\}\[\]\>\<\.\^\*\(\)\%\!\-]/g, '\\$&');
                    //search
                    searchValue = searchValue.replace(/[^a-z0-9_\S]/gi, '\\$&');

                    var customFilter = new RegExp(searchValue, 'gi');

                    var replacedString = "<span class='faq__highlight'>$&</span>";

                    $('.faq__content').find('.faq__highlight').contents().unwrap();
                    $('.faq__collapsible-header-text').each(function() {
                        if(searchValue.length > 1) {
                            const textContent = $(this).text();
                            const htmlContent = $(this).html();

                            var textPart =  '';
                            var tagPart = '';
                            const replaceableParts = [];
                            var isOpened = false;

                            htmlContent.split('').forEach((char) => {
                                if (isOpened) {
                                    tagPart += char;
                                    if (char === '>') {
                                        isOpened = false;
                                        replaceableParts.push(tagPart);
                                        tagPart = '';
                                    }
                                } else {
                                    if (char !== '<') {
                                        textPart += char;
                                    } else {
                                        isOpened = true;
                                        tagPart += char;
                                        if (textPart) {
                                            replaceableParts.push(textPart);
                                        }
                                        textPart = '' ;
                                    }
                                }
                            });
                            if(textPart) {
                                replaceableParts.push(textPart);
                            }
                            const processedParts = replaceableParts.map((part) => {
                                var htmlTags = /<\/?[\w\s="/.':;#-\/\?]+>/gi;
                                if (part.match(htmlTags)) {
                                    return part;
                                } else {
                                    part = part.replace(customFilter, replacedString);
                                    return part;
                                }
                            });
                            const content = processedParts.join('');
                            $(this).html(content);
                        }
                    });
                    $('.faq__collapsible .collapsible-body').each(function() {
                        if(searchValue.length > 1) {
                            const textContent = $(this).text();
                            const htmlContent = $(this).html();

                            var textPart =  '';
                            var tagPart = '';
                            const replaceableParts = [];
                            var isOpened = false;

                            htmlContent.split('').forEach((char) => {
                                if (isOpened) {
                                    tagPart += char;
                                    if (char === '>') {
                                        isOpened = false;
                                        replaceableParts.push(tagPart);
                                        tagPart = '';
                                    }
                                } else {
                                    if (char !== '<') {
                                        textPart += char;
                                    } else {
                                        isOpened = true;
                                        tagPart += char;
                                        if (textPart) {
                                            replaceableParts.push(textPart);
                                        }
                                        textPart = '' ;
                                    }
                                }
                            });
                            if(textPart) {
                                replaceableParts.push(textPart);
                            }
                            const processedParts = replaceableParts.map((part) => {
                                var htmlTags = /<\/?[\w\s="/.':;#-\/\?]+>/gi;
                                if (part.match(htmlTags)) {
                                    return part;
                                } else {
                                    part = part.replace(customFilter, replacedString);
                                    return part;
                                }
                            });
                            const content = processedParts.join('');
                            $(this).html(content);
                        }
                    });
                }

                function find(withCategory = false) {
                    const results = [];
                    const search = $('.input-field--faq-search input').val().toLowerCase();
                    const category = $('.filters__select-category select').val();
                    $('.faq__collapsible-header').each((idx, el) => {
                        const headerString = $(el).text();
                        const bodyString = $('.faq__collapsible-body').eq(idx).text();
                        const isMatch = bodyString.toLowerCase().includes(search) || headerString.toLowerCase().includes(search);

                        const $parentEl = $(el).closest('.faq__item');
                        const itemCatClass = $parentEl.attr('class').split(/\s+/).find(className => ~className.indexOf('category'));
                        if (withCategory || search == '') {
                            const isCategory = category == 0 || $parentEl.hasClass('category-' + category);
                            const isShow = isCategory && isMatch;
                            $parentEl.toggle(isShow);
                        }

                        if (isMatch && search) {
                            results.push({idx, headerString, itemCatClass});
                        }
                    });
                    if (search == '') {
                        highlight();
                        $('.faq__collapsible li.active .collapsible-header').click();
                    }
                    return results;
                }

                function onEnter(event) {
                    $('.filters__menu-categories').find(`button[data-category=0]`).click();
                    const results = find(true);
                    highlight();
                }

                $('.input-field--faq-search .input-field__button').on('click', function(event) {
                    $('.filters__menu-categories').find(`button[data-category=0]`).click();
                    const results = find(true);
                    highlight();
                });

                function Search(event) {
                    if (event.key === 'Enter') return onEnter(event);

                    var searchValue = $('.input-field--faq-search input').val();
                    $('.faq__search-suggester').removeClass('faq__search-suggester--init');

                    const results = find();
                    const search = event.target.value.toLowerCase();

                    $('.faq__search-suggester').text('');
                    results.forEach((suggest) => {
                        const $clone = $view.clone();
                        $clone.data(suggest);
                        $clone.find('.faq__search-suggester__item-text').text(suggest.headerString);
                        $('.faq__search-suggester').append($clone);
                    });

                    const isEmpty = results.length === 0 && search !== '';
                    $('.faq__search-suggester').toggleClass('faq__search-suggester--empty', isEmpty);
                }

                const $span = $('<span/>', {class: 'faq__search-suggester__item-text'});
                const $link = $('<a/>', {class: 'faq__search-suggester__item p-s'});
                const $view = $link.append($span);

                $('.faq__search-suggester').on('click', (event) => {
                    const target = event.target;
                    const linkData = $(target).closest('a').data();
                    highlight();
                    const suggesterCategory = linkData.itemCatClass.replace('category-', '');
                    $('.filters__select-category select').val(suggesterCategory);
                    $('.filters__select-category .select-dropdown').trigger('click');
                    $('.filters__menu-category[data-category="' + suggesterCategory + '"]').click();

                    setTimeout(function() {
                        $('.faq__collapsible li.active .collapsible-header').click();
                        $('.faq__collapsible li .faq__collapsible-header').get(linkData.idx).click();
                    }, 300);


                    setTimeout(function() {
                        $('.faq__collapsible li').get(linkData.idx).scrollIntoView({behavior: 'smooth'});
                    }, 600);

                });

                $('.faq__search-container input').on('keyup', Search);
                $('.faq__search-container input').on('click', Search);


                $('.faq__search-container input').on('focusout', function(event) {
                    setTimeout(function() {
                        $('.faq__search-suggester').addClass('faq__search-suggester--init');
                    }, 300);
                });
                    
                if (Location && location) {
                    function setCatByPath(cat) {
                        changeCategory(cat);
                        $('.filters__menu-categories').find('button[data-category=' + cat + ']').click();
                    }
                    
                    const $hash = location.hash;
                    if($hash.includes('#cat/')) {
                        const [_, cat] = $hash.split('#cat/');
                        setCatByPath(cat);
                        location.hash = '';
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        // FOOTER_SIGNUP
        if ($('.footer-signup__form').length) {
            function loadFooterSignupFormContent() {
                const $form = $('.footer-signup__form');

                $.get('/ajax/subscribe.action')
                    .done(data => {
                        if (!checkResponse(data, false)) return data;

                        $form.html(data);
                        M.updateTextFields();

                        grecaptchaRender('g-recaptcha-footer-signup');

                        $('.footer-signup__form input').on('focus', function () {
                            $('.footer-signup__recaptcha').show();
                        });
                    })
                    .fail(data => {
                        console.log('fail');
                    });
            }

            loadFooterSignupFormContent();

            $('.footer-signup__form').submit(function (e) {
                e.preventDefault();
                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        this.innerHTML = data;
                        M.updateTextFields();

                        grecaptchaRender('g-recaptcha-footer-signup');
                        $('.footer-signup__recaptcha').show();
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    });
            });
        }

        // SIGN IN FORMS FOR MODAL PAGE
        if ($('.modal-auction-register-form').length) {
            modalLoginForms();
        }

        if ($('.modal-signin-page').length || $('.modal-register-page').length || $('.modal-password-page').length) {
            $('#modal-auction-signin-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        if (data && data.trim() === 'success') {
                            redirectPage('/sso.action' + window.location.search);
                        } else {
                            this.innerHTML = data;
                            modalLoginForms();
                            $('.loader-block').hide();
                        }
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                        $('.loader-block').hide();
                    });
            });

            $('#modal-auction-register-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        this.innerHTML = data;
                        modalLoginForms();
                        grecaptchaRender('g-recaptcha-register');
                        if ($('.modal-register__sso-trigger').length) { // success
                            $('.modal-register__sso-trigger').on('click', function (e) {
                                e.preventDefault();
                                redirectPage('/sso.action' + window.location.search);
                            });
                            trackEvent('SignUp');
                        }
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    })
                    .always(() => {
                        $('.loader-block').hide();
                    }) ;
            });

            $('#modal-auction-password-form').submit(function (e) {
                e.preventDefault();
                $('.loader-block').show();

                $.post(
                    this.action,
                    $(this).serialize(),
                )
                    .done(data => {
                        if (!checkResponse(data)) return data;

                        this.innerHTML = data;
                        modalLoginForms();
                        grecaptchaRender('g-recaptcha-password');
                    })
                    .fail(data => {
                        if (data && data.statusText) this.innerHTML = data.statusText;
                    })
                    .always(() => {
                        $('.loader-block').hide();
                    }) ;
            });
        }

        function modalLoginForms () {
            if (!$('.modal-auction-register-form .modal-trigger').length) return; // already handled

            $('.modal-auction-register-form .modal-close').removeClass('modal-close');
            $('.modal-auction-register-form .modal-trigger').removeClass('modal-trigger').addClass('modal-trigger-auction-registration');

            $('.modal-trigger-auction-registration[href="#modal-register"]').on('click', function (e) {
                e.preventDefault();
                $('.modal-auction-register-form').hide();
                $('#modal-auction-register-form').show();
                grecaptchaRender('g-recaptcha-register');
                trackEvent('RegistrationForm');
            });
            $('.modal-trigger-auction-registration[href="#modal-signin"]').on('click', function (e) {
                e.preventDefault();
                $('.modal-auction-register-form').hide();
                $('#modal-auction-signin-form').show();
            });
            $('.modal-trigger-auction-registration[href="#modal-password"]').on('click', function (e) {
                e.preventDefault();
                $('.modal-auction-register-form').hide();
                $('#modal-auction-password-form').show();
                grecaptchaRender('g-recaptcha-password');
            });
            initFacebookLoginButton();
            M.updateTextFields();
            if ($('.modal-register-page').length) { // register page from sam
                trackEvent('RegistrationForm');
            }
        }

        // AUCTION REGISTRATION
        auctionRegistration();

        function auctionRegistration () {
            const $inner = $('.auction-registration .auction-registration__inner');
            if (!$inner.length) return;

            $('select').not('.disabled').formSelect();
            modalLoginForms();

            if ($inner.find('#modal-register-auction-form').length && !$inner.find('#modal-register-auction-form').data('submit')) {
                $inner.find('#modal-register-auction-form').data('submit', true); // added submit handler
                $inner.find('#modal-register-auction-form').submit(function (e) {
                    $('.loader-block').show();

                });

                // open second page
                function goBack (e) {
                    e.preventDefault();
                    redirectPage('/auctionRegistration.action?auctionId=' + $('#modal-register-auction-form_auctionId').val() +
                        '&d=' + $('#modal-register-auction-form_d').val() +
                        '&ru=' + encodeURIComponent($('#modal-register-auction-form_ru').val()) +
                        '&sc=' + $('#modal-register-auction-form_sc').val());
                };

                function setStep (step) {
                    $('#modal-register-auction-form_step').val(step);
                    $('.auction-registration__step').hide();
                    $('.auction-registration__step[data-page="' + step + '"]').show();
                };

                $('.auction-registration__page-trigger').on('click', function (e) {
                    setStep($(this).data('page'));
                    $('.auction-registration__info').scrollTop(0);

                    window.history.pushState(null, 'Back');
                    window.onpopstate = goBack;
                });

                $('.auction-registration__page-back').on('click', goBack);

                $('.auction-registration__step[data-page="shipping"] .auction-registration__page-submit').on('click', goBack);

                $('.auction-registration__step[data-page="terms"] .modal-register__submit').on('click', function (e) {
                    $('#modal-register-auction-form_terms')[0].checked = true;
                    $('#modal-register-auction-form_step').val('general');
                });

                //billingAsShipping
                const $shippingAddressCheckbox = $('#modal-register-auction-form_billingAsShipping');
                if ($shippingAddressCheckbox.length) {
                    function registerAuctionBillingAddress() {
                        const shippingAsBilling = $shippingAddressCheckbox[0].checked;
                        $('.form-section--shipping').toggle(!shippingAsBilling);
                    }
                    $shippingAddressCheckbox.on('change', registerAuctionBillingAddress);
                    registerAuctionBillingAddress();
                }

                // BILLING ADDRESS STATE
                const $billingCountry = $('#modal-register-auction-form select[name="billingAddress.countryId"]');
                if ($billingCountry.length) {
                    const $billingStateInput = $('.billing-address-state__input input');
                    const $billingStateInputDiv = $('.billing-address-state__input');
                    const $billingStateSelect = $('.billing-address-state__select select');
                    const $billingStateSelectDiv = $('.billing-address-state__select');

                    function isBillingStateSelect() {
                        if ($billingCountry.val() == 2) { // USA
                            $billingStateSelectDiv.show();
                            $billingStateSelect.attr('name', 'billingAddress.state');
                            $billingStateInputDiv.hide();
                            $billingStateInput.attr('name', 'billingAddress.state.tmp');
                        } else {
                            $billingStateSelectDiv.hide();
                            $billingStateSelect.attr('name', 'billingAddress.state.tmp');
                            $billingStateInputDiv.show();
                            $billingStateInput.attr('name', 'billingAddress.state');
                        }
                    }
                    $billingCountry.on('change', isBillingStateSelect);
                    isBillingStateSelect();
                }

                // SHIPPING ADDRESS STATE
                const $shippingCountry = $('#modal-register-auction-form select[name="shippingAddress.countryId"]');
                if ($shippingCountry.length) {
                    const $shippingStateInput = $('.shipping-address-state__input input');
                    const $shippingStateInputDiv = $('.shipping-address-state__input');
                    const $shippingStateSelect = $('.shipping-address-state__select select');
                    const $shippingStateSelectDiv = $('.shipping-address-state__select');

                    function isShippingStateSelect() {
                        if ($shippingCountry.val() == 2) { // USA
                            $shippingStateSelectDiv.show();
                            $shippingStateSelect.attr('name', 'shippingAddress.state');
                            $shippingStateInputDiv.hide();
                            $shippingStateInput.attr('name', 'shippingAddress.state.tmp');
                        } else {
                            $shippingStateSelectDiv.hide();
                            $shippingStateSelect.attr('name', 'shippingAddress.state.tmp');
                            $shippingStateInputDiv.show();
                            $shippingStateInput.attr('name', 'shippingAddress.state');
                        }
                    }
                    $shippingCountry.on('change', isShippingStateSelect);
                    isShippingStateSelect();
                }
            } else if (window.location.href.includes('auctionRegistrationSubmit')) {
                trackEvent('AuctionRegistrationComplete');
            }

            // SSO
            if ($('#modal-auction-signin-form').length && !$('#modal-auction-signin-form').data('submit')) {
                $('#modal-auction-signin-form').data('submit', true); // added submit handler
                $('#modal-auction-signin-form').submit(function (e) {
                    e.preventDefault();
                    $('.loader-block').show();

                    $.post(
                        this.action,
                        $(this).serialize(),
                    )
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            if (data && data.trim() === 'success') {
                                redirectPage('/sso.action' + window.location.search);
                            } else {
                                this.innerHTML = data;
                                auctionRegistration();
                            }
                        })
                        .fail(data => {
                            if (data && data.statusText) this.innerHTML = data.statusText;
                        })
                        .always(data => {
                            $('.loader-block').hide();
                        });
                });
            }
            if ($('#modal-auction-register-form').length && !$('#modal-auction-register-form').data('submit')) {
                $('#modal-auction-register-form').data('submit', true); // added submit handler
                $('#modal-auction-register-form').submit(function (e) {
                    e.preventDefault();
                    $('.loader-block').show();

                    $.post(
                        this.action,
                        $(this).serialize(),
                    )
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            this.innerHTML = data;
                            auctionRegistration();
                            grecaptchaRender('g-recaptcha-register');
                            if ($('.modal-register__sso-trigger').length) { // success
                                $('.modal-register__sso-trigger').on('click', function (e) {
                                    e.preventDefault();
                                    redirectPage('/sso.action' + window.location.search);
                                });
                                trackEvent('SignUp');
                            }
                        })
                        .fail(data => {
                            if (data && data.statusText) this.innerHTML = data.statusText;
                        })
                        .always(() => {
                            $('.loader-block').hide();
                        }) ;
                });
            }
            if ($('#modal-auction-password-form').length && !$('#modal-auction-password-form').data('submit')) {
                $('#modal-auction-password-form').data('submit', true); // added submit handler
                $('#modal-auction-password-form').submit(function (e) {
                    e.preventDefault();
                    $('.loader-block').show();

                    $.post(
                        this.action,
                        $(this).serialize(),
                    )
                        .done(data => {
                            if (!checkResponse(data)) return data;

                            this.innerHTML = data;
                            auctionRegistration();
                            grecaptchaRender('g-recaptcha-password');
                        })
                        .fail(data => {
                            if (data && data.statusText) this.innerHTML = data.statusText;
                        })
                        .always(() => {
                            $('.loader-block').hide();
                        }) ;
                });
            }
        }

        // AUCTIONS
        const $auctionRegistrationTrigger = $('.auction-registration-trigger');
        if ($auctionRegistrationTrigger.length) {
            $auctionRegistrationTrigger.on('click', function (e) {
                e.preventDefault();
                const params = new URLSearchParams('d=1');
                ssoParams(params);
                const paramsSymbol = this.href.includes('?') ? '&' : '?';
                redirectPage(this.href + paramsSymbol + params.toString());
            });
        }

        // SHIPPING QUOTE PAGE FOR SAM
        if ($('.modal-shipping-quote-page').length) {
            grecaptchaRender('g-recaptcha-quote');

            $('form').submit(function (e) {
                if (e.originalEvent.submitter && e.originalEvent.submitter.name === 'question') {
                    $('[name="question"]').val(1);
                }
            });
        }

        // COOKIES
        const isCookiesAccepted = $.cookie('cookies_accepted');
        if (!isCookiesAccepted) {
            M.toast({
                html: `<span class="cookies-toast"><span class="cookies-toast__body"><strong class="c-r">This website uses cookies</strong><br/>
We use cookies to personalise content and ads, to provide social media features and to analyse our traffic.
We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.
</span><span class="btn cookies-toast__close">Accept</span></span>`,
                classes: 'toast-cookies',
                displayLength: Infinity,
            });
            $('.cookies-toast__close').on('click', function () {
                $.cookie('cookies_accepted', new Date().toISOString().replaceAll(':', '-'), { expires: new Date(2147483647 * 1000), path: '/' });
                M.Toast.dismissAll();
            });
            $('#toast-container').prepend('<div class="toast__overlay"/>');
        }

    }); // end of document ready
});

function grecaptchaRender (id = 'g-recaptcha') {
    try {
        grecaptcha.render(id, {
            'sitekey' : '6LfhkdoZAAAAALO13mfmd1E57vzk-J516oR__cM1'
        });
    } catch (error) {/*possible duplicated instances*/}
}

function bagCountToggle (count) {
    const $number = $('.header__bag-number');
    if (!$number.length) return;
    $number.html(count).toggleClass('empty', count == 0);
}

function bagCountUpdate () {
    $.get('/ajax/rest.action?actions=productBasketCount')
        .done(data => {
            if (!checkResponse(data, false)) return data;

            const $data = $('<div/>').html(data);
            const bagCount = $data.find('#productBasketCount').text().trim();
            bagCountToggle(bagCount);
        });
}

function getHeaderUpdate () {
    if ($('body').hasClass('wp')) {
        $('.is-ligged-false').css('filter', 'blur(4px)');
    }
    $.get('/ajax/rest.action?actions=userLoggedIn&actions=productBasketCount&actions=headerMenuAuctions')
        .done(data => {
            if (!checkResponse(data, false)) return data;

            const $data = $('<div/>').html(data);

            if ($('body').hasClass('wp')) {
                const isLogged = $data.find('#userLoggedIn').text().trim() === 'true';
                if (isLogged) {
                    $('.is-ligged-false').hide();
                    $('.is-ligged-true').show();
                }
            }

            $('.menu-auctions-links').html(
                $data.find('#headerMenuAuctions')
            );

            bagCountToggle($data.find('#productBasketCount').text().trim());
        })
        .always(() => {
            $('.is-ligged-false').css('filter', '');
        });
}

function initFacebookLoginButton(sso = null) {
    // todo: logic from old new-design, requires review
    $('#facebookLoginButtonLogin, #facebookLoginButtonRegister').click(function (e) {
        let url = $(this).attr('data-url');
        const state = {};
        if ($(e.target).closest('#facebookLoginButtonLogin').length) {
            state.action = 'login';
        } else if ($(e.target).closest('#facebookLoginButtonRegister').length) {
            state.action = 'register';
        }
        if (sso) {
            state.redirectUrl = escape(sso);
        }
        if (url.includes('facebookLoginCallback.action&state={')) { // already has state
            url = url.replace(
                'facebookLoginCallback.action&state={',
                'facebookLoginCallback.action&state=' + JSON.stringify(state).slice(0,-1) + ','
            );
        } else {
            url = url.replace(
                'facebookLoginCallback.action&',
                'facebookLoginCallback.action&state=' + JSON.stringify(state) + '&'
            );
        }

        var w = 600;
        var h = 600;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);

        window.open(url, 'facebookLogin', 'width=' + w + ',height=' + h + ',top=' + top + ', left=' + left);

        $button = $(this).next('.modal-register__facebook-or');
        function onMessage (event) {
            if (event.data) {
                if (event.data === 'fbTrackSignUp') {
                    window.removeEventListener('message', onMessage);
                    trackEvent('SignUp');
                } else if (event.data.includes && event.data.includes('fbErrorMessage:')) {
                    $('#facebookError').remove();
                    $(`<div id="facebookError" class="input-field__helper error">
                        ${event.data.replace('fbErrorMessage:', '')}
                    <br/><br/></div>`).insertAfter($button);
                }
            }
        }
        window.addEventListener('message', onMessage);
    });
}

function reloadPage () {
    $('.loader-block').show();
    setTimeout(()=>{
        window.location.reload(true);
    });
}

function redirectPage (url) {
    $('.loader-block').show();
    window.location.href = url.replace(/\/+/g,'/').replace(/^https:\//,'https://');
}

function checkResponse (data, isReload = true) {
    if (data && data.includes('<html')) {
        M.toast({
            html: 'Unfortunately something went wrong',
            classes: 'toast-error'
        });
        if (isReload) setTimeout(()=>window.location.reload(), 2000);
        return false;
    }
    return true;
}

function trackEvent (event) {
    try {
        switch (event) {
            case 'AuctionRegistrationComplete': {
                fbq('track', 'CompleteRegistration');
                rdt('track', 'SignUp');
                twq('event', 'Custom', { value: 'AuctionRegistrationComplete' });
                break;
            }
            case 'RegistrationForm': {
                fbq('trackCustom', 'RegistrationForm');
                rdt('track', 'Custom', { customEventName: 'RegistrationForm' }); 
                break;
            }
            case 'SellForm': {
                fbq('trackCustom', 'SellForm');
                rdt('track', 'Custom', { customEventName: 'SellForm' }); 
                break;
            }
            // case 'SignUp': {
            //     break;
            // }
        }
    } catch (e) {
        setTimeout(()=>trackEvent(event), 100);
    }
}

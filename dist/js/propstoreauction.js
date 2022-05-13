document.addEventListener('DOMContentLoaded', () => {
    if (window.location.href.includes('#nomaterialize')) { // don't materialize
        document.querySelectorAll('[data-v2]').forEach(item => item.remove());
        document.body.style.opacity = 1;
        return;
    }
    const svgSprite = document.createElement('div');
    svgSprite.id = 'svg-sprite';
    document.body.append(svgSprite);
    const loaded = function () { document.body.classList.add('loaded') };
    if (typeof fetch != "undefined") fetch('/css/custom/sprite.defs.svg', { cache: 'force-cache' })
        .then(response => response.text())
        .then(html => { svgSprite.innerHTML = html; loaded(); })
        .catch(loaded);

    $(function () {
        /*! Viewer.js v1.10.5 https://fengyuanchen.github.io/viewerjs Copyright 2015-present Chen Fengyuan * Released under the MIT license * Date: 2022-04-05T08:21:02.491Z */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Viewer=e()}(this,function(){"use strict";function s(e,t){var i,n=Object.keys(e);return Object.getOwnPropertySymbols&&(i=Object.getOwnPropertySymbols(e),t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)),n}function q(n){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?s(Object(o),!0).forEach(function(t){var e,i;e=n,i=o[t=t],t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):s(Object(o)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(o,t))})}return n}function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var h={backdrop:!0,button:!0,navbar:!0,title:!0,toolbar:!0,className:"",container:"body",filter:null,fullscreen:!0,inheritedAttributes:["crossOrigin","decoding","isMap","loading","referrerPolicy","sizes","srcset","useMap"],initialViewIndex:0,inline:!1,interval:5e3,keyboard:!0,focus:!0,loading:!0,loop:!0,minWidth:200,minHeight:100,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,slideOnTouch:!0,toggleOnDblclick:!0,tooltip:!0,transition:!0,zIndex:2015,zIndexInline:0,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null,move:null,moved:null,rotate:null,rotated:null,scale:null,scaled:null,zoom:null,zoomed:null,play:null,stop:null},t="undefined"!=typeof window&&void 0!==window.document,e=t?window:{},a=!(!t||!e.document.documentElement)&&"ontouchstart"in e.document.documentElement,i=t&&"PointerEvent"in e,g="viewer",l="move",W="switch",c="zoom",f="".concat(g,"-active"),j="".concat(g,"-close"),H="".concat(g,"-fade"),B="".concat(g,"-fixed"),V="".concat(g,"-fullscreen"),U="".concat(g,"-fullscreen-exit"),v="".concat(g,"-hide"),K="".concat(g,"-hide-md-down"),Z="".concat(g,"-hide-sm-down"),$="".concat(g,"-hide-xs-down"),u="".concat(g,"-in"),p="".concat(g,"-invisible"),b="".concat(g,"-loading"),_="".concat(g,"-move"),G="".concat(g,"-open"),d="".concat(g,"-show"),m="".concat(g,"-transition"),w="click",J="dblclick",Q="dragstart",tt="focusin",et="keydown",y="load",x="error",it=i?"pointerdown":a?"touchstart":"mousedown",nt=i?"pointermove":a?"touchmove":"mousemove",ot=i?"pointerup pointercancel":a?"touchend touchcancel":"mouseup",st="resize",k="transitionend",at="wheel",rt="ready",ht="show",z="viewed",lt="rotated",ct="".concat(g,"Action"),ut=/\s\s*/,dt=["zoom-in","zoom-out","one-to-one","reset","prev","play","next","rotate-left","rotate-right","flip-horizontal","flip-vertical"];function E(t){return"string"==typeof t}var mt=Number.isNaN||e.isNaN;function T(t){return"number"==typeof t&&!mt(t)}function D(t){return void 0===t}function o(t){return"object"===n(t)&&null!==t}var gt=Object.prototype.hasOwnProperty;function I(t){if(!o(t))return!1;try{var e=t.constructor,i=e.prototype;return e&&i&&gt.call(i,"isPrototypeOf")}catch(t){return!1}}function A(t){return"function"==typeof t}function S(e,i){if(e&&A(i))if(Array.isArray(e)||T(e.length))for(var t=e.length,n=0;n<t&&!1!==i.call(e,e[n],n,e);n+=1);else o(e)&&Object.keys(e).forEach(function(t){i.call(e,e[t],t,e)})}var O=Object.assign||function(i){for(var t=arguments.length,e=new Array(1<t?t-1:0),n=1;n<t;n++)e[n-1]=arguments[n];return o(i)&&0<e.length&&e.forEach(function(e){o(e)&&Object.keys(e).forEach(function(t){i[t]=e[t]})}),i},ft=/^(?:width|height|left|top|marginLeft|marginTop)$/;function C(t,e){var i=t.style;S(e,function(t,e){ft.test(e)&&T(t)&&(t+="px"),i[e]=t})}function L(t,e){return t&&e&&(t.classList?t.classList.contains(e):-1<t.className.indexOf(e))}function R(t,e){var i;t&&e&&(T(t.length)?S(t,function(t){R(t,e)}):t.classList?t.classList.add(e):(i=t.className.trim())?i.indexOf(e)<0&&(t.className="".concat(i," ").concat(e)):t.className=e)}function F(t,e){t&&e&&(T(t.length)?S(t,function(t){F(t,e)}):t.classList?t.classList.remove(e):0<=t.className.indexOf(e)&&(t.className=t.className.replace(e,"")))}function N(t,e,i){e&&(T(t.length)?S(t,function(t){N(t,e,i)}):(i?R:F)(t,e))}var vt=/([a-z\d])([A-Z])/g;function pt(t){return t.replace(vt,"$1-$2").toLowerCase()}function Y(t,e){return o(t[e])?t[e]:t.dataset?t.dataset[e]:t.getAttribute("data-".concat(pt(e)))}function bt(t,e,i){o(i)?t[e]=i:t.dataset?t.dataset[e]=i:t.setAttribute("data-".concat(pt(e)),i)}yt=!1,t&&(wt=!1,i=function(){},t=Object.defineProperty({},"once",{get:function(){return yt=!0,wt},set:function(t){wt=t}}),e.addEventListener("test",i,t),e.removeEventListener("test",i,t));var wt,yt,xt=yt;function X(i,t,n,e){var o=3<arguments.length&&void 0!==e?e:{},s=n;t.trim().split(ut).forEach(function(t){var e;xt||(e=i.listeners)&&e[t]&&e[t][n]&&(s=e[t][n],delete e[t][n],0===Object.keys(e[t]).length&&delete e[t],0===Object.keys(e).length&&delete i.listeners),i.removeEventListener(t,s,o)})}function M(s,t,a,e){var r=3<arguments.length&&void 0!==e?e:{},h=a;t.trim().split(ut).forEach(function(n){var t,o;r.once&&!xt&&(t=s.listeners,h=function(){delete o[n][a],s.removeEventListener(n,h,r);for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];a.apply(s,e)},(o=void 0===t?{}:t)[n]||(o[n]={}),o[n][a]&&s.removeEventListener(n,o[n][a],r),o[n][a]=h,s.listeners=o),s.addEventListener(n,h,r)})}function P(t,e,i,n){var o;return A(Event)&&A(CustomEvent)?o=new CustomEvent(e,q({bubbles:!0,cancelable:!0,detail:i},n)):(o=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,i),t.dispatchEvent(o)}function kt(t){var e=t.rotate,i=t.scaleX,n=t.scaleY,o=t.translateX,t=t.translateY,s=[],o=(T(o)&&0!==o&&s.push("translateX(".concat(o,"px)")),T(t)&&0!==t&&s.push("translateY(".concat(t,"px)")),T(e)&&0!==e&&s.push("rotate(".concat(e,"deg)")),T(i)&&1!==i&&s.push("scaleX(".concat(i,")")),T(n)&&1!==n&&s.push("scaleY(".concat(n,")")),s.length?s.join(" "):"none");return{WebkitTransform:o,msTransform:o,transform:o}}var zt=e.navigator&&/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(e.navigator.userAgent);function Et(i,t,e){var n=document.createElement("img");if(i.naturalWidth&&!zt)return e(i.naturalWidth,i.naturalHeight),n;var o=document.body||document.documentElement;return n.onload=function(){e(n.width,n.height),zt||o.removeChild(n)},S(t.inheritedAttributes,function(t){var e=i.getAttribute(t);null!==e&&n.setAttribute(t,e)}),n.src=i.src,zt||(n.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",o.appendChild(n)),n}function Tt(t){switch(t){case 2:return $;case 3:return Z;case 4:return K;default:return""}}function Dt(t,e){var i=t.pageX,t=t.pageY,n={endX:i,endY:t};return e?n:q({timeStamp:Date.now(),startX:i,startY:t},n)}var It,i={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initBody:function(){var t=this.element.ownerDocument,e=t.body||t.documentElement;this.body=e,this.scrollbarWidth=window.innerWidth-t.documentElement.clientWidth,this.initialBodyPaddingRight=e.style.paddingRight,this.initialBodyComputedPaddingRight=window.getComputedStyle(e).paddingRight},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}},initViewer:function(){var t,e=this.options,i=this.parent;e.inline&&(t={width:Math.max(i.offsetWidth,e.minWidth),height:Math.max(i.offsetHeight,e.minHeight)},this.parentData=t),!this.fulled&&t||(t=this.containerData),this.viewerData=O({},t)},renderViewer:function(){this.options.inline&&!this.fulled&&C(this.viewer,this.viewerData)},initList:function(){var r=this,t=this.element,h=this.options,l=this.list,c=[];l.innerHTML="",S(this.images,function(i,t){var e,n,o=i.src,s=i.alt||(E(s=o)?decodeURIComponent(s.replace(/^.*\//,"").replace(/[?&#].*$/,"")):""),a=r.getImageURL(i);(o||a)&&(e=document.createElement("li"),n=document.createElement("img"),S(h.inheritedAttributes,function(t){var e=i.getAttribute(t);null!==e&&n.setAttribute(t,e)}),n.src=o||a,n.alt=s,n.setAttribute("data-original-url",a||o),e.setAttribute("data-index",t),e.setAttribute("data-viewer-action","view"),e.setAttribute("role","button"),h.keyboard&&e.setAttribute("tabindex",0),e.appendChild(n),l.appendChild(e),c.push(e))}),S(this.items=c,function(e){var t,i,n=e.firstElementChild;bt(n,"filled",!0),h.loading&&R(e,b),M(n,y,t=function(t){X(n,x,i),h.loading&&F(e,b),r.loadImage(t)},{once:!0}),M(n,x,i=function(){X(n,y,t),h.loading&&F(e,b)},{once:!0})}),h.transition&&M(t,z,function(){R(l,m)},{once:!0})},renderList:function(){var t,e,i=this.index,n=this.items[i];n&&(t=n.nextElementSibling,t=parseInt(window.getComputedStyle(t||n).marginLeft,10),n=n.offsetWidth,C(this.list,O({width:(e=n+t)*this.length-t},kt({translateX:(this.viewerData.width-n)/2-e*i}))))},resetList:function(){var t=this.list;t.innerHTML="",F(t,m),C(t,kt({translateX:0}))},initImage:function(r){var t,h=this,l=this.options,e=this.image,i=this.viewerData,n=this.footer.offsetHeight,c=i.width,u=Math.max(i.height-n,n),d=this.imageData||{};this.imageInitializing={abort:function(){t.onload=null}},t=Et(e,l,function(t,e){var i=t/e,n=c,o=u,s=(h.imageInitializing=!1,c<u*i?o=c/i:n=u*i,n=Math.min(.9*n,t),o=Math.min(.9*o,e),(c-n)/2),a=(u-o)/2,s={left:s,top:a,x:s,y:a,width:n,height:o,oldRatio:1,ratio:n/t,aspectRatio:i,naturalWidth:t,naturalHeight:e},a=O({},s);l.rotatable&&(s.rotate=d.rotate||0,a.rotate=0),l.scalable&&(s.scaleX=d.scaleX||1,s.scaleY=d.scaleY||1,a.scaleX=1,a.
scaleY=1),h.imageData=s,h.initialImageData=a,r&&r()})},renderImage:function(t){var e,i=this,n=this.image,o=this.imageData;C(n,O({width:o.width,height:o.height,marginLeft:o.x,marginTop:o.y},kt(o))),t&&((this.viewing||this.moving||this.rotating||this.scaling||this.zooming)&&this.options.transition&&L(n,m)?(e=function(){i.imageRendering=!1,t()},this.imageRendering={abort:function(){X(n,k,e)}},M(n,k,e,{once:!0})):t())},resetImage:function(){var t;(this.viewing||this.viewed)&&(t=this.image,this.viewing&&this.viewing.abort(),t.parentNode.removeChild(t),this.image=null)}},t={bind:function(){var t=this.options,e=this.viewer,i=this.canvas,n=this.element.ownerDocument;M(e,w,this.onClick=this.click.bind(this)),M(e,Q,this.onDragStart=this.dragstart.bind(this)),M(i,it,this.onPointerDown=this.pointerdown.bind(this)),M(n,nt,this.onPointerMove=this.pointermove.bind(this)),M(n,ot,this.onPointerUp=this.pointerup.bind(this)),M(n,et,this.onKeyDown=this.keydown.bind(this)),M(window,st,this.onResize=this.resize.bind(this)),t.zoomable&&t.zoomOnWheel&&M(e,at,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),t.toggleOnDblclick&&M(i,J,this.onDblclick=this.dblclick.bind(this))},unbind:function(){var t=this.options,e=this.viewer,i=this.canvas,n=this.element.ownerDocument;X(e,w,this.onClick),X(e,Q,this.onDragStart),X(i,it,this.onPointerDown),X(n,nt,this.onPointerMove),X(n,ot,this.onPointerUp),X(n,et,this.onKeyDown),X(window,st,this.onResize),t.zoomable&&t.zoomOnWheel&&X(e,at,this.onWheel,{passive:!1,capture:!0}),t.toggleOnDblclick&&X(i,J,this.onDblclick)}},At={click:function(t){var e=this.options,i=this.imageData,n=t.target,o=Y(n,ct);switch(o||"img"!==n.localName||"li"!==n.parentElement.localName||(o=Y(n=n.parentElement,ct)),a&&t.isTrusted&&n===this.canvas&&clearTimeout(this.clickCanvasTimeout),o){case"mix":this.played?this.stop():e.inline?this.fulled?this.exit():this.full():this.hide();break;case"hide":this.hide();break;case"view":this.view(Y(n,"index"));break;case"zoom-in":this.zoom(.1,!0);break;case"zoom-out":this.zoom(-.1,!0);break;case"one-to-one":this.toggle();break;case"reset":this.reset();break;case"prev":this.prev(e.loop);break;case"play":this.play(e.fullscreen);break;case"next":this.next(e.loop);break;case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-horizontal":this.scaleX(-i.scaleX||-1);break;case"flip-vertical":this.scaleY(-i.scaleY||-1);break;default:this.played&&this.stop()}},dblclick:function(t){t.preventDefault(),this.viewed&&t.target===this.image&&(a&&t.isTrusted&&clearTimeout(this.doubleClickImageTimeout),this.toggle(t.isTrusted?t:t.detail&&t.detail.originalEvent))},load:function(){var t=this,e=(this.timeout&&(clearTimeout(this.timeout),this.timeout=!1),this.element),i=this.options,n=this.image,o=this.index,s=this.viewerData;F(n,p),i.loading&&F(this.canvas,b),n.style.cssText="height:0;"+"margin-left:".concat(s.width/2,"px;")+"margin-top:".concat(s.height/2,"px;")+"max-width:none!important;position:relative;width:0;",this.initImage(function(){N(n,_,i.movable),N(n,m,i.transition),t.renderImage(function(){t.viewed=!0,t.viewing=!1,A(i.viewed)&&M(e,z,i.viewed,{once:!0}),P(e,z,{originalImage:t.images[o],index:o,image:n},{cancelable:!1})})})},loadImage:function(t){var n=t.target,t=n.parentNode,o=t.offsetWidth||30,s=t.offsetHeight||50,a=!!Y(n,"filled");Et(n,this.options,function(t,e){var t=t/e,e=o,i=s;o<s*t?a?e=s*t:i=o/t:a?i=o/t:e=s*t,C(n,O({width:e,height:i},kt({translateX:(o-e)/2,translateY:(s-i)/2})))})},keydown:function(t){var e=this.options;if(e.keyboard){var i=t.keyCode||t.which||t.charCode;if(13===i&&this.viewer.contains(t.target)&&this.click(t),this.fulled)switch(i){case 27:this.played?this.stop():e.inline?this.fulled&&this.exit():this.hide();break;case 32:this.played&&this.stop();break;case 37:this.prev(e.loop);break;case 38:t.preventDefault(),this.zoom(e.zoomRatio,!0);break;case 39:this.next(e.loop);break;case 40:t.preventDefault(),this.zoom(-e.zoomRatio,!0);break;case 48:case 49:t.ctrlKey&&(t.preventDefault(),this.toggle())}}},dragstart:function(t){"img"===t.target.localName&&t.preventDefault()},pointerdown:function(t){var e=this.options,i=this.pointers,n=t.buttons,o=t.button;!this.viewed||this.showing||this.viewing||this.hiding||("mousedown"===t.type||"pointerdown"===t.type&&"mouse"===t.pointerType)&&(T(n)&&1!==n||T(o)&&0!==o||t.ctrlKey)||(t.preventDefault(),t.changedTouches?S(t.changedTouches,function(t){i[t.identifier]=Dt(t)}):i[t.pointerId||0]=Dt(t),n=!!e.movable&&l,e.zoomOnTouch&&e.zoomable&&1<Object.keys(i).length?n=c:e.slideOnTouch&&("touch"===t.pointerType||"touchstart"===t.type)&&this.isSwitchable()&&(n=W),!e.transition||n!==l&&n!==c||F(this.image,m),this.action=n)},pointermove:function(t){var e=this.pointers,i=this.action;this.viewed&&i&&(t.preventDefault(),t.changedTouches?S(t.changedTouches,function(t){O(e[t.identifier]||{},Dt(t,!0))}):O(e[t.pointerId||0]||{},Dt(t,!0)),this.change(t))},pointerup:function(t){var e,i=this,n=this.options,o=this.action,s=this.pointers;t.changedTouches?S(t.changedTouches,function(t){e=s[t.identifier],delete s[t.identifier]}):(e=s[t.pointerId||0],delete s[t.pointerId||0]),o&&(t.preventDefault(),!n.transition||o!==l&&o!==c||R(this.image,m),this.action=!1,a&&o!==c&&e&&Date.now()-e.timeStamp<500&&(clearTimeout(this.clickCanvasTimeout),clearTimeout(this.doubleClickImageTimeout),n.toggleOnDblclick&&this.viewed&&t.target===this.image?this.imageClicked?(this.imageClicked=!1,this.doubleClickImageTimeout=setTimeout(function(){P(i.image,J,{originalEvent:t})},50)):(this.imageClicked=!0,this.doubleClickImageTimeout=setTimeout(function(){i.imageClicked=!1},500)):(this.imageClicked=!1,n.backdrop&&"static"!==n.backdrop&&t.target===this.canvas&&(this.clickCanvasTimeout=setTimeout(function(){P(i.canvas,w,{originalEvent:t})},50)))))},resize:function(){var e=this;this.isShown&&!this.hiding&&(this.fulled&&(this.close(),this.initBody(),this.open()),this.initContainer(),this.initViewer(),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){e.renderImage()}),this.played&&(this.options.fullscreen&&this.fulled&&!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)?this.stop():S(this.player.getElementsByTagName("img"),function(t){M(t,y,e.loadImage.bind(e),{once:!0}),P(t,y)})))},wheel:function(t){var e,i,n=this;this.viewed&&(t.preventDefault(),this.wheeling||(this.wheeling=!0,setTimeout(function(){n.wheeling=!1},50),e=Number(this.options.zoomRatio)||.1,i=1,t.deltaY?i=0<t.deltaY?1:-1:t.wheelDelta?i=-t.wheelDelta/120:t.detail&&(i=0<t.detail?1:-1),this.zoom(-i*e,!0,t)))}},St={show:function(){var t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],e=this.element,i=this.options;if(i.inline||this.showing||this.isShown||this.showing)return this;if(!this.ready)return this.build(),this.ready&&this.show(t),this;if(A(i.show)&&M(e,ht,i.show,{once:!0}),!1===P(e,ht)||!this.ready)return this;this.hiding&&this.transitioning.abort(),this.showing=!0,this.open();var n,o=this.viewer;return F(o,v),o.setAttribute("role","dialog"),o.setAttribute("aria-labelledby",this.title.id),o.setAttribute("aria-modal",!0),o.removeAttribute("aria-hidden"),i.transition&&!t?(n=this.shown.bind(this),this.transitioning={abort:function(){X(o,k,n),F(o,u)}},R(o,m),o.initialOffsetWidth=o.offsetWidth,M(o,k,n,{once:!0}),R(o,u)):(R(o,u),this.shown()),this},hide:function(){var i=this,t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],e=this.element,n=this.options;if(n.inline||this.hiding||!this.isShown&&!this.showing)return this;if(A(n.hide)&&M(e,"hide",n.hide,{once:!0}),!1===P(e,"hide"))return this;this.showing&&this.transitioning.abort(),this.hiding=!0,this.played?this.stop():this.viewing&&this.viewing.abort();var o,s,a=this.viewer,r=this.image,h=function(){F(a,u),i.hidden()};return n.transition&&!t?(o=function t(e){e&&e.target===a&&(X(a,k,t),i.hidden())},s=function(){L(a,m)?(M(a,k,o),F(a,u)):h()},this.transitioning={abort:function(){i.viewed&&L(r,m)?X(r,k,s):L(a,m)&&X(a,k,o)}},this.viewed&&L(r,m)?(M(r,k,s,{once:!0}),this.zoomTo(0,!1,null,!0)):s()):h(),this},view:function(){var i=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.options.initialViewIndex,t=Number(t)||0;if(this.hiding||this.played||t<0||t>=this.length||this.viewed&&t===this.index)return this;if(!this.isShown)return this.index=t,this.show();this.viewing&&this.viewing.abort();var e=this.element,n=this.options,o=this.title,s=this.canvas,a=this.items[t],r=a.querySelector("img"),h=Y(r,"originalUrl"),l=r.getAttribute("alt"),c=document.createElement("img");if(S(n.inheritedAttributes,function(t){var e=r.getAttribute(t);null!==e&&c.setAttribute(t,e)}),c.src=h,c.alt=l,A(n.view)&&M(e,"view",n.view,{once:!0}),!1===P(e,"view",{originalImage:this.images[t],index:t,image:c})||!this.isShown||this.hiding||this.played)return this;function u(){var t=i.imageData,e=Array.isArray(n.title)?n.title[1]:n.title;o.innerHTML=E(e=A(e)?e.call(i,c,t):"".concat(l," (").concat(t.naturalWidth," × ").concat(t.naturalHeight,")"))?e.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):e}var d,m,h=this.items[this.index];h&&(F(h,f),h.removeAttribute("aria-selected")),R(a,f),a.setAttribute("aria-selected",!0),n.focus&&a.focus(),this.image=c,this.viewed=!1,this.index=t,this.imageData={},R(c,p),n.loading&&R(s,b),s.innerHTML="",s.appendChild(c),this.renderList(),o.innerHTML="";return M(e,z,u,{once:!0}),this.viewing={abort:function(){X(e,z,u),c.complete?i.imageRendering?i.imageRendering.abort():i.imageInitializing&&i.imageInitializing.abort():(c.src="",X(c,y,d),i.timeout&&clearTimeout(i.timeout))}},c.complete?this.load():(M(c,y,d=function(){X(c,x,m),i.load()},{once:!0}),M(c,x,m=function(){X(c,y,d),i.timeout&&(clearTimeout(i.timeout),i.timeout=!1),F(c,p),n.loading&&F(i.canvas,b)},{once:!0}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){F(c,p),
i.timeout=!1},1e3)),this},prev:function(){var t=this.index-1;return t<0&&(t=0<arguments.length&&void 0!==arguments[0]&&arguments[0]?this.length-1:0),this.view(t),this},next:function(){var t=this.length-1,e=this.index+1;return this.view(e=t<e?0<arguments.length&&void 0!==arguments[0]&&arguments[0]?0:t:e),this},move:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,i=this.imageData;return this.moveTo(D(t)?t:i.x+Number(t),D(e)?e:i.y+Number(e)),this},moveTo:function(t){var e=this,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,o=this.element,s=this.options,a=this.imageData;if(t=Number(t),i=Number(i),this.viewed&&!this.played&&s.movable){var r=a.x,h=a.y,l=!1;if(T(t)?l=!0:t=r,T(i)?l=!0:i=h,l){if(A(s.move)&&M(o,"move",s.move,{once:!0}),!1===P(o,"move",{x:t,y:i,oldX:r,oldY:h,originalEvent:n}))return this;a.x=t,a.y=i,a.left=t,a.top=i,this.moving=!0,this.renderImage(function(){e.moving=!1,A(s.moved)&&M(o,"moved",s.moved,{once:!0}),P(o,"moved",{x:t,y:i,oldX:r,oldY:h,originalEvent:n},{cancelable:!1})})}}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t)),this},rotateTo:function(t){var e=this,i=this.element,n=this.options,o=this.imageData;if(T(t=Number(t))&&this.viewed&&!this.played&&n.rotatable){var s=o.rotate;if(A(n.rotate)&&M(i,"rotate",n.rotate,{once:!0}),!1===P(i,"rotate",{degree:t,oldDegree:s}))return this;o.rotate=t,this.rotating=!0,this.renderImage(function(){e.rotating=!1,A(n.rotated)&&M(i,lt,n.rotated,{once:!0}),P(i,lt,{degree:t,oldDegree:s},{cancelable:!1})})}return this},scaleX:function(t){return this.scale(t,this.imageData.scaleY),this},scaleY:function(t){return this.scale(this.imageData.scaleX,t),this},scale:function(t){var e=this,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,n=this.element,o=this.options,s=this.imageData;if(t=Number(t),i=Number(i),this.viewed&&!this.played&&o.scalable){var a=s.scaleX,r=s.scaleY,h=!1;if(T(t)?h=!0:t=a,T(i)?h=!0:i=r,h){if(A(o.scale)&&M(n,"scale",o.scale,{once:!0}),!1===P(n,"scale",{scaleX:t,scaleY:i,oldScaleX:a,oldScaleY:r}))return this;s.scaleX=t,s.scaleY=i,this.scaling=!0,this.renderImage(function(){e.scaling=!1,A(o.scaled)&&M(n,"scaled",o.scaled,{once:!0}),P(n,"scaled",{scaleX:t,scaleY:i,oldScaleX:a,oldScaleY:r},{cancelable:!1})})}}return this},zoom:function(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1],i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,n=this.imageData;return t=Number(t),this.zoomTo(n.width*(t=t<0?1/(1-t):1+t)/n.naturalWidth,e,i),this},zoomTo:function(t){var i,n,o,e=this,s=1<arguments.length&&void 0!==arguments[1]&&arguments[1],a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,r=3<arguments.length&&void 0!==arguments[3]&&arguments[3],h=this.element,l=this.options,c=this.pointers,u=this.imageData,d=u.x,m=u.y,g=u.width,f=u.height,v=u.naturalWidth,p=u.naturalHeight;if(T(t=Math.max(0,t))&&this.viewed&&!this.played&&(r||l.zoomable)){if(r||(r=Math.max(.01,l.minZoomRatio),w=Math.min(100,l.maxZoomRatio),t=Math.min(Math.max(t,r),w)),a)switch(a.type){case"wheel":.055<=l.zoomRatio&&.95<t&&t<1.05&&(t=1);break;case"pointermove":case"touchmove":case"mousemove":.99<t&&t<1.01&&(t=1)}var b,r=v*t,w=p*t,v=r-g,p=w-f,y=u.ratio;if(A(l.zoom)&&M(h,"zoom",l.zoom,{once:!0}),!1===P(h,"zoom",{ratio:t,oldRatio:y,originalEvent:a}))return this;this.zooming=!0,a?(b={left:(b=(b=this.viewer).getBoundingClientRect()).left+(window.pageXOffset-document.documentElement.clientLeft),top:b.top+(window.pageYOffset-document.documentElement.clientTop)},c=c&&0<Object.keys(c).length?(o=n=i=0,S(c,function(t){var e=t.startX,t=t.startY;i+=e,n+=t,o+=1}),{pageX:i/=o,pageY:n/=o}):{pageX:a.pageX,pageY:a.pageY},u.x-=(c.pageX-b.left-d)/g*v,u.y-=(c.pageY-b.top-m)/f*p):(u.x-=v/2,u.y-=p/2),u.left=u.x,u.top=u.y,u.width=r,u.height=w,u.oldRatio=y,u.ratio=t,this.renderImage(function(){e.zooming=!1,A(l.zoomed)&&M(h,"zoomed",l.zoomed,{once:!0}),P(h,"zoomed",{ratio:t,oldRatio:y,originalEvent:a},{cancelable:!1})}),s&&this.tooltip()}return this},play:function(){var e=this,t=0<arguments.length&&void 0!==arguments[0]&&arguments[0];if(!this.isShown||this.played)return this;var i=this.element,o=this.options;if(A(o.play)&&M(i,"play",o.play,{once:!0}),!1===P(i,"play"))return this;var s=this.player,a=this.loadImage.bind(this),r=[],h=0,l=0;return this.played=!0,this.onLoadWhenPlay=a,t&&this.requestFullscreen(t),R(s,d),S(this.items,function(t,e){var i=t.querySelector("img"),n=document.createElement("img");n.src=Y(i,"originalUrl"),n.alt=i.getAttribute("alt"),n.referrerPolicy=i.referrerPolicy,h+=1,R(n,H),N(n,m,o.transition),L(t,f)&&(R(n,u),l=e),r.push(n),M(n,y,a,{once:!0}),s.appendChild(n)}),T(o.interval)&&0<o.interval&&1<h&&function t(){e.playing=setTimeout(function(){F(r[l],u),R(r[l=(l+=1)<h?l:0],u),t()},o.interval)}(),this},stop:function(){var e=this;if(!this.played)return this;var t=this.element,i=this.options;if(A(i.stop)&&M(t,"stop",i.stop,{once:!0}),!1===P(t,"stop"))return this;i=this.player;return this.played=!1,clearTimeout(this.playing),S(i.getElementsByTagName("img"),function(t){X(t,y,e.onLoadWhenPlay)}),F(i,d),i.innerHTML="",this.exitFullscreen(),this},full:function(){var t=this,e=this.options,i=this.viewer,n=this.image,o=this.list;return!this.isShown||this.played||this.fulled||!e.inline||(this.fulled=!0,this.open(),R(this.button,U),e.transition&&(F(o,m),this.viewed&&F(n,m)),R(i,B),i.setAttribute("role","dialog"),i.setAttribute("aria-labelledby",this.title.id),i.setAttribute("aria-modal",!0),i.removeAttribute("style"),C(i,{zIndex:e.zIndex}),e.focus&&this.enforceFocus(),this.initContainer(),this.viewerData=O({},this.containerData),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage(function(){e.transition&&setTimeout(function(){R(n,m),R(o,m)},0)})})),this},exit:function(){var t=this,e=this.options,i=this.viewer,n=this.image,o=this.list;return this.isShown&&!this.played&&this.fulled&&e.inline&&(this.fulled=!1,this.close(),F(this.button,U),e.transition&&(F(o,m),this.viewed&&F(n,m)),e.focus&&this.clearEnforceFocus(),i.removeAttribute("role"),i.removeAttribute("aria-labelledby"),i.removeAttribute("aria-modal"),F(i,B),C(i,{zIndex:e.zIndexInline}),this.viewerData=O({},this.parentData),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage(function(){e.transition&&setTimeout(function(){R(n,m),R(o,m)},0)})})),this},tooltip:function(){var t=this,e=this.options,i=this.tooltipBox,n=this.imageData;return this.viewed&&!this.played&&e.tooltip&&(i.textContent="".concat(Math.round(100*n.ratio),"%"),this.tooltipping?clearTimeout(this.tooltipping):e.transition?(this.fading&&P(i,k),R(i,d),R(i,H),R(i,m),i.removeAttribute("aria-hidden"),i.initialOffsetWidth=i.offsetWidth,R(i,u)):(R(i,d),i.removeAttribute("aria-hidden")),this.tooltipping=setTimeout(function(){e.transition?(M(i,k,function(){F(i,d),F(i,H),F(i,m),i.setAttribute("aria-hidden",!0),t.fading=!1},{once:!0}),F(i,u),t.fading=!0):(F(i,d),i.setAttribute("aria-hidden",!0)),t.tooltipping=!1},1e3)),this},toggle:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;return 1===this.imageData.ratio?this.zoomTo(this.imageData.oldRatio,!0,t):this.zoomTo(1,!0,t),this},reset:function(){return this.viewed&&!this.played&&(this.imageData=O({},this.initialImageData),this.renderImage()),this},update:function(){var e=this,t=this.element,i=this.options,n=this.isImg;if(n&&!t.parentNode)return this.destroy();var o,s=[];return S(n?[t]:t.querySelectorAll("img"),function(t){A(i.filter)?i.filter.call(e,t)&&s.push(t):e.getImageURL(t)&&s.push(t)}),s.length&&(this.images=s,this.length=s.length,this.ready?(o=[],S(this.items,function(t,e){var t=t.querySelector("img"),i=s[e];i&&t&&i.src===t.src&&i.alt===t.alt||o.push(e)}),C(this.list,{width:"auto"}),this.initList(),this.isShown&&(this.length?this.viewed&&(0<=(n=o.indexOf(this.index))?(this.viewed=!1,this.view(Math.max(Math.min(this.index-n,this.length-1),0))):(R(t=this.items[this.index],f),t.setAttribute("aria-selected",!0))):(this.image=null,this.viewed=!1,this.index=0,this.imageData={},this.canvas.innerHTML="",this.title.innerHTML=""))):this.build()),this},destroy:function(){var t=this.element,e=this.options;return t[g]&&(this.destroyed=!0,this.ready?(this.played&&this.stop(),e.inline?(this.fulled&&this.exit(),this.unbind()):this.isShown?(this.viewing&&(this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort()),this.hiding&&this.transitioning.abort(),this.hidden()):this.showing&&(this.transitioning.abort(),this.hidden()),this.ready=!1,this.viewer.parentNode.removeChild(this.viewer)):e.inline&&(this.delaying?this.delaying.abort():this.initializing&&this.initializing.abort()),e.inline||X(t,w,this.onStart),t[g]=void 0),this}},Ot={getImageURL:function(t){var e=this.options.url;return e=E(e)?t.getAttribute(e):A(e)?e.call(this,t):""},enforceFocus:function(){var n=this;this.clearEnforceFocus(),M(document,tt,this.onFocusin=function(t){var e=n.viewer,i=t.target;if(i!==document&&i!==e&&!e.contains(i)){for(;i;){if(null!==i.getAttribute("tabindex")||"true"===i.getAttribute("aria-modal"))return;i=i.parentElement}e.focus()}})},clearEnforceFocus:function(){this.onFocusin&&(X(document,tt,this.onFocusin),this.onFocusin=null)},open:function(){var t=this.body;R(t,G),t.style.paddingRight="".concat(this.scrollbarWidth+(parseFloat(this.initialBodyComputedPaddingRight)||0),"px")},close:function(){var t=this.body;F(t,G),t.style.paddingRight=this.initialBodyPaddingRight},shown:function(){var t=this.element,e=this.options,i=this.viewer;this.fulled=!0,this.isShown=!0,this.render(),this.bind(),this.showing=!1,e.focus&&(i.focus(),this.enforceFocus()),A(e.shown)&&M(t,"shown",e.shown,{once:!0}),!1!==P(t,"shown")&&this.ready&&this.isShown&&!this.hiding&&this.view(this.index)},hidden:function(){var t=this.element,e=this.options,i=this.viewer;e.fucus&&this.clearEnforceFocus(),this.fulled=!
1,this.viewed=!1,this.isShown=!1,this.close(),this.unbind(),R(i,v),i.removeAttribute("role"),i.removeAttribute("aria-labelledby"),i.removeAttribute("aria-modal"),i.setAttribute("aria-hidden",!0),this.resetList(),this.resetImage(),this.hiding=!1,this.destroyed||(A(e.hidden)&&M(t,"hidden",e.hidden,{once:!0}),P(t,"hidden",null,{cancelable:!1}))},requestFullscreen:function(t){var e=this.element.ownerDocument;this.fulled&&!(e.fullscreenElement||e.webkitFullscreenElement||e.mozFullScreenElement||e.msFullscreenElement)&&((e=e.documentElement).requestFullscreen?I(t)?e.requestFullscreen(t):e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen&&e.msRequestFullscreen())},exitFullscreen:function(){var t=this.element.ownerDocument;this.fulled&&(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)&&(t.exitFullscreen?t.exitFullscreen():t.webkitExitFullscreen?t.webkitExitFullscreen():t.mozCancelFullScreen?t.mozCancelFullScreen():t.msExitFullscreen&&t.msExitFullscreen())},change:function(t){var e=this.options,i=this.pointers,n=i[Object.keys(i)[0]];if(n){var s,a,o=n.endX-n.startX,r=n.endY-n.startY;switch(this.action){case l:this.move(o,r,t);break;case c:this.zoom((s=q({},h=i),a=[],S(h,function(o,t){delete s[t],S(s,function(t){var e=Math.abs(o.startX-t.startX),i=Math.abs(o.startY-t.startY),n=Math.abs(o.endX-t.endX),t=Math.abs(o.endY-t.endY),e=Math.sqrt(e*e+i*i),i=Math.sqrt(n*n+t*t);a.push((i-e)/e)})}),a.sort(function(t,e){return Math.abs(t)<Math.abs(e)}),a[0]),!1,t);break;case W:this.action="switched";var h=Math.abs(o);1<h&&h>Math.abs(r)&&(this.pointers={},1<o?this.prev(e.loop):o<-1&&this.next(e.loop))}S(i,function(t){t.startX=t.endX,t.startY=t.endY})}},isSwitchable:function(){var t=this.imageData,e=this.viewerData;return 1<this.length&&0<=t.x&&0<=t.y&&t.width<=e.width&&t.height<=e.height}},Ct=e.Viewer,Lt=(It=-1,function(){return It+=1}),e=function(){function o(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},i=this,n=o;if(!(i instanceof n))throw new TypeError("Cannot call a class as a function");if(!t||1!==t.nodeType)throw new Error("The first argument is required and must be an element.");this.element=t,this.options=O({},h,I(e)&&e),this.action=!1,this.fading=!1,this.fulled=!1,this.hiding=!1,this.imageClicked=!1,this.imageData={},this.index=this.options.initialViewIndex,this.isImg=!1,this.isShown=!1,this.length=0,this.moving=!1,this.played=!1,this.playing=!1,this.pointers={},this.ready=!1,this.rotating=!1,this.scaling=!1,this.showing=!1,this.timeout=!1,this.tooltipping=!1,this.viewed=!1,this.viewing=!1,this.wheeling=!1,this.zooming=!1,this.id=Lt(),this.init()}var t,e,i;return t=o,i=[{key:"noConflict",value:function(){return window.Viewer=Ct,o}},{key:"setDefaults",value:function(t){O(h,I(t)&&t)}}],(e=[{key:"init",value:function(){var t,e,i,n,o=this,s=this.element,a=this.options;s[g]||(s[g]=this,a.focus&&!a.keyboard&&(a.focus=!1),t="img"===s.localName,e=[],S(t?[s]:s.querySelectorAll("img"),function(t){A(a.filter)?a.filter.call(o,t)&&e.push(t):o.getImageURL(t)&&e.push(t)}),this.isImg=t,this.length=e.length,this.images=e,this.initBody(),D(document.createElement(g).style.transition)&&(a.transition=!1),a.inline?(i=0,n=function(){var t;(i+=1)===o.length&&(o.initializing=!1,o.delaying={abort:function(){clearTimeout(t)}},t=setTimeout(function(){o.delaying=!1,o.build()},0))},this.initializing={abort:function(){S(e,function(t){t.complete||(X(t,y,n),X(t,x,n))})}},S(e,function(t){var e,i;t.complete?n():(M(t,y,e=function(){X(t,x,i),n()},{once:!0}),M(t,x,i=function(){X(t,y,e),n()},{once:!0}))})):M(s,w,this.onStart=function(t){t=t.target;"img"!==t.localName||A(a.filter)&&!a.filter.call(o,t)||o.view(o.images.indexOf(t))}))}},{key:"build",value:function(){var t,s,e,i,n,o,a,r,h,l,c,u,d,m;this.ready||(t=this.element,s=this.options,e=t.parentNode,(d=document.createElement("div")).innerHTML='<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list" role="navigation"></ul></div></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button"></div><div class="viewer-player"></div></div>',d=(i=d.querySelector(".".concat(g,"-container"))).querySelector(".".concat(g,"-title")),n=i.querySelector(".".concat(g,"-toolbar")),m=i.querySelector(".".concat(g,"-navbar")),o=i.querySelector(".".concat(g,"-button")),a=i.querySelector(".".concat(g,"-canvas")),this.parent=e,this.viewer=i,this.title=d,this.toolbar=n,this.navbar=m,this.button=o,this.canvas=a,this.footer=i.querySelector(".".concat(g,"-footer")),this.tooltipBox=i.querySelector(".".concat(g,"-tooltip")),this.player=i.querySelector(".".concat(g,"-player")),this.list=i.querySelector(".".concat(g,"-list")),i.id="".concat(g).concat(this.id),d.id="".concat(g,"Title").concat(this.id),R(d,s.title?Tt(Array.isArray(s.title)?s.title[0]:s.title):v),R(m,s.navbar?Tt(s.navbar):v),N(o,v,!s.button),s.keyboard&&o.setAttribute("tabindex",0),s.backdrop&&(R(i,"".concat(g,"-backdrop")),s.inline||"static"===s.backdrop||bt(a,ct,"hide")),E(s.className)&&s.className&&s.className.split(ut).forEach(function(t){R(i,t)}),s.toolbar?(r=document.createElement("ul"),h=I(s.toolbar),l=dt.slice(0,3),c=dt.slice(7,9),u=dt.slice(9),h||R(n,Tt(s.toolbar)),S(h?s.toolbar:dt,function(t,e){var i,n=h&&I(t),e=h?pt(e):t,o=n&&!D(t.show)?t.show:t;!o||!s.zoomable&&-1!==l.indexOf(e)||!s.rotatable&&-1!==c.indexOf(e)||!s.scalable&&-1!==u.indexOf(e)||(i=n&&!D(t.size)?t.size:t,n=n&&!D(t.click)?t.click:t,t=document.createElement("li"),s.keyboard&&t.setAttribute("tabindex",0),t.setAttribute("role","button"),R(t,"".concat(g,"-").concat(e)),A(n)||bt(t,ct,e),T(o)&&R(t,Tt(o)),-1!==["small","large"].indexOf(i)?R(t,"".concat(g,"-").concat(i)):"play"===e&&R(t,"".concat(g,"-large")),A(n)&&M(t,w,n),r.appendChild(t))}),n.appendChild(r)):R(n,v),s.rotatable||(R(d=n.querySelectorAll('li[class*="rotate"]'),p),S(d,function(t){n.appendChild(t)})),s.inline?(R(o,V),C(i,{zIndex:s.zIndexInline}),"static"===window.getComputedStyle(e).position&&C(e,{position:"relative"}),e.insertBefore(i,t.nextSibling)):(R(o,j),R(i,B),R(i,H),R(i,v),C(i,{zIndex:s.zIndex}),(m=(m=E(m=s.container)?t.ownerDocument.querySelector(m):m)||this.body).appendChild(i)),s.inline&&(this.render(),this.bind(),this.isShown=!0),this.ready=!0,A(s.ready)&&M(t,rt,s.ready,{once:!0}),!1===P(t,rt)?this.ready=!1:this.ready&&s.inline&&this.view(this.index))}}])&&r(t.prototype,e),i&&r(t,i),Object.defineProperty(t,"prototype",{writable:!1}),o}();return O(e.prototype,i,t,At,St,Ot),e});

        $('footer').append($('.auclting')); // hide front page items

        let interval = setInterval(() => {
            if (M) { // wait materialize
                clearInterval(interval);
                const params = new URLSearchParams(window.location.search);
                const action = params.get('action');
                if (action) {
                    const callback = (params) => {
                        if (params.get('ru')) {
                            params.delete('action');
                            const ru = decodeURIComponent(params.get('ru'));
                            params.delete('ru');
                            const d = params.get('d');
                            params.delete('d');
                            let domain = '';
                            if (d && d === '1') domain = URL_PROPSTORE;
                            const paramsSymbol = ru.includes('?') ? '&' : '?';
                            redirectPage(domain + ru + paramsSymbol + params.toString());
                        }
                    }
                    if (action == 'signout') {
                        $.get('/logout').always(() => callback(params));
                    } else {
                        $.get(action).always(() => callback(new URLSearchParams(action)));
                    }
                }

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

// $('#headsec').remove();
                $('body').prepend($('.auc-header'));
                $('body').append($('.auc-sidenav'));
                $('<main>').append($('#wrapper')).insertAfter($('.auc-header'));
                if (!$('.container').length) $('#wrapper').append('<div class="container">');
                $('body').append('<div id="div-hidden" style="display:none;">');

                let isSignedIn = !$('#headsec li[title="Auction Login"]').length && !$('#headsec li[title="Login"]').length;

                function addProductZoom() {
                    $('#modal-product-gallery .carousel-item').each((index, item) => {
                        const url = item.style.backgroundImage.slice(4, -1).replace(/["']/g, '');
                        $(item).append('<img src="' + url + '" class="zoom-viewer"/>');
                    });
                }

                function addProductGallery() {
                    const $productItems = $('.product__slider .carousel-item');
                    const $productThumbnails = $('.product__thumbnail');
                    if ($productItems.length && $productThumbnails.length) {
                        $('.modal-gallery__carousel').append('<div class="preloader-wrapper active"><div class="spinner-layer spinner-white-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');
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
                    let modalSlider;
                    let zoomViewer;
                    function modalCarousel () {
                        if (modalSlider && modalSlider[0]) modalSlider[0].destroy();
                        modalSlider = M.Carousel.init($('#modal-product-gallery').find('.modal-gallery__carousel'), {
                            fullWidth: true,
                            indicators: true,
                            onCycleTo: function(item, dragged) {
                                if ($(item).find('.zoom-viewer').length) {
                                    if (zoomViewer) {
                                        zoomViewer.destroy();
                                        $('.zoom-viewer__toggler').remove();
                                    }
                                    zoomViewer = new Viewer($(item).find('.zoom-viewer')[0], {
                                        navbar: false,
                                        title: false,
                                        toolbar: false,
                                        zoomRatio: .5,
                                        viewed() { zoomViewer.zoomTo(1.5); },
                                    });
                                    $('#modal-product-gallery').append('<div class="zoom-viewer__toggler">');
                                    $('.zoom-viewer__toggler').on('click', ()=>{
                                        zoomViewer.show();
                                    });
                                }
                            },
                        });
                    }
                    M.Modal.init(document.querySelectorAll('#modal-product-gallery'), {
                        opacity: .75,
                        onCloseStart: (el) => {
                            if (modalSlider && modalSlider[0]) modalSlider[0].destroy();
                            $(window).off('resize', modalCarousel);
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
                        }
                    });
                }

                /**
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 * PRODUCT
                 */

                if ($('body').hasClass('lot-details-index')) {
                    $('footer').append(`
<div class="product aucproduct">
<div class="product__inner">
    <div class="product__gallery">
        <div class="product__slider">
            <div class="carousel-item modal-trigger" href="#modal-product-gallery"></div>
        </div>
        <div class="product__thumbnails">
            <div class="product__thumbnails-scroll">
                <div class="product__thumbnail modal-trigger" href="#modal-product-gallery"></div>
            </div>
        </div>
        <div id="modal-product-gallery" class="modal-gallery" style="display: none;">
            <div class="modal-gallery__carousel">
                <div class="carousel-item"></div>
            </div>
        </div>
    </div>
    <div class="product__info">
        <div class="product__number"></div>
        <div class="product__title h2"></div>

        <div class="aucproduct__details">
            <div class="aucproduct__details-line"></div>
        </div>

        <div class="aucproduct__button"></div>

        <div class="aucproduct__form" style="display: none;"></div>
        
        <div class="product__buttons-grey" style="display: none;">
            <span class="product__button-grey waves-effect waves-grey btn btn--secondary modal-trigger" href="#modal-shipping-quote" id="modal-shipping-quote-button" style="display: none;">
                <i class='icon'><svg><use xlink:href="#globe"></use></svg></i>
                <span class="product__buttons-grey-small">Get</span> Shipping Quote

                <div id="modal-shipping-quote" class="modal modal-shipping-quote modal-ajax">
                    <div class="modal-header modal-header--sticky">
                        <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
                    </div>
                    <form class="modal-content modal-form modal-shipping-quote-form" action="/ajax/modalShippingQuoteSubmit.action"></form>
                    <div class="modal__loader"><div class="preloader-wrapper active"><div class="spinner-layer"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>
                </div>
            </span>
        </div>

        <ul class="product__details collapsible expandable">
            <li class="product__detail active">
                <div class="product__detail-title collapsible-header">
                    Our expert&rsquo;s notes
                    <i class='icon icon--dropdown'><svg><use xlink:href="#drop"></use></svg></i>
                </div>
                <div class='collapsible-body'></div>
            </li>
        </ul>

        <div class="aucproduct__buttons">
            <a class="waves-effect waves-grey btn btn--secondary modal-trigger" href="#modal-buyers-guide">
                <span class="hide-on-small-only">Buyers</span> guide
            </a>
            <a class="waves-effect waves-grey btn btn--secondary modal-trigger" href="#modal-shipping">
                Shipping info
            </a>
            <a class="waves-effect waves-grey btn btn--secondary modal-trigger" href="#modal-terms">
                Terms
            </a>
        </div>

        <a class="product__certificate" href="/certificate-of-authenticity/" style="display: none;">
            <div class="product__certificate-icon">
                <svg class="product__certificate-img"><use xlink:href="#big-authentic"></use></svg>
            </div>
            <div class="product__certificate-info">
                This item comes with a Propstore
                <span class="product__certificate-link">Certificate of Authenticity</span>
            </div>
        </a>

        <div class="aucproduct__certificate" style="display: none;"></div>

        <div class="share product__share">
            <span class="share__title">
                Share
            </span>
            <a href="https://www.facebook.com/share.php?u=" target="_blank" rel="noreferrer" class="waves-effect btn-flat btn--icon share__item">
                <i class='icon'><svg><use xlink:href="#follow-facebook"></use></svg></i>
            </a>
            <a href="https://twitter.com/intent/tweet?url=" target="_blank" rel="noreferrer" class="waves-effect btn-flat btn--icon share__item">
                <i class='icon'><svg><use xlink:href="#follow-twitter"></use></svg></i>
            </a>
        </div>
    </div>
</div>
</div>

<div class="also-like aucproduct__also">
<div class="also-like__title h3">Other lots in this auction</div>
<div class="cards">
<div class="cards__inner">
    <div class="cards__list"></div>
    <div class="also-like__arrows">
        <a href="#left" class="also-like__arrow also-like__arrow--left"></a>    
        <a href="#right" class="also-like__arrow also-like__arrow--right"></a>    
    </div>
</div>
</div>
</div>

<div id="modal-buyers-guide" class="modal">
<div class="modal-header modal-header--sticky">
    <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
</div>
<div class="modal-content"></div>
</div>

<div id="modal-shipping" class="modal">
<div class="modal-header modal-header--sticky">
    <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
</div>
<div class="modal-content"></div>
</div>

<div id="modal-terms" class="modal">
<div class="modal-header modal-header--sticky">
    <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
</div>
<div class="modal-content"></div>
</div>
`);
                    document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
                    const auctionId = (
                        sam &&
                        sam.serverData &&
                        sam.serverData.variables &&
                        sam.serverData.variables.default &&
                        sam.serverData.variables.default.auctionId
                    ) || 0;
                    let status;
                    if ($('.sale-closed').length) status = 'closed';

                    // requestAnimationFrame(() => {
                    //     const heroImage = window.getComputedStyle(document.querySelector('.hero__image'));
                    //     const aucPoster = window.getComputedStyle(document.querySelector('.bodybox'), ':before');
                    //     const backgroundImage = aucPoster.backgroundImage !== 'none' ? aucPoster.backgroundImage : heroImage.backgroundImage;
                    //     $('.hero__image').css({ backgroundImage });
                    // });

                    $aucTitle = $('.tle-lot h3').clone();
                    $aucTitle.find('span').remove();
                    $('.hero__static-title').html($aucTitle.text());

                    const dates = [];
                    let start_date = $('#auction_start_date').text();
                    if (start_date) dates.push(moment(start_date).format('MMM D YYYY'));
                    let end_date = $('#auction_end_date').text();
                    if (end_date) dates.push(moment(end_date).format('MMM D YYYY'));
                    if (dates.length) {
                        $('.hero__static-date').append(dates.join(' &minus; ')).show();
                    }

                    if (status) {
                        $badge = $('.auc__hero .badge');
                        switch (status) {
                            case 'closed':
                                $badge.addClass('red').append('Ended').show().find('use').attr('xlink:href', '#flag');
                                break;
                        }
                    }

                    $itemTitleH = $('.tle-lot + h3');
                    $itemTitle = $itemTitleH.find('.lot-name');
                    $itemTitleH.find('.lot-name').remove();
                    $('.product__number').html($itemTitleH.text());
                    $('.product__title').html($itemTitle.text());
                    $('.auc__hero-aucinfo').attr('href', $('.aucinfo').attr('href')).show();
                    $('.auc__hero-auccatalog').attr('href', $('.catlg').attr('href')).show();


                    if ($('.description-info-content .product__gallery').length) {
                        $('.product__inner .product__gallery').remove();
                        $('.product__gallery').prependTo('.product__inner');
                        addProductZoom();
                    } else {
                        $carouselItem = $('.product__slider .carousel-item').clone();
                        $slider = $('.product__slider').html('');
                        $thumbnailsItem = $('.product__thumbnail').clone();
                        $thumbnails = $('.product__thumbnails-scroll').html('');
                        $galleryItem = $('.modal-gallery__carousel .carousel-item').clone();
                        $gallery = $('.modal-gallery__carousel').html('');

                        const imgsLength = $('.image-thumb-slide').length;
                        let imgsLoaded = 0;
                        $('.image-thumb-slide').each((i, item) => {
                            const img = { backgroundImage: 'url(' + item.href + ')' };
                            let image = !i ? item.dataset.image.replace('_8.', '_0.') : item.dataset.image; // replace first image with _0
                            const imgPrev = { backgroundImage: 'url(' + image + ')' };
                            const imgThumbnail = { backgroundImage: 'url(' + (!i ? item.dataset.image : item.dataset.image.replace('_8.', '_4.')) + ')' };
                            $carouselItemNew = $carouselItem.clone();
                            $slider.append($carouselItemNew);
                            setTimeout(() => {
                                $slider.find('.carousel-item').eq(i).css(imgPrev);
                                if (!i) return; // first is already _0

                                const $img = $('<img src="' + image + '">');
                                $('#div-hidden').append($img);
                                $img.on('load', () => {
                                    $thumbnails.find('.product__thumbnail').eq(i).css(imgPrev);
                                    imgsLoaded++;
                                    let interval = setInterval(()=>{ // start load big images after 80% default images loaded
                                        if (imgsLoaded >= imgsLength * .8 &&
                                            document.body.classList.contains('loaded')) {
                                            clearInterval(interval);
                                            setTimeout(() => {
                                                image = image.replace('_8.', '_0.');
                                                const $img = $('<img src="' + image + '">');
                                                $('#div-hidden').append($img);
                                                $img.on('load', () => {
                                                    $slider.find('.carousel-item').eq(i).css({ backgroundImage: 'url(' + image + ')' });
                                                });
                                            }, 2000 + i * 100); // to defer full img load
                                        }
                                    }, 1000);
                                });
                            }, 100 * i); // to defer preview load
                            $thumbnailsItemNew = $thumbnailsItem.clone();
                            $thumbnails.append($thumbnailsItemNew.css(imgThumbnail));
                            $galleryItemNew = $galleryItem.clone();
                            $gallery.append($galleryItemNew);
                            $gallery.find('.carousel-item').eq(i).css(img);
                            item.remove();
                        });
                    }

                    $liveSale = $('.live-sale a');
                    if ($liveSale.length) {
                        $liveSale.addClass('waves-effect waves-light btn btn--tertiary aucproduct__livesale-link');
                        $('<div class="aucproduct__livesale">').append($liveSale).insertBefore('.aucproduct__details');
                    }

                    $detailsLine = $('.aucproduct__details-line').clone();
                    $details = $('.aucproduct__details');
                    $details.html('');

                    $curBidLabel = $('#bidStatus');
                    if ($curBidLabel.length) {
                        $lineCurBid = $detailsLine.clone();
                        $lineCurBid.append($curBidLabel, ' ', $('#currentBid'), ' ', $('#bidHistory'));
                        $details.append($lineCurBid);
                    }

                    $askingLabel = $('.askingbid');
                    if ($askingLabel.length) {
                        $lineAsking = $detailsLine.clone();
                        $lineAsking.append($askingLabel, ' ', $('<strong>').append($('#asking').parent('span')));
                        $details.append($lineAsking);
                    }

                    $estimateTimed = $('#estimate-timed');
                    if ($estimateTimed.length) {
                        $lineEstimateTimed = $detailsLine.clone();
                        $estimateTimedLabel = $estimateTimed.find('span:first-child');
                        $estimateTimedLabel.appendTo($lineEstimateTimed);
                        $lineEstimateTimed.append(': ', $('<strong>').append($estimateTimed.html()));
                        $details.append($lineEstimateTimed);
                    }

                    $timeLeft = $('.time-left');
                    if ($timeLeft.length) {
                        $lineTimeLeft = $detailsLine.clone();
                        $lineTimeLeft.append($timeLeft);
                        $details.append($lineTimeLeft);
                    }

                    $nextBid = $('.bidfrm .next-bid');
                    if ($nextBid.length) {
                        $nextBid.addClass('waves-effect waves-light btn aucproduct__form-item');
                        $('.aucproduct__button').show().append($nextBid);
                    }

                    $bidInput = $('.maxbid, .mxbid-input');
                    if ($bidInput.length) {
                        $bidInput.addClass('aucproduct__form-item');
                        $('.aucproduct__form').show().append($bidInput);
                    }

                    $btnPlaceBid = $('.bidfrm .place-bid');
                    if ($btnPlaceBid.length) {
                        $btnPlaceBid.addClass('waves-effect waves-light btn aucproduct__form-item');
                        $('.aucproduct__form').show().append($btnPlaceBid);

                        $('#div-hidden').append('<div id="customRegisterButton' + auctionId + '">');
                        const customRegisterButtonBefore = window.getComputedStyle(document.querySelector('#customRegisterButton' + auctionId), ':before');
                        const customRegisterButtonAfter = window.getComputedStyle(document.querySelector('#customRegisterButton' + auctionId), ':after');
                        const customRegisterButtonUrl = customRegisterButtonBefore && customRegisterButtonBefore.content && customRegisterButtonBefore.content != 'none' ? customRegisterButtonBefore.content.replaceAll('"', '') : null;
                        const customRegisterButtonTitle = customRegisterButtonAfter && customRegisterButtonAfter.content && customRegisterButtonAfter.content != 'none' ? customRegisterButtonAfter.content.replaceAll('"', '') : null;

                        const replaceClick = () => {
                            $btnPlaceBid[0].onclick = null;
                            if (customRegisterButtonUrl) {
                                $btnPlaceBid.on('click', function (e) {
                                    e.preventDefault();
                                    window.open(customRegisterButtonUrl);
                                });
                            } else {
                                $btnPlaceBid.on('click', function (e) {
                                    e.preventDefault();
                                    openAuctionRegistration(auctionId);
                                });
                            }
                        }
                        let val = $btnPlaceBid.val();
                        if (val.includes('Login to bid')) {
                            $btnPlaceBid.val(customRegisterButtonTitle || 'Sign in to bid');
                            replaceClick();
                        } else if (val.includes('Register to bid')) {
                            $btnPlaceBid.val(customRegisterButtonTitle || 'Register for auction');
                            replaceClick();
                        }
                    }

                    $win = $('#lac28, #oai21');
                    if ($win.length) {
                        $winVal = $win.find('span');
                        $win.find('span').remove();
                        $lineWin = $detailsLine.clone();

                        if (isSignedIn) {
                            $lineWin.html($win.text());
                            if ($winVal.length) {
                                $winVal.append(' ').append($('.biddingHistoryLink'));
                                $lineWin.html($lineWin.html() + ' <strong>' + $winVal.html() + '</strong>');
                            }
                        } else {
                            $lineWin.html(`<div class="product__price sso-trigger">
                <i class='icon product__price-sold'>?</i>
                <span class="product__price-sold-login">
                Login to See Winning Bid
            </span></div>`);
                        }

                        $details.append($lineWin);
                    }

                    $absentee = $('#blkAbs');
                    if ($absentee.length) {
                        $line = $detailsLine.clone();
                        let html = $absentee.html();
                        $line.html(html);
                        let arr = html.split(':');
                        if (arr.length && arr.length > 1) {
                            let result = arr[0] + ':';
                            arr = arr[1].split('(');
                            if (arr.length && arr.length > 1) {
                                result += '<strong>' + arr[0] + '</strong>';
                                result += ' (' + arr[1];
                                $line.html(result);
                            }
                        }
                        $details.append($line);
                    }

                    $estimate = $('.estimate');
                    $estimateVal = $('.estimate-val');
                    if ($estimate.length && $estimateVal.length) {
                        $line = $detailsLine.clone();
                        $line.html($estimate.text() + ' <strong>' + $estimateVal.html() + '</strong>');
                        $details.append($line);
                    }

                    $starting = $('.starting');
                    $startingVal = $('.starting-val');
                    if ($starting.length && $startingVal.length) {
                        $line = $detailsLine.clone();
                        $line.html($starting.text() + ' <strong>' + $startingVal.html() + '</strong>');
                        $details.append($line);
                    }

                    function getBarcodeFromJS() {
                        let barcode = null;
                        $('.description-info-content').find('*')
                            .contents().each((i, element) => {
                            if (element.nodeType == 3) {
                                const arr = element.textContent.split('/proxy/shipping-quote/');
                                if (arr.length > 1) {
                                    barcode = parseInt(arr[1], 10);
                                }
                            }
                        });
                        return barcode;
                    };

                    let barcode;
                    if (status !== 'closed') {
                        $barcode = $('#barcode');
                        barcode = $barcode.length ? $barcode.val() : null;
                        if (!barcode || barcode == 'Not Available') barcode = getBarcodeFromJS(); // old auctions
                    }
                    if (barcode) {
                        $('body').append($('#modal-shipping-quote'));
                        $('#modal-shipping-quote-button').show();
                        $('.product__buttons-grey').show();

                        // MODAL SHIPPING QUOTE
                        M.Modal.init(document.querySelectorAll('#modal-shipping-quote'), { // load form on modal open
                            onOpenStart: function (el, trigger) {
                                el.classList.add('sync');
                                const $form = $(el).find('.modal-shipping-quote-form');
                                const url = URL_PROPSTORE + '/ajax/modalShippingQuote.action?product=' + barcode;
                                $.get({
                                    url,
                                    XHRFields: {
                                        withCredentials: true,
                                    }
                                })
                                    .done(data => {
                                        if (!checkResponse(data)) return data;

                                        $form.html(data);
                                        M.updateTextFields();
                                        M.FormSelect.init(document.querySelectorAll('select'), {dropdownOptions: {container: document.body}});
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
                            $.post({
                                url: URL_PROPSTORE + $(this).attr('action'),
                                data,
                                contentType: 'application/x-www-form-urlencoded',
                                XHRFields: {
                                    withCredentials: true,
                                }
                            })
                                .done(data => {
                                    if (!checkResponse(data)) return data;

                                    this.innerHTML = data;
                                    M.updateTextFields();
                                    M.FormSelect.init(document.querySelectorAll('select'), {dropdownOptions: {container: document.body}});
                                    grecaptchaRender('g-recaptcha-quote');
                                })
                                .fail(data => {
                                    if (data && data.statusText) this.innerHTML = data.statusText;
                                })
                                .always(data => {
                                    this.classList.remove('sync');
                                });
                        });
                    } else {
                        $('#modal-shipping-quote-button').remove();
                    }

                    $watchlist = $('#watchlist_button');
                    if ($watchlist.length) {
                        $watchlist.addClass('waves-effect waves-grey btn btn--secondary product__button-grey');
                        $watchlist.find('.remove-watch').html('<i class="icon"><svg><use xlink:href="#heart-fill"></use></svg></i> <span class="product__buttons-grey-small">In</span> Watchlist');
                        $watchlist.find('.add-watch').html('<i class="icon"><svg><use xlink:href="#heart"></use></svg></i> <span class="product__buttons-grey-small">Add to</span> Watchlist');
                        $('.product__buttons-grey').show().append($watchlist);
                    }

                    if ($('.product-description-content').length) {
                        $('.product__detail .collapsible-body').append($('.product-description-content'));
                    } else {
                        $('.product__detail .collapsible-body').append($('.l1desctextwhite, .l2desctextwhite, .l3desctextwhite'));
                    }
                    $('#modal-buyers-guide .modal-content').append($('#buyers-content'));
                    $('body').append($('#modal-buyers-guide'));

                    $('#modal-shipping .modal-content').append($('.shipping-info-content'));
                    $('body').append($('#modal-shipping'));

                    $('#modal-terms .modal-content').append($('.terms-content'));
                    $('body').append($('#modal-terms'));

                    if ($('.description-info-content-coa, .description-info-content :contains("Certificate of Authenticity")').length) {
                        if (!$('.product__certificate').attr('href').includes('http')) {
                            $('.product__certificate').attr('href', URL_PROPSTORE + $('.product__certificate').attr('href'));
                        }
                        $('.product__certificate').show();
                    }
                    $originalNote = $('.description-info-content-coa-note, .description-info-content p:contains("used in the production")');
                    if ($originalNote.length) {
                        $('.aucproduct__certificate').html($originalNote.html()).show();
                    }

                    $('.share__item').each((index, item) => {
                        item.href += window.location.href;
                    });

                    $('.container').prepend($('.aucproduct__also'));
                    $('.container').prepend($('.aucproduct'));
                    $('.container').prepend($('.auc__hero').show());

                    addProductGallery();

                    let interval = setInterval(() => { // listen ajax updates
                        $others = $('#pnlOtherLots .lot');
                        if ($others.length) {
                            clearInterval(interval);
                            $list = $('.cards__list');
                            $list.html('');
                            $others.each((index, item) => {
                                $img = $('<div class="card__img">');
                                $img.css('background-image', 'url(' + $(item).find('.other-lots-image').prop('src').replace('_4.', '_6.') + ')');
                                $title = $('<div class="card__movie">').html($(item).find('.lot-description-timed').html());
                                $list.append($(item).addClass('card aucproduct__card').html('').append($img, $('<div class="card__info">').append($('<div class="card__description">').append($title))));
                            });
                        }
                    }, 1000);

                    $('.also-like__arrow--left').on('click', function (e) {
                        e.preventDefault();
                        $('#prev')[0].click();
                    });

                    $('.also-like__arrow--right').on('click', function (e) {
                        e.preventDefault();
                        $('#next')[0].click();
                    });

                    function giveLotViewCalendarButtonsLinks(){
                        const lotName = $itemTitle.text();
                        const $outlookCalendarBtn = $('#outlookCalendarBtn');
                        $outlookCalendarBtn.html('Outlook');
                        const outlookHref = generateICSFileURL(escape(lotName), window.location.href);
                        $outlookCalendarBtn.on('click', function(e){
                            e.preventDefault();
                            window.open(outlookHref, '_blank');
                        });

                        const $googleCalendarBtn = $('#googleCalendarBtn');
                        $googleCalendarBtn.html('Google');
                        const googleHref = generateGoogleCalendarURL(lotName, window.location.href);
                        $googleCalendarBtn.on('click', function(e){
                            e.preventDefault();
                            window.open(googleHref, '_blank');
                        });

                        const $textReminderBtn = $('#textReminderBtn');
                        $textReminderBtn.html('Text');

                        $('.calendarBtn, .calendarBtnLg').addClass('waves-effect waves-grey btn btn--secondary');
                        $('<div class="aucproduct__calendar">').insertAfter('.product__buttons-grey')
                            .append('<div class="aucproduct__calendar-title h5">Add reminder</div>')
                            .append($('#calendarBtnBox'));
                    }
                    // giveLotViewCalendarButtonsLinks();
                    /**
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     * INDEX
                     */
                } else if ($('body').hasClass('index-index') || $('body').hasClass('auctions-index')) {
                    $('footer').append(`
<div class="auccatalog__nav auccatalog__nav--index">
    <div class="auccatalog__nav-inner">
        <div class="auccatalog__nav-perpage auccatalog__nav-perpage--header">
            <div class="auccatalog__nav-perpage-label c-r">Items per page</div>
            <div class="input-field input-field--select"></div>
        </div>
        <div class="auccatalog__nav-paginator"></div>
    </div>
</div>
`);
                    document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());

                    $itemsPerPage = $('#alf5').attr('style', '').clone();
                    $('#alf5').addClass('browser-default');
                    $itemsPerPage.removeAttr('id').addClass('auccatalog__nav-perpage-select');
                    $('.auccatalog__nav-perpage--header .input-field').append($itemsPerPage);
                    $('.auccatalog__nav-paginator').append($('#c2_ctl'));
                    const $pageselector = $('<div class="input-field input-field--select">');
                    if ($('.pageselector').length > 1) {
                        $('.pageselector:last-child').remove();
                    }
                    $pageselector.append($('.pageselector'));
                    $('.auccatalog__nav-paginator').append($pageselector);
                    $('main').prepend($('.auccatalog__nav'));
                    $('main').append($('.auccatalog__nav').clone().addClass('auccatalog__nav--footer'));

                    $('.auccatalog__nav-perpage-select').on('change', function (e) {
                        e.preventDefault();
                        const options = $(e.currentTarget).find('option').toArray();
                        const itemsPerPage = document.querySelector("#alf5");
                        $('#alf5').find('option[selected]').attr('selected', false);
                        options.forEach((option, index) => {
                            if (option.selected) {
                                itemsPerPage.value = option.value;
                                $('#alf5').find('option')[index].selected = true
                                itemsPerPage.dispatchEvent(new Event("change"));
                            }
                        })
                    });

                    $('.auclting').each((i, item) => {
                        $title = $(item).find('h6');
                        $title.addClass('h2')
                        const path = $title.find('a').prop('href').split('auctions/info/id/');
                        const idString = path.length > 1 ? path[1].split('/') : '';
                        const id = idString.length > 1 ? idString[0] : idString || 0;
                        if (!id) return;

                        $img = $(item).find('.aucimg a');
                        $img.addClass('auclting__img').css('background-image', 'url(' + $img.find('img').prop('src') + ')');
                        $desc = $(item).find('.aucdes');
                        $badge = $desc.find('#auc' + id).hide();
                        $badgeNew = $('<span class="badge auclting__badge">');
                        if ($badge.find('.in-progress').length) {
                            $badgeNew.addClass('green').append(`<i class="icon"><svg><use xlink:href="#live"></use></svg></i>Live`);
                        } else if ($badge.find('.ended').length) {
                            if (!$('a[name="ended"]').length) {
                                $('<a name="ended"/>').insertBefore($(item));
                            }
                            $badgeNew.addClass('red').append(`<i class='icon'><svg><use xlink:href="#flag"></use></svg></i>Ended`);
                        } else {
                            $badgeNew.addClass('orange').append(`<i class='icon'><svg><use xlink:href="#clockwise"></use></svg></i>Upcoming`);
                        }
                        const $bidder = $(item).find('.bidder-status, .bidder-status-closed');
                        if ($bidder.length) {
                            const $text = $('<div class="auclting__text">');
                            $text.append($bidder);
                            $desc.append($text);
                        }

                        $type = $('<div class="auclting__type"><i class="icon"><svg><use xlink:href="#auction-line"></use></svg></i></div>');
                        $type.append($desc.find('#sale' + id));

                        let $date = null;
                        $aucdate = $desc.find('#aucdate' + id);
                        $('#div-hidden').append('<div id="customDate' + id + '">');
                        const customDateBefore = window.getComputedStyle(document.querySelector('#customDate' + id), ':before');
                        const customDate = customDateBefore && customDateBefore.content && customDateBefore.content != 'none' ? customDateBefore.content.replaceAll('"', '') : null;
                        if (customDate || $aucdate.length) {
                            let date = customDate || '';
                            if (!date) {
                                const dates = [];
                                let start_date = $aucdate.find('.auction_list_start_date').text();
                                if (start_date) dates.push(moment(start_date).format('MMM D YYYY'));
                                let end_date = $aucdate.find('.auction_list_end_date').text();
                                if (end_date) dates.push(moment(end_date).format('MMM D YYYY'));
                                if (dates.length) {
                                    date += dates.join(' &minus; ');
                                }
                            }
                            if (date) {
                                $date = $('<div class="auclting__date"><i class="icon"><svg><use xlink:href="#calendar"></use></svg></i></div>');
                                $date.append(date);
                            }
                        }

                        $('#div-hidden').append('<div id="customLots' + id + '">');
                        const customLotsBefore = window.getComputedStyle(document.querySelector('#customLots' + id), ':before');
                        const customLots = customLotsBefore && customLotsBefore.content && customLotsBefore.content != 'none' ? customLotsBefore.content.replaceAll('"', '') : null;
                        $lots = $('<div class="auclting__lots"><i class="icon"><svg><use xlink:href="#ticket"></use></svg></i></div>');
                        $lots.append(customLots || $desc.find('p').eq(1).text());

                        $details = $('<div class="auclting__details">');
                        $details.append($badgeNew).append($type);
                        if ($date) $details.append($date);
                        $details.append($lots);
                        $details.insertAfter($title);

                        $desc.append($(item).find('.auclink'));

                        $reg = $(item).find('.reg');
                        if ($reg.length) {
                            $('#div-hidden').append('<div id="customRegisterButton' + id + '">');
                            const customRegisterButtonBefore = window.getComputedStyle(document.querySelector('#customRegisterButton' + id), ':before');
                            const customRegisterButtonAfter = window.getComputedStyle(document.querySelector('#customRegisterButton' + id), ':after');
                            const customRegisterButtonUrl = customRegisterButtonBefore && customRegisterButtonBefore.content && customRegisterButtonBefore.content != 'none' ? customRegisterButtonBefore.content.replaceAll('"', '') : null;
                            const customRegisterButtonTitle = customRegisterButtonAfter && customRegisterButtonAfter.content && customRegisterButtonAfter.content != 'none' ? customRegisterButtonAfter.content.replaceAll('"', '') : null;

                            $reg[0].onclick = null;
                            $reg.addClass('waves-effect waves-light btn');
                            if (customRegisterButtonUrl) {
                                $reg.attr('href', customRegisterButtonUrl).attr('target', '_blank');
                            } else {
                                $reg.on('click', function (e) {
                                    e.preventDefault();
                                    openAuctionRegistration(id);
                                });
                            }

                            const html = $reg.html();
                            if (html.includes('Login to bid')) {
                                $reg.html(customRegisterButtonTitle || 'Sign in to bid').addClass('auc-button--signin');
                            } else if (html.includes('Register to bid!')) {
                                $reg.html(customRegisterButtonTitle || 'Register for auction').addClass('auc-button--registerauc');
                            }
                        }
                        $cat = $(item).find('.cat');
                        if ($cat.length) {
                            $cat.html($cat.html().replace('View catalog', 'View catalog <span class="auclink__small">items</span>'));
                            $cat.addClass('waves-effect waves-grey btn btn--secondary');
                        }

                        requestAnimationFrame(()=>$('#aucDtr').append(item));
                    });

                    if (window.location.hash === '#ended') {
                        requestAnimationFrame(()=>$('a[name="ended"]')[0].scrollIntoView({block: 'start', behavior: 'smooth'}));
                    }

                    $('.filters').hide();
                    $('.hero__static-text').show();
                    $('main').prepend($('.auc__hero').show());
                    $('.auclist.auchome').show();
                    /**
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     * CATALOG
                     * SEARCH
                     * MY ITEMS
                     */
                } else if ($('body').hasClass('auctions-catalog') || $('body').hasClass('search-index') || $('body').hasClass('my-items')) {
                    $('footer').append(`
<div class="auccatalog">
<div class="auccatalog__search h1">Advanced Search</div>
<div class="auccatalog__nav">
    <div class="auccatalog__nav-inner">
        <div class="auccatalog__nav-perpage auccatalog__nav-perpage--header">
            <div class="auccatalog__nav-perpage-label c-r">Lots per page</div>
            <div class="input-field input-field--select"></div>
        </div>
        <div class="auccatalog__nav-results c-r"></div>
        <div class="auccatalog__nav-paginator"></div>
        <div class="auccatalog__nav-view"></div>
    </div>
</div>

<div class="cards">
<div class="cards__inner">
    <div class="auccatalog__search-panel"></div>
    <div class="cards__list">
        <div class="card aucproduct__card">
            <div class="card__img">
                <span class="heart card__heart" style="display: none;"></span>
                <span class="badge card__badge" style="display: none;">
                    <i class="icon"><svg><use xlink:href="#"></use></svg></i>
                </span>
            </div>
            <div class="card__info">
                <div class="card__description">
                    <div class="card__movie"></div>
                    <div class="aucproduct__card-details"></div>
                </div>
                <div class="card__actions"></div>
                <div class="card__bid"></div>
            </div>
        </div>
    </div>
    
</div>
</div>


<div class="auccatalog__nav auccatalog__nav--footer">
    <div class="auccatalog__nav-inner">
        <div class="auccatalog__nav-perpage auccatalog__nav-perpage--footer">
            <div class="auccatalog__nav-perpage-label c-r">Lots per page</div>
            <div class="input-field input-field--select"></div>
        </div>
        
        <div class="auccatalog__nav-paginator"></div>
    </div>
</div>

</div>
`);
                    document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
                    let status;
                    if ($('.sale-closed').length) status = 'closed';

                    // requestAnimationFrame(() => {
                    //     const heroImage = window.getComputedStyle(document.querySelector('.hero__image'));
                    //     const aucPoster = window.getComputedStyle(document.querySelector('#AdvancedSearch'), ':before');
                    //     const backgroundImage = aucPoster.backgroundImage !== 'none' ? aucPoster.backgroundImage : heroImage.backgroundImage;
                    //     $('.hero__image').css({ backgroundImage });
                    // });

                    const $searcContent = $('.advSearchAccordionContent');
                    const $searchKey = $('<div class="input-field">');
                    $searchKey.append($('#advsKey_ctl'));
                    $searcContent.prepend($searchKey);
                    const $searchInner = $('#ads01 > .adsrch').addClass('collapsible-body');
                    const $searchHeader = $('.advSearchAccordionButton').addClass('auccatalog__search-panel-title collapsible-header');
                    $searchHeader.find('h3').addClass('h4');
                    $searchHeader.append('<i class="icon"><svg><use xlink:href="#close"></use></svg></i>');
                    const $searchLi = $('<li class="collapsible-li">').append($searchHeader).append($searchInner);
                    $('#ads01').addClass('collapsible').append($searchLi);
                    $('#advsSearch').addClass('waves-effect waves-light btn btn--tertiary auccatalog__search-btn');

                    const $saleSelect = $('#advsSale');
                    if ($saleSelect.length) {
                        const $saleSelectContainer = $saleSelect.closest('section.auctions');
                        const $searchSale = $('<div class="input-field input-field--label input-field--select">');
                        $searchSale.append($saleSelectContainer.find('label').addClass('active')).append($saleSelect);
                        $saleSelectContainer.append($searchSale);
                        $saleSelectContainer.find('.drplist').hide();
                    }

                    const $searchSort = $('<div class="input-field input-field--label input-field--select">');
                    $searchSort.append($('section.sort-by label').addClass('active')).append($('#advsSort'));
                    $('section.sort-by').append($searchSort);
                    $('section.sort-by .drplist').hide();

                    $('#adv_search_categories .scroll-list').addClass('auccatalog__search-panel-checkboxes');
                    $('#adv_search_categories > label').addClass('h6');

                    const $searchMatch = $('<div class="input-field input-field--label input-field--select">');
                    $searchMatch.append($('.categories-match label').addClass('active')).append($('#advsCatMatch'));
                    $('.categories-match').append($searchMatch);
                    $('#advsCatMatch_ctl').hide();

                    $('.auction-type').insertBefore('.sort-by');
                    $('.auction-type > label').addClass('h6');

                    const $searchPriceMin = $('<div class="input-field input-field--label">');
                    $searchPriceMin.append($('#advsMinPrice')).append($('<label>Min price</label>'));
                    const $searchPriceMax = $('<div class="input-field input-field--label">');
                    $searchPriceMax.append($('#advsMaxPrice')).append($('<label>Max price</label>'));
                    const $searchPrice = $('<div class="auccatalog__search-panel-row">');
                    $searchPrice.append($searchPriceMin).append($searchPriceMax);
                    const $searchPriceSource = $searcContent.find('.price-range');
                    $searchPrice.insertAfter($searchPriceSource);
                    $searchPriceSource.remove();

                    const $searchLotSource = $searcContent.find('.lotnum');
                    const $searchLot = $('<div class="input-field input-field--label">');
                    $searchLot.append($searchLotSource.find('label').addClass('active')).append($('#advsLotNum_ctl'));
                    $searchLotSource.append($searchLot);

                    $('.auccatalog__search-panel').append($('#ads01'));

                    const results = $('.page:contains("Results:")').html();
                    $('.auccatalog__nav-results').html(results.replace('<b>Results:</b>&nbsp;Viewing&nbsp;items&nbsp;', 'Results:&nbsp;'));
                    $('.auccatalog__nav-paginator').append($('#c2_ctl'));
                    $('.pageselector').wrap('<div class="input-field input-field--select" />');
                    $('.grid_list .com').remove();
                    $('.grid_list .lst').html('<i class="icon"><svg><use xlink:href="#view-list"></use></svg></i>');
                    $('.grid_list .sqr').html('<i class="icon"><svg><use xlink:href="#view-grid"></use></svg></i>');
                    $('.auccatalog__nav-view').html($('.grid_list').html());

                    $itemsPerPage = $('#c3').attr('style', '').clone();
                    $('#c3').addClass('browser-default');
                    $itemsPerPage.removeAttr('id').addClass('auccatalog__nav-perpage-select');
                    $('.auccatalog__nav-perpage--header .input-field').append($itemsPerPage);
                    $('.auccatalog__nav-perpage--footer .input-field').append($itemsPerPage.clone());

                    $('.auccatalog__nav-perpage-select').on('change', function (e) {
                        e.preventDefault();
                        const options = $(e.currentTarget).find('option').toArray();
                        const itemsPerPage = document.querySelector("#c3");
                        $('#c3').find('option[selected]').attr('selected', false);
                        options.forEach((option, index) => {
                            if (option.selected) {
                                itemsPerPage.value = +option.value;
                                $('#c3').find('option').eq(index).attr('selected', true);
                                itemsPerPage.dispatchEvent(new Event("change"));
                            }
                        })
                    });

                    $('.aucproduct__card-details').html();
                    $card = $('.card').clone();
                    $('.cards__list').html('').toggleClass('cards__list--list', $('.compact_container'));
                    $('.cards').addClass(sam &&
                    sam.serverData &&
                    sam.serverData.variables &&
                    sam.serverData.variables.default &&
                    sam.serverData.variables.default.viewMode === 'list' ? 'cards--list' : 'cards--grid');

                    const customRegisterButtons = {};

                    const cardsLength = $('.item-block').length;
                    let cardsLoaded = 0;
                    $('.item-block').each((i, item) => {
                        const $aid = $(item).find('section[data-aid]');
                        let id = $aid.length ? $aid.data('aid') : 0;
                        $cardItem = $card.clone();
                        const $img = $(item).find('figure').length > 1 ? $(item).find('.figure-col img') : $(item).find('figure img'); // 2 figure in list view
                        if ($img.length) {
                            let bg = $img.prop('src');
                            $cardItem.find('.card__img').css('background-image', 'url(' + bg + ')');
                            $img.on('load', () => {
                                cardsLoaded++;
                                let interval = setInterval(()=>{ // start load big images after 80% default images loaded
                                    if (cardsLoaded >= cardsLength * .8) {
                                        clearInterval(interval);
                                        bg = bg.replace('_6.', '_0.');
                                        const $img = $('<img src="' + bg + '">');
                                        $('#div-hidden').append($img);
                                        $img.on('load', () => {
                                            $('.card__img').eq(i).css('background-image', 'url(' + bg + ')');
                                        });
                                    }
                                }, 1000);
                            });
                        }
                        $cardItem.find('.card__movie').append($(item).find('.yaaa'));
                        $badge = $cardItem.find('.card__badge')
                        if ($(item).find('.ended.sold').length) {
                            $badge.addClass('red').append('Sold').show().find('use').attr('xlink:href', '#flag');
                        } else if ($(item).find('.ended.unsold').length) {
                            $badge.append('Unsold').show().find('use').attr('xlink:href', '#archive');
                        } else if ($(item).find('.ended').length) {
                            $badge.append('Ended').show().find('use').attr('xlink:href', '#archive');
                        }

                        if (isSignedIn || !$(item).find('.ended').length) {
                            $(item).find('.price-info li').each((k, info) => {
                                const $info = $(info);
                                if ($info.text()) {
                                    $info.find('.title').addClass('aucproduct__card-details-label');
                                    $info.find('.value').addClass('aucproduct__card-details-value');
                                    $info.addClass('aucproduct__card-details-row');
                                    $cardItem.find('.aucproduct__card-details').append($info);
                                }
                            });
                        } else {
                            $cardItem.find('.aucproduct__card-details').append(`<a class="card__price card__price--login sso-trigger">
                                <i class="icon card__price-sold">?</i>
                                <span class="card__price-sold-login">
                                    Login to See Winning Bid
                            </span></a>`);
                        }
                        $(item).find('.item-status').remove();

                        const $timelft = $(item).find('.timelft');
                        if ($timelft.length && $timelft.text()) {
                            $cardItem.find('.aucproduct__card-details').append(`<div class="aucproduct__card-details-row">
                <div class="aucproduct__card-details-label">Time Left</div>
                <div class="aucproduct__card-details-value aucproduct__card-details-timer"></div>
            </div>`);
                            $cardItem.find('.aucproduct__card-details-timer').append($timelft);
                        }
                        const $btn = $(item).find('.auclistbtn .orng, .auclistbtn .grey');
                        if ($btn.length) {
                            $btn.addClass('waves-effect waves-light btn aucproduct__card-btn');
                            $cardItem.find('.card__actions').append($btn);

                            if ($btn[0].href) {
                                const isSign =  $btn[0].href.includes('/login/');
                                const isRegister =  $btn[0].href.includes('/register/');

                                if (isSign || isRegister) {
                                    if (!customRegisterButtons[id]) {
                                        $('#div-hidden').append('<div id="customRegisterButton' + id + '">');
                                        const customRegisterButtonBefore = window.getComputedStyle(document.querySelector('#customRegisterButton' + id), ':before');
                                        const customRegisterButtonAfter = window.getComputedStyle(document.querySelector('#customRegisterButton' + id), ':after');
                                        const url = customRegisterButtonBefore && customRegisterButtonBefore.content && customRegisterButtonBefore.content != 'none' ? customRegisterButtonBefore.content.replaceAll('"', '') : null;
                                        const title = customRegisterButtonAfter && customRegisterButtonAfter.content && customRegisterButtonAfter.content != 'none' ? customRegisterButtonAfter.content.replaceAll('"', '') : null;
                                        customRegisterButtons[id] = { url, title };
                                    }

                                    if (customRegisterButtons[id].url) {
                                        $btn.attr('href', customRegisterButtons[id].url).attr('target', '_blank');
                                    } else {
                                        $btn.on('click', function (e) {
                                            e.preventDefault();
                                            openAuctionRegistration(id);
                                        });
                                    }

                                    if (isSign) {
                                        $btn.text(customRegisterButtons[id].title || 'Sign in to bid');
                                    } else if (isRegister) {
                                        $btn.text(customRegisterButtons[id].title || 'Register for auction');
                                    }
                                }
                            }
                        }
                        const $bid = $(item).find('[id^="blkRegularBid"]');
                        if ($bid.length) {
                            $curInput = $bid.find('.currency-input');
                            $curInputSpan = $('<div>');
                            $curInputSpan.append($curInput.find('span'));
                            $curInputLabel = $('<div class="currency-input__label">');
                            $curInputLabel.html($curInput.html());
                            $curInput.html('')
                            $curInput.append($curInputLabel);
                            $curInput.append($curInputSpan.find('span'));
                            $bid.find('input[type="button"]').addClass('waves-effect waves-light btn btn--tertiary');
                            $bid.find('input[type="text"]').attr('autocomplete', 'off');
                            $cardItem.find('.card__bid').append($bid.addClass('blkRegularBid'));
                        }
                        const $heart = $(item).find('.bd-chk');
                        if ($heart.length) {
                            $cardItem.find('.heart').append($heart).show();
                            if ($heart.find('input').prop('checked')) $cardItem.addClass('card--liked');
                            $heart.find('input').on('change', function(e) {
                                $(e.target).closest('.card').toggleClass('card--liked', $heart.find('input').prop('checked'));
                            });
                        }

                        $cardItem.on('click', function(e) {
                            if (!$(e.target).is("input") && !$(e.target).is("a") && !$(e.target).closest('a').length) {
                                redirectPage($(e.target).closest('.card').find('.yaaa').attr('href'));
                            }
                        });

                        $('.cards__list').append($cardItem);
                    });

                    $('.container').prepend($('.auccatalog'));
                    if ($('body').hasClass('auctions-catalog')) {
                        $aucTitle = $('.tle h3').clone();
                        $aucTitle.find('span').remove();
                        $('.hero__static-title').html($aucTitle.text());

                        $('.sale-date').find('br').remove();
                        const datesArr = $('.sale-date').first().text().split(' - ');
                        if (datesArr.length) {
                            const dates = [];
                            if (datesArr[0]) dates.push(moment(datesArr[0]).format('MMM D YYYY'));
                            if (datesArr[1]) dates.push(moment(datesArr[1]).format('MMM D YYYY'));
                            if (dates.length) {
                                $('.hero__static-date').append(dates.join(' &minus; ')).show();
                            }
                        }

                        if (status) {
                            $badge = $('.auc__hero .badge');
                            switch (status) {
                                case 'closed':
                                    $badge.addClass('red').append('Ended').show().find('use').attr('xlink:href', '#flag');
                                    break;
                            }
                        }
                        $('.auc__hero-aucinfo').attr('href', $('.aucinfo').attr('href')).show();
                        $('.container').prepend($('.auc__hero').show());
                    } else if ($('body').hasClass('my-items')) {
                        $('.auccatalog__search').html('My Items');
                        $('<div class="auccatalog__tabs" />').insertAfter('.auccatalog__search').append($('#tabnav'));
                        $('#tabnav a').addClass('waves-effect btn-flat btn--rounded');
                        $('.tab-my-items-consigned:not(.selected)').hide();
                        $('.tab-my-items-all:not(.selected)').hide();
                        requestAnimationFrame(() => {
                            function getNodesThatContain(text) {
                                var textNodes = $('.auccatalog__tabs, .auccatalog__nav').find('*')
                                    .contents().filter(function() {
                                        return this.nodeType == 3 && this.textContent.indexOf(text) > -1;
                                    });
                                return textNodes.parent();
                            };
                            $item = getNodesThatContain('Item').add($('.auccatalog__search'));
                            $item.each((i, item) => {
                                item.innerHTML = item.innerHTML.replace('Item', 'Lot');
                            });

                            $('.tabnav-tab.selected')[0].scrollIntoViewIfNeeded({inline: 'center'});
                        });
                    }

                    /**
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     * BIDS
                     */
                } else if ($('body').hasClass('auctions-bidding-history')) {
                    $('footer').append(`
<div class="aucpage">
<div class="aucpage__h1 h1"></div>
<div class="auccatalog__nav">
<div class="auccatalog__nav-inner">
    <div class="auccatalog__nav-perpage auccatalog__nav-perpage--header">
        <div class="auccatalog__nav-perpage-label c-r">Items per page</div>
        <div class="input-field input-field--select"></div>
    </div>
    <div class="auccatalog__nav-paginator"></div>
</div>
</div>
<div class="aucpage__content"><div class="aucpage__content-inner"></div></div>
</div>
`);
                    document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());

                    $itemsPerPage = $('#bhPagesBottom').attr('style', '').clone();
                    $('#bhPagesBottom').addClass('browser-default');
                    $itemsPerPage.removeAttr('id').addClass('auccatalog__nav-perpage-select');
                    $('.auccatalog__nav-perpage--header .input-field').append($itemsPerPage);
                    $('.auccatalog__nav-paginator').append($('#c3_ctl'));
                    const $pageselector = $('<div class="input-field input-field--select">');
                    if ($('.pageselector').length > 1) {
                        $('.pageselector:last-child').remove();
                    }
                    $pageselector.append($('.pageselector'));
                    $('.auccatalog__nav-paginator').append($pageselector);
                    $('.aucpage').append($('.auccatalog__nav').clone().addClass('auccatalog__nav--footer'));

                    $('.auccatalog__nav-perpage-select').on('change', function (e) {
                        e.preventDefault();
                        const options = $(e.currentTarget).find('option').toArray();
                        const itemsPerPage = document.querySelector("#bhPagesBottom");
                        $('#bhPagesBottom').find('option[selected]').attr('selected', false);
                        options.forEach((option, index) => {
                            if (option.selected) {
                                itemsPerPage.value = option.value;
                                $('#bhPagesBottom').find('option')[index].selected = true
                                itemsPerPage.dispatchEvent(new Event("change"));
                            }
                        })
                    });

                    $('.aucpage__h1').html($('.ltitle h2').html());
                    $('.aucpage__content-inner').append($('.tablesection'));

                    $('.container').prepend($('.aucpage'));
                    /**
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     * CONFIRM BID
                     */
                } else if ($('body').hasClass('auctions-confirm-bid')) {
                    $('footer').append(`
<div class="general aucpage">
<div class="general__inner">
<h1 class="h1">Confirm bid</h1>
<p class="p-r general__content"></p>
<div class="general__btn"></div>
</div>
</div>
`);
                    document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());

                    $('.confirm-bid-msg').find('hr').remove();
                    $('.general__content').html($('#pblc1').text().replaceAll('$$', '$'));
                    $('#pblc1').remove();

                    $('.confirm-bid-msg').find('#pblc2').addClass('waves-effect waves-light btn');
                    $('.confirm-bid-msg').find('#pblc3').addClass('waves-effect waves-grey btn btn--secondary');
                    $('.general__btn').append($('.confirm-bid-msg'));

                    $('.container').prepend($('.aucpage'));
                    /**
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     * INFO
                     */
                } else if ($('body').hasClass('auctions-info')) {
                    $('footer').append(`
<div id="modal-shipping" class="modal">
<div class="modal-header modal-header--sticky">
    <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
</div>
<div class="modal-content"></div>
</div>

<div id="modal-terms" class="modal">
<div class="modal-header modal-header--sticky">
    <a class="modal-close btn-flat btn--icon"><i class='icon'><svg><use xlink:href="#close"></use></svg></i></a>
</div>
<div class="modal-content"></div>
</div>
`);
                    const status = $('#status').text().toLowerCase();

                    $badge = $('.auc__hero-badge');
                    switch (status) {
                        case 'upcoming': {
                            $badge.addClass('orange').append('Upcoming').find('use').attr('xlink:href', '#clockwise');
                            break;
                        }
                        case 'in progress': {
                            $badge.addClass('green').append('Live').find('use').attr('xlink:href', '#live');
                            break;
                        }
                        case 'closed': {
                            $badge.addClass('red').append('Ended').find('use').attr('xlink:href', '#flag');
                            break;
                        }
                    }

                    $('.hero__static-title').html($('#name').text());

                    if ($('.auc-info__date').length) {
                        $('.hero__static-date').show();
                    } else {
                        const dates = [];
                        let start_date = $('#start_date').text();
                        if (start_date) {
                            dates.push(moment(start_date).format('MMM D YYYY'));
                            // start_date = moment(start_date).format('D MMM h:mma');
                            // const start_date_tz_code = $('#start_date_tz_code').text();
                            // if (start_date_tz_code) start_date += ` (${start_date_tz_code})`;
                        }

                        let end_date = $('#end_date').text();
                        if (end_date) {
                            dates.push(moment(end_date).format('MMM D YYYY'));
                            // end_date = moment(end_date).format('D MMM h:mma');
                            // const end_date_tz_code = $('#end_date_tz_code').text();
                            // if (end_date_tz_code) end_date += ` (${end_date_tz_code})`;
                        }

                        if (dates.length) {
                            $('.hero__static-date').show().append(dates.join(' &minus; '));
                        }
                    }

                    const time_left = $('#time_left').text();
                    $timer = $('.hero__timer-panel');
                    if (time_left) {
                        let label = '';
                        let time = '';
                        let remain = 0;
                        const kk = {
                            'd': 60 * 60 * 24,
                            'h': 60 * 60,
                            'm': 60,
                        }
                        for (let i = 0; i<time_left.length; i++) { // run string
                            if (Number(time_left[i]) > 0 || time_left[i] === '0') {
                                time += time_left[i];
                            } else {
                                if (time) {
                                    const k = kk[time_left[i]] || 0;
                                    remain += time * k;
                                    time = '';
                                } else if (!remain) {
                                    label += time_left[i];
                                }
                            }
                        }
                        $timer.show();
                        // $('.hero__timer-panel-title').html(label);
                        setTimer($timer, remain);
                    }

                    $('.auc-btn__register').attr('href', $('#register_to_bid_url').text());
                    $('.auc-btn__catalog').attr('href', $('#catalog_url').text());

                    $catalogTimer = $('.sell-cta__catalog-timer');
                    if ($catalogTimer.length) {
                        setTimer($catalogTimer, $catalogTimer.data('sec'));
                    }

                    $('.share__item').each((i, item) => {
                        $(item).attr('href', $(item).attr('href') + $('#info_url').text());
                    });

                    $('.modal-gallery').each((i, gallery) => {
                        let modalSlider;
                        function modalCarousel () {
                            if (modalSlider && modalSlider[0]) modalSlider[0].destroy();
                            modalSlider = M.Carousel.init($(gallery).find('.modal-gallery__carousel'), {
                                fullWidth: true,
                                indicators: true,
                                onCycleTo: function(item, dragged) {}
                            });
                        }
                        $(gallery).appendTo('body');
                        $(gallery).find('.modal-gallery__carousel').append('<div class="preloader-wrapper active"><div class="spinner-layer spinner-white-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');

                        M.Modal.init($(gallery), {
                            opacity: .75,
                            onCloseStart: (el) => {
                                if (modalSlider && modalSlider[0]) modalSlider[0].destroy();
                                $(window).off('resize', modalCarousel);
                            },
                            onOpenEnd: (el, trigger) => {
                                modalCarousel();
                                $(window).on('resize', modalCarousel);
                            }
                        });
                    });

                    if ($('.auc-info').length) { // new template
                        document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
                        $('.container').prepend($('.auc-info'));

                        $('#modal-shipping .modal-content').append($('div.shipping'));
                        $('body').append($('#modal-shipping'));

                        $('#modal-terms .modal-content').append($('div.terms'));
                        $('body').append($('#modal-terms'));
                    } else {
                        $('.container').prepend($('div.terms').removeClass('terms'));
                        $('.container').prepend($('div.shipping').removeClass('shipping'));
                        $('.container').prepend($('.desc').html());
                    }
                    /**
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     * LIVE SALE
                     */
                } else if ($('body').hasClass('auctions-live-sale')) {
                    document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());

                    const samVariables = (
                        sam &&
                        sam.serverData &&
                        sam.serverData.variables &&
                        sam.serverData.variables.default
                    ) || {};
                    const auctionId = samVariables && samVariables.auctionId || 0;
                    const lblLotNoControlId = samVariables && samVariables.lblLotNoControlId || '';
                    const lblLotNameControlId = samVariables && samVariables.lblLotNameControlId || '';
                    const lblLotDescControlId = samVariables && samVariables.lblLotDescControlId || '';

                    const badge = '<span class="badge green"><i class="icon"><svg><use xlink:href="#live"></use></svg></i>Live bidding</span>';
                    let title = 'Lot #' + $('#' + lblLotNoControlId).html() + ': ' + $('#' + lblLotNameControlId).html();
                    $('.hero__static-title').html('').append($('.auction-title'));
                    $('.hero__static-text').html('').append(
                        badge,
                        $('<span class="h4 auclive-sale-title">'),
                    ).show();
                    
                    $('.hero__static-date').append(moment($('.auction-date').text()).format('MMM D YYYY')).show();
                    $('.container').prepend($('.auc__hero').addClass('auc__hero--small').show());
                    $('#rtb-panel').addClass('auclive-sale');
                    $('.mobile-content-wrap').hide();
                    $('.container').append($('#rtb-panel'));

                    $('.container').append($('<div class="product aucproduct auclive-sale__sections">'));
                    $('.lot-bidding').prepend(badge, $('<div class="auclive-sale__title h2 auclive-sale-title">'));
                    $('.product').append('<div class="product__inner">');
                    $('.product__inner').append('<div class="product__gallery">').append('<div class="product__info">');
                    $('.product__gallery').append($('.lot-images-container'));
                    $('.product__info').append($('.lot-bidding')).append($('.video-stream'));

                    $('.bidding-main .current').prepend('<i class="icon auclive-sale__current-icon"><svg><use xlink:href="#auction"></use></svg></i>');
                    $('.lot-messages').insertAfter('.video-stream');
                    $('.lot-messages').prepend($('<div class="auclive-sale__messages-bidder">'));
                    $('.auclive-sale__messages-bidder').append($('.bidder-num'));
                    $('.lot-messages').prepend($('<div class="auclive-sale__messages">'));
                    $('.auclive-sale__messages').append(
                        $('.lot-messages .sound'),
                        $('.link-report-problem')
                    );
                    $('#report-problems').addClass('waves-effect waves-light btn btn--tertiary auclive-sale__propblems-link');

                    $('<div class="auclive-sale__upcoming">').insertAfter('.product');
                    $('.auclive-sale__upcoming').append($('.lot-upcoming'));
                    $('.auclive-sale__upcoming').append($('#upcoming-scroll'));
                    $('.lot-upcoming h3').addClass('h3');

                    let interval = setInterval(() => { // listen ajax updates
                        title = 'Lot #' + $('#' + lblLotNoControlId).html() + ': ' + $('#' + lblLotNameControlId).html();
                        $('.auclive-sale-title').html(title);

                        const $desc = $('#' + lblLotDescControlId + ' > *');
                        if ($desc.length) {
                            if (!$('.product-description-content').length) { // old product
                                document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
                                const $productDescriptionContent = $('<div class="product-description-content">');
                                $productDescriptionContent.append($desc);
                                $('#' + lblLotDescControlId).append($productDescriptionContent);
                            }
                            const $gallery = $('#' + lblLotDescControlId).find('.product__slider');
                            if ($gallery.length) {
                                $('.lot-images-container').hide();
                                $('.product__gallery').first().prepend($('#' + lblLotDescControlId).find('.product__gallery').html());
                                $gallery.remove();
                                addProductZoom();
                                addProductGallery();
                            }
                        }

                        $upcoming = $('#upcoming-scroll .preview');
                        if ($upcoming.length) {
                            $upcoming.each((index, item) => {
                                if (!$(item).find('.auclive-sale__upcoming-img').length) {
                                    $img = $('<img class="auclive-sale__upcoming-img" src="' + $(item).prop('href').replace('_2.', '_1.') + '">');
                                    $(item).append($img);

                                    $(item).on('click', function () {
                                        window.open('/lot-details/index/catalog/' + auctionId + '/lot/' + $(this).data('lot_item_id'));
                                    });
                                }
                            });
                        }
                    }, 1000);

                    function onResize () {
                        if (getComputedStyle($('.product__inner')[0]).display === 'block') {
                            $('.product__info').append($('.lot-description'));
                        } else {
                            $('.product__gallery').append($('.lot-description'));
                        }
                    }
                    $(window).on('resize', onResize);
                    onResize();

                    $('.show-all').addClass('input-field input-field--select').append($('#sel-show').attr('style', ''));
                    $('.show-all .ui-widget').remove();
                    $('.orng').addClass('waves-effect waves-light btn').removeClass('orng');
                    /**
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     *
                     * REGISTRATION REQUIRED
                     */
                } else if ($('body').hasClass('auctions-registration-required')) {
                    $('footer').append(`
<div class="general aucpage">
<div class="general__inner">
<h1 class="h1">Register for auction</h1>
<p class="p-r general__content"></p>
<div class="general__btn"></div>
</div>
</div>
`);
                    document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());

                    $('.general__content').append($('#wrapper'));
                    $('#wrapper input[type="submit"]').addClass('waves-effect waves-light btn');

                    $('main').prepend($('.aucpage'));
                }
                /**
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 * SIGN IN, SIGN UP, FORGOT
                 */
                if ($('body').hasClass('login') || $('body').hasClass('signup') || $('body').hasClass('forgot-password')) {
                    openSSO('signIn.action', true);
                    document.querySelectorAll('style:not([data-v2]), link[rel="stylesheet"]:not([data-v2])').forEach(item => item.remove());
                }
                /**
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 * NOT LOGGED IN
                 */
                if (!isSignedIn) {
                    $('.header__settings .header__col--right').append(`
<a href="/login" class="waves-effect btn-flat header__btn sso-trigger" data-url="signIn.action">
    Sign In
</a>
<span class="header__settings-divider1">|</span>
<a href="/signup" class="waves-effect btn-flat header__btn sso-trigger" data-url="register.action">
    Register
</a>
`);
                    $('.sidenav__settings').append(`
<div class="sidenav__settings-sign-register">
    <a href="/login" class="waves-effect btn-flat modal-trigger sidenav__settings-sign sso-trigger" data-url="signIn.action">Sign In</a>
    <span class="sidenav__settings-divider">|</span>
    <a href="/signup" class="waves-effect btn-flat modal-trigger sidenav__settings-register sso-trigger" data-url="register.action">Register</a>
</div>
`);
                    $('.menu-link-login').addClass('sso-trigger');

                } else {
                    $('.header__settings .header__col--right').append(`
<a href="/logout" class="waves-effect btn-flat header__btn signout-trigger">
    Sign Out
</a>
`);
                    $('.sidenav__settings').append(`
<div class="sidenav__settings-sign-register">
    <a href="/logout" class="waves-effect btn-flat signout-trigger">
        Sign Out
    </a>
</div>
`);
                    $('.signout-trigger').on('click', function (e) {
                        e.preventDefault();
                        $('.loader-block').show();
                        $.get('/logout')
                            .always(data => {
                                const params = new URLSearchParams('d=2');
                                if (window.location.pathname.includes('/my-items/') ||
                                    window.location.pathname.includes('/confirm-bid')) { // redirect to home page after ps logout
                                    params.append('ru', '/');
                                } else { // redirect to this page after ps login
                                    params.append('ru', encodeURI(window.location.pathname + window.location.search));
                                    const scroll = $(window).scrollTop();
                                    if (scroll > 100) params.append('sc', String(Math.round(scroll)));
                                }
                                redirectPage(URL_PROPSTORE + 'signOut.action?' + params.toString());
                            });
                    });
                }
                /**
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 * Redirect auction register
                 */
                const id = window.location.pathname.split('/register/confirm-shipping/id/');
                if (id.length && id.length > 1) {
                    redirectPage(URL_PROPSTORE + 'auctionRegistration.action?auctionId=' + id[1]);
                }

                /**
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 * Plugin initialization
                 */
                M.Collapsible.init(document.querySelectorAll('.collapsible'), {
                    onOpenEnd: (el) => {
                        const body = el.querySelector('.collapsible-body');
                        if (body) body.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                });
                M.Collapsible.init(document.querySelectorAll('.collapsible.expandable'), {
                    accordion: false
                });
                M.Materialbox.init(document.querySelectorAll('.materialboxed'));
                M.Modal.init(document.querySelectorAll('.modal:not(.modal-ajax)'));
                M.Tabs.init(document.querySelectorAll('.tabs'));
                M.FormSelect.init(document.querySelectorAll('select:not(.disabled)'));
                M.Sidenav.init(document.querySelectorAll('.sidenav'));
                M.CharacterCounter.init(document.querySelectorAll('input[data-length], textarea[data-length]'));
                M.updateTextFields();
                /**
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 *
                 * HEADER
                 */
                function resize() {
                    headerFloat();
                }
                setTimeout(resize, 500);
                $(window).on('resize', resize);

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
                                }
                            }
                        }, 100));
                    }
                }

                function scrollToWarning () {
                    const warning = document.querySelector('main .warning');
                    if (warning) warning.scrollIntoView({behavior: 'smooth', block: 'center'});
                }
                requestAnimationFrame(scrollToWarning);

                function setTimer ($timer, seconds) {
                    let day = 0;
                    let hour = 0;
                    let min = 0;
                    let sec = seconds;
                    if (seconds && seconds > 0) {
                        const interval = setInterval(() => {
                            sec = --seconds;
                            if (sec <= 0) {
                                clearInterval(interval);
                                reloadPage();
                            }
                            day = Math.floor(sec / 60 / 60 / 24);
                            sec -= day * 60 * 60 * 24;
                            hour = Math.floor(sec / 60 / 60);
                            sec -= hour * 60 * 60;
                            min = Math.floor(sec / 60 );
                            sec -= min * 60;
                            $timer.find('.day').html(day);
                            $timer.find('.hour').html(hour);
                            $timer.find('.min').html(min);
                            $timer.find('.sec').html(sec);
                        }, 1000);
                    }
                }

                $('.sso-trigger').on('click', function (e) {
                    e.preventDefault();
                    openSSO($(this).data('url'));
                });

                function openSSO (action = 'signIn.action', parseUrlFromSearch) {
                    let url = '';
                    if (parseUrlFromSearch) {
                        const urlParams = new URLSearchParams(window.location.search);
                        url = urlParams.get('url');
                    }
                    const params = new URLSearchParams('d=2');
                    if (url) { // redirect to another page after ps login
                        try {
                            const urlObj = new URL(url);
                            params.append('ru', encodeURI(urlObj.pathname + urlObj.search)); // delete domain
                        } catch (e) {
                            params.append('ru', '/');
                        }
                    } else { // redirect to this page after ps login
                        params.append('ru', encodeURI(window.location.pathname + window.location.search));
                        const scroll = $(window).scrollTop();
                        if (scroll > 100) params.append('sc', String(Math.round(scroll)));
                    }
                    redirectPage(URL_PROPSTORE + action + '?' + params.toString());
                }

                function openAuctionRegistration (id) {
                    const ruParams = new URLSearchParams(window.location.search);
                    if (ruParams.get('sc')) ruParams.delete('sc'); // delete old sc
                    let params = '&d=2&ru=' + encodeURIComponent(window.location.pathname + '?' + ruParams.toString());
                    const scroll = $(window).scrollTop();
                    if (scroll > 100) params += '&sc=' + String(Math.round(scroll));
                    redirectPage(URL_PROPSTORE + 'auctionRegistration.action?auctionId=' + id + params);
                }

                function reloadPage () {
                    $('.loader-block').show();
                    window.location.reload();
                }

                function redirectPage (url) {
                    $('.loader-block').show();
                    window.location.href = url.replace(/\/+/g,'/').replace(/^https:\//,'https://');
                }

                if (params && params.get('sc') && !params.get('ru')) {
                    $('html').scrollTop(params.get('sc'));
                }

                document.addEventListener('visibilitychange', () => $('.loader-block').hide(), false); // hide loader on browser back

                document.body.classList.add('loaded'); // if svg fail
            }
        }, 100);
    }); // end of document ready
});

function grecaptchaRender (id = 'g-recaptcha') {
    try {
        grecaptcha.render(id, {
            'sitekey' : '6LfhkdoZAAAAALO13mfmd1E57vzk-J516oR__cM1'
        });
    } catch (error) {/*possible duplicated instances*/}
}

function checkResponse (data) {
    if (data && data.includes('<html')) {
        M.toast({
            html: 'Unfortunately something went wrong',
            classes: 'toast-error'
        });
        setTimeout(()=>window.location.reload(), 2000);
        return false;
    }
    return true;
}

if (!generateGoogleCalendarURL) function generateGoogleCalendarURL(lotName, urlLink) {
    return 'NeedGenerateGoogleCalendarURL';
}

if (!generateICSFileURL) function generateICSFileURL(lotName, urlLink) {
    return 'NeedGenerateICSFileURL';
}

window.alert = function (text) { // prevent sam alert
    console.log('Alert: ' + text); return true;
};

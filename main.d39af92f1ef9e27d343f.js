!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([,function(t,e,n){"use strict";n.r(e);function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;r(this,t),this.x=e,this.y=n},i=function(t){for(var e=document.createElement(t),n=arguments.length,r=new Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];return r.forEach((function(t){e.classList.add(t)})),e},o=function(t){var e=document.createElement("button");return e.innerText=t,e};function s(t){return function(t){if(Array.isArray(t))return c(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var l=function(t){var e=t.flat();if(0===e.pop()){var n=s(e).sort((function(t,e){return t-e}));e.join("")===n.join("")&&document.dispatchEvent(new CustomEvent("win"))}},u=function(t,e){for(var n=-1;n<=1;n+=1)for(var r=-1;r<=1;r+=1)if(t.x+r>-1&&t.x+r<e.length&&t.y+n>-1&&t.y+n<e[0].length&&Math.abs(n)!==Math.abs(r)&&0===e[t.y+n][t.x+r])return new a(t.x+r,t.y+n);return!1},d=function(t,e,n,r,o){var s=r,c=n,d=i("div","item");return d.innerText="".concat(t),d.style.height="".concat(e,"%"),d.style.width="".concat(e,"%"),d.style.top="".concat(e*c.y,"%"),d.style.left="".concat(e*c.x,"%"),d.addEventListener("mousedown",(function(n){var r=u(c,s),i=new a(n.clientX,n.clientY),f=!1;if(r){var h=new a(c.x*e,c.y*e),v=r.x<c.x?[r.x,c.x]:[c.x,r.x],y=r.y<c.y?[r.y,c.y]:[c.y,r.y],p=function(t){var n=new a(t.clientX-i.x,t.clientY-i.y);Math.abs(n.x)+Math.abs(n.y)>5&&(f=!0);var o=e*c.x+e*n.x/d.offsetWidth,s=e*c.y+e*n.y/d.offsetHeight;r.x-c.x!=0?o>=v[0]*e&&o<=v[1]*e&&(d.style.left="".concat(o,"%"),h.x=o):s>=y[0]*e&&s<=y[1]*e&&(d.style.top="".concat(s,"%"),h.y=s)};d.classList.remove("smooth"),window.addEventListener("mousemove",p),window.addEventListener("mouseup",(function(){window.removeEventListener("mousemove",p),d.classList.add("smooth"),(v[0]!==v[1]&&Math.abs(r.x*e-h.x)<Math.abs(c.x*e-h.x)||y[0]!==y[1]&&Math.abs(r.y*e-h.y)<Math.abs(c.y*e-h.y)||!f)&&(s[c.y][c.x]=0,s[(c=r).y][c.x]=t,o.next(),l(s)),d.style.top="".concat(e*c.y,"%"),d.style.left="".concat(e*c.x,"%")}),{once:!0})}})),d};function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var h,v,y=i("div","controlls"),p=["Размешать и начать","Пауза / Продолжить","Результаты","Сохранить","Вернуться к сохраненной игре"].map((function(t){var e=o(t);return y.appendChild(e),e})),m=(v=5,function(t){if(Array.isArray(t))return t}(h=p)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,a=!1,i=void 0;try{for(var o,s=t[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){a=!0,i=t}finally{try{r||null==s.return||s.return()}finally{if(a)throw i}}return n}}(h,v)||function(t,e){if(t){if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(h,v)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),b=m[0],g=m[1],x=(m[2],m[3]),w=m[4],S=i("div","score"),O=i("span","progress"),j=i("span","time");O.innerText="0",j.innerText="00:00",S.appendChild(O),S.appendChild(j);var T=i("div","field"),E=i("div","sizes");[3,4,5,6,7,8].forEach((function(t){var e=o("".concat(t,"x").concat(t));e.setAttribute("data-size",t),4===t&&e.classList.add("selected"),E.appendChild(e)}));var L=i("div","lock","active"),M=i("div","message"),C=i("p","text");C.innerHTML='\nУра! Вы решили головоломку за <span id="js-time"></span> и <span id="js-count"></span> ходов!\n';var P=o("OK");function k(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function z(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?k(Object(n),!0).forEach((function(e){A(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function A(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function I(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function D(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}M.appendChild(C),M.appendChild(P),document.body.appendChild(y),document.body.appendChild(S),document.body.appendChild(T),document.body.appendChild(E),document.body.appendChild(L),document.body.appendChild(M);var H,N=4,J={HTMLElement:O,value:0,set:function(t){this.value=t,this.HTMLElement.innerText=t},next:function(){this.set(this.value+1)},clear:function(){this.set(0)}},_=function(t){var e=Math.round(t/1e3),n=Math.floor(e/60),r=Math.floor(n/60);return(r>0?"".concat(r,":"):"")+(n%60>9?"".concat(n%60,":"):"0".concat(n%60,":"))+(e%60>9?"".concat(e%60):"0".concat(e%60))},V=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;I(this,t),this.startTime=Date.now(),this.current=0,this.startValue=n,this.total=n,this.HTMLElement=e,this.HTMLElement.innerText=_(0),this.display.bind(this),this.isStarted=!1}var e,n,r;return e=t,(n=[{key:"getCurrent",value:function(){return this.current=Date.now()-this.startTime,this.current}},{key:"getTotal",value:function(){return this.isStarted&&(this.total=this.startValue+this.getCurrent()),this.total}},{key:"display",value:function(){this.HTMLElement.innerText=_(this.getTotal())}},{key:"start",value:function(){var t=this;this.startTime=Date.now(),this.startValue=this.total,this.isUsed=!0,this.isStarted||(this.interval=setInterval((function(){return t.display()}),1e3)),this.isStarted=!0}},{key:"stop",value:function(){this.isStarted&&(clearInterval(this.interval),this.getTotal(),this.isStarted=!1)}},{key:"restart",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.HTMLElement.innerText=_(t),this.startTime=Date.now(),this.total=t,this.current=0,this.startValue=t,this.isStarted||this.start()}}])&&D(e.prototype,n),r&&D(e,r),t}(),U=new V(j),B=function(){for(;T.firstChild;)T.removeChild(T.firstChild)},X=function(t){for(var e=100/t.length,n=0;n<t.length;n+=1)for(var r=0;r<t.length;r+=1){var i=t[n][r],o=new a(r,n);0!==i&&T.appendChild(d(i,e,o,t,J))}},Y=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N||4,e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];B();for(var n=[],r=1,i=0;i<t;i+=1){for(var o=[],s=0;s<t;s+=1)o.push(r),r+=1;n.push(o)}n[t-1][t-1]=0;var c=new a(t-1,t-1);if(e)for(var l=0;l<100*Math.pow(t,2);l+=1){var u=Math.floor(4*Math.random()),d=z({},c);switch(u){case 0:d.x-=1;break;case 1:d.x+=1;break;case 2:d.y-=1;break;default:d.y+=1}if(d.x>=0&&d.x<t&&d.y>=0&&d.y<t){var f=n[d.x][d.y];n[d.x][d.y]=0,n[c.x][c.y]=f,c=d}}return X(n),n};H=Y(N,!1);var $=function(){Array.from(E.children).forEach((function(t){t.classList.remove("selected")}))};E.addEventListener("click",(function(t){if(t.target.parentNode===E){var e=parseInt(t.target.dataset.size,10);N!==e&&(U.stop(),U=new V(j),J.clear(),L.classList.remove("active"),H=Y(e,!1),$(),t.target.classList.add("selected"),N=e)}})),b.addEventListener("click",(function(){H=Y(),U.restart(),J.clear(),L.classList.remove("active")})),x.addEventListener("click",(function(){localStorage.gemPuzzleSave=JSON.stringify(H),localStorage.gemPuzzleTime=JSON.stringify(U.getTotal()),localStorage.gemPuzzleScore=JSON.stringify(J.value)})),w.addEventListener("click",(function(){localStorage.gemPuzzleSave&&(H=JSON.parse(localStorage.gemPuzzleSave),N!==H.length&&(N=H.length,$(),E.querySelector('[data-size="'.concat(N,'"]')).classList.add("selected")),B(),X(H),U.restart(JSON.parse(localStorage.gemPuzzleTime)),J.set(JSON.parse(localStorage.gemPuzzleScore)))})),g.addEventListener("click",(function(){U.isStarted?U.stop():U.start()})),document.addEventListener("win",(function(){U.stop();var t=document.getElementById("js-count"),e=document.getElementById("js-time");t.innerText=J.value,e.innerText=_(U.getTotal()),M.classList.add("visible"),P.addEventListener("click",(function(){J.clear(),U=new V(j),M.classList.remove("visible"),L.classList.add("active")}))}))}]);
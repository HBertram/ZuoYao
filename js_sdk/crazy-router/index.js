import regeneratorRuntime from "regenerator-runtime";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e,r,n,a,o,s){try{var u=t[o](s),i=u.value}catch(t){return void r(t)}u.done?e(i):Promise.resolve(i).then(n,a)}function r(t){return function(){var r=this,n=arguments;return new Promise((function(a,o){var s=t.apply(r,n);function u(t){e(s,a,o,u,i,"next",t)}function i(t){e(s,a,o,u,i,"throw",t)}u(void 0)}))}}function n(t,e){for(var r=0;e.length>r;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function s(t){for(var e=1;arguments.length>e;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);e>r;r++)n[r]=t[r];return n}function i(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=function(t,e){if(t){if("string"==typeof t)return u(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(t,e):void 0}}(t))){var e=0,r=function(){};return{s:r,n:function(){return t.length>e?{done:!1,value:t[e++]}:{done:!0}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,a,o=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return o=t.done,t},e:function(t){s=!0,a=t},f:function(){try{o||null==n.return||n.return()}finally{if(s)throw a}}}}var c=[],h=[],l=[],f={allowAction:!0,routerParams:null,passedParams:null,current:{},afterNotNext:null,actionInfo:{navigateBack:null,switchTab:null},actionType:null},p=/[^\x20-\x7E]/,m=/[\x2E\u3002\uFF0E\uFF61]/g,v={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},g=Math.floor,y=String.fromCharCode;function b(t){throw new RangeError(v[t])}function d(t,e){return t+22+75*(26>t)-((0!=e)<<5)}function P(t,e,r){var n=0;for(t=r?g(t/700):t>>1,t+=g(t/e);t>455;n+=36)t=g(t/35);return g(n+36*t/(t+38))}function w(t){return function(t,e){var r=t.split("@"),n="";r.length>1&&(n=r[0]+"@",t=r[1]);var a=function(t,e){for(var r=t.length,n=[];r--;)n[r]=e(t[r]);return n}((t=t.replace(m,".")).split("."),e).join(".");return n+a}(t,(function(t){return p.test(t)?"xn--"+function(t){var e,r,n,a,o,s,u,i,c,h,l,f,p,m,v,w=[];for(f=(t=function(t){for(var e,r,n=[],a=0,o=t.length;o>a;)55296>(e=t.charCodeAt(a++))||e>56319||a>=o?n.push(e):56320==(64512&(r=t.charCodeAt(a++)))?n.push(((1023&e)<<10)+(1023&r)+65536):(n.push(e),a--);return n}(t)).length,e=128,r=0,o=72,s=0;f>s;++s)128>(l=t[s])&&w.push(y(l));for(n=a=w.length,a&&w.push("-");f>n;){for(u=2147483647,s=0;f>s;++s)(l=t[s])>=e&&u>l&&(u=l);for(u-e>g((2147483647-r)/(p=n+1))&&b("overflow"),r+=(u-e)*p,e=u,s=0;f>s;++s)if(e>(l=t[s])&&++r>2147483647&&b("overflow"),l==e){for(i=r,c=36;(h=c>o?o+26>c?c-o:26:1)<=i;c+=36)w.push(y(d(h+(v=i-h)%(m=36-h),0))),i=g(v/m);w.push(y(d(i,0))),o=P(r,p,n==a),r=0,++n}++r,++e}return w.join("")}(t):t}))}function x(t){return null===t}function O(t){return"string"==typeof t}function j(t){return"object"==typeof t&&null!==t}function $(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var A=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function k(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}}function C(t,e){if(t.map)return t.map(e);for(var r=[],n=0;t.length>n;n++)r.push(e(t[n],n));return r}var q=Object.keys||function(t){var e=[];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.push(r);return e};function I(t,e,r,n){r=r||"=";var a={};if("string"!=typeof t||0===t.length)return a;var o=/\+/g;t=t.split(e=e||"&");var s=1e3;n&&"number"==typeof n.maxKeys&&(s=n.maxKeys);var u=t.length;s>0&&u>s&&(u=s);for(var i=0;u>i;++i){var c,h,l,f,p=t[i].replace(o,"%20"),m=p.indexOf(r);0>m?(c=p,h=""):(c=p.substr(0,m),h=p.substr(m+1)),l=decodeURIComponent(c),f=decodeURIComponent(h),$(a,l)?A(a[l])?a[l].push(f):a[l]=[a[l],f]:a[l]=f}return a}var R={parse:Z,resolve:function(t,e){return Z(t,!1,!0).resolve(e)},resolveObject:function(t,e){return t?Z(t,!1,!0).resolveObject(e):e},format:function(t){O(t)&&(t=H({},t));return V(t)},Url:E};function E(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}var S=/^([a-z0-9.+-]+:)/i,U=/:[0-9]*$/,T=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,N=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),L=["'"].concat(N),M=["%","/","?",";","#"].concat(L),B=["/","?","#"],F=/^[+a-z0-9A-Z_-]{0,63}$/,D=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,_={javascript:!0,"javascript:":!0},z={javascript:!0,"javascript:":!0},K={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Z(t,e,r){if(t&&j(t)&&t instanceof E)return t;var n=new E;return n.parse(t,e,r),n}function H(t,e,r,n){if(!O(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var a=e.indexOf("?"),o=-1!==a&&a<e.indexOf("#")?"?":"#",s=e.split(o);s[0]=s[0].replace(/\\/g,"/");var u=e=s.join(o);if(u=u.trim(),!n&&1===e.split("#").length){var i=T.exec(u);if(i)return t.path=u,t.href=u,t.pathname=i[1],i[2]?(t.search=i[2],t.query=r?I(t.search.substr(1)):t.search.substr(1)):r&&(t.search="",t.query={}),t}var c,h,l,f=S.exec(u);if(f){var p=(f=f[0]).toLowerCase();t.protocol=p,u=u.substr(f.length)}if(n||f||u.match(/^\/\/[^@\/]+@[^@\/]+/)){var m="//"===u.substr(0,2);!m||f&&z[f]||(u=u.substr(2),t.slashes=!0)}if(!z[f]&&(m||f&&!K[f])){var v,g,y=-1;for(c=0;B.length>c;c++)-1===(h=u.indexOf(B[c]))||-1!==y&&h>=y||(y=h);for(-1!==(g=-1===y?u.lastIndexOf("@"):u.lastIndexOf("@",y))&&(v=u.slice(0,g),u=u.slice(g+1),t.auth=decodeURIComponent(v)),y=-1,c=0;M.length>c;c++)-1===(h=u.indexOf(M[c]))||-1!==y&&h>=y||(y=h);-1===y&&(y=u.length),t.host=u.slice(0,y),u=u.slice(y),G(t),t.hostname=t.hostname||"";var b="["===t.hostname[0]&&"]"===t.hostname[t.hostname.length-1];if(!b){var d=t.hostname.split(/\./);for(c=0,l=d.length;l>c;c++){var P=d[c];if(P&&!P.match(F)){for(var x="",j=0,$=P.length;$>j;j++)P.charCodeAt(j)>127?x+="x":x+=P[j];if(!x.match(F)){var A=d.slice(0,c),k=d.slice(c+1),C=P.match(D);C&&(A.push(C[1]),k.unshift(C[2])),k.length&&(u="/"+k.join(".")+u),t.hostname=A.join(".");break}}}}t.hostname=t.hostname.length>255?"":t.hostname.toLowerCase(),b||(t.hostname=w(t.hostname)),t.host=(t.hostname||"")+(t.port?":"+t.port:""),t.href+=t.host,b&&(t.hostname=t.hostname.substr(1,t.hostname.length-2),"/"!==u[0]&&(u="/"+u))}if(!_[p])for(c=0,l=L.length;l>c;c++){var q=L[c];if(-1!==u.indexOf(q)){var R=encodeURIComponent(q);R===q&&(R=escape(q)),u=u.split(q).join(R)}}var E=u.indexOf("#");-1!==E&&(t.hash=u.substr(E),u=u.slice(0,E));var U=u.indexOf("?");(-1!==U?(t.search=u.substr(U),t.query=u.substr(U+1),r&&(t.query=I(t.query)),u=u.slice(0,U)):r&&(t.search="",t.query={}),u&&(t.pathname=u),K[p]&&t.hostname&&!t.pathname&&(t.pathname="/"),t.pathname||t.search)&&(t.path=(t.pathname||"")+(t.search||""));return t.href=V(t),t}function V(t){var e=t.auth||"";e&&(e=(e=encodeURIComponent(e)).replace(/%3A/i,":"),e+="@");var r,n,a,o,s=t.protocol||"",u=t.pathname||"",i=t.hash||"",c=!1,h="";t.host?c=e+t.host:t.hostname&&(c=e+(-1===t.hostname.indexOf(":")?t.hostname:"["+this.hostname+"]"),t.port&&(c+=":"+t.port)),t.query&&j(t.query)&&Object.keys(t.query).length&&(n=n||"&",a=a||"=",null===(r=t.query)&&(r=void 0),h="object"==typeof r?C(q(r),(function(t){var e=encodeURIComponent(k(t))+a;return A(r[t])?C(r[t],(function(t){return e+encodeURIComponent(k(t))})).join(n):e+encodeURIComponent(k(r[t]))})).join(n):o?encodeURIComponent(k(o))+a+encodeURIComponent(k(r)):"");var l=t.search||h&&"?"+h||"";return s&&":"!==s.substr(-1)&&(s+=":"),t.slashes||(!s||K[s])&&!1!==c?(c="//"+(c||""),u&&"/"!==u.charAt(0)&&(u="/"+u)):c||(c=""),i&&"#"!==i.charAt(0)&&(i="#"+i),l&&"?"!==l.charAt(0)&&(l="?"+l),s+c+(u=u.replace(/[?#]/g,(function(t){return encodeURIComponent(t)})))+(l=l.replace("#","%23"))+i}function G(t){var e=t.host,r=U.exec(e);r&&(":"!==(r=r[0])&&(t.port=r.substr(1)),e=e.substr(0,e.length-r.length)),e&&(t.hostname=e)}E.prototype.parse=function(t,e,r){return H(this,t,e,r)},E.prototype.format=function(){return V(this)},E.prototype.resolve=function(t){return this.resolveObject(Z(t,!1,!0)).format()},E.prototype.resolveObject=function(t){if(O(t)){var e=new E;e.parse(t,!1,!0),t=e}for(var r,n=new E,a=Object.keys(this),o=0;a.length>o;o++){var s=a[o];n[s]=this[s]}if(n.hash=t.hash,""===t.href)return n.href=n.format(),n;if(t.slashes&&!t.protocol){for(var u=Object.keys(t),i=0;u.length>i;i++){var c=u[i];"protocol"!==c&&(n[c]=t[c])}return K[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(t.protocol&&t.protocol!==n.protocol){if(!K[t.protocol]){for(var h=Object.keys(t),l=0;h.length>l;l++){var f=h[l];n[f]=t[f]}return n.href=n.format(),n}if(n.protocol=t.protocol,t.host||z[t.protocol])n.pathname=t.pathname;else{for(r=(t.pathname||"").split("/");r.length&&!(t.host=r.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==r[0]&&r.unshift(""),2>r.length&&r.unshift(""),n.pathname=r.join("/")}if(n.search=t.search,n.query=t.query,n.host=t.host||"",n.auth=t.auth,n.hostname=t.hostname||t.host,n.port=t.port,n.pathname||n.search)n.path=(n.pathname||"")+(n.search||"");return n.slashes=n.slashes||t.slashes,n.href=n.format(),n}var p,m=n.pathname&&"/"===n.pathname.charAt(0),v=t.host||t.pathname&&"/"===t.pathname.charAt(0),g=v||m||n.host&&t.pathname,y=g,b=n.pathname&&n.pathname.split("/")||[],d=n.protocol&&!K[n.protocol];if(r=t.pathname&&t.pathname.split("/")||[],d&&(n.hostname="",n.port=null,n.host&&(""===b[0]?b[0]=n.host:b.unshift(n.host)),n.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===r[0]?r[0]=t.host:r.unshift(t.host)),t.host=null),g=g&&(""===r[0]||""===b[0])),v)n.host=t.host||""===t.host?t.host:n.host,n.hostname=t.hostname||""===t.hostname?t.hostname:n.hostname,n.search=t.search,n.query=t.query,b=r;else if(r.length)b||(b=[]),b.pop(),b=b.concat(r),n.search=t.search,n.query=t.query;else if(null!=t.search)return d&&(n.hostname=n.host=b.shift(),(p=!(!n.host||0>=n.host.indexOf("@"))&&n.host.split("@"))&&(n.auth=p.shift(),n.host=n.hostname=p.shift())),n.search=t.search,n.query=t.query,x(n.pathname)&&x(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n;if(!b.length)return n.pathname=null,n.path=n.search?"/"+n.search:null,n.href=n.format(),n;for(var P=b.slice(-1)[0],w=(n.host||t.host||b.length>1)&&("."===P||".."===P)||""===P,j=0,$=b.length;$>=0;$--)"."===(P=b[$])?b.splice($,1):".."===P?(b.splice($,1),j++):j&&(b.splice($,1),j--);if(!g&&!y)for(;j--;j)b.unshift("..");!g||""===b[0]||b[0]&&"/"===b[0].charAt(0)||b.unshift(""),w&&"/"!==b.join("/").substr(-1)&&b.push("");var A=""===b[0]||b[0]&&"/"===b[0].charAt(0);return d&&(n.hostname=n.host=A?"":b.length?b.shift():"",(p=!(!n.host||0>=n.host.indexOf("@"))&&n.host.split("@"))&&(n.auth=p.shift(),n.host=n.hostname=p.shift())),(g=g||n.host&&b.length)&&!A&&b.unshift(""),b.length?n.pathname=b.join("/"):(n.pathname=null,n.path=null),x(n.pathname)&&x(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=t.auth||n.auth,n.slashes=n.slashes||t.slashes,n.href=n.format(),n},E.prototype.parseHost=function(){return G(this)};var J=process.env.VUE_APP_PLATFORM,Q=!1;function W(t,e){var r=t.indexOf(e);t.splice(r,1)}function X(t,e,r){return Y.apply(this,arguments)}function Y(){return(Y=r(regeneratorRuntime.mark((function t(e,r,n){var a,o,s,u,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:o=function(){f.afterNotNext=null,a=!1},a=!0,s=i(e),t.prev=3,s.s();case 5:if((u=s.n()).done){t.next=14;break}return c=u.value,t.next=9,c(r,n,o);case 9:if(!a){t.next=11;break}return t.abrupt("return",!1);case 11:a=!0;case 12:t.next=5;break;case 14:t.next=19;break;case 16:t.prev=16,t.t0=t.catch(3),s.e(t.t0);case 19:return t.prev=19,s.f(),t.finish(19);case 22:return t.abrupt("return",!0);case 23:case"end":return t.stop()}}),t,null,[[3,16,19,22]])})))).apply(this,arguments)}function tt(t,e,r){t.forEach((function(t){t(e,r)}))}function et(t){var e=f[t];return f[t]=null,e}function rt(e,r){return"object"===t(e[r])&&(f[r]=s({},e[r])),e}function nt(){var t=f.afterNotNext;f.afterNotNext=null,"function"==typeof t&&t()}function at(t,e,r,n){return ot.apply(this,arguments)}function ot(){return(ot=r(regeneratorRuntime.mark((function t(e,r,n,a){var o,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e;case 3:if(1!==(o=t.sent).length){t.next=9;break}f.allowAction=!0,tt(l,r,n),t.next=13;break;case 9:if("reLaunch"!==a||1!==getCurrentPages().length||it()!==r.url||"h5"!==J){t.next=12;break}return lt(),t.abrupt("return",o);case 12:("navigateBack"===a&&1===getCurrentPages().length||"app-plus"===J)&&(lt(),"$routeParams"in(s=ct())||(s.$routeParams=et("routeParams")),s.$passedParams=et("passedParams"),s.$vm&&(s.$vm.$passedParams=s.$passedParams,"$routeParams"in s.$vm||(s.$vm.$routeParams=et("routeParams"))),tt(h,r,n),f.current=ht());case 13:return t.abrupt("return",o);case 16:return t.prev=16,t.t0=t.catch(0),t.abrupt("return",Error(t.t0));case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))).apply(this,arguments)}function st(t){var e=s({},t);return Object.keys(e).forEach((function(t){e[t]=decodeURIComponent(e[t])})),e}function ut(t){if(t)return"h5"===J?t.$mp.query:t.options}function it(){var t=getCurrentPages();return t[t.length-1].route}function ct(){var t=getCurrentPages();return t[t.length-1]}function ht(){var t=ct(),e=ut(t);return"h5"!==J&&(e=st(e)),{url:it(),routeParams:t.$routeParams,passedParams:t.$passedParams,query:e}}function lt(t){Q&&(f.allowAction=!0,t&&t()),Q=!1}function ft(t){var e=uni[t];uni[t]=function(n){return function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2?arguments[2]:void 0;try{it()}catch(e){return t.call(uni,n)}var o=ht(),s=n.fail,u=n.success,i=n.complete;if(!f.allowAction){var p="动作被拦截，因为已经有一个正在执行的路由动作";return s||u||i?n.fail&&n.fail({errMsg:p}):[{errMsg:p}]}f.allowAction=!1,Q=!1;var m,v=it(),g={};if("navigateBack"===a){var y=n.delta,b=void 0===y?1:y,d=getCurrentPages().length-1-b;0>d&&(d=0),f.actionInfo.navigateBack=d,m=getCurrentPages()[d].route,g=ut(getCurrentPages()[d]),"h5"!==J&&(g=st(g))}else{var P=(m=R.resolve(v,n.url||"").replace(/^\/([^\/])/,"$1")).match(/([^?]+)\?([\s\S]*)/);m=P&&P[1]||m,P&&P[2]&&P[2].split("&").forEach((function(t){if(t){var e=t.match(/^([^=]+)=([\s\S]*)$/);e&&e[2]?g[e[1]]=e[2]:g[t]=""}})),g=st(g)}"switchTab"===a&&(f.actionInfo.switchTab=m),f.actionType=a;var w={url:m,routeParams:n.routeParams,passedParams:n.passedParams,query:g,jumpType:a};return s||u||i?(n.fail=function(){if(f.allowAction=!0,tt(l,w,"app-plus"===J?o:f.current),s){for(var t=arguments.length,r=Array(t),n=0;t>n;n++)r[n]=arguments[n];return s.apply(e,r)}},"reLaunch"===a&&1===getCurrentPages().length&&it()===w.url&&"h5"===J&&(n.success=function(){if(lt(),u){for(var t=arguments.length,r=Array(t),n=0;t>n;n++)r[n]=arguments[n];return u.apply(e,r)}}),("navigateBack"===a&&1===getCurrentPages().length||"app-plus"===J)&&(n.success=function(){lt();var t=ct();if("$routeParams"in t||(t.$routeParams=et("routeParams")),t.$passedParams=et("passedParams"),t.$vm&&(t.$vm.$passedParams=t.$passedParams,"$routeParams"in t.$vm||(t.$vm.$routeParams=et("routeParams"))),tt(h,w,"app-plus"===J?o:f.current),f.current=ht(),u){for(var r=arguments.length,n=Array(r),a=0;r>a;a++)n[a]=arguments[a];return u.apply(e,n)}}),void r(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X(c,w,"app-plus"===J?o:f.current);case 2:if(e.sent){e.next=6;break}return n.fail({errMsg:"beforeEach中没有使用next"}),nt(),e.abrupt("return");case 6:Q=!0,t.call(uni,rt(rt(n,"routeParams"),"passedParams"));case 8:case"end":return e.stop()}}),e)})))()):r(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X(c,w,"app-plus"===J?o:f.current);case 2:if(e.sent){e.next=6;break}return f.allowAction=!0,nt(),e.abrupt("return",[{errMsg:"beforeEach中没有使用next"}]);case 6:return Q=!0,r=t.call(uni,rt(rt(n,"routeParams"),"passedParams")),e.abrupt("return",at(r,w,"app-plus"===J?o:f.current,a));case 9:case"end":return e.stop()}}),e)})))()}(e,n,t)}}function pt(t,e){t.mixin({onLoad:function(){"app-plus"!==J&&(ct().$routeParams=this.$routeParams=et("routeParams"))},onShow:function(){var t=this,e=function(){lt((function(){ct().$passedParams=t.$passedParams=et("passedParams")})),tt(h,ht(),f.current),f.current=ht()};if("app-plus"!==J){try{it()}catch(t){return}this.globalData||e()}else 1>getCurrentPages().length&&function t(e){try{ct(),e&&e()}catch(r){setTimeout((function(){t(e)}),13)}}(e)}}),ft("navigateTo"),ft("redirectTo"),ft("reLaunch"),ft("switchTab"),ft("navigateBack")}var mt=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,r,a;return e=t,(r=[{key:"beforeEach",value:function(t){return c.push(t),function(){W(c,t)}}},{key:"afterEach",value:function(t){return h.push(t),function(){W(h,t)}}},{key:"onError",value:function(t){return l.push(t),function(){W(l,t)}}},{key:"afterNotNext",value:function(t){return f.afterNotNext=t,this}},{key:"install",value:function(t,e){return pt(t),this}}])&&n(e.prototype,r),a&&n(e,a),t}());export default mt;

/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var t=function(t){t.classList.add("popup_is-animated"),setTimeout((function(){t.classList.add("popup_is-opened")}),600),document.addEventListener("keydown",r)},e=function(t){t.classList.remove("popup_is-animated"),setTimeout((function(){t.classList.remove("popup_is-opened")}),600),document.removeEventListener("keydown",r)},r=function(t){if("Escape"===t.key){var r=document.querySelector(".popup_is-opened");e(r)}},n={baseUrl:"https://nomoreparties.co/v1/wff-cohort-11",headers:{authorization:"525d9810-1f71-4b0b-b990-61c4da29ce8a","Content-Type":"application/json"}},o=function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))},i=function(t){return fetch("".concat(n.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:n.headers}).then((function(t){return o(t)}))},c=function(t){return fetch("".concat(n.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:n.headers}).then((function(t){return o(t)}))},a=document.querySelector("#card-template").content,u=function(t,e,r,n,o){var i=a.querySelector(".card").cloneNode(!0),c=i.querySelector(".card__like-counter"),u=i.querySelector(".card__like-button"),l=i.querySelector(".card__image"),s=i.querySelector(".card__title"),f=i.querySelector(".card__delete-button"),p=t._id;return i.id=t._id,l.src=t.link,l.alt=t.name,s.textContent=t.name,c.textContent=t.likes.length,t.owner._id!==e?f.classList.add("card__delete-button-none"):f.addEventListener("click",(function(){r({cardId:p,cardElement:i})})),t.likes.some((function(t){return t._id===e}))&&u.classList.add("card__like-button_is-active"),u.addEventListener("click",(function(){o(t,p,u,c)})),l.addEventListener("click",(function(t){n(t)})),i},l=function(t,e,r,n){(r.classList.contains("card__like-button_is-active")?c:i)(e).then((function(t){console.log(t),r.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(t){console.error("Ошибка при  изменении статуса лайка:",t)}))},s=function(t,e,r,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(r),o.classList.remove(n),o.textContent=""},f=function(t,e,r){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove(r)):(e.disabled=!0,e.classList.add(r))},p=function(t,e){var r=Array.from(t.querySelectorAll(e.inputSelector)),n=t.querySelector(e.submitButtonSelector);f(r,n,e.inactiveButtonClass),r.forEach((function(r){s(t,r,e.inputErrorClass,e.errorClass),r.setCustomValidity("")}))};function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function h(){h=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var i=e&&e.prototype instanceof g?e:g,c=Object.create(i.prototype),a=new A(n||[]);return o(c,"_invoke",{value:C(t,r,a)}),c}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=s;var p="suspendedStart",y="suspendedYield",v="executing",m="completed",_={};function g(){}function b(){}function S(){}var w={};l(w,c,(function(){return this}));var L=Object.getPrototypeOf,E=L&&L(L(P([])));E&&E!==r&&n.call(E,c)&&(w=E);var q=S.prototype=g.prototype=Object.create(w);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function r(o,i,c,a){var u=f(t[o],t,i);if("throw"!==u.type){var l=u.arg,s=l.value;return s&&"object"==d(s)&&n.call(s,"__await")?e.resolve(s.__await).then((function(t){r("next",t,c,a)}),(function(t){r("throw",t,c,a)})):e.resolve(s).then((function(t){l.value=t,c(l)}),(function(t){return r("throw",t,c,a)}))}a(u.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function C(e,r,n){var o=p;return function(i,c){if(o===v)throw new Error("Generator is already running");if(o===m){if("throw"===i)throw c;return{value:t,done:!0}}for(n.method=i,n.arg=c;;){var a=n.delegate;if(a){var u=O(a,n);if(u){if(u===_)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var l=f(e,r,n);if("normal"===l.type){if(o=n.done?m:y,l.arg===_)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=m,n.method="throw",n.arg=l.arg)}}}function O(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,O(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),_;var i=f(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,_;var c=i.arg;return c?c.done?(r[e.resultName]=c.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,_):c:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,_)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function P(e){if(e||""===e){var r=e[c];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(d(e)+" is not iterable")}return b.prototype=S,o(q,"constructor",{value:S,configurable:!0}),o(S,"constructor",{value:b,configurable:!0}),b.displayName=l(S,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,S):(t.__proto__=S,l(t,u,"GeneratorFunction")),t.prototype=Object.create(q),t},e.awrap=function(t){return{__await:t}},x(k.prototype),l(k.prototype,a,(function(){return this})),e.AsyncIterator=k,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var c=new k(s(t,r,n,o),i);return e.isGeneratorFunction(r)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},x(q),l(q,u,"Generator"),l(q,c,(function(){return this})),l(q,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(T),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return a.type="throw",a.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var c=this.tryEntries[i],a=c.completion;if("root"===c.tryLoc)return o("end");if(c.tryLoc<=this.prev){var u=n.call(c,"catchLoc"),l=n.call(c,"finallyLoc");if(u&&l){if(this.prev<c.catchLoc)return o(c.catchLoc,!0);if(this.prev<c.finallyLoc)return o(c.finallyLoc)}else if(u){if(this.prev<c.catchLoc)return o(c.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return o(c.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=e,i?(this.method="next",this.next=i.finallyLoc,_):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),_},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),T(r),_}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;T(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:P(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),_}},e}function y(t,e,r,n,o,i,c){try{var a=t[i](c),u=a.value}catch(t){return void r(t)}a.done?e(u):Promise.resolve(u).then(n,o)}function v(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function c(t){y(i,n,o,c,a,"next",t)}function a(t){y(i,n,o,c,a,"throw",t)}c(void 0)}))}}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var _={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_error",errorClass:"popup__error-active"},g={};Promise.all([fetch("".concat(n.baseUrl,"/cards"),{headers:n.headers}).then((function(t){return o(t)})),fetch("".concat(n.baseUrl,"/users/me"),{method:"GET",headers:n.headers}).then((function(t){return o(t)}))]).then((function(t){var e,r,n=(r=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,c,a=[],u=!0,l=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(a.push(n.value),a.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=r.return&&(c=r.return(),Object(c)!==c))return}finally{if(l)throw o}}return a}}(e,r)||function(t,e){if(t){if("string"==typeof t)return m(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(t,e):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],i=n[1];g=i._id,C.style.backgroundImage="url('".concat(i.avatar,"')"),b.innerText=i.name,S.innerText=i.about,o.forEach((function(t){N.append(u(t,g,$,Y,l))}))})).catch((function(t){console.error("Ошибка при загрузке данных:",t)}));var b=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),w=document.querySelector(".profile__edit-button"),L=document.querySelector(".popup_type_edit"),E=L.querySelector(".popup__form"),q=L.querySelector(".popup__button"),x=document.querySelector(".popup__input_type_name"),k=document.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__image"),O=document.querySelector(".popup_type_avatar"),j=O.querySelector(".popup__button"),T=O.querySelector(".popup__form"),A=T.querySelector(".popup__input_type_url"),P=function(){var t=v(h().mark((function t(r){var i,c;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.preventDefault(),i=x.value,c=k.value,K(q,!0),(a=i,u=c,fetch("".concat(n.baseUrl,"/users/me"),{method:"PATCH",headers:n.headers,body:JSON.stringify({name:a,about:u})}).then((function(t){return o(t)}))).then((function(t){b.textContent=t.name,S.textContent=t.about,e(L)})).catch((function(t){console.log("Ошибка при отправке данных профиля",t)})).finally((function(){K(q,!1)}));case 5:case"end":return t.stop()}var a,u}),t)})));return function(e){return t.apply(this,arguments)}}(),I=function(){var t=v(h().mark((function t(r){var i;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.preventDefault(),i=A.value,K(j,!0),(c=i,fetch("".concat(n.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:n.headers,body:JSON.stringify({avatar:c})}).then((function(t){return o(t)}))).then((function(t){C.style.backgroundImage="url('".concat(t.avatar,"')"),e(O)})).catch((function(t){console.log("Ошибка при отправке данных аватара",t)})).finally((function(){T.reset(),K(j,!1)}));case 4:case"end":return t.stop()}var c}),t)})));return function(e){return t.apply(this,arguments)}}();C.addEventListener("click",(function(){t(O),T.reset(),p(T,_)})),T.addEventListener("submit",I),w.addEventListener("click",(function(){x.value=b.textContent,k.value=S.textContent,t(L),p(E,_)})),E.addEventListener("submit",P);var N=document.querySelector(".places__list"),U=document.querySelector(".profile__add-button"),G=document.querySelector(".popup_type_new-card"),B=G.querySelector(".popup__form"),D=B.querySelector(".popup__button"),F=document.querySelector(".popup__input_type_card-name"),M=document.querySelector(".popup__input_type_url"),J=document.querySelector(".popup_type_image"),V=document.querySelector(".popup_delete-card"),H=V.querySelector(".popup__button-delete"),Y=function(e){var r=e.target,n=document.querySelector(".popup__image");n.src=r.src,n.alt=r.alt,t(J)},z={},$=function(e){var r=e.cardId,n=e.cardElement;z.cardId=r,z.cardElement=n,t(V)};H.addEventListener("click",(function(){var t;(t=z.cardId,fetch("".concat(n.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:n.headers}).then((function(t){return o(t)}))).then((function(){z.cardElement.remove(),e(V),z={}})).catch((function(t){console.log("Ошибка при отправке данных",t)}))}));var K=function(t,e){t.textContent=e?"Сохранение...":"Сохранить"};document.querySelectorAll(".popup").forEach((function(t){t.addEventListener("click",(function(r){!function(t,r){(r.target===t||r.target.classList.contains("popup__close"))&&e(t)}(t,r)}))})),U.addEventListener("click",(function(){t(G),B.reset(),p(B,_)})),B.addEventListener("submit",(function(t){t.preventDefault();var r=F.value,i=M.value;K(D,!0),function(t,e){return fetch("".concat(n.baseUrl,"/cards"),{method:"POST",headers:n.headers,body:JSON.stringify({name:t,link:e})}).then((function(t){return o(t)}))}(r,i).then((function(t){var r=u(t,g,$,Y,l);N.prepend(r),e(G)})).catch((function(t){console.log("Ошибка при отправке данных карточки",t)})).finally((function(){B.reset(),K(D,!1)}))})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t,e,r,n,o,i){var c=Array.from(t.querySelectorAll(e)),a=t.querySelector(r);f(c,a,n),c.forEach((function(e){e.addEventListener("input",(function(){!function(t,e,r,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?s(t,e,r,n):function(t,e,r,n,o){var i=t.querySelector(".".concat(e.id,"-error"));e.classList.add(r),i.textContent=o,i.classList.add(n)}(t,e,r,n,e.validationMessage)}(t,e,o,i),f(c,a,n)}))}))}(e,t.inputSelector,t.submitButtonSelector,t.inactiveButtonClass,t.inputErrorClass,t.errorClass)}))}(_)})();
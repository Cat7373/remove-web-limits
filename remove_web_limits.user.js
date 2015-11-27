// ==UserScript==
// @namespace      https://www.github.com/Cat7373/

// @name           网页限制解除
// @name:en        Remove web limits
// @name:zh        网页限制解除

// @description    解除一些网站的禁止 选择、复制、右键 等限制
// @description:en Deregulating some sites prohibit select, copy, right of
// @description:zh 解除一些网站的禁止 选择、复制、右键 等限制

// @homepageURL    https://cat7373.github.io/remove-web-limits/
// @supportURL     https://github.com/Cat7373/remove-web-limits/issues/
// @updateURL      https://cat7373.github.io/remove-web-limits/remove_web_limits.user.js

// @author         Cat73
// @version        1.1.3
// @license        LGPLv3

// @compatible     chrome 46.0.2490.86 测试通过
// @compatible     firefox 42.0 测试通过
// @compatible     opera 33.0.1990.115 测试通过
// @compatible     safari 未测试

// @include        http://*
// @include        https://*
// @match          *://*/*
// @grant          none
// @run-at         document-start
// ==/UserScript==


// 要处理的event
var eventNames = "contextmenu|select|selectstart|copy|cut|dragstart|mousedown".split("|");
var eventNames_on = [];
// 原始 addEventListener 的保存位置
var addEventListenerName = getRandStr('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', parseInt(Math.random() * 12 + 8));

// Hook addEventListener proc
function addEventListener(event, func, useCapture) {
  if(eventNames.indexOf(event) >= 0) {
    func = returnTrue;
  }

  this[addEventListenerName](event, func, useCapture);
}

// 清理循环
function clearLoop() {
  var elements = getElements();

  for(var i in elements) {
    for(var j in eventNames_on) {
      elements[i][eventNames_on[j]] = null;
    }
  }
}

// 返回true的函数
function returnTrue() {
  return true;
}

// 获取随机字符串
function getRandStr(chs, len) {
  var str = '';

  while(len--) {
    str += chs[parseInt(Math.random() * chs.length)];
  }

  return str;
}

// 获取所有元素 包括document
function getElements() {
  var elements = Array.prototype.slice.call(document.getElementsByTagName('*'));
  elements.push(document);

  return elements;
}

// 添加css
function addStyle(css) {
  var style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);   
}

// 初始化
function init() {
  // 处理 onxxx 的 event 名称
  for(var i in eventNames) {
    eventNames_on[i] = 'on' + eventNames[i];
  }

  // 调用清理循环
  setInterval(clearLoop, 15 * 1000);
  window.addEventListener('load', clearLoop, true);
  clearLoop();

  // hook addEventListener
  document.__addEventListener = EventTarget.prototype[addEventListenerName] = EventTarget.prototype.addEventListener;
  document[addEventListenerName] = document.addEventListener;

  EventTarget.prototype.addEventListener = addEventListener;
  document.addEventListener = addEventListener;

  // 添加CSS
  addStyle('html, * {-webkit-user-select:text!important; -moz-user-select:text!important;}');

  // 输出原始 addEventListener 位置
  console.debug('原始 addEventListener 名称：' + addEventListenerName);
}

init();

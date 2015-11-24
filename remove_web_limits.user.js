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
// @version        1.1.2
// @license        LGPLv3

// @compatible     chrome 完美支持
// @compatible     firefox 未测试
// @compatible     opera 未测试
// @compatible     safari 未测试

// @include        http://*
// @include        https://*
// @match          *://*/*
// @grant          GM_addStyle
// @grant          GM_log
// @run-at         document-start
// ==/UserScript==

// 要处理的event
var eventNames = "contextmenu|select|selectstart|copy|cut|dragstart|mousedown".split("|");
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

  for(var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for(var j = 0; j < eventNames.length; j++) {
      element['on' + eventNames[j]] = null;
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
  for(var i = 0; i < len; i++) {
    str += chs[parseInt(Math.random() * chs.length)];
  }
    return str;
}

// 获取所有元素 包括document
function getElements() {
  var elements = document.getElementsByTagName('*');
  var elements2 = [];
  for(var i = 0; i < elements.length; i++) {
    elements2[i] = elements[i];
  }
  elements2[elements2.length] = document;
  return elements2;
}

// 初始化
function init() {
  // hook addEventListener
  EventTarget.prototype[addEventListenerName] = document.__addEventListener = EventTarget.prototype.addEventListener;
  document[addEventListenerName] = document.addEventListener;

  EventTarget.prototype.addEventListener = addEventListener;
  document.addEventListener = addEventListener;

  // 调用清理循环
  setInterval(clearLoop, 10000);
  window.addEventListener('load', clearLoop, true);
  clearLoop();

  // 添加CSS
  GM_addStyle("html, * {-webkit-user-select:text!important; -moz-user-select:text!important;}");
  
  // 输出原始 addEventListener 位置
  GM_log("原始 addEventListener 名称：" + addEventListenerName);
}

init();

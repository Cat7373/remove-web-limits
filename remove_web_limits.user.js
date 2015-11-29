// ==UserScript==
// @namespace      https://www.github.com/Cat7373/

// @name           网页限制解除
// @name:en        Remove web limits
// @name:zh        网页限制解除

// @description    通杀大部分网站，可以解除禁止复制、剪切、选择文本、右键菜单的限制。
// @description:en Pass to kill most of the site, you can lift the restrictions prohibited to copy, cut, select the text, right-click menu.
// @description:zh 通杀大部分网站，可以解除禁止复制、剪切、选择文本、右键菜单的限制。

// @homepageURL    https://cat7373.github.io/remove-web-limits/
// @supportURL     https://github.com/Cat7373/remove-web-limits/issues/
// @updateURL      https://cat7373.github.io/remove-web-limits/remove_web_limits.user.js

// @author         Cat73
// @version        1.2
// @license        LGPLv3

// @compatible     chrome 46.0.2490.86 + TamperMonkey 测试通过
// @compatible     firefox 42.0 + GreaseMonkey 测试通过
// @compatible     opera 33.0.1990.115 + TamperMonkey 测试通过
// @compatible     safari 未测试

// @match          *://*/*
// @grant          none
// @run-at         document-start
// ==/UserScript==


// 要处理的event
var hook_eventNames = "contextmenu|select|selectstart|copy|cut|dragstart".split("|");
var unhook_eventNames = "mousedown|keydown".split("|");
var eventNames = hook_eventNames.concat(unhook_eventNames);
var eventNames_on = [];
// 原始 addEventListener 的保存位置
var storageName = getRandStr('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', parseInt(Math.random() * 12 + 8));

// Hook addEventListener proc
function addEventListener(type, func, useCapture) {
  if(hook_eventNames.indexOf(type) >= 0) {
    this[storageName](type, returnTrue, useCapture);
  } else if(unhook_eventNames.indexOf(type) >= 0) {
    var funcsName = storageName + type + (useCapture ? 't' : 'f');

    if(this[funcsName] === undefined) {
      this[funcsName] = [];
      this[storageName](type, useCapture ? unhook_t : unhook_f, useCapture);
    }

    this[funcsName].push(func)
  } else {
    this[storageName](type, func, useCapture);
  }
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
function returnTrue(e) {
  return true;
}
function unhook_t(e) {
  return unhook(e, this, storageName + e.type + 't');
}
function unhook_f(e) {
  return unhook(e, this, storageName + e.type + 'f');
}
function unhook(e, self, funcsName) {
  var list = self[funcsName];
  for(var i in list) {
    list[i](e);
  }
  e.returnValue = true;
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
  setInterval(clearLoop, 30 * 1000);
  setTimeout(clearLoop, 2500);
  window.addEventListener('load', clearLoop, true);
  clearLoop();

  // hook addEventListener
  document.__addEventListener = EventTarget.prototype[storageName] = EventTarget.prototype.addEventListener;
  document[storageName] = document.addEventListener;

  EventTarget.prototype.addEventListener = addEventListener;
  document.addEventListener = addEventListener;

  // hook preventDefault
  Event.prototype[storageName] = Event.prototype.preventDefault;
  Event.prototype.preventDefault = function() {
    if(eventNames.indexOf(this.type) < 0) {
      this[storageName]();
    }
  };

  console.debug('storageName：' + storageName);

  // 添加CSS
  addStyle('html, * {-webkit-user-select:text!important; -moz-user-select:text!important;}');
}

init();

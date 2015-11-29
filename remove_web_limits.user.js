// ==UserScript==
// @namespace         https://www.github.com/Cat7373/

// @name              网页限制解除
// @name:en           Remove web limits
// @name:zh           网页限制解除
// @name:zh-CN        网页限制解除
// @name:zh-TW        網頁限制解除
// @name:ja           ウェブの規制緩和

// @description       通杀大部分网站，可以解除禁止复制、剪切、选择文本、右键菜单的限制。
// @description:en    Pass to kill most of the site, you can lift the restrictions prohibited to copy, cut, select the text, right-click menu.
// @description:zh    通杀大部分网站，可以解除禁止复制、剪切、选择文本、右键菜单的限制。
// @description:zh-CN 通杀大部分网站，可以解除禁止复制、剪切、选择文本、右键菜单的限制。
// @description:zh-TW 通殺大部分網站，可以解除禁止復制、剪切、選擇文本、右鍵菜單的限制。
// @description:ja    サイトのほとんどを殺すために渡し、あなたは、コピー切り取り、テキスト、右クリックメニューを選択することは禁止の制限を解除することができます。

// @homepageURL       https://cat7373.github.io/remove-web-limits/
// @supportURL        https://github.com/Cat7373/remove-web-limits/issues/
// @updateURL         https://cat7373.github.io/remove-web-limits/remove_web_limits.user.js

// @author            Cat73
// @version           1.2.2
// @license           LGPLv3

// @compatible        chrome Chrome_46.0.2490.86 + TamperMonkey + 脚本_1.2.2 测试通过
// @compatible        firefox Firefox_42.0 + GreaseMonkey + 脚本_1.2.1 测试通过
// @compatible        opera Opera_33.0.1990.115 + TamperMonkey + 脚本_1.1.3 测试通过
// @compatible        safari 未测试

// @match             *://*/*
// @grant             none
// @run-at            document-start
// ==/UserScript==


// 要处理的event
var hook_eventNames = "contextmenu|select|selectstart|copy|cut|dragstart".split("|");
var unhook_eventNames = "mousedown|mouseup|keydown|keyup".split("|");
var eventNames = hook_eventNames.concat(unhook_eventNames);
var eventNames_on = [];
// 储存名称
var storageName = getRandStr('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', parseInt(Math.random() * 12 + 8));
// 储存被 Hook 的函数
var EventTarget_addEventListener = EventTarget.prototype.addEventListener;
var document_addEventListener = document.addEventListener;
var Event_preventDefault = Event.prototype.preventDefault;

// Hook addEventListener proc
function addEventListener(type, func, useCapture) {
  var _addEventListener = this === document ? document_addEventListener : EventTarget_addEventListener;
  if(hook_eventNames.indexOf(type) >= 0) {
    _addEventListener.apply(this, [type, returnTrue, useCapture]);
  } else if(unhook_eventNames.indexOf(type) >= 0) {
    var funcsName = storageName + type + (useCapture ? 't' : 'f');

    if(this[funcsName] === undefined) {
      this[funcsName] = [];
      _addEventListener.apply(this, [type, useCapture ? unhook_t : unhook_f, useCapture]);
    }

    this[funcsName].push(func)
  } else {
    _addEventListener.apply(this, arguments);
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
  EventTarget.prototype.addEventListener = addEventListener;
  document.addEventListener = addEventListener;

  // hook preventDefault
  Event.prototype.preventDefault = function() {
    if(eventNames.indexOf(this.type) < 0) {
      Event_preventDefault.apply(this, arguments);
    }
  };

  console.debug('storageName：' + storageName);

  // 添加CSS
  addStyle('html, * {-webkit-user-select:text!important; -moz-user-select:text!important;}');
}

init();

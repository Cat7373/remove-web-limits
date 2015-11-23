// ==UserScript==
// @id             99feda91-dcd8-4626-8555-d29c389a997f
// @namespace      https://www.github.com/Cat7373/
// @name           网页限制解除
// @name:en        Remove web limits
// @name:zh        网页限制解除
// @description    解除一些网站的禁止 选择、复制、右键 等限制
// @description:en Deregulating some sites prohibit select, copy, right of
// @description:zh 解除一些网站的禁止 选择、复制、右键 等限制
// @homepageURL    https://github.com/Cat7373/remove-web-limits
// @supportURL     https://github.com/Cat7373/remove-web-limits/issues/
// @installURL     https://github.com/Cat7373/remove-web-limits/raw/master/Remove_web_limits.user.js
// @author         Cat73
// @version        1.1
// @license        LGPLv3
// @compatible     chrome 完美支持
// @compatible     firefox 未测试
// @compatible     opera 未测试
// @compatible     safari 未测试
// @include        http://*
// @include        https://*
// @match          *://*/*
// @grant          unsafeWindow
// @run-at         document-start
// ==/UserScript==

!function(eventNames) {
  // Hook addEventListener
  function addEventListener(event, func, useCapture) {
    if(eventNames.indexOf(event) >= 0) {
      func = function() {
        return true;
      };
    }
    return this._addEventListener(event, func, useCapture);
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

  // 清理限制函数
  function clear() {
    var elements = getElements();

    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];

      if(element.addEventListener !== addEventListener) {
        element.addEventListener = addEventListener;
      }

      for(var j = 0; j < eventNames.length; j++) {
        element['on' + eventNames[j]] = null;
      }
    }
  }

  // 添加css
  function addStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }

  // 将 addEventListener 重定义位置
  HTMLElement.prototype._addEventListener = HTMLElement.prototype.addEventListener;
  document._addEventListener = document.addEventListener;

  // 调用清理函数
  setInterval(clear, 5000);
  window.addEventListener('load', clear, true);
  clear();

  addStyle("html, * {-webkit-user-select:text!important; -moz-user-select:text!important;}");
}("contextmenu|select|selectstart|copy|cut|dragstart".split("|"));

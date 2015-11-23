// ==UserScript==
// @namespace      https://www.github.com/Cat7373/
// @name           网页限制解除
// @name:en        Remove web limits
// @name:zh        网页限制解除
// @description    解除一些网站的禁止 选择、复制、右键 等限制
// @description:en Deregulating some sites prohibit select, copy, right of
// @description:zh 解除一些网站的禁止 选择、复制、右键 等限制
// @include        http://*
// @include        https://*
// @match          *://*/*
// @homepageURL    https://github.com/Cat7373/remove-web-limits
// @supportURL     https://github.com/Cat7373/remove-web-limits/issues/
// @author         Cat73
// @version        1.0
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
  
  // 将 addEventListener 重定义位置
  HTMLElement.prototype._addEventListener = HTMLElement.prototype.addEventListener;
  document._addEventListener = document.addEventListener;

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

  // 初始化
  setInterval(clear, 5000);
  window.addEventListener('load', clear, true);
  clear();
}("contextmenu|select|selectstart|copy|cut|dragstart".split("|"));

// ==UserScript==
// @namespace         https://greasyfork.org/zh-CN/users/106222-qxin-i

// @name              网页限制解除(改)
// @name:en           Remove web limits(modified)
// @name:zh           网页限制解除(改)
// @name:zh-CN        网页限制解除(改)
// @name:ja           ウェブの規制緩和(変更)

// @author            Cat73 & iqxin(修改)
// @contributor       iqxin

// @description       通杀大部分网站,可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73,因为和搜索跳转脚本冲突,遂进行了改动,改为黑名单制。
// @description:en    Pass to kill most of the site, you can lift the restrictions prohibited to copy, cut, select the text, right-click menu.revised version
// @description:zh    通杀大部分网站,可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73,因为和搜索跳转脚本冲突,遂进行了改动,改为黑名单制。
// @description:zh-CN 通杀大部分网站,可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73,因为和搜索跳转脚本冲突,遂进行了改动,改为黑名单制。
// @description:zh-TW 通殺大部分網站,可以解除禁止復制、剪切、選擇文本、右鍵菜單的限制。
// @description:ja    サイトのほとんどを殺すために渡し、あなたは、コピー切り取り、テキスト、右クリックメニューを選択することは禁止の制限を解除することができます。

// @description       原作者https://www.github.com/Cat7373/,因为和搜索跳转脚本冲突,遂进行了改动
// @homepageURL       https://cat7373.github.io/remove-web-limits/
// @supportURL        https://greasyfork.org/zh-CN/scripts/28497

// @icon               data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABpElEQVR4nO3Vv2uUQRDG8c/ebSMWqay0trATAxrUSi1S2AiWFoJYpNCgoBjURsHWJKeNRfAvsDgFixQqKdPZ2ViEiCJYBOQu8f1hEXO59713j7MUfLZ6d2a/O8vMO0OzDnin9Ku2Mjvuaw07xgSAYEVXe2indMhj92zpKJLnBhF8MDeye9hn6zbN70eRiqCw02Bra3up8BBLu1FEBxsBucXqW4csz0ULe4jorSCMuPU89boRELDMHiI6Y8V65bbCUTccc70RkaOwKLOg0IkyXa9qTjOu2LAs6NZuD86hrdTyxRNTkUqqdhXlHrngGRVEZsMpJwex9DxIZSHYclesIb65LCoHgIs66UJq6btDBZHZrPh8V6YBOX66LbOkTGckBYimBW2FVTNeuOZNyrFJ236Yl4NSy5SbVm1PDvhodqgyMledTdRlAtDzqfL9tfkwUtyaRkv9LwFj9B/w7wPycXOhqlJ0yZHKPChMi5MCiM47XhsopbVJAUHfrYbmN/EToN+02eLPfz9OYyZhFJzW1Jn3lTsxaKQjCkp52jy45r1ZvSbTb9M0d4PBozGZAAAAAElFTkSuQmCC

// @version           4.1.5
// @license           LGPLv3

// @compatible        chrome Chrome_46.0.2490.86 + TamperMonkey + 脚本_1.3 测试通过
// @compatible        firefox Firefox_42.0 + GreaseMonkey + 脚本_1.2.1 测试通过
// @compatible        opera Opera_33.0.1990.115 + TamperMonkey + 脚本_1.1.3 测试通过
// @compatible        safari 未测试

// @match             *://*/*
// @exclude        *www.bilibili.com/video*
// @exclude        *www.bilibili.com/bangumi*
// @exclude        *www.panda.tv*

// @connect     eemm.me
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @run-at      document-start
// ==/UserScript==
(function() {
    'use strict';

    var settingData = {
        "status":1,
        "version" : 0.1,
        "message" : "啦啦啦,啦啦啦,我是卖报的小行家",
        // "position" : ["0","0","auto"],
        "positionTop":"0",
        "positionLeft":"0",
        "positionRight":"auto",
        "addBtn" : true,
        "connectToTheServer" : true,
        "waitUpload":[],
        "currentURL":"null",
        // 域名规则列表
        "rules" : {
            "rule_def": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousemove|beforeunload",
                "unhook_eventNames": "mousedown|mouseup|keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            },
            "rule_plus": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousedown|mouseup|mousemove|beforeunload",
                "unhook_eventNames": "keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            },
            "rule_zhihu": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousemove",
                "unhook_eventNames": "keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            }
        },
        "data": [
            "ks.wjx.top",
            "b.faloo.com",
            "bbs.coocaa.com",
            "book.hjsm.tom.com",
            "book.zhulang.com",
            "book.zongheng.com",
            "chokstick.com",
            "chuangshi.qq.com",
            "city.udn.com",
            "cutelisa55.pixnet.net",
            "huayu.baidu.com",
            "imac.hk",
            "life.tw",
            "luxmuscles.com",
            "news.missevan.com",
            "read.qidian.com",
            "www.15yan.com",
            "www.17k.com",
            "www.18183.com",
            "www.360doc.com",
            "www.coco01.net",
            "www.eyu.com",
            "www.hongshu.com",
            "www.hongxiu.com",
            "www.imooc.com",
            "www.jjwxc.net",
            "www.readnovel.com",
            "www.tadu.com",
            "www.xxsy.net",
            "www.z3z4.com",
            "www.zhihu.com",
            "yuedu.163.com",
            "www.ppkao.com",
            "movie.douban.com",
            "www.ruiwen.com",
            "vipreader.qidian.com",
            "www.pigai.org",
            "www.shangc.net",
            "www.sdifen.com"
        ]
    }

    var rwl_userData = null;
    var hostname = window.location.hostname;
    var btn_node = null;
    var rule = null;
    var list = null;

    // 储存名称
    var storageName = "iqxinStorageName";
    // 要处理的 event 列表
    var hook_eventNames, unhook_eventNames, eventNames;
    // 储存被 Hook 的函数
    var EventTarget_addEventListener = EventTarget.prototype.addEventListener;
    var document_addEventListener = document.addEventListener;
    var Event_preventDefault = Event.prototype.preventDefault;


    // 查看本地是否存在旧数据
    rwl_userData = GM_getValue("rwl_userData");
    if(!rwl_userData){
        rwl_userData = settingData
        // GM_setValue("rwl_userData",rwl_userData);
    }

    version_up_3_to_4();

    // 获取黑名单网站
    list = get_black_list();

    // 添加按钮
    if(rwl_userData.addBtn){
        addBtn(); // 添加
        btn_node = document.getElementById("black_node");
        setTimeout(function(){
            try {
                dragBtn()
            } catch (e) {
                console.error("dragBtn函数 报错");
            }
        },1000)
        // dragBtn(); // 增加拖动事件
    }

    // 检查是否在黑名单中
    if(check_black_list(list,hostname)){
        try {
            if(rwl_userData.addBtn){
                btn_node.checked = true;
            }
        } catch (e) {
            console.error("脚本rwl-错误：\n btn_node : %s\n%s\n脚本rwl-错误位置： btn_node.checked = true;",btn_node,e);
        } finally {
            init();
        }
    }


    // // ------------------------------函数 func

    //添加按钮 func
    function addBtn(){
        var node = document.createElement("remove-web-limits-iqxin");
        node.id = "rwl-iqxin";
        node.className = "rwl-exempt";

        // 再次打开窗口小于之前窗口的情况,导致按钮出现在可视窗口之外
        var screenClientHeight = document.documentElement.clientHeight;
        var tempHeight;
        if (rwl_userData.positionTop>screenClientHeight){
            tempHeight = screenClientHeight -40;
        } else{
            tempHeight = rwl_userData.positionTop;
        }
        // 改变窗口大小的情况
        window.onresize=function(){
            var screenClientHeight = document.documentElement.clientHeight;
            var tempHeight;

            if (rwl_userData.positionTop>screenClientHeight){
                tempHeight = screenClientHeight -40;
            } else{
                tempHeight = rwl_userData.positionTop;
            }

            node.style.top = tempHeight + "px";
        }

        tempHeight = tempHeight<0?0:tempHeight
        node.style.cssText = "position:fixed;top:"+tempHeight+"px;left:"+rwl_userData.positionLeft+"px;right:"+rwl_userData.positionRight+"px;";
        // node.innerHTML = '<label><input type="checkbox" name="" id="black_node">黑名单</label><button id="delete">delete</btton>';
        // node.innerHTML = '<label>限制解除 <input type="checkbox"  name="" id="black_node"></label>';
        node.innerHTML = '<button type="button" id="rwl-setbtn"> set </button> <lalala style="cursor:move;">限制解除</lalala> <input type="checkbox" name="" id="black_node" >';
        if(window.self === window.top){
            if (document.querySelector("body")){
                document.body.appendChild(node);
            } else {
                document.documentElement.appendChild(node);
            }
        }
        node.addEventListener("mouseover",function(){
            node.classList.add("rwl-active-iqxin");
        });
        node.addEventListener("mouseleave",function(){
            setTimeout(function(){
                node.classList.remove("rwl-active-iqxin");
                black_check(btn_node.checked);
            },100)
        });

        var style = document.createElement("style");
        style.type="text/css";
        style.innerHTML = "#rwl-iqxin{" +
                "position:fixed;" +
                // "top:0;" +
                // "left:0px;" +
                "transform:translate(-90px,0);" +
                "width:85px;" +
                "height:25px;" +
                "font-size:12px;" +
                "font-weight: 500;" +
                "font-family:Verdana, Arial, '宋体';" +
                "color:#fff;" +
                "background:#333;" +
                "z-index:2147483647;" +
                "margin: 0;" +
                "opacity:0.05;" +
                "transition:0.3s;" +
                "overflow:hidden;" +
                "user-select:none;" +
                "text-align:center;" +
                "white-space:nowrap;" +
                "line-height:25px;" +
                "padding:0 16px;" +
                "border:1px solid #ccc;" +
                "border-width:1px 1px 1px 0;" +
                "border-bottom-right-radius:5px;" +
                "box-sizing: content-box;" +
            "}" +
            "#rwl-iqxin input{" +
                "margin: 0;" +
                "padding: 0;" +
                "vertical-align:middle;" +
                "-webkit-appearance:checkbox;" +
                "-moz-appearance:checkbox;" +
                "position: static;" +
                "clip: auto;" +
                "opacity: 1;" +
                "cursor: pointer;" +
            "}" +
            "#rwl-iqxin.rwl-active-iqxin{" +
                // "top: 10px;" +
                "left: 0px;" +
                "transform:translate(0,0);" +
                "opacity: 0.9;" +
                "height: 32px;" +
                "line-height: 32px" +
            "}" +
            "#rwl-iqxin label{" +
                "margin:0;" +
                "padding:0;" +
                "font-weight:500;" +
            "}" +
            "#rwl-iqxin button{" +
                "margin: 0;" +
                "padding: 0 2px;" +
                "border: none;" +
                "border-radius: 2px;" +
                "cursor: pointer;" +
            "}" +
            // 设置菜单
            "#rwl-setMenu{" +
                "text-align:left;" +
                "font-size:14px;" +
                "z-index:999999;" +
                "border: 1px solid cornflowerblue;" +
            "}" +
            "#rwl-setMenu p{" +
                "margin:5px auto;" +
            "}" +
            " ";
            document.querySelector("#rwl-iqxin").appendChild(style);
    };


    document.querySelector("#rwl-setbtn").addEventListener("click",function(){
        var oldEditBox = document.querySelector("#rwl-setMenu");
        if(oldEditBox){
            oldEditBox.parentNode.removeChild(oldEditBox);
            return;
        }
        var userSetting = GM_getValue("rwl_userData");
        var upload_checked = userSetting.connectToTheServer?"checked":"";

        var odom = document.createElement("div");
        odom.id = "rwl-setMenu";
        odom.style.cssText ="position: absolute;" +
            "top: 50px;" +
            "left: 20px;" +
            "padding: 10px;" +
            "background: #fff;" +
            "border-radius: 4px;";
        var innerH = "" +
            "<p>距离顶部距离（单位 像素） <input id='positiontop' type='text' value=" + userSetting.positionTop + "></p>" +
            "<laberl> <p>允许上传黑名单<input id='uploadchecked'  type='checkbox' " + upload_checked + "></p></laberl>" +
            "<p><s>显示按钮（待添加）</s></p>" +
            "<p><s>按钮透明度（待添加）</s></p>" +
            "<p><s>快速复制（待添加）</s></p>" +
            "<p><s>其他 (待添加）</s></p>" +
            "<textarea wrap='off' cols='45' rows='20' style='overflow:auto;border-radius:4px;'>" + JSON.stringify(userSetting.data,false,4) + "</textarea>" +
            "<br>" +
            // "<button id='rwl-reset'>清空设置</button> &nbsp;&nbsp;&nbsp;" +
            "<button id='rwl-setMenuSave'>保存</button> &nbsp;&nbsp;&nbsp;" +
            "<button id='rwl-setMenuClose' onclick='this.parentNode.parentNode.removeChild(this.parentNode);' >关闭</button> &nbsp;&nbsp;&nbsp;" +
            // "<button id='rwl-codeboxsave'>保存</button>" +
            "<span style='font-size:0.7em;'>-- 啦啦啦，啦啦啦， --</span>";
        odom.innerHTML = innerH;
        document.body.appendChild(odom);

        document.querySelector("#rwl-setMenuSave").addEventListener("click",saveSetting);

    })

    // 保存选项
    function saveSetting(){
        var positionTop = document.querySelector("#rwl-setMenu #positiontop").value;
        var uploadChecked = document.querySelector("#rwl-setMenu #uploadchecked").checked;
        var codevalue = document.querySelector("#rwl-setMenu textarea").value;
        // console.log(positionTop,uploadChecked);
        if(codevalue){
            console.log(JSON.parse(codevalue));
            var userSetting = GM_getValue("rwl_userData");

            userSetting.data = JSON.parse(codevalue);
            userSetting.positionTop = parseInt(positionTop);
            userSetting.connectToTheServer = uploadChecked;

            GM_setValue("rwl_userData",userSetting);
            // console.log(GM_getValue("searchEngineJumpData"));
            // 刷新页面
            setTimeout(function(){
                window.location.reload();
            },300);
        } else {
            alert("输入为空");
            // this.reset();
        }
        closeMenu();
    }

    //关闭菜单
    function closeMenu(){
        var oldEditBox = document.querySelector("#rwl-setMenu");
        if(oldEditBox){
            oldEditBox.parentNode.removeChild(oldEditBox);
            return;
        }
    }

    // 增加拖动事件 func
    function dragBtn(){
        var rwl_node = document.querySelector("#rwl-iqxin");
        // console.log(rwl_node);
        rwl_node.addEventListener("mousedown",function(event){
            rwl_node.style.transition = "null";
            var disX = event.clientX - rwl_node.offsetLeft;
            var disY = event.clientY - rwl_node.offsetTop;

            var move = function(event){
                rwl_node.style.left = event.clientX - disX + "px" ;
                rwl_node.style.top = event.clientY - disY + "px" ;
            }

            document.addEventListener("mousemove",move);
            document.addEventListener("mouseup",function(){
                rwl_node.style.transition = "0.3s";
                document.removeEventListener("mousemove",move);
                // 此函数内所有的注释语句都是有用的
                    // 开启后,可拖动到屏幕右侧,但尚未添加css
                    // 在上面添加 rwl-active-iqxin 的地方加上判断左右,在加上相应的css即可
                    // 懒 2018-04-18 21:51:32
                // var bodyWidth = document.body.clientWidth;
                var rwl_nodeWidth = rwl_node.offsetLeft + rwl_node.offsetWidth/2;
                // if(rwl_nodeWidth > bodyWidth/2){
                //     rwl_node.style.left = "auto";
                //     rwl_node.style.right = 0;
                //     rwl_userData.positionLeft = "auto";
                //     rwl_userData.positionRight = "0";
                // } else {
                    rwl_node.style.right = rwl_userData.positionRight = "auto";
                    rwl_node.style.left = rwl_userData.positionLeft = 0;
                // }
                rwl_userData.positionTop = rwl_node.offsetTop;
                // console.log(rwl_userData);
                GM_setValue("rwl_userData",rwl_userData);

            })
        })
    }

    // 初始化 init func
    function init() {
        console.log("脚本-rwl-复制限制解除(改)------使用规则-----------------iqxin");
        // 针对个别网站采取不同的策略
        rule = clear();
        // 设置 event 列表
        hook_eventNames = rule.hook_eventNames.split("|");
        // TODO Allowed to return value
        unhook_eventNames = rule.unhook_eventNames.split("|");
        eventNames = hook_eventNames.concat(unhook_eventNames);

        // 调用清理 DOM0 event 方法的循环
        if(rule.dom0) {
            setInterval(clearLoop, 5 * 1000);
            setTimeout(clearLoop, 1500);
            window.addEventListener('load', clearLoop, true);
            clearLoop();
        }

        // hook addEventListener //导致搜索跳转失效的原因
        if(rule.hook_addEventListener) {
            EventTarget.prototype.addEventListener = addEventListener;
            document.addEventListener = addEventListener;
        }

        // hook preventDefault
        if(rule.hook_preventDefault) {
            Event.prototype.preventDefault = function() {
                if(hook_eventNames.indexOf(this.type) < 0) {
                    Event_preventDefault.apply(this, arguments);
                }
            };
        }

        // Hook set returnValue
        if(rule.hook_set_returnValue) {
            Event.prototype.__defineSetter__('returnValue', function() {
                if(this.returnValue !== true && hook_eventNames.indexOf(this.type) >= 0) {
                    this.returnValue = true;
                }
            });
        }

        // 添加CSS     // console.debug('url: ' + url, 'storageName：' + storageName, 'rule: ' + rule.name);
        if(rule.add_css) {
            GM_addStyle('html, :not([class*="rwl-exempt"]) {-webkit-user-select:text!important; -moz-user-select:text!important;} :not([class*="rwl-exempt"]) ::selection {color:#fff; background:#3390FF; !important;}');
        } //else {
            //GM_addStyle('html, :not([class*="rwl-exempt"]) {-webkit-user-select:text!important; -moz-user-select:text!important;}');
        //}
    }

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

            this[funcsName].push(func);
        } else {
            _addEventListener.apply(this, arguments);
        }
    }

    // 清理循环
    function clearLoop() {
        rule = clear() // 对于动态生成的节点,随时检测
        var elements = getElements();

        for(var i in elements) {
          for(var j in eventNames) {
            var name = 'on' + eventNames[j];

            // ;?未解决
                // 2018-04-02 elements中会有字符串出现,原版不会,问题不明,根本原因尚未解决
                // 相关反馈  https://greasyfork.org/zh-CN/forum/discussion/36014
                // 问题版本号  v3.0.7
                // 问题补充   之前可以使用,具体版本未测（2018-04-02 21:27:53）,原版可以使用
            if(Object.prototype.toString.call(elements[i])=="[object String]"){
                continue;
            }

            if(elements[i][name] !== null && elements[i][name] !== onxxx) {
                if(unhook_eventNames.indexOf(eventNames[j]) >= 0) {
                    elements[i][storageName + name] = elements[i][name];
                    elements[i][name] = onxxx;
              } else {
                    elements[i][name] = null;
              }
            }
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
    function onxxx(e) {
        var name = storageName + 'on' + e.type;
        this[name](e);

        e.returnValue = true;
        return true;
    }

    // 获取所有元素 包括document
    function getElements() {
        var elements = Array.prototype.slice.call(document.getElementsByTagName('*'));
        elements.push(document);
        return elements;
    };

    // 获取黑名单网站 Func
    function get_black_list(){
        // 之前版本可能导致存储空的字符串
            // 2018-06-11 15:11:44 保留,当容错处理
        var data_temp = rwl_userData.data;
        data_temp = data_temp.filter(function(item){
                return item.length>1;
            })
        return data_temp;
    }

    // 检查是否存在于黑名单中 返回位置 func
    function check_black_list(list,host){
        for(let i=0;i<list.length;i++){
            if(~hostname.indexOf(list[i])){
                return i+1; //万一匹配到第一个,返回0
            }
        }
        return false;
    }

    // 鼠标点击后按钮后 检查是否在黑名单
    function black_check(bool){
        var list = GM_getValue("rwl_userData").data
        var check = check_black_list(list,hostname);

        console.log(list)

        if (bool && !check) {
            console.log(list);
            list = list.concat(hostname);
            console.log("选中 不在黑名单, 增加",hostname,list);

            console.log("before: ",rwl_userData.waitUpload)
            rwl_userData.waitUpload.push(hostname); //准备上传
            rwl_userData.currentURL = window.location.href;
            console.log("after: ",rwl_userData.waitUpload)

            saveData(list);
            init();

        }else if(!bool && check){
            // console.log(check-1);
            console.log("check: ",check)
            list.splice(check-1,1);
            console.log("未选中 在黑名单, 刪除",list);

            saveData(list);

            // 刷新页面
            setTimeout(function(){
                window.location.reload(true);
                console.log("刷新页面loading");
            },350);
        }else{
            console.log("返回false");
            return false;
        }
    }

    // 保存本地数据,并将数据上传至服务器
    function saveData(lists){
        console.log(lists);
        lists = lists.filter(function(item){
            return item.length>1;
        })

        // 更新数据
        rwl_userData.data = lists.sort();

        // 将本地黑名单上传
        if (rwl_userData.waitUpload.length > 0 && rwl_userData.connectToTheServer){
            // console.log("rwl : 上传...",rwl_userData.waitUpload);
            // console.log("rwl : 开始上传-----");
            GM_xmlhttpRequest({
              method: "POST",
              // url: "http://127.0.0.1:8000/tool/testajax/",
              url: "http://eemm.me/tool/rwl_upload/",
              data: JSON.stringify(rwl_userData),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              onload: function(response) {
                // console.log("rwl : 上传成功----");
              }
            });
            rwl_userData.waitUpload = [];
        }

        GM_setValue("rwl_userData",rwl_userData);
        // console.log(GM_getValue("rwl_userData"));
        return rwl_userData;
    }

    // 数组去重
    function unique(arr) {
      var ret = []
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        if (ret.indexOf(item) === -1) {
          ret.push(item)
        }
      }
      return ret;
    }

    // 复制到剪贴板
    function setClipboard(){
        var text_obj = window.getSelection();
        var text = text_obj.toString();
        GM_setClipboard(text);

    }

    // 部分网站采用了其他的防复制手段
    function clear(){
        // console.log("进入clear",hostname,rwl_userData.rules);
        switch (hostname){
            case "www.z3z4.com": clear_covers(".moviedownaddiv"); break;
            case "huayu.baidu.com": clear_covers("#jqContextMenu"); break;
            case "zhihu.com":
            case "www.zhihu.com": return rwl_userData.rules.rule_zhihu; break;
            case "t.bilibili.com": clear_link_bilibili(); break;
            case "www.shangc.net": return rwl_userData.rules.rule_plus; break;
        }
        return rwl_userData.rules.rule_def;
    }
    // 去除覆盖层
    function clear_covers(ele){
        var odiv = document.querySelector(ele);
        if(odiv){
            odiv.parentNode.removeChild(odiv);
        }
    }
    // b站将文字嵌套在链接中
    function clear_link_bilibili(){
        var odiv = document.querySelector(".description");
        // console.log(odiv);
        if(odiv){
            var tDiv = odiv.querySelector(".content-ellipsis");
            var aDiv = odiv.querySelector("a");
             // console.log(tDiv);
             // console.log(aDiv);
             odiv.appendChild(tDiv);
        }
    }

    // 3.x.x 过渡 4.x.x 版本
    function version_up_3_to_4(){
        var old_version = GM_getValue("black_list");
        if(!old_version){return};
        rwl_userData.data = unique(rwl_userData.data.concat(old_version.data));
        GM_setValue("rwl_userData",rwl_userData);

        GM_deleteValue("black_list");
        GM_deleteValue("rwl_userdata");
    }
}());

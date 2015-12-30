/**
 * 适用于在web端打开native app的zepto 组件
 *
 * Examples:
 *
 *     $('a[data-app=baidu]').openApp({
 *         //options
 *     })
 *
 * @version 0.2.0
 * @author wlsy <i@wlsy.me || zhuangxiaoming@baidu.com>
 *
 */

(function($, win) {

    /**
     * Open App
     *
     * @param {Object} opts 配置选项
     * @api publish
     */

    $.fn.openApp = function(opts) {

        //规范约定所有native状态均保存在window.app下 
        window.app = window.app || {};

        var self = this;

        var fn = function() {};
        var cacheAppInfo;

        var defaultOpts = {
            appName: '',
            checkAppUri: '',
            openAppUri: '',
            lastestAppUri: '',
            afterInit: fn,
            afterDownload: fn,
            afterCancel: fn,
            afterOpenApp: fn,
            popupHeaderText: '',
            popupAgainHeaderText: '',
            popupAgainBodyText: '',
            view: {
                popup: ['<p style="color: rgb(42, 141, 232); font-size: 16px; font-family: bold; padding: 36px 0px 18px 20px;text-align:left;">'+ opts.popupHeaderText+'</p>',
                    '<p style="padding-left: 20px; color: #555;text-align:left;">请下载最新版V{version}（安装包{size}）</p>', 
                    '<div style="margin-top: 32px; border: 1px solid rgb(211, 211, 211); line-height: 40px;">', 
                    '<a id="J_OpenAppCancel" href="#" style="display: inline-block; height: 40px; width: 50%; text-decoration: initial; color: rgb(136, 136, 136); text-align: center; font-size:15px;">以后再说</a>', 
                    '<a id="J_OpenAppOk" href="{download}" style="display: inline-block; height: 40px; width: 49%; text-align: center; border-left: 1px solid rgb(211, 211, 211); text-decoration: initial; color: #2A8DE8;font-size:15px;">确定下载</a>', '</div>'].join(''),
                downloadTip: '<img style="-webkit-animation: openapp 2 linear 1s;" width="14" height="14" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAgCAYAAAABtRhCAAABWklEQVRIx+2WP0uEYBjAvaLrCK6GaKqvUEN9gWgsaGhtbmi6IYccApfoE0S43xcIwiE4XOTQIaTIUZByMSQTFbv88/Tc0XAc552vejeEP/iNPr/B932UAgCK0Cb6iEroBkUKYWwF7cAfvu+/yrK8PqtgHX2AEVzXfRJFsVl2sIa2IQXHcURBEBplBm9hCpZl3bMsu1BG8BIyYhjGXdHgKZoAAbquX+UNHqA9ICfRNO2cNLiNfkFOkiT5URTlMGtwC32HgoRh+ClJ0s604Br6AiURBMFbt9vdTAvWh7dIWXie98zz/OpocOLFLopt2x2O45aGgzcwY0zTbGOu1o+dwZzAO3rdD5rzCuLJtQcnk6bpo1ardTzOKIp8kqFpcxiGOdlHBu8QWUSXx0m6APCZvbRZaCPL8s4TLPS1qIJVsApWwX8Y/CD5WysjeBHH8XeGWE9VVQ5H7k7q/QKgkovT52BHYgAAAABJRU5ErkJggg==" />从顶部下拉，查看下载进度并安装',
                popupAgain: ['<p style="font-size: 16px; font-family: bold; padding: 36px 0px 18px 20px;text-align:left;">' + opts.popupAgainHeaderText + '</p>' ,
                    '<p style="padding-left: 20px; font-size: 16px;font-family: bold;text-align:left;">' + opts.popupAgainBodyText + '</p>' ,
                    '<div style="margin-top: 32px; border: 1px solid rgb(211, 211, 211); line-height: 40px;">' ,
                    '<a id="J_OpenAppCancel" href="#" style="display: inline-block; height: 40px; width: 50%; text-decoration: initial; color: rgb(136, 136, 136); text-align: center;font-size:15px;">手动开启</a>' ,
                    '<a id="J_OpenAppOk" href="{download}" style="display: inline-block; height: 40px; width: 49%; text-align: center; border-left: 1px solid rgb(211, 211, 211); text-decoration: initial; color: #2A8DE8;font-size:15px;">仍然下载</a>' ,
                    '</div>'].join('')
            }
        }

        opts = $.extend(defaultOpts, opts || {})

        var view = {
            mask: $('<div id="J_OpenAppMask"/>').css({
                width: '100%',
                height: $(win).height() + 300,
                background: 'rgba(0,0,0,.4)',
                position: 'fixed',
                zIndex: 10,
                top: 0,
                left: 0
            }),
            popup: {
                container: $('<div id="J_OpenAppPopup"/>').css({
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    width: 290,
                    marginTop: '-100px',
                    marginLeft: '-145px',
                    zIndex: '11',
                    fontSize: 15,
                    borderRadius: 2,
                    background: '#fff'
                }),
                render: function(data) {
                    var content = (localStorage && localStorage[opts.appName] && localStorage[opts.appName] === '1') ? opts.view.popupAgain : opts.view.popup;

                    var html = content.
                    replace(/\{version\}/, data.version).
                    replace(/\{size\}/, data.size).
                    replace(/\{download\}/, data.download);

                    this.container.html(html)
                    return this.container;
                }
            },
            downloadTip: $('<div id="J_OpenAppTip"/>').css({
                height: 40,
                width: $(window).width() - 16,
                background: 'rgba(0,0,0,.9)',
                border: '1px solid #1a1a1a',
                borderRadius: 2,
                boxShadow: '0 0 2px #d1d1d1',
                position: 'fixed',
                lineHeight: '40px',
                color: '#fff',
                margin: '8px',
                zIndex: 12,
                textAlign: 'center',
                top: 0,
                left: 0
            }).html(opts.view.downloadTip),

            render: function(data) {
                $('#J_OpenAppMask').length ? $('#J_OpenAppMask').show() : $('body').append(this.mask);
                $('body').append(this.popup.render(data));
            }
        };

        /**
         * 隐藏弹框和遮罩层 
         *
         * @api private
         */
        function hideAll() {
            $('#J_OpenAppMask').hide()
            $('#J_OpenAppPopup').remove()
        }

        /**
         * 检查最新版本的app包信息  
         *
         * @param {Function} next 执行成功回调
         * @api private
         */

        function lastestApp(next) {
            if (!cacheAppInfo) {
                $.ajaxJSONP({
                    url: opts.lastestAppUri,
                    success: function(data) {
                        cacheAppInfo = data;
                        next.call(null, cacheAppInfo)
                    },
                    complete: function() {}
                })
            } else {
                next.call(null, cacheAppInfo)
            }
        }

        /**
         * 检查app是否安装  
         *
         * @param {Function} sfn 请求成功的回调函数
         * @param {Function} efn 请求失败的回调函数
         * @api private
         */
        function checkApp(sfn, efn) {

            //使用中间传值 避免多次重复请求请求检查
            // 1 => 正在检查
            // 2 => 已经安装
            // 0 => 没有安装
            win.app[opts.appName] = 1

            try {
                $.ajaxJSONP({
                    url: opts.checkAppUri,
                    timeout: 2000,
                    success: function(data) {
                        win.app[opts.appName] = 2
                        sfn();
                    },
                    error: function() {
                        win.app[opts.appName] = 0
                        efn();
                    },
                    complete: function() {}
                })

            } catch (e) {}
        }

        /**
         * 显示顶部提示框,并附带性感箭头动画  
         *
         * @api private
         */

        function renderDownloadTip() {
            var timer;

            //动画 keyframes
            if (!$('#J_OpenAppKeyFrames').length) {
                $('head').append('<style id="J_OpenAppKeyFrames"> @-webkit-keyframes openapp{ 0% { -webkit-transform: translate(0,0) } 25% { -webkit-transform: translate(0,4px) } 75% { -webkit-transform: translate(0,-4px) } 100% { -webkit-transform: translate(0,0);}} </style>')
            }

            $('#J_OpenAppTip').length ? $('#J_OpenAppTip').show() : $('body').append(view.downloadTip)

            timer = setTimeout(function() {
                $('#J_OpenAppTip').hide()
            }, 3000)

            // 在本地存储中存储下载状态
            // 1 => 已经下载过了
            window['localStorage'][opts.appName] = 1;

        }

        //交互处理  
        $(this).on('click', function(ev) {
            ev.preventDefault()

            // 检查到有安装，吊起app
            function successCallback() {
                $.get(opts.openAppUri)
                opts.afterOpenApp();
            }

            // 检查到没有安装，显示弹框
            function errorCallback() {

                //检查app并显示弹框
                lastestApp(function(data) {
                    view.render(data)
                })

            }

            if (win.app[opts.appName]) {
                return successCallback();
            }

            checkApp(successCallback, errorCallback);
            opts.afterInit();
        })

        $('body').on('click', '#J_OpenAppCancel', function(ev) {
            ev.preventDefault()
            hideAll()
            opts.afterCancel();
        })

        $('body').on('click', '#J_OpenAppOk', function(ev) {
            ev.preventDefault()
            hideAll()
            renderDownloadTip();
            window.location.href = this.href;
            opts.afterDownload();
        })
    }

}(Zepto, window));

# Wise中同native app通信和组件使用说明

<small> V2, created by zhuangxiaoming@baidu.com , 2013-01-16 </small>

<small> V1, created by zhuangxiaoming@baidu.com , 2012-11-29 </small>

## 背景

inapp .

## 流程图
![流程图](./component/openapp/docs/diagrams.png)

## Wise openapp 组件

组件中已经处理流程中的一些细节问题，让你能方面使用，可以在这里[下载](http://zhuangxiaoming.fe.baidu.com/modules/openapp/openapp.zip)

### Example

        $('a[data-target=baiduapp]').openapp({
            packageName:'com.tencent.mobileqq',
            openAppUri:"http://localhost:9081/?url=aa",
            popupHeaderText:'呵呵',
            popupAgainHeaderText: '嘻嘻',
            popupAgainBodyText: '请手动安装并开启, hello world'
        })

### 配置选项说明

`packageName` _String_
    
    packageName的名称，同时在window.app 和 localStorge 中都有它，用来保存app 状态。同时也会根据packagename去as请求最新app版本信息和下载地址

`checkAppUri` _String_

    用来探测本地是否安装该app

    [!] 0.4.0 版本后用openAppUri替代

`lastestAppUri` _String_

    用来获取app的最新版本信息，返回格式见上面

    [!] 0.4.0 版本后会根据packagename来拼装地址去as获取

`openAppUri` _String_

    用来打开app的注册地址

`popupHeaderText` _String_

    第一次弹出框头部文案

`popupAgainHeaderText` _String_

    但已经下载过，当时没有安装的时候出现的弹框的头部文案

`popupAgainBodyText` _String_

    但已经下载过，当时没有安装的时候出现的弹框的主要文案

`afterInit` _Function_

    点击之后执行的回调

`afterDownload` _Function_

    点击下载后执行的回调

`afterCancel` _Function_

    点击取消后执行的回调

`afterOpen` _Function_

    打开app后执行的回调

`view` _Object_

    用来重置弹框展现，具体可参见代码

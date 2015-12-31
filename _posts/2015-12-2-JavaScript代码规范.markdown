---
layout:     post
title:      "JavaScript代码规范"
subtitle:   "JavaScript代码规范"
date:       2015-11-10
author:     "wttree"
header-img: "img/post-bg-e2e-ux.jpg"
tags:
    - nodePPT
    - nodejs
---

# JavaScript代码规范


## 1.基础库下移
    基础库下移是指Zepto和Aladdin Base库绝大部分内容从<head>内转移到body之后
    其目的是减少基础库JS代码阻塞页面，缩短加载时的白屏时间，符合前端优化原则

### JavaScript代码写法

#### 如何保证依赖Zepto的代码能正确执行？
    // 对于阿拉丁而言：
    A.init(function(){
        // 将你的JS代码这样包裹一层
        // 即可自动满足JS执行依赖问题
    });

    // 对于非阿拉丁而言：
    B.init(function(){
        // 将你的JS代码这样包裹一层
        // 即可自动满足JS执行依赖问题
    });

#### 例外：
    A.setup( ... ); // A.setup无需包裹（且不能包裹），直接写
    // 不依赖Zepto的代码无需包裹
    // 本身就在页脚的代码无需包裹

## 2.window onload事件

### 背景
    在onload事件中发起JSONP或图片请求，会造成浏览器的进度条延迟走完（影响用户体验）。

具体DEMO和调研请参考：这里[onload事件和浏览器进度条的关系](http://ws.baidu.com/#/技术专区/技术调研/onload事件和浏览器进度条的关系)

### onload事件的写法规范（用组件）
    // 对于阿拉丁而言：
    A.init(function(){
        // A.init包裹不能省
        A.onload(function(){
            // 会为你绑定window onload事件，且避免进度条卡住的问题
        });
    });

    // 对于非阿拉丁而言：
    B.init(function(){
        // B.init包裹不能省
        B.onload(function(){
            // 会为你绑定window onload事件，且避免进度条卡住的问题
        });
    });

### 注意点：

* A.onload和B.onload中，所绑定函数的执行顺序，**不一定**和绑定顺序完全一致，在不同函数之间切记不要互相依赖。
* 过去我们用**原生写法：**`window.addEventListener('load')`或者**Zepto写法：**`$(window).on('load')`绑定load事件时，如果window.onload已经触发过了（例如代码是异步加载进来的），绑定会无效。上述两个函数会解决这个问题——**即使在真实的onload事件触发过后才绑定的，也会被正确地执行**。
    
## 3.全局变量
    允许如下全局变量
    B：搜索基本功能，目前包含B.init和B.lsCache和B.onload，未来会在这上面添加更多业务功能
    $和Zepto
    A：阿拉丁基础库
    baidu.sug：suggestion用的JSONP回调函数

### 规则 
* 全局变量采用驼峰式
* 简明易懂易区分

### 全局变量使用备案

<table border="1" cellspacing="0" cellpadding="0">
  <tr>
    <td width="150" align="center"><strong>搜索</strong></td>
    <td width="150" align="center"><strong>框</strong></td>
    <td width="150" align="center"><strong>浏览器</strong></td>
    <td width="200" align="center"><strong>备注</strong></td>
  </tr>
  <tr>
    <td align="left">&nbsp;Zepto</td>
    <td align="left">&nbsp;Zepto</td>
    <td align="left">&nbsp;Zepto</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">&nbsp;_zid:zepto自带</td>
    <td align="left">&nbsp;_zid:zepto自带</td>
    <td align="left">&nbsp;_zid:zepto自带</td>
    <td align="left">&nbsp;</td>
  </tr>
    <tr>
    <td align="left">&nbsp;$</td>
    <td align="left">&nbsp;$</td>
    <td align="left">&nbsp;$</td>
    <td align="left">&nbsp;</td>
  </tr>
    <tr>
    <td align="left">&nbsp;baidu.sug</td>
    <td align="left">&nbsp;baidu.sug</td>
    <td align="left">&nbsp;baidu.sug</td>
    <td align="left">&nbsp;suggestion用的JSONP回调函数</td>
  </tr>
  <tr>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;baiduboxapp</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;baiduboxapp用于ios上框</td>
  </tr>
  <tr>
    <td align="left">&nbsp;B</td>
    <td align="left">&nbsp;B</td>
    <td align="left">&nbsp;B</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">&nbsp;A</td>
    <td align="left">&nbsp;A</td>
    <td align="left">&nbsp;A</td>
    <td align="left">&nbsp;</td>
  </tr>
  <tr>
    <td align="left">&nbsp;ecom</td>
    <td align="left">&nbsp;ecom</td>
    <td align="left">&nbsp;ecom</td>
    <td align="left">&nbsp;移动搜索广告使用</td>
  </tr>
  <tr>
    <td align="left">&nbsp;PageTimer</td>
    <td align="left">&nbsp;PageTimer</td>
    <td align="left">&nbsp;PageTimer</td>
    <td align="left">&nbsp;测速</td>
  </tr>
  <tr>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;Bdbox</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;框使用</td>
  </tr>
    <tr>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;SearchBox</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;框用在每次搜索翻页后页面重新处理a标签的<br>框内a标签有部分需要新开窗口</td>
  </tr>
    <tr>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;ls_zepto_ajax_flag</td>
    <td align="left">&nbsp;ls_zepto_ajax_flag</td>
    <td align="left">&nbsp;判断localstorage 的js代码执行成功</td>
  </tr>
    <tr>
    <td align="left">&nbsp;search_ls_js_functional_flag</td>
    <td align="left">&nbsp;ls_script_flag</td>
    <td align="left">&nbsp;ls_script_flag</td>
    <td align="left">&nbsp;判断localstorage 的js代码执行成功</td>
  </tr>
    <tr>
    <td align="left">&nbsp;search_ls_js_sug_flag</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;同上</td>
  </tr>
    <tr>
    <td align="left">&nbsp;search_ls_js_utils_flag</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;同上</td>
  </tr>
  <tr>
    <td align="left">&nbsp;search_ls_js_zepto_flag</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;同上</td>
  </tr>
    <tr>
    <td align="left">&nbsp;B.log</td>
    <td align="left">&nbsp;B.log</td>
    <td align="left">&nbsp;B.log</td>
    <td align="left">&nbsp;统计相关</td>
  </tr>
    <tr>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;LOG</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;框用于速度打点统计</td>
  </tr>
    <tr>
    <td align="left">&nbsp;B.log.send</td>
    <td align="left">&nbsp;B.log.send</td>
    <td align="left">&nbsp;B.log.send</td>
    <td align="left">&nbsp;统计相关</td>
  </tr>
    <tr>
    <td align="left">&nbsp;B.log.spSta</td>
    <td align="left">&nbsp;B.log.spSta</td>
    <td align="left">&nbsp;B.log.spSta</td>
    <td align="left">&nbsp;测速方法,目前只有翻页使用</td>
  </tr>
  <tr>
    <td align="left">&nbsp;B.SPA</td>
    <td align="left">&nbsp;B.SPA</td>
    <td align="left">&nbsp;B.SPA</td>
    <td align="left">&nbsp;单页形态无限翻页</td>
  </tr>
  <tr>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;</td>
    <td align="left">&nbsp;_loadtime</td>
    <td align="left">&nbsp;浏览器sug使用</td>
  </tr>
</table>

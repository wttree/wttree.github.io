---
layout:     post
title:      "localStorage使用规范"
subtitle:   "localStorage使用规范"
date:       2015-11-10
author:     "wttree"
header-img: "img/post-bg-e2e-ux.jpg"
tags:
    - localStorage
---

# localStorage使用规范



###本文将对localStorage的使用提出一系列规范
**其中一些具体数值有待商榷**

### 1. 命名

#### 1.1 格式

#####key的命名规范为：`{产品}` _ `{功能}` _ `{自定义}`;

     目前{产品}段可分search,index,bdbox,bmbar,ala,novel,msa；
     某个功能使用的localStorage固定使用一个{功能}段，如：banner/inapp等，新增{功能}段需备案；
     {自定义}段无特殊要求。
     语音，框会在某些默认的阿拉丁基础上做定制，因此阿拉丁产品段命名如下：
     ala_siri_{功能}__自定义 
     ala_bdbox_{功能}_自定义
     ala_default_{功能}_自定义
     例子：search_inapp_package@com.baidu.video，其中三个段分别为：
     产品：search
     功能：inapp（应用调起）
     自定义：package@com.baidu.video

     说明：小说书包页、书城、浏览端阅读页都属于小说项目，novel作为小说项目产品段。
           msa作为移动搜索广告产品线。



#### 1.2 例外

     部分功能希望跨产品共用（如sug历史数据），可省略{产品}段，但需单独备案。

#### 1.3 备案

     在ws.baidu.com上建立备案区，于“前端开发规范”目录下。
     备案填写ws，并且邮件周知。


### 2. 内容

#### 2.1长度限制

     localStorage空间是域名共享，而且没有自动过期机制，虽然有5MB但时间长了终究会是限制。
     长度限制规定如下：
     1. 单个key允许存储内容不超过1KB；
     2. 单个{功能}段允许存储总内容不超过20KB；
     3. 每个产品线使用的各个key对应的内容总和不能超过500k.
     超过以上限制，需评审通过并发出邮件说明，周知并对每个key单独备案。


#### 2.2内容限制

     原则上建议localStorage用于存储用户和程序产生的数据，如历史记录、用户配置等。
     但因为它较大的空间也可以用来存储一些其他数据，
     例如：
     1. 静态文件缓存
     2. 小图片（<=2k）BASE64缓存
     3. 大图片（无损压缩后>2k）外链的形式使用图片，不能添加到localstorage。
     4. 从服务端拉取，但更新频度较低的数据
     这类内容通常长度较大，除了遵循2.1长度限制中所描述的标准，还需要单独进行备案。

### 附录  
    附录A.tips
    localStorage读写速度很快，通常不需要担心效率问题，具体可参考：http://liuji.fe.baidu.com/jsplay/perf/localStorage.html；
    localStorage只能存字符串，如果存储一个较大的结构的JSON时，不妨实测一下JSON. stringify会不会影响性能，
    如果担心影响可以考虑展开成多个key；
    从一开始就考虑好localStorage不可用时的后果和应对措施；

### 备案列表

     [index 首页 ls key]
     index_ls_css_page_2@xxx
     index_ls_css_addicon@xxx
     index_ls_js_zepto@xxx
     index_ls_js_utils@xxx
     index_ls_js_sug@xxx
     index_ls_js_init@xxx
     index_ls_js_addicon@xxx
     index_ls_js_geolocation@xxx
     index_ls_js_callbaiduapp_android@xxx
     index_ls_js_callbaiduapp_ios@xxx
     index_guide_lastVisitTime
     index_guide_visitNum
     说明：xxx为版本号

     [search 结果页 ls key]
     search_ls_css_frame
     search_ls_css_nextpage
     search_ls_css_page
     search_ls_css_sug
     search_ls_js_base
     search_ls_js_functional
     search_ls_js_sug
     search_ls_js_utils
     search_ls_js_zepto

     [sug 功能相关]
     kw:xxx
     说明：xxx为历史query

     [inapp 应用调起相关]
     search_inapp_pkg_xxx
     说明：xxx是诸如com.baidu.video这类的android应用包名

     [bmbar 浏览器 ls key]
     bmbadr_ls_js_base
     bmbadr_ls_css_frame
     bmbadr_ls_css_page
     bmbadr_ls_js_zepto
     bmbadr_ls_js_utils
     bmbadr_ls_js_sug
     bmbadr_ls_js_functional
     bmbadr_ls_css_sug
     bmbadr_ls_css_nextpage

     [框 ls key]
     bdbox_js_zepto
     bdbox_css_page
     bdbox_css_attach
     bdbox_js_ajax
     bdbox_js_page
     bdbox_tpl_ft

     [阿拉丁ls key]
     音乐阿拉丁 key: ala_default_inapp_ting_1@popupedOnceADay
     小说书包页 key: search_book_gid_1438710710 
              value:{"lastIndex":"556","bookTag":0} 
     快乐男生活动 key：search_ala_kuainan 
		value：{"time":"2013年9月13日","num":5}

	 [无线ecom广告ls key]
      msa_css_0
      msa_js_0

     如有新增或改变需及时备案并邮件周知。
版本: v1.0

格式：docx

地址：<a href="http://docs.babel.baidu.com/doc/45223106-4b30-4612-adc3-e734dd4f5288" target="_blank">localStorage使用规范</a>

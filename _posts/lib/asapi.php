<?php
/**
 * 用来预处理as api。
 * 根据packagename 获取其最新版本信息
 *
 * @author zhuangxiaoming@baidu.com
 */

isset($_GET['callback']) ?
    header('Content-Type: application/javascript; charset=utf8'):
    header('Content-Type: application/json; charset=utf8');

if (!isset($_GET['package'])) {
    $error = array('error' => 'no package');
    echo json_encode($error);
    die;
}

$as = file_get_contents('http://m.baidu.com/api?action=search&from=563i&token=dianxinos&type=app&format=json&package=' . $_GET['package']);

$as = json_decode($as, true); 

$newas = array (
    "download" => $as['result']['app']['url'],
    "size" => round($as['result']['app']['packagesize'] /1024/1024, 1) . 'M',
    "version" => $as['result']['app']['versionname'],
    "data" => $as['result']['app']['releasedate']
);

if (isset($_GET['callback'])) {
    $callback = preg_replace("/[^][.\\'\\\"_A-Za-z0-9]/", '', $_GET['callback']);
    echo $callback . '('. json_encode($newas). ')';
} else {
    echo json_encode($newas);
}
 
?>

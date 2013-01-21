<?php
require_once('php.php');
$max_upload = (int)(ini_get('upload_max_filesize'));
$max_post = (int)(ini_get('post_max_size'));
$memory_limit = (int)(ini_get('memory_limit'));
$maxmb = min($max_upload, $max_post, $memory_limit);
$allowedExtensions = array();
$uploader = new qqFileUploader($allowedExtensions, ($maxmb * 1024 * 1024));
$result = $uploader->handleUpload('overlays/');
echo json_encode($result);
?>
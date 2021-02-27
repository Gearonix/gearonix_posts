<?php


header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');



$path =  $_SERVER['REQUEST_URI'];

$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents('php://input'), true);


$params = explode('/',$path);



include 'functions.php';



if ($method=='POST'){
	switch ($params[1]) {
		case 'getposts':
			getPosts($data);
			break;
		case 'getonepost':
			getOnePost($data);
			break;
		case 'login':
			login($data);
			break;
		case 'getmyposts':
			getMyPosts($data);
			break;
		case 'addpost':
		 	header('Content-Type: form/multipart');
	    	$data = json_decode($_POST['json'],true);
	    	$name = 'POST_'.$data['user_name'].$_FILES['file']['name'];
	    	$tmp_name = $_FILES['file']['tmp_name'];
	    	// addImage($name,$tmp_name,$user_name);
			addPost($name,$tmp_name,$data);
			break;
		case 'changepost':
			header('Content-Type: form/multipart');
	    	$data = json_decode($_POST['json'],true);
	    	$name = 'POST_'.$data['data']['user_name'].$_FILES['file']['name'];
	    	$tmp_name = $_FILES['file']['tmp_name'];
			changePost($name,$tmp_name,$data);
			break;
		case 'addtagimage':
			header('Content-Type: form/multipart');
	    	$data = json_decode($_POST['json'],true);
	    	$name = 'TAGS_'.$data['data']['user_name'].$_FILES['file']['name'];
	    	$tmp_name = $_FILES['file']['tmp_name'];
			addTagImage($name,$tmp_name,$data);
			break;
		case 'gettagbackground':
			getTagBackground($data);
			break;
		case 'register':
			register($data);
			break;
}
}








?>
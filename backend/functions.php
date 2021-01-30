
<?php
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');

$host = 'localhost';
$user = 'root';
$password = 'A&ud9D?xf_jM';
$database = 'posts';

$mysqli = new mysqli($host,$user,$password,$database);

if (!$mysqli){
	$result = ['code' => 10,'status' => 500,'message' => 'Request Error'];
	exit();
}

//HELPERS
function ok($response=['code' => 0,'status' => 200,'message' => 'ok']){
	echo json_encode($response);
}

function checkRequest($request){
	global $mysqli;
	$error = ['code' => 10,'status' => 500,'message' => 'Request Error'];
	$result = $mysqli->query($request);
	if (!$result){
		echo json_encode($error);
		exit();
	}
	return $result;
}
function throwError($bool,$array){
	if ($bool){
		echo json_encode($array);
		exit();
	}
}

function read($result){
	$list=[];
	for ($i=0; $i < $result->num_rows; $i++) { 
		$result->data_seek($i);
		$string = $result->fetch_assoc();
		$list[] = $string;
	}
	return $list;
}

function register($data){
	extract($data);
	$result = checkRequest("select user_name from users where user_name='$name';");
	throwError($result->num_rows>0,['code' => 15,'message' => 'This name already exists']);
	$result = checkRequest("insert users(user_name,password) values('$name','$password')");
	ok();
}

function login($data){
	extract($data);
	$result = checkRequest("select * from users where user='$user_name';");
	throwError($result->num_rows==0,['code' => 15,'message' => 'You not registred']);
	$result->data_seek(0);
	$result_array = $result->fetch_assoc();
	throwError($result_array['password']!=$password,['code' => 20,'message' => 'Wrong password']);
	ok(['code' => 0,'status' => 200,'message' => 'ok','data' => $result_array]);
}

function getPosts($data){
	// SELECT * FROM posts ORDER BY id desc limit4;
	// "select * from posts order by id desc limit $count";
	extract($data);
	if ($tag==''){
		$result = checkRequest("select * from posts order by id desc limit $page_count");
		ok(['code' => 0,'status' => 200,'message' => 'ok','data' => read($result)]);
		exit();
	}
	// echo "select * from posts order by id desc limit $page_count where JSON_CONTAINS(tags,'\"$tag\"','$')";
	// exit();
	$result = checkRequest("select * from posts where JSON_CONTAINS(tags,'\"$tag\"','$') order by id desc limit $page_count");
	ok(['code' => 0,'status' => 200,'message' => 'ok','data' => read($result)]);
}
//if response->num_rows<=$page_count

function getOnePost($data){
	extract($data);
	$result = checkRequest("select * from posts where id=$id;");
	throwError($result->num_rows==0,['code' => 10,'status' => 404,'message' => 'Card doesnt exist']);
	ok(['code' => 0,'status' => 200,'message' => 'ok','data' => $result->fetch_assoc()]);
}
function getMyPosts($data){
	extract($data);
	$result = checkRequest("select * from posts where user='$user_name';");
	ok(['code' => 0,'status' => 200,'message' => 'ok','data' => read($result)]);
}
function addPost($file_name,$tmp_name,$data){
	move_uploaded_file($tmp_name,"backgrounds/$file_name");
	extract($data);
	$jstags = json_encode($tags);
	checkRequest("insert posts(user,post_text,title,tags,post_image) values('$user_name','$description','$title','$jstags','$file_name');");
	ok();
}
?>

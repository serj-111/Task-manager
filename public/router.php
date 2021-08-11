<?
  session_start();
  header("Access-Control-Allow-Origin: *");
  header('Content-type: text/html; charset=utf-8');
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header('Access-Control-Allow-Credentials: true');
  $uri = explode('/',$_SERVER["REQUEST_URI"]);
  require_once('task_php/db.php');
  require_once('task_php/classes/Tasks.php');
  require_once('task_php/classes/Clients.php');

  if($uri[1]=='getStatus'){
    Tasks::getStatus();
  }else if($uri[1]=='getOneStatus'){
    Tasks::getOneStatus($_POST['id']);
  }else if($uri[1]=='changeStatus'){
    Tasks::changeStatus($_POST['statusId'],$_POST['id']);
  }else if($uri[1]=='getIdTask'){
    Tasks::getIdTask($_POST['id']);
  }else if($uri[1]=='removeTask'){
    Tasks::removeTask($_POST['id']);
  }else if($uri[1]=='changeTask'){
    Tasks::changeTask($_POST['id'],$_POST['text']);
  }else if($uri[1]=='createTask'){
    Tasks::createTask($_POST['title'],$_POST['text']);	
  }

  else if($uri[1]=='handlerReg'){
    Clients::handlerReg();             
  }else if($uri[1]=='handlerAuth'){
    Clients::handlerAuth();
  }else if($uri[1]=='handlerChangeUserData'){
    Clients::handlerChangeUserData();
  }else if($uri[1]=='checkReg'){  // не работает
    Clients::checkReg();
  }else if($uri[1]=='getUser'){
    Clients::getUser();
  }else if($uri[1]=='checkSession'){
    Clients::checkSession();
  }else if($uri[1]=='destroySession'){
    Clients::destroySession();
  }else{
    require_once("index.html");
  }
  
?>
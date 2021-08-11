<?

class Tasks{

  static function getStatus(){
    global $mysqli;
	$result = $mysqli->query("SELECT * FROM `status`");
	$status = [];
	  while($row = $result->fetch_assoc()){
	    $status[] = $row;
	  }
	  echo json_encode($status);
  }

  static function getOneStatus($id){
    global $mysqli;
    $sessid = $_SESSION['id'];
	$result = $mysqli->query("SELECT tasks.id, tasks.title, tasks.text, tasks.date_added, status.value AS statusid FROM `tasks`,`clients`,`status` WHERE clients.id = '$sessid' AND status.id=tasks.statusid AND status.id=$id AND tasks.userid = '$sessid'");
    $status = [];
      while($row = $result->fetch_assoc()){
        $status[] = $row;
      }
      echo json_encode($status);
  }

  static function changeStatus($statusId, $id){
    global $mysqli;
    $mysqli->query("UPDATE `tasks` SET statusid = '$statusId' WHERE id=$id");

    echo json_encode(['result'=>'success']);
  }

  static function getIdTask($id){
    global $mysqli;
    $result = $mysqli->query("SELECT tasks.id, tasks.title, tasks.text, tasks.date_added, status.value AS statusid, clients.email AS userid FROM `tasks`,`clients`,`status` WHERE clients.id = tasks.userid AND status.id = tasks.statusid AND tasks.id=$id");
	echo json_encode($result->fetch_assoc());
  }

  static function removeTask($id){
    global $mysqli;
    $mysqli->query("DELETE FROM `tasks` WHERE id=$id");
    echo json_encode(['result'=>'success']);
  }

  static function changeTask($id, $text){
    global $mysqli;
	$id = $_POST['id'];
	$text = $_POST['text'];
    $mysqli->query("UPDATE `tasks` SET `text`='$text' WHERE `id`=$id");
    echo json_encode(['result'=>'success']);
  }

  static function createTask($title, $text){
    global $mysqli;
    $userid = $_SESSION['id'];
	$title = $_POST['title'];
	$text = $_POST['text'];
    $mysqli->query("INSERT INTO `tasks`(`title`, `text`, `userid`) VALUES ('$title','$text', '$userid')");
    echo json_encode(['result'=>'success']);
  }
}
?>
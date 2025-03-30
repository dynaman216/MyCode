<?php
$servername = "localhost";
$username = "paul";
$password = "gurps";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, firstname, lastname FROM test.test1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  //echo "<table><tr><th>ID</th><th>Name</th></tr>";
  // output data of each row
  $myoutput=array();
  while($row = $result->fetch_assoc()) {
    //echo "<tr><td>".$row["id"]."</td><td>".$row["firstname"]." ".$row["lastname"]."</td></tr>";
    $myoutput[] = $row;
  }
  //echo $myoutput;
  $myoutput2 = json_encode(["message" => $myoutput]);
  echo $myoutput2;
} else {
  //echo "0 results";
  echo json_encode(["message" => "0 results"]);
}
$conn->close();
?>
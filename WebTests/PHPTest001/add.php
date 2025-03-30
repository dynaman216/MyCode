<?php
if (isset($_POST['num1']) && isset($_POST['num2'])) {
    $num1 = (int)$_POST['num1'];
    $num2 = (int)$_POST['num2'];
    echo json_encode(['result' => $num1 + $num2]);
    //echo json_encode(['result' =>7]);
} else {
    echo json_encode(['error' => 'Invalid input']);
}
?>
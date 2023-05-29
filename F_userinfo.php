<?php 

    require_once 'db.php';
    require_once 'autenticazione.php';
    if (!checkAuth()) exit;

        // Mi connetto al database
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);


        // Preparo la query
        $risultato = [];
        $userid = mysqli_real_escape_string($conn,$_SESSION['_agora_user_id']);
        $query = "SELECT COUNT(*) AS num_commenti FROM commenti WHERE id_utente_fk = $userid";

        
        // Eseguo la query
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));


        while($row = mysqli_fetch_assoc($res))
      {
            $risultato[] = $row;
      }

        // Chiudi
      mysqli_free_result($res);
      mysqli_close($conn);
      echo json_encode($risultato);
    exit;

?>

<?php 

    require_once 'db.php';
    require_once 'autenticazione.php';
    if (!checkAuth()) exit;
        // Mi connetto al database
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

        // Preparo la query
        $ID_articolo = mysqli_real_escape_string($conn,$_POST["id_articolo"]);
        $commentoINS = mysqli_real_escape_string($conn,$_POST["commentoINSERIRE"]);
        $userid = mysqli_real_escape_string($conn,$_SESSION['_agora_user_id']);

        $query = "INSERT INTO commenti (id,testo,id_utente_fk,id_articolo_fk)
                  VALUES (NULL, '$commentoINS', '$userid','$ID_articolo')";

        
        // Eseguo la query
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

        // Chiudi
      mysqli_free_result($res);
      mysqli_close($conn);
    exit;

?>

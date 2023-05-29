<?php 

    require_once 'db.php';
    require_once 'autenticazione.php';
    if (!checkAuth()) exit;

        // Mi connetto al database
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        
        $articoli = [];

        // Preparo la query
        $query = "SELECT * FROM articoli ORDER BY id DESC LIMIT 3";

        // Eseguo la query
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

        // Creo un array in cui inserisco i risultati
        while($row = mysqli_fetch_assoc($res))
      {
            $articoli[] = $row;
      }
        // Chiudi
      mysqli_free_result($res);
      mysqli_close($conn);
      echo (json_encode($articoli));

    exit;

?>

<?php 

    require_once 'db.php';
    require_once 'autenticazione.php';
    if (!checkAuth()) exit;
        // Mi connetto al database
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        
        $commenti = [];

        // Preparo la query
        $query = " (SELECT testo as testo_commento, id_articolo_fk as id_articolo, 
                  username as username_utente FROM commenti INNER JOIN utenti 
                  ON commenti.id_utente_fk = utenti.id INNER JOIN 
                  (SELECT id FROM articoli ORDER BY id DESC LIMIT 3) 
                  AS Ultimi3Articoli ON commenti.id_articolo_fk = Ultimi3Articoli.id) ORDER BY id_articolo";

        // Eseguo la query
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

        // Creo un array in cui inserisco i risultati
        while($row = mysqli_fetch_assoc($res))
      {
            $commenti[] = $row;
      }
        // Chiudi
      mysqli_free_result($res);
      mysqli_close($conn);
      echo (json_encode($commenti));

    exit;

?>

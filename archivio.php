<?php 
    require_once 'autenticazione.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
?>

<html>
  <head>
    <link rel="stylesheet" href="archivio.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
      rel="stylesheet"
    />
    <script src="archivio.js" defer></script>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Report Scuderia Ferrari Formula 1</title>
  </head>

  <body>
  <body>
    </div>
        <header>
            <nav>
                <div class="nav-container">
                    <div id="logo">
                         <img src="images/logoF.png">
                    </div>
                    <div id="links">
                        <a href='home.php' class="button">HOME</a>
                    </div>
                    <div id="menu">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div class="Titolo">
                    <h1>Archivio Formula 1</h1>
                </div>               
            </nav>
        </header>

    <section id="container">

    
    <div id="Box" class="BoxRicerca">
      <form class="formArchivio">
        <h3>
          Inserire l'anno e la tipologia di campionato che si vuole visualizzare
          per consultare l'archivio della Formula 1:
        </h3>
        <input type="number" min="1950" max="2022" id="Anno" />
        <select name="Tipo" id="Tipo">
          <option value="driverStandings">Campionato piloti</option>
          <option value="constructorStandings">Campionato costruttori</option>
        </select>
        <input type="submit" id="submit" class="BottoneCerca" value="Cerca" />
      </form>

      <table
        id="tabella"
        class="tabellaArchivio"
        cellspacing="1"
        cellpadding="5"
        border="1"
      >
        <thead>
          <tr>
            <th>Pos</th>
            <th class="PlaceH1">PLACEHOLDER</th>
            <th class="PlaceH2">PLACEHOLDER</th>
            <th>Punti</th>
            <th>Vittorie</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <br />
    </div>

    <div id="Box" class="BoxGare">
      <h3>Gare campionato 2023:</h3>
      <table
        id="tabella"
        class="tabellaGare"
        cellspacing="1"
        cellpadding="5"
        border="1"
      >
        <thead>
          <tr>
            <th>Data</th>
            <th>Circuito</th>
            <th>Luogo</th>
            <th>Stato</th>
            <th>Giri</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <br />
    </div>
</section>

</body>
</html>

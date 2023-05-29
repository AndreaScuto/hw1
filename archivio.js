
function onResponse(response) {
    console.log("Connessione OK!");
    return response.json();
  }
  
  //Riempie la tabella con i dati del campionato costruttori
  
  function campionatoCostruttori(json) {
    console.log("JSON OK!");
    console.log(json);

    let Lista = document.querySelector(".tabellaArchivio");
      let tbody = Lista.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";
  
    let pos, nazionalità, punti, vittorie, info;
    const num_risultati = json.MRData.total;
    console.log(num_risultati);
  
    placeH1 = document.querySelector(".PlaceH1");
    placeH2 = document.querySelector(".PlaceH2");
    placeH1.innerHTML = "Costruttore";
    placeH2.innerHTML = "Nazionalità";
  
    for (let i = 0; i < num_risultati; i++) {
      pos =
        json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i]
          .position;
      nome =
        json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i]
          .Constructor.name;
      nazionalità =
        json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i]
          .Constructor.nationality;
      punti =
        json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i]
          .points;
      vittorie =
        json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].wins;
  
      info = [pos, nome, nazionalità, punti, vittorie];
      console.log("pilota=" + info);
  
      let Lista = document.querySelector(".tabellaArchivio");
      let tbody = Lista.getElementsByTagName("tbody")[0];
      let colonne = Lista.getElementsByTagName("th").length;
      let tr = document.createElement("tr");
      for (let j = 0; j < colonne; j++) {
        let td = document.createElement("td");
        let tx = document.createTextNode(info[j]);
        td.appendChild(tx);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  }
  
  //Riempie la tabella con i dati del campionato piloti
  
  function campionatoPiloti(json) {
    console.log("JSON OK!");
    console.log(json);
  
    let Lista = document.querySelector(".tabellaArchivio");
      let tbody = Lista.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";

    let pos, nome, cognome, nome_completo, costruttore, punti, vittorie, info;
    const num_risultati = json.MRData.total;
    console.log(num_risultati);
  
    placeH1 = document.querySelector(".PlaceH1");
    placeH2 = document.querySelector(".PlaceH2");
    placeH1.innerHTML = "Pilota";
    placeH2.innerHTML = "Costruttore";
  
    for (let i = 0; i < num_risultati; i++) {
      pos =
        json.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].position;
  
      nome =
        json.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver
          .givenName;
      cognome =
        json.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver
          .familyName;
      nome_completo = nome + " " + cognome;
  
      costruttore =
        json.MRData.StandingsTable.StandingsLists[0].DriverStandings[i]
          .Constructors[0].name;
      punti =
        json.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points;
      vittorie =
        json.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].wins;
      info = [pos, nome_completo, costruttore, punti, vittorie];
      console.log("pilota=" + info);
  
      let Lista = document.querySelector(".tabellaArchivio");
      let tbody = Lista.getElementsByTagName("tbody")[0];
      let colonne = Lista.getElementsByTagName("th").length;
      let tr = document.createElement("tr");
      for (let j = 0; j < colonne; j++) {
        let td = document.createElement("td");
        let tx = document.createTextNode(info[j]);
        td.appendChild(tx);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  }
  
  //Fetch senza key per la ricerca in base all'anno e al tipo di campionato
  
  function Ricerca(event) {
    const Anno_I = document.querySelector("#Anno");
    const Tipo_I = document.querySelector("#Tipo");
    const Tipo_I_value = encodeURIComponent(Tipo_I.value);  
  
    console.log("Eseguo ricerca: " + Anno_I.value + " " + Tipo_I_value);
    if (Tipo_I_value == "driverStandings") {
        fetch("C_archiviof1.php?ANNO="+encodeURIComponent(Anno_I.value)+"&TIPO="+encodeURIComponent(Tipo_I_value))
         .then(onResponse)
         .then(campionatoPiloti)
         .catch((error) => console.log("error", error));
    } else {
        fetch("C_archiviof1.php?ANNO="+encodeURIComponent(Anno_I.value)+"&TIPO="+encodeURIComponent(Tipo_I_value))
        .then(onResponse)
        .then(campionatoCostruttori)
        .catch((error) => console.log("error", error));
    }
    event.preventDefault();
  }
  
  //Fetch tramite key per visualizzare gare 2023
  
  function gare2023() {

    fetch("C_gare2023.php").then(onResponse).then(VisualizzaGare).catch((error) => console.log("error", error));

  }

  //Onjson per la visualizzazione delle gare 2023

  function VisualizzaGare(json) {
    console.log("JSON OK!");
    console.log(json);

    let data, circuito, luogo, stato, giri;
    const num_risultati = json.response.length;
    console.log(num_risultati);
  
    for (let i = 0; i < num_risultati; i++) {
     
      data = json.response[i].date;
      circuito = json.response[i].competition.name;
      luogo = json.response[i].competition.location.city;
      stato = json.response[i].status;
      giri = json.response[i].laps.total;
      dataOK = data.substring(0, 10);
      info = [dataOK, circuito, luogo, stato, giri];
  
      let Lista = document.querySelector(".tabellaGare");
      let tbody = Lista.getElementsByTagName("tbody")[0];
      let colonne = Lista.getElementsByTagName("th").length;
      let tr = document.createElement("tr");
      for (let j = 0; j < colonne; j++) {
        let td = document.createElement("td");
        let tx = document.createTextNode(info[j]);
        td.appendChild(tx);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  
  }
  
  // Elementi interattivi
  const form = document.querySelector("form");
  form.addEventListener("submit", Ricerca);

  gare2023();

  // Autore: Andrea Scuto
  // RestApi utilizzate: https://ergast.com/mrd/   ||   https://api-sports.io/documentation/formula-1/v1
  

// Aggiunta event listener al form di ricerca articoli
const articoliSUBMIT = document.getElementById("articoliSUBMIT");
articoliSUBMIT.addEventListener('click', cercaArticoli);



// Funzione per la ricerca di articoli
function cercaArticoli(event) {

  event.preventDefault();

  const form = document.getElementById("articoliFORM");
  const formData = new FormData(form);

  fetch("F_articoli.php", {method: "post", body: formData})
    .then(ONJSONResponse)
    .then(jsonArticoli);


}

//
function jsonArticoli(json) {
  console.log("json ricevuto");
  console.log(json);
  if (json.length == 0) {
    const contenitore = document.getElementById("contenitoreRICERCA");
    contenitore.style.display = "none";
    alert("Nessun articolo trovato");
    return;
  }
  const contenitore = document.getElementById("contenitoreRICERCA");
  const titoloRIEMPI = document.getElementById("titoloRIEMPI");
  const testoRIEMPI = document.getElementById("testoRIEMPI");
  const immagineRIEMPI = document.getElementById("imgRIEMPI"); 
;
  contenitore.style.display = "flex";
  titoloRIEMPI.textContent = json[0].titolo;
  testoRIEMPI.textContent = json[0].testo;
  immagineRIEMPI.src = json[0].img;
}

function Ultimi3articoli() {
  // Chiamata alla funzione per ottenere gli articoli dal server con i relativi commenti
  fetch("F_Ultimi3.php").then(ONJSONResponse).then(jsonUltimi3articoli).then(AggiornaCommenti);
}


function ONJSONResponse(response) {
  console.log("Risposta ricevuta");
  return response.json();
}

function jsonCommenti(json){
  console.log(json);
  const arrayARTICOLI = document.querySelectorAll(".Articolo");
  console.log(arrayARTICOLI);

  for(let i = 0; i < arrayARTICOLI.length; i++){  
    
    for(let j = 0; j < json.length; j++){

      if(json[j].id_articolo == arrayARTICOLI[i].dataset.id){
        const testo = document.createElement("p");
        testo.id = "commentoTESTO";
        const username = document.createElement("p");
        username.id = "commentoUSERNAME";
        username.textContent = json[j].username_utente + ":";
        testo.textContent = json[j].testo_commento;
        const commento = document.createElement("div");
        commento.id = "commento";
        const separatore = document.createElement("div");
        separatore.id = "separatore";
        separatore.textContent = "";
        commento.appendChild(username);
        commento.appendChild(separatore);
        commento.appendChild(testo);
        arrayARTICOLI[i].querySelector("#commentiVISUALIZZA").appendChild(commento);
      }
    }
  }
}



function inviaCommento(event){
  console.log("invia commento");
  const form = event.currentTarget.parentNode;
  const formData = new FormData(form);
  formData.append("id_articolo", event.currentTarget.parentNode.parentNode.parentNode.dataset.id);
  fetch("F_inviaCommento.php", {method: "post", body: formData}).then(ONResponse).then(AggiornaCommenti);
  form.reset();
  event.preventDefault();
}

function AggiornaCommenti(){

  const commentiVISUALIZZA = document.querySelectorAll("#commentiVISUALIZZA");
  for (let i = 0; i < commentiVISUALIZZA.length; i++) {
    commentiVISUALIZZA[i].innerHTML = "";
  }
  fetch("F_commenti.php").then(ONJSONResponse).then(jsonCommenti);
}


function ONResponse(response){
  console.log(response);
}

// Funzione per popolare la sezione HTML con gli elementi del file JSON
function jsonUltimi3articoli(json) {
  

    // Seleziona l'elemento padre in cui inserire gli articoli
    const section = document.getElementById("sectionULTIMI3");

    // Itera attraverso gli articoli e crea gli elementi HTML corrispondenti
    for (let i = 0; i < json.length; i++) {
      const articoli = json[i];

      // Creazione del div contenitore
      const contenitore = document.createElement("div");
      contenitore.className = "Contenitore";

      // Creazione dell'elemento articolo
      const articoliPOST = document.createElement("article");
      articoliPOST.className = "Articolo";
      articoliPOST.dataset.id = articoli.id;

      // Creazione dell'elemento titolo
      const articoliTITOLO = document.createElement("h1");
      articoliTITOLO.className = "TitoloA";
      articoliTITOLO.textContent = articoli.titolo;

      // Creazione dell'elemento testo
      const articoliTESTO = document.createElement("p");
      articoliTESTO.className = "Testo";
      articoliTESTO.textContent = articoli.testo;

      // Creazione dell'elemento immagine
      const articoliIMG = document.createElement("img");
      articoliIMG.className = "ImmArticolo";
      articoliIMG.src = articoli.img;

      //Creazione sezione commenti
      const articoliSEZCOMMENTI = document.createElement("div");
      articoliSEZCOMMENTI.id = "commentiSEZIONE";
      const commentiVISUALIZZA = document.createElement("div");
      commentiVISUALIZZA.id = "commentiVISUALIZZA";
      const commentiFORM = document.createElement("form");
      commentiFORM.id = "commentiFORM";
      commentiFORM.method = "post";
      const commentiTEXTAREA = document.createElement("textarea");
      commentiTEXTAREA.id = "commentiTEXTAREA";
      commentiTEXTAREA.rows = "4";
      commentiTEXTAREA.cols = "30";
      commentiTEXTAREA.placeholder = "Inserisci un commento...";
      commentiTEXTAREA.name = "commentoINSERIRE";
      const commentiSUBMIT = document.createElement("input");
      commentiSUBMIT.id = "commentiSUBMIT";
      commentiSUBMIT.type = "submit";
      commentiSUBMIT.value = " ";


      // Aggiunta degli elementi figlio alla sezione commenti
      commentiFORM.appendChild(commentiTEXTAREA);
      commentiFORM.appendChild(commentiSUBMIT);
      articoliSEZCOMMENTI.appendChild(commentiVISUALIZZA);
      articoliSEZCOMMENTI.appendChild(commentiFORM);
      // Aggiunta degli elementi figlio all'elemento articolo
      articoliPOST.appendChild(articoliTITOLO);
      articoliPOST.appendChild(articoliTESTO);
      articoliPOST.appendChild(articoliIMG);
      articoliPOST.appendChild(articoliSEZCOMMENTI);

      // Aggiunta dell'elemento articolo al padre (sezione del blog)
      contenitore.appendChild(articoliPOST);
      section.appendChild(contenitore);

      // Aggiunta event listener al form di invio commento
     const commentiSUB = document.querySelectorAll("#commentiSUBMIT");
      for(let i = 0; i < commentiSUB.length; i++){
        commentiSUB[i].addEventListener('click', inviaCommento);
      }
    }
}

// Chiamata alla funzione per popolare la section con gli articoli
Ultimi3articoli();




function userinfo() {

    fetch("F_userinfo.php", {method: "post"}).then(ONResponse).then(jsonuserinfo);
}

function ONResponse(response) {
    console.log("Risposta ricevuta");
    return response.json();
}

function jsonuserinfo(json)
{
    console.log(json);
    const container = document.querySelector("#container");
    const div = document.createElement("div");
    div.id = "userinfo";
    const h2 = document.createElement("h2");
    h2.textContent = "Statistiche utente:";
    const p1 = document.createElement("p");
    p1.textContent = "Numero di commenti inseriti = " + json[0].num_commenti;
    p1.id = "num_commenti";
    div.appendChild(h2);
    div.appendChild(p1);
    container.appendChild(div);

    //Qui andrebbero inserite le altre statistiche dell'utente attraverso una implementazione completa del sito
}

userinfo();
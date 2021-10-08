export const HandleClickProfile = (history: any, joueur:any) => {
    
    fetch("https://rgstatsapi.herokuapp.com/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nom: joueur.nom,
        prenom: joueur.prenom,
        id: joueur.id,
        nat: joueur.nat,
      }),
    })
      .then((res) => res.json())
      .then((res) =>
        history.push({ pathname: "/searchProfile", state: { profil: res } })
      );
  }

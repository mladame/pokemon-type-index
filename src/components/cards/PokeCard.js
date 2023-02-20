import React, { useState, useEffect } from "react";

// name , picture url, shiny url, [type1, type2]
export default function PokeCard({ pokeName, pokeTypes, pokePic , shinyPokePic}) {
  const [pokePicShown, setPokePicShown] = useState([]);
  const [pokeNameShown, setPokeNameShown] = useState([]);
  
  function shinyChecked () {
    if (document.getElementById("shiny-toggle").checked) {
      setPokePicShown(shinyPokePic)
    } else {
      setPokePicShown(pokePic)
    }
  }

  useEffect(() => {
    setPokePicShown(pokePic)
    setPokeNameShown(pokeName)
  }, [pokePic]);

  return (
    <div className="pokeCard render-pokemon my-4 col-10 col-sm-8 col-md-6 col-lg-6 col-xl-3">
      {/* this is for the pokemon card */}
      <h3>{pokeNameShown}</h3>
      <div className="pokeimg-container">
        <img src={pokePicShown} className="poke-img"></img>
      </div>
      <label className="switch mt-3">
        <input id="shiny-toggle" type="checkbox" onClick={shinyChecked}/>
        <span className="slider"></span>
      </label>
      <ul>
        {pokeTypes.map((type) => (
          <li className={`poke-type ${type}-type`}>{type.toUpperCase()}</li>
        ))}
      </ul>
    </div>
  );
}

// const createPokeCard = (data) => {
//   // name , picture url, shiny url, type1, type2
//   const pokePic = data.sprites.other.home.front_default;
//   const pokePicShiny = data.sprites.other.home.front_shiny;
//   const typeArray = []
//   for (var i = 0; i < data.types.length; i++){
//     typeArray.push(data.types[i].type.name);
//   }

//   console.log("i am the createPokeCard function!");
// };

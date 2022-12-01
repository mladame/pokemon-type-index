import React from "react";

// name , picture url, shiny url, [type1, type2]
export default function PokeCard({ pokeName, pokeTypes, pokePic }) {
  return (
    <div className="pokeCard render-pokemon col-10 col-md-4">
      {/* this is for the pokemon card */}
      <h3>{pokeName}</h3>
      <img src={pokePic} className="poke-img"></img>
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

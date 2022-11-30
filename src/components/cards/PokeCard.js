import React from 'react';

// name , picture url, shiny url, [type1, type2]
export default function PokeCard(name, picture, shinyPicture, types){
    return(
        <div className="pokeCard">
            this is for the pokemon card
        </div>
    )




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
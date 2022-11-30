import React from 'react';


export default function OffensiveCard(types){
    return(
        <div className="pokeCard">
            this is for the offensive types card
        </div>
    )




}




// const createOffensiveCard = (data) => {
//     // deals 2x to, deals 1x to, deals 1/2 to, deals 0 to

//     const deals2x = data.damage_relations.double_damage_to;
//     const dealsHalf = data.damage_relations.half_damage_to;
//     const dealsNone = data.damage_relations.no_damage_to;

//     // for deals normal damage, whatever type is not covered in one of these variables

//     console.log("i am the createOffensiveCard function!");
//   };
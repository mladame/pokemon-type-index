import React from 'react';


export default function DefensiveCard(types){
    return(
        <div className="pokeCard col-6">
            this is for the defensive types card
        </div>
    )




}












//   const createDefensiveCard = (data) => {
//     // takes 2x from, takes 1x from, takes 1/2 from, takes 0 from
//     const takes2x = data.damage_relations.double_damage_from;
//     const takesHalf = data.damage_relations.half_damage_from;
//     const takesNone = data.damage_relations.no_damage_from;

//     // for deals normal damage, whatever type is not covered in one of these variables

//     console.log("i am the createDefensiveCard function!");
//   };
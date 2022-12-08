import React, { useState, useEffect } from "react";

export default function OffensiveCard({ pokeTypes }) {
  // console.log(pokeTypes);
  const [deals2x, setDeals2x] = useState([]);
  const [dealsHalf, setDealsHalf] = useState([]);
  const [dealsNone, setDealsNone] = useState([]);

  useEffect(() => {
    // if a pokemon has two types, it'll fetch twice
    if (pokeTypes.length > 1) {
      const typeURL = `https://pokeapi.co/api/v2/type/${pokeTypes[0]}/`;
      const typeURL2 = `https://pokeapi.co/api/v2/type/${pokeTypes[1]}/`;
      const deals2xBucket = [];
      const dealsHalfBucket = [];
      const dealsNoneBucket = [];

      fetch(typeURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);

          deals2xBucket.push(...data.damage_relations.double_damage_to);
          dealsHalfBucket.push(...data.damage_relations.half_damage_to);
          dealsNoneBucket.push(...data.damage_relations.no_damage_to);


          fetch(typeURL2)
            .then(function (response2) {
              return response2.json();
            })
            .then(function (data2) {
              // console.log(data2);

              // ! todo : make sure that it does not repeat what's in the array already
              // (kinda?) solved: it at least filters out the same type from the same section
              // might need to discuss what to do about types that appear in multiple sections (search Torterra or Empoleon for an example)
              const type2Deals2x = data2.damage_relations.double_damage_to;
              const doubleNames = [];
              for(var j = 0; j < deals2xBucket.length; j++){
                doubleNames.push(deals2xBucket[j].name);
              }
              for (var i = 0; i < type2Deals2x.length; i++){
                if (!(doubleNames.includes(type2Deals2x[i].name))){
                  deals2xBucket.push(type2Deals2x[i]);
                }
              }

              const type2DealsHalf = data2.damage_relations.half_damage_to;
              const halfNames = [];
              for(var j = 0; j < dealsHalfBucket.length; j++){
                halfNames.push(dealsHalfBucket[j].name);
              }
              for (var i = 0; i < type2DealsHalf.length; i++){
                if (!(halfNames.includes(type2DealsHalf[i].name))){
                  dealsHalfBucket.push(type2DealsHalf[i]);
                }
              }

              const type2DealsNone = data2.damage_relations.no_damage_to;
              const noDmgNames = [];
              for(var j = 0; j < dealsNoneBucket.length; j++){
                noDmgNames.push(dealsNoneBucket[j].name);
              }
              for (var i = 0; i < type2DealsNone.length; i++){
                if (!(noDmgNames.includes(type2DealsNone[i].name))){
                  dealsNoneBucket.push(type2DealsNone[i]);
                }
              }

              // deals2xBucket.push(...data2.damage_relations.double_damage_to);
              // dealsHalfBucket.push(...data2.damage_relations.half_damage_to);
              // dealsNoneBucket.push(...data2.damage_relations.no_damage_to);

              setDeals2x(deals2xBucket);
              setDealsHalf(dealsHalfBucket);
              setDealsNone(dealsNoneBucket);
            });
        });
    } else {
      // if the pokemon only has one type it'll fetch once
      const typeURL = `https://pokeapi.co/api/v2/type/${pokeTypes}/`;

      fetch(typeURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          setDeals2x(data.damage_relations.double_damage_to);
          setDealsHalf(data.damage_relations.half_damage_to);
          setDealsNone(data.damage_relations.no_damage_to);
        });
    }
  }, [pokeTypes]);

  // console.log(deals2x);

  return (
    <div className="pokeCard col-10 col-md-10 col-lg-6">
      this is for the offensive types card
      <h3>Deals 2x Damage to : </h3>
      <ul>
        {deals2x.map((type) => (
          <li className={`poke-type ${type.name}-type`}>{type.name.toUpperCase()}</li>
        ))}
      </ul>
      <h3>Deals 1/2x Damage to : </h3>
      <ul>
        {dealsHalf.map((type) => (
          <li className={`poke-type ${type.name}-type`}>{type.name.toUpperCase()}</li>
        ))}
      </ul>
      <h3>Deals No Damage to : </h3>
      <ul>
        {dealsNone.map((type) => (
          <li className={`poke-type ${type.name}-type`}>{type.name.toUpperCase()}</li>
        ))}
      </ul>
    </div>
  );
}

// const createOffensiveCard = (data) => {
//     // deals 2x to, deals 1x to, deals 1/2 to, deals 0 to

//     const deals2x = data.damage_relations.double_damage_to;
//     const dealsHalf = data.damage_relations.half_damage_to;
//     const dealsNone = data.damage_relations.no_damage_to;

//     // for deals normal damage, whatever type is not covered in one of these variables

//     console.log("i am the createOffensiveCard function!");
//   };

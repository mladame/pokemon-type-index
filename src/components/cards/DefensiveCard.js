import React, { useState, useEffect } from "react";

export default function DefensiveCard({ pokeTypes }) {
  console.log(pokeTypes);
  const [takes2x, setTakes2x] = useState([]);
  const [takesHalf, setTakesHalf] = useState([]);
  const [takesNone, setTakesNone] = useState([]);
  const [takes4x, setTakes4x] = useState([]);
  const [takesQuarter, setTakesQuarter] = useState([]);


  useEffect(() => {
    // if a pokemon has two types, it'll fetch twice
    if (pokeTypes.length > 1) {
      const typeURL = `https://pokeapi.co/api/v2/type/${pokeTypes[0]}/`;
      const typeURL2 = `https://pokeapi.co/api/v2/type/${pokeTypes[1]}/`;
      const takes2xBucket = [];
      const takesHalfBucket = [];
      const takesNoneBucket = [];
      const times4xBucket = [];
      const Quarter = [];

      fetch(typeURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);

          takes2xBucket.push(...data.damage_relations.double_damage_from);
          takesHalfBucket.push(...data.damage_relations.half_damage_from);
          takesNoneBucket.push(...data.damage_relations.no_damage_from);

          fetch(typeURL2)
            .then(function (response2) {
              return response2.json();
            })
            .then(function (data2) {
              const type2takes2x = data2.damage_relations.double_damage_from;
              const doubleNames = [];
              for (var j = 0; j < takes2xBucket.length; j++) {
                doubleNames.push(takes2xBucket[j].name);
              }


              // for (var i = 0; i < type2takes2x.length; i++) {
              //   if (!(doubleNames.includes(type2takes2x[i].name))) {
              //     takes2xBucket.push(type2takes2x[i]);
              //   } else {
              //     times4xBucket.push(type2takes2x[i]);
              //   }
              // }

              for (var i = 0; i < type2takes2x.length; i++) {
                if ((doubleNames.includes(type2takes2x[i].name))) {
                  times4xBucket.push(type2takes2x[i]);
                }
                 else if(times4xBucket.includes(type2takes2x[i].name)) {
                  takes2xBucket.concat(type2takes2x[i]);
                }
                
              }




              const types2Takeshalf = data2.damage_relations.half_damage_from;
              const halfNames = [];
              for (var j = 0; j < takesHalfBucket.length; j++) {
                halfNames.push(takesHalfBucket[j].name);
              }
              for (var i = 0; i < types2Takeshalf.length; i++) {
                if (!(halfNames.includes(types2Takeshalf[i].name))) {
                  takesHalfBucket.push(types2Takeshalf[i]);
                } else {
                  Quarter.push(types2Takeshalf[i]);
                }
              }

              const types2TakesNone = data2.damage_relations.no_damage_from;
              const noDmgNames = [];
              for (var j = 0; j < takesNoneBucket.length; j++) {
                noDmgNames.push(takesNoneBucket[j].name);
              }
              for (var i = 0; i < types2TakesNone.length; i++) {
                if (!(noDmgNames.includes(types2TakesNone[i].name))) {
                  takesNoneBucket.push(types2TakesNone[i]);
                }
              }

              // deals2xBucket.push(...data2.damage_relations.double_damage_to);
              // dealsHalfBucket.push(...data2.damage_relations.half_damage_to);
              // types2TakesNone.push(...data2.damage_relations.no_damage_to);

              setTakes2x(takes2xBucket);
              setTakesHalf(takesHalfBucket);
              setTakesNone(takesNoneBucket);
              setTakes4x(times4xBucket);
              setTakesQuarter(Quarter);
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
          setTakes2x(data.damage_relations.double_damage_from);
          setTakesHalf(data.damage_relations.half_damage_from);
          setTakesNone(data.damage_relations.no_damage_from);
        });
    }
  }, [pokeTypes]);

  // console.log(takes2x);
  return (
    <div className="pokeCard col-6 col-md-12 col-lg-6">
      this is for the defensive types card
      <h3>Takes 4x Damage from : </h3>
      <ul>
        {takes4x.map((type) => (
          <li className={`poke-type ${type.name}-type`}>{type.name.toUpperCase()}</li>
        ))}
      </ul>
      <h3>Takes 2x Damage from : </h3>
      <ul>
        {takes2x.map((type) => (
          <li className={`poke-type ${type.name}-type`}>{type.name.toUpperCase()}</li>
        ))}
      </ul>
      <h3>Takes 1/2x Damage from : </h3>
      <ul>
        {takesHalf.map((type) => (
          <li className={`poke-type ${type.name}-type`}>{type.name.toUpperCase()}</li>
        ))}
      </ul>
      <h3>Takes No Damage from : </h3>
      <ul>
        {takesNone.map((type) => (
          <li className={`poke-type ${type.name}-type`}>{type.name.toUpperCase()}</li>
        ))}
      </ul>
      <h3>Takes 1/4x Damage from : </h3>
      <ul>
        {takesQuarter.map((type) => (
          <li className={`poke-type ${type.name}-type`}>{type.name.toUpperCase()}</li>
        ))}
      </ul>
    </div>
  );
}

//   const createDefensiveCard = (data) => {
//     // takes 2x from, takes 1x from, takes 1/2 from, takes 0 from
//     const takes2x = data.damage_relations.double_damage_from;
//     const takesHalf = data.damage_relations.half_damage_from;
//     const takesNone = data.damage_relations.no_damage_from;

//     // for deals normal damage, whatever type is not covered in one of these variables

//     console.log("i am the createDefensiveCard function!");
//   };

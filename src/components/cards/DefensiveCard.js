import React, { useState, useEffect } from "react";

export default function DefensiveCard({ pokeTypes }) {
  console.log(pokeTypes);
  const [takes2x, setTakes2x] = useState([]);
  const [takesHalf, setTakesHalf] = useState([]);
  const [takesNone, setTakesNone] = useState([]);

  useEffect(() => {
    // if a pokemon has two types, it'll fetch twice
    if (pokeTypes.length > 1) {
      const typeURL = `https://pokeapi.co/api/v2/type/${pokeTypes[0]}/`;
      const typeURL2 = `https://pokeapi.co/api/v2/type/${pokeTypes[1]}/`;
      const takes2xBucket = [];
      const takesHalfBucket = [];
      const takesNoneBucket = [];

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
              // console.log(data2);

              // ! todo : make sure that if it repeats, we do x4
              takes2xBucket.push(...data2.damage_relations.double_damage_from);
              // ! todo : make sure that if it repeats, we do x1/4
              takesHalfBucket.push(...data2.damage_relations.half_damage_from);
              // ! todo : make sure that it does not repeat what's in the array already
              takesNoneBucket.push(...data2.damage_relations.no_damage_from);

              setTakes2x(takes2xBucket);
              setTakesHalf(takesHalfBucket);
              setTakesNone(takesNoneBucket);
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
    <div className="pokeCard col-10 col-md-10 col-lg-6">
      this is for the defensive types card
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

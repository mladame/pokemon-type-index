import React, { useState, useEffect } from "react";

export default function DefensiveCard({ pokeTypes }) {
  // console.log(pokeTypes);
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

      const type1 = pokeTypes[0];
      const type2 = pokeTypes[1];

      // ! hashmaps for 2x, half
      let doubleHashmap = new Map();
      let halfHashmap = new Map();
      let noDamageHashmap = new Map();

      let noDamageArray = [];
      let doubleArray = [];
      let halfArray = [];
      let times4Array = []; 
      let quarterArray = [];
      
      fetch(typeURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data)
          for(let i = 0; i < data.damage_relations.double_damage_from.length; i++) {
            doubleHashmap.set(data.damage_relations.double_damage_from[i].name, 1)
          }

          for(let i = 0; i < data.damage_relations.half_damage_from.length; i++) {
            halfHashmap.set(data.damage_relations.half_damage_from[i].name, 1)
          }

          for(let i = 0; i < data.damage_relations.no_damage_from.length; i++) {
            noDamageHashmap.set(data.damage_relations.no_damage_from[i].name, 1)
          }
  
          fetch(typeURL2)
            .then(function (response2) {
              return response2.json();
            })
            .then(function (data2) {
              // console.log(data2)

              // let noDamageArray = [];
              // let doubleArray = [];
              // let halfArray = [];
              // let times4Array = []; 
              // let quarterArray = [];

              for(let i = 0; i < data2.damage_relations.double_damage_from.length; i++) {
                if (doubleHashmap.has(data2.damage_relations.double_damage_from[i].name)) {
                  doubleHashmap.set(data2.damage_relations.double_damage_from[i].name, 2)
                } else {
                  doubleHashmap.set(data2.damage_relations.double_damage_from[i].name, 1)
                }
              }

              for(let i = 0; i < data2.damage_relations.half_damage_from.length; i++) {
                if (halfHashmap.has(data2.damage_relations.half_damage_from[i].name)) {
                  halfHashmap.set(data2.damage_relations.half_damage_from[i].name, 2)
                } else {
                  halfHashmap.set(data2.damage_relations.half_damage_from[i].name, 1)
                }
              }

              for(let i = 0; i < data2.damage_relations.no_damage_from.length; i++) {
                noDamageHashmap.set(data2.damage_relations.no_damage_from[i].name, 1)
              }

              //! this is for the takes no damage
              for (let [key, value] of noDamageHashmap) {
                noDamageArray.push(key);
              }

              //! this is for the takes 1/2x damage and takes 1/4x damage
              for (let [key, value] of halfHashmap) {
                if (value === 1 && !noDamageHashmap.has(key) && !doubleHashmap.has(key)){
                  halfArray.push(key)
                } else if (value === 2) {
                  
                  quarterArray.push(key)
                }
              }

              //! this is for the takes 2x damage and takes 4x damage
              for (let [key, value] of doubleHashmap) {
                if (value === 1 && !noDamageHashmap.has(key) && !halfHashmap.has(key)){
                  doubleArray.push(key)
                } else if (value === 2) {
                  times4Array.push(key)
                }
              }

              //! setting the states
              setTakes2x(doubleArray);
              setTakesHalf(halfArray);
              setTakesNone(noDamageArray);
              setTakes4x(times4Array);
              setTakesQuarter(quarterArray);

              // console.log(doubleArray);
              // console.log(halfHashmap);
              // console.log(noDamageArray);
              // console.log(times4Array);
              // console.log(quarterArray);

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
          console.log(data);
          let noDamageArray = [];
          let doubleArray = [];
          let halfArray = [];

          for(let i = 0; i < data.damage_relations.double_damage_from.length; i++) {
            doubleArray.push(data.damage_relations.double_damage_from[i].name)
          }

          for(let i = 0; i < data.damage_relations.half_damage_from.length; i++) {
            halfArray.push(data.damage_relations.half_damage_from[i].name)
          }

          for(let i = 0; i < data.damage_relations.no_damage_from.length; i++) {
            noDamageArray.push(data.damage_relations.no_damage_from[i].name)
          }

          setTakes2x(doubleArray);
          setTakesHalf(halfArray); 
          setTakesNone(noDamageArray); 
        });
    }
  }, [pokeTypes]);

  return (
    <div className="pokeCard type-card my-4 col-9 col-sm-8 col-md-8 col-lg-9 col-xl-5">
      this is for the defensive types card
      <h3>Takes 4x Damage from : </h3>
      <ul>
        {takes4x.map((type) => (
          <li className={`poke-type ${type}-type`}>
            {type.toUpperCase()}
          </li>
        ))}
      </ul>
      <h3>Takes 2x Damage from : </h3>
      <ul>
        {takes2x.map((type) => (
          <li className={`poke-type ${type}-type`}>
            {type.toUpperCase()}
          </li>
        ))}
      </ul>
      <h3>Takes 1/2x Damage from : </h3>
      <ul>
        {takesHalf.map((type) => (
          <li className={`poke-type ${type}-type`}>
            {type.toUpperCase()}
          </li>
        ))}
      </ul>
      <h3>Takes 1/4x Damage from : </h3>
      <ul>
        {takesQuarter.map((type) => (
          <li className={`poke-type ${type}-type`}>
            {type.toUpperCase()}
          </li>
        ))}
      </ul>
      <h3>Takes No Damage from : </h3>
      <ul>
        {takesNone.map((type) => (
          <li className={`poke-type ${type}-type`}>
            {type.toUpperCase()}
          </li>
        ))}
      </ul> 
    </div>
  );
}


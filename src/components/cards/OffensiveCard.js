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
      
      let doubleHashmap = new Map();
      let halfHashmap = new Map();
      let noDamageHashmap = new Map();

      const doubleArray = [];
      const halfArray = [];
      const noDamageArray = [];

      fetch(typeURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          for(let i = 0; i < data.damage_relations.double_damage_to.length; i++) {
            doubleHashmap.set(data.damage_relations.double_damage_to[i].name, 1)
          }

          for(let i = 0; i < data.damage_relations.half_damage_to.length; i++) {
            halfHashmap.set(data.damage_relations.half_damage_to[i].name, 1)
          }

          for(let i = 0; i < data.damage_relations.no_damage_to.length; i++) {
            noDamageHashmap.set(data.damage_relations.no_damage_to[i].name, 1)
          }

          fetch(typeURL2)
            .then(function (response2) {
              return response2.json();
            })
            .then(function (data2) {
              console.log(data2);

              for(let i = 0; i < data2.damage_relations.double_damage_to.length; i++) {
                if (doubleHashmap.has(data2.damage_relations.double_damage_to[i].name)) {
                  doubleHashmap.set(data2.damage_relations.double_damage_to[i].name, 2)
                } else {
                  doubleHashmap.set(data2.damage_relations.double_damage_to[i].name, 1)
                }
              }

              for(let i = 0; i < data2.damage_relations.half_damage_to.length; i++) {
                if (halfHashmap.has(data2.damage_relations.half_damage_to[i].name)) {
                  halfHashmap.set(data2.damage_relations.half_damage_to[i].name, 2)
                } else {
                  halfHashmap.set(data2.damage_relations.half_damage_to[i].name, 1)
                }
              }

              for(let i = 0; i < data2.damage_relations.no_damage_to.length; i++) {
                noDamageHashmap.set(data2.damage_relations.no_damage_to[i].name, 1)
              }
              
              //! this is for the takes no damage
              for (let [key, value] of noDamageHashmap) {
                noDamageArray.push(key);
              }

              //! this is for the takes 1/2x damage and takes 1/4x damage
              for (let [key, value] of halfHashmap) {
                if (!noDamageHashmap.has(key) && !doubleHashmap.has(key)){//value === 1 && 
                  halfArray.push(key)
                } 
              }

              //! this is for the takes 2x damage and takes 4x damage
              for (let [key, value] of doubleHashmap) {
                if (!noDamageHashmap.has(key) && !halfHashmap.has(key)){//value === 1 && 
                  doubleArray.push(key)
                } 
              }

              setDeals2x(doubleArray)
              setDealsHalf(halfArray)
              setDealsNone(noDamageArray)

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
          let noDamageArray = [];
          let doubleArray = [];
          let halfArray = [];

          for(let i = 0; i < data.damage_relations.double_damage_to.length; i++) {
            doubleArray.push(data.damage_relations.double_damage_to[i].name)
          }

          for(let i = 0; i < data.damage_relations.half_damage_to.length; i++) {
            halfArray.push(data.damage_relations.half_damage_to[i].name)
          }

          for(let i = 0; i < data.damage_relations.no_damage_to.length; i++) {
            noDamageArray.push(data.damage_relations.no_damage_to[i].name)
          }

          setDeals2x(doubleArray)
          setDealsHalf(halfArray)
          setDealsNone(noDamageArray)
        });
    }
  }, [pokeTypes]);

  // console.log(deals2x);

  return (
    <div className="pokeCard type-card my-4 col-10 col-sm-8 col-md-8 col-lg-5 col-xl-5">
      <h3>Deals 2x Damage to: </h3>
      <ul>
        {deals2x.map((type) => (
          <li className={`poke-type ${type}-type`}>{type.toUpperCase()}</li>
        ))}
      </ul>
      <h3>Deals 1/2x Damage to: </h3>
      <ul>
        {dealsHalf.map((type) => (
          <li className={`poke-type ${type}-type`}>{type.toUpperCase()}</li>
        ))}
      </ul>
      <h3>Deals No Damage to: </h3>
      <ul>
        {dealsNone.map((type) => (
          <li className={`poke-type ${type}-type`}>{type.toUpperCase()}</li>
        ))}
      </ul>
    </div>
  );
}



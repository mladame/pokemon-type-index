import React, { useState, useEffect } from "react";
// import DefensiveCard from 'DefensiveCard.js';
// import OffensiveCard from 'OffensiveCard.js';
// import PokeCard from 'PokeCard.js';

// function to fetch data from the apis and then make the pokemon card, offensive card, and defensive card

export default function PokeSearch() {
  // const for poke name input state
  const [pokeName, setPokeName] = useState("");
  const [pokeTypes, setPokeTypes] = useState([]);

  const handleInputChange = (event) => {
    // change the state
    const { target } = event;
    const inputValue = target.value;

    setPokeName(inputValue);
  };

  const handleFormSubmit = (event) => {
    const name = pokeName.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;

    if (pokeName) {
      // first api call for the pokemon name
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);

          const types = [];
          for (var i = 0; i < data.types.length; i++){
            types.push(data.types[i].type.name);
          }
          setPokeTypes(types);


          // const typeURL = `https://pokeapi.co/api/v2/type/${type}/`;

          // second API call for the type
          // fetch(typeURL)
          //   .then(function (response2) {
          //     return response2.json();
          //   })
          //   .then(function (data2) {
          //     console.log(data2);
          //   });
        });
    } else {
      console.log("nope no name");
    }
    // setPokeName("");
    // setPokeTypes([]);
  };

  useEffect(() => {
    console.log(pokeName);
    console.log(pokeTypes);
  }, [pokeTypes])

  return (
    <div>
      <h1>I'm the poke search </h1>
      {/* form - */}
      {/* the search bar label "what's your pokemon" */}
      {/* the search bar (input) */}

      <form className="form">
        <input
          value={pokeName}
          name="pokeName"
          onChange={handleInputChange}
          type="text"
          placeholder="Pokemon Name"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

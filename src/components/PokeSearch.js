import React, { useState } from "react";

// function to fetch data from the apis and then make the pokemon card, offensive card, and defensive card

export default function Home() {
  // const for poke name input state
  const [pokeName, setPokeName] = useState("");

  const createPokeCard = (data) => {
    // name , picture url, shiny url, type1, type2
    const pokePic = data.sprites.other.home.front_default;
    const pokePicShiny = data.sprites.other.home.front_shiny;
    const type = data.types[0].type.name;
    // const type2 = data.types[1].type.name

    console.log("i am the createPokeCard function!");
  };

  const createOffensiveCard = (data) => {
    // deals 2x to, deals 1x to, deals 1/2 to, deals 0 to

    const deals2x = data.damage_relations.double_damage_to;
    const dealsHalf = data.damage_relations.half_damage_to;
    const dealsNone = data.damage_relations.no_damage_to;

    // for deals normal damage, whatever type is not covered in one of these variables

    console.log("i am the createOffensiveCard function!");
  };

  const createDefensiveCard = (data) => {
    // takes 2x from, takes 1x from, takes 1/2 from, takes 0 from
    const takes2x = data.damage_relations.double_damage_from;
    const takesHalf = data.damage_relations.half_damage_from;
    const takesNone = data.damage_relations.no_damage_from;

    // for deals normal damage, whatever type is not covered in one of these variables

    console.log("i am the createDefensiveCard function!");
  };

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
          console.log(data);
          createPokeCard(data);

          const type = data.types[0].type.name;
          // const type2 = data.types[1].type.name;

          const typeURL = `https://pokeapi.co/api/v2/type/${type}/`;

          // second API call for the type
          fetch(typeURL)
            .then(function (response2) {
              return response2.json();
            })
            .then(function (data2) {
              console.log(data2);
              createOffensiveCard(data2);
              createDefensiveCard(data2);
            });
        });
    } else {
      console.log("nope no name");
    }

    setPokeName("");
  };

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

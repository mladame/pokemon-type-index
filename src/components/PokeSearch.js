import React, { useState, useEffect } from "react";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// ************ for testing purposes ************ //
import PokeCard from "./cards/PokeCard";
import OffensiveCard from "./cards/OffensiveCard";
import DefensiveCard from "./cards/DefensiveCard";

// function to fetch data from the apis and then make the pokemon card, offensive card, and defensive card

export default function PokeSearch() {
  // const for name, types, and picture input state
  const [pokeName, setPokeName] = useState("");
  const [pokeTypes, setPokeTypes] = useState([]);
  const [pokePic, setPokePic] = useState([]);

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
          for (var i = 0; i < data.types.length; i++) {
            types.push(data.types[i].type.name);
          }
          setPokeTypes(types);
          setPokePic(data.sprites.other.home.front_default);

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
  }, [pokeTypes]);

  return (
    <div className="appBody">

      {/* form - */}
      {/* the search bar label "what's your pokemon" */}
      {/* the search bar (input) */}
      <div className="search-box">
        <h1>What's your pokemon? </h1>
        <form className="form">
          <input
            value={pokeName}
            name="pokeName"
            onChange={handleInputChange}
            type="text"
            placeholder="Pokemon Name"
          />
          <button type="button" onClick={handleFormSubmit}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>


      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-2">
        <PokeCard pokeName={pokeName} pokeTypes={pokeTypes} pokePic={pokePic} />
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-7">
          <div className="OffDef-cards row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
            <OffensiveCard pokeTypes={pokeTypes} />
            <DefensiveCard pokeTypes={pokeTypes} />
          </div>
        </div>
      </div>
    </div>
  );
}

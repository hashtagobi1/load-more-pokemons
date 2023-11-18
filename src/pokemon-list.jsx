// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0
import { response } from "msw";
import React, { useState, useEffect } from "react";

const endpoint = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=5";

const fetchPokemon = async (endpoint) => {
  const pokemon = (await fetch(endpoint)).json();
  return pokemon;
};

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [data, setData] = useState({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });

  const loadMore = async () => {
    const { results, count, next, previous } = await fetchPokemon(data.next);
    console.log(results);
    setData((prev) => {
      return {
        ...prev,
        results,
        count,
        next,
        previous,
      };
    });
    setPokemon((prev) => {
      const newArr = [];
      results.map((result) => {
        newArr.push(result);
      });
      return [...prev, ...results];
    });
    console.log({ newPo: pokemon });
  };

  useEffect(() => {
    async function fetchData() {
      const { results, count, next, previous } = await fetchPokemon(endpoint);
      setData((prev) => {
        return {
          ...prev,
          count,
          results,
          next,
          previous,
        };
      });
      setPokemon(results);
    }
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <ul role="list">
          {pokemon.map((mon, i) => {
            return (
              <li role="listitem" key={i}>
                {mon.name}
              </li>
            );
          })}
        </ul>
        {data.next ? (
          <button onClick={() => loadMore()} role="list">
            Load more
          </button>
        ) : null}
      </div>
      <h3>{`Displaying ${pokemon.length} of ${data.count} results`}</h3>
    </div>
  );
};

export default PokemonList;

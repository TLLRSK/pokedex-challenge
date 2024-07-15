import { Ref } from "vue";
import { PokemonData } from "./pokemons";

export interface AppData {
    pokedexData: Ref<PokemonData[]>,
    darkMode: Ref<boolean>,
    toggleDarkMode: () => void,
    views: { name: string; icon: any }[],
    currentView: Ref<string>,
    setView: (selectedView: string) => void,
    currentPage: Ref<number>,
    pokemonsPerPage: number,
    selectPokemon: (pokemonData: PokemonData) => void,
    isSelectedPokemon: Ref<boolean>,
    unselectPokemon: () => void,
    selectedPokemon: Ref<PokemonData>;
    toggleFavourite: (pokemonData: PokemonData) => void,
    favourites: Ref<PokemonData[]>,
    isFaved: Ref<boolean>,
    updateFavourites: (pokemonData: PokemonData) => void,
};
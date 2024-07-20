import { Ref } from "vue";
import { PokemonData } from "../interfaces/pokemons";

const useGetCurrentPokemons = (listRef: Ref<PokemonData[]>, currentPage: Ref<number>, pokemonsPerPage: number) => {
    const list = listRef.value;
    const start = (currentPage.value - 1) * pokemonsPerPage;
    const end = start + pokemonsPerPage;
    const result = list.slice(start, end);
    
    return result;
};

export default useGetCurrentPokemons;
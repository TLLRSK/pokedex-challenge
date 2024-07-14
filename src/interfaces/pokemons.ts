export interface PokemonEntry {
        entry_Number: number,
        pokemon_species: {
            name: string
            url: string,
        }
}

export interface PokemonEntries {
    pokemon_entries: PokemonEntry[],
}

interface Sprite {
    front_default: string | null;
    other: {
        'official-artwork': {
        front_default: string | null;
        front_shiny: string | null;
        };
    };
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonData {
    id: number;
    name: string;
    sprites: Sprite;
    stats: Stat[];
    types: Type[];
    weight: number;
}

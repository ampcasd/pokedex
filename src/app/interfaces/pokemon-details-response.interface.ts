import { Url } from "../services/search.service";

export interface GetPokemonDetailsResponse {
  abilities: { 
    ability: { 
      name: string; 
      url: string 
    }[];
    is_hidden: boolean;
    slot: number;
  };
  base_experience: number;
  forms: { 
    name: string; 
    url: string 
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    }
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: Url,
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[]
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: Url;
    back_female: Url;
    back_shiny: Url;
    back_shiny_female: Url;
    front_default: Url;
    front_female: Url;
    front_shiny: Url;
    front_shiny_female: Url;
    other: {
      dream_world: {
        front_default: Url;
        front_female: Url;
      };
      official_artwork: {
        front_default: Url;
      }
      versions: any;
    }
  }
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    }
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }[]
  weight: number;
};

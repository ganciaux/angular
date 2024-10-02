import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-list.fake';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly http = inject(HttpClient);
  private readonly POKEMON_API_URL = 'http://localhost:3000/pokemons';

  constructor() { }

  getPokemonList(): PokemonList {
    return POKEMON_LIST;
  }

  getPokemonListEx(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.POKEMON_API_URL);
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre.

  getPokemonById(id: number): Pokemon {
    const pokemon = POKEMON_LIST.find((pokemon) => pokemon.id === id);

    if (!pokemon) {
      throw new Error(`No Pokémon found with id ${id}`);
    }

    return pokemon;
  }

  // Retourne la liste des types valides pour un pokémon.

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }
}

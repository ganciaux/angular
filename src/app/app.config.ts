import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { Routes, provideRouter } from '@angular/router'; 
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component'; 
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';

const routes: Routes = [
  {
    path: 'pokemons/edit/:id',
    component: PokemonEditComponent,
    title: 'Pokémon',
  },
  { path: 'pokemons/:id',  title: 'Pokédex', component: PokemonProfileComponent },
  { path: 'pokemons',  title: 'Pokémons', component: PokemonListComponent },
  { path: '',  title: 'Pokémons', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: '**',  title: 'Page introuvable', component: PageNotFoundComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),  provideRouter(routes)]
};

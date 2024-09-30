import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { CounterComponent } from '../../counter/counter.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Pokemon, PokemonList } from '../../pokemon.model';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { ReversePipe } from '../../reverse.pipe';
import { PokemonService } from '../../pokemon.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CounterComponent, CommonModule, PokemonBorderDirective, DatePipe, ReversePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: ``
})
export class PokemonListComponent {
  private readonly pokemonService = inject(PokemonService);
  pokemons = signal(this.pokemonService.getPokemonList());
  pattern= signal('');
  pokemonsFilter = computed(()=>{
    if (this.pattern().length==0){
      return this.pokemons();
    } else {
      console.log('computed:', this.pattern())
      return this.pokemons().filter((p)=>{
        console.log(p.name)
        return p.name.toLowerCase().startsWith(this.pattern().toLocaleLowerCase())}
      )
    }
  })
  isActive=true;
  data=[1,2,3,4]
  imageSrc =signal("images/026.png")
  name = signal('Pikachu');
  life = signal(21);
  size = computed(()=>{
    const life=this.life();
    if (life<15)return 'petit'
    else if (life>25)return 'grand'
    else return 'moyen';
  })

  constructor(){
    effect(()=>{
      console.log(this.pokemonsFilter());
    })
  }
  getsize(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }
  
    return 'Moyen';
  }

  decrementLife(pokemon: Pokemon) {
  pokemon.life-=1
  this.isActive=false;
}
incrementLife(pokemon: Pokemon) {
  pokemon.life+=1
  this.isActive=true;
}
}

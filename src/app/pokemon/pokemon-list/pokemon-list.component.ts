import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { CounterComponent } from '../../counter/counter.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Pokemon, PokemonList } from '../../pokemon.model';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { ReversePipe } from '../../reverse.pipe';
import { PokemonService } from '../../pokemon.service';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CounterComponent, CommonModule, PokemonBorderDirective, DatePipe, ReversePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: [
    `
      .pokemon-card {
        cursor: pointer;
      }
    `,
  ],
})
export class PokemonListComponent {
  private readonly pokemonService = inject(PokemonService);
  readonly pokemons = signal(this.pokemonService.getPokemonList());
  /*
  readonly pokemonList = toSignal(this.pokemonService.getPokemonListEx(), {
    initialValue: [],
  });
  */
 // Emit "undefined" and after the array.
 readonly pokemonList = toSignal(this.pokemonService.getPokemonListEx());

  // Emit if resquest is running or not.
  readonly loading = computed(() => {
    console.log("loading:", !this.pokemonList())
    return !this.pokemonList()}
  );

  pattern= signal('');
  pokemonsFilter = computed(()=>{
    if (this.pattern().length==0){
      return this.pokemonList();
    } else {
      console.log('computed:', this.pattern())
        return this.pokemonList()?.filter((p)=>{
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

}

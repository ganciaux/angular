import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Pokemon, PokemonList } from './pokemon.model';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { ReversePipe } from './reverse.pipe';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent, CommonModule, PokemonBorderDirective, DatePipe, ReversePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly pokemonService = inject(PokemonService);
  pokemons = signal(this.pokemonService.getPokemonList());
  pattern= signal('');
  pokemonsFilter:WritableSignal<PokemonList>=signal([]);
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
  
search(event: Event) { // `$event` est de type Event
  const inputElement = event.target as HTMLInputElement; // Cast vers HTMLInputElement
  const inputValue = inputElement.value; // Accéder à la valeur de l'input
  this.pattern.set(inputValue)
  console.log(inputValue); // Affiche la valeur actuelle de l'input
  const pattern=this.pattern();
      if (pattern.length==0){
        this.pokemonsFilter.set(this.pokemons());
      } else {
        this.pokemonsFilter.set(this.pokemons().filter((p)=>{return p.name.startsWith(pattern)}))
      }
}
}

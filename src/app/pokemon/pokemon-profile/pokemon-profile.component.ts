import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { CommonModule, DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [DatePipe, RouterLink,CommonModule],
  templateUrl: './pokemon-profile.component.html',
  styles: ``
})
export class PokemonProfileComponent {
  
  readonly router = inject(Router)
  
  deletePokemon(pokemonId: number) {
    this.pokemonService.deletePokemon(pokemonId).subscribe(() => {
      this.router.navigate(['/pokemons']);
    });
  }

  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  //readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly();
  //readonly pokemon = toSignal(this.pokemonService.getPokemonByIdEx(this.pokemonId))

  // Notre nouveau Signal avec la réponse HTTP "brute".
  private readonly pokemonResponse = toSignal(
    this.pokemonService.getPokemonByIdEx(this.pokemonId).pipe(
      map((value) => ({ value, error: undefined })),
      catchError((error) => of({ value: undefined, error }))
    )
  );

  // En attente de la réponse HTTP
  readonly loading = computed(() => !this.pokemonResponse());
  // Cas d'erreur HTTP
  readonly error = computed(() => this.pokemonResponse()?.error);
  // Cas de succès HTTP
  readonly pokemon = computed(() => this.pokemonResponse()?.value);

  
}

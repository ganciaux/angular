import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, POKEMON_RULES } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [DatePipe, RouterLink, ReactiveFormsModule,JsonPipe],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
})
export class PokemonEditComponent {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemon = signal(
    this.pokemonService.getPokemonById(this.pokemonId)
  ).asReadonly();

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name, [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    types: new FormArray(
      this.pokemon().types.map((type) => new FormControl(type))
    ),
  });

  // Get the selected Pokemon list by user.
get pokemonTypeList(): FormArray {
  return this.form.get('types') as FormArray;
}

// Return if given type is already selected by user or not.
isPokemonTypeSelected(type: string): boolean {
  console.log("isPokemonTypeSelected:", type)
  return !!this.pokemonTypeList.controls.find(
    (control) => control.value === type
  );
}

// Add or remove a given type in the selected Pokemon list.
onPokemonTypeChange(type: string, isChecked: boolean): void {
  if (isChecked) {
    const control = new FormControl(type);
    this.pokemonTypeList.push(control);
  }
  else {
    const index = this.pokemonTypeList.controls
      .map((control) => control.value)
      .indexOf(type);
    this.pokemonTypeList.removeAt(index);
  }
}

getPokemonColor(type: string) {
  return getPokemonColor(type);
}

onSubmit() {
  console.log(this.form.value);
}
}
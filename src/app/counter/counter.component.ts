import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
 counter=signal(0);
 doubleCounter = computed(() => this.counter() * 2);

 constructor(){
  effect(()=>console.log(this.counter()))
 }

 increment(){
  this.counter.update(c=>c+1)
 }

 reset(){
  this.counter.set(0)
 }

}

import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  public counter = signal(10);
  // Señal computada de solo lectura, la función computed esta escuchando cambios en las funciones que se pasan
  //como parametros, si hay un cambio en las funciones se realiza el computed de la funcion.
  public squareCounter = computed( () => this.counter() * this.counter() );

  increaseBy( value: number ){
    // El update pide una función que tiene el valor actual de la señal, en este caso seria current
    //  y devuelve el valor final de la señal, para el ejemplo es => current + value
    this.counter.update( current =>  current + value)
  }

}

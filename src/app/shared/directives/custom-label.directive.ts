import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color( value: string) {
    this._color = value;
    this.setStyle();

  }

  constructor(private el: ElementRef<HTMLElement>) {
    // console.log('Constructor de la directiva');
    console.log(el);
    this.htmlElement = el;
   }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }


  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if( !this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores'
      return;
    }
    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido'
      return;
    }
    if (errors.includes('minlength')) {
      const requiredLength = this._errors['minlength'].requiredLength;
      const actualLength = this._errors['minlength'].actualLength;
      this.htmlElement.nativeElement.innerText = `Has escrito ${actualLength} caracteres, te faltan ${requiredLength - actualLength} caracteres.`;
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'El formato del correo no es válido';
      return;
    }
  }


}

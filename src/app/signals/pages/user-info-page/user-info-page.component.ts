import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit{

  //Se inyecta el servicio
  private userServices = inject(UsersServiceService);
  public userId = signal(1);
  public currentUser = signal<User | undefined>(undefined);
  public userwasFound = signal(true);
  public fullName = computed<string>( () => {
    //console.log(this.fullName);
    if (!this.currentUser() ) return 'Usuario no encontrado';
    return `${ this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  });

  ngOnInit(): void {
    this.loadUser( this.userId() )
  }

  loadUser(id: number ){
    if ( id <= 0) return;

    //Actualiza el valor de la señal al valor del id
    this.userId.set(id);
    this.currentUser.set(undefined);

    //Llama al endpoint en el services que obtiene el usuario
    this.userServices.getUserById(id)
      .subscribe({
        next: (user) => {
          this.currentUser.set( user);
          this.userwasFound.set(true);
        },
        error: () => {
          this.userwasFound.set(false);
          this.currentUser.set(undefined);
        }

      });

  }
}

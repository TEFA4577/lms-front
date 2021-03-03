import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Descripcion: Esta servicio sirve para la autenticacion de usuarios con firebase.
   * @autor: @AlexAguilarP
   */
  constructor(
    public afAuth: AngularFireAuth,
  ) { }
  /**
   * Descripcion: con esta funcion se abre la ventana pop-up para el registro con Google
   */
  // tslint:disable-next-line: typedef
  registroConFirebase(opcion: string) {
    try {
      if (opcion === 'google') {
        return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      } else if (opcion === 'facebook') {
        return this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
      }
    } catch (error) {
      console.log(error);
    }
  }
  logout(): void{
    this.afAuth.signOut();
  }
  /**
   * Descripcion: con esta funcion se obtiene los datos del inicio de session con Firebase
   */
  // tslint:disable-next-line: typedef
  obtenerCredenciales() {
    return this.afAuth.authState;
  }
}

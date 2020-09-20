import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;

  constructor(
    private af: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    // recuperar datos de usuario para el guard y el nav
    this.user$ = this.af.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc(`usuarios/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  loginUser( email: string, password: string): Promise<any> {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  registerUser(email: string, password: string): Promise<any> {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  deleteUser(email, pass): void {
    pass = atob(pass);
    this.af.signInWithEmailAndPassword(email, pass)
    .then(() =>
    {
      const user = firebase.auth().currentUser;
      user.delete();
    });
  }

  logout(): void {
    this.af.signOut();
  }
}

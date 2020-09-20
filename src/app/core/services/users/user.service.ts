import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public fireStore: AngularFirestore
  ) { }

  listUsers(): AngularFirestoreCollection {
    return this.fireStore.collection(`usuarios`);
  }

  singleUSer(id): AngularFirestoreDocument {
    return this.fireStore.collection('usuarios').doc(id);
  }

  createUser(data, id): Promise<void> {
    data.password = btoa(data.password);
    return this.fireStore.doc(`usuarios/${id}`)
      .set({
          id,
          nombres: data.nombres,
          apellidos: data.apellidos,
          identificacion: data.identificacion,
          rol: data.rol,
          estado: data.estado,
          password: data.password,
          telefono: data.telefono,
          correo: data.correo, });
  }

  editUser(data, id): Promise<void> {
    data.password = btoa(data.password);
    return this.fireStore.doc(`usuarios/${id}`)
      .update({
          nombres: data.nombres,
          apellidos: data.apellidos,
          identificacion: data.identificacion,
          rol: data.rol,
          estado: data.estado,
          password: data.password,
          telefono: data.telefono,
          correo: data.correo, });
  }

  deleteUser(id: string): Promise<void> {
    return this.fireStore.doc(`usuarios/${id}`).delete();
  }
}

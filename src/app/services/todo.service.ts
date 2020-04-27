import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import { Observable} from "rxjs";
import {map } from "rxjs/operators";
import {TaskI} from "../models/task.interface";


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private videojuegosCollection: AngularFirestoreCollection<TaskI>;
  private videojuegos: Observable<TaskI[]>;

  constructor(db: AngularFirestore) {
    this.videojuegosCollection= db.collection<TaskI>('videojuegos');
    this.videojuegos= this.videojuegosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ...data };
        });
      }
    ));
   }
   getTodos(){
     return this.videojuegos;
   }
   getTodo(id:string){
return this.videojuegosCollection.doc<TaskI>(id).valueChanges();
   }
   updateTodo(todo:TaskI, id: string){
     return this.videojuegosCollection.doc(id).update(todo);
   }
   addTodo(todo:TaskI){
     return this.videojuegosCollection.add(todo);
   }
   removeTodo(id:string){
     return this.videojuegosCollection.doc(id).delete();
   }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private db: AngularFireDatabase) { }
  createTranslation(text: string): AngularFireObject<any> {
    console.log("hihi");
    // create new translation, then return it as an object observable
    const data = { 'english': text }

    const key = this.db.list('/translations').push(data).key
console.log(this.db);
    return this.db.object(`translations/${key}`)
  }
}

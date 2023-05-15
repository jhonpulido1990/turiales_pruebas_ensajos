import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Players } from '../commons/interfaces/player.interface';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private firestore: Firestore) { }

  addPlayer(player: Players) {
    const playerRef = collection(this.firestore, 'players');
    return addDoc(playerRef, player)
  }

  getPlayer(filter = '') {
    const playerRef = collection(this.firestore, 'players');
    let q = query(playerRef);
    if (filter) {
      q = query(playerRef, where('name', '==', filter));
    }
    return collectionData(q) as unknown as Observable<Players[]>;
  }

  async updatePlayer(player: Players) {
    const playerRef = collection(this.firestore, 'players');
    let q = query(playerRef, where('id', '==', player.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'players', document.id);
      await updateDoc(docRef, { ...player });
    });
  }

  async deletePlayer(id: string) {
    const playerRef = collection(this.firestore, 'players');
    let q = query(playerRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'players', document.id);
      await deleteDoc(docRef);
    });
  }
}

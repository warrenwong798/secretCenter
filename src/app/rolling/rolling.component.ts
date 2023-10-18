import { Component } from '@angular/core';
import firebase from "firebase/compat/app";
import { firebaseApp } from '../app.module';
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-rolling',
  templateUrl: './rolling.component.html',
  styleUrls: ['./rolling.component.css']
})
export class RollingComponent {
    db = getFirestore(firebaseApp);
    team: string = "";
    wish: string = "";
    comments: string = "";
    success: boolean = false;


    async registerPlayer() {
      // try {
      //   const docRef = await addDoc(collection(this.db, "Game"), {
      //     "{{this.team}}": {
      //       "{this.userId}": {
      //         wish: this.wish,
      //         comments: this.comments
      //       }
      //     }
      //   });
      //   console.log("Document written with ID: ", docRef.id);
      //   this.success = true;
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }
      const username = localStorage.getItem("username");
      const uid = localStorage.getItem("userId")
      if (username == null || username == "" || uid == null ){
        console.log("Please Login");
        return;
      }
        
      const gameRef = doc(this.db, "Game", this.team, uid, username);
      await setDoc(gameRef, {
          wish: this.wish,
          comments: this.comments
      }).then((response) => {
        this.success = true;
        console.log(response);
      });

      // To update age and favorite color:
      // await updateDoc(gameRef, {
      //     "age": 13,
      //     "favorites.color": "Red"
      // });
    }
}

import { Component } from '@angular/core';
import firebase from "firebase/compat/app";
import { firebaseApp } from '../app.module';
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-rolling',
  templateUrl: './rolling.component.html',
  styleUrls: ['./rolling.component.css']
})
export class RollingComponent {
    db = getFirestore(firebaseApp);
    team: string = "cprm";
    wish: string = "";
    comments: string = "";
    success: boolean = false;
    admin: boolean = false;


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
        
      const gameRef = doc(this.db, this.team, username);
      
      await setDoc(gameRef, {
          wish: this.wish,
          comments: this.comments
      }).then((response) => {
        this.success = true;
        console.log(response);
      });
      
      const userRef = doc(this.db, "User", this.team);
      const docSnap = await getDoc(userRef);
      var data: any[] = [];
    
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        data = data.concat(docSnap.data()['players']);
        
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      if (!data.includes(username)){
        data.push(username);
        await setDoc(userRef, {
          players: data
        }).then((response) => {
          this.success = true;
          console.log(response);

        });
      }
      

      // To update age and favorite color:
      // await updateDoc(gameRef, {
      //     "age": 13,
      //     "favorites.color": "Red"
      // });
    }
}
